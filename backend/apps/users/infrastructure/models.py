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
    # Vínculo legado: PES_NUMERO / EMP_CODIGO vêm de SIAOS.USUARIO via USU_CHAPA.
    usu_chapa = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = "USER_SECURITY_PROFILE"


class Empresa(models.Model):
    emp_codigo = models.IntegerField(primary_key=True, db_column="EMP_CODIGO")
    emp_nome = models.CharField(
        max_length=200, null=True, blank=True, db_column="EMP_NOME"
    )
    emp_acesso = models.CharField(
        max_length=1, null=True, blank=True, db_column="EMP_ACESSO"
    )
    emp_tipo = models.CharField(
        max_length=1, null=True, blank=True, db_column="EMP_TIPO"
    )
    emp_reduzido = models.CharField(
        max_length=100, null=True, blank=True, db_column="EMP_REDUZIDO"
    )
    emp_endereco = models.CharField(
        max_length=200, null=True, blank=True, db_column="EMP_ENDERECO"
    )
    emp_bairro = models.CharField(
        max_length=100, null=True, blank=True, db_column="EMP_BAIRRO"
    )
    emp_cep = models.CharField(
        max_length=20, null=True, blank=True, db_column="EMP_CEP"
    )
    pai_codigo = models.IntegerField(null=True, blank=True, db_column="PAI_CODIGO")
    est_codigo = models.IntegerField(null=True, blank=True, db_column="EST_CODIGO")
    emp_estado = models.CharField(
        max_length=2, null=True, blank=True, db_column="EMP_ESTADO"
    )
    emp_cidade = models.CharField(
        max_length=100, null=True, blank=True, db_column="EMP_CIDADE"
    )
    emp_homepage = models.CharField(
        max_length=200, null=True, blank=True, db_column="EMP_HOMEPAGE"
    )
    emp_codigo_fab = models.IntegerField(
        null=True, blank=True, db_column="EMP_CODIGO_FAB"
    )
    lpr_codigo = models.IntegerField(null=True, blank=True, db_column="LPR_CODIGO")
    emp_ativa = models.IntegerField(null=True, blank=True, db_column="EMP_ATIVA")

    class Meta:
        managed = False
        db_table = '"GERAL"."EMPRESA"'


class PaisNome(models.Model):
    pai_codigo = models.IntegerField(primary_key=True, db_column="PAI_CODIGO")
    lin_cod = models.IntegerField(db_column="LIN_COD")
    pno_nome = models.CharField(
        max_length=100, null=True, blank=True, db_column="PNO_NOME"
    )

    class Meta:
        managed = False
        db_table = '"GERAL"."PAIS_NOME"'


class Estado(models.Model):
    est_codigo = models.IntegerField(primary_key=True, db_column="EST_CODIGO")
    pai_codigo = models.IntegerField(db_column="PAI_CODIGO")
    est_nome = models.CharField(
        max_length=100, null=True, blank=True, db_column="EST_NOME"
    )

    class Meta:
        managed = False
        db_table = '"GERAL"."ESTADO"'


