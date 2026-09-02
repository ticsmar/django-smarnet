"""Tests for dashboard credit Oracle value converters."""

from datetime import date, datetime
from decimal import Decimal
from unittest.mock import MagicMock, patch

from apps.commercial.infrastructure.repositories.oracle_dashboard_credito_queries import (
    _CAL_MESES,
    _as_datetime,
    _as_decimal,
    _faturamento_map,
)


def test_as_datetime_parses_view_char_date() -> None:
    parsed = _as_datetime("26/02/2018")
    assert parsed == datetime(2018, 2, 26)


def test_as_datetime_accepts_date_and_datetime() -> None:
    assert _as_datetime(datetime(2018, 2, 26, 12, 0)) == datetime(2018, 2, 26, 12, 0)
    assert _as_datetime(date(2016, 9, 28)) == datetime(2016, 9, 28)


def test_as_decimal_from_int_or_decimal() -> None:
    assert _as_decimal(-50) == Decimal("-50")
    assert _as_decimal(Decimal("51.5")) == Decimal("51.5")


@patch(
    "apps.commercial.infrastructure.repositories.oracle_dashboard_credito_queries.ensure_smar_client_identifier"
)
@patch(
    "apps.commercial.infrastructure.repositories.oracle_dashboard_credito_queries.connections"
)
def test_faturamento_map_filters_invoice_date(
    mock_connections: MagicMock, _ident: MagicMock
) -> None:
    cursor = MagicMock()
    cursor.fetchall.return_value = []
    mock_connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
    start = _CAL_MESES.replace("DT_DIA", "OL.DT_FATURAMENTO")
    _faturamento_map("%s", [16320], "YYYY/MM", start)
    sql = cursor.execute.call_args.args[0]
    assert "OL.DT_FATURAMENTO IS NOT NULL" in sql
    assert "SYSDATE - 365" in sql
    assert cursor.execute.call_args.args[1] == [16320]
