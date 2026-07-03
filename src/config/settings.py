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
CORS_ALLOWED_ORIGINS: list[str] = env.list("CORS_ALLOWED_ORIGINS", default=[])
# When False (default), POST /api/users/register/ is rejected; admins use POST /api/admin/users/.
ALLOW_PUBLIC_REGISTER = env.bool("ALLOW_PUBLIC_REGISTER", default=False)

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
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "drf_spectacular",
    "shared.presentation",
    "users.infrastructure",
    "users.presentation",
    "branch_auth.infrastructure",
    "branch_auth.presentation",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "users.infrastructure.middleware.smar_database_middleware.SmarDatabaseMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
            ],
        },
    },
]

STATIC_URL = "static/"

CORS_ALLOW_CREDENTIALS = True

LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "auth.User"

SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "shared.presentation.auth.session_authentication.OracleSessionAuthentication",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "EXCEPTION_HANDLER": "config.drf.exception_handler",
    "DEFAULT_THROTTLE_RATES": {
        "verify-token": "60/min",
    },
}

SPECTACULAR_SETTINGS = {
    "TITLE": "ERP API",
    "DESCRIPTION": "Modular monolith ERP REST API",
    "VERSION": "0.1.0",
    "SERVE_INCLUDE_SCHEMA": False,
}
