"""API smoke tests for cliente catalogs and tabs."""

from unittest.mock import MagicMock, patch

import pytest
from rest_framework.test import APIClient

from apps.commercial.application.dtos.cliente_dtos import (
    ActorContextDTO,
    ClienteArclassOutputDTO,
    ClienteAreaOsOutputDTO,
    ClienteArlevelOutputDTO,
    ClienteArsalespOutputDTO,
    ClienteCidadeOutputDTO,
    ClienteCobrancaOutputDTO,
    ClienteContatoOutputDTO,
    ClienteEmbarqueOutputDTO,
    ClienteGrupoTributarioOutputDTO,
    ClienteLogOutputDTO,
    ClienteModeloPagtOutputDTO,
    ClienteRiscoOutputDTO,
)
from apps.commercial.domain.repositories.cliente_repository import (
    GravaClienteContatoResult,
)
from apps.shared.presentation.auth.session_user import OracleSessionUser

_ACTOR = ActorContextDTO(
    username="tester",
    usu_chapa=4200,
    link_emp_codigo=None,
    owner_emp_codigo=1,
)


@pytest.fixture
def auth_client() -> APIClient:
    client = APIClient()
    client.force_authenticate(user=OracleSessionUser(username="tester"))
    django_user = MagicMock()
    django_user.is_superuser = True
    with (
        patch(
            "apps.shared.presentation.auth.permissions.resolve_django_user_from_request",
            return_value=django_user,
        ),
        patch(
            "apps.commercial.presentation.views.cliente_tab_views.resolve_django_user_from_request",
            return_value=django_user,
        ),
        patch(
            "apps.commercial.presentation.views.cliente_views.resolve_actor_context",
            return_value=_ACTOR,
        ),
    ):
        yield client


def test_list_cidades_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteCidadeOutputDTO(codigo="38709", descricao="PIRACICABA", uf="SP")
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_cidades_use_case",
        return_value=use_case,
    ):
        response = auth_client.get(
            "/api/commercial/catalogos/cidades/?pai_codigo=76&est_codigo=25"
        )
    assert response.status_code == 200
    assert response.data[0]["codigo"] == "38709"
    use_case.execute.assert_called_once_with(pai_codigo=76, est_codigo=25)


def test_list_arclasses_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteArclassOutputDTO(class_key="AUTO", descr="Automotivo")
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_arclasses_use_case",
        return_value=use_case,
    ):
        response = auth_client.get("/api/commercial/catalogos/arclasses/")
    assert response.status_code == 200
    assert response.data[0]["class_key"] == "AUTO"
    assert response.data[0]["descr"] == "Automotivo"
    use_case.execute.assert_called_once_with()


def test_list_arlevels_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteArlevelOutputDTO(terr_key="01", description="Sul")
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_arlevels_use_case",
        return_value=use_case,
    ):
        response = auth_client.get("/api/commercial/catalogos/arlevels/")
    assert response.status_code == 200
    assert response.data[0]["terr_key"] == "01"
    assert response.data[0]["description"] == "Sul"
    use_case.execute.assert_called_once_with()


def test_list_arsalesps_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteArsalespOutputDTO(
            salesp_key="00001", nome="Ana", emp_nome="NOVA SMAR S/A"
        )
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_arsalesps_use_case",
        return_value=use_case,
    ):
        response = auth_client.get("/api/commercial/catalogos/arsalesps/")
    assert response.status_code == 200
    assert response.data[0]["salesp_key"] == "00001"
    assert response.data[0]["nome"] == "Ana"
    assert response.data[0]["emp_nome"] == "NOVA SMAR S/A"
    use_case.execute.assert_called_once_with()


def test_list_contatos_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteContatoOutputDTO(
            con_codigo=9,
            codcliente=10,
            nome="Ana",
            depto=None,
            cargo=None,
            telefone=None,
            fax=None,
            celular=None,
            email=None,
            con_ativo=1,
            is_comercial=True,
        )
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_contatos_use_case",
        return_value=use_case,
    ):
        response = auth_client.get("/api/commercial/clientes/10/contatos/")
    assert response.status_code == 200
    assert response.data[0]["con_codigo"] == 9
    assert response.data[0]["is_comercial"] is True


def test_grava_contato_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = GravaClienteContatoResult(con_codigo=44)
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_grava_cliente_contato_use_case",
        return_value=use_case,
    ):
        response = auth_client.post(
            "/api/commercial/clientes/10/contatos/",
            {"nome": "Ana"},
            format="json",
        )
    assert response.status_code == 200
    assert response.data["con_codigo"] == 44


