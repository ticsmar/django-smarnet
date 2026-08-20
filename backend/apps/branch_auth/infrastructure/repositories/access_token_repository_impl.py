"""Access token repository over the branch_auth ORM models."""

from django.contrib.auth.models import User

from apps.branch_auth.domain.repositories.access_token_repository import (
    AccessTokenSnapshot,
    TokenOwnerSnapshot,
)
from apps.branch_auth.infrastructure.models import AccessToken


def _to_owner(user: User) -> TokenOwnerSnapshot:
    return TokenOwnerSnapshot(
        user_id=user.pk,
        name=user.get_full_name() or user.get_username(),
        email=user.email or "",
    )


def _to_snapshot(token: AccessToken) -> AccessTokenSnapshot:
    return AccessTokenSnapshot(
        token_id=token.pk,
        owner=_to_owner(token.owner),
        label=token.label,
        token_prefix=token.token_prefix,
        status=token.status,
        is_active=token.status == AccessToken.Status.ACTIVE,
        created_at=token.created_at,
        revoked_at=token.revoked_at,
    )


class AccessTokenRepositoryImpl:
    def lock_by_raw_token(self, raw_token: str) -> AccessTokenSnapshot | None:
        try:
            token = (
                AccessToken.objects.select_related("owner")
                .select_for_update()
                .get(token_hash=AccessToken.hash_raw_token(raw_token))
            )
        except AccessToken.DoesNotExist:
            return None
        return _to_snapshot(token)

    def find_for_owner(
        self, *, token_id: int, owner_id: int
    ) -> AccessTokenSnapshot | None:
        token = (
            AccessToken.objects.select_related("owner")
            .filter(pk=token_id, owner_id=owner_id)
            .first()
        )
        return None if token is None else _to_snapshot(token)

    def list_for_owner(self, owner_id: int) -> list[AccessTokenSnapshot]:
        rows = (
            AccessToken.objects.select_related("owner")
            .filter(owner_id=owner_id)
            .order_by("-created_at")
        )
        return [_to_snapshot(row) for row in rows]

    def create(self, *, owner_id: int, label: str) -> tuple[AccessTokenSnapshot, str]:
        owner = User.objects.get(pk=owner_id)
        token, raw_token = AccessToken.generate(owner=owner, label=label)
        return _to_snapshot(token), raw_token

    def revoke(self, *, token_id: int, revoked_by_id: int) -> AccessTokenSnapshot:
        token = AccessToken.objects.select_related("owner").get(pk=token_id)
        token.revoke(by_user=User.objects.get(pk=revoked_by_id))
        return _to_snapshot(token)


def build_access_token_repository() -> AccessTokenRepositoryImpl:
    return AccessTokenRepositoryImpl()
