"""Canonical PAR_SISTEMA seed (Smarnet 3.01 hardcoded op_file 1-12)."""

from typing import Final

SISTEMA_CLIENTE: Final[int] = 7
MIN_CUSTOM_CODIGO: Final[int] = 13
DEFAULT_LIN_COD: Final[int] = 1
PAR_TIPO_PASTA: Final[int] = 0
PAR_TIPO_ARQUIVO: Final[int] = 1
PAR_MODO_ESCRITA: Final[str] = "W"
NOME_MAX: Final[int] = 300
DESCRICAO_MAX: Final[int] = 60
FILTRO_MAX: Final[int] = 100

SEED_SISTEMAS: tuple[tuple[int, str, str], ...] = (
    (1, "Proposta", "Proposta comercial"),
    (2, "Revisor / OS", "Ordem de serviço / revisor"),
    (3, "Usado", ""),
    (4, "Processo", "Web suprimento / processo"),
    (5, "Oportunidade", ""),
    (6, "Laudo", ""),
    (7, "Cliente", "Cadastro de cliente (SIAOS.CLIENTE.CODIGO)"),
    (8, "Compras — Indicadores", ""),
    (9, "Pedido — Faturamento", ""),
    (10, "Nota Fiscal", ""),
    (11, "Nota Fiscal (entrada)", ""),
    (12, "Estrutura de produto", ""),
)
