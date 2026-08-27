"""Pre-pessoa approval repository (GERAL.PRE_PESSOA + SIAOS.USUARIO).

Replicates the table writes of GERAL.PCK_USUARIO.SP_IN_USUARIO in Python instead
of calling it. That procedure cannot be reused here: it swallows every failure in
EXCEPTION WHEN OTHERS, nulls the OUT chapa, issues ROLLBACK on the shared session,
writes SMARNET.SENHA in clear text and sends e-mail. See ADR 0005.
"""

from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from django.db.models import Max
from django.utils import timezone

from apps.users.domain.exceptions.access_approval_exceptions import (
    ChapaAllocationError,
    LegacyChapaNotFoundError,
    PendingRequestAlreadyClosedError,
    PendingRequestNotFoundError,
)
from apps.users.domain.repositories.access_approval_repository import (
    ApprovalResult,
    ApproveAccessCommand,
    DjangoUserSnapshot,
    LegacyUserSnapshot,
)
from apps.users.domain.repositories.pending_request import PendingRequestSnapshot
from apps.users.infrastructure.models import (
    Pessoa,
    PrePessoa,
    SiaosUsuario,
    UserSecurityProfile,
)
from apps.users.infrastructure.repositories.pending_request_mapper import (
    as_text,
    to_pending_snapshot,
)

_SMAR_DB_ALIAS = "smar"
_DEFAULT_DB_ALIAS = "default"
# SP_IN_USUARIO allocates from below 60000; chapas at or above that are reserved
# by the 3.01 for other purposes.
_CHAPA_CEILING = 60000
_ALLOCATION_ATTEMPTS = 5

User = get_user_model()


