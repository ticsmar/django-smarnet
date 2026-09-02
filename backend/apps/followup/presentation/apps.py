"""Django app configuration for followup presentation layer."""

from django.apps import AppConfig


class FollowupPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.followup.presentation"
    label = "followup_presentation"
