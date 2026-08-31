"""Resolve the actor context (chapa + empresa) for a Django username.

Never trust ``emp_codigo`` values coming from the client: this function is the
single place that reads identity from the shared kernel and derives the
effective empresa owner via
:mod:`apps.commercial.domain.services.empresa_ownership`.
"""

from __future__ import annotations

from apps.commercial.domain.actor_context import ActorContext
from apps.commercial.domain.services.empresa_ownership import (
    effective_owner_emp_codigo,
)
from apps.shared.infrastructure.identity import resolve_identity


def resolve_actor_context(username: str) -> ActorContext:
    """Build the actor context from Django + SIAOS.USUARIO."""
    snapshot = resolve_identity(username)
    owner = effective_owner_emp_codigo(snapshot.emp_codigo)
    return ActorContext(
        username=username,
        usu_chapa=snapshot.usu_chapa,
        link_emp_codigo=snapshot.emp_codigo,
        owner_emp_codigo=owner,
    )
