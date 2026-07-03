"""Oracle session user principal for DRF request.user."""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class OracleSessionUser:
    username: str

    @property
    def is_authenticated(self) -> bool:
        return True

    @property
    def is_anonymous(self) -> bool:
        return False
