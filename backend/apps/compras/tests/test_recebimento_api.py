"""API smoke tests for compras recebimento endpoints."""

from unittest.mock import MagicMock, patch

import pytest
from rest_framework.test import APIClient

from apps.compras.application.dtos.recebimento_dtos import (
    FornecContatoOutputDTO,
    FornecedorOutputDTO,
    GravaFornecContatoOutputDTO,
    GravaFornecedorOutputDTO,
    MsgErroOutputDTO,
    PaginatedFornecContatosOutputDTO,
    PaginatedFornecedoresOutputDTO,
    PaginatedMsgErrosOutputDTO,
    PaisOutputDTO,
)
from apps.compras.domain.exceptions.recebimento_exceptions import (
    FornecedorNotFoundError,
    PaisNotFoundError,
)
from apps.shared.presentation.auth.session_user import OracleSessionUser


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
def auth_client(api_client: APIClient) -> APIClient:
    api_client.force_authenticate(user=OracleSessionUser(username="tester"))
    django_user = MagicMock()
    django_user.is_superuser = True
    with patch(
        "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
        return_value=django_user,
    ):
        yield api_client


@patch(
    "apps.compras.presentation.views.recebimento_views.build_grava_fornecedor_use_case"
)
def test_grava_fornecedor_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = GravaFornecedorOutputDTO(
        cod_fornec=10,
        tipo_msg="A",
        msg="ok",
        acao=None,
    )
    mock_build.return_value = use_case

    response = auth_client.post(
        "/api/compras/fornecedores/",
        {
            "razao_soc": "ACME LTDA",
            "nome_reduz": "ACME",
            "endereco": "Rua A",
            "bairro": "Centro",
            "munic": "Sao Paulo",
            "cep": "01000-000",
            "estado": "SP",
            "cod_pais": 55,
        },
        format="json",
    )

    assert response.status_code == 200
    assert response.data["cod_fornec"] == 10


@patch(
    "apps.compras.presentation.views.recebimento_views.build_list_fornecedores_use_case"
)
def test_list_fornecedores_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = PaginatedFornecedoresOutputDTO(
        items=[
            FornecedorOutputDTO(
                for_codigo=1,
                emp_codigo=None,
                for_razao_soc="ACME",
                for_nome_reduz="ACME",
                for_endereco=None,
                for_bairro=None,
                for_munic=None,
                for_cep=None,
                for_estado=None,
                pai_codigo=None,
                pai_nome=None,
                for_dt_cad=None,
                for_dt_atual=None,
                for_ativo=1,
            )
        ],
        total=1,
        page=1,
        page_size=20,
    )
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/fornecedores/?search=ACME&ativo=1")

    assert response.status_code == 200
    assert response.data["total"] == 1
    assert response.data["items"][0]["for_codigo"] == 1


@patch(
    "apps.compras.presentation.views.recebimento_views.build_get_fornecedor_use_case"
)
def test_get_fornecedor_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = FornecedorOutputDTO(
        for_codigo=7,
        emp_codigo=None,
        for_razao_soc="ACME",
        for_nome_reduz="ACME",
        for_endereco=None,
        for_bairro=None,
        for_munic=None,
        for_cep=None,
        for_estado=None,
        pai_codigo=None,
        pai_nome=None,
        for_dt_cad=None,
        for_dt_atual=None,
        for_ativo=1,
    )
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/fornecedores/7/")

    assert response.status_code == 200
    assert response.data["for_codigo"] == 7


