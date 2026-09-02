# Grants Oracle — Follow-up / Recado (`API_SMAR`)

Inventário para DBA habilitar o módulo compartilhado de follow-up (alias Django `smar` / usuário `API_SMAR`). Escrita de recados estruturados via `SIAOS.PCK_SMART_SALES3.SP_GRAVA_FOLLOWUP`. `FOLLOW_CLIENTE` / `SP_UPDATE_FOLLOWUP` são o follow-up **específico** do Cliente, **descontinuado na UI**; os grants abaixo permanecem só enquanto a API `/cliente-notes/` existir. Ver [`developers/followup.md`](../developers/followup.md).

Tabelas **já existem**. Não executar `CREATE TABLE` em produção. Scripts de leitura (referência): `docs/_scripts/tables/siaos.prop_recado.sql`, `siaos.tipo_recado.sql`, `siaos.motivo.sql`, `siaos.follow_cliente.sql`.

## Análise legado → objetos Oracle

| Objeto | Uso no 3.01 | Operação API v1 |
|--------|-------------|-----------------|
| `SIAOS.PROP_RECADO` | `recadoHistAjax.php`, `alarmeFollowup` | `SELECT` (lista, status, detalhe) |
| `SIAOS.TIPO_RECADO` | combo Referência em `recado.php` | `SELECT` |
| `SIAOS.MOTIVO` | motivo de cancelamento (`TRE_TIPO_CANC`) | `SELECT` |
| `SIAOS.USUARIO` | nome do autor | `SELECT` (já concedido — clientes) |
| `SIAOS.PCK_SMART_SALES3` | `SP_GRAVA_FOLLOWUP` em `recadoGravaAjax.php` | `EXECUTE` (já concedido — clientes) |
| `SIAOS.FOLLOW_CLIENTE` | `abre_followup` / post-it cliente | `SELECT` |
| `SIAOS.SP_UPDATE_FOLLOWUP` | append notas em `postit_grava.php` (op `L`/`CLI`) | `EXECUTE` |

Triggers `TG_B_I_PROP_RECADO` / `TG_B_U_PROP_RECADO` e `PCK_PENDENCIA` rodam como **SIAOS** no insert/update — a API não precisa de grant direto.

Escopo v1: host **Cliente** (`PRE_SISTEMA=117`). Proposta (`121`) permanece no PHP 3.01.

## Obrigatórios v1 (DBA aplicar)

Arquivo aplicável: [`docs/_scripts/grants/grants-oracle-followup-api_smar.sql`](../_scripts/grants/grants-oracle-followup-api_smar.sql)

```sql
-- Leitura — recados estruturados
GRANT SELECT ON SIAOS.PROP_RECADO TO API_SMAR;
GRANT SELECT ON SIAOS.TIPO_RECADO TO API_SMAR;
GRANT SELECT ON SIAOS.MOTIVO TO API_SMAR;

-- Leitura — notas legado Cliente (FOLLOW_CLIENTE)
GRANT SELECT ON SIAOS.FOLLOW_CLIENTE TO API_SMAR;

-- Escrita — notas legado (append via procedure; não DML direto na tabela)
GRANT EXECUTE ON SIAOS.SP_UPDATE_FOLLOWUP TO API_SMAR;
```

## Já concedidos (manter)

```sql
-- Clientes — onda 5 e anteriores (grants-oracle-clientes.md)
GRANT EXECUTE ON SIAOS.PCK_SMART_SALES3 TO API_SMAR;
GRANT SELECT ON SIAOS.USUARIO TO API_SMAR;
```

`SP_GRAVA_FOLLOWUP` grava como owner do package (`SIAOS`). A API **não** precisa de `INSERT`/`UPDATE`/`DELETE` direto em `PROP_RECADO` se todos os writes passarem pelo `callproc`.

Rótulos de tipos e motivos vêm de `TRE_DESCRICAO` / `MOT_DESCRICAO` — **sem** `SMARNET.LEGENDA_TEXTO` no follow-up v1.

## Não conceder na v1

