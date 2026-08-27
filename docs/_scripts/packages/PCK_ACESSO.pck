CREATE OR REPLACE PACKAGE SMARNET.PCK_ACESSO IS

  PROCEDURE SP_CAD_ACESSO(
    n_ace_codigo    IN   SMARNET.ACESSO.ACE_CODIGO%TYPE,
    v_ace_nome      IN   SMARNET.ACESSO.ACE_NOME%TYPE,
    n_ace_resp      IN   SMARNET.ACESSO.ACE_RESP%TYPE,
    v_ace_descricao IN   SMARNET.ACESSO.ACE_DESCRICAO%TYPE,
    n_ace_resp_info IN   SMARNET.ACESSO.ACE_RESP_INFORMATICA%TYPE,
    v_ace_grant     IN   SMARNET.ACESSO.ACE_GRANT%TYPE,
    n_pro_codigo    IN   SMARNET.ACESSO.PRO_CODIGO%TYPE,
    n_acao          IN   INTEGER := 0,
    n_erro          OUT  INTEGER);

  PROCEDURE SP_IN_ACESSO(
    n_acesso     IN   SMARNET.ACESSO_FUNC.ACE_CODIGO%TYPE,
    n_chapa_usu  IN   SMARNET.ACESSO_FUNC.USU_CHAPA%TYPE,
    n_chapa_resp IN   SMARNET.ACESSO_FUNC.AFU_RESP%TYPE,
    n_grant      IN   SMARNET.ACESSO_FUNC.AFU_GRANT%TYPE,
    n_erro       OUT  INTEGER);

  PROCEDURE SP_DL_ACESSO(
    n_acesso     IN   SMARNET.ACESSO_FUNC.ACE_CODIGO%TYPE,
    n_chapa_usu  IN   SMARNET.ACESSO_FUNC.USU_CHAPA%TYPE);

  PROCEDURE SP_INATIVA_USUARIO(
    n_pessoa     IN   SIAOS.USUARIO.PES_NUMERO%TYPE,
    n_chapa_usu  OUT  INTEGER,
    n_erro       OUT  INTEGER);

  PROCEDURE SP_INATIVA_FUNCIONARIO(
    n_chapa_fun  IN   SIAOS.FUNCIONARIO.FUN_CHAPA%TYPE,
    n_erro       OUT  INTEGER);

END PCK_ACESSO;
/
CREATE OR REPLACE PACKAGE BODY SMARNET.PCK_ACESSO IS

-----------------------------------------------------------
-------- CADASTRO DE ACESSO -------------------------------
-----------------------------------------------------------
  PROCEDURE SP_CAD_ACESSO(
    n_ace_codigo    IN   SMARNET.ACESSO.ACE_CODIGO%TYPE,
    v_ace_nome      IN   SMARNET.ACESSO.ACE_NOME%TYPE,
    n_ace_resp      IN   SMARNET.ACESSO.ACE_RESP%TYPE,
    v_ace_descricao IN   SMARNET.ACESSO.ACE_DESCRICAO%TYPE,
    n_ace_resp_info IN   SMARNET.ACESSO.ACE_RESP_INFORMATICA%TYPE,
    v_ace_grant     IN   SMARNET.ACESSO.ACE_GRANT%TYPE,
    n_pro_codigo    IN   SMARNET.ACESSO.PRO_CODIGO%TYPE,
    n_acao          IN   INTEGER := 0,
    n_erro          OUT  INTEGER)IS
    
    /* 
    n_acao -> 0 - Insert/Update,
              1 - Importação, 
              2 - Exclusao
    */
    
  BEGIN

   IF n_acao != 2 THEN
   
     BEGIN
     
      INSERT INTO ACESSO
        (ACE_CODIGO, ACE_NOME, ACE_RESP, ACE_DESCRICAO, ACE_RESP_INFORMATICA, ACE_GRANT, PRO_CODIGO)
      VALUES
        (n_ace_codigo, v_ace_nome, n_ace_resp, v_ace_descricao, n_ace_resp_info, v_ace_grant, n_pro_codigo);

     EXCEPTION WHEN OTHERS THEN

       IF n_acao = 1 THEN

         UPDATE ACESSO
            SET ACE_NOME = v_ace_nome,
                ACE_RESP = n_ace_resp,
                ACE_DESCRICAO = v_ace_descricao,
                ACE_RESP_INFORMATICA = n_ace_resp_info,
                ACE_GRANT = v_ace_grant
          WHERE ACE_CODIGO = n_ace_codigo;

       ELSE

         UPDATE ACESSO
            SET ACE_NOME = v_ace_nome,
                ACE_RESP = n_ace_resp,
                ACE_DESCRICAO = v_ace_descricao,
                ACE_RESP_INFORMATICA = n_ace_resp_info,
                ACE_GRANT = v_ace_grant,
                PRO_CODIGO = n_pro_codigo
          WHERE ACE_CODIGO = n_ace_codigo;

       END IF;

     END;

   ELSE
   
     DELETE
       FROM ACESSO
      WHERE ACE_CODIGO = n_ace_codigo;

   END IF;
 
  COMMIT;

  EXCEPTION WHEN OTHERS THEN
    n_erro := 1;
  END SP_CAD_ACESSO;

