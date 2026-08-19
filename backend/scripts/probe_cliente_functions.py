"""Probe SF_EMP_CODIGO / SF_VALIDA_CONS_CLIENTE under API_SMAR."""

from __future__ import annotations

from django.db import connections  # noqa: TID251


def run() -> None:
    with connections["smar"].cursor() as cursor:
        probes = [
            ("SF_EMP_CODIGO", "SELECT SGC.PCK_WINSGC.SF_EMP_CODIGO FROM DUAL"),
            (
                "SF_VALIDA sample",
                "SELECT SIAOS.SF_VALIDA_CONS_CLIENTE(1) FROM DUAL",
            ),
            (
                "PCK_CLIENTE exists",
                """
                SELECT OBJECT_NAME, OBJECT_TYPE, STATUS
                  FROM ALL_OBJECTS
                 WHERE OWNER = 'SIAOS' AND OBJECT_NAME = 'PCK_CLIENTE'
                """,
            ),
            (
                "SF_VALIDA exists",
                """
                SELECT OBJECT_NAME, OBJECT_TYPE, STATUS
                  FROM ALL_OBJECTS
                 WHERE OWNER = 'SIAOS' AND OBJECT_NAME = 'SF_VALIDA_CONS_CLIENTE'
                """,
            ),
            (
                "PCK_WINSGC exists",
                """
                SELECT OBJECT_NAME, OBJECT_TYPE, STATUS
                  FROM ALL_OBJECTS
                 WHERE OWNER = 'SGC' AND OBJECT_NAME = 'PCK_WINSGC'
                """,
            ),
            (
                "count clientes",
                "SELECT COUNT(*) FROM SIAOS.CLIENTE WHERE ROWNUM <= 1",
            ),
        ]
        for label, sql in probes:
            print(f"=== {label} ===")
            try:
                cursor.execute(sql)
                print(cursor.fetchall())
            except Exception as exc:
                print(f"ERROR: {exc}")


if __name__ == "__main__":
    run()
