"""Development settings."""

from .base import *  # noqa: F403
from .base import LOGGING

DEBUG = env.bool("DEBUG", default=True)  # noqa: F405


def _logging_mapping(*path: str) -> dict[str, object]:
    current: object = LOGGING
    for key in path:
        if not isinstance(current, dict):
            raise TypeError("LOGGING structure mismatch")
        current = current[key]
    if not isinstance(current, dict):
        raise TypeError("LOGGING structure mismatch")
    return current


_logging_mapping("root")["level"] = "DEBUG"
_logging_mapping("loggers", "django")["level"] = "DEBUG"
_logging_mapping("loggers", "django.request")["level"] = "DEBUG"

# Optional SQL query logging: set DJANGO_SQL_LOG=1 in .env
if env.bool("DJANGO_SQL_LOG", default=False):  # noqa: F405
    _logging_mapping("loggers")["django.db.backends"] = {
        "handlers": ["console"],
        "level": "DEBUG",
        "propagate": False,
    }
