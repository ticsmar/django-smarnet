-- SIAOS.ARSALESP — catálogo de Vendedor (CLIENTE.VENDEDOR = SALESP_KEY).
-- Grant API: SELECT ON SIAOS.ARSALESP TO API_SMAR.

-- Create table
create table SIAOS.ARSALESP
(
  salesp_key  CHAR(5) not null,
  salesperson CHAR(30) not null,
  filial      CHAR(2),
  origem      CHAR(2),
  status      CHAR(1) default 'A',
  porcomissao NUMBER(12,3),
  asp_status  NUMBER(1) default 1,
  usu_chapa   NUMBER(5),
  bco_codigo  INTEGER default 1 not null,
  asp_tipo    NUMBER(1) default 2,
  cpo_codigo  INTEGER
)
tablespace NOVASMAR
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 40K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table
comment on table SIAOS.ARSALESP
  is 'Tabela de Vendedores das OS''s';
-- Add comments to the columns
comment on column SIAOS.ARSALESP.salesp_key
  is 'Código do vendedor';
comment on column SIAOS.ARSALESP.salesperson
  is 'Nome do Vendedor';
comment on column SIAOS.ARSALESP.filial
  is 'Código da filial';
comment on column SIAOS.ARSALESP.origem
  is 'Código da origem';
comment on column SIAOS.ARSALESP.status
  is 'Status do vendedor A - Ativo / D - Desativo';
comment on column SIAOS.ARSALESP.porcomissao
  is 'Porcentagem de comissão definida para o vendedor.';
comment on column SIAOS.ARSALESP.asp_status
  is 'Status do Vendedor 1- Ativo 0- Inativo.';
comment on column SIAOS.ARSALESP.usu_chapa
  is 'Chapa do responsavel do vendedor';
comment on column SIAOS.ARSALESP.bco_codigo
  is 'Código da Base de comissão';
comment on column SIAOS.ARSALESP.asp_tipo
  is '1- Distribuidor    2- Representante';
-- Create/Recreate primary, unique and foreign key constraints
alter table SIAOS.ARSALESP
  add constraint PK_ARSALESP primary key (SALESP_KEY)
  using index
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 40K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SIAOS.ARSALESP
  add constraint FK_BASE_COMISSAO#ARSALESP foreign key (BCO_CODIGO)
  references SIAOS.BASE_COMISSAO (BCO_CODIGO);
alter table SIAOS.ARSALESP
  add constraint FK_ORIGEM#ARSALESP foreign key (ORIGEM)
  references SIAOS.ORIGEM (ORIGEM);
alter table SIAOS.ARSALESP
  add constraint FK_USUARIO#ARSALESP foreign key (USU_CHAPA)
  references SIAOS.USUARIO (USU_CHAPA);
-- Grant/Revoke object privileges
grant select, insert, update, delete on SIAOS.ARSALESP to USUARIO_SMAR;
grant select on SIAOS.ARSALESP to API_SMAR;
