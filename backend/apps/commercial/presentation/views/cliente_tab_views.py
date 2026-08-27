"""Cliente tab and catalog API views."""

from __future__ import annotations

from dataclasses import asdict
from typing import TYPE_CHECKING

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.commercial.application.use_cases.grava_cliente_bloqueio_use_case import (
    GravaClienteBloqueioInputDTO,
)
from apps.commercial.application.use_cases.grava_cliente_tabs_use_case import (
    GravaClienteCobrancaInputDTO,
    GravaClienteContatoInputDTO,
    GravaClienteDadosFinanInputDTO,
    GravaClienteEmbarqueInputDTO,
    GravaClienteObsInputDTO,
    SetClienteContatoPadraoInputDTO,
    SetClienteEnderecoPadraoInputDTO,
)
from apps.commercial.presentation.dependencies import (
    build_grava_cliente_bloqueio_use_case,
    build_grava_cliente_cobranca_use_case,
    build_grava_cliente_contato_use_case,
    build_grava_cliente_dados_finan_use_case,
    build_grava_cliente_embarque_use_case,
    build_grava_cliente_obs_use_case,
    build_list_cliente_arclasses_use_case,
    build_list_cliente_areas_os_use_case,
    build_list_cliente_arlevels_use_case,
    build_list_cliente_arsalesps_use_case,
    build_list_cliente_cidades_use_case,
    build_list_cliente_cobrancas_use_case,
    build_list_cliente_contatos_use_case,
    build_list_cliente_embarques_use_case,
    build_list_cliente_grupos_tributarios_use_case,
    build_list_cliente_logs_use_case,
    build_list_cliente_modelos_pagto_use_case,
    build_list_cliente_riscos_use_case,
    build_set_cliente_contato_padrao_use_case,
    build_set_cliente_endereco_padrao_use_case,
)
from apps.commercial.presentation.permissions import (
    CHANGE_CLIENTE,
    CHANGE_CLIENTE_LIMITE,
    CHANGE_CLIENTE_RISCO,
    CHANGE_COBRANCA,
    CHANGE_CONTATO,
    CHANGE_EMBARQUE,
    VIEW_CLIENTE,
    cobranca_list_or_grava_perms,
    contato_list_or_grava_perms,
    embarque_list_or_grava_perms,
)
from apps.commercial.presentation.serializers.cliente_serializers import (
    ArclassSerializer,
    AreaOsSerializer,
    ArlevelSerializer,
    ArsalespSerializer,
    CidadeSerializer,
    CobrancaSerializer,
    ContatoSerializer,
    EmbarqueSerializer,
    GravaBloqueioRequestSerializer,
    GravaClienteFinanRequestSerializer,
    GravaCobrancaRequestSerializer,
    GravaContatoRequestSerializer,
    GravaEmbarqueRequestSerializer,
    GravaObsRequestSerializer,
    GrupoTributarioSerializer,
    ListAreasOsQuerySerializer,
    ListCidadesQuerySerializer,
    ListContatosQuerySerializer,
    ListGruposQuerySerializer,
    ListModelosPagtoQuerySerializer,
    LogSerializer,
    ModeloPagtSerializer,
    RiscoSerializer,
    SetContatoPadraoRequestSerializer,
    SetEnderecoPadraoRequestSerializer,
)
from apps.commercial.presentation.views.cliente_views import _actor_from_request
from apps.shared.presentation.auth.django_user_resolver import (
    resolve_django_user_from_request,
)
from apps.shared.presentation.auth.permissions import (
    HasDjangoPermission,
    IsOracleAuthenticated,
)

if TYPE_CHECKING:
    from rest_framework.request import Request


def _actor(request: Request):
    return _actor_from_request(request)


def _can_change_limite(request: Request) -> bool:
    django_user = resolve_django_user_from_request(request)
    if django_user is None:
        return False
    if django_user.is_superuser:
        return True
    return django_user.has_perm(CHANGE_CLIENTE_LIMITE)


class ClienteCidadesView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        parameters=[ListCidadesQuerySerializer], responses={200: CidadeSerializer}
    )
    def get(self, request: Request) -> Response:
        query = ListCidadesQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        items = build_list_cliente_cidades_use_case().execute(
            pai_codigo=data.get("pai_codigo"),
            est_codigo=data.get("est_codigo"),
        )
        return Response(
            CidadeSerializer([asdict(item) for item in items], many=True).data
        )


class ClienteArclassesView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(responses={200: ArclassSerializer(many=True)})
    def get(self, _request: Request) -> Response:
        items = build_list_cliente_arclasses_use_case().execute()
        return Response(
            ArclassSerializer([asdict(item) for item in items], many=True).data
        )


