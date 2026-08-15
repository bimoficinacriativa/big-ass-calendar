# Setup GitHub Pages + Firebase — 2026-03-09

## Objetivo
Subir o Big Ass Calendar no GitHub Pages com Firebase para:
- Sync entre dispositivos (Mac, iPhone, qualquer browser)
- Login com Google (bim.oficina@gmail.com)
- 3 calendários: OC (geral), Marcos, Jessica

---

## 1. GitHub — Repo + Pages

### Repo criado
- **Conta:** `bimoficinacriativa`
- **Repo:** `big-ass-calendar` (público)
- **URL:** https://github.com/bimoficinacriativa/big-ass-calendar

### Arquivos excluídos do repo (.gitignore)
- `02 MARCOS/` — backups pessoais com dados JSON
- `backups/` — versões antigas do código
- `docs/reference/itzler-notes/` — notas pessoais
- `prompt-claude-code.md` — prompt interno
- `.DS_Store`

### GitHub Pages
- **URL pública:** https://bimoficinacriativa.github.io/big-ass-calendar/
- **Deploy:** automático via GitHub Actions (`.github/workflows/deploy.yml`)
- **Trigger:** cada `git push` na branch `main`
- **Tempo de deploy:** ~20 segundos

### Auth do `gh` CLI
- Scopes adicionados: `delete_repo`, `workflow`
- Processo: `gh auth refresh -h github.com -s <scope>` → autorizar via https://github.com/login/device

---

## 2. Firebase — Backend

### Projeto
- **Nome:** OC-big-ass-calendar
- **ID:** `oc-big-ass-calendar`
- **Plano:** Spark (grátis)
- **Conta Google:** bim.oficina@gmail.com

### Serviços ativados
1. **Authentication** — provedor Google ativado
2. **Firestore Database** — região `southamerica-east1` (São Paulo), modo teste (30 dias)

### App Web registrado
- **Apelido:** `oc-bac-web`
- **firebaseConfig:**
```js
{
  apiKey: "AIzaSyBNrkeBRGsQq2g_PKSWLAumLrYnd75Uc9g",
  authDomain: "oc-big-ass-calendar.firebaseapp.com",
  projectId: "oc-big-ass-calendar",
  storageBucket: "oc-big-ass-calendar.firebasestorage.app",
  messagingSenderId: "307188542224",
  appId: "1:307188542224:web:efaddb84d3ebbc864e5395"
}
```

### Domínio autorizado (Authentication → Configurações)
- `bimoficinacriativa.github.io` (adicionado manualmente)

---

## 3. Implementação no código

### Arquivos criados/modificados

#### `firebase-sync.js` (novo)
- Inicializa Firebase (app, auth, firestore)
- Persistence offline habilitada
- 3 calendários: OC (🧡), Marcos (🧙‍♂️), Jessica (🧙‍♀️)
- Funções: `signIn()`, `signOut()`, `saveToFirestore()`, `loadFromFirestore()`, `listenToFirestore()`
- API pública em `window.BACSync`
- Migração automática de dados do localStorage legado para o calendário OC
- Real-time sync via `onSnapshot`

#### `index.html`
- Firebase SDK via CDN (compat v10.14.1): app, auth, firestore
- Containers de UI: `#authContainer`, `#calendarSwitcher`
- Script `firebase-sync.js` carregado antes de `app.js`

#### `app.js`
- `STORAGE_KEY` renomeado para `STORAGE_KEY_LEGACY`
- `loadState()` agora consulta `BACSync.load()` primeiro, depois fallback legacy
- `saveState()` agora usa `BACSync.save()` (localStorage + Firestore)
- Nova função `reloadFromState()` para atualizar UI quando dados chegam da nuvem
- `init()` configura listeners de sync e calendar switch

#### `style.css`
- Estilos para `.auth-container`, `.auth-bar`, `.auth-btn`, `.auth-avatar`, `.auth-name`
- Estilos para `.calendar-switcher`, `.cal-switch-btn`

---

## 4. Importação de dados

### Dados do Marcos importados para Firestore
- **Arquivo fonte:** `02 MARCOS/bigasscalendar_2026_backup_2026-02-23.json`
- **Método:** Script Node.js via Firestore REST API (`PATCH /v1/projects/.../documents/calendars/marcos`)
- **Resultado:** 31 labels, 1 misogi, 1 mini-aventura, 3 temporadas importadas

---

## 5. Como atualizar o app

```bash
cd ~/Desktop/BIG\ ASS\ CALENDAR
# Edita os arquivos...
git add -A
git commit -m "Descrição da mudança"
git push
# GitHub Pages atualiza automaticamente em ~20s
```

---

## 6. Pendências

- [ ] Configurar regras de segurança do Firestore (antes de 30 dias)
  - Permitir leitura/escrita apenas para usuários autenticados
- [ ] Testar sync no iPhone (Safari → Adicionar à Tela de Início)
- [ ] Considerar futura migração para app nativo SwiftUI
