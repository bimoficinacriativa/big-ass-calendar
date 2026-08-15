# RESPONSIVIDADE — Suporte Completo para 5 Dispositivos Específicos

## Os Dispositivos do Usuário

| # | Dispositivo | Tela | Resolução Nativa | Orientação | Uso |
|---|------------|------|------------------|------------|-----|
| 1 | **MacBook Pro** | 14" ou 16" | 3024×1964 (14") ou 3456×2234 (16") | Landscape | Edição principal, mouse + trackpad |
| 2 | **MacBook Air** | 13" ou 15" | 2560×1664 (13") ou 2880×1864 (15") | Landscape | Edição secundária, tela menor |
| 3 | **Monitor 27" 4K** | 27" | 3840×2160 | **Vertical (portrait)** | Monitor de mesa rotacionado 90°, tela secundária |
| 4 | **TV OLED 48"** | 48" | 3840×2160 | Horizontal (landscape) | Calendário fixo na parede, visualização ~2m distância |
| 5 | **iPhone 16 Pro** | 6.3" | 2556×1179 (393×852 pts) | Portrait + Landscape | Consulta rápida, adicionar etiquetas on-the-go |

---

## Device 1 & 2 — MacBook Pro + MacBook Air

Ambos são laptops landscape com Retina. A diferença é a quantidade de espaço disponível.

**Resoluções CSS efetivas (com scaling Retina):**
- MacBook Pro 14": ~1512×982 pts
- MacBook Pro 16": ~1728×1117 pts
- MacBook Air 13": ~1280×832 pts
- MacBook Air 15": ~1440×932 pts

**CSS media query:**
```css
/* MacBook Air 13" (menor laptop) */
@media (min-width: 1200px) and (max-width: 1399px) and (orientation: landscape) {
  /* Grid mais comprimido */
}

/* MacBook Pro / Air 15"+ */
@media (min-width: 1400px) and (max-width: 1919px) and (orientation: landscape) {
  /* Grid padrão desktop */
}
```

### Visão ANO nos MacBooks
- Grid 12 linhas × 31 colunas deve caber **sem scroll horizontal**
- **MacBook Air 13"** (caso mais apertado — 1280px):
  - Células: ~34px largura × 48px altura
  - Font-size número do dia: 10px
  - Font-size abreviação dia semana (DOM, SEG...): 7px
  - Font-size labels mês (JAN, FEV...): 14px
  - Font-size título: 24px
  - Label do mês à esquerda: largura fixa 40px
- **MacBook Pro 16"** (mais espaço — 1728px):
  - Células: ~44px largura × 56px altura
  - Font-size número do dia: 11px
  - Font-size abreviação: 8px
  - Font-size labels mês: 18px
  - Font-size título: 32px
  - Label do mês: largura 50px

### Visão MÊS nos MacBooks
- Grid 7 colunas, células ~120-160px altura
- Sidebar de notas: drawer slide-in da direita (~320px largura)

### Visão SEMANA nos MacBooks
- 7 colunas horizontais, altura = `calc(100vh - 130px)`
- Cada coluna com padding generoso para conteúdo

### Interação
- Hover states em todas as células (highlight sutil ao passar o mouse)
- Tooltips no hover de etiquetas
- Painel lateral como drawer (botão para abrir/fechar)
- Barra de botões (ANO/MÊS/SEMANA etc.) sempre visível no topo
- Todos os atalhos de teclado funcionando (Escape fecha modais, Tab navega)

---

## Device 3 — Monitor 27" 4K Vertical (Portrait)

**Caso especial e mais interessante.** Monitor rotacionado 90° — muito mais alto que largo.

**Resolução:** 2160×3840 (4K rotacionado) → CSS efetivo depende do scaling do macOS, tipicamente ~1080×1920 ou ~1440×2560 pts

**CSS media query:**
```css
@media (min-width: 1000px) and (orientation: portrait) and (min-height: 1800px) {
  /* Monitor 27" 4K vertical */
}
```

### Visão ANO no monitor vertical — GRID TRANSPOSTO

O grid 12×31 (12 linhas, 31 colunas) **NÃO funciona** em portrait porque 31 colunas fica espremido demais na largura limitada.

