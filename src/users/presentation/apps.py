"""Django app configuration for users presentation layer."""

from django.apps import AppConfig


class UsersPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "users.presentation"
    label = "users_presentation"
