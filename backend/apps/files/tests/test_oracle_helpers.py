"""Tests for Oracle helper conversions."""

from datetime import datetime

from apps.files.infrastructure.repositories.oracle_helpers import (
    as_datetime,
    as_optional_int,
    as_str,
    read_blob,
    wrap_database_error,
)


def test_as_optional_int() -> None:
    assert as_optional_int(None) is None
    assert as_optional_int("7") == 7


def test_as_str() -> None:
    assert as_str(None) is None
    assert as_str("  x  ") == "x"
    assert as_str("   ") is None


def test_as_datetime() -> None:
    now = datetime(2026, 1, 1)
    assert as_datetime(now) is now
    assert as_datetime("nope") is None


def test_read_blob() -> None:
    assert read_blob(None) == b""
    assert read_blob(b"abc") == b"abc"
    assert read_blob(memoryview(b"xy")) == b"xy"

    class _LobBytes:
        def read(self) -> bytes:
            return b"lob"

    class _LobArray:
        def read(self) -> bytearray:
            return bytearray(b"zz")

    assert read_blob(_LobBytes()) == b"lob"
    assert read_blob(_LobArray()) == b"zz"
    assert read_blob(bytearray(b"aa")) == b"aa"


def test_wrap_database_error() -> None:
    err = wrap_database_error(RuntimeError("boom"))
    assert "boom" in str(err)
