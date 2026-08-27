"""Django app configuration for compras presentation layer."""

from django.apps import AppConfig


class PurchasingPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.purchasing.presentation"
    label = "purchasing_presentation"
