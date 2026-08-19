-- Create table
create table INTEGRACAO.CLIENTE_RISCO (
    crs_codigo INTEGER not null,
    crs_cod_siaos INTEGER,
    crs_cod_protheus CHAR(1),
    crs_desc VARCHAR2(300),
    crs_desc_longa VARCHAR2(2000),
    leg_codigo INTEGER,
    crs_cod_letra CHAR(2),
    crs_restricao NUMBER(1) default 0,
    crs_cores VARCHAR2(200)
) tablespace INTEGRACAO pctfree 10 initrans 1 maxtrans 255 storage (
    initial 64K next 1M minextents 1 maxextents unlimited
);
-- Add comments to the columns 
comment on column INTEGRACAO.CLIENTE_RISCO.crs_codigo is 'CODIGO RISCO';
comment on column INTEGRACAO.CLIENTE_RISCO.crs_cod_siaos is 'CODIGO BLOQUEIO SIAOS';
comment on column INTEGRACAO.CLIENTE_RISCO.crs_cod_protheus is 'CODIGO STATUS CLIENTE NO PROTHEUS';
comment on column INTEGRACAO.CLIENTE_RISCO.crs_desc is 'DESCRIÇÃO DO STATUS';
comment on column INTEGRACAO.CLIENTE_RISCO.crs_desc_longa is 'DESCRIÇÃO LONGA DO STATUS';
comment on column INTEGRACAO.CLIENTE_RISCO.leg_codigo is 'CODIGO DA LEGENDA';
comment on column INTEGRACAO.CLIENTE_RISCO.crs_cod_letra is 'CODIGO BLOQUEIO SMARNET';
comment on column INTEGRACAO.CLIENTE_RISCO.crs_restricao is 'TIPO DE RESTRÇÃO:  0 - SEM RESTRIÇÕES DE ABERTURA, 1 - RESTRINGE OS; 2 - RESTRIGE PROPOSTA';
comment on column INTEGRACAO.CLIENTE_RISCO.crs_cores is 'CORES SEPARADAS POR '','': ICONE,TEXO ICONE,LINHA 1,LINHA 1,LINHA HOVER';
-- Join UI/API: SIAOS.CLIENTE.BLOQUEADO = INTEGRACAO.CLIENTE_RISCO.CRS_CODIGO
-- (CRS_COD_SIAOS é código paralelo legado; não usar como FK de BLOQUEADO.)
-- Seed de referência (manter sync com docs/developers/administracao-clientes.md):
-- CRS_CODIGO (=BLOQUEADO) | CRS_COD_SIAOS | LETRA | RESTRICAO | DESC
-- 1 | 0 | A  | 0 | Sem restrições
-- 2 | 6 | B  | 0 | Sem Crédito (Pagamento à Vista)
-- 3 | 1 | C  | 0 | Pendência Financeira (Pagamento Antecipado)
-- 4 | 3 | D  | 1 | Pendência Financeira (Bloqueia OS)
-- 5 | 4 | D- | 2 | Pendência Financeira (Bloqueia OS e Proposta)
-- 6 | 5 | E  | 2 | Bloqueio Judicial (Proposta Bloqueada)
-- 7 | 2 | E- | 2 | Cadastro Duplicado/Inválido
-- 8 | 7 | N  | 0 | Cliente Novo - Avaliar Credito
-- Create/Recreate primary, unique and foreign key constraints 
alter table INTEGRACAO.CLIENTE_RISCO
add constraint PK_CLIENTE_RISCO primary key (CRS_CODIGO) using index tablespace INTEGRACAO pctfree 10 initrans 2 maxtrans 255 storage (
        initial 64K next 1M minextents 1 maxextents unlimited
    );
alter table INTEGRACAO.CLIENTE_RISCO
add constraint UK_CLIENTE_RISCO #CRS_COD_SIAOS unique (CRS_COD_SIAOS)
    using index tablespace INTEGRACAO pctfree 10 initrans 2 maxtrans 255 storage (
        initial 64K next 1M minextents 1 maxextents unlimited
    );
-- Grant/Revoke object privileges 
grant select,
    insert,
    update on INTEGRACAO.CLIENTE_RISCO to USUARIO_SMAR;