class PrePessoa(models.Model):
    ppe_codigo = models.IntegerField(primary_key=True, db_column="PPE_CODIGO")
    ppe_nome = models.CharField(
        max_length=100, null=True, blank=True, db_column="PPE_NOME"
    )
    ppe_email = models.CharField(
        max_length=60, null=True, blank=True, db_column="PPE_EMAIL"
    )
    fus_codigo = models.IntegerField(null=True, blank=True, db_column="FUS_CODIGO")
    pre_sexo = models.CharField(
        max_length=1, null=True, blank=True, db_column="PRE_SEXO"
    )
    lin_cod = models.IntegerField(null=True, blank=True, db_column="LIN_COD")
    ppe_endereco = models.CharField(
        max_length=100, null=True, blank=True, db_column="PPE_ENDERECO"
    )
    ppe_bairro = models.CharField(
        max_length=60, null=True, blank=True, db_column="PPE_BAIRRO"
    )
    ppe_cidade = models.CharField(
        max_length=60, null=True, blank=True, db_column="PPE_CIDADE"
    )
    est_codigo = models.IntegerField(null=True, blank=True, db_column="EST_CODIGO")
    ppe_estado = models.CharField(
        max_length=30, null=True, blank=True, db_column="PPE_ESTADO"
    )
    ppe_cep = models.CharField(
        max_length=11, null=True, blank=True, db_column="PPE_CEP"
    )
    pai_codigo = models.IntegerField(null=True, blank=True, db_column="PAI_CODIGO")
    fun_chapa = models.IntegerField(null=True, blank=True, db_column="FUN_CHAPA")
    tep_codigo = models.CharField(
        max_length=1, null=True, blank=True, db_column="TEP_CODIGO"
    )
    ppe_e_nome = models.CharField(
        max_length=60, null=True, blank=True, db_column="PPE_E_NOME"
    )
    ppe_e_endereco = models.CharField(
        max_length=100, null=True, blank=True, db_column="PPE_E_ENDERECO"
    )
    ppe_e_bairro = models.CharField(
        max_length=60, null=True, blank=True, db_column="PPE_E_BAIRRO"
    )
    ppe_e_cidade = models.CharField(
        max_length=60, null=True, blank=True, db_column="PPE_E_CIDADE"
    )
    est_e_codigo = models.IntegerField(null=True, blank=True, db_column="EST_E_CODIGO")
    ppe_e_estado = models.CharField(
        max_length=30, null=True, blank=True, db_column="PPE_E_ESTADO"
    )
    ppe_e_cep = models.CharField(
        max_length=11, null=True, blank=True, db_column="PPE_E_CEP"
    )
    pai_e_codigo = models.IntegerField(null=True, blank=True, db_column="PAI_E_CODIGO")
    ppe_e_homepage = models.CharField(
        max_length=100, null=True, blank=True, db_column="PPE_E_HOMEPAGE"
    )
    ppe_motivo = models.TextField(null=True, blank=True, db_column="PPE_MOTIVO")
    pes_numero = models.IntegerField(null=True, blank=True, db_column="PES_NUMERO")
    emp_codigo = models.IntegerField(null=True, blank=True, db_column="EMP_CODIGO")
    ppe_dt_solic = models.DateField(null=True, blank=True, db_column="PPE_DT_SOLIC")
    ppe_dt_baixa = models.DateField(null=True, blank=True, db_column="PPE_DT_BAIXA")

    class Meta:
        managed = False
        db_table = '"GERAL"."PRE_PESSOA"'


class Pessoa(models.Model):
    pes_numero = models.IntegerField(primary_key=True, db_column="PES_NUMERO")
    pes_nome = models.CharField(
        max_length=100, null=True, blank=True, db_column="PES_NOME"
    )
    pes_email = models.CharField(
        max_length=60, null=True, blank=True, db_column="PES_EMAIL"
    )
    pes_ativo = models.IntegerField(null=True, blank=True, db_column="PES_ATIVO")
    pes_cidade = models.CharField(
        max_length=60, null=True, blank=True, db_column="PES_CIDADE"
    )
    est_codigo = models.IntegerField(null=True, blank=True, db_column="EST_CODIGO")
    pes_estado = models.CharField(
        max_length=30, null=True, blank=True, db_column="PES_ESTADO"
    )
    pes_cep = models.CharField(
        max_length=11, null=True, blank=True, db_column="PES_CEP"
    )
    pai_codigo = models.IntegerField(null=True, blank=True, db_column="PAI_CODIGO")
    pes_sexo = models.CharField(
        max_length=1, null=True, blank=True, db_column="PES_SEXO"
    )
    pes_endereco = models.CharField(
        max_length=100, null=True, blank=True, db_column="PES_ENDERECO"
    )
    pes_bairro = models.CharField(
        max_length=60, null=True, blank=True, db_column="PES_BAIRRO"
    )

    class Meta:
        managed = False
        db_table = '"SIAOS"."PESSOA"'


class PessoaMeioContato(models.Model):
    pes_numero = models.IntegerField(db_column="PES_NUMERO")
    pmc_codigo = models.IntegerField(primary_key=True, db_column="PMC_CODIGO")
    ptc_codigo = models.IntegerField(db_column="PTC_CODIGO")
    pmc_referencia = models.CharField(max_length=250, db_column="PMC_REFERENCIA")

    class Meta:
        managed = False
        db_table = '"SIAOS"."PESSOA_MEIO_CONT"'


class PessoaTipoContato(models.Model):
    ptc_codigo = models.IntegerField(primary_key=True, db_column="PTC_CODIGO")
    ptc_nome = models.CharField(
        max_length=30, null=True, blank=True, db_column="PTC_NOME"
    )
    ptc_meio = models.CharField(
        max_length=1, null=True, blank=True, db_column="PTC_MEIO"
    )
    leg_codigo = models.IntegerField(null=True, blank=True, db_column="LEG_CODIGO")
    ptc_validacao = models.CharField(
        max_length=2000, null=True, blank=True, db_column="PTC_VALIDACAO"
    )

    class Meta:
        managed = False
        db_table = '"SIAOS"."PESSOA_TIPO_CONT"'


