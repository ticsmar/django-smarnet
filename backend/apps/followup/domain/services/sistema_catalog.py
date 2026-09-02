"""Canonical PRE_SISTEMA seed (Smarnet 3.01 sit_codigo)."""

from typing import Final

SISTEMA_CLIENTE: Final[int] = 117
SISTEMA_PROPOSTA: Final[int] = 121
TRE_CODIGO_OUTROS: Final[int] = 38
MIN_CUSTOM_CODIGO: Final[int] = 300
FILTRO_MAX: Final[int] = 20
MENSAGEM_MAX: Final[int] = 32000
HIDDEN_TRE_CODIGOS: Final[tuple[int, ...]] = (1, 2, 10, 19)
MOTIVO_EXCLUIDOS_PADRAO: Final[tuple[int, ...]] = (4, 6, 7, 8, 10)
MOTIVO_EXCLUIDOS_EMP_HQ: Final[tuple[int, ...]] = (4, 8, 10)
EMP_HQ: Final[frozenset[int]] = frozenset({1, 2})

SEED_SISTEMAS: tuple[tuple[int, str, str], ...] = (
    (3, "Consulta / OS", "Consulta e ordem de serviço (Smarnet 3.01)"),
    (117, "Cliente", "Cadastro de cliente (SIAOS.CLIENTE.CODIGO)"),
    (121, "Proposta — Order IN", "Proposta comercial; tela ainda no Smarnet 3.01"),
    (281, "SiGO", "Oportunidade SiGO (Smarnet 3.01)"),
    (292, "Revisões", "Revisões (Smarnet 3.01)"),
)
