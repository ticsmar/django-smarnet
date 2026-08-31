"""Domain exceptions for the file manager."""


class ArquivoError(Exception):
    """Base arquivos error."""


class ArquivoNotFoundError(ArquivoError):
    """Raised when a folder or file is not in the sistema/filtro scope."""


class ArquivoPastaFixaError(ArquivoError):
    """Raised when a fixed folder cannot be moved or sent to trash."""


class ArquivoValidationError(ArquivoError):
    """Raised when a name, description, or type is invalid."""


class ArquivoDatabaseError(ArquivoError):
    """Raised when the Oracle DML/query fails."""


class SistemaNotFoundError(ArquivoError):
    """Raised when the Settings catalog has no matching codigo."""


class SistemaCodigoImmutableError(ArquivoError):
    """Raised when an update tries to change codigo."""


class SistemaCodigoConflictError(ArquivoError):
    """Raised when creating a sistema with a codigo that already exists."""
