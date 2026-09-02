-- SIAOS.TIPO_RECADO — tipos de recado (TRE_SISTEMA = sit_codigo).
-- Cliente: 117. Proposta Order IN: 121 (ainda no 3.01).
-- TRE_SISTEMA: lista de sit_codigo separada por vírgula; '0' = todos.
-- TRE_ATIVO = 1 no combo. TRE_TIPO_CANC = 1 exige SIAOS.MOTIVO.
-- TRE_LEGENDA / MOT_LEGENDA → SMARNET.LEGENDA + LEGENDA_TEXTO (LIN_COD = idioma).
-- Tabela já existe. Não executar CREATE em produção.

create table SIAOS.TIPO_RECADO
(
  tre_codigo    NUMBER(11) not null,
  tre_descricao VARCHAR2(60),
  tre_legenda   NUMBER(11),
  tre_global    NUMBER(1) default 1,
  tre_sistema   VARCHAR2(2000),
  tre_ativo     NUMBER(1) default 1,
  tre_tipo_canc NUMBER(1) default 0
)
tablespace NOVASMAR;
comment on column SIAOS.TIPO_RECADO.tre_codigo is 'CODIGO DO TIPO DO RECADO DA PROPOSTA';
comment on column SIAOS.TIPO_RECADO.tre_descricao is 'DESCRICAO DO TIPO';
comment on column SIAOS.TIPO_RECADO.tre_legenda is 'CODIGO DA LEGENDA DA DESCRICAO ';
comment on column SIAOS.TIPO_RECADO.tre_global is 'TIPO DO RECADO PODE SER VISTOS POR TODOS NA PROPOSTA';
comment on column SIAOS.TIPO_RECADO.tre_sistema is 'SISTEMA DO RECADO LISTA SEPARADO POR VIRGULA NUMERAR CONF CADASTRO NO SMARNET ''0''  ZERO = TODOS';
comment on column SIAOS.TIPO_RECADO.tre_ativo is 'TIPO INATIVO';
comment on column SIAOS.TIPO_RECADO.tre_tipo_canc is 'TIPO CANCELAMENTO - MOSTRAR MOTIVO';
alter table SIAOS.TIPO_RECADO
  add constraint PK_TIPO_RECADO primary key (TRE_CODIGO);
grant select, insert, update, delete on SIAOS.TIPO_RECADO to USUARIO_SMAR;
