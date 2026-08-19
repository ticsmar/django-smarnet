"""User admin repository implementation."""

from collections.abc import Iterable
from dataclasses import replace

from django.contrib.auth.models import Group, Permission, User
from django.db import DatabaseError
from django.db.models import Prefetch, Q, QuerySet
from django.db.models.functions import Lower

from apps.users.domain.exceptions.admin_exceptions import (
    GroupNotFoundError,
    ProductPermissionNotFoundError,
    UserNotFoundError,
)
from apps.users.domain.repositories.user_admin_repository import (
    AdminGroupRecord,
    AdminProductPermissionRecord,
    AdminUserRecord,
    AdminUserUpdate,
    PaginatedUsersResult,
)
from apps.users.infrastructure.models import (
    Empresa,
    PaisNome,
    Pessoa,
    SiaosUsuario,
    UserSecurityProfile,
)

PRODUCT_PERMISSION_APP_LABELS = (
    "compras_infrastructure",
    "branch_auth_infrastructure",
    "administracao_infrastructure",
)
_SMAR_DB_ALIAS = "smar"
_PRODUCT_PERMISSIONS_CACHE_ATTR = "_product_permissions_cache"


def _permission_value(permission: Permission) -> str:
    return f"{permission.content_type.app_label}.{permission.codename}"


def _product_permissions_queryset() -> QuerySet[Permission]:
    return Permission.objects.select_related("content_type").filter(
        content_type__app_label__in=PRODUCT_PERMISSION_APP_LABELS,
    )


def _as_text(value: object | None) -> str:
    if value is None:
        return ""
    return str(value).strip()


def _list_users_base_queryset() -> QuerySet[User]:
    """Queryset with the joins/prefetches required to build an AdminUserRecord.

    Avoids the N+1 problem in list_users: security_profile via SELECT JOIN,
    groups via prefetch, and product permissions via a filtered Prefetch
    materialised into the ``_product_permissions_cache`` attribute.
    """
    return (
        User.objects.select_related("security_profile")
        .prefetch_related(
            "groups",
            Prefetch(
                "user_permissions",
                queryset=_product_permissions_queryset(),
                to_attr=_PRODUCT_PERMISSIONS_CACHE_ATTR,
            ),
        )
        .order_by("username")
    )


def _safe_security_profile(user: User) -> UserSecurityProfile | None:
    try:
        return user.security_profile
    except (UserSecurityProfile.DoesNotExist, AttributeError, DatabaseError):
        return None


def _find_legacy_usuario(username: str) -> SiaosUsuario | None:
    return (
        SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
        .filter(usu_loginweb__iexact=username)
        .order_by("usu_chapa")
        .first()
    )


def _find_legacy_usuario_by_chapa(usu_chapa: int) -> SiaosUsuario | None:
    return SiaosUsuario.objects.using(_SMAR_DB_ALIAS).filter(pk=usu_chapa).first()


def _batch_legacy_usuarios(users: Iterable[User]) -> dict[int, SiaosUsuario]:
    """Bulk-fetch SIAOS.USUARIO rows for a page of Django users.

    Runs at most two queries against the smar alias: one by ``usu_chapa`` for
    users with a linked profile, one by lowercased ``usu_loginweb`` for the
    remainder. Returns a dict keyed by ``user.id``.
    """
    chapa_by_user: dict[int, int] = {}
    logins_by_user: dict[int, str] = {}

    for user in users:
        profile = _safe_security_profile(user)
        chapa = getattr(profile, "usu_chapa", None)
        if chapa is not None:
            chapa_by_user[user.id] = int(chapa)
        elif user.username:
            logins_by_user[user.id] = user.username.lower()

    legacy_by_user_id: dict[int, SiaosUsuario] = {}

    if chapa_by_user:
        chapas = set(chapa_by_user.values())
        legacy_by_chapa = {
            row.usu_chapa: row
            for row in SiaosUsuario.objects.using(_SMAR_DB_ALIAS).filter(pk__in=chapas)
        }
        for user_id, chapa in chapa_by_user.items():
            legacy = legacy_by_chapa.get(chapa)
            if legacy is not None:
                legacy_by_user_id[user_id] = legacy

    if logins_by_user:
        lower_names = set(logins_by_user.values())
        rows = (
            SiaosUsuario.objects.using(_SMAR_DB_ALIAS)
            .annotate(_login_lower=Lower("usu_loginweb"))
            .filter(_login_lower__in=lower_names)
            .order_by("usu_chapa")
        )
        legacy_by_login: dict[str, SiaosUsuario] = {}
        for row in rows:
            key = _as_text(row.usu_loginweb).lower()
            legacy_by_login.setdefault(key, row)
        for user_id, lower_username in logins_by_user.items():
            legacy = legacy_by_login.get(lower_username)
            if legacy is not None:
                legacy_by_user_id[user_id] = legacy

    return legacy_by_user_id


