"""Domain exception to HTTP status mappings for administracao API."""

from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteDatabaseError,
    ClienteDocumentoInvalidError,
    ClienteError,
    ClienteForbiddenError,
    ClienteFuncionarioNotFoundError,
    ClienteNotFoundError,
    ClienteOwnershipError,
    ClienteProcedureError,
    ClienteRiscoInvalidError,
)

COMMERCIAL_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {
    ClienteNotFoundError: (404, None),
    ClienteFuncionarioNotFoundError: (404, None),
    ClienteForbiddenError: (403, None),
    ClienteDocumentoInvalidError: (400, None),
    ClienteRiscoInvalidError: (400, None),
    ClienteProcedureError: (400, None),
    ClienteOwnershipError: (409, None),
    ClienteDatabaseError: (502, "Oracle procedure call failed."),
    ClienteError: (400, None),
}
