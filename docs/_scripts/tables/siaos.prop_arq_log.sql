-- SIAOS.PROP_ARQ_LOG — histórico do Gerenciador (PAL_SISTEMA + PAL_FILTRO).
-- Tabela já existe. Não executar CREATE em produção.
-- Grant API: SELECT, INSERT ON SIAOS.PROP_ARQ_LOG TO API_SMAR.

-- Create table
create table SIAOS.PROP_ARQ_LOG
(
  par_codigo  INTEGER not null,
  pal_data    DATE not null,
  pal_nome    VARCHAR2(300) not null,
  usu_chapa   NUMBER(5),
  pal_acao    VARCHAR2(10) not null,
  pal_sistema INTEGER,
  pal_filtro  VARCHAR2(100)
)
tablespace NOVASMAR
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 280K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the columns
comment on column SIAOS.PROP_ARQ_LOG.par_codigo
  is 'CODIGO DO ARQUIVO';
comment on column SIAOS.PROP_ARQ_LOG.pal_data
  is 'DATA DO LOG';
comment on column SIAOS.PROP_ARQ_LOG.pal_nome
  is 'NOME DO ARQUIVO';
comment on column SIAOS.PROP_ARQ_LOG.usu_chapa
  is 'CHAPA DO USUARIO';
comment on column SIAOS.PROP_ARQ_LOG.pal_acao
  is 'ACAO REALIZADA';
comment on column SIAOS.PROP_ARQ_LOG.pal_sistema
  is 'SITEMA DO LOG';
comment on column SIAOS.PROP_ARQ_LOG.pal_filtro
  is 'FILTRO DO LOG';
-- Create/Recreate indexes
create index SIAOS.IDX_PROP_ARQ_LOG on SIAOS.PROP_ARQ_LOG (PAL_SISTEMA, PAL_FILTRO)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index SIAOS.IDX_PROP_ARQ_LOG2 on SIAOS.PROP_ARQ_LOG (PAR_CODIGO)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Grant/Revoke object privileges
grant select, insert, update, delete on SIAOS.PROP_ARQ_LOG to USUARIO_SMAR;
grant select, insert on SIAOS.PROP_ARQ_LOG to API_SMAR;
