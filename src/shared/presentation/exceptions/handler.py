"""Composable DRF exception handler for domain exceptions."""

from collections.abc import Callable

from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler

from shared.presentation.exceptions.mappings import (
    ExceptionStatusMap,
    merge_exception_maps,
)

HandlerContext = dict[str, object]


def build_exception_handler(
    *maps: ExceptionStatusMap,
) -> Callable[[Exception, HandlerContext], Response | None]:
    status_map = merge_exception_maps(*maps)

    def handler(exc: Exception, context: HandlerContext) -> Response | None:
        for exc_type, (status_code, default_detail) in status_map.items():
            if isinstance(exc, exc_type):
                detail = str(exc) if str(exc) else default_detail
                return Response({"detail": detail}, status=status_code)
        return drf_exception_handler(exc, context)

    return handler
