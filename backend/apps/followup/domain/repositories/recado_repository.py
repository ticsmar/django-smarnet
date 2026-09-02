"""Oracle follow-up repository contracts."""

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol


@dataclass(frozen=True, slots=True)
class RecadoRecord:
    pre_codigo: int
    tre_codigo: int | None
    tre_descricao: str
    tre_tipo_canc: int
    tre_global: int
    usu_chapa: int
    usu_nome: str | None
    pre_mensagem: str
    pre_data: datetime | None
    pre_dt_alarm: datetime | None
    pre_dt_baixa: datetime | None
    mot_codigo: int | None
    mot_descricao: str | None


@dataclass(frozen=True, slots=True)
class TipoRecadoRecord:
    tre_codigo: int
    tre_descricao: str
    tre_tipo_canc: int
    tre_global: int


@dataclass(frozen=True, slots=True)
class MotivoRecord:
    mot_codigo: int
    mot_descricao: str


@dataclass(frozen=True, slots=True)
class RecadoStatusRecord:
    nivel: str
    proximo_alarme: datetime | None
    tre_descricao: str | None


@dataclass(frozen=True, slots=True)
class ClienteNotesRecord:
    codigo: int
    descricao: str
    has_notes: bool


class RecadoQueryRepository(Protocol):
    def list_recados(
        self, sistema: int, filtro: str, tre_codigo: int | None
    ) -> list[RecadoRecord]: ...

    def get_recado(
        self, pre_codigo: int, sistema: int, filtro: str
    ) -> RecadoRecord | None: ...

    def list_tipos(self, sistema: int) -> list[TipoRecadoRecord]: ...

    def get_tipo(self, tre_codigo: int) -> TipoRecadoRecord | None: ...

    def list_motivos(self, emp_codigo: int | None) -> list[MotivoRecord]: ...

    def status(self, sistema: int, filtro: str) -> RecadoStatusRecord: ...

    def get_cliente_notes(self, codigo: int) -> ClienteNotesRecord: ...


class RecadoWriteRepository(Protocol):
    def grava_followup(
        self,
        opcao: int,
        pre_codigo: int | None,
        filtro: str,
        tre_codigo: int,
        mot_codigo: int | None,
        mensagem: str,
        alarm: str,
    ) -> None: ...

    def append_cliente_notes(self, usu_chapa: int, codigo: int, texto: str) -> None: ...
