# Grants Oracle — Clientes (`API_SMAR`)

Inventário para DBA habilitar o cadastro de Clientes no Smarnet (alias Django `smar` / usuário `API_SMAR`). Writes de negócio vão via `EXECUTE` em `SIAOS.PCK_CLIENTE` (DEFINER). A API precisa de **SELECT** para listar catálogos e abas. Não copiar o `ajax.php?op=5` (UPDATE dinâmico de limite).

## Já aplicados (2026-08-19)

Seleção histórica + ondas 1–5 + lookup/risco/Copiar p/ Novo + `PCK_WINSGC` + extras de `op=estCli` (não usados pela tela migrada).

```sql
-- Histórico (já observados antes desta data)
-- SELECT / INSERT / UPDATE / DELETE em SIAOS.CLIENTE
-- SELECT em SIAOS.ORIGEM, SIAOS.COBRANCA
-- EXECUTE em SIAOS.PCK_DQANET, SIAOS.PCK_CLIENTE
-- SELECT em PROTPROD.SRA010 (wizard Funcionário)
-- CRUD/SELECT em GERAL.EMPRESA, GERAL.ESTADO, GERAL.PAIS (conforme ambiente)

GRANT EXECUTE ON SIAOS.PCK_CLIENTE TO DJANGO_API, API_SMAR;

-- Onda 1 — Dados Gerais + lookups (ajax.php op 1–4)
GRANT SELECT ON PROTPROD.CC2010 TO API_SMAR;
GRANT SELECT ON PROTPROD.SF7010 TO API_SMAR;
GRANT SELECT ON SIAOS.AREA_OS TO API_SMAR;
GRANT SELECT ON SIAOS.USUARIO TO API_SMAR;
GRANT SELECT ON SIAOS.ARCLASS TO API_SMAR;
GRANT SELECT ON SIAOS.ARSVIA2 TO API_SMAR;
GRANT SELECT ON SIAOS.ARLEVEL TO API_SMAR;
GRANT SELECT ON SIAOS.ARSALESP TO API_SMAR;
GRANT SELECT ON SIAOS.MODELO_PAGT TO API_SMAR;
GRANT SELECT ON SIAOS.MODELO_RISCO TO API_SMAR;
GRANT SELECT ON PROTPROD.SYA010 TO API_SMAR;
GRANT SELECT ON SIAOS.COUNTRIES TO API_SMAR;
GRANT SELECT ON GERAL.PAIS TO API_SMAR;

-- Ondas 2–4 — Financeiro, filhos, log
GRANT SELECT ON SIAOS.CONTATOS TO API_SMAR;
GRANT SELECT ON SIAOS.EMBARQUE TO API_SMAR;
GRANT SELECT ON SIAOS.LOG_CLIENTE TO API_SMAR;
GRANT SELECT ON SIAOS.FORMA_PAG TO API_SMAR;
GRANT SELECT ON SIAOS.MODELO_PAGT_IT TO API_SMAR;
GRANT SELECT ON SIAOS.VW_PAGTO_DIAS TO API_SMAR;

-- Onda 5 — Arquivos (leitura da view/modelos; DML do gerenciador em grants-oracle-arquivos.md)
GRANT SELECT ON SIAOS.VW_ARQUIVOS TO API_SMAR;
GRANT SELECT ON SIAOS.PROP_ARQ_MOD TO API_SMAR;

-- Fora do cadastro migrado (legado op=estCli). Concedidos; a tela Novo não chama.
GRANT EXECUTE ON SIAOS.PCK_SMART_SALES3 TO API_SMAR;
GRANT SELECT ON SIAOS.OEHDR TO API_SMAR;
GRANT SELECT ON SIAOS.OELIN TO API_SMAR;
GRANT SELECT ON GERAL.CALENDARIO TO API_SMAR;

-- Lookup documento, nota de risco, Copiar p/ Novo
GRANT EXECUTE ON SIAOS.SF_VALIDA_CONS_CLIENTE TO API_SMAR;
GRANT SELECT ON INTEGRACAO.CLIENTE_RISCO TO API_SMAR;
GRANT EXECUTE ON INTEGRACAO.SP_FUNC2CLIENTE TO API_SMAR;

-- Status/bloqueio (cad_bloqueio.php; ACE_CODIGO 370 no 3.01 → change_clienterisco no Novo)
GRANT SELECT ON SMARNET.ACESSO TO API_SMAR;
GRANT SELECT ON SMARNET.ACESSO_FUNC TO API_SMAR;

-- EMP_CODIGO na sessão SGC (SF_EMP_CODIGO / CLIENT_IDENTIFIER)
GRANT EXECUTE ON SGC.PCK_WINSGC TO API_SMAR;
```

`GERAL.ESTADO.EST_SIGLA` já entra no SELECT de estados (mesmo grant de `GERAL.ESTADO`). O combo de país da tela usa `GERAL.PAIS` (`SYA010` / `COUNTRIES` são redundantes para o Novo).

`EXECUTE` em `PCK_CLIENTE` cobre `SP_ATUALIZA_DADOS_FINAN`, `SP_ATUALIZA_CONTATO`, `SP_UPDATE_CONTATO_CLIENTE`, `SP_ATUALIZA_COBRANCA2`, `SP_ATUALIZA_EMBARQUE2`, `SP_ATUALIZA_OBS`, `SF_CHECA_EMBARQ_*`, `SF_CHECA_COBRAN_*`.

