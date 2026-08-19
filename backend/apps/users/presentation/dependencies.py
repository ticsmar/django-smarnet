"""Composition helpers for presentation layer."""

from apps.users.application.use_cases.approve_access_request_use_case import (
    ApproveAccessRequestUseCase,
)
from apps.users.application.use_cases.change_password_use_case import (
    ChangePasswordUseCase,
)
from apps.users.application.use_cases.create_access_request_use_case import (
    CreateAccessRequestUseCase,
)
from apps.users.application.use_cases.create_empresa_from_partner_use_case import (
    CreateEmpresaFromPartnerUseCase,
)
from apps.users.application.use_cases.create_user_admin_use_case import (
    CreateUserAdminUseCase,
)
from apps.users.application.use_cases.discard_access_request_use_case import (
    DiscardAccessRequestUseCase,
)
from apps.users.application.use_cases.get_current_user_use_case import (
    GetCurrentUserUseCase,
)
from apps.users.application.use_cases.get_user_profile_use_case import (
    GetUserProfileUseCase,
)
from apps.users.application.use_cases.get_user_use_case import GetUserUseCase
from apps.users.application.use_cases.import_oracle_user_use_case import (
    ImportOracleUserUseCase,
)
from apps.users.application.use_cases.list_access_request_catalog_use_case import (
    ListAccessRequestCountriesUseCase,
    ListAccessRequestStatesUseCase,
)
from apps.users.application.use_cases.list_groups_use_case import ListGroupsUseCase
from apps.users.application.use_cases.list_product_permissions_use_case import (
    ListProductPermissionsUseCase,
)
from apps.users.application.use_cases.list_users_use_case import ListUsersUseCase
from apps.users.application.use_cases.login_use_case import LoginUseCase
from apps.users.application.use_cases.logout_use_case import LogoutUseCase
from apps.users.application.use_cases.register_access_request_fields_use_case import (
    RegisterAccessRequestFieldsUseCase,
)
from apps.users.application.use_cases.register_use_case import RegisterUseCase
from apps.users.application.use_cases.reset_user_password_use_case import (
    ResetUserPasswordUseCase,
)
from apps.users.application.use_cases.set_user_groups_use_case import (
    SetUserGroupsUseCase,
)
from apps.users.application.use_cases.set_user_product_permissions_use_case import (
    SetUserProductPermissionsUseCase,
)
from apps.users.application.use_cases.update_user_use_case import UpdateUserUseCase
from apps.users.infrastructure.repositories.access_approval_repository_impl import (
    build_access_approval_repository,
)
from apps.users.infrastructure.repositories.access_request_repository_impl import (
    build_access_request_repository,
)
from apps.users.infrastructure.repositories.oracle_auth_repository_impl import (
    build_oracle_auth_repository,
)
from apps.users.infrastructure.repositories.oracle_user_import_repository_impl import (
    build_access_notification_adapter,
    build_oracle_user_import_repository,
)
from apps.users.infrastructure.repositories.oracle_user_repository_impl import (
    build_oracle_user_repository,
)
from apps.users.infrastructure.repositories.pending_request_repository_impl import (
    build_pending_request_admin_repository,
)
from apps.users.infrastructure.repositories.user_admin_repository_impl import (
    build_user_admin_repository,
)
from apps.users.infrastructure.repositories.user_profile_repository_impl import (
    build_user_profile_repository,
)
from apps.users.infrastructure.repositories.user_security_repository_impl import (
    build_user_security_repository,
)
from apps.users.infrastructure.session.django_auth_session_store import (
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


def build_get_user_profile_use_case(
    session: DjangoAuthSessionStore,
) -> GetUserProfileUseCase:
    return GetUserProfileUseCase(
        session_port=session,
        profile_repository=build_user_profile_repository(),
    )


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


def build_set_user_product_permissions_use_case() -> SetUserProductPermissionsUseCase:
    return SetUserProductPermissionsUseCase(repository=build_user_admin_repository())


def build_reset_user_password_use_case() -> ResetUserPasswordUseCase:
    return ResetUserPasswordUseCase(
        security_repository=build_user_security_repository(),
    )


def build_list_groups_use_case() -> ListGroupsUseCase:
    return ListGroupsUseCase(repository=build_user_admin_repository())


def build_list_product_permissions_use_case() -> ListProductPermissionsUseCase:
    return ListProductPermissionsUseCase(repository=build_user_admin_repository())


def build_create_access_request_use_case() -> CreateAccessRequestUseCase:
    return CreateAccessRequestUseCase(repository=build_access_request_repository())


def build_list_access_request_countries_use_case() -> ListAccessRequestCountriesUseCase:
    return ListAccessRequestCountriesUseCase(
        repository=build_access_request_repository()
    )


def build_list_access_request_states_use_case() -> ListAccessRequestStatesUseCase:
    return ListAccessRequestStatesUseCase(repository=build_access_request_repository())


def build_approve_access_request_use_case() -> ApproveAccessRequestUseCase:
    return ApproveAccessRequestUseCase(repository=build_access_approval_repository())


def build_discard_access_request_use_case() -> DiscardAccessRequestUseCase:
    return DiscardAccessRequestUseCase(
        repository=build_pending_request_admin_repository()
    )


def build_register_access_request_fields_use_case() -> (
    RegisterAccessRequestFieldsUseCase
):
    return RegisterAccessRequestFieldsUseCase(
        repository=build_pending_request_admin_repository()
    )


def build_create_empresa_from_partner_use_case() -> CreateEmpresaFromPartnerUseCase:
    return CreateEmpresaFromPartnerUseCase(
        repository=build_pending_request_admin_repository()
    )


def build_import_oracle_user_use_case() -> ImportOracleUserUseCase:
    return ImportOracleUserUseCase(
        repository=build_oracle_user_import_repository(),
        notifications=build_access_notification_adapter(),
    )
