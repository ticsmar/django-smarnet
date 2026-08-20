"""Unit tests for ApproveAccessRequestUseCase."""

import pytest

from apps.users.application.dtos.access_approval_dto import (
    ApproveAccessRequestInputDTO,
)
from apps.users.application.use_cases.approve_access_request_use_case import (
    ApproveAccessRequestUseCase,
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
    ApprovalResult,
    ApproveAccessCommand,
    DjangoUserSnapshot,
    LegacyUserSnapshot,
)
from apps.users.domain.repositories.pending_request import PendingRequestSnapshot

_ALLOCATED_CHAPA = 4242
_NEW_USER_ID = 99


class FakeAccessApprovalRepository:
    def __init__(
        self,
        *,
        pending: PendingRequestSnapshot | None = None,
        legacy: dict[int, LegacyUserSnapshot] | None = None,
        legacy_logins: set[str] | None = None,
        django_users: dict[str, DjangoUserSnapshot] | None = None,
    ) -> None:
        self._pending = pending
        self._legacy = legacy or {}
        self._legacy_logins = {name.lower() for name in (legacy_logins or set())}
        self._django_users = {
            name.lower(): snapshot for name, snapshot in (django_users or {}).items()
        }
        self.approved: list[ApproveAccessCommand] = []

    def get_pending_request(self, ppe_codigo: int) -> PendingRequestSnapshot | None:
        if self._pending is None or self._pending.ppe_codigo != ppe_codigo:
            return None
        return self._pending

    def find_legacy_user(self, usu_chapa: int) -> LegacyUserSnapshot | None:
        return self._legacy.get(usu_chapa)

    def legacy_login_taken(self, username: str) -> bool:
        return username.lower() in self._legacy_logins

    def find_django_user(self, username: str) -> DjangoUserSnapshot | None:
        return self._django_users.get(username.lower())

    def approve(self, command: ApproveAccessCommand) -> ApprovalResult:
        self.approved.append(command)
        usu_chapa = (
            command.chapa.existing_chapa
            or command.chapa.preferred_new_chapa
            or _ALLOCATED_CHAPA
        )
        return ApprovalResult(
            ppe_codigo=command.ppe_codigo,
            user_id=command.reuse_user_id or _NEW_USER_ID,
            username=command.username,
            usu_chapa=usu_chapa,
        )


def _pending(**overrides: object) -> PendingRequestSnapshot:
    payload: dict[str, object] = {
        "ppe_codigo": 501,
        "tep_codigo": "C",
        "nome": "Ana Silva",
        "email": "ana@cliente.com",
        "pes_numero": 3001,
        "emp_codigo": 88,
        "fun_chapa": None,
        "lin_cod": 1,
        "closed": False,
    }
    payload.update(overrides)
    return PendingRequestSnapshot(**payload)


def _input(**overrides: object) -> ApproveAccessRequestInputDTO:
    payload: dict[str, object] = {"ppe_codigo": 501, "username": "ana.silva"}
    payload.update(overrides)
    return ApproveAccessRequestInputDTO(**payload)


def _use_case(
    repository: FakeAccessApprovalRepository,
) -> ApproveAccessRequestUseCase:
    return ApproveAccessRequestUseCase(repository)


def test_approve_happy_path_allocates_new_chapa() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending())

    result = _use_case(repository).execute(_input())

    assert result.ppe_codigo == 501
    assert result.user_id == _NEW_USER_ID
    assert result.username == "ana.silva"
    assert result.usu_chapa == _ALLOCATED_CHAPA
    command = repository.approved[0]
    assert command.chapa.existing_chapa is None
    assert command.chapa.preferred_new_chapa is None
    assert command.reuse_user_id is None
    assert command.pes_numero == 3001
    assert command.emp_codigo == 88


def test_approve_generates_temporary_password_when_blank() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending())

    result = _use_case(repository).execute(_input())

    assert len(result.temporary_password) == 12
    assert result.temporary_password.isalnum()
    assert repository.approved[0].password == result.temporary_password


def test_approve_keeps_password_informed_by_the_admin() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending())

    result = _use_case(repository).execute(_input(password="Trocar123"))

    assert result.temporary_password == "Trocar123"


def test_approve_rejects_unknown_request() -> None:
    repository = FakeAccessApprovalRepository(pending=None)

    with pytest.raises(PendingRequestNotFoundError):
        _use_case(repository).execute(_input())

    assert repository.approved == []


def test_approve_rejects_already_closed_request() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending(closed=True))

    with pytest.raises(PendingRequestAlreadyClosedError):
        _use_case(repository).execute(_input())

    assert repository.approved == []


def test_approve_requires_linked_pessoa() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending(pes_numero=None))

    with pytest.raises(PendingRequestIncompleteError):
        _use_case(repository).execute(_input())


@pytest.mark.parametrize("tep", ["C", "F"])
def test_approve_requires_linked_empresa_for_partner_requests(tep: str) -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(tep_codigo=tep, emp_codigo=None)
    )

    with pytest.raises(PendingRequestIncompleteError):
        _use_case(repository).execute(_input())


def test_approve_allows_funcionario_without_empresa() -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(tep_codigo="S", emp_codigo=None)
    )

    _use_case(repository).execute(_input())

    # Legado grava EMP_CODIGO 1 quando a solicitacao nao tem empresa propria.
    assert repository.approved[0].emp_codigo == 1


