from rest_framework import serializers

from apps.branch_auth.application.dtos.branch_auth_dtos import (
    AccessTokenOutputDTO,
    VerifyTokenOutputDTO,
)


class VerifyTokenRequestSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=128)
    device_uuid = serializers.CharField(max_length=64)


class VerifyTokenResponseSerializer:
    """Montamos o dict manualmente para bater exatamente com o contrato Go."""

    @staticmethod
    def success_payload(result: VerifyTokenOutputDTO) -> dict[str, object]:
        machine = result.machine
        owner = result.owner
        return {
            "valid": True,
            "message": "Token válido.",
            "machine": {
                "id": str(machine.machine_id),
                "device_uuid": machine.device_uuid,
                "status": machine.status,
                "registered_at": machine.registered_at.isoformat(),
                "last_access_at": machine.last_access_at.isoformat()
                if machine.last_access_at
                else "",
            },
            "employer": {
                "id": str(owner.user_id),
                "name": owner.name,
                "email": owner.email,
            },
        }

    @staticmethod
    def error_payload(message: str) -> dict[str, object]:
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


class MachineSummarySerializer(serializers.Serializer):
    device_uuid = serializers.CharField()
    status = serializers.CharField()
    registered_at = serializers.DateTimeField()
    last_access_at = serializers.DateTimeField(allow_null=True)


class AccessTokenSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    label = serializers.CharField(allow_blank=True)
    status = serializers.CharField()
    token_prefix = serializers.CharField()
    created_at = serializers.DateTimeField()
    revoked_at = serializers.DateTimeField(allow_null=True)
    machine = MachineSummarySerializer(allow_null=True)


class CreatedAccessTokenSerializer(AccessTokenSerializer):
    # O token em texto puro é exposto só nesta resposta, uma única vez.
    token = serializers.CharField()


class AccessTokenCreateSerializer(serializers.Serializer):
    label = serializers.CharField(max_length=100, required=False, allow_blank=True)


def serialize_access_token(token: AccessTokenOutputDTO) -> dict[str, object]:
    machine = token.machine
    return {
        "id": token.token_id,
        "label": token.label,
        "status": token.status,
        "token_prefix": token.token_prefix,
        "created_at": token.created_at,
        "revoked_at": token.revoked_at,
        "machine": None
        if machine is None
        else {
            "device_uuid": machine.device_uuid,
            "status": machine.status,
            "registered_at": machine.registered_at,
            "last_access_at": machine.last_access_at,
        },
    }
