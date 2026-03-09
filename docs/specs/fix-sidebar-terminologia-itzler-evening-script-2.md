# FIX — Renomear Sidebar com Terminologia do Itzler + Evening Script

## O Problema

A sidebar atualmente tem "DON'T FORGET" e "TASKS" — nomes genéricos. Precisamos usar os termos reais do Jesse Itzler e adicionar o conceito de "Evening Script" que é central ao método dele.

---

## Nova Estrutura da Sidebar

A sidebar tem **3 seções** (não mais 2), com nomes e ícones atualizados:

```
┌──────────────────────────────┐
│                              │
│  👁️ WEEK AT A GLANCE  ⓘ     │
│  ─────────────────────────   │
│                              │
│  📌 DON'T FORGET  ⓘ         │
│  ─────────────────────────   │
│  (lembretes / notas soltas)  │
│                              │
│  📋 EVENING SCRIPT  ⓘ       │
│  ─────────────────────────   │
│  (roteiro do dia seguinte)   │
│                              │
│  ☑️ TASKS                    │
│  ─────────────────────────   │
│  (tarefas com checkbox)      │
│                              │
│  ┌──────────────────────┐    │
│  │ Write a note...      │    │
│  └──────────────────────┘    │
│  [📌 Reminder] [📋 Script]   │
│  [☑️ Task]                    │
│                              │
└──────────────────────────────┘
```

---

## Seção 1: 👁️ WEEK AT A GLANCE (Header da Sidebar)

**NÃO é uma lista de notas** — é o TÍTULO/CONCEITO da sidebar inteira na visão SEMANA. Funciona como header contextual que dá propósito ao painel.

### Quando aparece:
- **Visão SEMANA:** Header mostra "WEEK AT A GLANCE" com o range da semana (ex: "15/2 — 21/2")
- **Visão MÊS:** Header mostra o nome do mês (ex: "FEVEREIRO 2026")

### Layout do header da sidebar:
```
┌──────────────────────────────┐
│  👁️ WEEK AT A GLANCE  ⓘ     │
│  15 FEV — 21 FEV 2026       │
│  Semana 8 de 52              │
│                              │
│  "O que merece minha energia │
│   esta semana?"              │
│                              │
│  ─────────────────────────   │
```

A frase em itálico/opacidade reduzida serve como lembrete do propósito do ritual. Pode ser ocultada após o primeiro uso (toggle ou after first session).

### Tooltip ⓘ do Week at a Glance:
```
┌─────────────────────────────────────────┐
│  👁️ WEEK AT A GLANCE                    │
│                                         │
│  Ritual de domingo à noite do Jesse     │
│  Itzler. Olhe o calendário da semana    │
│  inteira e pergunte:                    │
│                                         │
│  "O que merece minha energia esta       │
│   semana e o que pode esperar?"         │
│                                         │
│  Use este painel para anotar            │
│  lembretes, montar o roteiro dos        │
│  próximos dias e organizar tarefas.     │
│  Arraste notas para os dias do          │
│  calendário quando estiverem prontas.   │
└─────────────────────────────────────────┘
```

---

## Seção 2: 📌 DON'T FORGET (Lembretes)

Mantém como está — notas livres, sem checkbox, estilo post-it mental. Coisas que você não quer esquecer mas que não têm dia definido ainda.

### Visual:
```
│  📌 DON'T FORGET  ⓘ                │
│  ────────────────────────────       │
│  ┌────────────────────────────┐     │
│  │ Ligar pro dentista       ≡ │     │
│  └────────────────────────────┘     │
│  ┌────────────────────────────┐     │
│  │ Comprar presente Katie   ≡ │     │
│  └────────────────────────────┘     │
│  No reminders (quando vazio)        │
```

- Cards com fundo amarelo claro e borda esquerda amarela
- Handle ≡ para drag & drop
- Arrastável para células do calendário

### Tooltip ⓘ do Don't Forget:
```
┌─────────────────────────────────────────┐
│  📌 DON'T FORGET                        │
│                                         │
│  Anote aqui tudo que não pode           │
│  esquecer — lembretes, ideias,          │
│  compromissos que ainda não têm         │
│  data definida.                         │
│                                         │
│  Quando decidir o dia, arraste a        │
│  nota para uma célula do calendário     │
│  e ela se transformará em uma           │
│  etiqueta com categoria e cor.          │
└─────────────────────────────────────────┘
```

---

## Seção 3: 📋 EVENING SCRIPT (NOVO — Roteiro da Noite)

Este é o conceito mais prático do Itzler: montar na noite anterior o roteiro do dia seguinte, hora por hora.

### Como funciona:

O Evening Script é uma **lista ordenada por horário** com blocos de atividade para o dia seguinte (ou para o dia atual se acessado de manhã).