class SiaosUsuario(models.Model):
    usu_chapa = models.IntegerField(primary_key=True, db_column="USU_CHAPA")
    usu_login = models.CharField(
        max_length=20, null=True, blank=True, db_column="USU_LOGIN"
    )
    usu_nome = models.CharField(
        max_length=60, null=True, blank=True, db_column="USU_NOME"
    )
    usu_sigla = models.CharField(
        max_length=3, null=True, blank=True, db_column="USU_SIGLA"
    )
    usu_loginweb = models.CharField(
        max_length=20, null=True, blank=True, db_column="USU_LOGINWEB"
    )
    usu_email = models.CharField(
        max_length=50, null=True, blank=True, db_column="USU_EMAIL"
    )
    usu_status = models.IntegerField(null=True, blank=True, db_column="USU_STATUS")
    cc_codigo = models.CharField(
        max_length=10, null=True, blank=True, db_column="CC_CODIGO"
    )
    pes_numero = models.IntegerField(null=True, blank=True, db_column="PES_NUMERO")
    emp_codigo = models.IntegerField(null=True, blank=True, db_column="EMP_CODIGO")
    lin_cod = models.IntegerField(null=True, blank=True, db_column="LIN_COD")
    lpr_codigo = models.IntegerField(null=True, blank=True, db_column="LPR_CODIGO")
    origem = models.CharField(max_length=2, null=True, blank=True, db_column="ORIGEM")

    class Meta:
        managed = False
        db_table = '"SIAOS"."USUARIO"'


class Lingua(models.Model):
    lin_cod = models.IntegerField(primary_key=True, db_column="LIN_COD")
    lin_desc = models.CharField(
        max_length=100, null=True, blank=True, db_column="LIN_DESC"
    )

    class Meta:
        managed = False
        db_table = '"SIAOS"."LINGUA"'


class ListaPreco(models.Model):
    lpr_codigo = models.IntegerField(primary_key=True, db_column="LPR_CODIGO")
    lpr_nome = models.CharField(
        max_length=100, null=True, blank=True, db_column="LPR_NOME"
    )
    usu_chapa = models.IntegerField(null=True, blank=True, db_column="USU_CHAPA")

    class Meta:
        managed = False
        db_table = '"SIAOS"."LISTA_PRECO"'


class CentroCusto(models.Model):
    cc_codigo = models.CharField(max_length=10, primary_key=True, db_column="CC_CODIGO")
    cc_nome = models.CharField(
        max_length=50, null=True, blank=True, db_column="CC_NOME"
    )
    cc_ativo = models.CharField(
        max_length=1, null=True, blank=True, db_column="CC_ATIVO"
    )

    class Meta:
        managed = False
        db_table = '"SIAOS"."CENTRO_CUSTO"'


class Funcionario(models.Model):
    fun_chapa = models.IntegerField(primary_key=True, db_column="FUN_CHAPA")
    fun_apelido = models.CharField(
        max_length=30, null=True, blank=True, db_column="FUN_APELIDO"
    )
    cc_codigo = models.CharField(
        max_length=9, null=True, blank=True, db_column="CC_CODIGO"
    )
    fun_unidade = models.CharField(
        max_length=5, null=True, blank=True, db_column="FUN_UNIDADE"
    )
    fun_ramal = models.IntegerField(null=True, blank=True, db_column="FUN_RAMAL")
    fun_cargo = models.CharField(
        max_length=50, null=True, blank=True, db_column="FUN_CARGO"
    )
    fun_ativo = models.CharField(
        max_length=1, null=True, blank=True, db_column="FUN_ATIVO"
    )
    fun_dt_adm = models.DateField(null=True, blank=True, db_column="FUN_DT_ADM")
    fun_externo = models.CharField(
        max_length=1, null=True, blank=True, db_column="FUN_EXTERNO"
    )
    fun_endereco = models.CharField(
        max_length=60, null=True, blank=True, db_column="FUN_ENDERECO"
    )
    fun_cidade = models.CharField(
        max_length=30, null=True, blank=True, db_column="FUN_CIDADE"
    )
    fun_uf = models.CharField(max_length=2, null=True, blank=True, db_column="FUN_UF")
    fun_bairro = models.CharField(
        max_length=30, null=True, blank=True, db_column="FUN_BAIRRO"
    )
    fun_cep = models.CharField(
        max_length=11, null=True, blank=True, db_column="FUN_CEP"
    )
    fun_sexo = models.CharField(
        max_length=1, null=True, blank=True, db_column="FUN_SEXO"
    )
    fun_filial = models.CharField(
        max_length=2, null=True, blank=True, db_column="FUN_FILIAL"
    )
    fun_terceiro = models.IntegerField(null=True, blank=True, db_column="FUN_TERCEIRO")
    pes_numero = models.IntegerField(null=True, blank=True, db_column="PES_NUMERO")

    class Meta:
        managed = False
        db_table = '"SIAOS"."FUNCIONARIO"'
