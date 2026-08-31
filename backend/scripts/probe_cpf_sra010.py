"""Verify PROTPROD.SRA010 grant and CPF lookup for API_SMAR."""

from __future__ import annotations

import os

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from typing import Protocol, cast

from django.db import connections  # noqa: E402

CPF = "25595670835"


class _Cursor(Protocol):
    def execute(self, *args: object, **kwargs: object) -> object: ...

    def fetchall(self) -> object: ...


def _run(cursor: object, label: str, sql: str, params: list[str] | None = None) -> None:
    print(f"=== {label} ===")
    try:
        typed = cast(_Cursor, cursor)
        typed.execute(sql, params or [])
        rows = typed.fetchall()
        print(rows if rows else "(empty)")
    except Exception as exc:
        print(f"ERROR: {exc}")


def run() -> None:
    with connections["smar"].cursor() as cursor:
        _run(
            cursor,
            "session",
            "SELECT SYS_CONTEXT('USERENV','SESSION_USER') FROM DUAL",
        )
        _run(
            cursor,
            "grant SRA010",
            "SELECT TABLE_SCHEMA, TABLE_NAME, PRIVILEGE, GRANTOR "
            "FROM ALL_TAB_PRIVS "
            "WHERE GRANTEE = SYS_CONTEXT('USERENV','SESSION_USER') "
            "  AND TABLE_NAME = 'SRA010'",
        )
        _run(
            cursor,
            "object SRA010",
            "SELECT OWNER, OBJECT_NAME, OBJECT_TYPE, STATUS "
            "FROM ALL_OBJECTS "
            "WHERE OBJECT_NAME = 'SRA010' "
            "ORDER BY OWNER",
        )
        _run(
            cursor,
            "lookup CPF",
            "SELECT R.RA_NOMECMP, R.RA_MAT, TRIM(R.RA_CIC) "
            "FROM PROTPROD.SRA010 R "
            "WHERE REGEXP_REPLACE(NVL(R.RA_CIC, ' '), '[^0-9]', '') = %s "
            "  AND R.D_E_L_E_T_ = ' ' "
            "FETCH FIRST 1 ROW ONLY",
            [CPF],
        )
        _run(
            cursor,
            "SP_FUNC2CLIENTE object",
            "SELECT OWNER, OBJECT_NAME, OBJECT_TYPE, STATUS "
            "FROM ALL_OBJECTS "
            "WHERE OBJECT_NAME = 'SP_FUNC2CLIENTE'",
        )
        _run(
            cursor,
            "SP_FUNC2CLIENTE grant",
            "SELECT TABLE_SCHEMA, TABLE_NAME, PRIVILEGE "
            "FROM ALL_TAB_PRIVS "
            "WHERE GRANTEE = SYS_CONTEXT('USERENV','SESSION_USER') "
            "  AND TABLE_NAME = 'SP_FUNC2CLIENTE'",
        )


if __name__ == "__main__":
    run()
