"""Token access attempt repository over the branch_auth ORM models."""

from apps.branch_auth.domain.attempt_result import AttemptResult
from apps.branch_auth.infrastructure.models import TokenAccessAttempt


class TokenAttemptRepositoryImpl:
    def record(
        self,
        *,
        token_id: int | None,
        device_uuid: str,
        result: AttemptResult,
        ip_address: str | None,
    ) -> None:
        TokenAccessAttempt.objects.create(
            token_id=token_id,
            device_uuid_sent=device_uuid,
            result=str(result),
            ip_address=ip_address,
        )


def build_token_attempt_repository() -> TokenAttemptRepositoryImpl:
    return TokenAttemptRepositoryImpl()
