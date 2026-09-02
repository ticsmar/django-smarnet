"""Django app configuration for follow-up infrastructure layer."""

from django.apps import AppConfig


class FollowupInfrastructureConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.followup.infrastructure"
    label = "followup_infrastructure"
