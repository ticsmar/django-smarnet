-- =============================================================================
-- branch_auth / DJANGO_API — auditoria de schema Oracle
-- =============================================================================
-- Uso:
--   1. Conecte como DJANGO_API (mesmo user do .env ORACLE_USER)
--   2. Rode PARTE 1 inteira e guarde o output
--   3. Só depois rode PARTE 2 se quiser limpar órfãos de migrate falho
--
-- Nomes esperados pelo Django (app label: branch_auth_infrastructure):
--   BRANCH_AUTH_INFRASTRUCTURE_ACCESSTOKEN
--   BRANCH_AUTH_INFRASTRUCTURE_MACHINE
--   BRANCH_AUTH_INFRASTRUCTURE_TOKENACCESSATTEMPT
-- =============================================================================

SET LINESIZE 200
SET PAGESIZE 200
SET FEEDBACK ON
SET VERIFY OFF

PROMPT
PROMPT ===== PARTE 1 — DIAGNÓSTICO (somente leitura) =====
PROMPT

PROMPT -- Usuário atual
SELECT USER AS connected_user,
       SYS_CONTEXT('USERENV', 'DB_NAME') AS db_name,
       SYS_CONTEXT('USERENV', 'SERVICE_NAME') AS service_name
FROM dual;

PROMPT
PROMPT -- Quota em tablespaces (migrate falha sem quota)
SELECT tablespace_name,
       bytes / 1024 / 1024 AS used_mb,
       max_bytes / 1024 / 1024 AS max_mb,
       CASE
           WHEN max_bytes = -1 THEN 'UNLIMITED'
           WHEN max_bytes = 0 THEN 'NO QUOTA'
           ELSE TO_CHAR(max_bytes / 1024 / 1024) || ' MB'
       END AS quota_status
FROM user_ts_quota
ORDER BY tablespace_name;

PROMPT
PROMPT -- Privilégios de sistema do usuário conectado
SELECT privilege, admin_option
FROM user_sys_privs
ORDER BY privilege;

PROMPT
PROMPT -- Tabelas branch_auth (órfãs ou completas)
SELECT table_name,
       tablespace_name,
       num_rows,
       last_analyzed
FROM user_tables
WHERE table_name LIKE 'BRANCH_AUTH%'
ORDER BY table_name;

PROMPT
PROMPT -- Todas as tabelas do schema (visão geral)
SELECT table_name, tablespace_name
FROM user_tables
ORDER BY table_name;

PROMPT
PROMPT -- Sequences branch_auth
SELECT sequence_name, min_value, max_value, last_number
FROM user_sequences
WHERE sequence_name LIKE 'BRANCH_AUTH%'
ORDER BY sequence_name;

PROMPT
PROMPT -- Índices em tabelas branch_auth
SELECT i.index_name,
       i.table_name,
       i.uniqueness,
       LISTAGG(c.column_name, ', ') WITHIN GROUP (ORDER BY c.column_position) AS columns
FROM user_indexes i
JOIN user_ind_columns c
  ON c.index_name = i.index_name
 AND c.table_name = i.table_name
WHERE i.table_name LIKE 'BRANCH_AUTH%'
GROUP BY i.index_name, i.table_name, i.uniqueness
ORDER BY i.table_name, i.index_name;

PROMPT
PROMPT -- Triggers em tabelas branch_auth
SELECT trigger_name, table_name, status, triggering_event
FROM user_triggers
WHERE table_name LIKE 'BRANCH_AUTH%'
ORDER BY table_name, trigger_name;

PROMPT
PROMPT -- Constraints (FK/PK/UK) branch_auth
SELECT constraint_name,
       table_name,
       constraint_type,
       status,
       r_constraint_name
FROM user_constraints
WHERE table_name LIKE 'BRANCH_AUTH%'
ORDER BY table_name, constraint_type, constraint_name;

PROMPT
PROMPT -- Registros em django_migrations (branch_auth)
SELECT id, app, name, applied
FROM django_migrations
WHERE app = 'branch_auth_infrastructure'
ORDER BY id;

