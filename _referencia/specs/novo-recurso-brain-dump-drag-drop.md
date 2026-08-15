# NOVO RECURSO — Brain Dump Sidebar com Drag & Drop

## Conceito

Na visão MÊS (e opcionalmente SEMANA), adicionar uma **sidebar à direita** com duas áreas de anotação rápida — inspirada no planner físico do Jesse Itzler que tem "Don't Forget" e "To-Do" ao lado do mês. 

A diferença digital: as notas podem ser **arrastadas da sidebar para um dia do calendário**, transformando-se automaticamente em etiquetas. É uma staging area / brain dump onde você joga ideias soltas e depois organiza no calendário.

---

## Layout da Sidebar

A sidebar fica à direita do grid mensal/semanal, com largura fixa (~280px desktop, ~320px TV).

```
┌─────────────────────────────────┬──────────────────┐
│                                 │  📌 NÃO ESQUEÇA  │
│                                 │  ┌──────────────┐ │
│                                 │  │ Treino de     │ │
│        GRID DO MÊS              │  │ basquete seg ≡│ │
│        (7 colunas)              │  │              │ │
│                                 │  │ Ligar pro     │ │
│                                 │  │ dentista    ≡│ │
│                                 │  └──────────────┘ │
│                                 │                    │
│                                 │  ☑️ TAREFAS       │
│                                 │  ┌──────────────┐ │
│                                 │  │ □ Comprar     │ │
│                                 │  │   presente   ≡│ │
│                                 │  │ □ Reservar    │ │
│                                 │  │   restaurante≡│ │
│                                 │  │ ☑ Pagar IPVA │ │
│                                 │  └──────────────┘ │
│                                 │                    │
│                                 │  [+ Nota rápida]   │
└─────────────────────────────────┴──────────────────┘
```

---

## Duas Seções

