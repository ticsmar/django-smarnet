"""Serializers for public access-request endpoints."""

from rest_framework import serializers


class CreateAccessRequestSerializer(serializers.Serializer):
    tep_codigo = serializers.ChoiceField(choices=["C", "F", "c", "f"])
    nome = serializers.CharField(max_length=100)
    email = serializers.EmailField(max_length=60)
    pai_codigo = serializers.IntegerField(min_value=1)
    motivo = serializers.CharField()
    emp_nome = serializers.CharField(max_length=60)
    emp_endereco = serializers.CharField(max_length=100)
    emp_bairro = serializers.CharField(max_length=60)
    emp_cidade = serializers.CharField(max_length=60)
    emp_pai_codigo = serializers.IntegerField(min_value=1)
    emp_est_codigo = serializers.IntegerField(min_value=1)
    emp_estado = serializers.CharField(max_length=30)
    emp_cep = serializers.CharField(max_length=11)
    emp_homepage = serializers.CharField(
        required=False, allow_blank=True, max_length=100, default=""
    )


class AccessRequestResultSerializer(serializers.Serializer):
    ppe_codigo = serializers.IntegerField()
    tep_codigo = serializers.CharField()
    email = serializers.CharField()


class PublicCountrySerializer(serializers.Serializer):
    pai_codigo = serializers.IntegerField()
    nome = serializers.CharField()


class PublicStateSerializer(serializers.Serializer):
    est_codigo = serializers.IntegerField()
    pai_codigo = serializers.IntegerField()
    nome = serializers.CharField()
