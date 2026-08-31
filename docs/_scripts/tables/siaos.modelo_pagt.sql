-- SIAOS.MODELO_PAGT / MODELO_RISCO — formas de pagamento filtradas por risco
-- (dqanet/_src/php/classes/comercial/pagamento.php modeloPagPorRisco).
-- Grant: SELECT ON SIAOS.MODELO_PAGT, SIAOS.MODELO_RISCO TO API_SMAR.

-- Create table
create table SIAOS.MODELO_PAGT
(
  mpg_codigo      NUMBER not null,
  mpg_descicao    VARCHAR2(80),
  mpg_status      NUMBER(1),
  mpg_tipo        VARCHAR2(10),
  mpg_area        VARCHAR2(1),
  mpg_prioridade  VARCHAR2(10)
);

comment on column SIAOS.MODELO_PAGT.mpg_status is '1 ativo, 2 pendente, 3 inativo';
comment on column SIAOS.MODELO_PAGT.mpg_area is 'N nacional, I internacional, G ambos';

alter table SIAOS.MODELO_PAGT
  add primary key (MPG_CODIGO);

-- Create table
create table SIAOS.MODELO_RISCO
(
  mpg_codigo  NUMBER not null,
  mri_risco   VARCHAR2(2)
);

comment on column SIAOS.MODELO_RISCO.mri_risco is 'Letra Protheus (INTEGRACAO.CLIENTE_RISCO.CRS_COD_PROTHEUS)';
