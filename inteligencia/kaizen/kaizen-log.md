# Kaizen Log — Big Ass Calendar

> Registro diario de aprendizados e melhorias.

---

## 2026-08-16 — Ciclo #8: Arrastar por toque (alca + trilho de dias)

**Pedido (Marcos):** "loop kaizen pra implementar toque e arraste no mobile" — fechar a limitacao do Ciclo #7 (DnD nativo nao dispara em toque).

**Estudei (painel de 4 abordagens + 3 juizes, workflow de 7 agentes):** long-press+ghost com auto-avanco na borda; long-press+barra de dias; **alca dedicada + trilho de dias**; e pega no horario com Pointer Events. Vencedora UNANIME nas 3 lentes (usabilidade no dedo, robustez tecnica, custo).

**Por que a alca venceu — argumento de spec, nao de gosto:** no iOS o `touch-action` e resolvido no INICIO do gesto. Long-press precisa cancelar a rolagem DEPOIS que o dedo ja encostou, apostando que o WebKit ainda nao "commitou" o gesto pro scroll — as 3 propostas com long-press classificaram isso como risco alto verificavel so em iPhone fisico. Com alca, `touch-action: none` fica confinado a 28px onde o gesto NASCE: a rolagem do resto da linha continua intacta. Conflito eliminado por construcao, nao negociado.

**Apliquei:**
- `.wv-entry-grip` (≡) como filho da linha, unico elemento com `touch-action: none` (28px em `pointer: coarse`, 14px no mouse)
- Motor com Pointer Events; sai cedo se `pointerType === 'mouse'` (DnD nativo intocado). Sem long-press: arrasta apos 4px de slop
- Todo trabalho por frame num `requestAnimationFrame` (fantasma, `elementFromPoint`, dwell, auto-scroll) — nao no handler de evento
- Fantasma montado A MAO: `cloneNode` copiaria o atributo `value`, nao a propriedade viva, e o cartao sairia com texto VAZIO
- **Trilho de dias** (`.wv-day-rail`): no carrossel os outros 6 dias sao clipados por `overflow:hidden` e `elementFromPoint` NUNCA os retorna — nao existe posicao de dedo que os alcance. 7 chips no rodape; pairar 220ms navega sem soltar o dedo; soltar no chip move mantendo o periodo
- `resolveDropSlot` extraido (read-only, nao cria dia vazio): mesma regra preve "periodo cheio" ANTES de soltar e executa o move
- Legenda flutuante diz onde vai cair ("QUI 20 · TARDE 14:00") porque o dedo tapa o alvo
- `wvEatNextClick()`: o toque emite um click sintetico ~300ms apos o drop que focaria um quick-add e subiria o teclado

**Revisao adversarial (24 agentes, 3 lentes): 17 confirmados / 4 refutados. Todos corrigidos:**
- ⚠️ **ALTA — trilho na semana que cruza 1º de janeiro:** os slides vem de `getWeekDays`, que DESCARTA dias fora do ano; o chip guardava o offset desde domingo. Na semana 28/12/2025–03/01/2026 sao 3 slides mas 7 chips: pairar no dia 1 chamava `swipeTo(4)` num track de 3 slides → tela em branco, e `swipeCurrentDay` ficava preso em 4 mesmo apos o re-render. Fix: indice resolvido por busca em `getWeekDays`, chip sem slide fica `disabled`
- **ALTA — auto-scroll congelado no scroller de ORIGEM:** `d.scroller` era capturado no pointerdown; apos o trilho navegar, rolava a lista do dia que saiu de tela (mesma geometria X). Fix: scroller derivado do `elementFromPoint` a cada frame — o que tambem impede rolar a lista quando o dedo esta sobre o trilho
- **ALTA — legenda e chip branco-no-branco no tema darkgray:** usavam `var(--title)` como FUNDO com `color:#fff`, e `--title` e `#FDFDFD` nos temas escuros. Fix: cores fixas (`#1F2933` e `#0094D6`)
- **MEDIA — flash vermelho de "cheio" morto:** o teardown limpava a classe no mesmo tick em que ela era acesa. Fix: teardown em 2 fases com `holdMs`, e a rejeicao tambem aparece ao soltar direto num chip
- **MEDIA:** teclado aberto tapava o trilho (fix: `blur()` ao levantar); legenda ignorava a safe-area do topo; velocidade do auto-scroll dobrava em telas de 120Hz (fix: px/segundo, nao px/frame); `min-height: 68px` em `pointer: coarse` vazava pro grid de 7 colunas do iPad (fix: escopado aos layouts empilhados); `transform` inline anulava o `scale` do CSS

