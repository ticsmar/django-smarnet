"""Resolve USU_CHAPA / empresa from Django profile + SIAOS.USUARIO."""

from __future__ import annotations

from dataclasses import dataclass

from django.contrib.auth.models import User

from apps.shared.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)
from apps.users.infrastructure.models import SiaosUsuario, UserSecurityProfile

_SMAR_DB_ALIAS = "smar"


@dataclass(frozen=True)
class IdentitySnapshot:
    usu_chapa: int
    emp_codigo: int


def _profile_chapa(username: str) -> int | None:
    user = User.objects.filter(username__iexact=username).first()
    if user is None:
        return None
    profile = (
        UserSecurityProfile.objects.filter(user_id=user.id).only("usu_chapa").first()
    )
    if profile is None or profile.usu_chapa is None:
        return None
    return int(profile.usu_chapa)


def _legacy_usuario(username: str, usu_chapa: int | None) -> SiaosUsuario | None:
    if usu_chapa is not None:
        row = SiaosUsuario.objects.using(_SMAR_DB_ALIAS).filter(pk=usu_chapa).first()
        if row is not None:
            return row
    return (
        SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
        .filter(usu_loginweb__iexact=username)
        .order_by("usu_chapa")
        .first()
    )


def resolve_usu_chapa(username: str) -> int:
    ensure_smar_client_identifier()
    snapshot = resolve_identity(username)
    return snapshot.usu_chapa


def resolve_identity(username: str) -> IdentitySnapshot:
    ensure_smar_client_identifier()
    chapa = _profile_chapa(username)
    legacy = _legacy_usuario(username, chapa)
    resolved = int(legacy.usu_chapa) if legacy is not None else chapa
    emp = (
        int(legacy.emp_codigo)
        if legacy is not None and legacy.emp_codigo is not None
        else 1
    )
    return IdentitySnapshot(
        usu_chapa=int(resolved) if resolved is not None else 0,
        emp_codigo=emp,
    )
