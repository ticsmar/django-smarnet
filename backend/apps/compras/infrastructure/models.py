"""Unmanaged Oracle models for NOVASMAR recebimento tables."""

from django.db import models


class Fornecedor(models.Model):
    for_codigo = models.IntegerField(primary_key=True, db_column="FOR_CODIGO")
    emp_codigo = models.DecimalField(
        max_digits=11, decimal_places=0, null=True, blank=True, db_column="EMP_CODIGO"
    )
    for_razao_soc = models.CharField(
        max_length=300, null=True, blank=True, db_column="FOR_RAZAO_SOC"
    )
    for_nome_reduz = models.CharField(
        max_length=50, null=True, blank=True, db_column="FOR_NOME_REDUZ"
    )
    for_endereco = models.CharField(
        max_length=300, null=True, blank=True, db_column="FOR_ENDERECO"
    )
    for_bairro = models.CharField(
        max_length=100, null=True, blank=True, db_column="FOR_BAIRRO"
    )
    for_munic = models.CharField(
        max_length=100, null=True, blank=True, db_column="FOR_MUNIC"
    )
    for_cep = models.CharField(
        max_length=20, null=True, blank=True, db_column="FOR_CEP"
    )
    for_estado = models.CharField(
        max_length=100, null=True, blank=True, db_column="FOR_ESTADO"
    )
    pai_codigo = models.DecimalField(
        max_digits=11, decimal_places=0, null=True, blank=True, db_column="PAI_CODIGO"
    )
    for_dt_cad = models.DateTimeField(null=True, blank=True, db_column="FOR_DT_CAD")
    for_dt_atual = models.DateTimeField(null=True, blank=True, db_column="FOR_DT_ATUAL")
    for_ativo = models.IntegerField(null=True, blank=True, db_column="FOR_ATIVO")

    class Meta:
        managed = False
        db_table = '"NOVASMAR"."FORNECEDOR"'


class FornecContato(models.Model):
    fco_codigo = models.IntegerField(primary_key=True, db_column="FCO_CODIGO")
    for_codigo = models.IntegerField(null=True, blank=True, db_column="FOR_CODIGO")
    fco_nome = models.CharField(
        max_length=100, null=True, blank=True, db_column="FCO_NOME"
    )
    fco_cargo = models.CharField(
        max_length=80, null=True, blank=True, db_column="FCO_CARGO"
    )
    fco_email = models.CharField(
        max_length=80, null=True, blank=True, db_column="FCO_EMAIL"
    )
    fco_telefone = models.CharField(
        max_length=30, null=True, blank=True, db_column="FCO_TELEFONE"
    )

    class Meta:
        managed = False
        db_table = '"NOVASMAR"."FORNEC_CONTATO"'


class MsgErro(models.Model):
    msg_erro_bd = models.CharField(
        max_length=4000, primary_key=True, db_column="MSG_ERRO_BD"
    )
    msg_usu_port = models.CharField(
        max_length=4000, null=True, blank=True, db_column="MSG_USU_PORT"
    )
    msg_acao_port = models.CharField(
        max_length=4000, null=True, blank=True, db_column="MSG_ACAO_PORT"
    )
    msg_usu_ing = models.CharField(
        max_length=4000, null=True, blank=True, db_column="MSG_USU_ING"
    )
    msg_acao_ing = models.CharField(
        max_length=4000, null=True, blank=True, db_column="MSG_ACAO_ING"
    )

    class Meta:
        managed = False
        db_table = '"NOVASMAR"."MSG_ERRO"'


class Pais(models.Model):
    pai_codigo = models.IntegerField(primary_key=True, db_column="PAI_CODIGO")
    pai_nome = models.CharField(
        max_length=50, null=True, blank=True, db_column="PAI_NOME"
    )
    eti_codigo = models.IntegerField(null=True, blank=True, db_column="ETI_CODIGO")
    ya_codgi = models.CharField(
        max_length=3, null=True, blank=True, db_column="YA_CODGI"
    )
    cch_codigo = models.CharField(
        max_length=6, null=True, blank=True, db_column="CCH_CODIGO"
    )

    class Meta:
        managed = False
        db_table = '"GERAL"."PAIS"'
