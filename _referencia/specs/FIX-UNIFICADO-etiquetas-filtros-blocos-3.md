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

**VISÃO ANO** — Blocos de cor com **1 caractere visível** (emoji ou primeira letra). Isso permite identificar cada evento de relance sem precisar de hover.

```css
.year-view .label-block {
  border-radius: 1px;
  min-height: 3px;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  line-height: 1;
  overflow: hidden;
}

/* Se o bloco tem altura suficiente (≥12px), mostra o caractere */
.year-view .label-block .label-char {
  display: none;  /* escondido por padrão */
}
.year-view .label-block[data-height="visible"] .label-char {
  display: block;
  font-size: 10px;
  text-align: center;
  line-height: 1;
}
```

Lógica do caractere: mostrar o **emoji da categoria** (🏔️💑💪👶💼🧘👨‍👩‍👧💰). Se o bloco for muito pequeno (< 12px de altura, tipo quando tem 5+ etiquetas), esconde o caractere e fica só cor. Tooltip continua funcionando no hover com info completa.

```javascript
function getVisibleChar(label) {
  // Prioridade 1: emoji da categoria
  const categoryEmojis = {
    adventure: '🏔️', marriage: '💑', health: '💪', kids: '👶',
    business: '💼', personal: '🧘', family: '👨‍👩‍👧', finance: '💰'
  };
  return categoryEmojis[label.category] || label.text.charAt(0).toUpperCase();
}
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
  padding: 6px 8px;
  min-height: 50px;              /* mais alto → mais quadrado */
  max-height: 100px;
  border-radius: 6px;            /* cantos mais generosos */
  font-size: 12px;               /* maior → mais texto legível */
  line-height: 1.3;
  white-space: normal;           /* PERMITE quebra de linha */
  word-wrap: break-word;
  overflow: hidden;
  aspect-ratio: auto;            /* tende a quadrado quando 1-2 etiquetas */
}
```

Altura dinâmica por número de etiquetas no dia:

| Etiquetas | Altura cada | Proporção | Linhas |
|-----------|-------------|-----------|--------|
| 1 | 100px (max) | quase quadrado | 5-6 |
| 2 | ~70px | retângulo largo | 4 |
| 3 | ~50px | retângulo | 3 |
| 4+ | ~35px | barra grossa | 2 |

```javascript
function calcLabelHeight(cellHeight, headerHeight, labelCount) {
  const available = cellHeight - headerHeight - 8;
  const gaps = 2 * (labelCount - 1);
  const perLabel = (available - gaps) / labelCount;
  return Math.max(35, Math.min(100, perLabel));
}
```

**VISÃO SEMANA** — Blocos ainda maiores, texto generoso.

```css
.week-view .label-block {
  display: block;
  width: calc(100% - 12px);
  margin: 3px 6px;
  padding: 10px 12px;
  min-height: 64px;              /* bem mais alto → mais quadrado */
  max-height: 140px;
  border-radius: 8px;            /* cantos generosos */
  font-size: 14px;               /* fonte maior → mais texto legível */
  line-height: 1.4;
  white-space: normal;
  word-wrap: break-word;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
}
```

| Etiquetas | Altura cada | Proporção | Linhas |
|-----------|-------------|-----------|--------|
| 1 | 140px | quase quadrado | 7+ |
| 2 | ~100px | retângulo quadradão | 5 |
| 3 | ~70px | retângulo | 3-4 |
| 4+ | ~50px | retângulo largo | 2-3 |

### Responsividade dos blocos:

```css
/* TV OLED 48" */
[data-device="tv-oled"] .month-view .label-block {
  min-height: 60px; max-height: 120px; font-size: 16px; padding: 8px 12px; border-radius: 8px;
}
[data-device="tv-oled"] .week-view .label-block {
  min-height: 80px; max-height: 180px; font-size: 20px; padding: 12px 16px; border-radius: 10px;
}

/* MacBook Pro / Air */
[data-device="macbook-pro"] .month-view .label-block,
[data-device="macbook-air"] .month-view .label-block {
  min-height: 44px; max-height: 90px; font-size: 12px; padding: 5px 8px; border-radius: 6px;
}
[data-device="macbook-pro"] .week-view .label-block,
[data-device="macbook-air"] .week-view .label-block {
  min-height: 56px; max-height: 120px; font-size: 14px; padding: 8px 10px; border-radius: 8px;
}

/* iPhone */
[data-device="iphone-portrait"] .month-view .label-block {
  min-height: 28px; max-height: 56px; font-size: 10px; padding: 3px 5px; border-radius: 4px;
}
[data-device="iphone-portrait"] .week-view .label-block {
  min-height: 48px; max-height: 100px; font-size: 14px; padding: 8px 10px; border-radius: 6px;
}

/* Monitor 27" Vertical */
[data-device="monitor-vertical"] .month-view .label-block {
  min-height: 50px; max-height: 100px; font-size: 14px; border-radius: 6px;
}
[data-device="monitor-vertical"] .week-view .label-block {
  min-height: 60px; max-height: 140px; font-size: 16px; border-radius: 8px;
}
```

