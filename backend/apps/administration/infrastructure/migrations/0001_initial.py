from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("commercial_infrastructure", "0005_remove_cliente_admin_permissions"),
    ]

    operations = [
        migrations.CreateModel(
            name="Painel",
            fields=[
                ("codigo", models.IntegerField(primary_key=True, serialize=False)),
            ],
            options={
                "db_table": '"administration_painel"',
                "managed": False,
                "default_permissions": (),
                "permissions": [
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
