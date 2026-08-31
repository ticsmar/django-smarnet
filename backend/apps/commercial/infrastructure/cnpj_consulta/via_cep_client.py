"""ViaCEP client — legacy ``getCEP.php``."""

from __future__ import annotations

from apps.commercial.domain.repositories.cnpj_consulta_gateway import CepWsRecord
from apps.commercial.domain.services.cnpj_receita import (
    CEP_LENGTH,
    digits_only,
    strip_accents,
)
from apps.commercial.infrastructure.cnpj_consulta.http_json import get_json


def _as_str(value: object) -> str | None:
    if value is None:
        return None
    text = strip_accents(str(value))
    if text is None:
        return None
    stripped = text.strip()
    return stripped or None


class ViaCepClient:
    def __init__(self, *, base_url: str) -> None:
        self._base_url = base_url.rstrip("/")

    def consultar(self, cep: str) -> CepWsRecord | None:
        digits = digits_only(cep)
        if len(digits) != CEP_LENGTH:
            return None
        payload = get_json(f"{self._base_url}/{digits}/json/")
        if payload is None:
            return None
        erro = payload.get("erro") in (True, "true", "True")
        return CepWsRecord(
            uf=_as_str(payload.get("uf")),
            ibge=_as_str(payload.get("ibge")),
            logradouro=_as_str(payload.get("logradouro")),
            erro=erro,
        )
