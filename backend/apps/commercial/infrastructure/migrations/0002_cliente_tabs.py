"""Add child permission models and credit-limit perm for Cliente."""

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("commercial_infrastructure", "0001_initial"),
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
                ],
            },
        ),
        migrations.CreateModel(
            name="ClienteContato",
            fields=[
                (
                    "con_codigo",
                    models.IntegerField(
                        db_column="CON_CODIGO", primary_key=True, serialize=False
                    ),
                ),
                (
                    "codcliente",
                    models.IntegerField(
                        blank=True, db_column="CODCLIENTE", null=True
                    ),
                ),
                (
                    "nome",
                    models.CharField(
                        blank=True, db_column="NOME", max_length=60, null=True
                    ),
                ),
            ],
            options={
                "db_table": '"SIAOS"."CONTATOS"',
                "managed": False,
            },
        ),
        migrations.CreateModel(
            name="ClienteCobranca",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("codigo", models.IntegerField(db_column="CODIGO")),
                (
                    "chavecobra",
                    models.CharField(db_column="CHAVECOBRA", max_length=9),
                ),
            ],
            options={
                "db_table": '"SIAOS"."COBRANCA"',
                "managed": False,
                "unique_together": {("codigo", "chavecobra")},
            },
        ),
        migrations.CreateModel(
            name="ClienteEmbarque",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("codigo", models.IntegerField(db_column="CODIGO")),
                (
                    "chave_emb",
                    models.CharField(db_column="CHAVE_EMB", max_length=9),
                ),
            ],
            options={
                "db_table": '"SIAOS"."EMBARQUE"',
                "managed": False,
                "unique_together": {("codigo", "chave_emb")},
            },
        ),
    ]
