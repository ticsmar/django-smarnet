"""Unit tests for credit-balance formula (estCli calculaLimites)."""

from decimal import Decimal

from apps.commercial.domain.services.credito_saldos import (
    CreditoSaldosInput,
    compute_credito_saldos,
)
from apps.commercial.domain.services.credito_series import cumulative_mean, yearly_media


def test_saldos_empty_uses_limits() -> None:
    result = compute_credito_saldos(
        CreditoSaldosInput(
            titulos_a_vencer=None,
            titulos_vencidos=None,
            valores_faturar_prazo=None,
            limite_prazo=Decimal("1246990"),
            valores_faturar_antecipacao=None,
            valores_faturar_vista=None,
            saldo_antecipacoes=None,
            limite_vista=Decimal("200000"),
        )
    )
    assert result.credito_concedido_prazo == Decimal("0")
    assert result.saldo_prazo == Decimal("1246990")
    assert result.saldo_vista == Decimal("200000")
    assert result.saldo_geral == Decimal("200000")


def test_saldos_term_usage_and_general_picks_cash_when_positive() -> None:
    result = compute_credito_saldos(
        CreditoSaldosInput(
            titulos_a_vencer=Decimal("0"),
            titulos_vencidos=Decimal("0"),
            valores_faturar_prazo=Decimal("-5157.02"),
            limite_prazo=Decimal("1246990"),
            valores_faturar_antecipacao=Decimal("0"),
            valores_faturar_vista=Decimal("0"),
            saldo_antecipacoes=Decimal("0"),
            limite_vista=Decimal("200000"),
        )
    )
    assert result.credito_concedido_prazo == Decimal("-5157.02")
    assert result.saldo_prazo == Decimal("1241832.98")
    assert result.saldo_vista == Decimal("200000")
    assert result.saldo_geral == Decimal("200000")


def test_saldos_geral_sums_when_both_non_positive() -> None:
    result = compute_credito_saldos(
        CreditoSaldosInput(
            titulos_a_vencer=Decimal("-100"),
            titulos_vencidos=Decimal("0"),
            valores_faturar_prazo=Decimal("0"),
            limite_prazo=Decimal("50"),
            valores_faturar_antecipacao=Decimal("-20"),
            valores_faturar_vista=Decimal("0"),
            saldo_antecipacoes=Decimal("0"),
            limite_vista=Decimal("10"),
        )
    )
    assert result.saldo_prazo == Decimal("-50")
    assert result.saldo_vista == Decimal("-10")
    assert result.saldo_geral == Decimal("-60")


def test_yearly_media_uses_last_five() -> None:
    values = [Decimal(str(n)) for n in (10, 20, 30, 40, 50, 60)]
    medias = yearly_media(values)
    assert medias[0] == Decimal("10")
    assert medias[4] == Decimal("30")
    assert medias[5] == Decimal("40")


def test_cumulative_mean() -> None:
    values = [Decimal("10"), Decimal("30"), Decimal("20")]
    assert cumulative_mean(values) == [
        Decimal("10"),
        Decimal("20"),
        Decimal("20"),
    ]
