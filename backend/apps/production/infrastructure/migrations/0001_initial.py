from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="OrdemProducao",
            fields=[
                ("codigo", models.IntegerField(primary_key=True, serialize=False)),
            ],
            options={
                "db_table": '"production_ordemproducao"',
                "managed": False,
            },
        ),
    ]
