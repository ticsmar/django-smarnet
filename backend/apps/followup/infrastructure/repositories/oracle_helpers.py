"""Shared Oracle cursor helpers for follow-up."""

from datetime import datetime
from typing import Protocol, cast

import oracledb

from apps.followup.domain.exceptions.followup_exceptions import RecadoDatabaseError


class _InnerCursorWrapper(Protocol):
    cursor: oracledb.Cursor


class DjangoCursorWrapper(Protocol):
    cursor: _InnerCursorWrapper

    def execute(self, sql: str, params: list[object] | None = None) -> object: ...

    def fetchone(self) -> tuple[object, ...] | None: ...

    def fetchall(self) -> list[tuple[object, ...]]: ...


def raw_oracle_cursor(django_cursor: object) -> oracledb.Cursor:
    nested = getattr(django_cursor, "cursor", None)
    raw = getattr(nested, "cursor", None)
    return cast("oracledb.Cursor", raw)


def as_optional_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(float(str(value)))


def as_str(value: object | None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def sit_codigo_text(sistema: int) -> str:
    """TRE_SISTEMA is VARCHAR2. Do not bind a NUMBER through TO_CHAR.

    Oracle pads a leading space when converting NUMBER.
    """
    return str(int(sistema))


def tre_sistema_sql_predicate(column: str, sistema: int) -> tuple[str, list[str]]:
    """Match TIPO_RECADO.TRE_SISTEMA: '0' = all hosts; else sit_codigo list."""
    sit = sit_codigo_text(sistema)
    sql = f"""(
      TRIM({column}) = '0'
      OR TRIM({column}) = %s
      OR (',' || REPLACE(TRIM({column}), ' ', '') || ',') LIKE %s
    )"""
    return sql, [sit, f"%,{sit},%"]


def as_datetime(value: object | None) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    return None


def read_clob(value: object | None) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    read = getattr(value, "read", None)
    if callable(read):
        data = read()
        if data is None:
            return ""
        if isinstance(data, bytes):
            return data.decode("latin-1", errors="replace")
        return str(data)
    return str(value)


def wrap_database_error(exc: Exception) -> RecadoDatabaseError:
    return RecadoDatabaseError(str(exc) or "Oracle follow-up call failed.")
