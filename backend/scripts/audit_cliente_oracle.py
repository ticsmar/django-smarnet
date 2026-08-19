"""One-shot audit for Cliente Oracle objects, triggers, and identity usage."""

from __future__ import annotations

from django.db import connections  # noqa: TID251

QUERIES: list[tuple[str, str]] = [
    (
        "identity",
        """
        SELECT SYS_CONTEXT('USERENV','SESSION_USER') AS session_user,
               SYS_CONTEXT('USERENV','CURRENT_USER') AS current_user,
               SYS_CONTEXT('USERENV','CLIENT_IDENTIFIER') AS client_identifier
          FROM DUAL
        """,
    ),
    (
        "triggers",
        """
        SELECT OWNER, TRIGGER_NAME, TRIGGERING_EVENT, STATUS, TABLE_NAME
          FROM ALL_TRIGGERS
         WHERE TABLE_OWNER = 'SIAOS' AND TABLE_NAME = 'CLIENTE'
         ORDER BY TRIGGER_NAME
        """,
    ),
    (
        "source_identity",
        """
        SELECT OWNER, NAME, TYPE, LINE, TEXT
          FROM ALL_SOURCE
         WHERE OWNER IN ('SIAOS', 'SGC', 'INTEGRACAO')
           AND NAME IN (
                 'PCK_CLIENTE',
                 'SF_VALIDA_CONS_CLIENTE',
                 'PCK_WINSGC',
                 'SP_FUNC2CLIENTE'
               )
           AND (
                 UPPER(TEXT) LIKE '%SESSION_USER%'
              OR UPPER(TEXT) LIKE '%CURRENT_USER%'
              OR UPPER(TEXT) LIKE '%CLIENT_IDENTIFIER%'
              OR UPPER(TEXT) LIKE '%SYS_CONTEXT%'
              OR UPPER(TEXT) LIKE '%USER%'
               )
         ORDER BY OWNER, NAME, TYPE, LINE
        """,
    ),
    (
        "objects",
        """
        SELECT OWNER, OBJECT_NAME, OBJECT_TYPE, STATUS
          FROM ALL_OBJECTS
         WHERE OWNER IN ('SIAOS', 'GERAL', 'INTEGRACAO', 'SGC')
           AND OBJECT_NAME IN (
                 'CLIENTE', 'PCK_CLIENTE', 'SF_VALIDA_CONS_CLIENTE',
                 'PCK_DQANET', 'PCK_WEB_RELATORIO', 'FOLLOW_CLIENTE',
                 'ORIGEM', 'GRUPO_DIVISAO', 'PAIS', 'ESTADO', 'CONTATOS',
                 'EMPRESA', 'ARSALESP', 'AREA_OS', 'MODELO_PAGT',
                 'PCK_WINSGC', 'SP_FUNC2CLIENTE'
               )
         ORDER BY OWNER, OBJECT_NAME, OBJECT_TYPE
        """,
    ),
    (
        "grants",
        """
        SELECT OWNER, TABLE_NAME, PRIVILEGE, GRANTOR
          FROM ALL_TAB_PRIVS
         WHERE GRANTEE = SYS_CONTEXT('USERENV','SESSION_USER')
           AND OWNER IN ('SIAOS', 'GERAL', 'INTEGRACAO', 'SGC')
           AND TABLE_NAME IN (
                 'CLIENTE', 'PCK_CLIENTE', 'SF_VALIDA_CONS_CLIENTE',
                 'PCK_DQANET', 'PCK_WEB_RELATORIO', 'FOLLOW_CLIENTE',
                 'ORIGEM', 'GRUPO_DIVISAO', 'PAIS', 'ESTADO', 'CONTATOS',
                 'EMPRESA', 'ARSALESP', 'AREA_OS', 'MODELO_PAGT',
                 'PCK_WINSGC', 'SP_FUNC2CLIENTE'
               )
         ORDER BY OWNER, TABLE_NAME, PRIVILEGE
        """,
    ),
]


def run() -> None:
    with connections["smar"].cursor() as cursor:
        for label, sql in QUERIES:
            print(f"=== {label} ===")
            try:
                cursor.execute(sql)
                rows = cursor.fetchall()
                if not rows:
                    print("(empty)")
                preview_limit = 80
                for row in rows[:preview_limit]:
                    print(row)
                if len(rows) > preview_limit:
                    print(f"... +{len(rows) - preview_limit} more")
            except Exception as exc:
                print(f"ERROR: {exc}")


if __name__ == "__main__":
    import django  # noqa: TID251

    django.setup()
    run()
