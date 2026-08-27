"""Serializers for the native file-manager system catalog."""

from rest_framework import serializers


class SistemaSerializer(serializers.Serializer):
    codigo = serializers.IntegerField()
    nome = serializers.CharField()
    descricao = serializers.CharField(allow_blank=True)
    ativo = serializers.BooleanField()


class CreateSistemaRequestSerializer(serializers.Serializer):
    codigo = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    nome = serializers.CharField(max_length=80)
    descricao = serializers.CharField(
        max_length=200, required=False, allow_blank=True, default=""
    )
    ativo = serializers.BooleanField(required=False, default=True)


class UpdateSistemaRequestSerializer(serializers.Serializer):
    nome = serializers.CharField(max_length=80)
    descricao = serializers.CharField(
        max_length=200, required=False, allow_blank=True, default=""
    )
    ativo = serializers.BooleanField(required=False, default=True)
