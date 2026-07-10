"""Domain exception to HTTP status mappings for users API."""

from apps.users.domain.exceptions.admin_exceptions import (
    AdminError,
    GroupNotFoundError,
    RegistrationForbiddenError,
    UserNotFoundError,
)
from apps.users.domain.exceptions.auth_exceptions import (
    AuthError,
    EmptyCredentialsError,
    InvalidCredentialsError,
    InvalidUsernameError,
    NotAuthenticatedError,
    RegistrationFailedError,
    UserAlreadyExistsError,
)

AUTH_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {
    EmptyCredentialsError: (400, None),
    InvalidCredentialsError: (401, "Invalid credentials."),
    InvalidUsernameError: (400, None),
    UserAlreadyExistsError: (409, None),
    RegistrationFailedError: (500, "Registration failed."),
    RegistrationForbiddenError: (403, "Public registration is disabled."),
    NotAuthenticatedError: (401, "Not authenticated."),
    UserNotFoundError: (404, None),
    GroupNotFoundError: (400, None),
    AuthError: (401, "Not authenticated."),
    AdminError: (400, None),
}
