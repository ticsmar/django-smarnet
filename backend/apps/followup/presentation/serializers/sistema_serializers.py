"""Serializers for the native follow-up system catalog."""

from rest_framework import serializers


class SistemaSerializer(serializers.Serializer[dict[str, object]]):
    codigo = serializers.IntegerField()
    nome = serializers.CharField()
    descricao = serializers.CharField(allow_blank=True)
    ativo = serializers.BooleanField()


class CreateSistemaRequestSerializer(serializers.Serializer[dict[str, object]]):
    codigo = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    nome = serializers.CharField(max_length=80)
    descricao = serializers.CharField(
        max_length=200, required=False, allow_blank=True, default=""
    )
    ativo = serializers.BooleanField(required=False, default=True)


class UpdateSistemaRequestSerializer(serializers.Serializer[dict[str, object]]):
    nome = serializers.CharField(max_length=80)
    descricao = serializers.CharField(
        max_length=200, required=False, allow_blank=True, default=""
    )
    ativo = serializers.BooleanField(required=False, default=True)
