"""Issue a new access token for a branch manager."""

from apps.branch_auth.application.dtos.branch_auth_dtos import (
    CreatedAccessTokenOutputDTO,
)
from apps.branch_auth.application.mappers.branch_auth_mapper import to_token_dto
from apps.branch_auth.domain.repositories.access_token_repository import (
    AccessTokenRepository,
)


class CreateAccessTokenUseCase:
    def __init__(self, *, token_repository: AccessTokenRepository) -> None:
        self._tokens = token_repository

    def execute(self, *, owner_id: int, label: str = "") -> CreatedAccessTokenOutputDTO:
        token, raw_token = self._tokens.create(owner_id=owner_id, label=label.strip())
        # A new token has no machine yet; binding happens on first verification.
        return CreatedAccessTokenOutputDTO(
            token=to_token_dto(token, None),
            raw_token=raw_token,
        )
