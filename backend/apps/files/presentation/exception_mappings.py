"""Domain exception to HTTP status mappings for arquivos API."""

from apps.files.domain.exceptions.arquivo_exceptions import (
    ArquivoDatabaseError,
    ArquivoError,
    ArquivoNotFoundError,
    ArquivoPastaFixaError,
    ArquivoValidationError,
    SistemaCodigoConflictError,
    SistemaCodigoImmutableError,
    SistemaNotFoundError,
)

FILES_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {
    ArquivoNotFoundError: (404, None),
    SistemaNotFoundError: (404, None),
    ArquivoPastaFixaError: (409, None),
    SistemaCodigoConflictError: (409, None),
    SistemaCodigoImmutableError: (400, None),
    ArquivoValidationError: (400, None),
    ArquivoDatabaseError: (502, "Oracle file-manager call failed."),
    ArquivoError: (400, None),
}
