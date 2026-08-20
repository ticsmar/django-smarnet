"""Tests for SF_CHECA_CADASTRO interpretation."""

from apps.administracao.domain.services.cliente_cadastro import (
    CADASTRO_CNPJ_INVALIDO,
    CADASTRO_INCOMPLETO,
    CADASTRO_OK,
    is_cadastro_alerta,
    normalize_cadastro_checagem,
)


def test_cadastro_alerta_only_for_incomplete_or_invalid_cnpj() -> None:
    assert is_cadastro_alerta(None) is False
    assert is_cadastro_alerta(CADASTRO_OK) is False
    assert is_cadastro_alerta(CADASTRO_INCOMPLETO) is True
    assert is_cadastro_alerta(CADASTRO_CNPJ_INVALIDO) is True
    assert is_cadastro_alerta(999) is False


def test_normalize_cadastro_checagem() -> None:
    assert normalize_cadastro_checagem(None) is None
    assert normalize_cadastro_checagem(1) == 1
