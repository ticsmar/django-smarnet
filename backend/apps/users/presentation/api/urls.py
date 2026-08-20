"""Users API URL configuration."""

from django.urls import path

from apps.users.presentation.views.access_request_views import (
    AccessRequestCountryListView,
    AccessRequestCreateView,
    AccessRequestStateListView,
)
from apps.users.presentation.views.auth_views import (
    ChangePasswordView,
    CurrentUserProfileView,
    CurrentUserView,
    LoginView,
    LogoutView,
    RegisterView,
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="users-login"),
    path("register/", RegisterView.as_view(), name="users-register"),
    path("logout/", LogoutView.as_view(), name="users-logout"),
    path("me/", CurrentUserView.as_view(), name="users-me"),
    path("me/profile/", CurrentUserProfileView.as_view(), name="users-me-profile"),
    path(
        "change-password/",
        ChangePasswordView.as_view(),
        name="users-change-password",
    ),
    path(
        "access-requests/",
        AccessRequestCreateView.as_view(),
        name="users-access-requests",
    ),
    path(
        "catalog/countries/",
        AccessRequestCountryListView.as_view(),
        name="users-catalog-countries",
    ),
    path(
        "catalog/states/",
        AccessRequestStateListView.as_view(),
        name="users-catalog-states",
    ),
]
