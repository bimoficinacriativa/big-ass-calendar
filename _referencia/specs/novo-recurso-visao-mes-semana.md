# NOVO RECURSO — Visão MÊS e Visão SEMANA (Estilo Planner Itzler)

## Contexto

O app já tem os botões ANO, Q1, Q2, Q3, Q4, MÊS e SEMANA no topo. Atualmente o MÊS e SEMANA apenas filtram o grid horizontal de 31 colunas. Isso precisa mudar. Cada modo deve ter seu PRÓPRIO LAYOUT, inspirado no planner físico "Big A## Calendar Planner 2026" de Jesse Itzler.

Os 3 modos de visualização são:

1. **ANO** (já existe) — Grid 12 linhas × 31 colunas, calendário de parede.
2. **MÊS** (NOVO layout) — Grid tradicional de calendário mensal, 7 colunas (Dom-Sáb), como uma página do planner.
3. **SEMANA** (NOVO layout) — 7 dias expandidos horizontalmente, com bastante espaço para notas.

Q1/Q2/Q3/Q4 continuam filtrando a visão ANO (mostrando 3 meses por vez).

---

## VISÃO MÊS — Layout Detalhado

Inspirado na página mensal do planner (veja imagem de referência do January 2026 do planner).

### Estrutura

```
┌─────────────────────────────────────────────────────────────────────┐
│  ◄  FEVEREIRO 2026  ►                          [ANO] [MÊS] [SEMANA]│
├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
│ DOMINGO  │ SEGUNDA  │  TERÇA   │ QUARTA   │ QUINTA   │  SEXTA   │ SÁBADO   │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ 1        │ 2        │ 3        │ 4        │ 5        │ 6        │ 7        │
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ 8        │ 9        │ 10       │ 11       │ 12       │ 13       │ 14       │
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ 15       │ 16       │ 17 ←HOJE │ 18       │ 19       │ 20       │ 21       │
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ 22       │ 23       │ 24       │ 25       │ 26       │ 27       │ 28       │
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

### Detalhes do Design

**Header do Mês:**
- Nome do mês em MAIÚSCULAS + ano: "FEVEREIRO 2026"
- Setas ◄ ► para navegar entre meses
- Fonte: mesma do título do calendário (Barlow Condensed Bold ou similar), azul (#1565C0)
- Frase motivacional sutil no centro do header (como no planner original: "Welcome to the start of something incredible!" / em PT: "Bem-vindo ao começo de algo incrível!")

**Colunas — Dias da Semana:**
- 7 colunas de largura igual
- Header de cada coluna: nome COMPLETO do dia da semana em maiúsculas
  - PT: DOMINGO, SEGUNDA, TERÇA, QUARTA, QUINTA, SEXTA, SÁBADO
  - EN: SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
- Fonte do header: bold, tamanho médio, azul
- Colunas de SÁBADO e DOMINGO com fundo azul claro sutil (como na visão ANO)

**Células do Grid:**
- Número do dia no canto superior esquerdo, bold
- Células GRANDES — cada célula ocupa no mínimo 100px de altura (mais em telas grandes)
- Na TV OLED 48": as células devem ser enormes, como o planner físico
- Se o mês começa numa quarta (como ABR 2026), as células antes de dia 1 ficam vazias/cinza claro
- Se o mês termina antes de sábado, as células depois do último dia ficam vazias

**Interação:**
- Clicar numa célula abre o mesmo modal de criar etiqueta da visão ANO
- Etiquetas já criadas na visão ANO aparecem aqui também (dados compartilhados)
- Etiquetas de múltiplos dias aparecem como barras que se estendem pelas células (estilo Google Calendar)
- Hover mostra tooltip com detalhes da etiqueta

**Sidebar de Notas (opcional, lado direito):**
- Inspirado no planner: área lateral com "Don't Forget" (Não Esqueça) e "To-Do" (Tarefas)
- Campo de texto livre onde o usuário pode anotar lembretes do mês
- Dados salvos em localStorage por mês
- Em mobile: acessível por botão, abre como bottom sheet
- Na TV: visível por padrão se houver espaço, senão escondido

---

## VISÃO SEMANA — Layout Detalhado

A semana é mostrada HORIZONTALMENTE (landscape), com 7 colunas expandidas ocupando toda a largura da tela. Cada dia tem muito espaço vertical para conteúdo.

### Estrutura

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  ◄  15/2 — 21/2  ►   SEMANA 8 de 52                    [ANO] [MÊS] [SEMANA]    │
├────────────┬────────────┬────────────┬────────────┬────────────┬────────────┬────────────┤
│  DOM 15    │  SEG 16    │  TER 17    │  QUA 18    │  QUI 19    │  SEX 20    │  SÁB 21   │
│            │            │  ← HOJE    │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
│            │            │            │            │            │            │            │
└────────────┴────────────┴────────────┴────────────┴────────────┴────────────┴────────────┘
```

### Detalhes do Design

