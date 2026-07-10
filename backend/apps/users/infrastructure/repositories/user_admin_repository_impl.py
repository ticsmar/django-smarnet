"""User admin repository implementation."""

from django.contrib.auth.models import Group, User
from django.db.models import Q

from apps.users.domain.exceptions.admin_exceptions import (
    GroupNotFoundError,
    UserNotFoundError,
)
from apps.users.domain.repositories.user_admin_repository import (
    AdminGroupRecord,
    AdminUserRecord,
    AdminUserUpdate,
    PaginatedUsersResult,
)


def _to_record(user: User) -> AdminUserRecord:
    return AdminUserRecord(
        id=user.id,
        username=user.username,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        groups=list(user.groups.values_list("name", flat=True)),
        last_login=user.last_login,
        date_joined=user.date_joined,
    )


def _resolve_groups(group_names: list[str]) -> list[Group]:
    if not group_names:
        return []
    groups = list(Group.objects.filter(name__in=group_names))
    found = {group.name for group in groups}
    missing = [name for name in group_names if name not in found]
    if missing:
        raise GroupNotFoundError(f"Unknown groups: {', '.join(missing)}")
    return groups


class UserAdminRepositoryImpl:
    def list_users(
        self, *, search: str, page: int, page_size: int
    ) -> PaginatedUsersResult:
        queryset = User.objects.prefetch_related("groups").order_by("username")
        if search:
            term = search.strip()
            queryset = queryset.filter(
                Q(username__icontains=term)
                | Q(email__icontains=term)
                | Q(first_name__icontains=term)
                | Q(last_name__icontains=term)
            )
        total = queryset.count()
        offset = (page - 1) * page_size
        items = [_to_record(user) for user in queryset[offset : offset + page_size]]
        return PaginatedUsersResult(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
        )

    def get_user(self, user_id: int) -> AdminUserRecord:
        user = User.objects.prefetch_related("groups").filter(pk=user_id).first()
        if user is None:
            raise UserNotFoundError(f"User '{user_id}' not found.")
        return _to_record(user)

    def create_user(
        self,
        *,
        username: str,
        password: str,
        groups: list[str],
        email: str = "",
    ) -> AdminUserRecord:
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
        )
        if groups:
            user.groups.set(_resolve_groups(groups))
        user.refresh_from_db()
        return _to_record(user)

    def update_user(self, user_id: int, update: AdminUserUpdate) -> AdminUserRecord:
        user = User.objects.prefetch_related("groups").filter(pk=user_id).first()
        if user is None:
            raise UserNotFoundError(f"User '{user_id}' not found.")

        if update.email is not None:
            user.email = update.email
        if update.first_name is not None:
            user.first_name = update.first_name
        if update.last_name is not None:
            user.last_name = update.last_name
        if update.is_active is not None:
            user.is_active = update.is_active
        if update.is_superuser is not None:
            user.is_superuser = update.is_superuser

        user.save()
        return _to_record(user)

    def set_user_groups(self, user_id: int, groups: list[str]) -> AdminUserRecord:
        user = User.objects.prefetch_related("groups").filter(pk=user_id).first()
        if user is None:
            raise UserNotFoundError(f"User '{user_id}' not found.")
        user.groups.set(_resolve_groups(groups))
        return _to_record(user)

    def set_user_password(self, user_id: int, password: str) -> None:
        user = User.objects.filter(pk=user_id).first()
        if user is None:
            raise UserNotFoundError(f"User '{user_id}' not found.")
        user.set_password(password)
        user.save(update_fields=["password"])

    def list_groups(self) -> list[AdminGroupRecord]:
        return [
            AdminGroupRecord(name=name)
            for name in Group.objects.order_by("name").values_list("name", flat=True)
        ]


def build_user_admin_repository() -> UserAdminRepositoryImpl:
    return UserAdminRepositoryImpl()
