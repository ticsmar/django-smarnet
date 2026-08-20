"""Resolve the actor context (chapa + empresa) for a Django username.

Never trust ``emp_codigo`` values coming from the client: this function is the
single place that reads ``USER_SECURITY_PROFILE`` and ``SIAOS.USUARIO`` and
derives the effective empresa owner via
:mod:`apps.administracao.domain.services.empresa_ownership`.
"""

from __future__ import annotations

from django.contrib.auth.models import User

from apps.administracao.domain.actor_context import ActorContext
from apps.administracao.domain.services.empresa_ownership import (
    effective_owner_emp_codigo,
)
from apps.users.infrastructure.models import SiaosUsuario, UserSecurityProfile
from apps.users.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_SMAR_DB_ALIAS = "smar"


def _find_legacy_by_chapa(usu_chapa: int) -> SiaosUsuario | None:
    return SiaosUsuario.objects.using(_SMAR_DB_ALIAS).filter(pk=usu_chapa).first()


def _find_legacy_by_loginweb(username: str) -> SiaosUsuario | None:
    return (
        SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
        .filter(usu_loginweb__iexact=username)
        .order_by("usu_chapa")
        .first()
    )


def _get_django_user(username: str) -> User | None:
    return User.objects.filter(username__iexact=username).first()


def _get_profile_chapa(user: User) -> int | None:
    profile = (
        UserSecurityProfile.objects.filter(user_id=user.id).only("usu_chapa").first()
    )
    if profile is None:
        return None
    return profile.usu_chapa


def resolve_actor_context(username: str) -> ActorContext:
    """Build the actor context from Django + SIAOS.USUARIO."""
    ensure_smar_client_identifier()
    usu_chapa: int | None = None
    django_user = _get_django_user(username)
    if django_user is not None:
        usu_chapa = _get_profile_chapa(django_user)

    legacy: SiaosUsuario | None = None
    if usu_chapa is not None:
        legacy = _find_legacy_by_chapa(usu_chapa)
    if legacy is None:
        legacy = _find_legacy_by_loginweb(username)

    if usu_chapa is None and legacy is not None:
        usu_chapa = int(legacy.usu_chapa)

    link_emp_codigo = (
        int(legacy.emp_codigo)
        if legacy is not None and legacy.emp_codigo is not None
        else 1
    )
    owner = effective_owner_emp_codigo(link_emp_codigo)

    return ActorContext(
        username=username,
        usu_chapa=int(usu_chapa) if usu_chapa is not None else 0,
        link_emp_codigo=link_emp_codigo,
        owner_emp_codigo=owner,
    )
