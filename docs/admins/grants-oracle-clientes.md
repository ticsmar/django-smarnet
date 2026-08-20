# Grants Oracle — Clientes (`API_SMAR`)

Inventário para DBA habilitar o cadastro de Clientes no Smarnet (alias Django `smar` / usuário `API_SMAR`).

## Já observados (seleção)

- `SELECT` / `INSERT` / `UPDATE` / `DELETE` em `SIAOS.CLIENTE`
- `SELECT` em `SIAOS.ORIGEM`
- `EXECUTE` em `SIAOS.PCK_DQANET`
- `EXECUTE` em `SIAOS.PCK_CLIENTE` (`DJANGO_API`, `API_SMAR`) — necessário para `SP_ATUALIZA_DADOS_GERAIS` e `SF_CHECA_CADASTRO`
- CRUD/SELECT em `GERAL.EMPRESA`, `GERAL.ESTADO`, `GERAL.PAIS` (conforme ambiente)

```sql
GRANT EXECUTE ON SIAOS.PCK_CLIENTE TO DJANGO_API, API_SMAR;
```

## Pendentes / bloquedores

Executar como DBA (ajustar owner se os objetos estiverem em outro schema):

```sql
GRANT EXECUTE ON SIAOS.SF_VALIDA_CONS_CLIENTE TO API_SMAR;
GRANT SELECT ON INTEGRACAO.CLIENTE_RISCO TO API_SMAR;
-- Se SP_FUNC2CLIENTE for usado no fluxo funcionário:
GRANT EXECUTE ON INTEGRACAO.SP_FUNC2CLIENTE TO API_SMAR;
GRANT SELECT ON PROTPROD.SRA010 TO API_SMAR;
```

Opcional / a avaliar com o domínio de triggers:

```sql
-- Só se a política for adaptar SF_EMP_CODIGO / sessão SGC para CLIENT_IDENTIFIER
GRANT EXECUTE ON SGC.PCK_WINSGC TO API_SMAR;
```

## Comportamento sem grant

- Gravação via `SIAOS.PCK_CLIENTE.SP_ATUALIZA_DADOS_GERAIS` falha com erro de identificador inválido / privilege.
- Detalhe (`GET` por código): empresa + código; **não** chama `SF_VALIDA_CONS_CLIENTE` (o wizard de CNPJ precisa abrir o cadastro existente, inclusive `BLOQUEADO=7`). Lookup por documento ainda chama essa function. A **listagem** (`COUNT` + linhas) **não** chama essa function.
- A aplicação mapeia esses erros para resposta clara na API; não contorna com SQL paralelo de escrita.

## Pós-insert EMP_CODIGO

Trigger `TG_B_IU_CLIENTE` (INSERT) define `:NEW.EMP_CODIGO := SGC.PCK_WINSGC.SF_EMP_CODIGO`. Com conta técnica, o valor pode não ser o **owner emp** do ator (fábrica `5/7/15/116` ou pool `1`). O repositório Smarnet faz `UPDATE SIAOS.CLIENTE SET EMP_CODIGO = :owner` após o insert e revalida.

Ver também: [ADR 0004](../adr/0004-oracle-client-identifier.md).