-----------------------------------------------------------
-------- INSERIR ACESSO POR USUARIO -----------------------
-----------------------------------------------------------
  PROCEDURE SP_IN_ACESSO(
    n_acesso     IN   SMARNET.ACESSO_FUNC.ACE_CODIGO%TYPE,
    n_chapa_usu  IN   SMARNET.ACESSO_FUNC.USU_CHAPA%TYPE,
    n_chapa_resp IN   SMARNET.ACESSO_FUNC.AFU_RESP%TYPE,
    n_grant      IN   SMARNET.ACESSO_FUNC.AFU_GRANT%TYPE,
    n_erro       OUT  INTEGER)IS
  BEGIN

    INSERT INTO SMARNET.ACESSO_FUNC
                (ACE_CODIGO, USU_CHAPA, AFU_RESP, AFU_GRANT)
         VALUES (n_acesso, n_chapa_usu, n_chapa_resp, n_grant);

    COMMIT;

  EXCEPTION WHEN OTHERS THEN
    n_erro := 1;
  END SP_IN_ACESSO;

-----------------------------------------------------------
-------- EXCLUIR ACESSO POR USUARIO -----------------------
-----------------------------------------------------------
  PROCEDURE SP_DL_ACESSO(
    n_acesso     IN   SMARNET.ACESSO_FUNC.ACE_CODIGO%TYPE,
    n_chapa_usu  IN   SMARNET.ACESSO_FUNC.USU_CHAPA%TYPE)IS
  BEGIN

    DELETE FROM SMARNET.ACESSO_FUNC
          WHERE ACE_CODIGO = n_acesso
            AND USU_CHAPA  = n_chapa_usu;

    COMMIT;

  EXCEPTION WHEN OTHERS THEN
    NULL;
  END SP_DL_ACESSO;


-----------------------------------------------------------
-------- INATIVAR USUÁRIO ---------------------------------
-----------------------------------------------------------
  PROCEDURE SP_INATIVA_USUARIO(
    n_pessoa     IN   SIAOS.USUARIO.PES_NUMERO%TYPE,
    n_chapa_usu  OUT  INTEGER,
    n_erro       OUT  INTEGER)IS

    v_login           SIAOS.USUARIO.USU_LOGINWEB%TYPE;
    v_nome            SIAOS.USUARIO.USU_NOME%TYPE;
    v_email           SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_email_de        SIAOS.USUARIO.USU_EMAIL%TYPE;
    vc2_conteudo      VARCHAR2(4000);
    n_eml_numero      INTEGER;

  BEGIN
    BEGIN
      SELECT U.USU_CHAPA,
             U.USU_LOGINWEB,
             U.USU_EMAIL,
             U.USU_NOME
        INTO n_chapa_usu,
             v_login,
             v_email,
             v_nome
        FROM SIAOS.USUARIO U
       WHERE U.PES_NUMERO = n_pessoa
         AND U.USU_LOGINWEB IS NOT NULL;
    EXCEPTION WHEN OTHERS THEN
       n_erro := 1;
    END;

    IF n_erro IS NULL THEN

      BEGIN
        
        UPDATE SIAOS.USUARIO U
           SET U.USU_LOGINWEB = NULL,
               U.USU_EMAIL    = NULL,
               U.USU_STATUS   = 1
         WHERE U.PES_NUMERO   = n_pessoa;

        UPDATE SIAOS.PESSOA P
           SET P.PES_EMAIL = NULL,
               P.PES_ATIVO = 0
         WHERE P.PES_NUMERO   = n_pessoa;

      EXCEPTION WHEN OTHERS THEN
        n_erro := 2;
      END;

      BEGIN
        DELETE
          FROM SMARNET.SENHA
         WHERE USU_CHAPA  = n_chapa_usu;
      EXCEPTION WHEN OTHERS THEN
        n_erro := 4;
      END;

      COMMIT;

      BEGIN
        SELECT U.USU_EMAIL
          INTO v_email_de
          FROM SIAOS.USUARIO U
         WHERE UPPER(U.USU_LOGINWEB) = USER;
      EXCEPTION WHEN OTHERS THEN
        v_email_de := 'smarnet@smar.com.br';
      END;

      vc2_conteudo := 'O usuário abaixo foi <strong>INATIVADO</strong>.<br><br>
                      <table width="100%" border="0" cellspacing="0" cellpadding="2">
                       <tr><td width="50"><strong>Nome</strong></td><td>' || v_nome || '</td></tr>
                       <tr><td><strong>Usuário</strong></td><td>' || v_login || '</td></tr>
                       <tr><td><strong>Email</strong></td><td>' || v_email || '</td></tr>
                       </table><br />
                       <strong>Lista de acessos</strong><br />
                       <table width="100%" border="0" cellspacing="0" cellpadding="0">';
     
      FOR cur_af IN (SELECT AF.ACE_CODIGO, 
                            DECODE(H.PRO_NOME,NULL,A.ACE_NOME,H.PRO_NOME || ' - ' || A.ACE_NOME) ACE_NOME
                       FROM SMARNET.ACESSO_FUNC AF
                      INNER JOIN ACESSO A ON A.ACE_CODIGO = AF.ACE_CODIGO
                       LEFT JOIN HELPDESK.PROJETO H ON A.PRO_CODIGO = H.PRO_CODIGO
                      WHERE AF.USU_CHAPA = n_chapa_usu
                      ORDER BY DECODE(H.PRO_NOME,NULL,A.ACE_NOME,H.PRO_NOME || ' - ' || A.ACE_NOME))
      LOOP
            vc2_conteudo := vc2_conteudo || '<tr><td width="50">' || cur_af.ACE_CODIGO || '</td><td>' || cur_af.ACE_NOME || '</td></tr>';
      END LOOP;
      
       vc2_conteudo := vc2_conteudo || '</table>';
     
      FOR cur_af IN (SELECT U.USU_EMAIL
                       FROM SMARNET.ACESSO_FUNC AF
                      INNER JOIN SIAOS.USUARIO U ON AF.USU_CHAPA = U.USU_CHAPA
                      WHERE AF.ACE_CODIGO = 772)
      LOOP
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_email_de,cur_af.USU_EMAIL,NULL,NULL,'Smarnet - Usuário Inativado','Usuário Inativado',vc2_conteudo,NULL,NULL,1,n_eml_numero);      
      END LOOP;

    END IF;

    BEGIN
      DELETE
        FROM SMARNET.ACESSO_FUNC
       WHERE USU_CHAPA  = n_chapa_usu;
    EXCEPTION WHEN OTHERS THEN
      n_erro := 3;
    END;

    COMMIT;

  EXCEPTION WHEN OTHERS THEN
    n_erro := 5;
  END SP_INATIVA_USUARIO;


