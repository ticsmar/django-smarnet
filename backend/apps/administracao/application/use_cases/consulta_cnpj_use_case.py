"""CNPJ wizard: detect duplicates then consult ReceitaWS (verificaCNPJ.php)."""

from apps.administracao.application.dtos.cliente_dtos import (
    ConsultaCnpjInputDTO,
    ConsultaCnpjOutputDTO,
)
from apps.administracao.application.mappers.cliente_mapper import (
    to_copy_fields_from_receita,
    to_documento_match_dto,
    to_receita_dto,
)
from apps.administracao.domain.exceptions.cliente_exceptions import (
    ClienteDocumentoInvalidError,
)
from apps.administracao.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)
from apps.administracao.domain.repositories.cnpj_consulta_gateway import (
    CepWsGateway,
    CepWsRecord,
    CnpjWsGateway,
)
from apps.administracao.domain.services.cnpj_receita import (
    CEP_LENGTH,
    digits_only,
    is_cnpj_key,
    municipio_ibge,
    normalize_cnpj,
)

_PAIS_BRASIL = 76


class ConsultaCnpjUseCase:
    def __init__(
        self,
        query_repository: ClienteQueryRepository,
        cnpj_ws: CnpjWsGateway,
        cep_ws: CepWsGateway,
    ) -> None:
        self._query = query_repository
        self._cnpj_ws = cnpj_ws
        self._cep_ws = cep_ws

    def execute(self, input_dto: ConsultaCnpjInputDTO) -> ConsultaCnpjOutputDTO:
        cnpj = normalize_cnpj(input_dto.cnpj)
        if not is_cnpj_key(cnpj):
            raise ClienteDocumentoInvalidError(
                "CNPJ deve conter 14 letras ou números (sem . / -)."
            )

        matches = self._query.find_by_cnpj(
            actor_owner=input_dto.actor.owner_emp_codigo,
            cnpj=cnpj,
        )
        if matches:
            codigos = ", ".join(str(item.codigo) for item in matches)
            label = "Código" if len(matches) == 1 else "Códigos"
            return ConsultaCnpjOutputDTO(
                cnpj=cnpj,
                already_registered=True,
                can_discard=False,
                can_copy=False,
                matches=[to_documento_match_dto(item) for item in matches],
                copy_fields=None,
                receita=None,
                message=f"Cliente já cadastrado. {label} {codigos}.",
            )
        return self._from_receita(cnpj)

    def _from_receita(self, cnpj: str) -> ConsultaCnpjOutputDTO:
        ws = self._cnpj_ws.consultar(cnpj)
        if ws is None:
            return ConsultaCnpjOutputDTO(
                cnpj=cnpj,
                already_registered=False,
                can_discard=True,
                can_copy=False,
                matches=[],
                copy_fields=None,
                receita=None,
                message=None,
            )
        cep = self._enrich_cep(ws.cep)
        uf = (cep.uf if cep and not cep.erro else None) or ws.uf
        logradouro = ws.logradouro
        if cep and not cep.erro and not logradouro:
            logradouro = cep.logradouro
        ibge = cep.ibge if cep and not cep.erro else None
        estado = self._query.find_estado_by_sigla(
            sigla=uf or "",
            pai_codigo=_PAIS_BRASIL,
        )
        receita = to_receita_dto(
            ws,
            est_codigo=estado.est_codigo if estado else None,
            mun_ibge=municipio_ibge(ibge),
            logradouro=logradouro,
            uf=uf,
        )
        can_copy = (ws.status or "").upper() == "OK"
        return ConsultaCnpjOutputDTO(
            cnpj=cnpj,
            already_registered=False,
            can_discard=True,
            can_copy=can_copy,
            matches=[],
            copy_fields=to_copy_fields_from_receita(receita) if can_copy else None,
            receita=receita,
            message=None,
        )

    def _enrich_cep(self, cep: str | None) -> CepWsRecord | None:
        digits = digits_only(cep)
        if len(digits) != CEP_LENGTH:
            return None
        return self._cep_ws.consultar(digits)
