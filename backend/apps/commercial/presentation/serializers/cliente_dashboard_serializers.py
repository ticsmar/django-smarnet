"""Serializers for cliente dashboard API."""

from rest_framework import serializers


class ClienteDashboardScopeQuerySerializer(serializers.Serializer):
    scope = serializers.ChoiceField(
        choices=["cliente", "grupo"],
        default="cliente",
        required=False,
    )


class ClienteDashboardPaginatedQuerySerializer(ClienteDashboardScopeQuerySerializer):
    page = serializers.IntegerField(min_value=1, default=1, required=False)
    page_size = serializers.IntegerField(
        min_value=1, max_value=100, default=20, required=False
    )


class ClienteDashboardResumoSerializer(serializers.Serializer):
    titulos_a_vencer = serializers.DecimalField(max_digits=18, decimal_places=2)
    titulos_vencidos = serializers.DecimalField(max_digits=18, decimal_places=2)
    valores_faturar_prazo = serializers.DecimalField(max_digits=18, decimal_places=2)
    credito_concedido_prazo = serializers.DecimalField(max_digits=18, decimal_places=2)
    limite_prazo = serializers.DecimalField(max_digits=18, decimal_places=2)
    saldo_prazo = serializers.DecimalField(max_digits=18, decimal_places=2)
    valores_faturar_antecipacao = serializers.DecimalField(
        max_digits=18, decimal_places=2
    )
    valores_faturar_vista = serializers.DecimalField(max_digits=18, decimal_places=2)
    saldo_antecipacoes = serializers.DecimalField(max_digits=18, decimal_places=2)
    credito_concedido_vista = serializers.DecimalField(max_digits=18, decimal_places=2)
    limite_vista = serializers.DecimalField(max_digits=18, decimal_places=2)
    saldo_vista = serializers.DecimalField(max_digits=18, decimal_places=2)
    saldo_geral = serializers.DecimalField(max_digits=18, decimal_places=2)
    media_atraso_dias = serializers.IntegerField(allow_null=True)
    media_antecipacao_dias = serializers.IntegerField(allow_null=True)


class ClienteDashboardTituloPendenteSerializer(serializers.Serializer):
    os = serializers.CharField(allow_null=True)
    nf = serializers.CharField(allow_null=True)
    serie = serializers.CharField(allow_null=True)
    parcela = serializers.CharField(allow_null=True)
    vencimento = serializers.DateTimeField(allow_null=True)
    valor = serializers.DecimalField(max_digits=18, decimal_places=2, allow_null=True)
    dias = serializers.IntegerField(allow_null=True)


class ClienteDashboardOsPendenteSerializer(serializers.Serializer):
    os = serializers.CharField(allow_null=True)
    order_no = serializers.IntegerField(allow_null=True)
    valor_faturado = serializers.DecimalField(
        max_digits=18, decimal_places=2, allow_null=True
    )
    antecipacao = serializers.DecimalField(
        max_digits=18, decimal_places=2, allow_null=True
    )
    avista = serializers.DecimalField(max_digits=18, decimal_places=2, allow_null=True)
    parcela = serializers.DecimalField(max_digits=18, decimal_places=2, allow_null=True)
    pg_antecipado = serializers.DecimalField(
        max_digits=18, decimal_places=2, allow_null=True
    )
    saldo_antecipacao = serializers.DecimalField(
        max_digits=18, decimal_places=2, allow_null=True
    )


class ClienteDashboardSeriePontoSerializer(serializers.Serializer):
    periodo = serializers.CharField()
    valor = serializers.DecimalField(max_digits=18, decimal_places=2)
    media = serializers.DecimalField(max_digits=18, decimal_places=2)


class ClienteDashboardPropostaPontoSerializer(serializers.Serializer):
    periodo = serializers.CharField()
    proposta = serializers.DecimalField(max_digits=18, decimal_places=2)
    os = serializers.DecimalField(max_digits=18, decimal_places=2)


class GravaClienteLimitesRequestSerializer(serializers.Serializer):
    limitecr = serializers.DecimalField(
        max_digits=18, decimal_places=2, allow_null=True
    )
    cli_limite_crv = serializers.DecimalField(
        max_digits=18, decimal_places=2, allow_null=True
    )


class ClienteDashboardCreditoSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    nome = serializers.CharField()
    grupo_cabeca = serializers.IntegerField()
    scope = serializers.CharField()
    limitecr = serializers.DecimalField(
        max_digits=18, decimal_places=2, allow_null=True
    )
    cli_limite_crv = serializers.DecimalField(
        max_digits=18, decimal_places=2, allow_null=True
    )
    bloqueado = serializers.IntegerField()
    risco_letra = serializers.CharField(allow_null=True)
    risco_descricao = serializers.CharField(allow_null=True)
    risco_restricao = serializers.CharField(allow_null=True)
    mensagem_bloqueio = serializers.CharField(allow_null=True)
    total_os = serializers.IntegerField()
    os_abertas = serializers.IntegerField()
    membros_grupo = serializers.IntegerField()
    resumo = ClienteDashboardResumoSerializer()
    titulos_pendentes_disponivel = serializers.BooleanField()
    oss_pendentes_disponivel = serializers.BooleanField()
    series_disponivel = serializers.BooleanField()
    titulos_pendentes = ClienteDashboardTituloPendenteSerializer(many=True)
    oss_pendentes = ClienteDashboardOsPendenteSerializer(many=True)
    faturamento_mes = ClienteDashboardSeriePontoSerializer(many=True)
    faturamento_ano = ClienteDashboardSeriePontoSerializer(many=True)
    proposta_ano = ClienteDashboardPropostaPontoSerializer(many=True)


class ClienteDashboardOsItemSerializer(serializers.Serializer):
    order_no = serializers.IntegerField()
    cust_key = serializers.IntegerField()
    cliente_nome = serializers.CharField()
    order_date = serializers.DateTimeField(allow_null=True)
    origem = serializers.CharField(allow_null=True)
    origem_descricao = serializers.CharField(allow_null=True)
    order_status = serializers.CharField(allow_null=True)
    os_encerrada = serializers.IntegerField(allow_null=True)


class PaginatedClienteDashboardOsSerializer(serializers.Serializer):
    items = ClienteDashboardOsItemSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()
    scope = serializers.CharField()


class ClienteDashboardTituloItemSerializer(serializers.Serializer):
    numero = serializers.CharField()
    parcela = serializers.CharField(allow_null=True)
    valor = serializers.DecimalField(max_digits=18, decimal_places=2, allow_null=True)
    saldo = serializers.DecimalField(max_digits=18, decimal_places=2, allow_null=True)
    vencimento = serializers.DateTimeField(allow_null=True)
    emissao = serializers.DateTimeField(allow_null=True)
    status = serializers.CharField(allow_null=True)
    cliente_codigo = serializers.IntegerField()


class PaginatedClienteDashboardTitulosSerializer(serializers.Serializer):
    items = ClienteDashboardTituloItemSerializer(many=True)
    total = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()
    scope = serializers.CharField()
    titulos_disponivel = serializers.BooleanField()