def test_approve_rejects_blank_username() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending())

    with pytest.raises(InvalidUsernameError):
        _use_case(repository).execute(_input(username="   "))


def test_approve_rejects_login_already_in_siaos_usuario() -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(), legacy_logins={"ANA.SILVA"}
    )

    with pytest.raises(UserAlreadyExistsError):
        _use_case(repository).execute(_input())

    assert repository.approved == []


def test_approve_rejects_django_user_already_linked_to_a_chapa() -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(),
        django_users={"ana.silva": DjangoUserSnapshot(user_id=7, usu_chapa=1234)},
    )

    with pytest.raises(UserAlreadyExistsError):
        _use_case(repository).execute(_input())

    assert repository.approved == []


def test_approve_retry_reuses_django_user_left_by_failed_oracle_commit() -> None:
    """Oracle commits last, so a failure there leaves an auth.User with no chapa.

    That orphan must be reused instead of reported as a duplicate, otherwise the
    request could never be approved again.
    """
    repository = FakeAccessApprovalRepository(
        pending=_pending(),
        django_users={"ana.silva": DjangoUserSnapshot(user_id=7, usu_chapa=None)},
    )

    result = _use_case(repository).execute(_input())

    assert repository.approved[0].reuse_user_id == 7
    assert result.user_id == 7


def test_approve_updates_requested_existing_chapa() -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(),
        legacy={1234: LegacyUserSnapshot(usu_chapa=1234, usu_loginweb="")},
    )

    result = _use_case(repository).execute(_input(fun_chapa=1234))

    assert result.usu_chapa == 1234
    assert repository.approved[0].chapa.existing_chapa == 1234


def test_approve_rejects_chapa_owned_by_another_login() -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(),
        legacy={1234: LegacyUserSnapshot(usu_chapa=1234, usu_loginweb="outro.login")},
    )

    with pytest.raises(LegacyChapaConflictError):
        _use_case(repository).execute(_input(fun_chapa=1234))

    assert repository.approved == []


def test_approve_rejects_requested_chapa_missing_in_siaos_usuario() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending())

    with pytest.raises(LegacyChapaNotFoundError):
        _use_case(repository).execute(_input(fun_chapa=9999))


def test_approve_prefers_rh_chapa_for_new_funcionario_access() -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(tep_codigo="S", fun_chapa=555)
    )

    _use_case(repository).execute(_input(create_new_chapa=True))

    assert repository.approved[0].chapa.preferred_new_chapa == 555


def test_approve_ignores_rh_chapa_when_creating_access_for_partner() -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(tep_codigo="C", fun_chapa=555)
    )

    _use_case(repository).execute(_input(create_new_chapa=True))

    assert repository.approved[0].chapa.preferred_new_chapa is None


def test_approve_treats_pending_fun_chapa_as_rh_chapa_for_funcionario() -> None:
    """TEP=S: FUN_CHAPA da pre-pessoa vem do RH e nao existe em SIAOS.USUARIO."""
    repository = FakeAccessApprovalRepository(
        pending=_pending(tep_codigo="S", fun_chapa=555)
    )

    _use_case(repository).execute(_input())

    assert repository.approved[0].chapa.preferred_new_chapa == 555
    assert repository.approved[0].chapa.existing_chapa is None


def test_approve_reuses_pending_fun_chapa_when_it_is_a_usuario() -> None:
    repository = FakeAccessApprovalRepository(
        pending=_pending(tep_codigo="S", fun_chapa=555),
        legacy={555: LegacyUserSnapshot(usu_chapa=555, usu_loginweb="")},
    )

    _use_case(repository).execute(_input())

    assert repository.approved[0].chapa.existing_chapa == 555


def test_approve_stamps_pending_fun_chapa_only_outside_funcionario() -> None:
    partner_repo = FakeAccessApprovalRepository(pending=_pending(tep_codigo="C"))
    _use_case(partner_repo).execute(_input())
    assert partner_repo.approved[0].write_pending_fun_chapa is True

    # FUN_CHAPA de funcionario pertence ao RH e nao pode ser sobrescrita.
    staff_repo = FakeAccessApprovalRepository(pending=_pending(tep_codigo="S"))
    _use_case(staff_repo).execute(_input())
    assert staff_repo.approved[0].write_pending_fun_chapa is False


def test_approve_email_prefers_request_email_for_funcionario() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending(tep_codigo="S"))

    _use_case(repository).execute(_input(email="novo@smar.com.br"))

    assert repository.approved[0].email == "novo@smar.com.br"


def test_approve_email_prefers_pre_pessoa_email_for_partner() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending(tep_codigo="C"))

    _use_case(repository).execute(_input(email="novo@cliente.com"))

    assert repository.approved[0].email == "ana@cliente.com"


def test_approve_falls_back_to_pending_lin_cod() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending(lin_cod=3))

    _use_case(repository).execute(_input())

    assert repository.approved[0].lin_cod == 3


def test_approve_defaults_lin_cod_when_absent_everywhere() -> None:
    repository = FakeAccessApprovalRepository(pending=_pending(lin_cod=None))

    _use_case(repository).execute(_input())

    assert repository.approved[0].lin_cod == 1
