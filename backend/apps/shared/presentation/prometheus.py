"""Prometheus registry and shared metric objects."""

from __future__ import annotations

import os

import prometheus_client
from prometheus_client import CollectorRegistry, Counter, Histogram
from prometheus_client.multiprocess import MultiProcessCollector

PROMETHEUS_MULTIPROC_DIR = os.environ.get("PROMETHEUS_MULTIPROC_DIR", "")

REQUEST_DURATION = Histogram(
    "django_http_request_duration_seconds",
    "Time spent processing a request.",
    ["method", "view"],
)

REQUESTS_TOTAL = Counter(
    "django_http_requests_total",
    "Total HTTP requests.",
    ["method", "view", "status"],
)


def get_metrics_registry() -> CollectorRegistry:
    """Return a registry suitable for the current process model."""
    if PROMETHEUS_MULTIPROC_DIR and os.path.isdir(PROMETHEUS_MULTIPROC_DIR):
        registry = CollectorRegistry()
        MultiProcessCollector(registry)
        return registry
    return prometheus_client.REGISTRY
