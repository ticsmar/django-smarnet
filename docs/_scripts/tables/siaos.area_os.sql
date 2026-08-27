-- SIAOS.AREA_OS — área de OS comercial/técnica. Cópia de leitura das colunas
-- usadas por dqanet/_src/php/classes/comercial/area_os.php (ajax.php?op=4).
-- Grant: SELECT ON SIAOS.AREA_OS TO API_SMAR.

-- Create table
create table SIAOS.AREA_OS
(
  aos_codigo     NUMBER not null,
  aos_nome       VARCHAR2(80),
  aos_descricao  VARCHAR2(200),
  aos_tipo_area  VARCHAR2(1),
  usu_chapa      NUMBER(5)
);

comment on column SIAOS.AREA_OS.aos_codigo is 'PK; CLIENTE.AOS_CODIGO_COM / AOS_CODIGO_TEC';
comment on column SIAOS.AREA_OS.aos_tipo_area is 'C = comercial, E = técnica';
comment on column SIAOS.AREA_OS.usu_chapa is 'Coordenador (SIAOS.USUARIO.USU_CHAPA)';

alter table SIAOS.AREA_OS
  add primary key (AOS_CODIGO);