**Solução: TRANSPOR o grid.**
- **Linhas = dias (1 a 31)**, cada linha é um dia
- **Colunas = meses (JAN a DEZ)**, 12 colunas

```
         JAN   FEV   MAR   ABR   MAI   JUN   JUL   AGO   SET   OUT   NOV   DEZ
 1       QUI   DOM   DOM   QUA   SEX   SEG   QUA   SÁB   TER   QUI   DOM   TER
 2       SEX   SEG   SEG   QUI   SÁB   TER   QUI   DOM   QUA   SEX   SEG   QUA
 3       SÁB   TER   TER   SEX   DOM   QUA   SEX   SEG   QUI   SÁB   TER   QUI
 ...
 28      QUA   SÁB   SÁB   TER   QUI   DOM   TER   SEX   SEG   QUA   SÁB   SEG
 29      QUI   ---   DOM   QUA   SEX   SEG   QUA   SÁB   TER   QUI   DOM   TER
 30      SEX   ---   SEG   QUI   SÁB   TER   QUI   DOM   QUA   SEX   SEG   QUA
 31      SÁB   ---   TER   ---   DOM   ---   SEX   SEG   ---   SÁB   ---   QUI
```

- 12 colunas cabem perfeitamente na largura (~1080-1440px)
- 31 linhas com scroll vertical natural (o monitor é comprido!)
- Header dos meses fica sticky no topo ao rolar
- Coluna de números (1-31) sticky à esquerda
- Etiquetas aparecem como pequenos blocos coloridos dentro das células
- Finais de semana (SÁB/DOM) com fundo azul claro na célula, independente da coluna

**CSS para o grid transposto:**
```css
[data-device="monitor-vertical"] .year-grid {
  grid-template-columns: 40px repeat(12, 1fr); /* dia + 12 meses */
  grid-template-rows: 50px repeat(31, minmax(45px, auto)); /* header + 31 dias */
}
```

### Visão MÊS no monitor vertical
- Grid 7 colunas padrão, mas com células MUITO altas (~250px)
- Mostra 5-6 semanas completas sem necessidade de scroll
- Sidebar de notas vai para **BAIXO** do calendário (não cabe ao lado)
- Perfeito para esta orientação

### Visão SEMANA no monitor vertical
- **Dias empilhados verticalmente** em vez de 7 colunas horizontais
- Cada dia é uma faixa horizontal larga usando toda a largura do monitor
- Stack: DOM no topo, SÁB embaixo
- Scroll vertical para ver todos os 7 dias

```
┌─────────────────────────────────────────────────────┐
│ DOM 15 FEV                                           │
│ [etiquetas e notas do dia]                           │
├─────────────────────────────────────────────────────┤
│ SEG 16 FEV                                           │
│ [etiquetas e notas do dia]                           │
├─────────────────────────────────────────────────────┤
│ TER 17 FEV  ← HOJE                                  │
│ [etiquetas e notas do dia]                           │
├─────────────────────────────────────────────────────┤
│ QUA 18 FEV                                           │
│ [etiquetas e notas do dia]                           │
├─────────────────────────────────────────────────────┤
│ QUI 19 FEV                                           │
│ [etiquetas e notas do dia]                           │
├─────────────────────────────────────────────────────┤
│ SEX 20 FEV                                           │
│ [etiquetas e notas do dia]                           │
├─────────────────────────────────────────────────────┤
│ SÁB 21 FEV                                          │
│ [etiquetas e notas do dia]                           │
└─────────────────────────────────────────────────────┘
```

---

## Device 4 — TV OLED 48" 4K Horizontal

**Resolução:** 3840×2160  
**Distância de visualização:** 1.5 a 3 metros  
**Interação:** Mouse (conectado ao Mac) ou sem interação (modo display)

**CSS media query:**
```css
@media (min-width: 1920px) and (min-height: 1000px) and (orientation: landscape) {
  /* TV 4K — pode ser 1920 (scaling) ou 3840 (nativo) */
}

@media (min-width: 3000px) {
  /* TV 4K resolução nativa sem scaling */
}
```

### Visão ANO na TV — MODO DISPLAY/CINEMA
- Grid 12×31 ocupa **100% da viewport SEM NENHUM scroll**
- Todas as 12 linhas × 31 colunas visíveis simultaneamente
- É o modo principal — o calendário fica "na parede" como um pôster digital

