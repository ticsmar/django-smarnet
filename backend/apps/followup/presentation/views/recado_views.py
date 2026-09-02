"""Follow-up recados, tipos, motivos, status, cliente notes."""

from dataclasses import asdict

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.followup.application.dtos.recado_dtos import (
    AppendClienteNotesInputDTO,
    BaixaRecadoInputDTO,
    GravaRecadoInputDTO,
    RecadoScopeDTO,
)
from apps.followup.infrastructure.actor import resolve_usu_chapa
from apps.followup.presentation.dependencies import (
    build_append_cliente_notes_use_case,
    build_baixa_recado_use_case,
    build_get_cliente_notes_use_case,
    build_get_recado_status_use_case,
    build_grava_recado_use_case,
    build_list_motivos_use_case,
    build_list_recados_use_case,
    build_list_tipos_use_case,
)
from apps.followup.presentation.permissions import (
    ADD_RECADO,
    CHANGE_RECADO,
    VIEW_RECADO,
)
from apps.followup.presentation.serializers.recado_serializers import (
    AppendClienteNotesRequestSerializer,
    ClienteNotesQuerySerializer,
    ClienteNotesSerializer,
    GravaRecadoRequestSerializer,
    MotivoSerializer,
    RecadoListSerializer,
    RecadoStatusSerializer,
    ScopeQuerySerializer,
    SistemaOnlyQuerySerializer,
    TipoRecadoSerializer,
)
from apps.shared.presentation.auth.permissions import (
    HasDjangoPermission,
    IsOracleAuthenticated,
)


def _usu_chapa(request: Request) -> int:
    username = getattr(request.user, "username", "") or ""
    return resolve_usu_chapa(username)


def _list_perms(request: Request) -> list[str]:
    if request.method == "GET":
        return [VIEW_RECADO]
    return [ADD_RECADO]


def _view_only(_request: Request) -> list[str]:
    return [VIEW_RECADO]


def _change_only(_request: Request) -> list[str]:
    return [CHANGE_RECADO]


def _notes_perms(request: Request) -> list[str]:
    if request.method == "GET":
        return [VIEW_RECADO]
    return [ADD_RECADO]


class RecadoListView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(_list_perms)

    @extend_schema(
        parameters=[ScopeQuerySerializer],
        responses={200: RecadoListSerializer},
    )
    def get(self, request: Request) -> Response:
        query = ScopeQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        result = build_list_recados_use_case().execute(
            RecadoScopeDTO(
                sistema=query.validated_data["sistema"],
                filtro=query.validated_data["filtro"],
                tre_codigo=query.validated_data.get("tre"),
                usu_chapa=_usu_chapa(request),
            )
        )
        return Response(RecadoListSerializer(asdict(result)).data)

    @extend_schema(
        request=GravaRecadoRequestSerializer,
        responses={201: None, 204: None},
    )
    def post(self, request: Request) -> Response:
        serializer = GravaRecadoRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        created = data.get("pre_codigo") is None
        build_grava_recado_use_case().execute(
            GravaRecadoInputDTO(
                sistema=data["sistema"],
                filtro=data["filtro"],
                tre_codigo=data["tre_codigo"],
                mensagem=data["mensagem"],
                mot_codigo=data.get("mot_codigo"),
                alarm_data=data.get("alarm_data") or "",
                alarm_hora=data.get("alarm_hora") or "",
                pre_codigo=data.get("pre_codigo"),
                usu_chapa=_usu_chapa(request),
            )
        )
        return Response(
            {} if created else None,
            status=status.HTTP_201_CREATED if created else status.HTTP_204_NO_CONTENT,
        )


class RecadoBaixaView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(_change_only)

    @extend_schema(parameters=[ScopeQuerySerializer], responses={204: None})
    def post(self, request: Request, pre_codigo: int) -> Response:
        query = ScopeQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        build_baixa_recado_use_case().execute(
            BaixaRecadoInputDTO(
                sistema=query.validated_data["sistema"],
                filtro=query.validated_data["filtro"],
                pre_codigo=pre_codigo,
                usu_chapa=_usu_chapa(request),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class TipoRecadoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(_view_only)

    @extend_schema(
        parameters=[SistemaOnlyQuerySerializer],
        responses={200: TipoRecadoSerializer(many=True)},
    )
    def get(self, request: Request) -> Response:
        query = SistemaOnlyQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        items = build_list_tipos_use_case().execute(
            query.validated_data["sistema"],
        )
        payload = [TipoRecadoSerializer(asdict(item)).data for item in items]
        return Response(payload)


class MotivoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(_view_only)

    @extend_schema(responses={200: MotivoSerializer(many=True)})
    def get(self, request: Request) -> Response:
        items = build_list_motivos_use_case().execute()
        payload = [MotivoSerializer(asdict(item)).data for item in items]
        return Response(payload)


class RecadoStatusView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(_view_only)

    @extend_schema(
        parameters=[ScopeQuerySerializer],
        responses={200: RecadoStatusSerializer},
    )
    def get(self, request: Request) -> Response:
        query = ScopeQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        result = build_get_recado_status_use_case().execute(
            query.validated_data["sistema"],
            query.validated_data["filtro"],
        )
        return Response(RecadoStatusSerializer(asdict(result)).data)


class ClienteNotesView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(_notes_perms)

    @extend_schema(
        parameters=[ClienteNotesQuerySerializer],
        responses={200: ClienteNotesSerializer},
    )
    def get(self, request: Request) -> Response:
        query = ClienteNotesQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        codigo = query.validated_data["codigo"]
        result = build_get_cliente_notes_use_case().execute(codigo)
        return Response(ClienteNotesSerializer(asdict(result)).data)

    @extend_schema(
        request=AppendClienteNotesRequestSerializer,
        responses={204: None},
    )
    def post(self, request: Request) -> Response:
        serializer = AppendClienteNotesRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        build_append_cliente_notes_use_case().execute(
            AppendClienteNotesInputDTO(
                codigo=data["codigo"],
                texto=data["texto"],
                usu_chapa=_usu_chapa(request),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)
