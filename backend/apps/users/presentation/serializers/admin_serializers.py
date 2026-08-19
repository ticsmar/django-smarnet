"""Admin API serializers."""

from rest_framework import serializers

from apps.users.application.dtos.admin_user_output_dto import (
    AdminGroupOutputDTO,
    AdminProductPermissionOutputDTO,
    AdminUserOutputDTO,
    PaginatedUsersOutputDTO,
)


class AdminGroupSerializer(serializers.Serializer):
    name = serializers.CharField()


class AdminUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField(allow_blank=True)
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    is_active = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    groups = serializers.ListField(child=serializers.CharField())
    product_permissions = serializers.ListField(child=serializers.CharField())
    usu_chapa = serializers.IntegerField(required=False, allow_null=True)
    emp_codigo = serializers.IntegerField(required=False, allow_null=True)
    pes_numero = serializers.IntegerField(required=False, allow_null=True)
    pais_nome = serializers.CharField(required=False, allow_blank=True)
    emp_nome = serializers.CharField(required=False, allow_blank=True)
    emp_endereco = serializers.CharField(required=False, allow_blank=True)
    emp_bairro = serializers.CharField(required=False, allow_blank=True)
    emp_cidade = serializers.CharField(required=False, allow_blank=True)
    emp_estado = serializers.CharField(required=False, allow_blank=True)
    emp_cep = serializers.CharField(required=False, allow_blank=True)
    emp_pais_nome = serializers.CharField(required=False, allow_blank=True)
    emp_homepage = serializers.CharField(required=False, allow_blank=True)
    last_login = serializers.DateTimeField(allow_null=True)
    date_joined = serializers.DateTimeField()


class AdminProductPermissionSerializer(serializers.Serializer):
    value = serializers.CharField()
    app_label = serializers.CharField()
    model = serializers.CharField()
    codename = serializers.CharField()
    name = serializers.CharField()


class AdminCompanySerializer(serializers.Serializer):
    id = serializers.CharField()
    codigo = serializers.IntegerField()
    nome = serializers.CharField(allow_blank=True)
    reduzido = serializers.CharField(allow_blank=True)
    acesso = serializers.CharField(allow_blank=True)
    tipo = serializers.CharField(allow_blank=True)
    endereco = serializers.CharField(allow_blank=True)
    bairro = serializers.CharField(allow_blank=True)
    cep = serializers.CharField(allow_blank=True)
    cidade = serializers.CharField(allow_blank=True)
    uf = serializers.CharField(allow_blank=True)
    estCodigo = serializers.CharField(allow_blank=True)
    pais = serializers.CharField(allow_blank=True)
    homepage = serializers.CharField(allow_blank=True)
    fabricaPadrao = serializers.CharField(allow_blank=True)
    listaPreco = serializers.CharField(allow_blank=True)
    descontoPadrao = serializers.CharField(allow_blank=True)
    status = serializers.CharField()
    cliente = serializers.BooleanField()
    fornecedor = serializers.BooleanField()


class PaginatedCompaniesSerializer(serializers.Serializer):
    items = AdminCompanySerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class AdminPersonContactSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    tipo_codigo = serializers.IntegerField()
    tipo_nome = serializers.CharField(allow_blank=True)
    meio = serializers.CharField(allow_blank=True)
    referencia = serializers.CharField(allow_blank=True)


class AdminPersonContactTypeSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    nome = serializers.CharField(allow_blank=True)
    meio = serializers.CharField(allow_blank=True)


class AdminPersonSerializer(serializers.Serializer):
    id = serializers.CharField()
    numero = serializers.IntegerField()
    nome = serializers.CharField(allow_blank=True)
    email = serializers.CharField(allow_blank=True)
    status = serializers.CharField()
    sexo = serializers.CharField(allow_blank=True)
    cidade = serializers.CharField(allow_blank=True)
    uf = serializers.CharField(allow_blank=True)
    estCodigo = serializers.CharField(allow_blank=True)
    pais = serializers.CharField(allow_blank=True)
    cep = serializers.CharField(allow_blank=True)
    endereco = serializers.CharField(allow_blank=True)
    bairro = serializers.CharField(allow_blank=True)
    contatos = AdminPersonContactSerializer(many=True)


