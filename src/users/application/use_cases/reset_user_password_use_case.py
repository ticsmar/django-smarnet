"""Reset user password use case (admin)."""

from users.application.dtos.admin_user_input_dto import ResetUserPasswordInputDTO
from users.application.dtos.admin_user_output_dto import ResetPasswordOutputDTO
from users.domain.repositories.user_security_repository import UserSecurityRepository


class ResetUserPasswordUseCase:
    def __init__(self, security_repository: UserSecurityRepository) -> None:
        self._security_repository = security_repository

    def execute(self, input_dto: ResetUserPasswordInputDTO) -> ResetPasswordOutputDTO:
        temporary_password = self._security_repository.reset_password(
            input_dto.user_id,
            input_dto.password,
        )
        return ResetPasswordOutputDTO(temporary_password=temporary_password)
