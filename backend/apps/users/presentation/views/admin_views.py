"""Admin API views."""

from django.contrib.auth import get_user_model
from django.db import DatabaseError, connections
from django.db.models import Max, Q
from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import serializers, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.shared.presentation.auth.django_user_resolver import (
    resolve_django_user_from_request,
)
from apps.shared.presentation.auth.permissions import (
    IsAccessAdmin,
    IsOracleAuthenticated,
)
from apps.users.application.dtos.access_approval_dto import (
    ApproveAccessRequestInputDTO,
)
from apps.users.application.dtos.admin_user_input_dto import (
    CreateUserAdminInputDTO,
    ListUsersInputDTO,
    ResetUserPasswordInputDTO,
    SetUserGroupsInputDTO,
    SetUserProductPermissionsInputDTO,
    UpdateUserInputDTO,
)
from apps.users.application.dtos.pending_request_dto import (
    CreateEmpresaFromPartnerInputDTO,
    RegisterAccessRequestFieldsInputDTO,
)
from apps.users.domain.services.pending_request_type import (
    resolve_pending_request_type,
)
from apps.users.domain.validation.login_suggestions import build_login_suggestions
from apps.users.domain.validation.username_rules import (
    sanitize_username,
    validate_oracle_username,
)
from apps.users.infrastructure.login_availability import (
    username_taken,
    usernames_taken,
)
from apps.users.infrastructure.models import (
    Empresa,
    Estado,
    Lingua,
    PaisNome,
    Pessoa,
    PessoaMeioContato,
    PessoaTipoContato,
    PrePessoa,
    SiaosUsuario,
    UserSecurityProfile,
)
from apps.users.infrastructure.oracle_dqanet import (
    DqanetDatabaseError,
    sp_in_pessoa,
)
from apps.users.presentation.dependencies import (
    build_approve_access_request_use_case,
    build_create_empresa_from_partner_use_case,
    build_create_user_admin_use_case,
    build_discard_access_request_use_case,
    build_get_user_use_case,
    build_import_oracle_user_use_case,
    build_list_groups_use_case,
    build_list_product_permissions_use_case,
    build_list_users_use_case,
    build_register_access_request_fields_use_case,
    build_reset_user_password_use_case,
    build_set_user_groups_use_case,
    build_set_user_product_permissions_use_case,
    build_update_user_use_case,
)
from apps.users.presentation.serializers.admin_serializers import (
    AdminCountrySerializer,
    AdminCreateCompanySerializer,
    AdminCreatePersonSerializer,
    AdminGroupSerializer,
    AdminLanguageSerializer,
    AdminLoginCheckSerializer,
    AdminLoginOptionSerializer,
    AdminPersonContactTypeSerializer,
    AdminPriceListSerializer,
    AdminProductPermissionSerializer,
    AdminStateSerializer,
    AdminUserSerializer,
    ApprovePendingRequestSerializer,
    CreateAdminUserRequestSerializer,
    CreateEmpresaFromPartnerSerializer,
    ImportOracleUserResultSerializer,
    PaginatedChapaLookupSerializer,
    PaginatedCompaniesSerializer,
    PaginatedOracleUserImportSerializer,
    PaginatedPartnerLookupSerializer,
    PaginatedPendingRequestsSerializer,
    PaginatedPeopleSerializer,
    PaginatedStateCatalogSerializer,
    PaginatedUsersSerializer,
    PendingRequestApprovalResultSerializer,
    PendingRequestCreateEmpresaResultSerializer,
    PendingRequestDiscardResultSerializer,
    PendingRequestRegisterFieldsResultSerializer,
    RegisterPendingRequestFieldsSerializer,
    ResetPasswordResponseSerializer,
    SetUserGroupsRequestSerializer,
    SetUserPasswordRequestSerializer,
    SetUserProductPermissionsRequestSerializer,
    UpdateAdminUserRequestSerializer,
    serialize_admin_user,
    serialize_groups,
    serialize_paginated_users,
    serialize_product_permissions,
)

_SMAR_DB_ALIAS = "smar"
User = get_user_model()


def _as_text(value: object | None) -> str:
    return "" if value is None else str(value)


def _as_optional_int(value: object | None) -> int | None:
    return None if value is None else int(str(value))


def _serialize_empresa(row: Empresa) -> dict[str, object]:
    tipo = (row.emp_tipo or "").strip().upper()
    ativa = row.emp_ativa is None or int(row.emp_ativa) == 1
    return {
        "id": str(row.emp_codigo),
        "codigo": row.emp_codigo,
        "nome": _as_text(row.emp_nome),
        "reduzido": _as_text(row.emp_reduzido),
        "acesso": (row.emp_acesso or "P").strip().upper(),
        "tipo": tipo or "C",
        "endereco": _as_text(row.emp_endereco),
        "bairro": _as_text(row.emp_bairro),
        "cep": _as_text(row.emp_cep),
        "cidade": _as_text(row.emp_cidade),
        "uf": _as_text(row.emp_estado),
        "estCodigo": _as_text(row.est_codigo),
        "pais": _as_text(row.pai_codigo),
        "homepage": _as_text(row.emp_homepage),
        "fabricaPadrao": _as_text(row.emp_codigo_fab),
        "listaPreco": _as_text(row.lpr_codigo),
        "descontoPadrao": _as_text(getattr(row, "emp_desc_os", None)),
        "status": "Ativa" if ativa else "Inativa",
        "cliente": tipo == "C",
        "fornecedor": tipo == "F",
    }


