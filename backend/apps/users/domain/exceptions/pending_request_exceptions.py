"""Pre-pessoa triage domain exceptions (discard, register fields, link empresa)."""

from apps.users.domain.exceptions.admin_exceptions import AdminError


class PendingRequestAdminError(AdminError):
    """Base error for the pre-pessoa triage flows."""


class NoFieldsToRegisterError(PendingRequestAdminError):
    """Raised when the register-fields payload carries nothing to write."""


class PendingRequestTypeChangeError(PendingRequestAdminError):
    """Raised when TEP_CODIGO cannot move to the requested value."""


class EmpresaFromPartnerNotAllowedError(PendingRequestAdminError):
    """Raised when linking an empresa from a partner does not apply to the TEP."""


class EmpresaLinkFailedError(PendingRequestAdminError):
    """Raised when SP_IN_EMPRESA rejected the link."""
