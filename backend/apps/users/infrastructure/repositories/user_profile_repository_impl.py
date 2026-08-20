"""Load unified profile: Django user + SIAOS.USUARIO + FUNCIONARIO + EMPRESA."""

from __future__ import annotations

from typing import TYPE_CHECKING

from apps.shared.presentation.auth.django_user_resolver import (
    get_groups_for_username,
    is_access_admin_for_username,
    is_branch_manager_for_username,
    resolve_django_user_by_username,
)
from apps.users.domain.repositories.user_profile import UserProfileSnapshot
from apps.users.infrastructure.models import (
    CentroCusto,
    Empresa,
    Funcionario,
    SiaosUsuario,
    UserSecurityProfile,
)

if TYPE_CHECKING:
    from django.contrib.auth.models import User

_SMAR_DB_ALIAS = "smar"


def _text(value: object | None) -> str:
    if value is None:
        return ""
    text = str(value).strip()
    return text


def _usu_status_label(status: int | None) -> str:
    if status is None:
        return ""
    # Convenção já usada na importação: 0 = ativo.
    return "Ativo" if status == 0 else "Inativo"


def _is_fun_ativo(flag: str) -> bool:
    return flag.strip().upper() in {"S", "Y", "1"}


def _fun_ativo_label(flag: str) -> str:
    code = flag.strip().upper()
    if _is_fun_ativo(code):
        return "Ativo"
    if code in {"N", "0"}:
        return "Inativo"
    return flag


def _resolve_legacy_usuario(
    username: str, django_user: User | None
) -> SiaosUsuario | None:
    chapa: int | None = None
    if django_user is not None:
        profile = (
            UserSecurityProfile.objects.filter(user_id=django_user.id)
            .only("usu_chapa")
            .first()
        )
        if profile is not None and profile.usu_chapa is not None:
            chapa = int(profile.usu_chapa)

    if chapa is not None:
        by_chapa = SiaosUsuario.objects.using(_SMAR_DB_ALIAS).filter(pk=chapa).first()
        if by_chapa is not None:
            return by_chapa

    return (
        SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
        .filter(usu_loginweb__iexact=username)
        .first()
    )


class UserProfileRepositoryImpl:
    def get_by_username(self, username: str) -> UserProfileSnapshot:
        normalized = username.strip()
        django_user = resolve_django_user_by_username(normalized)
        legacy = _resolve_legacy_usuario(normalized, django_user)

        emp_codigo = legacy.emp_codigo if legacy is not None else None
        empresa = None
        if emp_codigo is not None:
            empresa = (
                Empresa.objects.using(_SMAR_DB_ALIAS)
                .filter(pk=emp_codigo)
                .only(
                    "emp_codigo", "emp_nome", "emp_reduzido", "emp_cidade", "emp_estado"
                )
                .first()
            )

        cc_codigo = _text(legacy.cc_codigo) if legacy is not None else ""
        cc_nome = ""
        if cc_codigo:
            centro = (
                CentroCusto.objects.using(_SMAR_DB_ALIAS)
                .filter(pk=cc_codigo)
                .only("cc_codigo", "cc_nome")
                .first()
            )
            if centro is not None:
                cc_nome = _text(centro.cc_nome)

        funcionario = None
        if legacy is not None:
            candidate = (
                Funcionario.objects.using(_SMAR_DB_ALIAS)
                .filter(pk=legacy.usu_chapa)
                .first()
            )
            # Só expõe funcionário ativo (FUN_ATIVO).
            if candidate is not None and _is_fun_ativo(_text(candidate.fun_ativo)):
                funcionario = candidate
                if not cc_codigo:
                    cc_codigo = _text(funcionario.cc_codigo)
                    if cc_codigo and not cc_nome:
                        centro = (
                            CentroCusto.objects.using(_SMAR_DB_ALIAS)
                            .filter(pk=cc_codigo)
                            .only("cc_nome")
                            .first()
                        )
                        if centro is not None:
                            cc_nome = _text(centro.cc_nome)

        display_name = _text(legacy.usu_nome) if legacy is not None else ""
        if not display_name and funcionario is not None:
            display_name = _text(funcionario.fun_apelido)
        if not display_name:
            display_name = normalized

        email = _text(legacy.usu_email) if legacy is not None else ""
        if not email and django_user is not None:
            email = _text(django_user.email)

        fun_ativo = _text(funcionario.fun_ativo) if funcionario is not None else ""

        return UserProfileSnapshot(
            username=normalized,
            is_superuser=bool(django_user and django_user.is_superuser),
            can_manage_access=is_access_admin_for_username(normalized),
            is_branch_manager=is_branch_manager_for_username(normalized),
            groups=get_groups_for_username(normalized),
            usu_chapa=int(legacy.usu_chapa) if legacy is not None else None,
            display_name=display_name,
            email=email,
            usu_login=_text(legacy.usu_login) if legacy is not None else "",
            usu_loginweb=_text(legacy.usu_loginweb) if legacy is not None else "",
            usu_sigla=_text(legacy.usu_sigla) if legacy is not None else "",
            usu_status=legacy.usu_status if legacy is not None else None,
            usu_status_label=_usu_status_label(
                legacy.usu_status if legacy is not None else None
            ),
            cc_codigo=cc_codigo,
            cc_nome=cc_nome,
            origem=_text(legacy.origem) if legacy is not None else "",
            pes_numero=legacy.pes_numero if legacy is not None else None,
            emp_codigo=int(emp_codigo) if emp_codigo is not None else None,
            emp_nome=_text(empresa.emp_nome) if empresa is not None else "",
            emp_reduzido=_text(empresa.emp_reduzido) if empresa is not None else "",
            emp_cidade=_text(empresa.emp_cidade) if empresa is not None else "",
            emp_estado=_text(empresa.emp_estado) if empresa is not None else "",
            is_funcionario=funcionario is not None,
            fun_chapa=int(funcionario.fun_chapa) if funcionario is not None else None,
            fun_apelido=_text(funcionario.fun_apelido)
            if funcionario is not None
            else "",
            fun_cargo=_text(funcionario.fun_cargo) if funcionario is not None else "",
            fun_ativo=fun_ativo,
            fun_ativo_label=_fun_ativo_label(fun_ativo) if fun_ativo else "",
            fun_dt_adm=funcionario.fun_dt_adm if funcionario is not None else None,
            fun_ramal=funcionario.fun_ramal if funcionario is not None else None,
            fun_unidade=_text(funcionario.fun_unidade)
            if funcionario is not None
            else "",
            fun_filial=_text(funcionario.fun_filial) if funcionario is not None else "",
            fun_endereco=_text(funcionario.fun_endereco)
            if funcionario is not None
            else "",
            fun_cidade=_text(funcionario.fun_cidade) if funcionario is not None else "",
            fun_uf=_text(funcionario.fun_uf) if funcionario is not None else "",
            fun_bairro=_text(funcionario.fun_bairro) if funcionario is not None else "",
            fun_cep=_text(funcionario.fun_cep) if funcionario is not None else "",
        )


def build_user_profile_repository() -> UserProfileRepositoryImpl:
    return UserProfileRepositoryImpl()
