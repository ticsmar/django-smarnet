"""Django app configuration for compras infrastructure layer."""

from django.apps import AppConfig


class ComprasInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.compras.infrastructure"
    label = "compras_infrastructure"
