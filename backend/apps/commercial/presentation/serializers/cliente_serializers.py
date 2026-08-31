"""Cliente API serializers."""

from rest_framework import serializers

_TIPO_CADASTRO = (
    ("J", "Jurídica"),
    ("F", "Física"),
    ("FUNC", "Funcionário"),
    ("I", "Internacional"),
)
_IDIOMA = (("P", "Português"), ("I", "Inglês"))


class ListClientesQuerySerializer(serializers.Serializer):
    search = serializers.CharField(required=False, allow_blank=True, default="")
    page = serializers.IntegerField(required=False, default=1)
    page_size = serializers.IntegerField(required=False, default=20)


class ClienteListItemSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    cliente = serializers.CharField(allow_null=True)
    reduzido = serializers.CharField(allow_null=True)
    cgc = serializers.CharField(allow_null=True)
    cidade = serializers.CharField(allow_null=True)
    estado = serializers.CharField(allow_null=True)
    emp_codigo = serializers.IntegerField()
    bloqueado = serializers.IntegerField()
    tipo = serializers.CharField(allow_null=True)
    can_edit = serializers.BooleanField()
    crs_cod_letra = serializers.CharField(allow_null=True, required=False)
    crs_desc_longa = serializers.CharField(allow_null=True, required=False)
    crs_restricao = serializers.IntegerField(allow_null=True, required=False)
    crs_cores = serializers.CharField(allow_null=True, required=False)
    cadastro_checagem = serializers.IntegerField(allow_null=True, required=False)


