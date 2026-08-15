# estado/, Jidoka do projeto

> Estado da máquina. Agente Claude lê `cursor.json` ANTES de agir.
> Se campo crítico é `PENDING` ou `null`, para e pergunta.

## Schema de `cursor.json`

| Campo | Tipo | O que é |
|-------|------|---------|
| `schema_version` | int | Versão do schema (bump quando mudar estrutura) |
| `last_updated` | YYYY-MM-DD | Data da última modificação deste cursor |
| `canonical_json` | path | JSON ativo que o app consome (fonte única) |
| `canonical_json_source_backup` | path | Backup mais recente que vale como referência histórica |
| `last_populated_json` | YYYY-MM-DD | Data correspondente ao estado atual dos dados |
| `deploy.platform` | string | Firebase Hosting |
| `deploy.project_id` | string | ID do projeto Firebase |
| `deploy.account` | string | Conta Google do deploy |
| `deploy.last_deployed` | YYYY-MM-DD \| null | Última data de deploy confirmada |
| `deploy.deploy_method` | string | `firebase-cli`, `github-actions`, ou `PENDING` |
| `pendencias` | array de string | Itens a resolver, ordem de prioridade |
| `usage_state.*` | objeto | Estado de uso real do Marcos (preenchimento, revisão, notas) |

## Quando atualizar

- Após mover/renomear JSON canônico
- Após deploy (registrar data e método)
- Quando resolver uma pendência: remover da lista
- Quando identificar nova pendência: append

## Regras Jidoka

- Agente lê `cursor.json` antes de propor mudança em JSON/scripts
- Se `deploy.deploy_method === "PENDING"` e usuário pede pra deployar → pergunta o método antes de executar
- Agente escreve no cursor DEPOIS de concluir ação (nunca antes)
