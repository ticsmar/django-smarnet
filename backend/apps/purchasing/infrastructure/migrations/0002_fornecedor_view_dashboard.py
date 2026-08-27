"""Extra perm for purchasing dashboard."""

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("purchasing_infrastructure", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="fornecedor",
            options={
                "db_table": '"NOVASMAR"."FORNECEDOR"',
                "managed": False,
                "permissions": [
                    (
                        "view_dashboard",
                        "Pode ver o dashboard de compras",
                    ),
                ],
            },
        ),
    ]
