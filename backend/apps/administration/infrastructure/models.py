"""Stub models for administration permissions (unmanaged)."""

from django.db import models


class Painel(models.Model):
    codigo = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        default_permissions = ()
        db_table = '"administration_painel"'
        permissions = [
                    ("view_dashboard", "Pode ver o dashboard de administração"),
                    ("view_relatorio", "Pode ver relatórios de administração")
        ]
