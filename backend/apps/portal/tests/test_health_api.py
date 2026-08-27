from django.urls import reverse
from rest_framework.test import APIClient


def test_portal_health_requires_auth(client: APIClient) -> None:
    response = client.get(reverse("portal-health"))
    assert response.status_code in {401, 403}
