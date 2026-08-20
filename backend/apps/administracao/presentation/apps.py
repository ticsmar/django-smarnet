"""Django app configuration for administracao presentation layer."""

from django.apps import AppConfig


class AdministracaoPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.administracao.presentation"
    label = "administracao_presentation"
