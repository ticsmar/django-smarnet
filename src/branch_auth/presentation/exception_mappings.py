"""Domain exception to HTTP status mappings for branch_auth API."""

BRANCH_AUTH_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {}
