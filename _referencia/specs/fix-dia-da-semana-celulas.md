# FIX URGENTE — Abreviação do Dia da Semana nas Células

## O Problema

Cada célula do calendário precisa mostrar o **número do dia** E a **abreviação do dia da semana com 3 letras** (não 1 letra). Atualmente está mostrando apenas 1 letra ou está incorreto.

## Como DEVE ficar — Layout Exato de Cada Célula

Olhe a imagem do calendário original em zoom. Cada célula tem este layout:

```
┌─────────────────┐
│ 1    THU         │
│                  │
│                  │
│  (espaço para    │
│   etiquetas)     │
│                  │
└─────────────────┘
```

O **número do dia** fica no canto superior ESQUERDO e a **abreviação de 3 letras do dia da semana** fica logo ao lado direito do número, na MESMA LINHA, no topo da célula. Ambos em fonte pequena, azul, bold.

## Exemplos Concretos — Janeiro 2026

Janeiro 2026 começa na QUINTA-FEIRA. Então:

| Célula | Mostra |
|--------|--------|
| Dia 1  | `1  QUI` |
| Dia 2  | `2  SEX` |
| Dia 3  | `3  SÁB` |
| Dia 4  | `4  DOM` |
| Dia 5  | `5  SEG` |
| Dia 6  | `6  TER` |
| Dia 7  | `7  QUA` |
| Dia 8  | `8  QUI` |
| ...    | ...    |
| Dia 31 | `31 SÁB` |

## Abreviações Corretas (3 letras)

**Português (padrão):**
- Domingo = **DOM**
- Segunda = **SEG**
- Terça = **TER**
- Quarta = **QUA**
- Quinta = **QUI**
- Sexta = **SEX**
- Sábado = **SÁB**

**Inglês (quando o idioma for EN):**
- Sunday = **SUN**
- Monday = **MON**
- Tuesday = **TUE**
- Wednesday = **WED**
- Thursday = **THU**
- Friday = **FRI**
- Saturday = **SAT**

## Como Calcular

Para cada célula (mês M, dia D):
1. Criar um `new Date(2026, M, D)` onde M é 0-indexed (Jan=0, Feb=1...)
2. Pegar `.getDay()` que retorna 0=Domingo, 1=Segunda, ..., 6=Sábado
3. Mapear para o array de abreviações:
   - PT: `['DOM','SEG','TER','QUA','QUI','SEX','SÁB']`
   - EN: `['SUN','MON','TUE','WED','THU','FRI','SAT']`

## CSS da Célula

```css
.cell-header {
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding: 2px 4px;
  font-size: 11px;       /* ajustar conforme viewport */
  font-weight: 700;
  color: #1565C0;         /* azul do tema */
  line-height: 1;
}

.day-number {
  font-size: 13px;        /* número um pouco maior que a abreviação */
}

.day-name {
  font-size: 9px;         /* abreviação menor */
  text-transform: uppercase;
  opacity: 0.85;
}
```

## HTML de Cada Célula

```html
<div class="calendar-cell" data-month="0" data-day="1">
  <div class="cell-header">
    <span class="day-number">1</span>
    <span class="day-name">QUI</span>
  </div>
  <div class="cell-content">
    <!-- etiquetas/labels vão aqui -->
  </div>
</div>
```

## Verificação — Primeiros Dias de Cada Mês 2026

Use esta tabela para validar que está correto:

| Mês | Dia 1 = | Em PT  | Em EN  |
|-----|---------|--------|--------|
| JAN | Qui     | 1 QUI  | 1 THU  |
| FEV | Dom     | 1 DOM  | 1 SUN  |
| MAR | Dom     | 1 DOM  | 1 SUN  |
| ABR | Qua     | 1 QUA  | 1 WED  |
| MAI | Sex     | 1 SEX  | 1 FRI  |
| JUN | Seg     | 1 SEG  | 1 MON  |
| JUL | Qua     | 1 QUA  | 1 WED  |
| AGO | Sáb     | 1 SÁB  | 1 SAT  |
| SET | Ter     | 1 TER  | 1 TUE  |
| OUT | Qui     | 1 QUI  | 1 THU  |
| NOV | Dom     | 1 DOM  | 1 SUN  |
| DEZ | Ter     | 1 TER  | 1 TUE  |

## IMPORTANTE

- São **3 letras**, não 1. "QUI" e não "Q". "THU" e não "T".
- O dia da semana aparece DENTRO de cada célula, ao lado do número, não no header das colunas.
- Não existe header de coluna com dias da semana — cada célula é autocontida com seu número + dia.
- Finais de semana (DOM/SÁB ou SUN/SAT) continuam com fundo azul claro diferenciado.
