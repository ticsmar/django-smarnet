-- Create table
create table SIAOS.USUARIO
(
  usu_chapa    NUMBER(5) not null,
  usu_login    VARCHAR2(20),
  usu_nome     VARCHAR2(60),
  usu_sigla    VARCHAR2(3),
  usu_loginweb VARCHAR2(20),
  uem_codigo   NUMBER(4),
  dep_codigo   NUMBER(6),
  usu_email    VARCHAR2(50),
  cc_codigo    VARCHAR2(10),
  usu_status   NUMBER(1),
  codigo       CHAR(3),
  origem       CHAR(2),
  pes_numero   NUMBER,
  emp_codigo   NUMBER(11) default 1,
  fus_codigo   INTEGER default 1,
  lin_cod      NUMBER(6) default 1,
  lpr_codigo   INTEGER,
  usu_token    NUMBER(1) default 0 not null
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
comment on column SIAOS.USUARIO.usu_chapa
  is 'Chapa do usuário';
comment on column SIAOS.USUARIO.usu_login
  is 'Login do usuário';
comment on column SIAOS.USUARIO.usu_nome
  is 'Nome do usuário';
comment on column SIAOS.USUARIO.usu_sigla
  is 'Sigla do usuário sistema liberação de produtos';
comment on column SIAOS.USUARIO.usu_loginweb
  is 'Login WEB do usuário';
comment on column SIAOS.USUARIO.uem_codigo
  is 'Codigo da Unidade da Empresa.';
comment on column SIAOS.USUARIO.dep_codigo
  is 'Codigo do Centro de Custo do Departamento. Numerico.';
comment on column SIAOS.USUARIO.usu_email
  is 'E-mail do usuário';
comment on column SIAOS.USUARIO.cc_codigo
  is 'Codigo do Centro de Custo';
comment on column SIAOS.USUARIO.usu_status
  is 'Apura se usuario esta Ativo ou Inativo.';
comment on column SIAOS.USUARIO.codigo
  is 'Codigo do Responsavel.';
comment on column SIAOS.USUARIO.origem
  is 'Filial do Usuario.';
comment on column SIAOS.USUARIO.pes_numero
  is 'Codigo da Pessoa';
comment on column SIAOS.USUARIO.emp_codigo
  is 'Código da empresa que o usuário pertence.';
comment on column SIAOS.USUARIO.fus_codigo
  is 'Fuso horário do usuário ';
comment on column SIAOS.USUARIO.lin_cod
  is 'Idioma do usuário';
comment on column SIAOS.USUARIO.lpr_codigo
  is 'CODIGO DA LISTA DE PREÇO';
comment on column SIAOS.USUARIO.usu_token
  is 'INFORMA SE USUARIO NECESSITA DE TOKEN (SENHA ELETRONICA VIA SMS)';
-- Create/Recreate indexes 
create index SIAOS.IDX_USUARIO#DEP_CODIGO on SIAOS.USUARIO (DEP_CODIGO)
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
create index SIAOS.IDX_USUARIO#NOME on SIAOS.USUARIO (USU_NOME)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 280K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index SIAOS.IDX_USUARIO#UEM_CODIGO on SIAOS.USUARIO (UEM_CODIGO)
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
create index SIAOS.IDX_USUARIO#USU_LOGINWEB on SIAOS.USUARIO (UPPER(USU_LOGINWEB))
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
create index SIAOS.IDX_USUARIO#4 on SIAOS.USUARIO (CC_CODIGO)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 80K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Create/Recreate primary, unique and foreign key constraints 
alter table SIAOS.USUARIO
  add constraint PK_USUARIO primary key (USU_CHAPA)
  using index 
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 80K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SIAOS.USUARIO
  add constraint FK_CENTRO_CUSTO#USUARIO foreign key (CC_CODIGO)
  references SIAOS.CENTRO_CUSTO (CC_CODIGO);
alter table SIAOS.USUARIO
  add constraint FK_EMPRESA#USUARIO foreign key (EMP_CODIGO)
  references GERAL.EMPRESA (EMP_CODIGO);
alter table SIAOS.USUARIO
  add constraint FK_LISTA_PRECO#USUARIO foreign key (LPR_CODIGO)
  references SIAOS.LISTA_PRECO (LPR_CODIGO);
alter table SIAOS.USUARIO
  add constraint FK_PESSOA#USUARIO foreign key (PES_NUMERO)
  references SIAOS.PESSOA (PES_NUMERO)
  disable
  novalidate;
-- Create/Recreate check constraints 
alter table SIAOS.USUARIO
  add constraint CK_USUARIO#EMP_CODIGO
  check ("EMP_CODIGO" IS NOT NULL);
-- Grant/Revoke object privileges 
grant select on SIAOS.USUARIO to RL_API_SMAR;
grant select, insert, update, delete on SIAOS.USUARIO to USUARIO_SMAR;
