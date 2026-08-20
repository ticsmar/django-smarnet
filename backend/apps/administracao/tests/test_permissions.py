"""Unit tests for administracao permission helpers."""

from unittest.mock import MagicMock

from apps.administracao.presentation.permissions import (
    ADD_CLIENTE,
    CHANGE_CLIENTE,
    VIEW_CLIENTE,
    cliente_get_or_update_perms,
    cliente_list_or_grava_perms,
)


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
