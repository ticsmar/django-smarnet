"""Domain exception to HTTP status mappings for users API."""

from apps.users.domain.exceptions.access_approval_exceptions import (
    AccessApprovalError,
    ChapaAllocationError,
    LegacyChapaConflictError,
    LegacyChapaNotFoundError,
    PendingRequestAlreadyClosedError,
    PendingRequestIncompleteError,
    PendingRequestNotFoundError,
)
from apps.users.domain.exceptions.access_request_exceptions import (
    AccessRequestError,
    AccessRequestValidationError,
    PendingAccessRequestExistsError,
)
from apps.users.domain.exceptions.admin_exceptions import (
    AdminError,
    GroupNotFoundError,
    RegistrationForbiddenError,
    UserNotFoundError,
)
from apps.users.domain.exceptions.auth_exceptions import (
    AuthError,
    EmptyCredentialsError,
    InvalidCredentialsError,
    InvalidUsernameError,
    NotAuthenticatedError,
    RegistrationFailedError,
    UserAlreadyExistsError,
)
from apps.users.domain.exceptions.oracle_import_exceptions import (
    NotificationFailedError,
    OracleUserAlreadyImportedError,
    OracleUserImportError,
    OracleUserInvalidLoginError,
    OracleUserMissingEmailError,
    OracleUserMissingLoginError,
    OracleUserNotFoundError,
    OracleUserUsernameTakenError,
)
from apps.users.domain.exceptions.pending_request_exceptions import (
    EmpresaFromPartnerNotAllowedError,
    EmpresaLinkFailedError,
    NoFieldsToRegisterError,
    PendingRequestAdminError,
    PendingRequestTypeChangeError,
)

AUTH_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {
    EmptyCredentialsError: (400, None),
    InvalidCredentialsError: (401, "Invalid credentials."),
    InvalidUsernameError: (400, None),
    UserAlreadyExistsError: (409, None),
    RegistrationFailedError: (500, "Registration failed."),
    RegistrationForbiddenError: (403, "Public registration is disabled."),
    NotAuthenticatedError: (401, "Not authenticated."),
    UserNotFoundError: (404, None),
    GroupNotFoundError: (400, None),
    AccessRequestValidationError: (400, None),
    PendingAccessRequestExistsError: (409, None),
    AccessRequestError: (400, None),
    # Approval entries must precede AuthError: the handler matches in insertion
    # order and AdminError (their base) descends from AuthError.
    PendingRequestNotFoundError: (404, None),
    PendingRequestAlreadyClosedError: (409, None),
    PendingRequestIncompleteError: (400, None),
    LegacyChapaNotFoundError: (409, None),
    LegacyChapaConflictError: (409, None),
    ChapaAllocationError: (409, None),
    AccessApprovalError: (400, None),
    NoFieldsToRegisterError: (400, None),
    PendingRequestTypeChangeError: (400, None),
    EmpresaFromPartnerNotAllowedError: (400, None),
    EmpresaLinkFailedError: (400, None),
    PendingRequestAdminError: (400, None),
    OracleUserNotFoundError: (404, None),
    OracleUserAlreadyImportedError: (409, None),
    OracleUserUsernameTakenError: (409, None),
    OracleUserMissingLoginError: (400, None),
    OracleUserInvalidLoginError: (400, None),
    OracleUserMissingEmailError: (400, None),
    NotificationFailedError: (502, None),
    OracleUserImportError: (400, None),
    # AdminError precedes AuthError for the same reason: it is a subclass, so the
    # generic admin failure must not answer 401.
    AdminError: (400, None),
    AuthError: (401, "Not authenticated."),
}
