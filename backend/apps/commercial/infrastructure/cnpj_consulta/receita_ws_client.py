"""ReceitaWS client — legacy ``getCNPJ.php``."""

from __future__ import annotations

from apps.commercial.domain.repositories.cnpj_consulta_gateway import (
    CnpjAtividade,
    CnpjSocio,
    CnpjWsRecord,
)
from apps.commercial.domain.services.cnpj_receita import (
    digits_only,
    is_cnpj_key,
    normalize_cnpj,
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


def _atividades(value: object) -> tuple[CnpjAtividade, ...]:
    if not isinstance(value, list):
        return ()
    items: list[CnpjAtividade] = []
    for raw in value:
        if not isinstance(raw, dict):
            continue
        items.append(
            CnpjAtividade(code=_as_str(raw.get("code")), text=_as_str(raw.get("text")))
        )
    return tuple(items)


def _qsa(value: object) -> tuple[CnpjSocio, ...]:
    if not isinstance(value, list):
        return ()
    items: list[CnpjSocio] = []
    for raw in value:
        if not isinstance(raw, dict):
            continue
        items.append(
            CnpjSocio(qual=_as_str(raw.get("qual")), nome=_as_str(raw.get("nome")))
        )
    return tuple(items)


class ReceitaWsClient:
    def __init__(self, *, base_url: str, token: str = "") -> None:
        self._base_url = base_url.rstrip("/")
        self._token = token.strip()

    def consultar(self, cnpj: str) -> CnpjWsRecord | None:
        key = normalize_cnpj(cnpj)
        if not is_cnpj_key(key):
            return None
        headers: dict[str, str] = {}
        if self._token:
            headers["Authorization"] = f"Bearer {self._token}"
        payload = get_json(f"{self._base_url}/{key}", headers=headers)
        if payload is None:
            return None
        cep = digits_only(_as_str(payload.get("cep")) or "")
        return CnpjWsRecord(
            status=_as_str(payload.get("status")),
            nome=_as_str(payload.get("nome")),
            fantasia=_as_str(payload.get("fantasia")),
            cnpj=_as_str(payload.get("cnpj")) or key,
            logradouro=_as_str(payload.get("logradouro")),
            numero=_as_str(payload.get("numero")),
            complemento=_as_str(payload.get("complemento")),
            cep=cep or None,
            bairro=_as_str(payload.get("bairro")),
            municipio=_as_str(payload.get("municipio")),
            uf=_as_str(payload.get("uf")),
            telefone=_as_str(payload.get("telefone")),
            email=_as_str(payload.get("email")),
            situacao=_as_str(payload.get("situacao")),
            data_situacao=_as_str(payload.get("data_situacao")),
            natureza_juridica=_as_str(payload.get("natureza_juridica")),
            abertura=_as_str(payload.get("abertura")),
            ultima_atualizacao=_as_str(payload.get("ultima_atualizacao")),
            tipo=_as_str(payload.get("tipo")),
            efr=_as_str(payload.get("efr")),
            motivo_situacao=_as_str(payload.get("motivo_situacao")),
            situacao_especial=_as_str(payload.get("situacao_especial")),
            data_situacao_especial=_as_str(payload.get("data_situacao_especial")),
            capital_social=_as_str(payload.get("capital_social")),
            atividade_principal=_atividades(payload.get("atividade_principal")),
            atividades_secundarias=_atividades(payload.get("atividades_secundarias")),
            qsa=_qsa(payload.get("qsa")),
        )
