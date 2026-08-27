-- SIAOS.CONTATOS — contatos do cliente. Cópia de leitura das colunas
-- usadas por dqanet/_src/php/classes/comercial/contato.php e PCK_CLIENTE.SP_ATUALIZA_CONTATO.
-- Grant: SELECT ON SIAOS.CONTATOS TO API_SMAR.

-- Create table
create table SIAOS.CONTATOS
(
  con_codigo  NUMBER not null,
  codcliente  NUMBER(5),
  nome        VARCHAR2(60),
  depto       VARCHAR2(40),
  cargo       VARCHAR2(40),
  telefone    VARCHAR2(20),
  fax         VARCHAR2(20),
  celular     VARCHAR2(20),
  email       VARCHAR2(80),
  con_ativo   NUMBER(1) default 1
);

comment on column SIAOS.CONTATOS.codcliente is 'FK SIAOS.CLIENTE.CODIGO';
comment on column SIAOS.CONTATOS.con_ativo is '1 ativo, 0 inativo';

alter table SIAOS.CONTATOS
  add primary key (CON_CODIGO);
