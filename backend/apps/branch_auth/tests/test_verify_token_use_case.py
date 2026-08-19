"""Unit tests for VerifyTokenUseCase."""

from contextlib import nullcontext
from datetime import UTC, datetime

import pytest

from apps.branch_auth.application.dtos.branch_auth_dtos import VerifyTokenInputDTO
from apps.branch_auth.application.use_cases.verify_token_use_case import (
    VerifyTokenUseCase,
)
from apps.branch_auth.domain.attempt_result import AttemptResult
from apps.branch_auth.domain.exceptions.branch_auth_exceptions import (
    DeviceMismatchError,
    InvalidTokenError,
    MachineRevokedError,
    TokenRevokedError,
)
from apps.branch_auth.tests.fakes import (
    DEVICE_UUID,
    RAW_TOKEN,
    TOKEN_ID,
    FakeAccessTokenRepository,
    FakeMachineRepository,
    FakeTokenAttemptRepository,
    make_machine,
    make_token,
)

_NOW = datetime(2026, 8, 15, 12, 0, tzinfo=UTC)


def _use_case(
    *,
    tokens: FakeAccessTokenRepository,
    machines: FakeMachineRepository,
    attempts: FakeTokenAttemptRepository,
) -> VerifyTokenUseCase:
    return VerifyTokenUseCase(
        token_repository=tokens,
        machine_repository=machines,
        attempt_repository=attempts,
        transaction=nullcontext,
    )


def _input(**overrides: object) -> VerifyTokenInputDTO:
    payload: dict[str, object] = {
        "token": RAW_TOKEN,
        "device_uuid": DEVICE_UUID,
        "ip_address": "10.0.0.9",
    }
    payload.update(overrides)
    return VerifyTokenInputDTO(**payload)  # type: ignore[arg-type]


def test_verify_rejects_unknown_token_and_audits_without_token_id() -> None:
    attempts = FakeTokenAttemptRepository()
    use_case = _use_case(
        tokens=FakeAccessTokenRepository(),
        machines=FakeMachineRepository(),
        attempts=attempts,
    )

    with pytest.raises(InvalidTokenError):
        use_case.execute(_input())

    assert attempts.records == [
        (None, DEVICE_UUID, AttemptResult.INVALID_TOKEN, "10.0.0.9")
    ]


def test_verify_rejects_revoked_token() -> None:
    attempts = FakeTokenAttemptRepository()
    use_case = _use_case(
        tokens=FakeAccessTokenRepository({RAW_TOKEN: make_token(is_active=False)}),
        machines=FakeMachineRepository(),
        attempts=attempts,
    )

    with pytest.raises(TokenRevokedError):
        use_case.execute(_input())

    assert attempts.results == [AttemptResult.REVOKED_TOKEN]
    assert attempts.records[0][0] == TOKEN_ID


def test_verify_rejects_other_device() -> None:
    attempts = FakeTokenAttemptRepository()
    machines = FakeMachineRepository(
        {TOKEN_ID: make_machine(device_uuid="outro-device")}
    )
    use_case = _use_case(
        tokens=FakeAccessTokenRepository({RAW_TOKEN: make_token()}),
        machines=machines,
        attempts=attempts,
    )

    with pytest.raises(DeviceMismatchError):
        use_case.execute(_input())

    assert attempts.results == [AttemptResult.DEVICE_MISMATCH]
    assert machines.touched == []


def test_verify_rejects_revoked_machine() -> None:
    attempts = FakeTokenAttemptRepository()
    use_case = _use_case(
        tokens=FakeAccessTokenRepository({RAW_TOKEN: make_token()}),
        machines=FakeMachineRepository({TOKEN_ID: make_machine(is_active=False)}),
        attempts=attempts,
    )

    with pytest.raises(MachineRevokedError):
        use_case.execute(_input())

    assert attempts.results == [AttemptResult.MACHINE_REVOKED]


def test_verify_succeeds_and_stamps_last_access() -> None:
    attempts = FakeTokenAttemptRepository()
    machines = FakeMachineRepository({TOKEN_ID: make_machine()})
    use_case = _use_case(
        tokens=FakeAccessTokenRepository({RAW_TOKEN: make_token()}),
        machines=machines,
        attempts=attempts,
    )

    result = use_case.execute(_input())

    assert result.machine.device_uuid == DEVICE_UUID
    assert result.owner.name == "Gerente Um"
    assert result.machine.last_access_at is not None
    assert machines.touched == [(900, "10.0.0.9")]
    assert attempts.results == [AttemptResult.SUCCESS]


def test_verify_binds_machine_on_first_use() -> None:
    machines = FakeMachineRepository()
    use_case = _use_case(
        tokens=FakeAccessTokenRepository({RAW_TOKEN: make_token()}),
        machines=machines,
        attempts=FakeTokenAttemptRepository(),
    )

    result = use_case.execute(_input())

    assert machines.bound == [(TOKEN_ID, DEVICE_UUID)]
    assert result.machine.device_uuid == DEVICE_UUID