**Tamanhos para legibilidade a ~2 metros:**
- Font-size número do dia: **18-22px**
- Font-size abreviação dia semana: **12-14px**
- Font-size labels mês (JAN, FEV...): **32-36px**
- Font-size título: **52-60px**
- Texto das etiquetas: **14-16px**
- Borda do dia atual: **4px** com leve glow/pulse

**Modo Cinema/Kiosk:**
- Barra de botões (ANO/MÊS/SEMANA/filtros): **auto-hide após 5 segundos** de inatividade do mouse
- Reaparece ao mover o mouse ou tocar na tela
- Transição suave: `opacity 0 → 1` em 300ms
- Painel lateral **escondido por padrão**, acessível por botão ou hover na borda direita

```javascript
// Auto-hide toolbar na TV
let idleTimer;
function resetIdle() {
  document.body.removeAttribute('data-idle');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    document.body.setAttribute('data-idle', 'true');
  }, 5000); // 5 segundos
}
document.addEventListener('mousemove', resetIdle);
document.addEventListener('click', resetIdle);
```

```css
[data-device="tv-oled"][data-idle="true"] .toolbar {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
[data-device="tv-oled"] .toolbar {
  opacity: 1;
  transition: opacity 0.3s ease;
}
```

**Dark Mode como sugestão padrão na TV:**
- Detectar se a viewport é de TV e sugerir Dark Mode (OLED = preto verdadeiro #000000 = pixels desligados = sem burn-in + economia de energia)
- Fundo: `#000000` (preto puro, NÃO usar #111 ou #1a1a1a)
- Bordas das células: `#1a3a5c` (azul muito escuro)
- Texto: `#64B5F6` (azul claro neon)
- Etiquetas coloridas mantêm suas cores vibrantes sobre o fundo preto

### Visão MÊS na TV
- Grid 7 colunas com células enormes (~300px+ altura)
- Sidebar de notas visível à direita (~350px largura)
- Números dos dias: 36px+
- Perfeito para ver com a família de longe

### Visão SEMANA na TV
- 7 colunas gigantes lado a lado
- Cada dia como uma área tipo whiteboard
- Textos: 24px+

---

## Device 5 — iPhone 16 Pro

**Resolução CSS:** 393×852 pts (portrait), 852×393 pts (landscape)  
**Device pixel ratio:** 3  
**Dynamic Island:** Sim — precisa de safe areas

**Meta viewport (OBRIGATÓRIO):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

**Safe areas para Dynamic Island e home bar:**
```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

**CSS media query:**
```css
@media (max-width: 430px) {
  /* iPhone portrait */
}
@media (max-width: 932px) and (orientation: landscape) and (max-height: 430px) {
  /* iPhone landscape */
}
```

### Visão ANO no iPhone

**Portrait (393px largura):**
- Grid 12×31 é impossível de mostrar legível em 393px
- Mostrar **3 meses por vez** com scroll vertical suave
- Cada mês como faixa horizontal com cells minúsculas (~11px largura)
- Pinch-to-zoom habilitado para ver detalhes
- Tap numa célula → abre modal de edição (não precisa zoom intermediário)
- Alternativa: mini-mapa overview com tap para expandir um mês

**Landscape (852px largura):**
- Mostrar 4-5 meses por vez com scroll vertical
- Grid mais legível, cells ~24px largura
- Barra de botões fixa no topo (compacta)

### Visão MÊS no iPhone

**Portrait:**
- Grid 7 colunas padrão, largura total 393px
- Células: ~56px largura × 70px altura
- Números dos dias: 14px, bold
- Etiquetas como barras finas de cor (sem texto — apenas cor com dot; tap para ver detalhes)
- Sidebar de notas → bottom sheet (swipe up do rodapé)
- Header fixo com ◄ FEVEREIRO 2026 ► 

**Landscape:**
- Grid 7 colunas confortável, cells ~120px largura
- Similar ao layout MacBook comprimido

### Visão SEMANA no iPhone — MODO PRINCIPAL MOBILE

**Portrait (393×852) — Este é O uso mobile mais importante:**
- **1 dia por vez**, swipe horizontal para navegar entre os 7 dias
- Cada dia ocupa toda a tela com bastante espaço para conteúdo
- Layout:

```
┌─────────────────────────────────┐
│  ◄  TER 17 FEV 2026  ►         │
│     • • ● • • • •              │  ← dots indicam posição na semana
├─────────────────────────────────┤
│                                 │
│  [Etiqueta 1 - bloco colorido] │
│  [Etiqueta 2 - bloco colorido] │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                          [＋]  │  ← FAB (floating action button)
└─────────────────────────────────┘
```

- Swipe animado: `translateX` slide entre dias (como carrossel)
- Dots indicator: 7 pontos, o ativo é maior/preenchido
- Botão + flutuante (FAB) no canto inferior direito para criar etiqueta rapidamente
- Lista de etiquetas do dia como cards empilhados com cor da categoria na borda esquerda

**Landscape:**
- 7 colunas comprimidas lado a lado (como MacBook miniatura)

### Gestos Touch no iPhone
- **Tap** célula: abrir modal de criar/editar etiqueta
- **Long press** célula: menu de contexto (criar etiqueta, marcar como Misogi, Kevin's Rule)
- **Swipe horizontal**: navegar entre dias (SEMANA) ou meses (MÊS)
- **Pinch-to-zoom**: na visão ANO
- **Swipe down** no modal: fechar (dismiss)

### Modais no iPhone — Bottom Sheets
- TODOS os modais são **bottom sheets** (sobem de baixo)
- Handle de arraste no topo: barra cinza (40px × 4px, border-radius 2px)
- Botão ✕ no canto superior direito
- **Font-size mínimo 16px em todos os inputs** (evita zoom automático do Safari!)
- Padding: 20px
- Border-radius topo: 16px
- Fundo: branco com sombra `0 -4px 20px rgba(0,0,0,0.15)`
- Overlay escuro (rgba(0,0,0,0.4)) no fundo, tap para fechar

### PWA no iPhone
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="BAC 2026">
<link rel="apple-touch-icon" href="icon-180.png">
```
Isso permite "Adicionar à Tela de Início" e rodar como app standalone.

---

## Detecção de Dispositivo (JavaScript)

```javascript
function detectDevice() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isPortrait = h > w;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // TV OLED 48" — tela grande, landscape, sem touch
  if (w >= 1920 && h >= 1000 && !isTouch && !isPortrait) return 'tv-oled';

  // Monitor 27" vertical — tela grande, portrait, sem touch
  if (w >= 1000 && isPortrait && h >= 1800 && !isTouch) return 'monitor-vertical';

  // MacBook Pro (tela maior)
  if (w >= 1400 && !isPortrait && !isTouch) return 'macbook-pro';

  // MacBook Air (tela menor)
  if (w >= 1200 && !isPortrait && !isTouch) return 'macbook-air';

  // iPhone landscape
  if (isTouch && !isPortrait && w < 932) return 'iphone-landscape';

  // iPhone portrait
  if (isTouch && isPortrait && w <= 430) return 'iphone-portrait';

  // Fallback
  return 'macbook-air';
}

// Aplicar no body
function applyDevice() {
  document.body.dataset.device = detectDevice();
}
applyDevice();
window.addEventListener('resize', applyDevice);
window.addEventListener('orientationchange', () => {
  setTimeout(applyDevice, 100); // delay para orientação estabilizar
});
```

---

## CSS Variables por Dispositivo

```css
:root {
  /* === iPhone Portrait (base mobile-first) === */
  --cell-width: 11px;
  --cell-height: 24px;
  --font-day-num: 8px;
  --font-day-abbrev: 6px;
  --font-month-label: 12px;
  --font-title: 18px;
  --font-label-text: 7px;
  --today-border: 2px;
  --grid-gap: 1px;
  --toolbar-height: 44px;
}

/* MacBook Air */
@media (min-width: 1200px) and (max-width: 1399px) and (orientation: landscape) {
  :root {
    --cell-width: 34px;
    --cell-height: 48px;
    --font-day-num: 10px;
    --font-day-abbrev: 7px;
    --font-month-label: 14px;
    --font-title: 24px;
    --font-label-text: 8px;
    --today-border: 2px;
    --toolbar-height: 48px;
  }
}

/* MacBook Pro */
@media (min-width: 1400px) and (max-width: 1919px) and (orientation: landscape) {
  :root {
    --cell-width: 42px;
    --cell-height: 56px;
    --font-day-num: 11px;
    --font-day-abbrev: 8px;
    --font-month-label: 18px;
    --font-title: 32px;
    --font-label-text: 9px;
    --today-border: 2px;
    --toolbar-height: 52px;
  }
}

/* Monitor 27" 4K vertical */
@media (min-width: 1000px) and (orientation: portrait) and (min-height: 1800px) {
  :root {
    --cell-width: 80px;
    --cell-height: 45px;
    --font-day-num: 13px;
    --font-day-abbrev: 9px;
    --font-month-label: 22px;
    --font-title: 36px;
    --font-label-text: 11px;
    --today-border: 3px;
    --toolbar-height: 56px;
  }
}

/* TV OLED 48" 4K */
@media (min-width: 1920px) and (min-height: 1000px) and (orientation: landscape) {
  :root {
    --cell-width: 90px;
    --cell-height: 130px;
    --font-day-num: 20px;
    --font-day-abbrev: 13px;
    --font-month-label: 34px;
    --font-title: 56px;
    --font-label-text: 15px;
    --today-border: 4px;
    --toolbar-height: 64px;
  }
}

/* TV 4K nativa (sem scaling) */
@media (min-width: 3000px) {
  :root {
    --cell-width: 100px;
    --cell-height: 150px;
    --font-day-num: 24px;
    --font-day-abbrev: 16px;
    --font-month-label: 40px;
    --font-title: 64px;
    --font-label-text: 18px;
    --today-border: 5px;
  }
}

/* Acessibilidade */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0s !important; transition-duration: 0.1s !important; }
}

@media (prefers-color-scheme: dark) {
  /* Sugerir tema Dark automaticamente, especialmente na TV */
}
```

---

## Checklist de Testes

### MacBook Air 13"
- [ ] Visão ANO: grid 12×31 cabe sem scroll horizontal em 1280px
- [ ] Textos legíveis mas compactos
- [ ] Drawer lateral não sobrepõe o grid inteiro

### MacBook Pro 16"
- [ ] Visão ANO: grid confortável com espaço de respiro
- [ ] Hover states funcionando
- [ ] Atalhos de teclado (Esc, Tab)

### Monitor 27" 4K Vertical
- [ ] Visão ANO: grid TRANSPOSTO (31 linhas × 12 colunas)
- [ ] Header de meses sticky no topo ao rolar
- [ ] Visão SEMANA: dias empilhados verticalmente
- [ ] Visão MÊS: células altas, sidebar embaixo

### TV OLED 48"
- [ ] Visão ANO: 100% viewport, ZERO scroll
- [ ] Toolbar some após 5s, reaparece ao mover mouse
- [ ] Dark Mode: fundo #000000 puro
- [ ] Textos legíveis a 2 metros de distância
- [ ] Dia atual visível com borda 4px + glow

### iPhone 16 Pro
- [ ] Portrait: visão SEMANA mostra 1 dia com swipe horizontal
- [ ] Portrait: visão ANO mostra 3 meses com scroll vertical
- [ ] Modais são bottom sheets
- [ ] Inputs têm font-size 16px+ (sem zoom Safari)
- [ ] Safe areas respeitadas (Dynamic Island, home bar)
- [ ] Rotação portrait↔landscape transição suave
- [ ] PWA installable via "Adicionar à Tela de Início"

### Cross-device
- [ ] Etiquetas criadas em qualquer device aparecem em todos (mesmo localStorage)
- [ ] Tema selecionado se mantém em todas as visões
- [ ] Filtros por categoria funcionam em todas as visões

---

## Resumo

5 dispositivos, cada um com layout otimizado: MacBook Air (grid compacto), MacBook Pro (grid confortável), Monitor 27" 4K vertical (grid TRANSPOSTO — dias=linhas, meses=colunas, visão semana empilhada verticalmente), TV OLED 48" (modo cinema com auto-hide da toolbar, 100% viewport sem scroll, dark mode sugerido), iPhone 16 Pro (visão semana 1 dia com swipe, bottom sheets, PWA, safe areas). Detecção automática de dispositivo via JS, CSS variables responsivas por breakpoint, e auto-hide de toolbar na TV após 5s de inatividade.
