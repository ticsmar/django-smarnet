-- Create table
create table SIAOS.EMBARQUE
(
  codigo         NUMBER(5),
  chave_emb      CHAR(9),
  nome           CHAR(60),
  endereco1      CHAR(60),
  endereco2      CHAR(60),
  endereco3      CHAR(60),
  cidade         CHAR(25),
  estado         CHAR(2),
  cep            CHAR(9),
  pais           CHAR(3),
  contato        CHAR(30),
  telefone1      CHAR(20),
  telefone2      CHAR(20),
  reduzido       CHAR(18),
  e_mail         CHAR(60),
  ativo          NUMBER(1) default 1,
  emb_bairro     VARCHAR2(60),
  cli_codigo_ref NUMBER(5)
)
tablespace NOVASMAR
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 5M
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the columns
comment on column SIAOS.EMBARQUE.endereco1
  is '1a. Linha Endereco de Embarque';
comment on column SIAOS.EMBARQUE.endereco2
  is '2a. Linha Endereco de Embarque';
comment on column SIAOS.EMBARQUE.endereco3
  is '3a. Linha Endereco de Embarque';
comment on column SIAOS.EMBARQUE.ativo
  is 'Apura se o embarque esta ativo. 0 - Inativo, 1 - Ativo';
comment on column SIAOS.EMBARQUE.cli_codigo_ref
  is 'CODIGO DO CLIENTE DE REFERENCIA';
-- Create/Recreate primary, unique and foreign key constraints
alter table SIAOS.EMBARQUE
  add primary key (CODIGO, CHAVE_EMB)
  using index
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 440K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Create/Recreate check constraints
alter table SIAOS.EMBARQUE
  add constraint CK_EMBARQUE#ATIVO
  check (ATIVO IN (0,1));
alter table SIAOS.EMBARQUE
  add constraint CK_EMBARQUE#CHAVE_EMB
  check (CHAVE_EMB IS NOT NULL);
alter table SIAOS.EMBARQUE
  add constraint CK_EMBARQUE#CODIGO
  check (CODIGO IS NOT NULL);
alter table SIAOS.EMBARQUE
  add constraint NN_EMBARQUE#ATIVO
  check (ATIVO IS NOT NULL);
-- Grant/Revoke object privileges
grant select, insert, update, delete, alter on SIAOS.EMBARQUE to USUARIO_SMAR;