### Visual:
```
│  📋 EVENING SCRIPT  ⓘ               │
│  Para: QUA 18 FEV           [◄] [►] │
│  ────────────────────────────        │
│  ┌──────────────────────────────┐    │
│  │ 06:30  Acordar + água       │    │
│  │ 07:00  Levar filhos escola  │    │
│  │ 08:00  Treino (corrida 5km) │    │
│  │ 09:30  Reunião equipe       │    │
│  │ 12:00  Almoço               │    │
│  │ 14:00  Foco: projeto X      │    │
│  │ 17:00  Buscar filhos        │    │
│  │ 18:00  Jantar família       │    │
│  │ 21:00  Leitura 30min        │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ 07:00  Escreva aqui...   [+]│    │
│  └──────────────────────────────┘    │
```

### Dados de um bloco do Evening Script:
```javascript
{
  id: "script_item_123",
  time: "07:00",           // horário (string HH:MM)
  text: "Levar filhos escola",
  date: "2026-02-18",      // para qual dia é este roteiro
  category: "kids",        // opcional — pode vincular a categoria
  done: false,             // checkbox para marcar como feito durante o dia
}
```

### Detalhes de interação:

**Criar item:**
- Campo com hora (input time HH:MM) + texto
- Botão [+] para adicionar
- Ao adicionar, o item é inserido na posição cronológica correta
- Enter no campo de texto também cria

**Editar:**
- Clicar no texto para editar inline
- Clicar na hora para ajustar

**Concluir:**
- Checkbox à esquerda de cada item (aparece ao hover ou sempre visível)
- Ao marcar: texto ganha opacidade 50% + riscado
- NÃO remove da lista — fica visível como feito

**Navegar dias:**
- Setas ◄ ► no header "Para: QUA 18 FEV"
- Por padrão mostra o PRÓXIMO dia (se é noite de terça, mostra quarta)
- Lógica: se hora atual > 17h, mostrar dia seguinte; senão mostrar dia atual
- Pode navegar para qualquer dia manualmente

**Reordenar:**
- Drag & drop via handle para reordenar manualmente (sobrescreve a ordem por horário)

### Persistência:
```javascript
// Estrutura no localStorage
{
  "eveningScript": {
    "2026-02-17": [
      { id: "s1", time: "06:30", text: "Acordar + água", done: true },
      { id: "s2", time: "07:00", text: "Levar filhos escola", done: true },
      { id: "s3", time: "08:00", text: "Treino corrida 5km", done: false, category: "health" },
      ...
    ],
    "2026-02-18": [
      { id: "s4", time: "07:00", text: "Reunião com cliente", done: false, category: "business" },
      ...
    ]
  }
}
```

### Tooltip ⓘ do Evening Script:
```
┌─────────────────────────────────────────┐
│  📋 EVENING SCRIPT                      │
│                                         │
│  "O dia começa na noite anterior."      │
│                                         │
│  Ritual diário de Jesse Itzler:         │
│  antes de dormir, monte o roteiro       │
│  completo do dia seguinte — hora por    │
│  hora. Saber exatamente o que vai       │
│  fazer evita "improvisar" e perder      │
│  energia com decisões.                  │
│                                         │
│  "The competition is too good to        │
│   wake up and wing it."                 │
│                                         │
│  Dica: comece com os blocos fixos       │
│  (filhos, treino, trabalho) e           │
│  preencha os espaços.                   │
└─────────────────────────────────────────┘
```

---

## Seção 4: ☑️ TASKS (Tarefas)

Mantém como está — lista com checkboxes, riscado ao concluir.

### Visual:
```
│  ☑️ TASKS                               │
│  ────────────────────────────           │
│  ┌────────────────────────────┐         │
│  │ □ Reservar restaurante   ≡ │         │
│  └────────────────────────────┘         │
│  ┌────────────────────────────┐         │
│  │ ☑ Pagar IPVA (riscado)   ≡ │         │
│  └────────────────────────────┘         │
│  No tasks (quando vazio)                │
```

---

## Input de Criação (rodapé da sidebar)

O input no rodapé agora tem **3 botões** para criar nos 3 tipos:

```
┌──────────────────────────────────┐
│  Write a note...             [⏎] │
└──────────────────────────────────┘
[📌 Reminder]  [📋 Script]  [☑️ Task]
```

- **📌 Reminder:** Cria em "Don't Forget"
- **📋 Script:** Cria no "Evening Script" (pede horário via input time que aparece)
- **☑️ Task:** Cria em "Tasks"

Quando clica em "📋 Script", um campo de horário aparece antes do campo de texto:
```
┌────────┐ ┌────────────────────────┐
│ 07:00  │ │ Escreva aqui...    [⏎] │
└────────┘ └────────────────────────┘
```

---

## Bilíngue PT-BR / EN

