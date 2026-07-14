"""Testing settings."""

from .base import *  # noqa: F403

DEBUG = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    },
    "smar": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    },
}
