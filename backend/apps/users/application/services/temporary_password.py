"""Temporary password generation shared by the access provisioning use cases."""

import secrets
import string

_TEMPORARY_PASSWORD_LENGTH = 12
_PASSWORD_ALPHABET = string.ascii_letters + string.digits


def generate_temporary_password() -> str:
    return "".join(
        secrets.choice(_PASSWORD_ALPHABET) for _ in range(_TEMPORARY_PASSWORD_LENGTH)
    )
