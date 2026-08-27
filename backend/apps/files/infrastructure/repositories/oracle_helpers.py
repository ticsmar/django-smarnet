"""Shared Oracle cursor helpers for the file manager."""

from datetime import datetime
from typing import Protocol

import oracledb

from apps.files.domain.exceptions.arquivo_exceptions import ArquivoDatabaseError


class _InnerCursorWrapper(Protocol):
    cursor: oracledb.Cursor


class DjangoCursorWrapper(Protocol):
    cursor: _InnerCursorWrapper

    def execute(self, sql: str, params: list[object] | None = None) -> object: ...

    def fetchone(self) -> tuple[object, ...] | None: ...

    def fetchall(self) -> list[tuple[object, ...]]: ...


def raw_oracle_cursor(django_cursor: DjangoCursorWrapper) -> oracledb.Cursor:
    return django_cursor.cursor.cursor


def as_optional_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(float(str(value)))


def as_str(value: object | None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def as_datetime(value: object | None) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    return None


def read_blob(value: object | None) -> bytes:
    if value is None:
        return b""
    if isinstance(value, memoryview):
        return value.tobytes()
    if isinstance(value, bytes):
        return value
    read = getattr(value, "read", None)
    if callable(read):
        data = read()
        if isinstance(data, bytes):
            return data
        return bytes(data)
    return bytes(value)


def wrap_database_error(exc: Exception) -> ArquivoDatabaseError:
    return ArquivoDatabaseError(str(exc) or "Oracle file-manager call failed.")
