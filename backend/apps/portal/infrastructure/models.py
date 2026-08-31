"""Stub models for portal permissions (unmanaged)."""

from django.db import models


class Noticia(models.Model):
    codigo = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        default_permissions = ("view", "add", "change", "delete")
        db_table = '"portal_noticia"'
        permissions = ()
