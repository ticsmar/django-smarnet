"""Tests for grava cliente dados gerais use case + funcionário."""

from unittest.mock import MagicMock

import pytest

from apps.administracao.application.dtos.cliente_dtos import (
    ActorContextDTO,
    CreateClienteFromFuncionarioInputDTO,
    GravaClienteDadosGeraisInputDTO,
)
from apps.administracao.application.use_cases.create_cliente_from_funcionario_use_case import (
    CreateClienteFromFuncionarioUseCase,
)
from apps.administracao.application.use_cases.grava_cliente_dados_gerais_use_case import (
    GravaClienteDadosGeraisUseCase,
)
from apps.administracao.domain.exceptions.cliente_exceptions import (
    ClienteDatabaseError,
    ClienteDocumentoInvalidError,
    ClienteForbiddenError,
    ClienteFuncionarioNotFoundError,
    ClienteOwnershipError,
    ClienteProcedureError,
)
from apps.administracao.domain.repositories.cliente_repository import (
    CreateClienteFromFuncionarioResult,
    GravaClienteDadosGeraisResult,
)


def _actor(
    *,
    chapa: int | None = 4200,
    owner: int = 1,
    link: int | None = None,
) -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=chapa,
        link_emp_codigo=link,
        owner_emp_codigo=owner,
    )


def _input(
    actor: ActorContextDTO, codigo: int | None = None
) -> GravaClienteDadosGeraisInputDTO:
    return GravaClienteDadosGeraisInputDTO(
        actor=actor,
        codigo=codigo,
        tipo_cadastro="J",
        cliente="ACME LTDA",
    )


def test_grava_requires_chapa() -> None:
    repository = MagicMock()
    query_repository = MagicMock()

    with pytest.raises(ClienteForbiddenError):
        GravaClienteDadosGeraisUseCase(repository, query_repository).execute(
            _input(_actor(chapa=None))
        )
    repository.grava_dados_gerais.assert_not_called()


def test_grava_insert_returns_codigo_and_owner_ok() -> None:
    repository = MagicMock()
    repository.grava_dados_gerais.return_value = GravaClienteDadosGeraisResult(
        codigo=42,
        tipo_msg=None,
        msg=None,
        acao=None,
    )
    repository.read_emp_codigo.return_value = 1
    query_repository = MagicMock()

    result = GravaClienteDadosGeraisUseCase(repository, query_repository).execute(
        _input(_actor(owner=1))
    )

    assert result.codigo == 42
    repository.grava_dados_gerais.assert_called_once()
    repository.set_emp_codigo.assert_not_called()


def test_grava_insert_realigns_owner_when_mismatch() -> None:
    repository = MagicMock()
    repository.grava_dados_gerais.return_value = GravaClienteDadosGeraisResult(
        codigo=42,
        tipo_msg=None,
        msg=None,
        acao=None,
    )
    repository.read_emp_codigo.side_effect = [5, 7]
    query_repository = MagicMock()

    result = GravaClienteDadosGeraisUseCase(repository, query_repository).execute(
        _input(_actor(owner=7, link=7))
    )

    assert result.codigo == 42
    repository.set_emp_codigo.assert_called_once_with(codigo=42, emp_codigo=7)


def test_grava_raises_when_ownership_cannot_be_forced() -> None:
    repository = MagicMock()
    repository.grava_dados_gerais.return_value = GravaClienteDadosGeraisResult(
        codigo=42,
        tipo_msg=None,
        msg=None,
        acao=None,
    )
    repository.read_emp_codigo.side_effect = [5, 5]
    query_repository = MagicMock()

    with pytest.raises(ClienteOwnershipError):
        GravaClienteDadosGeraisUseCase(repository, query_repository).execute(
            _input(_actor(owner=7, link=7))
        )


