"""Pure unit tests for administracao empresa_ownership service."""

import pytest

from apps.commercial.domain.services.empresa_ownership import (
    DEFAULT_OWNER_EMP_CODIGO,
    FACTORY_EMP_CODIGOS,
    can_edit_customer,
    can_view_customer,
    customer_effective_owner,
    effective_owner_emp_codigo,
    normalize_emp_codigo,
    sql_emp_filter_clause,
)


@pytest.mark.parametrize(
    "value, expected",
    [
        (None, DEFAULT_OWNER_EMP_CODIGO),
        (0, 0),
        (1, 1),
        (5, 5),
        (999, 999),
    ],
)
def test_normalize_emp_codigo(value: int | None, expected: int) -> None:
    assert normalize_emp_codigo(value) == expected


@pytest.mark.parametrize("factory", sorted(FACTORY_EMP_CODIGOS))
def test_effective_owner_returns_factory_for_factory_link(factory: int) -> None:
    assert effective_owner_emp_codigo(factory) == factory


@pytest.mark.parametrize("value", [None, 0, 1, 2, 3, 4, 6, 100, 200])
def test_effective_owner_collapses_non_factory_to_default(value: int | None) -> None:
    assert effective_owner_emp_codigo(value) == DEFAULT_OWNER_EMP_CODIGO


@pytest.mark.parametrize("factory", sorted(FACTORY_EMP_CODIGOS))
def test_customer_owner_for_factory_row(factory: int) -> None:
    assert customer_effective_owner(factory) == factory


@pytest.mark.parametrize("value", [None, 0, 1, 3, 200])
def test_customer_owner_defaults_for_shared_pool(value: int | None) -> None:
    assert customer_effective_owner(value) == DEFAULT_OWNER_EMP_CODIGO


def test_can_view_customer_matching_factory() -> None:
    assert can_view_customer(actor_link_emp=5, cliente_emp=5) is True


def test_can_view_customer_factory_cannot_see_shared_pool() -> None:
    assert can_view_customer(actor_link_emp=5, cliente_emp=1) is False
    assert can_view_customer(actor_link_emp=5, cliente_emp=None) is False
    assert can_view_customer(actor_link_emp=5, cliente_emp=3) is False


def test_can_view_customer_shared_pool_ignores_null_and_random() -> None:
    assert can_view_customer(actor_link_emp=None, cliente_emp=None) is True
    assert can_view_customer(actor_link_emp=None, cliente_emp=3) is True
    assert can_view_customer(actor_link_emp=2, cliente_emp=None) is True


def test_can_view_customer_shared_pool_cannot_see_factory() -> None:
    assert can_view_customer(actor_link_emp=None, cliente_emp=5) is False
    assert can_view_customer(actor_link_emp=1, cliente_emp=7) is False


def test_can_edit_matches_view_for_this_delivery() -> None:
    assert can_edit_customer(actor_link_emp=1, cliente_emp=1) is True
    assert can_edit_customer(actor_link_emp=7, cliente_emp=1) is False


def test_sql_filter_for_factory_owner() -> None:
    fragment, params = sql_emp_filter_clause(15)
    assert fragment == "EMP_CODIGO = %s"
    assert params == [15]


def test_sql_filter_for_shared_pool_owner() -> None:
    fragment, params = sql_emp_filter_clause(DEFAULT_OWNER_EMP_CODIGO)
    factories = sorted(FACTORY_EMP_CODIGOS)
    placeholders = ", ".join(["%s"] * len(factories))
    assert fragment == f"NVL(EMP_CODIGO, 1) NOT IN ({placeholders})"
    assert params == list(factories)
