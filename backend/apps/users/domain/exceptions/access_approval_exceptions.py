"""Pre-pessoa approval domain exceptions."""

from apps.users.domain.exceptions.admin_exceptions import AdminError


class AccessApprovalError(AdminError):
    """Base pre-pessoa approval error."""


class PendingRequestNotFoundError(AccessApprovalError):
    """Raised when the PPE_CODIGO does not exist."""


class PendingRequestAlreadyClosedError(AccessApprovalError):
    """Raised when PPE_DT_BAIXA is already set."""


class PendingRequestIncompleteError(AccessApprovalError):
    """Raised when the request still lacks PES_NUMERO or EMP_CODIGO."""


class LegacyChapaNotFoundError(AccessApprovalError):
    """Raised when the requested USU_CHAPA has no SIAOS.USUARIO row."""


class LegacyChapaConflictError(AccessApprovalError):
    """Raised when the target USU_CHAPA already belongs to another login."""


class ChapaAllocationError(AccessApprovalError):
    """Raised when a free USU_CHAPA could not be allocated."""
