"""Serializers for Oracle follow-up operations."""

from rest_framework import serializers

from apps.followup.domain.services.sistema_catalog import FILTRO_MAX, MENSAGEM_MAX


class SistemaOnlyQuerySerializer(serializers.Serializer[dict[str, object]]):
    sistema = serializers.IntegerField(min_value=1)


class ScopeQuerySerializer(serializers.Serializer[dict[str, object]]):
    sistema = serializers.IntegerField(min_value=1)
    filtro = serializers.CharField(max_length=FILTRO_MAX)
    tre = serializers.IntegerField(required=False, allow_null=True, min_value=1)


class RecadoItemSerializer(serializers.Serializer[dict[str, object]]):
    pre_codigo = serializers.IntegerField()
    tre_codigo = serializers.IntegerField(allow_null=True)
    tre_descricao = serializers.CharField()
    tre_tipo_canc = serializers.BooleanField()
    usu_chapa = serializers.IntegerField()
    usu_nome = serializers.CharField(allow_null=True)
    mensagem = serializers.CharField()
    pre_data = serializers.DateTimeField(allow_null=True)
    pre_dt_alarm = serializers.DateTimeField(allow_null=True)
    pre_dt_baixa = serializers.DateTimeField(allow_null=True)
    mot_codigo = serializers.IntegerField(allow_null=True)
    mot_descricao = serializers.CharField(allow_null=True, allow_blank=True)
    can_edit = serializers.BooleanField()
    alarm_nivel = serializers.CharField()


class RecadoListSerializer(serializers.Serializer[dict[str, object]]):
    sistema = serializers.IntegerField()
    filtro = serializers.CharField()
    items = RecadoItemSerializer(many=True)


class TipoRecadoSerializer(serializers.Serializer[dict[str, object]]):
    tre_codigo = serializers.IntegerField()
    tre_descricao = serializers.CharField()
    tre_tipo_canc = serializers.BooleanField()


class MotivoSerializer(serializers.Serializer[dict[str, object]]):
    mot_codigo = serializers.IntegerField()
    mot_descricao = serializers.CharField()


class RecadoStatusSerializer(serializers.Serializer[dict[str, object]]):
    nivel = serializers.CharField()
    proximo_alarme = serializers.DateTimeField(allow_null=True)
    tre_descricao = serializers.CharField(allow_null=True)
    has_legacy_notes = serializers.BooleanField()


class GravaRecadoRequestSerializer(serializers.Serializer[dict[str, object]]):
    sistema = serializers.IntegerField(min_value=1)
    filtro = serializers.CharField(max_length=FILTRO_MAX)
    tre_codigo = serializers.IntegerField(min_value=1)
    mensagem = serializers.CharField(max_length=MENSAGEM_MAX)
    mot_codigo = serializers.IntegerField(required=False, allow_null=True)
    alarm_data = serializers.CharField(
        required=False, allow_blank=True, default="", max_length=10
    )
    alarm_hora = serializers.CharField(
        required=False, allow_blank=True, default="", max_length=5
    )
    pre_codigo = serializers.IntegerField(required=False, allow_null=True, min_value=1)


class ClienteNotesQuerySerializer(serializers.Serializer[dict[str, object]]):
    codigo = serializers.IntegerField(min_value=1)


class ClienteNotesSerializer(serializers.Serializer[dict[str, object]]):
    codigo = serializers.IntegerField()
    descricao = serializers.CharField(allow_blank=True)
    has_notes = serializers.BooleanField()


class AppendClienteNotesRequestSerializer(serializers.Serializer[dict[str, object]]):
    codigo = serializers.IntegerField(min_value=1)
    texto = serializers.CharField(max_length=MENSAGEM_MAX)
