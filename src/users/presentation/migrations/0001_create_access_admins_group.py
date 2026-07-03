from django.db import migrations


def create_access_admins_group(apps, schema_editor):
    Group = apps.get_model("auth", "Group")
    Group.objects.get_or_create(name="access_admins")


def remove_access_admins_group(apps, schema_editor):
    Group = apps.get_model("auth", "Group")
    Group.objects.filter(name="access_admins").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.RunPython(create_access_admins_group, remove_access_admins_group),
    ]
