"""Move dashboard/report perms off Cliente (now administration)."""

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("commercial_infrastructure", "0004_cliente_view_dashboard_relatorio"),
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
