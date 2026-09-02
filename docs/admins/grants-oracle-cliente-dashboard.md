# Grants Oracle — Dashboard do Cliente (`API_SMAR`)

Inventário para o modal **Dashboard** na listagem de Clientes (`/api/commercial/clientes/<codigo>/dashboard/`). Leitura apenas. Ver [`developers/administracao-clientes.md`](../developers/administracao-clientes.md).

## Já concedidos (cadastro Cliente)

Ver [`grants-oracle-clientes.md`](grants-oracle-clientes.md):

| Objeto | Operação |
|--------|----------|
| `SIAOS.CLIENTE` | `SELECT` |
| `INTEGRACAO.CLIENTE_RISCO` | `SELECT` |
| `SIAOS.OEHDR` | `SELECT` |
| `SIAOS.OELIN` | `SELECT` |
| `SIAOS.ORIGEM` | `SELECT` |
| `SIAOS.PCK_SMART_SALES3` | `EXECUTE` |
| `SIAOS.PCK_DQANET` | `EXECUTE` (`SF_CONVERTE_MOEDA`) |
| `GERAL.CALENDARIO` | `SELECT` |

## Já concedidos — Dashboard (probe `API_SMAR` em 2026-09-02)

```sql
GRANT SELECT ON INTEGRACAO.VW_OSS_PEND TO API_SMAR;
GRANT SELECT ON INTEGRACAO.VW_TITULOS_PEND TO API_SMAR;
GRANT SELECT ON INTEGRACAO.VW_TITULO_NF_SAIDA TO API_SMAR;
GRANT SELECT ON INTEGRACAO.VW_TITULO_INV_SAIDA TO API_SMAR;
GRANT SELECT ON SADIG.VM_PROPOSTA TO API_SMAR;
GRANT SELECT ON SADIG.VM_PROPOSTA_ANTIGA TO API_SMAR;
GRANT SELECT ON PROTPROD.SE1010 TO API_SMAR;
GRANT SELECT ON SIAOS.ACESSO_OS TO API_SMAR;
```

`SADIG.VW_TITULOS_PEND` não existe neste banco; o objeto é `INTEGRACAO.VW_TITULOS_PEND`.

`VW_TITULO_INV_SAIDA` só entra se `SIAOS.CLIENTE.ORIGEM = 'CO'`.

`ACESSO_OS` é opcional (carteira do usuário no 3.01); o Novo não filtra por ela no Dashboard.

## Probe rápido

```sql
SELECT CODIGO, CLI_GRUPO, LIMITECR, CLI_LIMITE_CRV, ORIGEM FROM SIAOS.CLIENTE WHERE CODIGO = 16320;
SELECT COUNT(*) FROM INTEGRACAO.VW_TITULOS_PEND WHERE COD_CLI = LPAD(16320, 6, 0);
SELECT COUNT(*) FROM INTEGRACAO.VW_OSS_PEND WHERE CUST_KEY = 16320;
SELECT COUNT(*) FROM SADIG.VM_PROPOSTA WHERE COD_CLIENTE = '16320' AND ROWNUM = 1;
```

## Comportamento sem grant (outro ambiente)

| Falta | Sintoma |
|-------|---------|
| `SELECT` em `VW_TITULOS_PEND` | aba Títulos pendentes vazia (sem 502) |
| `SELECT` em `VW_OSS_PEND` | aba OSs e antecipações vazia; resumo sem valores a faturar |
| `SELECT` em `VW_TITULO_NF_SAIDA` / `INV` | médias de atraso/antecipação vazias |
| `SELECT` em `SADIG.VM_PROPOSTA*` | gráfico Proposta por ano vazio |
| `SELECT` em `OEHDR` / `OELIN` / `CALENDARIO` | gráficos de faturamento vazios |
| `SELECT` em `OEHDR` / `ORIGEM` | 502 na aba Histórico → OSs |
| `SELECT` em `SE1010` | Histórico → Títulos vazia (sem erro fatal) |
| `SELECT` em `CLIENTE_RISCO` | Crédito sem rótulo de risco |
