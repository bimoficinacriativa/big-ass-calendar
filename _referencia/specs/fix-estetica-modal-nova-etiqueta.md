# FIX — Estética do Modal "Nova Etiqueta"

## O Problema

O modal atual funciona mas é visualmente simples demais. O date picker é o nativo do browser (feio, branco, não combina com o tema dark). As categorias são uma lista vertical que ocupa muito espaço. Precisa ficar mais polido, compacto e coeso com o tema escuro do app.

---

## Referência Visual

Inspirado no componente shadcn/calendar da segunda imagem: cards dark com bordas sutis, cantos arredondados generosos, células quadradas com hover states, tudo coeso num tema escuro premium.

---

## Novo Layout do Modal

### Estrutura geral:

```
┌──────────────────────────────────────────┐
│                                      ✕   │
│  ┌────────────────────────────────────┐  │
│  │  Texto da etiqueta...              │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐│
│  │🏔│ │💑│ │💪│ │👶│ │💼│ │🧘│ │👨‍👩‍👧│ │💰││  ← categorias em GRID 4x2
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘│
│                                          │
│  ┌─────────────┐   ┌─────────────┐       │
│  │ 16 FEV 2026 │   │ 18 FEV 2026 │       │
│  │   INÍCIO    │   │     FIM     │       │
│  └─────────────┘   └─────────────┘       │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │        CALENDÁRIO INLINE           │  │
│  │   ◄  Fevereiro 2026  ►            │  │
│  │  DOM SEG TER QUA QUI SEX SÁB      │  │
│  │   1   2   3   4   5   6   7       │  │
│  │   8   9  10  11  12  13  14       │  │
│  │  15 [16] 17  18  19  20  21       │  │
│  │  22  23  24  25  26  27  28       │  │
│  └────────────────────────────────────┘  │
│                                          │
│           ┌──────────────┐               │
│           │    SALVAR     │               │
│           └──────────────┘               │
└──────────────────────────────────────────┘
```

---

## 1. Container do Modal

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);          /* blur no fundo */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal-container {
  background: var(--modal-bg);         /* por tema */
  border: 1px solid var(--modal-border);
  border-radius: 16px;                 /* cantos mais generosos */
  padding: 28px;
  width: 420px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Cores por tema */
[data-theme="oled"] .modal-container {
  --modal-bg: #0D0D0D;
  --modal-border: rgba(255, 255, 255, 0.08);
}
[data-theme="dark"] .modal-container {
  --modal-bg: #1A1F2B;
  --modal-border: rgba(255, 255, 255, 0.1);
}
[data-theme="light"] .modal-container {
  --modal-bg: #FFFFFF;
  --modal-border: rgba(0, 0, 0, 0.1);
}
```

### Botão fechar:

```css
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}
```

---

## 2. Campo de Texto

Remover label "TEXTO" separado. Input maior, com placeholder descritivo, e contador de caracteres inline.

```css
.label-text-input {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.label-text-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.15);
}
.label-text-input::placeholder {
  color: var(--text-tertiary);
  font-weight: 400;
}

/* Contador de caracteres */
.char-counter {
  position: absolute;
  right: 16px;
  bottom: -20px;
  font-size: 11px;
  color: var(--text-tertiary);
}
.char-counter.near-limit {
  color: #FF6B6B;
}
```

```html
<div style="position: relative">
  <input class="label-text-input" 
         placeholder="Ex: Maratona de Floripa, Jantar com pais..."
         maxlength="60" />
  <span class="char-counter">0/60</span>
</div>
```

Aumentar para **60 caracteres** (40 é pouco pra textos como "WEEKEND TRIP W/ THE KIDS").

---

## 3. Categorias — Grid Compacto

Trocar lista vertical por **grid 4 colunas × 2 linhas**. Cada categoria é um botão quadrado com emoji + cor.

### Layout:

```
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ 🏔️  │ │ 💑  │ │ 💪  │ │ 👶  │
│Avent│ │Casam│ │Saúde│ │Filho│
│ ██  │ │ ██  │ │ ██  │ │ ██  │
└─────┘ └─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ 💼  │ │ 🧘  │ │👨‍👩‍👧│ │ 💰  │
│Negóc│ │Pesso│ │Famíl│ │Finan│
│ ██  │ │ ██  │ │ ██  │ │ ██  │
└─────┘ └─────┘ └─────┘ └─────┘
```

### CSS:

```css
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 16px 0;
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 4px;
  border-radius: 12px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-1px);
}

.category-btn.selected {
  border-color: var(--category-color);
  background: rgba(var(--category-color-rgb), 0.12);
  box-shadow: 0 0 12px rgba(var(--category-color-rgb), 0.2);
}

.category-btn .emoji {
  font-size: 24px;
  line-height: 1;
}

