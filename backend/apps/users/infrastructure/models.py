"""Users infrastructure ORM models."""

from django.conf import settings
from django.db import models


class UserSecurityProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="security_profile",
    )
    must_change_password = models.BooleanField(default=False)

    class Meta:
        db_table = "USER_SECURITY_PROFILE"
