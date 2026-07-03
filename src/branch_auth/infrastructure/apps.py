"""Django app configuration for branch_auth infrastructure layer."""

from django.apps import AppConfig


class BranchAuthInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "branch_auth.infrastructure"
    label = "branch_auth_infrastructure"
