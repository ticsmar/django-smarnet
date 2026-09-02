"""Tests for follow-up permission helpers."""

from unittest.mock import MagicMock

from apps.followup.presentation.permissions import (
    ADD_RECADO,
    CHANGE_RECADO,
    VIEW_RECADO,
)
from apps.followup.presentation.views.recado_views import (
    _change_only,
    _list_perms,
    _notes_perms,
    _view_only,
)


def test_perm_codenames() -> None:
    get = MagicMock(method="GET")
    post = MagicMock(method="POST")
    assert _view_only(get) == [VIEW_RECADO]
    assert _change_only(post) == [CHANGE_RECADO]
    assert _list_perms(get) == [VIEW_RECADO]
    assert _list_perms(post) == [ADD_RECADO]
    assert _notes_perms(get) == [VIEW_RECADO]
    assert _notes_perms(post) == [ADD_RECADO]
