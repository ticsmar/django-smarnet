"""Machine repository over the branch_auth ORM models."""

from collections.abc import Sequence

from django.db import IntegrityError, transaction
from django.utils import timezone

from apps.branch_auth.domain.repositories.machine_repository import MachineSnapshot
from apps.branch_auth.infrastructure.models import Machine


def _to_snapshot(machine: Machine) -> MachineSnapshot:
    return MachineSnapshot(
        machine_id=machine.pk,
        token_id=machine.token_id,
        device_uuid=machine.device_uuid,
        status=machine.status,
        is_active=machine.status == Machine.Status.ACTIVE,
        registered_at=machine.registered_at,
        last_access_at=machine.last_access_at,
    )


class MachineRepositoryImpl:
    def find_by_token(self, token_id: int) -> MachineSnapshot | None:
        machine = Machine.objects.filter(token_id=token_id).first()
        return None if machine is None else _to_snapshot(machine)

    def find_by_tokens(self, token_ids: Sequence[int]) -> dict[int, MachineSnapshot]:
        if not token_ids:
            return {}
        rows = Machine.objects.filter(token_id__in=list(token_ids))
        return {row.token_id: _to_snapshot(row) for row in rows}

    def bind(self, *, token_id: int, device_uuid: str) -> MachineSnapshot:
        try:
            # Savepoint: the unique token constraint is the race detector, and
            # without it the surrounding verification transaction would be poisoned.
            with transaction.atomic():
                machine = Machine.objects.create(
                    token_id=token_id, device_uuid=device_uuid
                )
        except IntegrityError:
            machine = Machine.objects.get(token_id=token_id)
        return _to_snapshot(machine)

    def touch(self, *, machine_id: int, ip_address: str | None) -> MachineSnapshot:
        machine = Machine.objects.get(pk=machine_id)
        machine.last_access_at = timezone.now()
        machine.last_access_ip = ip_address
        machine.save(update_fields=["last_access_at", "last_access_ip"])
        return _to_snapshot(machine)


def build_machine_repository() -> MachineRepositoryImpl:
    return MachineRepositoryImpl()
