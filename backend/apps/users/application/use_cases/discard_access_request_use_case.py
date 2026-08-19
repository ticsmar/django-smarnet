"""Close a pre-pessoa request without creating any user."""

from apps.users.application.dtos.pending_request_dto import (
    DiscardAccessRequestOutputDTO,
)
from apps.users.domain.exceptions.access_approval_exceptions import (
    PendingRequestNotFoundError,
)
from apps.users.domain.repositories.pending_request_admin_repository import (
    PendingRequestAdminRepository,
)

_NOT_FOUND = "Pending request not found or already closed."


class DiscardAccessRequestUseCase:
    def __init__(self, repository: PendingRequestAdminRepository) -> None:
        self._repository = repository

    def execute(self, *, ppe_codigo: int) -> DiscardAccessRequestOutputDTO:
        if self._repository.get_open(ppe_codigo) is None:
            raise PendingRequestNotFoundError(_NOT_FOUND)
        self._repository.discard(ppe_codigo)
        return DiscardAccessRequestOutputDTO(ppe_codigo=ppe_codigo)
