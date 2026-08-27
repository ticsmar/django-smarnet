"""Unmanaged Oracle models for administracao.

Only the minimum columns required to generate Django permission codenames
and to power ORM-backed queries for the SIAOS.CLIENTE catalog lookups.
"""

from django.db import models


class Cliente(models.Model):
    codigo = models.IntegerField(primary_key=True, db_column="CODIGO")
    cliente = models.CharField(
        max_length=60, null=True, blank=True, db_column="CLIENTE"
    )
    reduzido = models.CharField(
        max_length=18, null=True, blank=True, db_column="REDUZIDO"
    )
    cgc = models.CharField(max_length=20, null=True, blank=True, db_column="CGC")
    cidade = models.CharField(max_length=25, null=True, blank=True, db_column="CIDADE")
    estado = models.CharField(max_length=2, null=True, blank=True, db_column="ESTADO")
    emp_codigo = models.DecimalField(
        max_digits=11,
        decimal_places=0,
        null=True,
        blank=True,
        db_column="EMP_CODIGO",
    )
    bloqueado = models.DecimalField(
        max_digits=3,
        decimal_places=0,
        null=True,
        blank=True,
        db_column="BLOQUEADO",
    )
    tipo = models.CharField(max_length=1, null=True, blank=True, db_column="TIPO")

    class Meta:
        managed = False
        db_table = '"SIAOS"."CLIENTE"'
        permissions = [
            (
                "change_clientelimite",
                "Pode alterar limite de crédito do cliente",
            ),
            (
                "change_clienterisco",
                "Pode alterar o status/bloqueio do cliente",
            ),
        ]


class Origem(models.Model):
    origem = models.CharField(max_length=2, primary_key=True, db_column="ORIGEM")
    descricao = models.CharField(
        max_length=60, null=True, blank=True, db_column="DESCRICAO"
    )

    class Meta:
        managed = False
        db_table = '"SIAOS"."ORIGEM"'


class ClienteContato(models.Model):
    con_codigo = models.IntegerField(primary_key=True, db_column="CON_CODIGO")
    codcliente = models.IntegerField(null=True, blank=True, db_column="CODCLIENTE")
    nome = models.CharField(max_length=60, null=True, blank=True, db_column="NOME")

    class Meta:
        managed = False
        db_table = '"SIAOS"."CONTATOS"'


class ClienteCobranca(models.Model):
    codigo = models.IntegerField(db_column="CODIGO")
    chavecobra = models.CharField(max_length=9, db_column="CHAVECOBRA")

    class Meta:
        managed = False
        db_table = '"SIAOS"."COBRANCA"'
        unique_together = (("codigo", "chavecobra"),)


class ClienteEmbarque(models.Model):
    codigo = models.IntegerField(db_column="CODIGO")
    chave_emb = models.CharField(max_length=9, db_column="CHAVE_EMB")

    class Meta:
        managed = False
        db_table = '"SIAOS"."EMBARQUE"'
        unique_together = (("codigo", "chave_emb"),)
