"""API tests for Oracle follow-up endpoints."""

from datetime import datetime
from unittest.mock import MagicMock, patch

from rest_framework.test import APIClient

from apps.followup.application.dtos.recado_dtos import (
    ClienteNotesOutputDTO,
    RecadoItemOutputDTO,
    RecadoListOutputDTO,
    RecadoStatusOutputDTO,
    TipoRecadoOutputDTO,
)
from apps.shared.presentation.auth.session_user import OracleSessionUser


def _superuser() -> MagicMock:
    user = MagicMock()
    user.is_superuser = True
    return user


def _auth_client() -> APIClient:
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="tester"))  # type: ignore[arg-type]
    return client


_LIST = RecadoListOutputDTO(
    sistema=117,
    filtro="734730",
    items=[
        RecadoItemOutputDTO(
            pre_codigo=1,
            tre_codigo=20,
            tre_descricao="Comercial",
            tre_tipo_canc=False,
            usu_chapa=10,
            usu_nome="Tester",
            mensagem="Olá",
            pre_data=datetime(2026, 1, 1, 12, 0),
            pre_dt_alarm=None,
            pre_dt_baixa=None,
            mot_codigo=None,
            mot_descricao=None,
            can_edit=True,
            alarm_nivel="none",
        )
    ],
)


@patch(
    "apps.followup.presentation.views.recado_views.resolve_usu_chapa", return_value=10
)
@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.recado_views.build_list_recados_use_case")
def test_list_items_api(
    mock_build: MagicMock, mock_resolve: MagicMock, _chapa: MagicMock
) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = _LIST
    response = _auth_client().get("/api/followup/items/?sistema=117&filtro=734730")
    assert response.status_code == 200
    assert response.data["items"][0]["mensagem"] == "Olá"


@patch(
    "apps.followup.presentation.views.recado_views.resolve_usu_chapa", return_value=10
)
@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.recado_views.build_grava_recado_use_case")
def test_create_item_api(
    mock_build: MagicMock, mock_resolve: MagicMock, _chapa: MagicMock
) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = None
    response = _auth_client().post(
        "/api/followup/items/",
        {
            "sistema": 117,
            "filtro": "734730",
            "tre_codigo": 20,
            "mensagem": "Novo recado",
        },
        format="json",
    )
    assert response.status_code == 201
    assert mock_build.return_value.execute.call_args.args[0].tre_codigo == 20


@patch(
    "apps.followup.presentation.views.recado_views.resolve_usu_chapa", return_value=10
)
@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.recado_views.build_baixa_recado_use_case")
def test_baixa_api(
    mock_build: MagicMock, mock_resolve: MagicMock, _chapa: MagicMock
) -> None:
    mock_resolve.return_value = _superuser()
    response = _auth_client().post(
        "/api/followup/items/9/baixa/?sistema=117&filtro=734730"
    )
    assert response.status_code == 204
    assert mock_build.return_value.execute.call_args.args[0].pre_codigo == 9


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.recado_views.build_list_tipos_use_case")
def test_tipos_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = [
        TipoRecadoOutputDTO(
            tre_codigo=20, tre_descricao="Comercial", tre_tipo_canc=False
        )
    ]
    response = _auth_client().get("/api/followup/tipos/?sistema=117")
    assert response.status_code == 200
    assert response.data[0]["tre_codigo"] == 20


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.recado_views.build_get_recado_status_use_case")
def test_status_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = RecadoStatusOutputDTO(
        nivel="ok",
        proximo_alarme=None,
        tre_descricao="Comercial",
        has_legacy_notes=True,
    )
    response = _auth_client().get("/api/followup/status/?sistema=117&filtro=734730")
    assert response.status_code == 200
    assert response.data["has_legacy_notes"] is True


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.followup.presentation.views.recado_views.build_get_cliente_notes_use_case")
def test_cliente_notes_get_api(mock_build: MagicMock, mock_resolve: MagicMock) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = ClienteNotesOutputDTO(
        codigo=734730, descricao="nota", has_notes=True
    )
    response = _auth_client().get("/api/followup/cliente-notes/?codigo=734730")
    assert response.status_code == 200
    assert response.data["descricao"] == "nota"


@patch(
    "apps.followup.presentation.views.recado_views.resolve_usu_chapa", return_value=10
)
@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.followup.presentation.views.recado_views.build_append_cliente_notes_use_case"
)
def test_cliente_notes_post_api(
    mock_build: MagicMock, mock_resolve: MagicMock, _chapa: MagicMock
) -> None:
    mock_resolve.return_value = _superuser()
    response = _auth_client().post(
        "/api/followup/cliente-notes/",
        {"codigo": 734730, "texto": "append"},
        format="json",
    )
    assert response.status_code == 204


def test_recados_alias() -> None:
    from django.urls import resolve

    match = resolve("/api/recados/items/")
    assert match.view_name == "followup-items"