**Validei no navegador:** alca com `touch-action: none` e linha com `auto`; fantasma com texto real; dwell navegando o carrossel; drop no periodo e no chip; cancelar no vazio; `pointercancel` limpando; mouse nao acionando o motor de toque; swipe bloqueado quando o gesto nasce na alca; periodo cheio avisando e NAO movendo; **semana 28/12–03/01 com chips corretos (-1/disabled para dias sem slide)**; desktop com DnD de mouse intacto.

**Limitacoes (proximo ciclo):**
- Nao testado em iPhone FISICO — o comportamento de `touch-action` e safe-area no Safari real e a unica coisa que o headless nao prova
- Modo DIA continua sem arrastar; so a semana

## 2026-08-16 — Ciclo #7: Periodos no mobile/vertical + arrastar entre dias

**Pedido (Marcos):** fechar as 2 limitacoes do Ciclo #6 — periodos no modo semana do iPhone e do monitor vertical, e arrastar item entre dias.

**Apliquei:**
- `buildWeekPeriods` anexado tambem em `renderWeekViewMobile` (slides de swipe) e `renderWeekViewStacked` (monitor vertical); click handlers de etiqueta ganharam guarda `closest('.wv-periods')`
- Drag and drop nativo: `.wv-entry` draggable carregando `{date,key}` em `application/x-week-entry`; cada `.wv-period` e drop zone. `moveEntryToDayPeriod` mantem a hora quando ela cabe no periodo destino e esta livre, senao usa a ancora. Preserva feito e categoria
- Editor do horario virou **dia + hora** (`<select>` dos 7 dias + `input type=time`): e assim que se move uma entry em tela de toque, onde DnD nativo nao existe. Commit em `focusout` que ignora foco interno ao editor
- `moveWeekEntry` ganhou `toDate`; `pruneTimeboxingDay` extraido e usado nos moves
- CSS: feedback de drop, alvos de toque maiores (linha ~39px, toggle 20px, texto 16px) nos layouts mobile/vertical

**Bug PRE-EXISTENTE encontrado e corrigido:** o carrossel do mobile fazia `translateX(-idx * 100%)` numa faixa de `width: 700%`, deslocando 7 dias por swipe. So o indice 0 funcionava — qualquer outro dia mostrava tela em branco. Virou `-idx * (100/7)%`. Confirmado no `git show HEAD:app.js` que era anterior ao meu diff.

**Revisao adversarial (workflow 21 agentes, 3 lentes + refutacao): 11 confirmados, 7 refutados. Todos corrigidos:**
- ⚠️ **ALTA — duplicacao de entry:** o picker de categoria nao fecha em re-render e o drag nao gera `click` (que e o unico fechamento automatico). Abrir o picker numa entry, arrasta-la pra outro dia e entao escolher a categoria fazia o handler delegado gravar via no DESTACADO, recriando o dia de origem: a mesma entry passava a existir nos 2 dias. Fix: `closeDayCategoryPicker()` no inicio de `renderWeekView` + guarda `document.contains(activeDayCatCell.cell)` no handler
- **ALTA — posicao da view perdida:** `refreshWeekColumnPeriods` so procurava `.wv-column`, que nao existe nos layouts novos; toda edicao caia no rebuild total que a funcao existe pra evitar, e o carrossel voltava pro dia de hoje. Fix: seletor `.wv-column, .wv-swipe-slide, .wv-stacked-row` + `swipeRenderedWeek` preserva o slide entre re-renders da mesma semana + scroll preservado no vertical
- **ALTA — listeners de swipe acumulando:** `#weekViewContent` sobrevive aos re-renders, entao cada render empilhava um par touchstart/touchend; depois do fix do translateX um swipe pularia N dias. Fix: bind unico via `dataset.swipeBound`
- **BAIXA:** `weekDayOptions` oferecia dias fora do YEAR que os renderers mobile/vertical nao desenham (entry sumia); `.dragging` aplicada sincronamente desbotava o proprio ghost do drag

