"""Fix DJANGO_ADMIN_LOG.USER_ID FK leftover from CORE_USER (UUID).

Legacy schema kept USER_ID as VARCHAR2(32) referencing CORE_USER.
AUTH_USER.ID is NUMBER, so admin saves fail with ORA-02291 on LogEntry insert.
"""

from django.db import connection, migrations


def _fix_admin_log_user_fk(apps, schema_editor) -> None:
    if schema_editor.connection.vendor != "oracle":
        return

    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT COUNT(*) FROM user_constraints
            WHERE constraint_name = 'DJANGO_AD_USER_ID_C564EBA6_F'
            """
        )
        if cursor.fetchone()[0]:
            cursor.execute(
                "ALTER TABLE DJANGO_ADMIN_LOG "
                "DROP CONSTRAINT DJANGO_AD_USER_ID_C564EBA6_F"
            )

        cursor.execute(
            """
            SELECT data_type FROM user_tab_columns
            WHERE table_name = 'DJANGO_ADMIN_LOG' AND column_name = 'USER_ID'
            """
        )
        row = cursor.fetchone()
        data_type = row[0] if row else None
        if data_type == "VARCHAR2":
            cursor.execute("SELECT COUNT(*) FROM DJANGO_ADMIN_LOG")
            if cursor.fetchone()[0]:
                raise RuntimeError(
                    "DJANGO_ADMIN_LOG has rows; clear or migrate USER_ID "
                    "before altering column type"
                )
            cursor.execute("ALTER TABLE DJANGO_ADMIN_LOG MODIFY (USER_ID NUMBER(11))")

        cursor.execute(
            """
            SELECT COUNT(*) FROM user_constraints
            WHERE constraint_name = 'DJANGO_AD_USER_ID_AUTH_USER_F'
            """
        )
        if not cursor.fetchone()[0]:
            cursor.execute(
                "ALTER TABLE DJANGO_ADMIN_LOG "
                "ADD CONSTRAINT DJANGO_AD_USER_ID_AUTH_USER_F "
                "FOREIGN KEY (USER_ID) REFERENCES AUTH_USER (ID) "
                "DEFERRABLE INITIALLY DEFERRED"
            )


def _noop_reverse(apps, schema_editor) -> None:
    return


class Migration(migrations.Migration):
    dependencies = [
        ("users_infrastructure", "0004_remove_usersecurityprofile_emp_pes"),
    ]

    operations = [
        migrations.RunPython(_fix_admin_log_user_fk, _noop_reverse),
    ]