class PaginatedClientesSerializer(serializers.Serializer):
    items = ClienteListItemSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class ClienteDetailSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    origem = serializers.CharField(allow_null=True)
    cliente = serializers.CharField(allow_null=True)
    reduzido = serializers.CharField(allow_null=True)
    tipo = serializers.CharField(allow_null=True)
    endereco1 = serializers.CharField(allow_null=True)
    endereco2 = serializers.CharField(allow_null=True)
    endereco3 = serializers.CharField(allow_null=True)
    cli_bairro = serializers.CharField(allow_null=True)
    cidade = serializers.CharField(allow_null=True)
    estado = serializers.CharField(allow_null=True)
    cep = serializers.CharField(allow_null=True)
    pais = serializers.CharField(allow_null=True)
    pai_codigo = serializers.IntegerField(allow_null=True)
    est_codigo = serializers.IntegerField(allow_null=True)
    telefone1 = serializers.CharField(allow_null=True)
    telefone2 = serializers.CharField(allow_null=True)
    fax = serializers.CharField(allow_null=True)
    email = serializers.CharField(allow_null=True)
    homepage = serializers.CharField(allow_null=True)
    cgc = serializers.CharField(allow_null=True)
    inscr_est = serializers.CharField(allow_null=True)
    cli_inscr_mun = serializers.CharField(allow_null=True)
    cli_tipo = serializers.CharField(allow_null=True)
    cli_pes_tipo = serializers.CharField(allow_null=True)
    cli_contribuinte = serializers.IntegerField(allow_null=True)
    cli_ie_isento = serializers.IntegerField(allow_null=True)
    cli_cnae = serializers.CharField(allow_null=True)
    cli_cod_mun_ibge = serializers.CharField(allow_null=True)
    cli_inscr_suframa = serializers.CharField(allow_null=True)
    cli_nif = serializers.CharField(allow_null=True)
    contato = serializers.CharField(allow_null=True)
    contatotec = serializers.CharField(allow_null=True)
    contatofin = serializers.CharField(allow_null=True)
    observa = serializers.CharField(allow_null=True)
    emp_codigo = serializers.IntegerField()
    bloqueado = serializers.IntegerField()
    mensagem_bloqueio = serializers.CharField(allow_null=True, required=False)
    dt_atual = serializers.DateTimeField(allow_null=True)
    dt_cad = serializers.DateTimeField(allow_null=True)
    can_edit = serializers.BooleanField()
    show_financeiro = serializers.BooleanField(required=False)
    cli_grupo_trib = serializers.CharField(allow_null=True, required=False)
    aos_codigo_com = serializers.IntegerField(allow_null=True, required=False)
    aos_codigo_tec = serializers.IntegerField(allow_null=True, required=False)
    classe = serializers.CharField(allow_null=True, required=False)
    territorio = serializers.CharField(allow_null=True, required=False)
    vendedor = serializers.CharField(allow_null=True, required=False)
    cli_email_nfse = serializers.CharField(allow_null=True, required=False)
    limitecr = serializers.IntegerField(allow_null=True, required=False)
    cli_limite_crv = serializers.IntegerField(allow_null=True, required=False)
    ccontabil = serializers.CharField(allow_null=True, required=False)
    cli_fome_zero = serializers.IntegerField(allow_null=True, required=False)
    cli_montador = serializers.IntegerField(allow_null=True, required=False)
    flagmulta = serializers.IntegerField(allow_null=True, required=False)
    flagsuspen = serializers.IntegerField(allow_null=True, required=False)
    flagcobra = serializers.IntegerField(allow_null=True, required=False)
    vencprog = serializers.IntegerField(allow_null=True, required=False)
    zona_franca = serializers.IntegerField(allow_null=True, required=False)
    iss = serializers.IntegerField(allow_null=True, required=False)
    exportacao = serializers.IntegerField(allow_null=True, required=False)
    taxamulta = serializers.IntegerField(allow_null=True, required=False)
    desc_max = serializers.IntegerField(allow_null=True, required=False)
    obsvenc = serializers.CharField(allow_null=True, required=False)
    cli_reccof = serializers.CharField(allow_null=True, required=False)
    cli_reccsll = serializers.CharField(allow_null=True, required=False)
    cli_recpis = serializers.CharField(allow_null=True, required=False)
    mpg_codigo = serializers.IntegerField(allow_null=True, required=False)
    cli_mod_pagt = serializers.CharField(allow_null=True, required=False)
    cobranca = serializers.CharField(allow_null=True, required=False)
    entrega = serializers.CharField(allow_null=True, required=False)
    con_codigo_com = serializers.IntegerField(allow_null=True, required=False)
    con_codigo_tec = serializers.IntegerField(allow_null=True, required=False)
    con_codigo_fin = serializers.IntegerField(allow_null=True, required=False)
    crs_cod_protheus = serializers.CharField(allow_null=True, required=False)
    crs_cod_letra = serializers.CharField(allow_null=True, required=False)
    crs_desc = serializers.CharField(allow_null=True, required=False)
    crs_desc_longa = serializers.CharField(allow_null=True, required=False)
    crs_restricao = serializers.IntegerField(allow_null=True, required=False)


class GravaClienteRequestSerializer(serializers.Serializer):
    tipo_cadastro = serializers.ChoiceField(choices=_TIPO_CADASTRO)
    cliente = serializers.CharField(max_length=60)
    reduzido = serializers.CharField(
        max_length=18, required=False, allow_blank=True, allow_null=True
    )
    endereco1 = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    endereco2 = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    endereco3 = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cli_bairro = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cidade = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    estado = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cep = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    pais = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    pai_codigo = serializers.IntegerField(required=False, allow_null=True)
    est_codigo = serializers.IntegerField(required=False, allow_null=True)
    telefone1 = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    telefone2 = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    fax = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    email = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    homepage = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cgc = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    inscr_est = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cli_inscr_mun = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_ie_isento = serializers.IntegerField(required=False, default=0)
    cli_contribuinte = serializers.IntegerField(required=False, default=2)
    cli_cnae = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cli_cod_mun_ibge = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_inscr_suframa = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_nif = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cli_pes_tipo = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    origem = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    contato = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    contatotec = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    contatofin = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    observa = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    idioma_msg = serializers.ChoiceField(choices=_IDIOMA, required=False, default="P")
    cli_tipo = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    aos_codigo_com = serializers.IntegerField(required=False, allow_null=True)
    aos_codigo_tec = serializers.IntegerField(required=False, allow_null=True)
    cli_grupo_trib = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    classe = serializers.CharField(
        max_length=5, required=False, allow_blank=True, allow_null=True
    )
    mpg_codigo = serializers.IntegerField(required=False, allow_null=True)
    cli_mod_pagt = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_email_nfse = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    territorio = serializers.CharField(
        max_length=2, required=False, allow_blank=True, allow_null=True
    )
    vendedor = serializers.CharField(
        max_length=5, required=False, allow_blank=True, allow_null=True
    )


class GravaClienteResponseSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    tipo_msg = serializers.CharField(allow_null=True, required=False)
    msg = serializers.CharField(allow_null=True, required=False)
    acao = serializers.CharField(allow_null=True, required=False)


class LookupDocumentoQuerySerializer(serializers.Serializer):
    documento = serializers.CharField()


class DocumentoMatchSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    cliente = serializers.CharField(allow_null=True)
    cgc = serializers.CharField(allow_null=True)
    cidade = serializers.CharField(allow_null=True)
    estado = serializers.CharField(allow_null=True)
    emp_codigo = serializers.IntegerField()


class DocumentoCopyFieldsSerializer(serializers.Serializer):
    cliente = serializers.CharField(allow_null=True)
    reduzido = serializers.CharField(allow_null=True)
    endereco1 = serializers.CharField(allow_null=True)
    endereco2 = serializers.CharField(allow_null=True)
    endereco3 = serializers.CharField(allow_null=True)
    cli_bairro = serializers.CharField(allow_null=True)
    cidade = serializers.CharField(allow_null=True)
    estado = serializers.CharField(allow_null=True)
    cep = serializers.CharField(allow_null=True)
    pais = serializers.CharField(allow_null=True)
    pai_codigo = serializers.IntegerField(allow_null=True)
    est_codigo = serializers.IntegerField(allow_null=True)
    telefone1 = serializers.CharField(allow_null=True)
    telefone2 = serializers.CharField(allow_null=True)
    fax = serializers.CharField(allow_null=True)
    email = serializers.CharField(allow_null=True)
    homepage = serializers.CharField(allow_null=True)
    cgc = serializers.CharField(allow_null=True)
    inscr_est = serializers.CharField(allow_null=True)
    cli_inscr_mun = serializers.CharField(allow_null=True)
    cli_ie_isento = serializers.IntegerField(allow_null=True)
    cli_contribuinte = serializers.IntegerField(allow_null=True)
    cli_cnae = serializers.CharField(allow_null=True)
    cli_cod_mun_ibge = serializers.CharField(allow_null=True)
    cli_inscr_suframa = serializers.CharField(allow_null=True)
    cli_nif = serializers.CharField(allow_null=True)
    cli_pes_tipo = serializers.CharField(allow_null=True)
    tipo = serializers.CharField(allow_null=True)
    origem = serializers.CharField(allow_null=True)


class LookupDocumentoResponseSerializer(serializers.Serializer):
    matches = DocumentoMatchSerializer(many=True)
    copy_fields = DocumentoCopyFieldsSerializer(allow_null=True)


class ConsultaCnpjQuerySerializer(serializers.Serializer):
    cnpj = serializers.CharField()


class CnpjReceitaSerializer(serializers.Serializer):
    nome = serializers.CharField(allow_null=True)
    fantasia = serializers.CharField(allow_null=True)
    cnpj = serializers.CharField(allow_null=True)
    logradouro = serializers.CharField(allow_null=True)
    numero = serializers.CharField(allow_null=True)
    complemento = serializers.CharField(allow_null=True)
    bairro = serializers.CharField(allow_null=True)
    uf = serializers.CharField(allow_null=True)
    est_codigo = serializers.IntegerField(allow_null=True)
    municipio = serializers.CharField(allow_null=True)
    municipio_ibge = serializers.CharField(allow_null=True)
    cep = serializers.CharField(allow_null=True)
    situacao = serializers.CharField(allow_null=True)
    data_situacao = serializers.CharField(allow_null=True)
    telefone = serializers.CharField(allow_null=True)
    telefone2 = serializers.CharField(allow_null=True)
    email = serializers.CharField(allow_null=True)
    natureza_juridica = serializers.CharField(allow_null=True)
    abertura = serializers.CharField(allow_null=True)
    ultima_atualizacao = serializers.CharField(allow_null=True)
    tipo = serializers.CharField(allow_null=True)
    status = serializers.CharField(allow_null=True)
    efr = serializers.CharField(allow_null=True)
    motivo_situacao = serializers.CharField(allow_null=True)
    situacao_especial = serializers.CharField(allow_null=True)
    data_situacao_especial = serializers.CharField(allow_null=True)
    capital_social = serializers.CharField(allow_null=True)
    atividade_principal = serializers.ListField(child=serializers.CharField())
    atividades_secundarias = serializers.ListField(child=serializers.CharField())
    qsa = serializers.ListField(child=serializers.CharField())
    fonte = serializers.CharField()


