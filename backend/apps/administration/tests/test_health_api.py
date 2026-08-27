from django.urls import reverse
from rest_framework.test import APIClient


def test_administration_health_requires_auth(client: APIClient) -> None:
    response = client.get(reverse("administration-health"))
    assert response.status_code in {401, 403}
