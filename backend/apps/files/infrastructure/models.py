"""Native catalog + unmanaged Oracle stub for Django permission codenames."""

from django.db import models


class FileManagerSistema(models.Model):
    codigo = models.PositiveIntegerField(primary_key=True)
    nome = models.CharField(max_length=80)
    descricao = models.CharField(max_length=200, blank=True, default="")
    ativo = models.BooleanField(default=True)

    class Meta:
        db_table = "ARQUIVOS_SISTEMA"
        ordering = ["codigo"]
        verbose_name = "Sistema do gerenciador de arquivos"
        verbose_name_plural = "Sistemas do gerenciador de arquivos"


class Arquivo(models.Model):
    par_codigo = models.IntegerField(primary_key=True, db_column="PAR_CODIGO")

    class Meta:
        managed = False
        db_table = '"SIAOS"."PROP_ARQUIVO"'
