# FIX — Restaurar Seletor de Temas UI (separado dos filtros de categoria)

## O Problema

Os círculos de cor no header serviam para **trocar o tema visual do calendário inteiro** (Blue, Neutral, Gray, Dark etc.). Quando implementamos as cores automáticas por categoria, esses círculos foram substituídos pelos filtros de categoria. Isso está ERRADO — as duas coisas são diferentes e devem coexistir.

## São DUAS funcionalidades distintas

### 1. TEMAS DA INTERFACE (UI Theme) — Muda o visual do calendário inteiro
Controla: fundo, bordas, cor dos textos, cor dos labels de mês, título, células, fundo de finais de semana — tudo.

### 2. FILTROS POR CATEGORIA — Mostra/esconde etiquetas por caixa
Controla: visibilidade das etiquetas coloridas no grid. NÃO muda o visual do calendário.

## Layout do Header — Como organizar os dois

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ THE BIG A## CALENDAR 2026 ⓘ    [TEMAS UI]  ●●●●●●     [FILTROS]  ■■■■■■■■   EN ⊞  │
│ ANO  Q1  Q2  Q3  Q4  MÊS  SEMANA                                                    │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

Os **temas** ficam à ESQUERDA (como estavam antes) e os **filtros** ficam à DIREITA (novo). Separados visualmente por um espaçamento ou divisor sutil.

---

## Temas da Interface — A Paleta Completa

Baseado na paleta UI original do calendário, os temas disponíveis usam essas cores como base:

### Paleta de cores UI disponíveis (da imagem de referência):
```
#fcc0a0  — Pêssego/Salmon (tema Warm)
#ff612e  — Laranja vibrante (tema Energy)  
#b65b3d  — Marrom/Terracota (tema Earth)
#7bbbd7  — Azul claro (tema Classic Light)
#0094d6  — Azul principal (tema Classic — PADRÃO)
#225c75  — Azul escuro/petróleo (tema Deep)
#fdfdfd  — Branco quase puro (tema Minimal)
#ededed  — Cinza clarissimo (tema Soft Gray)
#adadad  — Cinza médio (tema Gray)
#3b3b3b  — Cinza escuro (tema Charcoal)
#212121  — Quase preto (tema Dark)
#000000  — Preto puro (tema OLED Dark)
```

### Cada tema define um conjunto completo de variáveis CSS:

