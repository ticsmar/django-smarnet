-- SIAOS.FOLLOW_CLIENTE — notas livres de follow-up no cadastro de Cliente (legado post-it).
-- Tabela já existe. Não executar CREATE em produção.
-- Escrita: SIAOS.SP_UPDATE_FOLLOWUP(..., 'Clientes', texto, 'L').

create table SIAOS.FOLLOW_CLIENTE
(
  codigo        NUMBER(5) not null,
  fcl_descricao LONG
)
tablespace SIAOSNET
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 440K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SIAOS.FOLLOW_CLIENTE
  add constraint PK_FOLLOW_CLIENTE primary key (CODIGO)
  using index
  tablespace SIAOSNET;
alter table SIAOS.FOLLOW_CLIENTE
  add constraint FK_CLIENTE#FOLLOW foreign key (CODIGO)
  references SIAOS.CLIENTE (CODIGO);
grant select, insert, update, delete on SIAOS.FOLLOW_CLIENTE to USUARIO_SMAR;
