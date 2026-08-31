"""Inspect CLIENTE triggers and grants for API_SMAR."""

from __future__ import annotations

from django.db import connections


def run() -> None:
    with connections["smar"].cursor() as cursor:
        cursor.execute(
            """
            SELECT TRIGGER_NAME, TRIGGER_BODY
              FROM ALL_TRIGGERS
             WHERE TABLE_OWNER = 'SIAOS'
               AND TABLE_NAME = 'CLIENTE'
               AND TRIGGER_NAME IN ('TG_B_I_CLIENTE', 'TG_B_IU_CLIENTE')
            """
        )
        for name, body in cursor.fetchall():
            text = body or ""
            print(f"=== {name} ({len(text)} chars) ===")
            print(text[:3000])

        cursor.execute(
            """
            SELECT OBJECT_NAME, OBJECT_TYPE, STATUS
              FROM ALL_OBJECTS
             WHERE OWNER = 'SIAOS'
               AND (
                     OBJECT_NAME LIKE '%CLIENTE%'
                  OR OBJECT_NAME IN ('PCK_CLIENTE', 'SF_VALIDA_CONS_CLIENTE')
                   )
             ORDER BY OBJECT_NAME, OBJECT_TYPE
            """
        )
        print("=== SIAOS objects ===")
        for row in cursor.fetchall():
            print(row)

        cursor.execute(
            """
            SELECT TABLE_SCHEMA, TABLE_NAME, PRIVILEGE
              FROM ALL_TAB_PRIVS
             WHERE GRANTEE = SYS_CONTEXT('USERENV', 'SESSION_USER')
               AND TABLE_NAME IN (
                     'CLIENTE', 'PCK_CLIENTE', 'SF_VALIDA_CONS_CLIENTE',
                     'ORIGEM', 'EMPRESA', 'PAIS', 'ESTADO', 'PCK_DQANET'
                   )
             ORDER BY TABLE_SCHEMA, TABLE_NAME, PRIVILEGE
            """
        )
        print("=== grants ===")
        for row in cursor.fetchall():
            print(row)

        cursor.execute(
            """
            SELECT PRIVILEGE
              FROM SESSION_PRIVS
             ORDER BY PRIVILEGE
            """
        )
        print("=== session privs (sample) ===")
        for row in cursor.fetchall()[:40]:
            print(row)


if __name__ == "__main__":
    run()