class PaginatedPeopleSerializer(serializers.Serializer):
    items = AdminPersonSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class AdminChapaLookupSerializer(serializers.Serializer):
    usu_chapa = serializers.IntegerField()
    usu_login = serializers.CharField(allow_blank=True)
    usu_nome = serializers.CharField(allow_blank=True)
    usu_loginweb = serializers.CharField(allow_blank=True)
    usu_email = serializers.CharField(allow_blank=True)
    emp_codigo = serializers.IntegerField(allow_null=True)
    pes_numero = serializers.IntegerField(allow_null=True)


class PaginatedChapaLookupSerializer(serializers.Serializer):
    items = AdminChapaLookupSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class AdminOracleUserImportItemSerializer(serializers.Serializer):
    usu_chapa = serializers.IntegerField()
    usu_login = serializers.CharField(allow_blank=True)
    usu_nome = serializers.CharField(allow_blank=True)
    usu_loginweb = serializers.CharField(allow_blank=True)
    usu_email = serializers.CharField(allow_blank=True)
    emp_codigo = serializers.IntegerField(allow_null=True)
    pes_numero = serializers.IntegerField(allow_null=True)
    imported = serializers.BooleanField()
    django_user_id = serializers.IntegerField(allow_null=True)
    django_username = serializers.CharField(allow_blank=True, allow_null=True)


class PaginatedOracleUserImportSerializer(serializers.Serializer):
    items = AdminOracleUserImportItemSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class ImportOracleUserResultSerializer(serializers.Serializer):
    usu_chapa = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.CharField(allow_blank=True)
    django_user_id = serializers.IntegerField()
    temporary_password = serializers.CharField()
    email_sent = serializers.BooleanField()


class AdminPendingRequestSerializer(serializers.Serializer):
    id = serializers.CharField()
    fun_chapa = serializers.IntegerField(allow_null=True)
    tep_codigo = serializers.CharField(allow_blank=True)
    tipo_empresa_nome = serializers.CharField(allow_blank=True)
    tipo = serializers.CharField()
    nome = serializers.CharField(allow_blank=True)
    email = serializers.CharField(allow_blank=True)
    sexo = serializers.CharField(allow_blank=True)
    endereco = serializers.CharField(allow_blank=True)
    cidade = serializers.CharField(allow_blank=True)
    bairro = serializers.CharField(allow_blank=True)
    estado = serializers.CharField(allow_blank=True)
    cep = serializers.CharField(allow_blank=True)
    cliente = serializers.BooleanField()
    fornecedor = serializers.BooleanField()
    smar = serializers.BooleanField()
    est_codigo = serializers.IntegerField(allow_null=True)
    est_nome = serializers.CharField(allow_blank=True)
    pai_codigo = serializers.IntegerField(allow_null=True)
    pais_nome = serializers.CharField(allow_blank=True)
    lin_cod = serializers.IntegerField(allow_null=True)
    emp_codigo = serializers.IntegerField(allow_null=True)
    emp_lpr_codigo = serializers.IntegerField(allow_null=True)
    pes_numero = serializers.IntegerField(allow_null=True)
    ppe_motivo = serializers.CharField(allow_blank=True)
    ppe_dt_solic = serializers.CharField(allow_blank=True, allow_null=True)
    # Dados da empresa informados na solicitação (PPE_E_*)
    emp_nome = serializers.CharField(allow_blank=True)
    emp_endereco = serializers.CharField(allow_blank=True)
    emp_bairro = serializers.CharField(allow_blank=True)
    emp_cidade = serializers.CharField(allow_blank=True)
    emp_estado = serializers.CharField(allow_blank=True)
    emp_cep = serializers.CharField(allow_blank=True)
    emp_est_codigo = serializers.IntegerField(allow_null=True)
    emp_est_nome = serializers.CharField(allow_blank=True)
    emp_pai_codigo = serializers.IntegerField(allow_null=True)
    emp_pais_nome = serializers.CharField(allow_blank=True)
    emp_homepage = serializers.CharField(allow_blank=True)


class PaginatedPendingRequestsSerializer(serializers.Serializer):
    items = AdminPendingRequestSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class ApprovePendingRequestSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, allow_blank=False, max_length=20)
    password = serializers.CharField(required=False, allow_blank=True, default="")
    email = serializers.EmailField(required=False, allow_blank=True, default="")
    fun_chapa = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    create_new_chapa = serializers.BooleanField(required=False, default=False)
    require_password_change = serializers.BooleanField(required=False, default=True)
    lin_cod = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    lpr_codigo = serializers.IntegerField(required=False, allow_null=True, min_value=1)


