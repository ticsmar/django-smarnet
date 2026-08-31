"""Django app configuration for administration infrastructure layer."""

from django.apps import AppConfig


class AdministrationInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.administration.infrastructure"
    label = "administration_infrastructure"
