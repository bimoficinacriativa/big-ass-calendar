# RECURSO — Tutorial de Boas-Vindas (Onboarding)

## Conceito

Um tutorial interativo que aparece na **primeira vez** que o usuário abre o app. Ensina o método Jesse Itzler passo a passo enquanto apresenta cada funcionalidade do calendário. O tom é direto, motivacional e prático — como se o Itzler estivesse falando com você.

O tutorial é uma sequência de **8 steps** (slides/cards) com animação de transição. Cada step tem uma frase de impacto, uma explicação curta, e um destaque visual no elemento do app correspondente (spotlight).

---

## Fluxo Geral

```
[1. BEM-VINDO]  →  [2. GET LIGHT]  →  [3. MISOGI]  →  [4. KEVIN'S RULE]
      →  [5. WINNING HABITS]  →  [6. 8 BOXES]  →  [7. WEEK AT A GLANCE]
      →  [8. GO! Começar a usar]
```

Controles:
- Setas ◀ ▶ para navegar
- Dots indicadores de progresso (● ● ○ ○ ○ ○ ○ ○)
- Botão "Pular tutorial" discreto no canto
- Último step tem botão "Começar meu ano!" que fecha o tutorial

---

## Overlay e Spotlight

O tutorial usa um **overlay escuro** sobre o app inteiro, com um **recorte (spotlight)** que ilumina o elemento sendo explicado.

```css
.tutorial-overlay {
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: none;
}

/* Máscara escura com recorte */
.tutorial-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  transition: all 0.5s ease;
  /* O recorte é feito via clip-path ou SVG mask */
}

/* Área iluminada (spotlight) */
.tutorial-spotlight {
  position: absolute;
  border-radius: 12px;
  box-shadow: 0 0 0 4px var(--accent), 0 0 30px rgba(var(--accent-rgb), 0.3);
  transition: all 0.5s ease;
  pointer-events: auto;
}

/* Card do tutorial */
.tutorial-card {
  position: absolute;
  width: 400px;
  max-width: 90vw;
  background: var(--modal-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  animation: cardAppear 0.4s ease;
}

@keyframes cardAppear {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Seta apontando para o elemento */
.tutorial-card::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--modal-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: rotate(45deg);
  /* Posição ajustada por JS conforme onde o card fica */
}
```

---

## Step 1 — Bem-Vindo

**Spotlight:** Nenhum (overlay total, card centralizado)

```
┌──────────────────────────────────────────┐
│                                          │
│        🗓️ THE BIG A## CALENDAR           │
│                                          │
│    "Bons anos não acontecem por          │
│     acidente. Eles são um sistema."      │
│                    — Jesse Itzler        │
│                                          │
│  Este calendário usa o método de Jesse   │
│  Itzler para transformar 2026 no seu     │
│  ano mais memorável.                     │
│                                          │
│  Em 2 minutos você vai aprender a:       │
│                                          │
│  🏔️ Definir seu MISOGI                   │
│  🎯 Planejar mini-aventuras             │
│  💪 Construir hábitos vencedores        │
│  📋 Criar seu roteiro diário            │
│                                          │
│         [ Começar o tour →  ]            │
│                                          │
│  ○ ○ ○ ○ ○ ○ ○ ○         Pular tutorial │
└──────────────────────────────────────────┘
```

**PT-BR:**
- Título: "Bons anos não acontecem por acidente."
- Sub: "Este calendário usa o método de Jesse Itzler para transformar 2026 no seu ano mais memorável."
- CTA: "Começar o tour"

**EN:**
- Título: "Good years don't happen by accident."
- Sub: "This calendar uses Jesse Itzler's method to make 2026 your most memorable year."
- CTA: "Start the tour"

---

## Step 2 — Get Light (Chegar Leve)

**Spotlight:** Nenhum (card centralizado, com checklist interativo)

