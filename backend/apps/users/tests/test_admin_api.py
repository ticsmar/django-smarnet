"""API tests for admin endpoints."""

from collections.abc import Generator
from datetime import UTC, datetime
from unittest.mock import MagicMock, patch

import pytest
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient

from apps.shared.presentation.auth.session_user import OracleSessionUser
from apps.users.application.dtos.admin_user_output_dto import (
    AdminGroupOutputDTO,
    AdminProductPermissionOutputDTO,
    AdminUserOutputDTO,
    PaginatedUsersOutputDTO,
)
from apps.users.application.dtos.pending_request_dto import (
    DiscardAccessRequestOutputDTO,
    ImportOracleUserOutputDTO,
    RegisterAccessRequestFieldsOutputDTO,
)
from apps.users.domain.exceptions.access_approval_exceptions import (
    PendingRequestAlreadyClosedError,
    PendingRequestNotFoundError,
)
from apps.users.domain.exceptions.oracle_import_exceptions import (
    OracleUserAlreadyImportedError,
)
from apps.users.domain.exceptions.pending_request_exceptions import (
    EmpresaFromPartnerNotAllowedError,
    NoFieldsToRegisterError,
)


def _admin_user() -> User:
    user = MagicMock(spec=User)
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = True
    return user


def _regular_user() -> User:
    user = MagicMock(spec=User)
    user.is_superuser = False
    user.groups.filter.return_value.exists.return_value = False
    return user


def _superuser() -> User:
    user = MagicMock(spec=User)
    user.is_superuser = True
    return user


