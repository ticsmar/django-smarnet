CREATE OR REPLACE PACKAGE SMARNET.PCK_SMARNET IS

  clb_texto_gl      CLOB;
	
  PROCEDURE SP_LINK(
    n_opcao            IN   INTEGER,
    n_lik_codigo       IN   SMARNET.LINK_HP.LIK_CODIGO%TYPE,
    v_lik_tipo_legenda IN   SMARNET.LINK_HP.LIK_TIPO_LEGENDA%TYPE,
    v_lik_link         IN   SMARNET.LINK_HP.LIK_LINK%TYPE,
    v_lik_nome         IN   SMARNET.LINK_HP.LIK_NOME%TYPE,
    n_lik_desc_legenda IN   SMARNET.LINK_HP.LIK_DESC_LEGENDA%TYPE,
    n_lik_ativo        IN   SMARNET.LINK_HP.LIK_ATIVO%TYPE,
    n_lik_principal    IN   SMARNET.LINK_HP.LIK_PRINCIPAL%TYPE,
    n_lik_codigo_saida OUT  SMARNET.LINK_HP.LIK_CODIGO%TYPE);

  PROCEDURE SP_DOWNLOAD(
    n_opcao            IN   INTEGER,
    n_dow_codigo       IN   SMARNET.DOWNLOAD.DOW_CODIGO%TYPE,
    v_dow_nome         IN   SMARNET.DOWNLOAD.DOW_NOME%TYPE,
    v_dow_versao       IN   SMARNET.DOWNLOAD.DOW_VERSAO%TYPE,
    v_dow_descricao    IN   SMARNET.DOWNLOAD.DOW_DESCRICAO%TYPE,
    n_ace_codigo       IN   SMARNET.DOWNLOAD.ACE_CODIGO%TYPE,
    n_dow_principal    IN   SMARNET.DOWNLOAD.DOW_PRINCIPAL%TYPE,
    n_dow_ativo        IN   SMARNET.DOWNLOAD.DOW_ATIVO%TYPE,
    n_dow_login        IN   SMARNET.DOWNLOAD.DOW_LOGIN%TYPE,
    n_dow_usuario      IN   SMARNET.DOWNLOAD.DOW_USUARIO%TYPE,
    v_dow_site         IN   SMARNET.DOWNLOAD.DOW_SITE%TYPE,
    n_dti_codigo       IN   SMARNET.DOWNLOAD.DTI_CODIGO%TYPE,
    n_dow_codigo_saida OUT  SMARNET.DOWNLOAD.DOW_CODIGO%TYPE);

  FUNCTION SF_VALIDA_ACESSO(
    v_login            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE,
    v_senha            IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE)
    RETURN NUMBER;

  FUNCTION SF_VALIDA_ACESSO(
    v_login            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE,
    v_senha            IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    n_acesso           IN   SMARNET.ACESSO_FUNC.ACE_CODIGO%TYPE)
    RETURN NUMBER;

  PROCEDURE SP_VALIDA_ACESSO(
    v_login            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE,
    v_senha            IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    n_acesso           IN   SMARNET.ACESSO_FUNC.ACE_CODIGO%TYPE,
    n_codigo           OUT  SIAOS.USUARIO.USU_CHAPA%TYPE,
    n_erro             OUT  INTEGER);

  PROCEDURE SP_ALTERA_SENHA(
    v_login            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE,
    v_senha_old        IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    v_senha_new        IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    v_senha_chk        IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    n_erro             OUT  INTEGER);

  FUNCTION SF_SENHA_PADRAO(
    v_senha            IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE)
    RETURN NUMBER;

  PROCEDURE SP_GERA_TOKEN(
    n_usu_chapa       IN   SIAOS.USUARIO.USU_CHAPA%TYPE,
    n_tem_tk          OUT  NUMBER);

  PROCEDURE SP_VERIFICA_TOKEN(
    n_usu_chapa       IN   SIAOS.USUARIO.USU_CHAPA%TYPE,
    n_tok_senha       IN   SMARNET.TOKEN_LIST.TOK_SENHA%TYPE,
    n_erro            OUT  NUMBER);

	PROCEDURE SP_NOTICIA(
		v_acao            IN     VARCHAR,
		n_not_codigo      IN OUT SMARNET.NOTICIA.NOT_CODIGO%TYPE,
		v_not_titulo      IN     SMARNET.NOTICIA.NOT_TITULO%TYPE,
		n_not_tipo        IN     SMARNET.NOTICIA.NOT_TIPO%TYPE,
		n_pro_codigo      IN     SMARNET.NOTICIA.PRO_CODIGO%TYPE,
		dt_not_entrada    IN     SMARNET.NOTICIA.NOT_DT_ENTRADA%TYPE,
		dt_not_validade   IN     SMARNET.NOTICIA.NOT_DT_VALIDADE%TYPE,
		n_not_filtro      IN     SMARNET.NOTICIA.NOT_FILTRO%TYPE,
		n_usu_chapa       IN     SIAOS.USUARIO.USU_CHAPA%TYPE,
		v_not_obs         IN     SMARNET.NOTICIA.NOT_OBS%TYPE,
		n_lin_cod         IN     SMARNET.NOTICIA.LIN_COD%TYPE);
		

  FUNCTION SF_RET_NUM2CHAR(
    n_valor            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE)
  RETURN VARCHAR2;
	 
  FUNCTION SF_TO_TIME(
    n_time  IN NUMBER) 
    RETURN VARCHAR2;
    
  FUNCTION SF_CALC_TIME(
    dt_start_date IN DATE,
    dt_end_date   IN DATE) 
    RETURN VARCHAR2;
    
