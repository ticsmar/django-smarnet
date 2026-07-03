from django.urls import path
from rest_framework.routers import DefaultRouter

from branch_auth.presentation.views.branch_auth_views import (
    AccessTokenViewSet,
    VerifyTokenView,
)

router = DefaultRouter()
router.register("tokens", AccessTokenViewSet, basename="access-token")

urlpatterns = [
    path("verify-token/", VerifyTokenView.as_view(), name="verify-token"),
] + router.urls
