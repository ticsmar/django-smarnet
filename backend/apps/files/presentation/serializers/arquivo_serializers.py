"""Serializers for Oracle file-manager operations."""

from rest_framework import serializers

from apps.files.domain.services.sistema_catalog import DESCRICAO_MAX, NOME_MAX


class ScopeQuerySerializer(serializers.Serializer):
    sistema = serializers.IntegerField(min_value=1)
    filtro = serializers.CharField(max_length=100)


class ArquivoNodeSerializer(serializers.Serializer):
    par_codigo = serializers.IntegerField()
    par_codigo_pai = serializers.IntegerField(allow_null=True)
    tipo = serializers.IntegerField()
    nome = serializers.CharField()
    descricao = serializers.CharField(allow_null=True, allow_blank=True)
    tamanho = serializers.IntegerField(allow_null=True)
    data = serializers.DateTimeField(allow_null=True)
    ace_codigo = serializers.IntegerField(allow_null=True)
    pasta_fixa = serializers.BooleanField()
    in_lixeira = serializers.BooleanField()


class ArquivoTreeSerializer(serializers.Serializer):
    sistema = serializers.IntegerField()
    filtro = serializers.CharField()
    root_label = serializers.CharField()
    nodes = ArquivoNodeSerializer(many=True)


class CreateFolderRequestSerializer(serializers.Serializer):
    sistema = serializers.IntegerField(min_value=1)
    filtro = serializers.CharField(max_length=100)
    nome = serializers.CharField(max_length=NOME_MAX)
    descricao = serializers.CharField(
        max_length=DESCRICAO_MAX, required=False, allow_blank=True, default=""
    )
    par_codigo_pai = serializers.IntegerField(required=False, allow_null=True)
    ace_codigo = serializers.IntegerField(required=False, allow_null=True)


class UploadFileRequestSerializer(serializers.Serializer):
    sistema = serializers.IntegerField(min_value=1)
    filtro = serializers.CharField(max_length=100)
    descricao = serializers.CharField(
        max_length=DESCRICAO_MAX, required=False, allow_blank=True, default=""
    )
    par_codigo_pai = serializers.IntegerField(required=False, allow_null=True)
    ace_codigo = serializers.IntegerField(required=False, allow_null=True)
    arquivo = serializers.FileField()


class MoveNodeRequestSerializer(serializers.Serializer):
    sistema = serializers.IntegerField(min_value=1)
    filtro = serializers.CharField(max_length=100)
    par_codigo_pai = serializers.IntegerField(required=False, allow_null=True)
    nome = serializers.CharField(
        max_length=NOME_MAX, required=False, allow_null=True, allow_blank=True
    )


class TrashNodesRequestSerializer(serializers.Serializer):
    sistema = serializers.IntegerField(min_value=1)
    filtro = serializers.CharField(max_length=100)
    par_codigos = serializers.ListField(
        child=serializers.IntegerField(min_value=1), allow_empty=False
    )


class ParCodigoResponseSerializer(serializers.Serializer):
    par_codigo = serializers.IntegerField()


class HistoricoItemSerializer(serializers.Serializer):
    usuario_nome = serializers.CharField(allow_null=True)
    acao = serializers.CharField()
    nome = serializers.CharField()
    data = serializers.DateTimeField(allow_null=True)