def _serialize_person_contacts(
    person_numbers: list[int],
) -> dict[int, list[dict[str, object]]]:
    if not person_numbers:
        return {}
    type_rows = PessoaTipoContato.objects.using(_SMAR_DB_ALIAS).all()
    contact_types = {
        row.ptc_codigo: {"nome": _as_text(row.ptc_nome), "meio": _as_text(row.ptc_meio)}
        for row in type_rows
    }
    rows = (
        PessoaMeioContato.objects.using(_SMAR_DB_ALIAS)
        .filter(pes_numero__in=person_numbers)
        .order_by("pes_numero", "ptc_codigo", "pmc_codigo")
    )
    contacts_by_person: dict[int, list[dict[str, object]]] = {
        number: [] for number in person_numbers
    }
    for row in rows:
        contact_type = contact_types.get(row.ptc_codigo, {"nome": "", "meio": ""})
        contacts_by_person.setdefault(row.pes_numero, []).append(
            {
                "codigo": row.pmc_codigo,
                "tipo_codigo": row.ptc_codigo,
                "tipo_nome": contact_type["nome"],
                "meio": contact_type["meio"],
                "referencia": _as_text(row.pmc_referencia),
            }
        )
    return contacts_by_person


def _serialize_pessoa(
    row: Pessoa,
    contacts_by_person: dict[int, list[dict[str, object]]],
    users_by_person: dict[int, bool] | None = None,
) -> dict[str, object]:
    active = row.pes_ativo is None or int(row.pes_ativo) == 1
    return {
        "id": str(row.pes_numero),
        "numero": row.pes_numero,
        "nome": _as_text(row.pes_nome),
        "email": _as_text(row.pes_email),
        "status": "Ativa" if active else "Inativa",
        "sexo": _as_text(row.pes_sexo).upper(),
        "cidade": _as_text(row.pes_cidade),
        "uf": _as_text(row.pes_estado),
        "estCodigo": _as_text(row.est_codigo),
        "pais": _as_text(row.pai_codigo),
        "cep": _as_text(row.pes_cep),
        "endereco": _as_text(row.pes_endereco),
        "bairro": _as_text(row.pes_bairro),
        "contatos": contacts_by_person.get(row.pes_numero, []),
        "tem_usuario": bool((users_by_person or {}).get(row.pes_numero, False)),
    }


def _people_with_web_user(person_numbers: list[int]) -> dict[int, bool]:
    if not person_numbers:
        return {}
    rows = (
        SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
        .filter(pes_numero__in=person_numbers)
        .exclude(usu_loginweb__isnull=True)
        .exclude(usu_loginweb="")
        .values_list("pes_numero", flat=True)
        .distinct()
    )
    return {int(pes): True for pes in rows if pes is not None}


def _next_empresa_codigo() -> int:
    max_value = (
        Empresa.objects.using(_SMAR_DB_ALIAS).aggregate(max_codigo=Max("emp_codigo"))[
            "max_codigo"
        ]
        or 0
    )
    return int(max_value) + 1


def _pending_request_type_fields(tep_codigo: str | None) -> dict[str, object]:
    flags = resolve_pending_request_type(tep_codigo)
    return {
        "tipo": flags.tipo,
        "cliente": flags.cliente,
        "fornecedor": flags.fornecedor,
        "smar": flags.smar,
    }


def _to_register_fields_input(
    request: Request, ppe_codigo: int, validated: dict[str, object]
) -> RegisterAccessRequestFieldsInputDTO:
    """Absent field means "leave as is", so presence travels next to each value."""
    # Preferir request.data: campo opcional as vezes nao entra em validated_data.
    payload = request.data if isinstance(request.data, dict) else {}
    raw_tep = payload.get("tep_codigo", serializers.empty)
    if raw_tep is serializers.empty:
        raw_tep = validated.get("tep_codigo", serializers.empty)
    tep_codigo = None if raw_tep is serializers.empty else _as_text(raw_tep)

    return RegisterAccessRequestFieldsInputDTO(
        ppe_codigo=ppe_codigo,
        fun_chapa=_as_optional_int(validated.get("fun_chapa")),
        write_fun_chapa="fun_chapa" in validated,
        pes_numero=_as_optional_int(validated.get("pes_numero")),
        write_pes_numero="pes_numero" in validated,
        emp_codigo=_as_optional_int(validated.get("emp_codigo")),
        write_emp_codigo="emp_codigo" in validated,
        tep_codigo=tep_codigo,
    )


class AdminCompanyListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "status",
                "in": "query",
                "required": False,
                "schema": {"type": "string", "enum": ["Ativa", "Inativa"]},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 20},
            },
        ],
        responses={200: PaginatedCompaniesSerializer},
    )
    def get(self, request: Request) -> Response:
        search = request.query_params.get("search", "").strip()
        status_filter = request.query_params.get("status", "").strip()
        page = max(int(request.query_params.get("page", "1")), 1)
        page_size = min(max(int(request.query_params.get("page_size", "20")), 1), 100)

        queryset = Empresa.objects.using(_SMAR_DB_ALIAS).order_by("emp_nome")
        if search:
            for term in search.split():
                query = (
                    Q(emp_nome__icontains=term)
                    | Q(emp_reduzido__icontains=term)
                    | Q(emp_cidade__icontains=term)
                    | Q(emp_estado__icontains=term)
                )
                if term.isdecimal():
                    query |= Q(emp_codigo=int(term))
                queryset = queryset.filter(query)
        if status_filter == "Ativa":
            queryset = queryset.filter(emp_ativa=1)
        elif status_filter == "Inativa":
            queryset = queryset.exclude(emp_ativa=1)

        total = queryset.count()
        offset = (page - 1) * page_size
        items = [
            _serialize_empresa(row) for row in queryset[offset : offset + page_size]
        ]
        output = PaginatedCompaniesSerializer(
            {"items": items, "total": total, "page": page, "page_size": page_size}
        )
        return Response(output.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=AdminCreateCompanySerializer,
        responses={201: OpenApiResponse(description="Created company.")},
    )
    def post(self, request: Request) -> Response:
        serializer = AdminCreateCompanySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        tipo = _as_text(data.get("tipo")).strip().upper() or "C"
        if tipo not in {"C", "F"}:
            tipo = "C"
        uf = _as_text(data.get("uf"))[:2].upper()
        try:
            emp_codigo = _next_empresa_codigo()
            row = Empresa(
                emp_codigo=emp_codigo,
                emp_nome=_as_text(data.get("nome"))[:200],
                emp_reduzido=_as_text(data.get("reduzido"))[:100]
                or _as_text(data.get("nome"))[:100],
                emp_tipo=tipo,
                emp_acesso="P",
                emp_endereco=_as_text(data.get("endereco"))[:200],
                emp_bairro=_as_text(data.get("bairro"))[:100],
                emp_cidade=_as_text(data.get("cidade"))[:100],
                emp_estado=uf,
                emp_cep=_as_text(data.get("cep"))[:20],
                est_codigo=data.get("est_codigo"),
                pai_codigo=data.get("pai_codigo"),
                emp_homepage=_as_text(data.get("homepage"))[:200],
                emp_ativa=1,
            )
            row.save(using=_SMAR_DB_ALIAS)
        except DatabaseError as exc:
            return Response(
                {"detail": f"Falha ao gravar empresa: {exc}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(_serialize_empresa(row), status=status.HTTP_201_CREATED)


class AdminPersonListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "status",
                "in": "query",
                "required": False,
                "schema": {"type": "string", "enum": ["Ativa", "Inativa"]},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 20},
            },
        ],
        responses={200: PaginatedPeopleSerializer},
    )
    def get(self, request: Request) -> Response:
        search = request.query_params.get("search", "").strip()
        status_filter = request.query_params.get("status", "").strip()
        page = max(int(request.query_params.get("page", "1")), 1)
        page_size = min(max(int(request.query_params.get("page_size", "20")), 1), 100)

        queryset = Pessoa.objects.using(_SMAR_DB_ALIAS).order_by(
            "pes_nome", "pes_numero"
        )
        if search:
            for term in search.split():
                query = (
                    Q(pes_nome__icontains=term)
                    | Q(pes_email__icontains=term)
                    | Q(pes_cidade__icontains=term)
                    | Q(pes_estado__icontains=term)
                )
                if term.isdecimal():
                    query |= Q(pes_numero=int(term))
                queryset = queryset.filter(query)
        if status_filter == "Ativa":
            queryset = queryset.filter(pes_ativo=1)
        elif status_filter == "Inativa":
            queryset = queryset.exclude(pes_ativo=1)

        total = queryset.count()
        offset = (page - 1) * page_size
        rows = list(queryset[offset : offset + page_size])
        contacts_by_person = _serialize_person_contacts(
            [row.pes_numero for row in rows]
        )
        users_by_person = _people_with_web_user([row.pes_numero for row in rows])
        items = [
            _serialize_pessoa(row, contacts_by_person, users_by_person) for row in rows
        ]
        output = PaginatedPeopleSerializer(
            {"items": items, "total": total, "page": page, "page_size": page_size}
        )
        return Response(output.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=AdminCreatePersonSerializer,
        responses={201: OpenApiResponse(description="Created person.")},
    )
    def post(self, request: Request) -> Response:
        serializer = AdminCreatePersonSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        sexo = _as_text(data.get("sexo")).strip().upper()[:1]
        try:
            pes_numero = sp_in_pessoa(
                nome=_as_text(data.get("nome")),
                email=_as_text(data.get("email")) or None,
                ativo=1,
                cidade=_as_text(data.get("cidade")) or None,
                est_codigo=data.get("est_codigo"),
                estado=_as_text(data.get("estado")) or None,
                cep=_as_text(data.get("cep")) or None,
                pai_codigo=data.get("pai_codigo"),
                sexo=sexo or None,
                endereco=_as_text(data.get("endereco")) or None,
                bairro=_as_text(data.get("bairro")) or None,
            )
        except DqanetDatabaseError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        row = Pessoa.objects.using(_SMAR_DB_ALIAS).filter(pes_numero=pes_numero).first()
        if row is None:
            # SP committed but row not readable yet — still return the OUT id.
            return Response(
                {
                    "id": str(pes_numero),
                    "numero": pes_numero,
                    "nome": _as_text(data.get("nome")),
                    "email": _as_text(data.get("email")),
                    "status": "Ativa",
                    "sexo": sexo,
                    "cidade": _as_text(data.get("cidade")),
                    "uf": _as_text(data.get("estado")),
                    "estCodigo": _as_text(data.get("est_codigo")),
                    "pais": _as_text(data.get("pai_codigo")),
                    "cep": _as_text(data.get("cep")),
                    "endereco": _as_text(data.get("endereco")),
                    "bairro": _as_text(data.get("bairro")),
                    "contatos": [],
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            _serialize_pessoa(row, {pes_numero: []}),
            status=status.HTTP_201_CREATED,
        )


class AdminPendingRequestListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 20},
            },
        ],
        responses={200: PaginatedPendingRequestsSerializer},
    )
    def get(self, request: Request) -> Response:
        search = request.query_params.get("search", "").strip()
        page = max(int(request.query_params.get("page", "1")), 1)
        page_size = min(max(int(request.query_params.get("page_size", "20")), 1), 100)

        queryset = (
            PrePessoa.objects.using(_SMAR_DB_ALIAS)
            .filter(ppe_dt_baixa__isnull=True)
            .order_by("tep_codigo", "-ppe_dt_solic")
        )

        if search:
            for term in search.split():
                query = (
                    Q(ppe_nome__icontains=term)
                    | Q(ppe_email__icontains=term)
                    | Q(ppe_cidade__icontains=term)
                )
                if term.isdecimal():
                    query |= Q(fun_chapa=int(term))
                queryset = queryset.filter(query)

        total = queryset.count()
        offset = (page - 1) * page_size
        rows = list(queryset[offset : offset + page_size])
        country_codes = {
            code
            for row in rows
            for code in (row.pai_codigo, row.pai_e_codigo)
            if code is not None
        }
        state_codes = {
            code
            for row in rows
            for code in (row.est_codigo, row.est_e_codigo)
            if code is not None
        }
        country_names = {
            row.pai_codigo: _as_text(row.pno_nome)
            for row in PaisNome.objects.using(_SMAR_DB_ALIAS)
            .filter(lin_cod=1, pai_codigo__in=country_codes)
            .only("pai_codigo", "pno_nome")
        }
        state_names = {
            row.est_codigo: _as_text(row.est_nome)
            for row in Estado.objects.using(_SMAR_DB_ALIAS)
            .filter(est_codigo__in=state_codes)
            .only("est_codigo", "est_nome")
        }
        emp_codes = {row.emp_codigo for row in rows if row.emp_codigo is not None}
        emp_lpr_map = {
            row.emp_codigo: row.lpr_codigo
            for row in Empresa.objects.using(_SMAR_DB_ALIAS)
            .filter(emp_codigo__in=emp_codes)
            .only("emp_codigo", "lpr_codigo")
        }

        items = [
            {
                "id": str(row.ppe_codigo),
                "fun_chapa": row.fun_chapa,
                "tep_codigo": _as_text(row.tep_codigo).strip().upper(),
                "tipo_empresa_nome": _as_text(row.ppe_e_nome),
                **_pending_request_type_fields(row.tep_codigo),
                "nome": _as_text(row.ppe_nome),
                "email": _as_text(row.ppe_email),
                "sexo": _as_text(row.pre_sexo),
                "endereco": _as_text(row.ppe_endereco),
                "cidade": _as_text(row.ppe_cidade),
                "bairro": _as_text(row.ppe_bairro),
                "estado": _as_text(row.ppe_estado),
                "cep": _as_text(row.ppe_cep),
                "est_codigo": row.est_codigo,
                "est_nome": state_names.get(row.est_codigo or 0, ""),
                "pai_codigo": row.pai_codigo,
                "pais_nome": country_names.get(row.pai_codigo or 0, ""),
                "lin_cod": row.lin_cod,
                "emp_codigo": row.emp_codigo,
                "emp_lpr_codigo": emp_lpr_map.get(row.emp_codigo)
                if row.emp_codigo
                else None,
                "pes_numero": row.pes_numero,
                "ppe_motivo": _as_text(row.ppe_motivo),
                "ppe_dt_solic": (
                    row.ppe_dt_solic.strftime("%d/%m/%Y")
                    if row.ppe_dt_solic is not None
                    else ""
                ),
                "emp_nome": _as_text(row.ppe_e_nome),
                "emp_endereco": _as_text(row.ppe_e_endereco),
                "emp_bairro": _as_text(row.ppe_e_bairro),
                "emp_cidade": _as_text(row.ppe_e_cidade),
                "emp_estado": _as_text(row.ppe_e_estado),
                "emp_cep": _as_text(row.ppe_e_cep),
                "emp_est_codigo": row.est_e_codigo,
                "emp_est_nome": state_names.get(row.est_e_codigo or 0, ""),
                "emp_pai_codigo": row.pai_e_codigo,
                "emp_pais_nome": country_names.get(row.pai_e_codigo or 0, ""),
                "emp_homepage": _as_text(row.ppe_e_homepage),
            }
            for row in rows
        ]

        output = PaginatedPendingRequestsSerializer(
            {"items": items, "total": total, "page": page, "page_size": page_size}
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminPendingRequestApproveView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=ApprovePendingRequestSerializer,
        responses={
            200: PendingRequestApprovalResultSerializer,
            400: OpenApiResponse(description="Invalid approval input."),
            404: OpenApiResponse(description="Pending request not found."),
            409: OpenApiResponse(description="User conflict."),
        },
    )
    def post(self, request: Request, ppe_codigo: int) -> Response:
        serializer = ApprovePendingRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data

        result = build_approve_access_request_use_case().execute(
            ApproveAccessRequestInputDTO(
                ppe_codigo=ppe_codigo,
                username=validated["username"],
                password=validated.get("password", ""),
                email=validated.get("email", ""),
                fun_chapa=validated.get("fun_chapa"),
                create_new_chapa=validated.get("create_new_chapa", False),
                require_password_change=validated.get("require_password_change", True),
                lin_cod=validated.get("lin_cod"),
                lpr_codigo=validated.get("lpr_codigo"),
            )
        )
        output = PendingRequestApprovalResultSerializer(
            {
                "ppe_codigo": result.ppe_codigo,
                "user_id": result.user_id,
                "username": result.username,
                "temporary_password": result.temporary_password,
                "usu_chapa": result.usu_chapa,
                "detail": (
                    "Request approved and user created in Django and SIAOS.USUARIO."
                ),
            }
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminPendingRequestDiscardView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=None,
        responses={
            200: PendingRequestDiscardResultSerializer,
            404: OpenApiResponse(description="Pending request not found."),
        },
    )
    def post(self, request: Request, ppe_codigo: int) -> Response:
        result = build_discard_access_request_use_case().execute(ppe_codigo=ppe_codigo)
        output = PendingRequestDiscardResultSerializer(
            {
                "ppe_codigo": result.ppe_codigo,
                "detail": "Request discarded successfully.",
            }
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminPendingRequestRegisterFieldsView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=RegisterPendingRequestFieldsSerializer,
        responses={
            200: PendingRequestRegisterFieldsResultSerializer,
            400: OpenApiResponse(description="No field informed to register."),
            404: OpenApiResponse(description="Pending request not found."),
        },
    )
    def post(self, request: Request, ppe_codigo: int) -> Response:
        serializer = RegisterPendingRequestFieldsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = build_register_access_request_fields_use_case().execute(
            _to_register_fields_input(request, ppe_codigo, serializer.validated_data)
        )
        output = PendingRequestRegisterFieldsResultSerializer(
            {
                "ppe_codigo": result.ppe_codigo,
                "fun_chapa": result.fun_chapa,
                "pes_numero": result.pes_numero,
                "emp_codigo": result.emp_codigo,
                "tep_codigo": result.tep_codigo,
                "tipo": result.tipo,
                "cliente": result.cliente,
                "fornecedor": result.fornecedor,
                "smar": result.smar,
                "detail": result.detail,
                "closed": result.closed,
                "resolved_existing_user": result.resolved_existing_user,
            }
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminPendingRequestCreateEmpresaView(APIView):
    """Legado grava.php op=7: GERAL.PCK_USUARIO.SP_IN_EMPRESA(ppe, codigo, ...)."""

    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=CreateEmpresaFromPartnerSerializer,
        responses={
            200: PendingRequestCreateEmpresaResultSerializer,
            400: OpenApiResponse(description="Invalid input or Oracle error."),
            404: OpenApiResponse(description="Pending request not found."),
        },
    )
    def post(self, request: Request, ppe_codigo: int) -> Response:
        serializer = CreateEmpresaFromPartnerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = build_create_empresa_from_partner_use_case().execute(
            CreateEmpresaFromPartnerInputDTO(
                ppe_codigo=ppe_codigo,
                partner_codigo=str(serializer.validated_data["partner_codigo"]),
            )
        )
        output = PendingRequestCreateEmpresaResultSerializer(
            {
                "ppe_codigo": result.ppe_codigo,
                "emp_codigo": result.emp_codigo,
                "emp_nome": result.emp_nome,
                "emp_tipo": result.emp_tipo,
                "detail": (
                    "Empresa criada/vinculada a partir do parceiro (SP_IN_EMPRESA)."
                ),
            }
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminPartnerLookupListView(APIView):
    """Legado empresas.php: busca SIAOS.CLIENTE (C) ou SUPRIMENTO.FORNECEDOR (F)."""

    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "tep",
                "in": "query",
                "required": True,
                "schema": {"type": "string", "enum": ["C", "F"]},
            },
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 25},
            },
        ],
        responses={200: PaginatedPartnerLookupSerializer},
    )
    def get(self, request: Request) -> Response:
        tep = _as_text(request.query_params.get("tep")).strip().upper()
        if tep not in {"C", "F"}:
            return Response(
                {"detail": "Informe tep=C (cliente) ou tep=F (fornecedor)."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        search = _as_text(request.query_params.get("search")).strip()
        page = max(int(request.query_params.get("page", "1")), 1)
        page_size = min(max(int(request.query_params.get("page_size", "25")), 1), 100)
        offset = (page - 1) * page_size
        like = f"%{search}%"

        if tep == "C":
            count_sql = """
                SELECT COUNT(*)
                  FROM SIAOS.CLIENTE
                 WHERE (%s IS NULL OR %s = '')
                    OR UPPER(CLIENTE.CLIENTE) LIKE UPPER(%s)
                    OR UPPER(NVL(CLIENTE.REDUZIDO, '')) LIKE UPPER(%s)
                    OR TO_CHAR(CLIENTE.CODIGO) = %s
            """
            data_sql = """
                SELECT CODIGO,
                       NOME,
                       EMAIL,
                       CIDADE,
                       REDUZIDO,
                       PAIS,
                       TEM_EMP
                  FROM (
                    SELECT CLIENTE.CODIGO CODIGO,
                           CLIENTE.CLIENTE NOME,
                           CLIENTE.EMAIL EMAIL,
                           CLIENTE.CIDADE CIDADE,
                           CLIENTE.REDUZIDO REDUZIDO,
                           '' PAIS,
                           (SELECT COUNT(*)
                              FROM GERAL.EMP_CLIE EC
                             WHERE EC.CODIGO = CLIENTE.CODIGO) TEM_EMP
                      FROM SIAOS.CLIENTE
                     WHERE (%s IS NULL OR %s = '')
                        OR UPPER(CLIENTE.CLIENTE) LIKE UPPER(%s)
                        OR UPPER(NVL(CLIENTE.REDUZIDO, '')) LIKE UPPER(%s)
                        OR TO_CHAR(CLIENTE.CODIGO) = %s
                     ORDER BY CLIENTE.CLIENTE
                  )
                OFFSET %s ROWS FETCH NEXT %s ROWS ONLY
            """
            origem = "cliente"
        else:
            count_sql = """
                SELECT COUNT(*)
                  FROM SUPRIMENTO.FORNECEDOR
                 WHERE (%s IS NULL OR %s = '')
                    OR UPPER(FORNECEDOR.FORN_RAZAO_SOCIAL) LIKE UPPER(%s)
                    OR UPPER(NVL(FORNECEDOR.FORN_NOME_REDUZ, '')) LIKE UPPER(%s)
                    OR TO_CHAR(FORNECEDOR.FORN_CODIGO) = %s
            """
            data_sql = """
                SELECT CODIGO,
                       NOME,
                       EMAIL,
                       CIDADE,
                       REDUZIDO,
                       PAIS,
                       TEM_EMP
                  FROM (
                    SELECT FORNECEDOR.FORN_CODIGO CODIGO,
                           FORNECEDOR.FORN_RAZAO_SOCIAL NOME,
                           FORNECEDOR.FORN_EMAIL EMAIL,
                           FORNECEDOR.FORN_CIDADE CIDADE,
                           FORNECEDOR.FORN_NOME_REDUZ REDUZIDO,
                           '' PAIS,
                           (SELECT COUNT(*)
                              FROM GERAL.EMP_FORN EF
                             WHERE EF.FORN_CODIGO = FORNECEDOR.FORN_CODIGO) TEM_EMP
                      FROM SUPRIMENTO.FORNECEDOR
                     WHERE (%s IS NULL OR %s = '')
                        OR UPPER(FORNECEDOR.FORN_RAZAO_SOCIAL) LIKE UPPER(%s)
                        OR UPPER(NVL(FORNECEDOR.FORN_NOME_REDUZ, '')) LIKE UPPER(%s)
                        OR TO_CHAR(FORNECEDOR.FORN_CODIGO) = %s
                     ORDER BY FORNECEDOR.FORN_RAZAO_SOCIAL
                  )
                OFFSET %s ROWS FETCH NEXT %s ROWS ONLY
            """
            origem = "fornecedor"

        search_param = search or None
        like_param = like if search else "%"
        count_params = [
            search_param,
            search_param or "",
            like_param,
            like_param,
            search_param or "",
        ]
        data_params = [
            search_param,
            search_param or "",
            like_param,
            like_param,
            search_param or "",
            offset,
            page_size,
        ]

        try:
            with connections[_SMAR_DB_ALIAS].cursor() as cursor:
                cursor.execute(count_sql, count_params)
                total = int(cursor.fetchone()[0] or 0)
                cursor.execute(data_sql, data_params)
                columns = [col[0].lower() for col in cursor.description]
                rows = [
                    dict(zip(columns, row, strict=True)) for row in cursor.fetchall()
                ]
        except DatabaseError as exc:
            return Response(
                {"detail": f"Falha ao consultar parceiros: {exc}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        items = [
            {
                "id": f"{origem}-{row.get('codigo')}",
                "codigo": _as_text(row.get("codigo")),
                "nome": _as_text(row.get("nome")),
                "reduzido": _as_text(row.get("reduzido")),
                "email": _as_text(row.get("email")),
                "cidade": _as_text(row.get("cidade")),
                "pais": _as_text(row.get("pais")),
                "tem_empresa": int(row.get("tem_emp") or 0) > 0,
                "origem": origem,
            }
            for row in rows
        ]
        output = PaginatedPartnerLookupSerializer(
            {"items": items, "total": total, "page": page, "page_size": page_size}
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminPersonContactTypeListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminPersonContactTypeSerializer(many=True)})
    def get(self, request: Request) -> Response:
        rows = PessoaTipoContato.objects.using(_SMAR_DB_ALIAS).order_by("ptc_codigo")
        output = AdminPersonContactTypeSerializer(
            [
                {
                    "codigo": row.ptc_codigo,
                    "nome": _as_text(row.ptc_nome),
                    "meio": _as_text(row.ptc_meio),
                }
                for row in rows
            ],
            many=True,
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminChapaLookupListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 25},
            },
        ],
        responses={200: PaginatedChapaLookupSerializer},
    )
    def get(self, request: Request) -> Response:
        search = request.query_params.get("search", "").strip()
        page = max(int(request.query_params.get("page", "1")), 1)
        page_size = min(max(int(request.query_params.get("page_size", "25")), 1), 100)

        queryset = (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .filter(usu_status=0)
            .order_by("usu_chapa")
        )
        if search:
            for term in search.split():
                query = (
                    Q(usu_login__icontains=term)
                    | Q(usu_nome__icontains=term)
                    | Q(usu_loginweb__icontains=term)
                    | Q(usu_email__icontains=term)
                )
                if term.isdecimal():
                    query |= Q(usu_chapa=int(term))
                queryset = queryset.filter(query)

        total = queryset.count()
        offset = (page - 1) * page_size
        rows = list(queryset[offset : offset + page_size])

        output = PaginatedChapaLookupSerializer(
            {
                "items": [
                    {
                        "usu_chapa": row.usu_chapa,
                        "usu_login": _as_text(row.usu_login),
                        "usu_nome": _as_text(row.usu_nome),
                        "usu_loginweb": _as_text(row.usu_loginweb),
                        "usu_email": _as_text(row.usu_email),
                        "emp_codigo": row.emp_codigo,
                        "pes_numero": row.pes_numero,
                    }
                    for row in rows
                ],
                "total": total,
                "page": page,
                "page_size": page_size,
            }
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminOracleUserImportListView(APIView):
    """Lista usuarios Oracle ativos e indica se ja foram importados no Smarnet."""

    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 25},
            },
        ],
        responses={200: PaginatedOracleUserImportSerializer},
    )
    def get(self, request: Request) -> Response:
        search = request.query_params.get("search", "").strip()
        page = max(int(request.query_params.get("page", "1")), 1)
        page_size = min(max(int(request.query_params.get("page_size", "25")), 1), 100)

        queryset = (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .filter(usu_status=0)
            .order_by("usu_chapa")
        )
        if search:
            for term in search.split():
                query = (
                    Q(usu_login__icontains=term)
                    | Q(usu_nome__icontains=term)
                    | Q(usu_loginweb__icontains=term)
                    | Q(usu_email__icontains=term)
                )
                if term.isdecimal():
                    query |= Q(usu_chapa=int(term))
                queryset = queryset.filter(query)

        total = queryset.count()
        offset = (page - 1) * page_size
        rows = list(queryset[offset : offset + page_size])
        chapas = [row.usu_chapa for row in rows]

        profiles_by_chapa: dict[int, UserSecurityProfile] = {}
        if chapas:
            for profile in UserSecurityProfile.objects.filter(
                usu_chapa__in=chapas
            ).select_related("user"):
                if profile.usu_chapa is not None:
                    profiles_by_chapa[int(profile.usu_chapa)] = profile

        output = PaginatedOracleUserImportSerializer(
            {
                "items": [
                    {
                        "usu_chapa": row.usu_chapa,
                        "usu_login": _as_text(row.usu_login),
                        "usu_nome": _as_text(row.usu_nome),
                        "usu_loginweb": _as_text(row.usu_loginweb),
                        "usu_email": _as_text(row.usu_email),
                        "emp_codigo": row.emp_codigo,
                        "pes_numero": row.pes_numero,
                        "imported": row.usu_chapa in profiles_by_chapa,
                        "django_user_id": (
                            profiles_by_chapa[row.usu_chapa].user_id
                            if row.usu_chapa in profiles_by_chapa
                            else None
                        ),
                        "django_username": (
                            profiles_by_chapa[row.usu_chapa].user.username
                            if row.usu_chapa in profiles_by_chapa
                            else None
                        ),
                    }
                    for row in rows
                ],
                "total": total,
                "page": page,
                "page_size": page_size,
            }
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminOracleUserImportView(APIView):
    """Importa usuario Oracle ativo: cria Django user, vincula profile e envia senha."""

    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        responses={
            201: ImportOracleUserResultSerializer,
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="Oracle user not found"),
            409: OpenApiResponse(description="Already imported or username conflict"),
        },
    )
    def post(self, request: Request, usu_chapa: int) -> Response:
        result = build_import_oracle_user_use_case().execute(usu_chapa=usu_chapa)
        output = ImportOracleUserResultSerializer(
            {
                "usu_chapa": result.usu_chapa,
                "username": result.username,
                "email": result.email,
                "django_user_id": result.django_user_id,
                "temporary_password": result.temporary_password,
                "email_sent": result.email_sent,
            }
        )
        if result.email_sent:
            return Response(output.data, status=status.HTTP_201_CREATED)
        # Usuario ja criado: sucesso parcial com a senha para o admin repassar.
        detail = f"Usuario importado, mas o e-mail falhou: {result.notification_error}"
        return Response(
            {**output.data, "detail": detail},
            status=status.HTTP_201_CREATED,
        )


