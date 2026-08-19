"""Transaction boundary port.

Verification spans three repositories under one row lock, so the boundary has to
be visible to the use case without dragging the ORM into it.
"""

from contextlib import AbstractContextManager
from typing import Protocol


class TransactionScope(Protocol):
    def __call__(self) -> AbstractContextManager[object]:
        """Open a transaction that rolls back when the block raises."""
