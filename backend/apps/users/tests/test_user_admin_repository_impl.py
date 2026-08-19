"""Tests for user admin repository."""

from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest
from django.contrib.auth.models import User
from django.db import connection
from django.test.utils import CaptureQueriesContext

from apps.users.domain.exceptions.admin_exceptions import (
    GroupNotFoundError,
    UserNotFoundError,
)
from apps.users.infrastructure.models import SiaosUsuario, UserSecurityProfile
from apps.users.infrastructure.repositories import user_admin_repository_impl as impl
from apps.users.infrastructure.repositories.user_admin_repository_impl import (
    UserAdminRepositoryImpl,
    _batch_legacy_usuarios,
)


def test_set_user_groups_unknown_group_raises() -> None:
    repository = UserAdminRepositoryImpl()
    user = MagicMock()
    queryset = MagicMock()
    queryset.first.return_value = user
    with (
        patch(
            "apps.users.infrastructure.repositories.user_admin_repository_impl."
            "User.objects.filter",
            return_value=queryset,
        ),
        patch(
            "apps.users.infrastructure.repositories.user_admin_repository_impl._resolve_groups",
            side_effect=GroupNotFoundError("Unknown groups: missing_group"),
        ),
        pytest.raises(GroupNotFoundError),
    ):
        repository.set_user_groups(1, ["missing_group"])


def test_get_user_not_found_raises() -> None:
    repository = UserAdminRepositoryImpl()
    queryset = MagicMock()
    queryset.first.return_value = None
    with (
        patch(
            "apps.users.infrastructure.repositories.user_admin_repository_impl."
            "User.objects.prefetch_related",
            return_value=MagicMock(filter=MagicMock(return_value=queryset)),
        ),
        pytest.raises(UserNotFoundError),
    ):
        repository.get_user(9999)


@pytest.mark.django_db
def test_list_users_uses_batch_and_bounded_queries(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """list_users must batch legacy lookups and keep default-DB queries bounded.

    Regression test for the N+1 that used to hit SIAOS.USUARIO and
    ``user_permissions`` once per row. The batch helper must be called
    exactly once for the page, and the default-DB query count must not grow
    with the number of users.
    """

    def _make_users(count: int) -> None:
        User.objects.all().delete()
        for index in range(count):
            user = User.objects.create_user(
                username=f"user{index}",
                email=f"user{index}@example.com",
                password="secret",
            )
            if index < count - 1:
                UserSecurityProfile.objects.create(user=user, usu_chapa=100 + index)

    batch_spy = MagicMock(return_value={})
    enrich_spy = MagicMock(side_effect=lambda records: records)
    monkeypatch.setattr(impl, "_batch_legacy_usuarios", batch_spy)
    monkeypatch.setattr(impl, "_enrich_admin_users", enrich_spy)

    _make_users(3)
    with CaptureQueriesContext(connection) as ctx_small:
        result_small = UserAdminRepositoryImpl().list_users(
            search="", page=1, page_size=10
        )
    queries_small = len(ctx_small.captured_queries)

    _make_users(6)
    batch_spy.reset_mock()
    enrich_spy.reset_mock()
    with CaptureQueriesContext(connection) as ctx_large:
        result_large = UserAdminRepositoryImpl().list_users(
            search="", page=1, page_size=10
        )
    queries_large = len(ctx_large.captured_queries)

    assert result_small.total == 3
    assert result_large.total == 6
    # Batch helper must be called exactly once per list_users call.
    assert batch_spy.call_count == 1
    assert enrich_spy.call_count == 1
    # Doubling the number of users must NOT double the query count on the
    # default DB. A small constant delta (single-digit) is acceptable.
    assert queries_large - queries_small <= 2, (
        f"list_users appears to be N+1 on default DB: "
        f"{queries_small} queries for 3 users vs {queries_large} for 6."
    )


@pytest.mark.django_db
def test_batch_legacy_usuarios_groups_lookups_by_chapa_and_login(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """_batch_legacy_usuarios must run at most two SIAOS.USUARIO queries."""

    alice = User.objects.create_user(username="alice", password="x")
    bob = User.objects.create_user(username="Bob", password="x")
    carol = User.objects.create_user(username="carol", password="x")
    UserSecurityProfile.objects.create(user=alice, usu_chapa=100)
    UserSecurityProfile.objects.create(user=bob, usu_chapa=101)

    filter_calls: list[dict[str, object]] = []
    legacy_alice = SimpleNamespace(usu_chapa=100, usu_loginweb="alice")
    legacy_bob = SimpleNamespace(usu_chapa=101, usu_loginweb="Bob")
    legacy_carol = SimpleNamespace(usu_chapa=555, usu_loginweb="Carol")

    class _Stub:
        def __init__(self, rows: list[SimpleNamespace]) -> None:
            self._rows = rows

        def using(self, alias: str) -> "_Stub":
            assert alias == "smar"
            return self

        def filter(self, **kwargs: object) -> "_Stub":
            filter_calls.append(kwargs)
            if "pk__in" in kwargs:
                chapas = list(kwargs["pk__in"])  # type: ignore[call-overload]
                return _Stub([row for row in self._rows if row.usu_chapa in chapas])
            if "_login_lower__in" in kwargs:
                logins = list(kwargs["_login_lower__in"])  # type: ignore[call-overload]
                return _Stub(
                    [
                        row
                        for row in self._rows
                        if str(row.usu_loginweb).lower() in logins
                    ]
                )
            return self

        def annotate(self, **_kwargs: object) -> "_Stub":
            return self

        def order_by(self, *_fields: object) -> "_Stub":
            return self

        def __iter__(self):
            return iter(self._rows)

    all_rows = [legacy_alice, legacy_bob, legacy_carol]
    monkeypatch.setattr(SiaosUsuario, "objects", _Stub(all_rows))

    users = list(impl._list_users_base_queryset())
    found: dict[int, object] = dict(_batch_legacy_usuarios(users))

    assert found[alice.id] is legacy_alice
    assert found[bob.id] is legacy_bob
    assert found[carol.id] is legacy_carol
    # Exactly two SIAOS.USUARIO filter calls: one by chapa, one by login.
    filter_kinds = [next(iter(call), None) for call in filter_calls]
    assert filter_kinds.count("pk__in") == 1
    assert filter_kinds.count("_login_lower__in") == 1
    assert len(filter_calls) == 2


@pytest.mark.django_db
def test_batch_legacy_usuarios_empty_when_no_users() -> None:
    assert _batch_legacy_usuarios([]) == {}
