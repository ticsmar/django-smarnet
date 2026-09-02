"""Domain exception to HTTP status mappings for follow-up API."""

from apps.followup.domain.exceptions.followup_exceptions import (
    FollowupError,
    RecadoDatabaseError,
    RecadoForbiddenError,
    RecadoNotFoundError,
    RecadoValidationError,
    SistemaCodigoConflictError,
    SistemaCodigoImmutableError,
    SistemaNotFoundError,
)

FOLLOWUP_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {
    RecadoNotFoundError: (404, None),
    SistemaNotFoundError: (404, None),
    RecadoForbiddenError: (403, None),
    SistemaCodigoConflictError: (409, None),
    SistemaCodigoImmutableError: (400, None),
    RecadoValidationError: (400, None),
    RecadoDatabaseError: (502, "Oracle follow-up call failed."),
    FollowupError: (400, None),
}
