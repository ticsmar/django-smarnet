"""Django settings for the ERP project."""

from pathlib import Path

import environ
import oracledb

BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BASE_DIR.parent

env = environ.Env()
environ.Env.read_env(PROJECT_ROOT / ".env")

SECRET_KEY = env("SECRET_KEY", default="django-insecure-dev-only-change-in-production")
DEBUG = env.bool("DEBUG", default=True)
ALLOWED_HOSTS: list[str] = env.list("ALLOWED_HOSTS", default=["localhost", "127.0.0.1"])

ORACLE_HOST = env("ORACLE_HOST", default="localhost")
ORACLE_PORT = env.int("ORACLE_PORT", default=1521)
ORACLE_SERVICE_NAME = env("ORACLE_SERVICE_NAME", default="ORCL")
ORACLE_CLIENT_PATH = env("ORACLE_CLIENT_PATH", default="")

if ORACLE_CLIENT_PATH:
    oracledb.init_oracle_client(lib_dir=ORACLE_CLIENT_PATH)

ORACLE_USER = env("ORACLE_USER", default="")
ORACLE_PASSWORD = env("ORACLE_PASSWORD", default="")
ORACLE_SMAR_USER = env("ORACLE_SMAR_USER", default="")
ORACLE_SMAR_PASSWORD = env("ORACLE_SMAR_PASSWORD", default="")

_oracle_base = {
    "ENGINE": "django.db.backends.oracle",
    "NAME": ORACLE_SERVICE_NAME,
    "HOST": ORACLE_HOST,
    "PORT": str(ORACLE_PORT),
}

DATABASES = {
    "default": {
        **_oracle_base,
        "USER": ORACLE_USER,
        "PASSWORD": ORACLE_PASSWORD,
    },
    "smar": {
        **_oracle_base,
        "USER": ORACLE_SMAR_USER,
        "PASSWORD": ORACLE_SMAR_PASSWORD,
    },
}

DATABASE_ROUTERS = ["users.infrastructure.db_router.SmarDatabaseRouter"]

INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "rest_framework",
    "users.presentation",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "users.infrastructure.middleware.smar_database_middleware.SmarDatabaseMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}
