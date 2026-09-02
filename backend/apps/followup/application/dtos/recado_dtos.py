"""DTOs for Oracle follow-up operations."""

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class RecadoScopeDTO:
    sistema: int
    filtro: str
    tre_codigo: int | None = None
    usu_chapa: int = 0


@dataclass(frozen=True, slots=True)
class RecadoItemOutputDTO:
    pre_codigo: int
    tre_codigo: int | None
    tre_descricao: str
    tre_tipo_canc: bool
    usu_chapa: int
    usu_nome: str | None
    mensagem: str
    pre_data: datetime | None
    pre_dt_alarm: datetime | None
    pre_dt_baixa: datetime | None
    mot_codigo: int | None
    mot_descricao: str | None
    can_edit: bool
    alarm_nivel: str


@dataclass(frozen=True, slots=True)
class RecadoListOutputDTO:
    sistema: int
    filtro: str
    items: list[RecadoItemOutputDTO]


@dataclass(frozen=True, slots=True)
class TipoRecadoOutputDTO:
    tre_codigo: int
    tre_descricao: str
    tre_tipo_canc: bool


@dataclass(frozen=True, slots=True)
class MotivoOutputDTO:
    mot_codigo: int
    mot_descricao: str


@dataclass(frozen=True, slots=True)
class RecadoStatusOutputDTO:
    nivel: str
    proximo_alarme: datetime | None
    tre_descricao: str | None
    has_legacy_notes: bool = False


@dataclass(frozen=True, slots=True)
class GravaRecadoInputDTO:
    sistema: int
    filtro: str
    tre_codigo: int
    mensagem: str
    mot_codigo: int | None = None
    alarm_data: str = ""
    alarm_hora: str = ""
    pre_codigo: int | None = None
    usu_chapa: int = 0


@dataclass(frozen=True, slots=True)
class BaixaRecadoInputDTO:
    sistema: int
    filtro: str
    pre_codigo: int
    usu_chapa: int = 0


@dataclass(frozen=True, slots=True)
class ClienteNotesOutputDTO:
    codigo: int
    descricao: str
    has_notes: bool


@dataclass(frozen=True, slots=True)
class AppendClienteNotesInputDTO:
    codigo: int
    texto: str
    usu_chapa: int
