# FIX — Exibição de Múltiplas Etiquetas por Visão

## O Problema

Quando um dia tem múltiplas etiquetas de categorias diferentes, apenas UMA cor aparece nas visões ANO e QUARTER. No ANO faz sentido (células minúsculas), mas no QUARTER as células são maiores e deveriam mostrar múltiplas cores.

## Regra por Visão

| Visão | Tamanho célula | Comportamento |
|-------|---------------|---------------|
| **ANO** (12 meses) | ~35-44px largura | **1 indicador mestre** — dot ou barra fina com cor dominante |
| **QUARTER** (3 meses) | ~3x maior que ANO | **Múltiplas cores visíveis** — barras empilhadas ou dots |
| **MÊS** | ~200px largura | **Etiquetas completas** — barras com texto (como já funciona) |
| **SEMANA** | ~200px+ largura | **Etiquetas completas** — blocos com texto (como já funciona) |

---

## Visão ANO — Indicador Mestre (1 cor por célula)

As células na visão ANO são muito pequenas (~35-44px) para mostrar múltiplas etiquetas com texto. Usar um sistema de indicador compacto:

### Opção: Barra de cor empilhada no rodapé da célula

Quando um dia tem etiquetas, mostrar uma mini-barra de cor (4px de altura) no rodapé da célula. Se tem múltiplas categorias, a barra é dividida proporcionalmente:

```
┌────────────┐
│ 17 TER     │
│            │
│ ■■■■■■████ │  ← barra 4px: azul (Aventura) + laranja (Negócios)
└────────────┘
```

Se tem só 1 etiqueta:
```
┌────────────┐
│ 17 TER     │
│            │
│ ████████████│  ← barra 4px: cor inteira da categoria
└────────────┘
```

Se tem 3+:
```
┌────────────┐
│ 17 TER     │
│            │
│ ■■■■████▓▓▓│  ← 3 cores divididas igualmente
└────────────┘
```

### CSS da barra:
```css
.year-cell .label-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  display: flex;
  border-radius: 0 0 2px 2px;
  overflow: hidden;
}
.year-cell .label-indicator .segment {
  flex: 1;
  /* cor vem inline do JS */
}
```

### JS para gerar a barra:
```javascript
function renderYearCellIndicator(cell, labels) {
  if (!labels || labels.length === 0) return;
  
  const indicator = document.createElement('div');
  indicator.className = 'label-indicator';
  
  // Pegar categorias únicas (sem repetir cor)
  const uniqueCategories = [...new Set(labels.map(l => l.category))];
  
  uniqueCategories.forEach(catId => {
    const cat = CATEGORIES.find(c => c.id === catId);
    const segment = document.createElement('div');
    segment.className = 'segment';
    segment.style.backgroundColor = cat.color;
    indicator.appendChild(segment);
  });
  
  cell.appendChild(indicator);
}
```

### Hover/Tooltip na visão ANO:
Ao passar o mouse sobre uma célula com indicador, mostrar tooltip com lista das etiquetas:
```
┌─────────────────────────────┐
│ 17 FEV 2026 (TER)          │
│                             │
│ 🏔️ Saídas — Aventura       │
│ 💼 Reunião XYZ — Negócios  │
│ 💪 Treino 10km — Saúde     │
└─────────────────────────────┘
```

---

## Visão QUARTER — Múltiplas Cores Visíveis

No Quarter mostramos apenas 3 meses, então as células são ~3x mais altas que na visão ANO. Espaço suficiente para mostrar etiquetas individuais como **mini-barras empilhadas com texto**.

### Layout da célula no Quarter:

```
┌──────────────────┐
│ 17 TER           │
│                  │
│ ▌saídas          │  ← barra azul (Aventura) com texto truncado
│ ▌reunião xyz     │  ← barra laranja (Negócios) com texto truncado
│ ▌treino          │  ← barra verde (Saúde) com texto truncado
│                  │
└──────────────────┘
```

Cada etiqueta aparece como:
- Barra fina na cor da categoria (borda esquerda 3px + fundo com 15% opacidade da cor)
- Texto truncado com ellipsis (o que couber)
- Altura de cada barra: ~16-18px
- Máximo de etiquetas visíveis: **3** — se houver mais, mostrar "+2 mais" no rodapé

