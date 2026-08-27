"""File-manager tree, folder, upload, move, trash, download, history."""

from dataclasses import asdict
from io import BytesIO

from django.http import FileResponse
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.files.application.dtos.arquivo_dtos import (
    ArquivoScopeDTO,
    CreateFolderInputDTO,
    DownloadFileInputDTO,
    MoveNodeInputDTO,
    TrashNodesInputDTO,
    UploadFileInputDTO,
)
from apps.files.infrastructure.actor import resolve_usu_chapa
from apps.files.presentation.dependencies import (
    build_create_folder_use_case,
    build_download_file_use_case,
    build_list_arquivo_tree_use_case,
    build_list_historico_use_case,
    build_move_node_use_case,
    build_trash_nodes_use_case,
    build_upload_file_use_case,
)
from apps.files.presentation.permissions import (
    folder_or_upload_perms,
    move_perms,
    trash_perms,
    tree_or_historico_perms,
)
from apps.files.presentation.serializers.arquivo_serializers import (
    ArquivoTreeSerializer,
    CreateFolderRequestSerializer,
    HistoricoItemSerializer,
    MoveNodeRequestSerializer,
    ParCodigoResponseSerializer,
    ScopeQuerySerializer,
    TrashNodesRequestSerializer,
    UploadFileRequestSerializer,
)
from apps.shared.presentation.auth.permissions import (
    HasDjangoPermission,
    IsOracleAuthenticated,
)


def _usu_chapa(request: Request) -> int:
    username = getattr(request.user, "username", "") or ""
    return resolve_usu_chapa(username)


class ArquivoTreeView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(tree_or_historico_perms)

    @extend_schema(
        parameters=[ScopeQuerySerializer],
        responses={200: ArquivoTreeSerializer},
    )
    def get(self, request: Request) -> Response:
        query = ScopeQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        result = build_list_arquivo_tree_use_case().execute(
            ArquivoScopeDTO(
                sistema=query.validated_data["sistema"],
                filtro=query.validated_data["filtro"],
            )
        )
        return Response(ArquivoTreeSerializer(asdict(result)).data)


class ArquivoFolderView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(folder_or_upload_perms)

    @extend_schema(
        request=CreateFolderRequestSerializer,
        responses={201: ParCodigoResponseSerializer},
    )
    def post(self, request: Request) -> Response:
        serializer = CreateFolderRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        par_codigo = build_create_folder_use_case().execute(
            CreateFolderInputDTO(
                sistema=data["sistema"],
                filtro=data["filtro"],
                nome=data["nome"],
                descricao=data.get("descricao") or "",
                par_codigo_pai=data.get("par_codigo_pai"),
                ace_codigo=data.get("ace_codigo"),
                usu_chapa=_usu_chapa(request),
            )
        )
        return Response({"par_codigo": par_codigo}, status=status.HTTP_201_CREATED)


class ArquivoUploadView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(folder_or_upload_perms)

    @extend_schema(
        request=UploadFileRequestSerializer,
        responses={201: ParCodigoResponseSerializer},
    )
    def post(self, request: Request) -> Response:
        serializer = UploadFileRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        uploaded = data["arquivo"]
        content = uploaded.read()
        nome = getattr(uploaded, "name", None) or "arquivo"
        par_codigo = build_upload_file_use_case().execute(
            UploadFileInputDTO(
                sistema=data["sistema"],
                filtro=data["filtro"],
                nome=nome,
                descricao=data.get("descricao") or "",
                par_codigo_pai=data.get("par_codigo_pai"),
                ace_codigo=data.get("ace_codigo"),
                usu_chapa=_usu_chapa(request),
                content=content,
                tamanho=len(content),
            )
        )
        return Response({"par_codigo": par_codigo}, status=status.HTTP_201_CREATED)


class ArquivoMoveView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(move_perms)

    @extend_schema(request=MoveNodeRequestSerializer, responses={200: None})
    def post(self, request: Request, par_codigo: int) -> Response:
        serializer = MoveNodeRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        nome = data.get("nome") or None
        build_move_node_use_case().execute(
            MoveNodeInputDTO(
                sistema=data["sistema"],
                filtro=data["filtro"],
                par_codigo=par_codigo,
                par_codigo_pai=data.get("par_codigo_pai"),
                nome=nome,
                usu_chapa=_usu_chapa(request),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ArquivoTrashView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(trash_perms)

    @extend_schema(request=TrashNodesRequestSerializer, responses={204: None})
    def post(self, request: Request) -> Response:
        serializer = TrashNodesRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        build_trash_nodes_use_case().execute(
            TrashNodesInputDTO(
                sistema=data["sistema"],
                filtro=data["filtro"],
                par_codigos=tuple(data["par_codigos"]),
                usu_chapa=_usu_chapa(request),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ArquivoDownloadView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(tree_or_historico_perms)

    @extend_schema(parameters=[ScopeQuerySerializer])
    def get(self, request: Request, par_codigo: int) -> FileResponse:
        query = ScopeQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        result = build_download_file_use_case().execute(
            DownloadFileInputDTO(
                sistema=query.validated_data["sistema"],
                filtro=query.validated_data["filtro"],
                par_codigo=par_codigo,
            )
        )
        return FileResponse(
            BytesIO(result.content),
            as_attachment=True,
            filename=result.nome,
        )


class ArquivoHistoricoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(tree_or_historico_perms)

    @extend_schema(
        parameters=[ScopeQuerySerializer],
        responses={200: HistoricoItemSerializer(many=True)},
    )
    def get(self, request: Request) -> Response:
        query = ScopeQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        items = build_list_historico_use_case().execute(
            ArquivoScopeDTO(
                sistema=query.validated_data["sistema"],
                filtro=query.validated_data["filtro"],
            )
        )
        payload = HistoricoItemSerializer([asdict(item) for item in items], many=True)
        return Response(payload.data)
