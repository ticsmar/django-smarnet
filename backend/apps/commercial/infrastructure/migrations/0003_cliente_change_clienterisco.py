"""Add extra permission to change cliente risk/status."""

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("commercial_infrastructure", "0002_cliente_tabs"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="cliente",
            options={
                "managed": False,
                "permissions": [
                    (
                        "change_clientelimite",
                        "Pode alterar limite de crédito do cliente",
                    ),
                    (
                        "change_clienterisco",
                        "Pode alterar o status/bloqueio do cliente",
                    ),
                ],
            },
        ),
    ]
