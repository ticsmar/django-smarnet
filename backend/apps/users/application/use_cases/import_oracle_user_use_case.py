"""Import an active SIAOS.USUARIO into Django and mail the temporary password."""

from apps.users.application.dtos.pending_request_dto import ImportOracleUserOutputDTO
from apps.users.application.services.temporary_password import (
    generate_temporary_password,
)
from apps.users.domain.exceptions.oracle_import_exceptions import (
    NotificationFailedError,
    OracleUserAlreadyImportedError,
    OracleUserInvalidLoginError,
    OracleUserMissingEmailError,
    OracleUserMissingLoginError,
    OracleUserNotFoundError,
    OracleUserUsernameTakenError,
)
from apps.users.domain.repositories.oracle_user_import_repository import (
    AccessNotificationPort,
    OracleUserImportRepository,
)
from apps.users.domain.validation.username_rules import (
    sanitize_username,
    validate_oracle_username,
)

_FIRST_NAME_MAX_LENGTH = 150


class ImportOracleUserUseCase:
    def __init__(
        self,
        repository: OracleUserImportRepository,
        notifications: AccessNotificationPort,
    ) -> None:
        self._repository = repository
        self._notifications = notifications

    def execute(self, *, usu_chapa: int) -> ImportOracleUserOutputDTO:
        legacy = self._repository.find_active_legacy_user(usu_chapa)
        if legacy is None:
            raise OracleUserNotFoundError("Usuario Oracle ativo nao encontrado.")

        if self._repository.chapa_already_imported(usu_chapa):
            raise OracleUserAlreadyImportedError(
                f"Chapa {usu_chapa} ja foi importada no Smarnet."
            )

        username = _resolve_username(legacy.usu_loginweb, legacy.usu_login, usu_chapa)
        if self._repository.django_username_taken(username):
            raise OracleUserUsernameTakenError(
                f"Username '{username}' ja existe no Django. "
                "Ajuste o usuario existente ou o login Oracle antes de importar."
            )

        if not legacy.usu_email:
            raise OracleUserMissingEmailError(
                "Usuario Oracle sem e-mail. Informe USU_EMAIL antes de importar."
            )

        password = generate_temporary_password()
        first_name = (legacy.usu_nome or username)[:_FIRST_NAME_MAX_LENGTH]
        user_id = self._repository.create_django_user(
            username=username,
            password=password,
            email=legacy.usu_email,
            first_name=first_name,
            usu_chapa=usu_chapa,
        )

        # O usuario ja existe: falha de e-mail vira sucesso parcial, com a senha
        # devolvida ao admin em vez de rollback.
        notification_error = ""
        email_sent = True
        try:
            self._notifications.send_temporary_password(
                email=legacy.usu_email,
                name=first_name,
                username=username,
                password=password,
            )
        except NotificationFailedError as exc:
            email_sent = False
            notification_error = str(exc)

        return ImportOracleUserOutputDTO(
            usu_chapa=usu_chapa,
            username=username,
            email=legacy.usu_email,
            django_user_id=user_id,
            temporary_password=password,
            email_sent=email_sent,
            notification_error=notification_error,
        )


def _resolve_username(loginweb: str, login: str, usu_chapa: int) -> str:
    raw = loginweb or login
    if not raw:
        raise OracleUserMissingLoginError(
            "Usuario Oracle sem USU_LOGINWEB/USU_LOGIN para importar."
        )
    try:
        return validate_oracle_username(sanitize_username(raw, usu_chapa))
    except ValueError as exc:
        raise OracleUserInvalidLoginError(str(exc)) from exc
