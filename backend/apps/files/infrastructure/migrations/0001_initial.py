from django.db import migrations, models

from apps.files.domain.services.sistema_catalog import SEED_SISTEMAS


def seed_sistemas(apps, schema_editor) -> None:
    sistema_model = apps.get_model("files_infrastructure", "FileManagerSistema")
    for codigo, nome, descricao in SEED_SISTEMAS:
        sistema_model.objects.update_or_create(
            codigo=codigo,
            defaults={"nome": nome, "descricao": descricao, "ativo": True},
        )


def unseed_sistemas(apps, schema_editor) -> None:
    sistema_model = apps.get_model("files_infrastructure", "FileManagerSistema")
    sistema_model.objects.filter(codigo__in=[row[0] for row in SEED_SISTEMAS]).delete()


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("users_infrastructure", "0006_remap_renamed_app_labels"),
    ]

    operations = [
        migrations.CreateModel(
            name="FileManagerSistema",
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
                "verbose_name": "Sistema do gerenciador de arquivos",
                "verbose_name_plural": "Sistemas do gerenciador de arquivos",
                "db_table": "ARQUIVOS_SISTEMA",
                "ordering": ["codigo"],
            },
        ),
        migrations.CreateModel(
            name="Arquivo",
            fields=[
                (
                    "par_codigo",
                    models.IntegerField(
                        db_column="PAR_CODIGO", primary_key=True, serialize=False
                    ),
                ),
            ],
            options={
                "db_table": '"SIAOS"."PROP_ARQUIVO"',
                "managed": False,
            },
        ),
        migrations.RunPython(seed_sistemas, unseed_sistemas),
    ]
