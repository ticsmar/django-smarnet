"""Cliente API views."""

from __future__ import annotations

from dataclasses import asdict
from typing import TYPE_CHECKING

from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.administracao.application.dtos.cliente_dtos import (
    ActorContextDTO,
    ConsultaCnpjInputDTO,
    ConsultaFuncionarioInputDTO,
    CreateClienteFromFuncionarioInputDTO,
    GetClienteInputDTO,
    GravaClienteDadosGeraisInputDTO,
    ListClienteCatalogsInputDTO,
    ListClientesInputDTO,
    LookupClienteDocumentoInputDTO,
    actor_dto_from_domain,
)
from apps.administracao.infrastructure.actor_context import resolve_actor_context
from apps.administracao.presentation.dependencies import (
    build_consulta_cnpj_use_case,
    build_consulta_funcionario_use_case,
    build_create_cliente_from_funcionario_use_case,
    build_get_cliente_use_case,
    build_grava_cliente_dados_gerais_use_case,
    build_list_cliente_catalogs_use_case,
    build_list_clientes_use_case,
    build_lookup_cliente_documento_use_case,
)
from apps.administracao.presentation.permissions import (
    ADD_CLIENTE,
    VIEW_CLIENTE,
    cliente_get_or_update_perms,
    cliente_list_or_grava_perms,
)
from apps.administracao.presentation.serializers.cliente_serializers import (
    ClienteDetailSerializer,
    ConsultaCnpjQuerySerializer,
    ConsultaCnpjResponseSerializer,
    ConsultaFuncionarioQuerySerializer,
    ConsultaFuncionarioResponseSerializer,
    CreateFromFuncionarioRequestSerializer,
    CreateFromFuncionarioResponseSerializer,
    EstadoSerializer,
    GravaClienteRequestSerializer,
    GravaClienteResponseSerializer,
    ListClientesQuerySerializer,
    ListEstadosQuerySerializer,
    LookupDocumentoQuerySerializer,
    LookupDocumentoResponseSerializer,
    OrigemSerializer,
    PaginatedClientesSerializer,
    PaisSerializer,
)
from apps.shared.presentation.auth.permissions import (
    HasDjangoPermission,
    IsOracleAuthenticated,
)

if TYPE_CHECKING:
    from rest_framework.request import Request


def _actor_from_request(request: Request) -> ActorContextDTO:
    username = getattr(request.user, "username", "") or ""
    return actor_dto_from_domain(resolve_actor_context(username))


