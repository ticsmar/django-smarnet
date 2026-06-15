"""Authentication serializers."""

from rest_framework import serializers


class LoginRequestSerializer(serializers.Serializer[dict[str, str]]):
    username = serializers.CharField()
    password = serializers.CharField()


class RegisterRequestSerializer(serializers.Serializer[dict[str, str]]):
    username = serializers.CharField()
    password = serializers.CharField()


class AuthenticatedUserSerializer(serializers.Serializer[dict[str, str]]):
    username = serializers.CharField()
