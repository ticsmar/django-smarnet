"""In-memory doubles for the branch_auth repository ports."""

from collections.abc import Sequence
from datetime import UTC, datetime

from apps.branch_auth.domain.attempt_result import AttemptResult
from apps.branch_auth.domain.repositories.access_token_repository import (
    AccessTokenSnapshot,
    TokenOwnerSnapshot,
)
from apps.branch_auth.domain.repositories.machine_repository import MachineSnapshot

RAW_TOKEN = "raw-token-value"
DEVICE_UUID = "device-abc"
TOKEN_ID = 11
OWNER_ID = 7
MACHINE_ID = 900

_CREATED_AT = datetime(2026, 8, 1, 9, 0, tzinfo=UTC)
_ACCESSED_AT = datetime(2026, 8, 15, 12, 0, tzinfo=UTC)


def make_owner(**overrides: object) -> TokenOwnerSnapshot:
    payload: dict[str, object] = {
        "user_id": OWNER_ID,
        "name": "Gerente Um",
        "email": "gerente@smar.com.br",
    }
    payload.update(overrides)
    return TokenOwnerSnapshot(**payload)  # type: ignore[arg-type]


def make_token(**overrides: object) -> AccessTokenSnapshot:
    is_active = bool(overrides.pop("is_active", True))
    payload: dict[str, object] = {
        "token_id": TOKEN_ID,
        "owner": make_owner(),
        "label": "caixa 2",
        "token_prefix": "raw-toke",
        "status": "active" if is_active else "revoked",
        "is_active": is_active,
        "created_at": _CREATED_AT,
        "revoked_at": None if is_active else _ACCESSED_AT,
    }
    payload.update(overrides)
    return AccessTokenSnapshot(**payload)  # type: ignore[arg-type]


def make_machine(**overrides: object) -> MachineSnapshot:
    is_active = bool(overrides.pop("is_active", True))
    payload: dict[str, object] = {
        "machine_id": MACHINE_ID,
        "token_id": TOKEN_ID,
        "device_uuid": DEVICE_UUID,
        "status": "active" if is_active else "revoked",
        "is_active": is_active,
        "registered_at": _CREATED_AT,
        "last_access_at": None,
    }
    payload.update(overrides)
    return MachineSnapshot(**payload)  # type: ignore[arg-type]


class FakeAccessTokenRepository:
    def __init__(
        self, by_raw_token: dict[str, AccessTokenSnapshot] | None = None
    ) -> None:
        self._by_raw_token = dict(by_raw_token or {})
        self._by_id = {token.token_id: token for token in self._by_raw_token.values()}
        self.created: list[tuple[int, str]] = []
        self.revoked: list[tuple[int, int]] = []

    def add(self, token: AccessTokenSnapshot) -> None:
        self._by_id[token.token_id] = token

    def lock_by_raw_token(self, raw_token: str) -> AccessTokenSnapshot | None:
        return self._by_raw_token.get(raw_token)

    def find_for_owner(
        self, *, token_id: int, owner_id: int
    ) -> AccessTokenSnapshot | None:
        token = self._by_id.get(token_id)
        if token is None or token.owner.user_id != owner_id:
            return None
        return token

    def list_for_owner(self, owner_id: int) -> list[AccessTokenSnapshot]:
        return [
            token for token in self._by_id.values() if token.owner.user_id == owner_id
        ]

    def create(self, *, owner_id: int, label: str) -> tuple[AccessTokenSnapshot, str]:
        self.created.append((owner_id, label))
        token = make_token(owner=make_owner(user_id=owner_id), label=label)
        self._by_id[token.token_id] = token
        return token, RAW_TOKEN

    def revoke(self, *, token_id: int, revoked_by_id: int) -> AccessTokenSnapshot:
        self.revoked.append((token_id, revoked_by_id))
        current = self._by_id[token_id]
        revoked = make_token(
            token_id=current.token_id,
            owner=current.owner,
            label=current.label,
            is_active=False,
        )
        self._by_id[token_id] = revoked
        return revoked


class FakeMachineRepository:
    def __init__(self, by_token: dict[int, MachineSnapshot] | None = None) -> None:
        self._by_token = dict(by_token or {})
        self.bound: list[tuple[int, str]] = []
        self.touched: list[tuple[int, str | None]] = []

    def find_by_token(self, token_id: int) -> MachineSnapshot | None:
        return self._by_token.get(token_id)

    def find_by_tokens(self, token_ids: Sequence[int]) -> dict[int, MachineSnapshot]:
        wanted = set(token_ids)
        return {
            token_id: machine
            for token_id, machine in self._by_token.items()
            if token_id in wanted
        }

    def bind(self, *, token_id: int, device_uuid: str) -> MachineSnapshot:
        self.bound.append((token_id, device_uuid))
        machine = make_machine(token_id=token_id, device_uuid=device_uuid)
        self._by_token[token_id] = machine
        return machine

    def touch(self, *, machine_id: int, ip_address: str | None) -> MachineSnapshot:
        self.touched.append((machine_id, ip_address))
        for token_id, machine in self._by_token.items():
            if machine.machine_id != machine_id:
                continue
            stamped = make_machine(
                token_id=machine.token_id,
                device_uuid=machine.device_uuid,
                is_active=machine.is_active,
                last_access_at=_ACCESSED_AT,
            )
            self._by_token[token_id] = stamped
            return stamped
        raise AssertionError(f"machine {machine_id} not registered in the fake")


class FakeTokenAttemptRepository:
    def __init__(self) -> None:
        self.records: list[tuple[int | None, str, AttemptResult, str | None]] = []

    def record(
        self,
        *,
        token_id: int | None,
        device_uuid: str,
        result: AttemptResult,
        ip_address: str | None,
    ) -> None:
        self.records.append((token_id, device_uuid, result, ip_address))

    @property
    def results(self) -> list[AttemptResult]:
        return [record[2] for record in self.records]
