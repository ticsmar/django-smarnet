"""Verify PCK_DQANET identity functions under API_SMAR + CLIENT_IDENTIFIER."""

from __future__ import annotations

import os

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from django.db import connections  # noqa: E402, TID251


def _run(cursor, label: str, sql: str) -> None:
    print(f"=== {label} ===")
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
        print(rows if rows else "(empty)")
    except Exception as exc:
        print(f"ERROR: {exc}")


def run() -> None:
    with connections["smar"].cursor() as cursor:
        _run(
            cursor,
            "session",
            "SELECT SYS_CONTEXT('USERENV','SESSION_USER'), "
            "SYS_CONTEXT('USERENV','CLIENT_IDENTIFIER') FROM DUAL",
        )
        _run(
            cursor,
            "SF_USU_CHAPA_USER sem identifier",
            "SELECT SIAOS.PCK_DQANET.SF_USU_CHAPA_USER FROM DUAL",
        )
        _run(
            cursor,
            "SF_PES_NUMERO_USER sem identifier",
            "SELECT SIAOS.PCK_DQANET.SF_PES_NUMERO_USER FROM DUAL",
        )
        _run(
            cursor,
            "usuario 2623",
            "SELECT USU_CHAPA, TRIM(USU_LOGINWEB), TRIM(USU_LOGIN), "
            "USU_STATUS, CASE WHEN USU_EMAIL IS NULL THEN 'N' ELSE 'S' END "
            "FROM SIAOS.USUARIO WHERE USU_CHAPA = 2623",
        )
        cursor.execute(
            "SELECT TRIM(USU_LOGINWEB) FROM SIAOS.USUARIO "
            "WHERE USU_CHAPA = 2623 AND USU_LOGINWEB IS NOT NULL "
            "AND ROWNUM = 1"
        )
        row = cursor.fetchone()
        login = str(row[0]).strip() if row and row[0] else None
        print(f"=== SET_IDENTIFIER {login} ===")
        if not login:
            return
        raw = cursor.cursor.cursor
        raw.execute(
            "BEGIN DBMS_SESSION.SET_IDENTIFIER(:id); END;",
            {"id": login},
        )
        _run(
            cursor,
            "sessão após identifier",
            "SELECT SYS_CONTEXT('USERENV','SESSION_USER'), "
            "SYS_CONTEXT('USERENV','CLIENT_IDENTIFIER') FROM DUAL",
        )
        _run(
            cursor,
            "SF_USU_CHAPA_USER com identifier",
            "SELECT SIAOS.PCK_DQANET.SF_USU_CHAPA_USER FROM DUAL",
        )
        _run(
            cursor,
            "SF_PES_NUMERO_USER com identifier",
            "SELECT SIAOS.PCK_DQANET.SF_PES_NUMERO_USER FROM DUAL",
        )
        print("=== compile trigger (esperado: sem privilégio) ===")
        try:
            cursor.execute(
                "ALTER TRIGGER SIAOS.TG_B_IU_EMBARQUE COMPILE"
            )
            print("OK")
        except Exception as exc:
            print(f"ERROR: {exc}")
        raw.execute("BEGIN DBMS_SESSION.CLEAR_IDENTIFIER; END;")


if __name__ == "__main__":
    run()
