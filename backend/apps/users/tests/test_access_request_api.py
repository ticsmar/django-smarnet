"""API tests for public access-request endpoints."""

from unittest.mock import MagicMock, patch

from rest_framework import status
from rest_framework.test import APIClient

from apps.users.application.dtos.access_request_dto import (
    AccessRequestOutputDTO,
    CountryOutputDTO,
    StateOutputDTO,
)
from apps.users.domain.exceptions.access_request_exceptions import (
    PendingAccessRequestExistsError,
)


def _payload(**overrides: object) -> dict[str, object]:
    data: dict[str, object] = {
        "tep_codigo": "F",
        "nome": "Bruno Costa",
        "email": "bruno@fornecedor.com",
        "pai_codigo": 76,
        "motivo": "Acesso ao portal de compras",
        "emp_nome": "Fornecedor Ltda",
        "emp_endereco": "Av. B, 200",
        "emp_bairro": "Industrial",
        "emp_cidade": "Ribeirao Preto",
        "emp_pai_codigo": 76,
        "emp_est_codigo": 25,
        "emp_estado": "Sao Paulo",
        "emp_cep": "14000000",
        "emp_homepage": "https://exemplo.com",
    }
    data.update(overrides)
    return data


@patch(
    "apps.users.presentation.views.access_request_views.build_create_access_request_use_case"
)
def test_create_access_request_api_success(
    mock_build: MagicMock,
    api_client: APIClient,
) -> None:
    mock_build.return_value.execute.return_value = AccessRequestOutputDTO(
        ppe_codigo=900,
        tep_codigo="F",
        email="bruno@fornecedor.com",
    )

    response = api_client.post("/api/users/access-requests/", _payload(), format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()["ppe_codigo"] == 900


@patch(
    "apps.users.presentation.views.access_request_views.build_create_access_request_use_case"
)
def test_create_access_request_api_conflict(
    mock_build: MagicMock,
    api_client: APIClient,
) -> None:
    mock_build.return_value.execute.side_effect = PendingAccessRequestExistsError(
        "Ja existe uma solicitacao pendente para este e-mail."
    )

    response = api_client.post("/api/users/access-requests/", _payload(), format="json")

    assert response.status_code == status.HTTP_409_CONFLICT


@patch(
    "apps.users.presentation.views.access_request_views.build_list_access_request_countries_use_case"
)
def test_list_countries_public(
    mock_build: MagicMock,
    api_client: APIClient,
) -> None:
    mock_build.return_value.execute.return_value = [
        CountryOutputDTO(pai_codigo=76, nome="Brasil"),
    ]

    response = api_client.get("/api/users/catalog/countries/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["pai_codigo"] == 76


@patch(
    "apps.users.presentation.views.access_request_views.build_list_access_request_states_use_case"
)
def test_list_states_public(
    mock_build: MagicMock,
    api_client: APIClient,
) -> None:
    mock_build.return_value.execute.return_value = [
        StateOutputDTO(est_codigo=25, pai_codigo=76, nome="Sao Paulo"),
    ]

    response = api_client.get("/api/users/catalog/states/?pai_codigo=76")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["est_codigo"] == 25