END PCK_SMARNET;
/
CREATE OR REPLACE PACKAGE BODY SMARNET.PCK_SMARNET IS

-----------------------------------------------------------
---------- INSERIR, ATUALIZZAR E APAGAR LINKS -------------
-----------------------------------------------------------
  PROCEDURE SP_LINK(
    n_opcao            IN   INTEGER,
    n_lik_codigo       IN   SMARNET.LINK_HP.LIK_CODIGO%TYPE,
    v_lik_tipo_legenda IN   SMARNET.LINK_HP.LIK_TIPO_LEGENDA%TYPE,
    v_lik_link         IN   SMARNET.LINK_HP.LIK_LINK%TYPE,
    v_lik_nome         IN   SMARNET.LINK_HP.LIK_NOME%TYPE,
    n_lik_desc_legenda IN   SMARNET.LINK_HP.LIK_DESC_LEGENDA%TYPE,
    n_lik_ativo        IN   SMARNET.LINK_HP.LIK_ATIVO%TYPE,
    n_lik_principal    IN   SMARNET.LINK_HP.LIK_PRINCIPAL%TYPE,
    n_lik_codigo_saida OUT  SMARNET.LINK_HP.LIK_CODIGO%TYPE)IS
  BEGIN

    IF n_opcao = 1 THEN

       INSERT
         INTO SMARNET.LINK_HP (LIK_TIPO_LEGENDA,LIK_LINK,LIK_NOME,LIK_DESC_LEGENDA,LIK_ATIVO,LIK_PRINCIPAL)
       VALUES (v_lik_tipo_legenda,v_lik_link,v_lik_nome,n_lik_desc_legenda,n_lik_ativo,n_lik_principal)
    RETURNING LIK_CODIGO
         INTO n_lik_codigo_saida;

    ELSIF n_opcao                 = 2 THEN

       UPDATE SMARNET.LINK_HP
          SET LIK_TIPO_LEGENDA = v_lik_tipo_legenda,
              LIK_LINK = v_lik_link,
              LIK_NOME = v_lik_nome,
              LIK_DESC_LEGENDA = n_lik_desc_legenda,
              LIK_ATIVO = n_lik_ativo,
              LIK_PRINCIPAL = n_lik_principal
        WHERE LIK_CODIGO = n_lik_codigo;

       n_lik_codigo_saida := n_lik_codigo;

    ELSIF n_opcao = 3 THEN

      DELETE FROM SMARNET.LINK_HP
       WHERE LIK_CODIGO = n_lik_codigo;

       n_lik_codigo_saida := NULL;

    END IF;

  END SP_LINK;


-----------------------------------------------------------
-------- INSERIR, ATUALIZZAR E APAGAR DOWNLOADS -----------
-----------------------------------------------------------
  PROCEDURE SP_DOWNLOAD(
    n_opcao            IN   INTEGER,
    n_dow_codigo       IN   SMARNET.DOWNLOAD.DOW_CODIGO%TYPE,
    v_dow_nome         IN   SMARNET.DOWNLOAD.DOW_NOME%TYPE,
    v_dow_versao       IN   SMARNET.DOWNLOAD.DOW_VERSAO%TYPE,
    v_dow_descricao    IN   SMARNET.DOWNLOAD.DOW_DESCRICAO%TYPE,
    n_ace_codigo       IN   SMARNET.DOWNLOAD.ACE_CODIGO%TYPE,
    n_dow_principal    IN   SMARNET.DOWNLOAD.DOW_PRINCIPAL%TYPE,
    n_dow_ativo        IN   SMARNET.DOWNLOAD.DOW_ATIVO%TYPE,
    n_dow_login        IN   SMARNET.DOWNLOAD.DOW_LOGIN%TYPE,
    n_dow_usuario      IN   SMARNET.DOWNLOAD.DOW_USUARIO%TYPE,
    v_dow_site         IN   SMARNET.DOWNLOAD.DOW_SITE%TYPE,
    n_dti_codigo       IN   SMARNET.DOWNLOAD.DTI_CODIGO%TYPE,
    n_dow_codigo_saida OUT  SMARNET.DOWNLOAD.DOW_CODIGO%TYPE)IS

  BEGIN

    IF n_opcao = 1 THEN

       INSERT
         INTO SMARNET.DOWNLOAD(DOW_NOME,DOW_VERSAO,DOW_DESCRICAO,ACE_CODIGO,DOW_PRINCIPAL,DOW_ATIVO,DOW_LOGIN,DOW_USUARIO,DOW_SITE,DTI_CODIGO)
       VALUES (v_dow_nome,v_dow_versao,v_dow_descricao,n_ace_codigo,n_dow_principal,n_dow_ativo,n_dow_login,n_dow_usuario,v_dow_site,n_dti_codigo)
    RETURNING DOW_CODIGO
         INTO n_dow_codigo_saida;

    ELSIF n_opcao = 2 THEN

         UPDATE SMARNET.DOWNLOAD
            SET DOW_NOME = v_dow_nome,
                DOW_VERSAO = v_dow_versao,
                DOW_DESCRICAO = v_dow_descricao,
                ACE_CODIGO = n_ace_codigo,
                DOW_PRINCIPAL = n_dow_principal,
                DOW_ATIVO = n_dow_ativo,
                DOW_LOGIN = n_dow_login,
                DOW_USUARIO = n_dow_usuario,
                DOW_SITE = v_dow_site,
                DTI_CODIGO = n_dti_codigo
          WHERE DOW_CODIGO = n_dow_codigo;

       n_dow_codigo_saida := n_dow_codigo;

    ELSIF n_opcao = 3 THEN

      DELETE FROM SMARNET.DOWNLOAD
       WHERE DOW_CODIGO = n_dow_codigo;

       n_dow_codigo_saida := NULL;

    END IF;

  END SP_DOWNLOAD;



