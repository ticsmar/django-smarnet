"""Recebimento API views wrapping PCK_PLASMA_RECEBIMENTO and table queries."""

from dataclasses import asdict

from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.compras.application.dtos.recebimento_dtos import (
    GravaFornecContatoInputDTO,
    GravaFornecedorInputDTO,
    ListFornecContatosInputDTO,
    ListFornecedoresInputDTO,
    ListMsgErrosInputDTO,
    ListPaisesInputDTO,
)
from apps.compras.presentation.dependencies import (
    build_ativa_fornecedor_use_case,
    build_exclui_fornec_contato_use_case,
    build_get_fornec_contato_use_case,
    build_get_fornecedor_use_case,
    build_get_pais_use_case,
    build_grava_fornec_contato_use_case,
    build_grava_fornecedor_use_case,
    build_inativa_fornecedor_use_case,
    build_list_fornec_contatos_use_case,
    build_list_fornecedores_use_case,
    build_list_msg_erros_use_case,
    build_list_paises_use_case,
)
from apps.compras.presentation.permissions import (
    CHANGE_FORNECEDOR,
    VIEW_FORNECEDOR,
    VIEW_MSG_ERRO,
    fornec_contato_get_or_delete_perms,
    fornec_contato_list_or_grava_perms,
    fornecedor_list_or_grava_perms,
)
from apps.compras.presentation.serializers.recebimento_serializers import (
    FornecContatoSerializer,
    FornecedorSerializer,
    GravaFornecContatoRequestSerializer,
    GravaFornecContatoResponseSerializer,
    GravaFornecedorRequestSerializer,
    GravaFornecedorResponseSerializer,
    ListFornecContatosQuerySerializer,
    ListFornecedoresQuerySerializer,
    ListMsgErrosQuerySerializer,
    ListPaisesQuerySerializer,
    OkResponseSerializer,
    PaginatedFornecContatosSerializer,
    PaginatedFornecedoresSerializer,
    PaginatedMsgErrosSerializer,
    PaisSerializer,
)
from apps.shared.presentation.auth.permissions import (
    HasDjangoPermission,
    IsOracleAuthenticated,
)


class GravaFornecedorView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(fornecedor_list_or_grava_perms)

    @extend_schema(
        parameters=[ListFornecedoresQuerySerializer],
        responses={
            200: PaginatedFornecedoresSerializer,
            400: OpenApiResponse(description="Invalid request."),
        },
    )
    def get(self, request: Request) -> Response:
        query = ListFornecedoresQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        result = build_list_fornecedores_use_case().execute(
            ListFornecedoresInputDTO(
                search=data.get("search", ""),
                ativo=data.get("ativo"),
                page=data.get("page", 1),
                page_size=data.get("page_size", 20),
            )
        )
        output = PaginatedFornecedoresSerializer(asdict(result))
        return Response(output.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=GravaFornecedorRequestSerializer,
        responses={
            200: GravaFornecedorResponseSerializer,
            400: OpenApiResponse(description="Procedure error or invalid request."),
        },
    )
    def post(self, request: Request) -> Response:
        serializer = GravaFornecedorRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        result = build_grava_fornecedor_use_case().execute(
            GravaFornecedorInputDTO(
                cod_fornec=data.get("cod_fornec"),
                razao_soc=data["razao_soc"],
                nome_reduz=data["nome_reduz"],
                endereco=data["endereco"],
                bairro=data["bairro"],
                munic=data["munic"],
                cep=data["cep"],
                estado=data["estado"],
                cod_pais=data["cod_pais"],
                idioma_msg=data.get("idioma_msg", "P"),
            )
        )
        output = GravaFornecedorResponseSerializer(
            {
                "cod_fornec": result.cod_fornec,
                "tipo_msg": result.tipo_msg,
                "msg": result.msg,
                "acao": result.acao,
            }
        )
        return Response(output.data, status=status.HTTP_200_OK)


class GetFornecedorView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_FORNECEDOR]

    @extend_schema(
        responses={
            200: FornecedorSerializer,
            404: OpenApiResponse(description="Fornecedor not found."),
        },
    )
    def get(self, request: Request, cod_fornec: int) -> Response:
        result = build_get_fornecedor_use_case().execute(cod_fornec)
        output = FornecedorSerializer(asdict(result))
        return Response(output.data, status=status.HTTP_200_OK)


class AtivaFornecedorView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_FORNECEDOR]

    @extend_schema(
        responses={
            200: OkResponseSerializer,
            400: OpenApiResponse(description="Invalid request."),
        },
    )
    def post(self, request: Request, cod_fornec: int) -> Response:
        build_ativa_fornecedor_use_case().execute(cod_fornec)
        return Response({"ok": True}, status=status.HTTP_200_OK)