```javascript
const UI_THEMES = {
  classic: {
    id: 'classic',
    swatch: '#0094d6',      // cor do círculo no seletor
    name: 'Classic Blue',
    vars: {
      '--bg': '#FFFFFF',
      '--bg-cell': '#FFFFFF',
      '--bg-weekend': '#E1F0FA',
      '--border': '#B0D4F1',
      '--text-primary': '#0A3D6B',
      '--text-cell': '#1565C0',
      '--text-title': '#0A3D6B',
      '--accent': '#0094D6',
      '--header-bg': '#E8F4FC',
      '--today-border': '#E53935',
    }
  },
  classicLight: {
    id: 'classicLight',
    swatch: '#7bbbd7',
    name: 'Light Blue',
    vars: {
      '--bg': '#F5FBFF',
      '--bg-cell': '#F5FBFF',
      '--bg-weekend': '#E8F4FC',
      '--border': '#C5DFEF',
      '--text-primary': '#2C7AAF',
      '--text-cell': '#2C7AAF',
      '--text-title': '#2C7AAF',
      '--accent': '#7BBBD7',
      '--header-bg': '#EAF5FC',
      '--today-border': '#E53935',
    }
  },
  warm: {
    id: 'warm',
    swatch: '#fcc0a0',
    name: 'Warm',
    vars: {
      '--bg': '#FFF9F5',
      '--bg-cell': '#FFF9F5',
      '--bg-weekend': '#FEEEE4',
      '--border': '#F0D4C0',
      '--text-primary': '#8B5E3C',
      '--text-cell': '#A0694A',
      '--text-title': '#8B5E3C',
      '--accent': '#FCC0A0',
      '--header-bg': '#FFF0E8',
      '--today-border': '#E53935',
    }
  },
  energy: {
    id: 'energy',
    swatch: '#ff612e',
    name: 'Energy',
    vars: {
      '--bg': '#FFFAF8',
      '--bg-cell': '#FFFAF8',
      '--bg-weekend': '#FFEDE5',
      '--border': '#FFCBB8',
      '--text-primary': '#B83D14',
      '--text-cell': '#D44A1A',
      '--text-title': '#B83D14',
      '--accent': '#FF612E',
      '--header-bg': '#FFF2EC',
      '--today-border': '#FF612E',
    }
  },
  earth: {
    id: 'earth',
    swatch: '#b65b3d',
    name: 'Earth',
    vars: {
      '--bg': '#FBF7F4',
      '--bg-cell': '#FBF7F4',
      '--bg-weekend': '#F0E4DA',
      '--border': '#D4B8A4',
      '--text-primary': '#6B3A24',
      '--text-cell': '#8B5237',
      '--text-title': '#6B3A24',
      '--accent': '#B65B3D',
      '--header-bg': '#F5EBE3',
      '--today-border': '#E53935',
    }
  },
  deep: {
    id: 'deep',
    swatch: '#225c75',
    name: 'Deep Ocean',
    vars: {
      '--bg': '#F2F7FA',
      '--bg-cell': '#F2F7FA',
      '--bg-weekend': '#DCE9F0',
      '--border': '#A8C4D4',
      '--text-primary': '#1A4A60',
      '--text-cell': '#225C75',
      '--text-title': '#1A4A60',
      '--accent': '#225C75',
      '--header-bg': '#E4EEF4',
      '--today-border': '#E53935',
    }
  },
  minimal: {
    id: 'minimal',
    swatch: '#fdfdfd',
    name: 'Minimal White',
    vars: {
      '--bg': '#FDFDFD',
      '--bg-cell': '#FFFFFF',
      '--bg-weekend': '#F5F5F5',
      '--border': '#E0E0E0',
      '--text-primary': '#424242',
      '--text-cell': '#616161',
      '--text-title': '#212121',
      '--accent': '#9E9E9E',
      '--header-bg': '#F8F8F8',
      '--today-border': '#E53935',
    }
  },
  softGray: {
    id: 'softGray',
    swatch: '#ededed',
    name: 'Soft Gray',
    vars: {
      '--bg': '#F5F5F5',
      '--bg-cell': '#F0F0F0',
      '--bg-weekend': '#E5E5E5',
      '--border': '#D0D0D0',
      '--text-primary': '#505050',
      '--text-cell': '#606060',
      '--text-title': '#404040',
      '--accent': '#808080',
      '--header-bg': '#EBEBEB',
      '--today-border': '#E53935',
    }
  },
  gray: {
    id: 'gray',
    swatch: '#adadad',
    name: 'Gray',
    vars: {
      '--bg': '#EEEEEE',
      '--bg-cell': '#E8E8E8',
      '--bg-weekend': '#DADADA',
      '--border': '#BBBBBB',
      '--text-primary': '#4A4A4A',
      '--text-cell': '#5A5A5A',
      '--text-title': '#333333',
      '--accent': '#ADADAD',
      '--header-bg': '#E0E0E0',
      '--today-border': '#E53935',
    }
  },
  charcoal: {
    id: 'charcoal',
    swatch: '#3b3b3b',
    name: 'Charcoal',
    vars: {
      '--bg': '#2A2A2A',
      '--bg-cell': '#333333',
      '--bg-weekend': '#3D3D3D',
      '--border': '#4A4A4A',
      '--text-primary': '#C0C0C0',
      '--text-cell': '#A8A8A8',
      '--text-title': '#E0E0E0',
      '--accent': '#808080',
      '--header-bg': '#353535',
      '--today-border': '#FF6B6B',
    }
  },
  dark: {
    id: 'dark',
    swatch: '#212121',
    name: 'Dark',
    vars: {
      '--bg': '#1A1A1A',
      '--bg-cell': '#222222',
      '--bg-weekend': '#2C2C2C',
      '--border': '#3A3A3A',
      '--text-primary': '#B0B0B0',
      '--text-cell': '#90CAF9',
      '--text-title': '#64B5F6',
      '--accent': '#64B5F6',
      '--header-bg': '#252525',
      '--today-border': '#FF5252',
    }
  },
  oled: {
    id: 'oled',
    swatch: '#000000',
    name: 'OLED Black',
    vars: {
      '--bg': '#000000',           // PRETO PURO — pixels desligados no OLED
      '--bg-cell': '#0A0A0A',
      '--bg-weekend': '#111111',
      '--border': '#1A3A5C',
      '--text-primary': '#8ABADB',
      '--text-cell': '#64B5F6',
      '--text-title': '#64B5F6',
      '--accent': '#0094D6',
      '--header-bg': '#050505',
      '--today-border': '#FF5252',
    }
  },
};
```

### Implementação — Seletor de Temas no Header

