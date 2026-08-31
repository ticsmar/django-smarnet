-- SIAOS.PROP_ARQUIVO — pastas e arquivos do Gerenciador (PAR_SISTEMA + PAR_FILTRO).
-- Tabela já existe. Não executar CREATE em produção.
-- Grant API: SELECT, INSERT, UPDATE, DELETE ON SIAOS.PROP_ARQUIVO TO API_SMAR.

-- Create table
create table SIAOS.PROP_ARQUIVO
(
  par_codigo       INTEGER not null,
  prp_codigo       NUMBER(11),
  par_nome         VARCHAR2(300),
  par_descricao    VARCHAR2(60),
  par_arquivo      BLOB,
  par_data         DATE,
  par_tamanho      INTEGER,
  order_no         NUMBER(10),
  par_codigo_pai   INTEGER,
  par_tipo         INTEGER,
  par_modo_arquivo VARCHAR2(1),
  usu_chapa        NUMBER(5),
  par_sistema      INTEGER,
  par_filtro       VARCHAR2(100),
  par_lixeira      DATE,
  par_pasta_fixa   INTEGER default 0,
  leg_codigo       NUMBER,
  ace_codigo       INTEGER,
  leg_codigo_desc  NUMBER
)
tablespace NOVASMAR
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 680K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the columns
comment on column SIAOS.PROP_ARQUIVO.par_codigo
  is 'CODIGO DO ARQUIVO';
comment on column SIAOS.PROP_ARQUIVO.prp_codigo
  is 'CODIGO DA PROPOSTA';
comment on column SIAOS.PROP_ARQUIVO.par_nome
  is 'NOME DO ARQUIVO';
comment on column SIAOS.PROP_ARQUIVO.par_descricao
  is 'DESCRICAO DO ARQUIVO';
comment on column SIAOS.PROP_ARQUIVO.par_arquivo
  is 'ARQUIVO';
comment on column SIAOS.PROP_ARQUIVO.par_data
  is 'DATA DA INSERC?O DO ARQUIVO';
comment on column SIAOS.PROP_ARQUIVO.par_tamanho
  is 'TAMANHO DO ARQUIVO';
comment on column SIAOS.PROP_ARQUIVO.order_no
  is 'NUMERO DA OS';
comment on column SIAOS.PROP_ARQUIVO.par_codigo_pai
  is 'ORIGEM DA PASTA';
comment on column SIAOS.PROP_ARQUIVO.par_tipo
  is 'TIPO PASTA = 0 , ARQUIVO = 1';
comment on column SIAOS.PROP_ARQUIVO.par_modo_arquivo
  is 'LEITURA = R,    ESCRITA = W';
comment on column SIAOS.PROP_ARQUIVO.usu_chapa
  is 'CHAPA DO USUARIO RESPONSAVEL PELO CADASTRO/ALTERACAO';
comment on column SIAOS.PROP_ARQUIVO.par_sistema
  is 'SISTEMA DO ARQUIVO';
comment on column SIAOS.PROP_ARQUIVO.par_filtro
  is 'PARAMETROS DE FILTRAGEM DO SISTEMA';
comment on column SIAOS.PROP_ARQUIVO.par_lixeira
  is 'DATA DE ENVIO PARA A LIXEIRA (PERMANÊNCIA POR DATA DETERMINADA)';
comment on column SIAOS.PROP_ARQUIVO.par_pasta_fixa
  is 'PASTA QUE NAO PODE SER APAGADA';
comment on column SIAOS.PROP_ARQUIVO.leg_codigo
  is 'CÓDIGO DA LEGENDA';
comment on column SIAOS.PROP_ARQUIVO.ace_codigo
  is 'CODIGO DE ACESSO RESTRITO (QUANDO HOUVER)';
comment on column SIAOS.PROP_ARQUIVO.leg_codigo_desc
  is 'CÓDIGO DA LEGENDA DESCRIÇÃO';
-- Create/Recreate indexes
create index SIAOS.ID_ORDER_NO on SIAOS.PROP_ARQUIVO (ORDER_NO)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index SIAOS.ID_PAR_CODIGO_PAI on SIAOS.PROP_ARQUIVO (PAR_CODIGO_PAI)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index SIAOS.ID_PAR_NOME on SIAOS.PROP_ARQUIVO (PAR_NOME)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index SIAOS.ID_PAR_PASTA_FIXA on SIAOS.PROP_ARQUIVO (PAR_PASTA_FIXA)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index SIAOS.ID_PAR_SISTEMA#PAR_FILTRO on SIAOS.PROP_ARQUIVO (PAR_SISTEMA, PAR_FILTRO)
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index SIAOS.ID_PRP_CODIGO on SIAOS.PROP_ARQUIVO (PRP_CODIGO)
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
-- Create/Recreate primary, unique and foreign key constraints
alter table SIAOS.PROP_ARQUIVO
  add constraint PK_PROP_ARQUIVO primary key (PAR_CODIGO)
  using index
  tablespace NOVASMAR
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 160K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SIAOS.PROP_ARQUIVO
  add constraint FK_ACESSO#PROP_ARQUIVO foreign key (ACE_CODIGO)
  references SMARNET.ACESSO (ACE_CODIGO);
alter table SIAOS.PROP_ARQUIVO
  add constraint FK_LEGENDA#PROP_ARQUIVO foreign key (LEG_CODIGO)
  references SMARNET.LEGENDA (LEG_CODIGO);
alter table SIAOS.PROP_ARQUIVO
  add constraint FK_LEGENDA2#PROP_ARQUIVO foreign key (LEG_CODIGO_DESC)
  references SMARNET.LEGENDA (LEG_CODIGO);
alter table SIAOS.PROP_ARQUIVO
  add constraint FK_OEHDR#PROP_ARQUIVO foreign key (ORDER_NO)
  references SIAOS.OEHDOM (ORDER_NO) on delete cascade;
alter table SIAOS.PROP_ARQUIVO
  add constraint FK_PROP_ARQUIVO#PROP_ARQUIVO foreign key (PAR_CODIGO_PAI)
  references SIAOS.PROP_ARQUIVO (PAR_CODIGO) on delete set null;
alter table SIAOS.PROP_ARQUIVO
  add constraint FK_PROPOSTA#PROP_ARQUIVO foreign key (PRP_CODIGO)
  references SIAOS.PROPOSTA (PRP_CODIGO) on delete cascade
  disable
  novalidate;
alter table SIAOS.PROP_ARQUIVO
  add constraint FK_USUARIO#PROP_ARQUIVO foreign key (USU_CHAPA)
  references SIAOS.USUARIO (USU_CHAPA);
-- Grant/Revoke object privileges
grant select, insert, update, delete, alter on SIAOS.PROP_ARQUIVO to USUARIO_SMAR;
grant select, insert, update, delete on SIAOS.PROP_ARQUIVO to API_SMAR;
