"""Native catalog + unmanaged Oracle stub for Django permission codenames."""

from django.db import models


class FollowupSistema(models.Model):
    codigo = models.PositiveIntegerField(primary_key=True)
    nome = models.CharField(max_length=80)
    descricao = models.CharField(max_length=200, blank=True, default="")
    ativo = models.BooleanField(default=True)

    class Meta:
        db_table = "FOLLOWUP_SISTEMA"
        ordering = ["codigo"]
        verbose_name = "Sistema do follow-up"
        verbose_name_plural = "Sistemas do follow-up"


class Recado(models.Model):
    pre_codigo = models.IntegerField(primary_key=True, db_column="PRE_CODIGO")

    class Meta:
        managed = False
        db_table = '"SIAOS"."PROP_RECADO"'
