"""Recebimento serializers."""

from rest_framework import serializers

_IDIOMA_CHOICES = (("P", "Português"), ("I", "Inglês"))


class GravaFornecedorRequestSerializer(serializers.Serializer):
    cod_fornec = serializers.IntegerField(required=False, allow_null=True)
    razao_soc = serializers.CharField(max_length=300)
    nome_reduz = serializers.CharField(max_length=50)
    endereco = serializers.CharField(max_length=300)
    bairro = serializers.CharField(max_length=100)
    munic = serializers.CharField(max_length=100)
    cep = serializers.CharField(max_length=20)
    estado = serializers.CharField(max_length=100)
    cod_pais = serializers.IntegerField()
    idioma_msg = serializers.ChoiceField(
        choices=_IDIOMA_CHOICES, required=False, default="P"
    )


class GravaFornecedorResponseSerializer(serializers.Serializer):
    cod_fornec = serializers.IntegerField()
    tipo_msg = serializers.CharField(allow_null=True, required=False)
    msg = serializers.CharField(allow_null=True, required=False)
    acao = serializers.CharField(allow_null=True, required=False)


class GravaFornecContatoRequestSerializer(serializers.Serializer):
    cod_contato = serializers.IntegerField(required=False, allow_null=True)
    cod_fornec = serializers.IntegerField()
    nome = serializers.CharField(max_length=100)
    cargo = serializers.CharField(max_length=80)
    email = serializers.CharField(max_length=80)
    telefone = serializers.CharField(max_length=30)
    idioma_msg = serializers.ChoiceField(
        choices=_IDIOMA_CHOICES, required=False, default="P"
    )


class GravaFornecContatoResponseSerializer(serializers.Serializer):
    cod_contato = serializers.IntegerField()
    tipo_msg = serializers.CharField(allow_null=True, required=False)
    msg = serializers.CharField(allow_null=True, required=False)
    acao = serializers.CharField(allow_null=True, required=False)


class OkResponseSerializer(serializers.Serializer):
    ok = serializers.BooleanField()


class ListFornecedoresQuerySerializer(serializers.Serializer):
    search = serializers.CharField(required=False, allow_blank=True, default="")
    ativo = serializers.IntegerField(required=False, allow_null=True)
    page = serializers.IntegerField(required=False, default=1)
    page_size = serializers.IntegerField(required=False, default=20)


class FornecedorSerializer(serializers.Serializer):
    for_codigo = serializers.IntegerField()
    emp_codigo = serializers.IntegerField(allow_null=True)
    for_razao_soc = serializers.CharField(allow_null=True)
    for_nome_reduz = serializers.CharField(allow_null=True)
    for_endereco = serializers.CharField(allow_null=True)
    for_bairro = serializers.CharField(allow_null=True)
    for_munic = serializers.CharField(allow_null=True)
    for_cep = serializers.CharField(allow_null=True)
    for_estado = serializers.CharField(allow_null=True)
    pai_codigo = serializers.IntegerField(allow_null=True)
    pai_nome = serializers.CharField(allow_null=True)
    for_dt_cad = serializers.DateTimeField(allow_null=True)
    for_dt_atual = serializers.DateTimeField(allow_null=True)
    for_ativo = serializers.IntegerField(allow_null=True)


class PaginatedFornecedoresSerializer(serializers.Serializer):
    items = FornecedorSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class ListFornecContatosQuerySerializer(serializers.Serializer):
    for_codigo = serializers.IntegerField(required=False, allow_null=True)
    search = serializers.CharField(required=False, allow_blank=True, default="")
    page = serializers.IntegerField(required=False, default=1)
    page_size = serializers.IntegerField(required=False, default=20)


class FornecContatoSerializer(serializers.Serializer):
    fco_codigo = serializers.IntegerField()
    for_codigo = serializers.IntegerField(allow_null=True)
    fco_nome = serializers.CharField(allow_null=True)
    fco_cargo = serializers.CharField(allow_null=True)
    fco_email = serializers.CharField(allow_null=True)
    fco_telefone = serializers.CharField(allow_null=True)


class PaginatedFornecContatosSerializer(serializers.Serializer):
    items = FornecContatoSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class ListMsgErrosQuerySerializer(serializers.Serializer):
    search = serializers.CharField(required=False, allow_blank=True, default="")
    page = serializers.IntegerField(required=False, default=1)
    page_size = serializers.IntegerField(required=False, default=20)


class MsgErroSerializer(serializers.Serializer):
    msg_erro_bd = serializers.CharField()
    msg_usu_port = serializers.CharField(allow_null=True)
    msg_acao_port = serializers.CharField(allow_null=True)
    msg_usu_ing = serializers.CharField(allow_null=True)
    msg_acao_ing = serializers.CharField(allow_null=True)


class PaginatedMsgErrosSerializer(serializers.Serializer):
    items = MsgErroSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()


class ListPaisesQuerySerializer(serializers.Serializer):
    search = serializers.CharField(required=False, allow_blank=True, default="")


class PaisSerializer(serializers.Serializer):
    pai_codigo = serializers.IntegerField()
    pai_nome = serializers.CharField(allow_null=True)
    eti_codigo = serializers.IntegerField(allow_null=True)
