# Kaizen do MAPA. Melhoria Continua — Big Ass Calendar

> Hoje melhor que ontem, amanha melhor que hoje.

## Filosofia

Kaizen aplicado ao Big Ass Calendar: cada ciclo torna o app mais rapido, mais resiliente offline, mais seguro e mais agradavel de usar. O calendario de parede do Jesse Itzler — agora digital — merece a mesma atencao ao detalhe que o produto fisico.

## Fontes de estudo

| Recurso | URL | Foco |
|---------|-----|------|
| Firebase Web SDK (Compat) | https://firebase.google.com/docs/reference/js | Auth, Firestore, Hosting |
| Firestore Web | https://firebase.google.com/docs/firestore | Queries, offline, security rules |
| Firebase Auth Web | https://firebase.google.com/docs/auth/web | Providers, sessao, tokens |
| Firebase Hosting | https://firebase.google.com/docs/hosting | Deploy, preview, CDN, headers |
| PWA Best Practices | https://web.dev/progressive-web-apps | Service Worker, cache, manifest |
| Web Performance | https://web.dev/performance | Core Web Vitals, lazy load, minify |

## Trilha de estudo — Firebase + PWA + Performance

### Fase 1: Firebase (fundamentos do que ja esta no app)

| # | Topico | Doc | Status |
|---|--------|-----|--------|
| 1.1 | Firestore — estrutura de documentos, queries, indices | [Firestore Docs](https://firebase.google.com/docs/firestore) | [ ] |
| 1.2 | Firestore Offline — persistence, cache, sync | [Offline Data](https://firebase.google.com/docs/firestore/manage-data/enable-offline) | [ ] |
| 1.3 | Firebase Auth — providers, session, onAuthStateChanged | [Auth Docs](https://firebase.google.com/docs/auth/web) | [ ] |
| 1.4 | Security Rules — validacao server-side, testes | [Security Rules](https://firebase.google.com/docs/firestore/security/get-started) | [ ] |
| 1.5 | Firebase Hosting — deploy, preview channels, headers | [Hosting Docs](https://firebase.google.com/docs/hosting) | [ ] |

### Fase 2: PWA (o app ja e PWA, mas pode melhorar)

| # | Topico | Doc | Status |
|---|--------|-----|--------|
| 2.1 | Service Worker — estrategias de cache, update flow | [SW Lifecycle](https://web.dev/articles/service-worker-lifecycle) | [ ] |
| 2.2 | Manifest + Install — A2HS, splash screen, display modes | [Web App Manifest](https://web.dev/articles/add-manifest) | [ ] |
| 2.3 | Background Sync — salvar offline e sincronizar depois | [Background Sync](https://developer.chrome.com/docs/workbox/modules/workbox-background-sync) | [ ] |

### Fase 3: Performance (app.js tem 170KB, style.css 104KB)

| # | Topico | Doc | Status |
|---|--------|-----|--------|
| 3.1 | Core Web Vitals — LCP, FID, CLS no contexto do app | [Core Web Vitals](https://web.dev/articles/vitals) | [ ] |
| 3.2 | Code splitting / lazy loading — modularizar app.js | [Code Splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting) | [ ] |
| 3.3 | CSS optimization — critical CSS, purge, minify | [CSS Optimization](https://web.dev/articles/extract-critical-css) | [ ] |

## Loop diario

### 1. Estudar (15 min)
Consultar a documentacao oficial e aprender o proximo topico da trilha.

### 2. Aplicar (15 min)
Escolher UMA melhoria pra implementar. Exemplos:

**Firebase:**
- Otimizar queries Firestore (batched writes, indices compostos)
- Melhorar regras de seguranca (validar campos, limitar writes)
- Configurar hosting com cache headers otimizados
- Migrar de compat SDK pra modular SDK (tree-shakeable)

**PWA:**
- Melhorar estrategia de cache do Service Worker
- Adicionar update prompt quando nova versao disponivel
- Configurar background sync pra salvar edits offline

**Performance:**
- Extrair modulos do app.js monolitico
- Identificar CSS nao utilizado no style.css
- Lazy load de features nao-essenciais (brain dump, onboarding)

**UX:**
- Melhorar responsividade em algum breakpoint
- Otimizar dark mode pra OLED (preto puro)
- Refinar animacoes e transicoes

### 3. Documentar (5 min)
Registrar em `kaizen-log.md`.

### 4. Checkpoint (2 min)
Atualizar `kaizen-checkpoint.md`.

### 5. Revisar (semanal)
O que funcionou, o que nao, prioridades.

## Metricas

| Metrica | Baseline | Meta |
|---------|----------|------|
| app.js size | 170KB | < 100KB (modularizado) |
| style.css size | 104KB | < 80KB (purged) |
| Lighthouse Performance | ? (medir) | > 90 |
| Lighthouse PWA | ? (medir) | 100 |
| Firestore reads/sessao | ? (medir) | Decrescente |
| Offline reliability | Parcial | 100% funcional offline |

## Conexao com o projeto

> "The calendar is not about planning. It's about living." — Jesse Itzler

O Big Ass Calendar e sobre ver o ano inteiro de uma vez e agir. O kaizen garante que a ferramenta digital honre essa visao — rapida, confiavel, bonita.
