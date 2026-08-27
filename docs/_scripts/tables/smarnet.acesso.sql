-- SMARNET.ACESSO — catálogo de telas/recursos do 3.01 (ACE_CODIGO).
-- Tabela já existe. Não executar CREATE em produção.
-- PHP valida_acesso($login,$senha,370) no cad_bloqueio.php.
-- Grant API: SELECT ON SMARNET.ACESSO TO API_SMAR.

-- Create table
create table SMARNET.ACESSO
(
  ace_codigo           NUMBER not null,
  ace_nome             VARCHAR2(50),
  ace_resp             NUMBER(5),
  ace_descricao        VARCHAR2(2000),
  ace_resp_informatica NUMBER(5),
  ace_grant            CHAR(1) default 'N',
  pro_codigo           INTEGER
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
-- Create/Recreate primary, unique and foreign key constraints
alter table SMARNET.ACESSO
  add constraint PK_ACESSO primary key (ACE_CODIGO)
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
alter table SMARNET.ACESSO
  add constraint FK_PROJETO#ACESSO foreign key (PRO_CODIGO)
  references HELPDESK.PROJETO (PRO_CODIGO);
alter table SMARNET.ACESSO
  add constraint FK_USUARIO#ACESSO_1 foreign key (ACE_RESP)
  references SIAOS.USUARIO (USU_CHAPA);
alter table SMARNET.ACESSO
  add constraint FK_USUARIO#ACESSO_2 foreign key (ACE_RESP_INFORMATICA)
  references SIAOS.USUARIO (USU_CHAPA);
-- Grant/Revoke object privileges
grant select on SMARNET.ACESSO to USUARIO_SMAR;
grant select on SMARNET.ACESSO to API_SMAR;