.category-btn .name {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.category-btn.selected .name {
  color: var(--category-color);
}

.category-btn .color-dot {
  width: 16px;
  height: 4px;
  border-radius: 2px;
  background: var(--category-color);
}
```

---

## 4. Date Picker Custom (Não Nativo)

Substituir o `<input type="date">` nativo por um **calendário inline custom** que combina com o tema. Inspirado na referência shadcn.

### Seleção de range (Início / Fim):

Dois botões lado a lado que mostram a data. Clicar em qualquer um ativa o calendário inline abaixo.

```css
.date-selector-row {
  display: flex;
  gap: 12px;
  margin: 16px 0;
}

.date-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s;
}
.date-btn.active {
  border-color: var(--accent);
  background: rgba(var(--accent-rgb), 0.08);
}
.date-btn .date-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-tertiary);
  margin-bottom: 4px;
}
.date-btn .date-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}
```

```html
<div class="date-selector-row">
  <button class="date-btn active" onclick="setDateTarget('start')">
    <span class="date-label">Início</span>
    <span class="date-value">16 FEV</span>
  </button>
  <button class="date-btn" onclick="setDateTarget('end')">
    <span class="date-label">Fim</span>
    <span class="date-value">16 FEV</span>
  </button>
</div>
```

### Calendário inline:

```css
.inline-calendar {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 16px;
  margin: 12px 0;
}

.cal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.cal-header .month-year {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}
.cal-header .nav-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.15s;
}
.cal-header .nav-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.cal-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;
}
.cal-weekdays span {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-tertiary);
  padding: 4px 0;
}

.cal-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.cal-day {
  aspect-ratio: 1;              /* QUADRADO */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  border-radius: 10px;
  border: 1.5px solid transparent;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.cal-day:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Hoje */
.cal-day.today {
  color: var(--accent);
  font-weight: 700;
}

/* Selecionado */
.cal-day.selected {
  background: var(--accent);
  color: #FFFFFF;
  font-weight: 700;
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(var(--accent-rgb), 0.3);
}

/* Range entre início e fim */
.cal-day.in-range {
  background: rgba(var(--accent-rgb), 0.15);
  border-radius: 4px;
}

/* Início do range */
.cal-day.range-start {
  background: var(--accent);
  color: #FFFFFF;
  border-radius: 10px 4px 4px 10px;
}

/* Fim do range */
.cal-day.range-end {
  background: var(--accent);
  color: #FFFFFF;
  border-radius: 4px 10px 10px 4px;
}

/* Dia de outro mês */
.cal-day.other-month {
  opacity: 0.25;
}

/* Dias da semana (Sáb/Dom) com tom diferente */
.cal-day.weekend {
  color: var(--text-secondary);
}
```

### JS do calendário:

```javascript
function renderInlineCalendar(containerId, year, month, startDate, endDate, onSelect) {
  const container = document.getElementById(containerId);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = (firstDay.getDay() + 6) % 7; // Segunda = 0
  
  // Header
  const monthNames = lang === 'pt' 
    ? ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ']
    : ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  
  let html = `
    <div class="cal-header">
      <button class="nav-btn" onclick="changeMonth(-1)">◀</button>
      <span class="month-year">${monthNames[month]} ${year}</span>
      <button class="nav-btn" onclick="changeMonth(1)">▶</button>
    </div>
    <div class="cal-weekdays">
      ${(lang === 'pt' 
        ? ['SEG','TER','QUA','QUI','SEX','SÁB','DOM']
        : ['MON','TUE','WED','THU','FRI','SAT','SUN']
      ).map(d => `<span>${d}</span>`).join('')}
    </div>
    <div class="cal-days">
  `;
  
  // Dias do mês anterior
  const prevMonth = new Date(year, month, 0);
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = prevMonth.getDate() - i;
    html += `<div class="cal-day other-month">${d}</div>`;
  }
  
  // Dias do mês atual
  const today = new Date();
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    const dateStr = formatDate(date);
    const isToday = isSameDay(date, today);
    const isStart = startDate && isSameDay(date, startDate);
    const isEnd = endDate && isSameDay(date, endDate);
    const isInRange = startDate && endDate && date > startDate && date < endDate;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    const classes = ['cal-day'];
    if (isToday) classes.push('today');
    if (isStart) classes.push('selected', 'range-start');
    if (isEnd) classes.push('selected', 'range-end');
    if (isStart && isEnd) classes.push('selected'); // mesmo dia
    if (isInRange) classes.push('in-range');
    if (isWeekend) classes.push('weekend');
    
    html += `<div class="${classes.join(' ')}" onclick="selectDate('${dateStr}')">${d}</div>`;
  }
  
  // Dias do próximo mês
  const totalCells = startWeekday + lastDay.getDate();
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let d = 1; d <= remaining; d++) {
    html += `<div class="cal-day other-month">${d}</div>`;
  }
  
  html += '</div>';
  container.innerHTML = html;
}
```

---

## 5. Botão Salvar

```css
.save-btn {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s;
  
  /* Gradiente sutil baseado na categoria selecionada */
  background: var(--category-color, var(--accent));
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(var(--category-color-rgb, var(--accent-rgb)), 0.3);
}
.save-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(var(--category-color-rgb, var(--accent-rgb)), 0.4);
}
.save-btn:active {
  transform: translateY(0);
}
.save-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}
```

O botão muda de cor conforme a categoria selecionada (feedback visual imediato).

---

## 6. Faltam 2 Categorias no Modal Atual

No screenshot aparecem 6 categorias, mas são 8. Faltam **Família** e **Finanças Pessoais**. Garantir que todas as 8 apareçam:

| # | Emoji | Nome PT | Nome EN | Cor |
|---|-------|---------|---------|-----|
| 1 | 🏔️ | Aventura | Adventure | Azul #1E90FF |
| 2 | 💑 | Casamento | Marriage | Rosa #FF69B4 |
| 3 | 💪 | Saúde & Fitness | Health & Fitness | Verde #7CB342 |
| 4 | 👶 | Filhos | Kids | Lilás #9C82D4 |
| 5 | 💼 | Negócios | Business | Laranja #FF6D00 |
| 6 | 🧘 | Pessoal | Personal | Amarelo #FFD600 |
| 7 | 👨‍👩‍👧 | Família | Family | Coral #FF7043 |
| 8 | 💰 | Finanças | Finance | Ciano #00BCD4 |

---

## 7. Interação de Seleção de Range

Fluxo de UX para selecionar início e fim:

1. Abrir modal → campo "Início" ativo (highlighted), calendário mostra mês atual
2. Clicar num dia → define como data de início, campo "Fim" fica ativo automaticamente
3. Clicar outro dia → define como data de fim (se for antes do início, swap automático)
4. Se clicar no mesmo dia → evento de 1 dia (início = fim)
5. Dias entre início e fim ficam com background `.in-range`
6. Pode clicar nos botões "Início" e "Fim" pra alternar qual está sendo editado

---

## 8. Efeitos e Polish

### Ao selecionar categoria:
Transição suave da cor do botão Salvar para a cor da categoria.

```javascript
function selectCategory(catId) {
  selectedCategory = catId;
  const cat = CATEGORIES.find(c => c.id === catId);
  
  // Animar cor do botão
  saveBtn.style.setProperty('--category-color', cat.color);
  saveBtn.style.setProperty('--category-color-rgb', hexToRgb(cat.color));
  
  // Highlight da seleção
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.category === catId);
  });
}
```

### Validação visual:
- Botão Salvar desabilitado (opacity 0.4) até que texto E categoria sejam preenchidos
- Se tentar salvar sem texto: input shake + borda vermelha rápida
- Se tentar salvar sem categoria: grid de categorias pisca

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.shake {
  animation: shake 0.3s ease;
  border-color: #FF6B6B !important;
}
```