---

## PARTE 2 — Empilhamento e Ordenação (ANO + QUARTER)

### Regra de empilhamento

Em TODAS as visões, quando um dia tem múltiplas etiquetas, elas são **empilhadas verticalmente** com o espaço dividido proporcionalmente:

- 2 etiquetas = 50% cada
- 3 etiquetas = 33% cada
- N etiquetas = 100/N % cada

### Ordenação vertical (CRÍTICO — DIFERE POR VISÃO):

**ANO e QUARTER** — Solo no topo, multi-dia embaixo:
1. Etiquetas de DIA ÚNICO ficam no **TOPO**
2. Etiquetas de MÚLTIPLOS DIAS ficam **EMBAIXO**
3. Dentro de cada grupo: menor duração acima, maior duração abaixo

```
ANO/QUARTER — Dia 17:
  "Reunião" (só dia 17)           → TOPO
  "Sprint" (dias 17-19, 3 dias)   → MEIO
  "Férias" (dias 15-22, 8 dias)   → EMBAIXO
```

**MÊS e SEMANA** — Multi-dia no topo, solo embaixo (INVERTIDO):
1. Etiquetas de MÚLTIPLOS DIAS ficam no **TOPO** (alinhadas horizontalmente entre os dias)
2. Etiquetas de DIA ÚNICO ficam **EMBAIXO**
3. Multi-dia ordenado: maior duração mais acima (mais estável visualmente)

```
MÊS/SEMANA — Dia 17:
  "Férias" (dias 15-22, 8 dias)   → TOPO (alinhado com dias 15-22)
  "Sprint" (dias 17-19, 3 dias)   → MEIO
  "Reunião" (só dia 17)           → EMBAIXO
```

Motivo: no MÊS e SEMANA, multi-dia no topo cria alinhamento visual horizontal entre as células adjacentes (como no Google Calendar). No ANO e QUARTER, multi-dia embaixo cria a "faixa" no rodapé da célula.

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

**ANO/QUARTER** — multi-dia embaixo, solo no topo:
```
       16       17       18       19       20
    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
    │16    │ │17    │ │18    │ │19    │ │20    │
    │      │ │▓▓▓▓▓▓│ │      │ │      │ │      │  ← solo "Reunião" (topo)
    │██████│ │██████│ │██████│ │██████│ │██████│  ← multi "Férias" (embaixo)
    └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

**MÊS/SEMANA** — multi-dia no TOPO, solo embaixo:
```
       16           17           18           19           20
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 16       │ │ 17       │ │ 18       │ │ 19       │ │ 20       │
  │██FÉRIAS██│ │██████████│ │██████████│ │██████████│ │██████████│  ← multi no TOPO (alinhado)
  │          │ │┌────────┐│ │          │ │          │ │          │
  │          │ ││REUNIÃO ││ │          │ │          │ │          │  ← solo embaixo
  │          │ │└────────┘│ │          │ │          │ │          │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

Isso faz com que as etiquetas multi-dia fiquem visualmente alinhadas no topo das células adjacentes no MÊS e SEMANA (como barras contínuas), enquanto as etiquetas solo ficam abaixo, sem quebrar o alinhamento horizontal.

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

