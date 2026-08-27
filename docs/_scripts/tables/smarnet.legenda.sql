-- SMARNET.LEGENDA — código de i18n (texto em LEGENDA_TEXTO).
-- Tabela já existe. Não executar CREATE em produção.
-- Grant API: SELECT ON SMARNET.LEGENDA TO API_SMAR.

-- Create table
create table SMARNET.LEGENDA
(
  leg_codigo INTEGER
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
comment on column SMARNET.LEGENDA.leg_codigo
  is 'Código da legenda';
-- Create/Recreate primary, unique and foreign key constraints
alter table SMARNET.LEGENDA
  add constraint PK_LEGENDA primary key (LEG_CODIGO)
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
-- Create/Recreate check constraints
alter table SMARNET.LEGENDA
  add constraint CK_LEGENDA#LEG_CODIGO
  check (LEG_CODIGO IS NOT NULL);
grant select on SMARNET.LEGENDA to API_SMAR;
