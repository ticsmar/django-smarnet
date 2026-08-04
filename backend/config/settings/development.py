"""Development settings."""

from .base import *  # noqa: F403

DEBUG = env.bool("DEBUG", default=True)  # noqa: F405

LOGGING["root"]["level"] = "DEBUG"  # noqa: F405
LOGGING["loggers"]["django"]["level"] = "DEBUG"  # noqa: F405
LOGGING["loggers"]["django.request"]["level"] = "DEBUG"  # noqa: F405

# Optional SQL query logging: set DJANGO_SQL_LOG=1 in .env
if env.bool("DJANGO_SQL_LOG", default=False):  # noqa: F405
    LOGGING["loggers"]["django.db.backends"] = {  # noqa: F405
        "handlers": ["console"],
        "level": "DEBUG",
        "propagate": False,
    }