"""Import an active SIAOS.USUARIO into Django (auth.User + UserSecurityProfile)."""

from django.contrib.auth import get_user_model
from django.db import transaction

from apps.users.domain.exceptions.oracle_import_exceptions import (
    NotificationFailedError,
)
from apps.users.domain.repositories.oracle_user_import_repository import (
    LegacyUserProfile,
)
from apps.users.infrastructure.models import SiaosUsuario, UserSecurityProfile
from apps.users.infrastructure.oracle_dqanet import DqanetDatabaseError, sp_in_email
from apps.users.infrastructure.repositories.pending_request_mapper import as_text

_SMAR_DB_ALIAS = "smar"
_ACTIVE_STATUS = 0
_SENDER = "smarnet@smar.com.br"
_SUBJECT = "Acesso Smarnet - senha provisoria"

User = get_user_model()


class OracleUserImportRepositoryImpl:
    def find_active_legacy_user(self, usu_chapa: int) -> LegacyUserProfile | None:
        row = (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .filter(usu_chapa=usu_chapa, usu_status=_ACTIVE_STATUS)
            .first()
        )
        if row is None:
            return None
        return LegacyUserProfile(
            usu_chapa=int(row.usu_chapa),
            usu_login=as_text(row.usu_login),
            usu_loginweb=as_text(row.usu_loginweb),
            usu_nome=as_text(row.usu_nome),
            usu_email=as_text(row.usu_email),
        )

    def chapa_already_imported(self, usu_chapa: int) -> bool:
        return UserSecurityProfile.objects.filter(usu_chapa=usu_chapa).exists()

    def django_username_taken(self, username: str) -> bool:
        return User.objects.filter(username__iexact=username).exists()

    def create_django_user(
        self,
        *,
        username: str,
        password: str,
        email: str,
        first_name: str,
        usu_chapa: int,
    ) -> int:
        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                first_name=first_name,
            )
            profile, _ = UserSecurityProfile.objects.get_or_create(user=user)
            profile.usu_chapa = usu_chapa
            profile.must_change_password = True
            profile.save(update_fields=["usu_chapa", "must_change_password"])
        return int(user.pk)


class LegacyEmailNotificationAdapter:
    """Queues the credentials e-mail on the 3.0 queue (PCK_DQANET.SP_IN_EMAIL)."""

    def send_temporary_password(
        self, *, email: str, name: str, username: str, password: str
    ) -> None:
        try:
            sp_in_email(
                de=_SENDER,
                para=email,
                assunto=_SUBJECT,
                conteudo=(
                    f"Ola {name},\n\n"
                    "Seu acesso ao Smarnet foi criado a partir do cadastro Oracle.\n\n"
                    f"Usuario: {username}\n"
                    f"Senha provisoria: {password}\n\n"
                    "No primeiro acesso sera solicitado o cadastro de nova senha.\n\n"
                    "Atenciosamente,\n"
                    "Smarnet"
                ),
            )
        except DqanetDatabaseError as exc:
            raise NotificationFailedError(str(exc)) from exc


def build_oracle_user_import_repository() -> OracleUserImportRepositoryImpl:
    return OracleUserImportRepositoryImpl()


def build_access_notification_adapter() -> LegacyEmailNotificationAdapter:
    return LegacyEmailNotificationAdapter()
