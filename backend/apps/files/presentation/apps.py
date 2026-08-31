"""Django app configuration for arquivos presentation layer."""

from django.apps import AppConfig


class FilesPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.files.presentation"
    label = "files_presentation"
