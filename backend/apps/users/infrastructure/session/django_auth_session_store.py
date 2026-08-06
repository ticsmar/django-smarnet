"""Django session store for authentication."""

from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.contrib.sessions.backends.base import SessionBase
from django.http import HttpRequest

from apps.shared.presentation.auth.session_keys import (
    SESSION_AUTHENTICATED,
    SESSION_ORACLE_USERNAME,
)

# Keep Django Admin (/admin/) on the same principal as the ERP session.
_DJANGO_AUTH_BACKEND = "django.contrib.auth.backends.ModelBackend"


class DjangoAuthSessionStore:
    def __init__(
        self,
        session: SessionBase,
        *,
        request: HttpRequest | None = None,
    ) -> None:
        self._session = session
        self._request = request

    def create_session(self, username: str) -> None:
        if self._request is not None:
            user = User.objects.filter(username__iexact=username).first()
            if user is not None:
                login(self._request, user, backend=_DJANGO_AUTH_BACKEND)
        self._session[SESSION_ORACLE_USERNAME] = username
        self._session[SESSION_AUTHENTICATED] = True

    def clear_session(self) -> None:
        if self._request is not None:
            logout(self._request)
            return
        self._session.pop(SESSION_ORACLE_USERNAME, None)
        self._session.pop(SESSION_AUTHENTICATED, None)

    def get_username(self) -> str | None:
        value = self._session.get(SESSION_ORACLE_USERNAME)
        if isinstance(value, str):
            return value
        return None

    def is_authenticated(self) -> bool:
        return bool(self._session.get(SESSION_AUTHENTICATED, False))