-----------------------------------------------------------
-------- INATIVAR FUNCIONARIO -----------------------------
-----------------------------------------------------------
  PROCEDURE SP_INATIVA_FUNCIONARIO(
    n_chapa_fun  IN   SIAOS.FUNCIONARIO.FUN_CHAPA%TYPE,
    n_erro       OUT  INTEGER)IS

    v_nome           SIAOS.PESSOA.PES_NOME%TYPE;
    vc2_conteudo     VARCHAR2(4000);
    v_email_de       SIAOS.USUARIO.USU_EMAIL%TYPE;
    n_eml_numero     INTEGER;

  BEGIN
    BEGIN

      SELECT P.PES_NOME
        INTO v_nome
        FROM SIAOS.PESSOA P
       WHERE P.PES_NUMERO  = (SELECT F.PES_NUMERO
                                FROM SIAOS.FUNCIONARIO F
                               WHERE F.FUN_CHAPA = n_chapa_fun);

    EXCEPTION WHEN OTHERS THEN
       v_nome := 'Nâo encontrado: Chapa ' || n_chapa_fun;
       n_erro := 1;
    END;

    BEGIN

      UPDATE SIAOS.FUNCIONARIO F
         SET F.FUN_ATIVO   = 'N'
       WHERE F.FUN_CHAPA   = n_chapa_fun;

      BEGIN
        SELECT U.USU_EMAIL
          INTO v_email_de
          FROM SIAOS.USUARIO U
         WHERE UPPER(U.USU_LOGINWEB) = USER;
      EXCEPTION WHEN OTHERS THEN
        v_email_de := 'smarnet@smar.com.br';
      END;

      vc2_conteudo := 'O funcionário abaixo foi <strong>INATIVADO</strong>.<br><br>
                       <strong>Nome:</strong> ' || v_nome || '<br />';

      FOR cur_af IN (SELECT U.USU_EMAIL
                       FROM SMARNET.ACESSO_FUNC AF
                      INNER JOIN SIAOS.USUARIO U ON AF.USU_CHAPA = U.USU_CHAPA
                      WHERE AF.ACE_CODIGO = 772)
      LOOP
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_email_de,cur_af.USU_EMAIL,NULL,NULL,'Smarnet - Funcionário Inativado (' || v_nome || ')','Funcionário Inativado',vc2_conteudo,NULL,NULL,1,n_eml_numero);      
      END LOOP;

    EXCEPTION WHEN OTHERS THEN
       n_erro := 2;
    END;

    COMMIT;

  EXCEPTION WHEN OTHERS THEN
    n_erro := 3;
  END SP_INATIVA_FUNCIONARIO;

END PCK_ACESSO;
/
