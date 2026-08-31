-- SMARNET.ACESSO_FUNC — chapa × ACE_CODIGO (quem pode a tela no 3.01).
-- Tabela já existe. Não executar CREATE em produção.
-- Grant API: SELECT ON SMARNET.ACESSO_FUNC TO API_SMAR.

-- Create table
create table SMARNET.ACESSO_FUNC
(
  ace_codigo INTEGER not null,
  usu_chapa  NUMBER(5) not null,
  afu_resp   NUMBER(5),
  afu_grant  CHAR(1) default 'N'
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
-- Create/Recreate indexes
create index SMARNET.ID_ACESSO_FUNC#ACE_CODIGO on SMARNET.ACESSO_FUNC (ACE_CODIGO)
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
create index SMARNET.ID_ACESSO_FUNC#USU_CHAPA on SMARNET.ACESSO_FUNC (USU_CHAPA)
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
alter table SMARNET.ACESSO_FUNC
  add constraint PK_ACESSO_FUNC primary key (ACE_CODIGO, USU_CHAPA)
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
alter table SMARNET.ACESSO_FUNC
  add constraint FK_USUARIO#ACESSO_FUNC foreign key (USU_CHAPA)
  references SIAOS.USUARIO (USU_CHAPA) on delete cascade;
alter table SMARNET.ACESSO_FUNC
  add constraint FK_USUARIO#ACESSO_FUNC2 foreign key (AFU_RESP)
  references SIAOS.USUARIO (USU_CHAPA) on delete cascade;
-- Grant/Revoke object privileges
grant select, delete on SMARNET.ACESSO_FUNC to USUARIO_SMAR;
grant select on SMARNET.ACESSO_FUNC to API_SMAR;
