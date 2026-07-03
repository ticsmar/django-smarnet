"""Middleware that flags authenticated requests for SMAR database routing."""

from collections.abc import Callable

from django.http import HttpRequest, HttpResponse

from shared.presentation.auth.session_keys import SESSION_AUTHENTICATED

_use_smar: bool = False


def get_use_smar() -> bool:
    return _use_smar


class SmarDatabaseMiddleware:
    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        self._get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        global _use_smar
        previous = _use_smar
        _use_smar = bool(request.session.get(SESSION_AUTHENTICATED, False))
        try:
            return self._get_response(request)
        finally:
            _use_smar = previous
