"""Django app configuration for administracao presentation layer."""

from django.apps import AppConfig


class CommercialPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.commercial.presentation"
    label = "commercial_presentation"