### Se o dia tem muitas etiquetas (4+):
```
┌──────────────────┐
│ 17 TER           │
│                  │
│ ▌saídas          │
│ ▌reunião xyz     │
│ ▌treino          │
│ +2 mais...       │  ← clicável, abre tooltip ou navega pro dia
│                  │
└──────────────────┘
```

### CSS para células do Quarter:
```css
.quarter-cell {
  min-height: 120px; /* mais alto que ANO */
  padding: 4px;
  display: flex;
  flex-direction: column;
}

.quarter-cell .label-mini {
  display: flex;
  align-items: center;
  height: 18px;
  margin-bottom: 2px;
  border-radius: 2px;
  padding: 0 4px;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-left: 3px solid; /* cor da categoria */
  background: rgba(var(--cat-color-rgb), 0.12);
  color: var(--text-primary);
}

.quarter-cell .more-labels {
  font-size: 9px;
  color: var(--text-primary);
  opacity: 0.6;
  cursor: pointer;
  margin-top: 2px;
}
```

### JS para renderizar células do Quarter:
```javascript
function renderQuarterCell(cell, labels, maxVisible = 3) {
  if (!labels || labels.length === 0) return;
  
  const container = document.createElement('div');
  container.className = 'quarter-labels';
  
  const visible = labels.slice(0, maxVisible);
  const remaining = labels.length - maxVisible;
  
  visible.forEach(label => {
    const cat = CATEGORIES.find(c => c.id === label.category);
    const bar = document.createElement('div');
    bar.className = 'label-mini';
    bar.style.borderLeftColor = cat.color;
    bar.style.background = hexToRgba(cat.color, 0.12);
    bar.textContent = label.text;
    bar.title = `${cat.emoji} ${label.text} — ${cat.namePt}`;
    container.appendChild(bar);
  });
  
  if (remaining > 0) {
    const more = document.createElement('div');
    more.className = 'more-labels';
    more.textContent = `+${remaining} mais...`;
    more.onclick = () => navigateToDay(label.startDate); // vai pra visão MÊS ou SEMANA
    container.appendChild(more);
  }
  
  cell.appendChild(container);
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
```

---

## Eventos Multi-Dia — Como Mostrar nas Diferentes Visões

Uma etiqueta que cobre vários dias (ex: "Saídas" de 16 a 20/fev) precisa de tratamento diferente em cada visão:

### Visão ANO:
- Cada dia do range tem a barra de indicador no rodapé
- A cor aparece em cada célula individualmente
- NÃO tenta fazer span visual entre células (muito pequeno)

### Visão QUARTER:
- Cada dia mostra a mini-barra com texto
- O texto aparece apenas no **primeiro dia** do range — os demais mostram só a barra colorida sem texto (ou com "→" indicando continuação)

```
┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐
│ 16 SEG ││ 17 TER ││ 18 QUA ││ 19 QUI ││ 20 SEX │
│        ││        ││        ││        ││        │
│▌saídas ││▌  →    ││▌  →    ││▌  →    ││▌  →    │
│        ││        ││        ││        ││        │
└────────┘└────────┘└────────┘└────────┘└────────┘
```

### Visão MÊS:
- Barra contínua estilo Google Calendar que se estende por múltiplas células
- Texto no primeiro dia, barra colorida continua nos demais
- **Já funciona** (pelo que vi nos screenshots)

### Visão SEMANA:
- Bloco colorido aparece em cada dia do range
- **Já funciona**

---

## Interação: Clicar na célula do ANO/QUARTER

Ao clicar numa célula na visão ANO ou QUARTER:
- **Se tem 0 etiquetas:** abre modal "Nova Etiqueta" (como hoje)
- **Se tem 1+ etiquetas:** abre um **popup rápido** mostrando as etiquetas do dia com opções:
  - Ver cada etiqueta (nome completo + categoria + período)
  - Editar/deletar uma etiqueta existente
  - Criar nova etiqueta nesse dia
  - "Ver no Mês" / "Ver na Semana" — navega para a visão expandida

---

## Resumo

**ANO:** Barra fina (4px) no rodapé de cada célula com cores divididas proporcionalmente por categoria. Tooltip no hover mostra detalhes. Célula mantém limpa com apenas o número + dia da semana.

**QUARTER:** Mini-barras empilhadas com borda colorida à esquerda + texto truncado. Máximo 3 visíveis + "+N mais..." clicável. Eventos multi-dia mostram texto só no primeiro dia, demais mostram "→".

**MÊS/SEMANA:** Sem alteração — já mostram etiquetas completas corretamente.