class ConsultaCnpjResponseSerializer(serializers.Serializer):
    cnpj = serializers.CharField()
    already_registered = serializers.BooleanField()
    can_discard = serializers.BooleanField()
    can_copy = serializers.BooleanField()
    matches = DocumentoMatchSerializer(many=True)
    copy_fields = DocumentoCopyFieldsSerializer(allow_null=True)
    receita = CnpjReceitaSerializer(allow_null=True)
    message = serializers.CharField(allow_null=True)


class ConsultaFuncionarioQuerySerializer(serializers.Serializer):
    cpf = serializers.CharField()


class FuncionarioRhSerializer(serializers.Serializer):
    nome = serializers.CharField(allow_null=True)
    chapa = serializers.CharField(allow_null=True)
    cpf = serializers.CharField(allow_null=True)
    rg = serializers.CharField(allow_null=True)
    endereco = serializers.CharField(allow_null=True)
    municipio = serializers.CharField(allow_null=True)
    bairro = serializers.CharField(allow_null=True)
    uf = serializers.CharField(allow_null=True)
    cep = serializers.CharField(allow_null=True)
    telefone = serializers.CharField(allow_null=True)
    email = serializers.CharField(allow_null=True)


class ConsultaFuncionarioResponseSerializer(serializers.Serializer):
    cpf = serializers.CharField()
    already_registered = serializers.BooleanField()
    can_copy = serializers.BooleanField()
    matches = DocumentoMatchSerializer(many=True)
    funcionario = FuncionarioRhSerializer(allow_null=True)
    message = serializers.CharField(allow_null=True)


class CreateFromFuncionarioRequestSerializer(serializers.Serializer):
    cpf = serializers.CharField(max_length=20)


class CreateFromFuncionarioResponseSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()


class ListEstadosQuerySerializer(serializers.Serializer):
    pai_codigo = serializers.IntegerField(required=False, allow_null=True)


class PaisSerializer(serializers.Serializer):
    pai_codigo = serializers.IntegerField()
    pai_nome = serializers.CharField(allow_null=True)


class EstadoSerializer(serializers.Serializer):
    est_codigo = serializers.IntegerField()
    pai_codigo = serializers.IntegerField()
    est_nome = serializers.CharField(allow_null=True)
    est_sigla = serializers.CharField(allow_null=True, required=False)


class OrigemSerializer(serializers.Serializer):
    origem = serializers.CharField()
    descricao = serializers.CharField(allow_null=True)


class ArclassSerializer(serializers.Serializer):
    class_key = serializers.CharField()
    descr = serializers.CharField(allow_null=True)


class ArlevelSerializer(serializers.Serializer):
    terr_key = serializers.CharField()
    description = serializers.CharField(allow_null=True)


class ArsalespSerializer(serializers.Serializer):
    salesp_key = serializers.CharField()
    nome = serializers.CharField(allow_null=True)
    emp_nome = serializers.CharField(allow_null=True)


class RiscoSerializer(serializers.Serializer):
    codigo = serializers.IntegerField(help_text="CRS_COD_SIAOS (= CLIENTE.BLOQUEADO)")
    letra = serializers.CharField(allow_null=True)
    desc = serializers.CharField(allow_null=True)
    desc_longa = serializers.CharField(allow_null=True)
    restricao = serializers.IntegerField(allow_null=True)


