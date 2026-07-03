import hashlib
import secrets

from django.conf import settings
from django.db import models
from django.utils import timezone


class AccessToken(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "Ativo"
        REVOKED = "revoked", "Revogado"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="access_tokens",
        help_text="Gerente dono deste token",
    )

    # Guardamos só o hash. O token em texto puro só existe no momento da criação.
    token_hash = models.CharField(max_length=128, unique=True, db_index=True)
    token_prefix = models.CharField(
        max_length=8,
        help_text="Primeiros caracteres do token, só para exibição/identificação na UI",
    )
    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.ACTIVE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    revoked_at = models.DateTimeField(null=True, blank=True)
    revoked_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tokens_revoked",
    )
    label = models.CharField(
        max_length=100,
        blank=True,
        help_text="Nome livre, ex: 'Notebook do caixa 2'",
    )

    class Meta:
        pass

    def __str__(self):
        return f"Token({self.token_prefix}…) - {self.owner}"

    @staticmethod
    def hash_raw_token(raw_token: str) -> str:
        return hashlib.sha256(raw_token.encode()).hexdigest()

    @classmethod
    def generate(cls, owner, label=""):
        """Cria um novo token e retorna (instancia, raw_token)."""
        raw_token = secrets.token_urlsafe(32)
        instance = cls.objects.create(
            owner=owner,
            token_hash=cls.hash_raw_token(raw_token),
            token_prefix=raw_token[:8],
            label=label,
        )
        return instance, raw_token

    def revoke(self, by_user):
        self.status = self.Status.REVOKED
        self.revoked_at = timezone.now()
        self.revoked_by = by_user
        self.save(update_fields=["status", "revoked_at", "revoked_by"])

        if hasattr(self, "machine"):
            self.machine.status = Machine.Status.REVOKED
            self.machine.save(update_fields=["status"])


class Machine(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "Ativo"
        REVOKED = "revoked", "Revogado"

    # OneToOne: um token vincula a exatamente uma máquina (bind on first use)
    token = models.OneToOneField(
        AccessToken, on_delete=models.CASCADE, related_name="machine"
    )
    device_uuid = models.CharField(max_length=64, db_index=True)
    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.ACTIVE
    )
    registered_at = models.DateTimeField(auto_now_add=True)
    last_access_at = models.DateTimeField(null=True, blank=True)
    last_access_ip = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        pass

    def __str__(self):
        return f"{self.device_uuid} ({self.status})"


class TokenAccessAttempt(models.Model):
    """Log de toda tentativa de verify-token, sucesso ou falha."""

    class Result(models.TextChoices):
        SUCCESS = "success", "Sucesso"
        INVALID_TOKEN = "invalid_token", "Token inválido"
        REVOKED_TOKEN = "revoked_token", "Token revogado"
        DEVICE_MISMATCH = "device_mismatch", "Device UUID divergente"
        MACHINE_REVOKED = "machine_revoked", "Máquina revogada"

    token = models.ForeignKey(
        AccessToken,
        on_delete=models.SET_NULL,
        null=True,
        related_name="access_attempts",
    )
    device_uuid_sent = models.CharField(max_length=64)
    result = models.CharField(max_length=20, choices=Result.choices)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["token", "created_at"])]
