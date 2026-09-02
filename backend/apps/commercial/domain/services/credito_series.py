"""Series averages from Smarnet 3.01 ``estCli`` chart loops."""

from __future__ import annotations

from decimal import Decimal

ZERO = Decimal("0")
YEAR_MEDIA_WINDOW = 5


def rolling_mean(values: list[Decimal], window: int) -> list[Decimal]:
    """Mean of the last ``window`` points at each index (inclusive)."""
    size = max(int(window), 1)
    out: list[Decimal] = []
    for index, _value in enumerate(values):
        start = max(0, index - size + 1)
        chunk = values[start : index + 1]
        out.append(sum(chunk, ZERO) / len(chunk))
    return out


def yearly_media(values: list[Decimal]) -> list[Decimal]:
    """PHP: last five years including the current one."""
    return rolling_mean(values, YEAR_MEDIA_WINDOW)


def cumulative_mean(values: list[Decimal]) -> list[Decimal]:
    """PHP monthly média: running mean from the first month."""
    out: list[Decimal] = []
    total = ZERO
    for index, value in enumerate(values):
        total += value
        out.append(total / (index + 1))
    return out
