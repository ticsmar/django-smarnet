"""GET JSON helper for ReceitaWS / ViaCEP (stdlib, no extra dependency)."""

from __future__ import annotations

import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

_DEFAULT_HEADERS = {
    "Accept": "application/json",
    "User-Agent": "smarnet-erp/1.0",
}


def get_json(
    url: str,
    *,
    headers: dict[str, str] | None = None,
    timeout: float = 15.0,
) -> dict[str, object] | None:
    merged = {**_DEFAULT_HEADERS, **(headers or {})}
    request = Request(url, headers=merged)
    raw = _read_url(request, timeout)
    if raw is None:
        return None
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        return None
    if not isinstance(payload, dict):
        return None
    return payload


def _decode_body(raw: object) -> str | None:
    if not isinstance(raw, (bytes, bytearray)):
        return None
    return bytes(raw).decode("utf-8")


def _read_url(request: Request, timeout: float) -> str | None:
    try:
        with urlopen(request, timeout=timeout) as response:
            return _decode_body(response.read())
    except HTTPError as exc:
        try:
            return _decode_body(exc.read())
        except OSError:
            return None
    except (URLError, TimeoutError, OSError):
        return None
