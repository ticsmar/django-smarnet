"""Domain exception to HTTP status mappings for branch_auth API.

VerifyTokenError is deliberately absent: verify-token answers with the strict Go
envelope instead of the shared {"detail": ...} body, so its view maps it directly.
"""

from apps.branch_auth.domain.exceptions.branch_auth_exceptions import (
    TokenAlreadyRevokedError,
    TokenNotFoundError,
)

BRANCH_AUTH_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {
    TokenNotFoundError: (404, None),
    TokenAlreadyRevokedError: (400, None),
}