def test_list_logs_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteLogOutputDTO(
            codigo=1,
            lcl_data=None,
            data_txt="19/08/2026",
            usu_chapa=99,
            usu_nome="Tester",
            lcl_texto="Obs",
        )
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_logs_use_case",
        return_value=use_case,
    ):
        response = auth_client.get("/api/commercial/clientes/10/logs/")
    assert response.status_code == 200
    assert response.data[0]["usu_nome"] == "Tester"


def _cobranca() -> ClienteCobrancaOutputDTO:
    return ClienteCobrancaOutputDTO(
        codigo=10,
        chavecobra="000000001",
        nome="ACME",
        endereco1="Rua A",
        endereco2="100",
        endereco3=None,
        cob_bairro=None,
        cidade="Piracicaba",
        estado="SP",
        est_nome="Sao Paulo",
        cep="13400-000",
        pais="BRA",
        pais_nome="Brasil",
        contato="Ana",
        telefone1=None,
        telefone2=None,
        e_mail=None,
        ativo=1,
        cli_codigo_ref=20,
        is_padrao=True,
    )


def _embarque() -> ClienteEmbarqueOutputDTO:
    return ClienteEmbarqueOutputDTO(
        codigo=10,
        chave_emb="000000002",
        nome="ACME",
        endereco1="Rua B",
        endereco2=None,
        endereco3=None,
        emb_bairro=None,
        cidade="Santos",
        estado="SP",
        est_nome="Sao Paulo",
        cep="11000-000",
        pais="BRA",
        pais_nome="Brasil",
        contato=None,
        telefone1=None,
        telefone2=None,
        e_mail=None,
        ativo=1,
        cli_codigo_ref=21,
        is_padrao=False,
    )


def test_list_grupos_tributarios_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteGrupoTributarioOutputDTO(
            codigo="077", descricao="SP", uf="SP", is_default=True
        )
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_grupos_tributarios_use_case",
        return_value=use_case,
    ):
        response = auth_client.get(
            "/api/commercial/catalogos/grupos-tributarios/"
            "?est_codigo=25&cli_tipo=R"
        )
    assert response.status_code == 200
    assert response.data[0]["codigo"] == "077"
    assert response.data[0]["is_default"] is True
    use_case.execute.assert_called_once_with(est_codigo=25, cli_tipo="R")


def test_list_areas_os_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteAreaOsOutputDTO(
            aos_codigo=3,
            aos_nome="Comercial",
            usu_chapa=10,
            usu_nome="Ana",
            qtd=2,
            is_default=True,
        )
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_areas_os_use_case",
        return_value=use_case,
    ):
        response = auth_client.get(
            "/api/commercial/catalogos/areas-os/?tipo=C&est_codigo=25"
        )
    assert response.status_code == 200
    assert response.data[0]["aos_codigo"] == 3
    use_case.execute.assert_called_once_with(
        tipo_area="C",
        mun_ibge=None,
        est_codigo=25,
        pai_codigo=None,
        current_codigo=None,
    )


def test_list_modelos_pagto_api_unrestricted_for_superuser(
    auth_client: APIClient,
) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteModeloPagtOutputDTO(
            mpg_codigo=7, descricao="Boleto", mpg_area="C", mpg_status=1
        )
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_modelos_pagto_use_case",
        return_value=use_case,
    ):
        response = auth_client.get(
            "/api/commercial/catalogos/modelos-pagto/?origem=BR"
        )
    assert response.status_code == 200
    assert response.data[0]["mpg_codigo"] == 7
    use_case.execute.assert_called_once_with(
        origem="BR",
        mpg_codigo=None,
        risco_protheus=None,
        unrestricted=True,
    )


def test_put_financeiro_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_grava_cliente_dados_finan_use_case",
        return_value=use_case,
    ):
        response = auth_client.put(
            "/api/commercial/clientes/10/financeiro/",
            {"limitecr": 900, "cli_grupo_trib": "077"},
            format="json",
        )
    assert response.status_code == 204
    use_case.execute.assert_called_once()
    payload = use_case.execute.call_args.args[0]
    assert payload.codigo == 10
    assert payload.limitecr == 900
    assert payload.apply_limites is True


