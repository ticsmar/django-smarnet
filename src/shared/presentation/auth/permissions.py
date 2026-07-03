"""DRF permission classes for Oracle session authentication."""

from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView

from shared.presentation.auth.django_user_resolver import (
    resolve_django_user_from_request,
    user_has_access_admin_access,
)
from shared.presentation.auth.session_user import OracleSessionUser


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