-----------------------------------------------------------
-------- VALIDA ACESSO USUARIO ----------------------------
-----------------------------------------------------------
  FUNCTION SF_VALIDA_ACESSO(
    v_login            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE,
    v_senha            IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE)
   RETURN NUMBER IS

    n_codigo                INTEGER := NULL;
    n_tem_senha             INTEGER := NULL;
    n_validacao             INTEGER := NULL;

  BEGIN

    BEGIN

      SELECT U.USU_CHAPA
        INTO n_codigo
        FROM SIAOS.USUARIO U
       WHERE UPPER(U.USU_LOGINWEB) = UPPER(v_login);

    EXCEPTION WHEN OTHERS THEN
       n_codigo := NULL;
    END;


    IF n_codigo IS NOT NULL THEN

      SELECT COUNT(*)
        INTO n_tem_senha
        FROM SMARNET.SENHA S
       WHERE S.USU_CHAPA = n_codigo
         AND S.SEN_CONTEUDO = v_senha;

      IF n_tem_senha > 0 THEN
         n_validacao := n_codigo;
      END IF;

    END IF;

    RETURN n_validacao;

  END SF_VALIDA_ACESSO;


-----------------------------------------------------------
-------- VALIDA ACESSO USUARIO ----------------------------
-----------------------------------------------------------
  FUNCTION SF_VALIDA_ACESSO(
    v_login            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE,
    v_senha            IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    n_acesso           IN   SMARNET.ACESSO_FUNC.ACE_CODIGO%TYPE)
   RETURN NUMBER IS

    n_codigo                INTEGER := NULL;
    n_validacao             INTEGER := NULL;
    n_tem_acesso            INTEGER := NULL;

  BEGIN

    n_codigo := SMARNET.PCK_SMARNET.SF_VALIDA_ACESSO(v_login,v_senha);

    IF n_codigo IS NOT NULL THEN

       SELECT COUNT(*)
         INTO n_tem_acesso
         FROM SMARNET.ACESSO_FUNC A
        WHERE A.USU_CHAPA  = n_validacao
          AND A.ACE_CODIGO = n_acesso;

       IF n_tem_acesso > 0 THEN
          n_validacao := n_codigo;
       END IF;

    END IF;

    RETURN n_validacao;

  END SF_VALIDA_ACESSO;


---------------------------------------------------------------
-------- VALIDA ACESSO USUARIO --------------------------------
-- n_codigo -> NULL = SEM ACESSO                              -
--             NOT NULL = CHAPA DE USUARIO                    -
-- n_erro -> 1 = SENHA/LOGIN INVÁLIDO                         -
--           2 = SEM ACESSO                                   -
---------------------------------------------------------------
  PROCEDURE SP_VALIDA_ACESSO(
    v_login            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE,
    v_senha            IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    n_acesso           IN   SMARNET.ACESSO_FUNC.ACE_CODIGO%TYPE,
    n_codigo           OUT  SIAOS.USUARIO.USU_CHAPA%TYPE,
    n_erro             OUT  INTEGER) IS

    n_tem_acesso            INTEGER := NULL;

  BEGIN

    n_codigo := SMARNET.PCK_SMARNET.SF_VALIDA_ACESSO(v_login,v_senha);

    IF n_codigo IS NOT NULL AND n_acesso IS NOT NULL THEN

       SELECT NVL(COUNT(*),0)
         INTO n_tem_acesso
         FROM SMARNET.ACESSO_FUNC A
        WHERE A.USU_CHAPA  = n_codigo
          AND A.ACE_CODIGO = n_acesso;

       IF n_tem_acesso = 0 THEN
          n_erro := 2;
       END IF;

    ELSE
       n_erro := 1;
    END IF;

  END SP_VALIDA_ACESSO;

