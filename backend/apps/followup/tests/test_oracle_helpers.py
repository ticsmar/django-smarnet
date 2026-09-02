"""Tests for Oracle recado query helpers."""

from apps.followup.infrastructure.repositories.oracle_helpers import (
    as_optional_int,
    as_str,
    read_clob,
    sit_codigo_text,
    tre_sistema_sql_predicate,
)


def test_as_optional_int() -> None:
    assert as_optional_int(None) is None
    assert as_optional_int(12) == 12
    assert as_optional_int("3") == 3


def test_read_clob_str() -> None:
    assert read_clob(None) == ""
    assert read_clob("hi") == "hi"


def test_as_str() -> None:
    assert as_str(None) is None
    assert as_str("  a  ") == "a"


def test_sit_codigo_text() -> None:
    assert sit_codigo_text(117) == "117"


def test_tre_sistema_sql_predicate() -> None:
    sql, params = tre_sistema_sql_predicate("TR.TRE_SISTEMA", 117)
    assert "TR.TRE_SISTEMA" in sql
    assert params == ["117", "%,117,%"]
