"""Approve a pre-pessoa request, creating the Django and SIAOS.USUARIO users."""

from apps.users.application.dtos.access_approval_dto import (
    ApproveAccessRequestInputDTO,
    ApproveAccessRequestOutputDTO,
)
from apps.users.application.services.temporary_password import (
    generate_temporary_password,
)
from apps.users.domain.exceptions.access_approval_exceptions import (
    LegacyChapaConflictError,
    LegacyChapaNotFoundError,
    PendingRequestAlreadyClosedError,
    PendingRequestIncompleteError,
    PendingRequestNotFoundError,
)
from apps.users.domain.exceptions.auth_exceptions import (
    InvalidUsernameError,
    UserAlreadyExistsError,
)
from apps.users.domain.repositories.access_approval_repository import (
    AccessApprovalRepository,
    ApproveAccessCommand,
    ChapaSelection,
    LegacyUserSnapshot,
)
from apps.users.domain.repositories.pending_request import PendingRequestSnapshot
from apps.users.domain.validation.username_rules import (
    sanitize_username,
    validate_oracle_username,
)

_FUNCIONARIO_TEP = "S"
_TEP_REQUIRING_EMPRESA = frozenset({"C", "F"})
_DEFAULT_LIN_COD = 1
_DEFAULT_EMP_CODIGO = 1


def _ensure_chapa_free_for(legacy: LegacyUserSnapshot, username: str) -> None:
    if legacy.usu_loginweb and legacy.usu_loginweb.lower() != username.lower():
        raise LegacyChapaConflictError(
            f"USU_CHAPA {legacy.usu_chapa} already linked to another login "
            f"({legacy.usu_loginweb})."
        )


class ApproveAccessRequestUseCase:
    def __init__(self, repository: AccessApprovalRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: ApproveAccessRequestInputDTO
    ) -> ApproveAccessRequestOutputDTO:
        pending = self._repository.get_pending_request(input_dto.ppe_codigo)
        if pending is None:
            raise PendingRequestNotFoundError(
                f"Solicitacao {input_dto.ppe_codigo} nao encontrada."
            )
        if pending.closed:
            raise PendingRequestAlreadyClosedError(
                f"Solicitacao {input_dto.ppe_codigo} ja foi baixada."
            )
        _require_links(pending)

        username = _resolve_username(input_dto.username, pending)
        reuse_user_id = self._resolve_reusable_user(username)
        chapa = self._resolve_chapa(input_dto, pending, username)
        password = input_dto.password.strip() or generate_temporary_password()

        result = self._repository.approve(
            ApproveAccessCommand(
                ppe_codigo=pending.ppe_codigo,
                username=username,
                password=password,
                email=_resolve_email(input_dto, pending),
                nome=pending.nome,
                pes_numero=pending.pes_numero or 0,
                emp_codigo=pending.emp_codigo or _DEFAULT_EMP_CODIGO,
                lin_cod=_resolve_lin_cod(input_dto, pending),
                lpr_codigo=input_dto.lpr_codigo,
                chapa=chapa,
                require_password_change=input_dto.require_password_change,
                write_pending_fun_chapa=pending.tep_codigo != _FUNCIONARIO_TEP,
                reuse_user_id=reuse_user_id,
            )
        )

        return ApproveAccessRequestOutputDTO(
            ppe_codigo=result.ppe_codigo,
            user_id=result.user_id,
            username=result.username,
            temporary_password=password,
            usu_chapa=result.usu_chapa,
        )

    def _resolve_reusable_user(self, username: str) -> int | None:
        """Return the auth.User a previous failed attempt left behind, if any.

        The Oracle side commits last, so a failure there can leave a Django user
        with no chapa. Rejecting it as a duplicate would make the request
        impossible to approve, so that specific orphan is reused on retry.
        """
        if self._repository.legacy_login_taken(username):
            raise UserAlreadyExistsError(f"Username '{username}' already exists.")

        existing = self._repository.find_django_user(username)
        if existing is None:
            return None
        if existing.usu_chapa is not None:
            raise UserAlreadyExistsError(f"Username '{username}' already exists.")
        return existing.user_id

    def _resolve_chapa(
        self,
        input_dto: ApproveAccessRequestInputDTO,
        pending: PendingRequestSnapshot,
        username: str,
    ) -> ChapaSelection:
        if input_dto.create_new_chapa:
            prefer_rh_chapa = (
                pending.tep_codigo == _FUNCIONARIO_TEP and pending.fun_chapa is not None
            )
            return ChapaSelection(
                preferred_new_chapa=pending.fun_chapa if prefer_rh_chapa else None
            )

        if input_dto.fun_chapa is not None:
            return ChapaSelection(
                existing_chapa=self._validated_chapa(input_dto.fun_chapa, username)
            )

        if not pending.fun_chapa:
            return ChapaSelection()

        candidate = pending.fun_chapa
        legacy = self._repository.find_legacy_user(candidate)
        if legacy is None:
            if pending.tep_codigo == _FUNCIONARIO_TEP:
                # FUN_CHAPA da pre-pessoa e chapa de FUNCIONARIO (RH), nao de USUARIO.
                return ChapaSelection(preferred_new_chapa=candidate)
            raise LegacyChapaNotFoundError(_chapa_missing_message(candidate))

        _ensure_chapa_free_for(legacy, username)
        return ChapaSelection(existing_chapa=candidate)

    def _validated_chapa(self, usu_chapa: int, username: str) -> int:
        legacy = self._repository.find_legacy_user(usu_chapa)
        if legacy is None:
            raise LegacyChapaNotFoundError(_chapa_missing_message(usu_chapa))
        _ensure_chapa_free_for(legacy, username)
        return usu_chapa


def _chapa_missing_message(usu_chapa: int) -> str:
    return (
        f"Chapa de usuario {usu_chapa} nao encontrada em SIAOS.USUARIO. "
        "Marque 'Criar nova chapa' ou selecione uma chapa existente na lista."
    )


def _require_links(pending: PendingRequestSnapshot) -> None:
    if not pending.pes_numero:
        raise PendingRequestIncompleteError(
            "Vincule uma pessoa (PES_NUMERO) antes de aprovar."
        )
    if pending.tep_codigo in _TEP_REQUIRING_EMPRESA and not pending.emp_codigo:
        raise PendingRequestIncompleteError(
            "Vincule uma empresa (EMP_CODIGO) antes de aprovar."
        )


def _resolve_username(raw: str, pending: PendingRequestSnapshot) -> str:
    cleaned = raw.strip()
    if not cleaned:
        raise InvalidUsernameError("Informe o login (username) no passo Usuario.")
    try:
        return validate_oracle_username(sanitize_username(cleaned, pending.ppe_codigo))
    except ValueError as exc:
        raise InvalidUsernameError(str(exc)) from exc


def _resolve_email(
    input_dto: ApproveAccessRequestInputDTO, pending: PendingRequestSnapshot
) -> str:
    requested = input_dto.email.strip()
    if pending.tep_codigo == _FUNCIONARIO_TEP:
        return requested or pending.email
    return pending.email or requested


def _resolve_lin_cod(
    input_dto: ApproveAccessRequestInputDTO, pending: PendingRequestSnapshot
) -> int:
    if input_dto.lin_cod is not None:
        return input_dto.lin_cod
    return pending.lin_cod or _DEFAULT_LIN_COD