class AdminPendingRequestLoginOptionsView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminLoginOptionSerializer(many=True)})
    def get(self, request: Request, ppe_codigo: int) -> Response:
        pending = (
            PrePessoa.objects.using(_SMAR_DB_ALIAS)
            .filter(ppe_codigo=ppe_codigo, ppe_dt_baixa__isnull=True)
            .first()
        )
        if pending is None:
            return Response(
                {"detail": "Pending request not found or already closed."},
                status=status.HTTP_404_NOT_FOUND,
            )

        nome = _as_text(pending.ppe_nome)
        email = _as_text(pending.ppe_email)
        if pending.pes_numero:
            person = (
                Pessoa.objects.using(_SMAR_DB_ALIAS)
                .filter(pes_numero=pending.pes_numero)
                .only("pes_nome", "pes_email")
                .first()
            )
            if person is not None:
                # Legado cadastra_usuario.php usa PESSOA.PES_NOME apos o vinculo.
                nome = _as_text(person.pes_nome) or nome
                email = _as_text(person.pes_email) or email

        suggestions = build_login_suggestions(
            nome,
            email,
            pending.emp_codigo,
        )
        used_by_login = usernames_taken(list(suggestions))
        items = [
            {"login": login, "used": used_by_login.get(login, False)}
            for login in suggestions
        ]
        output = AdminLoginOptionSerializer(items, many=True)
        return Response(output.data, status=status.HTTP_200_OK)