def _cached_product_permissions(user: User) -> list[Permission]:
    cached = getattr(user, _PRODUCT_PERMISSIONS_CACHE_ATTR, None)
    if cached is not None:
        return list(cached)
    return list(
        user.user_permissions.select_related("content_type").filter(
            content_type__app_label__in=PRODUCT_PERMISSION_APP_LABELS,
        )
    )


def _to_record(
    user: User,
    *,
    legacy_by_user_id: dict[int, SiaosUsuario] | None = None,
) -> AdminUserRecord:
    profile = _safe_security_profile(user)
    usu_chapa = getattr(profile, "usu_chapa", None)

    if legacy_by_user_id is not None:
        legacy = legacy_by_user_id.get(user.id)
    else:
        legacy = (
            _find_legacy_usuario_by_chapa(usu_chapa)
            if usu_chapa is not None
            else _find_legacy_usuario(user.username)
        )
    if usu_chapa is None and legacy is not None:
        usu_chapa = legacy.usu_chapa

    emp_codigo = None
    pes_numero = None
    if legacy is not None:
        emp_codigo = legacy.emp_codigo
        pes_numero = legacy.pes_numero

    return AdminUserRecord(
        id=user.id,
        username=user.username,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        groups=[group.name for group in user.groups.all()],
        product_permissions=[
            _permission_value(permission)
            for permission in _cached_product_permissions(user)
        ],
        last_login=user.last_login,
        date_joined=user.date_joined,
        usu_chapa=usu_chapa,
        emp_codigo=emp_codigo,
        pes_numero=pes_numero,
    )


def _enrich_admin_users(records: list[AdminUserRecord]) -> list[AdminUserRecord]:
    if not records:
        return records

    emp_codes = {
        record.emp_codigo for record in records if record.emp_codigo is not None
    }
    pes_codes = {
        record.pes_numero for record in records if record.pes_numero is not None
    }

    empresas: dict[int, Empresa] = {}
    if emp_codes:
        empresas = {
            row.emp_codigo: row
            for row in Empresa.objects.using(_SMAR_DB_ALIAS).filter(
                emp_codigo__in=emp_codes
            )
        }

    pessoas: dict[int, Pessoa] = {}
    if pes_codes:
        pessoas = {
            row.pes_numero: row
            for row in Pessoa.objects.using(_SMAR_DB_ALIAS)
            .filter(pes_numero__in=pes_codes)
            .only("pes_numero", "pai_codigo")
        }

    country_codes = {
        code
        for code in (
            *(empresa.pai_codigo for empresa in empresas.values()),
            *(pessoa.pai_codigo for pessoa in pessoas.values()),
        )
        if code is not None
    }
    countries: dict[int, str] = {}
    if country_codes:
        countries = {
            row.pai_codigo: _as_text(row.pno_nome)
            for row in PaisNome.objects.using(_SMAR_DB_ALIAS)
            .filter(lin_cod=1, pai_codigo__in=country_codes)
            .only("pai_codigo", "pno_nome")
        }

    enriched: list[AdminUserRecord] = []
    for record in records:
        empresa = (
            empresas.get(record.emp_codigo) if record.emp_codigo is not None else None
        )
        pessoa = (
            pessoas.get(record.pes_numero) if record.pes_numero is not None else None
        )
        emp_pais_nome = (
            countries.get(empresa.pai_codigo, "")
            if empresa is not None and empresa.pai_codigo is not None
            else ""
        )
        pes_pais_nome = (
            countries.get(pessoa.pai_codigo, "")
            if pessoa is not None and pessoa.pai_codigo is not None
            else ""
        )
        enriched.append(
            replace(
                record,
                pais_nome=pes_pais_nome or emp_pais_nome,
                emp_nome=_as_text(empresa.emp_nome) if empresa is not None else "",
                emp_endereco=_as_text(empresa.emp_endereco)
                if empresa is not None
                else "",
                emp_bairro=_as_text(empresa.emp_bairro) if empresa is not None else "",
                emp_cidade=_as_text(empresa.emp_cidade) if empresa is not None else "",
                emp_estado=_as_text(empresa.emp_estado) if empresa is not None else "",
                emp_cep=_as_text(empresa.emp_cep) if empresa is not None else "",
                emp_pais_nome=emp_pais_nome,
                emp_homepage=_as_text(empresa.emp_homepage)
                if empresa is not None
                else "",
            )
        )
    return enriched


