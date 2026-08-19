"""Cliente (administracao) domain exceptions."""


class ClienteError(Exception):
    """Base cliente error."""


class ClienteNotFoundError(ClienteError):
    """Raised when a cliente row is not found or is out of scope."""


class ClienteForbiddenError(ClienteError):
    """Raised when the actor cannot view/edit the target cliente."""


class ClienteProcedureError(ClienteError):
    """Raised when the Oracle procedure signals a business error."""

    def __init__(self, message: str, acao: str | None = None) -> None:
        self.msg = message
        self.acao = acao
        detail = message.strip() if message else "Procedure failed."
        if acao and acao.strip():
            detail = f"{detail} Ação: {acao.strip()}"
        super().__init__(detail)


class ClienteDatabaseError(ClienteError):
    """Raised when the Oracle call itself fails."""


class ClienteOwnershipError(ClienteError):
    """Raised when a created cliente ends up owned by another empresa pool."""


class ClienteDocumentoInvalidError(ClienteError):
    """Raised when CPF/CNPJ has no meaningful digits."""


class ClienteFuncionarioNotFoundError(ClienteError):
    """Raised when INTEGRACAO.SP_FUNC2CLIENTE cannot resolve the funcionário."""
