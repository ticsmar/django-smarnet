"""Tests for composable domain exception handler."""

from collections.abc import Callable

import pytest
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView

from apps.shared.presentation.exceptions.handler import (
    HandlerContext,
    build_exception_handler,
)


class SampleDomainError(Exception):
    pass


class SampleBaseError(Exception):
    pass


class SampleSpecificError(SampleBaseError):
    pass


SAMPLE_STATUS_MAP = {
    SampleSpecificError: (409, "Conflict."),
    SampleBaseError: (400, "Bad request."),
    SampleDomainError: (422, None),
}


@pytest.fixture
def handler() -> Callable[[Exception, HandlerContext], Response | None]:
    return build_exception_handler(SAMPLE_STATUS_MAP)


@pytest.fixture
def api_context() -> HandlerContext:
    factory = APIRequestFactory()
    request = factory.get("/")
    view = APIView()
    return {"request": request, "view": view}


def test_handler_maps_domain_exception(
    handler: Callable[[Exception, HandlerContext], Response | None],
    api_context: HandlerContext,
) -> None:
    response = handler(SampleDomainError("custom message"), api_context)

    assert isinstance(response, Response)
    assert response.status_code == 422
    assert response.data == {"detail": "custom message"}


def test_handler_uses_default_detail_when_message_empty(
    handler: Callable[[Exception, HandlerContext], Response | None],
    api_context: HandlerContext,
) -> None:
    response = handler(SampleSpecificError(), api_context)

    assert isinstance(response, Response)
    assert response.status_code == 409
    assert response.data == {"detail": "Conflict."}


def test_handler_matches_most_specific_mapping_first(
    handler: Callable[[Exception, HandlerContext], Response | None],
    api_context: HandlerContext,
) -> None:
    response = handler(SampleSpecificError("specific"), api_context)

    assert isinstance(response, Response)
    assert response.status_code == 409


def test_handler_falls_through_to_drf_default(
    handler: Callable[[Exception, HandlerContext], Response | None],
    api_context: HandlerContext,
) -> None:
    response = handler(NotFound("missing"), api_context)

    assert isinstance(response, Response)
    assert response.status_code == 404
