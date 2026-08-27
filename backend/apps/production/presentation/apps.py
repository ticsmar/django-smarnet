"""Django app configuration for production presentation layer."""

from django.apps import AppConfig


class ProductionPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.production.presentation"
    label = "production_presentation"