def test_grava_surfaces_procedure_error() -> None:
    repository = MagicMock()
    repository.grava_dados_gerais.return_value = GravaClienteDadosGeraisResult(
        codigo=None,
        tipo_msg="E",
        msg="CGC invalido",
        acao="Corrigir",
    )
    query_repository = MagicMock()

    with pytest.raises(ClienteProcedureError) as exc:
        GravaClienteDadosGeraisUseCase(repository, query_repository).execute(
            _input(_actor())
        )
    assert "CGC invalido" in str(exc.value)


def test_grava_raises_when_procedure_returns_no_code() -> None:
    repository = MagicMock()
    repository.grava_dados_gerais.return_value = GravaClienteDadosGeraisResult(
        codigo=None,
        tipo_msg=None,
        msg=None,
        acao=None,
    )
    query_repository = MagicMock()

    with pytest.raises(ClienteDatabaseError):
        GravaClienteDadosGeraisUseCase(repository, query_repository).execute(
            _input(_actor())
        )


def test_grava_update_denies_out_of_scope() -> None:
    repository = MagicMock()
    query_repository = MagicMock()
    query_repository.get_cliente_emp_codigo.return_value = 5

    with pytest.raises(ClienteForbiddenError):
        GravaClienteDadosGeraisUseCase(repository, query_repository).execute(
            _input(_actor(owner=1), codigo=42)
        )

    repository.grava_dados_gerais.assert_not_called()


def test_grava_update_allows_in_scope() -> None:
    repository = MagicMock()
    repository.grava_dados_gerais.return_value = GravaClienteDadosGeraisResult(
        codigo=42,
        tipo_msg="A",
        msg="ok",
        acao=None,
    )
    repository.read_emp_codigo.return_value = 1
    query_repository = MagicMock()
    query_repository.get_cliente_emp_codigo.return_value = 1

    result = GravaClienteDadosGeraisUseCase(repository, query_repository).execute(
        _input(_actor(owner=1), codigo=42)
    )
    assert result.codigo == 42


def test_create_from_funcionario_requires_chapa() -> None:
    repository = MagicMock()

    with pytest.raises(ClienteForbiddenError):
        CreateClienteFromFuncionarioUseCase(repository).execute(
            CreateClienteFromFuncionarioInputDTO(
                actor=_actor(chapa=None),
                cnpj_or_cpf="12345678901",
            )
        )
    repository.create_from_funcionario.assert_not_called()


def test_create_from_funcionario_rejects_empty_document() -> None:
    repository = MagicMock()

    with pytest.raises(ClienteDocumentoInvalidError):
        CreateClienteFromFuncionarioUseCase(repository).execute(
            CreateClienteFromFuncionarioInputDTO(
                actor=_actor(),
                cnpj_or_cpf="///",
            )
        )
    repository.create_from_funcionario.assert_not_called()


def test_create_from_funcionario_missing_result() -> None:
    repository = MagicMock()
    repository.create_from_funcionario.return_value = (
        CreateClienteFromFuncionarioResult(codigo=None)
    )

    with pytest.raises(ClienteFuncionarioNotFoundError):
        CreateClienteFromFuncionarioUseCase(repository).execute(
            CreateClienteFromFuncionarioInputDTO(
                actor=_actor(),
                cnpj_or_cpf="12345678901",
            )
        )


def test_create_from_funcionario_realigns_owner() -> None:
    repository = MagicMock()
    repository.create_from_funcionario.return_value = (
        CreateClienteFromFuncionarioResult(codigo=200)
    )
    repository.read_emp_codigo.side_effect = [None, 1]

    result = CreateClienteFromFuncionarioUseCase(repository).execute(
        CreateClienteFromFuncionarioInputDTO(
            actor=_actor(owner=1),
            cnpj_or_cpf="12.345.678/0001-99",
        )
    )
    assert result.codigo == 200
    repository.create_from_funcionario.assert_called_once()
    call = repository.create_from_funcionario.call_args
    assert call.args[0].cnpj_or_cpf == "12345678000199"
    assert call.args[0].usu_chapa == 4200
