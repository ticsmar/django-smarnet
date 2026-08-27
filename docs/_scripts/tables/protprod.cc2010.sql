-- PROTPROD.CC2010 — municípios IBGE (Protheus). Cópia de leitura das colunas
-- usadas por dqanet/_src/php/classes/endereco/cidade.php (ajax.php?op=2).
-- Grant: SELECT ON PROTPROD.CC2010 TO API_SMAR.

-- Create table
create table PROTPROD.CC2010
(
  cc2_filial   VARCHAR2(2),
  cc2_est      VARCHAR2(2),
  cc2_codmun   VARCHAR2(5),
  cc2_mun      VARCHAR2(60),
  cc2_cdsiaf   VARCHAR2(20),
  d_e_l_e_t_   VARCHAR2(1),
  r_e_c_n_o_   NUMBER(8)
);

comment on column PROTPROD.CC2010.cc2_est is 'UF (igual GERAL.ESTADO.EST_SIGLA)';
comment on column PROTPROD.CC2010.cc2_codmun is 'Código IBGE do município';
comment on column PROTPROD.CC2010.cc2_mun is 'Nome do município';
comment on column PROTPROD.CC2010.d_e_l_e_t_ is 'Exclusão lógica Protheus (espaço = ativo)';
