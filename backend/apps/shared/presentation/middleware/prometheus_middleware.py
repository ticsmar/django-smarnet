"""Django middleware that records Prometheus metrics for every request."""

from __future__ import annotations

import time
from typing import TYPE_CHECKING

from django.utils.deprecation import MiddlewareMixin

from apps.shared.presentation.prometheus import REQUEST_DURATION, REQUESTS_TOTAL

if TYPE_CHECKING:
    from django.http import HttpRequest, HttpResponseBase


class PrometheusMiddleware(MiddlewareMixin):
    """Emit HTTP request count and latency metrics."""

    def process_request(self, request: HttpRequest) -> None:
        request._prometheus_start_time = time.perf_counter()  # type: ignore[attr-defined]

    def process_response(
        self,
        request: HttpRequest,
        response: HttpResponseBase,
    ) -> HttpResponseBase:
        if request.path.startswith("/metrics"):
            return response

        start = getattr(request, "_prometheus_start_time", None)
        if start is None:
            return response

        duration = time.perf_counter() - start
        view = self._resolve_view(request)

        REQUEST_DURATION.labels(method=request.method, view=view).observe(duration)
        REQUESTS_TOTAL.labels(
            method=request.method,
            view=view,
            status=str(response.status_code),
        ).inc()
        return response

    @staticmethod
    def _resolve_view(request: HttpRequest) -> str:
        resolver = getattr(request, "resolver_match", None)
        if resolver is not None:
            return resolver.view_name or resolver.url_name or request.path
        return request.path
