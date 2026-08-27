"""Funcionário wizard: find duplicates then load PROTPROD.SRA010 (verificaFunc.php)."""

from apps.commercial.application.dtos.cliente_dtos import (
    ConsultaFuncionarioInputDTO,
    ConsultaFuncionarioOutputDTO,
)
from apps.commercial.application.mappers.cliente_mapper import (
    to_documento_match_dto,
    to_funcionario_rh_dto,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteDocumentoInvalidError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteQueryRepository,
)
from apps.commercial.domain.services.cnpj_receita import digits_only, is_cpf_key


class ConsultaFuncionarioUseCase:
    def __init__(self, query_repository: ClienteQueryRepository) -> None:
        self._query = query_repository

    def execute(
        self, input_dto: ConsultaFuncionarioInputDTO
    ) -> ConsultaFuncionarioOutputDTO:
        cpf = digits_only(input_dto.cpf)
        if not is_cpf_key(cpf):
            raise ClienteDocumentoInvalidError(
                "CPF inválido! Use 11 dígitos (pode colar com . -)."
            )

        matches = self._query.find_by_cpf(
            actor_owner=input_dto.actor.owner_emp_codigo,
            digits=cpf,
        )
        if matches:
            codigos = ", ".join(str(item.codigo) for item in matches)
            label = "Código" if len(matches) == 1 else "Códigos"
            return ConsultaFuncionarioOutputDTO(
                cpf=cpf,
                already_registered=True,
                can_copy=False,
                matches=[to_documento_match_dto(item) for item in matches],
                funcionario=None,
                message=f"Cliente já cadastrado. {label} {codigos}.",
            )

        rh = self._query.find_funcionario_rh(digits=cpf)
        if rh is None or not (rh.chapa or "").strip():
            return ConsultaFuncionarioOutputDTO(
                cpf=cpf,
                already_registered=False,
                can_copy=False,
                matches=[],
                funcionario=None,
                message="Funcionário não encontrado para o documento informado.",
            )

        return ConsultaFuncionarioOutputDTO(
            cpf=cpf,
            already_registered=False,
            can_copy=True,
            matches=[],
            funcionario=to_funcionario_rh_dto(rh),
            message=None,
        )
