"""OpenAPI schema smoke tests."""

from rest_framework.test import APIClient


def test_openapi_schema_endpoint(api_client: APIClient) -> None:
    response = api_client.get("/api/schema/")

    assert response.status_code == 200
    assert b"/api/users/login/" in response.content


def test_swagger_ui_endpoint(api_client: APIClient) -> None:
    response = api_client.get("/api/docs/")

    assert response.status_code == 200
    assert b"swagger" in response.content.lower()
