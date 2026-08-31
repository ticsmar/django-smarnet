"""Shared Oracle cursor helpers for the file manager."""

from datetime import datetime
from typing import Protocol, cast

import oracledb

from apps.files.domain.exceptions.arquivo_exceptions import ArquivoDatabaseError


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
    if isinstance(value, (bytes, bytearray)):
        return bytes(value)
    if isinstance(value, str):
        return value.encode()
    read = getattr(value, "read", None)
    if not callable(read):
        msg = f"Unexpected blob type: {type(value)!r}"
        raise TypeError(msg)
    data = read()
    if isinstance(data, memoryview):
        data = data.tobytes()
    elif isinstance(data, (bytes, bytearray)):
        data = bytes(data)
    elif isinstance(data, str):
        data = data.encode()
    else:
        msg = f"Unexpected blob read type: {type(data)!r}"
        raise TypeError(msg)
    return data


def wrap_database_error(exc: Exception) -> ArquivoDatabaseError:
    return ArquivoDatabaseError(str(exc) or "Oracle file-manager call failed.")