class AdminLoginCheckView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "login",
                "in": "query",
                "required": True,
                "schema": {"type": "string"},
            },
        ],
        responses={200: AdminLoginCheckSerializer},
    )
    def get(self, request: Request) -> Response:
        raw_login = _as_text(request.query_params.get("login")).strip()
        if not raw_login:
            return Response(
                {"detail": "Informe o parametro login."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            login = validate_oracle_username(sanitize_username(raw_login, 0))
        except ValueError as exc:
            return Response(
                {
                    "login": raw_login[:20],
                    "available": False,
                    "detail": str(exc),
                },
                status=status.HTTP_200_OK,
            )

        available = not username_taken(login)
        return Response(
            {
                "login": login,
                "available": available,
                "detail": "Valido" if available else "Ja existe",
            },
            status=status.HTTP_200_OK,
        )


class AdminLanguageListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminLanguageSerializer(many=True)})
    def get(self, request: Request) -> Response:
        rows = Lingua.objects.using(_SMAR_DB_ALIAS).order_by("lin_desc")
        output = AdminLanguageSerializer(
            [{"lin_cod": row.lin_cod, "nome": _as_text(row.lin_desc)} for row in rows],
            many=True,
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminPriceListCatalogView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminPriceListSerializer(many=True)})
    def get(self, request: Request) -> Response:
        with connections[_SMAR_DB_ALIAS].cursor() as cursor:
            cursor.execute(
                """
                SELECT LP.LPR_CODIGO,
                       LP.LPR_NOME,
                       E.EMP_NOME
                  FROM SIAOS.LISTA_PRECO LP
                 INNER JOIN SIAOS.USUARIO U ON U.USU_CHAPA = LP.USU_CHAPA
                 INNER JOIN GERAL.EMPRESA E ON E.EMP_CODIGO = U.EMP_CODIGO
                 ORDER BY E.EMP_NOME, LP.LPR_NOME
                """
            )
            rows = cursor.fetchall()

        items = [
            {
                "lpr_codigo": int(row[0]),
                "nome": _as_text(row[1]),
                "emp_nome": _as_text(row[2]),
            }
            for row in rows
            if row[0] is not None
        ]
        output = AdminPriceListSerializer(items, many=True)
        return Response(output.data, status=status.HTTP_200_OK)


class AdminCountryListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "language",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
        ],
        responses={200: AdminCountrySerializer(many=True)},
    )
    def get(self, request: Request) -> Response:
        language = int(request.query_params.get("language", "1"))
        rows = (
            PaisNome.objects.using(_SMAR_DB_ALIAS)
            .filter(lin_cod=language)
            .order_by("pno_nome")
        )
        output = AdminCountrySerializer(
            [
                {"pai_codigo": row.pai_codigo, "nome": _as_text(row.pno_nome)}
                for row in rows
            ],
            many=True,
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminStateListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "pai_codigo",
                "in": "query",
                "required": True,
                "schema": {"type": "integer"},
            },
        ],
        responses={200: AdminStateSerializer(many=True)},
    )
    def get(self, request: Request) -> Response:
        pai_codigo = request.query_params.get("pai_codigo")
        if not pai_codigo:
            return Response([], status=status.HTTP_200_OK)
        rows = (
            Estado.objects.using(_SMAR_DB_ALIAS)
            .filter(pai_codigo=int(pai_codigo))
            .order_by("est_nome")
        )
        output = AdminStateSerializer(
            [
                {
                    "est_codigo": row.est_codigo,
                    "pai_codigo": row.pai_codigo,
                    "nome": _as_text(row.est_nome),
                }
                for row in rows
            ],
            many=True,
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminStateCatalogListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "pai_codigo",
                "in": "query",
                "required": False,
                "schema": {"type": "integer"},
            },
            {
                "name": "language",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 20},
            },
        ],
        responses={200: PaginatedStateCatalogSerializer},
    )
    def get(self, request: Request) -> Response:
        search = request.query_params.get("search", "").strip()
        pai_codigo = request.query_params.get("pai_codigo", "").strip()
        language = int(request.query_params.get("language", "1"))
        page = max(int(request.query_params.get("page", "1")), 1)
        page_size = min(max(int(request.query_params.get("page_size", "20")), 1), 100)

        queryset = Estado.objects.using(_SMAR_DB_ALIAS).order_by(
            "est_nome", "est_codigo"
        )
        if pai_codigo:
            queryset = queryset.filter(pai_codigo=int(pai_codigo))
        if search:
            for term in search.split():
                query = Q(est_nome__icontains=term)
                if term.isdecimal():
                    query |= Q(est_codigo=int(term)) | Q(pai_codigo=int(term))
                queryset = queryset.filter(query)

        total = queryset.count()
        offset = (page - 1) * page_size
        rows = list(queryset[offset : offset + page_size])

        country_codes = {row.pai_codigo for row in rows}
        country_names = {
            row.pai_codigo: _as_text(row.pno_nome)
            for row in PaisNome.objects.using(_SMAR_DB_ALIAS)
            .filter(lin_cod=language, pai_codigo__in=country_codes)
            .only("pai_codigo", "pno_nome")
        }

        items = [
            {
                "id": str(row.est_codigo),
                "est_codigo": row.est_codigo,
                "pai_codigo": row.pai_codigo,
                "nome": _as_text(row.est_nome),
                "pais_nome": country_names.get(row.pai_codigo, ""),
            }
            for row in rows
        ]

        output = PaginatedStateCatalogSerializer(
            {"items": items, "total": total, "page": page, "page_size": page_size}
        )
        return Response(output.data, status=status.HTTP_200_OK)


