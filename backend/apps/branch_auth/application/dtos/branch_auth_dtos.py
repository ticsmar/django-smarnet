"""DTOs for branch_auth use cases."""

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class VerifyTokenInputDTO:
    token: str
    device_uuid: str
    ip_address: str | None = None


@dataclass(frozen=True, slots=True)
class MachineOutputDTO:
    machine_id: int
    device_uuid: str
    status: str
    registered_at: datetime
    last_access_at: datetime | None


@dataclass(frozen=True, slots=True)
class TokenOwnerOutputDTO:
    user_id: int
    name: str
    email: str


@dataclass(frozen=True, slots=True)
class VerifyTokenOutputDTO:
    machine: MachineOutputDTO
    owner: TokenOwnerOutputDTO


@dataclass(frozen=True, slots=True)
class AccessTokenOutputDTO:
    token_id: int
    label: str
    status: str
    token_prefix: str
    created_at: datetime
    revoked_at: datetime | None
    machine: MachineOutputDTO | None


@dataclass(frozen=True, slots=True)
class CreatedAccessTokenOutputDTO:
    token: AccessTokenOutputDTO
    raw_token: str
