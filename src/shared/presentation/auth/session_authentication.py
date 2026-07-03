"""DRF authentication backend for Oracle session."""

from __future__ import annotations

from typing import TYPE_CHECKING

from rest_framework.authentication import BaseAuthentication

from shared.presentation.auth.session_keys import (
    SESSION_AUTHENTICATED,
    SESSION_ORACLE_USERNAME,
)
from shared.presentation.auth.session_user import OracleSessionUser

if TYPE_CHECKING:
    from django.contrib.sessions.backends.base import SessionBase
    from rest_framework.request import Request


class OracleSessionAuthentication(BaseAuthentication):
    def authenticate(self, request: Request) -> tuple[OracleSessionUser, None] | None:
        django_request = request._request
        if not hasattr(django_request, "session"):
            return None

        session: SessionBase = django_request.session
        if not session.get(SESSION_AUTHENTICATED):
            return None

        username = session.get(SESSION_ORACLE_USERNAME)
        if not isinstance(username, str) or not username:
            return None

        return OracleSessionUser(username=username), None

    def authenticate_header(self, request: Request) -> str:
        return "Session"