class AdminUserListCreateView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 20},
            },
        ],
        responses={200: PaginatedUsersSerializer},
    )
    def get(self, request: Request) -> Response:
        search = request.query_params.get("search", "")
        page = int(request.query_params.get("page", "1"))
        page_size = int(request.query_params.get("page_size", "20"))
        result = build_list_users_use_case().execute(
            ListUsersInputDTO(search=search, page=page, page_size=page_size)
        )
        return Response(serialize_paginated_users(result))

    @extend_schema(
        request=CreateAdminUserRequestSerializer,
        responses={
            201: AdminUserSerializer,
            400: OpenApiResponse(description="Invalid request."),
            409: OpenApiResponse(description="User already exists."),
        },
    )
    def post(self, request: Request) -> Response:
        serializer = CreateAdminUserRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        result = build_create_user_admin_use_case().execute(
            CreateUserAdminInputDTO(
                username=validated["username"],
                password=validated["password"],
                groups=validated.get("groups", []),
                email=validated.get("email", ""),
                require_password_change=validated.get("require_password_change", True),
            )
        )
        return Response(serialize_admin_user(result), status=status.HTTP_201_CREATED)


class AdminUserDetailView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminUserSerializer, 404: OpenApiResponse()})
    def get(self, request: Request, pk: int) -> Response:
        result = build_get_user_use_case().execute(pk)
        return Response(serialize_admin_user(result))

    @extend_schema(
        request=UpdateAdminUserRequestSerializer,
        responses={200: AdminUserSerializer, 404: OpenApiResponse()},
    )
    def patch(self, request: Request, pk: int) -> Response:
        serializer = UpdateAdminUserRequestSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        actor = resolve_django_user_from_request(request)
        is_superuser = validated.get("is_superuser")
        if is_superuser is not None and (actor is None or not actor.is_superuser):
            is_superuser = None
        result = build_update_user_use_case().execute(
            UpdateUserInputDTO(
                user_id=pk,
                email=validated.get("email"),
                first_name=validated.get("first_name"),
                last_name=validated.get("last_name"),
                is_active=validated.get("is_active"),
                is_superuser=is_superuser,
                emp_codigo=validated.get("emp_codigo"),
                pes_numero=validated.get("pes_numero"),
            )
        )
        return Response(serialize_admin_user(result))


