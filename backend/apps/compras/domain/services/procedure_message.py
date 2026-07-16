"""Interpret Oracle procedure OUT message fields."""

from apps.compras.domain.exceptions.recebimento_exceptions import (
    RecebimentoProcedureError,
)


def raise_if_procedure_error(
    tipo_msg: str | None,
    msg: str | None,
    acao: str | None,
) -> None:
    if tipo_msg is not None and tipo_msg.strip().upper() == "E":
        raise RecebimentoProcedureError(msg or "Procedure failed.", acao)
