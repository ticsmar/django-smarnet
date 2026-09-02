"""Follow-up API URL configuration."""

from django.urls import path

from apps.followup.presentation.views.recado_views import (
    ClienteNotesView,
    MotivoView,
    RecadoBaixaView,
    RecadoListView,
    RecadoStatusView,
    TipoRecadoView,
)
from apps.followup.presentation.views.sistema_views import (
    SistemaCollectionView,
    SistemaDetailView,
)

urlpatterns = [
    path("sistemas/", SistemaCollectionView.as_view(), name="followup-sistemas"),
    path(
        "sistemas/<int:codigo>/",
        SistemaDetailView.as_view(),
        name="followup-sistema-detail",
    ),
    path("items/", RecadoListView.as_view(), name="followup-items"),
    path(
        "items/<int:pre_codigo>/baixa/",
        RecadoBaixaView.as_view(),
        name="followup-baixa",
    ),
    path("tipos/", TipoRecadoView.as_view(), name="followup-tipos"),
    path("motivos/", MotivoView.as_view(), name="followup-motivos"),
    path("status/", RecadoStatusView.as_view(), name="followup-status"),
    path("cliente-notes/", ClienteNotesView.as_view(), name="followup-cliente-notes"),
]
