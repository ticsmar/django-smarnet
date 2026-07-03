"""Admin API URL configuration."""

from django.urls import path

from users.presentation.views.admin_views import (
    AdminGroupListView,
    AdminUserDetailView,
    AdminUserGroupsView,
    AdminUserListCreateView,
    AdminUserSetPasswordView,
)

urlpatterns = [
    path("groups/", AdminGroupListView.as_view(), name="admin-groups"),
    path("users/", AdminUserListCreateView.as_view(), name="admin-users"),
    path("users/<int:pk>/", AdminUserDetailView.as_view(), name="admin-user-detail"),
    path(
        "users/<int:pk>/set-password/",
        AdminUserSetPasswordView.as_view(),
        name="admin-user-set-password",
    ),
    path(
        "users/<int:pk>/groups/",
        AdminUserGroupsView.as_view(),
        name="admin-user-groups",
    ),
]
