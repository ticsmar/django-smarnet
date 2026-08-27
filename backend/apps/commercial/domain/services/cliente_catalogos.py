"""Defaults for tributary group (ajax.php?op=3)."""

BRASIL_PAI_CODIGO = 76
_EST_SP = 25
_EST_070 = 27
_GRUPO_SP = "077"
_GRUPO_070 = "070"


def default_grupo_tributario(
    *,
    est_codigo: int | None,
    first_codigo: str | None,
) -> str | None:
    """PHP defaults: EST_CODIGO 25 → 077, 27 → 070, else first catalog row."""
    if est_codigo == _EST_SP:
        return _GRUPO_SP
    if est_codigo == _EST_070:
        return _GRUPO_070
    return first_codigo
