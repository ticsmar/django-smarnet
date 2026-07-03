from django.db import migrations


def create_branch_managers_group(apps, schema_editor):
    Group = apps.get_model("auth", "Group")
    Group.objects.get_or_create(name="branch_managers")


def remove_branch_managers_group(apps, schema_editor):
    Group = apps.get_model("auth", "Group")
    Group.objects.filter(name="branch_managers").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("branch_auth_infrastructure", "0001_initial"),
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.RunPython(
            create_branch_managers_group, remove_branch_managers_group
        ),
    ]
