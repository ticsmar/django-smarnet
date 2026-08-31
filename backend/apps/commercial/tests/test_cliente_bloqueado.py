"""Tests for BLOQUEADO / nota de risco visibility rules."""

from apps.commercial.domain.services.cliente_bloqueado import (
    DEFAULT_BLOQUEADO,
    DEFAULT_RISCO_DESC_CURTA,
    DEFAULT_RISCO_LETRA,
    MSG_DUPLICIDADE,
    MSG_JUDICIAL,
    default_mensagem_bloqueio,
    is_cliente_bloqueado_visible,
    normalize_bloqueado,
    resolve_risco_desc_curta,
    resolve_risco_letra,
)
from apps.commercial.infrastructure.repositories.oracle_cliente_query_repository_impl import (
    _BLOQUEADO_JOIN,
    _build_get_where,
    _build_list_where,
    _sql_bloqueado_visible_clause,
)


def test_normalize_bloqueado_null_becomes_zero_nota_a() -> None:
    assert normalize_bloqueado(None) == DEFAULT_BLOQUEADO
    assert DEFAULT_BLOQUEADO == 0
    assert normalize_bloqueado(0) == 0
    assert normalize_bloqueado(2) == 2


def test_bloqueado_2_duplicidade_is_hidden() -> None:
    assert is_cliente_bloqueado_visible(None) is True
    assert is_cliente_bloqueado_visible(0) is True
    assert is_cliente_bloqueado_visible(7) is True
    assert is_cliente_bloqueado_visible(2) is False


def test_list_where_excludes_bloqueado_2_and_treats_null_as_zero() -> None:
    where_sql, _params = _build_list_where(actor_owner=1, search="")
    assert "NVL(c.BLOQUEADO, 0) NOT IN (2)" in where_sql
    assert "SF_VALIDA_CONS_CLIENTE" not in where_sql
    assert _sql_bloqueado_visible_clause() == "NVL(BLOQUEADO, 0) NOT IN (2)"


def test_join_uses_crs_cod_siaos_not_crs_codigo() -> None:
    assert "r.CRS_COD_SIAOS =" in _BLOQUEADO_JOIN
    assert "CRS_CODIGO" not in _BLOQUEADO_JOIN


def test_get_cliente_keeps_bloqueado_2_in_scope() -> None:
    where_sql, _params = _build_get_where(actor_owner=1)
    assert "NOT IN (2)" not in where_sql
    assert "SF_VALIDA_CONS_CLIENTE" not in where_sql
    assert "CODIGO = %s" in where_sql


def test_default_mensagem_uses_siaos_codes() -> None:
    assert default_mensagem_bloqueio(2, None) == MSG_DUPLICIDADE
    assert default_mensagem_bloqueio(5, "") == MSG_JUDICIAL
    assert default_mensagem_bloqueio(6, None) is None
    assert default_mensagem_bloqueio(2, "Duplicidade") == "Duplicidade"


def test_risco_letra_never_empty() -> None:
    assert resolve_risco_letra(None, None) == DEFAULT_RISCO_LETRA
    assert resolve_risco_letra(0, None) == "A"
    assert resolve_risco_letra(1, None) == "A"
    assert resolve_risco_letra(1, "  ") == "A"
    assert resolve_risco_letra(2, None) == "A"
    assert resolve_risco_letra(2, "E-") == "E-"


def test_risco_desc_curta_prefers_crs_desc_then_longa() -> None:
    assert resolve_risco_desc_curta("Sem crédito") == "Sem crédito"
    assert resolve_risco_desc_curta(None, "Nota B   : Sem crédito") == "Sem crédito"
    assert resolve_risco_desc_curta(None, None) == DEFAULT_RISCO_DESC_CURTA
