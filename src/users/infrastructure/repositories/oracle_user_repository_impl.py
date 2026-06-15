"""Application user repository implementation."""

from django.contrib.auth.models import User
from django.db import IntegrityError

from users.domain.exceptions.auth_exceptions import RegistrationFailedError


class OracleUserRepositoryImpl:
    def user_exists(self, username: str) -> bool:
        return User.objects.filter(username__iexact=username).exists()

    def create_user(self, username: str, password: str) -> None:
        try:
            User.objects.create_user(username=username, password=password)
        except IntegrityError as exc:
            raise RegistrationFailedError("Failed to create user.") from exc


def build_oracle_user_repository() -> OracleUserRepositoryImpl:
    return OracleUserRepositoryImpl()
