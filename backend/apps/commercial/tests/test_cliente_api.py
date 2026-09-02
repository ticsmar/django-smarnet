"""API smoke tests for administracao cliente endpoints."""

from unittest.mock import MagicMock, patch

import pytest
from rest_framework.test import APIClient

from apps.commercial.application.dtos.cliente_dtos import (
    ActorContextDTO,
    ClienteDetailOutputDTO,
    ClienteDocumentoCopyPayloadDTO,
    ClienteDocumentoMatchOutputDTO,
    ClienteEstadoOutputDTO,
    ClienteListItemOutputDTO,
    ClienteOrigemOutputDTO,
    ClientePaisOutputDTO,
    CnpjReceitaOutputDTO,
    ConsultaCnpjOutputDTO,
    ConsultaFuncionarioOutputDTO,
    CreateClienteFromFuncionarioOutputDTO,
    GravaClienteDadosGeraisOutputDTO,
    ListClienteCatalogsOutputDTO,
    LookupClienteDocumentoOutputDTO,
    PaginatedClientesOutputDTO,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteForbiddenError,
    ClienteNotFoundError,
    ClienteProcedureError,
)
from apps.shared.presentation.auth.session_user import OracleSessionUser

_ACTOR = ActorContextDTO(
    username="tester",
    usu_chapa=4200,
    link_emp_codigo=None,
    owner_emp_codigo=1,
)


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
def auth_client(api_client: APIClient) -> APIClient:
    api_client.force_authenticate(user=OracleSessionUser(username="tester"))
    django_user = MagicMock()
    django_user.is_superuser = True
    with (
        patch(
            "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
            return_value=django_user,
        ),
        patch(
            "apps.commercial.presentation.views.cliente_views.resolve_actor_context",
            return_value=_ACTOR,
        ),
    ):
        yield api_client


def _list_item(codigo: int = 1) -> ClienteListItemOutputDTO:
    return ClienteListItemOutputDTO(
        codigo=codigo,
        cliente="ACME",
        reduzido="ACME",
        cgc="12345678000199",
        cidade="Sao Paulo",
        estado="SP",
        emp_codigo=1,
        bloqueado=0,
        tipo="J",
        can_edit=True,
        pai_codigo=76,
        pais_nome="Brasil",
    )


def _detail(codigo: int = 1) -> ClienteDetailOutputDTO:
    return ClienteDetailOutputDTO(
        codigo=codigo,
        origem=None,
        cliente="ACME",
        reduzido="ACME",
        tipo="J",
        endereco1="Rua A",
        endereco2=None,
        endereco3=None,
        cli_bairro="Centro",
        cidade="Sao Paulo",
        estado="SP",
        cep="01000-000",
        pais="BRA",
        pai_codigo=76,
        est_codigo=26,
        telefone1="1111",
        telefone2=None,
        fax=None,
        email="a@b.com",
        homepage=None,
        cgc="12345678000199",
        inscr_est=None,
        cli_inscr_mun=None,
        cli_tipo="F",
        cli_pes_tipo=None,
        cli_contribuinte=2,
        cli_ie_isento=0,
        cli_cnae=None,
        cli_cod_mun_ibge=None,
        cli_inscr_suframa=None,
        cli_nif=None,
        contato=None,
        contatotec=None,
        contatofin=None,
        observa=None,
        emp_codigo=1,
        bloqueado=0,
        dt_atual=None,
        dt_cad=None,
        can_edit=True,
        crs_cod_letra="C",
        crs_desc="Pendência financeira",
        crs_desc_longa="Nota C : Pendência financeira",
        crs_restricao=0,
    )


@patch("apps.commercial.presentation.views.cliente_views.build_list_clientes_use_case")
def test_list_clientes_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = PaginatedClientesOutputDTO(
        items=[_list_item(1)],
        total=1,
        page=1,
        page_size=20,
    )
    mock_build.return_value = use_case

    response = auth_client.get("/api/commercial/clientes/?search=ACME")

    assert response.status_code == 200
    assert response.data["total"] == 1
    assert response.data["items"][0]["codigo"] == 1
    assert response.data["items"][0]["pai_codigo"] == 76
    assert response.data["items"][0]["pais_nome"] == "Brasil"
    assert use_case.execute.call_args.args[0].actor == _ACTOR
    assert use_case.execute.call_args.args[0].search == "ACME"


@patch("apps.commercial.presentation.views.cliente_views.build_get_cliente_use_case")
def test_get_cliente_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = _detail(codigo=7)
    mock_build.return_value = use_case

    response = auth_client.get("/api/commercial/clientes/7/")

    assert response.status_code == 200
    assert response.data["codigo"] == 7
    assert response.data["crs_cod_letra"] == "C"
    assert response.data["crs_desc"] == "Pendência financeira"
    assert response.data["crs_restricao"] == 0


