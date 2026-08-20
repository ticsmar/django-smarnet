"""Access request repository implementation (GERAL.PRE_PESSOA)."""

from apps.users.domain.exceptions.access_request_exceptions import AccessRequestError
from apps.users.domain.repositories.access_request_repository import (
    AccessRequestCreateData,
    AccessRequestRecord,
    CountryRecord,
    StateRecord,
)
from apps.users.infrastructure.models import Estado, PaisNome, PrePessoa
from apps.users.infrastructure.oracle_pck_usuario import (
    PckUsuarioDatabaseError,
    sp_in_pre_pessoa,
)

_SMAR_DB_ALIAS = "smar"
# Defaults used by legado extranet/grava.php (FUS=18, LIN=1).
_DEFAULT_FUS_CODIGO = 18
_DEFAULT_LIN_COD = 1


def _as_text(value: object | None) -> str:
    if value is None:
        return ""
    return str(value).strip()


class AccessRequestRepositoryImpl:
    def has_pending_by_email(self, email: str) -> bool:
        return (
            PrePessoa.objects.using(_SMAR_DB_ALIAS)
            .filter(ppe_email__iexact=email, ppe_dt_baixa__isnull=True)
            .exists()
        )

    def create(self, data: AccessRequestCreateData) -> AccessRequestRecord:
        try:
            ppe_codigo = sp_in_pre_pessoa(
                nome=data.nome,
                email=data.email,
                fus_codigo=_DEFAULT_FUS_CODIGO,
                sexo=None,
                lin_cod=_DEFAULT_LIN_COD,
                endereco=None,
                bairro=None,
                cidade=None,
                est_codigo=None,
                estado=None,
                cep=None,
                pai_codigo=data.pai_codigo,
                tep_codigo=data.tep_codigo,
                emp_nome=data.emp_nome,
                emp_endereco=data.emp_endereco,
                emp_bairro=data.emp_bairro,
                emp_cidade=data.emp_cidade,
                emp_est_codigo=data.emp_est_codigo,
                emp_estado=data.emp_estado,
                emp_cep=data.emp_cep,
                emp_pai_codigo=data.emp_pai_codigo,
                emp_homepage=data.emp_homepage or None,
                motivo=data.motivo,
            )
        except PckUsuarioDatabaseError as exc:
            raise AccessRequestError(str(exc)) from exc

        return AccessRequestRecord(
            ppe_codigo=ppe_codigo,
            tep_codigo=data.tep_codigo,
            email=data.email,
        )

    def list_countries(self, *, language: int) -> list[CountryRecord]:
        rows = (
            PaisNome.objects.using(_SMAR_DB_ALIAS)
            .filter(lin_cod=language)
            .order_by("pno_nome")
        )
        return [
            CountryRecord(pai_codigo=row.pai_codigo, nome=_as_text(row.pno_nome))
            for row in rows
        ]

    def list_states(self, *, pai_codigo: int) -> list[StateRecord]:
        rows = (
            Estado.objects.using(_SMAR_DB_ALIAS)
            .filter(pai_codigo=pai_codigo)
            .order_by("est_nome")
        )
        return [
            StateRecord(
                est_codigo=row.est_codigo,
                pai_codigo=row.pai_codigo,
                nome=_as_text(row.est_nome),
            )
            for row in rows
        ]


def build_access_request_repository() -> AccessRequestRepositoryImpl:
    return AccessRequestRepositoryImpl()
