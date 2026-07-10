"""Create user admin use case."""

from apps.users.application.dtos.admin_user_input_dto import CreateUserAdminInputDTO
from apps.users.application.dtos.admin_user_output_dto import AdminUserOutputDTO
from apps.users.application.mappers.admin_user_mapper import to_admin_user_dto
from apps.users.domain.exceptions.auth_exceptions import (
    EmptyCredentialsError,
    InvalidUsernameError,
    UserAlreadyExistsError,
)
from apps.users.domain.repositories.oracle_user_repository import OracleUserRepository
from apps.users.domain.repositories.user_admin_repository import UserAdminRepository
from apps.users.domain.repositories.user_security_repository import (
    UserSecurityRepository,
)
from apps.users.domain.validation.username_rules import validate_oracle_username


class CreateUserAdminUseCase:
    def __init__(
        self,
        repository: UserAdminRepository,
        user_repository: OracleUserRepository,
        security_repository: UserSecurityRepository,
    ) -> None:
        self._repository = repository
        self._user_repository = user_repository
        self._security_repository = security_repository

    def execute(self, input_dto: CreateUserAdminInputDTO) -> AdminUserOutputDTO:
        raw_username = input_dto.username.strip()
        password = input_dto.password

        if not raw_username or not password:
            raise EmptyCredentialsError("Username and password are required.")

        try:
            username = validate_oracle_username(raw_username)
        except ValueError as exc:
            raise InvalidUsernameError(str(exc)) from exc

        if self._user_repository.user_exists(username):
            raise UserAlreadyExistsError(f"User '{username}' already exists.")

        record = self._repository.create_user(
            username=username,
            password=password,
            groups=input_dto.groups,
            email=input_dto.email.strip(),
        )
        if input_dto.require_password_change:
            self._security_repository.set_must_change_password(username, True)
        return to_admin_user_dto(record)
