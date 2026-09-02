"""Probe VW_OSS_PEND / VW_TITULOS_PEND after grants — dev only."""
from django.db import connections

OWNER_CANDIDATES = ("INTEGRACAO", "SADIG", "SIAOS")
OBJECTS = ("VW_OSS_PEND", "VW_TITULOS_PEND")


def _try(cursor, sql, params=None):
    try:
        cursor.execute(sql, params or [])
        return cursor.fetchall(), None
    except Exception as exc:
        return None, str(exc).split("\n")[0][:160]


with connections["smar"].cursor() as c:
    for name in OBJECTS:
        rows, err = _try(
            c,
            """
            SELECT OWNER, OBJECT_TYPE, STATUS
              FROM ALL_OBJECTS
             WHERE OBJECT_NAME = %s
             ORDER BY OWNER
            """,
            [name],
        )
        print(f"objects {name}:", rows if err is None else err)

        rows, err = _try(
            c,
            """
            SELECT OWNER, SYNONYM_NAME, TABLE_OWNER, TABLE_NAME
              FROM ALL_SYNONYMS
             WHERE SYNONYM_NAME = %s
                OR TABLE_NAME = %s
             ORDER BY OWNER, SYNONYM_NAME
            """,
            [name, name],
        )
        print(f"synonyms {name}:", rows if err is None else err)

    for owner in OWNER_CANDIDATES:
        for name in OBJECTS:
            fq = f"{owner}.{name}"
            rows, err = _try(c, f"SELECT COUNT(*) FROM {fq} WHERE ROWNUM = 1")
            print(f"select {fq}:", "ok", rows[0][0] if rows else None if err is None else err)

    rows, err = _try(
        c,
        """
        SELECT COLUMN_NAME
          FROM ALL_TAB_COLUMNS
         WHERE TABLE_NAME IN ('VW_OSS_PEND', 'VW_TITULOS_PEND')
         ORDER BY OWNER, TABLE_NAME, COLUMN_ID
        """,
    )
    print("columns:", rows if err is None else err)

    rows, err = _try(
        c,
        """
        SELECT COUNT(*) FROM INTEGRACAO.VW_TITULOS_PEND
         WHERE COD_CLI = LPAD(16320, 6, 0)
        """,
    )
    print("titulos 16320 INTEGRACAO:", rows if err is None else err)

    rows, err = _try(
        c,
        """
        SELECT COUNT(*) FROM SADIG.VW_TITULOS_PEND
         WHERE COD_CLI = LPAD(16320, 6, 0)
        """,
    )
    print("titulos 16320 SADIG:", rows if err is None else err)

    rows, err = _try(
        c,
        """
        SELECT COUNT(*) FROM INTEGRACAO.VW_OSS_PEND WHERE CUST_KEY = 16320
        """,
    )
    print("oss 16320 INTEGRACAO:", rows if err is None else err)

    rows, err = _try(
        c,
        """
        SELECT T.OS, T.ORDER_NO, T.FATURADO, T.ANTECIPACAO, T.AVISTA, T.PARCELA,
               T.PG_ANTECIPADO, T.SALDO
          FROM INTEGRACAO.VW_OSS_PEND T
         WHERE T.CUST_KEY = 16320 AND ROWNUM <= 2
        """,
    )
    print("oss cols FATURADO/SALDO:", rows if err is None else err)
