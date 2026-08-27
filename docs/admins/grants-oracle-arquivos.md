# Grants Oracle — Gerenciador de Arquivos (`API_SMAR`)

Inventário para DBA habilitar o gerenciador compartilhado (alias Django `smar` / usuário `API_SMAR`). Writes vão em DML Python em `SIAOS.PROP_ARQUIVO` / `PROP_ARQ_LOG` (não há package de BLOB). Ver [`developers/arquivos.md`](../developers/arquivos.md).

Tabelas **já existem**. Não executar `CREATE TABLE` em produção. Scripts de leitura: `docs/_scripts/tables/siaos.prop_arquivo.sql`, `siaos.prop_arq_log.sql`, `smarnet.legenda.sql`, `smarnet.legenda_texto.sql`.

## Obrigatórios v1 (DBA aplicar)

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON SIAOS.PROP_ARQUIVO TO API_SMAR;
GRANT SELECT, INSERT ON SIAOS.PROP_ARQ_LOG TO API_SMAR;
GRANT SELECT ON SMARNET.LEGENDA TO API_SMAR;
GRANT SELECT ON SMARNET.LEGENDA_TEXTO TO API_SMAR;
```

## Já concedidos (onda 5 de clientes — manter)

```sql
GRANT SELECT ON SIAOS.VW_ARQUIVOS TO API_SMAR;
GRANT SELECT ON SIAOS.PROP_ARQ_MOD TO API_SMAR;
GRANT SELECT ON SIAOS.USUARIO TO API_SMAR;
```

`EXECUTE` em `PCK_SMART_SALES3` já existe — a v1 **não** usa (gerar pastas / e-mail). `SIAOS.LINGUA` não precisa de grant: o JOIN filtra `LIN_COD` conhecido (default 1).

## Não conceder

- `ALTER` em `SIAOS.PROP_ARQUIVO`
- `INSERT` / `UPDATE` / `DELETE` em `SMARNET.LEGENDA` ou `LEGENDA_TEXTO`
- `DELETE` em `SIAOS.PROP_ARQ_LOG`

`USUARIO_SMAR` no dump tem DML + `ALTER` em `PROP_ARQUIVO`; a API não replica `ALTER`.

Triggers `TG_B_I_ARQUIVO` / `TG_A_IUD_ARQUIVO` gravam `USU_CHAPA` via `PCK_DQANET.SF_USU_CHAPA_USER`. Compilar como SIAOS: [`siaos.TG_B_I_ARQUIVO.trg`](../_scripts/triggers/siaos.TG_B_I_ARQUIVO.trg), [`siaos.TG_A_IUD_ARQUIVO.trg`](../_scripts/triggers/siaos.TG_A_IUD_ARQUIVO.trg).

## Comportamento sem grant

- Árvore / upload / pasta / mover / lixeira: 502 (identificador inválido / privilege).
- Histórico sem `SELECT` em `PROP_ARQ_LOG` ou `USUARIO`: 502.
- Pastas-modelo antigas sem `SELECT` em `LEGENDA_TEXTO`: a árvore ainda funciona via `PAR_NOME` / `PAR_DESCRICAO` se o JOIN falhar só na legenda — na prática o SELECT único falha; aplicar o grant.
