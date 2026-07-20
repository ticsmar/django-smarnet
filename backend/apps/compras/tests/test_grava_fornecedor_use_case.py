"""Tests for grava fornecedor use case."""

from unittest.mock import MagicMock

import pytest

from apps.compras.application.dtos.recebimento_dtos import GravaFornecedorInputDTO
from apps.compras.application.use_cases.grava_fornecedor_use_case import (
    GravaFornecedorUseCase,
)
from apps.compras.domain.exceptions.recebimento_exceptions import (
    RecebimentoDatabaseError,
    RecebimentoProcedureError,
)
from apps.compras.domain.repositories.recebimento_repository import (
    GravaFornecedorResult,
)

_INPUT = GravaFornecedorInputDTO(
    razao_soc="ACME LTDA",
    nome_reduz="ACME",
    endereco="Rua A",
    bairro="Centro",
    munic="Sao Paulo",
    cep="01000-000",
    estado="SP",
    cod_pais=55,
)


def test_grava_fornecedor_happy_path() -> None:
    repository = MagicMock()
    repository.grava_fornecedor.return_value = GravaFornecedorResult(
        cod_fornec=10,
        tipo_msg=None,
        msg=None,
        acao=None,
    )

    result = GravaFornecedorUseCase(repository).execute(_INPUT)

    assert result.cod_fornec == 10
    assert result.tipo_msg is None
    repository.grava_fornecedor.assert_called_once()


def test_grava_fornecedor_aviso() -> None:
    repository = MagicMock()
    repository.grava_fornecedor.return_value = GravaFornecedorResult(
        cod_fornec=10,
        tipo_msg="A",
        msg="Cadastro atualizado",
        acao=None,
    )

    result = GravaFornecedorUseCase(repository).execute(_INPUT)

    assert result.tipo_msg == "A"
    assert result.msg == "Cadastro atualizado"


def test_grava_fornecedor_erro() -> None:
    repository = MagicMock()
    repository.grava_fornecedor.return_value = GravaFornecedorResult(
        cod_fornec=None,
        tipo_msg="E",
        msg="Razao social invalida",
        acao="Corrigir o campo",
    )

    with pytest.raises(RecebimentoProcedureError) as exc_info:
        GravaFornecedorUseCase(repository).execute(_INPUT)

    assert "Razao social invalida" in str(exc_info.value)
    assert "Corrigir o campo" in str(exc_info.value)


def test_grava_fornecedor_missing_code() -> None:
    repository = MagicMock()
    repository.grava_fornecedor.return_value = GravaFornecedorResult(
        cod_fornec=None,
        tipo_msg="A",
        msg=None,
        acao=None,
    )

    with pytest.raises(RecebimentoDatabaseError, match="did not return a code"):
        GravaFornecedorUseCase(repository).execute(_INPUT)
