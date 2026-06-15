"""Authentication domain exceptions."""


class AuthError(Exception):
    """Base authentication error."""


class InvalidCredentialsError(AuthError):
    """Raised when Oracle rejects the provided credentials."""


class EmptyCredentialsError(AuthError):
    """Raised when username or password is missing or blank."""


class NotAuthenticatedError(AuthError):
    """Raised when no authenticated session exists."""


class InvalidUsernameError(AuthError):
    """Raised when the username does not meet Oracle naming rules."""


class UserAlreadyExistsError(AuthError):
    """Raised when the Oracle user already exists."""


class RegistrationFailedError(AuthError):
    """Raised when Oracle user creation fails."""