```
┌──────────────────────────────────────────┐
│                                          │
│  🪶  CHEGAR LEVE                         │
│                                          │
│  "Subtração é um superpoder. Pessoas     │
│   de sucesso não adicionam mais metas    │
│   — elas eliminam distrações."           │
│                                          │
│  Antes de planejar, limpe o terreno.     │
│  Faça isso antes de usar o calendário:   │
│                                          │
│  □ Limpar armário (30min, doe o que      │
│    não usa)                              │
│  □ Cancelar assinaturas inúteis          │
│  □ Zerar a caixa de entrada             │
│  □ Limpar o carro e a mesa              │
│  □ Avaliar compromissos que drenam       │
│    energia                               │
│                                          │
│  Dica: isso leva 1-2 horas e muda       │
│  como você entra no ano.                 │
│                                          │
│    [ ◀ Voltar ]        [ Próximo ▶ ]     │
│  ● ● ○ ○ ○ ○ ○ ○                        │
└──────────────────────────────────────────┘
```

Os checkboxes são **clicáveis** e o estado é salvo. Não é obrigatório marcar pra avançar, mas dá uma sensação de progresso.

---

## Step 3 — O Misogi

**Spotlight:** Ilumina o calendário inteiro (grid do ano), mostrando que o Misogi ocupa o ano todo.

```
┌──────────────────────────────────────────┐
│                                          │
│  🏔️  O MISOGI                            │
│  Uma grande coisa que define o ano       │
│                                          │
│  "Quando você tiver 80 anos, não vai     │
│   lembrar de uma reunião de terça.       │
│   Mas vai lembrar do ano que escalou     │
│   aquela montanha."                      │
│                                          │
│  Escolha UMA meta marcante para 2026:    │
│                                          │
│  Exemplos:                               │
│  • Escrever um livro                     │
│  • Correr uma maratona                   │
│  • Lançar um podcast                     │
│  • Atravessar o Brasil de bicicleta      │
│                                          │
│  Coloque essa meta como a PRIMEIRA       │
│  etiqueta no seu calendário.             │
│  Use a categoria 🏔️ Aventura.            │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━           │
│  50 anos × 1 Misogi = 50 conquistas     │
│  extraordinárias no seu currículo       │
│  de vida.                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━           │
│                                          │
│    [ ◀ Voltar ]        [ Próximo ▶ ]     │
│  ● ● ● ○ ○ ○ ○ ○                        │
└──────────────────────────────────────────┘
```

---

## Step 4 — Kevin's Rule

**Spotlight:** Ilumina 6 datas distribuídas no calendário (a cada ~8 semanas), pulsando suavemente.

```
┌──────────────────────────────────────────┐
│                                          │
│  🎯  A REGRA DO KEVIN                    │
│  1 mini-aventura a cada 8 semanas        │
│                                          │
│  "Se você não consegue tirar 1 dia       │
│   a cada 2 meses pra fazer algo          │
│   diferente, seu sistema está            │
│   totalmente fora de equilíbrio."        │
│                                          │
│  6 dias por ano. É só isso.              │
│                                          │
│  FEV ━━ ABR ━━ JUN ━━ AGO ━━ OUT ━━ DEZ │
│   🥾     🎸     🏕️     🎨     🚴     ⛷️   │
│                                          │
│  Exemplos acessíveis:                    │
│  • Trilha num parque (custo: R$0)        │
│  • Show de uma banda local              │
│  • Dia de pesca com os filhos            │
│  • Visitar amigos de faculdade           │
│  • Corrida de rua (R$30-80)             │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━           │
│  40 anos × 6/ano = 240 mini-aventuras   │
│  que nunca teriam acontecido.            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━           │
│                                          │
│    [ ◀ Voltar ]        [ Próximo ▶ ]     │
│  ● ● ● ● ○ ○ ○ ○                        │
└──────────────────────────────────────────┘
```

---

## Step 5 — Winning Habits

**Spotlight:** Ilumina os 4 trimestres no calendário (Q1, Q2, Q3, Q4).

