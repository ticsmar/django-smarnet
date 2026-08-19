"""Token access attempt repository contract (audit of every verification)."""

from typing import Protocol

from apps.branch_auth.domain.attempt_result import AttemptResult


class TokenAttemptRepository(Protocol):
    def record(
        self,
        *,
        token_id: int | None,
        device_uuid: str,
        result: AttemptResult,
        ip_address: str | None,
    ) -> None:
        """Append one verification attempt. token_id is None for unknown tokens."""
