"""Unit tests for cliente dashboard use cases."""

from __future__ import annotations

from decimal import Decimal

from apps.commercial.application.dtos.cliente_dashboard_dtos import (
    ClienteDashboardQueryInputDTO,
)
from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.application.use_cases.get_cliente_dashboard_credito_use_case import (
    GetClienteDashboardCreditoUseCase,
)
from apps.commercial.application.use_cases.list_cliente_dashboard_os_use_case import (
    ListClienteDashboardOsUseCase,
)
from apps.commercial.domain.exceptions.cliente_exceptions import ClienteNotFoundError
from apps.commercial.domain.repositories.cliente_dashboard_repository import (
    ClienteDashboardCreditoRecord,
    ClienteDashboardOsPendenteRecord,
    ClienteDashboardOsRecord,
    PaginatedDashboardOsResult,
    PaginatedDashboardTitulosResult,
)

_ACTOR = ActorContextDTO(
    username="tester",
    usu_chapa=4200,
    link_emp_codigo=None,
    owner_emp_codigo=1,
)


def _credito_record(**overrides: object) -> ClienteDashboardCreditoRecord:
    data: dict[str, object] = {
        "codigo": 10,
        "nome": "ACME",
        "grupo_cabeca": 10,
        "origem": None,
        "limitecr": Decimal("1000"),
        "cli_limite_crv": Decimal("500"),
        "bloqueado": 0,
        "risco_letra": "A",
        "risco_descricao": "Sem restrições",
        "risco_restricao": None,
        "mensagem_bloqueio": None,
        "total_os": 2,
        "os_abertas": 1,
        "membros_grupo": 1,
        "media_atraso_dias": None,
        "media_antecipacao_dias": None,
        "titulos_pendentes_disponivel": True,
        "oss_pendentes_disponivel": True,
        "series_disponivel": False,
    }
    data.update(overrides)
    return ClienteDashboardCreditoRecord(**data)


class _FakeDashboardRepo:
    def get_anchor(self, *, actor_owner, anchor_codigo):
        if anchor_codigo != 10:
            return None
        return _credito_record()

    def get_credito(self, *, actor_owner, anchor_codigo, scope):
        if anchor_codigo != 10:
            return None
        return _credito_record(
            oss_pendentes=[
                ClienteDashboardOsPendenteRecord(
                    os="2025/0001",
                    order_no=202500001,
                    valor_faturado=Decimal("0"),
                    antecipacao=Decimal("0"),
                    avista=Decimal("0"),
                    parcela=Decimal("-50"),
                    pg_antecipado=Decimal("0"),
                    saldo_antecipacao=Decimal("0"),
                )
            ]
        )

    def list_os(self, *, actor_owner, anchor_codigo, scope, page, page_size):
        if anchor_codigo != 10:
            return PaginatedDashboardOsResult(
                items=[], total=0, page=page, page_size=page_size
            )
        return PaginatedDashboardOsResult(
            items=[
                ClienteDashboardOsRecord(
                    order_no=99,
                    cust_key=10,
                    cliente_nome="ACME",
                    order_date=None,
                    origem="01",
                    origem_descricao="Nacional",
                    order_status="A",
                    os_encerrada=0,
                )
            ],
            total=1,
            page=page,
            page_size=page_size,
        )

    def list_titulos(self, *, actor_owner, anchor_codigo, scope, page, page_size):
        return PaginatedDashboardTitulosResult(
            items=[],
            total=0,
            page=page,
            page_size=page_size,
            titulos_disponivel=False,
        )


def test_get_credito_success() -> None:
    result = GetClienteDashboardCreditoUseCase(_FakeDashboardRepo()).execute(
        ClienteDashboardQueryInputDTO(actor=_ACTOR, codigo=10, scope="cliente")
    )
    assert result.codigo == 10
    assert result.total_os == 2
    assert result.scope == "cliente"
    assert result.resumo.valores_faturar_prazo == Decimal("-50")
    assert result.resumo.saldo_prazo == Decimal("950")
    assert result.resumo.saldo_geral == Decimal("500")


def test_get_credito_not_found() -> None:
    try:
        GetClienteDashboardCreditoUseCase(_FakeDashboardRepo()).execute(
            ClienteDashboardQueryInputDTO(actor=_ACTOR, codigo=99, scope="cliente")
        )
    except ClienteNotFoundError:
        return
    raise AssertionError("expected ClienteNotFoundError")


def test_list_os_success() -> None:
    result = ListClienteDashboardOsUseCase(_FakeDashboardRepo()).execute(
        ClienteDashboardQueryInputDTO(
            actor=_ACTOR, codigo=10, scope="grupo", page=1, page_size=20
        )
    )
    assert result.total == 1
    assert result.items[0].order_no == 99
    assert result.scope == "grupo"
