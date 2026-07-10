from rest_framework import serializers

from apps.branch_auth.infrastructure.models import AccessToken


class VerifyTokenRequestSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=128)
    device_uuid = serializers.CharField(max_length=64)


class VerifyTokenResponseSerializer:
    """Montamos o dict manualmente para bater exatamente com o contrato Go."""

    @staticmethod
    def success_payload(token, machine):
        owner = token.owner
        return {
            "valid": True,
            "message": "Token válido.",
            "machine": {
                "id": str(machine.id),
                "device_uuid": machine.device_uuid,
                "status": machine.status,
                "registered_at": machine.registered_at.isoformat(),
                "last_access_at": machine.last_access_at.isoformat()
                if machine.last_access_at
                else "",
            },
            "employer": {
                "id": str(owner.id),
                "name": owner.get_full_name() or owner.username,
                "email": owner.email,
            },
        }

    @staticmethod
    def error_payload(message):
        return {
            "valid": False,
            "message": message,
            "machine": {
                "id": "",
                "device_uuid": "",
                "status": "",
                "registered_at": "",
                "last_access_at": "",
            },
            "employer": {"id": "", "name": "", "email": ""},
            "error": message,
        }


class AccessTokenSerializer(serializers.ModelSerializer):
    machine = serializers.SerializerMethodField()

    class Meta:
        model = AccessToken
        fields = [
            "id",
            "label",
            "status",
            "token_prefix",
            "created_at",
            "revoked_at",
            "machine",
        ]
        read_only_fields = fields

    def get_machine(self, obj):
        machine = getattr(obj, "machine", None)
        if not machine:
            return None
        return {
            "device_uuid": machine.device_uuid,
            "status": machine.status,
            "registered_at": machine.registered_at,
            "last_access_at": machine.last_access_at,
        }


class AccessTokenCreateSerializer(serializers.Serializer):
    label = serializers.CharField(max_length=100, required=False, allow_blank=True)
