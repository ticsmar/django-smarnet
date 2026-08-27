-- PROTPROD.SF7010 — grupo tributário (Protheus). Cópia de leitura das colunas
-- usadas por dqanet/_src/php/classes/fiscal/grupoTributario.php (ajax.php?op=3).
-- Grant: SELECT ON PROTPROD.SF7010 TO API_SMAR.

-- Create table
create table PROTPROD.SF7010
(
  f7_est      VARCHAR2(2),
  f7_grpcli   VARCHAR2(6),
  f7_tipocli  VARCHAR2(1),
  f7_cnatrec  VARCHAR2(20),
  f7_gruponc  VARCHAR2(20),
  f7_dtfimnt  VARCHAR2(8),
  d_e_l_e_t_  VARCHAR2(1),
  r_e_c_n_o_  NUMBER(8)
);

comment on column PROTPROD.SF7010.f7_est is 'UF';
comment on column PROTPROD.SF7010.f7_grpcli is 'Código do grupo tributário (CLI_GRUPO_TRIB)';
comment on column PROTPROD.SF7010.f7_tipocli is 'Tipo de operação do cliente (CLI_TIPO: R/F/X/S)';
comment on column PROTPROD.SF7010.d_e_l_e_t_ is 'Exclusão lógica Protheus (espaço = ativo)';
