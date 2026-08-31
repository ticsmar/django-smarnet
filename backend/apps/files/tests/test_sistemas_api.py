"""API tests for file-manager system catalog."""

from unittest.mock import MagicMock, patch

from rest_framework.test import APIClient

from apps.files.application.dtos.sistema_dtos import SistemaOutputDTO
from apps.shared.presentation.auth.session_user import OracleSessionUser


def _admin() -> MagicMock:
    user = MagicMock()
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = True
    return user


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.sistema_views.build_list_sistemas_use_case")
def test_list_sistemas_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _admin()
    mock_build.return_value.execute.return_value = [
        SistemaOutputDTO(codigo=7, nome="Cliente", descricao="", ativo=True)
    ]
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="admin"))
    response = client.get("/api/files/sistemas/")
    assert response.status_code == 200
    assert response.data[0]["codigo"] == 7


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.sistema_views.build_create_sistema_use_case")
def test_create_sistema_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _admin()
    mock_build.return_value.execute.return_value = SistemaOutputDTO(
        codigo=13, nome="Novo", descricao="", ativo=True
    )
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="admin"))
    response = client.post("/api/files/sistemas/", {"nome": "Novo"}, format="json")
    assert response.status_code == 201
    assert response.data["codigo"] == 13


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.sistema_views.build_get_sistema_use_case")
def test_get_sistema_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _admin()
    mock_build.return_value.execute.return_value = SistemaOutputDTO(
        codigo=7, nome="Cliente", descricao="", ativo=True
    )
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="admin"))
    response = client.get("/api/files/sistemas/7/")
    assert response.status_code == 200
    assert response.data["codigo"] == 7


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.sistema_views.build_update_sistema_use_case")
def test_update_sistema_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _admin()
    mock_build.return_value.execute.return_value = SistemaOutputDTO(
        codigo=7, nome="Cliente ERP", descricao="", ativo=True
    )
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="admin"))
    response = client.put(
        "/api/files/sistemas/7/",
        {"nome": "Cliente ERP", "descricao": "", "ativo": True},
        format="json",
    )
    assert response.status_code == 200
    assert response.data["nome"] == "Cliente ERP"
    assert mock_build.return_value.execute.call_args.args[0].codigo == 7
