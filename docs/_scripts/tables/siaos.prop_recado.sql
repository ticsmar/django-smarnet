-- SIAOS.PROP_RECADO — follow-up estruturado (recado.php / PRE_SISTEMA + PRE_FILTRO).
-- Tabela já existe. Não executar CREATE em produção.
-- Grants API: docs/admins/grants-oracle-followup.md

-- Create table
create table SIAOS.PROP_RECADO
(
  tre_codigo   NUMBER(11),
  prp_codigo   NUMBER(11),
  pre_codigo   INTEGER not null,
  usu_chapa    NUMBER(5) not null,
  pre_mensagem CLOB,
  pre_data     DATE,
  pre_dt_alarm DATE,
  pre_dt_baixa DATE,
  mot_codigo   INTEGER,
  pnu_numero   NUMBER(8),
  pen_numero   NUMBER(5),
  prp_revisao  NUMBER(11),
  prp_set      NUMBER(11),
  pre_sistema  INTEGER,
  pre_filtro   INTEGER
)
tablespace NOVASMAR
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 160K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SIAOS.PROP_RECADO.tre_codigo is 'CODIGO DO TIPO DO RECADO';
comment on column SIAOS.PROP_RECADO.prp_codigo is 'CODIGO DA PROPOSTA';
comment on column SIAOS.PROP_RECADO.pre_codigo is 'CODIGO DO RECADO';
comment on column SIAOS.PROP_RECADO.usu_chapa is 'CODIGO DO USUARIO';
comment on column SIAOS.PROP_RECADO.pre_mensagem is 'MENSAGEM';
comment on column SIAOS.PROP_RECADO.pre_data is 'DATA DA MENSAGEM';
comment on column SIAOS.PROP_RECADO.pre_dt_alarm is 'DATA DE ALERTA DA MENSAGEM';
comment on column SIAOS.PROP_RECADO.pre_dt_baixa is 'DATA DE BAIXA DO ALERTA';
comment on column SIAOS.PROP_RECADO.mot_codigo is 'CODIGO DO MOTIVO';
comment on column SIAOS.PROP_RECADO.pnu_numero is 'NUMERO DA PENDENCIA DO USUARIO';
comment on column SIAOS.PROP_RECADO.pen_numero is 'NUMERO DA PENDENCIA';
comment on column SIAOS.PROP_RECADO.prp_revisao is 'NUMERO DA REVISAO';
comment on column SIAOS.PROP_RECADO.prp_set is 'NUMERO DA SET';
comment on column SIAOS.PROP_RECADO.pre_sistema is 'CÓDIGO DO SISTEMA DO RECADO';
comment on column SIAOS.PROP_RECADO.pre_filtro is 'FILTRO DO SISTEMA DO RECADO';
create index SIAOS.ID_PROP_RECADO#PRE_FILTRO on SIAOS.PROP_RECADO (PRE_FILTRO, PRE_SISTEMA)
  tablespace NOVASMAR;
create index SIAOS.ID_PROP_RECADO#PRP_CODIGO on SIAOS.PROP_RECADO (PRP_CODIGO)
  tablespace NOVASMAR;
alter table SIAOS.PROP_RECADO
  add constraint PK_PRE_CODIGO#PROP_RECADO primary key (PRE_CODIGO);
alter table SIAOS.PROP_RECADO
  add constraint FK_MOTIVO#PROP_RECADO foreign key (MOT_CODIGO)
  references SIAOS.MOTIVO (MOT_CODIGO);
alter table SIAOS.PROP_RECADO
  add constraint FK_PEND_USER_ITEM#PROP_RECADO foreign key (PNU_NUMERO, PEN_NUMERO)
  references SIAOS.PENDENCIA_USER_ITEM (PNU_NUMERO, PEN_NUMERO) on delete set null;
alter table SIAOS.PROP_RECADO
  add constraint FK_PROPOSTA#PROP_RECADO foreign key (PRP_CODIGO)
  references SIAOS.PROPOSTA (PRP_CODIGO) on delete cascade
  disable
  novalidate;
alter table SIAOS.PROP_RECADO
  add constraint FK_USUARIO#PROP_RECADO foreign key (USU_CHAPA)
  references SIAOS.USUARIO (USU_CHAPA);
grant select, insert, update, delete on SIAOS.PROP_RECADO to USUARIO_SMAR;