- **ANO:** emoji da categoria se bloco ≥ 12px de altura (tooltip no hover com info completa)
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
  
  // Separar solo e multi-dia
  const solo = dayLabels
    .filter(l => l.startDate === l.endDate)
    .sort((a, b) => a.text.localeCompare(b.text));
  const multi = dayLabels
    .filter(l => l.startDate !== l.endDate)
    .sort((a, b) => dateDiff(a.startDate, a.endDate) - dateDiff(b.startDate, b.endDate));
  
  // ORDENAÇÃO DIFERE POR VISÃO:
  let ordered;
  if (viewType === 'year' || viewType === 'quarter') {
    // ANO/QUARTER: solo no topo, multi embaixo (maior duração mais embaixo)
    ordered = [...solo, ...multi];
  } else {
    // MÊS/SEMANA: multi no topo (maior duração mais acima), solo embaixo
    ordered = [...multi.reverse(), ...solo];
  }
  
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
      // Emoji da categoria (se bloco grande o suficiente, tratado via CSS)
      const char = document.createElement('span');
      char.className = 'label-char';
      char.textContent = getVisibleChar(label);
      block.appendChild(char);
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

## PARTE 4 — Ordenação MÊS e SEMANA: Multi-Dia por CIMA, Solo por BAIXO

Nas visões ANO e QUARTER, solo fica no topo e multi-dia embaixo (faixa horizontal na base). Mas no MÊS e SEMANA a lógica se **inverte**: multi-dia fica por CIMA e solo por BAIXO. O topo é a âncora visual mais estável — multi-dia alinhados no topo criam faixa horizontal contínua visível entre os dias.

### Regra por visão:

| Visão | Topo | Baixo |
|-------|------|-------|
| ANO / QUARTER | Solo | Multi-dia (maior duração = mais embaixo) |
| **MÊS / SEMANA** | **Multi-dia (maior duração = mais acima)** | **Solo** |

### Visual no MÊS:

```
┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐
│ 16     ││ 17     ││ 18     ││ 19     ││ 20     │
│┌──────┐││┌──────┐││┌──────┐││┌──────┐││┌──────┐│
││FÉRIAS│││FÉRIAS│││FÉRIAS│││FÉRIAS│││FÉRIAS││  ← multi: TOPO, alinhado
│└──────┘││└──────┘││└──────┘││└──────┘││└──────┘│
│        ││┌──────┐││        ││┌──────┐││        │
│        │││TREINO│││        │││CALL  ││ │        │  ← solo: ABAIXO
│        ││└──────┘││        ││└──────┘││        │
└────────┘└────────┘└────────┘└────────┘└────────┘
```

Se 2 multi-dia simultâneos:
```
│ 17     ││ 18     ││ 19     │
│┌──────┐││┌──────┐││┌──────┐│
││FÉRIAS│││FÉRIAS│││FÉRIAS││  ← multi mais longo: slot 1 (mais acima)
│└──────┘││└──────┘││└──────┘│
│┌──────┐││┌──────┐││        │
││SPRINT│││SPRINT│││        │  ← multi mais curto: slot 2
│└──────┘││└──────┘││        │
│┌──────┐││        ││┌──────┐│
││TREINO│││        │││CALL  ││  ← solo: slot 3+
│└──────┘││        ││└──────┘│
```

### JS de ordenação diferenciada:

```javascript
function renderCellLabels(cell, date, allLabels, viewType) {
  const dayLabels = allLabels.filter(l => 
    date >= l.startDate && date <= l.endDate
  );
  if (dayLabels.length === 0) return;
  
  let ordered;
  
  if (viewType === 'year' || viewType === 'quarter') {
    // ANO/QUARTER: solo no topo, multi-dia embaixo
    const solo = dayLabels.filter(l => l.startDate === l.endDate)
      .sort((a, b) => a.text.localeCompare(b.text));
    const multi = dayLabels.filter(l => l.startDate !== l.endDate)
      .sort((a, b) => dateDiff(a.startDate, a.endDate) - dateDiff(b.startDate, b.endDate));
    ordered = [...solo, ...multi];
  } else {
    // MÊS/SEMANA: multi-dia no TOPO, solo embaixo
    const multi = dayLabels.filter(l => l.startDate !== l.endDate)
      .sort((a, b) => dateDiff(b.startDate, b.endDate) - dateDiff(a.startDate, a.endDate));
    const solo = dayLabels.filter(l => l.startDate === l.endDate)
      .sort((a, b) => a.text.localeCompare(b.text));
    ordered = [...multi, ...solo];
  }
  
  // ... resto da renderização
}
```

---

## PARTE 5 — Blocos Mais Quadrados e Mais Texto (MÊS e SEMANA)

Os blocos precisam ser mais altos (mais próximos de quadrado) para acomodar mais texto em múltiplas linhas.

### SEMANA — Blocos generosos:

