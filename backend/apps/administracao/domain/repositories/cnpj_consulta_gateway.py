"""Ports for the CNPJ wizard (legacy verificaCNPJ.php / getCNPJ.php)."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True, slots=True)
class CnpjAtividade:
    code: str | None
    text: str | None


@dataclass(frozen=True, slots=True)
class CnpjSocio:
    qual: str | None
    nome: str | None


@dataclass(frozen=True, slots=True)
class CnpjWsRecord:
    """ReceitaWS payload after accent stripping (getCNPJ.php)."""

    status: str | None
    nome: str | None
    fantasia: str | None
    cnpj: str | None
    logradouro: str | None
    numero: str | None
    complemento: str | None
    cep: str | None
    bairro: str | None
    municipio: str | None
    uf: str | None
    telefone: str | None
    email: str | None
    situacao: str | None
    data_situacao: str | None
    natureza_juridica: str | None
    abertura: str | None
    ultima_atualizacao: str | None
    tipo: str | None
    efr: str | None
    motivo_situacao: str | None
    situacao_especial: str | None
    data_situacao_especial: str | None
    capital_social: str | None
    atividade_principal: tuple[CnpjAtividade, ...]
    atividades_secundarias: tuple[CnpjAtividade, ...]
    qsa: tuple[CnpjSocio, ...]


@dataclass(frozen=True, slots=True)
class CepWsRecord:
    """ViaCEP payload used to enrich IBGE and UF (getCEP.php)."""

    uf: str | None
    ibge: str | None
    logradouro: str | None
    erro: bool = False


class CnpjWsGateway(Protocol):
    def consultar(self, cnpj: str) -> CnpjWsRecord | None:
        """Return ReceitaWS data for a 14-digit CNPJ, or None on transport failure."""


class CepWsGateway(Protocol):
    def consultar(self, cep: str) -> CepWsRecord | None:
        """Return ViaCEP data for an 8-digit CEP, or None on transport failure."""
