"""API tests for change password endpoint."""

from unittest.mock import MagicMock, patch

from rest_framework import status
from rest_framework.test import APIClient

from shared.presentation.auth.session_user import OracleSessionUser


@patch("users.presentation.views.auth_views.build_change_password_use_case")
def test_change_password_success(
    mock_build: MagicMock,
    api_client: APIClient,
) -> None:
    api_client.force_authenticate(user=OracleSessionUser(username="alice"))
    mock_build.return_value.execute.return_value = None

    with patch(
        "users.presentation.views.auth_views.build_get_current_user_use_case"
    ) as mock_current:
        mock_current.return_value.execute.return_value = MagicMock(username="alice")
        response = api_client.post(
            "/api/users/change-password/",
            {"new_password": "new-secret-123"},
            format="json",
        )

    assert response.status_code == status.HTTP_204_NO_CONTENT
    mock_build.return_value.execute.assert_called_once()
