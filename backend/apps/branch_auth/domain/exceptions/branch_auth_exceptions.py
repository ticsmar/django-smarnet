"""BranchAuth domain exceptions."""

from typing import ClassVar

from apps.branch_auth.domain.attempt_result import AttemptResult


class BranchAuthError(Exception):
    """Base error for the branch_auth bounded context."""


class VerifyTokenError(BranchAuthError):
    """Base denial raised while verifying an access token.

    Carries what the audit log needs so the caller can record the attempt after
    the verification transaction has rolled back.
    """

    result: ClassVar[AttemptResult]

    def __init__(self, message: str, *, token_id: int | None = None) -> None:
        super().__init__(message)
        self.token_id = token_id


class InvalidTokenError(VerifyTokenError):
    """Raised when no token matches the presented value."""

    result = AttemptResult.INVALID_TOKEN


class TokenRevokedError(VerifyTokenError):
    """Raised when the token exists but is no longer active."""

    result = AttemptResult.REVOKED_TOKEN


class DeviceMismatchError(VerifyTokenError):
    """Raised when the token is already bound to a different device."""

    result = AttemptResult.DEVICE_MISMATCH


class MachineRevokedError(VerifyTokenError):
    """Raised when the bound machine is no longer active."""

    result = AttemptResult.MACHINE_REVOKED


class TokenNotFoundError(BranchAuthError):
    """Raised when the token does not exist or belongs to another manager."""


class TokenAlreadyRevokedError(BranchAuthError):
    """Raised when revoking a token that is already revoked."""
