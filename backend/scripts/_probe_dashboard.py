"""Probe Oracle objects for cliente dashboard — dev only."""
from django.db import connections

with connections["smar"].cursor() as c:
    c.execute(
        """
        SELECT CODIGO, CLIENTE, CLI_GRUPO, LIMITECR, CLI_LIMITE_CRV, BLOQUEADO
          FROM SIAOS.CLIENTE
         WHERE CODIGO = 5415
        """
    )
    print("cliente:", c.fetchone())

    c.execute(
        """
        SELECT COUNT(*)
          FROM SIAOS.OEHDR H
         WHERE H.CUST_KEY = 5415
        """
    )
    print("os count:", c.fetchone())

    c.execute(
        """
        SELECT H.ORDER_NO, H.CUST_KEY, H.ORDER_DATE, H.ORIGEM, O.DESCRICAO
          FROM SIAOS.OEHDR H
          LEFT JOIN SIAOS.ORIGEM O ON O.ORIGEM = H.ORIGEM
         WHERE H.CUST_KEY = 5415
           AND ROWNUM <= 3
        """
    )
    print("os sample:", c.fetchall())

    for table in [
        "PROTPROD.SE1010",
        "PROTPROD.SE2010",
        "SIAOS.VW_TITULOS_CLIENTE",
        "FINANCEIRO.TITULO",
    ]:
        try:
            c.execute(f"SELECT COUNT(*) FROM {table} WHERE ROWNUM = 1")
            print(table, "ok", c.fetchone())
        except Exception as exc:
            print(table, "err", str(exc)[:80])

    c.execute(
        """
        SELECT TABLE_NAME
          FROM ALL_TABLES
         WHERE OWNER IN ('PROTPROD', 'SIAOS', 'INTEGRACAO')
           AND (TABLE_NAME LIKE '%SE1%' OR TABLE_NAME LIKE '%TITUL%')
           AND ROWNUM <= 20
        """
    )
    print("candidate tables:", [r[0] for r in c.fetchall()])

    c.execute(
        """
        SELECT COLUMN_NAME
          FROM ALL_TAB_COLUMNS
         WHERE OWNER = 'SIAOS'
           AND TABLE_NAME = 'OEHDR'
         ORDER BY COLUMN_ID
        """
    )
    cols = [r[0] for r in c.fetchall()]
    print("oehdr cols:", cols)