```
┌──────────────────────────────────────────┐
│                                          │
│  💪  HÁBITOS VENCEDORES                  │
│  1 novo hábito por trimestre             │
│                                          │
│  "Esqueça as resoluções de Ano Novo.     │
│   Elas falham porque exigem uma mudança  │
│   total da noite pro dia."              │
│                                          │
│  Adicione 1 hábito a cada 3 meses:      │
│                                          │
│  Q1 (JAN-MAR)  Beber 3L de água/dia     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  Q2 (ABR-JUN)  10min meditação/dia      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  Q3 (JUL-SET)  Nunca chegar atrasado    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  Q4 (OUT-DEZ)  Roteiro da noite         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│                                          │
│  4/ano × 10 anos = 40 hábitos           │
│  transformadores. Sem burnout.           │
│                                          │
│    [ ◀ Voltar ]        [ Próximo ▶ ]     │
│  ● ● ● ● ● ○ ○ ○                        │
└──────────────────────────────────────────┘
```

---

## Step 6 — As 8 Caixas

**Spotlight:** Ilumina os 8 quadrados coloridos de categoria no header do app.

```
┌──────────────────────────────────────────┐
│                                          │
│  📦  AS 8 CAIXAS                         │
│  Seu inventário de vida                  │
│                                          │
│  "Para ser a versão A+ de si mesmo,      │
│   você precisa saber exatamente pelo     │
│   que está trabalhando."                │
│                                          │
│  Cada cor no calendário é uma área       │
│  da sua vida:                            │
│                                          │
│  🏔️ ██ Aventura    💑 ██ Casamento      │
│  💪 ██ Saúde       👶 ██ Filhos         │
│  💼 ██ Negócios    🧘 ██ Pessoal        │
│  👨‍👩‍👧 ██ Família     💰 ██ Finanças      │
│                                          │
│  Ao criar uma etiqueta, escolha a        │
│  categoria. Assim você vê de um          │
│  relance se está investindo em           │
│  todas as áreas — ou negligenciando      │
│  alguma.                                 │
│                                          │
│  Clique nos quadrados para FILTRAR       │
│  e ver só uma categoria de cada vez.     │
│                                          │
│    [ ◀ Voltar ]        [ Próximo ▶ ]     │
│  ● ● ● ● ● ● ○ ○                        │
└──────────────────────────────────────────┘
```

---

## Step 7 — Week at a Glance + Evening Script

**Spotlight:** Ilumina a sidebar (Visão da Semana, Não Esqueça, Roteiro da Noite, Tarefas).

```
┌──────────────────────────────────────────┐
│                                          │
│  📋  SEU COCKPIT SEMANAL                 │
│                                          │
│  "O dia começa na noite anterior.        │
│   A competição é boa demais pra          │
│   acordar improvisando."                │
│                                          │
│  👁️ VISÃO DA SEMANA                      │
│  Todo domingo à noite, olhe sua semana   │
│  e pergunte: "O que merece minha         │
│  energia?"                               │
│                                          │
│  📌 NÃO ESQUEÇA                          │
│  Lembretes rápidos. Arraste pro          │
│  calendário pra agendar.                 │
│                                          │
│  📋 ROTEIRO DA NOITE                     │
│  Monte o script do dia seguinte:         │
│  "7h filhos, 8h treino, 9h reunião"     │
│                                          │
│  ☑️ TAREFAS                              │
│  Checklist do que precisa ser feito.     │
│                                          │
│  💡 Dica: arraste itens entre seções     │
│  pra transformar lembretes em tarefas    │
│  ou roteiro!                             │
│                                          │
│    [ ◀ Voltar ]        [ Próximo ▶ ]     │
│  ● ● ● ● ● ● ● ○                        │
└──────────────────────────────────────────┘
```

---

## Step 8 — GO!

**Spotlight:** Nenhum (overlay some, card centralizado com confetti)

```
┌──────────────────────────────────────────┐
│                                          │
│           🎉                             │
│                                          │
│  PRONTO PRA ATACAR 2026!                 │
│                                          │
│  "A única coisa que todos os tolos       │
│   têm em comum é que estão sempre        │
│   se preparando pra começar."            │
│                                          │
│  Seus próximos passos:                   │
│                                          │
│  1️⃣  Coloque seu MISOGI no calendário    │
│  2️⃣  Agende 6 mini-aventuras            │
│  3️⃣  Escolha o hábito do Q1             │
│  4️⃣  Monte o roteiro de amanhã          │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━           │
│  No final do ano, pergunte-se:           │
│  "Pelo que eu quero brindar?"           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━           │
│                                          │
│       [ 🚀 Começar meu ano! ]            │
│                                          │
│  ● ● ● ● ● ● ● ●                        │
└──────────────────────────────────────────┘
```

