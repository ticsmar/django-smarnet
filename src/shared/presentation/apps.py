"""Django app configuration for shared presentation layer."""

from django.apps import AppConfig


class SharedPresentationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "shared.presentation"
    label = "shared_presentation"

    def ready(self) -> None:
        import shared.presentation.schema  # noqa: F401
