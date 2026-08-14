"""Expose Prometheus metrics."""

from __future__ import annotations

from django.http import HttpRequest, HttpResponse
from django.views import View
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest

from apps.shared.presentation.prometheus import get_metrics_registry


class MetricsView(View):
    """Prometheus scrape endpoint."""

    def get(self, request: HttpRequest) -> HttpResponse:
        registry = get_metrics_registry()
        return HttpResponse(
            generate_latest(registry),
            content_type=CONTENT_TYPE_LATEST,
        )