Ao clicar "Começar meu ano!":
- Confetti animation breve (0.8s)
- Overlay some com fade
- App aparece completo
- Flag `tutorialCompleted = true` salva no localStorage

---

## Implementação

### Estado e persistência:

```javascript
const TUTORIAL_KEY = 'bac2026_tutorial_completed';

function shouldShowTutorial() {
  return !localStorage.getItem(TUTORIAL_KEY);
}

function completeTutorial() {
  localStorage.setItem(TUTORIAL_KEY, 'true');
  closeTutorial();
}

function resetTutorial() {
  localStorage.removeItem(TUTORIAL_KEY);
  // Disponível em Settings ou ao clicar "?" no header
}
```

### Navegação entre steps:

```javascript
let currentStep = 0;
const TOTAL_STEPS = 8;

function nextStep() {
  if (currentStep < TOTAL_STEPS - 1) {
    currentStep++;
    renderTutorialStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    renderTutorialStep(currentStep);
  }
}

function skipTutorial() {
  completeTutorial();
}
```

### Spotlight (iluminar elemento):

```javascript
const STEP_SPOTLIGHTS = [
  null,                                    // Step 0: sem spotlight
  null,                                    // Step 1: sem spotlight (Get Light)
  '.calendar-grid',                        // Step 2: Misogi — grid inteiro
  '.calendar-grid .mini-adventure-dates',  // Step 3: Kevin — datas específicas
  '.view-buttons .quarter-btns',           // Step 4: Habits — botões Q1-Q4
  '.category-filters',                     // Step 5: 8 Boxes — filtros
  '.sidebar',                              // Step 6: Sidebar
  null,                                    // Step 7: sem spotlight (GO!)
];

function spotlightElement(selector) {
  if (!selector) {
    // Sem spotlight — card centralizado, overlay total
    mask.style.clipPath = 'none';
    return;
  }
  
  const el = document.querySelector(selector);
  if (!el) return;
  
  const rect = el.getBoundingClientRect();
  const padding = 12;
  
  // Recorte na máscara escura
  const x = rect.left - padding;
  const y = rect.top - padding;
  const w = rect.width + padding * 2;
  const h = rect.height + padding * 2;
  
  // CSS clip-path com polygon invertido (escurece tudo MENOS o spotlight)
  mask.style.clipPath = `polygon(
    0% 0%, 0% 100%, 
    ${x}px 100%, ${x}px ${y}px, 
    ${x + w}px ${y}px, ${x + w}px ${y + h}px, 
    ${x}px ${y + h}px, ${x}px 100%, 
    100% 100%, 100% 0%
  )`;
  
  // Posicionar o brilho
  spotlight.style.left = `${x}px`;
  spotlight.style.top = `${y}px`;
  spotlight.style.width = `${w}px`;
  spotlight.style.height = `${h}px`;
}
```

### Posicionamento do card:

O card se posiciona automaticamente perto do spotlight sem cobri-lo:

```javascript
function positionCard(spotlightRect) {
  if (!spotlightRect) {
    // Centralizar
    card.style.left = '50%';
    card.style.top = '50%';
    card.style.transform = 'translate(-50%, -50%)';
    return;
  }
  
  const cardWidth = 400;
  const cardHeight = card.offsetHeight;
  const margin = 24;
  
  // Preferência: abaixo do spotlight
  if (spotlightRect.bottom + margin + cardHeight < window.innerHeight) {
    card.style.top = `${spotlightRect.bottom + margin}px`;
    card.style.left = `${spotlightRect.left}px`;
  }
  // Senão: acima
  else if (spotlightRect.top - margin - cardHeight > 0) {
    card.style.top = `${spotlightRect.top - margin - cardHeight}px`;
    card.style.left = `${spotlightRect.left}px`;
  }
  // Senão: ao lado direito
  else {
    card.style.top = `${spotlightRect.top}px`;
    card.style.left = `${spotlightRect.right + margin}px`;
  }
}
```