---------------------------------------------------------------
-- VALIDA ACESSO USUARIO --------------------------------------
-- n_erro  -> 5 = CAMPOS NULOS                               --
--            6 = SENHA/LOGIN INVÁLIDO                       --
--            7 = SENHA VERIFICAÇÃO NÃO CONFERE              --
--            8 = SENHA NOVA IGUAL A ANTIGA                  --
--            9 = NÃO FOI POSSIVEL ALTERAR                   --
---------------------------------------------------------------
  PROCEDURE SP_ALTERA_SENHA(
    v_login            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE,
    v_senha_old        IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    v_senha_new        IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    v_senha_chk        IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE,
    n_erro             OUT  INTEGER) IS

    n_usu_chapa             INTEGER := NULL;
    v_usuario               SIAOS.USUARIO.USU_LOGINWEB%TYPE;
    vc2_conteudo            CLOB;


  BEGIN

    n_usu_chapa := SMARNET.PCK_SMARNET.SF_VALIDA_ACESSO(v_login,v_senha_old);

    n_erro      := SMARNET.PCK_SMARNET.SF_SENHA_PADRAO(v_senha_new);
    
    BEGIN

      SELECT USU_LOGINWEB
        INTO v_usuario
        FROM SIAOS.USUARIO
       WHERE USU_LOGINWEB = v_login;

    EXCEPTION WHEN OTHERS THEN
      
      n_erro := 4;
    
    END;
     
    IF n_erro IS NULL THEN

     IF v_login IS NULL OR v_senha_old IS NULL OR v_senha_chk IS NULL THEN
         n_erro := 5;
      ELSIF n_usu_chapa IS NULL THEN
         n_erro := 6;
      ELSIF v_senha_new != v_senha_chk THEN
         n_erro := 7;
      ELSIF v_senha_new = v_senha_old THEN
         n_erro := 8;
      ELSE
         IF n_erro IS NULL THEN

           UPDATE SMARNET.SENHA
              SET SEN_CONTEUDO = v_senha_new
            WHERE USU_CHAPA    = n_usu_chapa;

           IF SQL%NOTFOUND THEN
              n_erro := 9;
           END IF;

             IF n_erro IS NULL THEN

                vc2_conteudo := 'NOVA SENHA:' || v_login;
                
                INSERT 
                  INTO SIAOS.LOG_GENERICO (LGE_TEXTO, LGE_DATA)
                VALUES (vc2_conteudo, SYSDATE);

                INSERT
                  INTO SMARNET.ALTERA_SENHA(ASE_LOGIN, ASE_SENHA)
                VALUES (v_usuario,v_senha_new);

                COMMIT;

             END IF;

         END IF;

      END IF;

    END IF;

  END SP_ALTERA_SENHA;


-----------------------------------------------------------
-- VERIFICA ERROS NA SENHA --------------------------------
-- n_erro  -> 1 = SENHA NULA                             --
--            2 = TAMANHO INFERIOR A 8 CARACTERES        --
--            3 = NECECITA DE 3 NUMEROS                  --
--            4 = NECECITA DE 3 CARACTERES               --
-----------------------------------------------------------

  FUNCTION SF_SENHA_PADRAO(
    v_senha            IN   SMARNET.SENHA.SEN_CONTEUDO%TYPE)
    RETURN NUMBER IS

    i            INTEGER := 1;
    n_erro       INTEGER;
    n_tamanho    INTEGER;
    n_qtd_num    INTEGER := 0;
    n_qtd_str    INTEGER := 0;
    v_parte      VARCHAR2(1);
    v_parte2     VARCHAR2(1);

  BEGIN
       n_tamanho := LENGTH(v_senha);

       IF v_senha IS NULL THEN
          n_erro := 1;
       ELSIF n_tamanho < 8 THEN
          n_erro := 2;
       ELSE

         WHILE n_tamanho >= i LOOP
           v_parte := SUBSTR(v_senha,i,1);
           BEGIN
             v_parte2 := TO_NUMBER(v_parte);
             n_qtd_num := n_qtd_num + 1;
           EXCEPTION WHEN OTHERS THEN
             n_qtd_str := n_qtd_str + 1;
           END;
           i := i + 1;

           IF n_qtd_num >= 3 AND n_qtd_str >= 3 THEN
              i := n_tamanho + 1;
           END IF;

         END LOOP;

         IF n_qtd_num < 3 THEN
            n_erro := 3;
         END IF;

         IF n_qtd_str < 3 THEN
            n_erro := 4;
         END IF;

       END IF;

       RETURN n_erro;

  END SF_SENHA_PADRAO;

-----------------------------------------------------------
-- GERA SE USA TOKEN --------------------------------------
-- RETURN  -> 0 = NÃO USA                                --
--            1 = USA                                    --
-----------------------------------------------------------

  PROCEDURE SP_GERA_TOKEN(
    n_usu_chapa       IN   SIAOS.USUARIO.USU_CHAPA%TYPE,
    n_tem_tk          OUT  NUMBER) IS

    n_token      SMARNET.TOKEN_LIST.TOK_SENHA%TYPE;
    vc2_mensagem SIAOS.PASTA_SMS.SMS_MENSAGEM%TYPE;
    vc2_usu_nome SIAOS.USUARIO.USU_NOME%TYPE;
    n_lin_cod     SIAOS.USUARIO.LIN_COD%TYPE;
    
  BEGIN
       
    SELECT U.USU_TOKEN,
           U.USU_NOME,
           U.LIN_COD
      INTO n_tem_tk,
           vc2_usu_nome,
           n_lin_cod
      FROM SIAOS.USUARIO U
     WHERE U.USU_CHAPA = n_usu_chapa;
    
    IF n_tem_tk = 1 THEN
      
      SELECT TO_CHAR(SUBSTR(ABS(SYS.DBMS_RANDOM.RANDOM),0,6),'000000') 
        INTO n_token
        FROM DUAL;

      BEGIN
        UPDATE TOKEN_LIST
           SET TOK_DT_LOGIN = SYSDATE
         WHERE USU_CHAPA      = n_usu_chapa
           AND TOK_DT_LOGIN IS NULL;
      EXCEPTION WHEN OTHERS THEN
        NULL;
      END;
      
      INSERT 
        INTO TOKEN_LIST(USU_CHAPA,TOK_SENHA)
      VALUES (n_usu_chapa, n_token);
      
      IF n_lin_cod = 1 THEN
        vc2_mensagem := 'SMARNET SMS MESSAGE:'   || CHR(10) || CHR(13) || 
                        'Olá '|| vc2_usu_nome  || CHR(10) || CHR(13) || 
                        'Seu Token de Acesso é: ' || n_token;
      ELSE
        vc2_mensagem := 'SMARNET SMS MESSAGE:'   || CHR(10) || CHR(13) || 
                        'Hello '|| vc2_usu_nome  || CHR(10) || CHR(13) || 
                        'Your Token Access is: ' || n_token;
      END IF;
      SIAOS.SP_ENVIA_SMS(n_usu_chapa, NULL, vc2_mensagem);
    
    END IF;
    
    COMMIT;
    
  EXCEPTION WHEN OTHERS THEN
   n_tem_tk := 0;
  END SP_GERA_TOKEN;
  
  
