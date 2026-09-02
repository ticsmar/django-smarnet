"""API smoke tests for cliente dashboard endpoints."""

from decimal import Decimal
from unittest.mock import MagicMock, patch

import pytest
from rest_framework.test import APIClient

from apps.commercial.application.dtos.cliente_dashboard_dtos import (
    ClienteDashboardCreditoOutputDTO,
    ClienteDashboardOsItemOutputDTO,
    ClienteDashboardResumoDTO,
    ClienteDashboardTituloItemOutputDTO,
    PaginatedClienteDashboardOsOutputDTO,
    PaginatedClienteDashboardTitulosOutputDTO,
)
from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.domain.exceptions.cliente_exceptions import ClienteNotFoundError
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
            "apps.commercial.presentation.views.cliente_dashboard_views._actor_from_request",
            return_value=_ACTOR,
        ),
    ):
        yield api_client


def test_dashboard_credito_ok(auth_client: APIClient) -> None:
    dto = ClienteDashboardCreditoOutputDTO(
        codigo=10,
        nome="ACME",
        grupo_cabeca=10,
        scope="cliente",
        limitecr=Decimal("1000"),
        cli_limite_crv=None,
        bloqueado=0,
        risco_letra="A",
        risco_descricao="OK",
        risco_restricao=None,
        mensagem_bloqueio=None,
        total_os=1,
        os_abertas=0,
        membros_grupo=1,
        resumo=ClienteDashboardResumoDTO(
            titulos_a_vencer=Decimal("0"),
            titulos_vencidos=Decimal("0"),
            valores_faturar_prazo=Decimal("0"),
            credito_concedido_prazo=Decimal("0"),
            limite_prazo=Decimal("1000"),
            saldo_prazo=Decimal("1000"),
            valores_faturar_antecipacao=Decimal("0"),
            valores_faturar_vista=Decimal("0"),
            saldo_antecipacoes=Decimal("0"),
            credito_concedido_vista=Decimal("0"),
            limite_vista=Decimal("0"),
            saldo_vista=Decimal("0"),
            saldo_geral=Decimal("1000"),
            media_atraso_dias=None,
            media_antecipacao_dias=None,
        ),
        titulos_pendentes_disponivel=True,
        oss_pendentes_disponivel=True,
        series_disponivel=False,
    )
    with patch(
        "apps.commercial.presentation.views.cliente_dashboard_views.build_get_cliente_dashboard_credito_use_case"
    ) as builder:
        builder.return_value.execute.return_value = dto
        response = auth_client.get(
            "/api/commercial/clientes/10/dashboard/credito/?scope=cliente"
        )
    assert response.status_code == 200
    assert response.json()["codigo"] == 10
    assert response.json()["total_os"] == 1


def test_dashboard_credito_not_found(auth_client: APIClient) -> None:
    with patch(
        "apps.commercial.presentation.views.cliente_dashboard_views.build_get_cliente_dashboard_credito_use_case"
    ) as builder:
        builder.return_value.execute.side_effect = ClienteNotFoundError("missing")
        response = auth_client.get("/api/commercial/clientes/99/dashboard/credito/")
    assert response.status_code == 404


def test_dashboard_historico_os_ok(auth_client: APIClient) -> None:
    dto = PaginatedClienteDashboardOsOutputDTO(
        items=[
            ClienteDashboardOsItemOutputDTO(
                order_no=1,
                cust_key=10,
                cliente_nome="ACME",
                order_date=None,
                origem="01",
                origem_descricao="Nacional",
                order_status="A",
                os_encerrada=0,
            )
        ],
        total=1,
        page=1,
        page_size=20,
        scope="cliente",
    )
    with patch(
        "apps.commercial.presentation.views.cliente_dashboard_views.build_list_cliente_dashboard_os_use_case"
    ) as builder:
        builder.return_value.execute.return_value = dto
        response = auth_client.get(
            "/api/commercial/clientes/10/dashboard/historico/os/"
        )
    assert response.status_code == 200
    assert response.json()["items"][0]["order_no"] == 1


def test_dashboard_historico_titulos_ok(auth_client: APIClient) -> None:
    dto = PaginatedClienteDashboardTitulosOutputDTO(
        items=[
            ClienteDashboardTituloItemOutputDTO(
                numero="0001",
                parcela="01",
                valor=Decimal("100"),
                saldo=Decimal("50"),
                vencimento=None,
                emissao=None,
                status="A",
                cliente_codigo=10,
            )
        ],
        total=1,
        page=1,
        page_size=20,
        scope="grupo",
        titulos_disponivel=True,
    )
    with patch(
        "apps.commercial.presentation.views.cliente_dashboard_views.build_list_cliente_dashboard_titulos_use_case"
    ) as builder:
        builder.return_value.execute.return_value = dto
        response = auth_client.get(
            "/api/commercial/clientes/10/dashboard/historico/titulos/?scope=grupo"
        )
    assert response.status_code == 200
    assert response.json()["titulos_disponivel"] is True


def test_dashboard_limites_ok(auth_client: APIClient) -> None:
    with patch(
        "apps.commercial.presentation.views.cliente_dashboard_views.build_grava_cliente_limites_use_case"
    ) as builder:
        response = auth_client.put(
            "/api/commercial/clientes/10/dashboard/limites/",
            {"limitecr": "1246990.00", "cli_limite_crv": "200000.00"},
            format="json",
        )
    assert response.status_code == 204
    payload = builder.return_value.execute.call_args.args[0]
    assert payload.codigo == 10
    assert payload.limitecr == Decimal("1246990.00")
    assert payload.cli_limite_crv == Decimal("200000.00")
