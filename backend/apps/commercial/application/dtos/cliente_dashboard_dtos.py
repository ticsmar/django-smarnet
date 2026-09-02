"""DTOs for cliente dashboard API."""

from dataclasses import dataclass, field
from datetime import datetime
from decimal import Decimal

from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO


@dataclass(frozen=True, slots=True)
class ClienteDashboardQueryInputDTO:
    actor: ActorContextDTO
    codigo: int
    scope: str
    page: int = 1
    page_size: int = 20


@dataclass(frozen=True, slots=True)
class ClienteDashboardResumoDTO:
    titulos_a_vencer: Decimal
    titulos_vencidos: Decimal
    valores_faturar_prazo: Decimal
    credito_concedido_prazo: Decimal
    limite_prazo: Decimal
    saldo_prazo: Decimal
    valores_faturar_antecipacao: Decimal
    valores_faturar_vista: Decimal
    saldo_antecipacoes: Decimal
    credito_concedido_vista: Decimal
    limite_vista: Decimal
    saldo_vista: Decimal
    saldo_geral: Decimal
    media_atraso_dias: int | None
    media_antecipacao_dias: int | None


@dataclass(frozen=True, slots=True)
class ClienteDashboardTituloPendenteDTO:
    os: str | None
    nf: str | None
    serie: str | None
    parcela: str | None
    vencimento: datetime | None
    valor: Decimal | None
    dias: int | None


@dataclass(frozen=True, slots=True)
class ClienteDashboardOsPendenteDTO:
    os: str | None
    order_no: int | None
    valor_faturado: Decimal | None
    antecipacao: Decimal | None
    avista: Decimal | None
    parcela: Decimal | None
    pg_antecipado: Decimal | None
    saldo_antecipacao: Decimal | None


@dataclass(frozen=True, slots=True)
class ClienteDashboardSeriePontoDTO:
    periodo: str
    valor: Decimal
    media: Decimal


@dataclass(frozen=True, slots=True)
class ClienteDashboardPropostaPontoDTO:
    periodo: str
    proposta: Decimal
    os: Decimal


@dataclass(frozen=True, slots=True)
class ClienteDashboardCreditoOutputDTO:
    codigo: int
    nome: str
    grupo_cabeca: int
    scope: str
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
    resumo: ClienteDashboardResumoDTO
    titulos_pendentes_disponivel: bool
    oss_pendentes_disponivel: bool
    series_disponivel: bool
    titulos_pendentes: list[ClienteDashboardTituloPendenteDTO] = field(
        default_factory=list
    )
    oss_pendentes: list[ClienteDashboardOsPendenteDTO] = field(default_factory=list)
    faturamento_mes: list[ClienteDashboardSeriePontoDTO] = field(default_factory=list)
    faturamento_ano: list[ClienteDashboardSeriePontoDTO] = field(default_factory=list)
    proposta_ano: list[ClienteDashboardPropostaPontoDTO] = field(default_factory=list)


@dataclass(frozen=True, slots=True)
class ClienteDashboardOsItemOutputDTO:
    order_no: int
    cust_key: int
    cliente_nome: str
    order_date: datetime | None
    origem: str | None
    origem_descricao: str | None
    order_status: str | None
    os_encerrada: int | None


@dataclass(frozen=True, slots=True)
class PaginatedClienteDashboardOsOutputDTO:
    items: list[ClienteDashboardOsItemOutputDTO]
    total: int
    page: int
    page_size: int
    scope: str


@dataclass(frozen=True, slots=True)
class ClienteDashboardTituloItemOutputDTO:
    numero: str
    parcela: str | None
    valor: Decimal | None
    saldo: Decimal | None
    vencimento: datetime | None
    emissao: datetime | None
    status: str | None
    cliente_codigo: int


@dataclass(frozen=True, slots=True)
class PaginatedClienteDashboardTitulosOutputDTO:
    items: list[ClienteDashboardTituloItemOutputDTO]
    total: int
    page: int
    page_size: int
    scope: str
    titulos_disponivel: bool
