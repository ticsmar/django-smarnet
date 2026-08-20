"""Verify an access token and bind it to the calling device."""

from apps.branch_auth.application.dtos.branch_auth_dtos import (
    VerifyTokenInputDTO,
    VerifyTokenOutputDTO,
)
from apps.branch_auth.application.mappers.branch_auth_mapper import (
    to_machine_dto,
    to_owner_dto,
)
from apps.branch_auth.domain.attempt_result import AttemptResult
from apps.branch_auth.domain.exceptions.branch_auth_exceptions import (
    DeviceMismatchError,
    InvalidTokenError,
    MachineRevokedError,
    TokenRevokedError,
    VerifyTokenError,
)
from apps.branch_auth.domain.repositories.access_token_repository import (
    AccessTokenRepository,
    AccessTokenSnapshot,
)
from apps.branch_auth.domain.repositories.machine_repository import (
    MachineRepository,
    MachineSnapshot,
)
from apps.branch_auth.domain.repositories.token_attempt_repository import (
    TokenAttemptRepository,
)
from apps.branch_auth.domain.repositories.transaction_scope import TransactionScope


class VerifyTokenUseCase:
    def __init__(
        self,
        *,
        token_repository: AccessTokenRepository,
        machine_repository: MachineRepository,
        attempt_repository: TokenAttemptRepository,
        transaction: TransactionScope,
    ) -> None:
        self._tokens = token_repository
        self._machines = machine_repository
        self._attempts = attempt_repository
        self._transaction = transaction

    def execute(self, input_dto: VerifyTokenInputDTO) -> VerifyTokenOutputDTO:
        try:
            with self._transaction():
                token, machine = self._resolve(input_dto)
                machine = self._machines.touch(
                    machine_id=machine.machine_id,
                    ip_address=input_dto.ip_address,
                )
                self._record(input_dto, AttemptResult.SUCCESS, token.token_id)
                return VerifyTokenOutputDTO(
                    machine=to_machine_dto(machine),
                    owner=to_owner_dto(token.owner),
                )
        except VerifyTokenError as exc:
            # The denial rolled the transaction back, so the audit row is written
            # outside it. Otherwise every rejected attempt would vanish.
            self._record(input_dto, exc.result, exc.token_id)
            raise

    def _resolve(
        self, input_dto: VerifyTokenInputDTO
    ) -> tuple[AccessTokenSnapshot, MachineSnapshot]:
        token = self._tokens.lock_by_raw_token(input_dto.token)
        if token is None:
            raise InvalidTokenError("Token inválido.")
        if not token.is_active:
            raise TokenRevokedError("Token revogado.", token_id=token.token_id)

        machine = self._machines.find_by_token(token.token_id)
        if machine is None:
            machine = self._machines.bind(
                token_id=token.token_id,
                device_uuid=input_dto.device_uuid,
            )

        if machine.device_uuid != input_dto.device_uuid:
            raise DeviceMismatchError(
                "Token já vinculado a outra máquina.",
                token_id=token.token_id,
            )
        if not machine.is_active:
            raise MachineRevokedError("Máquina revogada.", token_id=token.token_id)
        return token, machine

    def _record(
        self,
        input_dto: VerifyTokenInputDTO,
        result: AttemptResult,
        token_id: int | None,
    ) -> None:
        self._attempts.record(
            token_id=token_id,
            device_uuid=input_dto.device_uuid,
            result=result,
            ip_address=input_dto.ip_address,
        )
