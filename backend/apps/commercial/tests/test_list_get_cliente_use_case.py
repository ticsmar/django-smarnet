"""Unit tests for list/get cliente use cases with fakes."""

from __future__ import annotations

from apps.commercial.application.dtos.cliente_dtos import (
    ActorContextDTO,
    GetClienteInputDTO,
    ListClientesInputDTO,
)
from apps.commercial.application.use_cases.get_cliente_use_case import (
    GetClienteUseCase,
)
from apps.commercial.application.use_cases.list_clientes_use_case import (
    ListClientesUseCase,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteNotFoundError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteListRecord,
    ClienteRecord,
    PaginatedClientesResult,
)


class _FakeQueryRepo:
    def __init__(self) -> None:
        self.list_calls: list[dict] = []

    def list_clientes(self, *, actor_owner, search, page, page_size):
        self.list_calls.append(
            {
                "actor_owner": actor_owner,
                "search": search,
                "page": page,
                "page_size": page_size,
            }
        )
        return PaginatedClientesResult(
            items=[
                ClienteListRecord(
                    codigo=10,
                    cliente="ACME",
                    reduzido="ACME",
                    cgc="123",
                    cidade="Sertaozinho",
                    estado="SP",
                    emp_codigo=1,
                    bloqueado=0,
                    tipo="J",
                )
            ],
            total=1,
            page=page,
            page_size=page_size,
        )

    def get_empresa_tipo(self, emp_codigo):
        return "P"

    def get_cliente(self, *, actor_owner, codigo):
        if codigo != 10:
            return None
        return ClienteRecord(
            codigo=10,
            origem="01",
            cliente="ACME",
            reduzido="ACME",
            endereco1=None,
            endereco2=None,
            endereco3=None,
            cli_bairro=None,
            cidade="Sertaozinho",
            estado="SP",
            cep=None,
            pais=None,
            pai_codigo=76,
            est_codigo=None,
            telefone1=None,
            telefone2=None,
            fax=None,
            email=None,
            homepage=None,
            cgc="123",
            inscr_est=None,
            cli_inscr_mun=None,
            tipo="J",
            cli_tipo=None,
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
            emp_codigo=1,
            bloqueado=0,
            dt_atual=None,
            dt_cad=None,
            crs_cod_letra="C",
            crs_desc="Pendência financeira",
            crs_desc_longa="Nota C : Pendência financeira",
            crs_restricao=0,
        )


def _actor(owner: int = 1, link: int = 1) -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=99,
        link_emp_codigo=link,
        owner_emp_codigo=owner,
    )


def test_list_clientes_use_case_maps_can_edit():
    repo = _FakeQueryRepo()
    result = ListClientesUseCase(repo).execute(
        ListClientesInputDTO(actor=_actor(), search=" acme ", page=1, page_size=20)
    )
    assert result.total == 1
    assert result.items[0].can_edit is True
    assert repo.list_calls[0]["search"] == "acme"
    assert repo.list_calls[0]["actor_owner"] == 1


def test_get_cliente_use_case_not_found():
    repo = _FakeQueryRepo()
    try:
        GetClienteUseCase(repo).execute(GetClienteInputDTO(actor=_actor(), codigo=999))
        raise AssertionError("expected ClienteNotFoundError")
    except ClienteNotFoundError:
        pass


def test_get_cliente_use_case_ok():
    repo = _FakeQueryRepo()
    result = GetClienteUseCase(repo).execute(
        GetClienteInputDTO(actor=_actor(), codigo=10)
    )
    assert result.codigo == 10
    assert result.can_edit is True
    assert result.show_financeiro is True
    assert result.crs_cod_letra == "C"
    assert result.crs_desc == "Pendência financeira"
    assert result.crs_restricao == 0


def test_get_cliente_hides_financeiro_when_emp_tipo_c():
    repo = _FakeQueryRepo()
    repo.get_empresa_tipo = lambda emp_codigo: "C"
    result = GetClienteUseCase(repo).execute(
        GetClienteInputDTO(actor=_actor(), codigo=10)
    )
    assert result.show_financeiro is False
