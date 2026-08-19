"""Unit tests for DiscardAccessRequestUseCase."""

import pytest

from apps.users.application.use_cases.discard_access_request_use_case import (
    DiscardAccessRequestUseCase,
)
from apps.users.domain.exceptions.access_approval_exceptions import (
    PendingRequestNotFoundError,
)
from apps.users.tests.fakes_pending_request import (
    FakePendingRequestAdminRepository,
    make_pending,
)


def test_discard_closes_the_open_request() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending())

    result = DiscardAccessRequestUseCase(repository).execute(ppe_codigo=501)

    assert result.ppe_codigo == 501
    assert repository.discarded == [501]


def test_discard_rejects_unknown_request() -> None:
    repository = FakePendingRequestAdminRepository(pending=None)

    with pytest.raises(PendingRequestNotFoundError):
        DiscardAccessRequestUseCase(repository).execute(ppe_codigo=501)

    assert repository.discarded == []


def test_discard_rejects_already_closed_request() -> None:
    repository = FakePendingRequestAdminRepository(pending=make_pending(closed=True))

    with pytest.raises(PendingRequestNotFoundError):
        DiscardAccessRequestUseCase(repository).execute(ppe_codigo=501)

    assert repository.discarded == []
