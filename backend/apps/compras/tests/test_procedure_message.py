"""Tests for procedure OUT message helper."""

import pytest

from apps.compras.domain.exceptions.recebimento_exceptions import (
    RecebimentoProcedureError,
)
from apps.compras.domain.services.procedure_message import raise_if_procedure_error


def test_raise_if_procedure_error_on_e() -> None:
    with pytest.raises(RecebimentoProcedureError):
        raise_if_procedure_error("E", "fail", "fix it")


def test_raise_if_procedure_error_ignores_aviso() -> None:
    raise_if_procedure_error("A", "warn", None)


def test_raise_if_procedure_error_ignores_none() -> None:
    raise_if_procedure_error(None, None, None)
