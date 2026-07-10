"""Admin user management domain exceptions."""

from apps.users.domain.exceptions.auth_exceptions import AuthError


class AdminError(AuthError):
    """Base admin management error."""


class UserNotFoundError(AdminError):
    """Raised when the target user does not exist."""


class GroupNotFoundError(AdminError):
    """Raised when a requested group name does not exist."""


class RegistrationForbiddenError(AdminError):
    """Raised when public registration is disabled."""
