"""Unit tests for ConsultaFuncionarioUseCase (legacy verificaFunc.php)."""

from unittest.mock import MagicMock

import pytest

from apps.commercial.application.dtos.cliente_dtos import (
    ActorContextDTO,
    ConsultaFuncionarioInputDTO,
)
from apps.commercial.application.use_cases.consulta_funcionario_use_case import (
    ConsultaFuncionarioUseCase,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteDocumentoInvalidError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteDocumentoMatch,
    FuncionarioRhRecord,
)


def _actor() -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=4200,
        link_emp_codigo=None,
        owner_emp_codigo=1,
    )


def _rh() -> FuncionarioRhRecord:
    return FuncionarioRhRecord(
        nome="JOAO SILVA",
        chapa="1234",
        cpf="12345678901",
        rg="1234567",
        endereco="RUA A",
        municipio="SERTAOZINHO",
        bairro="CENTRO",
        uf="SP",
        cep="14160000",
        telefone="1633334444",
        email="joao@smar.com.br",
    )


def test_consulta_funcionario_rejects_short_cpf() -> None:
    use_case = ConsultaFuncionarioUseCase(MagicMock())
    with pytest.raises(ClienteDocumentoInvalidError):
        use_case.execute(ConsultaFuncionarioInputDTO(actor=_actor(), cpf="123"))


def test_consulta_funcionario_already_registered_blocks_copy() -> None:
    query = MagicMock()
    query.find_by_cpf.return_value = [
        ClienteDocumentoMatch(
            codigo=20,
            cliente="JOAO SILVA",
            cgc="12345678901",
            cidade="Sertaozinho",
            estado="SP",
            emp_codigo=1,
        )
    ]
    use_case = ConsultaFuncionarioUseCase(query)

    result = use_case.execute(
        ConsultaFuncionarioInputDTO(actor=_actor(), cpf="123.456.789-01")
    )

    query.find_by_cpf.assert_called_once_with(actor_owner=1, digits="12345678901")
    query.find_funcionario_rh.assert_not_called()
    assert result.already_registered is True
    assert result.can_copy is False
    assert result.message == "Cliente já cadastrado. Código 20."


def test_consulta_funcionario_allows_copy_when_rh_found() -> None:
    query = MagicMock()
    query.find_by_cpf.return_value = []
    query.find_funcionario_rh.return_value = _rh()
    use_case = ConsultaFuncionarioUseCase(query)

    result = use_case.execute(
        ConsultaFuncionarioInputDTO(actor=_actor(), cpf="12345678901")
    )

    assert result.already_registered is False
    assert result.can_copy is True
    assert result.funcionario is not None
    assert result.funcionario.nome == "JOAO SILVA"
    assert result.funcionario.chapa == "1234"


def test_consulta_funcionario_missing_rh_disables_copy() -> None:
    query = MagicMock()
    query.find_by_cpf.return_value = []
    query.find_funcionario_rh.return_value = None
    use_case = ConsultaFuncionarioUseCase(query)

    result = use_case.execute(
        ConsultaFuncionarioInputDTO(actor=_actor(), cpf="12345678901")
    )

    assert result.can_copy is False
    assert result.funcionario is None
    assert result.message is not None
