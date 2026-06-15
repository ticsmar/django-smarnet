"""Login use case."""

from users.application.dtos.authenticated_user_output_dto import (
    AuthenticatedUserOutputDTO,
)
from users.application.dtos.login_input_dto import LoginInputDTO
from users.application.ports.auth_session_port import AuthSessionPort
from users.domain.exceptions.auth_exceptions import (
    EmptyCredentialsError,
    InvalidCredentialsError,
)
from users.domain.repositories.oracle_auth_repository import OracleAuthRepository


class LoginUseCase:
    def __init__(
        self,
        auth_repository: OracleAuthRepository,
        session_port: AuthSessionPort,
    ) -> None:
        self._auth_repository = auth_repository
        self._session_port = session_port

    def execute(self, input_dto: LoginInputDTO) -> AuthenticatedUserOutputDTO:
        username = input_dto.username.strip()
        password = input_dto.password

        if not username or not password:
            raise EmptyCredentialsError("Username and password are required.")

        if not self._auth_repository.authenticate(username, password):
            raise InvalidCredentialsError("Invalid Oracle credentials.")

        self._session_port.create_session(username)
        return AuthenticatedUserOutputDTO(username=username)
