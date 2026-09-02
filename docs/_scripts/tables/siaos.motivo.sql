-- SIAOS.MOTIVO — catálogo de motivos (TRE_TIPO_CANC).
-- Tabela já existe. Não executar CREATE em produção.

create table SIAOS.MOTIVO
(
  mot_codigo    INTEGER not null,
  mot_descricao VARCHAR2(30),
  mot_legenda   INTEGER,
  mot_ordem     INTEGER
)
tablespace NOVASMAR;
comment on column SIAOS.MOTIVO.mot_codigo is 'CODIGO DO MOTIVO';
comment on column SIAOS.MOTIVO.mot_descricao is 'DESCRIC?O DO MOTIVO';
comment on column SIAOS.MOTIVO.mot_legenda is 'CODIGO DO MOTIVO NO SISTEMA DE LEGENDAS';
comment on column SIAOS.MOTIVO.mot_ordem is 'ORDEM DO MOTIVO';
alter table SIAOS.MOTIVO
  add constraint PK_MOTIVO primary key (MOT_CODIGO);
grant select, insert, update, delete on SIAOS.MOTIVO to USUARIO_SMAR;