-----------------------------------------------------------
-- VERIFICA O TOKEN ---------------------------------------
-- RETURN  -> 0 = NÃO USA                                --
--            1 = USA                                    --
-----------------------------------------------------------

  PROCEDURE SP_VERIFICA_TOKEN(
    n_usu_chapa       IN   SIAOS.USUARIO.USU_CHAPA%TYPE,
    n_tok_senha       IN   SMARNET.TOKEN_LIST.TOK_SENHA%TYPE,
    n_erro            OUT  NUMBER)IS

    n_tok_validade         NUMBER(14);--SMARNET.TOKEN_LIST.TOK_DT_VALIDADE%TYPE;
    n_tok_atual            NUMBER(14);--SMARNET.TOKEN_LIST.TOK_DT_VALIDADE%TYPE;
    dt_tok_login           SMARNET.TOKEN_LIST.TOK_DT_LOGIN%TYPE;
    
  BEGIN
           
    SELECT TO_CHAR(T.TOK_DT_VALIDADE,'YYYYMMDDHH24MISS'),
           T.TOK_DT_LOGIN
      INTO n_tok_validade,
           dt_tok_login
      FROM SMARNET.TOKEN_LIST T
     WHERE T.USU_CHAPA = n_usu_chapa
       AND T.TOK_SENHA = n_tok_senha;
    IF SQL%NOTFOUND THEN
       n_tok_validade := NULL;
    END IF;
    
    
    n_tok_atual := TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS');
    
    IF dt_tok_login IS NULL THEN
      
      IF n_tok_validade IS NULL THEN
         n_erro := 1;
      ELSIF n_tok_validade < n_tok_atual THEN
         n_erro := 2;
      ELSE
         n_erro := 0;
         
        UPDATE TOKEN_LIST
           SET TOK_DT_LOGIN = SYSDATE
         WHERE USU_CHAPA = n_usu_chapa
           AND TOK_SENHA = n_tok_senha;
         
      END IF;
      
    ELSE
      n_erro := 3;
    END IF;
    
    COMMIT;
 
  EXCEPTION WHEN OTHERS THEN
    n_erro := 1;
  END SP_VERIFICA_TOKEN;
	
