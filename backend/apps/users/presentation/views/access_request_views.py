"""Public access-request API views."""

from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.application.dtos.access_request_dto import CreateAccessRequestInputDTO
from apps.users.presentation.dependencies import (
    build_create_access_request_use_case,
    build_list_access_request_countries_use_case,
    build_list_access_request_states_use_case,
)
from apps.users.presentation.serializers.access_request_serializers import (
    AccessRequestResultSerializer,
    CreateAccessRequestSerializer,
    PublicCountrySerializer,
    PublicStateSerializer,
)


class AccessRequestCreateView(APIView):
    authentication_classes: list[type] = []
    permission_classes: list[type] = [AllowAny]

    @extend_schema(
        request=CreateAccessRequestSerializer,
        responses={
            201: AccessRequestResultSerializer,
            400: OpenApiResponse(description="Validation error"),
            409: OpenApiResponse(description="Pending request already exists"),
        },
    )
    def post(self, request: Request) -> Response:
        serializer = CreateAccessRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        result = build_create_access_request_use_case().execute(
            CreateAccessRequestInputDTO(
                tep_codigo=validated["tep_codigo"],
                nome=validated["nome"],
                email=validated["email"],
                pai_codigo=validated["pai_codigo"],
                motivo=validated["motivo"],
                emp_nome=validated["emp_nome"],
                emp_endereco=validated["emp_endereco"],
                emp_bairro=validated["emp_bairro"],
                emp_cidade=validated["emp_cidade"],
                emp_pai_codigo=validated["emp_pai_codigo"],
                emp_est_codigo=validated["emp_est_codigo"],
                emp_estado=validated["emp_estado"],
                emp_cep=validated["emp_cep"],
                emp_homepage=validated.get("emp_homepage", ""),
            )
        )
        output = AccessRequestResultSerializer(
            {
                "ppe_codigo": result.ppe_codigo,
                "tep_codigo": result.tep_codigo,
                "email": result.email,
            }
        )
        return Response(output.data, status=status.HTTP_201_CREATED)


class AccessRequestCountryListView(APIView):
    authentication_classes: list[type] = []
    permission_classes: list[type] = [AllowAny]

    @extend_schema(
        parameters=[
            {
                "name": "language",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
        ],
        responses={200: PublicCountrySerializer(many=True)},
    )
    def get(self, request: Request) -> Response:
        language = int(request.query_params.get("language", "1"))
        rows = build_list_access_request_countries_use_case().execute(language=language)
        output = PublicCountrySerializer(
            [{"pai_codigo": row.pai_codigo, "nome": row.nome} for row in rows],
            many=True,
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AccessRequestStateListView(APIView):
    authentication_classes: list[type] = []
    permission_classes: list[type] = [AllowAny]

    @extend_schema(
        parameters=[
            {
                "name": "pai_codigo",
                "in": "query",
                "required": True,
                "schema": {"type": "integer"},
            },
        ],
        responses={200: PublicStateSerializer(many=True)},
    )
    def get(self, request: Request) -> Response:
        raw = request.query_params.get("pai_codigo", "").strip()
        pai_codigo = int(raw) if raw.isdecimal() else 0
        rows = build_list_access_request_states_use_case().execute(
            pai_codigo=pai_codigo
        )
        output = PublicStateSerializer(
            [
                {
                    "est_codigo": row.est_codigo,
                    "pai_codigo": row.pai_codigo,
                    "nome": row.nome,
                }
                for row in rows
            ],
            many=True,
        )
        return Response(output.data, status=status.HTTP_200_OK)
