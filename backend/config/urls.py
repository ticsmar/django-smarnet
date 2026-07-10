"""Root URL configuration."""

from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/users/", include("apps.users.presentation.api.urls")),
    path("api/admin/", include("apps.users.presentation.api.admin_urls")),
    path("api/branch-auth/", include("apps.branch_auth.presentation.api.urls")),
]
