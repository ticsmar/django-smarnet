"""Pre-pessoa triage repository (discard, register fields, link empresa).

Field writes are Python DML on GERAL.PRE_PESSOA because the flow composes several
statements per request; the empresa link keeps calling GERAL.PCK_USUARIO.SP_IN_EMPRESA,
whose contract is a single save. See ADR 0005.
"""

from django.db import connections, transaction
from django.utils import timezone

from apps.users.domain.exceptions.access_approval_exceptions import (
    PendingRequestNotFoundError,
)
from apps.users.domain.exceptions.pending_request_exceptions import (
    EmpresaLinkFailedError,
)
from apps.users.domain.repositories.pending_request import PendingRequestSnapshot
from apps.users.domain.repositories.pending_request_admin_repository import (
    EmpresaLinkResult,
    PendingRequestFieldChanges,
)
from apps.users.infrastructure.models import (
    Funcionario,
    Pessoa,
    PrePessoa,
    SiaosUsuario,
)
from apps.users.infrastructure.oracle_pck_usuario import (
    PckUsuarioDatabaseError,
    sp_in_empresa,
)
from apps.users.infrastructure.repositories.pending_request_mapper import (
    as_text,
    to_pending_snapshot,
)

_SMAR_DB_ALIAS = "smar"


class PendingRequestAdminRepositoryImpl:
    def get_open(self, ppe_codigo: int) -> PendingRequestSnapshot | None:
        row = (
            PrePessoa.objects.using(_SMAR_DB_ALIAS)
            .filter(ppe_codigo=ppe_codigo, ppe_dt_baixa__isnull=True)
            .first()
        )
        if row is None:
            return None
        return to_pending_snapshot(row)

    def discard(self, ppe_codigo: int) -> None:
        PrePessoa.objects.using(_SMAR_DB_ALIAS).filter(
            ppe_codigo=ppe_codigo, ppe_dt_baixa__isnull=True
        ).update(ppe_dt_baixa=timezone.now())

    def apply_field_changes(
        self, *, ppe_codigo: int, changes: PendingRequestFieldChanges
    ) -> PendingRequestSnapshot:
        with transaction.atomic(using=_SMAR_DB_ALIAS):
            try:
                row = (
                    PrePessoa.objects.using(_SMAR_DB_ALIAS)
                    .select_for_update()
                    .get(ppe_codigo=ppe_codigo)
                )
            except PrePessoa.DoesNotExist as exc:
                raise PendingRequestNotFoundError(
                    f"Solicitacao {ppe_codigo} nao encontrada."
                ) from exc
            update_fields: list[str] = []
            if changes.write_fun_chapa:
                row.fun_chapa = changes.fun_chapa
                update_fields.append("fun_chapa")
            if changes.write_pes_numero:
                row.pes_numero = changes.pes_numero
                update_fields.append("pes_numero")
            if changes.write_emp_codigo:
                row.emp_codigo = changes.emp_codigo
                update_fields.append("emp_codigo")
            if changes.write_tep_codigo:
                row.tep_codigo = changes.tep_codigo
                update_fields.append("tep_codigo")
            if changes.close_request:
                row.ppe_dt_baixa = timezone.now()
                update_fields.append("ppe_dt_baixa")
            if update_fields:
                row.save(using=_SMAR_DB_ALIAS, update_fields=update_fields)
        return to_pending_snapshot(row)

    def person_has_web_user(self, pes_numero: int) -> bool:
        return (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .filter(pes_numero=pes_numero)
            .exclude(usu_loginweb__isnull=True)
            .exclude(usu_loginweb="")
            .exists()
        )

    def activate_person(self, pes_numero: int) -> None:
        Pessoa.objects.using(_SMAR_DB_ALIAS).filter(pes_numero=pes_numero).update(
            pes_ativo=1
        )

    def link_person_to_funcionario(self, *, fun_chapa: int, pes_numero: int) -> None:
        updated = (
            Funcionario.objects.using(_SMAR_DB_ALIAS)
            .filter(fun_chapa=fun_chapa)
            .update(pes_numero=pes_numero)
        )
        if updated:
            return
        # Alguns ambientes ainda nao tem a linha mapeada pelo model; tenta SQL direto.
        with connections[_SMAR_DB_ALIAS].cursor() as cursor:
            cursor.execute(
                """
                UPDATE SIAOS.FUNCIONARIO
                   SET PES_NUMERO = %s
                 WHERE FUN_CHAPA = %s
                """,
                [pes_numero, fun_chapa],
            )

    def link_empresa_from_partner(
        self, *, ppe_codigo: int, partner_codigo: str
    ) -> EmpresaLinkResult:
        try:
            result = sp_in_empresa(
                ppe_codigo=ppe_codigo, partner_codigo=str(partner_codigo)
            )
        except PckUsuarioDatabaseError as exc:
            raise EmpresaLinkFailedError(str(exc)) from exc

        emp_codigo = int(result.emp_codigo)
        row = (
            PrePessoa.objects.using(_SMAR_DB_ALIAS)
            .filter(ppe_codigo=ppe_codigo)
            .first()
        )
        if row is not None:
            # SP_IN_EMPRESA commits on its own, so re-read before deciding whether
            # the link still has to be written from here.
            if row.emp_codigo:
                emp_codigo = int(row.emp_codigo)
            else:
                row.emp_codigo = emp_codigo
                row.save(using=_SMAR_DB_ALIAS, update_fields=["emp_codigo"])

        return EmpresaLinkResult(
            emp_codigo=emp_codigo,
            emp_nome=as_text(result.emp_nome),
            emp_tipo=as_text(result.emp_tipo).upper(),
        )


def build_pending_request_admin_repository() -> PendingRequestAdminRepositoryImpl:
    return PendingRequestAdminRepositoryImpl()
