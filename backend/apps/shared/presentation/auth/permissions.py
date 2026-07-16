"""DRF permission classes for Oracle session authentication."""

from collections.abc import Sequence

from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView

from apps.shared.presentation.auth.django_user_resolver import (
    resolve_django_user_from_request,
    user_has_access_admin_access,
)
from apps.shared.presentation.auth.session_user import OracleSessionUser


class IsOracleAuthenticated(BasePermission):
    def has_permission(self, request: Request, view: APIView) -> bool:
        user = request.user
        if isinstance(user, OracleSessionUser) and user.is_authenticated:
            return True
        raise NotAuthenticated(detail="Not authenticated.")


class IsAccessAdmin(BasePermission):
    def has_permission(self, request: Request, view: APIView) -> bool:
        django_user = resolve_django_user_from_request(request)
        return user_has_access_admin_access(django_user)


class HasDjangoPermission(BasePermission):
    """Enforce Django model permissions declared on the view.

    Views may define:
    - ``required_permissions``: list[str] or dict[HTTP method → list[str]]
    - ``get_required_permissions(request)``: callable returning list[str]
    """

    message = "You do not have permission to perform this action."

    def has_permission(self, request: Request, view: APIView) -> bool:
        django_user = resolve_django_user_from_request(request)
        if django_user is None:
            return False
        if django_user.is_superuser:
            return True

        required = self._resolve_required(request, view)
        if not required:
            return False
        return all(django_user.has_perm(perm) for perm in required)

    def _resolve_required(self, request: Request, view: APIView) -> list[str]:
        resolver = getattr(view, "get_required_permissions", None)
        if callable(resolver):
            return list(resolver(request))

        required = getattr(view, "required_permissions", None)
        if required is None:
            return []
        if isinstance(required, dict):
            value = required.get(request.method, [])
            return list(value)
        if isinstance(required, Sequence) and not isinstance(required, (str, bytes)):
            return list(required)
        return []
