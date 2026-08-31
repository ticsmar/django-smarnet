"""Django app configuration for compras infrastructure layer."""

from django.apps import AppConfig


class PurchasingInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.purchasing.infrastructure"
    label = "purchasing_infrastructure"
