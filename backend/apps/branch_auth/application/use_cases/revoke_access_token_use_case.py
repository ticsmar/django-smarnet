"""Revoke an access token owned by the requesting branch manager."""

from apps.branch_auth.application.dtos.branch_auth_dtos import AccessTokenOutputDTO
from apps.branch_auth.application.mappers.branch_auth_mapper import to_token_dto
from apps.branch_auth.domain.exceptions.branch_auth_exceptions import (
    TokenAlreadyRevokedError,
    TokenNotFoundError,
)
from apps.branch_auth.domain.repositories.access_token_repository import (
    AccessTokenRepository,
)
from apps.branch_auth.domain.repositories.machine_repository import MachineRepository


class RevokeAccessTokenUseCase:
    def __init__(
        self,
        *,
        token_repository: AccessTokenRepository,
        machine_repository: MachineRepository,
    ) -> None:
        self._tokens = token_repository
        self._machines = machine_repository

    def execute(self, *, token_id: int, owner_id: int) -> AccessTokenOutputDTO:
        # Scoping the lookup by owner is what keeps one manager from revoking
        # another manager's token.
        token = self._tokens.find_for_owner(token_id=token_id, owner_id=owner_id)
        if token is None:
            raise TokenNotFoundError("Token nao encontrado.")
        if not token.is_active:
            raise TokenAlreadyRevokedError("Token já está revogado.")

        revoked = self._tokens.revoke(token_id=token_id, revoked_by_id=owner_id)
        return to_token_dto(revoked, self._machines.find_by_token(token_id))