class CidadeSerializer(serializers.Serializer):
    codigo = serializers.CharField()
    descricao = serializers.CharField(allow_null=True)
    uf = serializers.CharField(allow_null=True)


class ListCidadesQuerySerializer(serializers.Serializer):
    pai_codigo = serializers.IntegerField(required=False, allow_null=True)
    est_codigo = serializers.IntegerField(required=False, allow_null=True)


class GrupoTributarioSerializer(serializers.Serializer):
    codigo = serializers.CharField()
    descricao = serializers.CharField(allow_null=True)
    uf = serializers.CharField(allow_null=True)
    is_default = serializers.BooleanField()


class ListGruposQuerySerializer(serializers.Serializer):
    est_codigo = serializers.IntegerField(required=False, allow_null=True)
    cli_tipo = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class AreaOsSerializer(serializers.Serializer):
    aos_codigo = serializers.IntegerField()
    aos_nome = serializers.CharField(allow_null=True)
    usu_chapa = serializers.IntegerField(allow_null=True)
    usu_nome = serializers.CharField(allow_null=True)
    qtd = serializers.IntegerField()
    is_default = serializers.BooleanField()


class ListAreasOsQuerySerializer(serializers.Serializer):
    tipo = serializers.CharField(required=False, default="C")
    mun_ibge = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    est_codigo = serializers.IntegerField(required=False, allow_null=True)
    pai_codigo = serializers.IntegerField(required=False, allow_null=True)
    current = serializers.IntegerField(required=False, allow_null=True)


class ModeloPagtSerializer(serializers.Serializer):
    mpg_codigo = serializers.IntegerField()
    descricao = serializers.CharField(allow_null=True)
    mpg_area = serializers.CharField(allow_null=True)
    mpg_status = serializers.IntegerField(allow_null=True)


class ListModelosPagtoQuerySerializer(serializers.Serializer):
    origem = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    mpg_codigo = serializers.IntegerField(required=False, allow_null=True)
    risco_protheus = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )


class GravaClienteFinanRequestSerializer(serializers.Serializer):
    flagsuspen = serializers.IntegerField(required=False, default=0)
    flagcobra = serializers.IntegerField(required=False, default=0)
    flagmulta = serializers.IntegerField(required=False, default=0)
    vencprog = serializers.IntegerField(required=False, default=0)
    zona_franca = serializers.IntegerField(required=False, default=0)
    iss = serializers.IntegerField(required=False, default=0)
    exportacao = serializers.IntegerField(required=False, default=0)
    limitecr = serializers.IntegerField(required=False, allow_null=True)
    taxamulta = serializers.IntegerField(required=False, allow_null=True)
    desc_max = serializers.IntegerField(required=False, allow_null=True)
    ccontabil = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    obsvenc = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cli_limite_crv = serializers.IntegerField(required=False, allow_null=True)
    cli_fome_zero = serializers.IntegerField(required=False, allow_null=True)
    cli_montador = serializers.IntegerField(required=False, allow_null=True)
    cli_reccof = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_reccsll = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_recpis = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    mpg_codigo = serializers.IntegerField(required=False, allow_null=True)
    cli_mod_pagt = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_inscr_suframa = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_cnae = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cli_nif = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cli_pes_tipo = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    cli_grupo_trib = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )


class ContatoSerializer(serializers.Serializer):
    con_codigo = serializers.IntegerField()
    codcliente = serializers.IntegerField()
    nome = serializers.CharField(allow_null=True)
    depto = serializers.CharField(allow_null=True)
    cargo = serializers.CharField(allow_null=True)
    telefone = serializers.CharField(allow_null=True)
    fax = serializers.CharField(allow_null=True)
    celular = serializers.CharField(allow_null=True)
    email = serializers.CharField(allow_null=True)
    con_ativo = serializers.IntegerField(allow_null=True)
    is_comercial = serializers.BooleanField()
    is_tecnico = serializers.BooleanField()
    is_financeiro = serializers.BooleanField()


class ListContatosQuerySerializer(serializers.Serializer):
    search = serializers.CharField(required=False, allow_blank=True, default="")


