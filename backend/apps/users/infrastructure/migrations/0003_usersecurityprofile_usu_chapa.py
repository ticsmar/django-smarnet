from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users_infrastructure", "0002_usersecurityprofile_emp_codigo_pes_numero"),
    ]

    operations = [
        migrations.AddField(
            model_name="usersecurityprofile",
            name="usu_chapa",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
