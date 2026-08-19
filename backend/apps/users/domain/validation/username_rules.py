"""Oracle username validation rules."""

import re

USERNAME_PATTERN = re.compile(r"^[A-Za-z][A-Za-z0-9_.]{0,149}$")


def validate_oracle_username(username: str) -> str:
    normalized = username.strip()
    if not USERNAME_PATTERN.match(normalized):
        msg = (
            "Username must start with a letter, contain only letters, "
            "digits, underscores, or dots, and be at most 150 characters."
        )
        raise ValueError(msg)
    return normalized


def sanitize_username(seed: str, fallback_code: int) -> str:
    """Coerce free text into a login accepted by USU_LOGINWEB (20 chars)."""
    candidate = re.sub(r"[^A-Za-z0-9_.]+", ".", seed).strip(".")
    if not candidate:
        candidate = f"u{fallback_code}"
    if not candidate[0].isalpha():
        candidate = f"u{candidate}"
    return candidate[:20]
