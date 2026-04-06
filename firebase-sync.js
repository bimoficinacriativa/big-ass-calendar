/* ============================================
   Firebase Sync Layer — Big Ass Calendar
   Auth + Firestore + Configurable Calendars
   ============================================ */
(function () {
  'use strict';

  const firebaseConfig = {
    apiKey: "AIzaSyBNrkeBRGsQq2g_PKSWLAumLrYnd75Uc9g",
    authDomain: "oc-big-ass-calendar.firebaseapp.com",
    projectId: "oc-big-ass-calendar",
    storageBucket: "oc-big-ass-calendar.firebasestorage.app",
    messagingSenderId: "307188542224",
    appId: "1:307188542224:web:efaddb84d3ebbc864e5395"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  db.enablePersistence({ synchronizeTabs: true }).catch(function (err) {
    console.warn('Firestore persistence error:', err.code);
  });

  // New users start with no calendars (just the + button)

  let calendars = [];
  let currentCalendar = localStorage.getItem('bac_current_calendar') || 'default';
  let unsubscribeSnapshot = null;
  let currentUser = null;
  let onStateChangeCallback = null;
  let savingInProgress = false;
  let saveDebounceTimer = null;
  let syncStatus = 'idle'; // 'idle' | 'saving' | 'saved' | 'error' | 'offline'

  // localStorage key scoped by UID (isolates data between accounts)
  function storageKey(calId) {
    var uid = currentUser ? currentUser.uid : '_local';
    return 'bac_' + uid + '_' + (calId || currentCalendar);
  }

  // --- Auth ---
  function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return auth.signInWithPopup(provider).catch(function (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        return auth.signInWithRedirect(provider);
      }
      console.error('Sign-in error:', err);
    });
  }

  function signOut() {
    return auth.signOut();
  }

  // --- Profile (calendar list) ---
  function getProfileRef() {
    if (!currentUser) return null;
    return db.collection('users').doc(currentUser.uid);
  }

  function saveCalendarsToProfile() {
    var ref = getProfileRef();
    if (!ref) return Promise.resolve();
    return ref.set({ calendars: calendars }, { merge: true });
  }

  function loadCalendarsFromProfile() {
    var ref = getProfileRef();
    if (!ref) return Promise.resolve(null);
    return ref.get().then(function (doc) {
      if (doc.exists && doc.data().calendars) {
        return doc.data().calendars;
      }
      return null;
    });
  }

  // --- Firestore ---
  function getDocRef() {
    if (!currentUser) return null;
    return db.collection('users').doc(currentUser.uid)
      .collection('calendars').doc(currentCalendar);
  }

  function setSyncStatus(status) {
    syncStatus = status;
    renderSyncStatus();
  }

  function renderSyncStatus() {
    var el = document.getElementById('syncStatus');
    if (!el) return;
    if (!currentUser) { el.innerHTML = ''; return; }

    var html = '';
    if (syncStatus === 'saving') {
      html = '<span class="sync-indicator sync-saving">' +
        '<span class="sync-spinner"></span> Salvando…</span>';
    } else if (syncStatus === 'saved') {
      html = '<span class="sync-indicator sync-saved">' +
        '<span class="sync-dot sync-dot-ok"></span> Salvo</span>';
    } else if (syncStatus === 'error') {
      html = '<span class="sync-indicator sync-error">' +
        '<span class="sync-dot sync-dot-err"></span> Erro ao salvar</span>';
    } else if (syncStatus === 'offline') {
      html = '<span class="sync-indicator sync-offline">' +
        '<span class="sync-dot sync-dot-off"></span> Offline</span>';
    }
    el.innerHTML = html;
  }

  function saveToFirestore(state) {
    if (!currentUser) {
      setSyncStatus('idle');
      return Promise.resolve();
    }
    savingInProgress = true;
    setSyncStatus('saving');
    // Strip undefined values by round-tripping through JSON
    var clean = JSON.parse(JSON.stringify(state));
    // Safety timeout: if promise never resolves, show error after 10s
    var timedOut = false;
    var safetyTimer = setTimeout(function () {
      timedOut = true;
      if (syncStatus === 'saving') {
        savingInProgress = false;
        setSyncStatus('error');
        console.error('Firestore save timeout — write did not resolve in 10s');
      }
    }, 10000);
    return getDocRef().set(clean, { merge: true }).then(function () {
      clearTimeout(safetyTimer);
      if (!timedOut) {
        savingInProgress = false;
        setSyncStatus('saved');
      }
    }).catch(function (err) {
      clearTimeout(safetyTimer);
      savingInProgress = false;
      setSyncStatus('error');
      console.error('Firestore save error:', err);
    });
  }

  function loadFromFirestore() {
    if (!currentUser) return Promise.resolve(null);
    return getDocRef().get().then(function (doc) {
      if (doc.exists) return doc.data();
      return null;
    });
  }

  function listenToFirestore(callback) {
    if (unsubscribeSnapshot) unsubscribeSnapshot();
    if (!currentUser) return;
    unsubscribeSnapshot = getDocRef().onSnapshot(function (doc) {
      if (savingInProgress) return;
      if (doc.exists && doc.metadata.hasPendingWrites === false) {
        callback(doc.data());
      }
    });
  }

  function stopListening() {
    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
      unsubscribeSnapshot = null;
    }
  }

  // --- Calendar Switcher ---
  function setCalendar(calId) {
    currentCalendar = calId;
    localStorage.setItem('bac_current_calendar', calId);
  }

  function generateId() {
    return 'cal_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
  }

  // --- Auth UI ---
  function renderAuthUI() {
    var container = document.getElementById('authContainer');
    if (!container) return;

    if (currentUser) {
      var photo = currentUser.photoURL
        ? '<img class="auth-avatar" src="' + currentUser.photoURL + '" alt="" referrerpolicy="no-referrer">'
        : '';
      container.innerHTML =
        '<div class="auth-bar">' +
          '<span id="syncStatus"></span>' +
          photo +
          '<span class="auth-name">' + (currentUser.displayName || currentUser.email) + '</span>' +
          '<button class="auth-btn auth-logout" id="btnSignOut" title="Sair">Sair</button>' +
        '</div>';
      document.getElementById('btnSignOut').addEventListener('click', signOut);
      renderSyncStatus();
    } else {
      container.innerHTML =
        '<div class="auth-bar">' +
          '<button class="auth-btn auth-login" id="btnSignIn">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:6px"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>' +
            'Entrar com Google' +
          '</button>' +
        '</div>';
      document.getElementById('btnSignIn').addEventListener('click', signIn);
    }
  }

  function renderCalendarSwitcher() {
    var container = document.getElementById('calendarSwitcher');
    if (!container) return;

    if (!currentUser) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    container.style.display = '';
    var html = '';
    calendars.forEach(function (cal) {
      var active = cal.id === currentCalendar ? ' active' : '';
      html += '<button class="cal-switch-btn' + active + '" data-cal="' + cal.id + '" title="Clique para editar">' +
        cal.emoji + ' ' + cal.label + '</button>';
    });
    var addLabel = calendars.length === 0 ? '+ Novo Calendário' : '+';
    html += '<button class="cal-switch-btn cal-add-btn" id="calAddBtn" title="Novo calendário">' + addLabel + '</button>';
    container.innerHTML = html;

    // Click to switch; click again on active to edit
    container.querySelectorAll('.cal-switch-btn:not(.cal-add-btn)').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var calId = this.getAttribute('data-cal');
        if (calId === currentCalendar) {
          // Already active — open editor
          var cal = calendars.find(function (c) { return c.id === calId; });
          if (cal) showCalendarEditor(cal);
          return;
        }
        stopListening();
        setCalendar(calId);
        renderCalendarSwitcher();
        if (window.BACSync && window.BACSync._onCalendarSwitch) {
          window.BACSync._onCalendarSwitch();
        }
      });
    });

    // Add button
    document.getElementById('calAddBtn').addEventListener('click', function () {
      showCalendarEditor(null);
    });
  }

  // --- Calendar Editor (modal) ---
  function showCalendarEditor(cal) {
    var isNew = !cal;

    // Remove any existing editor modal
    var existing = document.getElementById('calEditorOverlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'calEditorOverlay';
    overlay.className = 'modal-overlay';

    var modal = document.createElement('div');
    modal.className = 'modal modal-sm';

    var canDelete = !isNew && calendars.length > 1;
    var title = isNew ? 'Novo Calendário' : cal.emoji + ' ' + cal.label;
    var saveLabel = isNew ? 'Criar' : 'Salvar';
    var nameVal = isNew ? '' : cal.label.replace(/"/g, '&quot;');
    var emojiVal = isNew ? '📅' : cal.emoji;

    var deleteHtml = canDelete
      ? '<button id="calEditorDelete" class="cal-editor-btn cal-editor-delete">Excluir</button>'
      : '';

    modal.innerHTML =
      '<div class="modal-header">' +
        '<span class="modal-title">' + title + '</span>' +
        '<button class="modal-close" id="calEditorClose">&times;</button>' +
      '</div>' +
      '<div class="modal-body">' +
        '<div class="cal-editor-field">' +
          '<label class="cal-editor-label">Nome</label>' +
          '<input type="text" id="calEditorName" class="cal-editor-input" value="' + nameVal + '" placeholder="Ex: Trabalho">' +
        '</div>' +
        '<div class="cal-editor-field">' +
          '<label class="cal-editor-label">Emoji</label>' +
          '<input type="text" id="calEditorEmoji" class="cal-editor-input cal-editor-emoji" value="' + emojiVal + '">' +
        '</div>' +
        '<div class="cal-editor-actions">' +
          deleteHtml +
          '<span style="flex:1"></span>' +
          '<button id="calEditorCancel" class="cal-editor-btn cal-editor-cancel">Cancelar</button>' +
          '<button id="calEditorSave" class="cal-editor-btn cal-editor-save">' + saveLabel + '</button>' +
        '</div>' +
      '</div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
      document.getElementById('calEditorName').focus();
    });

    function closeEditor() {
      modal.classList.add('closing');
      overlay.classList.add('closing');
      setTimeout(function () { overlay.remove(); }, 200);
    }

    document.getElementById('calEditorClose').addEventListener('click', closeEditor);
    document.getElementById('calEditorCancel').addEventListener('click', closeEditor);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeEditor();
    });

    // Save
    document.getElementById('calEditorSave').addEventListener('click', function () {
      var name = document.getElementById('calEditorName').value.trim();
      var emoji = document.getElementById('calEditorEmoji').value.trim() || '📅';
      if (!name) return;

      if (isNew) {
        var newCal = { id: generateId(), label: name, emoji: emoji };
        calendars.push(newCal);
        saveCalendarsToProfile().then(function () {
          stopListening();
          setCalendar(newCal.id);
          renderCalendarSwitcher();
          if (window.BACSync && window.BACSync._onCalendarSwitch) {
            window.BACSync._onCalendarSwitch();
          }
        });
      } else {
        cal.label = name;
        cal.emoji = emoji;
        saveCalendarsToProfile().then(function () {
          renderCalendarSwitcher();
        });
      }
      closeEditor();
    });

    // Enter key saves
    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        document.getElementById('calEditorSave').click();
      } else if (e.key === 'Escape') {
        closeEditor();
      }
    });

    // Delete (two-click confirmation)
    var delBtn = document.getElementById('calEditorDelete');
    if (delBtn) {
      delBtn.addEventListener('click', function () {
        if (!this.dataset.confirmed) {
          this.dataset.confirmed = 'true';
          this.textContent = 'Confirmar exclusão?';
          this.classList.add('cal-editor-delete-confirm');
          return;
        }
        calendars = calendars.filter(function (c) { return c.id !== cal.id; });
        if (currentUser) {
          db.collection('users').doc(currentUser.uid)
            .collection('calendars').doc(cal.id).delete();
        }
        if (currentCalendar === cal.id) {
          stopListening();
          setCalendar(calendars[0].id);
          if (window.BACSync && window.BACSync._onCalendarSwitch) {
            window.BACSync._onCalendarSwitch();
          }
        }
        saveCalendarsToProfile().then(function () {
          renderCalendarSwitcher();
        });
        closeEditor();
      });
    }
  }

  // --- Migration (legacy, completed — kept as no-ops) ---
  // migrateFromShared and migrateLocalData removed:
  // They copied data to any new user who logged in.

  // --- Public API ---
  window.BACSync = {
    get CALENDARS() { return calendars; },
    currentCalendar: function () { return currentCalendar; },
    isLoggedIn: function () { return !!currentUser; },
    user: function () { return currentUser; },

    save: function (state) {
      localStorage.setItem(storageKey(), JSON.stringify(state));
      if (!currentUser) return; // No Firestore sync without login
      // Debounce Firestore writes (500ms) to avoid spamming on rapid input
      if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
      setSyncStatus('saving');
      saveDebounceTimer = setTimeout(function () {
        saveToFirestore(state);
      }, 500);
    },

    load: function () {
      try {
        var raw = localStorage.getItem(storageKey());
        if (raw) return JSON.parse(raw);
      } catch (e) { /* ignore */ }
      return null;
    },

    loadFromCloud: function () {
      return loadFromFirestore();
    },

    listen: function (callback) {
      onStateChangeCallback = callback;
      listenToFirestore(function (data) {
        localStorage.setItem(storageKey(), JSON.stringify(data));
        callback(data);
      });
    },

    renderUI: function () {
      renderAuthUI();
      renderCalendarSwitcher();
    },

    _onCalendarSwitch: null
  };

  // --- Auth State Listener ---
  auth.onAuthStateChanged(function (user) {
    currentUser = user;
    renderAuthUI();

    if (user) {
      // Load user's calendar profiles from Firestore
      loadCalendarsFromProfile().then(function (savedCalendars) {
        if (savedCalendars && savedCalendars.length > 0) {
          calendars = savedCalendars;
        } else {
          // New user: start with empty calendars (just the + button)
          calendars = [];
        }
      }).then(function () {
        // Ensure currentCalendar is valid
        if (calendars.length > 0) {
          var valid = calendars.some(function (c) { return c.id === currentCalendar; });
          if (!valid) {
            currentCalendar = calendars[0].id;
            localStorage.setItem('bac_current_calendar', currentCalendar);
          }
        }

        renderCalendarSwitcher();

        // Load calendar data from Firestore only
        return loadFromFirestore();
      }).then(function (cloudData) {
        if (cloudData) {
          localStorage.setItem(storageKey(), JSON.stringify(cloudData));
          if (onStateChangeCallback) onStateChangeCallback(cloudData);
        } else if (onStateChangeCallback) {
          // New user with no cloud data: reset UI to clean default state
          onStateChangeCallback(null);
        }

        if (onStateChangeCallback) {
          listenToFirestore(function (data) {
            localStorage.setItem(storageKey(), JSON.stringify(data));
            onStateChangeCallback(data);
          });
        }
      });
    } else {
      calendars = [];
      stopListening();
      renderCalendarSwitcher();
    }
  });

  // Network status
  window.addEventListener('online', function () {
    if (syncStatus === 'offline') setSyncStatus('saved');
  });
  window.addEventListener('offline', function () {
    setSyncStatus('offline');
  });

})();
