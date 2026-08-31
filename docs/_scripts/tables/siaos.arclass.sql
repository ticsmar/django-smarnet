-- SIAOS.ARCLASS — catálogo de Segmento (CLIENTE.CLASSE = CLASS_KEY).
-- Grant API: SELECT ON SIAOS.ARCLASS TO API_SMAR.

-- Create table
create table SIAOS.ARCLASS
(
  class_key        CHAR(5) not null,
  descr            CHAR(30),
  tecnico          CHAR(5),
  comercial        CHAR(5),
  descr_ingles     VARCHAR2(30),
  class_ativo      NUMBER(1),
  descr_det_port   VARCHAR2(2000),
  descr_det_ingles VARCHAR2(2000),
  grs_codigo       NUMBER
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
comment on table SIAOS.ARCLASS
  is 'Tabela de Segmentos';
-- Add comments to the columns
comment on column SIAOS.ARCLASS.class_key
  is 'Código do segmento';
comment on column SIAOS.ARCLASS.descr
  is 'Descrição do segmento em português ';
comment on column SIAOS.ARCLASS.tecnico
  is 'Responsável técnico pelo segmento';
comment on column SIAOS.ARCLASS.comercial
  is 'Responsável comercial pelo segmento';
comment on column SIAOS.ARCLASS.descr_ingles
  is 'Descrição do Segmento em Inglês.';
comment on column SIAOS.ARCLASS.class_ativo
  is '1 - Ativo / 0 - Inativo.';
comment on column SIAOS.ARCLASS.descr_det_port
  is 'Descrição detalhada do Segmento em Português.';
comment on column SIAOS.ARCLASS.descr_det_ingles
  is 'Descrição detalhada do Segmento em Inglês';
comment on column SIAOS.ARCLASS.grs_codigo
  is 'Código do Grupo do Segmento';
-- Create/Recreate primary, unique and foreign key constraints
alter table SIAOS.ARCLASS
  add primary key (CLASS_KEY)
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
grant select, insert, update, delete on SIAOS.ARCLASS to USUARIO_SMAR;
grant select on SIAOS.ARCLASS to API_SMAR;