**Validei no navegador:** duplicata some (state com 1 entry, dia de origem removido), swipe avanca exatamente 1 dia apos 4 re-renders, slide preservado em quick-add e edicao, scroll do vertical preservado, 7 slides alinhados ao pixel, 21 periodos nos 3 layouts, sync com o modo DIA.

**Limitacoes (proximo ciclo):**
- Arrastar so com mouse — navegador nao dispara DnD nativo em toque; no celular o caminho e o editor dia+hora
- Modo DIA nao tem arrastar nem editor de dia; so a semana

## 2026-08-15 — Ciclo #5: Modo SEMANA com periodos manha/tarde/noite

**Pedido (Marcos):** modo SEMANA precisava de estrutura de manha/tarde/noite como o modo DIA, para organizar a semana de gravacoes.

**Diagnostiquei:**
- Week view desktop (`renderWeekView`) renderizava so 7 colunas com etiquetas — sem nenhuma estrutura de tempo
- Modo DIA ja tinha grade 05h–23h em `state.timeboxing[date].schedule` com chaves `hora_meia` (`5_00`, `5_30`, ...)
- Bug latente: `reloadFromState` (sync Firebase) chamava `renderWeekView()` sem argumento → `new Date(undefined)` → colunas NaN

**Apliquei:**
- 3 secoes por coluna no modo SEMANA: MANHA (05–12h), TARDE (12–18h), NOITE (18–24h), lendo/escrevendo no MESMO `timeboxing` do modo DIA — fonte unica, sem estrutura de dados nova
- Quick-add por periodo: Enter/blur grava no primeiro slot de meia hora livre do periodo; item mostra hora, toggle de concluido (risco), dot de categoria reutilizando `openDayCategoryPicker` (mesmas classes `day-cell-input`/`day-cat-dot`)
- Periodo atual do dia de hoje ganha classe `.now` (borda superior laranja)
- Clique no cabecalho do dia (DOM 9, SEG 10...) abre o modal de etiqueta — o corpo da coluna agora e ocupado pelos periodos, que fazem stopPropagation
- Fix do `renderWeekView()` sem argumento: fallback para `zoomWeekStart || semana atual`
- i18n: `wvMorning/wvAfternoon/wvEvening/wvAddPh` em pt-br e en
- `sw.js` v7 → v8 (app.js + style.css mudaram)

