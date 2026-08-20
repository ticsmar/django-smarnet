"""Oracle user import domain exceptions (SIAOS.USUARIO to auth.User)."""

from apps.users.domain.exceptions.admin_exceptions import AdminError


class OracleUserImportError(AdminError):
    """Base error for importing an existing Oracle user into Django."""


class OracleUserNotFoundError(OracleUserImportError):
    """Raised when no active SIAOS.USUARIO matches the chapa."""


class OracleUserAlreadyImportedError(OracleUserImportError):
    """Raised when a UserSecurityProfile already points at the chapa."""


class OracleUserMissingLoginError(OracleUserImportError):
    """Raised when the Oracle row has neither USU_LOGINWEB nor USU_LOGIN."""


class OracleUserInvalidLoginError(OracleUserImportError):
    """Raised when the Oracle login cannot become a valid Smarnet username."""


class OracleUserUsernameTakenError(OracleUserImportError):
    """Raised when the resulting username already belongs to another auth.User."""


class OracleUserMissingEmailError(OracleUserImportError):
    """Raised when the Oracle row has no USU_EMAIL to send the password to."""


class NotificationFailedError(OracleUserImportError):
    """Raised when the temporary password e-mail could not be queued."""
