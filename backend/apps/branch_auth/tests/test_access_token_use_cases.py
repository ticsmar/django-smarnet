"""Unit tests for the list, create and revoke access token use cases."""

import pytest

from apps.branch_auth.application.use_cases.create_access_token_use_case import (
    CreateAccessTokenUseCase,
)
from apps.branch_auth.application.use_cases.list_access_tokens_use_case import (
    ListAccessTokensUseCase,
)
from apps.branch_auth.application.use_cases.revoke_access_token_use_case import (
    RevokeAccessTokenUseCase,
)
from apps.branch_auth.domain.exceptions.branch_auth_exceptions import (
    TokenAlreadyRevokedError,
    TokenNotFoundError,
)
from apps.branch_auth.tests.fakes import (
    DEVICE_UUID,
    OWNER_ID,
    RAW_TOKEN,
    TOKEN_ID,
    FakeAccessTokenRepository,
    FakeMachineRepository,
    make_machine,
    make_owner,
    make_token,
)

_OTHER_OWNER_ID = 42


def test_list_returns_only_tokens_of_the_owner() -> None:
    tokens = FakeAccessTokenRepository()
    tokens.add(make_token())
    tokens.add(make_token(token_id=12, owner=make_owner(user_id=_OTHER_OWNER_ID)))
    use_case = ListAccessTokensUseCase(
        token_repository=tokens,
        machine_repository=FakeMachineRepository(),
    )

    result = use_case.execute(owner_id=OWNER_ID)

    assert [token.token_id for token in result] == [TOKEN_ID]


def test_list_attaches_the_bound_machine() -> None:
    tokens = FakeAccessTokenRepository()
    tokens.add(make_token())
    use_case = ListAccessTokensUseCase(
        token_repository=tokens,
        machine_repository=FakeMachineRepository({TOKEN_ID: make_machine()}),
    )

    result = use_case.execute(owner_id=OWNER_ID)

    assert result[0].machine is not None
    assert result[0].machine.device_uuid == DEVICE_UUID


def test_list_leaves_machine_empty_for_never_used_token() -> None:
    tokens = FakeAccessTokenRepository()
    tokens.add(make_token())
    use_case = ListAccessTokensUseCase(
        token_repository=tokens,
        machine_repository=FakeMachineRepository(),
    )

    assert use_case.execute(owner_id=OWNER_ID)[0].machine is None


def test_create_returns_raw_token_once_and_no_machine() -> None:
    tokens = FakeAccessTokenRepository()
    use_case = CreateAccessTokenUseCase(token_repository=tokens)

    created = use_case.execute(owner_id=OWNER_ID, label="  notebook  ")

    assert created.raw_token == RAW_TOKEN
    assert created.token.label == "notebook"
    assert created.token.machine is None
    assert tokens.created == [(OWNER_ID, "notebook")]


def test_revoke_marks_token_revoked() -> None:
    tokens = FakeAccessTokenRepository()
    tokens.add(make_token())
    use_case = RevokeAccessTokenUseCase(
        token_repository=tokens,
        machine_repository=FakeMachineRepository(),
    )

    result = use_case.execute(token_id=TOKEN_ID, owner_id=OWNER_ID)

    assert result.status == "revoked"
    assert result.revoked_at is not None
    assert tokens.revoked == [(TOKEN_ID, OWNER_ID)]


def test_revoke_rejects_token_of_another_owner() -> None:
    tokens = FakeAccessTokenRepository()
    tokens.add(make_token())
    use_case = RevokeAccessTokenUseCase(
        token_repository=tokens,
        machine_repository=FakeMachineRepository(),
    )

    with pytest.raises(TokenNotFoundError):
        use_case.execute(token_id=TOKEN_ID, owner_id=_OTHER_OWNER_ID)

    assert tokens.revoked == []


def test_revoke_rejects_unknown_token() -> None:
    use_case = RevokeAccessTokenUseCase(
        token_repository=FakeAccessTokenRepository(),
        machine_repository=FakeMachineRepository(),
    )

    with pytest.raises(TokenNotFoundError):
        use_case.execute(token_id=999, owner_id=OWNER_ID)


def test_revoke_rejects_already_revoked_token() -> None:
    tokens = FakeAccessTokenRepository()
    tokens.add(make_token(is_active=False))
    use_case = RevokeAccessTokenUseCase(
        token_repository=tokens,
        machine_repository=FakeMachineRepository(),
    )

    with pytest.raises(TokenAlreadyRevokedError):
        use_case.execute(token_id=TOKEN_ID, owner_id=OWNER_ID)

    assert tokens.revoked == []
