"""Tests for arquivos permission helpers."""

from unittest.mock import MagicMock

from apps.files.presentation.permissions import (
    ADD_ARQUIVO,
    CHANGE_ARQUIVO,
    DELETE_ARQUIVO,
    VIEW_ARQUIVO,
    folder_or_upload_perms,
    move_perms,
    trash_perms,
    tree_or_historico_perms,
)


def test_perm_codenames() -> None:
    request = MagicMock()
    assert tree_or_historico_perms(request) == [VIEW_ARQUIVO]
    assert folder_or_upload_perms(request) == [ADD_ARQUIVO]
    assert move_perms(request) == [CHANGE_ARQUIVO]
    assert trash_perms(request) == [DELETE_ARQUIVO]
