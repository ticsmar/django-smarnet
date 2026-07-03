"""CORS configuration tests."""

from django.test import override_settings
from rest_framework.test import APIClient


@override_settings(CORS_ALLOWED_ORIGINS=["http://localhost:3000"])
def test_cors_allows_configured_origin() -> None:
    client = APIClient()
    response = client.get(
        "/api/schema/",
        HTTP_ORIGIN="http://localhost:3000",
    )

    assert response.status_code == 200
    assert response["Access-Control-Allow-Origin"] == "http://localhost:3000"
    assert response["Access-Control-Allow-Credentials"] == "true"


@override_settings(CORS_ALLOWED_ORIGINS=["http://localhost:3000"])
def test_cors_blocks_unlisted_origin() -> None:
    client = APIClient()
    response = client.get(
        "/api/schema/",
        HTTP_ORIGIN="http://evil.example",
    )

    assert response.status_code == 200
    assert "Access-Control-Allow-Origin" not in response
