"""Middleware that flags authenticated requests for SMAR database routing.

Also stores the application username in a ContextVar so repositories can stamp
Oracle CLIENT_IDENTIFIER on the technical smar connection.
"""

from collections.abc import Callable
from contextvars import ContextVar

from django.http import HttpRequest, HttpResponse

from apps.shared.presentation.auth.session_keys import (
    SESSION_AUTHENTICATED,
    SESSION_ORACLE_USERNAME,
)
from apps.users.infrastructure.oracle_session_context import (
    clear_smar_client_identifier,
    reset_oracle_username,
    set_oracle_username,
)

_use_smar: ContextVar[bool] = ContextVar("use_smar", default=False)


def get_use_smar() -> bool:
    return _use_smar.get()


class SmarDatabaseMiddleware:
    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        self._get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        authenticated = bool(request.session.get(SESSION_AUTHENTICATED, False))
        username = request.session.get(SESSION_ORACLE_USERNAME)
        token = _use_smar.set(authenticated)
        if authenticated and isinstance(username, str) and username.strip():
            set_oracle_username(username.strip())
        else:
            set_oracle_username(None)
        try:
            return self._get_response(request)
        finally:
            clear_smar_client_identifier()
            reset_oracle_username()
            _use_smar.reset(token)
