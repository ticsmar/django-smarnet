"""API URLs for administration."""

from django.urls import path
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.shared.presentation.auth.permissions import IsOracleAuthenticated


class AdministrationHealthView(APIView):
    permission_classes = [IsOracleAuthenticated]

    def get(self, request: Request) -> Response:
        return Response({"module": "administration"})


urlpatterns = [
    path("health/", AdministrationHealthView.as_view(), name="administration-health"),
]
