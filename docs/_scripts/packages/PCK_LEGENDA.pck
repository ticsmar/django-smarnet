CREATE OR REPLACE PACKAGE SMARNET.PCK_LEGENDA IS

  -- Author  : ROGERIOCORBO
  -- Created : 20/11/2006 13:40:10
  -- Purpose : Rotinas do cadastro de legenda dos sistemas

  TYPE T_CURSOR IS REF CURSOR;

  n_cod_leg   SMARNET.LEGENDA.LEG_CODIGO%Type;

  -- =========================================================================================================================
  -- ================================================= INSERE/ATUALIZA LEGENDA ===============================================
  -- n_leg_codigo  -> Código da legenda
  -- n_cod_lingua  -> Código da lingua (idioma)
  -- vc2_descricao -> Texto (descricao) da legenda
  -- =========================================================================================================================
  -- =========================================================================================================================
  PROCEDURE SP_ATUALIZA_LEGENDA(n_leg_codigo  IN OUT SMARNET.LEGENDA.LEG_CODIGO%TYPE,
                                n_cod_lingua  IN     SMARNET.LEGENDA_TEXTO.LIN_COD%TYPE,
                                vc2_descricao IN     SMARNET.LEGENDA_TEXTO.LTE_DESCRICAO%TYPE);



  -- =========================================================================================================================
  -- ================================ RETORNA A LEGENDA DE ACORDO COM O IDIOMA NO PARAMETRO ==================================
  -- n_leg_codigo  -> Código da legenda
  -- n_cod_lingua  -> Código da lingua (idioma)
  -- =========================================================================================================================
  -- =========================================================================================================================
  FUNCTION SF_TEXTO_LEGENDA(n_leg_codigo IN LEGENDA.LEG_CODIGO%TYPE,
                            n_cod_lingua IN LEGENDA_TEXTO.LIN_COD%TYPE)
  RETURN VARCHAR2;



  -- =========================================================================================================================
  -- =================================== RETORNA A LEGENDA DE ACORDO O IDIOMA DO USUARIO =====================================
  -- n_leg_codigo  -> Código da legenda
  -- =========================================================================================================================
  -- =========================================================================================================================
  FUNCTION SF_TEXTO_LEGENDA(n_leg_codigo IN LEGENDA.LEG_CODIGO%TYPE)
  RETURN VARCHAR2;



  -- =========================================================================================================================
  -- ========================= COPIA DESCRICAO DE TABELAS DIVERSAS PARA A NOVA MODELAGEM DE LEGENDA ==========================
  -- vc2_tab_origem  -> Nome da tabela que contem os dados a serem copiados
  -- vc2_col_origem  -> Coluna da tabela que possui os dados
  -- vc2_col_leg     -> Coluna da tabela que armazenará o código da legenda
  -- n_lin_codigo    -> Código do idioma a que se refere a coluna da tabela origem
  -- vc2_erro        -> Retorno de mensagem de erro
  -- =========================================================================================================================
  -- =========================================================================================================================
  PROCEDURE SP_COPIA_LEGENDA(vc2_tab_origem IN  VARCHAR2,
                             vc2_col_origem IN  VARCHAR2,
                             vc2_col_leg    IN  VARCHAR2,
                             n_lin_codigo   IN  INTEGER,
                             vc2_erro       OUT VARCHAR2);

  -- =========================================================================================================================
  -- ================================================= INSERE/ATUALIZA LEGENDA ===============================================
  -- n_leg_codigo  -> Código da legenda
  -- n_cod_lingua  -> Código da lingua (idioma)
  -- vc2_descricao -> Texto (descricao) da legenda
  -- =========================================================================================================================
  -- =========================================================================================================================
  PROCEDURE SP_ATUALIZA_LEGENDA_C(
    n_leg_codigo  IN     SMARNET.LEGENDA.LEG_CODIGO%TYPE,
    n_cod_lingua  IN     SMARNET.LEGENDA_TEXTO.LIN_COD%TYPE,
    vc2_descricao IN     SMARNET.LEGENDA_TEXTO.LTE_DESCRICAO%TYPE);


