# BUG FIX — Abreviação dos dias aparece como 1 letra errada (D, I, A, S)

## O Problema Exato

Na visão SEMANA e na visão ANO, os dias da semana estão aparecendo como **1 letra sem sentido**: "D", "I", "A", "S" em vez das abreviações corretas de 3 letras.

Exemplos do bug (visão SEMANA, semana 15/2 a 21/2):
- Dia 15 mostra **"D"** → deveria ser **"DOM"**
- Dia 16 mostra **"I"** → deveria ser **"SEG"**  
- Dia 17 mostra **"A"** → deveria ser **"TER"**
- Dia 18 mostra **"S"** → deveria ser **"QUA"**
- Dias 19, 20, 21 não mostram nada → deveriam ser **"QUI"**, **"SEX"**, **"SÁB"**

## A Causa Provável

O código provavelmente está usando `toLocaleDateString('pt-BR', { weekday: 'narrow' })` ou `Intl.DateTimeFormat` com `weekday: 'narrow'`, que retorna apenas 1 letra (D, S, T, Q, Q, S, S em português). Ou está usando `weekday: 'short'` que no locale pt-BR retorna "dom.", "seg.", "ter." etc com ponto e minúscula, e o código está pegando só a primeira letra.

## A Solução — NÃO usar Intl/toLocaleDateString

**Remover qualquer uso de `toLocaleDateString`, `Intl.DateTimeFormat` ou `.toLocaleString` para obter o dia da semana.** Essas funções retornam formatos inconsistentes entre browsers e sistemas operacionais.

Em vez disso, usar arrays hardcoded:

```javascript
// Arrays de abreviações — COPIAR EXATAMENTE
const DAY_NAMES = {
  pt: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
};

// Nomes completos para a visão MÊS (header das colunas)
const DAY_NAMES_FULL = {
  pt: ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'],
  en: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
};

// Função para obter a abreviação de 3 letras
function getDayAbbrev(year, month, day, lang) {
  // month é 0-indexed: Jan=0, Feb=1, etc.
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  return DAY_NAMES[lang][dayOfWeek];
}

// Exemplos de uso:
getDayAbbrev(2026, 0, 1, 'pt')   // → "QUI"  (1 de Janeiro 2026 = quinta)
getDayAbbrev(2026, 1, 15, 'pt')  // → "DOM"  (15 de Fevereiro 2026 = domingo)
getDayAbbrev(2026, 1, 17, 'pt')  // → "TER"  (17 de Fevereiro 2026 = terça)
```

## Onde Aplicar

### 1. Visão ANO — Dentro de cada célula do grid
Cada célula deve mostrar: **número + abreviação 3 letras**

```html
<!-- ANTES (bugado) -->
<span class="day-abbrev">D</span>

<!-- DEPOIS (correto) -->
<span class="day-abbrev">DOM</span>
```

Buscar no código onde as células são renderizadas (provavelmente um loop sobre dias/meses) e substituir a lógica que gera a abreviação por `getDayAbbrev(2026, monthIndex, dayNumber, currentLang)`.

### 2. Visão SEMANA — Header de cada coluna
Cada coluna da semana deve mostrar: **abreviação + número do dia**

```html
<!-- ANTES (bugado) -->
<div class="week-day-header">
  <span class="day-letter">D</span>
  <span class="day-num">15</span>
</div>

<!-- DEPOIS (correto) -->
<div class="week-day-header">
  <span class="day-abbrev">DOM</span>
  <span class="day-num">15</span>
</div>
```

### 3. Visão MÊS — Header das colunas (nomes completos)
Já parece estar funcionando (DOMINGO, SEGUNDA, etc.), mas verificar que usa o array hardcoded e não Intl.

## Busca e Substituição no Código

Procurar por QUALQUER uma dessas strings e substituir:

```
// PROCURAR e REMOVER/SUBSTITUIR:
weekday: 'narrow'
weekday: 'short'  
weekday: 'long'
toLocaleDateString
toLocaleString
Intl.DateTimeFormat

// SUBSTITUIR POR uso do array:
DAY_NAMES[lang][date.getDay()]
```

## Verificação Final

Depois do fix, conferir estes dias específicos:

| Data | getDay() | PT (3 letras) | EN (3 letras) |
|------|----------|---------------|---------------|
| 2026-01-01 | 4 | QUI | THU |
| 2026-02-01 | 0 | DOM | SUN |
| 2026-02-15 | 0 | DOM | SUN |
| 2026-02-16 | 1 | SEG | MON |
| 2026-02-17 | 2 | TER | TUE |
| 2026-02-18 | 3 | QUA | WED |
| 2026-02-19 | 4 | QUI | THU |
| 2026-02-20 | 5 | SEX | FRI |
| 2026-02-21 | 6 | SÁB | SAT |
| 2026-12-31 | 4 | QUI | THU |

Se algum desses não bater, o `new Date()` está sendo chamado com parâmetros errados (provavelmente month não está 0-indexed).

## IMPORTANTE

- São **3 letras**: "DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"
- **NÃO** 1 letra, **NÃO** 2 letras, **NÃO** com ponto, **NÃO** em minúscula
- **NÃO** usar APIs de internacionalização do browser — arrays hardcoded são a solução confiável
