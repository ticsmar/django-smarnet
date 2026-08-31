"""Tests for USU_CHAPA resolution."""

from unittest.mock import MagicMock, patch

from apps.files.infrastructure.actor import resolve_usu_chapa


@patch("apps.shared.infrastructure.identity.resolve_identity")
def test_resolve_usu_chapa_unknown(mock_identity: MagicMock) -> None:
    mock_identity.return_value = MagicMock(usu_chapa=0, emp_codigo=1)
    assert resolve_usu_chapa("ghost") == 0


@patch("apps.shared.infrastructure.identity.resolve_identity")
def test_resolve_usu_chapa_from_profile(mock_identity: MagicMock) -> None:
    mock_identity.return_value = MagicMock(usu_chapa=42, emp_codigo=1)
    assert resolve_usu_chapa("ana") == 42
