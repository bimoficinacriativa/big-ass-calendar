/* ============================================
   Firebase Sync Layer — Big Ass Calendar
   Auth + Firestore + Calendar Switcher
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

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Enable offline persistence
  db.enablePersistence({ synchronizeTabs: true }).catch(function (err) {
    console.warn('Firestore persistence error:', err.code);
  });

  // Calendar profiles
  const CALENDARS = [
    { id: 'oc', label: 'OC', emoji: '\uD83E\uDDE1' },
    { id: 'marcos', label: 'Marcos', emoji: '\uD83E\uDDD9\u200D\u2642\uFE0F' },
    { id: 'jessica', label: 'Jessica', emoji: '\uD83E\uDDD9\u200D\u2640\uFE0F' }
  ];

  let currentCalendar = localStorage.getItem('bac_current_calendar') || 'oc';
  let unsubscribeSnapshot = null;
  let currentUser = null;
  let onStateChangeCallback = null;
  let savingInProgress = false;

  // --- Auth ---
  function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return auth.signInWithPopup(provider).catch(function (err) {
      // Fallback to redirect for mobile
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        return auth.signInWithRedirect(provider);
      }
      console.error('Sign-in error:', err);
    });
  }

  function signOut() {
    return auth.signOut();
  }

  // --- Firestore ---
  function getDocRef() {
    return db.collection('calendars').doc(currentCalendar);
  }

  function saveToFirestore(state) {
    if (!currentUser) return Promise.resolve();
    savingInProgress = true;
    return getDocRef().set(state, { merge: true }).then(function () {
      savingInProgress = false;
    }).catch(function (err) {
      savingInProgress = false;
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
      if (savingInProgress) return; // ignore our own writes
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

  // --- Auth UI ---
  function renderAuthUI() {
    const container = document.getElementById('authContainer');
    if (!container) return;

    if (currentUser) {
      const photo = currentUser.photoURL
        ? '<img class="auth-avatar" src="' + currentUser.photoURL + '" alt="" referrerpolicy="no-referrer">'
        : '';
      container.innerHTML =
        '<div class="auth-bar">' +
          photo +
          '<span class="auth-name">' + (currentUser.displayName || currentUser.email) + '</span>' +
          '<button class="auth-btn auth-logout" id="btnSignOut" title="Sair">Sair</button>' +
        '</div>';
      document.getElementById('btnSignOut').addEventListener('click', signOut);
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
    const container = document.getElementById('calendarSwitcher');
    if (!container) return;

    if (!currentUser) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    container.style.display = '';
    var html = '';
    CALENDARS.forEach(function (cal) {
      var active = cal.id === currentCalendar ? ' active' : '';
      html += '<button class="cal-switch-btn' + active + '" data-cal="' + cal.id + '">' +
        cal.emoji + ' ' + cal.label + '</button>';
    });
    container.innerHTML = html;

    container.querySelectorAll('.cal-switch-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var calId = this.getAttribute('data-cal');
        if (calId === currentCalendar) return;
        stopListening();
        setCalendar(calId);
        renderCalendarSwitcher();
        // Notify app to reload state
        if (window.BACSync && window.BACSync._onCalendarSwitch) {
          window.BACSync._onCalendarSwitch();
        }
      });
    });
  }

  // --- Public API ---
  window.BACSync = {
    CALENDARS: CALENDARS,
    currentCalendar: function () { return currentCalendar; },
    isLoggedIn: function () { return !!currentUser; },
    user: function () { return currentUser; },

    save: function (state) {
      // Always save to localStorage as cache
      localStorage.setItem('bigasscalendar_2026_' + currentCalendar, JSON.stringify(state));
      // Sync to Firestore
      saveToFirestore(state);
    },

    load: function () {
      // Load from localStorage first (fast)
      var key = 'bigasscalendar_2026_' + currentCalendar;
      try {
        var raw = localStorage.getItem(key);
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
        // Update localStorage cache
        localStorage.setItem('bigasscalendar_2026_' + currentCalendar, JSON.stringify(data));
        callback(data);
      });
    },

    renderUI: function () {
      renderAuthUI();
      renderCalendarSwitcher();
    },

    // Called by app.js to register calendar switch handler
    _onCalendarSwitch: null,

    // Migrate existing localStorage data to 'oc' calendar
    migrateLocalData: function () {
      var oldKey = 'bigasscalendar_2026';
      var newKey = 'bigasscalendar_2026_oc';
      var oldData = localStorage.getItem(oldKey);
      var newData = localStorage.getItem(newKey);
      if (oldData && !newData) {
        localStorage.setItem(newKey, oldData);
        // Also push to Firestore if logged in
        if (currentUser) {
          try {
            var parsed = JSON.parse(oldData);
            var prevCal = currentCalendar;
            currentCalendar = 'oc';
            saveToFirestore(parsed);
            currentCalendar = prevCal;
          } catch (e) { /* ignore */ }
        }
      }
    }
  };

  // --- Auth State Listener ---
  auth.onAuthStateChanged(function (user) {
    currentUser = user;
    renderAuthUI();
    renderCalendarSwitcher();

    if (user) {
      // Migrate old localStorage data
      window.BACSync.migrateLocalData();

      // Load from Firestore and merge with local
      loadFromFirestore().then(function (cloudData) {
        if (cloudData) {
          // Update local cache
          localStorage.setItem('bigasscalendar_2026_' + currentCalendar, JSON.stringify(cloudData));
          // Notify app
          if (onStateChangeCallback) onStateChangeCallback(cloudData);
        } else {
          // First time: push local data to cloud
          var localRaw = localStorage.getItem('bigasscalendar_2026_' + currentCalendar);
          if (localRaw) {
            try { saveToFirestore(JSON.parse(localRaw)); } catch (e) { /* ignore */ }
          }
        }

        // Start real-time listener
        if (onStateChangeCallback) {
          listenToFirestore(function (data) {
            localStorage.setItem('bigasscalendar_2026_' + currentCalendar, JSON.stringify(data));
            onStateChangeCallback(data);
          });
        }
      });
    } else {
      stopListening();
    }
  });

})();
