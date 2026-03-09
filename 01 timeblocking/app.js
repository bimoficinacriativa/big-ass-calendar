(function () {
  'use strict';

  const START_HOUR = 5;
  const END_HOUR = 23;
  const THEME_KEY = 'timeboxing_theme';

  const dateInput = document.getElementById('current-date');
  const prevBtn = document.getElementById('prev-day');
  const nextBtn = document.getElementById('next-day');
  const todayBtn = document.getElementById('today-btn');
  const clearBtn = document.getElementById('clear-btn');
  const scheduleBody = document.getElementById('schedule-body');
  const braindump = document.getElementById('braindump');
  const categoryPicker = document.getElementById('category-picker');

  let currentDate = formatDate(new Date());
  let activeCategoryCell = null;
  let currentHourInterval = null;

  // --- Theme system ---

  const THEME_COLORS = {
    peach: '#B65B3D', orange: '#FF612E', brown: '#B65B3D',
    lightblue: '#225C75', blue: '#0094D6', teal: '#225C75',
    white: '#212121', silver: '#3B3B3B', gray: '#3B3B3B',
    darkgray: '#3B3B3B', charcoal: '#0094D6', black: '#000000'
  };

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    document.querySelectorAll('.theme-dot').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = THEME_COLORS[theme] || '#0094D6';
    }

    localStorage.setItem(THEME_KEY, theme);
  }

  function loadTheme() {
    return localStorage.getItem(THEME_KEY) || 'blue';
  }

  document.querySelectorAll('.theme-dot').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(btn.getAttribute('data-theme'));
    });
  });

  // --- Utils ---

  function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function storageKey(date) {
    return `timeboxing_${date}`;
  }

  function loadDay(date) {
    const raw = localStorage.getItem(storageKey(date));
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return { priorities: ['', '', ''], braindump: '', schedule: {} };
  }

  function saveDay(date, data) {
    localStorage.setItem(storageKey(date), JSON.stringify(data));
  }

  function getData() {
    return loadDay(currentDate);
  }

  function saveField(field, value) {
    const data = getData();
    if (field === 'braindump') {
      data.braindump = value;
    }
    saveDay(currentDate, data);
  }

  function savePriority(index, value) {
    const data = getData();
    data.priorities[index] = value;
    saveDay(currentDate, data);
  }

  function saveScheduleCell(key, text, category) {
    const data = getData();
    if (!text && !category) {
      delete data.schedule[key];
    } else {
      data.schedule[key] = { text: text || '', category: category || '' };
    }
    saveDay(currentDate, data);
  }

  // --- Build schedule table ---

  function buildSchedule() {
    scheduleBody.innerHTML = '';
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      const tr = document.createElement('tr');
      tr.dataset.hour = h;

      // Hour cell
      const hourTd = document.createElement('td');
      hourTd.className = 'hour-cell';
      hourTd.textContent = `${String(h).padStart(2, '0')}h`;
      tr.appendChild(hourTd);

      // :00 cell
      tr.appendChild(createTimeCell(h, '00'));
      // :30 cell
      tr.appendChild(createTimeCell(h, '30'));

      scheduleBody.appendChild(tr);
    }
  }

  function createTimeCell(hour, half) {
    const td = document.createElement('td');
    td.className = 'time-cell';
    const key = `${hour}_${half}`;
    td.dataset.key = key;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell-input';
    input.placeholder = '';
    input.addEventListener('input', function () {
      const cat = td.getAttribute('data-cat') || '';
      saveScheduleCell(key, input.value, cat);
    });

    const dot = document.createElement('div');
    dot.className = 'category-dot';
    dot.title = 'Categoria';
    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      openCategoryPicker(td, dot);
    });

    td.appendChild(input);
    td.appendChild(dot);
    return td;
  }

  // --- Category Picker ---

  function openCategoryPicker(cell, dot) {
    activeCategoryCell = cell;
    const rect = dot.getBoundingClientRect();
    categoryPicker.style.top = (rect.bottom + 4) + 'px';
    categoryPicker.style.left = (rect.left - 80) + 'px';
    categoryPicker.classList.remove('hidden');

    // Adjust if off-screen
    requestAnimationFrame(function () {
      const pickerRect = categoryPicker.getBoundingClientRect();
      if (pickerRect.right > window.innerWidth) {
        categoryPicker.style.left = (window.innerWidth - pickerRect.width - 8) + 'px';
      }
      if (pickerRect.left < 0) {
        categoryPicker.style.left = '8px';
      }
    });
  }

  function closeCategoryPicker() {
    categoryPicker.classList.add('hidden');
    activeCategoryCell = null;
  }

  categoryPicker.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-category]');
    if (!btn || !activeCategoryCell) return;

    const cat = btn.dataset.category;
    const cell = activeCategoryCell;
    const key = cell.dataset.key;
    const input = cell.querySelector('.cell-input');
    const dot = cell.querySelector('.category-dot');

    if (cat) {
      cell.setAttribute('data-cat', cat);
      dot.classList.add('has-category');
    } else {
      cell.removeAttribute('data-cat');
      dot.classList.remove('has-category');
    }

    saveScheduleCell(key, input.value, cat);
    closeCategoryPicker();
  });

  document.addEventListener('click', function (e) {
    if (!categoryPicker.contains(e.target) && !e.target.classList.contains('category-dot')) {
      closeCategoryPicker();
    }
  });

  // --- Render day data ---

  function renderDay() {
    const data = loadDay(currentDate);
    dateInput.value = currentDate;

    // Priorities
    document.querySelectorAll('.priority-input').forEach(function (input) {
      const idx = parseInt(input.dataset.priority, 10);
      input.value = data.priorities[idx] || '';
    });

    // Brain dump
    braindump.value = data.braindump || '';

    // Schedule
    const cells = scheduleBody.querySelectorAll('td.time-cell');
    cells.forEach(function (td) {
      const key = td.dataset.key;
      const input = td.querySelector('.cell-input');
      const dot = td.querySelector('.category-dot');
      const entry = data.schedule[key];

      if (entry) {
        input.value = entry.text || '';
        if (entry.category) {
          td.setAttribute('data-cat', entry.category);
          dot.classList.add('has-category');
        } else {
          td.removeAttribute('data-cat');
          dot.classList.remove('has-category');
        }
      } else {
        input.value = '';
        td.removeAttribute('data-cat');
        dot.classList.remove('has-category');
      }
    });

    highlightCurrentHour();
  }

  // --- Current hour highlight ---

  function highlightCurrentHour() {
    const rows = scheduleBody.querySelectorAll('tr');
    rows.forEach(function (tr) { tr.classList.remove('current-hour'); });

    const now = new Date();
    if (currentDate !== formatDate(now)) return;

    const h = now.getHours();
    if (h >= START_HOUR && h <= END_HOUR) {
      const row = scheduleBody.querySelector(`tr[data-hour="${h}"]`);
      if (row) row.classList.add('current-hour');
    }
  }

  // --- Date navigation ---

  function setDate(dateStr) {
    currentDate = dateStr;
    renderDay();
  }

  function shiftDate(days) {
    const d = new Date(currentDate + 'T12:00:00');
    d.setDate(d.getDate() + days);
    setDate(formatDate(d));
  }

  prevBtn.addEventListener('click', function () { shiftDate(-1); });
  nextBtn.addEventListener('click', function () { shiftDate(1); });
  todayBtn.addEventListener('click', function () { setDate(formatDate(new Date())); });

  dateInput.addEventListener('change', function () {
    if (dateInput.value) setDate(dateInput.value);
  });

  // --- Clear day ---

  clearBtn.addEventListener('click', function () {
    if (confirm('Limpar todos os dados deste dia?')) {
      localStorage.removeItem(storageKey(currentDate));
      renderDay();
    }
  });

  // --- Event listeners for saving ---

  document.querySelectorAll('.priority-input').forEach(function (input) {
    input.addEventListener('input', function () {
      savePriority(parseInt(input.dataset.priority, 10), input.value);
    });
  });

  braindump.addEventListener('input', function () {
    saveField('braindump', braindump.value);
  });

  // --- Keyboard navigation ---

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCategoryPicker();
    }
  });

  // --- Init ---

  setTheme(loadTheme());
  buildSchedule();
  renderDay();

  // Update current hour highlight every minute
  currentHourInterval = setInterval(highlightCurrentHour, 60000);
})();
