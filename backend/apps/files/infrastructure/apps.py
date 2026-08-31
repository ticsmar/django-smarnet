"""Django app configuration for arquivos infrastructure layer."""

from django.apps import AppConfig


class FilesInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.files.infrastructure"
    label = "files_infrastructure"
