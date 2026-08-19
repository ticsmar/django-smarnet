-- Create table
create table GERAL.PRE_PESSOA (
    ppe_codigo INTEGER not null,
    ppe_nome VARCHAR2(100),
    ppe_email VARCHAR2(60),
    fus_codigo INTEGER not null,
    pre_sexo VARCHAR2(1),
    lin_cod NUMBER(6) not null,
    ppe_endereco VARCHAR2(100),
    ppe_bairro VARCHAR2(60),
    ppe_cidade VARCHAR2(60),
    est_codigo INTEGER,
    ppe_estado VARCHAR2(30),
    ppe_cep VARCHAR2(11),
    pai_codigo INTEGER,
    fun_chapa NUMBER(5),
    tep_codigo CHAR(1) not null,
    ppe_e_nome VARCHAR2(60),
    ppe_e_endereco VARCHAR2(100),
    ppe_e_bairro VARCHAR2(60),
    ppe_e_cidade VARCHAR2(60),
    est_e_codigo INTEGER,
    ppe_e_estado VARCHAR2(30),
    ppe_e_cep VARCHAR2(11),
    pai_e_codigo INTEGER,
    ppe_e_homepage VARCHAR2(100),
    ppe_motivo CLOB,
    pes_numero NUMBER,
    emp_codigo NUMBER(11),
    ppe_dt_solic DATE,
    ppe_dt_baixa DATE
) tablespace GERAL pctfree 10 initrans 1 maxtrans 255 storage (
    initial 64K next 1M minextents 1 maxextents unlimited
);
-- Create/Recreate primary, unique and foreign key constraints 
alter table GERAL.PRE_PESSOA
add constraint PK_PRE_PESSOA primary key (PPE_CODIGO) using index tablespace GERAL pctfree 10 initrans 2 maxtrans 255 storage (
        initial 64K next 1M minextents 1 maxextents unlimited
    );
alter table GERAL.PRE_PESSOA
add constraint FK_EMPRESA #PRE_PESSOA foreign key (EMP_CODIGO)
    references GERAL.EMPRESA (EMP_CODIGO);
alter table GERAL.PRE_PESSOA
add constraint FK_ESTADO #PRE_PESSOA foreign key (EST_CODIGO)
    references GERAL.ESTADO (EST_CODIGO) on delete
set null;
alter table GERAL.PRE_PESSOA
add constraint FK_ESTADO #PRE_PESSOA_E foreign key (EST_E_CODIGO)
    references GERAL.ESTADO (EST_CODIGO) on delete
set null;
alter table GERAL.PRE_PESSOA
add constraint FK_PAIS #PRE_PESSOA foreign key (PAI_CODIGO)
    references GERAL.PAIS (PAI_CODIGO) on delete
set null;
alter table GERAL.PRE_PESSOA
add constraint FK_PAIS #PRE_PESSOA_E foreign key (PAI_E_CODIGO)
    references GERAL.PAIS (PAI_CODIGO) on delete
set null;
alter table GERAL.PRE_PESSOA
add constraint FK_TIPO_EMPRESA #PRE_PESSOA foreign key (TEP_CODIGO)
    references GERAL.TIPO_EMPRESA (TEP_CODIGO);
-- Grant/Revoke object privileges 
grant select,
    insert,
    update,
    delete on GERAL.PRE_PESSOA to USUARIO_SMAR;