---

## CSS dos Cards

```css
.tutorial-card {
  position: absolute;
  width: 420px;
  max-width: 90vw;
  background: var(--modal-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 9010;
  color: var(--text-primary);
}

.tutorial-card .step-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.tutorial-card .step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
  margin-bottom: 4px;
}

.tutorial-card .step-subtitle {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.tutorial-card .step-quote {
  font-style: italic;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary);
  padding: 12px 16px;
  border-left: 3px solid var(--accent);
  background: rgba(var(--accent-rgb), 0.05);
  border-radius: 0 8px 8px 0;
  margin-bottom: 16px;
}

.tutorial-card .step-body {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.tutorial-card .step-stat {
  text-align: center;
  padding: 12px;
  background: rgba(var(--accent-rgb), 0.08);
  border-radius: 10px;
  margin: 16px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}

/* Navegação */
.tutorial-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.tutorial-nav .nav-btn {
  padding: 8px 20px;
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.tutorial-nav .nav-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.tutorial-nav .nav-btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #FFFFFF;
}
.tutorial-nav .nav-btn.primary:hover {
  filter: brightness(1.1);
}

/* Dots de progresso */
.tutorial-dots {
  display: flex;
  gap: 6px;
}
.tutorial-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s;
}
.tutorial-dots .dot.active {
  background: var(--accent);
  width: 20px;
  border-radius: 4px;
}
.tutorial-dots .dot.completed {
  background: var(--accent);
  opacity: 0.5;
}

/* Skip button */
.tutorial-skip {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 11px;
  color: var(--text-tertiary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.15s;
}
.tutorial-skip:hover {
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.05);
}
```

---

## Confetti no Final (Step 8)

Confetti leve ao clicar "Começar meu ano!":

```javascript
function launchConfetti() {
  const colors = ['#1E90FF', '#FF69B4', '#7CB342', '#9C82D4', '#FF6D00', '#FFD600', '#FF7043', '#00BCD4'];
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.animationDuration = `${0.8 + Math.random() * 0.6}s`;
    container.appendChild(piece);
  }
  
  setTimeout(() => container.remove(), 2000);
}
```

```css
.confetti-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}
.confetti-piece {
  position: absolute;
  top: -10px;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  animation: confettiFall linear forwards;
}
@keyframes confettiFall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
```

---

## Como Acessar Novamente

O tutorial pode ser reaberto por:

1. **Botão "?" no header** — ao lado do botão de idioma (EN/PT)
2. **Primeiro acesso** — automático se `tutorialCompleted` não existe no localStorage
3. **Botão na sidebar** — em Settings/Configurações (se existir)

```html
<!-- Botão "?" no header -->
<button class="help-btn" onclick="resetTutorial(); showTutorial();" 
        title="Rever tutorial / Review tutorial">
  ?
</button>
```

