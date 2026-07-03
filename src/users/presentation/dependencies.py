"""Composition helpers for presentation layer."""

from users.application.use_cases.change_password_use_case import ChangePasswordUseCase
from users.application.use_cases.create_user_admin_use_case import (
    CreateUserAdminUseCase,
)
from users.application.use_cases.get_current_user_use_case import GetCurrentUserUseCase
from users.application.use_cases.get_user_use_case import GetUserUseCase
from users.application.use_cases.list_groups_use_case import ListGroupsUseCase
from users.application.use_cases.list_users_use_case import ListUsersUseCase
from users.application.use_cases.login_use_case import LoginUseCase
from users.application.use_cases.logout_use_case import LogoutUseCase
from users.application.use_cases.register_use_case import RegisterUseCase
from users.application.use_cases.reset_user_password_use_case import (
    ResetUserPasswordUseCase,
)
from users.application.use_cases.set_user_groups_use_case import SetUserGroupsUseCase
from users.application.use_cases.update_user_use_case import UpdateUserUseCase
from users.infrastructure.repositories.oracle_auth_repository_impl import (
    build_oracle_auth_repository,
)
from users.infrastructure.repositories.oracle_user_repository_impl import (
    build_oracle_user_repository,
)
from users.infrastructure.repositories.user_admin_repository_impl import (
    build_user_admin_repository,
)
from users.infrastructure.repositories.user_security_repository_impl import (
    build_user_security_repository,
)
from users.infrastructure.session.django_auth_session_store import (
    DjangoAuthSessionStore,
)


def build_login_use_case(session: DjangoAuthSessionStore) -> LoginUseCase:
    return LoginUseCase(
        auth_repository=build_oracle_auth_repository(),
        session_port=session,
        user_repository=build_oracle_user_repository(),
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


def build_change_password_use_case() -> ChangePasswordUseCase:
    return ChangePasswordUseCase(security_repository=build_user_security_repository())


def build_list_users_use_case() -> ListUsersUseCase:
    return ListUsersUseCase(repository=build_user_admin_repository())


def build_get_user_use_case() -> GetUserUseCase:
    return GetUserUseCase(repository=build_user_admin_repository())


def build_create_user_admin_use_case() -> CreateUserAdminUseCase:
    return CreateUserAdminUseCase(
        repository=build_user_admin_repository(),
        user_repository=build_oracle_user_repository(),
        security_repository=build_user_security_repository(),
    )


def build_update_user_use_case() -> UpdateUserUseCase:
    return UpdateUserUseCase(repository=build_user_admin_repository())


def build_set_user_groups_use_case() -> SetUserGroupsUseCase:
    return SetUserGroupsUseCase(repository=build_user_admin_repository())


def build_reset_user_password_use_case() -> ResetUserPasswordUseCase:
    return ResetUserPasswordUseCase(
        security_repository=build_user_security_repository(),
    )


def build_list_groups_use_case() -> ListGroupsUseCase:
    return ListGroupsUseCase(repository=build_user_admin_repository())
