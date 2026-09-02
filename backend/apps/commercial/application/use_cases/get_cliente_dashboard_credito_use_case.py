"""Get cliente dashboard credito use case."""

from decimal import Decimal

from apps.commercial.application.dtos.cliente_dashboard_dtos import (
    ClienteDashboardCreditoOutputDTO,
    ClienteDashboardOsPendenteDTO,
    ClienteDashboardPropostaPontoDTO,
    ClienteDashboardQueryInputDTO,
    ClienteDashboardResumoDTO,
    ClienteDashboardSeriePontoDTO,
    ClienteDashboardTituloPendenteDTO,
)
from apps.commercial.domain.exceptions.cliente_exceptions import ClienteNotFoundError
from apps.commercial.domain.repositories.cliente_dashboard_repository import (
    ClienteDashboardCreditoRecord,
    ClienteDashboardOsPendenteRecord,
    ClienteDashboardRepository,
    ClienteDashboardSeriePontoRecord,
    ClienteDashboardTituloPendenteRecord,
)
from apps.commercial.domain.services.cliente_dashboard_scope import normalize_scope
from apps.commercial.domain.services.credito_saldos import (
    CreditoSaldosInput,
    compute_credito_saldos,
)
from apps.commercial.domain.services.credito_series import cumulative_mean, yearly_media

ZERO = Decimal("0")


class GetClienteDashboardCreditoUseCase:
    def __init__(self, repository: ClienteDashboardRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: ClienteDashboardQueryInputDTO
    ) -> ClienteDashboardCreditoOutputDTO:
        scope = normalize_scope(input_dto.scope)
        record = self._repository.get_credito(
            actor_owner=input_dto.actor.owner_emp_codigo,
            anchor_codigo=input_dto.codigo,
            scope=scope,
        )
        if record is None:
            raise ClienteNotFoundError(
                f"Cliente '{input_dto.codigo}' not found or out of scope."
            )
        return _to_credito_output(record, scope)


def _to_credito_output(
    record: ClienteDashboardCreditoRecord, scope: str
) -> ClienteDashboardCreditoOutputDTO:
    resumo = _resumo_from_record(record)
    mes_vals = [item.valor for item in record.faturamento_mes]
    ano_vals = [item.valor for item in record.faturamento_ano]
    return ClienteDashboardCreditoOutputDTO(
        codigo=record.codigo,
        nome=record.nome,
        grupo_cabeca=record.grupo_cabeca,
        scope=scope,
        limitecr=record.limitecr,
        cli_limite_crv=record.cli_limite_crv,
        bloqueado=record.bloqueado,
        risco_letra=record.risco_letra,
        risco_descricao=record.risco_descricao,
        risco_restricao=record.risco_restricao,
        mensagem_bloqueio=record.mensagem_bloqueio,
        total_os=record.total_os,
        os_abertas=record.os_abertas,
        membros_grupo=record.membros_grupo,
        resumo=resumo,
        titulos_pendentes_disponivel=record.titulos_pendentes_disponivel,
        oss_pendentes_disponivel=record.oss_pendentes_disponivel,
        series_disponivel=record.series_disponivel,
        titulos_pendentes=_map_titulos(record.titulos_pendentes),
        oss_pendentes=_map_oss(record.oss_pendentes),
        faturamento_mes=_map_serie(record.faturamento_mes, cumulative_mean(mes_vals)),
        faturamento_ano=_map_serie(record.faturamento_ano, yearly_media(ano_vals)),
        proposta_ano=[
            ClienteDashboardPropostaPontoDTO(
                periodo=item.periodo, proposta=item.proposta, os=item.os
            )
            for item in record.proposta_ano
        ],
    )


def _resumo_from_record(
    record: ClienteDashboardCreditoRecord,
) -> ClienteDashboardResumoDTO:
    saldos = compute_credito_saldos(
        CreditoSaldosInput(
            titulos_a_vencer=_sum_titulos(record.titulos_pendentes, vencidos=False),
            titulos_vencidos=_sum_titulos(record.titulos_pendentes, vencidos=True),
            valores_faturar_prazo=_sum_oss(record.oss_pendentes, "parcela"),
            limite_prazo=record.limitecr,
            valores_faturar_antecipacao=_sum_oss(record.oss_pendentes, "antecipacao"),
            valores_faturar_vista=_sum_oss(record.oss_pendentes, "avista"),
            saldo_antecipacoes=_sum_oss(record.oss_pendentes, "saldo_antecipacao"),
            limite_vista=record.cli_limite_crv,
        )
    )
    return ClienteDashboardResumoDTO(
        titulos_a_vencer=saldos.titulos_a_vencer,
        titulos_vencidos=saldos.titulos_vencidos,
        valores_faturar_prazo=saldos.valores_faturar_prazo,
        credito_concedido_prazo=saldos.credito_concedido_prazo,
        limite_prazo=saldos.limite_prazo,
        saldo_prazo=saldos.saldo_prazo,
        valores_faturar_antecipacao=saldos.valores_faturar_antecipacao,
        valores_faturar_vista=saldos.valores_faturar_vista,
        saldo_antecipacoes=saldos.saldo_antecipacoes,
        credito_concedido_vista=saldos.credito_concedido_vista,
        limite_vista=saldos.limite_vista,
        saldo_vista=saldos.saldo_vista,
        saldo_geral=saldos.saldo_geral,
        media_atraso_dias=record.media_atraso_dias,
        media_antecipacao_dias=record.media_antecipacao_dias,
    )


def _sum_titulos(
    items: list[ClienteDashboardTituloPendenteRecord], *, vencidos: bool
) -> Decimal:
    total = ZERO
    for item in items:
        dias = item.dias if item.dias is not None else 0
        if vencidos and dias <= 0:
            total += item.valor or ZERO
        if not vencidos and dias > 0:
            total += item.valor or ZERO
    return total


def _sum_oss(items: list[ClienteDashboardOsPendenteRecord], field: str) -> Decimal:
    total = ZERO
    for item in items:
        total += getattr(item, field) or ZERO
    return total


def _map_titulos(
    items: list[ClienteDashboardTituloPendenteRecord],
) -> list[ClienteDashboardTituloPendenteDTO]:
    return [
        ClienteDashboardTituloPendenteDTO(
            os=item.os,
            nf=item.nf,
            serie=item.serie,
            parcela=item.parcela,
            vencimento=item.vencimento,
            valor=item.valor,
            dias=item.dias,
        )
        for item in items
    ]


def _map_oss(
    items: list[ClienteDashboardOsPendenteRecord],
) -> list[ClienteDashboardOsPendenteDTO]:
    return [
        ClienteDashboardOsPendenteDTO(
            os=item.os,
            order_no=item.order_no,
            valor_faturado=item.valor_faturado,
            antecipacao=item.antecipacao,
            avista=item.avista,
            parcela=item.parcela,
            pg_antecipado=item.pg_antecipado,
            saldo_antecipacao=item.saldo_antecipacao,
        )
        for item in items
    ]


def _map_serie(
    pontos: list[ClienteDashboardSeriePontoRecord],
    medias: list[Decimal],
) -> list[ClienteDashboardSeriePontoDTO]:
    return [
        ClienteDashboardSeriePontoDTO(
            periodo=ponto.periodo, valor=ponto.valor, media=media
        )
        for ponto, media in zip(pontos, medias, strict=True)
    ]
