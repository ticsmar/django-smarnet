"""Composition helpers for branch_auth presentation layer."""

from apps.branch_auth.application.use_cases.create_access_token_use_case import (
    CreateAccessTokenUseCase,
)
from apps.branch_auth.application.use_cases.list_access_tokens_use_case import (
    ListAccessTokensUseCase,
)
from apps.branch_auth.application.use_cases.revoke_access_token_use_case import (
    RevokeAccessTokenUseCase,
)
from apps.branch_auth.application.use_cases.verify_token_use_case import (
    VerifyTokenUseCase,
)
from apps.branch_auth.infrastructure.repositories.access_token_repository_impl import (
    build_access_token_repository,
)
from apps.branch_auth.infrastructure.repositories.machine_repository_impl import (
    build_machine_repository,
)
from apps.branch_auth.infrastructure.repositories.token_attempt_repository_impl import (
    build_token_attempt_repository,
)
from apps.branch_auth.infrastructure.transaction_scope import build_transaction_scope


def build_verify_token_use_case() -> VerifyTokenUseCase:
    return VerifyTokenUseCase(
        token_repository=build_access_token_repository(),
        machine_repository=build_machine_repository(),
        attempt_repository=build_token_attempt_repository(),
        transaction=build_transaction_scope(),
    )


def build_list_access_tokens_use_case() -> ListAccessTokensUseCase:
    return ListAccessTokensUseCase(
        token_repository=build_access_token_repository(),
        machine_repository=build_machine_repository(),
    )


def build_create_access_token_use_case() -> CreateAccessTokenUseCase:
    return CreateAccessTokenUseCase(token_repository=build_access_token_repository())


def build_revoke_access_token_use_case() -> RevokeAccessTokenUseCase:
    return RevokeAccessTokenUseCase(
        token_repository=build_access_token_repository(),
        machine_repository=build_machine_repository(),
    )