-----------------------------------------------------------
-- GRAVA NOTICIA    ---------------------------------------
-- RETURN  -> 0 = NÃO USA                                --
--            1 = USA                                    --
-----------------------------------------------------------

	PROCEDURE SP_NOTICIA(
		v_acao            IN     VARCHAR,
		n_not_codigo      IN OUT SMARNET.NOTICIA.NOT_CODIGO%TYPE,
		v_not_titulo      IN     SMARNET.NOTICIA.NOT_TITULO%TYPE,
		n_not_tipo        IN     SMARNET.NOTICIA.NOT_TIPO%TYPE,
		n_pro_codigo      IN     SMARNET.NOTICIA.PRO_CODIGO%TYPE,
		dt_not_entrada    IN     SMARNET.NOTICIA.NOT_DT_ENTRADA%TYPE,
		dt_not_validade   IN     SMARNET.NOTICIA.NOT_DT_VALIDADE%TYPE,
		n_not_filtro      IN     SMARNET.NOTICIA.NOT_FILTRO%TYPE,
		n_usu_chapa       IN     SIAOS.USUARIO.USU_CHAPA%TYPE,
		v_not_obs         IN     SMARNET.NOTICIA.NOT_OBS%TYPE,
		n_lin_cod         IN     SMARNET.NOTICIA.LIN_COD%TYPE) IS
	                                         
		n_usu_chapa_log          SMARNET.NOTICIA.USU_CHAPA_RESP%TYPE;
		n_usu_nome_log           SIAOS.USUARIO.USU_NOME%TYPE;
		n_usu_email_log          SIAOS.USUARIO.USU_EMAIL%TYPE;
		n_usu_nome               SIAOS.USUARIO.USU_NOME%TYPE;
		n_usu_email              SIAOS.USUARIO.USU_EMAIL%TYPE;
		n_pen_numero             SMARNET.NOTICIA.PEN_NUMERO%TYPE := 79;
		n_pnu_numero             SMARNET.NOTICIA.PNU_NUMERO%TYPE;
		v_not_obs2               SMARNET.NOTICIA.NOT_OBS%TYPE;
		v_data                   VARCHAR2(10) := TO_CHAR(SYSDATE,'DD/MM/YYYY');
		n_not_tipo2              SMARNET.NOTICIA.NOT_TIPO%TYPE;
		n_not_tipo_txt           VARCHAR2(255);
	  
		vc2_de                   VARCHAR2(255);
		vc2_para                 VARCHAR2(255); 
		vc2_assunto              VARCHAR2(255);
		clb_texto                CLOB;
		n_eml_numero             INTEGER;
	  
		-- I = INSERT
		-- U = UPDATE
		-- D = DELETE
		-- E = ENVIAR AO MODERADOR
		-- C = CANCELAR ENVIO AO MODERADOR
		-- A = APROVAR MODERADOR
		-- R = REPROVAR MODERADOR
		-- V = REVISAR NOTICIA APROVADA
	  
	BEGIN
    BEGIN
			SELECT USU_CHAPA,
						 USU_NOME,
						 USU_EMAIL
				INTO n_usu_chapa_log,
						 n_usu_nome_log,
						 n_usu_email_log
				FROM SIAOS.USUARIO
			 WHERE UPPER(USU_LOGINWEB) = UPPER(USER);
	  EXCEPTION WHEN OTHERS THEN
			SELECT USU_CHAPA,
						 USU_NOME,
						 USU_EMAIL
				INTO n_usu_chapa_log,
						 n_usu_nome_log,
						 n_usu_email_log
				FROM SIAOS.USUARIO
			 WHERE UPPER(USU_LOGINWEB) = UPPER('JULIANO');			
		END;
		vc2_de := n_usu_nome_log || '<' || n_usu_email_log || '>';
	  
		IF n_usu_chapa IS NOT NULL THEN

			SELECT USU_NOME,
						 USU_EMAIL
				INTO n_usu_nome,
						 n_usu_email
				FROM SIAOS.USUARIO
			 WHERE USU_CHAPA = n_usu_chapa;
	    
			vc2_para := n_usu_nome || '<' || n_usu_email || '>';

		END IF;
	  
		IF n_not_tipo IS NOT NULL THEN
			 SELECT DECODE(n_not_tipo, 1,'NOTÍCIA',DECODE(n_not_tipo, 2,'INFORMATIVO',DECODE(n_not_tipo, 3,'DICAS','BOLETIM')))
				 INTO n_not_tipo_txt
				 FROM DUAL;
		END IF;

		v_not_obs2 := 'Em '||v_data||' '||n_usu_nome||' escreveu:'||CHR(10)||v_not_obs;
	  
		IF v_acao = 'I' THEN  

			INSERT 
				INTO NOTICIA
						 (NOT_TITULO, NOT_CONTEUDO, NOT_TIPO, PRO_CODIGO, NOT_DT_ENTRADA, NOT_DT_VALIDADE, USU_CHAPA_RESP, NOT_FILTRO, LIN_COD)
			VALUES (v_not_titulo, clb_texto_gl, n_not_tipo, n_pro_codigo, dt_not_entrada, dt_not_validade, n_usu_chapa_log , n_not_filtro, n_lin_cod)
			RETURNING 
						 NOT_CODIGO
			INTO   n_not_codigo;

		ELSIF v_acao = 'U' THEN  

			UPDATE NOTICIA
				 SET NOT_TITULO      = v_not_titulo,
						 NOT_CONTEUDO    = clb_texto_gl,
						 NOT_TIPO        = n_not_tipo,
						 PRO_CODIGO      = n_pro_codigo,
						 NOT_DT_ENTRADA  = dt_not_entrada,
						 NOT_DT_VALIDADE = dt_not_validade,
						 USU_CHAPA_RESP  = n_usu_chapa_log ,
						 NOT_FILTRO      = n_not_filtro,
						 LIN_COD         = n_lin_cod
			 WHERE NOT_CODIGO      = n_not_codigo;

		ELSIF v_acao = 'D' THEN  
	  
			SELECT PNU_NUMERO
				INTO n_pnu_numero
				FROM NOTICIA
			 WHERE NOT_CODIGO      = n_not_codigo;
	     
			SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(n_pnu_numero, n_pen_numero);

			DELETE NOTICIA
			 WHERE NOT_CODIGO = n_not_codigo;
	  
		ELSIF v_acao = 'E' THEN  
	        
			vc2_assunto := 'Moderar '||n_not_tipo_txt||': "'||v_not_titulo||'"';
			clb_texto   := n_usu_nome_log || ' enviou um(a) nova '|| n_not_tipo_txt||' para sua avaliação.<br><br>Título: "'||v_not_titulo||'".<br><br>Favor moderar utilizando o sistema de pedências do Smarnet.';
			SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(vc2_de, vc2_para, NULL, NULL, vc2_assunto, vc2_assunto, clb_texto, NULL, NULL, 1, n_eml_numero);

			SIAOS.PCK_PENDENCIA.SP_GERA_PENDENCIA2(vc2_assunto, 'SMARNET.NOTICIA', n_pen_numero, NULL, n_usu_chapa, 'codigo='||n_not_codigo, n_pnu_numero);
	    
			IF v_not_obs IS NOT NULL THEN
				 v_not_obs2 := 'Notas Elaborador:'||CHR(10)||v_not_obs2||CHR(10)||'----------------------'||CHR(10);
			ELSE
				 v_not_obs2 := NULL;
			END IF;
	    
			UPDATE NOTICIA
				 SET NOT_DT_ENVIO    = SYSDATE,
						 PEN_NUMERO      = n_pen_numero,
						 PNU_NUMERO      = n_pnu_numero,
						 NOT_OBS         = v_not_obs2||NOT_OBS
			 WHERE NOT_CODIGO      = n_not_codigo;
	         
		ELSIF v_acao = 'A' THEN  

			vc2_assunto := 'O(a) '||n_not_tipo_txt||': "'||v_not_titulo||'" foi Aprovado.';
			clb_texto   := 'O(a) '|| n_not_tipo_txt||'<br>Título: "'||v_not_titulo||'".<br>Foi aprovado por '||n_usu_nome_log;
			SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(vc2_de, vc2_para, NULL, NULL, vc2_assunto, vc2_assunto, clb_texto, NULL, NULL, 1, n_eml_numero);

			IF v_not_obs IS NOT NULL THEN
				 v_not_obs2 := 'Notas Moderador:'||CHR(10)||v_not_obs2||CHR(10)||'----------------------'||CHR(10);
			ELSE
				 v_not_obs2 := NULL;
			END IF;

			UPDATE NOTICIA
				 SET NOT_DT_APROVA   = SYSDATE,
						 NOT_OBS         = v_not_obs2||NOT_OBS
			 WHERE NOT_CODIGO      = n_not_codigo;

			SELECT PNU_NUMERO
				INTO n_pnu_numero
				FROM NOTICIA
			 WHERE NOT_CODIGO      = n_not_codigo;
	     
			SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(n_pnu_numero, n_pen_numero);

			IF n_not_tipo != 1 AND n_not_tipo != 5 THEN
				 SMARNET.SP_NOTICIA_MAILING();
			END IF;

		ELSIF v_acao = 'R' OR v_acao = 'C' THEN  

			IF v_acao = 'R' THEN
				v_not_obs2 := 'Notas Moderador:'||CHR(10)||v_not_obs2||CHR(10)||'----------------------'||CHR(10);

				vc2_assunto := 'O(a) '||n_not_tipo_txt||': "'||v_not_titulo||'" foi Reprovado!';
				clb_texto   := n_usu_nome_log || ' Reprovou o(a) '||n_not_tipo_txt||': "'||v_not_titulo||'".<br><br>'||REPLACE(CHR(10),'<br>',v_not_obs2)||'<br><br>Favor Verificar.';
				SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(vc2_de, vc2_para, NULL, NULL, vc2_assunto, vc2_assunto, clb_texto, NULL, NULL, 1, n_eml_numero); 

			ELSE
				 v_not_obs2 := NULL;
			END IF;
	    
			UPDATE NOTICIA
				 SET NOT_DT_ENVIO    = NULL,
						 NOT_EMAIL       = 0,
						 NOT_OBS         = v_not_obs2||NOT_OBS
			 WHERE NOT_CODIGO      = n_not_codigo;

			SELECT PNU_NUMERO
				INTO n_pnu_numero
				FROM NOTICIA
			 WHERE NOT_CODIGO      = n_not_codigo;
	     
			 DELETE SIAOS.PENDENCIA_USER_ITEM
				WHERE PEN_NUMERO     = n_pen_numero
					AND PNU_NUMERO     = n_pnu_numero;
	     
		ELSIF v_acao = 'V' THEN  

			UPDATE NOTICIA
				 SET NOT_DT_ENVIO    = NULL,
						 NOT_DT_APROVA   = NULL,
						 PEN_NUMERO      = NULL,
						 PNU_NUMERO      = NULL,
						 NOT_EMAIL       = 0
			 WHERE NOT_CODIGO      = n_not_codigo;
	    
		ELSIF v_acao = 'P' THEN  

			SELECT NOT_TIPO
				INTO n_not_tipo2
				FROM NOTICIA
			 WHERE NOT_CODIGO      = n_not_codigo;
	    
			IF n_not_tipo2 = 1 OR n_not_tipo2 = 5 THEN
				UPDATE NOTICIA
					 SET NOT_DT_ENVIO    = SYSDATE,
							 NOT_DT_APROVA   = SYSDATE
				 WHERE NOT_CODIGO      = n_not_codigo;
			END IF;
		END IF;

	END SP_NOTICIA;