class ClienteCollectionView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(cliente_list_or_grava_perms)

    @extend_schema(
        parameters=[ListClientesQuerySerializer],
        responses={200: PaginatedClientesSerializer},
    )
    def get(self, request: Request) -> Response:
        query = ListClientesQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        result = build_list_clientes_use_case().execute(
            ListClientesInputDTO(
                actor=_actor_from_request(request),
                search=data.get("search", ""),
                page=data.get("page", 1),
                page_size=data.get("page_size", 20),
            )
        )
        return Response(
            PaginatedClientesSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        request=GravaClienteRequestSerializer,
        responses={200: GravaClienteResponseSerializer},
    )
    def post(self, request: Request) -> Response:
        serializer = GravaClienteRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        result = build_grava_cliente_dados_gerais_use_case().execute(
            GravaClienteDadosGeraisInputDTO(
                actor=_actor_from_request(request),
                codigo=None,
                **data,
            )
        )
        return Response(
            GravaClienteResponseSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClienteDetailView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(cliente_get_or_update_perms)

    @extend_schema(responses={200: ClienteDetailSerializer})
    def get(self, request: Request, codigo: int) -> Response:
        result = build_get_cliente_use_case().execute(
            GetClienteInputDTO(actor=_actor_from_request(request), codigo=codigo)
        )
        return Response(
            ClienteDetailSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        request=GravaClienteRequestSerializer,
        responses={200: GravaClienteResponseSerializer},
    )
    def put(self, request: Request, codigo: int) -> Response:
        serializer = GravaClienteRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        result = build_grava_cliente_dados_gerais_use_case().execute(
            GravaClienteDadosGeraisInputDTO(
                actor=_actor_from_request(request),
                codigo=codigo,
                **data,
            )
        )
        return Response(
            GravaClienteResponseSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClienteDocumentoLookupView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        parameters=[LookupDocumentoQuerySerializer],
        responses={200: LookupDocumentoResponseSerializer},
    )
    def get(self, request: Request) -> Response:
        query = LookupDocumentoQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        result = build_lookup_cliente_documento_use_case().execute(
            LookupClienteDocumentoInputDTO(
                actor=_actor_from_request(request),
                documento=query.validated_data["documento"],
            )
        )
        return Response(
            LookupDocumentoResponseSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClienteCnpjConsultaView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        request=ConsultaCnpjQuerySerializer,
        responses={200: ConsultaCnpjResponseSerializer},
    )
    def post(self, request: Request) -> Response:
        query = ConsultaCnpjQuerySerializer(data=request.data)
        query.is_valid(raise_exception=True)
        result = build_consulta_cnpj_use_case().execute(
            ConsultaCnpjInputDTO(
                actor=_actor_from_request(request),
                cnpj=query.validated_data["cnpj"],
            )
        )
        return Response(
            ConsultaCnpjResponseSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClienteFuncionarioConsultaView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        request=ConsultaFuncionarioQuerySerializer,
        responses={200: ConsultaFuncionarioResponseSerializer},
    )
    def post(self, request: Request) -> Response:
        query = ConsultaFuncionarioQuerySerializer(data=request.data)
        query.is_valid(raise_exception=True)
        result = build_consulta_funcionario_use_case().execute(
            ConsultaFuncionarioInputDTO(
                actor=_actor_from_request(request),
                cpf=query.validated_data["cpf"],
            )
        )
        return Response(
            ConsultaFuncionarioResponseSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClienteFromFuncionarioView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [ADD_CLIENTE]

    @extend_schema(
        request=CreateFromFuncionarioRequestSerializer,
        responses={200: CreateFromFuncionarioResponseSerializer},
    )
    def post(self, request: Request) -> Response:
        serializer = CreateFromFuncionarioRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = build_create_cliente_from_funcionario_use_case().execute(
            CreateClienteFromFuncionarioInputDTO(
                actor=_actor_from_request(request),
                cnpj_or_cpf=serializer.validated_data["cpf"],
            )
        )
        return Response(
            CreateFromFuncionarioResponseSerializer(asdict(result)).data,
            status=status.HTTP_200_OK,
        )


class ClientePaisesView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(responses={200: PaisSerializer(many=True)})
    def get(self, request: Request) -> Response:
        catalogs = build_list_cliente_catalogs_use_case().execute(
            ListClienteCatalogsInputDTO(actor=_actor_from_request(request))
        )
        return Response(
            PaisSerializer([asdict(item) for item in catalogs.paises], many=True).data,
            status=status.HTTP_200_OK,
        )


class ClienteEstadosView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        parameters=[ListEstadosQuerySerializer],
        responses={200: EstadoSerializer(many=True)},
    )
    def get(self, request: Request) -> Response:
        query = ListEstadosQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        catalogs = build_list_cliente_catalogs_use_case().execute(
            ListClienteCatalogsInputDTO(
                actor=_actor_from_request(request),
                pai_codigo=query.validated_data.get("pai_codigo"),
            )
        )
        return Response(
            EstadoSerializer(
                [asdict(item) for item in catalogs.estados],
                many=True,
            ).data,
            status=status.HTTP_200_OK,
        )


class ClienteOrigensView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        responses={
            200: OrigemSerializer(many=True),
            400: OpenApiResponse(description="Invalid request."),
        }
    )
    def get(self, request: Request) -> Response:
        catalogs = build_list_cliente_catalogs_use_case().execute(
            ListClienteCatalogsInputDTO(actor=_actor_from_request(request))
        )
        return Response(
            OrigemSerializer(
                [asdict(item) for item in catalogs.origens],
                many=True,
            ).data,
            status=status.HTTP_200_OK,
        )
