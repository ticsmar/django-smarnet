"""List the access tokens owned by one branch manager."""

from apps.branch_auth.application.dtos.branch_auth_dtos import AccessTokenOutputDTO
from apps.branch_auth.application.mappers.branch_auth_mapper import to_token_dto
from apps.branch_auth.domain.repositories.access_token_repository import (
    AccessTokenRepository,
)
from apps.branch_auth.domain.repositories.machine_repository import MachineRepository


class ListAccessTokensUseCase:
    def __init__(
        self,
        *,
        token_repository: AccessTokenRepository,
        machine_repository: MachineRepository,
    ) -> None:
        self._tokens = token_repository
        self._machines = machine_repository

    def execute(self, *, owner_id: int) -> list[AccessTokenOutputDTO]:
        tokens = self._tokens.list_for_owner(owner_id)
        machines = self._machines.find_by_tokens([token.token_id for token in tokens])
        return [to_token_dto(token, machines.get(token.token_id)) for token in tokens]