```html
<div class="theme-selector">
  <!-- 12 círculos, 1 por tema -->
  <button class="theme-dot" data-theme="warm" style="background:#fcc0a0" title="Warm"></button>
  <button class="theme-dot" data-theme="energy" style="background:#ff612e" title="Energy"></button>
  <button class="theme-dot" data-theme="earth" style="background:#b65b3d" title="Earth"></button>
  <button class="theme-dot" data-theme="classicLight" style="background:#7bbbd7" title="Light Blue"></button>
  <button class="theme-dot active" data-theme="classic" style="background:#0094d6" title="Classic Blue"></button>
  <button class="theme-dot" data-theme="deep" style="background:#225c75" title="Deep Ocean"></button>
  <button class="theme-dot" data-theme="minimal" style="background:#fdfdfd; border:1px solid #ccc" title="Minimal"></button>
  <button class="theme-dot" data-theme="softGray" style="background:#ededed" title="Soft Gray"></button>
  <button class="theme-dot" data-theme="gray" style="background:#adadad" title="Gray"></button>
  <button class="theme-dot" data-theme="charcoal" style="background:#3b3b3b" title="Charcoal"></button>
  <button class="theme-dot" data-theme="dark" style="background:#212121" title="Dark"></button>
  <button class="theme-dot" data-theme="oled" style="background:#000000" title="OLED Black"></button>
</div>
```

**Ao clicar num tema:**
1. Aplicar todas as CSS vars daquele tema no `:root`
2. Adicionar classe `active` no dot selecionado (borda branca grossa)
3. Salvar preferência no `localStorage.setItem('uiTheme', themeId)`
4. Carregar tema salvo no boot da página

```javascript
function applyTheme(themeId) {
  const theme = UI_THEMES[themeId];
  if (!theme) return;
  Object.entries(theme.vars).forEach(([key, val]) => {
    document.documentElement.style.setProperty(key, val);
  });
  localStorage.setItem('uiTheme', themeId);
  // Atualizar dot ativo
  document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
  document.querySelector(`.theme-dot[data-theme="${themeId}"]`)?.classList.add('active');
}
```

---

## Filtros por Categoria — Mantêm como estão

Os filtros de categoria (8 quadradinhos coloridos) continuam existindo mas ficam em posição SEPARADA dos temas. Podem ficar:

**Opção A — No header, à direita dos temas (com separador):**
```
[TEMAS ●●●●●●●●●●●●]  |  [FILTROS ■■■■■■■■]  EN  ⊞
```

**Opção B — Na barra de botões, junto ao ANO/MÊS/SEMANA:**
```
ANO  Q1  Q2  Q3  Q4  MÊS  SEMANA     ■■■■■■■■ Filtrar
```

**Opção C — Só no Dashboard lateral (dentro do painel das 8 caixas)**
Cada categoria no dashboard tem um "olho" (👁) para mostrar/esconder suas etiquetas no grid.

Recomendo **Opção A** para desktop/TV e **Opção C** para mobile (economiza espaço).

### Diferenciação visual entre temas e filtros:
- **Temas:** Círculos (border-radius: 50%) — mudam o visual inteiro
- **Filtros:** Quadrados arredondados (border-radius: 4px) — mostram/escondem etiquetas

Isso torna visualmente claro que são funcionalidades diferentes.

---

## CSS dos Seletores

```css
/* Temas — Círculos */
.theme-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
}
.theme-dot:hover { transform: scale(1.2); }
.theme-dot.active { border: 3px solid #FFFFFF; box-shadow: 0 0 0 1px rgba(0,0,0,0.2); }

/* Filtros — Quadrados arredondados */
.filter-dot {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s;
}
.filter-dot:hover { transform: scale(1.15); }
.filter-dot.active { border: 2px solid #FFFFFF; box-shadow: 0 0 0 1px rgba(0,0,0,0.3); }
.filter-dot.muted { opacity: 0.3; } /* Quando filtro está desativado */

/* Separador entre temas e filtros */
.header-separator {
  width: 1px;
  height: 20px;
  background: var(--border);
  margin: 0 12px;
}
```

---

## IMPORTANTE — Etiquetas NÃO mudam de cor com o tema

As etiquetas coloridas (Azul Aventura, Rosa Casamento, etc.) mantêm SEMPRE suas cores fixas independente do tema UI selecionado. Elas são as 8 cores das categorias e não devem ser afetadas pela troca de tema.

O que MUDA com o tema:
- Fundo do calendário
- Bordas das células  
- Cor do texto dos dias/meses/título
- Fundo dos finais de semana
- Cor do header

O que NÃO muda com o tema:
- Cores das etiquetas (sempre as 8 fixas)
- Borda do dia atual (sempre vermelha)
- Texto sobre as etiquetas (branco ou preto conforme contraste)

---

## Resumo

Restaurar o seletor de temas UI como círculos no header com 12 opções (Warm, Energy, Earth, Light Blue, Classic Blue, Deep Ocean, Minimal, Soft Gray, Gray, Charcoal, Dark, OLED Black). Cada tema define um conjunto completo de CSS variables. Os filtros de categoria permanecem como quadrados arredondados separados visualmente. Temas = visual do calendário inteiro. Filtros = mostrar/esconder etiquetas. São funcionalidades independentes que coexistem no header.
