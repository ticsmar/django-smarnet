"""Transaction scope backed by Django's atomic block."""

from collections.abc import Callable
from contextlib import AbstractContextManager

from django.db import transaction


def build_transaction_scope() -> Callable[[], AbstractContextManager[object]]:
    return transaction.atomic
