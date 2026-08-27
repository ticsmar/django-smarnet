"""Unit tests for cliente tab write use cases."""

from unittest.mock import MagicMock

import pytest

from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.application.use_cases.grava_cliente_tabs_use_case import (
    GravaClienteCobrancaInputDTO,
    GravaClienteCobrancaUseCase,
    GravaClienteContatoInputDTO,
    GravaClienteContatoUseCase,
    GravaClienteDadosFinanInputDTO,
    GravaClienteDadosFinanUseCase,
    GravaClienteEmbarqueInputDTO,
    GravaClienteEmbarqueUseCase,
    GravaClienteObsInputDTO,
    GravaClienteObsUseCase,
    SetClienteContatoPadraoInputDTO,
    SetClienteContatoPadraoUseCase,
    SetClienteEnderecoPadraoInputDTO,
    SetClienteEnderecoPadraoUseCase,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteForbiddenError,
)
from apps.commercial.domain.repositories.cliente_repository import (
    GravaClienteContatoResult,
)


def _actor() -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=99,
        link_emp_codigo=1,
        owner_emp_codigo=1,
    )


def test_grava_finan_forwards_apply_limites():
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    GravaClienteDadosFinanUseCase(repository, query).execute(
        GravaClienteDadosFinanInputDTO(
            actor=_actor(),
            codigo=10,
            limitecr=500,
            apply_limites=True,
        )
    )
    params = repository.grava_dados_finan.call_args.args[0]
    assert params.codigo == 10
    assert params.limitecr == 500
    assert params.apply_limites is True


def test_grava_obs_requires_chapa():
    repository = MagicMock()
    query = MagicMock()
    actor = ActorContextDTO(
        username="tester",
        usu_chapa=None,
        link_emp_codigo=1,
        owner_emp_codigo=1,
    )
    with pytest.raises(ClienteForbiddenError):
        GravaClienteObsUseCase(repository, query).execute(
            GravaClienteObsInputDTO(actor=actor, codigo=10, observa="x")
        )
    repository.grava_obs.assert_not_called()


def test_set_endereco_padrao_embarque_calls_set_embarque():
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    SetClienteEnderecoPadraoUseCase(repository, query).execute(
        SetClienteEnderecoPadraoInputDTO(
            actor=_actor(), codigo=10, chave="000000001", kind="embarque"
        )
    )
    repository.set_embarque_padrao.assert_called_once()
    repository.set_cobranca_padrao.assert_not_called()


def test_grava_finan_requires_chapa():
    repository = MagicMock()
    query = MagicMock()
    actor = ActorContextDTO(
        username="tester",
        usu_chapa=None,
        link_emp_codigo=1,
        owner_emp_codigo=1,
    )
    with pytest.raises(ClienteForbiddenError):
        GravaClienteDadosFinanUseCase(repository, query).execute(
            GravaClienteDadosFinanInputDTO(actor=actor, codigo=10)
        )
    repository.grava_dados_finan.assert_not_called()


def test_grava_finan_denies_out_of_scope():
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 5
    with pytest.raises(ClienteForbiddenError):
        GravaClienteDadosFinanUseCase(repository, query).execute(
            GravaClienteDadosFinanInputDTO(actor=_actor(), codigo=10)
        )
    repository.grava_dados_finan.assert_not_called()


def test_grava_contato_calls_repository():
    repository = MagicMock()
    repository.grava_contato.return_value = GravaClienteContatoResult(con_codigo=44)
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    result = GravaClienteContatoUseCase(repository, query).execute(
        GravaClienteContatoInputDTO(
            actor=_actor(),
            codigo=10,
            con_codigo=None,
            nome="Ana",
            nome_old=None,
            depto="Comercial",
            cargo=None,
            telefone=None,
            fax=None,
            celular=None,
            email="ana@acme.com",
            con_ativo=1,
            tipo_cadastro="I",
        )
    )
    assert result.con_codigo == 44
    params = repository.grava_contato.call_args.args[0]
    assert params.nome == "Ana"
    assert params.tipo_cadastro == "I"


def test_set_contato_padrao_calls_repository():
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    SetClienteContatoPadraoUseCase(repository, query).execute(
        SetClienteContatoPadraoInputDTO(
            actor=_actor(),
            codigo=10,
            con_codigo_com=1,
            con_codigo_tec=2,
            con_codigo_fin=3,
        )
    )
    params = repository.set_contato_padrao.call_args.args[0]
    assert params.con_codigo_com == 1
    assert params.con_codigo_tec == 2
    assert params.con_codigo_fin == 3


def test_grava_cobranca_calls_repository():
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    GravaClienteCobrancaUseCase(repository, query).execute(
        GravaClienteCobrancaInputDTO(
            actor=_actor(),
            codigo=10,
            chavecobra=None,
            ativo=1,
            cli_codigo_ref=20,
            tipo_cadastro="I",
        )
    )
    params = repository.grava_cobranca.call_args.args[0]
    assert params.cli_codigo_ref == 20
    assert params.tipo_cadastro == "I"


def test_grava_embarque_calls_repository():
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    GravaClienteEmbarqueUseCase(repository, query).execute(
        GravaClienteEmbarqueInputDTO(
            actor=_actor(),
            codigo=10,
            chave_emb="000000002",
            ativo=1,
            cli_codigo_ref=21,
            tipo_cadastro="A",
        )
    )
    params = repository.grava_embarque.call_args.args[0]
    assert params.chave_emb == "000000002"
    assert params.cli_codigo_ref == 21


def test_set_endereco_padrao_cobranca_calls_set_cobranca():
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    SetClienteEnderecoPadraoUseCase(repository, query).execute(
        SetClienteEnderecoPadraoInputDTO(
            actor=_actor(), codigo=10, chave="000000001", kind="cobranca"
        )
    )
    repository.set_cobranca_padrao.assert_called_once()
    repository.set_embarque_padrao.assert_not_called()


def test_grava_obs_happy_path():
    repository = MagicMock()
    query = MagicMock()
    query.get_cliente_emp_codigo.return_value = 1
    GravaClienteObsUseCase(repository, query).execute(
        GravaClienteObsInputDTO(actor=_actor(), codigo=10, observa="VIP")
    )
    params = repository.grava_obs.call_args.args[0]
    assert params.observa == "VIP"
