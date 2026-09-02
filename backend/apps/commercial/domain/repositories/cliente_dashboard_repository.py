"""Cliente dashboard read repository."""

from dataclasses import dataclass, field
from datetime import datetime
from decimal import Decimal
from typing import Protocol

from apps.commercial.domain.services.cliente_dashboard_scope import (
    ClienteDashboardScopeKind,
)


@dataclass(frozen=True, slots=True)
class ClienteDashboardTituloPendenteRecord:
    os: str | None
    nf: str | None
    serie: str | None
    parcela: str | None
    vencimento: datetime | None
    valor: Decimal | None
    dias: int | None


@dataclass(frozen=True, slots=True)
class ClienteDashboardOsPendenteRecord:
    os: str | None
    order_no: int | None
    valor_faturado: Decimal | None
    antecipacao: Decimal | None
    avista: Decimal | None
    parcela: Decimal | None
    pg_antecipado: Decimal | None
    saldo_antecipacao: Decimal | None


@dataclass(frozen=True, slots=True)
class ClienteDashboardSeriePontoRecord:
    periodo: str
    valor: Decimal


@dataclass(frozen=True, slots=True)
class ClienteDashboardPropostaPontoRecord:
    periodo: str
    proposta: Decimal
    os: Decimal


@dataclass(frozen=True, slots=True)
class ClienteDashboardCreditoRecord:
    codigo: int
    nome: str
    grupo_cabeca: int
    origem: str | None
    limitecr: Decimal | None
    cli_limite_crv: Decimal | None
    bloqueado: int
    risco_letra: str | None
    risco_descricao: str | None
    risco_restricao: str | None
    mensagem_bloqueio: str | None
    total_os: int
    os_abertas: int
    membros_grupo: int
    media_atraso_dias: int | None
    media_antecipacao_dias: int | None
    titulos_pendentes_disponivel: bool
    oss_pendentes_disponivel: bool
    series_disponivel: bool
    titulos_pendentes: list[ClienteDashboardTituloPendenteRecord] = field(
        default_factory=list
    )
    oss_pendentes: list[ClienteDashboardOsPendenteRecord] = field(default_factory=list)
    faturamento_mes: list[ClienteDashboardSeriePontoRecord] = field(
        default_factory=list
    )
    faturamento_ano: list[ClienteDashboardSeriePontoRecord] = field(
        default_factory=list
    )
    proposta_ano: list[ClienteDashboardPropostaPontoRecord] = field(
        default_factory=list
    )


@dataclass(frozen=True, slots=True)
class ClienteDashboardOsRecord:
    order_no: int
    cust_key: int
    cliente_nome: str
    order_date: datetime | None
    origem: str | None
    origem_descricao: str | None
    order_status: str | None
    os_encerrada: int | None


@dataclass(frozen=True, slots=True)
class ClienteDashboardTituloRecord:
    numero: str
    parcela: str | None
    valor: Decimal | None
    saldo: Decimal | None
    vencimento: datetime | None
    emissao: datetime | None
    status: str | None
    cliente_codigo: int


@dataclass(frozen=True, slots=True)
class PaginatedDashboardOsResult:
    items: list[ClienteDashboardOsRecord]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class PaginatedDashboardTitulosResult:
    items: list[ClienteDashboardTituloRecord]
    total: int
    page: int
    page_size: int
    titulos_disponivel: bool


class ClienteDashboardRepository(Protocol):
    def get_anchor(
        self,
        *,
        actor_owner: int,
        anchor_codigo: int,
    ) -> ClienteDashboardCreditoRecord | None: ...

    def get_credito(
        self,
        *,
        actor_owner: int,
        anchor_codigo: int,
        scope: ClienteDashboardScopeKind,
    ) -> ClienteDashboardCreditoRecord | None: ...

    def list_os(
        self,
        *,
        actor_owner: int,
        anchor_codigo: int,
        scope: ClienteDashboardScopeKind,
        page: int,
        page_size: int,
    ) -> PaginatedDashboardOsResult: ...

    def list_titulos(
        self,
        *,
        actor_owner: int,
        anchor_codigo: int,
        scope: ClienteDashboardScopeKind,
        page: int,
        page_size: int,
    ) -> PaginatedDashboardTitulosResult: ...
