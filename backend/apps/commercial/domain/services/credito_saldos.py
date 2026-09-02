"""Credit-balance rules from Smarnet 3.01 ``calculaLimites()`` (estCli)."""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal

ZERO = Decimal("0")


def _amount(value: Decimal | None) -> Decimal:
    return value if value is not None else ZERO


@dataclass(frozen=True, slots=True)
class CreditoSaldosInput:
    titulos_a_vencer: Decimal | None
    titulos_vencidos: Decimal | None
    valores_faturar_prazo: Decimal | None
    limite_prazo: Decimal | None
    valores_faturar_antecipacao: Decimal | None
    valores_faturar_vista: Decimal | None
    saldo_antecipacoes: Decimal | None
    limite_vista: Decimal | None


@dataclass(frozen=True, slots=True)
class CreditoSaldos:
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


def compute_credito_saldos(raw: CreditoSaldosInput) -> CreditoSaldos:
    a_vencer = _amount(raw.titulos_a_vencer)
    vencidos = _amount(raw.titulos_vencidos)
    faturar_prazo = _amount(raw.valores_faturar_prazo)
    lp = _amount(raw.limite_prazo)
    faturar_ant = _amount(raw.valores_faturar_antecipacao)
    faturar_vista = _amount(raw.valores_faturar_vista)
    saldo_ant = _amount(raw.saldo_antecipacoes)
    lv = _amount(raw.limite_vista)
    concedido_prazo = a_vencer + vencidos + faturar_prazo
    concedido_vista = faturar_ant + faturar_vista + saldo_ant
    saldo_prazo = lp + concedido_prazo
    saldo_vista = lv + concedido_vista
    return CreditoSaldos(
        titulos_a_vencer=a_vencer,
        titulos_vencidos=vencidos,
        valores_faturar_prazo=faturar_prazo,
        credito_concedido_prazo=concedido_prazo,
        limite_prazo=lp,
        saldo_prazo=saldo_prazo,
        valores_faturar_antecipacao=faturar_ant,
        valores_faturar_vista=faturar_vista,
        saldo_antecipacoes=saldo_ant,
        credito_concedido_vista=concedido_vista,
        limite_vista=lv,
        saldo_vista=saldo_vista,
        saldo_geral=_saldo_geral(saldo_prazo, saldo_vista),
    )


def _saldo_geral(saldo_prazo: Decimal, saldo_vista: Decimal) -> Decimal:
    if saldo_vista <= ZERO and saldo_prazo <= ZERO:
        return saldo_vista + saldo_prazo
    if saldo_vista > ZERO:
        return saldo_vista
    return saldo_prazo
