"""Django app configuration for administration presentation layer."""

from django.apps import AppConfig


class AdministrationPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.administration.presentation"
    label = "administration_presentation"
