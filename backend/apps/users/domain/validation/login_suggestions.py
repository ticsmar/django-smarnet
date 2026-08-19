"""Login suggestion helpers aligned with legacy cadastra_usuario.php."""

from __future__ import annotations

import re
import unicodedata


def fold_login_token(value: str) -> str:
    """Lowercase + strip accents for login suggestions (legado usa strtolower)."""
    normalized = unicodedata.normalize("NFKD", value or "")
    ascii_only = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    return ascii_only.lower().strip()


def nome_reduzido_compact(nome: str) -> str:
    """Espelho de nome_reduzido/nameFormat size=A + remove espaços/pontos."""
    particles = {"e", "de", "do", "da", "dos", "das", "em"}
    not_end = {"junior", "jr", "filho", "neto"}
    parts = [p for p in fold_login_token(nome).split() if p]
    if not parts:
        return ""
    end = len(parts) - 1
    if any(p in not_end for p in parts):
        end = max(0, len(parts) - 2)
    reduced: list[str] = []
    for key, part in enumerate(parts):
        if part not in particles and key > 0 and key < end:
            reduced.append(f"{part[0]}.")
        else:
            reduced.append(part)
    return "".join(reduced).replace(".", "").replace(" ", "")


def build_login_suggestions(nome: str, email: str, emp_codigo: int | None) -> list[str]:
    """Sugestões no padrão cadastra_usuario.php."""
    parts = [p for p in fold_login_token(nome).split() if p]
    options: list[str] = []
    if parts:
        tam = len(parts)
        if parts[-1] in {"junior", "filho", "neto"} and tam > 1:
            tam -= 1
        first = parts[0]
        last = parts[tam - 1] if tam >= 1 else first
        second = parts[1] if len(parts) > 1 else first
        options.extend(
            [
                f"{first}.{last}",
                f"{first}.{second}",
                nome_reduzido_compact(nome),
                f"{first[0]}{last}" if first else last,
            ]
        )
        if emp_codigo == 1:
            options.append(first)
        else:
            email_local = fold_login_token((email or "").split("@", 1)[0])
            options.append(email_local or first)
    else:
        email_local = fold_login_token((email or "").split("@", 1)[0])
        if email_local:
            options.append(email_local)

    cleaned: list[str] = []
    seen: set[str] = set()
    for raw in options:
        candidate = re.sub(r"[^a-z0-9_.]+", "", raw or "").strip(".")
        if not candidate:
            continue
        if not candidate[0].isalpha():
            candidate = f"u{candidate}"
        candidate = candidate[:20]
        if candidate in seen:
            continue
        seen.add(candidate)
        cleaned.append(candidate)
    return cleaned
