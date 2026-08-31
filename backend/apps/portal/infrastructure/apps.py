"""Django app configuration for portal infrastructure layer."""

from django.apps import AppConfig


class PortalInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.portal.infrastructure"
    label = "portal_infrastructure"
