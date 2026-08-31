"""Django app configuration for administracao infrastructure layer."""

from django.apps import AppConfig


class CommercialInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.commercial.infrastructure"
    label = "commercial_infrastructure"
