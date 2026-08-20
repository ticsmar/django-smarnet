"""Tests for Oracle CLIENT_IDENTIFIER request context."""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from apps.users.infrastructure.oracle_session_context import (
    clear_smar_client_identifier,
    ensure_smar_client_identifier,
    get_oracle_username,
    reset_oracle_username,
    set_oracle_username,
)


@pytest.fixture(autouse=True)
def _reset_context() -> None:
    reset_oracle_username()
    yield
    reset_oracle_username()


def test_set_and_get_oracle_username() -> None:
    set_oracle_username("juliano")
    assert get_oracle_username() == "juliano"
    reset_oracle_username()
    assert get_oracle_username() is None


def test_ensure_skips_when_no_username(monkeypatch: pytest.MonkeyPatch) -> None:
    called = {"ensure": False}

    class FakeConnections(dict):
        def __getitem__(self, key: str) -> object:
            called["ensure"] = True
            raise AssertionError("should not open smar without username")

    monkeypatch.setattr(
        "apps.users.infrastructure.oracle_session_context.connections",
        FakeConnections(),
    )
    ensure_smar_client_identifier()
    assert called["ensure"] is False


def test_ensure_sets_client_identifier(monkeypatch: pytest.MonkeyPatch) -> None:
    raw = MagicMock()
    raw.client_identifier = None
    connection = MagicMock()
    connection.connection = raw
    cursor = MagicMock()
    connection.cursor.return_value.__enter__.return_value = cursor

    monkeypatch.setattr(
        "apps.users.infrastructure.oracle_session_context.connections",
        {"smar": connection},
    )
    set_oracle_username("juliano")
    ensure_smar_client_identifier()

    connection.ensure_connection.assert_called_once()
    assert raw.client_identifier == "juliano"
    # Second call is a no-op.
    ensure_smar_client_identifier()
    assert connection.ensure_connection.call_count == 1


def test_clear_closes_smar_connection(monkeypatch: pytest.MonkeyPatch) -> None:
    raw = MagicMock()
    raw.client_identifier = "juliano"
    connection = MagicMock()
    connection.connection = raw
    cursor = MagicMock()
    connection.cursor.return_value.__enter__.return_value = cursor

    monkeypatch.setattr(
        "apps.users.infrastructure.oracle_session_context.connections",
        {"smar": connection},
    )
    set_oracle_username("juliano")
    ensure_smar_client_identifier()
    clear_smar_client_identifier()

    connection.close.assert_called_once()
    assert get_oracle_username() == "juliano"