class AdminUserSetPasswordView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=SetUserPasswordRequestSerializer,
        responses={
            200: ResetPasswordResponseSerializer,
            404: OpenApiResponse(description="User not found."),
        },
    )
    def post(self, request: Request, pk: int) -> Response:
        serializer = SetUserPasswordRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data.get("password") or None
        if password == "":
            password = None
        result = build_reset_user_password_use_case().execute(
            ResetUserPasswordInputDTO(user_id=pk, password=password)
        )
        return Response(
            {"temporary_password": result.temporary_password},
            status=status.HTTP_200_OK,
        )


class AdminUserGroupsView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=SetUserGroupsRequestSerializer,
        responses={200: AdminUserSerializer},
    )
    def put(self, request: Request, pk: int) -> Response:
        serializer = SetUserGroupsRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = build_set_user_groups_use_case().execute(
            SetUserGroupsInputDTO(
                user_id=pk,
                groups=serializer.validated_data["groups"],
            )
        )
        return Response(serialize_admin_user(result))


class AdminUserProductPermissionsView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=SetUserProductPermissionsRequestSerializer,
        responses={200: AdminUserSerializer},
    )
    def put(self, request: Request, pk: int) -> Response:
        serializer = SetUserProductPermissionsRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = build_set_user_product_permissions_use_case().execute(
            SetUserProductPermissionsInputDTO(
                user_id=pk,
                permissions=serializer.validated_data["permissions"],
            )
        )
        return Response(serialize_admin_user(result))


class AdminGroupListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminGroupSerializer(many=True)})
    def get(self, request: Request) -> Response:
        groups = build_list_groups_use_case().execute()
        return Response(serialize_groups(groups))


class AdminProductPermissionListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminProductPermissionSerializer(many=True)})
    def get(self, request: Request) -> Response:
        permissions = build_list_product_permissions_use_case().execute()
        return Response(serialize_product_permissions(permissions))
