-- Create table
create table SIAOS.COBRANCA
(
  codigo         NUMBER(5) not null,
  chavecobra     CHAR(9) not null,
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
  cob_bairro     VARCHAR2(60),
  cli_codigo_ref NUMBER(5),
  ativo          NUMBER(1)
)
tablespace NOVASMAR
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 3440K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the columns
comment on column SIAOS.COBRANCA.endereco1
  is '1a. Linha Endereco de Cobranca';
comment on column SIAOS.COBRANCA.endereco2
  is '2a. Linha Endereco de Cobranca';
comment on column SIAOS.COBRANCA.endereco3
  is '3a. Linha Endereco de Cobranca';
comment on column SIAOS.COBRANCA.cli_codigo_ref
  is 'CODIGO DO CLIENTE DE REFERENCIA';
comment on column SIAOS.COBRANCA.ativo
  is 'Apura se A COBRANCA esta ativo. 0 - Inativo, 1 - Ativo';
-- Create/Recreate primary, unique and foreign key constraints
alter table SIAOS.COBRANCA
  add primary key (CODIGO, CHAVECOBRA)
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
-- Grant/Revoke object privileges
grant select, insert, update, delete, alter on SIAOS.COBRANCA to USUARIO_SMAR;
