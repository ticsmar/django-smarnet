"""Tests for list clientes use case."""

from unittest.mock import MagicMock

import pytest

from apps.commercial.application.dtos.cliente_dtos import (
    ActorContextDTO,
    GetClienteInputDTO,
    ListClienteCatalogsInputDTO,
    ListClientesInputDTO,
    LookupClienteDocumentoInputDTO,
)
from apps.commercial.application.use_cases.get_cliente_use_case import (
    GetClienteUseCase,
)
from apps.commercial.application.use_cases.list_cliente_catalogs_use_case import (
    ListClienteCatalogsUseCase,
)
from apps.commercial.application.use_cases.list_clientes_use_case import (
    ListClientesUseCase,
)
from apps.commercial.application.use_cases.lookup_cliente_documento_use_case import (
    LookupClienteDocumentoUseCase,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteDocumentoInvalidError,
    ClienteNotFoundError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteDocumentoMatch,
    ClienteEstadoRecord,
    ClienteListRecord,
    ClienteOrigemRecord,
    ClientePaisRecord,
    ClienteRecord,
    PaginatedClientesResult,
)


def _actor(owner: int = 1, chapa: int | None = 4200) -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=chapa,
        link_emp_codigo=owner if owner != 1 else None,
        owner_emp_codigo=owner,
    )


def _list_record(codigo: int = 1) -> ClienteListRecord:
    return ClienteListRecord(
        codigo=codigo,
        cliente="ACME",
        reduzido="ACME",
        cgc="12345678000199",
        cidade="Sao Paulo",
        estado="SP",
        emp_codigo=1,
        bloqueado=0,
        tipo="J",
        pai_codigo=76,
        pais_nome="Brasil",
        endereco1="Rua A",
        cli_bairro="Centro",
        cep="01000-000",
        telefone1="1111",
    )


def _detail(codigo: int = 1, emp_codigo: int = 1) -> ClienteRecord:
    return ClienteRecord(
        codigo=codigo,
        origem=None,
        cliente="ACME",
        reduzido="ACME",
        endereco1="Rua A",
        endereco2=None,
        endereco3=None,
        cli_bairro="Centro",
        cidade="Sao Paulo",
        estado="SP",
        cep="01000-000",
        pais="BRA",
        pai_codigo=76,
        est_codigo=26,
        telefone1="1111",
        telefone2=None,
        fax=None,
        email="a@b.com",
        homepage=None,
        cgc="12345678000199",
        inscr_est=None,
        cli_inscr_mun=None,
        tipo="J",
        cli_tipo="F",
        cli_pes_tipo=None,
        cli_contribuinte=2,
        cli_ie_isento=0,
        cli_cnae=None,
        cli_cod_mun_ibge=None,
        cli_inscr_suframa=None,
        cli_nif=None,
        contato=None,
        contatotec=None,
        contatofin=None,
        observa=None,
        emp_codigo=emp_codigo,
        bloqueado=0,
        dt_atual=None,
        dt_cad=None,
    )


def test_list_clientes_clamps_pagination_and_forwards_owner() -> None:
    repository = MagicMock()
    repository.list_clientes.return_value = PaginatedClientesResult(
        items=[_list_record()],
        total=1,
        page=1,
        page_size=100,
    )

    result = ListClientesUseCase(repository).execute(
        ListClientesInputDTO(
            actor=_actor(owner=5),
            search="  acme  ",
            page=0,
            page_size=500,
        )
    )

    repository.list_clientes.assert_called_once_with(
        actor_owner=5,
        search="acme",
        page=1,
        page_size=100,
    )
    assert result.items[0].codigo == 1
    assert result.items[0].pai_codigo == 76
    assert result.items[0].pais_nome == "Brasil"
    assert result.items[0].endereco1 == "Rua A"
    assert result.total == 1


def test_get_cliente_happy_path() -> None:
    repository = MagicMock()
    repository.get_cliente.return_value = _detail(codigo=10)

    result = GetClienteUseCase(repository).execute(
        GetClienteInputDTO(actor=_actor(), codigo=10)
    )

    repository.get_cliente.assert_called_once_with(actor_owner=1, codigo=10)
    assert result.codigo == 10


def test_get_cliente_not_found_raises() -> None:
    repository = MagicMock()
    repository.get_cliente.return_value = None

    with pytest.raises(ClienteNotFoundError):
        GetClienteUseCase(repository).execute(
            GetClienteInputDTO(actor=_actor(), codigo=99)
        )


def test_lookup_documento_returns_matches_and_copy_fields() -> None:
    repository = MagicMock()
    repository.find_by_documento.return_value = [
        ClienteDocumentoMatch(
            codigo=10,
            cliente="ACME",
            cgc="12345678000199",
            cidade="Sao Paulo",
            estado="SP",
            emp_codigo=1,
        )
    ]
    repository.get_cliente.return_value = _detail(codigo=10)

    result = LookupClienteDocumentoUseCase(repository).execute(
        LookupClienteDocumentoInputDTO(
            actor=_actor(),
            documento="12.345.678/0001-99",
        )
    )

    repository.find_by_documento.assert_called_once_with(
        actor_owner=1, digits="12345678000199"
    )
    assert result.matches[0].codigo == 10
    assert result.copy_fields is not None
    assert result.copy_fields.cliente == "ACME"


def test_lookup_documento_empty_digits_raises() -> None:
    repository = MagicMock()
    with pytest.raises(ClienteDocumentoInvalidError):
        LookupClienteDocumentoUseCase(repository).execute(
            LookupClienteDocumentoInputDTO(actor=_actor(), documento="///")
        )
    repository.find_by_documento.assert_not_called()


def test_lookup_documento_without_matches_returns_none_copy() -> None:
    repository = MagicMock()
    repository.find_by_documento.return_value = []

    result = LookupClienteDocumentoUseCase(repository).execute(
        LookupClienteDocumentoInputDTO(actor=_actor(), documento="00000000000")
    )

    assert result.matches == []
    assert result.copy_fields is None
    repository.get_cliente.assert_not_called()


def test_list_catalogs_forwards_pai_codigo() -> None:
    repository = MagicMock()
    repository.list_paises.return_value = [
        ClientePaisRecord(pai_codigo=76, pai_nome="Brasil"),
    ]
    repository.list_estados.return_value = [
        ClienteEstadoRecord(est_codigo=26, pai_codigo=76, est_nome="Sao Paulo"),
    ]
    repository.list_origens.return_value = [
        ClienteOrigemRecord(origem="BR", descricao="Brasil"),
    ]

    result = ListClienteCatalogsUseCase(repository).execute(
        ListClienteCatalogsInputDTO(actor=_actor(), pai_codigo=76)
    )

    repository.list_estados.assert_called_once_with(pai_codigo=76)
    assert result.paises[0].pai_nome == "Brasil"
    assert result.estados[0].est_nome == "Sao Paulo"
    assert result.origens[0].origem == "BR"
