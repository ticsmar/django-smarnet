"""Global DRF configuration helpers."""

from apps.branch_auth.presentation.exception_mappings import (
    BRANCH_AUTH_EXCEPTION_STATUS_MAP,
)
from apps.shared.presentation.exceptions.handler import build_exception_handler
from apps.users.presentation.exception_mappings import AUTH_EXCEPTION_STATUS_MAP

exception_handler = build_exception_handler(
    AUTH_EXCEPTION_STATUS_MAP,
    BRANCH_AUTH_EXCEPTION_STATUS_MAP,
)