class InativaFornecedorView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_FORNECEDOR]

    @extend_schema(
        responses={
            200: OkResponseSerializer,
            400: OpenApiResponse(description="Invalid request."),
        },
    )
    def post(self, request: Request, cod_fornec: int) -> Response:
        build_inativa_fornecedor_use_case().execute(cod_fornec)
        return Response({"ok": True}, status=status.HTTP_200_OK)


class GravaFornecContatoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(fornec_contato_list_or_grava_perms)

    @extend_schema(
        parameters=[ListFornecContatosQuerySerializer],
        responses={
            200: PaginatedFornecContatosSerializer,
            400: OpenApiResponse(description="Invalid request."),
        },
    )
    def get(self, request: Request) -> Response:
        query = ListFornecContatosQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        result = build_list_fornec_contatos_use_case().execute(
            ListFornecContatosInputDTO(
                for_codigo=data.get("for_codigo"),
                search=data.get("search", ""),
                page=data.get("page", 1),
                page_size=data.get("page_size", 20),
            )
        )
        output = PaginatedFornecContatosSerializer(asdict(result))
        return Response(output.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=GravaFornecContatoRequestSerializer,
        responses={
            200: GravaFornecContatoResponseSerializer,
            400: OpenApiResponse(description="Procedure error or invalid request."),
        },
    )
    def post(self, request: Request) -> Response:
        serializer = GravaFornecContatoRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        result = build_grava_fornec_contato_use_case().execute(
            GravaFornecContatoInputDTO(
                cod_contato=data.get("cod_contato"),
                cod_fornec=data["cod_fornec"],
                nome=data["nome"],
                cargo=data["cargo"],
                email=data["email"],
                telefone=data["telefone"],
                idioma_msg=data.get("idioma_msg", "P"),
            )
        )
        output = GravaFornecContatoResponseSerializer(
            {
                "cod_contato": result.cod_contato,
                "tipo_msg": result.tipo_msg,
                "msg": result.msg,
                "acao": result.acao,
            }
        )
        return Response(output.data, status=status.HTTP_200_OK)


class ExcluiFornecContatoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(fornec_contato_get_or_delete_perms)

    @extend_schema(
        responses={
            200: FornecContatoSerializer,
            404: OpenApiResponse(description="Contato not found."),
        },
    )
    def get(self, request: Request, cod_contato: int) -> Response:
        result = build_get_fornec_contato_use_case().execute(cod_contato)
        output = FornecContatoSerializer(asdict(result))
        return Response(output.data, status=status.HTTP_200_OK)

    @extend_schema(
        responses={
            200: OkResponseSerializer,
            400: OpenApiResponse(description="Invalid request."),
        },
    )
    def delete(self, request: Request, cod_contato: int) -> Response:
        build_exclui_fornec_contato_use_case().execute(cod_contato)
        return Response({"ok": True}, status=status.HTTP_200_OK)


class ListMsgErrosView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_MSG_ERRO]

    @extend_schema(
        parameters=[ListMsgErrosQuerySerializer],
        responses={
            200: PaginatedMsgErrosSerializer,
            400: OpenApiResponse(description="Invalid request."),
        },
    )
    def get(self, request: Request) -> Response:
        query = ListMsgErrosQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        result = build_list_msg_erros_use_case().execute(
            ListMsgErrosInputDTO(
                search=data.get("search", ""),
                page=data.get("page", 1),
                page_size=data.get("page_size", 20),
            )
        )
        output = PaginatedMsgErrosSerializer(asdict(result))
        return Response(output.data, status=status.HTTP_200_OK)


class ListPaisesView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_FORNECEDOR]

    @extend_schema(
        parameters=[ListPaisesQuerySerializer],
        responses={
            200: PaisSerializer(many=True),
            400: OpenApiResponse(description="Invalid request."),
        },
    )
    def get(self, request: Request) -> Response:
        query = ListPaisesQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        result = build_list_paises_use_case().execute(
            ListPaisesInputDTO(search=data.get("search", ""))
        )
        output = PaisSerializer([asdict(item) for item in result], many=True)
        return Response(output.data, status=status.HTTP_200_OK)


class GetPaisView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_FORNECEDOR]

    @extend_schema(
        responses={
            200: PaisSerializer,
            404: OpenApiResponse(description="Pais not found."),
        },
    )
    def get(self, request: Request, pai_codigo: int) -> Response:
        result = build_get_pais_use_case().execute(pai_codigo)
        output = PaisSerializer(asdict(result))
        return Response(output.data, status=status.HTTP_200_OK)
