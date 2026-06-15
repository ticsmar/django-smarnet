"""Root URL configuration."""

from django.urls import include, path

urlpatterns = [
    path("api/users/", include("users.presentation.api.urls")),
]
