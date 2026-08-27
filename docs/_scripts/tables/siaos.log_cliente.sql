-- SIAOS.LOG_CLIENTE — auditoria de alterações do cadastro.
-- Gravado pelas triggers TG_B_IU_EMBARQUE / TG_B_IU_COBRANCA / TG_B_IU_CLIENTE (e outras) via
-- PCK_DQANET.SF_USU_CHAPA_USER. API só lê.
-- Grant: SELECT ON SIAOS.LOG_CLIENTE TO API_SMAR.

-- Create table
create table SIAOS.LOG_CLIENTE
(
  codigo     NUMBER(5) not null,
  lcl_data   DATE,
  usu_chapa  NUMBER(5),
  lcl_texto  VARCHAR2(4000)
);

comment on column SIAOS.LOG_CLIENTE.codigo is 'SIAOS.CLIENTE.CODIGO';
comment on column SIAOS.LOG_CLIENTE.usu_chapa is 'SIAOS.USUARIO.USU_CHAPA do operador';
comment on column SIAOS.LOG_CLIENTE.lcl_texto is 'Texto da alteração';
