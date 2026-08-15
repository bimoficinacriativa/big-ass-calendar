# FIX UNIFICADO — Etiquetas, Filtros e Layout Visual

Este é um pedido único que cobre 3 mudanças interligadas no sistema de etiquetas do calendário. Implementar tudo junto.

---

## PARTE 1 — Formato Visual: Blocos Sólidos Tipo Post-It

### O que mudar

As etiquetas em TODAS as visões devem ser **blocos sólidos de cor** (tipo post-its do calendário físico), não barras finas. Cor 100% opaca, cantos arredondados, sombra sutil, texto com word-wrap em múltiplas linhas.

### Estilo base (todas as visões):

```css
.label-block {
  background-color: var(--label-color); /* 100% opaco, sem transparência */
  border-radius: 4px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.label-block:hover {
  transform: translateY(-1px);
  box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.25);
}
```

Regra do uppercase: texto ≤ 20 caracteres → uppercase. Texto > 20 → manter como digitado.

```javascript
function formatLabelText(text) {
  return text.length <= 20 ? text.toUpperCase() : text;
}
```

### Por visão:

**VISÃO ANO** — Blocos de cor SEM texto. Só retângulos coloridos. Texto aparece em tooltip no hover.

```css
.year-view .label-block {
  border-radius: 1px;
  min-height: 3px;
  box-shadow: none;
}
```

Tooltip ao hover:
```
17 FEV 2026 (TER)
🏔️ Saídas (16-20 fev)
💼 Reunião XYZ (17 fev)
💪 Treino 10km (17 fev)
```

**VISÃO QUARTER** — Blocos de cor COM texto (truncado ellipsis, 1 linha). Texto só no primeiro dia de eventos multi-dia.

```css
.quarter-view .label-block {
  padding: 0 4px;
  font-size: 9px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 2px;
  min-height: 16px;
}
```

**VISÃO MÊS** — Blocos grandes, texto com word-wrap (múltiplas linhas).

```css
.month-view .label-block {
  display: block;
  width: calc(100% - 8px);
  margin: 2px 4px;
  padding: 4px 6px;
  min-height: 40px;
  max-height: 80px;
  border-radius: 4px;
  font-size: 11px;
  line-height: 1.3;
  white-space: normal;       /* PERMITE quebra de linha */
  word-wrap: break-word;
  overflow: hidden;
}
```

Altura dinâmica por número de etiquetas no dia:

| Etiquetas | Altura cada | Linhas |
|-----------|-------------|--------|
| 1 | 80px (max) | 4-5 |
| 2 | ~60px | 3 |
| 3 | ~40px | 2 |
| 4+ | ~30px | 1-2 |

```javascript
function calcLabelHeight(cellHeight, headerHeight, labelCount) {
  const available = cellHeight - headerHeight - 8;
  const gaps = 2 * (labelCount - 1);
  const perLabel = (available - gaps) / labelCount;
  return Math.max(28, Math.min(80, perLabel));
}
```

**VISÃO SEMANA** — Blocos ainda maiores, texto generoso.

```css
.week-view .label-block {
  display: block;
  width: calc(100% - 12px);
  margin: 3px 6px;
  padding: 8px 10px;
  min-height: 48px;
  max-height: 120px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.4;
  white-space: normal;
  word-wrap: break-word;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
}
```

| Etiquetas | Altura cada | Linhas |
|-----------|-------------|--------|
| 1 | 120px | 6+ |
| 2 | ~80px | 4 |
| 3 | ~55px | 3 |
| 4+ | ~40px | 2 |

### Responsividade dos blocos:

