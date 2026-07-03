"""Users API URL configuration."""

from django.urls import path

from users.presentation.views.auth_views import (
    ChangePasswordView,
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
    path(
        "change-password/",
        ChangePasswordView.as_view(),
        name="users-change-password",
    ),
]