| Elemento | PT-BR | EN |
|----------|-------|----|
| Header semana | VISÃO DA SEMANA | WEEK AT A GLANCE |
| Header mês | (nome do mês) | (month name) |
| Pergunta | "O que merece minha energia esta semana?" | "What deserves my energy this week?" |
| Lembretes | NÃO ESQUEÇA | DON'T FORGET |
| Roteiro | ROTEIRO DA NOITE | EVENING SCRIPT |
| Tarefas | TAREFAS | TASKS |
| Placeholder | Escreva uma nota... | Write a note... |
| Botões | Lembrete / Roteiro / Tarefa | Reminder / Script / Task |
| Vazio lembretes | Sem lembretes | No reminders |
| Vazio tarefas | Sem tarefas | No tasks |
| Vazio roteiro | Monte seu roteiro para amanhã | Plan your script for tomorrow |
| Script "Para:" | Para: QUA 18 FEV | For: WED FEB 18 |

---

## Onde Cada Seção Aparece por Visão

| Seção | Visão SEMANA | Visão MÊS | Visão ANO/QUARTER |
|-------|-------------|-----------|-------------------|
| Week at a Glance (header) | ✅ Sim | ❌ Mostra nome do mês | ❌ Não tem sidebar |
| Don't Forget | ✅ Notas da semana | ✅ Notas do mês | ❌ |
| Evening Script | ✅ Roteiro do dia em foco | ✅ Roteiro do dia clicado | ❌ |
| Tasks | ✅ Tarefas da semana | ✅ Tarefas do mês | ❌ |

### Evening Script na visão SEMANA:
- Mostra o roteiro do **dia atual** (ou próximo, se >17h)
- Navegar entre dias com ◄ ► (limitado aos 7 dias da semana em foco)

### Evening Script na visão MÊS:
- Mostra o roteiro do **último dia clicado** no grid
- Se nenhum dia foi clicado, mostra dia atual
- Navegar entre dias com ◄ ►

---

## Visual Adaptado ao Tema

### Temas claros:
```css
.sidebar { background: #F8F9FA; }
.sidebar-header { color: var(--accent); }
.reminder-card { background: #FFF9C4; border-left: 3px solid #FDD835; }
.script-item { background: #E8F5E9; border-left: 3px solid #66BB6A; }
.script-item .time { color: #2E7D32; font-weight: 700; font-variant-numeric: tabular-nums; }
.task-card { background: #FFFFFF; border-left: 3px solid #E0E0E0; }
.task-card.done { opacity: 0.4; text-decoration: line-through; }
```

### Temas escuros:
```css
.sidebar { background: #1A1A1A; }
.sidebar-header { color: var(--accent); }
.reminder-card { background: #3A3520; border-left: 3px solid #FDD835; }
.script-item { background: #1B2E1B; border-left: 3px solid #66BB6A; }
.script-item .time { color: #81C784; }
.task-card { background: #2A2A2A; border-left: 3px solid #555; }
```

### OLED:
```css
.sidebar { background: #000000; }
.reminder-card { background: #1A1500; border-left: 3px solid #FDD835; }
.script-item { background: #001A00; border-left: 3px solid #66BB6A; }
.task-card { background: #0A0A0A; border-left: 3px solid #333; }
```

---

## Seções Collapsible

Cada seção pode ser colapsada/expandida clicando no título:

```
│  📌 DON'T FORGET  ⓘ  [▼]           │   ← expandido
│  ────────────────────────────       │
│  (conteúdo visível)                 │

│  📌 DON'T FORGET  ⓘ  [►]           │   ← colapsado  
│  ────────────────────────────       │
```

- Estado de colapso salvo no localStorage
- Animação: `max-height` transition 200ms
- Por padrão: todas expandidas
- No iPhone: apenas a seção mais relevante expandida (Evening Script)

---

## Drag & Drop Entre Seções da Sidebar

As 3 seções (Não Esqueça, Roteiro da Noite, Tarefas) formam um sistema fluido. O usuário pode **arrastar um item de uma seção para outra** e ele se transforma automaticamente no tipo de destino.

### Direção do arrasto:

```
                    ↑ arrastar pra CIMA
┌──────────────────────────────────────┐
│  📌 NÃO ESQUEÇA                     │  ← item vira lembrete (sem horário, sem checkbox)
│  ────────────────────────────────    │
│  ┌────────────────────────────┐      │
│  │ Comprar presente Katie   ≡ │      │
│  └────────────────────────────┘      │
├──────────────────────────────────────┤
│  📋 ROTEIRO DA NOITE                 │  ← item vira atividade (ganha horário)
│  ────────────────────────────────    │
│  ┌──────────────────────────────┐    │
│  │ □ 07:00  Levar filhos     ≡ │    │
│  │ □ 08:00  Treino           ≡ │    │
│  └──────────────────────────────┘    │
├──────────────────────────────────────┤
│  ☑️ TAREFAS                          │  ← item vira tarefa (ganha checkbox)
│  ────────────────────────────────    │
│  ┌────────────────────────────┐      │
│  │ □ Reservar restaurante   ≡ │      │
│  └────────────────────────────┘      │
└──────────────────────────────────────┘
                    ↓ arrastar pra BAIXO
```