PROMPT
PROMPT -- Objetos inválidos no schema
SELECT object_name, object_type, status
FROM user_objects
WHERE status = 'INVALID'
ORDER BY object_type, object_name;

PROMPT
PROMPT -- Resumo: o que migrate ainda precisa criar
PROMPT -- (tabelas esperadas que NÃO existem)
WITH expected (table_name) AS (
    SELECT 'BRANCH_AUTH_INFRASTRUCTURE_ACCESSTOKEN' FROM dual UNION ALL
    SELECT 'BRANCH_AUTH_INFRASTRUCTURE_MACHINE' FROM dual UNION ALL
    SELECT 'BRANCH_AUTH_INFRASTRUCTURE_TOKENACCESSATTEMPT' FROM dual
)
SELECT e.table_name,
       CASE
           WHEN t.table_name IS NOT NULL THEN 'EXISTS'
           ELSE 'MISSING'
       END AS status
FROM expected e
LEFT JOIN user_tables t ON t.table_name = e.table_name
ORDER BY e.table_name;

PROMPT
PROMPT ===== FIM PARTE 1 =====
PROMPT Revise o output antes de rodar PARTE 2.
PROMPT

-- =============================================================================
-- PARTE 2 — LIMPEZA (destrutivo — só se migrate falhou no meio)
-- Descomente o bloco abaixo após revisar PARTE 1.
-- =============================================================================

/*
PROMPT
PROMPT ===== PARTE 2 — LIMPEZA branch_auth =====
PROMPT

-- Remove registro de migration parcial (se existir)
DELETE FROM django_migrations
 WHERE app = 'branch_auth_infrastructure';

COMMIT;

-- Drop tabelas branch_auth (ordem: filhas antes de pais)
BEGIN
    FOR r IN (
        SELECT table_name
        FROM user_tables
        WHERE table_name IN (
            'BRANCH_AUTH_INFRASTRUCTURE_TOKENACCESSATTEMPT',
            'BRANCH_AUTH_INFRASTRUCTURE_MACHINE',
            'BRANCH_AUTH_INFRASTRUCTURE_ACCESSTOKEN'
        )
        ORDER BY CASE table_name
            WHEN 'BRANCH_AUTH_INFRASTRUCTURE_TOKENACCESSATTEMPT' THEN 1
            WHEN 'BRANCH_AUTH_INFRASTRUCTURE_MACHINE' THEN 2
            ELSE 3
        END
    ) LOOP
        EXECUTE IMMEDIATE 'DROP TABLE ' || r.table_name || ' CASCADE CONSTRAINTS PURGE';
        DBMS_OUTPUT.PUT_LINE('Dropped table: ' || r.table_name);
    END LOOP;
END;
/

-- Drop sequences órfãs
BEGIN
    FOR r IN (
        SELECT sequence_name
        FROM user_sequences
        WHERE sequence_name LIKE 'BRANCH_AUTH%'
    ) LOOP
        EXECUTE IMMEDIATE 'DROP SEQUENCE ' || r.sequence_name;
        DBMS_OUTPUT.PUT_LINE('Dropped sequence: ' || r.sequence_name);
    END LOOP;
END;
/

-- Drop índices órfãos (se sobraram sem tabela)
BEGIN
    FOR r IN (
        SELECT index_name
        FROM user_indexes
        WHERE index_name LIKE 'BRANCH_AUTH%'
    ) LOOP
        BEGIN
            EXECUTE IMMEDIATE 'DROP INDEX ' || r.index_name;
            DBMS_OUTPUT.PUT_LINE('Dropped index: ' || r.index_name);
        EXCEPTION
            WHEN OTHERS THEN
                DBMS_OUTPUT.PUT_LINE('Skip index ' || r.index_name || ': ' || SQLERRM);
        END;
    END LOOP;
END;
/

COMMIT;

PROMPT
PROMPT Limpeza concluída. Rode no projeto:
PROMPT   python manage.py migrate
PROMPT
*/