END PCK_LEGENDA;
/
CREATE OR REPLACE PACKAGE BODY SMARNET.PCK_LEGENDA IS



  -- =========================================================================================================================
  -- ================================================= INSERE/ATUALIZA LEGENDA ===============================================
  -- n_leg_codigo  -> Código da legenda
  -- n_cod_lingua  -> Código da lingua (idioma)
  -- vc2_descricao -> Texto (descricao) da legenda
  -- =========================================================================================================================
  -- =========================================================================================================================
  PROCEDURE SP_ATUALIZA_LEGENDA(n_leg_codigo  IN OUT SMARNET.LEGENDA.LEG_CODIGO%TYPE,
                                n_cod_lingua  IN     SMARNET.LEGENDA_TEXTO.LIN_COD%TYPE,
                                vc2_descricao IN     SMARNET.LEGENDA_TEXTO.LTE_DESCRICAO%TYPE)
  IS
     n_tem_lingua  INTEGER;
     n_tem_legenda INTEGER;
  BEGIN

     -- Nova legenda
     IF(n_leg_codigo IS NULL) THEN

            INSERT INTO LEGENDA(LEG_CODIGO)
                         VALUES(NULL)
            RETURNING LEG_CODIGO
                 INTO n_leg_codigo;

            -- Atualiza a mesma descricao da legenda para todos os idiomas
            UPDATE LEGENDA_TEXTO
               SET LTE_DESCRICAO = vc2_descricao
             WHERE LEG_CODIGO = n_leg_codigo;

     -- Atualiza legenda
     ELSE

            UPDATE SMARNET.LEGENDA_TEXTO
               SET LTE_DESCRICAO = vc2_descricao
             WHERE LEG_CODIGO = n_leg_codigo
               AND LIN_COD    = n_cod_lingua;

            -- Se não encontrou, verifica se existe o código da lingua para inserir a legenda.
            IF(SQL%NOTFOUND) THEN
               SELECT COUNT(*)
                 INTO n_tem_lingua
                 FROM SIAOS.LINGUA
                WHERE LIN_COD = n_cod_lingua;

               SELECT COUNT(*)
                 INTO n_tem_legenda
                 FROM SMARNET.LEGENDA
                WHERE LEG_CODIGO = n_leg_codigo;

               IF((n_tem_lingua > 0) AND (n_tem_legenda > 0)) THEN
                   INSERT INTO LEGENDA_TEXTO(LEG_CODIGO,   LIN_COD,      LTE_DESCRICAO)
                                      VALUES(n_leg_codigo, n_cod_lingua, vc2_descricao);
               END IF;
            END IF;

     END IF;

     COMMIT;

  EXCEPTION WHEN OTHERS THEN 
    NULL;
  END SP_ATUALIZA_LEGENDA;



  -- =========================================================================================================================
  -- ================================ RETORNA A LEGENDA DE ACORDO COM O IDIOMA NO PARAMETRO ==================================
  -- n_leg_codigo  -> Código da legenda
  -- n_cod_lingua  -> Código da lingua (idioma)
  -- =========================================================================================================================
  -- =========================================================================================================================
  FUNCTION SF_TEXTO_LEGENDA(n_leg_codigo IN LEGENDA.LEG_CODIGO%TYPE,
                            n_cod_lingua IN LEGENDA_TEXTO.LIN_COD%TYPE)
  RETURN VARCHAR2
  IS
     vc2_retorno LEGENDA_TEXTO.LTE_DESCRICAO%TYPE; -- Descrição da legenda
     n_lingua    INTEGER;
  BEGIN

     IF(n_cod_lingua IS NULL) THEN

         BEGIN
           SELECT LIN_COD
             INTO n_lingua
             FROM SIAOS.USUARIO
            WHERE UPPER(USU_LOGINWEB) = UPPER(USER);
           EXCEPTION
           WHEN OTHERS THEN NULL;
         END;

     ELSE

         n_lingua := n_cod_lingua;

     END IF;

     BEGIN
         SELECT LTE_DESCRICAO
           INTO vc2_retorno
           FROM SMARNET.LEGENDA_TEXTO
          WHERE LEG_CODIGO = n_leg_codigo
            AND LIN_COD    = n_lingua;

         EXCEPTION
         WHEN OTHERS THEN
             vc2_retorno := '';
     END;

     RETURN(vc2_retorno);

  END SF_TEXTO_LEGENDA;



  -- =========================================================================================================================
  -- =================================== RETORNA A LEGENDA DE ACORDO O IDIOMA DO USUARIO =====================================
  -- n_leg_codigo  -> Código da legenda
  -- =========================================================================================================================
  -- =========================================================================================================================
  FUNCTION SF_TEXTO_LEGENDA(n_leg_codigo IN LEGENDA.LEG_CODIGO%TYPE)
  RETURN VARCHAR2
  IS
     vc2_retorno LEGENDA_TEXTO.LTE_DESCRICAO%TYPE; -- Descrição da legenda
  BEGIN

     BEGIN
       SELECT SF_TEXTO_LEGENDA(n_leg_codigo, LIN_COD)
         INTO vc2_retorno
         FROM SIAOS.USUARIO
        WHERE UPPER(USU_LOGINWEB) = UPPER(USER);
       EXCEPTION
         WHEN NO_DATA_FOUND THEN
           vc2_retorno := PCK_LEGENDA.SF_TEXTO_LEGENDA(n_leg_codigo, 1);
         WHEN OTHERS THEN
           vc2_retorno := ' ';
     END;

     RETURN(vc2_retorno);

  END SF_TEXTO_LEGENDA;



  -- =========================================================================================================================
  -- ========================= COPIA DESCRICAO DE TABELAS DIVERSAS PARA A NOVA MODELAGEM DE LEGENDA ==========================
  -- vc2_tab_origem  -> Nome da tabela que contem os dados a serem copiados
  -- vc2_col_origem  -> Coluna da tabela que possui os dados
  -- vc2_col_leg     -> Coluna da tabela que armazenará o código da legenda
  -- n_lin_codigo    -> Código do idioma a que se refere a coluna da tabela origem
  -- vc2_erro        -> Retorno de mensagem de erro
  -- =========================================================================================================================
  -- =========================================================================================================================
  PROCEDURE SP_COPIA_LEGENDA(vc2_tab_origem IN  VARCHAR2,
                             vc2_col_origem IN  VARCHAR2,
                             vc2_col_leg    IN  VARCHAR2,
                             n_lin_codigo   IN  INTEGER,
                             vc2_erro       OUT VARCHAR2)
  IS
     vc2_sql       VARCHAR2(4000);
     vc2_sql2      VARCHAR2(4000);
     n_leg_codigo  INTEGER;
     cur_sql       T_CURSOR;
     vc2_descricao VARCHAR2(4000);
     vc2_linha     VARCHAR2(100);
  BEGIN

      vc2_erro := 'Concluído com sucesso';

      vc2_sql := 'SELECT TRIM('||vc2_col_origem||') DESCRICAO,
                         ROWID                      LINHA,
                         '||vc2_col_leg||'          LEGENDA
                    FROM '||vc2_tab_origem;

      OPEN cur_sql FOR vc2_sql;
      LOOP

          FETCH cur_sql INTO vc2_descricao, vc2_linha, n_leg_codigo;
          EXIT WHEN cur_sql%NOTFOUND;

          SP_ATUALIZA_LEGENDA(n_leg_codigo, n_lin_codigo, vc2_descricao);

          BEGIN
              vc2_sql2 := 'UPDATE '||vc2_tab_origem||'
                              SET '||vc2_col_leg||' = '||n_leg_codigo||'
                            WHERE ROWID = '''||vc2_linha||'''';

              EXECUTE IMMEDIATE vc2_sql2;

              IF(SQL%NOTFOUND) THEN
                 DELETE FROM LEGENDA_TEXTO
                       WHERE LEG_CODIGO = n_leg_codigo;
                 DELETE FROM LEGENDA
                       WHERE LEG_CODIGO = n_leg_codigo;
              END IF;

              EXCEPTION
              WHEN OTHERS THEN
                 DELETE FROM LEGENDA_TEXTO
                       WHERE LEG_CODIGO = n_leg_codigo;
                 DELETE FROM LEGENDA
                       WHERE LEG_CODIGO = n_leg_codigo;
                 vc2_erro := 'ERRO: '||sqlerrm;
                 EXIT;
          END;

      END LOOP;

      COMMIT;

  END SP_COPIA_LEGENDA;

  -- =========================================================================================================================
  -- ================================================= INSERE/ATUALIZA LEGENDA ===============================================
  -- n_leg_codigo  -> Código da legenda
  -- n_cod_lingua  -> Código da lingua (idioma)
  -- vc2_descricao -> Texto (descricao) da legenda
  -- =========================================================================================================================
  -- =========================================================================================================================
  PROCEDURE SP_ATUALIZA_LEGENDA_C(
    n_leg_codigo  IN     SMARNET.LEGENDA.LEG_CODIGO%TYPE,
    n_cod_lingua  IN     SMARNET.LEGENDA_TEXTO.LIN_COD%TYPE,
    vc2_descricao IN     SMARNET.LEGENDA_TEXTO.LTE_DESCRICAO%TYPE)
  IS
     n_tem_lingua  INTEGER;
     n_tem_legenda INTEGER;
  BEGIN

     -- Nova legenda
     IF(n_leg_codigo IS NULL) THEN

            INSERT INTO LEGENDA(LEG_CODIGO)
                         VALUES(NULL);

            -- Atualiza a mesma descricao da legenda para todos os idiomas
            UPDATE LEGENDA_TEXTO
               SET LTE_DESCRICAO = vc2_descricao
             WHERE LEG_CODIGO = n_cod_leg;

     -- Atualiza legenda
     ELSE

            UPDATE SMARNET.LEGENDA_TEXTO
               SET LTE_DESCRICAO = vc2_descricao
             WHERE LEG_CODIGO = n_leg_codigo
               AND LIN_COD    = n_cod_lingua;

            -- Se não encontrou, verifica se existe o código da lingua para inserir a legenda.
            IF(SQL%NOTFOUND) THEN
               SELECT COUNT(*)
                 INTO n_tem_lingua
                 FROM SIAOS.LINGUA
                WHERE LIN_COD = n_cod_lingua;

               SELECT COUNT(*)
                 INTO n_tem_legenda
                 FROM SMARNET.LEGENDA
                WHERE LEG_CODIGO = n_leg_codigo;

               IF((n_tem_lingua > 0) AND (n_tem_legenda > 0)) THEN
                   INSERT INTO LEGENDA_TEXTO(LEG_CODIGO,   LIN_COD,      LTE_DESCRICAO)
                                      VALUES(n_leg_codigo, n_cod_lingua, vc2_descricao);
               END IF;
            END IF;

     END IF;

     COMMIT;

     EXCEPTION
     WHEN OTHERS THEN NULL;

  END SP_ATUALIZA_LEGENDA_C;

END PCK_LEGENDA;
/
