-- Create table
create table SIAOS.CENTRO_CUSTO (
    cc_codigo VARCHAR2(10),
    cc_nome VARCHAR2(50),
    usu_chapa NUMBER(5),
    cc_resp VARCHAR2(10),
    cc_ativo CHAR(1) default 'Y',
    usu_resp_rh NUMBER(5),
    cc_depto NUMBER(1) default 0,
    usu_diretor NUMBER(5),
    usu_aprv_custo NUMBER(5),
    cc_nrprot VARCHAR2(11)
) tablespace NOVASMAR pctfree 10 initrans 1 maxtrans 255 storage (
    initial 40K next 1M minextents 1 maxextents unlimited
);
-- Add comments to the table 
comment on table SIAOS.CENTRO_CUSTO is 'Tabela de Centro de Custos';
-- Add comments to the columns 
comment on column SIAOS.CENTRO_CUSTO.cc_codigo is 'Código do Centro de Custo';
comment on column SIAOS.CENTRO_CUSTO.cc_nome is 'Nome do Centro de Custo';
comment on column SIAOS.CENTRO_CUSTO.usu_chapa is 'Chapa do Usuario, sera utilizado no Sistema de Pendencias.';
comment on column SIAOS.CENTRO_CUSTO.cc_resp is 'Responsável pelo Centro de Custo.';
comment on column SIAOS.CENTRO_CUSTO.cc_ativo is 'Apura se o centro de custo esta ativo ou não. Y - Ativo, N - Desativo';
comment on column SIAOS.CENTRO_CUSTO.usu_resp_rh is 'Número da chapa do Responsavel pelo RH.';
comment on column SIAOS.CENTRO_CUSTO.cc_depto is 'Se cc_depto = 0 significa que o centro de custo não e um departamento, serve apenas como um centro de custo.
Se cc_depto = 1 significa que o centro de custo e um departamento.
';
comment on column SIAOS.CENTRO_CUSTO.usu_diretor is 'Chapa do diretor do cento de custo';
comment on column SIAOS.CENTRO_CUSTO.usu_aprv_custo is 'Chapa do responsavel para aprovação de Notas de Débito';
comment on column SIAOS.CENTRO_CUSTO.cc_nrprot is 'Centro de custo do Protheus';
-- Create/Recreate indexes 
create index SIAOS.IDX_CENTRO_CUSTO #CC_NOME on SIAOS.CENTRO_CUSTO (CC_NOME)
tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 40K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.IDX_CENTRO_CUSTO #CC_RESP on SIAOS.CENTRO_CUSTO (CC_RESP)
tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 64K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.IDX_CENTRO_CUSTO #2 on SIAOS.CENTRO_CUSTO (USU_DIRETOR)
tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 64K next 1M minextents 1 maxextents unlimited
);
create index SIAOS.IDX_USUARIO #USU_CHAPA on SIAOS.CENTRO_CUSTO (USU_CHAPA)
tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
    initial 64K next 1M minextents 1 maxextents unlimited
);
-- Create/Recreate primary, unique and foreign key constraints 
alter table SIAOS.CENTRO_CUSTO
add constraint PK_CENTRO_CUSTO primary key (CC_CODIGO) using index tablespace NOVASMAR pctfree 10 initrans 2 maxtrans 255 storage (
        initial 40K next 1M minextents 1 maxextents unlimited
    );
alter table SIAOS.CENTRO_CUSTO
add constraint FK_CENTRO_CUSTO #CENTRO_CUSTO foreign key (CC_CODIGO)
    references SIAOS.CENTRO_CUSTO (CC_CODIGO);
alter table SIAOS.CENTRO_CUSTO
add constraint FK_USUARIO #CENTRO_CUSTO foreign key (USU_CHAPA)
    references SIAOS.USUARIO (USU_CHAPA);
alter table SIAOS.CENTRO_CUSTO
add constraint FK_USUARIO #CENTRO_CUSTO1 foreign key (USU_RESP_RH)
    references SIAOS.USUARIO (USU_CHAPA);
alter table SIAOS.CENTRO_CUSTO
add constraint FK_USUARIO #CENTRO_CUSTO2 foreign key (USU_DIRETOR)
    references SIAOS.USUARIO (USU_CHAPA);
-- Create/Recreate check constraints 
alter table SIAOS.CENTRO_CUSTO
add constraint CK_CENTRO_CUSTO #CC_DEPTO
    check (CC_DEPTO IN (0, 1));
alter table SIAOS.CENTRO_CUSTO
add constraint NN_CENTRO_CUSTO #CC_CODIGO
    check (CC_CODIGO IS NOT NULL);
alter table SIAOS.CENTRO_CUSTO
add constraint NN_CENTRO_CUSTO #CC_DEPTO
    check (CC_DEPTO IS NOT NULL);
-- Grant/Revoke object privileges 
grant select,
    insert,
    update,
    delete on SIAOS.CENTRO_CUSTO to USUARIO_SMAR;