class GravaContatoRequestSerializer(serializers.Serializer):
    con_codigo = serializers.IntegerField(required=False, allow_null=True)
    nome = serializers.CharField(max_length=60)
    nome_old = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    depto = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    cargo = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    telefone = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    fax = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    celular = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    email = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    con_ativo = serializers.IntegerField(required=False, default=1)


class SetContatoPadraoRequestSerializer(serializers.Serializer):
    con_codigo_com = serializers.IntegerField(required=False, allow_null=True)
    con_codigo_tec = serializers.IntegerField(required=False, allow_null=True)
    con_codigo_fin = serializers.IntegerField(required=False, allow_null=True)


class CobrancaSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    chavecobra = serializers.CharField()
    nome = serializers.CharField(allow_null=True)
    endereco1 = serializers.CharField(allow_null=True)
    endereco2 = serializers.CharField(allow_null=True)
    endereco3 = serializers.CharField(allow_null=True)
    cob_bairro = serializers.CharField(allow_null=True)
    cidade = serializers.CharField(allow_null=True)
    estado = serializers.CharField(allow_null=True)
    est_nome = serializers.CharField(allow_null=True)
    cep = serializers.CharField(allow_null=True)
    pais = serializers.CharField(allow_null=True)
    pais_nome = serializers.CharField(allow_null=True)
    contato = serializers.CharField(allow_null=True)
    telefone1 = serializers.CharField(allow_null=True)
    telefone2 = serializers.CharField(allow_null=True)
    e_mail = serializers.CharField(allow_null=True)
    ativo = serializers.IntegerField(allow_null=True)
    cli_codigo_ref = serializers.IntegerField(allow_null=True)
    is_padrao = serializers.BooleanField()


class GravaCobrancaRequestSerializer(serializers.Serializer):
    chavecobra = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    ativo = serializers.IntegerField(required=False, default=1)
    cli_codigo_ref = serializers.IntegerField()
    tipo_cadastro = serializers.ChoiceField(choices=("I", "A", "E"), default="I")


class EmbarqueSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    chave_emb = serializers.CharField()
    nome = serializers.CharField(allow_null=True)
    endereco1 = serializers.CharField(allow_null=True)
    endereco2 = serializers.CharField(allow_null=True)
    endereco3 = serializers.CharField(allow_null=True)
    emb_bairro = serializers.CharField(allow_null=True)
    cidade = serializers.CharField(allow_null=True)
    estado = serializers.CharField(allow_null=True)
    est_nome = serializers.CharField(allow_null=True)
    cep = serializers.CharField(allow_null=True)
    pais = serializers.CharField(allow_null=True)
    pais_nome = serializers.CharField(allow_null=True)
    contato = serializers.CharField(allow_null=True)
    telefone1 = serializers.CharField(allow_null=True)
    telefone2 = serializers.CharField(allow_null=True)
    e_mail = serializers.CharField(allow_null=True)
    ativo = serializers.IntegerField(allow_null=True)
    cli_codigo_ref = serializers.IntegerField(allow_null=True)
    is_padrao = serializers.BooleanField()


class GravaEmbarqueRequestSerializer(serializers.Serializer):
    chave_emb = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    ativo = serializers.IntegerField(required=False, default=1)
    cli_codigo_ref = serializers.IntegerField()
    tipo_cadastro = serializers.ChoiceField(choices=("I", "A", "E"), default="I")


class SetEnderecoPadraoRequestSerializer(serializers.Serializer):
    chave = serializers.CharField()


class LogSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    lcl_data = serializers.DateTimeField(allow_null=True)
    data_txt = serializers.CharField(allow_null=True)
    usu_chapa = serializers.IntegerField(allow_null=True)
    usu_nome = serializers.CharField(allow_null=True)
    lcl_texto = serializers.CharField(allow_null=True)


class GravaObsRequestSerializer(serializers.Serializer):
    observa = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class GravaBloqueioRequestSerializer(serializers.Serializer):
    bloqueado = serializers.IntegerField()
    mensagem_bloqueio = serializers.CharField(
        required=False,
        allow_blank=True,
        allow_null=True,
        max_length=2000,
    )