- `INSERT` / `UPDATE` / `DELETE` direto em `SIAOS.PROP_RECADO` (usar package)
- `INSERT` / `UPDATE` / `DELETE` direto em `SIAOS.FOLLOW_CLIENTE` (usar `SP_UPDATE_FOLLOWUP`)
- `ALTER` em objetos SIAOS
- `EXECUTE` em `PCK_PENDENCIA` (só triggers)
- Host Proposta (`121`): `SP_CANCELA_PROPOSTA`, `UPDATE` em `PROPOSTA` — fora do escopo v1

## Comportamento sem grant

| Falta | Sintoma |
|-------|---------|
| `SELECT` em `PROP_RECADO` / `TIPO_RECADO` / `MOTIVO` | 502 na listagem / modal vazio |
| `EXECUTE` em `PCK_SMART_SALES3` | falha ao gravar recado (já deveria quebrar em outros fluxos) |
| `SELECT` em `FOLLOW_CLIENTE` | API `/cliente-notes/` 502 (a UI não usa mais esta aba) |
| `EXECUTE` em `SP_UPDATE_FOLLOWUP` | falha ao append de nota legado |

## Probe rápido

```sql
SELECT COUNT(*) FROM SIAOS.PROP_RECADO WHERE ROWNUM = 1;
SELECT COUNT(*) FROM SIAOS.TIPO_RECADO WHERE TRE_ATIVO = 1 AND TRE_SISTEMA = '117' AND ROWNUM = 1;
SELECT COUNT(*) FROM SIAOS.MOTIVO WHERE ROWNUM = 1;
SELECT COUNT(*) FROM SIAOS.FOLLOW_CLIENTE WHERE ROWNUM = 1;
```

## Scripts em `docs/_scripts/` (referência)

| Arquivo | Conteúdo |
|---------|----------|
| `tables/siaos.prop_recado.sql` | DDL + índices + FKs (dump legado) |
| `tables/siaos.tipo_recado.sql` | DDL tipos de recado |
| `tables/siaos.motivo.sql` | DDL motivos |
| `tables/siaos.follow_cliente.sql` | Notas legado — DDL canônico (`CODIGO` PK/FK `CLIENTE`, `FCL_DESCRICAO` LONG) |
| `triggers/siaos.TG_B_I_PROP_RECADO.trg` | PK + `PRE_DATA` + default `PRE_SISTEMA` |
| `triggers/siaos.TG_B_U_PROP_RECADO.trg` | baixa de pendência via `PCK_PENDENCIA` |
| `grants/grants-oracle-followup-api_smar.sql` | script DBA v1 |

Dump legado concede DML a `USUARIO_SMAR`, não a `API_SMAR` — por isso os grants acima são necessários.

## Estrutura `SIAOS.FOLLOW_CLIENTE` (DDL canônico)

Script de referência: `docs/_scripts/tables/siaos.follow_cliente.sql`

| Coluna | Tipo | Notas |
|--------|------|-------|
| `CODIGO` | `NUMBER(5)` PK | FK → `SIAOS.CLIENTE.CODIGO` |
| `FCL_DESCRICAO` | `LONG` | texto append-only via `SP_UPDATE_FOLLOWUP` |

```sql
-- Create table
create table SIAOS.FOLLOW_CLIENTE
(
  codigo        NUMBER(5) not null,
  fcl_descricao LONG
)
tablespace SIAOSNET;

alter table SIAOS.FOLLOW_CLIENTE
  add constraint PK_FOLLOW_CLIENTE primary key (CODIGO);

alter table SIAOS.FOLLOW_CLIENTE
  add constraint FK_CLIENTE#FOLLOW foreign key (CODIGO)
  references SIAOS.CLIENTE (CODIGO);

grant select, insert, update, delete on SIAOS.FOLLOW_CLIENTE to USUARIO_SMAR;
```

**Implementação Django:** leitura de coluna `LONG` no Oracle exige cursor dedicado (`cursor.var(OraLONG)` ou fetch como string no repositório). Escrita somente via `SP_UPDATE_FOLLOWUP` (append no legado).
