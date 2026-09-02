"""API tests for follow-up system catalog."""

from unittest.mock import MagicMock, patch

from rest_framework.test import APIClient

from apps.followup.application.dtos.sistema_dtos import SistemaOutputDTO
from apps.shared.presentation.auth.session_user import OracleSessionUser


def _admin() -> MagicMock:
    user = MagicMock()
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = True
    return user


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.sistema_views.build_list_sistemas_use_case")
def test_list_sistemas_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _admin()
    mock_build.return_value.execute.return_value = [
        SistemaOutputDTO(codigo=117, nome="Cliente", descricao="", ativo=True)
    ]
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="admin"))  # type: ignore[arg-type]
    response = client.get("/api/followup/sistemas/")
    assert response.status_code == 200
    assert response.data[0]["codigo"] == 117


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.sistema_views.build_create_sistema_use_case")
def test_create_sistema_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _admin()
    mock_build.return_value.execute.return_value = SistemaOutputDTO(
        codigo=300, nome="Novo", descricao="", ativo=True
    )
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="admin"))  # type: ignore[arg-type]
    response = client.post("/api/followup/sistemas/", {"nome": "Novo"}, format="json")
    assert response.status_code == 201
    assert response.data["codigo"] == 300


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.sistema_views.build_get_sistema_use_case")
def test_get_sistema_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _admin()
    mock_build.return_value.execute.return_value = SistemaOutputDTO(
        codigo=117, nome="Cliente", descricao="", ativo=True
    )
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="admin"))  # type: ignore[arg-type]
    response = client.get("/api/followup/sistemas/117/")
    assert response.status_code == 200
    assert response.data["codigo"] == 117


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.sistema_views.build_update_sistema_use_case")
def test_update_sistema_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _admin()
    mock_build.return_value.execute.return_value = SistemaOutputDTO(
        codigo=117, nome="Cliente ERP", descricao="", ativo=True
    )
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="admin"))  # type: ignore[arg-type]
    response = client.put(
        "/api/followup/sistemas/117/",
        {"nome": "Cliente ERP", "descricao": "", "ativo": True},
        format="json",
    )
    assert response.status_code == 200
    assert response.data["nome"] == "Cliente ERP"
    assert mock_build.return_value.execute.call_args.args[0].codigo == 117
