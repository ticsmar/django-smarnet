"""Recebimento (compras) domain exceptions."""


class RecebimentoError(Exception):
    """Base recebimento error."""


class RecebimentoProcedureError(RecebimentoError):
    """Raised when an Oracle procedure returns tipo_msg = E or the DB call fails."""

    def __init__(self, message: str, acao: str | None = None) -> None:
        self.msg = message
        self.acao = acao
        detail = message.strip() if message else "Procedure failed."
        if acao and acao.strip():
            detail = f"{detail} Ação: {acao.strip()}"
        super().__init__(detail)


class RecebimentoDatabaseError(RecebimentoError):
    """Raised when the Oracle call itself fails."""


class FornecedorNotFoundError(RecebimentoError):
    """Raised when a fornecedor row is not found."""


class FornecContatoNotFoundError(RecebimentoError):
    """Raised when a fornecedor contato row is not found."""


class PaisNotFoundError(RecebimentoError):
    """Raised when a pais row is not found."""