### 1. 📌 NÃO ESQUEÇA (Don't Forget)
- Notas livres, texto curto (estilo post-it mental)
- Fundo amarelo claro (#FFF9C4) com borda esquerda amarela (#FDD835)
- Sem checkbox — são lembretes, não tarefas
- Cada nota é um card arrastável (drag handle ≡ no lado direito)

### 2. ☑️ TAREFAS (To-Do)
- Lista com checkboxes
- Fundo branco com borda esquerda cinza (#E0E0E0)
- Ao marcar como concluída: texto riscado + opacidade 50%
- Cada tarefa é um card arrastável

---

## Criação de Notas

### Input rápido no rodapé da sidebar
```
┌──────────────────────────────┐
│ + Escreva uma nota...    [⏎] │
└──────────────────────────────┘
[📌 Lembrete]  [☑️ Tarefa]
```

- Campo de texto + Enter para criar
- Dois botões abaixo: cria como "Não Esqueça" ou como "Tarefa"
- Se não escolher, default = Tarefa
- A nota aparece instantaneamente na seção correspondente

### Dados de uma nota:
```javascript
{
  id: "note_1708123456",
  text: "Comprar presente da Katie",
  type: "reminder" | "todo",       // reminder = Não Esqueça, todo = Tarefa
  done: false,                      // só para type: "todo"
  month: "2026-02",                 // nota pertence a este mês
  category: null,                   // null até ser arrastada pro calendário
  createdAt: "2026-02-17T03:50:00"
}
```

---

## Drag & Drop — Da Sidebar para o Calendário

### Como funciona:

1. **Usuário pega uma nota** na sidebar (clica e segura no handle ≡, ou long-press no mobile)
2. **Arrasta sobre o grid** do mês — as células do calendário ficam com highlight (borda azul pontilhada) ao passar por cima
3. **Solta numa célula** (um dia específico) — aparece um mini-modal rápido:

```
┌───────────────────────────────┐
│ "Comprar presente da Katie"   │
│                               │
│ Categoria:  [💑 Casamento ▼]  │
│ Dia: 22 FEV 2026             │
│                               │
│    [Cancelar]    [Criar]      │
└───────────────────────────────┘
```

4. **Ao confirmar**: a nota vira uma etiqueta completa no calendário (com cor da categoria) e é **removida da sidebar**
5. **Se cancelar**: a nota volta pra sidebar na posição original

### Detalhes do drag:

```javascript
// Drag visual
- Nota sendo arrastada: opacidade 70%, sombra elevada, escala 1.05
- Ghost (cópia visual): segue o cursor com offset
- Drop zone (célula do calendário): borda 2px dashed var(--accent) ao hover
- Drop inválido (fora do grid): nota volta animada (snap back)

// Conversão nota → etiqueta
function noteToLabel(note, targetDate, category) {
  return {
    id: 'evt_' + Date.now(),
    startDate: targetDate,        // ex: "2026-02-22"
    endDate: targetDate,          // mesmo dia (single day)
    text: note.text,
    color: CATEGORIES.find(c => c.id === category).color,
    category: category,
    type: 'normal',
  };
}
```

### Drag & Drop no mobile (iPhone):
- **Long press** (500ms) na nota ativa o modo drag
- Feedback háptico (vibração) ao ativar o drag
- A nota "descola" e segue o dedo
- Soltar sobre uma célula → mesmo mini-modal de confirmação
- Alternativa sem drag: **Swipe right** na nota → menu com "Agendar" que abre um date picker

---

## Drag & Drop — Entre dias do calendário

Além de sidebar → calendário, permitir **arrastar etiquetas entre dias** dentro do grid:

1. Long press numa etiqueta existente no calendário (300ms)
2. A etiqueta "descola" e segue o cursor/dedo
3. Soltar em outro dia = mover a etiqueta para aquela data
4. Soltar na sidebar = "desagendar" — volta a ser nota no brain dump

---

## Notas por Mês

Cada mês tem suas próprias notas de brain dump. Ao navegar entre meses (◄ FEV ► → ◄ MAR ►), as notas mudam para as do mês correspondente.

Notas não agendadas de meses anteriores podem ter um indicador: "3 notas pendentes de JAN" com link para importá-las para o mês atual.

```javascript
// Estrutura no localStorage
{
  "brainDump": {
    "2026-01": [{ id: "note_1", text: "...", type: "todo", done: false }, ...],
    "2026-02": [{ id: "note_2", text: "...", type: "reminder" }, ...],
    ...
  }
}
```

---

## Visual da Sidebar por Tema

A sidebar se adapta ao tema UI ativo:

**Temas claros (Classic, Warm, etc.):**
- Fundo sidebar: #F8F9FA
- Cards "Não Esqueça": fundo #FFF9C4, borda esquerda #FDD835
- Cards "Tarefa": fundo #FFFFFF, borda esquerda #E0E0E0
- Tarefa concluída: texto riscado, opacidade 0.4

**Temas escuros (Dark, OLED, Charcoal):**
- Fundo sidebar: #1A1A1A (ou #000 no OLED)
- Cards "Não Esqueça": fundo #3A3520, borda esquerda #FDD835
- Cards "Tarefa": fundo #2A2A2A, borda esquerda #555
- Textos: #E0E0E0

---

## Responsividade da Sidebar

### TV OLED 48"
- Sidebar visível por padrão à direita (~320px)
- Cards grandes, texto 16px
- Drag & drop com mouse

### MacBook Pro / Air
- Sidebar como drawer: botão "📝" no canto para abrir/fechar
- Largura ~280px, slide-in da direita
- Overlay semi-transparente quando aberta (não empurra o grid)

### Monitor 27" Vertical
- Sidebar vai para BAIXO do grid do mês (não ao lado — não cabe)
- Full-width, cards em 2 colunas lado a lado
- Sticky no bottom com scroll independente

### iPhone
- Sidebar como **bottom sheet** (swipe up)
- Botão flutuante "📝" no canto inferior esquerdo para abrir
- Cards em lista vertical full-width
- Drag & drop via long press + arrastar, ou swipe right → "Agendar"
- Altura do bottom sheet: 60% da tela, arrastável para 90%

---

## Integração com as Visões

### Visão MÊS ✅ (Sidebar principal)
- Sidebar completa com as duas seções
- Drag & drop para qualquer célula do grid mensal

### Visão SEMANA ✅ (Sidebar adaptada)
- Mesma sidebar, mas mostrando notas da semana em foco
- Drag & drop para qualquer coluna de dia da semana
- Útil para planejar a semana no domingo à noite (Sunday Night Review do Itzler!)

### Visão ANO ❌ (Sem sidebar)
- Células muito pequenas para drag & drop preciso
- Notas são criadas/gerenciadas nas visões MÊS e SEMANA

---

## Resumo

Sidebar "Brain Dump" à direita do grid mensal com duas seções: 📌 Não Esqueça (lembretes) e ☑️ Tarefas (to-do com checkbox). Notas podem ser arrastadas da sidebar para um dia do calendário, convertendo-se em etiquetas com categoria. Também permite arrastar etiquetas entre dias e desagendar arrastando de volta para a sidebar. Notas são organizadas por mês, adaptam ao tema UI ativo, e funcionam nos 5 dispositivos (bottom sheet no iPhone, drawer no MacBook, visível na TV, abaixo do grid no monitor vertical). Conecta com o Sunday Night Review do Itzler — planejar a semana arrastando notas para os dias.
