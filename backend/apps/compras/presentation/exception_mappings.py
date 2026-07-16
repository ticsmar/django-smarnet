"""Domain exception to HTTP status mappings for compras API."""

from apps.compras.domain.exceptions.recebimento_exceptions import (
    FornecContatoNotFoundError,
    FornecedorNotFoundError,
    PaisNotFoundError,
    RecebimentoDatabaseError,
    RecebimentoError,
    RecebimentoProcedureError,
)

COMPRAS_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {
    FornecedorNotFoundError: (404, None),
    FornecContatoNotFoundError: (404, None),
    PaisNotFoundError: (404, None),
    RecebimentoProcedureError: (400, None),
    RecebimentoDatabaseError: (502, "Oracle procedure call failed."),
    RecebimentoError: (400, None),
}
