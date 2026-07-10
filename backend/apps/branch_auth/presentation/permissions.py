from rest_framework.permissions import BasePermission

from apps.shared.presentation.auth.django_user_resolver import (
    resolve_django_user_from_request,
    user_has_branch_manager_access,
)


class IsBranchManager(BasePermission):
    def has_permission(self, request, view):
        django_user = resolve_django_user_from_request(request)
        return user_has_branch_manager_access(django_user)
