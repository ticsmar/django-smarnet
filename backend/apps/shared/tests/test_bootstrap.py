"""Bootstrap tests to verify pytest and coverage tooling."""

from apps.shared.domain import __doc__ as domain_doc


def test_shared_domain_package_exists() -> None:
    assert domain_doc is not None
