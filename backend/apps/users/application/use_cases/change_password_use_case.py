"""Change password use case (authenticated user)."""

from apps.users.application.dtos.change_password_input_dto import ChangePasswordInputDTO
from apps.users.domain.exceptions.auth_exceptions import (
    EmptyCredentialsError,
    InvalidCredentialsError,
)
from apps.users.domain.repositories.user_security_repository import (
    UserSecurityRepository,
)


class ChangePasswordUseCase:
    def __init__(self, security_repository: UserSecurityRepository) -> None:
        self._security_repository = security_repository

    def execute(self, input_dto: ChangePasswordInputDTO) -> None:
        username = input_dto.username.strip()
        new_password = input_dto.new_password
        current_password = input_dto.current_password

        if not username or not new_password:
            raise EmptyCredentialsError("Username and new password are required.")

        must_change = self._security_repository.must_change_password(username)
        if not must_change:
            if not current_password:
                raise EmptyCredentialsError("Current password is required.")
            if not self._security_repository.verify_password(
                username, current_password
            ):
                raise InvalidCredentialsError("Current password is incorrect.")

        self._security_repository.change_password(username, new_password)
