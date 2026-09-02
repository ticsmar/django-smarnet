"""Oracle reads for cliente credit dashboard (estCli views and series)."""

from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal
from typing import TYPE_CHECKING, cast

import oracledb
from django.db import DatabaseError, connections

if TYPE_CHECKING:
    from collections.abc import Sequence

from apps.commercial.domain.exceptions.cliente_exceptions import ClienteDatabaseError
from apps.commercial.domain.repositories.cliente_dashboard_repository import (
    ClienteDashboardOsPendenteRecord,
    ClienteDashboardPropostaPontoRecord,
    ClienteDashboardSeriePontoRecord,
    ClienteDashboardTituloPendenteRecord,
)
from apps.shared.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_DB_ALIAS = "smar"

_CAL_ANOS = (
    "TRUNC(DT_DIA) > TRUNC(TO_DATE('01/01/'||TO_CHAR(SYSDATE-(356*11),"
    "'YYYY'),'DD/MM/YYYY'))"
)
_CAL_MESES = "TRUNC(DT_DIA) > SYSDATE - 365 + 30"
_FATURAMENTO_EXPR = (
    "SIAOS.PCK_DQANET.SF_CONVERTE_MOEDA("
    "OL.QTY_ORDERED * (OL.VLVENDACLI + "
    "SIAOS.PCK_SMART_SALES3.SF_CALCULA_IMP_SAIDA("
    "OL.ORDER_NO, NULL, OL.VLVENDACLI, 1, 1, OL.IPI, OL.ISS)), "
    "NVL(OS.MOEDA, 'R$'), 'R$', OL.DT_FATURAMENTO)"
)

type SqlBind = bool | int | float | Decimal | str


def fetch_titulos_pendentes(
    lpad_sql: str, params: Sequence[SqlBind]
) -> tuple[list[ClienteDashboardTituloPendenteRecord], bool]:
    sql = f"""
        SELECT T.OS, T.NF, T.SERIE, T.PARCELA, T.E1_VENCTO, T.E1_VALOR, T.DIAS
          FROM INTEGRACAO.VW_TITULOS_PEND T
         WHERE TRIM(T.PARCELA) != 'RA'
           AND T.COD_CLI IN ({lpad_sql})
         ORDER BY T.DIAS, T.OS, T.NF, T.SERIE, T.PARCELA
    """
    rows = _fetch(sql, params)
    if rows is None:
        return [], False
    items = [
        ClienteDashboardTituloPendenteRecord(
            os=_as_str(row[0]),
            nf=_as_str(row[1]),
            serie=_as_str(row[2]),
            parcela=_as_str(row[3]),
            vencimento=_as_datetime(row[4]),
            valor=_as_decimal(row[5]),
            dias=_as_int(row[6]),
        )
        for row in rows
    ]
    return items, True


def fetch_oss_pendentes(
    cust_sql: str, params: Sequence[SqlBind]
) -> tuple[list[ClienteDashboardOsPendenteRecord], bool]:
    sql = f"""
        SELECT T.OS, T.ORDER_NO, T.FATURADO, T.ANTECIPACAO, T.AVISTA, T.PARCELA,
               T.PG_ANTECIPADO, T.SALDO
          FROM INTEGRACAO.VW_OSS_PEND T
         WHERE T.CUST_KEY IN ({cust_sql})
         ORDER BY T.ORDER_NO
    """
    rows = _fetch(sql, params)
    if rows is None:
        return [], False
    items = [
        ClienteDashboardOsPendenteRecord(
            os=_as_str(row[0]),
            order_no=_as_int(row[1]),
            valor_faturado=_as_decimal(row[2]),
            antecipacao=_as_decimal(row[3]),
            avista=_as_decimal(row[4]),
            parcela=_as_decimal(row[5]),
            pg_antecipado=_as_decimal(row[6]),
            saldo_antecipacao=_as_decimal(row[7]),
        )
        for row in rows
    ]
    return items, True


