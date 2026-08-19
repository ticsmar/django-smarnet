"""Administracao API URL configuration."""

from django.urls import path

from apps.administracao.presentation.views.cliente_views import (
    ClienteCnpjConsultaView,
    ClienteCollectionView,
    ClienteDetailView,
    ClienteDocumentoLookupView,
    ClienteEstadosView,
    ClienteFromFuncionarioView,
    ClienteFuncionarioConsultaView,
    ClienteOrigensView,
    ClientePaisesView,
)

urlpatterns = [
    path("clientes/", ClienteCollectionView.as_view(), name="administracao-clientes"),
    path(
        "clientes/documento/",
        ClienteDocumentoLookupView.as_view(),
        name="administracao-cliente-documento",
    ),
    path(
        "clientes/cnpj/",
        ClienteCnpjConsultaView.as_view(),
        name="administracao-cliente-cnpj",
    ),
    path(
        "clientes/funcionario/",
        ClienteFuncionarioConsultaView.as_view(),
        name="administracao-cliente-funcionario",
    ),
    path(
        "clientes/from-funcionario/",
        ClienteFromFuncionarioView.as_view(),
        name="administracao-cliente-from-funcionario",
    ),
    path(
        "clientes/<int:codigo>/",
        ClienteDetailView.as_view(),
        name="administracao-cliente-detail",
    ),
    path(
        "catalogos/paises/",
        ClientePaisesView.as_view(),
        name="administracao-catalogos-paises",
    ),
    path(
        "catalogos/estados/",
        ClienteEstadosView.as_view(),
        name="administracao-catalogos-estados",
    ),
    path(
        "catalogos/origens/",
        ClienteOrigensView.as_view(),
        name="administracao-catalogos-origens",
    ),
]
