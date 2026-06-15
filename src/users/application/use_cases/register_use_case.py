"""Register use case."""

from users.application.dtos.authenticated_user_output_dto import (
    AuthenticatedUserOutputDTO,
)
from users.application.dtos.register_input_dto import RegisterInputDTO
from users.application.ports.auth_session_port import AuthSessionPort
from users.domain.exceptions.auth_exceptions import (
    EmptyCredentialsError,
    InvalidUsernameError,
    UserAlreadyExistsError,
)
from users.domain.repositories.oracle_user_repository import OracleUserRepository
from users.domain.validation.username_rules import validate_oracle_username


class RegisterUseCase:
    def __init__(
        self,
        user_repository: OracleUserRepository,
        session_port: AuthSessionPort,
    ) -> None:
        self._user_repository = user_repository
        self._session_port = session_port

    def execute(self, input_dto: RegisterInputDTO) -> AuthenticatedUserOutputDTO:
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

        self._user_repository.create_user(username, password)
        self._session_port.create_session(username)
        return AuthenticatedUserOutputDTO(username=username)
