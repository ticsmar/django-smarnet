"""Query repository contract for SIAOS.CLIENTE and its lookup catalogs."""

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol


@dataclass(frozen=True, slots=True)
class ClienteListRecord:
    codigo: int
    cliente: str | None
    reduzido: str | None
    cgc: str | None
    cidade: str | None
    estado: str | None
    emp_codigo: int
    bloqueado: int
    tipo: str | None
    crs_cod_letra: str | None = None
    crs_desc_longa: str | None = None
    crs_restricao: int | None = None
    crs_cores: str | None = None
    cadastro_checagem: int | None = None


@dataclass(frozen=True, slots=True)
class ClienteRecord:
    codigo: int
    origem: str | None
    cliente: str | None
    reduzido: str | None
    endereco1: str | None
    endereco2: str | None
    endereco3: str | None
    cli_bairro: str | None
    cidade: str | None
    estado: str | None
    cep: str | None
    pais: str | None
    pai_codigo: int | None
    est_codigo: int | None
    telefone1: str | None
    telefone2: str | None
    fax: str | None
    email: str | None
    homepage: str | None
    cgc: str | None
    inscr_est: str | None
    cli_inscr_mun: str | None
    tipo: str | None
    cli_tipo: str | None
    cli_pes_tipo: str | None
    cli_contribuinte: int | None
    cli_ie_isento: int | None
    cli_cnae: str | None
    cli_cod_mun_ibge: str | None
    cli_inscr_suframa: str | None
    cli_nif: str | None
    contato: str | None
    contatotec: str | None
    contatofin: str | None
    observa: str | None
    emp_codigo: int
    bloqueado: int
    dt_atual: datetime | None
    dt_cad: datetime | None


@dataclass(frozen=True, slots=True)
class PaginatedClientesResult:
    items: list[ClienteListRecord]
    total: int
    page: int
    page_size: int


@dataclass(frozen=True, slots=True)
class ClienteDocumentoMatch:
    codigo: int
    cliente: str | None
    cgc: str | None
    cidade: str | None
    estado: str | None
    emp_codigo: int


@dataclass(frozen=True, slots=True)
class FuncionarioRhRecord:
    """PROTPROD.SRA010 row used by verificaFunc.php."""

    nome: str | None
    chapa: str | None
    cpf: str | None
    rg: str | None
    endereco: str | None
    municipio: str | None
    bairro: str | None
    uf: str | None
    cep: str | None
    telefone: str | None
    email: str | None


@dataclass(frozen=True, slots=True)
class ClientePaisRecord:
    pai_codigo: int
    pai_nome: str | None


@dataclass(frozen=True, slots=True)
class ClienteEstadoRecord:
    est_codigo: int
    pai_codigo: int
    est_nome: str | None


@dataclass(frozen=True, slots=True)
class ClienteOrigemRecord:
    origem: str
    descricao: str | None


class ClienteQueryRepository(Protocol):
    def list_clientes(
        self,
        *,
        actor_owner: int,
        search: str,
        page: int,
        page_size: int,
    ) -> PaginatedClientesResult:
        """Return a paginated list of clientes in the actor's empresa scope."""

    def get_cliente(
        self,
        *,
        actor_owner: int,
        codigo: int,
    ) -> ClienteRecord | None:
        """Return a cliente by code within the actor's empresa scope.

        Includes ``BLOQUEADO=7`` (duplicate/invalid) so a CNPJ hit can open
        the existing cadastro. Does not call ``SF_VALIDA_CONS_CLIENTE``.
        Listagem still hides those rows.
        """

    def get_cliente_emp_codigo(self, codigo: int) -> int | None:
        """Return the raw EMP_CODIGO of a cliente without applying the scope filter."""

    def find_by_documento(
        self,
        *,
        actor_owner: int,
        digits: str,
    ) -> list[ClienteDocumentoMatch]:
        """Search CLIENTE.CGC within the actor's scope.

        ``digits`` is the mask-stripped document (CPF digits or 14-char CNPJ,
        letters allowed). CNPJ matches the legado LPAD/TRANSLATE equality so a
        leading zero in ``02.596.588/0001-13`` still finds ``2596588000113``.
        """

    def find_by_cnpj(
        self,
        *,
        actor_owner: int,
        cnpj: str,
    ) -> list[ClienteDocumentoMatch]:
        """Find SIAOS.CLIENTE by CNPJ (mask-stripped), scoped by empresa.

        Used by the new-customer wizard before any ReceitaWS call. Does not
        apply ``SF_VALIDA_CONS_CLIENTE`` or hide ``BLOQUEADO=7``.
        """

    def find_by_cpf(
        self,
        *,
        actor_owner: int,
        digits: str,
    ) -> list[ClienteDocumentoMatch]:
        """Find SIAOS.CLIENTE by CPF digits, scoped by empresa.

        Used by the funcionário wizard (verificaFunc.php). Does not apply
        ``SF_VALIDA_CONS_CLIENTE`` or hide ``BLOQUEADO=7``.
        """

    def find_funcionario_rh(self, *, digits: str) -> FuncionarioRhRecord | None:
        """Return the first PROTPROD.SRA010 row for the CPF, or None."""

    def list_paises(self) -> list[ClientePaisRecord]:
        """Return countries used by the customer form."""

    def list_estados(self, *, pai_codigo: int | None) -> list[ClienteEstadoRecord]:
        """Return states, optionally scoped to a country."""

    def find_estado_by_sigla(
        self, *, sigla: str, pai_codigo: int = 76
    ) -> ClienteEstadoRecord | None:
        """Resolve GERAL.ESTADO by EST_SIGLA (getCEP.php)."""

    def list_origens(self) -> list[ClienteOrigemRecord]:
        """Return SIAOS.ORIGEM entries used to classify clientes."""
