"""Authentication serializers."""

from rest_framework import serializers

from apps.shared.presentation.auth.django_user_resolver import (
    get_groups_for_username,
    get_permissions_for_username,
    is_access_admin_for_username,
    is_branch_manager_for_username,
    resolve_django_user_by_username,
)
from apps.users.domain.repositories.user_profile import UserProfileSnapshot
from apps.users.infrastructure.repositories.user_security_repository_impl import (
    build_user_security_repository,
)


class LoginRequestSerializer(serializers.Serializer[dict[str, str]]):
    username = serializers.CharField()
    password = serializers.CharField()


class RegisterRequestSerializer(serializers.Serializer[dict[str, str]]):
    username = serializers.CharField()
    password = serializers.CharField()


class AuthenticatedUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    is_branch_manager = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    can_manage_access = serializers.BooleanField()
    must_change_password = serializers.BooleanField()
    groups = serializers.ListField(child=serializers.CharField())
    permissions = serializers.ListField(child=serializers.CharField())


class UserProfileSerializer(serializers.Serializer):
    username = serializers.CharField()
    is_superuser = serializers.BooleanField()
    can_manage_access = serializers.BooleanField()
    is_branch_manager = serializers.BooleanField()
    groups = serializers.ListField(child=serializers.CharField())
    usu_chapa = serializers.IntegerField(allow_null=True)
    display_name = serializers.CharField(allow_blank=True)
    email = serializers.CharField(allow_blank=True)
    usu_login = serializers.CharField(allow_blank=True)
    usu_loginweb = serializers.CharField(allow_blank=True)
    usu_sigla = serializers.CharField(allow_blank=True)
    usu_status = serializers.IntegerField(allow_null=True)
    usu_status_label = serializers.CharField(allow_blank=True)
    cc_codigo = serializers.CharField(allow_blank=True)
    cc_nome = serializers.CharField(allow_blank=True)
    origem = serializers.CharField(allow_blank=True)
    pes_numero = serializers.IntegerField(allow_null=True)
    emp_codigo = serializers.IntegerField(allow_null=True)
    emp_nome = serializers.CharField(allow_blank=True)
    emp_reduzido = serializers.CharField(allow_blank=True)
    emp_cidade = serializers.CharField(allow_blank=True)
    emp_estado = serializers.CharField(allow_blank=True)
    is_funcionario = serializers.BooleanField()
    fun_chapa = serializers.IntegerField(allow_null=True)
    fun_apelido = serializers.CharField(allow_blank=True)
    fun_cargo = serializers.CharField(allow_blank=True)
    fun_ativo = serializers.CharField(allow_blank=True)
    fun_ativo_label = serializers.CharField(allow_blank=True)
    fun_dt_adm = serializers.DateField(allow_null=True)
    fun_ramal = serializers.IntegerField(allow_null=True)
    fun_unidade = serializers.CharField(allow_blank=True)
    fun_filial = serializers.CharField(allow_blank=True)
    fun_endereco = serializers.CharField(allow_blank=True)
    fun_cidade = serializers.CharField(allow_blank=True)
    fun_uf = serializers.CharField(allow_blank=True)
    fun_bairro = serializers.CharField(allow_blank=True)
    fun_cep = serializers.CharField(allow_blank=True)


class ChangePasswordRequestSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=False, allow_blank=True)
    new_password = serializers.CharField()


def build_authenticated_user_payload(
    username: str,
) -> dict[str, str | bool | list[str]]:
    django_user = resolve_django_user_by_username(username)
    return {
        "username": username,
        "is_branch_manager": is_branch_manager_for_username(username),
        "is_superuser": django_user.is_superuser if django_user else False,
        "can_manage_access": is_access_admin_for_username(username),
        "must_change_password": build_user_security_repository().must_change_password(
            username
        ),
        "groups": get_groups_for_username(username),
        "permissions": get_permissions_for_username(username),
    }


def build_user_profile_payload(dto: UserProfileSnapshot) -> dict:
    return {
        "username": dto.username,
        "is_superuser": dto.is_superuser,
        "can_manage_access": dto.can_manage_access,
        "is_branch_manager": dto.is_branch_manager,
        "groups": dto.groups,
        "usu_chapa": dto.usu_chapa,
        "display_name": dto.display_name,
        "email": dto.email,
        "usu_login": dto.usu_login,
        "usu_loginweb": dto.usu_loginweb,
        "usu_sigla": dto.usu_sigla,
        "usu_status": dto.usu_status,
        "usu_status_label": dto.usu_status_label,
        "cc_codigo": dto.cc_codigo,
        "cc_nome": dto.cc_nome,
        "origem": dto.origem,
        "pes_numero": dto.pes_numero,
        "emp_codigo": dto.emp_codigo,
        "emp_nome": dto.emp_nome,
        "emp_reduzido": dto.emp_reduzido,
        "emp_cidade": dto.emp_cidade,
        "emp_estado": dto.emp_estado,
        "is_funcionario": dto.is_funcionario,
        "fun_chapa": dto.fun_chapa,
        "fun_apelido": dto.fun_apelido,
        "fun_cargo": dto.fun_cargo,
        "fun_ativo": dto.fun_ativo,
        "fun_ativo_label": dto.fun_ativo_label,
        "fun_dt_adm": dto.fun_dt_adm,
        "fun_ramal": dto.fun_ramal,
        "fun_unidade": dto.fun_unidade,
        "fun_filial": dto.fun_filial,
        "fun_endereco": dto.fun_endereco,
        "fun_cidade": dto.fun_cidade,
        "fun_uf": dto.fun_uf,
        "fun_bairro": dto.fun_bairro,
        "fun_cep": dto.fun_cep,
    }