```css
.week-view .label-block {
  display: flex;
  align-items: flex-start;
  width: calc(100% - 12px);
  margin: 3px 6px;
  padding: 10px 12px;
  min-height: 64px;              /* AUMENTADO */
  max-height: 140px;             /* AUMENTADO */
  border-radius: 6px;
  font-size: 14px;               /* AUMENTADO */
  font-weight: 700;
  line-height: 1.4;
  white-space: normal;
  word-wrap: break-word;
}
```

| Etiquetas | Altura | Linhas | Aspecto |
|-----------|--------|--------|---------|
| 1 | 140px | 7+ | Quase quadrado |
| 2 | ~90px | 4-5 | Retângulo alto |
| 3 | ~60px | 3 | Retângulo |
| 4+ | ~45px | 2 | Retângulo baixo |

### MÊS — Blocos mais altos:

```css
.month-view .label-block {
  display: flex;
  align-items: flex-start;
  width: calc(100% - 8px);
  margin: 2px 4px;
  padding: 6px 8px;
  min-height: 48px;              /* AUMENTADO */
  max-height: 90px;              /* AUMENTADO */
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.3;
  white-space: normal;
  word-wrap: break-word;
}
```

| Etiquetas | Altura | Linhas | Aspecto |
|-----------|--------|--------|---------|
| 1 | 90px | 5-6 | Quase quadrado |
| 2 | ~65px | 3-4 | Retângulo alto |
| 3 | ~48px | 2-3 | Retângulo |
| 4+ | ~34px | 2 | Retângulo baixo |

### Responsividade atualizada:

```css
/* TV OLED */
[data-device="tv-oled"] .week-view .label-block {
  min-height: 80px; max-height: 180px; font-size: 18px; padding: 12px 16px;
}
[data-device="tv-oled"] .month-view .label-block {
  min-height: 60px; max-height: 120px; font-size: 15px; padding: 8px 12px;
}

/* MacBook Pro/Air */
[data-device="macbook-pro"] .week-view .label-block,
[data-device="macbook-air"] .week-view .label-block {
  min-height: 52px; max-height: 110px; font-size: 13px; padding: 8px 10px;
}
[data-device="macbook-pro"] .month-view .label-block,
[data-device="macbook-air"] .month-view .label-block {
  min-height: 40px; max-height: 80px; font-size: 11px; padding: 5px 7px;
}

/* iPhone */
[data-device="iphone-portrait"] .week-view .label-block {
  min-height: 48px; max-height: 90px; font-size: 13px; padding: 8px 10px;
}
[data-device="iphone-portrait"] .month-view .label-block {
  min-height: 28px; max-height: 52px; font-size: 9px; padding: 3px 5px;
}

/* Monitor 27" Vertical */
[data-device="monitor-vertical"] .week-view .label-block {
  min-height: 56px; max-height: 130px; font-size: 14px;
}
[data-device="monitor-vertical"] .month-view .label-block {
  min-height: 48px; max-height: 100px; font-size: 13px;
}
```

---

## RESUMO — O QUE IMPLEMENTAR (5 PARTES)

1. **Blocos sólidos tipo post-it** em todas as visões (cor 100% opaca, sombra, cantos arredondados, uppercase ≤20 chars, fonte bold condensada)

2. **Empilhamento proporcional** em ANO e QUARTER (espaço dividido igualmente por N etiquetas, sem setas, posição vertical consistente em multi-dia). Ordenação ANO/QUARTER: solo no topo, multi-dia embaixo. **ANO mostra emoji da categoria** (🏔️💪💼...) nos blocos ≥ 12px para identificação rápida.

3. **Filtros com 3 estados** nos quadrados do header (NEUTRO → DESTAQUE zoom+esmaecer → ISOLADO hide, múltiplos simultâneos, botão ✕ limpar, tooltips bilíngues)

4. **Ordenação invertida no MÊS e SEMANA**: multi-dia no TOPO (maior duração mais acima, alinhado entre dias criando faixa horizontal), solo embaixo.

5. **Blocos mais quadrados e mais texto** no MÊS e SEMANA: min-height aumentado (48-64px), max-height maior (90-140px), fonte maior (11-14px), white-space normal com word-wrap.

Tudo com transições suaves de 300ms e responsivo para os 5 dispositivos (TV, MacBook Pro, MacBook Air, Monitor vertical, iPhone).