@pytest.fixture
def admin_user_dto() -> AdminUserOutputDTO:
    return AdminUserOutputDTO(
        id=1,
        username="alice",
        email="",
        first_name="",
        last_name="",
        is_active=True,
        is_superuser=False,
        groups=["access_admins"],
        product_permissions=[],
        last_login=None,
        date_joined=datetime(2025, 1, 1, tzinfo=UTC),
    )


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_list_users_use_case")
def test_access_admin_can_list_users(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.return_value = PaginatedUsersOutputDTO(
        items=[admin_user_dto],
        total=1,
        page=1,
        page_size=20,
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.get("/api/admin/users/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["total"] == 1


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_list_users_use_case")
def test_superuser_can_list_users(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _superuser()
    mock_build.return_value.execute.return_value = PaginatedUsersOutputDTO(
        items=[admin_user_dto],
        total=1,
        page=1,
        page_size=20,
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.get("/api/admin/users/")

    assert response.status_code == status.HTTP_200_OK


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
def test_regular_user_denied(mock_resolve: MagicMock, api_client: APIClient) -> None:
    mock_resolve.return_value = _regular_user()
    api_client.force_authenticate(user=OracleSessionUser(username="regular"))

    response = api_client.get("/api/admin/users/")

    assert response.status_code == status.HTTP_403_FORBIDDEN


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_create_user_admin_use_case")
def test_access_admin_can_create_user(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _admin_user()
    created = AdminUserOutputDTO(
        id=2,
        username="new_admin_user",
        email="",
        first_name="",
        last_name="",
        is_active=True,
        is_superuser=False,
        groups=["branch_managers"],
        product_permissions=[],
        last_login=None,
        date_joined=datetime(2025, 1, 1, tzinfo=UTC),
    )
    mock_build.return_value.execute.return_value = created
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post(
        "/api/admin/users/",
        {
            "username": "new_admin_user",
            "password": "secret123",
            "groups": ["branch_managers"],
        },
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()["username"] == "new_admin_user"


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_set_user_groups_use_case")
def test_access_admin_can_set_groups(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _admin_user()
    updated = AdminUserOutputDTO(
        id=admin_user_dto.id,
        username=admin_user_dto.username,
        email=admin_user_dto.email,
        first_name=admin_user_dto.first_name,
        last_name=admin_user_dto.last_name,
        is_active=admin_user_dto.is_active,
        is_superuser=admin_user_dto.is_superuser,
        groups=["branch_managers"],
        product_permissions=admin_user_dto.product_permissions,
        last_login=admin_user_dto.last_login,
        date_joined=admin_user_dto.date_joined,
    )
    mock_build.return_value.execute.return_value = updated
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.put(
        "/api/admin/users/1/groups/",
        {"groups": ["branch_managers"]},
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["groups"] == ["branch_managers"]


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_list_groups_use_case")
def test_access_admin_can_list_groups(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.return_value = [
        AdminGroupOutputDTO(name="access_admins")
    ]
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.get("/api/admin/groups/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["name"] == "access_admins"


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.users.presentation.views.admin_views.build_list_product_permissions_use_case"
)
def test_access_admin_can_list_product_permissions(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.return_value = [
        AdminProductPermissionOutputDTO(
            value="compras_infrastructure.view_fornecedor",
            app_label="compras_infrastructure",
            model="fornecedor",
            codename="view_fornecedor",
            name="Can view fornecedor",
        )
    ]
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.get("/api/admin/product-permissions/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["value"] == "compras_infrastructure.view_fornecedor"


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.users.presentation.views.admin_views.build_set_user_product_permissions_use_case"
)
def test_access_admin_can_set_product_permissions(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
    admin_user_dto: AdminUserOutputDTO,
) -> None:
    mock_resolve.return_value = _admin_user()
    updated = AdminUserOutputDTO(
        id=admin_user_dto.id,
        username=admin_user_dto.username,
        email=admin_user_dto.email,
        first_name=admin_user_dto.first_name,
        last_name=admin_user_dto.last_name,
        is_active=admin_user_dto.is_active,
        is_superuser=admin_user_dto.is_superuser,
        groups=admin_user_dto.groups,
        product_permissions=["compras_infrastructure.view_fornecedor"],
        last_login=admin_user_dto.last_login,
        date_joined=admin_user_dto.date_joined,
    )
    mock_build.return_value.execute.return_value = updated
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.put(
        "/api/admin/users/1/product-permissions/",
        {"permissions": ["compras_infrastructure.view_fornecedor"]},
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["product_permissions"] == [
        "compras_infrastructure.view_fornecedor"
    ]


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.users.presentation.views.admin_views.build_discard_access_request_use_case"
)
def test_discard_pending_request(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.return_value = DiscardAccessRequestOutputDTO(
        ppe_codigo=501
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post("/api/admin/requests/501/discard/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["ppe_codigo"] == 501


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.users.presentation.views.admin_views.build_discard_access_request_use_case"
)
def test_discard_closed_pending_request_returns_404(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.side_effect = PendingRequestNotFoundError(
        "Pending request not found or already closed."
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post("/api/admin/requests/501/discard/")

    assert response.status_code == status.HTTP_404_NOT_FOUND


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.users.presentation.views.admin_views.build_approve_access_request_use_case"
)
def test_approve_closed_pending_request_returns_409(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.side_effect = PendingRequestAlreadyClosedError(
        "Solicitacao 501 ja foi baixada."
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post(
        "/api/admin/requests/501/approve/",
        {"username": "ana.silva"},
        format="json",
    )

    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json()["detail"] == "Solicitacao 501 ja foi baixada."


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.users.presentation.views.admin_views.build_register_access_request_fields_use_case"
)
def test_register_fields_requires_at_least_one_field(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.side_effect = NoFieldsToRegisterError(
        "Informe ao menos um campo para cadastrar."
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post(
        "/api/admin/requests/501/register-fields/", {}, format="json"
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.users.presentation.views.admin_views.build_register_access_request_fields_use_case"
)
def test_register_fields_passes_only_informed_fields_to_the_use_case(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.return_value = RegisterAccessRequestFieldsOutputDTO(
        ppe_codigo=501,
        fun_chapa=None,
        pes_numero=3001,
        emp_codigo=88,
        tep_codigo="C",
        tipo="Cliente",
        cliente=True,
        fornecedor=False,
        smar=False,
        detail="Campos cadastrados com sucesso.",
        closed=False,
        resolved_existing_user=False,
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post(
        "/api/admin/requests/501/register-fields/",
        {"pes_numero": 3001},
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK
    sent = mock_build.return_value.execute.call_args.args[0]
    assert sent.write_pes_numero is True
    assert sent.pes_numero == 3001
    assert sent.write_emp_codigo is False
    assert sent.tep_codigo is None


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch(
    "apps.users.presentation.views.admin_views.build_create_empresa_from_partner_use_case"
)
def test_create_empresa_rejects_funcionario_request(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.side_effect = EmpresaFromPartnerNotAllowedError(
        "Criacao de empresa a partir de parceiro so se aplica a TEP C ou F."
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post(
        "/api/admin/requests/501/create-empresa/",
        {"partner_codigo": "1234"},
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_import_oracle_user_use_case")
def test_import_oracle_user_conflict_when_already_imported(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.side_effect = OracleUserAlreadyImportedError(
        "Chapa 4242 ja foi importada no Smarnet."
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post("/api/admin/oracle-users/4242/import/")

    assert response.status_code == status.HTTP_409_CONFLICT


@patch("apps.shared.presentation.auth.permissions.resolve_django_user_from_request")
@patch("apps.users.presentation.views.admin_views.build_import_oracle_user_use_case")
def test_import_oracle_user_reports_failed_email_as_partial_success(
    mock_build: MagicMock,
    mock_resolve: MagicMock,
    api_client: APIClient,
) -> None:
    mock_resolve.return_value = _admin_user()
    mock_build.return_value.execute.return_value = ImportOracleUserOutputDTO(
        usu_chapa=4242,
        username="ana.silva",
        email="ana@smar.com.br",
        django_user_id=91,
        temporary_password="Provisoria12",
        email_sent=False,
        notification_error="fila de e-mail indisponivel",
    )
    api_client.force_authenticate(user=OracleSessionUser(username="access_admin"))

    response = api_client.post("/api/admin/oracle-users/4242/import/")

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email_sent"] is False
    assert data["temporary_password"] == "Provisoria12"
    assert "fila de e-mail indisponivel" in data["detail"]


@pytest.fixture
def me_access_mocks() -> Generator[MagicMock]:
    with (
        patch(
            "apps.users.presentation.dependencies.build_oracle_auth_repository"
        ) as auth,
        patch(
            "apps.users.presentation.dependencies.build_oracle_user_repository"
        ) as user,
        patch(
            "apps.users.presentation.serializers.auth_serializers.is_branch_manager_for_username",
            return_value=False,
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.is_access_admin_for_username",
            return_value=True,
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.get_groups_for_username",
            return_value=["access_admins"],
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.get_permissions_for_username",
            return_value=[],
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.resolve_django_user_by_username",
            return_value=MagicMock(is_superuser=False),
        ),
        patch(
            "apps.users.presentation.serializers.auth_serializers.build_user_security_repository",
        ) as mock_security,
    ):
        mock_security.return_value.must_change_password.return_value = False
        auth.return_value.authenticate.return_value = True
        user.return_value = MagicMock()
        yield auth


@pytest.mark.django_db
def test_me_includes_access_fields(
    me_access_mocks: MagicMock,
    api_client: APIClient,
) -> None:
    login = api_client.post(
        "/api/users/login/",
        {"username": "access_admin", "password": "secret"},
        format="json",
    )
    assert login.status_code == status.HTTP_200_OK

    response = api_client.get("/api/users/me/")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["can_manage_access"] is True
    assert data["is_superuser"] is False
    assert data["must_change_password"] is False
    assert data["groups"] == ["access_admins"]
