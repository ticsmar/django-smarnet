"""Extra perms for administration dashboard and reports."""

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("commercial_infrastructure", "0003_cliente_change_clienterisco"),
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
                    (
                        "view_dashboard",
                        "Pode ver o dashboard de administração",
                    ),
                    (
                        "view_relatorio",
                        "Pode ver relatórios de administração",
                    ),
                ],
            },
        ),
    ]
