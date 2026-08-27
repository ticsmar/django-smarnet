"""Django app configuration for production infrastructure layer."""

from django.apps import AppConfig


class ProductionInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.production.infrastructure"
    label = "production_infrastructure"
