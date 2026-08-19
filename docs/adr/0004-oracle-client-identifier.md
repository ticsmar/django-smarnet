# ADR 0004 — Identidade Oracle via CLIENT_IDENTIFIER

## Status

Accepted

## Context

O legado Infonet costuma abrir sessão Oracle com o login do usuário final (senha genérica), para que procedures/triggers vejam quem está logado (`SESSION_USER` / funções SGC).

O Smarnet usa a conta técnica `API_SMAR` (alias Django `smar`). Reproduzir login por usuário final com senha genérica é frágil e indesejável.

## Decision

1. Manter conexão técnica `API_SMAR`.
2. Por requisição autenticada que usa `smar`, definir `CLIENT_IDENTIFIER` com o username de negócio (e limpar / fechar conexão no fim).
3. Preferir, a médio prazo, parâmetros explícitos (`usu_chapa` / login) nas procedures novas ou adaptadas.
4. Em `SIAOS.CLIENTE`, a trigger `TG_B_IU_CLIENTE` ainda atribui `EMP_CODIGO` via `SGC.PCK_WINSGC.SF_EMP_CODIGO` no INSERT — com conta técnica isso pode divergir do owner efetivo. A aplicação corrige com `UPDATE` pós-insert quando necessário, até a trigger/função serem adaptadas.

## Consequences

- Grants e objetos que dependem só de `SESSION_USER` precisam ser revisados.
- Auditar `CLIENT_IDENTIFIER` e não assumir que equivale a `SESSION_USER`.
- Documentar grants faltantes para `API_SMAR` (ex.: `EXECUTE` em `SIAOS.PCK_CLIENTE`, `SIAOS.SF_VALIDA_CONS_CLIENTE`).