-----------------------------------------------------------
-------- VALIDA ACESSO USUARIO ----------------------------
-----------------------------------------------------------
  FUNCTION SF_RET_NUM2CHAR(
    n_valor            IN   SIAOS.USUARIO.USU_LOGINWEB%TYPE)
   RETURN VARCHAR2 IS

			v NUMBER;
			d NUMBER;
			s VARCHAR2(2);
			
	BEGIN
			-- Test statements here
			IF n_valor > 99 THEN
				v := (n_valor-100)/35;
				CASE
					WHEN v < 1  THEN s := 'A';
					WHEN v < 2  THEN s := 'B';
					WHEN v < 3  THEN s := 'C';
					WHEN v < 4  THEN s := 'D';
					WHEN v < 5  THEN s := 'E';
					WHEN v < 6  THEN s := 'F';
					WHEN v < 7  THEN s := 'G';
					WHEN v < 8  THEN s := 'H';
					WHEN v < 9  THEN s := 'I';
					WHEN v < 10 THEN s := 'J';
					WHEN v < 11 THEN s := 'K';
					WHEN v < 12 THEN s := 'L';
					WHEN v < 13 THEN s := 'M';
					WHEN v < 14 THEN s := 'N';
					WHEN v < 15 THEN s := 'O';
					WHEN v < 16 THEN s := 'P';
					WHEN v < 17 THEN s := 'Q';
					WHEN v < 18 THEN s := 'R';
					WHEN v < 19 THEN s := 'S';
					WHEN v < 20 THEN s := 'T';
					WHEN v < 21 THEN s := 'U';
					WHEN v < 22 THEN s := 'V';
					WHEN v < 23 THEN s := 'W';
					WHEN v < 24 THEN s := 'X';
					WHEN v < 25 THEN s := 'Y';
					ELSE              s := 'Z';
				END CASE;
		    
				IF v >= 1 THEN
					d := TRUNC(v,2) - TRUNC(v);
				ELSE
					d := TRUNC(v,2);
				END IF;
		    
				CASE
					WHEN d <= 0.00 THEN s := s || '0';
					WHEN d <= 0.03 THEN s := s || '1';
					WHEN d <= 0.06 THEN s := s || '2';
					WHEN d <= 0.09 THEN s := s || '3';
					WHEN d <= 0.11 THEN s := s || '4';
					WHEN d <= 0.14 THEN s := s || '5';
					WHEN d <= 0.17 THEN s := s || '6';
					WHEN d <= 0.20 THEN s := s || '7';
					WHEN d <= 0.23 THEN s := s || '8';
					WHEN d <= 0.26 THEN s := s || '9';
					WHEN d <= 0.29 THEN s := s || 'A';
					WHEN d <= 0.31 THEN s := s || 'B';
					WHEN d <= 0.34 THEN s := s || 'C';
					WHEN d <= 0.37 THEN s := s || 'D';
					WHEN d <= 0.40 THEN s := s || 'E';
					WHEN d <= 0.43 THEN s := s || 'F';
					WHEN d <= 0.46 THEN s := s || 'G';
					WHEN d <= 0.49 THEN s := s || 'H';
					WHEN d <= 0.51 THEN s := s || 'I';
					WHEN d <= 0.54 THEN s := s || 'J';
					WHEN d <= 0.57 THEN s := s || 'K';
					WHEN d <= 0.60 THEN s := s || 'L';
					WHEN d <= 0.63 THEN s := s || 'M';
					WHEN d <= 0.66 THEN s := s || 'N';
					WHEN d <= 0.69 THEN s := s || 'O';
					WHEN d <= 0.71 THEN s := s || 'P';
					WHEN d <= 0.74 THEN s := s || 'Q';
					WHEN d <= 0.77 THEN s := s || 'R';
					WHEN d <= 0.80 THEN s := s || 'S';
					WHEN d <= 0.83 THEN s := s || 'T';
					WHEN d <= 0.86 THEN s := s || 'U';
					WHEN d <= 0.89 THEN s := s || 'V';
					WHEN d <= 0.91 THEN s := s || 'W';
					WHEN d <= 0.94 THEN s := s || 'X';
					WHEN d <= 0.97 THEN s := s || 'Y';
					ELSE                s := s || 'Z';
				END CASE;
		        
			ELSE
				s := n_valor;
			END IF;

    RETURN s;

  END SF_RET_NUM2CHAR;