def fetch_pagamento_medias(
    lpad_sql: str, params: Sequence[SqlBind], origem: str | None
) -> tuple[int | None, int | None]:
    view = (
        "INTEGRACAO.VW_TITULO_INV_SAIDA"
        if (origem or "").strip().upper() == "CO"
        else "INTEGRACAO.VW_TITULO_NF_SAIDA"
    )
    atraso = _avg_dias(view, lpad_sql, params, "T.E1_VENCTO - T.E1_BAIXA < 0")
    antecipacao = _avg_dias(view, lpad_sql, params, "T.E1_VENCTO - T.E1_BAIXA > 0")
    return atraso, antecipacao


def fetch_faturamento_ano(
    cust_sql: str, params: Sequence[SqlBind]
) -> tuple[list[ClienteDashboardSeriePontoRecord], bool]:
    return _faturamento_series(
        cust_sql,
        params,
        "YYYY",
        _CAL_ANOS,
    )


def fetch_faturamento_mes(
    cust_sql: str, params: Sequence[SqlBind]
) -> tuple[list[ClienteDashboardSeriePontoRecord], bool]:
    return _faturamento_series(
        cust_sql,
        params,
        "YYYY/MM",
        _CAL_MESES,
    )


def fetch_proposta_ano(
    codigo_sql: str, params: Sequence[SqlBind]
) -> tuple[list[ClienteDashboardPropostaPontoRecord], bool]:
    periods = _calendar_periods("YYYY", _CAL_ANOS)
    if periods is None:
        return [], False
    proposta = _proposta_map(codigo_sql, params, os_aberta=False)
    os_vals = _proposta_map(codigo_sql, params, os_aberta=True)
    if proposta is None or os_vals is None:
        return [], False
    items = [
        ClienteDashboardPropostaPontoRecord(
            periodo=periodo,
            proposta=proposta.get(periodo, Decimal("0")),
            os=os_vals.get(periodo, Decimal("0")),
        )
        for periodo in periods
    ]
    return items, True


def _faturamento_series(
    cust_sql: str, params: Sequence[SqlBind], fmt: str, start_sql: str
) -> tuple[list[ClienteDashboardSeriePontoRecord], bool]:
    periods = _calendar_periods(fmt, start_sql)
    if periods is None:
        return [], False
    fat_start = start_sql.replace("DT_DIA", "OL.DT_FATURAMENTO")
    values = _faturamento_map(cust_sql, params, fmt, fat_start)
    if values is None:
        return [], False
    return _zip_series(periods, values), True


def _avg_dias(
    view: str, lpad_sql: str, params: Sequence[SqlBind], extra: str
) -> int | None:
    sql = f"""
        SELECT ROUND(AVG(T.E1_VENCTO - T.E1_BAIXA))
          FROM {view} T
         WHERE T.E1_TIPO IN ('NF')
           AND T.COD_CLI IN ({lpad_sql})
           AND T.E1_VENCTO >= TO_DATE('20160101', 'YYYYMMDD')
           AND T.E1_BAIXA IS NOT NULL
           AND {extra}
    """
    rows = _fetch(sql, params)
    if not rows or rows[0][0] is None:
        return None
    return _as_int(rows[0][0])


def _calendar_periods(fmt: str, start_sql: str) -> list[str] | None:
    sql = f"""
        SELECT TO_CHAR(CL.DT_DIA, '{fmt}') PERIODO
          FROM GERAL.CALENDARIO CL
         WHERE {start_sql}
           AND DT_DIA <= SYSDATE
         GROUP BY TO_CHAR(CL.DT_DIA, '{fmt}')
         ORDER BY TO_CHAR(CL.DT_DIA, '{fmt}')
    """
    rows = _fetch(sql, [])
    if rows is None:
        return None
    return [str(row[0]) for row in rows if row[0] is not None]


