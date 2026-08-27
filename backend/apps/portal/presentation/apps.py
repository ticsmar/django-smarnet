"""Django app configuration for portal presentation layer."""

from django.apps import AppConfig


class PortalPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.portal.presentation"
    label = "portal_presentation"