class AccessApprovalRepositoryImpl:
    def get_pending_request(self, ppe_codigo: int) -> PendingRequestSnapshot | None:
        row = (
            PrePessoa.objects.using(_SMAR_DB_ALIAS)
            .filter(ppe_codigo=ppe_codigo)
            .first()
        )
        if row is None:
            return None
        return to_pending_snapshot(row)

    def find_legacy_user(self, usu_chapa: int) -> LegacyUserSnapshot | None:
        row = (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .filter(usu_chapa=usu_chapa)
            .first()
        )
        if row is None:
            return None
        return LegacyUserSnapshot(
            usu_chapa=int(row.usu_chapa),
            usu_loginweb=as_text(row.usu_loginweb),
        )

    def legacy_login_taken(self, username: str) -> bool:
        return (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .filter(usu_loginweb__iexact=username)
            .exists()
        )

    def find_django_user(self, username: str) -> DjangoUserSnapshot | None:
        user = (
            User.objects.filter(username__iexact=username)
            .select_related("security_profile")
            .first()
        )
        if user is None:
            return None
        profile = getattr(user, "security_profile", None)
        return DjangoUserSnapshot(
            user_id=user.pk,
            usu_chapa=None if profile is None else profile.usu_chapa,
        )

    def approve(self, command: ApproveAccessCommand) -> ApprovalResult:
        # smar is the outer block so it commits last. If it fails, the residue is an
        # auth.User without chapa and a still-open PRE_PESSOA, which the caller can
        # retry. Committing Oracle first would instead close the request with no
        # Django user, losing it. See ADR 0005.
        with transaction.atomic(using=_SMAR_DB_ALIAS):
            pending = self._lock_pending(command.ppe_codigo)
            usu_chapa = self._write_legacy_user(command)
            self._close_pending(pending, command, usu_chapa)
            self._sync_pessoa_email(command)

            with transaction.atomic(using=_DEFAULT_DB_ALIAS):
                user_id = self._write_django_user(command, usu_chapa)

        return ApprovalResult(
            ppe_codigo=command.ppe_codigo,
            user_id=user_id,
            username=command.username,
            usu_chapa=usu_chapa,
        )

    def _lock_pending(self, ppe_codigo: int) -> PrePessoa:
        try:
            pending = (
                PrePessoa.objects.using(_SMAR_DB_ALIAS)
                .select_for_update()
                .get(ppe_codigo=ppe_codigo)
            )
        except PrePessoa.DoesNotExist as exc:
            raise PendingRequestNotFoundError(
                f"Solicitacao {ppe_codigo} nao encontrada."
            ) from exc
        # Re-checked under the row lock: two concurrent approvals of the same
        # request must not both write a usuario.
        if pending.ppe_dt_baixa is not None:
            raise PendingRequestAlreadyClosedError(
                f"Solicitacao {ppe_codigo} ja foi baixada."
            )
        return pending

    def _write_legacy_user(self, command: ApproveAccessCommand) -> int:
        if command.chapa.existing_chapa is not None:
            return self._update_legacy_user(command, command.chapa.existing_chapa)
        return self._insert_legacy_user(command)

    def _update_legacy_user(self, command: ApproveAccessCommand, usu_chapa: int) -> int:
        try:
            legacy = (
                SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
                .select_for_update()
                .get(usu_chapa=usu_chapa)
            )
        except SiaosUsuario.DoesNotExist as exc:
            raise LegacyChapaNotFoundError(
                f"Chapa de usuario {usu_chapa} nao encontrada em SIAOS.USUARIO. "
                "Marque 'Criar nova chapa' ou selecione uma chapa existente na lista."
            ) from exc

        _apply_legacy_fields(legacy, command)
        legacy.save(
            using=_SMAR_DB_ALIAS,
            update_fields=[
                "usu_login",
                "usu_nome",
                "usu_loginweb",
                "usu_email",
                "usu_status",
                "pes_numero",
                "emp_codigo",
                "lin_cod",
                "lpr_codigo",
            ],
        )
        return int(legacy.usu_chapa)

    def _insert_legacy_user(self, command: ApproveAccessCommand) -> int:
        preferred = command.chapa.preferred_new_chapa
        for attempt in range(_ALLOCATION_ATTEMPTS):
            candidate: int | None = None
            if attempt == 0 and preferred is not None:
                candidate = preferred if not self._chapa_taken(preferred) else None
            if candidate is None:
                candidate = self._next_chapa()

            legacy = SiaosUsuario(usu_chapa=candidate)
            _apply_legacy_fields(legacy, command)
            try:
                # Savepoint so a lost race rolls back only this insert and the
                # surrounding approval can retry with a fresh number.
                with transaction.atomic(using=_SMAR_DB_ALIAS):
                    legacy.save(using=_SMAR_DB_ALIAS, force_insert=True)
            except IntegrityError:
                continue
            return candidate

        raise ChapaAllocationError(
            "Nao foi possivel alocar uma USU_CHAPA livre; tente novamente."
        )

    def _chapa_taken(self, usu_chapa: int) -> bool:
        return (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .filter(usu_chapa=usu_chapa)
            .exists()
        )

    def _next_chapa(self) -> int:
        # Oracle rejects FOR UPDATE together with an aggregate, so the allocation
        # cannot be locked outright; the caller retries on the unique violation.
        max_value = (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .filter(usu_chapa__lt=_CHAPA_CEILING)
            .aggregate(max_chapa=Max("usu_chapa"))["max_chapa"]
            or 0
        )
        return int(max_value) + 1

    def _close_pending(
        self,
        pending: PrePessoa,
        command: ApproveAccessCommand,
        usu_chapa: int,
    ) -> None:
        pending.ppe_dt_baixa = timezone.now()
        update_fields = ["ppe_dt_baixa"]
        if command.write_pending_fun_chapa:
            pending.fun_chapa = usu_chapa
            update_fields.append("fun_chapa")
        pending.save(using=_SMAR_DB_ALIAS, update_fields=update_fields)

    def _sync_pessoa_email(self, command: ApproveAccessCommand) -> None:
        if not command.email:
            return
        Pessoa.objects.using(_SMAR_DB_ALIAS).filter(
            pes_numero=command.pes_numero
        ).update(pes_email=command.email[:60])

    def _write_django_user(self, command: ApproveAccessCommand, usu_chapa: int) -> int:
        if command.reuse_user_id is not None:
            user = User.objects.get(pk=command.reuse_user_id)
            user.email = command.email
            user.set_password(command.password)
            user.save(update_fields=["email", "password"])
        else:
            user = User.objects.create_user(
                username=command.username,
                password=command.password,
                email=command.email,
            )

        profile, _ = UserSecurityProfile.objects.get_or_create(user=user)
        profile.usu_chapa = usu_chapa
        profile.must_change_password = command.require_password_change
        profile.save(update_fields=["usu_chapa", "must_change_password"])
        return user.pk


def _apply_legacy_fields(legacy: SiaosUsuario, command: ApproveAccessCommand) -> None:
    legacy.usu_login = command.username[:20]
    legacy.usu_nome = (command.nome or command.username)[:60]
    legacy.usu_loginweb = command.username[:20]
    legacy.usu_email = command.email[:50]
    legacy.usu_status = 0
    legacy.pes_numero = command.pes_numero
    legacy.emp_codigo = command.emp_codigo
    legacy.lin_cod = command.lin_cod
    legacy.lpr_codigo = command.lpr_codigo


def build_access_approval_repository() -> AccessApprovalRepositoryImpl:
    return AccessApprovalRepositoryImpl()
