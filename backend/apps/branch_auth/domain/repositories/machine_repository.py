"""Machine repository contract (one machine bound per access token)."""

from collections.abc import Sequence
from dataclasses import dataclass
from datetime import datetime
from typing import Protocol


@dataclass(frozen=True, slots=True)
class MachineSnapshot:
    machine_id: int
    token_id: int
    device_uuid: str
    status: str
    is_active: bool
    registered_at: datetime
    last_access_at: datetime | None


class MachineRepository(Protocol):
    def find_by_token(self, token_id: int) -> MachineSnapshot | None:
        """Return the machine bound to the token, or None when never used."""

    def find_by_tokens(self, token_ids: Sequence[int]) -> dict[int, MachineSnapshot]:
        """Return machines for several tokens at once, keyed by token id."""

    def bind(self, *, token_id: int, device_uuid: str) -> MachineSnapshot:
        """Bind the token to a device on first use.

        Concurrent first uses must resolve to a single machine, so losing the race
        returns the machine the winner created rather than failing.
        """

    def touch(self, *, machine_id: int, ip_address: str | None) -> MachineSnapshot:
        """Stamp the machine with the current access time and IP."""
