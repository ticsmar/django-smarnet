"""Who is Oracle USER on smar, and can we replace TG_B_IU_COBRANCA?"""

from django.db import connections


def run() -> None:
    cur = connections["smar"].cursor()
    cur.execute("SELECT USER, SYS_CONTEXT('USERENV','CLIENT_IDENTIFIER') FROM dual")
    print("session:", cur.fetchone())
    cur.execute(
        """
        SELECT COUNT(*)
          FROM siaos.usuario
         WHERE UPPER(usu_loginweb) = USER
        """
    )
    print("usuario matching USER:", cur.fetchone())
    cur.execute(
        """
        SELECT privilege FROM session_privs
         WHERE privilege IN (
           'CREATE TRIGGER', 'CREATE ANY TRIGGER', 'ALTER ANY TRIGGER'
         )
        """
    )
    print("trigger privs:", cur.fetchall())
    cur.execute(
        """
        SELECT privilege FROM all_tab_privs
         WHERE table_schema = 'SIAOS'
           AND table_name = 'COBRANCA'
           AND grantee = USER
        """
    )
    print("cobranca grants:", cur.fetchall())
    cur.execute(
        """
        SELECT trigger_name, status, trigger_body
          FROM all_triggers
         WHERE owner = 'SIAOS'
           AND trigger_name = 'TG_B_IU_EMBARQUE'
        """
    )
    row = cur.fetchone()
    if row:
        body = row[2]
        text = (
            body.decode("utf-8", "replace")
            if isinstance(body, bytes)
            else str(body or "")
        )
        print(f"=== TG_B_IU_EMBARQUE status={row[1]} ===")
        for i, line in enumerate(text.splitlines(), 1):
            if i >= 80:
                print(f"{i:4}|{line}")
