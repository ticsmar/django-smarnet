"""Create a cliente record from a funcionário via INTEGRACAO.SP_FUNC2CLIENTE."""

from apps.administracao.application.dtos.cliente_dtos import (
    CreateClienteFromFuncionarioInputDTO,
    CreateClienteFromFuncionarioOutputDTO,
)
from apps.administracao.domain.exceptions.cliente_exceptions import (
    ClienteDocumentoInvalidError,
    ClienteForbiddenError,
    ClienteFuncionarioNotFoundError,
    ClienteOwnershipError,
)
from apps.administracao.domain.repositories.cliente_repository import (
    ClienteRepository,
    CreateClienteFromFuncionarioParams,
)
from apps.administracao.domain.services.empresa_ownership import (
    customer_effective_owner,
)


class CreateClienteFromFuncionarioUseCase:
    def __init__(self, repository: ClienteRepository) -> None:
        self._repository = repository

    def execute(
        self, input_dto: CreateClienteFromFuncionarioInputDTO
    ) -> CreateClienteFromFuncionarioOutputDTO:
        actor = input_dto.actor
        if actor.usu_chapa is None:
            raise ClienteForbiddenError(
                "Actor without USU_CHAPA cannot create clientes."
            )

        digits = "".join(ch for ch in (input_dto.cnpj_or_cpf or "") if ch.isdigit())
        if not digits:
            raise ClienteDocumentoInvalidError(
                "Informe CPF/CNPJ com pelo menos um dígito."
            )

        result = self._repository.create_from_funcionario(
            CreateClienteFromFuncionarioParams(
                cnpj_or_cpf=digits,
                usu_chapa=actor.usu_chapa,
            )
        )
        if result.codigo is None:
            raise ClienteFuncionarioNotFoundError(
                "Funcionário não encontrado para o documento informado."
            )

        self._enforce_ownership(
            codigo=result.codigo,
            owner=actor.owner_emp_codigo,
        )

        return CreateClienteFromFuncionarioOutputDTO(codigo=result.codigo)

    def _enforce_ownership(self, *, codigo: int, owner: int) -> None:
        current = self._repository.read_emp_codigo(codigo)
        if customer_effective_owner(current) == owner:
            return
        self._repository.set_emp_codigo(codigo=codigo, emp_codigo=owner)
        rechecked = self._repository.read_emp_codigo(codigo)
        if customer_effective_owner(rechecked) != owner:
            raise ClienteOwnershipError(
                f"Failed to enforce EMP_CODIGO={owner} on cliente {codigo}."
            )
