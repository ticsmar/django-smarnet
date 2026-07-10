"""Django app configuration for users infrastructure layer."""

from django.apps import AppConfig


class UsersInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.users.infrastructure"
    label = "users_infrastructure"