```css
.help-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.help-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

---

## Responsividade

### iPhone:
- Cards viram **bottom sheet** (slide up from bottom)
- Largura 100%, border-radius só no topo
- Spotlight mais sutil (borda ao invés de recorte complexo)
- Texto um pouco menor (12px body)

```css
@media (max-width: 480px) {
  .tutorial-card {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    border-radius: 20px 20px 0 0;
    max-height: 70vh;
    overflow-y: auto;
    transform: none !important;
  }
}
```

### TV OLED:
- Cards maiores (500px width)
- Fonte maior
- Spotlight mais pronunciado

---

## Bilíngue

Todas as frases têm versão PT-BR e EN, usando o mesmo sistema de `lang` do app:

```javascript
const TUTORIAL_TEXT = {
  step0: {
    title: {
      pt: 'Bons anos não acontecem por acidente.',
      en: 'Good years don\'t happen by accident.'
    },
    subtitle: {
      pt: 'Este calendário usa o método de Jesse Itzler para transformar 2026 no seu ano mais memorável.',
      en: 'This calendar uses Jesse Itzler\'s method to make 2026 your most memorable year.'
    },
    cta: { pt: 'Começar o tour', en: 'Start the tour' }
  },
  step1: {
    title: { pt: 'CHEGAR LEVE', en: 'GET LIGHT' },
    subtitle: { pt: 'O poder da subtração', en: 'The power of subtraction' },
    quote: {
      pt: 'Subtração é um superpoder. Pessoas de sucesso não adicionam mais metas — elas eliminam distrações.',
      en: 'Subtraction is a superpower. Successful people don\'t add more goals — they eliminate distractions.'
    }
  },
  step2: {
    title: { pt: 'O MISOGI', en: 'THE MISOGI' },
    subtitle: { pt: 'Uma grande coisa que define o ano', en: 'One big year-defining thing' },
    quote: {
      pt: 'Quando tiver 80 anos, não vai lembrar de reunião nenhuma. Mas vai lembrar do ano que escalou aquela montanha.',
      en: 'When you\'re 80, you won\'t remember a single Tuesday meeting. But you\'ll remember the year you climbed that mountain.'
    }
  },
  step3: {
    title: { pt: 'A REGRA DO KEVIN', en: 'KEVIN\'S RULE' },
    subtitle: { pt: '1 mini-aventura a cada 8 semanas', en: '1 mini-adventure every 8 weeks' },
    quote: {
      pt: 'Se você não consegue tirar 1 dia a cada 2 meses, seu sistema está totalmente fora de equilíbrio.',
      en: 'If you can\'t take 1 day every 2 months, your system is totally out of balance.'
    }
  },
  step4: {
    title: { pt: 'HÁBITOS VENCEDORES', en: 'WINNING HABITS' },
    subtitle: { pt: '1 novo hábito por trimestre', en: '1 new habit per quarter' },
    quote: {
      pt: 'Esqueça resoluções. Elas falham porque exigem mudança total da noite pro dia.',
      en: 'Forget resolutions. They fail because they demand a total overnight identity shift.'
    }
  },
  step5: {
    title: { pt: 'AS 8 CAIXAS', en: 'THE 8 BOXES' },
    subtitle: { pt: 'Seu inventário de vida', en: 'Your life inventory' },
    quote: {
      pt: 'Para ser a versão A+ de si mesmo, precisa saber exatamente pelo que está trabalhando.',
      en: 'To be the A+ version of yourself, you need to know exactly what you\'re working toward.'
    }
  },
  step6: {
    title: { pt: 'SEU COCKPIT', en: 'YOUR COCKPIT' },
    subtitle: { pt: 'Visão da semana + Roteiro da noite', en: 'Week at a Glance + Evening Script' },
    quote: {
      pt: 'O dia começa na noite anterior. A competição é boa demais pra acordar improvisando.',
      en: 'The day starts the night before. The competition is too good to wake up and wing it.'
    }
  },
  step7: {
    title: { pt: 'PRONTO PRA ATACAR 2026!', en: 'READY TO ATTACK 2026!' },
    cta: { pt: '🚀 Começar meu ano!', en: '🚀 Start my year!' },
    toast: {
      pt: 'No final do ano, pergunte-se: "Pelo que eu quero brindar?"',
      en: 'At the end of the year, ask yourself: "What do I want to toast to?"'
    }
  },
  skip: { pt: 'Pular tutorial', en: 'Skip tutorial' },
  back: { pt: '◀ Voltar', en: '◀ Back' },
  next: { pt: 'Próximo ▶', en: 'Next ▶' }
};
```

---

## Resumo

Tutorial de 8 steps com overlay + spotlight nos elementos do app. Ensina Get Light → Misogi → Kevin's Rule → Winning Habits → 8 Boxes → Sidebar/Evening Script. Tom motivacional com frases do Itzler. Checklist interativo no step "Get Light". Confetti no final. Salva no localStorage. Botão "?" no header pra rever. Bottom sheet no iPhone. Totalmente bilíngue PT-BR/EN.