def _to_enriched_record(user: User) -> AdminUserRecord:
    return _enrich_admin_users([_to_record(user)])[0]


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
        queryset = _list_users_base_queryset()
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
        page_users = list(queryset[offset : offset + page_size])
        legacy_by_user_id = _batch_legacy_usuarios(page_users)
        items = _enrich_admin_users(
            [
                _to_record(user, legacy_by_user_id=legacy_by_user_id)
                for user in page_users
            ]
        )
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
        return _to_enriched_record(user)

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
        return _to_enriched_record(user)

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

        profile = None
        try:
            profile, _ = UserSecurityProfile.objects.get_or_create(user=user)
        except DatabaseError:
            profile = None
        legacy = (
            _find_legacy_usuario_by_chapa(profile.usu_chapa)
            if profile is not None and profile.usu_chapa is not None
            else _find_legacy_usuario(user.username)
        )

        if (
            profile is not None
            and legacy is not None
            and profile.usu_chapa != legacy.usu_chapa
        ):
            profile.usu_chapa = legacy.usu_chapa
            profile.save(update_fields=["usu_chapa"])

        if update.emp_codigo is not None or update.pes_numero is not None:
            if legacy is None:
                raise UserNotFoundError(
                    f"Legacy user for '{user.username}' not found in SIAOS.USUARIO."
                )

            legacy_fields: list[str] = []
            if update.emp_codigo is not None:
                legacy.emp_codigo = update.emp_codigo
                legacy_fields.append("emp_codigo")
            if update.pes_numero is not None:
                legacy.pes_numero = update.pes_numero
                legacy_fields.append("pes_numero")
            legacy.save(update_fields=legacy_fields)

        return _to_enriched_record(user)

    def set_user_groups(self, user_id: int, groups: list[str]) -> AdminUserRecord:
        user = User.objects.filter(pk=user_id).first()
        if user is None:
            raise UserNotFoundError(f"User '{user_id}' not found.")
        user.groups.set(_resolve_groups(groups))
        return _to_enriched_record(user)

    def set_user_product_permissions(
        self, user_id: int, permissions: list[str]
    ) -> AdminUserRecord:
        user = (
            User.objects.prefetch_related("groups", "user_permissions")
            .filter(pk=user_id)
            .first()
        )
        if user is None:
            raise UserNotFoundError(f"User '{user_id}' not found.")

        available = {
            _permission_value(permission): permission
            for permission in _product_permissions_queryset()
        }
        missing = [value for value in permissions if value not in available]
        if missing:
            raise ProductPermissionNotFoundError(
                f"Unknown product permissions: {', '.join(missing)}"
            )

        existing_non_product = user.user_permissions.exclude(
            content_type__app_label__in=PRODUCT_PERMISSION_APP_LABELS,
        )
        user.user_permissions.set(
            [*existing_non_product, *[available[value] for value in permissions]]
        )
        return _to_enriched_record(user)

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

    def list_product_permissions(self) -> list[AdminProductPermissionRecord]:
        return [
            AdminProductPermissionRecord(
                value=_permission_value(permission),
                app_label=permission.content_type.app_label,
                model=permission.content_type.model,
                codename=permission.codename,
                name=permission.name,
            )
            for permission in _product_permissions_queryset().order_by(
                "content_type__app_label",
                "content_type__model",
                "codename",
            )
        ]


def build_user_admin_repository() -> UserAdminRepositoryImpl:
    return UserAdminRepositoryImpl()
