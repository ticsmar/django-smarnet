"""Django app configuration for administracao infrastructure layer."""

from django.apps import AppConfig


class AdministracaoInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.administracao.infrastructure"
    label = "administracao_infrastructure"
