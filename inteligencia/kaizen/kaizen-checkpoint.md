# Kaizen Checkpoint — Big Ass Calendar

> Visao centralizada de progresso.

Ultima atualizacao: **2026-08-16 (Ciclo #7 — Periodos no mobile/vertical + arrastar entre dias)**

---

## Trilha — Progresso geral

| Fase | Topicos | Concluidos | % |
|------|---------|-----------|---|
| 1. Firebase | 5 | 0 | 0% |
| 2. PWA | 3 | 0 | 0% |
| 3. Performance | 3 | 0 | 0% |
| **Total** | **11** | **0** | **0%** |

---

## Planos — Status de implementacao

| # | Plano | Documentado | Implementado | Proxima acao |
|---|-------|:-----------:|:------------:|-------------|
| K01 | Reorganizacao estrutural seguindo padrao OC_Kaizen-do-mapa | ✅ | ✅ | Commitar as delecoes pendentes de `01 timeblocking/` e `docs/` (feitas em disco, nunca commitadas) |
| K02 | Documentar metodo de deploy | ✅ | ✅ | Fechado no Ciclo #6: deploy e **GitHub Pages** (`.github/workflows/deploy.yml`, push na `main`); CLAUDE.md corrigido |
| K03 | Quick wins de acessibilidade (contraste, meta desc, inert) | ✅ identificados Ciclo #2 | ❌ | Aplicar os 3 fixes em 1 ciclo |
| K04 | Periodos da semana nos renderers mobile e monitor vertical | ✅ Ciclo #6 | ❌ | Anexar `buildWeekPeriods(dateStr)` em `renderWeekViewMobile` e `renderWeekViewStacked` |

---

## Decisoes tecnicas

| Decisao | Fonte | Valor |
|---------|-------|-------|
| Stack | Existente | HTML/CSS/JS vanilla, sem framework |
| Firebase SDK | Existente | Compat (v10.14.1) — candidato a migracao pra modular |
| Firebase Project (auth/dados) | firebase-sync.js | `oc-big-ass-calendar` |
| Firebase Account | estado/cursor.json | `contato@bimoficinacriativa.com` (padrao OC, nunca email pessoal) |
| **Hospedagem** (medido Ciclo #5) | `.github/workflows/deploy.yml` | **GitHub Pages**, nao Firebase Hosting. Push na `main` dispara Action; no ar em `bimoficinacriativa.github.io/big-ass-calendar`. Repo `bimoficinacriativa/big-ass-calendar` |
| Auth Provider | firebase-sync.js | Google (popup) |
| Firestore persistence | firebase-sync.js | Habilitada (synchronizeTabs: true) |
| PWA display | manifest.json | fullscreen, landscape |
| Fonte principal | index.html | Barlow Condensed 600/700/800/900 |
| Temas | index.html | 12 temas (peach→black) |
| JSON canonico | estado/cursor.json | `03-dados/atual/bigasscalendar_2026.json` (fonte unica, geradores todos apontam pra la) |
| Pipeline de dados | raiz | `01-plano-marcos/` → `02-geradores/` → `03-dados/atual/` → upload manual no app |
| Protocolo de estrutura | CLAUDE.md | Segue padrao `OC_Kaizen-do-mapa/01-protocolo/estrutura-de-projeto.md` |

---

## Estado atual do app

| Recurso | Status |
|---------|--------|
| Calendario 365 dias (12x31 grid) | Funcional |
| Sistema de etiquetas coloridas | Funcional |
| 8 Box System (Itzler) | Funcional |
| Misogi + Mini-Aventuras | Funcional |
| Firebase Auth (Google) | Funcional |
| Firestore sync | Funcional |
| Multi-calendario (switcher + CRUD) | Funcional |
| Editor de calendario (modal) | Funcional |
| Offline (Service Worker) | Parcial |
| 12 temas visuais | Funcional |
| Responsivo (Mac/iPhone/TV) | Funcional |
| Brain Dump + Drag & Drop | Funcional |
| Semana com periodos manha/tarde/noite (sync timeboxing) | Funcional nos 3 layouts (desktop, iPhone, monitor vertical) |
| Horario por entrada na semana (ancora, prefixo "14h", picker) | Funcional |
| Mover entrada de dia: arrastar (mouse) + editor dia+hora (toque) | Funcional |

---

## Baseline medido (Ciclo #2 — 2026-03-27)

### Lighthouse Scores
| Categoria | Score |
|-----------|-------|
| Accessibility | 91 |
| Best Practices | 77 |
| SEO | 90 |
| Performance (LCP) | 484ms |
| CLS | 0.02 |

### Audits falhando (6)
| Problema | Impacto | Correcao |
|----------|---------|----------|
| Contraste insuficiente (#0094D6 sobre branco = 3.38:1, precisa 4.5:1) | Acessibilidade | Escurecer azul principal pra ~#0077B6 |
| `aria-hidden="true"` no side panel contem botoes focaveis | Acessibilidade | Usar `inert` ou `tabindex="-1"` nos filhos quando painel fechado |
| Meta description ausente | SEO | Adicionar `<meta name="description">` |
| Third-party cookies (Firebase/Google APIs) | Best Practices | Nao controlavel diretamente |
| aria-label nao bate com texto visivel das celulas | Acessibilidade | Ajustar aria-label pra incluir texto visivel |
| Chrome Issues (cookies 3p) | Best Practices | Firebase-related, baixa prioridade |

### Tamanho dos arquivos (medido 2026-08-15, Ciclo #6)
| Arquivo | Bytes | Linhas | Delta vs Ciclo #4 |
|---------|-------|--------|-------------------|
| app.js | 184.372 | 5018 | +363 linhas (periodos + horario) |
| style.css | 111.721 | 5153 | +245 linhas (periodos + picker) |
| index.html | 31.611 | 597 | = |
| firebase-sync.js | 17.340 | 501 | = |
| sw.js | 1.486 | 56 | = (cache v7 → v10) |
| **Total** | **346.530** | **11.325** | **+608 linhas** |

### Complexidade do codigo (medido 2026-08-15)
| Metrica | Valor | Delta vs Ciclo #4 |
|---------|-------|-------------------|
| Funcoes JS (app.js) | 196 | +14 (periodos, parse de hora, move) |
| Funcoes JS (firebase-sync.js) | 61 | = |
| Event listeners (app.js) | 156 | +11 |
| DOM queries (app.js) | 273 | +1 |

> Metrica de atencao: `app.js` passou de 180KB monolitico. A modularizacao
> segue como acao de medio prazo — cada ciclo que adiciona feature na week
> view aumenta a divida.

### Features implementadas (21 commits)
| Feature | Commit |
|---------|--------|
| Horario editavel nas entradas da semana | 289a182 |
| Fix bdToggle disparando setZoom(undefined) | 75e5664 |
| Periodos manha/tarde/noite no modo semana | 7c66930 |
| Modal calendar editor (replace prompt()) | 8fd1c87 |
| Info tooltip "Up Before the Enemy" | 763c703 |
| Fix data leak localStorage | 1022952 |
| Isolate user data by UID | 1b25f7a |
| Strikethrough toggle | 274f46a + f7b152a |
| Sync status indicator | 0e4c8b3 |
| Day view (timeboxing) | 3e806ae |
| Firebase auth + Firestore | dd1f4b6 |

## Acoes pendentes — Priorizado por impacto

### Quick wins (proximo ciclo)
- [x] Corrigir CLAUDE.md: dizia Firebase Hosting, deploy real e GitHub Pages (K02, feito no Ciclo #6)
- [x] Periodos manha/tarde/noite nos renderers mobile e monitor vertical (K04, feito no Ciclo #7)
- [ ] Adicionar `<meta name="description">` (SEO +10)
- [ ] Corrigir contraste azul principal (#0094D6 → #0077B6 ou similar, ratio ≥ 4.5:1)
- [ ] Adicionar `inert` attribute ao side panel quando fechado

### Medio prazo
- [x] Commitar as delecoes pendentes da reorganizacao de abril (feito no Ciclo #6, 28 renames)
- [x] Drag-and-drop de entradas entre dias/periodos na semana (Ciclo #7)
- [ ] Arrastar em telas de toque (DnD nativo nao dispara; hoje o caminho e o editor dia+hora)
- [ ] Modularizar app.js (**5205 linhas** monoliticas, +187 no Ciclo #7)
- [ ] Purge CSS nao utilizado (**5266 linhas** → meta <4000)
- [ ] Auditar security rules do Firestore
- [ ] Avaliar migracao compat → modular SDK (tree-shaking)
- [ ] Medir Firestore reads por sessao

### Armadilhas aprendidas (nao repetir)
- Botao com classe `.zoom-btn` sem `data-zoom` entra no bind generico e chama `setZoom(undefined)` — sempre filtrar por atributo
- Chrome **dispara** `blur` ao remover do DOM um input focado: commit em blur + commit em rebuild = gravacao dupla
- Rebuild total do grid entre `mousedown` e `mouseup` engole o clique — re-renderizar so a lista afetada
- **Popover que guarda referencia a um no e sobrevive a re-render grava por no destacado** e ressuscita dados apagados. Um drag NAO gera `click`, entao fechamento por clique-fora nao salva. Fechar no inicio do render E validar `document.contains()` antes de gravar
- **`#weekViewContent` sobrevive aos re-renders**: listener adicionado dentro do renderer se acumula. Bind unico via `dataset.*`
- Seletor de container em helper de refresh precisa cobrir os 3 renderers (`.wv-column, .wv-swipe-slide, .wv-stacked-row`), senao cai no fallback caro
- Classe de opacidade aplicada sincronamente no `dragstart` desbota o proprio ghost do drag — adiar com `setTimeout(0)`

---

## Padrao de atualizacao

### A cada ciclo Kaizen:
1. Marcar topico `[x]` no `kaizen-melhoria-continua.md`
2. Adicionar entry no `kaizen-log.md`
3. Criar/atualizar plano em `planos/`
4. Atualizar este checkpoint — progresso %, status do plano, acoes pendentes

### Revisao semanal (sexta):
- Revisar log da semana
- Atualizar todas as tabelas deste checkpoint
- Mover acoes concluidas, adicionar novas
- Atualizar decisoes tecnicas se houve mudanca
