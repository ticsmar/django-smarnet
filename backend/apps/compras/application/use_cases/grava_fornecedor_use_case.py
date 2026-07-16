"""Persist or update fornecedor via Oracle procedure."""

from apps.compras.application.dtos.recebimento_dtos import (
    GravaFornecedorInputDTO,
    GravaFornecedorOutputDTO,
)
from apps.compras.domain.exceptions.recebimento_exceptions import (
    RecebimentoDatabaseError,
)
from apps.compras.domain.repositories.recebimento_repository import (
    GravaFornecedorParams,
    RecebimentoRepository,
)
from apps.compras.domain.services.procedure_message import raise_if_procedure_error


class GravaFornecedorUseCase:
    def __init__(self, repository: RecebimentoRepository) -> None:
        self._repository = repository

    def execute(self, input_dto: GravaFornecedorInputDTO) -> GravaFornecedorOutputDTO:
        result = self._repository.grava_fornecedor(
            GravaFornecedorParams(
                cod_fornec=input_dto.cod_fornec,
                razao_soc=input_dto.razao_soc,
                nome_reduz=input_dto.nome_reduz,
                endereco=input_dto.endereco,
                bairro=input_dto.bairro,
                munic=input_dto.munic,
                cep=input_dto.cep,
                estado=input_dto.estado,
                cod_pais=input_dto.cod_pais,
                idioma_msg=input_dto.idioma_msg,
            )
        )
        # Procedure EXCEPTION handlers set tipo_msg='E' and leave n_cod null —
        # surface that message before requiring a returned code.
        raise_if_procedure_error(result.tipo_msg, result.msg, result.acao)
        if result.cod_fornec is None:
            raise RecebimentoDatabaseError(
                result.msg or "Procedure did not return a code."
            )
        return GravaFornecedorOutputDTO(
            cod_fornec=result.cod_fornec,
            tipo_msg=result.tipo_msg,
            msg=result.msg,
            acao=result.acao,
        )