### Transformações ao arrastar:

| De → Para | O que acontece |
|-----------|---------------|
| **Lembrete → Roteiro** | Pede horário (popup rápido ou assume próximo slot vazio). Texto vira atividade. |
| **Lembrete → Tarefa** | Texto vira tarefa com checkbox desmarcado. |
| **Roteiro → Lembrete** | Remove horário. Texto vira lembrete livre. |
| **Roteiro → Tarefa** | Remove horário. Texto vira tarefa com checkbox. |
| **Tarefa → Lembrete** | Remove checkbox. Texto vira lembrete livre. |
| **Tarefa → Roteiro** | Pede horário. Texto vira atividade com horário. |

### Popup de horário (quando destino é Roteiro):

Quando um item é solto na seção "Roteiro da Noite" e não tem horário, aparece um mini-popup inline:

```
┌──────────────────────────────┐
│ Horário para "Comprar..."?   │
│ ┌────────┐                   │
│ │ 09:00  │  [OK]  [Cancelar] │
│ └────────┘                   │
└──────────────────────────────┘
```

- Input time pré-preenchido com o próximo horário vazio (ex: se último item é 08:00, sugere 09:00)
- Enter confirma, Escape cancela (item volta ao lugar original)

### Visual durante o drag:

```css
/* Área de drop ativa — glow sutil ao arrastar sobre */
.sidebar-section.drop-target-active {
  background: rgba(var(--accent-rgb), 0.08);
  border: 2px dashed var(--accent);
  border-radius: 8px;
  transition: all 0.2s ease;
}

/* Item sendo arrastado */
.sidebar-item.dragging {
  opacity: 0.5;
  transform: scale(0.95);
}

/* Ghost do item durante arrasto */
.sidebar-item.drag-ghost {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transform: rotate(2deg);
}
```

### Também arrasta PARA o calendário:

Além de mover entre seções, qualquer item da sidebar pode ser arrastado para uma célula do calendário:

- **Lembrete → Calendário:** vira etiqueta (pede categoria no drop)
- **Roteiro → Calendário:** vira etiqueta no dia/horário correspondente
- **Tarefa → Calendário:** vira etiqueta (pede categoria no drop)

### Também arrasta DO calendário para a sidebar:

Uma etiqueta do calendário pode ser arrastada de volta para a sidebar:

- **Calendário → Lembrete:** "desagenda", vira lembrete (mantém texto)
- **Calendário → Roteiro:** "desagenda", vira atividade no roteiro do dia
- **Calendário → Tarefa:** "desagenda", vira tarefa

### JS do drag entre seções:

```javascript
function handleSidebarDrop(item, fromSection, toSection) {
  const text = item.text;
  
  // Remover do source
  removeFromSection(item.id, fromSection);
  
  // Transformar e adicionar ao destino
  switch(toSection) {
    case 'reminders':
      addReminder({ text, id: generateId() });
      break;
      
    case 'script':
      // Precisa de horário — mostrar popup
      showTimePrompt(text, (time) => {
        addScriptItem({ text, time, id: generateId(), done: false });
      });
      break;
      
    case 'tasks':
      addTask({ text, id: generateId(), done: false });
      break;
  }
  
  renderSidebar();
}
```

### Mobile (iPhone):

No iPhone não tem drag nativo fácil. Alternativa:

- **Long press** em um item abre menu contextual:
  ```
  ┌─────────────────────────┐
  │ Mover para:             │
  │ 📌 Não Esqueça          │
  │ 📋 Roteiro da Noite     │
  │ ☑️ Tarefas              │
  │ 📅 Agendar no calendário│
  │ 🗑️ Excluir              │
  └─────────────────────────┘
  ```

---

## Resumo

Renomear a sidebar usando terminologia real do Itzler. Header contextual "WEEK AT A GLANCE" na visão semanal (ritual de domingo). Seção "DON'T FORGET" para lembretes arrastáveis. Nova seção "EVENING SCRIPT" para montar roteiro hora-a-hora do dia seguinte (ritual diário). Seção "TASKS" para tarefas com checkbox. Tooltips ⓘ em cada seção explicando o conceito original do Itzler. 3 botões de criação no rodapé (Reminder/Script/Task). Bilíngue PT-BR/EN. Seções collapsible. Adaptado aos temas claro/escuro/OLED.