```css
/* TV OLED 48" */
[data-device="tv-oled"] .month-view .label-block {
  min-height: 50px; max-height: 100px; font-size: 15px; padding: 6px 10px; border-radius: 6px;
}
[data-device="tv-oled"] .week-view .label-block {
  min-height: 60px; max-height: 150px; font-size: 18px; padding: 10px 14px;
}

/* MacBook Pro / Air */
[data-device="macbook-pro"] .month-view .label-block,
[data-device="macbook-air"] .month-view .label-block {
  min-height: 36px; max-height: 70px; font-size: 11px; padding: 4px 6px;
}
[data-device="macbook-pro"] .week-view .label-block,
[data-device="macbook-air"] .week-view .label-block {
  min-height: 44px; max-height: 100px; font-size: 13px; padding: 6px 8px;
}

/* iPhone */
[data-device="iphone-portrait"] .month-view .label-block {
  min-height: 24px; max-height: 48px; font-size: 9px; padding: 2px 4px; border-radius: 3px;
}
[data-device="iphone-portrait"] .week-view .label-block {
  min-height: 40px; max-height: 80px; font-size: 13px; padding: 6px 8px;
}

/* Monitor 27" Vertical */
[data-device="monitor-vertical"] .month-view .label-block {
  min-height: 44px; max-height: 90px; font-size: 13px;
}
[data-device="monitor-vertical"] .week-view .label-block {
  min-height: 50px; max-height: 120px; font-size: 14px;
}
```

---

## PARTE 2 — Empilhamento e Ordenação (ANO + QUARTER)

### Regra de empilhamento

Em TODAS as visões, quando um dia tem múltiplas etiquetas, elas são **empilhadas verticalmente** com o espaço dividido proporcionalmente:

- 2 etiquetas = 50% cada
- 3 etiquetas = 33% cada
- N etiquetas = 100/N % cada

### Ordenação vertical (CRÍTICO):

1. **Etiquetas de DIA ÚNICO ficam no TOPO** da pilha
2. **Etiquetas de MÚLTIPLOS DIAS ficam EMBAIXO**
3. Dentro de cada grupo: menor duração acima, maior duração abaixo
4. Mesma duração: ordenar por data de início (mais cedo primeiro)

```
Dia 17 tem 3 etiquetas:
  "Reunião" (só dia 17)           → TOPO
  "Sprint" (dias 17-19, 3 dias)   → MEIO
  "Férias" (dias 15-22, 8 dias)   → EMBAIXO
```

### CSS do container empilhado:

```css
.labels-stack {
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow: hidden;
}
.labels-stack .label-block {
  flex: 1; /* divide igualmente o espaço */
}
```

Para visões ANO e QUARTER, o container fica posicionado abaixo do header da célula:

```css
.year-cell .labels-stack,
.quarter-cell .labels-stack {
  position: absolute;
  bottom: 0;
  left: 1px;
  right: 1px;
  top: 22px; /* abaixo do número + dia */
}
```

### Overflow:

- **ANO:** até 6 etiquetas visíveis. Se mais, mostrar "+N" em texto pequeno.
- **QUARTER:** até 4 visíveis. Se mais, "+N mais..." clicável → navega pro MÊS.
- **MÊS:** até que caibam na célula. Se mais, "+N mais..." clicável → abre popup.
- **SEMANA:** todas visíveis (scroll se necessário).

```css
.labels-overflow {
  font-size: 8px;
  opacity: 0.6;
  text-align: center;
  cursor: pointer;
  padding: 1px 0;
}
```

### Eventos multi-dia — Consistência de posição vertical

CRÍTICO: Uma etiqueta multi-dia deve ocupar o **mesmo slot vertical** em TODOS os dias que ela cobre. Isso cria uma faixa horizontal visual contínua.

