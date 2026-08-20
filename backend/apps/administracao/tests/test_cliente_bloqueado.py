"""Tests for BLOQUEADO / nota de risco visibility rules."""

from apps.administracao.domain.services.cliente_bloqueado import (
    DEFAULT_BLOQUEADO,
    DEFAULT_RISCO_LETRA,
    is_cliente_bloqueado_visible,
    normalize_bloqueado,
    resolve_risco_letra,
)
from apps.administracao.infrastructure.repositories.oracle_cliente_query_repository_impl import (
    _build_get_where,
    _build_list_where,
    _sql_bloqueado_visible_clause,
)


def test_normalize_bloqueado_null_and_zero_become_one() -> None:
    assert normalize_bloqueado(None) == DEFAULT_BLOQUEADO
    assert DEFAULT_BLOQUEADO == 1
    assert normalize_bloqueado(0) == 1
    assert normalize_bloqueado(2) == 2


def test_bloqueado_7_is_hidden() -> None:
    assert is_cliente_bloqueado_visible(None) is True
    assert is_cliente_bloqueado_visible(0) is True
    assert is_cliente_bloqueado_visible(2) is True
    assert is_cliente_bloqueado_visible(7) is False


def test_list_where_excludes_bloqueado_7_and_treats_null_as_one() -> None:
    where_sql, _params = _build_list_where(actor_owner=1, search="")
    assert "NVL(NULLIF(c.BLOQUEADO, 0), 1) NOT IN (7)" in where_sql
    assert "SF_VALIDA_CONS_CLIENTE" not in where_sql
    assert _sql_bloqueado_visible_clause() == "NVL(NULLIF(BLOQUEADO, 0), 1) NOT IN (7)"


def test_get_cliente_keeps_bloqueado_7_in_scope() -> None:
    where_sql, _params = _build_get_where(actor_owner=1)
    assert "NOT IN (7)" not in where_sql
    assert "SF_VALIDA_CONS_CLIENTE" not in where_sql
    assert "CODIGO = %s" in where_sql


def test_risco_letra_never_empty() -> None:
    assert resolve_risco_letra(None, None) == DEFAULT_RISCO_LETRA
    assert resolve_risco_letra(0, None) == "A"
    assert resolve_risco_letra(1, None) == "A"
    assert resolve_risco_letra(1, "  ") == "A"
    assert resolve_risco_letra(2, None) == "A"
    assert resolve_risco_letra(2, "B") == "B"
