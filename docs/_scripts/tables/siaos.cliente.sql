-- Create table
create table SIAOS.CLIENTE (
    origem CHAR(2),
    codigo NUMBER(5) not null,
    cliente CHAR(60) not null,
    reduzido CHAR(18),
    endereco1 CHAR(60),
    endereco2 CHAR(60),
    endereco3 CHAR(60),
    cidade CHAR(25),
    estado CHAR(2),
    cep CHAR(9),
    pais CHAR(3) not null,
    telefone1 CHAR(20),
    telefone2 CHAR(20),
    fax CHAR(20),
    email VARCHAR2(60),
    limitecr NUMBER(13, 2),
    flagsuspen NUMBER(3),
    flagcobra NUMBER(3),
    flagmulta NUMBER(3),
    taxamulta NUMBER(7, 2),
    formaembar NUMBER(5),
    ship_via CHAR(1),
    classe CHAR(5),
    entrega CHAR(9),
    cobranca CHAR(9),
    territorio CHAR(2),
    vendedor CHAR(5),
    comen_fat CHAR(2),
    comen_cobr CHAR(2),
    cgc CHAR(20),
    inscr_est CHAR(20),
    bloqueado NUMBER(3),
    contato CHAR(30),
    contatotec CHAR(30),
    contatofin CHAR(30),
    desc_max NUMBER(5, 1),
    dt_atual DATE,
    usuario CHAR(6),
    homepage CHAR(50),
    tipo CHAR(1),
    tipoemp NUMBER(3),
    vencprog NUMBER(3),
    obsvenc CHAR(40),
    zona_franca NUMBER(3),
    exportacao NUMBER(3),
    iss NUMBER(3),
    ccontabil CHAR(20),
    observa VARCHAR2(2000),
    mensagem_bloqueio VARCHAR2(2000),
    cli_grupo NUMBER(5),
    emp_codigo NUMBER(11) default 1,
    cli_montador NUMBER(1) default 0,
    cli_vendedor2 CHAR(5),
    aos_codigo_tec INTEGER,
    aos_codigo_com INTEGER,
    cli_cod_mun_ibge VARCHAR2(5),
    cli_grupo_trib VARCHAR2(6),
    cli_tipo VARCHAR2(1),
    cli_ie_isento NUMBER(1) default 0,
    cli_bairro VARCHAR2(60),
    est_codigo INTEGER,
    pai_codigo INTEGER,
    cli_inscr_mun CHAR(18),
    cli_cnae CHAR(9),
    cli_fome_zero NUMBER(1) default 0,
    cli_inscr_suframa CHAR(12),
    cli_contribuinte NUMBER(1) default 2,
    cli_nif CHAR(40),
    a1_cod CHAR(6),
    cli_limite_crv NUMBER(13, 2),
    cli_pes_tipo CHAR(2),
    cli_reccof CHAR(1) default 'N',
    cli_reccsll CHAR(1) default 'N',
    cli_recpis CHAR(1) default 'N',
    cli_dt_cad DATE default SYSDATE,
    mpg_codigo INTEGER,
    cli_mod_pagt CHAR(1) default 'T' not null,
    con_codigo_com INTEGER,
    con_codigo_tec INTEGER,
    con_codigo_fin INTEGER,
    cli_email_nfse VARCHAR2(60)
) tablespace NOVASMAR pctfree 10 initrans 1 maxtrans 255 storage (
    initial 11440K next 1M minextents 1 maxextents unlimited
);
-- Add comments to the table 
comment on table SIAOS.CLIENTE is 'Cadastro de clientes';
-- Add comments to the columns 
comment on column SIAOS.CLIENTE.ccontabil is 'Conta Contábil';
comment on column SIAOS.CLIENTE.observa is 'Observações';
comment on column SIAOS.CLIENTE.mensagem_bloqueio is 'Motivo do bloqueio/status preenchido pelo financeiro (texto livre; distinto de CRS_DESC)';
comment on column SIAOS.CLIENTE.cli_grupo is 'Código do Cliente que representa o Grupo.';
comment on column SIAOS.CLIENTE.emp_codigo is 'Código da empresa que cadastrou o cliente';
comment on column SIAOS.CLIENTE.cli_montador is ' Cliente montador Smar 1 - Montador,  0 - Normal';
comment on column SIAOS.CLIENTE.cli_vendedor2 is 'Código do segundo vendedor padrão do cliente';
comment on column SIAOS.CLIENTE.aos_codigo_tec is 'Código da área técnica da O.S. - tabela AREA_OS';
comment on column SIAOS.CLIENTE.aos_codigo_com is 'Código da área comercial da O.S. - tabela AREA_OS';
comment on column SIAOS.CLIENTE.cli_cod_mun_ibge is 'Código de município do IBGE';
comment on column SIAOS.CLIENTE.cli_grupo_trib is 'Código de exceção fiscal (Protheus)';
comment on column SIAOS.CLIENTE.cli_tipo is 'F = Consumidor Final R = Revendor S = Solidário X = Exportação (Protheus) ';
comment on column SIAOS.CLIENTE.cli_ie_isento is 'Inscrição Estadual Isento';
comment on column SIAOS.CLIENTE.cli_bairro is 'Bairro do cliente';
comment on column SIAOS.CLIENTE.est_codigo is 'Código do Estado';
comment on column SIAOS.CLIENTE.pai_codigo is 'CODIGO DO PAIS';
comment on column SIAOS.CLIENTE.cli_inscr_mun is 'Código da Inscrição Estadual';
comment on column SIAOS.CLIENTE.cli_cnae is 'Código do CNAE';
comment on column SIAOS.CLIENTE.cli_fome_zero is 'Clente participa do Fome Zero 1 = Sim  e 2 = Não';
comment on column SIAOS.CLIENTE.cli_inscr_suframa is 'Código da Incrição na SUFRAMA';
comment on column SIAOS.CLIENTE.cli_contribuinte is 'Cliente contribuinte 1 = Sim  e 2 = Não';
comment on column SIAOS.CLIENTE.cli_nif is 'Codigo tributario internacional';
comment on column SIAOS.CLIENTE.cli_limite_crv is 'Limite de Credito a Vista';
comment on column SIAOS.CLIENTE.cli_pes_tipo is 'Tipo Pessoa A1_TPESSOA';
comment on column SIAOS.CLIENTE.cli_reccof is 'Recupera COFINS A1_RECCOF';
comment on column SIAOS.CLIENTE.cli_reccsll is 'Recupera CSLL      A1_RECCSLL';
comment on column SIAOS.CLIENTE.cli_recpis is 'Recupera PIS          A1_RECPIS';
comment on column SIAOS.CLIENTE.cli_dt_cad is 'Data do cadastro do cliente';
comment on column SIAOS.CLIENTE.mpg_codigo is 'CÓDIGO DO MODELO DE PAGAMENTO PADRAO';
comment on column SIAOS.CLIENTE.cli_mod_pagt is 'Modo de pagamento T - Transferência Bancária, B - Boleto, O - Outros';
comment on column SIAOS.CLIENTE.con_codigo_com is 'Contato comercial do cliente';
comment on column SIAOS.CLIENTE.con_codigo_tec is 'Contato tecnico do cliente';
comment on column SIAOS.CLIENTE.con_codigo_fin is 'Contato financeiro do cliente';
comment on column SIAOS.CLIENTE.cli_email_nfse is 'Email para Nota Fiscal de Serviço';
-- Create/Recreate indexes 
create index SIAOS.ARC_CLASSE on SIAOS.CLIENTE (CLASSE) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 64K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_CLI_GRUPO on SIAOS.CLIENTE (CLI_GRUPO) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 64K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_ORIGEM on SIAOS.CLIENTE (ORIGEM) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 64K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_PORCGC on SIAOS.CLIENTE (CGC) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 440K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_PORCIDADE on SIAOS.CLIENTE (CIDADE) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 680K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_POR_CLASSE_E_CLIENTE on SIAOS.CLIENTE (CLASSE, REDUZIDO) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 680K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_PORNATUREZA on SIAOS.CLIENTE (TIPO) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 280K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_POR_NOME_DE_CLIENTE on SIAOS.CLIENTE (CLIENTE) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 1040K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_POR_ORIGEM on SIAOS.CLIENTE (ORIGEM, REDUZIDO) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 680K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_PORPAIS on SIAOS.CLIENTE (PAIS, REDUZIDO) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 680K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_PORREDUZ on SIAOS.CLIENTE (REDUZIDO) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 680K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.ARC_PORTERRITORIO on SIAOS.CLIENTE (TERRITORIO, REDUZIDO) tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 680K next 1M minextents 1 maxextents unlimited
);
-- Create/Recreate primary, unique and foreign key constraints 
alter table SIAOS.CLIENTE
add constraint PK_CLIENTE primary key (CODIGO) using index tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
        initial 280K next 1M minextents 1 maxextents unlimited
    );