**Validei (headless Chrome isolado, file://):**
- 7 colunas × 3 periodos renderizando; quick-add grava em `5_00`, `5_30`, `12_00`, `18_00`
- Persistencia via BACSync local cache sobrevive reload
- Modo DIA de 11/8 mostra exatamente os itens criados na semana (categoria e done inclusos)
- Picker de categoria funciona a partir da semana; texto vazio + blur remove o item (categoria sozinha persiste, igual ao dia)

**Revisao adversarial (workflow 17 agentes, 3 lentes + refutacao por finding) — 14 confirmados, 10 corrigidos:**
- Overflow de periodo cheio vazava por cima da secao seguinte (alta): cadeia flex corrigida (`.wv-periods flex: 1 0 auto`, `min-height: 0` no `.wv-col-body`) — coluna scrolla, validado com 38 entries
- `stopPropagation` cego nos periodos prendia o picker de categoria/popovers abertos (gravava categoria em slot errado): removido; o listener do body agora ignora cliques vindos de `.wv-periods` via `closest()`
- Rebuild da lista no blur do quick-add engolia o primeiro clique em toggle/dot: commit agora insere so a linha nova na posicao ordenada
- Sync remoto (`reloadFromState`) descartava rascunho do quick-add: re-render da semana ganhou guard `zoomMode === 'week'` + commit programatico do rascunho focado antes do rebuild
- Periodo cheio falhava em silencio: input pisca `.full` vermelho e preserva o texto
- Chip da entry invisivel nos temas escuros (rgba preto hardcoded): `var(--hover-bg)` + `border: 1px solid var(--border)`
- TV OLED (>=1920px) nao escalava as classes novas: overrides adicionados no media query
- Touch sem hover deixava o dot de categoria invisivel porem clicavel: `@media (hover: none)` com opacity 0.35
- Limpar categoria via picker em entry sem texto deixava linha fantasma: linha removida quando entry some do state
- `renderWeekView()` sem argumento (sync/troca de calendario) gerava colunas NaN: fallback pra `zoomWeekStart`

**Aceitos sem correcao (design):**
- Filtros de categoria seguem so em etiquetas (timeboxing nunca filtrou, nem no modo DIA)
- Colunas de semanas na virada de ano (2025/2027) aceitam timeboxing mas nao etiquetas (etiquetas sao keyed por mes-dia de 2026)

**Hotfix pos-deploy (reporte do Marcos: "VISAO DA SEMANA some quando clica"):**
- Causa raiz PRE-EXISTENTE achada via MutationObserver + interceptacao de classList no headless: `#bdToggle` (botao do painel) carrega a classe `.zoom-btn` so pelo visual e nao tem `data-zoom`; o bind generico `querySelectorAll('.zoom-btn')` registrava `setZoom(undefined)` nele — clicar no painel derrubava o app pro modo ANO antes do `toggleBrainDump` rodar. Invisivel ate o modo semana virar util
- Fix: seletor restrito a `.zoom-btn[data-zoom]`. Validado: painel abre/fecha/reabre sem derrubar a semana, persiste em cliques no grid, e reaparece aberto ao voltar pro modo semana. `sw.js` v9

**Ciclo #6 — horario editavel na semana (reporte: "coisas estao sendo colocadas 5 da manha"):**
- Causa: o quick-add pegava o primeiro slot livre do periodo, que na manha e 05:00. Semana e dia SEMPRE foram a mesma grade (`state.timeboxing[data].schedule`), so faltava controle de horario
- `WV_PERIODS` ganhou `anchor` (manha 8h, tarde 14h, noite 19h): item sem hora entra na ancora e segue de meia em meia hora (busca circular dentro do periodo)
- Prefixo de hora no quick-add: `"14h Gravar"`, `"14:30 X"`, `"9h30 Tenis"` agendam direto; hora de outro periodo cai no periodo certo. Numero solto (`"3 aulas"`) NAO vira hora (regex exige `h` ou `:`)
- Hora do item clicavel: vira `<input type=time>` (min 05:00 / max 23:30, commit em blur/Enter, Escape cancela); `moveWeekEntry` move preservando texto, feito e categoria
- `findFreeSlotFromHour` procura do horario pedido pra frente e depois pra tras — so falha se o dia inteiro estiver cheio (flash vermelho no horario)

**Revisao adversarial do ciclo #6 (workflow 2 lentes; os 10 verificadores morreram por falta de credito — findings verificados manualmente no codigo):**
- `moveWeekEntry`/quick-add cross-periodo rebuildavam o grid inteiro e engoliam o clique em voo (mousedown dispara blur, rebuild destroi o alvo, mouseup nao acha nada): criado `refreshWeekColumnPeriods`, que re-renderiza so as listas dos periodos afetados; `moveWeekEntry` agora retorna `moved|unchanged|full|gone` e so re-renderiza quando move de fato
- Picker orfao quando a entry sumia entre abrir e commitar: retorno `gone` restaura o span
- Commit de rascunho no `renderWeekView` ignorava o parse de hora (salvava `"14h Gravar"` literal na ancora): passou a usar `resolveQuickAddSlot`, compartilhado com o commit normal
- ⚠️ Descoberta contra a hipotese da revisao anterior: **o Chrome DISPARA blur ao remover do DOM um input focado** (medido no headless). Isso fazia o rascunho ser gravado 2x (guard + blur). Fix: limpar `pendingAdd.value` apos o commit do guard
- `.wv-entry-time-input` sem escala no breakpoint TV OLED e `sw.js` sem bump: ambos corrigidos (v10)

**Limitacoes (proximo ciclo):**
- Renderers alternativos da semana (iPhone portrait `renderWeekViewMobile` e monitor vertical `renderWeekViewStacked`) continuam so com etiquetas — periodos ainda nao aplicados neles (`buildWeekPeriods(dateStr)` e autocontida, e so anexar)
- Mover item nao tem drag-and-drop entre dias/periodos; so pelo horario

## 2026-04-21 — Ciclo #4: Reorganizacao estrutural seguindo padrao OC

**Estudei:**
- Protocolo `OC_Kaizen-do-mapa/01-protocolo/estrutura-de-projeto.md` (5S, Kanban, Jidoka, Poka-yoke, 3M)
- `filosofia-expandida.md` (30 conceitos) e `conceitos-adicionais.md` (31-42)
- CLAUDE.md do hub Kaizen — mapeamento conceito → primitivo Claude Code

**Diagnosticei (Genchi Genbutsu) — 3M identificados:**
- **Muda #5 (Inventario):** `bigasscalendar_2026_COMPLETO.json` MD5-identico a `_backup_2026-03-22.json`. Duplicata pura
- **Muda #5:** `generate-editorial.js` v1 convivendo com v2 na mesma pasta
- **Muda:** 8 `.DS_Store` espalhados; pasta `inteligencia/kaizen/planos/` vazia (mantida por Seiton — lugar reservado, nao Muda)
- **Mura:** nome da pasta `02 MARCOS/` com espaco (viola kebab-case OC); 19 arquivos misturados na mesma raiz (scripts + JSONs + plano + historico)
- **Muri:** raiz do projeto sem kanban visivel pelo pipeline
- **Shitsuke ausente:** sem CLAUDE.md na raiz, sem `estado/cursor.json`

**Apliquei (5 ondas):**
1. **Seiri + Seiso:** deletados 8 `.DS_Store`, duplicata `COMPLETO.json`, duplicata `prompt-claude-code.md` em docs/reference/
2. **Seiton — pastas numeradas (Kanban visivel):**
   - `01-plano-marcos/` ← conteudo pessoal (PLANO-2026.md, HISTORICO-POPULACAO.md, reestruturacao_2026.json)
   - `02-geradores/` ← 6 `generate-*.js` + `_legado/generate-editorial.js` (v1) + README.md
   - `03-dados/atual/bigasscalendar_2026.json` ← fonte canonica unica
   - `03-dados/backups/` ← 7 snapshots com nomenclatura limpa (YYYY-MM-DD.json)
   - Removida pasta `02 MARCOS/`
3. **Consolidacao `_referencia/`:** itzler-notes, design, specs, log-setup, timeblocking-legado, backups-ui, prompt-claude-code.md. Removida pasta `docs/`
4. **Shitsuke + Jidoka:** criado `CLAUDE.md` raiz (postura + estrutura + deploy), `estado/cursor.json` + `estado/README.md` (schema do cursor), `02-geradores/README.md` (indice dos scripts)
5. **Paths atualizados nos 6 scripts ativos** — todos apontam pra `../03-dados/atual/bigasscalendar_2026.json`. `generate-editorial-v2.js` agora faz backup datado (`pre-editorial_YYYY-MM-DD.json`). `generate-braindump.js` nao mais copia pra COMPLETO (arquivo eliminado). `.gitignore` atualizado com novos paths

**Resultado:**
- Raiz do projeto reduziu de 21 itens (11 arquivos + 6 pastas + duplicatas) para 14 (9 arquivos do app + 5 pastas numeradas/funcionais)
- Pipeline visivel por `ls` sem ler nenhum documento (Kanban funcionando)
- Duplicata MD5 eliminada (1 arquivo a menos, ~200KB)
- Fonte canonica unica `03-dados/atual/bigasscalendar_2026.json` (antes: 2 arquivos identicos + POPULATED + 5 backups sem padrao)

**Limitacoes:**
- Scripts nao foram testados pos-refactor de paths — proximo ciclo validar rodando `generate-recurring.js`
- Deploy Firebase continua sem `firebase.json` no repo — metodo de deploy ainda nao documentado
- `estado/cursor.json` tem `deploy.deploy_method: "PENDING"` (Jidoka: agente para aqui se usuario pedir deploy)

**Cross-project impact:**
- Primeira vez que Big Ass Calendar adota padrao completo OC_Kaizen-do-mapa (antes so tinha `inteligencia/kaizen/` mas faltavam CLAUDE.md, estado/, pipeline numerado, _referencia/)
- Yokoten: estrutura pode servir de template pra outros projetos OC que misturam produto (app) + conteudo pessoal

**Correcao (Poka-yoke de memoria):**
- Primeira versao do CLAUDE.md e cursor.json mencionou `bim.oficina@gmail.com` como conta do Firebase — viola `feedback_conta_google_contato.md` (regra global: conta OC e sempre `contato@bimoficinacriativa.com`). Corrigido apos usuario apontar o console.firebase.google.com real estar sob `contato@`

**Proximo:**
- Ciclo #5: validar `generate-*.js` rodando cada um e confirmando que escrevem em `03-dados/atual/` corretamente
- Documentar metodo de deploy Firebase em `estado/cursor.json` e em `_referencia/log-setup/`
- Retomar quick wins do Ciclo #2 (meta description, contraste azul, inert no side panel)

---

## 2026-04-06 — Ciclo #3: Calendar editor modal + delete fix

**Problema:** Funcao de excluir calendarios nao funcionava — o editor usava `prompt()` nativo do browser, que e fragil (pode ser bloqueado, nao funciona bem em PWA, UX ruim com digitacao de numeros)

**Apliquei:**
- Substituido `showCalendarEditor()` inteiro em `firebase-sync.js`: de 3 prompts sequenciais para modal visual usando o design system existente (`.modal-overlay`, `.modal`, `.modal-header`, `.modal-body`)
- Inputs de nome e emoji pre-preenchidos para edicao
- Delete com confirmacao de 2 cliques (primeiro clique muda botao pra "Confirmar exclusao?", segundo clique efetiva)
- Suporte a teclado (Enter salva, Escape fecha)
- Fechar ao clicar fora do modal (backdrop click)
- CSS adicionado: `.cal-editor-*` classes com variaveis de tema
- Tooltip do switcher corrigido: "Duplo clique para editar" → "Clique para editar"

**Resultado:** Commit 8fd1c87, deployed via GitHub Pages. Usuario confirmou que delete agora funciona

**Metricas:** +90 linhas de codigo (58 JS + 32 CSS). Sem impacto em performance (modal criado sob demanda, removido ao fechar)

**Aprendizado:** `prompt()`/`confirm()` nativos sao armadilhas em apps web modernos — parecem simples mas quebram em contextos inesperados. Modais proprios sao mais codigo mas 100% confiaveis e tematizaveis

**Proximo:** Quick wins pendentes do ciclo #2 (meta description, contraste azul, inert no side panel)

---

## 2026-03-27 — Ciclo #1

**Estudei:** Estrutura atual do projeto — stack, arquivos, integracao Firebase, PWA
**Apliquei:** Sistema Kaizen do MAPA implementado no projeto (protocolo, checkpoint, log, estrutura de planos)
**Resultado:** Trilha de 11 topicos definida (Firebase 5, PWA 3, Performance 3). Baseline do app documentado no checkpoint. Decisoes tecnicas existentes catalogadas
**Limitacoes:** Metricas de performance (Lighthouse, Firestore reads) ainda nao medidas — pendente no proximo ciclo
**Proximo:** Topico 1.1 — Firestore estrutura de documentos, queries, indices. Medir Lighthouse baseline

---

## 2026-03-27 — Ciclo #2: Baseline medido + feature implementada

**Coletei:**
- Lighthouse audit (desktop): Accessibility 91, Best Practices 77, SEO 90
- Performance trace: LCP 484ms (TTFB 8ms + Render Delay 476ms), CLS 0.02
- 6 audits falhando (contraste, aria-hidden, meta description, cookies 3p, aria-label mismatch, chrome issues)
- Tamanho total: 322KB (app.js 170KB, style.css 104KB)
- Complexidade: 182 funcoes, 145 listeners, 252 DOM queries

**Analisei:**
- LCP de 484ms e bom (< 2.5s threshold), mas 476ms e puro render delay — app.js monolitico bloqueia
- Contraste do azul principal (#0094D6 sobre branco = 3.38:1) falha WCAG AA em 3 elementos visiveis (botoes, labels de mes, zoom bar)
- Meta description ausente = oportunidade facil de SEO
- Side panel com aria-hidden="true" mas botoes focaveis dentro = acessibilidade quebrada
- app.js monolitico de 170KB com 182 funcoes = candidato forte a code splitting

**Implementei:**
- Info tooltip "Up Before the Enemy" na day view — conteudo bilingual (PT/EN) com 6 tips de morning routine
- white-space: pre-wrap nos info popovers pra suportar listas numeradas
- max-height: 60vh + overflow-y: auto no popover desktop pra conteudo longo
- Commit: 763c703, deployed via GitHub Pages

**Proximo ciclo:**
- Quick wins: meta description, corrigir contraste azul, inert no side panel
- Avaliar se modularizar app.js vale o esforco agora vs. focar em features
