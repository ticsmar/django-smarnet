"""Django app configuration for compras presentation layer."""

from django.apps import AppConfig


class ComprasPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.compras.presentation"
    label = "compras_presentation"