**Header da Semana:**
- Range de datas: "15/2 — 21/2" (formato dia/mês em PT)
- Indicador "SEMANA 8 de 52" (número ISO da semana)
- Setas ◄ ► para navegar entre semanas
- Se a semana cruza dois meses, mostrar: "27/2 — 5/3"

**Colunas — 7 Dias:**
- 7 colunas de largura igual, TODA a largura da viewport
- Header de cada coluna: abreviação 3 letras + número do dia
  - PT: "DOM 15", "SEG 16", "TER 17", etc.
  - EN: "SUN 15", "MON 16", "TUE 17", etc.
- A coluna do dia atual (HOJE) tem borda vermelha/laranja destacada
- Colunas de SÁB e DOM com fundo azul claro sutil

**Células:**
- Altura: TODA a viewport disponível abaixo do header (min-height: calc(100vh - 120px))
- Cada célula é uma área enorme para conteúdo
- Etiquetas aparecem como blocos coloridos dentro da célula
- O usuário pode clicar para adicionar etiquetas (mesmo modal)
- Espaço para escrever/adicionar múltiplas notas por dia

**Comportamento da Semana:**
- A semana começa no DOMINGO (padrão brasileiro, ajustável para segunda no futuro)
- Ao abrir a visão SEMANA, vai automaticamente para a semana atual
- Ao trocar de ANO → SEMANA, mantém o contexto (se estava vendo março, abre a primeira semana de março)

---

## Transição Entre Visões

### Comportamento ao Trocar

| De → Para | O que acontece |
|-----------|----------------|
| ANO → MÊS | Abre o mês atual (ou o mês que estava em foco se usando Q1-Q4) |
| ANO → SEMANA | Abre a semana atual |
| MÊS → ANO | Volta pro grid 365, scrollado no mês que estava sendo visto |
| MÊS → SEMANA | Abre a primeira semana do mês que estava sendo visto |
| SEMANA → MÊS | Abre o mês da semana que estava sendo vista |
| SEMANA → ANO | Volta pro grid 365 |

### Animação de Transição
- Crossfade suave (300ms ease) entre visões
- Não recarregar página — trocar visibilidade de containers via CSS/JS

### Botões de Navegação
- ANO, MÊS, SEMANA como toggle group (apenas 1 ativo por vez)
- Q1, Q2, Q3, Q4 só aparecem quando ANO está ativo
- ◄ ► aparecem quando MÊS ou SEMANA estão ativos
- Botão ativo com fundo preenchido azul, texto branco (como já está no design atual)

---

## Dados Compartilhados

TODAS as visões leem e escrevem no MESMO localStorage. Uma etiqueta criada na visão ANO aparece na visão MÊS e na visão SEMANA, e vice-versa. O modelo de dados já deve estar baseado em datas (ano-mês-dia), não em posição de grid.

Estrutura de dados sugerida para uma etiqueta:
```javascript
{
  id: "evt_1708123456",
  startDate: "2026-03-15",    // YYYY-MM-DD
  endDate: "2026-03-18",      // para eventos multi-dia
  text: "Viagem Família",
  color: "#FF5722",           // cor da etiqueta
  category: "family",         // uma das 8 caixas
  type: "normal"              // "normal", "misogi", "kevin", "push", "recovery"
}
```

---

## Responsividade por Dispositivo

### TV OLED 48" (Prioridade)
- **MÊS**: Grid de 7 colunas com células enormes (cada célula ~250px+ de altura). Sidebar de notas visível à direita.
- **SEMANA**: 7 colunas gigantes, cada dia ocupa praticamente a tela toda em altura. Perfeito para usar como "whiteboard" digital.

### MacBook
- **MÊS**: Grid padrão, cells ~120px altura. Sidebar como drawer.
- **SEMANA**: 7 colunas com scroll vertical se necessário.

### iPhone
- **MÊS Portrait**: Grid de 7 colunas comprimido, cells menores (~60px). Tap para expandir dia.
- **MÊS Landscape**: Grid confortável semelhante ao MacBook.
- **SEMANA Portrait**: Mostrar 1 dia por vez com swipe horizontal entre dias (como app de agenda nativo do iPhone).
- **SEMANA Landscape**: 7 colunas comprimidas ou scroll horizontal.

---

## Paleta Visual (manter consistência)

As visões MÊS e SEMANA usam EXATAMENTE a mesma paleta de cores e temas do grid ANO:
- Mesmo azul (#1565C0), mesmas bordas, mesmos fundos de fim de semana
- Temas (Blue, Neutral, Gray, Dark) se aplicam igualmente
- Etiquetas coloridas com as mesmas cores
- Dia atual com mesma borda vermelha/laranja

---

## Resumo

Implementar duas novas visões completas — MÊS (grid 7 colunas estilo planner mensal com sidebar de notas) e SEMANA (7 colunas expandidas horizontais estilo whiteboard) — que compartilham os mesmos dados de etiquetas com a visão ANO existente, mantendo a identidade visual do Big A## Calendar e funcionando perfeitamente nos 3 dispositivos (TV OLED, MacBook, iPhone). Navegação fluida entre as 3 visões com contexto preservado (mês/semana em foco).
