"""Classification of a pre-pessoa request by TEP_CODIGO."""

from dataclasses import dataclass

_FUNCIONARIO = "S"
_FORNECEDOR = "F"
_CLIENTE = "C"


@dataclass(frozen=True, slots=True)
class PendingRequestType:
    tipo: str
    cliente: bool
    fornecedor: bool
    smar: bool


def resolve_pending_request_type(tep_codigo: str | None) -> PendingRequestType:
    tipo = (tep_codigo or "").strip().upper()
    if tipo == _FUNCIONARIO:
        return PendingRequestType(
            tipo="Smar (Funcionario)", cliente=False, fornecedor=False, smar=True
        )
    if tipo == _FORNECEDOR:
        return PendingRequestType(
            tipo="Fornecedor", cliente=False, fornecedor=True, smar=False
        )
    if tipo == _CLIENTE:
        return PendingRequestType(
            tipo="Cliente", cliente=True, fornecedor=False, smar=False
        )
    return PendingRequestType(
        tipo="Nao informado", cliente=False, fornecedor=False, smar=False
    )