```
       16       17       18       19       20
    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
    │16    │ │17    │ │18    │ │19    │ │20    │
    │      │ │▓▓▓▓▓▓│ │      │ │      │ │      │  ← solo "Reunião" (só dia 17)
    │██████│ │██████│ │██████│ │██████│ │██████│  ← multi "Férias" (mesma posição em todos)
    └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

Algoritmo de slots:

```javascript
function assignSlots(labels) {
  const slots = {};
  
  // 1. Multi-dia primeiro (maior duração = slot mais baixo = mais embaixo visual)
  const multiDay = labels
    .filter(l => l.startDate !== l.endDate)
    .sort((a, b) => dateDiff(b.startDate, b.endDate) - dateDiff(a.startDate, a.endDate));
  
  multiDay.forEach((label, i) => {
    slots[label.id] = i; // slot 0 = mais embaixo
  });
  
  // 2. Solo recebem slots acima dos multi-dia
  // Processados por dia, com slots dinâmicos acima do último multi-dia
  
  return slots;
}
```

### Texto em multi-dia por visão:

- **ANO:** nunca texto (tooltip)
- **QUARTER:** texto só no PRIMEIRO dia do range. Demais dias: bloco sólido sem texto.
- **MÊS:** barra contínua estilo Google Calendar (mais alta: 32-40px), texto no primeiro dia.
- **SEMANA:** bloco em cada dia na mesma posição. Texto no primeiro dia, demais só cor.

### JS de renderização unificado:

```javascript
function renderCellLabels(cell, date, allLabels, viewType) {
  const dayLabels = allLabels.filter(l => 
    date >= l.startDate && date <= l.endDate
  );
  if (dayLabels.length === 0) return;
  
  // Separar e ordenar
  const solo = dayLabels
    .filter(l => l.startDate === l.endDate)
    .sort((a, b) => a.text.localeCompare(b.text));
  const multi = dayLabels
    .filter(l => l.startDate !== l.endDate)
    .sort((a, b) => dateDiff(a.startDate, a.endDate) - dateDiff(b.startDate, b.endDate));
  
  // Solo no topo, multi embaixo (maior duração mais embaixo)
  const ordered = [...solo, ...multi];
  
  const maxVisible = { year: 6, quarter: 4, month: 5, week: 99 }[viewType];
  const visible = ordered.slice(0, maxVisible);
  const remaining = ordered.length - maxVisible;
  
  const stack = document.createElement('div');
  stack.className = 'labels-stack';
  
  visible.forEach(label => {
    const cat = CATEGORIES.find(c => c.id === label.category);
    const block = document.createElement('div');
    block.className = 'label-block';
    block.dataset.category = label.category;
    block.dataset.labelId = label.id;
    block.style.backgroundColor = cat.color;
    block.style.color = getTextColor(cat.color);
    
    // Texto conforme visão
    const isFirstDay = (date === label.startDate);
    
    if (viewType === 'year') {
      // Sem texto
    } else if (viewType === 'quarter') {
      if (isFirstDay) block.textContent = formatLabelText(label.text);
    } else {
      // MÊS e SEMANA: sempre texto (word-wrap)
      block.textContent = formatLabelText(label.text);
    }
    
    stack.appendChild(block);
  });
  
  if (remaining > 0) {
    const overflow = document.createElement('div');
    overflow.className = 'labels-overflow';
    overflow.textContent = `+${remaining}`;
    stack.appendChild(overflow);
  }
  
  cell.appendChild(stack);
}

function dateDiff(start, end) {
  return (new Date(end) - new Date(start)) / (86400000) + 1;
}
```

---

## PARTE 3 — Filtros de Categoria com 3 Estados

### O que mudar

Os 8 quadrados coloridos no header (filtros de categoria) passam a ter **3 estados cíclicos** por clique, em vez de simples on/off.

### Ciclo:

```
Clique 1: NEUTRO → DESTAQUE (categoria ampliada, demais esmaecidas)
Clique 2: DESTAQUE → ISOLADO (só essa categoria visível)
Clique 3: ISOLADO → NEUTRO (tudo volta ao normal)
```

### Estado 0 — NEUTRO (padrão):
Todas as etiquetas visíveis normalmente.

```css
.filter-dot { 
  border: 2px solid transparent; 
  opacity: 0.7; 
  transition: all 0.2s ease;
}
```

### Estado 1 — DESTAQUE (Spotlight):
Etiquetas da categoria ficam **maiores e mais brilhantes**. Demais ficam esmaecidas.

```css
/* Categoria ativa */
.label-block.highlighted {
  transform: scaleY(1.3);
  filter: brightness(1.1);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  z-index: 10;
}

/* Demais categorias */
.label-block.dimmed {
  opacity: 0.2;
  filter: grayscale(60%);
  transform: scaleY(0.8);
}

/* Dot do filtro no header */
.filter-dot.highlight-active {
  border: 3px solid #FFFFFF;
  opacity: 1;
  transform: scale(1.2);
  box-shadow: 0 0 8px rgba(var(--filter-color-rgb), 0.5);
}
```

### Estado 2 — ISOLADO:
SOMENTE etiquetas da categoria visíveis. Demais desaparecem.

```css
/* Categoria ativa */
.label-block.isolated {
  opacity: 1;
  transform: scaleY(1.1);
}

