"""Follow-up domain exceptions."""

from .followup_exceptions import (
    FollowupError,
    RecadoDatabaseError,
    RecadoForbiddenError,
    RecadoNotFoundError,
    RecadoValidationError,
    SistemaCodigoConflictError,
    SistemaCodigoImmutableError,
    SistemaNotFoundError,
)

__all__ = [
    "FollowupError",
    "RecadoDatabaseError",
    "RecadoForbiddenError",
    "RecadoNotFoundError",
    "RecadoValidationError",
    "SistemaCodigoConflictError",
    "SistemaCodigoImmutableError",
    "SistemaNotFoundError",
]