class ClienteArlevelsView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(responses={200: ArlevelSerializer(many=True)})
    def get(self, _request: Request) -> Response:
        items = build_list_cliente_arlevels_use_case().execute()
        return Response(
            ArlevelSerializer([asdict(item) for item in items], many=True).data
        )


class ClienteArsalespsView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(responses={200: ArsalespSerializer(many=True)})
    def get(self, _request: Request) -> Response:
        items = build_list_cliente_arsalesps_use_case().execute()
        return Response(
            ArsalespSerializer([asdict(item) for item in items], many=True).data
        )


class ClienteGruposTributariosView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        parameters=[ListGruposQuerySerializer],
        responses={200: GrupoTributarioSerializer},
    )
    def get(self, request: Request) -> Response:
        query = ListGruposQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        items = build_list_cliente_grupos_tributarios_use_case().execute(
            est_codigo=data.get("est_codigo"),
            cli_tipo=data.get("cli_tipo"),
        )
        return Response(
            GrupoTributarioSerializer([asdict(item) for item in items], many=True).data
        )


class ClienteAreasOsView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        parameters=[ListAreasOsQuerySerializer], responses={200: AreaOsSerializer}
    )
    def get(self, request: Request) -> Response:
        query = ListAreasOsQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        items = build_list_cliente_areas_os_use_case().execute(
            tipo_area=(data.get("tipo") or "C"),
            mun_ibge=data.get("mun_ibge"),
            est_codigo=data.get("est_codigo"),
            pai_codigo=data.get("pai_codigo"),
            current_codigo=data.get("current"),
        )
        return Response(
            AreaOsSerializer([asdict(item) for item in items], many=True).data
        )


class ClienteModelosPagtoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(
        parameters=[ListModelosPagtoQuerySerializer],
        responses={200: ModeloPagtSerializer},
    )
    def get(self, request: Request) -> Response:
        query = ListModelosPagtoQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        data = query.validated_data
        unrestricted = _can_change_limite(request)
        items = build_list_cliente_modelos_pagto_use_case().execute(
            origem=data.get("origem"),
            mpg_codigo=data.get("mpg_codigo"),
            risco_protheus=data.get("risco_protheus"),
            unrestricted=unrestricted,
        )
        return Response(
            ModeloPagtSerializer([asdict(item) for item in items], many=True).data
        )


class ClienteRiscosView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(responses={200: RiscoSerializer(many=True)})
    def get(self, _request: Request) -> Response:
        items = build_list_cliente_riscos_use_case().execute()
        return Response(
            RiscoSerializer([asdict(item) for item in items], many=True).data
        )


