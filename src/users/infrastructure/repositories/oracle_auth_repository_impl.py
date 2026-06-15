"""Application authentication repository implementation."""

from django.contrib.auth import authenticate as django_authenticate


class OracleAuthRepositoryImpl:
    def authenticate(self, username: str, password: str) -> bool:
        return django_authenticate(username=username, password=password) is not None


def build_oracle_auth_repository() -> OracleAuthRepositoryImpl:
    return OracleAuthRepositoryImpl()
