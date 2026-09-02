"""Django ORM implementation of SistemaRepository."""

from django.db import DatabaseError
from django.db.models.query import QuerySet

from apps.followup.domain.repositories.sistema_repository import SistemaRecord
from apps.followup.infrastructure.models import FollowupSistema

_DB_ALIAS = "default"


def _qs() -> QuerySet[FollowupSistema]:
    return FollowupSistema.objects.using(_DB_ALIAS)


def _to_record(row: FollowupSistema) -> SistemaRecord:
    return SistemaRecord(
        codigo=int(row.codigo),
        nome=row.nome,
        descricao=row.descricao or "",
        ativo=bool(row.ativo),
    )


class DjangoSistemaRepositoryImpl:
    def list_all(self) -> list[SistemaRecord]:
        return [_to_record(row) for row in _qs().all()]

    def get_by_codigo(self, codigo: int) -> SistemaRecord | None:
        try:
            row = _qs().filter(pk=codigo).first()
        except DatabaseError:
            return None
        if row is None:
            return None
        return _to_record(row)

    def exists_codigo(self, codigo: int) -> bool:
        return _qs().filter(pk=codigo).exists()

    def max_codigo(self) -> int:
        value = _qs().order_by("-codigo").values_list("codigo", flat=True).first()
        return int(value) if value is not None else 0

    def create(
        self, codigo: int, nome: str, descricao: str, ativo: bool
    ) -> SistemaRecord:
        row = _qs().create(codigo=codigo, nome=nome, descricao=descricao, ativo=ativo)
        return _to_record(row)

    def update(
        self, codigo: int, nome: str, descricao: str, ativo: bool
    ) -> SistemaRecord:
        _qs().filter(pk=codigo).update(nome=nome, descricao=descricao, ativo=ativo)
        row = _qs().get(pk=codigo)
        return _to_record(row)


def build_django_sistema_repository() -> DjangoSistemaRepositoryImpl:
    return DjangoSistemaRepositoryImpl()
