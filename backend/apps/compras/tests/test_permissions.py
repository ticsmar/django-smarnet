"""Unit tests for compras permission helpers."""

from unittest.mock import MagicMock

from apps.compras.presentation.permissions import (
    ADD_FORNEC_CONTATO,
    ADD_FORNECEDOR,
    CHANGE_FORNEC_CONTATO,
    CHANGE_FORNECEDOR,
    DELETE_FORNEC_CONTATO,
    VIEW_FORNEC_CONTATO,
    VIEW_FORNECEDOR,
    fornec_contato_get_or_delete_perms,
    fornec_contato_list_or_grava_perms,
    fornecedor_list_or_grava_perms,
)


def _request(method: str, data: dict | None = None) -> MagicMock:
    request = MagicMock()
    request.method = method.upper()
    request.data = data or {}
    return request


def test_fornecedor_list_requires_view() -> None:
    assert fornecedor_list_or_grava_perms(_request("get")) == [VIEW_FORNECEDOR]


def test_fornecedor_create_requires_add() -> None:
    assert fornecedor_list_or_grava_perms(_request("post", {"razao_soc": "A"})) == [
        ADD_FORNECEDOR
    ]


def test_fornecedor_update_requires_change() -> None:
    assert fornecedor_list_or_grava_perms(
        _request("post", {"cod_fornec": 1, "razao_soc": "A"})
    ) == [CHANGE_FORNECEDOR]


def test_contato_list_requires_view() -> None:
    assert fornec_contato_list_or_grava_perms(_request("get")) == [VIEW_FORNEC_CONTATO]


def test_contato_create_requires_add() -> None:
    assert fornec_contato_list_or_grava_perms(_request("post", {"nome": "Joao"})) == [
        ADD_FORNEC_CONTATO
    ]


def test_contato_update_requires_change() -> None:
    assert fornec_contato_list_or_grava_perms(
        _request("post", {"cod_contato": 9, "nome": "Joao"})
    ) == [CHANGE_FORNEC_CONTATO]


def test_contato_delete_requires_delete() -> None:
    assert fornec_contato_get_or_delete_perms(_request("delete")) == [
        DELETE_FORNEC_CONTATO
    ]


def test_contato_get_requires_view() -> None:
    assert fornec_contato_get_or_delete_perms(_request("get")) == [VIEW_FORNEC_CONTATO]