@patch(
    "apps.compras.presentation.views.recebimento_views.build_get_fornecedor_use_case"
)
def test_get_fornecedor_api_404(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.side_effect = FornecedorNotFoundError("missing")
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/fornecedores/99/")

    assert response.status_code == 404


@patch(
    "apps.compras.presentation.views.recebimento_views.build_ativa_fornecedor_use_case"
)
def test_ativa_fornecedor_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    mock_build.return_value = MagicMock()
    response = auth_client.post("/api/compras/fornecedores/7/ativar/")
    assert response.status_code == 200
    assert response.data["ok"] is True


@patch(
    "apps.compras.presentation.views.recebimento_views.build_inativa_fornecedor_use_case"
)
def test_inativa_fornecedor_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    mock_build.return_value = MagicMock()
    response = auth_client.post("/api/compras/fornecedores/7/inativar/")
    assert response.status_code == 200


@patch(
    "apps.compras.presentation.views.recebimento_views.build_grava_fornec_contato_use_case"
)
def test_grava_fornec_contato_api(
    mock_build: MagicMock, auth_client: APIClient
) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = GravaFornecContatoOutputDTO(
        cod_contato=5,
        tipo_msg=None,
        msg=None,
        acao=None,
    )
    mock_build.return_value = use_case

    response = auth_client.post(
        "/api/compras/fornecedor-contatos/",
        {
            "cod_fornec": 1,
            "nome": "Joao",
            "cargo": "Gerente",
            "email": "a@b.com",
            "telefone": "11999999999",
        },
        format="json",
    )

    assert response.status_code == 200
    assert response.data["cod_contato"] == 5


@patch(
    "apps.compras.presentation.views.recebimento_views.build_list_fornec_contatos_use_case"
)
def test_list_fornec_contatos_api(
    mock_build: MagicMock, auth_client: APIClient
) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = PaginatedFornecContatosOutputDTO(
        items=[
            FornecContatoOutputDTO(
                fco_codigo=5,
                for_codigo=1,
                fco_nome="Joao",
                fco_cargo=None,
                fco_email=None,
                fco_telefone=None,
            )
        ],
        total=1,
        page=1,
        page_size=20,
    )
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/fornecedor-contatos/?for_codigo=1")

    assert response.status_code == 200
    assert response.data["items"][0]["fco_codigo"] == 5


@patch(
    "apps.compras.presentation.views.recebimento_views.build_get_fornec_contato_use_case"
)
def test_get_fornec_contato_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = FornecContatoOutputDTO(
        fco_codigo=3,
        for_codigo=1,
        fco_nome="Joao",
        fco_cargo=None,
        fco_email=None,
        fco_telefone=None,
    )
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/fornecedor-contatos/3/")

    assert response.status_code == 200
    assert response.data["fco_codigo"] == 3


@patch(
    "apps.compras.presentation.views.recebimento_views.build_exclui_fornec_contato_use_case"
)
def test_exclui_fornec_contato_api(
    mock_build: MagicMock, auth_client: APIClient
) -> None:
    mock_build.return_value = MagicMock()
    response = auth_client.delete("/api/compras/fornecedor-contatos/3/")
    assert response.status_code == 200
    assert response.data["ok"] is True


@patch(
    "apps.compras.presentation.views.recebimento_views.build_list_msg_erros_use_case"
)
def test_list_msg_erros_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = PaginatedMsgErrosOutputDTO(
        items=[
            MsgErroOutputDTO(
                msg_erro_bd="ORA-1",
                msg_usu_port="Erro",
                msg_acao_port=None,
                msg_usu_ing=None,
                msg_acao_ing=None,
            )
        ],
        total=1,
        page=1,
        page_size=20,
    )
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/msg-erros/?search=ORA")

    assert response.status_code == 200
    assert response.data["items"][0]["msg_erro_bd"] == "ORA-1"


@patch("apps.compras.presentation.views.recebimento_views.build_list_paises_use_case")
def test_list_paises_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        PaisOutputDTO(pai_codigo=76, pai_nome="Brasil", eti_codigo=1),
    ]
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/paises/?search=Bras")

    assert response.status_code == 200
    assert response.data[0]["pai_codigo"] == 76
    assert response.data[0]["pai_nome"] == "Brasil"


@patch("apps.compras.presentation.views.recebimento_views.build_get_pais_use_case")
def test_get_pais_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = PaisOutputDTO(
        pai_codigo=76, pai_nome="Brasil", eti_codigo=1
    )
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/paises/76/")

    assert response.status_code == 200
    assert response.data["pai_nome"] == "Brasil"


@patch("apps.compras.presentation.views.recebimento_views.build_get_pais_use_case")
def test_get_pais_api_404(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.side_effect = PaisNotFoundError("missing")
    mock_build.return_value = use_case

    response = auth_client.get("/api/compras/paises/999/")

    assert response.status_code == 404


def test_grava_fornecedor_requires_auth(api_client: APIClient) -> None:
    response = api_client.post("/api/compras/fornecedores/", {}, format="json")
    assert response.status_code == 401


def test_list_fornecedores_requires_auth(api_client: APIClient) -> None:
    response = api_client.get("/api/compras/fornecedores/")
    assert response.status_code == 401


def test_grava_fornec_contato_forbidden_without_django_perm(
    api_client: APIClient,
) -> None:
    api_client.force_authenticate(user=OracleSessionUser(username="noperm"))
    django_user = MagicMock()
    django_user.is_superuser = False
    django_user.has_perm.return_value = False

    with patch(
        "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
        return_value=django_user,
    ):
        response = api_client.post(
            "/api/compras/fornecedor-contatos/",
            {
                "cod_fornec": 1,
                "nome": "Joao",
                "cargo": "Gerente",
                "email": "a@b.com",
                "telefone": "11999999999",
            },
            format="json",
        )

    assert response.status_code == 403


def test_list_fornecedores_forbidden_without_view_perm(
    api_client: APIClient,
) -> None:
    api_client.force_authenticate(user=OracleSessionUser(username="noperm"))
    django_user = MagicMock()
    django_user.is_superuser = False
    django_user.has_perm.return_value = False

    with patch(
        "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
        return_value=django_user,
    ):
        response = api_client.get("/api/compras/fornecedores/")

    assert response.status_code == 403


@patch(
    "apps.compras.presentation.views.recebimento_views.build_grava_fornec_contato_use_case"
)
def test_grava_fornec_contato_allowed_with_add_perm(
    mock_build: MagicMock,
    api_client: APIClient,
) -> None:
    api_client.force_authenticate(user=OracleSessionUser(username="ops"))
    django_user = MagicMock()
    django_user.is_superuser = False
    django_user.has_perm.side_effect = lambda perm: (
        perm == "compras_infrastructure.add_forneccontato"
    )
    use_case = MagicMock()
    use_case.execute.return_value = GravaFornecContatoOutputDTO(
        cod_contato=5,
        tipo_msg=None,
        msg=None,
        acao=None,
    )
    mock_build.return_value = use_case

    with patch(
        "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
        return_value=django_user,
    ):
        response = api_client.post(
            "/api/compras/fornecedor-contatos/",
            {
                "cod_fornec": 1,
                "nome": "Joao",
                "cargo": "Gerente",
                "email": "a@b.com",
                "telefone": "11999999999",
            },
            format="json",
        )

    assert response.status_code == 200
    assert response.data["cod_contato"] == 5
