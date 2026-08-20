"""Snapshot to DTO mapping for branch_auth."""

from apps.branch_auth.application.dtos.branch_auth_dtos import (
    AccessTokenOutputDTO,
    MachineOutputDTO,
    TokenOwnerOutputDTO,
)
from apps.branch_auth.domain.repositories.access_token_repository import (
    AccessTokenSnapshot,
    TokenOwnerSnapshot,
)
from apps.branch_auth.domain.repositories.machine_repository import MachineSnapshot


def to_machine_dto(machine: MachineSnapshot) -> MachineOutputDTO:
    return MachineOutputDTO(
        machine_id=machine.machine_id,
        device_uuid=machine.device_uuid,
        status=machine.status,
        registered_at=machine.registered_at,
        last_access_at=machine.last_access_at,
    )


def to_owner_dto(owner: TokenOwnerSnapshot) -> TokenOwnerOutputDTO:
    return TokenOwnerOutputDTO(
        user_id=owner.user_id,
        name=owner.name,
        email=owner.email,
    )


def to_token_dto(
    token: AccessTokenSnapshot, machine: MachineSnapshot | None
) -> AccessTokenOutputDTO:
    return AccessTokenOutputDTO(
        token_id=token.token_id,
        label=token.label,
        status=token.status,
        token_prefix=token.token_prefix,
        created_at=token.created_at,
        revoked_at=token.revoked_at,
        machine=None if machine is None else to_machine_dto(machine),
    )
