"""Root URL configuration."""

from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

admin.site.site_header = "SmarNet - Admin"
admin.site.site_title = "SmarNet - Admin"
admin.site.index_title = "SmarNet - Admin"
from apps.shared.presentation.views.metrics_view import MetricsView

urlpatterns = [
    path("metrics/", MetricsView.as_view(), name="prometheus-metrics"),
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/users/", include("apps.users.presentation.api.urls")),
    path("api/admin/", include("apps.users.presentation.api.admin_urls")),
    path("api/branch-auth/", include("apps.branch_auth.presentation.api.urls")),
    path("api/purchasing/", include("apps.purchasing.presentation.api.urls")),
    path("api/compras/", include("apps.purchasing.presentation.api.urls")),
    path("api/commercial/", include("apps.commercial.presentation.api.urls")),
    path("api/administracao/", include("apps.commercial.presentation.api.urls")),
    path("api/files/", include("apps.files.presentation.api.urls")),
    path("api/arquivos/", include("apps.files.presentation.api.urls")),
    path("api/followup/", include("apps.followup.presentation.api.urls")),
    path("api/recados/", include("apps.followup.presentation.api.urls")),
    path("api/administration/", include("apps.administration.presentation.api.urls")),
    path("api/production/", include("apps.production.presentation.api.urls")),
    path("api/portal/", include("apps.portal.presentation.api.urls")),
]
