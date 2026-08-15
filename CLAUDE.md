# CLAUDE.md, Big Ass Calendar (Marcos)

> PWA do calendário de parede (inspirado em Jesse Itzler) adaptado para o ano do Marcos.
> Calendário de 365 dias visto de uma vez. Seasons, MISOGI, 8 boxes, mini-aventuras, timeboxing diário.
> Última reorganização estrutural: 2026-04-21.

---

## O que é este projeto

Duas camadas que convivem na mesma pasta:

1. **App (produto)**, PWA standalone HTML/CSS/JS vanilla + Firebase Auth/Firestore. Deployado no GitHub Pages (ver seção Deploy).
2. **Dados do Marcos (conteúdo)**, plano 2026, JSONs de calendário, scripts Node que geram/populam timeboxing e labels.

O projeto usa a filosofia **Kaizen do MAPA** (`inteligencia/kaizen/`) para evoluir incrementalmente.

---

## Estrutura

```
BIG ASS CALENDAR/
├── CLAUDE.md                          ← este documento
│
# APP (raiz, porque o GitHub Pages publica a partir daqui)
├── index.html, app.js, style.css      ← motor do PWA
├── firebase-sync.js                   ← auth Google + Firestore
├── sw.js, manifest.json               ← service worker + PWA manifest
├── icon-180.png, icon-192.png, icon-512.png
│
# PIPELINE DE DADOS (Kanban visível nas pastas numeradas)
├── 01-plano-marcos/                   ← conteúdo pessoal do ano
│   ├── PLANO-2026.md                  ← plano macro (seasons, lançamentos, metas)
│   ├── HISTORICO-POPULACAO.md         ← decisões tomadas na população do calendário
│   └── reestruturacao_2026.json       ← labels avulsas de marcos (Discord, MCP, Alexa)
│
├── 02-geradores/                      ← scripts Node que produzem/atualizam JSONs
│   ├── README.md                      ← índice dos geradores
│   ├── generate-plan.js               ← gera timeboxing inicial a partir do plano
│   ├── generate-timeblocking.js       ← templates de Push/Misogi/Recovery Day
│   ├── generate-week-v2.js            ← timeboxing específico de uma semana
│   ├── generate-recurring.js          ← Tênis/Pilates/Terapia recorrentes
│   ├── generate-editorial-v2.js      ← editorial (plano de conteúdo)
│   ├── generate-braindump.js          ← braindumps diários
│   └── _legado/
│       └── generate-editorial.js      ← v1 (substituída por v2, mantida p/ referência)
│
├── 03-dados/                          ← JSONs consumidos pelo app
│   ├── atual/
│   │   └── bigasscalendar_2026.json   ← fonte canônica (upload no app)
│   └── backups/                       ← snapshots históricos
│
# ESTADO E INTELIGÊNCIA
├── estado/
│   ├── cursor.json                    ← estado atual (último JSON, deploy, pendências)
│   └── README.md                      ← schema do cursor
│
├── inteligencia/
│   └── kaizen/
│       ├── kaizen-checkpoint.md       ← foto do estado (atualiza por ciclo)
│       ├── kaizen-log.md              ← histórico de ciclos (append-only)
│       ├── kaizen-melhoria-continua.md ← trilha Firebase + PWA + Performance
│       └── planos/                    ← planos K* quando iniciativa não cabe em 1 ciclo
│
└── _referencia/                       ← contexto fora do pipeline ativo
    ├── itzler-notes/                  ← teoria Jesse Itzler (8 boxes, MISOGI, mini-aventuras)
    ├── design/                        ← mockups e paletas
    ├── specs/                         ← specs antigas de fixes e recursos (dev histórico)
    ├── log-setup/                     ← log do setup GitHub + Firebase inicial
    ├── timeblocking-legado/           ← app timeboxing standalone antigo
    ├── backups-ui/                    ← backups de sessões de dev (17/fev)
    └── prompt-claude-code.md          ← prompt original do projeto
```

---

## Onde começar

