# AJUSTE — Cores Automáticas por Categoria (8 Caixas)

## Mudança de Comportamento

**ANTES:** O usuário escolhe uma cor E uma categoria separadamente no modal de Nova Etiqueta.

**DEPOIS:** O usuário escolhe APENAS a categoria. A cor é atribuída AUTOMATICAMENTE. O seletor de cores individuais é REMOVIDO do modal de criação de etiqueta.

## Mapeamento Definitivo — Categoria → Cor

```javascript
const CATEGORIES = [
  { id: 'adventure',  emoji: '🏔️', namePt: 'Aventura',           nameEn: 'Adventure',        color: '#0094D6' },  // Azul
  { id: 'marriage',   emoji: '💑', namePt: 'Casamento',           nameEn: 'Marriage',          color: '#EC407A' },  // Rosa
  { id: 'health',     emoji: '💪', namePt: 'Saúde & Fitness',     nameEn: 'Health & Fitness',  color: '#7CB342' },  // Verde Lima
  { id: 'kids',       emoji: '👶', namePt: 'Filhos',              nameEn: 'Kids',              color: '#9791F1' },  // Roxo Tropical Indigo
  { id: 'business',   emoji: '💼', namePt: 'Negócios',            nameEn: 'Business',          color: '#FF612E' },  // Laranja
  { id: 'personal',   emoji: '🧘', namePt: 'Pessoal',             nameEn: 'Personal',          color: '#FDD835' },  // Amarelo
  { id: 'family',     emoji: '👨‍👩‍👧‍👦', namePt: 'Família',    nameEn: 'Family',            color: '#E53935' },  // Vermelho
  { id: 'finance',    emoji: '💰', namePt: 'Finanças Pessoais',   nameEn: 'Personal Finance',  color: '#00BCD4' },  // Teal/Turquesa
];
```

## Referência Visual de Cores

| Categoria | Cor | Hex | Texto sobre a cor |
|-----------|-----|-----|-------------------|
| 🏔️ Aventura | 🟦 Azul | `#0094D6` | Branco |
| 💑 Casamento | 🩷 Rosa | `#EC407A` | Branco |
| 💪 Saúde & Fitness | 🟩 Verde Lima | `#7CB342` | Branco |
| 👶 Filhos | 🟪 Roxo Tropical Indigo | `#9791F1` | **Preto** (cor clara) |
| 💼 Negócios | 🟧 Laranja | `#FF612E` | Branco |
| 🧘 Pessoal | 🟨 Amarelo | `#FDD835` | **Preto** (cor clara) |
| 👨‍👩‍👧‍👦 Família | 🟥 Vermelho | `#E53935` | Branco |
| 💰 Finanças | 🩵 Teal | `#00BCD4` | Branco |

**Regra de contraste do texto:** Usar branco (`#FFFFFF`) sobre todas as cores EXCETO amarelo (`#FDD835`) e roxo Tropical Indigo (`#9791F1`), que usam preto (`#212121`).

Função para determinar automaticamente:
```javascript
function getTextColor(bgHex) {
  const r = parseInt(bgHex.slice(1,3), 16);
  const g = parseInt(bgHex.slice(3,5), 16);
  const b = parseInt(bgHex.slice(5,7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#212121' : '#FFFFFF';
}
```

## Novo Modal de "Nova Etiqueta"

O modal simplificado deve ter esta estrutura (de cima para baixo):

```
┌──────────────────────────────────────┐
│  Nova Etiqueta                    ✕  │
├──────────────────────────────────────┤
│                                      │
│  TEXTO                               │
│  ┌──────────────────────────────┐    │
│  │ Até 40 caracteres            │    │
│  └──────────────────────────────┘    │
│                                      │
│  CATEGORIA                           │
│  ┌──────────────────────────────┐    │
│  │ 🏔️ Aventura        ■ Azul   │    │
│  │ 💑 Casamento        ■ Rosa   │    │
│  │ 💪 Saúde & Fitness  ■ Verde  │    │
│  │ 👶 Filhos           ■ Roxo   │    │
│  │ 💼 Negócios         ■ Laranja│    │
│  │ 🧘 Pessoal          ■ Amarelo│    │
│  │ 👨‍👩‍👧‍👦 Família          ■ Verm. │    │
│  │ 💰 Finanças Pessoais■ Teal   │    │
│  └──────────────────────────────┘    │
│                                      │
│  PERÍODO                             │
│  De: [17/02/2026]  Até: [17/02/2026]│
│                                      │
│         [ Salvar Etiqueta ]          │
│                                      │
└──────────────────────────────────────┘
```

