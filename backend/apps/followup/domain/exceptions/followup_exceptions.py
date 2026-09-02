"""Follow-up domain exceptions."""


class FollowupError(Exception):
    """Base error for the followup bounded context."""


class RecadoNotFoundError(FollowupError):
    """Raised when a recado is not in the sistema/filtro scope."""


class RecadoForbiddenError(FollowupError):
    """Raised when the actor cannot edit another author's recado."""


class RecadoValidationError(FollowupError):
    """Raised when sistema, filtro, tipo, motivo, or mensagem is invalid."""


class RecadoDatabaseError(FollowupError):
    """Raised when the Oracle query or package call fails."""


class SistemaNotFoundError(FollowupError):
    """Raised when the Settings catalog has no matching codigo."""


class SistemaCodigoImmutableError(FollowupError):
    """Raised when an update tries to change codigo."""


class SistemaCodigoConflictError(FollowupError):
    """Raised when creating a sistema with a codigo that already exists."""
