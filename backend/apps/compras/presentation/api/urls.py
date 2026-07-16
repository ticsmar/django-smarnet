"""Compras recebimento API URL configuration."""

from django.urls import path

from apps.compras.presentation.views.recebimento_views import (
    AtivaFornecedorView,
    ExcluiFornecContatoView,
    GetFornecedorView,
    GetPaisView,
    GravaFornecContatoView,
    GravaFornecedorView,
    InativaFornecedorView,
    ListMsgErrosView,
    ListPaisesView,
)

urlpatterns = [
    path(
        "fornecedores/",
        GravaFornecedorView.as_view(),
        name="compras-grava-fornecedor",
    ),
    path(
        "fornecedores/<int:cod_fornec>/ativar/",
        AtivaFornecedorView.as_view(),
        name="compras-ativa-fornecedor",
    ),
    path(
        "fornecedores/<int:cod_fornec>/inativar/",
        InativaFornecedorView.as_view(),
        name="compras-inativa-fornecedor",
    ),
    path(
        "fornecedores/<int:cod_fornec>/",
        GetFornecedorView.as_view(),
        name="compras-get-fornecedor",
    ),
    path(
        "fornecedor-contatos/",
        GravaFornecContatoView.as_view(),
        name="compras-grava-fornec-contato",
    ),
    path(
        "fornecedor-contatos/<int:cod_contato>/",
        ExcluiFornecContatoView.as_view(),
        name="compras-exclui-fornec-contato",
    ),
    path(
        "msg-erros/",
        ListMsgErrosView.as_view(),
        name="compras-list-msg-erros",
    ),
    path(
        "paises/",
        ListPaisesView.as_view(),
        name="compras-list-paises",
    ),
    path(
        "paises/<int:pai_codigo>/",
        GetPaisView.as_view(),
        name="compras-get-pais",
    ),
]