-----------------------------------------------------------
-------- RETORNA TEMPO DECORRIDO EM 99d HH24:MI:SS --------
-----------------------------------------------------------
  FUNCTION SF_TO_TIME(
    n_time  IN NUMBER) 
    RETURN VARCHAR2 IS
  
    n_time2 NUMBER := 0;
    n_year  NUMBER := 0;
    n_month NUMBER := 0;
    n_days  NUMBER := 0;
    n_hour  NUMBER := 0;
    n_min   NUMBER := 0;
    n_sec   NUMBER := 0;
    v_time  VARCHAR2(100);
    
  BEGIN
  
    n_time2 :=  n_time;
    
    n_days := TRUNC(n_time);
    
    IF n_days > 365 THEN
      n_year := TRUNC(n_days/365);
      v_time := n_year || 'a ';
      n_days := n_days - (n_year * 365);
    END IF;
    
    IF n_days > 30 THEN
      n_month := TRUNC(n_days/30);
      v_time := v_time || n_month || 'm ';
      n_days := n_days - (n_month * 30);
    END IF;
    
    IF n_days > 0 THEN
      v_time := v_time || n_days || 'd ';
    END IF;
    
    n_days := TRUNC(n_time2);
    n_time2 := (n_time2 - n_days) * 24;
    n_hour := TRUNC(n_time2);
    
    v_time := v_time || TO_CHAR(n_hour,'00') || ':';
    
    n_time2 := (n_time2 - n_hour) * 60;
    n_min := TRUNC(n_time2);
    
    v_time := v_time || TRIM(TO_CHAR(n_min,'00')) || ':';
    
    n_time2 := (n_time2 - n_min) * 60;
    n_sec := TRUNC(n_time2);
    
    v_time := v_time || TRIM(TO_CHAR(n_sec,'00'));
      
    RETURN(v_time);
    
  END SF_TO_TIME;
  


-----------------------------------------------------------
-------- RETORNA TEMPO DECORRIDO EM 99d HH24:MI:SS --------
-----------------------------------------------------------
  FUNCTION SF_CALC_TIME(
    dt_start_date IN DATE,
    dt_end_date   IN DATE) 
    RETURN VARCHAR2 IS
  
    n_time  NUMBER := 0;
    v_time  VARCHAR2(100);
    
  BEGIN
  
    n_time := dt_end_date - dt_start_date;
    
    v_time := SMARNET.PCK_SMARNET.SF_TO_TIME(n_time);
      
    RETURN(v_time);
    
  END SF_CALC_TIME;
  
END PCK_SMARNET;
/
