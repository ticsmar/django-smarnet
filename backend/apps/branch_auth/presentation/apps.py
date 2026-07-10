"""Django app configuration for branch_auth presentation layer."""

from django.apps import AppConfig


class BranchAuthPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.branch_auth.presentation"
    label = "branch_auth_presentation"