class ClienteFinanceiroView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_CLIENTE]

    @extend_schema(request=GravaClienteFinanRequestSerializer, responses={200: None})
    def put(self, request: Request, codigo: int) -> Response:
        serializer = GravaClienteFinanRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        apply_limites = _can_change_limite(request)
        build_grava_cliente_dados_finan_use_case().execute(
            GravaClienteDadosFinanInputDTO(
                actor=_actor(request),
                codigo=codigo,
                **serializer.validated_data,
                apply_limites=apply_limites,
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClienteContatosView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(contato_list_or_grava_perms)

    @extend_schema(
        parameters=[ListContatosQuerySerializer], responses={200: ContatoSerializer}
    )
    def get(self, request: Request, codigo: int) -> Response:
        query = ListContatosQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        items = build_list_cliente_contatos_use_case().execute(
            actor=_actor(request),
            codigo=codigo,
            search=query.validated_data.get("search", ""),
        )
        return Response(
            ContatoSerializer([asdict(item) for item in items], many=True).data
        )

    @extend_schema(request=GravaContatoRequestSerializer, responses={200: None})
    def post(self, request: Request, codigo: int) -> Response:
        serializer = GravaContatoRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        result = build_grava_cliente_contato_use_case().execute(
            GravaClienteContatoInputDTO(
                actor=_actor(request),
                codigo=codigo,
                con_codigo=data.get("con_codigo"),
                nome=data["nome"],
                nome_old=data.get("nome_old"),
                depto=data.get("depto"),
                cargo=data.get("cargo"),
                telefone=data.get("telefone"),
                fax=data.get("fax"),
                celular=data.get("celular"),
                email=data.get("email"),
                con_ativo=data.get("con_ativo", 1),
                tipo_cadastro="A" if data.get("con_codigo") else "I",
            )
        )
        return Response({"con_codigo": result.con_codigo}, status=status.HTTP_200_OK)


class ClienteContatoPadraoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_CONTATO]

    @extend_schema(request=SetContatoPadraoRequestSerializer, responses={200: None})
    def put(self, request: Request, codigo: int) -> Response:
        serializer = SetContatoPadraoRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        build_set_cliente_contato_padrao_use_case().execute(
            SetClienteContatoPadraoInputDTO(
                actor=_actor(request),
                codigo=codigo,
                **serializer.validated_data,
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClienteCobrancasView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(cobranca_list_or_grava_perms)

    @extend_schema(responses={200: CobrancaSerializer})
    def get(self, request: Request, codigo: int) -> Response:
        items = build_list_cliente_cobrancas_use_case().execute(
            actor=_actor(request), codigo=codigo
        )
        return Response(
            CobrancaSerializer([asdict(item) for item in items], many=True).data
        )

    @extend_schema(request=GravaCobrancaRequestSerializer, responses={200: None})
    def post(self, request: Request, codigo: int) -> Response:
        serializer = GravaCobrancaRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        build_grava_cliente_cobranca_use_case().execute(
            GravaClienteCobrancaInputDTO(
                actor=_actor(request),
                codigo=codigo,
                chavecobra=data.get("chavecobra"),
                ativo=data.get("ativo", 1),
                cli_codigo_ref=data["cli_codigo_ref"],
                tipo_cadastro=data.get("tipo_cadastro", "I"),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClienteCobrancaPadraoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_COBRANCA]

    @extend_schema(request=SetEnderecoPadraoRequestSerializer, responses={200: None})
    def put(self, request: Request, codigo: int) -> Response:
        serializer = SetEnderecoPadraoRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        build_set_cliente_endereco_padrao_use_case().execute(
            SetClienteEnderecoPadraoInputDTO(
                actor=_actor(request),
                codigo=codigo,
                chave=serializer.validated_data["chave"],
                kind="cobranca",
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClienteEmbarquesView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    get_required_permissions = staticmethod(embarque_list_or_grava_perms)

    @extend_schema(responses={200: EmbarqueSerializer})
    def get(self, request: Request, codigo: int) -> Response:
        items = build_list_cliente_embarques_use_case().execute(
            actor=_actor(request), codigo=codigo
        )
        return Response(
            EmbarqueSerializer([asdict(item) for item in items], many=True).data
        )

    @extend_schema(request=GravaEmbarqueRequestSerializer, responses={200: None})
    def post(self, request: Request, codigo: int) -> Response:
        serializer = GravaEmbarqueRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        build_grava_cliente_embarque_use_case().execute(
            GravaClienteEmbarqueInputDTO(
                actor=_actor(request),
                codigo=codigo,
                chave_emb=data.get("chave_emb"),
                ativo=data.get("ativo", 1),
                cli_codigo_ref=data["cli_codigo_ref"],
                tipo_cadastro=data.get("tipo_cadastro", "I"),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClienteEmbarquePadraoView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_EMBARQUE]

    @extend_schema(request=SetEnderecoPadraoRequestSerializer, responses={200: None})
    def put(self, request: Request, codigo: int) -> Response:
        serializer = SetEnderecoPadraoRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        build_set_cliente_endereco_padrao_use_case().execute(
            SetClienteEnderecoPadraoInputDTO(
                actor=_actor(request),
                codigo=codigo,
                chave=serializer.validated_data["chave"],
                kind="embarque",
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClienteLogsView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [VIEW_CLIENTE]

    @extend_schema(responses={200: LogSerializer})
    def get(self, request: Request, codigo: int) -> Response:
        items = build_list_cliente_logs_use_case().execute(
            actor=_actor(request), codigo=codigo
        )
        return Response(LogSerializer([asdict(item) for item in items], many=True).data)


class ClienteObsView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_CLIENTE]

    @extend_schema(request=GravaObsRequestSerializer, responses={200: None})
    def put(self, request: Request, codigo: int) -> Response:
        serializer = GravaObsRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        build_grava_cliente_obs_use_case().execute(
            GravaClienteObsInputDTO(
                actor=_actor(request),
                codigo=codigo,
                observa=serializer.validated_data.get("observa"),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClienteBloqueioView(APIView):
    permission_classes = [IsOracleAuthenticated, HasDjangoPermission]
    required_permissions = [CHANGE_CLIENTE_RISCO]

    @extend_schema(request=GravaBloqueioRequestSerializer, responses={204: None})
    def put(self, request: Request, codigo: int) -> Response:
        serializer = GravaBloqueioRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        build_grava_cliente_bloqueio_use_case().execute(
            GravaClienteBloqueioInputDTO(
                actor=_actor(request),
                codigo=codigo,
                bloqueado=data["bloqueado"],
                mensagem_bloqueio=data.get("mensagem_bloqueio"),
            )
        )
        return Response(status=status.HTTP_204_NO_CONTENT)
