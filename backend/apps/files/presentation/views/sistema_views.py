"""Settings API for file-manager systems."""

from dataclasses import asdict

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.files.application.dtos.sistema_dtos import (
    CreateSistemaInputDTO,
    UpdateSistemaInputDTO,
)
from apps.files.presentation.dependencies import (
    build_create_sistema_use_case,
    build_get_sistema_use_case,
    build_list_sistemas_use_case,
    build_update_sistema_use_case,
)
from apps.files.presentation.serializers.sistema_serializers import (
    CreateSistemaRequestSerializer,
    SistemaSerializer,
    UpdateSistemaRequestSerializer,
)
from apps.shared.presentation.auth.permissions import (
    IsAccessAdmin,
    IsOracleAuthenticated,
)


class SistemaCollectionView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: SistemaSerializer(many=True)})
    def get(self, request: Request) -> Response:
        items = build_list_sistemas_use_case().execute()
        payload = SistemaSerializer([asdict(item) for item in items], many=True)
        return Response(payload.data)

    @extend_schema(
        request=CreateSistemaRequestSerializer,
        responses={201: SistemaSerializer},
    )
    def post(self, request: Request) -> Response:
        serializer = CreateSistemaRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        result = build_create_sistema_use_case().execute(
            CreateSistemaInputDTO(
                nome=data["nome"],
                descricao=data.get("descricao") or "",
                ativo=data.get("ativo", True),
                codigo=data.get("codigo"),
            )
        )
        return Response(
            SistemaSerializer(asdict(result)).data,
            status=status.HTTP_201_CREATED,
        )


class SistemaDetailView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: SistemaSerializer})
    def get(self, request: Request, codigo: int) -> Response:
        result = build_get_sistema_use_case().execute(codigo)
        return Response(SistemaSerializer(asdict(result)).data)

    @extend_schema(
        request=UpdateSistemaRequestSerializer,
        responses={200: SistemaSerializer},
    )
    def put(self, request: Request, codigo: int) -> Response:
        serializer = UpdateSistemaRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        result = build_update_sistema_use_case().execute(
            UpdateSistemaInputDTO(
                codigo=codigo,
                nome=data["nome"],
                descricao=data.get("descricao") or "",
                ativo=data.get("ativo", True),
            )
        )
        return Response(SistemaSerializer(asdict(result)).data)
