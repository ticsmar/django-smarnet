-- Create table
create table SIAOS.FUNCIONARIO (
    fun_chapa NUMBER(5) not null,
    fun_apelido VARCHAR2(30),
    cc_codigo VARCHAR2(9),
    fun_obs VARCHAR2(4000),
    fun_unidade VARCHAR2(5),
    fun_ramal NUMBER,
    fun_local LONG,
    fun_cargo VARCHAR2(50),
    fun_ativo CHAR(1),
    fun_dt_adm DATE,
    fun_externo CHAR(1),
    fun_chave VARCHAR2(4000),
    fun_transf CHAR(1),
    fun_endereco VARCHAR2(60),
    fun_cidade VARCHAR2(30),
    fun_uf CHAR(2),
    fun_bairro VARCHAR2(30),
    fun_cep VARCHAR2(11),
    fun_nascimento DATE,
    fun_sexo CHAR(1),
    fun_civil CHAR(1),
    fun_chapa_resp NUMBER(5),
    fun_rg VARCHAR2(12),
    pes_numero NUMBER,
    fun_filial CHAR(2),
    fun_terceiro NUMBER default 0
) tablespace SIAOSNET pctfree 10 initrans 1 maxtrans 255 storage (
    initial 440K next 1M minextents 1 maxextents unlimited
);
-- Add comments to the columns 
comment on column SIAOS.FUNCIONARIO.fun_terceiro is 'Informa se funcionario e Pessoa Juridica 1 - Sim, 0 - Não';
-- Create/Recreate primary, unique and foreign key constraints 
alter table SIAOS.FUNCIONARIO
add constraint PK_FUNCIONARIO primary key (FUN_CHAPA) using index tablespace SIAOSNET pctfree 10 initrans 2 maxtrans 255 storage (
        initial 80K next 1M minextents 1 maxextents unlimited
    );
alter table SIAOS.FUNCIONARIO
add constraint FK_FUNCIONARIO #FUNCIONARIO foreign key (FUN_CHAPA_RESP)
    references SIAOS.FUNCIONARIO (FUN_CHAPA);
alter table SIAOS.FUNCIONARIO
add constraint FK_PESSOA #FUNCIONARIO foreign key (PES_NUMERO)
    references SIAOS.PESSOA (PES_NUMERO) disable novalidate;
-- Grant/Revoke object privileges 
grant select,
    insert,
    update,
    delete on SIAOS.FUNCIONARIO to USUARIO_SMAR;