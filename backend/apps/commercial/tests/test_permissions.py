"""Unit tests for administracao permission helpers."""

from unittest.mock import MagicMock

from apps.commercial.presentation.permissions import (
    ADD_CLIENTE,
    ADD_COBRANCA,
    ADD_CONTATO,
    ADD_EMBARQUE,
    CHANGE_CLIENTE,
    CHANGE_CLIENTE_RISCO,
    VIEW_CLIENTE,
    VIEW_COBRANCA,
    VIEW_CONTATO,
    VIEW_EMBARQUE,
    cliente_get_or_update_perms,
    cliente_list_or_grava_perms,
    cobranca_list_or_grava_perms,
    contato_list_or_grava_perms,
    embarque_list_or_grava_perms,
)
from apps.commercial.presentation.views.cliente_tab_views import ClienteBloqueioView


def _request(method: str, data: dict[str, object] | None = None) -> MagicMock:
    request = MagicMock()
    request.method = method.upper()
    request.data = data or {}
    return request


def test_list_requires_view_cliente() -> None:
    assert cliente_list_or_grava_perms(_request("get")) == [VIEW_CLIENTE]


def test_create_requires_add_cliente() -> None:
    assert cliente_list_or_grava_perms(_request("post", {"cliente": "A"})) == [
        ADD_CLIENTE
    ]


def test_detail_requires_view_cliente() -> None:
    assert cliente_get_or_update_perms(_request("get")) == [VIEW_CLIENTE]


def test_update_requires_change_cliente() -> None:
    assert cliente_get_or_update_perms(_request("put", {"cliente": "A"})) == [
        CHANGE_CLIENTE
    ]


def test_contato_list_requires_view() -> None:
    assert contato_list_or_grava_perms(_request("get")) == [VIEW_CONTATO]


def test_contato_create_requires_add() -> None:
    assert contato_list_or_grava_perms(_request("post")) == [ADD_CONTATO]


def test_cobranca_list_requires_view() -> None:
    assert cobranca_list_or_grava_perms(_request("get")) == [VIEW_COBRANCA]


def test_cobranca_create_requires_add() -> None:
    assert cobranca_list_or_grava_perms(_request("post")) == [ADD_COBRANCA]


def test_embarque_list_requires_view() -> None:
    assert embarque_list_or_grava_perms(_request("get")) == [VIEW_EMBARQUE]


def test_embarque_create_requires_add() -> None:
    assert embarque_list_or_grava_perms(_request("post")) == [ADD_EMBARQUE]


def test_bloqueio_view_requires_change_cliente_risco() -> None:
    assert ClienteBloqueioView.required_permissions == [CHANGE_CLIENTE_RISCO]