/* Demais categorias */
.label-block.hidden-by-filter {
  opacity: 0;
  height: 0;
  min-height: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

/* Dot do filtro no header */
.filter-dot.isolated-active {
  border: 3px solid #FFFFFF;
  opacity: 1;
  transform: scale(1.3);
  box-shadow: 0 0 12px rgba(var(--filter-color-rgb), 0.7);
  outline: 2px solid var(--filter-color);
  outline-offset: 2px;
}
```

### Múltiplos filtros simultâneos:
Pode ativar mais de uma categoria ao mesmo tempo. Quando qualquer filtro está em ISOLADO, esconde tudo que não tem filtro ativo.

### Botão "✕ Limpar":
Aparece ao lado dos filtros quando qualquer filtro está ativo. Reseta tudo para NEUTRO.

```
■ ■ ■ ■ ■ ■ ■ ■  [✕]     ← só aparece com filtros ativos
```

### Tooltips bilíngues nos filtros:

| Estado | PT-BR | EN |
|--------|-------|----|
| 0 | "Filtrar: Aventura" | "Filter: Adventure" |
| 1 | "Aventura em destaque (clique para isolar)" | "Adventure highlighted (click to isolate)" |
| 2 | "Apenas Aventura (clique para limpar)" | "Adventure only (click to clear)" |

### JS completo dos filtros:

```javascript
let filterStates = {}; // { categoryId: 0|1|2 }

function toggleFilter(categoryId) {
  const current = filterStates[categoryId] || 0;
  const next = (current + 1) % 3;
  if (next === 0) delete filterStates[categoryId];
  else filterStates[categoryId] = next;
  applyFilters();
}

function clearAllFilters() {
  filterStates = {};
  applyFilters();
}

function applyFilters() {
  const hasAny = Object.keys(filterStates).length > 0;
  const hasIsolated = Object.values(filterStates).includes(2);
  
  document.querySelectorAll('.label-block').forEach(block => {
    const cat = block.dataset.category;
    const state = filterStates[cat] || 0;
    
    block.classList.remove('highlighted', 'dimmed', 'isolated', 'hidden-by-filter');
    
    if (!hasAny) return; // tudo normal
    
    if (state === 2) {
      block.classList.add('isolated');
    } else if (state === 1) {
      block.classList.add('highlighted');
    } else if (hasIsolated) {
      block.classList.add('hidden-by-filter');
    } else {
      block.classList.add('dimmed');
    }
  });
  
  // Atualizar dots no header
  document.querySelectorAll('.filter-dot').forEach(dot => {
    const cat = dot.dataset.category;
    const state = filterStates[cat] || 0;
    dot.classList.remove('highlight-active', 'isolated-active');
    if (state === 1) dot.classList.add('highlight-active');
    if (state === 2) dot.classList.add('isolated-active');
  });
  
  // Mostrar/esconder botão limpar
  const clearBtn = document.querySelector('.filter-clear-btn');
  if (clearBtn) clearBtn.style.display = hasAny ? 'inline-flex' : 'none';
}
```

### Transições suaves em tudo:

```css
.label-block {
  transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease, 
              height 0.3s ease, min-height 0.3s ease, box-shadow 0.3s ease;
}
.filter-dot {
  transition: transform 0.2s ease, border-color 0.2s ease, 
              box-shadow 0.2s ease, opacity 0.2s ease;
}
```

---

## RESUMO — O QUE IMPLEMENTAR

1. **Trocar barras finas por blocos sólidos** em MÊS e SEMANA (white-space: normal, altura dinâmica, estilo post-it com sombra e uppercase)

2. **Empilhar proporcionalmente** em ANO e QUARTER (espaço dividido igualmente entre etiquetas, sem setas "→", solo no topo e multi-dia embaixo, posição vertical consistente em multi-dia)

3. **Filtros com 3 estados** nos quadrados do header (NEUTRO → DESTAQUE com zoom + esmaecido → ISOLADO com hide, múltiplos simultâneos, botão limpar, tooltips bilíngues)

Tudo com transições suaves de 300ms e responsivo para os 5 dispositivos (TV, MacBook Pro, MacBook Air, Monitor vertical, iPhone).
