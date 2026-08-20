from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("users_infrastructure", "0003_usersecurityprofile_usu_chapa"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="usersecurityprofile",
            name="emp_codigo",
        ),
        migrations.RemoveField(
            model_name="usersecurityprofile",
            name="pes_numero",
        ),
    ]
