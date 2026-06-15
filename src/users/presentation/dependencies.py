"""Composition helpers for presentation layer."""

from users.application.use_cases.get_current_user_use_case import GetCurrentUserUseCase
from users.application.use_cases.login_use_case import LoginUseCase
from users.application.use_cases.logout_use_case import LogoutUseCase
from users.application.use_cases.register_use_case import RegisterUseCase
from users.infrastructure.repositories.oracle_auth_repository_impl import (
    build_oracle_auth_repository,
)
from users.infrastructure.repositories.oracle_user_repository_impl import (
    build_oracle_user_repository,
)
from users.infrastructure.session.django_auth_session_store import (
    DjangoAuthSessionStore,
)


def build_login_use_case(session: DjangoAuthSessionStore) -> LoginUseCase:
    return LoginUseCase(
        auth_repository=build_oracle_auth_repository(),
        session_port=session,
    )


def build_logout_use_case(session: DjangoAuthSessionStore) -> LogoutUseCase:
    return LogoutUseCase(session_port=session)


def build_get_current_user_use_case(
    session: DjangoAuthSessionStore,
) -> GetCurrentUserUseCase:
    return GetCurrentUserUseCase(session_port=session)


def build_register_use_case(session: DjangoAuthSessionStore) -> RegisterUseCase:
    return RegisterUseCase(
        user_repository=build_oracle_user_repository(),
        session_port=session,
    )
