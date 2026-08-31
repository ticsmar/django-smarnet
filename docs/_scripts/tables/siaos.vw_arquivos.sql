-- Arquivos (Gerenciador: PAR_SISTEMA + PAR_FILTRO; Cliente = op_file 7).
-- Fora de PCK_CLIENTE; ciclo próprio. DML em SIAOS.PROP_ARQUIVO (não nesta view).
-- Grant leitura: SELECT ON SIAOS.VW_ARQUIVOS, PROP_ARQ_MOD TO API_SMAR.
-- DML: ver docs/admins/grants-oracle-arquivos.md.

-- Create table
create table SIAOS.PROP_ARQ_MOD
(
  par_codigo   NUMBER not null,
  par_sistema  NUMBER
);

comment on column SIAOS.PROP_ARQ_MOD.par_sistema is 'op_file: 7 = Cliente';

-- View (definição operacional no banco; aqui só o contrato de leitura)
-- create or replace view SIAOS.VW_ARQUIVOS as ...
comment on table SIAOS.PROP_ARQ_MOD is 'Modelos de arquivo por sistema (op_file). Aba Arquivos lê VW_ARQUIVOS.';
