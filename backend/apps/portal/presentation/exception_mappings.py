"""Domain exception to HTTP status mappings for portal API."""

PORTAL_EXCEPTION_STATUS_MAP: dict[type[Exception], tuple[int, str | None]] = {}
