"""Unit tests for cliente dashboard scope helpers."""

from apps.commercial.domain.services.cliente_dashboard_scope import (
    grupo_cabeca,
    in_placeholders,
    lpad_cli_codes,
    normalize_scope,
)


def test_normalize_scope_defaults_to_cliente() -> None:
    assert normalize_scope(None) == "cliente"
    assert normalize_scope("") == "cliente"
    assert normalize_scope("CLIENTE") == "cliente"


def test_normalize_scope_grupo() -> None:
    assert normalize_scope("grupo") == "grupo"
    assert normalize_scope(" Grupo ") == "grupo"


def test_grupo_cabeca_uses_self_when_no_cli_grupo() -> None:
    assert grupo_cabeca(codigo=5415, cli_grupo=None) == 5415


def test_grupo_cabeca_uses_cli_grupo_when_set() -> None:
    assert grupo_cabeca(codigo=100, cli_grupo=50) == 50


def test_in_placeholders_binds_each_code() -> None:
    sql, params = in_placeholders([10, 20, 30])
    assert sql == "%s, %s, %s"
    assert params == [10, 20, 30]


def test_in_placeholders_empty_matches_nothing() -> None:
    empty: list[int] = []
    sql, params = in_placeholders(empty)
    assert "DUAL" in sql
    assert params == []


def test_lpad_cli_codes() -> None:
    assert lpad_cli_codes([16320, 7]) == ["016320", "000007"]
