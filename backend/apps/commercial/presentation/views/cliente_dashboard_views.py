"""Cliente dashboard API views."""

from __future__ import annotations

from dataclasses import asdict
from typing import TYPE_CHECKING

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.commercial.application.dtos.cliente_dashboard_dtos import (
    ClienteDashboardQueryInputDTO,
)
from apps.commercial.application.use_cases.grava_cliente_limites_use_case import (
    GravaClienteLimitesInputDTO,
)
from apps.commercial.presentation.dependencies import (
    build_get_cliente_dashboard_credito_use_case,
    build_grava_cliente_limites_use_case,
    build_list_cliente_dashboard_os_use_case,
    build_list_cliente_dashboard_titulos_use_case,
)
from apps.commercial.presentation.permissions import CHANGE_CLIENTE_RISCO, VIEW_CLIENTE
from apps.commercial.presentation.serializers.cliente_dashboard_serializers import (
    ClienteDashboardCreditoSerializer,
    ClienteDashboardPaginatedQuerySerializer,
    ClienteDashboardScopeQuerySerializer,
    GravaClienteLimitesRequestSerializer,
    PaginatedClienteDashboardOsSerializer,
    PaginatedClienteDashboardTitulosSerializer,
)
from apps.commercial.presentation.views.cliente_views import _actor_from_request
from apps.shared.presentation.auth.permissions import (
    HasDjangoPermission,
    IsOracleAuthenticated,
)

if TYPE_CHECKING:
    from rest_framework.request import Request


class ClienteDashboardCreditoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(lambda _request: [VIEW_CLIENTE])

    @extend_schema(
        parameters=[ClienteDashboardScopeQuerySerializer],
        responses={200: ClienteDashboardCreditoSerializer},
    )
    def get(self, request: Request, codigo: int) -> Response:
        query = ClienteDashboardScopeQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        result = build_get_cliente_dashboard_credito_use_case().execute(
            ClienteDashboardQueryInputDTO(
                actor=_actor_from_request(request),
                codigo=codigo,
                scope=data.get("scope", "cliente"),
            )
        )
        return Response(
            ClienteDashboardCreditoSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClienteDashboardHistoricoOsView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(lambda _request: [VIEW_CLIENTE])

    @extend_schema(
        parameters=[ClienteDashboardPaginatedQuerySerializer],
        responses={200: PaginatedClienteDashboardOsSerializer},
    )
    def get(self, request: Request, codigo: int) -> Response:
        query = ClienteDashboardPaginatedQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        result = build_list_cliente_dashboard_os_use_case().execute(
            ClienteDashboardQueryInputDTO(
                actor=_actor_from_request(request),
                codigo=codigo,
                scope=data.get("scope", "cliente"),
                page=data.get("page", 1),
                page_size=data.get("page_size", 20),
            )
        )
        return Response(
            PaginatedClienteDashboardOsSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClienteDashboardHistoricoTitulosView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(lambda _request: [VIEW_CLIENTE])

    @extend_schema(
        parameters=[ClienteDashboardPaginatedQuerySerializer],
        responses={200: PaginatedClienteDashboardTitulosSerializer},
    )
    def get(self, request: Request, codigo: int) -> Response:
        query = ClienteDashboardPaginatedQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        result = build_list_cliente_dashboard_titulos_use_case().execute(
            ClienteDashboardQueryInputDTO(
                actor=_actor_from_request(request),
                codigo=codigo,
                scope=data.get("scope", "cliente"),
                page=data.get("page", 1),
                page_size=data.get("page_size", 20),
            )
        )
        return Response(
            PaginatedClienteDashboardTitulosSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClienteDashboardLimitesView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_CLIENTE_RISCO]

    @extend_schema(request=GravaClienteLimitesRequestSerializer, responses={204: None})
    def put(self, request: Request, codigo: int) -> Response:
        serializer = GravaClienteLimitesRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        build_grava_cliente_limites_use_case().execute(
            GravaClienteLimitesInputDTO(
                actor=_actor_from_request(request),
                codigo=codigo,
                limitecr=data.get("limitecr"),
                cli_limite_crv=data.get("cli_limite_crv"),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)
