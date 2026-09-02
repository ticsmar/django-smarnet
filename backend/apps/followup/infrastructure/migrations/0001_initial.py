from django.apps.registry import Apps
from django.db import migrations, models
from django.db.backends.base.schema import BaseDatabaseSchemaEditor

from apps.followup.domain.services.sistema_catalog import SEED_SISTEMAS


def seed_sistemas(apps: Apps, schema_editor: BaseDatabaseSchemaEditor) -> None:
    sistema_model = apps.get_model("followup_infrastructure", "FollowupSistema")
    for codigo, nome, descricao in SEED_SISTEMAS:
        sistema_model.objects.update_or_create(
            codigo=codigo,
            defaults={"nome": nome, "descricao": descricao, "ativo": True},
        )


def unseed_sistemas(apps: Apps, schema_editor: BaseDatabaseSchemaEditor) -> None:
    sistema_model = apps.get_model("followup_infrastructure", "FollowupSistema")
    sistema_model.objects.filter(codigo__in=[row[0] for row in SEED_SISTEMAS]).delete()


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("users_infrastructure", "0006_remap_renamed_app_labels"),
    ]

    operations = [
        migrations.CreateModel(
            name="FollowupSistema",
            fields=[
                (
                    "codigo",
                    models.PositiveIntegerField(primary_key=True, serialize=False),
                ),
                ("nome", models.CharField(max_length=80)),
                (
                    "descricao",
                    models.CharField(blank=True, default="", max_length=200),
                ),
                ("ativo", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Sistema do follow-up",
                "verbose_name_plural": "Sistemas do follow-up",
                "db_table": "FOLLOWUP_SISTEMA",
                "ordering": ["codigo"],
            },
        ),
        migrations.CreateModel(
            name="Recado",
            fields=[
                (
                    "pre_codigo",
                    models.IntegerField(
                        db_column="PRE_CODIGO", primary_key=True, serialize=False
                    ),
                ),
            ],
            options={
                "db_table": '"SIAOS"."PROP_RECADO"',
                "managed": False,
            },
        ),
        migrations.RunPython(seed_sistemas, unseed_sistemas),
    ]
