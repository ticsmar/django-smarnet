from django.urls import reverse
from rest_framework.test import APIClient


def test_production_health_requires_auth(client: APIClient) -> None:
    response = client.get(reverse("production-health"))
    assert response.status_code in {401, 403}
