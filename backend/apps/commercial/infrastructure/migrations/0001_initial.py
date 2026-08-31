"""Initial migration for administracao permissions.

The tables are unmanaged (owned by SIAOS in Oracle); the migration exists so
Django creates ContentTypes + permissions for the ``Cliente`` model.
"""

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("users_infrastructure", "0006_remap_renamed_app_labels"),
    ]

    operations = [
        migrations.CreateModel(
            name="Cliente",
            fields=[
                (
                    "codigo",
                    models.IntegerField(
                        db_column="CODIGO", primary_key=True, serialize=False
                    ),
                ),
                (
                    "cliente",
                    models.CharField(
                        blank=True, db_column="CLIENTE", max_length=60, null=True
                    ),
                ),
                (
                    "reduzido",
                    models.CharField(
                        blank=True, db_column="REDUZIDO", max_length=18, null=True
                    ),
                ),
                (
                    "cgc",
                    models.CharField(
                        blank=True, db_column="CGC", max_length=20, null=True
                    ),
                ),
                (
                    "cidade",
                    models.CharField(
                        blank=True, db_column="CIDADE", max_length=25, null=True
                    ),
                ),
                (
                    "estado",
                    models.CharField(
                        blank=True, db_column="ESTADO", max_length=2, null=True
                    ),
                ),
                (
                    "emp_codigo",
                    models.DecimalField(
                        blank=True,
                        db_column="EMP_CODIGO",
                        decimal_places=0,
                        max_digits=11,
                        null=True,
                    ),
                ),
                (
                    "bloqueado",
                    models.DecimalField(
                        blank=True,
                        db_column="BLOQUEADO",
                        decimal_places=0,
                        max_digits=3,
                        null=True,
                    ),
                ),
                (
                    "tipo",
                    models.CharField(
                        blank=True, db_column="TIPO", max_length=1, null=True
                    ),
                ),
            ],
            options={
                "db_table": '"SIAOS"."CLIENTE"',
                "managed": False,
            },
        ),
        migrations.CreateModel(
            name="Origem",
            fields=[
                (
                    "origem",
                    models.CharField(
                        db_column="ORIGEM",
                        max_length=2,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "descricao",
                    models.CharField(
                        blank=True, db_column="DESCRICAO", max_length=60, null=True
                    ),
                ),
            ],
            options={
                "db_table": '"SIAOS"."ORIGEM"',
                "managed": False,
            },
        ),
    ]
