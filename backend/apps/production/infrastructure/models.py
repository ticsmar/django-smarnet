"""Stub models for production permissions (unmanaged)."""

from django.db import models


class OrdemProducao(models.Model):
    codigo = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        default_permissions = ("view", "add", "change", "delete")
        db_table = f'"production_ordemproducao"'
        permissions = [
                    
        ]
