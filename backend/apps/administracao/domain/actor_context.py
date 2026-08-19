"""Actor context value object for Cliente operations."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True, slots=True)
class ActorContext:
    username: str
    usu_chapa: int
    link_emp_codigo: int
    owner_emp_codigo: int


class ActorContextResolver(Protocol):
    def resolve(self, username: str) -> ActorContext:
        """Resolve chapa and empresa for an authenticated username."""