class AdminCreatePersonSerializer(serializers.Serializer):
    nome = serializers.CharField(max_length=100)
    email = serializers.CharField(
        required=False, allow_blank=True, max_length=60, default=""
    )
    sexo = serializers.CharField(
        required=False, allow_blank=True, max_length=1, default=""
    )
    endereco = serializers.CharField(
        required=False, allow_blank=True, max_length=100, default=""
    )
    bairro = serializers.CharField(
        required=False, allow_blank=True, max_length=60, default=""
    )
    cidade = serializers.CharField(
        required=False, allow_blank=True, max_length=60, default=""
    )
    estado = serializers.CharField(
        required=False, allow_blank=True, max_length=30, default=""
    )
    cep = serializers.CharField(
        required=False, allow_blank=True, max_length=11, default=""
    )
    est_codigo = serializers.IntegerField(required=False, allow_null=True)
    pai_codigo = serializers.IntegerField(required=False, allow_null=True)


class AdminCreateCompanySerializer(serializers.Serializer):
    nome = serializers.CharField(max_length=200)
    reduzido = serializers.CharField(
        required=False, allow_blank=True, max_length=100, default=""
    )
    tipo = serializers.CharField(
        required=False, allow_blank=True, max_length=1, default="C"
    )
    endereco = serializers.CharField(
        required=False, allow_blank=True, max_length=200, default=""
    )
    bairro = serializers.CharField(
        required=False, allow_blank=True, max_length=100, default=""
    )
    cidade = serializers.CharField(
        required=False, allow_blank=True, max_length=100, default=""
    )
    uf = serializers.CharField(
        required=False, allow_blank=True, max_length=30, default=""
    )
    cep = serializers.CharField(
        required=False, allow_blank=True, max_length=20, default=""
    )
    est_codigo = serializers.IntegerField(required=False, allow_null=True)
    pai_codigo = serializers.IntegerField(required=False, allow_null=True)
    homepage = serializers.CharField(
        required=False, allow_blank=True, max_length=200, default=""
    )


class CreateEmpresaFromPartnerSerializer(serializers.Serializer):
    partner_codigo = serializers.CharField(max_length=40)


class AdminPartnerLookupSerializer(serializers.Serializer):
    id = serializers.CharField()
    codigo = serializers.CharField()
    nome = serializers.CharField(allow_blank=True)
    reduzido = serializers.CharField(allow_blank=True)
    email = serializers.CharField(allow_blank=True)
    cidade = serializers.CharField(allow_blank=True)
    pais = serializers.CharField(allow_blank=True)
    tem_empresa = serializers.BooleanField()
    origem = serializers.CharField()


class PaginatedPartnerLookupSerializer(serializers.Serializer):
    items = AdminPartnerLookupSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class PendingRequestCreateEmpresaResultSerializer(serializers.Serializer):
    ppe_codigo = serializers.IntegerField()
    emp_codigo = serializers.IntegerField()
    emp_nome = serializers.CharField(allow_blank=True, allow_null=True)
    emp_tipo = serializers.CharField(allow_blank=True, allow_null=True)
    detail = serializers.CharField()


class PendingRequestApprovalResultSerializer(serializers.Serializer):
    ppe_codigo = serializers.IntegerField()
    user_id = serializers.IntegerField()
    username = serializers.CharField()
    temporary_password = serializers.CharField()
    usu_chapa = serializers.IntegerField()
    detail = serializers.CharField()


class PendingRequestDiscardResultSerializer(serializers.Serializer):
    ppe_codigo = serializers.IntegerField()
    detail = serializers.CharField()


class RegisterPendingRequestFieldsSerializer(serializers.Serializer):
    fun_chapa = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    pes_numero = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    emp_codigo = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    tep_codigo = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=1
    )


class PendingRequestRegisterFieldsResultSerializer(serializers.Serializer):
    ppe_codigo = serializers.IntegerField()
    fun_chapa = serializers.IntegerField(allow_null=True)
    pes_numero = serializers.IntegerField(allow_null=True)
    emp_codigo = serializers.IntegerField(allow_null=True)
    tep_codigo = serializers.CharField(allow_blank=True, required=False)
    cliente = serializers.BooleanField(required=False)
    fornecedor = serializers.BooleanField(required=False)
    smar = serializers.BooleanField(required=False)
    tipo = serializers.CharField(required=False, allow_blank=True)
    detail = serializers.CharField()
    closed = serializers.BooleanField(required=False, default=False)
    resolved_existing_user = serializers.BooleanField(required=False, default=False)


