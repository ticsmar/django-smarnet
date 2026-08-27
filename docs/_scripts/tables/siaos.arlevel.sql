-- SIAOS.ARLEVEL — catálogo de Vendedor Área (CLIENTE.TERRITORIO = TERR_KEY).
-- Grant API: SELECT ON SIAOS.ARLEVEL TO API_SMAR.

-- Create table
create table SIAOS.ARLEVEL
(
  terr_key    CHAR(2) not null,
  description CHAR(30),
  arl_ativo   NUMBER(1) default 1 not null
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
-- Create/Recreate primary, unique and foreign key constraints
alter table SIAOS.ARLEVEL
  add constraint PK_ARLEVEL primary key (TERR_KEY)
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
-- Grant/Revoke object privileges
grant select, insert, update, delete on SIAOS.ARLEVEL to USUARIO_SMAR;
grant select on SIAOS.ARLEVEL to API_SMAR;
