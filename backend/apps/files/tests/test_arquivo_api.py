"""API tests for Oracle file-manager endpoints."""

from datetime import datetime
from unittest.mock import MagicMock, patch

from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient

from apps.files.application.dtos.arquivo_dtos import (
    ArquivoNodeOutputDTO,
    ArquivoTreeOutputDTO,
    DownloadFileOutputDTO,
    HistoricoItemOutputDTO,
)
from apps.files.domain.exceptions.arquivo_exceptions import ArquivoPastaFixaError
from apps.shared.presentation.auth.session_user import OracleSessionUser


def _superuser() -> MagicMock:
    user = MagicMock()
    user.is_superuser = True
    return user


def _auth_client() -> APIClient:
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="tester"))
    return client


_TREE = ArquivoTreeOutputDTO(
    sistema=7,
    filtro="15114",
    root_label="Cliente: 15114",
    nodes=[
        ArquivoNodeOutputDTO(
            par_codigo=1,
            par_codigo_pai=None,
            tipo=0,
            nome="Entrada",
            descricao="Docs",
            tamanho=None,
            data=None,
            ace_codigo=None,
            pasta_fixa=False,
            in_lixeira=False,
        )
    ],
)


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.files.presentation.views.arquivo_views.build_list_arquivo_tree_use_case"
)
def test_tree_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = _TREE
    response = _auth_client().get("/api/files/tree/?sistema=7&filtro=15114")
    assert response.status_code == 200
    assert response.data["root_label"] == "Cliente: 15114"
    assert response.data["nodes"][0]["nome"] == "Entrada"


@patch(
    "apps.files.presentation.views.arquivo_views.resolve_usu_chapa", return_value=10
)
@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.arquivo_views.build_create_folder_use_case")
def test_folder_api(
    mock_build: MagicMock, mock_resolve: MagicMock, _chapa: MagicMock
) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = 88
    response = _auth_client().post(
        "/api/files/folders/",
        {"sistema": 7, "filtro": "15114", "nome": "Nova"},
        format="json",
    )
    assert response.status_code == 201
    assert response.data["par_codigo"] == 88


@patch(
    "apps.files.presentation.views.arquivo_views.resolve_usu_chapa", return_value=10
)
@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.arquivo_views.build_upload_file_use_case")
def test_upload_api(
    mock_build: MagicMock, mock_resolve: MagicMock, _chapa: MagicMock
) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = 90
    uploaded = SimpleUploadedFile("nota.pdf", b"%PDF", content_type="application/pdf")
    response = _auth_client().post(
        "/api/files/files/",
        {"sistema": 7, "filtro": "15114", "arquivo": uploaded},
        format="multipart",
    )
    assert response.status_code == 201
    assert response.data["par_codigo"] == 90


@patch(
    "apps.files.presentation.views.arquivo_views.resolve_usu_chapa", return_value=10
)
@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.arquivo_views.build_move_node_use_case")
def test_move_api(
    mock_build: MagicMock, mock_resolve: MagicMock, _chapa: MagicMock
) -> None:
    mock_resolve.return_value = _superuser()
    response = _auth_client().post(
        "/api/files/nodes/5/move/",
        {"sistema": 7, "filtro": "15114", "par_codigo_pai": 1, "nome": "x"},
        format="json",
    )
    assert response.status_code == 204
    mock_build.return_value.execute.assert_called_once()


@patch(
    "apps.files.presentation.views.arquivo_views.resolve_usu_chapa", return_value=10
)
@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.arquivo_views.build_trash_nodes_use_case")
def test_trash_api_pasta_fixa(
    mock_build: MagicMock, mock_resolve: MagicMock, _chapa: MagicMock
) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.side_effect = ArquivoPastaFixaError("fixa")
    response = _auth_client().post(
        "/api/files/nodes/trash/",
        {"sistema": 7, "filtro": "15114", "par_codigos": [3]},
        format="json",
    )
    assert response.status_code == 409


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.arquivo_views.build_download_file_use_case")
def test_download_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = DownloadFileOutputDTO(
        nome="a.pdf", content=b"pdf-bytes"
    )
    response = _auth_client().get(
        "/api/files/nodes/2/download/?sistema=7&filtro=15114"
    )
    assert response.status_code == 200
    assert b"pdf-bytes" in b"".join(response.streaming_content)


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.files.presentation.views.arquivo_views.build_list_historico_use_case")
def test_historico_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = [
        HistoricoItemOutputDTO("Ana", "INSERT", "a.pdf", datetime(2026, 1, 1))
    ]
    response = _auth_client().get("/api/files/historico/?sistema=7&filtro=15114")
    assert response.status_code == 200
    assert response.data[0]["acao"] == "INSERT"
    assert response.data[0]["usuario_nome"] == "Ana"
