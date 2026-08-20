"""Access request (pre-pessoa) domain exceptions."""

from apps.users.domain.exceptions.auth_exceptions import AuthError


class AccessRequestError(AuthError):
    """Base access-request error."""


class AccessRequestValidationError(AccessRequestError):
    """Raised when access-request payload is invalid."""


class PendingAccessRequestExistsError(AccessRequestError):
    """Raised when an open PRE_PESSOA already exists for the email."""
