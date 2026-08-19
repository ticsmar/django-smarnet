"""Unit tests for ConsultaCnpjUseCase (legacy verificaCNPJ.php)."""

from dataclasses import replace
from unittest.mock import MagicMock

import pytest

from apps.administracao.application.dtos.cliente_dtos import (
    ActorContextDTO,
    ConsultaCnpjInputDTO,
)
from apps.administracao.application.use_cases.consulta_cnpj_use_case import (
    ConsultaCnpjUseCase,
)
from apps.administracao.domain.exceptions.cliente_exceptions import (
    ClienteDocumentoInvalidError,
)
from apps.administracao.domain.repositories.cliente_query_repository import (
    ClienteDocumentoMatch,
    ClienteEstadoRecord,
)
from apps.administracao.domain.repositories.cnpj_consulta_gateway import (
    CepWsRecord,
    CnpjAtividade,
    CnpjWsRecord,
)


def _actor() -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=4200,
        link_emp_codigo=None,
        owner_emp_codigo=1,
    )


def _ws() -> CnpjWsRecord:
    return CnpjWsRecord(
        status="OK",
        nome="ACME LTDA",
        fantasia="ACME",
        cnpj="12345678000199",
        logradouro="RUA A",
        numero="10",
        complemento="SALA 1",
        cep="14160000",
        bairro="CENTRO",
        municipio="SERTAOZINHO",
        uf="SP",
        telefone="1633334444 / 1699998888",
        email="a@b.com",
        situacao="ATIVA",
        data_situacao="01/01/2020",
        natureza_juridica="206-2",
        abertura="01/01/2000",
        ultima_atualizacao="2024-01-01",
        tipo="MATRIZ",
        efr=None,
        motivo_situacao=None,
        situacao_especial=None,
        data_situacao_especial=None,
        capital_social="1000.00",
        atividade_principal=(CnpjAtividade(code="62.01-5-01", text="Software"),),
        atividades_secundarias=(),
        qsa=(),
    )


def test_consulta_cnpj_rejects_short_document() -> None:
    use_case = ConsultaCnpjUseCase(MagicMock(), MagicMock(), MagicMock())
    with pytest.raises(ClienteDocumentoInvalidError):
        use_case.execute(ConsultaCnpjInputDTO(actor=_actor(), cnpj="123"))


def test_consulta_cnpj_already_registered_blocks_create() -> None:
    query = MagicMock()
    query.find_by_cnpj.return_value = [
        ClienteDocumentoMatch(
            codigo=10,
            cliente="ACME",
            cgc="12345678000199",
            cidade="Sertaozinho",
            estado="SP",
            emp_codigo=1,
        )
    ]
    cnpj_ws = MagicMock()
    use_case = ConsultaCnpjUseCase(query, cnpj_ws, MagicMock())

    result = use_case.execute(
        ConsultaCnpjInputDTO(actor=_actor(), cnpj="12.345.678/0001-99")
    )

    query.find_by_cnpj.assert_called_once_with(actor_owner=1, cnpj="12345678000199")

    assert result.already_registered is True
    assert result.can_discard is False
    assert result.can_copy is False
    assert result.matches[0].codigo == 10
    assert result.message == "Cliente já cadastrado. Código 10."
    cnpj_ws.consultar.assert_not_called()


def test_consulta_cnpj_copies_receita_when_status_ok() -> None:
    query = MagicMock()
    query.find_by_cnpj.return_value = []
    query.find_estado_by_sigla.return_value = ClienteEstadoRecord(
        est_codigo=26, pai_codigo=76, est_nome="Sao Paulo"
    )
    cnpj_ws = MagicMock()
    cnpj_ws.consultar.return_value = _ws()
    cep_ws = MagicMock()
    cep_ws.consultar.return_value = CepWsRecord(
        uf="SP", ibge="3550704", logradouro=None, erro=False
    )
    use_case = ConsultaCnpjUseCase(query, cnpj_ws, cep_ws)

    result = use_case.execute(
        ConsultaCnpjInputDTO(actor=_actor(), cnpj="12345678000199")
    )

    assert result.already_registered is False
    assert result.can_discard is True
    assert result.can_copy is True
    assert result.copy_fields is not None
    assert result.copy_fields.cliente == "ACME LTDA"
    assert result.copy_fields.endereco1 == "RUA A, 10"
    assert result.copy_fields.est_codigo == 26
    assert result.copy_fields.cli_cod_mun_ibge == "50704"
    assert result.copy_fields.origem == "BR"
    assert result.receita is not None
    assert result.receita.telefone2 == "1699998888"
    query.find_estado_by_sigla.assert_called_once_with(sigla="SP", pai_codigo=76)


def test_consulta_cnpj_accepts_masked_leading_zero_and_letters() -> None:
    query = MagicMock()
    query.find_by_cnpj.return_value = []
    cnpj_ws = MagicMock()
    cnpj_ws.consultar.return_value = None
    use_case = ConsultaCnpjUseCase(query, cnpj_ws, MagicMock())

    use_case.execute(ConsultaCnpjInputDTO(actor=_actor(), cnpj="02.596.588/0001-13"))
    query.find_by_cnpj.assert_called_with(actor_owner=1, cnpj="02596588000113")

    use_case.execute(ConsultaCnpjInputDTO(actor=_actor(), cnpj="ab.123.456/0001-xy"))
    query.find_by_cnpj.assert_called_with(actor_owner=1, cnpj="AB1234560001XY")


def test_consulta_cnpj_ws_failure_allows_discard_only() -> None:
    query = MagicMock()
    query.find_by_cnpj.return_value = []
    cnpj_ws = MagicMock()
    cnpj_ws.consultar.return_value = None
    use_case = ConsultaCnpjUseCase(query, cnpj_ws, MagicMock())

    result = use_case.execute(
        ConsultaCnpjInputDTO(actor=_actor(), cnpj="12345678000199")
    )

    assert result.can_discard is True
    assert result.can_copy is False
    assert result.copy_fields is None
    assert result.receita is None


def test_consulta_cnpj_status_error_does_not_copy() -> None:
    query = MagicMock()
    query.find_by_cnpj.return_value = []
    query.find_estado_by_sigla.return_value = None
    cnpj_ws = MagicMock()
    cnpj_ws.consultar.return_value = replace(
        _ws(), status="ERROR", nome=None, fantasia=None
    )
    cep_ws = MagicMock()
    cep_ws.consultar.return_value = None
    use_case = ConsultaCnpjUseCase(query, cnpj_ws, cep_ws)

    result = use_case.execute(
        ConsultaCnpjInputDTO(actor=_actor(), cnpj="12345678000199")
    )

    assert result.can_discard is True
    assert result.can_copy is False
    assert result.copy_fields is None
    assert result.receita is not None