### Detalhes do seletor de categoria:
- Lista vertical com 8 opções
- Cada opção mostra: emoji + nome + quadrado colorido da cor associada
- Ao selecionar uma categoria, o item fica com fundo da cor da categoria (opacidade 15%) e borda esquerda de 4px na cor sólida
- Apenas 1 categoria pode ser selecionada por vez (radio behavior)
- Categoria é **obrigatória** — não pode salvar sem escolher

### O que REMOVER do modal atual:
- ❌ Remover o seletor de cores (os círculos coloridos)
- ❌ Remover qualquer campo de "cor" separado
- A cor agora vem EXCLUSIVAMENTE da categoria selecionada

## Impacto nas Outras Partes do App

### Visão ANO — Células com etiquetas
- A etiqueta dentro da célula usa a cor da categoria como fundo
- Texto em branco ou preto conforme a função `getTextColor`
- Formato: retângulo arredondado (border-radius: 3px) dentro da célula

### Visão MÊS — Etiquetas como barras
- Barras horizontais na cor da categoria
- Eventos multi-dia se estendem pelas células (estilo Google Calendar)

### Visão SEMANA — Blocos de cor
- Blocos coloridos dentro de cada coluna do dia

### Dashboard — As 8 Caixas
- Cada categoria no painel lateral mostra o quadrado de cor correspondente
- Contagem de eventos e dias ao lado
- A legenda visual fica autoexplicativa: cor = categoria

### Seletor de cores no header (os círculos no topo do calendário)
- **REPURPOSE**: os círculos de cor no topo agora servem como **FILTRO de visualização**
- Atualizar para exibir as 8 cores das categorias nesta ordem:

```
■ #0094D6  ■ #EC407A  ■ #7CB342  ■ #9791F1  ■ #FF612E  ■ #FDD835  ■ #E53935  ■ #00BCD4    [EN] [⊞]
Aventura   Casamento  Saúde     Filhos     Negócios   Pessoal    Família    Finanças
```

- Clicar num círculo filtra o calendário para mostrar apenas etiquetas daquela categoria
- Clicar novamente remove o filtro (toggle on/off)
- Múltiplos filtros podem ser ativados simultaneamente
- Círculo com borda grossa (3px branca + 2px da cor) = filtro ativo
- Tooltip no hover: "Filtrar: Aventura", "Filtrar: Negócios", etc.

## Migração de Dados

Se já existem etiquetas salvas no localStorage com cor manual (sem categoria ou com cor diferente da nova), aplicar migração automática ao carregar:

```javascript
function migrateLabels(labels) {
  const colorToCategory = {
    '#F4A261': 'adventure',
    '#E76F51': 'business',
    '#2A9D8F': 'finance',
    '#E53935': 'family',
    '#EC407A': 'marriage',
    '#7CB342': 'health',
    '#FDD835': 'personal',
    '#8E24AA': 'kids',
    '#9791F1': 'kids',
    '#0094D6': 'adventure',
    '#FF612E': 'business',
    '#00BCD4': 'finance',
  };

  return labels.map(label => {
    if (!label.category) {
      label.category = colorToCategory[label.color] || 'personal';
    }
    const cat = CATEGORIES.find(c => c.id === label.category);
    if (cat) label.color = cat.color;
    return label;
  });
}
```

## Resumo

Remover o seletor de cores manual do modal de etiqueta. Cada etiqueta recebe automaticamente a cor da categoria selecionada. As 8 cores fixas são: Azul (#0094D6) para Aventura, Rosa (#EC407A) para Casamento, Verde Lima (#7CB342) para Saúde, Roxo Tropical Indigo (#9791F1) para Filhos, Laranja (#FF612E) para Negócios, Amarelo (#FDD835) para Pessoal, Vermelho (#E53935) para Família, Teal (#00BCD4) para Finanças. Os círculos de cor no header viram filtros de visualização por categoria. Texto sobre etiquetas é branco exceto sobre amarelo e roxo Tropical Indigo que usam preto.
