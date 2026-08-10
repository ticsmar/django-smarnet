"""Development settings."""

from .base import *  # noqa: F403
from .base import LOGGING

DEBUG = env.bool("DEBUG", default=True)  # noqa: F405

root = LOGGING["root"]
assert isinstance(root, dict)
root["level"] = "DEBUG"

loggers = LOGGING["loggers"]
assert isinstance(loggers, dict)

django_logger = loggers["django"]
assert isinstance(django_logger, dict)
django_logger["level"] = "DEBUG"

django_request = loggers["django.request"]
assert isinstance(django_request, dict)
django_request["level"] = "DEBUG"

# Optional SQL query logging: set DJANGO_SQL_LOG=1 in .env
if env.bool("DJANGO_SQL_LOG", default=False):  # noqa: F405
    loggers["django.db.backends"] = {
        "handlers": ["console"],
        "level": "DEBUG",
        "propagate": False,
    }
