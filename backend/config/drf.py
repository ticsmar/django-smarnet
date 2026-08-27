"""Global DRF configuration helpers."""

from apps.administration.presentation.exception_mappings import (
    ADMINISTRATION_EXCEPTION_STATUS_MAP,
)
from apps.commercial.presentation.exception_mappings import (
    COMMERCIAL_EXCEPTION_STATUS_MAP,
)
from apps.files.presentation.exception_mappings import FILES_EXCEPTION_STATUS_MAP
from apps.portal.presentation.exception_mappings import PORTAL_EXCEPTION_STATUS_MAP
from apps.production.presentation.exception_mappings import (
    PRODUCTION_EXCEPTION_STATUS_MAP,
)
from apps.branch_auth.presentation.exception_mappings import (
    BRANCH_AUTH_EXCEPTION_STATUS_MAP,
)
from apps.purchasing.presentation.exception_mappings import PURCHASING_EXCEPTION_STATUS_MAP
from apps.shared.presentation.exceptions.handler import build_exception_handler
from apps.users.presentation.exception_mappings import AUTH_EXCEPTION_STATUS_MAP

exception_handler = build_exception_handler(
    AUTH_EXCEPTION_STATUS_MAP,
    BRANCH_AUTH_EXCEPTION_STATUS_MAP,
    PURCHASING_EXCEPTION_STATUS_MAP,
    COMMERCIAL_EXCEPTION_STATUS_MAP,
    FILES_EXCEPTION_STATUS_MAP,
    ADMINISTRATION_EXCEPTION_STATUS_MAP,
    PRODUCTION_EXCEPTION_STATUS_MAP,
    PORTAL_EXCEPTION_STATUS_MAP,
)