Padrão de cobrança / embarque (`CLIENTE.COBRANCA` / `ENTREGA`) e `CLI_GRUPO_TRIB` usam `UPDATE` em `SIAOS.CLIENTE` (DML já observado).

Não conceder `INSERT` em `LOG_CLIENTE` à API — as triggers `TG_B_IU_EMBARQUE` / `TG_B_IU_COBRANCA` gravam como SIAOS.

## Não portar

- `ajax.php?op=5` (UPDATE genérico `SET $campo = $limite`)
- `op=estCli` (`PCK_SMART_SALES3` / `OEHDR` / `OELIN` / `CALENDARIO`) — grants existem; a aplicação não usa

## Comportamento sem grant

- Gravação via `SIAOS.PCK_CLIENTE.SP_ATUALIZA_DADOS_GERAIS` falha com erro de identificador inválido / privilege.
- Detalhe (`GET` por código): empresa + código; **não** chama `SF_VALIDA_CONS_CLIENTE` (o wizard de CNPJ precisa abrir o cadastro existente, inclusive `BLOQUEADO=2`). Lookup por documento ainda chama essa function. A **listagem** (`COUNT` + linhas) **não** chama essa function.
- Cidades IBGE / grupo tributário / área OS / segmento / vendedor área / vendedor: catálogo vazio ou 502 se faltar `SELECT` em `CC2010` / `SF7010` / `AREA_OS` / `ARCLASS` / `ARLEVEL` / `ARSALESP`.
- A aplicação mapeia esses erros para resposta clara na API; não contorna com SQL paralelo de escrita.

## Pós-insert EMP_CODIGO

Trigger `TG_B_IU_CLIENTE` (INSERT) define `:NEW.EMP_CODIGO := SGC.PCK_WINSGC.SF_EMP_CODIGO`. Com conta técnica, o valor pode não ser o **owner emp** do ator (fábrica `5/7/15/116` ou pool `1`). O repositório Smarnet faz `UPDATE SIAOS.CLIENTE SET EMP_CODIGO = :owner` após o insert e revalida.

Ver também: [ADR 0004](../adr/0004-oracle-client-identifier.md).

## Identidade do operador (`PCK_DQANET`)

Não existe `SIAOS.PCK_SMARNET` neste banco. Login da sessão (PHP `USER` ou Smarnet `CLIENT_IDENTIFIER`) está em `SIAOS.PCK_DQANET.SF_PES_NUMERO_USER` e `SF_USU_CHAPA_USER`. As triggers `TG_B_IU_EMBARQUE`, `TG_B_IU_COBRANCA` e `TG_B_IU_CLIENTE` devem gravar `LOG_CLIENTE.USU_CHAPA` (e `CLIENTE.USUARIO`) via `SF_USU_CHAPA_USER`. Critério das três functions: [`refatoracao-smarnet-novo.md`](../developers/refatoracao-smarnet-novo.md).

**LIVE (ago/2026):** se `SF_USU_CHAPA_USER` não vê `CLIENT_IDENTIFIER`, a function antiga devolve chapa **7** (operador PHP, no log aparece outra pessoa). `USER` na API é `API_SMAR`. Recompilar `PCK_DQANET.pck` (não devolver 7 para `API_SMAR`) e as três triggers `.trg`.

Compilar **como SIAOS/DBA** (arquivos em `docs/_scripts/` são cópia de leitura; a API `API_SMAR` não substitui package):

1. [`PCK_DQANET.pck`](../_scripts/packages/PCK_DQANET.pck) — `SF_USU_CHAPA_USER` não pode devolver chapa `7` para `API_SMAR` (vira o operador errado no log).
2. [`TG_B_IU_EMBARQUE.trg`](../_scripts/triggers/TG_B_IU_EMBARQUE.trg)
3. [`TG_B_IU_COBRANCA.trg`](../_scripts/triggers/TG_B_IU_COBRANCA.trg)
4. [`TG_B_IU_CLIENTE.trg`](../_scripts/triggers/TG_B_IU_CLIENTE.trg)

Conferir:

```sql
BEGIN
  DBMS_SESSION.SET_IDENTIFIER('loginweb_do_operador');
END;
/

SELECT SYS_CONTEXT('USERENV','SESSION_USER') AS sess,
       SYS_CONTEXT('USERENV','CLIENT_IDENTIFIER') AS ident,
       SIAOS.PCK_DQANET.SF_PES_NUMERO_USER AS pes,
       SIAOS.PCK_DQANET.SF_USU_CHAPA_USER AS chapa
  FROM DUAL;
```

`sess` continua `API_SMAR`; `chapa` deve ser a do operador, não `7` nem vazia.

## Probe rápido (Onda 1)

```sql
SELECT COUNT(*) FROM PROTPROD.CC2010 WHERE D_E_L_E_T_ = ' ' AND ROWNUM = 1;
SELECT COUNT(*) FROM PROTPROD.SF7010 WHERE D_E_L_E_T_ = ' ' AND ROWNUM = 1;
SELECT COUNT(*) FROM SIAOS.AREA_OS WHERE AOS_TIPO_AREA = 'C' AND ROWNUM = 1;
SELECT EST_CODIGO, EST_SIGLA FROM GERAL.ESTADO WHERE PAI_CODIGO = 76 AND ROWNUM <= 3;
```
