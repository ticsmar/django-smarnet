"""Dump live SIAOS cliente/cobranca trigger source."""

from django.db import connections


def run() -> None:
    cur = connections["smar"].cursor()
    cur.execute(
        """
        SELECT trigger_name, status, trigger_body
          FROM all_triggers
         WHERE owner = 'SIAOS'
           AND trigger_name IN (
                 'TG_B_IU_COBRANCA', 'TG_B_IU_CLIENTE', 'TG_B_I_CLIENTE'
               )
        """
    )
    for name, status, body in cur.fetchall():
        text = (
            body.decode("utf-8", "replace")
            if isinstance(body, bytes)
            else str(body or "")
        )
        print(f"=== {name} status={status} len={len(text)} ===")
        lines = text.splitlines()
        for i, line in enumerate(lines, 1):
            print(f"{i:4}|{line}")
        print()

    cur.execute(
        """
        SELECT line, text
          FROM all_source
         WHERE owner = 'SIAOS'
           AND name = 'PCK_CLIENTE'
           AND type = 'PACKAGE BODY'
           AND line BETWEEN 1 AND 80
         ORDER BY line
        """
    )
    rows = cur.fetchall()
    print(f"=== PCK_CLIENTE body start ({len(rows)} lines) ===")
    for line, text in rows:
        print(f"{int(line):4}|{(text or '').rstrip()}")

    cur.execute(
        """
        SELECT line, text
          FROM all_source
         WHERE owner = 'SIAOS'
           AND name = 'PCK_CLIENTE'
           AND type = 'PACKAGE BODY'
           AND UPPER(text) LIKE '%COBRAN%'
         ORDER BY line
        """
    )
    print("=== PCK_CLIENTE COBRAN lines ===")
    for line, text in cur.fetchall():
        print(f"{int(line):4}|{(text or '').rstrip()}")
