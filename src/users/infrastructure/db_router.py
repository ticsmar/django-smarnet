"""Database router that sends authenticated requests to the SMAR alias."""

from django.db import models

from users.infrastructure.middleware.smar_database_middleware import get_use_smar

_DEFAULT_DB_APPS = frozenset({"auth", "contenttypes", "sessions", "admin"})


class SmarDatabaseRouter:
    def _route(self, model: type[models.Model]) -> str:
        if model._meta.app_label in _DEFAULT_DB_APPS:
            return "default"
        if get_use_smar():
            return "smar"
        return "default"

    def db_for_read(
        self,
        model: type[models.Model],
        **hints: object,
    ) -> str | None:
        return self._route(model)

    def db_for_write(
        self,
        model: type[models.Model],
        **hints: object,
    ) -> str | None:
        return self._route(model)

    def allow_relation(
        self,
        obj1: models.Model,
        obj2: models.Model,
        **hints: object,
    ) -> bool | None:
        return None

    def allow_migrate(
        self,
        db: str,
        app_label: str,
        model_name: str | None = None,
        **hints: object,
    ) -> bool | None:
        return db == "default"
