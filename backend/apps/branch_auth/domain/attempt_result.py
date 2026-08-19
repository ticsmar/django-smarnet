"""Outcome recorded for every verify-token attempt."""

from enum import StrEnum


class AttemptResult(StrEnum):
    """Mirrors the values stored in TokenAccessAttempt.result."""

    SUCCESS = "success"
    INVALID_TOKEN = "invalid_token"
    REVOKED_TOKEN = "revoked_token"
    DEVICE_MISMATCH = "device_mismatch"
    MACHINE_REVOKED = "machine_revoked"