def test_put_contato_padrao_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_set_cliente_contato_padrao_use_case",
        return_value=use_case,
    ):
        response = auth_client.put(
            "/api/commercial/clientes/10/contatos/padrao/",
            {"con_codigo_com": 9, "con_codigo_tec": 8, "con_codigo_fin": 7},
            format="json",
        )
    assert response.status_code == 204
    payload = use_case.execute.call_args.args[0]
    assert payload.con_codigo_com == 9
    assert payload.con_codigo_tec == 8
    assert payload.con_codigo_fin == 7


def test_list_cobrancas_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [_cobranca()]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_cobrancas_use_case",
        return_value=use_case,
    ):
        response = auth_client.get("/api/commercial/clientes/10/cobrancas/")
    assert response.status_code == 200
    assert response.data[0]["chavecobra"] == "000000001"
    assert response.data[0]["est_nome"] == "Sao Paulo"


def test_grava_cobranca_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_grava_cliente_cobranca_use_case",
        return_value=use_case,
    ):
        response = auth_client.post(
            "/api/commercial/clientes/10/cobrancas/",
            {"cli_codigo_ref": 20, "tipo_cadastro": "I"},
            format="json",
        )
    assert response.status_code == 204
    payload = use_case.execute.call_args.args[0]
    assert payload.cli_codigo_ref == 20
    assert payload.tipo_cadastro == "I"


def test_put_cobranca_padrao_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_set_cliente_endereco_padrao_use_case",
        return_value=use_case,
    ):
        response = auth_client.put(
            "/api/commercial/clientes/10/cobrancas/padrao/",
            {"chave": "000000001"},
            format="json",
        )
    assert response.status_code == 204
    payload = use_case.execute.call_args.args[0]
    assert payload.chave == "000000001"
    assert payload.kind == "cobranca"


def test_list_embarques_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [_embarque()]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_embarques_use_case",
        return_value=use_case,
    ):
        response = auth_client.get("/api/commercial/clientes/10/embarques/")
    assert response.status_code == 200
    assert response.data[0]["chave_emb"] == "000000002"


def test_grava_embarque_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_grava_cliente_embarque_use_case",
        return_value=use_case,
    ):
        response = auth_client.post(
            "/api/commercial/clientes/10/embarques/",
            {"cli_codigo_ref": 21, "chave_emb": "000000002", "tipo_cadastro": "A"},
            format="json",
        )
    assert response.status_code == 204
    payload = use_case.execute.call_args.args[0]
    assert payload.cli_codigo_ref == 21
    assert payload.chave_emb == "000000002"


def test_put_embarque_padrao_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_set_cliente_endereco_padrao_use_case",
        return_value=use_case,
    ):
        response = auth_client.put(
            "/api/commercial/clientes/10/embarques/padrao/",
            {"chave": "000000002"},
            format="json",
        )
    assert response.status_code == 204
    payload = use_case.execute.call_args.args[0]
    assert payload.kind == "embarque"
    assert payload.chave == "000000002"


def test_put_obs_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_grava_cliente_obs_use_case",
        return_value=use_case,
    ):
        response = auth_client.put(
            "/api/commercial/clientes/10/observa/",
            {"observa": "Cliente VIP"},
            format="json",
        )
    assert response.status_code == 204
    payload = use_case.execute.call_args.args[0]
    assert payload.observa == "Cliente VIP"


def test_list_riscos_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    use_case.execute.return_value = [
        ClienteRiscoOutputDTO(
            codigo=1,
            letra="A",
            desc="Sem restrições",
            desc_longa="Nota A   : Sem restrições",
            restricao=0,
        )
    ]
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_list_cliente_riscos_use_case",
        return_value=use_case,
    ):
        response = auth_client.get("/api/commercial/catalogos/riscos-cliente/")
    assert response.status_code == 200
    assert response.data[0]["codigo"] == 1
    assert response.data[0]["letra"] == "A"


def test_put_bloqueio_api(auth_client: APIClient) -> None:
    use_case = MagicMock()
    with patch(
        "apps.commercial.presentation.views.cliente_tab_views.build_grava_cliente_bloqueio_use_case",
        return_value=use_case,
    ):
        response = auth_client.put(
            "/api/commercial/clientes/10/bloqueio/",
            {"bloqueado": 4, "mensagem_bloqueio": "Pendência financeira"},
            format="json",
        )
    assert response.status_code == 204
    payload = use_case.execute.call_args.args[0]
    assert payload.codigo == 10
    assert payload.bloqueado == 4
    assert payload.mensagem_bloqueio == "Pendência financeira"
