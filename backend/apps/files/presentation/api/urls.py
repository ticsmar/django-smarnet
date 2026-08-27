"""Arquivos API URL configuration."""

from django.urls import path

from apps.files.presentation.views.arquivo_views import (
    ArquivoDownloadView,
    ArquivoFolderView,
    ArquivoHistoricoView,
    ArquivoMoveView,
    ArquivoTrashView,
    ArquivoTreeView,
    ArquivoUploadView,
)
from apps.files.presentation.views.sistema_views import (
    SistemaCollectionView,
    SistemaDetailView,
)

urlpatterns = [
    path("sistemas/", SistemaCollectionView.as_view(), name="arquivos-sistemas"),
    path(
        "sistemas/<int:codigo>/",
        SistemaDetailView.as_view(),
        name="arquivos-sistema-detail",
    ),
    path("tree/", ArquivoTreeView.as_view(), name="arquivos-tree"),
    path("folders/", ArquivoFolderView.as_view(), name="arquivos-folders"),
    path("files/", ArquivoUploadView.as_view(), name="arquivos-files"),
    path(
        "nodes/<int:par_codigo>/move/",
        ArquivoMoveView.as_view(),
        name="arquivos-move",
    ),
    path(
        "nodes/<int:par_codigo>/download/",
        ArquivoDownloadView.as_view(),
        name="arquivos-download",
    ),
    path("nodes/trash/", ArquivoTrashView.as_view(), name="arquivos-trash"),
    path("historico/", ArquivoHistoricoView.as_view(), name="arquivos-historico"),
]
