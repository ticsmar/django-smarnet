"""Persist or update fornecedor contato via Oracle procedure."""

from apps.compras.application.dtos.recebimento_dtos import (
    GravaFornecContatoInputDTO,
    GravaFornecContatoOutputDTO,
)
from apps.compras.domain.exceptions.recebimento_exceptions import (
    RecebimentoDatabaseError,
)
from apps.compras.domain.repositories.recebimento_repository import (
    GravaFornecContatoParams,
    RecebimentoRepository,
)
from apps.compras.domain.services.procedure_message import raise_if_procedure_error


class GravaFornecContatoUseCase:
    def __init__(self, repository: RecebimentoRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: GravaFornecContatoInputDTO
    ) -> GravaFornecContatoOutputDTO:
        result = self._repository.grava_fornec_contato(
            GravaFornecContatoParams(
                cod_contato=input_dto.cod_contato,
                cod_fornec=input_dto.cod_fornec,
                nome=input_dto.nome,
                cargo=input_dto.cargo,
                email=input_dto.email,
                telefone=input_dto.telefone,
                idioma_msg=input_dto.idioma_msg,
            )
        )
        raise_if_procedure_error(result.tipo_msg, result.msg, result.acao)
        if result.cod_contato is None:
            raise RecebimentoDatabaseError(
                result.msg or "Procedure did not return a code."
            )
        return GravaFornecContatoOutputDTO(
            cod_contato=result.cod_contato,
            tipo_msg=result.tipo_msg,
            msg=result.msg,
            acao=result.acao,
        )