### Fechar modal:
- Clicar fora (overlay) fecha
- ESC fecha
- Animação de saída: fade out + slide down

```css
.modal-container.closing {
  animation: slideDown 0.2s ease forwards;
}
@keyframes slideDown {
  to { opacity: 0; transform: translateY(10px) scale(0.97); }
}
```

---

## 9. Responsividade

### iPhone:
```css
@media (max-width: 480px) {
  .modal-container {
    width: 100%;
    max-width: 100%;
    border-radius: 16px 16px 0 0;
    position: fixed;
    bottom: 0;
    max-height: 85vh;
    padding: 20px;
    animation: slideUpMobile 0.3s ease;
  }
  @keyframes slideUpMobile {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  .category-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }
  .category-btn { padding: 10px 2px; }
  .category-btn .emoji { font-size: 20px; }
  .category-btn .name { font-size: 9px; }
}
```

### TV OLED:
```css
[data-device="tv-oled"] .modal-container {
  width: 520px;
  padding: 36px;
  border-radius: 20px;
}
[data-device="tv-oled"] .label-text-input {
  font-size: 20px;
  padding: 18px 20px;
}
[data-device="tv-oled"] .category-btn .emoji {
  font-size: 32px;
}
[data-device="tv-oled"] .cal-day {
  font-size: 16px;
}
```

---

## Resumo

Modal redesenhado com: backdrop blur, cantos generosos (16px), animação slide-up. Input de texto maior com placeholder descritivo e contador 0/60. Categorias em grid 4×2 compacto com emoji+cor (todas as 8). Date picker custom inline (não nativo) com estilo dark premium, células quadradas, range visual com highlight start/end/in-range. Botão Salvar muda de cor conforme categoria selecionada. Validação visual com shake. No iPhone: modal slide-up tipo bottom sheet. Bilíngue.