alter table SIAOS.CLIENTE
add constraint FK_AREA_OS #CLIENTE#COM foreign key (AOS_CODIGO_COM)
    references SIAOS.AREA_OS (AOS_CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_AREA_OS #CLIENTE#TEC foreign key (AOS_CODIGO_TEC)
    references SIAOS.AREA_OS (AOS_CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_ARSALESP #CLIENTE foreign key (CLI_VENDEDOR2)
    references SIAOS.ARSALESP (SALESP_KEY);
alter table SIAOS.CLIENTE
add constraint FK_CLIENTE #CLIENTE foreign key (CLI_GRUPO)
    references SIAOS.CLIENTE (CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_CONTATOS #CLIENTE#COM foreign key (CON_CODIGO_COM)
    references SIAOS.CONTATOS (CON_CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_CONTATOS #CLIENTE#FIN foreign key (CON_CODIGO_FIN)
    references SIAOS.CONTATOS (CON_CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_CONTATOS #CLIENTE#TEC foreign key (CON_CODIGO_TEC)
    references SIAOS.CONTATOS (CON_CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_EMPRESA #CLIENTE foreign key (EMP_CODIGO)
    references GERAL.EMPRESA (EMP_CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_ESTADO #CLIENTE foreign key (EST_CODIGO)
    references GERAL.ESTADO (EST_CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_MODELO_PAGT #CLIENTE foreign key (MPG_CODIGO)
    references SIAOS.MODELO_PAGT (MPG_CODIGO);
alter table SIAOS.CLIENTE
add constraint FK_PAIS #CLIENTE foreign key (PAI_CODIGO)
    references GERAL.PAIS (PAI_CODIGO);
-- Create/Recreate check constraints 
alter table SIAOS.CLIENTE
add constraint CK_EMP_CODIGO #CLIENTE
    check (EMP_CODIGO IS NOT NULL);
-- Grant/Revoke object privileges 
grant select on SIAOS.CLIENTE to RL_API_SMAR;
grant select,
    insert,
    update,
    delete,
    alter on SIAOS.CLIENTE to USUARIO_SMAR;