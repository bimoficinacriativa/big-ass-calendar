/* ============================================
   THE BIG A## CALENDAR 2026 — App Logic
   ============================================ */
(function () {
  'use strict';

  // --- Constants ---
  const YEAR = 2026;
  const STORAGE_KEY_LEGACY = 'bigasscalendar_2026';
  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const CATEGORIES = [
    { key: 'adventure',  emoji: '\uD83C\uDFD4\uFE0F', color: '#0094D6' },
    { key: 'marriage',   emoji: '\uD83D\uDC91',       color: '#EC407A' },
    { key: 'health',     emoji: '\uD83D\uDCAA',       color: '#7CB342' },
    { key: 'kids',       emoji: '\uD83D\uDC76',       color: '#9791F1' },
    { key: 'business',   emoji: '\uD83D\uDCBC',       color: '#FF612E' },
    { key: 'personal',   emoji: '\uD83E\uDDD8',       color: '#FDD835' },
    { key: 'family',     emoji: '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66', color: '#E53935' },
    { key: 'finance',    emoji: '\uD83D\uDCB0',       color: '#00BCD4' },
  ];

  const I18N = {
    'pt-br': {
      months: ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'],
      days: ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'],
      categories: {
        adventure: 'Aventura', marriage: 'Casamento', health: 'Saúde & Fitness',
        kids: 'Filhos', business: 'Negócios', personal: 'Pessoal',
        family: 'Família', finance: 'Finanças Pessoais'
      },
      dashboard: 'Dashboard do Ano',
      eightBoxes: 'As 8 Caixas',
      misogiTitle: 'Misogi do Ano',
      noMisogi: 'Nenhum Misogi definido',
      defineMisogi: 'Definir Misogi',
      misogiName: 'O Grande Desafio',
      removeMisogi: 'Remover',
      miniAdventures: 'Mini-Aventuras',
      addAdventure: '+ Adicionar',
      adventureName: 'Aventura',
      adventureDate: 'Data',
      quarterlyHabits: 'Hábitos Trimestrais',
      blenderScore: 'Blender Score',
      seasons: 'Temporadas',
      pushSeason: 'Push',
      recoverySeason: 'Recovery',
      addSeason: '+ Temporada',
      seasonType: 'Tipo',
      exportJSON: 'Exportar JSON',
      importJSON: 'Importar JSON',
      resetAll: 'Resetar Tudo',
      newLabel: 'Nova Etiqueta',
      editLabel: 'Editar Etiqueta',
      labelText: 'Texto',
      labelCategory: 'Categoria',
      startDate: 'Início',
      endDate: 'Fim',
      markMisogi: 'Marcar como Misogi',
      markAdventure: 'Mini-Aventura',
      save: 'Salvar',
      delete: 'Excluir',
      undoDelete: 'Etiqueta excluída',
      undo: 'Desfazer',
      confirmReset: 'Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.',
      confirmReset2: 'ÚLTIMA CHANCE: Todos os dados serão perdidos permanentemente. Continuar?',
      events: 'eventos',
      daysUnit: 'dias',
      planned: 'planejadas',
      langToggle: 'EN',
      zoomYear: 'ANO',
      zoomMonth: 'MÊS',
      zoomWeek: 'SEMANA',
      zoomDay: 'DIA',
      zoomDayToday: 'HOJE',
      dayPriorities: 'PRIORIDADES',
      dayBrainDump: 'BRAIN DUMP',
      dayLabels: 'ETIQUETAS DO DIA',
      daySchedule: 'GRADE DE HORARIOS',
      dayHour: 'HORA',
      dayNoLabels: 'Sem etiquetas',
      dayPriorityPh: 'Prioridade...',
      dayBrainDumpPh: 'Ideias, lembretes, anotacoes...',
      gettingLight: 'Chegar Leve',
      gettingLightHint: 'Subtraia antes de planejar',
      gratitudeLetters: 'Cartas de Gratidão',
      gratitudeHint: '15-25 cartas escritas à mão',
      bdReminders: 'NÃO ESQUEÇA',
      bdTodos: 'TAREFAS',
      bdAddReminder: 'Lembrete',
      bdAddTodo: 'Tarefa',
      bdAddScript: 'Roteiro',
      bdSchedule: 'Agendar Nota',
      bdCancel: 'Cancelar',
      bdCreate: 'Criar',
      bdPlaceholder: 'Escreva uma nota...',
      weekAtAGlance: 'VISÃO DA SEMANA',
      weekQuestion: 'O que merece minha energia esta semana?',
      eveningScript: 'ROTEIRO DA NOITE',
      esFor: 'Para:',
      esEmpty: 'Monte seu roteiro para amanhã',
      esTimePlaceholder: '07:00',
      weekNumber: 'Semana',
      noReminders: 'Sem lembretes',
      noTasks: 'Sem tarefas',
    },
    'en': {
      months: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
      days: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
      categories: {
        adventure: 'Adventure', marriage: 'Marriage', health: 'Health & Fitness',
        kids: 'Kids', business: 'Business', personal: 'Personal',
        family: 'Family', finance: 'Personal Finance'
      },
      dashboard: 'Year Dashboard',
      eightBoxes: 'The 8 Boxes',
      misogiTitle: 'Year\'s Misogi',
      noMisogi: 'No Misogi set',
      defineMisogi: 'Set Misogi',
      misogiName: 'The Big Challenge',
      removeMisogi: 'Remove',
      miniAdventures: 'Mini-Adventures',
      addAdventure: '+ Add',
      adventureName: 'Adventure',
      adventureDate: 'Date',
      quarterlyHabits: 'Quarterly Habits',
      blenderScore: 'Blender Score',
      seasons: 'Seasons',
      pushSeason: 'Push',
      recoverySeason: 'Recovery',
      addSeason: '+ Season',
      seasonType: 'Type',
      exportJSON: 'Export JSON',
      importJSON: 'Import JSON',
      resetAll: 'Reset All',
      newLabel: 'New Label',
      editLabel: 'Edit Label',
      labelText: 'Text',
      labelCategory: 'Category',
      startDate: 'Start',
      endDate: 'End',
      markMisogi: 'Mark as Misogi',
      markAdventure: 'Mini-Adventure',
      save: 'Save',
      delete: 'Delete',
      undoDelete: 'Label deleted',
      undo: 'Undo',
      confirmReset: 'Are you sure you want to erase all data? This cannot be undone.',
      confirmReset2: 'LAST CHANCE: All data will be permanently lost. Continue?',
      events: 'events',
      daysUnit: 'days',
      planned: 'planned',
      langToggle: 'PT',
      zoomYear: 'YEAR',
      zoomMonth: 'MONTH',
      zoomWeek: 'WEEK',
      zoomDay: 'DAY',
      zoomDayToday: 'TODAY',
      dayPriorities: 'PRIORITIES',
      dayBrainDump: 'BRAIN DUMP',
      dayLabels: 'DAY LABELS',
      daySchedule: 'TIME GRID',
      dayHour: 'HOUR',
      dayNoLabels: 'No labels',
      dayPriorityPh: 'Priority...',
      dayBrainDumpPh: 'Ideas, reminders, notes...',
      gettingLight: 'Getting Light',
      gettingLightHint: 'Subtract before you plan',
      gratitudeLetters: 'Gratitude Letters',
      gratitudeHint: '15-25 handwritten letters',
      bdReminders: 'DON\'T FORGET',
      bdTodos: 'TASKS',
      bdAddReminder: 'Reminder',
      bdAddTodo: 'Task',
      bdAddScript: 'Script',
      bdSchedule: 'Schedule Note',
      bdCancel: 'Cancel',
      bdCreate: 'Create',
      bdPlaceholder: 'Write a note...',
      weekAtAGlance: 'WEEK AT A GLANCE',
      weekQuestion: 'What deserves my energy this week?',
      eveningScript: 'EVENING SCRIPT',
      esFor: 'For:',
      esEmpty: 'Plan your script for tomorrow',
      esTimePlaceholder: '07:00',
      weekNumber: 'Week',
      noReminders: 'No reminders',
      noTasks: 'No tasks',
    }
  };

  // --- State ---
  let state = loadState();
  let editingLabelId = null;
  let editingAdventureId = null;

  // Zoom state
  let zoomMode = 'year'; // 'year' | 'q1' | 'q2' | 'q3' | 'q4' | 'month' | 'week' | 'day'
  let zoomMonth = new Date().getMonth(); // 0-11, used in month/week mode
  let zoomWeekStart = null; // Date object for week mode
  let zoomDayDate = null; // Date string "YYYY-MM-DD" for day mode
  let dayHourInterval = null; // Interval for current-hour highlight
  let activeDayCatCell = null; // Currently active category picker cell
  let editingSeasonId = null;
  let selectedCategory = '';
  let filterStates = {}; // { categoryKey: 0|1|2 } — 0=neutral, 1=highlight, 2=isolated
  let cellElements = {}; // key: "M-D" → DOM element

  // Inline calendar state (label modal)
  let calMonth = new Date().getMonth();
  let calYear = YEAR;
  let dateTarget = 'start'; // 'start' or 'end'
  let modalStartDate = '';
  let modalEndDate = '';

  // --- Helpers ---
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function t(key) {
    return I18N[state.settings.lang][key] || key;
  }

  function catName(key) {
    return I18N[state.settings.lang].categories[key] || key;
  }

  function dayOfWeek(month, day) {
    return new Date(YEAR, month, day).getDay();
  }

  function dowLabel(dow) {
    return I18N[state.settings.lang].days[dow];
  }

  function monthLabel(m) {
    return I18N[state.settings.lang].months[m];
  }

  function dateToKey(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.getMonth() + '-' + d.getDate();
  }

  function keyToDate(key) {
    const [m, d] = key.split('-').map(Number);
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${YEAR}-${mm}-${dd}`;
  }

  function dateRange(start, end) {
    const keys = [];
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      if (d.getFullYear() === YEAR) {
        keys.push(d.getMonth() + '-' + d.getDate());
      }
    }
    return keys;
  }

  function textContrast(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? '#000000' : '#FFFFFF';
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function isToday(month, day) {
    const now = new Date();
    return now.getFullYear() === YEAR && now.getMonth() === month && now.getDate() === day;
  }

  // --- Persistence ---
  function defaultState() {
    return {
      labels: [],
      misogi: null,
      miniAdventures: [],
      quarterlyHabits: { q1: '', q2: '', q3: '', q4: '' },
      blenderScore: 5,
      seasons: [],
      brainDump: {},
      eveningScript: {},
      sidebarCollapsed: {},
      timeboxing: {},
      settings: { theme: 'blue', lang: 'pt-br' }
    };
  }

  function migrateLabels(labels) {
    const colorToCategory = {
      '#F4A261': 'adventure', '#E76F51': 'business', '#2A9D8F': 'finance',
      '#E53935': 'family', '#EC407A': 'marriage', '#7CB342': 'health',
      '#FDD835': 'personal', '#8E24AA': 'kids', '#9791F1': 'kids',
      '#0094D6': 'adventure', '#FF612E': 'business', '#00BCD4': 'finance',
      '#FCC0A0': 'marriage', '#B65B3D': 'personal', '#225C75': 'health',
      '#7BBBD7': 'kids', '#3B3B3B': 'family', '#ADADAD': 'finance',
    };
    return labels.map(label => {
      if (!label.category) {
        label.category = colorToCategory[label.color] || 'personal';
      }
      const cat = CATEGORIES.find(c => c.key === label.category);
      if (cat) label.color = cat.color;
      return label;
    });
  }

  function loadState() {
    try {
      // Try firebase sync first, then legacy key
      var raw = null;
      if (window.BACSync) {
        raw = window.BACSync.load();
        if (raw) {
          const s = Object.assign(defaultState(), raw);
          if (s.labels && s.labels.length > 0) s.labels = migrateLabels(s.labels);
          return s;
        }
      }
      // Fallback to legacy localStorage
      const legacyRaw = localStorage.getItem(STORAGE_KEY_LEGACY);
      if (legacyRaw) {
        const parsed = JSON.parse(legacyRaw);
        const s = Object.assign(defaultState(), parsed);
        if (s.labels && s.labels.length > 0) s.labels = migrateLabels(s.labels);
        return s;
      }
    } catch (e) { /* ignore */ }
    return defaultState();
  }

  function saveState() {
    if (window.BACSync) {
      window.BACSync.save(state);
    } else {
      localStorage.setItem(STORAGE_KEY_LEGACY, JSON.stringify(state));
    }
  }

  function reloadFromState(newData) {
    const s = Object.assign(defaultState(), newData);
    if (s.labels && s.labels.length > 0) s.labels = migrateLabels(s.labels);
    state = s;
    renderGrid();
    updateDashboard();
    if (typeof renderMonthView === 'function') renderMonthView();
    if (typeof renderWeekView === 'function') renderWeekView();
    if (zoomMode === 'day' && zoomDayDate) renderDayView(zoomDayDate);
  }

  // --- Grid Rendering ---
  function renderGrid() {
    const grid = document.getElementById('calendarGrid');
    grid.classList.remove('transposed');

    if (currentDevice === 'monitor-vertical') {
      return renderTransposedGrid();
    }

    grid.innerHTML = '';
    cellElements = {};

    // Corner cell
    const corner = document.createElement('div');
    corner.className = 'cell-corner';
    grid.appendChild(corner);

    // Day number headers (1-31)
    for (let d = 1; d <= 31; d++) {
      const hdr = document.createElement('div');
      hdr.className = 'cell-day-header';
      hdr.textContent = d;
      grid.appendChild(hdr);
    }

    // Rows: 12 months
    for (let m = 0; m < 12; m++) {
      // Month label
      const ml = document.createElement('div');
      ml.className = 'cell-month';
      ml.textContent = monthLabel(m);
      ml.setAttribute('data-month-idx', m);
      grid.appendChild(ml);

      const daysInMonth = DAYS_IN_MONTH[m];

      for (let d = 1; d <= 31; d++) {
        const cell = document.createElement('div');

        if (d > daysInMonth) {
          cell.className = 'cell empty';
          cell.setAttribute('aria-hidden', 'true');
          cell.setAttribute('data-row', m);
        } else {
          const dow = dayOfWeek(m, d);
          const isWeekend = dow === 0 || dow === 6;

          cell.className = 'cell' + (isWeekend ? ' weekend' : '');
          cell.setAttribute('data-month', m);
          cell.setAttribute('data-day', d);
          cell.setAttribute('role', 'button');
          cell.setAttribute('tabindex', '0');
          cell.setAttribute('aria-label', `${dowLabel(dow)} ${d} ${monthLabel(m)} ${YEAR}`);

          const hdr = document.createElement('div');
          hdr.className = 'cell-header';

          const numEl = document.createElement('span');
          numEl.className = 'cell-num';
          numEl.textContent = d;
          hdr.appendChild(numEl);

          const dowEl = document.createElement('span');
          dowEl.className = 'cell-dow';
          dowEl.textContent = dowLabel(dow);
          hdr.appendChild(dowEl);

          cell.appendChild(hdr);

          if (isToday(m, d)) {
            cell.classList.add('today');
          }

          cell.addEventListener('click', () => {
            if (['year','q1','q2','q3','q4'].includes(zoomMode)) {
              const key = m + '-' + d;
              const cellLabels = state.labels.filter(l => dateRange(l.startDate, l.endDate).includes(key));
              if (cellLabels.length > 0) {
                openCellPopup(cell, m, d, cellLabels);
                return;
              }
            }
            openLabelModal(m, d);
          });
          cell.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLabelModal(m, d);
            }
          });

          cellElements[m + '-' + d] = cell;
        }

        grid.appendChild(cell);
      }
    }

    renderLabelsOnGrid();
    renderSpecialMarkers();
  }

  function refreshActiveView() {
    if (zoomMode === 'day') {
      renderDayView(zoomDayDate);
    } else if (zoomMode === 'month') {
      renderMonthView(zoomMonth);
    } else if (zoomMode === 'week') {
      renderWeekView(zoomWeekStart);
    } else {
      renderLabelsOnGrid();
      renderSpecialMarkers();
    }
  }

  // --- Label Rendering ---

  function getLabelsPerCell() {
    var map = {};
    state.labels.forEach(function(label) {
      var keys = dateRange(label.startDate, label.endDate);
      var totalDays = keys.length;
      keys.forEach(function(key, i) {
        if (!map[key]) map[key] = [];
        map[key].push({ label: label, dayIndex: i, totalDays: totalDays });
      });
    });
    return map;
  }

  function formatLabelText(text) {
    return text.length <= 20 ? text.toUpperCase() : text;
  }

  function sortLabelsForCell(entries, viewType) {
    var solo = entries.filter(function(e) { return e.totalDays === 1; });
    var multi = entries.filter(function(e) { return e.totalDays > 1; });
    solo.sort(function(a, b) { return a.label.text.localeCompare(b.label.text); });

    if (viewType === 'month' || viewType === 'week') {
      // MÊS/SEMANA: multi-day on TOP (longer duration first), solo on BOTTOM
      multi.sort(function(a, b) {
        if (a.totalDays !== b.totalDays) return b.totalDays - a.totalDays;
        return a.label.startDate.localeCompare(b.label.startDate);
      });
      return multi.concat(solo);
    } else {
      // ANO/QUARTER: solo on top, multi-day below (shorter duration first)
      multi.sort(function(a, b) {
        if (a.totalDays !== b.totalDays) return a.totalDays - b.totalDays;
        return a.label.startDate.localeCompare(b.label.startDate);
      });
      return solo.concat(multi);
    }
  }

  function buildTooltipText(entries, m, d) {
    var dow = dowLabel(dayOfWeek(m, d));
    var mon = monthLabel(m);
    var header = d + ' ' + mon + ' ' + YEAR + ' (' + dow + ')';
    var lines = entries.map(function(e) {
      var cat = CATEGORIES.find(function(c) { return c.key === e.label.category; });
      var emoji = cat ? cat.emoji + ' ' : '';
      var range = '';
      if (e.totalDays > 1) {
        var sd = new Date(e.label.startDate + 'T00:00:00');
        var ed = new Date(e.label.endDate + 'T00:00:00');
        range = ' (' + sd.getDate() + '-' + ed.getDate() + ' ' + monthLabel(sd.getMonth()).toLowerCase() + ')';
      }
      return emoji + e.label.text + range;
    });
    return header + '\n' + lines.join('\n');
  }

  function getVisibleChar(label) {
    var cat = CATEGORIES.find(function(c) { return c.key === label.category; });
    return (cat && cat.emoji) ? cat.emoji : label.text.charAt(0).toUpperCase();
  }

  function renderCellLabels(cell, key, entries, viewType) {
    var sorted = sortLabelsForCell(entries, viewType);
    var maxVisible = { year: 6, quarter: 4, month: 5, week: 99 }[viewType] || 6;
    var visible = sorted.slice(0, maxVisible);
    var remaining = sorted.length - maxVisible;

    var stack = document.createElement('div');
    stack.className = 'labels-stack';

    visible.forEach(function(entry) {
      var cat = CATEGORIES.find(function(c) { return c.key === entry.label.category; });
      var color = cat ? cat.color : '#ADADAD';
      var block = document.createElement('div');
      block.className = 'label-block';
      block.dataset.category = entry.label.category;
      block.dataset.labelId = entry.label.id;
      block.style.backgroundColor = color;
      block.style.color = textContrast(color);

      var isFirstDay = entry.dayIndex === 0;

      if (viewType === 'year') {
        var charSpan = document.createElement('span');
        charSpan.className = 'label-char';
        charSpan.textContent = getVisibleChar(entry.label);
        block.appendChild(charSpan);
        if (visible.length <= 3) {
          block.dataset.height = 'visible';
        }
      } else if (viewType === 'quarter') {
        block.classList.add('quarter-label');
        if (isFirstDay) block.textContent = formatLabelText(entry.label.text);
      } else {
        // Month and Week: always text
        block.textContent = formatLabelText(entry.label.text);
      }

      block.title = (cat ? cat.emoji + ' ' : '') + entry.label.text;
      block.addEventListener('click', function(e) {
        e.stopPropagation();
        openEditLabelModal(entry.label.id);
      });

      stack.appendChild(block);
    });

    if (remaining > 0) {
      var overflow = document.createElement('div');
      overflow.className = 'labels-overflow';
      overflow.textContent = '+' + remaining;
      stack.appendChild(overflow);
    }

    cell.appendChild(stack);

    // Tooltip for year/quarter views
    if (viewType === 'year' || viewType === 'quarter') {
      var parts = key.split('-');
      stack.title = buildTooltipText(sorted, parseInt(parts[0]), parseInt(parts[1]));
    }
  }

  function renderLabelsOnGrid() {
    // Clear all label renderings
    document.querySelectorAll('.labels-stack').forEach(function(el) { el.remove(); });

    var labelsMap = getLabelsPerCell();
    var viewType = ['q1','q2','q3','q4'].includes(zoomMode) ? 'quarter' : 'year';

    Object.keys(labelsMap).forEach(function(key) {
      var cell = cellElements[key];
      if (!cell) return;
      renderCellLabels(cell, key, labelsMap[key], viewType);
    });

    applyFilters();
  }

  function renderSpecialMarkers() {
    // Clear existing markers
    document.querySelectorAll('.cell.misogi').forEach(c => c.classList.remove('misogi'));
    document.querySelectorAll('.cell.adventure').forEach(c => c.classList.remove('adventure'));
    document.querySelectorAll('.cell.push-season').forEach(c => c.classList.remove('push-season'));
    document.querySelectorAll('.cell.recovery-season').forEach(c => c.classList.remove('recovery-season'));

    // Misogi
    if (state.misogi) {
      const keys = dateRange(state.misogi.startDate, state.misogi.endDate);
      keys.forEach(key => {
        const cell = cellElements[key];
        if (cell) cell.classList.add('misogi');
      });
    }

    // Mini-Adventures
    state.miniAdventures.forEach(adv => {
      const key = dateToKey(adv.date);
      const cell = cellElements[key];
      if (cell) cell.classList.add('adventure');
    });

    // Seasons
    state.seasons.forEach(season => {
      const keys = dateRange(season.startDate, season.endDate);
      const cls = season.type === 'push' ? 'push-season' : 'recovery-season';
      keys.forEach(key => {
        const cell = cellElements[key];
        if (cell) cell.classList.add(cls);
      });
    });
  }

  // --- Label Modal ---
  function openLabelModal(month, day) {
    editingLabelId = null;
    const dateStr = keyToDate(month + '-' + day);

    document.getElementById('labelText').value = '';
    document.getElementById('labelMisogi').checked = false;
    document.getElementById('labelAdventure').checked = false;
    document.getElementById('btnDeleteLabel').hidden = true;

    selectedCategory = '';
    modalStartDate = dateStr;
    modalEndDate = dateStr;
    dateTarget = 'start';
    calMonth = month;
    calYear = YEAR;

    renderCategoryGrid();
    updateDateBtnValues();
    setDateTarget('start');
    renderInlineCalendar();
    updateCharCounter();
    updateSaveBtnColor();
    validateLabelForm();
    updateModalTitle(t('newLabel'));
    showModal('modalOverlay');
  }

  function openEditLabelModal(labelId) {
    const label = state.labels.find(l => l.id === labelId);
    if (!label) return;

    editingLabelId = labelId;

    document.getElementById('labelText').value = label.text;
    document.getElementById('labelMisogi').checked = false;
    document.getElementById('labelAdventure').checked = false;
    document.getElementById('btnDeleteLabel').hidden = false;

    selectedCategory = label.category || '';
    modalStartDate = label.startDate;
    modalEndDate = label.endDate;
    dateTarget = 'start';

    var parts = label.startDate.split('-');
    calMonth = parseInt(parts[1], 10) - 1;
    calYear = parseInt(parts[0], 10);

    renderCategoryGrid();
    updateDateBtnValues();
    setDateTarget('start');
    renderInlineCalendar();
    updateCharCounter();
    updateSaveBtnColor();
    validateLabelForm();
    updateModalTitle(t('editLabel'));
    showModal('modalOverlay');
  }

  function updateModalTitle(text) {
    var el = document.querySelector('#modalOverlay .modal-label-title');
    if (el) el.textContent = text;
  }

  function saveLabel() {
    const text = document.getElementById('labelText').value.trim();
    const startDate = modalStartDate;
    const endDate = modalEndDate;
    const category = selectedCategory;
    const isMisogi = document.getElementById('labelMisogi').checked;
    const isAdventure = document.getElementById('labelAdventure').checked;

    if (!text) {
      var input = document.getElementById('labelText');
      input.classList.add('shake');
      setTimeout(function() { input.classList.remove('shake'); }, 300);
      return;
    }
    if (!category) {
      var grid = document.getElementById('categoryGrid');
      grid.classList.add('shake');
      setTimeout(function() { grid.classList.remove('shake'); }, 300);
      return;
    }
    if (!startDate || !endDate) return;
    if (endDate < startDate) return;

    const cat = CATEGORIES.find(c => c.key === category);
    const color = cat ? cat.color : '#ADADAD';

    if (editingLabelId) {
      const label = state.labels.find(l => l.id === editingLabelId);
      if (label) {
        label.text = text;
        label.color = color;
        label.category = category;
        label.startDate = startDate;
        label.endDate = endDate;
      }
    } else {
      state.labels.push({
        id: uid(),
        text,
        color,
        category,
        startDate,
        endDate
      });
    }

    // Handle Misogi
    if (isMisogi) {
      state.misogi = { text, startDate, endDate };
    }

    // Handle Mini-Adventure
    if (isAdventure && state.miniAdventures.length < 6) {
      const exists = state.miniAdventures.some(a => a.date === startDate);
      if (!exists) {
        state.miniAdventures.push({ id: uid(), text, date: startDate });
      }
    }

    saveState();
    hideModal('modalOverlay');
    refreshActiveView();
    updateDashboard();
  }

  // --- Undo System ---
  let undoTimer = null;
  let undoLabel = null;

  function deleteLabel() {
    if (!editingLabelId) return;
    var deleted = state.labels.find(l => l.id === editingLabelId);
    state.labels = state.labels.filter(l => l.id !== editingLabelId);
    editingLabelId = null;
    saveState();
    hideModal('modalOverlay');
    refreshActiveView();
    updateDashboard();
    if (deleted) showUndoToast(deleted);
  }

  function showUndoToast(label) {
    // Remove any existing toast
    dismissUndoToast();
    undoLabel = label;

    var toast = document.createElement('div');
    toast.id = 'undoToast';
    toast.className = 'undo-toast';

    var cat = CATEGORIES.find(function(c) { return c.key === label.category; });
    var emoji = cat ? cat.emoji + ' ' : '';

    var msg = document.createElement('span');
    msg.className = 'undo-toast-msg';
    msg.textContent = t('undoDelete');
    toast.appendChild(msg);

    var preview = document.createElement('span');
    preview.className = 'undo-toast-preview';
    preview.textContent = emoji + label.text;
    toast.appendChild(preview);

    var btn = document.createElement('button');
    btn.className = 'undo-toast-btn';
    btn.textContent = t('undo');
    btn.addEventListener('click', function() {
      undoDeleteLabel();
    });
    toast.appendChild(btn);

    var closeBtn = document.createElement('button');
    closeBtn.className = 'undo-toast-close';
    closeBtn.textContent = '\u00D7';
    closeBtn.addEventListener('click', function() {
      dismissUndoToast();
    });
    toast.appendChild(closeBtn);

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(function() {
      toast.classList.add('undo-toast-visible');
    });

    // Auto-dismiss after 5s
    undoTimer = setTimeout(function() {
      dismissUndoToast();
    }, 5000);
  }

  function undoDeleteLabel() {
    if (!undoLabel) return;
    state.labels.push(undoLabel);
    saveState();
    refreshActiveView();
    updateDashboard();
    dismissUndoToast();
  }

  function dismissUndoToast() {
    if (undoTimer) {
      clearTimeout(undoTimer);
      undoTimer = null;
    }
    undoLabel = null;
    var toast = document.getElementById('undoToast');
    if (toast) {
      toast.classList.remove('undo-toast-visible');
      setTimeout(function() { toast.remove(); }, 200);
    }
  }

  // --- Category Grid (4x2 compact) ---
  function renderCategoryGrid() {
    var container = document.getElementById('categoryGrid');
    if (!container) return;
    container.innerHTML = '';

    CATEGORIES.forEach(function(cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      var isSelected = selectedCategory === cat.key;
      btn.className = 'category-btn' + (isSelected ? ' selected' : '');
      btn.dataset.category = cat.key;
      btn.style.setProperty('--category-color', cat.color);
      if (isSelected) {
        btn.style.backgroundColor = cat.color + '1F'; // ~12% opacity
        btn.style.boxShadow = '0 0 12px ' + cat.color + '33'; // ~20% opacity
      }
      btn.innerHTML = '<span class="emoji">' + cat.emoji + '</span>' +
        '<span class="name">' + catName(cat.key) + '</span>' +
        '<span class="color-dot" style="background:' + cat.color + '"></span>';
      btn.addEventListener('click', function() {
        selectedCategory = cat.key;
        renderCategoryGrid();
        updateSaveBtnColor();
        validateLabelForm();
      });
      container.appendChild(btn);
    });
  }

  // --- Inline Calendar & Date Helpers ---
  function updateSaveBtnColor() {
    var btn = document.getElementById('btnSaveLabel');
    if (!btn) return;
    var cat = CATEGORIES.find(function(c) { return c.key === selectedCategory; });
    if (cat) {
      btn.style.background = cat.color;
      btn.style.boxShadow = '0 2px 8px ' + cat.color + '4D';
    } else {
      btn.style.background = '';
      btn.style.boxShadow = '';
    }
  }

  function updateCharCounter() {
    var input = document.getElementById('labelText');
    var counter = document.getElementById('charCounter');
    if (!input || !counter) return;
    var len = input.value.length;
    counter.textContent = len + '/60';
    counter.classList.toggle('near-limit', len >= 50);
    validateLabelForm();
  }

  function validateLabelForm() {
    var btn = document.getElementById('btnSaveLabel');
    if (!btn) return;
    var text = document.getElementById('labelText').value.trim();
    var hasCategory = !!selectedCategory;
    var hasDate = !!modalStartDate;
    btn.disabled = !(text && hasCategory && hasDate);
  }

  function setDateTarget(target) {
    dateTarget = target;
    var startBtn = document.getElementById('dateStartBtn');
    var endBtn = document.getElementById('dateEndBtn');
    if (startBtn) startBtn.classList.toggle('active', target === 'start');
    if (endBtn) endBtn.classList.toggle('active', target === 'end');
  }

  function selectCalDate(dateStr) {
    if (dateTarget === 'start') {
      modalStartDate = dateStr;
      if (!modalEndDate || modalEndDate < dateStr) {
        modalEndDate = dateStr;
      }
      setDateTarget('end');
    } else {
      modalEndDate = dateStr;
      if (modalEndDate < modalStartDate) {
        var temp = modalStartDate;
        modalStartDate = modalEndDate;
        modalEndDate = temp;
      }
    }
    updateDateBtnValues();
    renderInlineCalendar();
    validateLabelForm();
  }

  function updateDateBtnValues() {
    var startEl = document.getElementById('dateStartValue');
    var endEl = document.getElementById('dateEndValue');
    if (startEl) {
      startEl.textContent = modalStartDate ? formatDateDisplay(modalStartDate) : '\u2014';
    }
    if (endEl) {
      endEl.textContent = modalEndDate ? formatDateDisplay(modalEndDate) : '\u2014';
    }
  }

  function formatDateDisplay(dateStr) {
    var parts = dateStr.split('-');
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10) - 1;
    var months = I18N[state.settings.lang].months;
    return day + ' ' + months[month];
  }

  function changeCalMonth(dir) {
    calMonth += dir;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderInlineCalendar();
  }

  function renderInlineCalendar() {
    var container = document.getElementById('inlineCalendar');
    if (!container) return;

    var firstDay = new Date(calYear, calMonth, 1);
    var lastDay = new Date(calYear, calMonth + 1, 0);
    var startWeekday = (firstDay.getDay() + 6) % 7; // Monday = 0

    var months = I18N[state.settings.lang].months;
    var weekdays = state.settings.lang === 'pt-br'
      ? ['SEG','TER','QUA','QUI','SEX','S\u00C1B','DOM']
      : ['MON','TUE','WED','THU','FRI','SAT','SUN'];

    var html = '<div class="cal-header">' +
      '<button type="button" class="nav-btn" id="calPrev">\u25C0</button>' +
      '<span class="month-year">' + months[calMonth] + ' ' + calYear + '</span>' +
      '<button type="button" class="nav-btn" id="calNext">\u25B6</button>' +
      '</div><div class="cal-weekdays">';

    weekdays.forEach(function(d) { html += '<span>' + d + '</span>'; });
    html += '</div><div class="cal-days">';

    // Previous month padding days
    var prevMonth = new Date(calYear, calMonth, 0);
    for (var i = startWeekday - 1; i >= 0; i--) {
      html += '<div class="cal-day other-month">' + (prevMonth.getDate() - i) + '</div>';
    }

    // Current month days
    var today = new Date();
    var startD = modalStartDate ? new Date(modalStartDate + 'T00:00:00') : null;
    var endD = modalEndDate ? new Date(modalEndDate + 'T00:00:00') : null;

    for (var d = 1; d <= lastDay.getDate(); d++) {
      var date = new Date(calYear, calMonth, d);
      var mm = String(calMonth + 1).padStart(2, '0');
      var dd = String(d).padStart(2, '0');
      var ds = calYear + '-' + mm + '-' + dd;

      var isToday = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
      var isStart = startD && date.getTime() === startD.getTime();
      var isEnd = endD && date.getTime() === endD.getTime();
      var isInRange = startD && endD && date > startD && date < endD;
      var isWeekend = date.getDay() === 0 || date.getDay() === 6;
      var isSame = isStart && isEnd;

      var cls = 'cal-day';
      if (isToday) cls += ' today';
      if (isSame) {
        cls += ' selected';
      } else {
        if (isStart) cls += ' selected range-start';
        if (isEnd) cls += ' selected range-end';
      }
      if (isInRange) cls += ' in-range';
      if (isWeekend) cls += ' weekend';

      html += '<div class="' + cls + '" data-date="' + ds + '">' + d + '</div>';
    }

    // Next month padding days
    var totalCells = startWeekday + lastDay.getDate();
    var remaining = (7 - (totalCells % 7)) % 7;
    for (var d = 1; d <= remaining; d++) {
      html += '<div class="cal-day other-month">' + d + '</div>';
    }

    html += '</div>';
    container.innerHTML = html;

    // Bind calendar events
    document.getElementById('calPrev').addEventListener('click', function() { changeCalMonth(-1); });
    document.getElementById('calNext').addEventListener('click', function() { changeCalMonth(1); });
    container.querySelectorAll('.cal-day:not(.other-month)').forEach(function(el) {
      el.addEventListener('click', function() {
        if (el.dataset.date) selectCalDate(el.dataset.date);
      });
    });
  }

  // --- Modal Helpers ---
  function showModal(id) {
    closeCellPopup();
    const overlay = document.getElementById(id);
    overlay.hidden = false;
    // Focus first input
    requestAnimationFrame(() => {
      const input = overlay.querySelector('input[type="text"], input[type="date"], select');
      if (input) input.focus();
    });
  }

  function hideModal(id) {
    var overlay = document.getElementById(id);
    if (id === 'modalOverlay') {
      var modal = overlay.querySelector('.modal');
      if (modal) {
        modal.classList.add('closing');
        overlay.classList.add('closing');
        setTimeout(function() {
          overlay.hidden = true;
          modal.classList.remove('closing');
          overlay.classList.remove('closing');
        }, 200);
        return;
      }
    }
    overlay.hidden = true;
  }

  function setupModalClose(overlayId, closeBtnId) {
    const overlay = document.getElementById(overlayId);
    const btn = document.getElementById(closeBtnId);

    btn.addEventListener('click', () => hideModal(overlayId));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) hideModal(overlayId);
    });

    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideModal(overlayId);
    });
  }

  // --- Misogi Modal ---
  function openMisogiModal() {
    if (state.misogi) {
      document.getElementById('misogiText').value = state.misogi.text;
      document.getElementById('misogiStart').value = state.misogi.startDate;
      document.getElementById('misogiEnd').value = state.misogi.endDate;
      document.getElementById('btnDeleteMisogi').hidden = false;
    } else {
      document.getElementById('misogiText').value = '';
      document.getElementById('misogiStart').value = '';
      document.getElementById('misogiEnd').value = '';
      document.getElementById('btnDeleteMisogi').hidden = true;
    }
    showModal('misogiModalOverlay');
  }

  function saveMisogi() {
    const text = document.getElementById('misogiText').value.trim();
    const start = document.getElementById('misogiStart').value;
    const end = document.getElementById('misogiEnd').value;

    if (!text || !start) return;

    state.misogi = { text, startDate: start, endDate: end || start };
    saveState();
    hideModal('misogiModalOverlay');
    renderSpecialMarkers();
    updateDashboard();
  }

  function deleteMisogi() {
    state.misogi = null;
    saveState();
    hideModal('misogiModalOverlay');
    renderSpecialMarkers();
    updateDashboard();
  }

  // --- Adventure Modal ---
  function openAdventureModal(adventureId) {
    editingAdventureId = adventureId || null;

    if (adventureId) {
      const adv = state.miniAdventures.find(a => a.id === adventureId);
      if (adv) {
        document.getElementById('adventureText').value = adv.text;
        document.getElementById('adventureDate').value = adv.date;
        document.getElementById('btnDeleteAdventure').hidden = false;
      }
    } else {
      document.getElementById('adventureText').value = '';
      document.getElementById('adventureDate').value = '';
      document.getElementById('btnDeleteAdventure').hidden = true;
    }

    showModal('adventureModalOverlay');
  }

  function saveAdventure() {
    const text = document.getElementById('adventureText').value.trim();
    const date = document.getElementById('adventureDate').value;

    if (!text || !date) return;

    if (editingAdventureId) {
      const adv = state.miniAdventures.find(a => a.id === editingAdventureId);
      if (adv) {
        adv.text = text;
        adv.date = date;
      }
    } else {
      if (state.miniAdventures.length >= 6) return;
      state.miniAdventures.push({ id: uid(), text, date });
    }

    editingAdventureId = null;
    saveState();
    hideModal('adventureModalOverlay');
    renderSpecialMarkers();
    updateDashboard();
  }

  function deleteAdventure() {
    if (!editingAdventureId) return;
    state.miniAdventures = state.miniAdventures.filter(a => a.id !== editingAdventureId);
    editingAdventureId = null;
    saveState();
    hideModal('adventureModalOverlay');
    renderSpecialMarkers();
    updateDashboard();
  }

  // --- Season Modal ---
  function openSeasonModal(seasonId) {
    editingSeasonId = seasonId || null;

    if (seasonId) {
      const s = state.seasons.find(s => s.id === seasonId);
      if (s) {
        document.getElementById('seasonType').value = s.type;
        document.getElementById('seasonStart').value = s.startDate;
        document.getElementById('seasonEnd').value = s.endDate;
        document.getElementById('btnDeleteSeason').hidden = false;
      }
    } else {
      document.getElementById('seasonType').value = 'push';
      document.getElementById('seasonStart').value = '';
      document.getElementById('seasonEnd').value = '';
      document.getElementById('btnDeleteSeason').hidden = true;
    }

    showModal('seasonModalOverlay');
  }

  function saveSeason() {
    const type = document.getElementById('seasonType').value;
    const start = document.getElementById('seasonStart').value;
    const end = document.getElementById('seasonEnd').value;

    if (!start || !end) return;

    if (editingSeasonId) {
      const s = state.seasons.find(s => s.id === editingSeasonId);
      if (s) {
        s.type = type;
        s.startDate = start;
        s.endDate = end;
      }
    } else {
      state.seasons.push({ id: uid(), type, startDate: start, endDate: end });
    }

    editingSeasonId = null;
    saveState();
    hideModal('seasonModalOverlay');
    renderSpecialMarkers();
    updateDashboard();
  }

  function deleteSeason() {
    if (!editingSeasonId) return;
    state.seasons = state.seasons.filter(s => s.id !== editingSeasonId);
    editingSeasonId = null;
    saveState();
    hideModal('seasonModalOverlay');
    renderSpecialMarkers();
    updateDashboard();
  }

  // --- Dashboard ---
  function updateDashboard() {
    // 8 Boxes summary
    const boxesList = document.getElementById('boxesList');
    boxesList.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const count = state.labels.filter(l => l.category === cat.key).length;
      const totalDays = state.labels
        .filter(l => l.category === cat.key)
        .reduce((sum, l) => sum + dateRange(l.startDate, l.endDate).length, 0);

      const li = document.createElement('li');
      li.className = 'box-item';
      li.innerHTML = `
        <span class="box-color" style="background:${cat.color}"></span>
        <span>${cat.emoji} ${catName(cat.key)}</span>
        <span class="box-count">${count} ${t('events')} · ${totalDays} ${t('daysUnit')}</span>
      `;
      boxesList.appendChild(li);
    });

    // Misogi
    const misogiDisplay = document.getElementById('misogiDisplay');
    if (state.misogi) {
      misogiDisplay.className = 'misogi-display has-misogi';
      misogiDisplay.innerHTML = `<span class="misogi-star">\u2B50</span> ${state.misogi.text}<br><small>${state.misogi.startDate} → ${state.misogi.endDate}</small>`;
    } else {
      misogiDisplay.className = 'misogi-display';
      misogiDisplay.innerHTML = `<p class="empty-state">${t('noMisogi')}</p>`;
    }

    // Mini-Adventures
    document.getElementById('adventureCounter').textContent =
      `${state.miniAdventures.length}/6`;

    const advList = document.getElementById('adventuresList');
    advList.innerHTML = '';
    state.miniAdventures.forEach(adv => {
      const li = document.createElement('li');
      li.className = 'adventure-item';
      li.innerHTML = `<span>\u26A1 ${adv.text}</span><span>${adv.date}</span>`;
      li.addEventListener('click', () => openAdventureModal(adv.id));
      advList.appendChild(li);
    });

    // Quarterly Habits
    document.getElementById('habitQ1').value = state.quarterlyHabits.q1;
    document.getElementById('habitQ2').value = state.quarterlyHabits.q2;
    document.getElementById('habitQ3').value = state.quarterlyHabits.q3;
    document.getElementById('habitQ4').value = state.quarterlyHabits.q4;

    // Blender Score
    document.getElementById('blenderSlider').value = state.blenderScore;
    document.getElementById('blenderValue').textContent = state.blenderScore;

    // Seasons
    const seasonsList = document.getElementById('seasonsList');
    seasonsList.innerHTML = '';
    state.seasons.forEach(season => {
      const li = document.createElement('li');
      li.className = 'season-item';
      const badge = season.type === 'push' ? '\uD83D\uDD34 Push' : '\uD83D\uDFE2 Recovery';
      li.innerHTML = `<span>${badge}</span><span>${season.startDate} → ${season.endDate}</span>`;
      li.addEventListener('click', () => openSeasonModal(season.id));
      seasonsList.appendChild(li);
    });
  }

  // --- Theme ---
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.settings.theme = theme;

    // Update active theme button
    document.querySelectorAll('.theme-dot').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });

    // Update meta theme-color
    const colors = {
      peach: '#B65B3D', orange: '#FF612E', brown: '#B65B3D',
      lightblue: '#225C75', blue: '#0094D6', teal: '#225C75',
      white: '#212121', silver: '#3B3B3B', gray: '#3B3B3B',
      darkgray: '#3B3B3B', charcoal: '#0094D6', black: '#000000'
    };
    document.querySelector('meta[name="theme-color"]').content = colors[theme] || '#1565C0';

    saveState();
  }

  // --- Category Filters (3-state: neutral → highlight → isolated → neutral) ---
  function toggleFilter(catKey) {
    var current = filterStates[catKey] || 0;
    var next = (current + 1) % 3;
    if (next === 0) {
      delete filterStates[catKey];
    } else {
      filterStates[catKey] = next;
    }
    applyFilters();
    renderFilterDots();
    renderFilterTooltips();
  }

  function clearAllFilters() {
    filterStates = {};
    applyFilters();
    renderFilterDots();
    renderFilterTooltips();
  }

  function applyFilters() {
    var hasAny = Object.keys(filterStates).length > 0;
    var hasIsolated = Object.values(filterStates).includes(2);

    document.querySelectorAll('.label-block').forEach(function(block) {
      var cat = block.dataset.category;
      var st = filterStates[cat] || 0;

      block.classList.remove('highlighted', 'dimmed', 'isolated', 'hidden-by-filter');

      if (!hasAny) return; // all normal

      if (st === 2) {
        block.classList.add('isolated');
      } else if (st === 1) {
        block.classList.add('highlighted');
      } else if (hasIsolated) {
        block.classList.add('hidden-by-filter');
      } else {
        block.classList.add('dimmed');
      }
    });

    // Show/hide clear button
    var clearBtn = document.getElementById('filterClearBtn');
    if (clearBtn) clearBtn.style.display = hasAny ? 'inline-flex' : 'none';
  }

  function renderFilterDots() {
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
      var cat = btn.getAttribute('data-category');
      var st = filterStates[cat] || 0;
      var dot = btn.querySelector('.filter-dot');
      btn.classList.remove('active');
      if (dot) {
        dot.classList.remove('highlight-active', 'isolated-active');
        if (st === 1) dot.classList.add('highlight-active');
        if (st === 2) dot.classList.add('isolated-active');
      }
      if (st > 0) btn.classList.add('active');
    });
  }

  function renderFilterTooltips() {
    var lang = state.settings.lang;
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
      var catKey = btn.getAttribute('data-category');
      var name = catName(catKey);
      var st = filterStates[catKey] || 0;
      if (st === 0) {
        btn.title = (lang === 'pt-br' ? 'Filtrar: ' : 'Filter: ') + name;
      } else if (st === 1) {
        btn.title = name + (lang === 'pt-br' ? ' em destaque (clique para isolar)' : ' highlighted (click to isolate)');
      } else {
        btn.title = (lang === 'pt-br' ? 'Apenas ' : '') + name + (lang === 'pt-br' ? ' (clique para limpar)' : ' only (click to clear)');
      }
    });
  }

  // --- Language ---
  function setLang(lang) {
    state.settings.lang = lang;
    document.documentElement.lang = lang === 'pt-br' ? 'pt-BR' : 'en';
    document.getElementById('btnLang').textContent = t('langToggle');
    saveState();

    // Re-render everything
    renderGrid();
    renderFilterTooltips();
    updateDashboard();
    updateI18nTexts();
    setZoom(zoomMode); // re-apply zoom after re-render
  }

  function updateI18nTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (translated && translated !== key) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translated;
        } else {
          el.textContent = translated;
        }
      }
    });
  }

  // --- Export / Import / Reset ---
  function exportJSON() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bigasscalendar_2026_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        state = Object.assign(defaultState(), imported);
        if (state.labels && state.labels.length > 0) {
          state.labels = migrateLabels(state.labels);
        }
        saveState();
        setTheme(state.settings.theme);
        renderGrid();
        updateDashboard();
        updateI18nTexts();
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    if (!confirm(t('confirmReset'))) return;
    if (!confirm(t('confirmReset2'))) return;

    state = defaultState();
    saveState();
    setTheme('blue');
    renderGrid();
    updateDashboard();
    updateI18nTexts();
  }

  // --- Today Indicator Auto-Update ---
  function updateTodayIndicator() {
    document.querySelectorAll('.cell.today').forEach(c => c.classList.remove('today'));

    const now = new Date();
    if (now.getFullYear() === YEAR) {
      const key = now.getMonth() + '-' + now.getDate();
      const cell = cellElements[key];
      if (cell) cell.classList.add('today');
    }
  }

  // --- Zoom System ---
  const QUARTER_MONTHS = {
    q1: [0, 1, 2], q2: [3, 4, 5], q3: [6, 7, 8], q4: [9, 10, 11]
  };

  function getWeekStartForDate(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0=Sun
    d.setDate(d.getDate() - day);
    return d;
  }

  function getWeekDays(startDate) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      if (d.getFullYear() === YEAR) {
        days.push({ month: d.getMonth(), day: d.getDate() });
      }
    }
    return days;
  }

  const FULL_DAYS = {
    'pt-br': ['DOMINGO','SEGUNDA','TERÇA','QUARTA','QUINTA','SEXTA','SÁBADO'],
    'en': ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
  };

  function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  function setZoom(mode, param) {
    zoomMode = mode;

    const viewYear = document.getElementById('viewYear');
    const viewMonth = document.getElementById('viewMonth');
    const viewWeek = document.getElementById('viewWeek');
    const viewDay = document.getElementById('viewDay');

    // Hide all views
    viewYear.hidden = true;
    viewMonth.hidden = true;
    viewWeek.hidden = true;
    viewDay.hidden = true;

    // Hide zoom-bar nav elements
    document.getElementById('monthNav').style.display = 'none';
    document.getElementById('weekNav').style.display = 'none';
    document.getElementById('dayNav').style.display = 'none';

    // Clear day view interval when leaving day mode
    if (mode !== 'day' && dayHourInterval) {
      clearInterval(dayHourInterval);
      dayHourInterval = null;
    }

    // Show Q buttons only in year-like modes
    const isYearMode = ['year','q1','q2','q3','q4'].includes(mode);

    if (mode === 'day') {
      // --- DAY VIEW (Timeboxing) ---
      if (param) {
        zoomDayDate = param;
      } else if (!zoomDayDate) {
        zoomDayDate = formatDateISO(new Date());
      }
      viewDay.hidden = false;
      document.getElementById('dayNav').style.display = '';
      renderDayView(zoomDayDate);

    } else if (mode === 'month') {
      // --- MONTH VIEW ---
      if (param !== undefined) zoomMonth = param;
      viewMonth.hidden = false;
      renderMonthView(zoomMonth);

    } else if (mode === 'week') {
      // --- WEEK VIEW ---
      if (param) {
        zoomWeekStart = param;
      } else if (!zoomWeekStart) {
        zoomWeekStart = getWeekStartForDate(new Date());
      }
      viewWeek.hidden = false;
      renderWeekView(zoomWeekStart);

    } else {
      // --- YEAR VIEW (year, q1-q4) ---
      viewYear.hidden = false;
      const grid = document.getElementById('calendarGrid');

      let visibleMonths;
      if (['q1','q2','q3','q4'].includes(mode)) {
        visibleMonths = QUARTER_MONTHS[mode];
      } else {
        visibleMonths = [0,1,2,3,4,5,6,7,8,9,10,11];
      }

      for (let m = 0; m < 12; m++) {
        const isVisible = visibleMonths.includes(m);
        const ml = grid.querySelector(`[data-month-idx="${m}"]`);
        if (ml) ml.style.display = isVisible ? '' : 'none';
        grid.querySelectorAll(`[data-month="${m}"]`).forEach(c => {
          c.style.display = isVisible ? '' : 'none';
        });
        grid.querySelectorAll(`.cell.empty[data-row="${m}"]`).forEach(c => {
          c.style.display = isVisible ? '' : 'none';
        });
      }
      grid.style.gridTemplateRows = `auto repeat(${visibleMonths.length}, 1fr)`;

      // Re-render labels for year/quarter mode
      renderLabelsOnGrid();
      renderSpecialMarkers();
    }

    // Update zoom bar active state
    document.querySelectorAll('.zoom-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.zoom === mode);
    });

    // Brain dump visibility
    updateBrainDumpVisibility();
    if (brainDumpOpen && (mode === 'month' || mode === 'week')) {
      renderBrainDump();
    }
  }

  // --- MONTH VIEW RENDERER ---
  function renderMonthView(month) {
    const grid = document.getElementById('monthGrid');
    grid.innerHTML = '';

    const lang = state.settings.lang;
    const fullDays = FULL_DAYS[lang];
    const daysInMonth = DAYS_IN_MONTH[month];
    const firstDow = dayOfWeek(month, 1); // 0=Sun

    // Title
    document.getElementById('mvTitle').textContent =
      monthLabel(month).toUpperCase() + ' ' + YEAR;

    // Day-of-week headers
    for (let d = 0; d < 7; d++) {
      const hdr = document.createElement('div');
      hdr.className = 'mv-dow-header' + (d === 0 || d === 6 ? ' weekend' : '');
      hdr.textContent = fullDays[d];
      grid.appendChild(hdr);
    }

    // Empty cells before day 1
    for (let i = 0; i < firstDow; i++) {
      const empty = document.createElement('div');
      empty.className = 'mv-cell empty';
      grid.appendChild(empty);
    }

    // Day cells
    var allLabelsMap = getLabelsPerCell();
    for (let day = 1; day <= daysInMonth; day++) {
      const dow = dayOfWeek(month, day);
      const cell = document.createElement('div');
      cell.className = 'mv-cell' + (dow === 0 || dow === 6 ? ' weekend' : '');

      if (isToday(month, day)) cell.classList.add('today');

      const num = document.createElement('div');
      num.className = 'mv-day-num';
      num.textContent = day;
      cell.appendChild(num);

      // Render labels for this day
      const key = month + '-' + day;
      if (allLabelsMap[key]) {
        renderCellLabels(cell, key, allLabelsMap[key], 'month');
      }

      // Misogi marker
      if (state.misogi) {
        const mKeys = dateRange(state.misogi.startDate, state.misogi.endDate);
        if (mKeys.includes(key)) cell.classList.add('misogi');
      }

      cell.addEventListener('click', () => openLabelModal(month, day));
      setupCellDropZone(cell, month, day);
      grid.appendChild(cell);
    }

    // Empty cells after last day
    const totalCells = firstDow + daysInMonth;
    const remainder = totalCells % 7;
    if (remainder > 0) {
      for (let i = 0; i < 7 - remainder; i++) {
        const empty = document.createElement('div');
        empty.className = 'mv-cell empty';
        grid.appendChild(empty);
      }
    }

    // Set grid rows dynamically
    const weeks = Math.ceil((firstDow + daysInMonth) / 7);
    grid.style.gridTemplateRows = `auto repeat(${weeks}, 1fr)`;
    applyFilters();
  }

  // --- WEEK VIEW RENDERER ---
  function renderWeekView(startDate) {
    const grid = document.getElementById('weekGrid');
    const alt = document.getElementById('weekViewContent');

    // Title (shared for all renderers)
    const end = new Date(startDate);
    end.setDate(end.getDate() + 6);
    const fmt = (d) => `${d.getDate()}/${d.getMonth() + 1}`;
    document.getElementById('wvTitle').textContent = `${fmt(startDate)} — ${fmt(end)}`;
    const weekNum = getISOWeek(startDate);
    document.getElementById('wvNumber').textContent =
      (state.settings.lang === 'pt-br' ? 'SEMANA' : 'WEEK') + ` ${weekNum}/52`;

    // Choose renderer based on device
    if (currentDevice === 'iphone-portrait') {
      grid.innerHTML = '';
      grid.hidden = true;
      alt.hidden = false;
      renderWeekViewMobile(startDate);
      return;
    } else if (currentDevice === 'monitor-vertical') {
      grid.innerHTML = '';
      grid.hidden = true;
      alt.hidden = false;
      renderWeekViewStacked(startDate);
      return;
    }

    grid.hidden = false;
    alt.hidden = true;
    alt.innerHTML = '';
    grid.innerHTML = '';

    const days = getWeekDays(startDate);
    var wkLabelsMap = getLabelsPerCell();

    // 7 columns
    for (let i = 0; i < 7; i++) {
      const col = document.createElement('div');
      col.className = 'wv-column';

      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const m = d.getMonth();
      const day = d.getDate();
      const dow = d.getDay();

      if (dow === 0 || dow === 6) col.classList.add('weekend');
      if (d.getFullYear() === YEAR && isToday(m, day)) col.classList.add('today');

      // Header
      const hdr = document.createElement('div');
      hdr.className = 'wv-col-header';

      const dowSpan = document.createElement('div');
      dowSpan.className = 'wv-col-dow';
      dowSpan.textContent = dowLabel(dow);
      hdr.appendChild(dowSpan);

      const numSpan = document.createElement('div');
      numSpan.className = 'wv-col-num';
      numSpan.textContent = day;
      hdr.appendChild(numSpan);

      col.appendChild(hdr);

      // Body
      const body = document.createElement('div');
      body.className = 'wv-col-body';

      // Render labels for this day
      if (d.getFullYear() === YEAR) {
        const key = m + '-' + day;
        if (wkLabelsMap[key]) {
          renderCellLabels(body, key, wkLabelsMap[key], 'week');
        }

        body.addEventListener('click', () => openLabelModal(m, day));
        setupCellDropZone(body, m, day);
      }

      col.appendChild(body);
      grid.appendChild(col);
    }
    applyFilters();
  }

  function zoomMonthPrev() {
    zoomMonth = (zoomMonth - 1 + 12) % 12;
    setZoom('month');
  }

  function zoomMonthNext() {
    zoomMonth = (zoomMonth + 1) % 12;
    setZoom('month');
  }

  function zoomWeekPrev() {
    const d = new Date(zoomWeekStart);
    d.setDate(d.getDate() - 7);
    if (d.getFullYear() >= YEAR - 1) {
      zoomWeekStart = getWeekStartForDate(d);
      setZoom('week', zoomWeekStart);
    }
  }

  function zoomWeekNext() {
    const d = new Date(zoomWeekStart);
    d.setDate(d.getDate() + 7);
    if (d.getFullYear() <= YEAR + 1) {
      zoomWeekStart = getWeekStartForDate(d);
      setZoom('week', zoomWeekStart);
    }
  }

  // --- DAY VIEW (Timeboxing) ---
  var DAY_START_HOUR = 5;
  var DAY_END_HOUR = 23;

  var FULL_DAYS_LONG = {
    'pt-br': ['DOMINGO','SEGUNDA-FEIRA','TERÇA-FEIRA','QUARTA-FEIRA','QUINTA-FEIRA','SEXTA-FEIRA','SÁBADO'],
    'en': ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
  };

  var MONTH_NAMES_LONG = {
    'pt-br': ['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO','JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO'],
    'en': ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
  };

  function formatDateISO(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function parseDateISO(str) {
    var parts = str.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12, 0, 0);
  }

  function getTimeboxingDay(dateStr) {
    if (!state.timeboxing) state.timeboxing = {};
    if (!state.timeboxing[dateStr]) {
      state.timeboxing[dateStr] = { priorities: ['', '', ''], prioritiesDone: [false, false, false], braindump: '', schedule: {} };
    }
    // Migration: ensure prioritiesDone exists for old data
    if (!state.timeboxing[dateStr].prioritiesDone) {
      state.timeboxing[dateStr].prioritiesDone = [false, false, false];
    }
    return state.timeboxing[dateStr];
  }

  function saveTimeboxingField(dateStr, field, value) {
    var day = getTimeboxingDay(dateStr);
    day[field] = value;
    saveState();
  }

  function saveTimeboxingSchedule(dateStr, key, text, category, done) {
    var day = getTimeboxingDay(dateStr);
    if (!text && !category) {
      delete day.schedule[key];
    } else {
      day.schedule[key] = { text: text || '', category: category || '', done: !!done };
    }
    // Clean up empty day entries
    if (!day.priorities.some(function(p) { return p; }) && !day.braindump && Object.keys(day.schedule).length === 0) {
      delete state.timeboxing[dateStr];
    }
    saveState();
  }

  function renderDayView(dateStr) {
    var d = parseDateISO(dateStr);
    var lang = state.settings.lang;
    var dow = d.getDay();
    var dayNum = d.getDate();
    var month = d.getMonth();

    // Update header
    document.getElementById('dvTitle').textContent = FULL_DAYS_LONG[lang][dow];
    document.getElementById('dvDate').textContent =
      dayNum + ' ' + (lang === 'pt-br' ? 'DE ' : '') + MONTH_NAMES_LONG[lang][month] + ' ' + d.getFullYear();

    // Update nav label
    document.getElementById('dayNavLabel').textContent =
      dayNum + ' ' + I18N[lang].months[month];

    // Load day data
    var dayData = getTimeboxingDay(dateStr);

    // --- Priorities ---
    document.querySelectorAll('.day-priority-input').forEach(function(input) {
      var idx = parseInt(input.dataset.priority, 10);
      var item = input.closest('.day-priority-item');
      input.value = dayData.priorities[idx] || '';
      input.placeholder = t('dayPriorityPh');

      // Done toggle for priority
      var existingToggle = item.querySelector('.day-done-toggle');
      if (!existingToggle) {
        existingToggle = document.createElement('div');
        existingToggle.className = 'day-done-toggle';
        item.insertBefore(existingToggle, input);
      }

      // Restore done state
      if (dayData.prioritiesDone[idx]) {
        item.classList.add('done');
      } else {
        item.classList.remove('done');
      }

      // Remove old listeners by cloning
      var clone = input.cloneNode(true);
      input.parentNode.replaceChild(clone, input);

      // Clone toggle too to remove old listeners
      var toggleClone = existingToggle.cloneNode(true);
      existingToggle.parentNode.replaceChild(toggleClone, existingToggle);

      toggleClone.addEventListener('click', function() {
        var data = getTimeboxingDay(dateStr);
        var i = parseInt(clone.dataset.priority, 10);
        if (!data.priorities[i]) return;
        data.prioritiesDone[i] = !data.prioritiesDone[i];
        item.classList.toggle('done', data.prioritiesDone[i]);
        saveState();
      });

      clone.addEventListener('input', function() {
        var data = getTimeboxingDay(dateStr);
        var i = parseInt(clone.dataset.priority, 10);
        data.priorities[i] = clone.value;
        if (!clone.value) {
          data.prioritiesDone[i] = false;
          item.classList.remove('done');
        }
        saveState();
      });
    });

    // --- Brain dump ---
    var bd = document.getElementById('dayBraindump');
    bd.value = dayData.braindump || '';
    bd.placeholder = t('dayBrainDumpPh');
    var bdClone = bd.cloneNode(true);
    bd.parentNode.replaceChild(bdClone, bd);
    bdClone.addEventListener('input', function() {
      saveTimeboxingField(dateStr, 'braindump', bdClone.value);
    });

    // --- Labels for this day ---
    renderDayLabels(dateStr, month, dayNum);

    // --- Schedule grid ---
    buildDaySchedule(dateStr);

    // --- Current hour highlight ---
    highlightDayCurrentHour(dateStr);
    if (dayHourInterval) clearInterval(dayHourInterval);
    dayHourInterval = setInterval(function() { highlightDayCurrentHour(dateStr); }, 60000);

    // Scroll to current hour
    scrollDayToCurrentHour(dateStr);
  }

  function renderDayLabels(dateStr, month, dayNum) {
    var list = document.getElementById('dayLabelsList');
    list.innerHTML = '';
    var key = month + '-' + dayNum;

    var dayLabels = state.labels.filter(function(l) {
      return dateRange(l.startDate, l.endDate).includes(key);
    });

    if (dayLabels.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'day-label-chip';
      empty.style.opacity = '0.4';
      empty.style.cursor = 'default';
      empty.textContent = t('dayNoLabels');
      list.appendChild(empty);
      return;
    }

    dayLabels.forEach(function(label) {
      var chip = document.createElement('div');
      chip.className = 'day-label-chip';
      chip.style.background = label.color;
      chip.style.color = textContrast(label.color);

      var cat = CATEGORIES.find(function(c) { return c.key === label.category; });
      if (cat) {
        var emoji = document.createElement('span');
        emoji.className = 'label-emoji';
        emoji.textContent = cat.emoji + ' ';
        chip.appendChild(emoji);
      }

      chip.appendChild(document.createTextNode(label.text));
      chip.addEventListener('click', function() { openEditLabelModal(label.id); });
      list.appendChild(chip);
    });
  }

  function buildDaySchedule(dateStr) {
    var body = document.getElementById('dayScheduleBody');
    body.innerHTML = '';
    var dayData = getTimeboxingDay(dateStr);

    for (var h = DAY_START_HOUR; h <= DAY_END_HOUR; h++) {
      var tr = document.createElement('tr');
      tr.dataset.hour = h;

      // Hour cell
      var hourTd = document.createElement('td');
      hourTd.className = 'day-hour-cell';
      hourTd.textContent = String(h).padStart(2, '0') + 'h';
      tr.appendChild(hourTd);

      // :00 cell
      tr.appendChild(createDayTimeCell(dateStr, h, '00', dayData));
      // :30 cell
      tr.appendChild(createDayTimeCell(dateStr, h, '30', dayData));

      body.appendChild(tr);
    }
  }

  function createDayTimeCell(dateStr, hour, half, dayData) {
    var td = document.createElement('td');
    td.className = 'day-time-cell';
    var key = hour + '_' + half;
    td.dataset.key = key;

    // Done toggle (Apple Notes-style circle)
    var toggle = document.createElement('div');
    toggle.className = 'day-done-toggle';

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'day-cell-input';
    input.maxLength = 60;

    var entry = dayData.schedule[key];
    if (entry) {
      input.value = entry.text || '';
      if (entry.category) {
        td.setAttribute('data-cat', entry.category);
      }
      if (entry.done) {
        td.classList.add('done');
      }
    }

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      var data = getTimeboxingDay(dateStr);
      var ent = data.schedule[key];
      if (!ent || !ent.text) return;
      ent.done = !ent.done;
      td.classList.toggle('done', ent.done);
      saveState();
    });

    input.addEventListener('input', function() {
      var cat = td.getAttribute('data-cat') || '';
      var done = td.classList.contains('done');
      saveTimeboxingSchedule(dateStr, key, input.value, cat, done);
    });

    var dot = document.createElement('div');
    dot.className = 'day-cat-dot';
    if (entry && entry.category) dot.classList.add('has-cat');
    dot.addEventListener('click', function(e) {
      e.stopPropagation();
      openDayCategoryPicker(td, dot, dateStr);
    });

    td.appendChild(toggle);
    td.appendChild(input);
    td.appendChild(dot);
    return td;
  }

  // --- Day category picker ---
  function openDayCategoryPicker(cell, dot, dateStr) {
    activeDayCatCell = { cell: cell, dateStr: dateStr };
    var picker = document.getElementById('dayCategoryPicker');

    // Build buttons if empty
    if (!picker.hasChildNodes()) {
      // Clear button
      var clearBtn = document.createElement('button');
      clearBtn.dataset.cat = '';
      clearBtn.title = 'Sem categoria';
      clearBtn.textContent = '\u2715';
      clearBtn.style.background = 'var(--header-bg)';
      clearBtn.style.color = 'var(--border)';
      clearBtn.style.fontWeight = '800';
      clearBtn.style.fontSize = '12px';
      picker.appendChild(clearBtn);

      // Category buttons
      CATEGORIES.forEach(function(cat) {
        var btn = document.createElement('button');
        btn.dataset.cat = cat.key;
        btn.title = catName(cat.key);
        btn.textContent = cat.emoji;
        btn.style.background = cat.color;
        picker.appendChild(btn);
      });
    }

    var rect = dot.getBoundingClientRect();
    picker.style.top = (rect.bottom + 4) + 'px';
    picker.style.left = (rect.left - 100) + 'px';
    picker.classList.remove('hidden');

    requestAnimationFrame(function() {
      var pr = picker.getBoundingClientRect();
      if (pr.right > window.innerWidth) picker.style.left = (window.innerWidth - pr.width - 8) + 'px';
      if (pr.left < 0) picker.style.left = '8px';
    });
  }

  function closeDayCategoryPicker() {
    document.getElementById('dayCategoryPicker').classList.add('hidden');
    activeDayCatCell = null;
  }

  // Category picker click handler (delegated)
  document.getElementById('dayCategoryPicker').addEventListener('click', function(e) {
    var btn = e.target.closest('button[data-cat]');
    if (!btn || !activeDayCatCell) return;

    var cat = btn.dataset.cat;
    var cell = activeDayCatCell.cell;
    var dateStr = activeDayCatCell.dateStr;
    var key = cell.dataset.key;
    var input = cell.querySelector('.day-cell-input');
    var dot = cell.querySelector('.day-cat-dot');

    if (cat) {
      cell.setAttribute('data-cat', cat);
      dot.classList.add('has-cat');
    } else {
      cell.removeAttribute('data-cat');
      dot.classList.remove('has-cat');
    }

    var done = cell.classList.contains('done');
    saveTimeboxingSchedule(dateStr, key, input.value, cat, done);
    closeDayCategoryPicker();
  });

  // Close picker on outside click
  document.addEventListener('click', function(e) {
    var picker = document.getElementById('dayCategoryPicker');
    if (!picker.classList.contains('hidden') &&
        !picker.contains(e.target) &&
        !e.target.classList.contains('day-cat-dot')) {
      closeDayCategoryPicker();
    }
  });

  function highlightDayCurrentHour(dateStr) {
    var body = document.getElementById('dayScheduleBody');
    if (!body) return;
    body.querySelectorAll('tr').forEach(function(tr) { tr.classList.remove('day-current-hour'); });

    var now = new Date();
    if (dateStr !== formatDateISO(now)) {
      document.getElementById('dayTimeNow').hidden = true;
      return;
    }

    var h = now.getHours();
    var m = now.getMinutes();

    // Highlight current hour row
    if (h >= DAY_START_HOUR && h <= DAY_END_HOUR) {
      var row = body.querySelector('tr[data-hour="' + h + '"]');
      if (row) row.classList.add('day-current-hour');
    }

    // Position the "now" line
    var nowLine = document.getElementById('dayTimeNow');
    if (h >= DAY_START_HOUR && h <= DAY_END_HOUR) {
      var totalMinutes = (h - DAY_START_HOUR) * 60 + m;
      var totalRange = (DAY_END_HOUR - DAY_START_HOUR + 1) * 60;
      var rowHeight = 36; // matches CSS td height
      var headerHeight = 30; // sticky header
      var topOffset = headerHeight + (totalMinutes / 60) * rowHeight;
      nowLine.style.top = topOffset + 'px';
      nowLine.hidden = false;
    } else {
      nowLine.hidden = true;
    }
  }

  function scrollDayToCurrentHour(dateStr) {
    var now = new Date();
    if (dateStr !== formatDateISO(now)) return;

    var h = now.getHours();
    if (h >= DAY_START_HOUR && h <= DAY_END_HOUR) {
      var wrapper = document.querySelector('.day-schedule-wrapper');
      var row = document.querySelector('#dayScheduleBody tr[data-hour="' + h + '"]');
      if (wrapper && row) {
        requestAnimationFrame(function() {
          var rowTop = row.offsetTop - wrapper.offsetHeight / 3;
          wrapper.scrollTo({ top: Math.max(0, rowTop), behavior: 'smooth' });
        });
      }
    }
  }

  function zoomDayPrev() {
    var d = parseDateISO(zoomDayDate);
    d.setDate(d.getDate() - 1);
    zoomDayDate = formatDateISO(d);
    setZoom('day', zoomDayDate);
  }

  function zoomDayNext() {
    var d = parseDateISO(zoomDayDate);
    d.setDate(d.getDate() + 1);
    zoomDayDate = formatDateISO(d);
    setZoom('day', zoomDayDate);
  }

  function zoomDayToday() {
    zoomDayDate = formatDateISO(new Date());
    setZoom('day', zoomDayDate);
  }

  // Navigate to day view from a specific date (called from month/week views)
  function goToDay(month, day) {
    var dateStr = YEAR + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
    setZoom('day', dateStr);
  }

  // --- Mobile: scroll to current month ---
  function scrollToToday() {
    if (window.innerWidth > 768) return;
    const now = new Date();
    if (now.getFullYear() !== YEAR) return;

    const monthEl = document.querySelector(`[data-month-idx="${now.getMonth()}"]`);
    if (monthEl) {
      requestAnimationFrame(() => {
        monthEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  // --- Info Tooltips / Popovers ---
  const INFO_CONTENT = {
    'pt-br': {
      calendar: {
        title: 'Por que um calendário de 365 dias?',
        text: 'A maioria das pessoas planeja meticulosamente sua vida profissional mas improvisa a vida pessoal. O calendário de parede de 365 dias mostra o ano inteiro de uma vez — isso revela a verdade: quanto do seu tempo vai para o trabalho e quanto vai para o que você diz que importa. A regra é: coloque primeiro suas "pedras" (viagens em família, Misogi, mini-aventuras, momentos com os filhos) e deixe o trabalho preencher as "rachaduras" ao redor. Se você diz que família é prioridade mas seu calendário é 100% reuniões, o calendário não mente.'
      },
      eightBoxes: {
        title: 'O que são as 8 Caixas?',
        text: 'Jesse Itzler organiza toda a sua vida em 8 categorias — uma "Lista de Esforço Contínuo" mais ativa que uma bucket list. As caixas são: Aventura, Casamento, Saúde & Fitness, Filhos, Negócios, Pessoal, Família e Finanças Pessoais. O objetivo é ter clareza sobre o que você quer em cada área e preencher com metas de curto e longo prazo. Quando você sabe exatamente pelo que está trabalhando, pode ser a versão "A+" de si mesmo.'
      },
      misogi: {
        title: 'O que é o Misogi?',
        text: 'O Misogi é um antigo ritual japonês adaptado por Jesse Itzler. É UMA grande coisa que define o seu ano — um desafio significativo que, ao final de 365 dias, você sinta orgulho de ter realizado. Pode ser um desafio físico (maratona, prova de resistência), criativo (escrever um livro) ou profissional (lançar um negócio). Escolha apenas um. Como diz o técnico de natação de Itzler: "Mais não é melhor; melhor é melhor." Coloque no calendário ANTES de qualquer outra coisa — é a sua "pedra" principal. Se você fizer um Misogi por ano durante 50 anos, terá 50 realizações extraordinárias no seu currículo de vida.'
      },
      kevinsRule: {
        title: 'O que é a Regra do Kevin?',
        text: 'Nomeada em homenagem a um amigo de Jesse Itzler que se recusava a deixar o trabalho matar seu espírito. A regra é simples: a cada 8 semanas (6 vezes por ano), dedique um dia inteiro a fazer algo fora da sua rotina normal. Pode ser uma trilha, um show, pescar com os filhos, visitar amigos, ou acampar. Não precisa ser caro — museus, parques e corridas locais contam. Se você não consegue separar 1 dia a cada 2 meses para viver algo diferente, seu sistema está totalmente fora de equilíbrio. Começando aos 30 e seguindo até os 80, são 300 mini-aventuras que nunca teriam acontecido.'
      },
      habits: {
        title: 'O que são os Hábitos Trimestrais?',
        text: 'Em vez de resoluções de Ano Novo que falham em fevereiro, Itzler propõe adicionar apenas UM novo hábito vencedor por trimestre — 4 por ano. A ideia é transformação em câmera lenta: passos pequenos que se acumulam. Exemplos: Q1 = beber 3 litros de água por dia. Q2 = 10 minutos de meditação. Q3 = nunca se atrasar. Q4 = criar uma rotina noturna. Em 10 anos, são 40 hábitos que redefinem seu "sistema operacional" interno, sem o burnout de tentar mudar tudo de uma vez.'
      },
      blender: {
        title: 'O que é o Blender Score?',
        text: 'Imagine colocar todas as áreas da sua vida — finanças, trabalho, saúde, casamento, família — dentro de um liquidificador. Bate tudo junto. De 1 a 10, qual o sabor dessa mistura? Se você é um 7, seu cérebro automaticamente identifica os 2-3 "drags" — as áreas que puxam sua nota para baixo. Esses drags se tornam suas prioridades de energia para o ano. É um diagnóstico rápido e instintivo que substitui análises complicadas.'
      },
      seasons: {
        title: 'O que são Push e Recovery Seasons?',
        text: 'Equilíbrio diário é um mito. A vida funciona melhor em temporadas. "Push Seasons" são períodos de alta intensidade — um deadline importante, treinamento para o Misogi, lançamento de projeto — onde você está fora de equilíbrio DE PROPÓSITO. "Recovery Seasons" são o contraponto: família, descanso, recarregar. O segredo é comunicar para seu parceiro(a): "As próximas 6 semanas são minha Push Season. Depois, entro em Recovery." Isso remove a culpa e a pressão de tentar ser tudo para todos o tempo inteiro.'
      },
      gettingLight: {
        title: 'O que é "Chegar Leve"?',
        text: 'O primeiro passo antes de planejar o ano: subtração. Limpe o closet (30 minutos, doe o que não usa), organize a mesa e o carro, cancele assinaturas inúteis, delete apps, esvazie a caixa de e-mail, e avalie seus compromissos e círculos sociais. Quem drena sua energia sai; quem energiza, fica. Subtração é um superpoder — pessoas de sucesso não adicionam mais metas, elas eliminam distrações. Leva 1-2 horas e cria o momentum para atacar o ano com uma base limpa.'
      },
      gratitude: {
        title: 'O Ritual das Cartas de Gratidão',
        text: 'Escreva de 15 a 25 cartas de agradecimento à mão para mentores, familiares, clientes ou fornecedores. Em um mundo digital onde DMs são ignoradas, correspondência física é impossível de ignorar. Jesse começou aos 22 anos escrevendo 10 postais por dia — 3.000 em um ano — e atribui grande parte do seu sucesso a esse hábito. É uma ferramenta de networking de altíssimo ROI e uma prática que alimenta a alma.'
      },
      weekGlance: {
        title: 'Week at a Glance',
        text: 'Ritual de domingo à noite do Jesse Itzler. Olhe o calendário da semana inteira e pergunte: "O que merece minha energia esta semana e o que pode esperar?" Use este painel para anotar lembretes, montar o roteiro dos próximos dias e organizar tarefas. Arraste notas para os dias do calendário quando estiverem prontas.'
      },
      dontForget: {
        title: 'Don\'t Forget',
        text: 'Anote aqui tudo que não pode esquecer — lembretes, ideias, compromissos que ainda não têm data definida. Quando decidir o dia, arraste a nota para uma célula do calendário e ela se transformará em uma etiqueta com categoria e cor.'
      },
      eveningScript: {
        title: 'Evening Script',
        text: '"O dia começa na noite anterior." Ritual diário de Jesse Itzler: antes de dormir, monte o roteiro completo do dia seguinte — hora por hora. Saber exatamente o que vai fazer evita "improvisar" e perder energia com decisões. "The competition is too good to wake up and wing it." Dica: comece com os blocos fixos (filhos, treino, trabalho) e preencha os espaços.'
      }
    },
    'en': {
      calendar: {
        title: 'Why a 365-day calendar?',
        text: 'Most people meticulously plan their professional life but improvise their personal life. A 365-day wall calendar shows the entire year at once — it reveals the truth: how much of your time goes to work and how much goes to what you say matters. The rule: place your "rocks" first (family trips, Misogi, mini-adventures, time with kids) and let work fill the "cracks" around them. If you say family is a priority but your calendar is 100% meetings, the calendar doesn\'t lie.'
      },
      eightBoxes: {
        title: 'What are the 8 Boxes?',
        text: 'Jesse Itzler organizes his entire life into 8 categories — a "Continuous Effort List" more active than a bucket list. The boxes are: Adventure, Marriage, Health & Fitness, Kids, Business, Personal, Family and Personal Finance. The goal is to have clarity about what you want in each area and fill them with short and long-term goals. When you know exactly what you\'re working toward, you can be the "A+" version of yourself.'
      },
      misogi: {
        title: 'What is a Misogi?',
        text: 'Misogi is an ancient Japanese ritual adapted by Jesse Itzler. It\'s ONE big thing that defines your year — a meaningful challenge that, at the end of 365 days, you feel proud to have accomplished. It can be physical (marathon, endurance race), creative (write a book) or professional (launch a business). Choose only one. As Itzler\'s swim coach says: "More isn\'t better; better is better." Put it on the calendar BEFORE anything else — it\'s your main "rock." If you do one Misogi per year for 50 years, you\'ll have 50 extraordinary achievements on your life resume.'
      },
      kevinsRule: {
        title: 'What is Kevin\'s Rule?',
        text: 'Named after a friend of Jesse Itzler who refused to let work kill his spirit. The rule is simple: every 8 weeks (6 times a year), dedicate an entire day to doing something outside your normal routine. It can be a hike, a concert, fishing with the kids, visiting friends, or camping. It doesn\'t need to be expensive — museums, parks and local races count. If you can\'t set aside 1 day every 2 months to experience something different, your system is completely out of balance. Starting at 30 and going to 80, that\'s 300 mini-adventures that would never have happened.'
      },
      habits: {
        title: 'What are Quarterly Habits?',
        text: 'Instead of New Year\'s resolutions that fail by February, Itzler proposes adding just ONE new winning habit per quarter — 4 per year. The idea is slow-motion transformation: small steps that compound. Examples: Q1 = drink 3 liters of water daily. Q2 = 10 minutes of meditation. Q3 = never be late. Q4 = create a night routine. In 10 years, that\'s 40 habits that redefine your internal "operating system," without the burnout of trying to change everything at once.'
      },
      blender: {
        title: 'What is the Blender Score?',
        text: 'Imagine putting all areas of your life — finances, work, health, marriage, family — into a blender. Blend it all together. From 1 to 10, what does that mixture taste like? If you\'re a 7, your brain automatically identifies the 2-3 "drags" — the areas pulling your score down. Those drags become your energy priorities for the year. It\'s a quick, instinctive diagnostic that replaces complicated analyses.'
      },
      seasons: {
        title: 'What are Push and Recovery Seasons?',
        text: 'Daily balance is a myth. Life works better in seasons. "Push Seasons" are high-intensity periods — an important deadline, Misogi training, project launch — where you\'re out of balance ON PURPOSE. "Recovery Seasons" are the counterpoint: family, rest, recharge. The secret is communicating to your partner: "The next 6 weeks are my Push Season. After that, I enter Recovery." This removes the guilt and pressure of trying to be everything to everyone all the time.'
      },
      gettingLight: {
        title: 'What is "Getting Light"?',
        text: 'The first step before planning the year: subtraction. Clean your closet (30 minutes, donate what you don\'t use), organize your desk and car, cancel useless subscriptions, delete apps, empty your inbox, and evaluate your commitments and social circles. Whoever drains your energy goes; whoever energizes, stays. Subtraction is a superpower — successful people don\'t add more goals, they eliminate distractions. Takes 1-2 hours and creates the momentum to attack the year with a clean slate.'
      },
      gratitude: {
        title: 'The Gratitude Letters Ritual',
        text: 'Write 15 to 25 handwritten thank-you letters to mentors, family members, clients or suppliers. In a digital world where DMs are ignored, physical mail is impossible to ignore. Jesse started at 22 writing 10 postcards a day — 3,000 in a year — and attributes much of his success to this habit. It\'s an extremely high-ROI networking tool and a practice that feeds the soul.'
      },
      weekGlance: {
        title: 'Week at a Glance',
        text: 'Jesse Itzler\'s Sunday night ritual. Look at the entire week\'s calendar and ask: "What deserves my energy this week and what can wait?" Use this panel to jot down reminders, build your daily scripts, and organize tasks. Drag notes onto calendar days when they\'re ready.'
      },
      dontForget: {
        title: 'Don\'t Forget',
        text: 'Write down everything you can\'t forget — reminders, ideas, commitments that don\'t have a date yet. When you decide the day, drag the note onto a calendar cell and it will become a label with a category and color.'
      },
      eveningScript: {
        title: 'Evening Script',
        text: '"The day starts the night before." Jesse Itzler\'s daily ritual: before bed, build the complete script for the next day — hour by hour. Knowing exactly what you\'ll do prevents "winging it" and losing energy on decisions. "The competition is too good to wake up and wing it." Tip: start with the fixed blocks (kids, workout, work) and fill in the gaps.'
      }
    }
  };

  let activePopover = null;

  function getInfoContent(key) {
    const lang = state.settings.lang;
    return INFO_CONTENT[lang][key] || INFO_CONTENT['pt-br'][key];
  }

  function showInfoPopover(btn, key) {
    const content = getInfoContent(key);
    if (!content) return;

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Show bottom sheet
      document.getElementById('infoSheetTitle').textContent = content.title;
      document.getElementById('infoSheetText').textContent = content.text;
      document.getElementById('infoSheetOverlay').hidden = false;
      activePopover = 'sheet';
      return;
    }

    // Desktop popover
    const popover = document.getElementById('infoPopover');
    const arrow = popover.querySelector('.info-popover-arrow');
    document.getElementById('infoTitle').textContent = content.title;
    document.getElementById('infoText').textContent = content.text;

    popover.hidden = false;
    popover.classList.remove('arrow-bottom');

    // Position below the button
    const rect = btn.getBoundingClientRect();
    let top = rect.bottom + 8;
    let left = rect.left - 12;

    // If overflows right
    if (left + 340 > window.innerWidth) {
      left = window.innerWidth - 356;
    }
    if (left < 8) left = 8;

    // If overflows bottom, show above
    if (top + 200 > window.innerHeight) {
      top = rect.top - 8;
      popover.style.transform = 'translateY(-100%)';
      popover.classList.add('arrow-bottom');
    } else {
      popover.style.transform = '';
    }

    popover.style.top = top + 'px';
    popover.style.left = left + 'px';

    // Position arrow
    const arrowLeft = Math.max(12, Math.min(rect.left - left + rect.width / 2 - 6, 320));
    arrow.style.left = arrowLeft + 'px';

    activePopover = 'popover';
  }

  function hideInfoPopover() {
    if (activePopover === 'popover') {
      document.getElementById('infoPopover').hidden = true;
    } else if (activePopover === 'sheet') {
      document.getElementById('infoSheetOverlay').hidden = true;
    }
    activePopover = null;
  }

  function bindInfoButtons() {
    document.querySelectorAll('.info-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.dataset.info;
        if (activePopover) {
          hideInfoPopover();
          return;
        }
        showInfoPopover(btn, key);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          const key = btn.dataset.info;
          if (activePopover) { hideInfoPopover(); return; }
          showInfoPopover(btn, key);
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (activePopover && !e.target.closest('.info-popover') && !e.target.closest('.info-btn') && !e.target.closest('.info-sheet')) {
        hideInfoPopover();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activePopover) {
        hideInfoPopover();
      }
    });

    // Mobile sheet overlay close
    document.getElementById('infoSheetOverlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('infoSheetOverlay')) {
        hideInfoPopover();
      }
    });
  }

  // --- PWA Service Worker Registration ---
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  // --- Event Bindings ---
  function bindEvents() {
    // Zoom buttons
    document.querySelectorAll('.zoom-btn').forEach(btn => {
      btn.addEventListener('click', () => setZoom(btn.dataset.zoom));
    });
    document.getElementById('monthPrev').addEventListener('click', zoomMonthPrev);
    document.getElementById('monthNext').addEventListener('click', zoomMonthNext);
    document.getElementById('weekPrev').addEventListener('click', zoomWeekPrev);
    document.getElementById('weekNext').addEventListener('click', zoomWeekNext);

    // Month/Week view nav buttons
    document.getElementById('mvPrev').addEventListener('click', zoomMonthPrev);
    document.getElementById('mvNext').addEventListener('click', zoomMonthNext);
    document.getElementById('wvPrev').addEventListener('click', zoomWeekPrev);
    document.getElementById('wvNext').addEventListener('click', zoomWeekNext);

    // Day view nav buttons
    document.getElementById('dayPrev').addEventListener('click', zoomDayPrev);
    document.getElementById('dayNext').addEventListener('click', zoomDayNext);
    document.getElementById('dayToday').addEventListener('click', zoomDayToday);
    document.getElementById('dvPrev').addEventListener('click', zoomDayPrev);
    document.getElementById('dvNext').addEventListener('click', zoomDayNext);

    // Day view add label
    document.getElementById('dayAddLabel').addEventListener('click', function() {
      if (zoomDayDate) {
        var d = parseDateISO(zoomDayDate);
        openLabelModal(d.getMonth(), d.getDate());
      }
    });

    // Theme buttons
    document.querySelectorAll('.theme-dot').forEach(btn => {
      btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme')));
    });

    // Category filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleFilter(btn.getAttribute('data-category')));
    });
    document.getElementById('filterClearBtn').addEventListener('click', clearAllFilters);

    // Language toggle
    document.getElementById('btnLang').addEventListener('click', () => {
      const newLang = state.settings.lang === 'pt-br' ? 'en' : 'pt-br';
      setLang(newLang);
    });

    // Panel toggle
    const panel = document.getElementById('sidePanel');
    const btnPanel = document.getElementById('btnPanel');

    btnPanel.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      panel.setAttribute('aria-hidden', !isOpen);
      btnPanel.setAttribute('aria-expanded', isOpen);
    });

    document.getElementById('btnPanelClose').addEventListener('click', () => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      btnPanel.setAttribute('aria-expanded', 'false');
    });

    // Label modal
    setupModalClose('modalOverlay', 'modalClose');
    document.getElementById('btnSaveLabel').addEventListener('click', saveLabel);
    document.getElementById('btnDeleteLabel').addEventListener('click', deleteLabel);
    document.getElementById('labelText').addEventListener('input', updateCharCounter);
    document.getElementById('dateStartBtn').addEventListener('click', function() { setDateTarget('start'); });
    document.getElementById('dateEndBtn').addEventListener('click', function() { setDateTarget('end'); });

    // Misogi modal
    setupModalClose('misogiModalOverlay', 'misogiModalClose');
    document.getElementById('btnSetMisogi').addEventListener('click', openMisogiModal);
    document.getElementById('btnSaveMisogi').addEventListener('click', saveMisogi);
    document.getElementById('btnDeleteMisogi').addEventListener('click', deleteMisogi);

    // Adventure modal
    setupModalClose('adventureModalOverlay', 'adventureModalClose');
    document.getElementById('btnAddAdventure').addEventListener('click', () => openAdventureModal(null));
    document.getElementById('btnSaveAdventure').addEventListener('click', saveAdventure);
    document.getElementById('btnDeleteAdventure').addEventListener('click', deleteAdventure);

    // Season modal
    setupModalClose('seasonModalOverlay', 'seasonModalClose');
    document.getElementById('btnAddSeason').addEventListener('click', () => openSeasonModal(null));
    document.getElementById('btnSaveSeason').addEventListener('click', saveSeason);
    document.getElementById('btnDeleteSeason').addEventListener('click', deleteSeason);

    // Quarterly habits (auto-save on change)
    ['habitQ1', 'habitQ2', 'habitQ3', 'habitQ4'].forEach(id => {
      document.getElementById(id).addEventListener('input', (e) => {
        const quarter = id.replace('habit', '').toLowerCase();
        state.quarterlyHabits[quarter] = e.target.value;
        saveState();
      });
    });

    // Blender Score
    document.getElementById('blenderSlider').addEventListener('input', (e) => {
      state.blenderScore = parseInt(e.target.value, 10);
      document.getElementById('blenderValue').textContent = state.blenderScore;
      saveState();
    });

    // Export / Import / Reset
    document.getElementById('btnExport').addEventListener('click', exportJSON);
    document.getElementById('btnImport').addEventListener('click', () => {
      document.getElementById('fileImport').click();
    });
    document.getElementById('fileImport').addEventListener('change', (e) => {
      if (e.target.files[0]) {
        importJSON(e.target.files[0]);
        e.target.value = '';
      }
    });
    document.getElementById('btnReset').addEventListener('click', resetAll);

    // Keyboard: Escape closes modals/panel/popup
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCellPopup();
        closeDayCategoryPicker();
        ['modalOverlay', 'misogiModalOverlay', 'adventureModalOverlay', 'seasonModalOverlay', 'quickDropOverlay'].forEach(id => {
          if (!document.getElementById(id).hidden) hideModal(id);
        });
        panel.classList.remove('open');
        if (brainDumpOpen) {
          brainDumpOpen = false;
          document.getElementById('bdToggle').classList.remove('active');
          updateBrainDumpVisibility();
        }
      }
    });

    // Brain dump events
    bindBrainDumpEvents();

    // Auto-update today indicator every 60 seconds
    setInterval(updateTodayIndicator, 60000);
  }

  // --- Device Detection ---
  let currentDevice = 'macbook-air';

  function detectDevice() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isPortrait = h > w;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (w >= 1920 && h >= 1000 && !isTouch && !isPortrait) return 'tv-oled';
    if (w >= 1000 && isPortrait && h >= 1800 && !isTouch) return 'monitor-vertical';
    if (w >= 1400 && !isPortrait && !isTouch) return 'macbook-pro';
    if (w >= 1200 && !isPortrait && !isTouch) return 'macbook-air';
    if (isTouch && !isPortrait && w < 932) return 'iphone-landscape';
    if (isTouch && isPortrait && w <= 430) return 'iphone-portrait';
    return 'macbook-air';
  }

  function applyDevice() {
    const prev = currentDevice;
    currentDevice = detectDevice();
    document.body.dataset.device = currentDevice;

    if (prev !== currentDevice) {
      // Re-render grid when switching to/from vertical monitor (transposed grid)
      if (currentDevice === 'monitor-vertical' || prev === 'monitor-vertical') {
        renderGrid();
        setZoom(zoomMode);
      }
      // Setup/teardown TV idle timer
      if (currentDevice === 'tv-oled') {
        startIdleTimer();
      } else {
        stopIdleTimer();
        document.body.removeAttribute('data-idle');
      }
    }
  }

  // --- TV OLED Auto-Hide Toolbar ---
  let idleTimer = null;

  function resetIdle() {
    document.body.removeAttribute('data-idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      document.body.setAttribute('data-idle', 'true');
    }, 5000);
  }

  function startIdleTimer() {
    document.addEventListener('mousemove', resetIdle);
    document.addEventListener('click', resetIdle);
    resetIdle();
  }

  function stopIdleTimer() {
    clearTimeout(idleTimer);
    document.removeEventListener('mousemove', resetIdle);
    document.removeEventListener('click', resetIdle);
  }

  // --- Transposed Grid (Vertical Monitor) ---
  function renderTransposedGrid() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    grid.classList.add('transposed');
    cellElements = {};

    // Corner cell
    const corner = document.createElement('div');
    corner.className = 'cell-corner transposed-corner';
    grid.appendChild(corner);

    // Month headers (12 columns)
    for (let m = 0; m < 12; m++) {
      const hdr = document.createElement('div');
      hdr.className = 'cell-month-header-t';
      hdr.textContent = monthLabel(m);
      grid.appendChild(hdr);
    }

    // Rows: 31 days
    for (let d = 1; d <= 31; d++) {
      // Day number label (sticky left)
      const dl = document.createElement('div');
      dl.className = 'cell-day-label-t';
      dl.textContent = d;
      grid.appendChild(dl);

      // 12 month cells for this day
      for (let m = 0; m < 12; m++) {
        const cell = document.createElement('div');
        const daysInMonth = DAYS_IN_MONTH[m];

        if (d > daysInMonth) {
          cell.className = 'cell empty';
          cell.setAttribute('aria-hidden', 'true');
        } else {
          const dow = dayOfWeek(m, d);
          const isWeekend = dow === 0 || dow === 6;

          cell.className = 'cell' + (isWeekend ? ' weekend' : '');
          cell.setAttribute('data-month', m);
          cell.setAttribute('data-day', d);
          cell.setAttribute('role', 'button');
          cell.setAttribute('tabindex', '0');
          cell.setAttribute('aria-label', `${dowLabel(dow)} ${d} ${monthLabel(m)} ${YEAR}`);

          const hdr = document.createElement('div');
          hdr.className = 'cell-header';

          const dowEl = document.createElement('span');
          dowEl.className = 'cell-dow';
          dowEl.textContent = dowLabel(dow);
          hdr.appendChild(dowEl);

          cell.appendChild(hdr);

          if (isToday(m, d)) {
            cell.classList.add('today');
          }

          cell.addEventListener('click', () => {
            if (['year','q1','q2','q3','q4'].includes(zoomMode)) {
              const key = m + '-' + d;
              const cellLabels = state.labels.filter(l => dateRange(l.startDate, l.endDate).includes(key));
              if (cellLabels.length > 0) {
                openCellPopup(cell, m, d, cellLabels);
                return;
              }
            }
            openLabelModal(m, d);
          });
          cellElements[m + '-' + d] = cell;
        }

        grid.appendChild(cell);
      }
    }

    renderLabelsOnGrid();
    renderSpecialMarkers();
  }

  // --- iPhone Week Swipe ---
  let swipeCurrentDay = 0; // 0-6 index in the week

  function renderWeekViewMobile(startDate) {
    const container = document.getElementById('weekViewContent');
    if (!container) return;

    const days = getWeekDays(startDate);
    container.innerHTML = '';
    container.className = 'wv-swipe-container';

    // Find today's index in this week
    const now = new Date();
    let todayIdx = -1;
    days.forEach((dd, i) => {
      if (dd.month === now.getMonth() && dd.day === now.getDate() && now.getFullYear() === YEAR) {
        todayIdx = i;
      }
    });
    swipeCurrentDay = todayIdx >= 0 ? todayIdx : 0;

    // Create swipe track
    var mobileLabelsMap = getLabelsPerCell();
    const track = document.createElement('div');
    track.className = 'wv-swipe-track';
    track.style.transform = `translateX(-${swipeCurrentDay * 100}%)`;

    days.forEach((dd, i) => {
      const d = new Date(YEAR, dd.month, dd.day);
      const dow = d.getDay();
      const m = dd.month;
      const day = dd.day;

      const slide = document.createElement('div');
      slide.className = 'wv-swipe-slide' + (dow === 0 || dow === 6 ? ' weekend' : '');
      if (isToday(m, day)) slide.classList.add('today');

      // Day header
      const hdr = document.createElement('div');
      hdr.className = 'wv-swipe-header';
      hdr.innerHTML = `<span class="wv-swipe-dow">${dowLabel(dow)}</span> <span class="wv-swipe-num">${day}</span> <span class="wv-swipe-month">${monthLabel(m)} ${YEAR}</span>`;
      slide.appendChild(hdr);

      // Labels for this day
      const body = document.createElement('div');
      body.className = 'wv-swipe-body';

      if (d.getFullYear() === YEAR) {
        const key = m + '-' + day;
        if (mobileLabelsMap[key]) {
          mobileLabelsMap[key].forEach(function(entry) {
            var lbl = document.createElement('div');
            lbl.className = 'wv-swipe-label label-block';
            lbl.dataset.category = entry.label.category;
            lbl.dataset.labelId = entry.label.id;
            var cat = CATEGORIES.find(function(c) { return c.key === entry.label.category; });
            lbl.style.backgroundColor = cat ? cat.color : '#ADADAD';
            lbl.style.color = textContrast(cat ? cat.color : '#ADADAD');
            lbl.innerHTML = '<span class="wv-swipe-label-text">' + escapeHtml(formatLabelText(entry.label.text)) + '</span>';
            if (cat) {
              lbl.innerHTML += '<span class="wv-swipe-label-cat">' + cat.emoji + ' ' + catName(cat.key) + '</span>';
            }
            lbl.addEventListener('click', function(e) {
              e.stopPropagation();
              openEditLabelModal(entry.label.id);
            });
            body.appendChild(lbl);
          });
        }

        body.addEventListener('click', () => openLabelModal(m, day));
      }

      slide.appendChild(body);
      track.appendChild(slide);
    });

    container.appendChild(track);

    // Dots indicator
    const dots = document.createElement('div');
    dots.className = 'wv-swipe-dots';
    for (let i = 0; i < 7; i++) {
      const dot = document.createElement('span');
      dot.className = 'wv-swipe-dot' + (i === swipeCurrentDay ? ' active' : '');
      dot.addEventListener('click', () => swipeTo(i));
      dots.appendChild(dot);
    }
    container.appendChild(dots);

    // FAB button
    const fab = document.createElement('button');
    fab.className = 'wv-fab';
    fab.innerHTML = '+';
    fab.addEventListener('click', () => {
      const dd = days[swipeCurrentDay];
      if (dd) openLabelModal(dd.month, dd.day);
    });
    container.appendChild(fab);

    // Touch swipe handling
    let startX = 0, startY = 0, isDragging = false;
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0 && swipeCurrentDay < 6) swipeTo(swipeCurrentDay + 1);
        else if (dx > 0 && swipeCurrentDay > 0) swipeTo(swipeCurrentDay - 1);
      }
    }, { passive: true });
  }

  function swipeTo(idx) {
    swipeCurrentDay = idx;
    const track = document.querySelector('.wv-swipe-track');
    if (track) track.style.transform = `translateX(-${idx * 100}%)`;
    document.querySelectorAll('.wv-swipe-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  // --- Stacked Week View (Vertical Monitor) ---
  function renderWeekViewStacked(startDate) {
    const container = document.getElementById('weekViewContent');
    if (!container) return;

    const days = getWeekDays(startDate);
    container.innerHTML = '';
    container.className = 'wv-stacked-container';
    var stackedLabelsMap = getLabelsPerCell();

    days.forEach((dd) => {
      const d = new Date(YEAR, dd.month, dd.day);
      const dow = d.getDay();
      const m = dd.month;
      const day = dd.day;

      const row = document.createElement('div');
      row.className = 'wv-stacked-row' + (dow === 0 || dow === 6 ? ' weekend' : '');
      if (isToday(m, day)) row.classList.add('today');

      const hdr = document.createElement('div');
      hdr.className = 'wv-stacked-header';
      hdr.innerHTML = `<span class="wv-stacked-dow">${dowLabel(dow)}</span> <span class="wv-stacked-num">${day}</span> <span class="wv-stacked-month">${monthLabel(m)}</span>`;
      row.appendChild(hdr);

      const body = document.createElement('div');
      body.className = 'wv-stacked-body';

      if (d.getFullYear() === YEAR) {
        const key = m + '-' + day;
        if (stackedLabelsMap[key]) {
          renderCellLabels(body, key, stackedLabelsMap[key], 'week');
        }

        body.addEventListener('click', () => openLabelModal(m, day));
      }

      row.appendChild(body);
      container.appendChild(row);
    });
    applyFilters();
  }

  // --- Brain Dump ---
  let brainDumpOpen = false;
  let quickDropNoteId = null;
  let quickDropDate = null;
  let quickDropCategory = '';
  let esCurrentDate = null; // Evening Script current date (Date object)

  function getBrainDumpMonthKey() {
    if (zoomMode === 'month') {
      return YEAR + '-' + String(zoomMonth + 1).padStart(2, '0');
    }
    if (zoomMode === 'week' && zoomWeekStart) {
      return YEAR + '-' + String(zoomWeekStart.getMonth() + 1).padStart(2, '0');
    }
    const now = new Date();
    return YEAR + '-' + String(now.getMonth() + 1).padStart(2, '0');
  }

  function getBrainDumpNotes() {
    const key = getBrainDumpMonthKey();
    return state.brainDump[key] || [];
  }

  function addBrainDumpNote(text, type) {
    if (!text.trim()) return;
    const key = getBrainDumpMonthKey();
    if (!state.brainDump[key]) state.brainDump[key] = [];
    state.brainDump[key].push({
      id: 'note_' + Date.now(),
      text: text.trim(),
      type: type,
      done: false,
      createdAt: new Date().toISOString()
    });
    saveState();
    renderBrainDump();
  }

  function toggleNoteDone(noteId) {
    const key = getBrainDumpMonthKey();
    const notes = state.brainDump[key];
    if (!notes) return;
    const note = notes.find(function(n) { return n.id === noteId; });
    if (note) {
      note.done = !note.done;
      saveState();
      renderBrainDump();
    }
  }

  function deleteBrainDumpNote(noteId) {
    const key = getBrainDumpMonthKey();
    if (!state.brainDump[key]) return;
    state.brainDump[key] = state.brainDump[key].filter(function(n) { return n.id !== noteId; });
    saveState();
    renderBrainDump();
  }

  function toggleBrainDump() {
    brainDumpOpen = !brainDumpOpen;
    document.getElementById('bdToggle').classList.toggle('active', brainDumpOpen);
    updateBrainDumpVisibility();
    if (brainDumpOpen) renderBrainDump();
  }

  function updateBrainDumpVisibility() {
    var monthSb = document.getElementById('brainDumpMonth');
    var weekSb = document.getElementById('brainDumpWeek');
    var toggleBtn = document.getElementById('bdToggle');

    // Show toggle only in month/week modes
    toggleBtn.style.display = (zoomMode === 'month' || zoomMode === 'week') ? '' : 'none';

    // Show correct sidebar
    if (brainDumpOpen && zoomMode === 'month') {
      monthSb.classList.add('bd-open');
      weekSb.classList.remove('bd-open');
    } else if (brainDumpOpen && zoomMode === 'week') {
      weekSb.classList.add('bd-open');
      monthSb.classList.remove('bd-open');
    } else {
      monthSb.classList.remove('bd-open');
      weekSb.classList.remove('bd-open');
    }
  }

  function renderBrainDump() {
    var notes = getBrainDumpNotes();
    var reminders = notes.filter(function(n) { return n.type === 'reminder'; });
    var todos = notes.filter(function(n) { return n.type === 'todo'; });

    // Render sidebar header
    renderSidebarHeader();

    // Render collapsible states
    applySidebarCollapsed();

    if (zoomMode === 'month') {
      renderBrainDumpList('bdReminderList', reminders, 'reminder');
      renderBrainDumpList('bdTodoList', todos, 'todo');
      renderEveningScript('month');
    } else if (zoomMode === 'week') {
      renderBrainDumpList('bdReminderListWeek', reminders, 'reminder');
      renderBrainDumpList('bdTodoListWeek', todos, 'todo');
      renderEveningScript('week');
    }
  }

  function renderBrainDumpList(containerId, notes, type) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    if (notes.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'bd-empty';
      empty.textContent = type === 'reminder' ? t('noReminders') : t('noTasks');
      container.appendChild(empty);
      return;
    }

    notes.forEach(function(note) {
      var card = document.createElement('div');
      card.className = 'bd-card' + (note.type === 'reminder' ? ' bd-card-reminder' : ' bd-card-todo');
      if (note.done) card.classList.add('bd-done');
      card.setAttribute('draggable', 'true');
      card.dataset.noteId = note.id;

      var html = '';
      if (note.type === 'todo') {
        html += '<input type="checkbox" class="bd-checkbox"' + (note.done ? ' checked' : '') + '>';
      }
      html += '<span class="bd-card-text">' + escapeHtml(note.text) + '</span>';
      html += '<span class="bd-card-handle" title="Drag">≡</span>';
      html += '<button class="bd-card-delete" title="×">×</button>';

      card.innerHTML = html;

      // Toggle done
      var cb = card.querySelector('.bd-checkbox');
      if (cb) {
        cb.addEventListener('change', function(e) {
          e.stopPropagation();
          toggleNoteDone(note.id);
        });
      }

      // Delete
      card.querySelector('.bd-card-delete').addEventListener('click', function(e) {
        e.stopPropagation();
        deleteBrainDumpNote(note.id);
      });

      // Drag start
      card.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('application/x-braindump-note', note.id);
        e.dataTransfer.setData('text/x-source-section', note.type === 'reminder' ? 'reminders' : 'tasks');
        e.dataTransfer.effectAllowed = 'move';
        requestAnimationFrame(function() { card.classList.add('bd-dragging'); });
      });

      card.addEventListener('dragend', function() {
        card.classList.remove('bd-dragging');
        clearDropTargets();
      });

      // Mobile long press
      setupLongPress(card, { id: note.id, type: note.type, text: note.text });

      container.appendChild(card);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function setupCellDropZone(cell, month, day) {
    cell.addEventListener('dragover', function(e) {
      if (e.dataTransfer.types.indexOf('application/x-braindump-note') !== -1) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        cell.classList.add('bd-drag-over');
      }
    });

    cell.addEventListener('dragleave', function() {
      cell.classList.remove('bd-drag-over');
    });

    cell.addEventListener('drop', function(e) {
      e.preventDefault();
      cell.classList.remove('bd-drag-over');
      var noteId = e.dataTransfer.getData('application/x-braindump-note');
      if (noteId) {
        var dateStr = keyToDate(month + '-' + day);
        openQuickDropModal(noteId, dateStr);
      }
    });
  }

  function openQuickDropModal(noteId, dateStr) {
    var key = getBrainDumpMonthKey();
    var notes = state.brainDump[key] || [];
    var note = notes.find(function(n) { return n.id === noteId; });
    if (!note) return;

    quickDropNoteId = noteId;
    quickDropDate = dateStr;
    quickDropCategory = '';

    document.getElementById('qdNoteText').textContent = note.text;

    var d = new Date(dateStr + 'T00:00:00');
    var dayNum = d.getDate();
    var mon = monthLabel(d.getMonth()).toUpperCase();
    document.getElementById('qdDate').textContent = dayNum + ' ' + mon + ' ' + YEAR;

    renderQuickDropCategories();
    showModal('quickDropOverlay');
  }

  function renderQuickDropCategories() {
    var container = document.getElementById('qdCategorySelector');
    container.innerHTML = '';

    CATEGORIES.forEach(function(cat) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'cat-option' + (quickDropCategory === cat.key ? ' selected' : '');
      if (quickDropCategory === cat.key) {
        item.style.borderLeftColor = cat.color;
        item.style.backgroundColor = cat.color + '26';
      }
      item.innerHTML =
        '<span class="cat-option-info">' +
          '<span class="cat-option-emoji">' + cat.emoji + '</span>' +
          '<span class="cat-option-name">' + catName(cat.key) + '</span>' +
        '</span>' +
        '<span class="cat-option-color" style="background:' + cat.color + '"></span>';
      item.addEventListener('click', function() {
        quickDropCategory = cat.key;
        renderQuickDropCategories();
      });
      container.appendChild(item);
    });
  }

  function confirmQuickDrop() {
    if (!quickDropNoteId || !quickDropDate || !quickDropCategory) return;

    var key = getBrainDumpMonthKey();
    var notes = state.brainDump[key] || [];
    var note = notes.find(function(n) { return n.id === quickDropNoteId; });
    if (!note) return;

    var cat = CATEGORIES.find(function(c) { return c.key === quickDropCategory; });
    var color = cat ? cat.color : '#ADADAD';

    state.labels.push({
      id: uid(),
      text: note.text,
      color: color,
      category: quickDropCategory,
      startDate: quickDropDate,
      endDate: quickDropDate
    });

    state.brainDump[key] = notes.filter(function(n) { return n.id !== quickDropNoteId; });

    saveState();
    hideModal('quickDropOverlay');
    renderBrainDump();
    refreshActiveView();
    updateDashboard();

    quickDropNoteId = null;
    quickDropDate = null;
    quickDropCategory = '';
  }

  // --- Sidebar Header ---
  function renderSidebarHeader() {
    var suffix = zoomMode === 'month' ? 'Month' : 'Week';
    var titleEl = document.getElementById('bdHeaderTitle' + suffix);
    var subEl = document.getElementById('bdHeaderSub' + suffix);
    var quoteEl = titleEl ? titleEl.closest('.bd-header').querySelector('.bd-header-quote') : null;

    if (zoomMode === 'week' && zoomWeekStart) {
      titleEl.textContent = t('weekAtAGlance');
      var days = getWeekDays(zoomWeekStart);
      var first = days[0];
      var last = days[6];
      var startStr = first.day + ' ' + monthLabel(first.month);
      var endStr = last.day + ' ' + monthLabel(last.month) + ' ' + YEAR;
      subEl.textContent = startStr + ' — ' + endStr;
      if (quoteEl) {
        quoteEl.textContent = t('weekQuestion');
        quoteEl.style.display = '';
      }
    } else if (zoomMode === 'month') {
      titleEl.textContent = monthLabel(zoomMonth).toUpperCase() + ' ' + YEAR;
      subEl.textContent = '';
      if (quoteEl) quoteEl.style.display = 'none';
    }
  }

  // --- Collapsible Sections ---
  function toggleSidebarSection(sectionKey) {
    if (!state.sidebarCollapsed) state.sidebarCollapsed = {};
    state.sidebarCollapsed[sectionKey] = !state.sidebarCollapsed[sectionKey];
    saveState();
    applySidebarCollapsed();
  }

  function applySidebarCollapsed() {
    var collapsed = state.sidebarCollapsed || {};
    document.querySelectorAll('.bd-collapsible').forEach(function(el) {
      var key = el.dataset.collapse;
      var section = el.closest('.bd-section');
      var body = section ? section.querySelector('.bd-section-body') : null;
      var icon = el.querySelector('.bd-collapse-icon');
      if (body) {
        if (collapsed[key]) {
          body.classList.add('bd-collapsed');
          if (icon) icon.textContent = '\u25B6';
        } else {
          body.classList.remove('bd-collapsed');
          if (icon) icon.textContent = '\u25BC';
        }
      }
    });
  }

  // --- Evening Script ---
  function getEsDefaultDate() {
    var now = new Date();
    // If after 17h, show next day; otherwise show today
    if (now.getHours() >= 17) {
      var tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
    return now;
  }

  function getEsDateKey(d) {
    if (!d) return '';
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return YEAR + '-' + mm + '-' + dd;
  }

  function getEsItems(dateKey) {
    if (!state.eveningScript) state.eveningScript = {};
    return state.eveningScript[dateKey] || [];
  }

  function addEsItem(time, text) {
    if (!text.trim()) return;
    if (!esCurrentDate) esCurrentDate = getEsDefaultDate();
    var dateKey = getEsDateKey(esCurrentDate);
    if (!state.eveningScript[dateKey]) state.eveningScript[dateKey] = [];

    state.eveningScript[dateKey].push({
      id: 'es_' + Date.now(),
      time: time || '07:00',
      text: text.trim(),
      date: dateKey,
      done: false
    });

    // Sort by time
    state.eveningScript[dateKey].sort(function(a, b) {
      return a.time.localeCompare(b.time);
    });

    saveState();
    renderBrainDump();
  }

  function toggleEsItem(itemId) {
    if (!esCurrentDate) return;
    var dateKey = getEsDateKey(esCurrentDate);
    var items = state.eveningScript[dateKey];
    if (!items) return;
    var item = items.find(function(i) { return i.id === itemId; });
    if (item) {
      item.done = !item.done;
      saveState();
      renderBrainDump();
    }
  }

  function deleteEsItem(itemId) {
    if (!esCurrentDate) return;
    var dateKey = getEsDateKey(esCurrentDate);
    if (!state.eveningScript[dateKey]) return;
    state.eveningScript[dateKey] = state.eveningScript[dateKey].filter(function(i) { return i.id !== itemId; });
    saveState();
    renderBrainDump();
  }

  function editEsItemText(itemId, newText) {
    if (!esCurrentDate || !newText.trim()) return;
    var dateKey = getEsDateKey(esCurrentDate);
    var items = state.eveningScript[dateKey];
    if (!items) return;
    var item = items.find(function(i) { return i.id === itemId; });
    if (item) {
      item.text = newText.trim();
      saveState();
    }
  }

  function editEsItemTime(itemId, newTime) {
    if (!esCurrentDate) return;
    var dateKey = getEsDateKey(esCurrentDate);
    var items = state.eveningScript[dateKey];
    if (!items) return;
    var item = items.find(function(i) { return i.id === itemId; });
    if (item) {
      item.time = newTime;
      // Re-sort
      items.sort(function(a, b) { return a.time.localeCompare(b.time); });
      saveState();
      renderBrainDump();
    }
  }

  function navigateEsDate(direction) {
    if (!esCurrentDate) esCurrentDate = getEsDefaultDate();
    var d = new Date(esCurrentDate);
    d.setDate(d.getDate() + direction);
    // Stay within the year
    if (d.getFullYear() !== YEAR) return;
    esCurrentDate = d;
    renderBrainDump();
  }

  function renderEveningScript(view) {
    var suffix = view === 'month' ? 'Month' : 'Week';
    var listEl = document.getElementById('esList' + suffix);
    var dateEl = document.getElementById('esDate' + suffix);
    if (!listEl) return;

    if (!esCurrentDate) esCurrentDate = getEsDefaultDate();

    // Update date label
    var dow = dowLabel(esCurrentDate.getDay());
    var day = esCurrentDate.getDate();
    var mon = monthLabel(esCurrentDate.getMonth());
    dateEl.textContent = dow + ' ' + day + ' ' + mon;

    // Get items for this date
    var dateKey = getEsDateKey(esCurrentDate);
    var items = getEsItems(dateKey);

    listEl.innerHTML = '';

    if (items.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'bd-empty es-empty';
      empty.textContent = t('esEmpty');
      listEl.appendChild(empty);
      return;
    }

    items.forEach(function(item) {
      var row = document.createElement('div');
      row.className = 'es-item' + (item.done ? ' es-done' : '');

      // Checkbox
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'es-checkbox';
      cb.checked = item.done;
      cb.addEventListener('change', function(e) {
        e.stopPropagation();
        toggleEsItem(item.id);
      });
      row.appendChild(cb);

      // Time
      var timeEl = document.createElement('input');
      timeEl.type = 'time';
      timeEl.className = 'es-item-time';
      timeEl.value = item.time;
      timeEl.addEventListener('change', function() {
        editEsItemTime(item.id, timeEl.value);
      });
      row.appendChild(timeEl);

      // Text (inline editable)
      var textEl = document.createElement('span');
      textEl.className = 'es-item-text';
      textEl.textContent = item.text;
      textEl.setAttribute('contenteditable', 'true');
      textEl.setAttribute('spellcheck', 'false');
      textEl.addEventListener('blur', function() {
        var newText = textEl.textContent.trim();
        if (newText && newText !== item.text) {
          editEsItemText(item.id, newText);
        } else if (!newText) {
          textEl.textContent = item.text;
        }
      });
      textEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          textEl.blur();
        }
      });
      row.appendChild(textEl);

      // Delete
      var del = document.createElement('button');
      del.className = 'es-item-delete';
      del.textContent = '\u00D7';
      del.title = '\u00D7';
      del.addEventListener('click', function(e) {
        e.stopPropagation();
        deleteEsItem(item.id);
      });
      row.appendChild(del);

      // Drag handle
      var handle = document.createElement('span');
      handle.className = 'es-item-handle';
      handle.textContent = '\u2261';
      handle.title = 'Drag';
      row.appendChild(handle);

      // Make draggable
      row.setAttribute('draggable', 'true');
      row.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('application/x-evening-script', item.id);
        e.dataTransfer.setData('text/x-source-section', 'script');
        e.dataTransfer.effectAllowed = 'move';
        requestAnimationFrame(function() { row.classList.add('bd-dragging'); });
      });
      row.addEventListener('dragend', function() {
        row.classList.remove('bd-dragging');
        clearDropTargets();
      });

      // Mobile long press
      setupLongPress(row, { id: item.id, type: 'script', text: item.text });

      listEl.appendChild(row);
    });
  }

  // --- Script button in input area ---
  let bdScriptMode = false;

  function toggleBdScriptMode(view) {
    bdScriptMode = !bdScriptMode;
    var suffix = view === 'month' ? '' : 'Week';
    var timeInput = document.getElementById('bdScriptTime' + suffix);
    var scriptBtn = document.getElementById('bdAddScript' + suffix);
    if (timeInput) {
      timeInput.style.display = bdScriptMode ? '' : 'none';
    }
    if (scriptBtn) {
      scriptBtn.classList.toggle('active', bdScriptMode);
    }
  }

  function addFromInput(view, type) {
    var suffix = view === 'month' ? '' : 'Week';
    var input = document.getElementById('bdInput' + suffix);
    var text = input.value.trim();
    if (!text) return;

    if (type === 'script') {
      var timeInput = document.getElementById('bdScriptTime' + suffix);
      var time = timeInput ? timeInput.value : '07:00';
      addEsItem(time, text);
    } else {
      addBrainDumpNote(text, type);
    }
    input.value = '';
  }

  function bindBrainDumpEvents() {
    // Toggle button
    document.getElementById('bdToggle').addEventListener('click', toggleBrainDump);

    // Collapsible section titles
    document.querySelectorAll('.bd-collapsible').forEach(function(el) {
      el.addEventListener('click', function(e) {
        // Don't collapse when clicking info button
        if (e.target.closest('.info-btn')) return;
        toggleSidebarSection(el.dataset.collapse);
      });
    });

    // Month view: input buttons
    document.getElementById('bdAddReminder').addEventListener('click', function() {
      addFromInput('month', 'reminder');
    });
    document.getElementById('bdAddScript').addEventListener('click', function() {
      toggleBdScriptMode('month');
    });
    document.getElementById('bdAddTodo').addEventListener('click', function() {
      addFromInput('month', 'todo');
    });
    document.getElementById('bdInput').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        if (bdScriptMode) {
          addFromInput('month', 'script');
        } else {
          addFromInput('month', 'todo');
        }
      }
    });

    // Week view: input buttons
    document.getElementById('bdAddReminderWeek').addEventListener('click', function() {
      addFromInput('week', 'reminder');
    });
    document.getElementById('bdAddScriptWeek').addEventListener('click', function() {
      toggleBdScriptMode('week');
    });
    document.getElementById('bdAddTodoWeek').addEventListener('click', function() {
      addFromInput('week', 'todo');
    });
    document.getElementById('bdInputWeek').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        if (bdScriptMode) {
          addFromInput('week', 'script');
        } else {
          addFromInput('week', 'todo');
        }
      }
    });

    // Evening Script navigation — Month
    document.getElementById('esPrevMonth').addEventListener('click', function() { navigateEsDate(-1); });
    document.getElementById('esNextMonth').addEventListener('click', function() { navigateEsDate(1); });
    document.getElementById('esAddMonth').addEventListener('click', function() {
      var time = document.getElementById('esTimeMonth').value;
      var text = document.getElementById('esTextMonth').value;
      addEsItem(time, text);
      document.getElementById('esTextMonth').value = '';
    });
    document.getElementById('esTextMonth').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var time = document.getElementById('esTimeMonth').value;
        addEsItem(time, e.target.value);
        e.target.value = '';
      }
    });

    // Evening Script navigation — Week
    document.getElementById('esPrevWeek').addEventListener('click', function() { navigateEsDate(-1); });
    document.getElementById('esNextWeek').addEventListener('click', function() { navigateEsDate(1); });
    document.getElementById('esAddWeek').addEventListener('click', function() {
      var time = document.getElementById('esTimeWeek').value;
      var text = document.getElementById('esTextWeek').value;
      addEsItem(time, text);
      document.getElementById('esTextWeek').value = '';
    });
    document.getElementById('esTextWeek').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var time = document.getElementById('esTimeWeek').value;
        addEsItem(time, e.target.value);
        e.target.value = '';
      }
    });

    // Quick drop modal
    setupModalClose('quickDropOverlay', 'quickDropClose');
    document.getElementById('qdCancel').addEventListener('click', function() { hideModal('quickDropOverlay'); });
    document.getElementById('qdConfirm').addEventListener('click', confirmQuickDrop);

    // Sidebar section drop zones (inter-section drag & drop)
    setupSidebarDropZones();
  }

  // --- Sidebar Drag & Drop Between Sections ---
  function hasSidebarDragData(e) {
    return e.dataTransfer.types.indexOf('application/x-braindump-note') !== -1 ||
           e.dataTransfer.types.indexOf('application/x-evening-script') !== -1;
  }

  function clearDropTargets() {
    document.querySelectorAll('.drop-target-active').forEach(function(el) {
      el.classList.remove('drop-target-active');
    });
    document.querySelectorAll('.bd-drag-over').forEach(function(c) {
      c.classList.remove('bd-drag-over');
    });
  }

  function setupSidebarDropZones() {
    document.querySelectorAll('.bd-section[data-section]').forEach(function(section) {
      var targetType = section.dataset.section;

      section.addEventListener('dragover', function(e) {
        if (hasSidebarDragData(e)) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          section.classList.add('drop-target-active');
        }
      });

      section.addEventListener('dragleave', function(e) {
        if (!section.contains(e.relatedTarget)) {
          section.classList.remove('drop-target-active');
        }
      });

      section.addEventListener('drop', function(e) {
        e.preventDefault();
        section.classList.remove('drop-target-active');
        handleSidebarDrop(e, targetType);
      });
    });
  }

  function handleSidebarDrop(e, toSection) {
    var noteId = e.dataTransfer.getData('application/x-braindump-note');
    var esId = e.dataTransfer.getData('application/x-evening-script');

    if (noteId) {
      handleBrainDumpDrop(noteId, toSection);
    } else if (esId) {
      handleEsItemDrop(esId, toSection);
    }
  }

  function handleBrainDumpDrop(noteId, toSection) {
    var key = getBrainDumpMonthKey();
    var notes = state.brainDump[key] || [];
    var note = notes.find(function(n) { return n.id === noteId; });
    if (!note) return;

    var fromType = note.type;

    // Same section — do nothing
    if ((fromType === 'reminder' && toSection === 'reminders') ||
        (fromType === 'todo' && toSection === 'tasks')) {
      return;
    }

    if (toSection === 'script') {
      // Move to Evening Script — remove from brain dump, show time prompt
      var text = note.text;
      state.brainDump[key] = notes.filter(function(n) { return n.id !== noteId; });
      saveState();
      showTimePrompt(text, function(time) {
        addEsItem(time, text);
      });
    } else {
      // Switch between reminder and todo
      var targetType = toSection === 'reminders' ? 'reminder' : 'todo';
      note.type = targetType;
      if (targetType === 'reminder') note.done = false;
      saveState();
      renderBrainDump();
    }
  }

  function handleEsItemDrop(esId, toSection) {
    if (!esCurrentDate) return;
    var dateKey = getEsDateKey(esCurrentDate);
    var items = state.eveningScript[dateKey] || [];
    var item = items.find(function(i) { return i.id === esId; });
    if (!item) return;

    // Same section — do nothing
    if (toSection === 'script') return;

    var text = item.text;
    state.eveningScript[dateKey] = items.filter(function(i) { return i.id !== esId; });
    saveState();

    var noteType = toSection === 'reminders' ? 'reminder' : 'todo';
    addBrainDumpNote(text, noteType);
  }

  function showTimePrompt(text, callback) {
    var existing = document.getElementById('timePromptOverlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.className = 'time-prompt-overlay';
    overlay.id = 'timePromptOverlay';

    var popup = document.createElement('div');
    popup.className = 'time-prompt';

    var label = document.createElement('div');
    label.className = 'time-prompt-label';
    var truncText = text.length > 25 ? text.substring(0, 25) + '\u2026' : text;
    label.textContent = (state.settings.lang === 'pt-br' ? 'Hor\u00E1rio para "' : 'Time for "') + truncText + '"?';
    popup.appendChild(label);

    var row = document.createElement('div');
    row.className = 'time-prompt-row';

    var suggestedTime = getNextAvailableTime();

    var timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.className = 'time-prompt-input';
    timeInput.value = suggestedTime;
    row.appendChild(timeInput);

    var okBtn = document.createElement('button');
    okBtn.className = 'time-prompt-ok';
    okBtn.textContent = 'OK';
    okBtn.addEventListener('click', function() {
      callback(timeInput.value);
      overlay.remove();
    });
    row.appendChild(okBtn);

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'time-prompt-cancel';
    cancelBtn.textContent = state.settings.lang === 'pt-br' ? 'Cancelar' : 'Cancel';
    cancelBtn.addEventListener('click', function() {
      overlay.remove();
    });
    row.appendChild(cancelBtn);

    popup.appendChild(row);
    overlay.appendChild(popup);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);
    timeInput.focus();

    function handleKeys(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handleKeys);
      } else if (e.key === 'Enter') {
        callback(timeInput.value);
        overlay.remove();
        document.removeEventListener('keydown', handleKeys);
      }
    }
    document.addEventListener('keydown', handleKeys);
  }

  function getNextAvailableTime() {
    if (!esCurrentDate) return '09:00';
    var dateKey = getEsDateKey(esCurrentDate);
    var items = getEsItems(dateKey);
    if (items.length === 0) return '07:00';
    var lastTime = items[items.length - 1].time;
    var parts = lastTime.split(':');
    var h = parseInt(parts[0]) + 1;
    if (h > 23) h = 23;
    return String(h).padStart(2, '0') + ':00';
  }

  // --- Mobile Context Menu (Long Press) ---
  function setupLongPress(el, itemData) {
    var timer = null;

    el.addEventListener('touchstart', function() {
      timer = setTimeout(function() {
        showMobileContextMenu(el, itemData);
      }, 600);
    }, { passive: true });

    el.addEventListener('touchend', function() {
      clearTimeout(timer);
    });

    el.addEventListener('touchmove', function() {
      clearTimeout(timer);
    });
  }

  function showMobileContextMenu(el, itemData) {
    var existing = document.getElementById('mobileContextMenu');
    if (existing) existing.remove();

    var lang = state.settings.lang;
    var menu = document.createElement('div');
    menu.className = 'mobile-context-menu';
    menu.id = 'mobileContextMenu';

    var title = document.createElement('div');
    title.className = 'mcm-title';
    title.textContent = lang === 'pt-br' ? 'Mover para:' : 'Move to:';
    menu.appendChild(title);

    var options = [];
    if (itemData.type !== 'reminder') {
      options.push({ icon: '\uD83D\uDCCC', label: lang === 'pt-br' ? 'N\u00E3o Esque\u00E7a' : "Don't Forget", action: 'reminders' });
    }
    if (itemData.type !== 'script') {
      options.push({ icon: '\uD83D\uDCCB', label: lang === 'pt-br' ? 'Roteiro da Noite' : 'Evening Script', action: 'script' });
    }
    if (itemData.type !== 'todo') {
      options.push({ icon: '\u2611\uFE0F', label: lang === 'pt-br' ? 'Tarefas' : 'Tasks', action: 'tasks' });
    }
    options.push({ icon: '\uD83D\uDDD1\uFE0F', label: lang === 'pt-br' ? 'Excluir' : 'Delete', action: 'delete' });

    options.forEach(function(opt) {
      var btn = document.createElement('button');
      btn.className = 'mcm-option' + (opt.action === 'delete' ? ' mcm-delete' : '');
      btn.innerHTML = '<span>' + opt.icon + '</span> ' + opt.label;
      btn.addEventListener('click', function() {
        closeMobileMenu();
        handleMobileContextAction(itemData, opt.action);
      });
      menu.appendChild(btn);
    });

    var rect = el.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.zIndex = '10000';

    document.body.appendChild(menu);

    requestAnimationFrame(function() {
      var mw = menu.offsetWidth;
      var mh = menu.offsetHeight;
      var left = Math.max(8, Math.min(rect.left, window.innerWidth - mw - 8));
      var top = rect.bottom + 4;
      if (top + mh > window.innerHeight - 8) top = rect.top - mh - 4;
      if (top < 8) top = 8;
      menu.style.left = left + 'px';
      menu.style.top = top + 'px';
    });

    setTimeout(function() {
      document.addEventListener('click', closeMobileMenuOutside);
      document.addEventListener('touchstart', closeMobileMenuOutside);
    }, 10);
  }

  function closeMobileMenu() {
    var menu = document.getElementById('mobileContextMenu');
    if (menu) menu.remove();
    document.removeEventListener('click', closeMobileMenuOutside);
    document.removeEventListener('touchstart', closeMobileMenuOutside);
  }

  function closeMobileMenuOutside(e) {
    var menu = document.getElementById('mobileContextMenu');
    if (menu && !menu.contains(e.target)) {
      closeMobileMenu();
    }
  }

  function handleMobileContextAction(itemData, action) {
    if (action === 'delete') {
      if (itemData.type === 'script') {
        deleteEsItem(itemData.id);
      } else {
        deleteBrainDumpNote(itemData.id);
      }
      return;
    }

    if (itemData.type === 'script') {
      // From Evening Script
      if (!esCurrentDate) return;
      var dateKey = getEsDateKey(esCurrentDate);
      var items = state.eveningScript[dateKey] || [];
      var item = items.find(function(i) { return i.id === itemData.id; });
      if (!item) return;
      var text = item.text;
      state.eveningScript[dateKey] = items.filter(function(i) { return i.id !== itemData.id; });
      saveState();
      if (action === 'reminders') {
        addBrainDumpNote(text, 'reminder');
      } else if (action === 'tasks') {
        addBrainDumpNote(text, 'todo');
      }
    } else {
      // From brain dump (reminder or todo)
      var key = getBrainDumpMonthKey();
      var notes = state.brainDump[key] || [];
      var note = notes.find(function(n) { return n.id === itemData.id; });
      if (!note) return;
      var text = note.text;

      if (action === 'script') {
        state.brainDump[key] = notes.filter(function(n) { return n.id !== itemData.id; });
        saveState();
        showTimePrompt(text, function(time) {
          addEsItem(time, text);
        });
      } else if (action === 'reminders') {
        note.type = 'reminder';
        note.done = false;
        saveState();
        renderBrainDump();
      } else if (action === 'tasks') {
        note.type = 'todo';
        saveState();
        renderBrainDump();
      }
    }
  }

  // --- Cell Popup (Year/Quarter click) ---
  function openCellPopup(cell, month, day, labels) {
    closeCellPopup();

    var lang = state.settings.lang;
    var dateStr = keyToDate(month + '-' + day);
    var dow = dayOfWeek(month, day);
    var dowStr = dowLabel(dow);
    var monthStr = monthLabel(month);

    var popup = document.createElement('div');
    popup.className = 'cell-popup';
    popup.id = 'cellPopup';

    // Header
    var header = document.createElement('div');
    header.className = 'cell-popup-header';
    header.innerHTML = '<span>' + day + ' ' + dowStr + ' ' + monthStr + ' ' + YEAR + '</span>' +
      '<button class="cell-popup-close" aria-label="Close">&times;</button>';
    popup.appendChild(header);

    header.querySelector('.cell-popup-close').addEventListener('click', function(e) {
      e.stopPropagation();
      closeCellPopup();
    });

    // Label list
    var list = document.createElement('div');
    list.className = 'cell-popup-list';

    labels.forEach(function(label) {
      var cat = CATEGORIES.find(function(c) { return c.key === label.category; });
      var item = document.createElement('div');
      item.className = 'cell-popup-item';
      item.style.borderLeftColor = cat ? cat.color : '#ADADAD';

      var emoji = document.createElement('span');
      emoji.className = 'cell-popup-emoji';
      emoji.textContent = cat ? cat.emoji : '';
      item.appendChild(emoji);

      var text = document.createElement('span');
      text.className = 'cell-popup-text';
      text.textContent = label.text;
      item.appendChild(text);

      var catName_ = document.createElement('span');
      catName_.className = 'cell-popup-cat';
      catName_.textContent = catName(label.category);
      item.appendChild(catName_);

      item.addEventListener('click', function(e) {
        e.stopPropagation();
        closeCellPopup();
        openEditLabelModal(label.id);
      });

      list.appendChild(item);
    });
    popup.appendChild(list);

    // Footer
    var footer = document.createElement('div');
    footer.className = 'cell-popup-footer';

    var btnNew = document.createElement('button');
    btnNew.className = 'cell-popup-btn';
    btnNew.textContent = '+ ' + t('newLabel');
    btnNew.addEventListener('click', function(e) {
      e.stopPropagation();
      closeCellPopup();
      openLabelModal(month, day);
    });
    footer.appendChild(btnNew);

    var isYearOrQuarter = ['year','q1','q2','q3','q4'].includes(zoomMode);
    if (isYearOrQuarter) {
      var btnMonth = document.createElement('button');
      btnMonth.className = 'cell-popup-btn cell-popup-btn-secondary';
      btnMonth.textContent = lang === 'pt-br' ? 'Ver no Mês' : 'View in Month';
      btnMonth.addEventListener('click', function(e) {
        e.stopPropagation();
        closeCellPopup();
        setZoom('month', month);
      });
      footer.appendChild(btnMonth);
    }

    // "View Day" button — available from all views except day
    if (zoomMode !== 'day') {
      var btnDay = document.createElement('button');
      btnDay.className = 'cell-popup-btn cell-popup-btn-secondary';
      btnDay.textContent = lang === 'pt-br' ? 'Ver Dia' : 'View Day';
      btnDay.addEventListener('click', function(e) {
        e.stopPropagation();
        closeCellPopup();
        goToDay(month, day);
      });
      footer.appendChild(btnDay);
    }
    popup.appendChild(footer);

    // Position popup near cell
    var rect = cell.getBoundingClientRect();
    popup.style.position = 'fixed';
    popup.style.zIndex = '9000';

    document.body.appendChild(popup);

    // Adjust position after rendering
    requestAnimationFrame(function() {
      var pw = popup.offsetWidth;
      var ph = popup.offsetHeight;
      var left = rect.left + rect.width / 2 - pw / 2;
      var top = rect.bottom + 4;

      // Keep on screen
      if (left < 8) left = 8;
      if (left + pw > window.innerWidth - 8) left = window.innerWidth - 8 - pw;
      if (top + ph > window.innerHeight - 8) {
        top = rect.top - ph - 4;
      }
      if (top < 8) top = 8;

      popup.style.left = left + 'px';
      popup.style.top = top + 'px';
    });

    // Close on outside click (delayed to avoid closing immediately)
    setTimeout(function() {
      document.addEventListener('click', closeCellPopupOutside);
    }, 10);
  }

  function closeCellPopup() {
    var existing = document.getElementById('cellPopup');
    if (existing) existing.remove();
    document.removeEventListener('click', closeCellPopupOutside);
  }

  function closeCellPopupOutside(e) {
    var popup = document.getElementById('cellPopup');
    if (popup && !popup.contains(e.target)) {
      closeCellPopup();
    }
  }

  // --- Tutorial / Onboarding ---
  var TUTORIAL_KEY = 'bac2026_tutorial_completed';
  var tutorialStep = 0;
  var TUTORIAL_STEPS = 8;
  var getLightChecks = {};

  var TUTORIAL_TEXT = {
    step0: {
      icon: '\uD83D\uDCC5',
      title: { 'pt-br': 'Bons anos n\u00E3o acontecem por acidente.', en: "Good years don't happen by accident." },
      subtitle: {
        'pt-br': 'Este calend\u00E1rio usa o m\u00E9todo de Jesse Itzler para transformar 2026 no seu ano mais memor\u00E1vel.',
        en: "This calendar uses Jesse Itzler's method to make 2026 your most memorable year."
      },
      body: {
        'pt-br': 'Em 2 minutos voc\u00EA vai aprender a:\n\uD83C\uDFD4\uFE0F Definir seu MISOGI\n\uD83C\uDFAF Planejar mini-aventuras\n\uD83D\uDCAA Construir h\u00E1bitos vencedores\n\uD83D\uDCCB Criar seu roteiro di\u00E1rio',
        en: "In 2 minutes you'll learn to:\n\uD83C\uDFD4\uFE0F Define your MISOGI\n\uD83C\uDFAF Plan mini-adventures\n\uD83D\uDCAA Build winning habits\n\uD83D\uDCCB Create your daily script"
      },
      cta: { 'pt-br': 'Come\u00E7ar o tour \u25B6', en: 'Start the tour \u25B6' }
    },
    step1: {
      icon: '\uD83E\uDEB6',
      title: { 'pt-br': 'CHEGAR LEVE', en: 'GET LIGHT' },
      subtitle: { 'pt-br': 'O poder da subtra\u00E7\u00E3o', en: 'The power of subtraction' },
      quote: {
        'pt-br': 'Subtra\u00E7\u00E3o \u00E9 um superpoder. Pessoas de sucesso n\u00E3o adicionam mais metas \u2014 elas eliminam distra\u00E7\u00F5es.',
        en: "Subtraction is a superpower. Successful people don't add more goals \u2014 they eliminate distractions."
      },
      checklist: {
        'pt-br': ['Limpar arm\u00E1rio (30min, doe o que n\u00E3o usa)', 'Cancelar assinaturas in\u00FAteis', 'Zerar a caixa de entrada', 'Limpar o carro e a mesa', 'Avaliar compromissos que drenam energia'],
        en: ['Clean closet (30min, donate what you don\'t use)', 'Cancel useless subscriptions', 'Inbox zero', 'Clean car and desk', 'Evaluate energy-draining commitments']
      },
      tip: {
        'pt-br': 'Dica: isso leva 1-2 horas e muda como voc\u00EA entra no ano.',
        en: 'Tip: this takes 1-2 hours and changes how you start the year.'
      }
    },
    step2: {
      icon: '\uD83C\uDFD4\uFE0F',
      title: { 'pt-br': 'O MISOGI', en: 'THE MISOGI' },
      subtitle: { 'pt-br': 'Uma grande coisa que define o ano', en: 'One big year-defining thing' },
      quote: {
        'pt-br': 'Quando tiver 80 anos, n\u00E3o vai lembrar de reuni\u00E3o nenhuma. Mas vai lembrar do ano que escalou aquela montanha.',
        en: "When you're 80, you won't remember a single Tuesday meeting. But you'll remember the year you climbed that mountain."
      },
      body: {
        'pt-br': 'Escolha UMA meta marcante para 2026:\n\u2022 Escrever um livro\n\u2022 Correr uma maratona\n\u2022 Lan\u00E7ar um podcast\n\u2022 Atravessar o Brasil de bicicleta\n\nColoque essa meta como a PRIMEIRA etiqueta no seu calend\u00E1rio. Use a categoria \uD83C\uDFD4\uFE0F Aventura.',
        en: "Pick ONE memorable goal for 2026:\n\u2022 Write a book\n\u2022 Run a marathon\n\u2022 Launch a podcast\n\u2022 Bike across the country\n\nPlace this goal as the FIRST label on your calendar. Use the \uD83C\uDFD4\uFE0F Adventure category."
      },
      stat: {
        'pt-br': '50 anos \u00D7 1 Misogi = 50 conquistas extraordin\u00E1rias no seu curr\u00EDculo de vida.',
        en: '50 years \u00D7 1 Misogi = 50 extraordinary achievements on your life r\u00E9sum\u00E9.'
      }
    },
    step3: {
      icon: '\uD83C\uDFAF',
      title: { 'pt-br': 'A REGRA DO KEVIN', en: "KEVIN'S RULE" },
      subtitle: { 'pt-br': '1 mini-aventura a cada 8 semanas', en: '1 mini-adventure every 8 weeks' },
      quote: {
        'pt-br': 'Se voc\u00EA n\u00E3o consegue tirar 1 dia a cada 2 meses pra fazer algo diferente, seu sistema est\u00E1 totalmente fora de equil\u00EDbrio.',
        en: "If you can't take 1 day every 2 months to do something different, your system is totally out of balance."
      },
      body: {
        'pt-br': '6 dias por ano. \u00C9 s\u00F3 isso.\n\nFEV \u2500 ABR \u2500 JUN \u2500 AGO \u2500 OUT \u2500 DEZ\n\nExemplos acess\u00EDveis:\n\u2022 Trilha num parque (custo: R$0)\n\u2022 Show de uma banda local\n\u2022 Dia de pesca com os filhos\n\u2022 Visitar amigos de faculdade',
        en: "6 days per year. That's it.\n\nFEB \u2500 APR \u2500 JUN \u2500 AUG \u2500 OCT \u2500 DEC\n\nAccessible examples:\n\u2022 Hike in a park (cost: $0)\n\u2022 Local band concert\n\u2022 Fishing day with the kids\n\u2022 Visit college friends"
      },
      stat: {
        'pt-br': '40 anos \u00D7 6/ano = 240 mini-aventuras que nunca teriam acontecido.',
        en: '40 years \u00D7 6/year = 240 mini-adventures that would never have happened.'
      }
    },
    step4: {
      icon: '\uD83D\uDCAA',
      title: { 'pt-br': 'H\u00C1BITOS VENCEDORES', en: 'WINNING HABITS' },
      subtitle: { 'pt-br': '1 novo h\u00E1bito por trimestre', en: '1 new habit per quarter' },
      quote: {
        'pt-br': 'Esque\u00E7a resolu\u00E7\u00F5es. Elas falham porque exigem mudan\u00E7a total da noite pro dia.',
        en: 'Forget resolutions. They fail because they demand a total overnight identity shift.'
      },
      body: {
        'pt-br': 'Adicione 1 h\u00E1bito a cada 3 meses:\n\nQ1 (JAN-MAR) \u2014 Ex: Beber 3L de \u00E1gua/dia\nQ2 (ABR-JUN) \u2014 Ex: 10min medita\u00E7\u00E3o/dia\nQ3 (JUL-SET) \u2014 Ex: Nunca chegar atrasado\nQ4 (OUT-DEZ) \u2014 Ex: Roteiro da noite',
        en: 'Add 1 habit every 3 months:\n\nQ1 (JAN-MAR) \u2014 e.g. Drink 3L water/day\nQ2 (APR-JUN) \u2014 e.g. 10min meditation/day\nQ3 (JUL-SEP) \u2014 e.g. Never arrive late\nQ4 (OCT-DEC) \u2014 e.g. Evening script'
      },
      stat: {
        'pt-br': '4/ano \u00D7 10 anos = 40 h\u00E1bitos transformadores. Sem burnout.',
        en: '4/year \u00D7 10 years = 40 life-changing habits. No burnout.'
      }
    },
    step5: {
      icon: '\uD83D\uDCE6',
      title: { 'pt-br': 'AS 8 CAIXAS', en: 'THE 8 BOXES' },
      subtitle: { 'pt-br': 'Seu invent\u00E1rio de vida', en: 'Your life inventory' },
      quote: {
        'pt-br': 'Para ser a vers\u00E3o A+ de si mesmo, precisa saber exatamente pelo que est\u00E1 trabalhando.',
        en: "To be the A+ version of yourself, you need to know exactly what you're working toward."
      },
      body: {
        'pt-br': 'Cada cor no calend\u00E1rio \u00E9 uma \u00E1rea da sua vida:\n\n\uD83C\uDFD4\uFE0F Aventura \u00A0 \uD83D\uDC91 Casamento\n\uD83D\uDCAA Sa\u00FAde \u00A0\u00A0\u00A0\u00A0 \uD83D\uDC76 Filhos\n\uD83D\uDCBC Neg\u00F3cios \u00A0 \uD83E\uDDD8 Pessoal\n\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66 Fam\u00EDlia \u00A0\u00A0 \uD83D\uDCB0 Finan\u00E7as\n\nClique nos quadrados no topo para FILTRAR e ver s\u00F3 uma categoria de cada vez.',
        en: "Each color on the calendar is a life area:\n\n\uD83C\uDFD4\uFE0F Adventure \u00A0 \uD83D\uDC91 Marriage\n\uD83D\uDCAA Health \u00A0\u00A0\u00A0\u00A0\u00A0 \uD83D\uDC76 Kids\n\uD83D\uDCBC Business \u00A0\u00A0 \uD83E\uDDD8 Personal\n\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66 Family \u00A0\u00A0\u00A0\u00A0 \uD83D\uDCB0 Finance\n\nClick the colored squares at the top to FILTER and see one category at a time."
      }
    },
    step6: {
      icon: '\uD83D\uDCCB',
      title: { 'pt-br': 'SEU COCKPIT', en: 'YOUR COCKPIT' },
      subtitle: { 'pt-br': 'Vis\u00E3o da semana + Roteiro da noite', en: 'Week at a Glance + Evening Script' },
      quote: {
        'pt-br': 'O dia come\u00E7a na noite anterior. A competi\u00E7\u00E3o \u00E9 boa demais pra acordar improvisando.',
        en: "The day starts the night before. The competition is too good to wake up and wing it."
      },
      body: {
        'pt-br': '\uD83D\uDC41\uFE0F VIS\u00C3O DA SEMANA\nTodo domingo \u00E0 noite, olhe sua semana e pergunte: "O que merece minha energia?"\n\n\uD83D\uDCCC N\u00C3O ESQUE\u00C7A\nLembretes r\u00E1pidos. Arraste pro calend\u00E1rio pra agendar.\n\n\uD83D\uDCCB ROTEIRO DA NOITE\nMonte o script do dia seguinte: "7h filhos, 8h treino, 9h reuni\u00E3o"\n\n\u2611\uFE0F TAREFAS\nChecklist do que precisa ser feito.\n\n\uD83D\uDCA1 Dica: arraste itens entre se\u00E7\u00F5es pra transformar lembretes em tarefas ou roteiro!',
        en: "\uD83D\uDC41\uFE0F WEEK AT A GLANCE\nEvery Sunday night, look at your week and ask: \"What deserves my energy?\"\n\n\uD83D\uDCCC DON'T FORGET\nQuick reminders. Drag to calendar to schedule.\n\n\uD83D\uDCCB EVENING SCRIPT\nBuild tomorrow's script: \"7am kids, 8am workout, 9am meeting\"\n\n\u2611\uFE0F TASKS\nChecklist of what needs to be done.\n\n\uD83D\uDCA1 Tip: drag items between sections to turn reminders into tasks or scripts!"
      }
    },
    step7: {
      icon: '\uD83C\uDF89',
      title: { 'pt-br': 'PRONTO PRA ATACAR 2026!', en: 'READY TO ATTACK 2026!' },
      body: {
        'pt-br': 'Seus pr\u00F3ximos passos:\n\n1\uFE0F\u20E3 Coloque seu MISOGI no calend\u00E1rio\n2\uFE0F\u20E3 Agende 6 mini-aventuras\n3\uFE0F\u20E3 Escolha o h\u00E1bito do Q1\n4\uFE0F\u20E3 Monte o roteiro de amanh\u00E3',
        en: "Your next steps:\n\n1\uFE0F\u20E3 Place your MISOGI on the calendar\n2\uFE0F\u20E3 Schedule 6 mini-adventures\n3\uFE0F\u20E3 Pick your Q1 habit\n4\uFE0F\u20E3 Build tomorrow's script"
      },
      stat: {
        'pt-br': 'No final do ano, pergunte-se: "Pelo que eu quero brindar?"',
        en: 'At the end of the year, ask yourself: "What do I want to toast to?"'
      },
      cta: { 'pt-br': '\uD83D\uDE80 Come\u00E7ar meu ano!', en: '\uD83D\uDE80 Start my year!' }
    },
    skip: { 'pt-br': 'Pular tutorial', en: 'Skip tutorial' },
    back: { 'pt-br': '\u25C0 Voltar', en: '\u25C0 Back' },
    next: { 'pt-br': 'Pr\u00F3ximo \u25B6', en: 'Next \u25B6' }
  };

  // Spotlights: selector for each step (null = centered card, no spotlight)
  var STEP_SPOTLIGHTS = [
    null,                // 0: Welcome
    null,                // 1: Get Light
    '#calendarGrid',     // 2: Misogi — full year grid
    '#calendarGrid',     // 3: Kevin's Rule — year grid
    '.zoom-group',       // 4: Winning Habits — Q1-Q4 buttons
    '.filter-switcher',  // 5: 8 Boxes — category filters
    null,                // 6: Cockpit/Sidebar — not visible in year view
    null                 // 7: GO!
  ];

  function tt(obj) {
    if (!obj) return '';
    return obj[state.settings.lang] || obj['en'] || '';
  }

  function shouldShowTutorial() {
    return !localStorage.getItem(TUTORIAL_KEY);
  }

  function completeTutorial() {
    localStorage.setItem(TUTORIAL_KEY, 'true');
    closeTutorial();
  }

  function resetTutorial() {
    localStorage.removeItem(TUTORIAL_KEY);
  }

  function showTutorial() {
    tutorialStep = 0;
    getLightChecks = {};
    var overlay = document.getElementById('tutorialOverlay');
    overlay.hidden = false;
    renderTutorialStep();
  }

  function closeTutorial() {
    var overlay = document.getElementById('tutorialOverlay');
    overlay.classList.add('tutorial-closing');
    setTimeout(function() {
      overlay.hidden = true;
      overlay.classList.remove('tutorial-closing');
      clearSpotlight();
    }, 300);
  }

  function nextStep() {
    if (tutorialStep < TUTORIAL_STEPS - 1) {
      tutorialStep++;
      renderTutorialStep();
    }
  }

  function prevStep() {
    if (tutorialStep > 0) {
      tutorialStep--;
      renderTutorialStep();
    }
  }

  function skipTutorial() {
    completeTutorial();
  }

  function clearSpotlight() {
    var mask = document.getElementById('tutorialMask');
    var spot = document.getElementById('tutorialSpotlight');
    mask.style.clipPath = '';
    spot.hidden = true;
  }

  function spotlightElement(selector) {
    var mask = document.getElementById('tutorialMask');
    var spot = document.getElementById('tutorialSpotlight');

    if (!selector) {
      clearSpotlight();
      return null;
    }

    var el = document.querySelector(selector);
    if (!el) {
      clearSpotlight();
      return null;
    }

    var rect = el.getBoundingClientRect();
    var pad = 12;
    var x = rect.left - pad;
    var y = rect.top - pad;
    var w = rect.width + pad * 2;
    var h = rect.height + pad * 2;

    // Inverse clip-path polygon (darken everything EXCEPT the spotlight area)
    mask.style.clipPath = 'polygon(' +
      '0% 0%, 0% 100%, ' +
      x + 'px 100%, ' + x + 'px ' + y + 'px, ' +
      (x + w) + 'px ' + y + 'px, ' +
      (x + w) + 'px ' + (y + h) + 'px, ' +
      x + 'px ' + (y + h) + 'px, ' +
      x + 'px 100%, ' +
      '100% 100%, 100% 0%)';

    spot.hidden = false;
    spot.style.left = x + 'px';
    spot.style.top = y + 'px';
    spot.style.width = w + 'px';
    spot.style.height = h + 'px';

    return { left: x, top: y, width: w, height: h, right: x + w, bottom: y + h };
  }

  function positionCard(spotRect) {
    var card = document.getElementById('tutorialCard');
    card.style.transform = '';
    card.style.left = '';
    card.style.top = '';
    card.style.right = '';
    card.style.bottom = '';

    if (!spotRect) {
      // Center
      card.style.left = '50%';
      card.style.top = '50%';
      card.style.transform = 'translate(-50%, -50%)';
      return;
    }

    var margin = 24;
    var cardW = Math.min(420, window.innerWidth * 0.9);
    var cardH = card.offsetHeight || 400;

    // Prefer below spotlight
    if (spotRect.bottom + margin + cardH < window.innerHeight) {
      card.style.top = spotRect.bottom + margin + 'px';
      card.style.left = Math.max(16, Math.min(spotRect.left, window.innerWidth - cardW - 16)) + 'px';
    }
    // Above
    else if (spotRect.top - margin - cardH > 0) {
      card.style.top = (spotRect.top - margin - cardH) + 'px';
      card.style.left = Math.max(16, Math.min(spotRect.left, window.innerWidth - cardW - 16)) + 'px';
    }
    // Right side
    else if (spotRect.right + margin + cardW < window.innerWidth) {
      card.style.top = Math.max(16, spotRect.top) + 'px';
      card.style.left = (spotRect.right + margin) + 'px';
    }
    // Fallback: center
    else {
      card.style.left = '50%';
      card.style.top = '50%';
      card.style.transform = 'translate(-50%, -50%)';
    }
  }

  function buildDots() {
    var html = '<div class="tutorial-dots">';
    for (var i = 0; i < TUTORIAL_STEPS; i++) {
      var cls = 'dot';
      if (i === tutorialStep) cls += ' active';
      else if (i < tutorialStep) cls += ' completed';
      html += '<div class="' + cls + '"></div>';
    }
    html += '</div>';
    return html;
  }

  function buildNav(isFirst, isLast, ctaText) {
    var lang = state.settings.lang;
    var html = '<div class="tutorial-nav">';
    html += buildDots();
    html += '<div class="tutorial-nav-btns">';

    if (isFirst) {
      html += '<button class="tutorial-nav-btn primary" id="tutNext">' + (ctaText || tt(TUTORIAL_TEXT.next)) + '</button>';
    } else if (isLast) {
      html += '<button class="tutorial-nav-btn" id="tutPrev">' + tt(TUTORIAL_TEXT.back) + '</button>';
      html += '<button class="tutorial-nav-btn primary" id="tutFinish">' + ctaText + '</button>';
    } else {
      html += '<button class="tutorial-nav-btn" id="tutPrev">' + tt(TUTORIAL_TEXT.back) + '</button>';
      html += '<button class="tutorial-nav-btn primary" id="tutNext">' + tt(TUTORIAL_TEXT.next) + '</button>';
    }

    html += '</div></div>';
    return html;
  }

  function renderTutorialStep() {
    var card = document.getElementById('tutorialCard');
    var data = TUTORIAL_TEXT['step' + tutorialStep];
    if (!data) return;

    var spotSelector = STEP_SPOTLIGHTS[tutorialStep];
    var spotRect = spotlightElement(spotSelector);

    var html = '<button class="tutorial-skip" id="tutSkip">' + tt(TUTORIAL_TEXT.skip) + '</button>';

    // Icon
    html += '<div class="step-icon">' + (data.icon || '') + '</div>';

    // Title
    if (data.title) {
      html += '<div class="step-title">' + tt(data.title) + '</div>';
    }

    // Subtitle
    if (data.subtitle) {
      html += '<div class="step-subtitle">' + tt(data.subtitle) + '</div>';
    }

    // Quote
    if (data.quote) {
      html += '<div class="step-quote">\u201C' + tt(data.quote) + '\u201D</div>';
    }

    // Body
    if (data.body) {
      html += '<div class="step-body">' + tt(data.body).replace(/\n/g, '<br>') + '</div>';
    }

    // Checklist (step 1 - Get Light)
    if (data.checklist) {
      var items = tt(data.checklist);
      html += '<div class="step-checklist">';
      items.forEach(function(item, idx) {
        var checked = getLightChecks[idx] ? ' checked' : '';
        html += '<label class="step-check-item"><input type="checkbox" data-idx="' + idx + '"' + checked + '><span>' + item + '</span></label>';
      });
      html += '</div>';
      if (data.tip) {
        html += '<div class="step-tip">' + tt(data.tip) + '</div>';
      }
    }

    // Stat
    if (data.stat) {
      html += '<div class="step-stat">' + tt(data.stat) + '</div>';
    }

    // Navigation
    var isFirst = tutorialStep === 0;
    var isLast = tutorialStep === TUTORIAL_STEPS - 1;
    html += buildNav(isFirst, isLast, data.cta ? tt(data.cta) : null);

    card.innerHTML = html;

    // Position card after content render
    requestAnimationFrame(function() {
      positionCard(spotRect);
    });

    // Bind events
    var skipBtn = document.getElementById('tutSkip');
    if (skipBtn) skipBtn.addEventListener('click', skipTutorial);

    var nextBtn = document.getElementById('tutNext');
    if (nextBtn) nextBtn.addEventListener('click', nextStep);

    var prevBtn = document.getElementById('tutPrev');
    if (prevBtn) prevBtn.addEventListener('click', prevStep);

    var finishBtn = document.getElementById('tutFinish');
    if (finishBtn) finishBtn.addEventListener('click', function() {
      launchConfetti();
      setTimeout(completeTutorial, 800);
    });

    // Checklist handlers
    card.querySelectorAll('.step-check-item input').forEach(function(cb) {
      cb.addEventListener('change', function() {
        getLightChecks[cb.dataset.idx] = cb.checked;
      });
    });
  }

  function launchConfetti() {
    var colors = ['#1E90FF', '#FF69B4', '#7CB342', '#9C82D4', '#FF6D00', '#FFD600', '#FF7043', '#00BCD4'];
    var container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    for (var i = 0; i < 60; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = (Math.random() * 100) + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      piece.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
      container.appendChild(piece);
    }

    setTimeout(function() { container.remove(); }, 2000);
  }

  // --- Init ---
  function init() {
    // Device detection
    applyDevice();
    window.addEventListener('resize', applyDevice);
    window.addEventListener('orientationchange', () => setTimeout(applyDevice, 100));

    // Apply saved theme
    setTheme(state.settings.theme);

    // Set lang
    document.documentElement.lang = state.settings.lang === 'pt-br' ? 'pt-BR' : 'en';
    document.getElementById('btnLang').textContent = t('langToggle');

    // Render
    renderGrid();
    renderFilterTooltips();
    updateDashboard();
    updateI18nTexts();

    // Events
    bindEvents();
    bindInfoButtons();

    // Mobile scroll
    requestAnimationFrame(scrollToToday);

    // TV idle timer
    if (currentDevice === 'tv-oled') startIdleTimer();

    // PWA
    registerSW();

    // Help button (reopen tutorial)
    document.getElementById('btnHelp').addEventListener('click', function() {
      resetTutorial();
      showTutorial();
    });

    // Tutorial on first visit
    if (shouldShowTutorial()) {
      setTimeout(showTutorial, 500);
    }

    // Firebase sync
    if (window.BACSync) {
      window.BACSync.renderUI();

      // Listen for real-time updates from other devices
      window.BACSync.listen(function (cloudData) {
        reloadFromState(cloudData);
      });

      // Handle calendar switching
      window.BACSync._onCalendarSwitch = function () {
        state = loadState();
        renderGrid();
        updateDashboard();
        if (typeof renderMonthView === 'function') renderMonthView();
        if (typeof renderWeekView === 'function') renderWeekView();
        // Re-subscribe to new calendar
        window.BACSync.listen(function (cloudData) {
          reloadFromState(cloudData);
        });
        // Load cloud data for new calendar
        window.BACSync.loadFromCloud().then(function (cloudData) {
          if (cloudData) reloadFromState(cloudData);
        });
      };
    }
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