@patch("apps.commercial.presentation.views.cliente_views.build_get_cliente_use_case")
def test_get_cliente_api_404(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.side_effect = ClienteNotFoundError("missing")
    mock_build.return_value = use_case

    response = auth_client.get("/api/commercial/clientes/99/")

    assert response.status_code == 404


@patch(
    "apps.commercial.presentation.views.cliente_views.build_grava_cliente_dados_gerais_use_case"
)
def test_create_cliente_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = GravaClienteDadosGeraisOutputDTO(
        codigo=42,
        tipo_msg="A",
        msg="ok",
        acao=None,
    )
    mock_build.return_value = use_case

    response = auth_client.post(
        "/api/commercial/clientes/",
        {
            "tipo_cadastro": "J",
            "cliente": "ACME LTDA",
            "cgc": "12345678000199",
        },
        format="json",
    )

    assert response.status_code == 200
    assert response.data["codigo"] == 42
    assert use_case.execute.call_args.args[0].codigo is None


@patch(
    "apps.commercial.presentation.views.cliente_views.build_grava_cliente_dados_gerais_use_case"
)
def test_update_cliente_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = GravaClienteDadosGeraisOutputDTO(
        codigo=42,
        tipo_msg="A",
        msg="ok",
        acao=None,
    )
    mock_build.return_value = use_case

    response = auth_client.put(
        "/api/commercial/clientes/42/",
        {
            "tipo_cadastro": "J",
            "cliente": "ACME LTDA 2",
        },
        format="json",
    )

    assert response.status_code == 200
    assert use_case.execute.call_args.args[0].codigo == 42


@patch(
    "apps.commercial.presentation.views.cliente_views.build_grava_cliente_dados_gerais_use_case"
)
def test_grava_returns_400_on_procedure_error(
    mock_build: MagicMock, auth_client: APIClient
) -> None:
    use_case = MagicMock()
    use_case.execute.side_effect = ClienteProcedureError("erro", "corrigir")
    mock_build.return_value = use_case

    response = auth_client.post(
        "/api/commercial/clientes/",
        {"tipo_cadastro": "J", "cliente": "ACME"},
        format="json",
    )

    assert response.status_code == 400


@patch(
    "apps.commercial.presentation.views.cliente_views.build_grava_cliente_dados_gerais_use_case"
)
def test_grava_returns_403_when_actor_out_of_scope(
    mock_build: MagicMock, auth_client: APIClient
) -> None:
    use_case = MagicMock()
    use_case.execute.side_effect = ClienteForbiddenError("out of scope")
    mock_build.return_value = use_case

    response = auth_client.put(
        "/api/commercial/clientes/42/",
        {"tipo_cadastro": "J", "cliente": "ACME"},
        format="json",
    )
    assert response.status_code == 403


@patch(
    "apps.commercial.presentation.views.cliente_views.build_lookup_cliente_documento_use_case"
)
def test_lookup_documento_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = LookupClienteDocumentoOutputDTO(
        matches=[
            ClienteDocumentoMatchOutputDTO(
                codigo=10,
                cliente="ACME",
                cgc="12345678000199",
                cidade="SP",
                estado="SP",
                emp_codigo=1,
            )
        ],
        copy_fields=ClienteDocumentoCopyPayloadDTO(
            cliente="ACME",
            reduzido="ACME",
            endereco1="Rua",
            endereco2=None,
            endereco3=None,
            cli_bairro=None,
            cidade="SP",
            estado="SP",
            cep=None,
            pais=None,
            pai_codigo=None,
            est_codigo=None,
            telefone1=None,
            telefone2=None,
            fax=None,
            email=None,
            homepage=None,
            cgc="12345678000199",
            inscr_est=None,
            cli_inscr_mun=None,
            cli_ie_isento=0,
            cli_contribuinte=2,
            cli_cnae=None,
            cli_cod_mun_ibge=None,
            cli_inscr_suframa=None,
            cli_nif=None,
            cli_pes_tipo=None,
            tipo="J",
            origem=None,
        ),
    )
    mock_build.return_value = use_case

    response = auth_client.get(
        "/api/commercial/clientes/documento/?documento=12345678000199"
    )

    assert response.status_code == 200
    assert response.data["matches"][0]["codigo"] == 10
    assert response.data["copy_fields"]["cliente"] == "ACME"


@patch("apps.commercial.presentation.views.cliente_views.build_consulta_cnpj_use_case")
def test_consulta_cnpj_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = ConsultaCnpjOutputDTO(
        cnpj="12345678000199",
        already_registered=False,
        can_discard=True,
        can_copy=True,
        matches=[],
        copy_fields=None,
        receita=CnpjReceitaOutputDTO(
            nome="ACME LTDA",
            fantasia="ACME",
            cnpj="12345678000199",
            logradouro="RUA A",
            numero="10",
            complemento=None,
            bairro="CENTRO",
            uf="SP",
            est_codigo=26,
            municipio="SERTAOZINHO",
            municipio_ibge="50704",
            cep="14160000",
            situacao="ATIVA",
            data_situacao=None,
            telefone="1633334444",
            telefone2=None,
            email=None,
            natureza_juridica=None,
            abertura=None,
            ultima_atualizacao=None,
            tipo="MATRIZ",
            status="OK",
            efr=None,
            motivo_situacao=None,
            situacao_especial=None,
            data_situacao_especial=None,
            capital_social=None,
            atividade_principal=[],
            atividades_secundarias=[],
            qsa=[],
            fonte="https://receitaws.com.br/",
        ),
        message=None,
    )
    mock_build.return_value = use_case

    response = auth_client.post(
        "/api/commercial/clientes/cnpj/",
        {"cnpj": "02.596.588/0001-13"},
        format="json",
    )

    assert response.status_code == 200
    assert response.data["can_copy"] is True
    assert response.data["receita"]["nome"] == "ACME LTDA"
    assert use_case.execute.call_args.args[0].cnpj == "02.596.588/0001-13"


@patch(
    "apps.commercial.presentation.views.cliente_views.build_consulta_funcionario_use_case"
)
def test_consulta_funcionario_api(
    mock_build: MagicMock, auth_client: APIClient
) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = ConsultaFuncionarioOutputDTO(
        cpf="12345678901",
        already_registered=False,
        can_copy=True,
        matches=[],
        funcionario=None,
        message=None,
    )
    mock_build.return_value = use_case

    response = auth_client.post(
        "/api/commercial/clientes/funcionario/",
        {"cpf": "123.456.789-01"},
        format="json",
    )

    assert response.status_code == 200
    assert response.data["can_copy"] is True
    assert use_case.execute.call_args.args[0].cpf == "123.456.789-01"


@patch(
    "apps.commercial.presentation.views.cliente_views.build_create_cliente_from_funcionario_use_case"
)
def test_from_funcionario_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = CreateClienteFromFuncionarioOutputDTO(codigo=201)
    mock_build.return_value = use_case

    response = auth_client.post(
        "/api/commercial/clientes/from-funcionario/",
        {"cpf": "12345678901"},
        format="json",
    )

    assert response.status_code == 200
    assert response.data["codigo"] == 201


@patch(
    "apps.commercial.presentation.views.cliente_views.build_list_cliente_catalogs_use_case"
)
def test_catalogs_api(mock_build: MagicMock, auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = ListClienteCatalogsOutputDTO(
        paises=[ClientePaisOutputDTO(pai_codigo=76, pai_nome="Brasil")],
        estados=[
            ClienteEstadoOutputDTO(est_codigo=26, pai_codigo=76, est_nome="Sao Paulo")
        ],
        origens=[ClienteOrigemOutputDTO(origem="BR", descricao="Brasil")],
    )
    mock_build.return_value = use_case

    paises = auth_client.get("/api/commercial/catalogos/paises/")
    estados = auth_client.get("/api/commercial/catalogos/estados/?pai_codigo=76")
    origens = auth_client.get("/api/commercial/catalogos/origens/")

    assert paises.status_code == 200
    assert estados.status_code == 200
    assert origens.status_code == 200
    assert paises.data[0]["pai_nome"] == "Brasil"
    assert estados.data[0]["est_nome"] == "Sao Paulo"
    assert origens.data[0]["origem"] == "BR"


def test_list_requires_auth(api_client: APIClient) -> None:
    response = api_client.get("/api/commercial/clientes/")
    assert response.status_code == 401


def test_list_forbidden_without_view_perm(api_client: APIClient) -> None:
    api_client.force_authenticate(user=OracleSessionUser(username="noperm"))
    django_user = MagicMock()
    django_user.is_superuser = False
    django_user.has_perm.return_value = False

    with (
        patch(
            "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
            return_value=django_user,
        ),
        patch(
            "apps.commercial.presentation.views.cliente_views.resolve_actor_context",
            return_value=_ACTOR,
        ),
    ):
        response = api_client.get("/api/commercial/clientes/")

    assert response.status_code == 403


@patch(
    "apps.commercial.presentation.views.cliente_views.build_grava_cliente_dados_gerais_use_case"
)
def test_create_requires_add_perm(mock_build: MagicMock, api_client: APIClient) -> None:
    api_client.force_authenticate(user=OracleSessionUser(username="ops"))
    django_user = MagicMock()
    django_user.is_superuser = False
    django_user.has_perm.side_effect = lambda perm: (
        perm == "commercial_infrastructure.add_cliente"
    )
    use_case = MagicMock()
    use_case.execute.return_value = GravaClienteDadosGeraisOutputDTO(
        codigo=1, tipo_msg=None, msg=None, acao=None
    )
    mock_build.return_value = use_case

    with (
        patch(
            "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
            return_value=django_user,
        ),
        patch(
            "apps.commercial.presentation.views.cliente_views.resolve_actor_context",
            return_value=_ACTOR,
        ),
    ):
        response = api_client.post(
            "/api/commercial/clientes/",
            {"tipo_cadastro": "J", "cliente": "ACME"},
            format="json",
        )

    assert response.status_code == 200