| Objetivo | Caminho |
|----------|---------|
| **Usar o calendário no navegador** | `index.html` (local) ou https://bimoficinacriativa.github.io/big-ass-calendar |
| **Editar o plano do ano** | `01-plano-marcos/PLANO-2026.md` |
| **Regenerar JSON a partir do plano** | `02-geradores/README.md`, decide qual script rodar |
| **Importar no app** | Upload de `03-dados/atual/bigasscalendar_2026.json` via menu do app |
| **Rodar ciclo Kaizen** | `inteligencia/kaizen/kaizen-melhoria-continua.md` → escolher próximo tópico da trilha |
| **Entender filosofia Itzler** | `_referencia/itzler-notes/` (8 boxes, MISOGI, mini-aventuras) |

---

## Stack

- **Frontend:** HTML/CSS/JS vanilla. Sem framework, sem build step.
- **Auth + sync:** Firebase (compat SDK v10.14.1), Google popup + Firestore.
- **Fonte principal:** Barlow Condensed 600/700/800/900.
- **PWA:** service worker + manifest (display `fullscreen`, `landscape`).
- **Geradores:** Node.js puro (CommonJS `require`), sem dependências externas.
- **Deploy:** GitHub Pages via Actions (push na `main`). Firebase (`oc-big-ass-calendar`) só para Auth + Firestore.

---

## Regras específicas

### Pipeline de dados
1. Plano é editado em markdown (`01-plano-marcos/PLANO-2026.md`)
2. Gerador lê JSON de `03-dados/atual/bigasscalendar_2026.json`, aplica transformação, escreve de volta
3. **Backup antes de modificar:** scripts que reescrevem o arquivo canônico devem salvar snapshot em `03-dados/backups/pre-<script>_<YYYY-MM-DD>.json` antes
4. Upload do JSON no app é manual (drag-and-drop no menu)

### App
1. App mora na raiz por causa do deploy GitHub Pages, **não mover** `index.html`, `app.js`, `style.css`, `firebase-sync.js`, `sw.js`, `manifest.json`, `icon-*.png`
2. Dados do usuário no Firestore são isolados por UID (não usar `localStorage` pra dados sensíveis)
3. Mudanças em `style.css` e `app.js` precisam bump de versão no `sw.js` pra invalidar cache

### Kaizen
- Antes de mexer em `app.js` ou `style.css`, ler `inteligencia/kaizen/kaizen-checkpoint.md`
- Após mudança significativa (feature nova, fix, refactor): entry no `kaizen-log.md` (prepend) + atualizar checkpoint
- Trilha de estudo em `kaizen-melhoria-continua.md` orienta o que aprender antes do próximo ciclo

---

## Deploy

- **Hosting: GitHub Pages** (confirmado em produção 2026-08-15, não Firebase Hosting)
- **Repo:** `bimoficinacriativa/big-ass-calendar`
- **No ar em:** https://bimoficinacriativa.github.io/big-ass-calendar
- **Como deployar:** `git push origin main`. O workflow `.github/workflows/deploy.yml` publica a raiz do repo automaticamente. Acompanhar com `gh run list --limit 1`
- **Antes de dar push:** bump do `CACHE_NAME` no `sw.js` sempre que `app.js` ou `style.css` mudarem, senão PWAs instalados continuam servindo a versão antiga do cache
- **Firebase** segue em uso, mas só para **Auth + Firestore** (projeto `oc-big-ass-calendar`, conta `contato@bimoficinacriativa.com`), não para hospedagem

---

## Filosofia da ferramenta

> "The calendar is not about planning. It's about living." (Jesse Itzler)

Ver o ano inteiro de uma vez. Decidir onde gastar o tempo ANTES que ele seja gasto. Seasons (Push/Recovery), MISOGI (1 grande meta anual), 8 Boxes (categorias da vida), Mini-Aventuras (6 no ano). O digital só é útil se honrar isso: rápido, bonito, offline, fullscreen.

---

## Dono

**Marcos Pretto** (`bim.oficina@gmail.com`)