def _faturamento_map(
    cust_sql: str, params: Sequence[SqlBind], fmt: str, start_sql: str
) -> dict[str, Decimal] | None:
    sql = f"""
        SELECT TO_CHAR(OL.DT_FATURAMENTO, '{fmt}') PERIODO,
               NVL(SUM({_FATURAMENTO_EXPR}) / 1000, 0) VALOR
          FROM SIAOS.OEHDR OS
         INNER JOIN SIAOS.OELIN OL ON OS.ORDER_NO = OL.ORDER_NO
         WHERE OS.CUST_KEY IN ({cust_sql})
           AND OL.DT_FATURAMENTO IS NOT NULL
           AND {start_sql}
         GROUP BY TO_CHAR(OL.DT_FATURAMENTO, '{fmt}')
    """
    rows = _fetch(sql, params)
    if rows is None:
        return None
    return {str(row[0]): _as_decimal(row[1]) or Decimal("0") for row in rows if row[0]}


def _proposta_map(
    codigo_sql: str, params: Sequence[SqlBind], *, os_aberta: bool
) -> dict[str, Decimal] | None:
    filter_os = "WHERE T.STATUS_PROPOSTA = 'OS ABERTA'" if os_aberta else ""
    sql = f"""
        SELECT TO_CHAR(ANO) PERIODO, NVL(SUM(VALOR_RS) / 1000, 0) VALOR
          FROM (
                SELECT T.COD_CLIENTE, T.ANO, T.VALOR_RS
                  FROM SADIG.VM_PROPOSTA T
                 {filter_os}
                UNION ALL
                SELECT T.COD_CLIENTE, T.ANO, T.VALOR_RS
                  FROM SADIG.VM_PROPOSTA_ANTIGA T
                 {filter_os}
               )
         WHERE COD_CLIENTE IN (
                SELECT TO_CHAR(CODIGO) FROM SIAOS.CLIENTE WHERE CODIGO IN ({codigo_sql})
               )
           AND ANO >= TO_NUMBER(TO_CHAR(SYSDATE - (356 * 11), 'YYYY'))
         GROUP BY ANO
    """
    rows = _fetch(sql, params)
    if rows is None:
        return None
    return {str(row[0]): _as_decimal(row[1]) or Decimal("0") for row in rows if row[0]}


def _zip_series(
    periods: list[str], values: dict[str, Decimal]
) -> list[ClienteDashboardSeriePontoRecord]:
    return [
        ClienteDashboardSeriePontoRecord(
            periodo=periodo, valor=values.get(periodo, Decimal("0"))
        )
        for periodo in periods
    ]


def _fetch(sql: str, params: Sequence[SqlBind]) -> list[tuple[object, ...]] | None:
    ensure_smar_client_identifier()
    try:
        with connections[_DB_ALIAS].cursor() as cursor:
            cursor.execute(sql, list(params))
            return cast("list[tuple[object, ...]]", cursor.fetchall())
    except (DatabaseError, oracledb.Error) as exc:
        if _is_optional_object_error(exc):
            return None
        raise ClienteDatabaseError(str(exc)) from exc


def _is_optional_object_error(exc: Exception) -> bool:
    message = str(exc).upper()
    return any(
        token in message
        for token in ("ORA-00942", "ORA-01031", "ORA-00904", "ORA-06576", "ORA-00936")
    )


def _as_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(float(str(value)))


def _as_str(value: object | None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _as_decimal(value: object | None) -> Decimal | None:
    if value is None:
        return None
    return Decimal(str(value))


def _as_datetime(value: object | None) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    if isinstance(value, date):
        return datetime(value.year, value.month, value.day)
    text = str(value).strip()
    if not text:
        return None
    for fmt in ("%d/%m/%Y", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d"):
        try:
            return datetime.strptime(text[:19] if " " in fmt else text[:10], fmt)
        except ValueError:
            continue
    return None
