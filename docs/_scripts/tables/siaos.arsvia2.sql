-- Catálogo comercial da aba Dados Gerais (via / ship via).
-- Segmento: siaos.arclass.sql. Território: siaos.arlevel.sql.
-- Grant: SELECT ON SIAOS.ARSVIA2 TO API_SMAR.

-- Create table
create table SIAOS.ARSVIA2
(
  ship_via_key  VARCHAR2(10) not null,
  nome          VARCHAR2(80),
  ars_status    NUMBER(1)
);

alter table SIAOS.ARSVIA2
  add primary key (SHIP_VIA_KEY);
