"""Remap ContentType / django_migrations rows after English app rename."""

from django.db import connection, migrations

_RENAMES = (
    ("administracao_infrastructure", "commercial_infrastructure"),
    ("administracao_presentation", "commercial_presentation"),
    ("compras_infrastructure", "purchasing_infrastructure"),
    ("compras_presentation", "purchasing_presentation"),
    ("arquivos_infrastructure", "files_infrastructure"),
    ("arquivos_presentation", "files_presentation"),
)


def _remap(apps, schema_editor) -> None:
    content_type = apps.get_model("contenttypes", "ContentType")
    with connection.cursor() as cursor:
        for old, new in _RENAMES:
            content_type.objects.filter(app_label=old).update(app_label=new)
            cursor.execute(
                "UPDATE django_migrations SET app = %s WHERE app = %s",
                [new, old],
            )


def _noop(apps, schema_editor) -> None:
    return


class Migration(migrations.Migration):
    dependencies = [
        ("users_infrastructure", "0005_fix_django_admin_log_user_fk"),
    ]

    operations = [
        migrations.RunPython(_remap, _noop),
    ]
