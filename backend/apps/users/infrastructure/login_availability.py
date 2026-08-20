"""Login availability queries across auth.User and SIAOS.USUARIO."""

from django.contrib.auth import get_user_model
from django.db.models import Q

from apps.users.infrastructure.models import SiaosUsuario

_SMAR_DB_ALIAS = "smar"

User = get_user_model()


def username_taken(username: str) -> bool:
    return (
        User.objects.filter(username__iexact=username).exists()
        or SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
        .filter(usu_loginweb__iexact=username)
        .exists()
    )


def usernames_taken(usernames: list[str]) -> dict[str, bool]:
    """Batch variant: two queries instead of two per candidate login."""
    if not usernames:
        return {}

    django_filter = Q()
    legacy_filter = Q()
    for username in usernames:
        django_filter |= Q(username__iexact=username)
        legacy_filter |= Q(usu_loginweb__iexact=username)

    taken = {
        str(name).strip().lower()
        for name in User.objects.filter(django_filter).values_list(
            "username", flat=True
        )
    }
    taken |= {
        str(login).strip().lower()
        for login in SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
        .filter(legacy_filter)
        .values_list("usu_loginweb", flat=True)
        if login is not None
    }
    return {username: username.strip().lower() in taken for username in usernames}
