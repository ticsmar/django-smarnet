"""Tests for fornecedor activate/inactivate and contato use cases."""

from unittest.mock import MagicMock

import pytest

from apps.compras.application.dtos.recebimento_dtos import GravaFornecContatoInputDTO
from apps.compras.application.use_cases.ativa_fornecedor_use_case import (
    AtivaFornecedorUseCase,
)
from apps.compras.application.use_cases.exclui_fornec_contato_use_case import (
    ExcluiFornecContatoUseCase,
)
from apps.compras.application.use_cases.grava_fornec_contato_use_case import (
    GravaFornecContatoUseCase,
)
from apps.compras.application.use_cases.inativa_fornecedor_use_case import (
    InativaFornecedorUseCase,
)
from apps.compras.domain.exceptions.recebimento_exceptions import (
    RecebimentoProcedureError,
)
from apps.compras.domain.repositories.recebimento_repository import (
    GravaFornecContatoResult,
)


def test_ativa_fornecedor() -> None:
    repository = MagicMock()
    AtivaFornecedorUseCase(repository).execute(7)
    repository.ativa_fornecedor.assert_called_once_with(7)


def test_inativa_fornecedor() -> None:
    repository = MagicMock()
    InativaFornecedorUseCase(repository).execute(7)
    repository.inativa_fornecedor.assert_called_once_with(7)


def test_exclui_fornec_contato() -> None:
    repository = MagicMock()
    ExcluiFornecContatoUseCase(repository).execute(3)
    repository.exclui_fornec_contato.assert_called_once_with(3)


def test_grava_fornec_contato_happy_path() -> None:
    repository = MagicMock()
    repository.grava_fornec_contato.return_value = GravaFornecContatoResult(
        cod_contato=5,
        tipo_msg=None,
        msg=None,
        acao=None,
    )

    result = GravaFornecContatoUseCase(repository).execute(
        GravaFornecContatoInputDTO(
            cod_fornec=1,
            nome="Joao",
            cargo="Gerente",
            email="a@b.com",
            telefone="11999999999",
        )
    )

    assert result.cod_contato == 5


def test_grava_fornec_contato_erro() -> None:
    repository = MagicMock()
    repository.grava_fornec_contato.return_value = GravaFornecContatoResult(
        cod_contato=None,
        tipo_msg="E",
        msg="Email invalido",
        acao=None,
    )

    with pytest.raises(RecebimentoProcedureError):
        GravaFornecContatoUseCase(repository).execute(
            GravaFornecContatoInputDTO(
                cod_fornec=1,
                nome="Joao",
                cargo="Gerente",
                email="bad",
                telefone="11999999999",
            )
        )
