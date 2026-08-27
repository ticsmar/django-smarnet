-- SMARNET.LEGENDA_TEXTO — descrição da legenda por língua.
-- Tabela já existe. Não executar CREATE em produção.
-- Grant API: SELECT ON SMARNET.LEGENDA_TEXTO TO API_SMAR.

-- Create table
create table SMARNET.LEGENDA_TEXTO
(
  leg_codigo    INTEGER,
  lin_cod       NUMBER(6),
  lte_descricao VARCHAR2(4000)
)
tablespace GERAL
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the columns
comment on column SMARNET.LEGENDA_TEXTO.leg_codigo
  is 'Código da legenda - tabela SMARNET.LEGENDA';
comment on column SMARNET.LEGENDA_TEXTO.lin_cod
  is 'Código da lingua - tabela SIAOS.LINGUA';
comment on column SMARNET.LEGENDA_TEXTO.lte_descricao
  is 'Descrição da legenda';
-- Create/Recreate indexes
create index SMARNET.IDX_LEGENDA_TEXTO#LIN_COD on SMARNET.LEGENDA_TEXTO (LIN_COD)
  tablespace GERAL
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
-- Create/Recreate primary, unique and foreign key constraints
alter table SMARNET.LEGENDA_TEXTO
  add constraint PK_LEGENDA_TEXTO primary key (LEG_CODIGO, LIN_COD)
  using index
  tablespace GERAL
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
alter table SMARNET.LEGENDA_TEXTO
  add constraint FK_LEGENDA#LEGENDA_TEXTO foreign key (LEG_CODIGO)
  references SMARNET.LEGENDA (LEG_CODIGO);
alter table SMARNET.LEGENDA_TEXTO
  add constraint FK_LINGUA#LEGENDA_TEXTO foreign key (LIN_COD)
  references SIAOS.LINGUA (LIN_COD);
-- Create/Recreate check constraints
alter table SMARNET.LEGENDA_TEXTO
  add constraint CK_LEGENDA_TEXTO#LEG_CODIGO
  check (LEG_CODIGO IS NOT NULL);
alter table SMARNET.LEGENDA_TEXTO
  add constraint CK_LEGENDA_TEXTO#LIN_COD
  check (LIN_COD IS NOT NULL);
-- Grant/Revoke object privileges
grant select, insert, update on SMARNET.LEGENDA_TEXTO to USUARIO_SMAR;
grant select on SMARNET.LEGENDA_TEXTO to API_SMAR;