class AdminLoginOptionSerializer(serializers.Serializer):
    login = serializers.CharField()
    used = serializers.BooleanField()


class AdminLoginCheckSerializer(serializers.Serializer):
    login = serializers.CharField()
    available = serializers.BooleanField()
    detail = serializers.CharField(required=False, allow_blank=True)


class AdminLanguageSerializer(serializers.Serializer):
    lin_cod = serializers.IntegerField()
    nome = serializers.CharField(allow_blank=True)


class AdminPriceListSerializer(serializers.Serializer):
    lpr_codigo = serializers.IntegerField()
    nome = serializers.CharField(allow_blank=True)
    emp_nome = serializers.CharField(allow_blank=True)


class AdminCountrySerializer(serializers.Serializer):
    pai_codigo = serializers.IntegerField()
    nome = serializers.CharField(allow_blank=True)


class AdminStateSerializer(serializers.Serializer):
    est_codigo = serializers.IntegerField()
    pai_codigo = serializers.IntegerField()
    nome = serializers.CharField(allow_blank=True)


class AdminStateCatalogSerializer(serializers.Serializer):
    id = serializers.CharField()
    est_codigo = serializers.IntegerField()
    pai_codigo = serializers.IntegerField()
    nome = serializers.CharField(allow_blank=True)
    pais_nome = serializers.CharField(allow_blank=True)


class PaginatedStateCatalogSerializer(serializers.Serializer):
    items = AdminStateCatalogSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class PaginatedUsersSerializer(serializers.Serializer):
    items = AdminUserSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class CreateAdminUserRequestSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.EmailField(required=False, allow_blank=True, default="")
    groups = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=list,
    )
    require_password_change = serializers.BooleanField(required=False, default=True)


class UpdateAdminUserRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    is_active = serializers.BooleanField(required=False)
    is_superuser = serializers.BooleanField(required=False)
    emp_codigo = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    pes_numero = serializers.IntegerField(required=False, allow_null=True, min_value=1)


class SetUserGroupsRequestSerializer(serializers.Serializer):
    groups = serializers.ListField(child=serializers.CharField())


class SetUserProductPermissionsRequestSerializer(serializers.Serializer):
    permissions = serializers.ListField(child=serializers.CharField())


class SetUserPasswordRequestSerializer(serializers.Serializer):
    password = serializers.CharField(required=False, allow_blank=True)


class ResetPasswordResponseSerializer(serializers.Serializer):
    temporary_password = serializers.CharField()


def serialize_admin_user(dto: AdminUserOutputDTO) -> dict[str, object]:
    return AdminUserSerializer(
        {
            "id": dto.id,
            "username": dto.username,
            "email": dto.email,
            "first_name": dto.first_name,
            "last_name": dto.last_name,
            "is_active": dto.is_active,
            "is_superuser": dto.is_superuser,
            "groups": dto.groups,
            "product_permissions": dto.product_permissions,
            "usu_chapa": dto.usu_chapa,
            "emp_codigo": dto.emp_codigo,
            "pes_numero": dto.pes_numero,
            "last_login": dto.last_login,
            "date_joined": dto.date_joined,
        }
    ).data


def serialize_paginated_users(dto: PaginatedUsersOutputDTO) -> dict[str, object]:
    return PaginatedUsersSerializer(
        {
            "items": [serialize_admin_user(item) for item in dto.items],
            "total": dto.total,
            "page": dto.page,
            "page_size": dto.page_size,
        }
    ).data


def serialize_groups(groups: list[AdminGroupOutputDTO]) -> list[dict[str, str]]:
    return AdminGroupSerializer(
        [{"name": group.name} for group in groups], many=True
    ).data


def serialize_product_permissions(
    permissions: list[AdminProductPermissionOutputDTO],
) -> list[dict[str, str]]:
    return AdminProductPermissionSerializer(
        [
            {
                "value": permission.value,
                "app_label": permission.app_label,
                "model": permission.model,
                "codename": permission.codename,
                "name": permission.name,
            }
            for permission in permissions
        ],
        many=True,
    ).data
