CREATE OR REPLACE PACKAGE GERAL.PCK_USUARIO IS

  -- Author  : JULIANO
  -- Created : 17-Jan-05 3:07:05 PM
  -- Purpose : PROCEDURES E FUNCOES DO SISTEMA DE OBJETIVOS E METAS

  ---------------------------------------------------------
  ----------- Verifica se CC tem Objetivo  --*-------------
  ---------------------------------------------------------
  PROCEDURE SP_IN_PRE_PESSOA(v_ppe_nome       IN GERAL.PRE_PESSOA.PPE_NOME%TYPE,
                             v_ppe_email      IN GERAL.PRE_PESSOA.PPE_EMAIL%TYPE,
                             n_fus_codigo     IN GERAL.PRE_PESSOA.FUS_CODIGO%TYPE,
                             v_pre_sexo       IN GERAL.PRE_PESSOA.PRE_SEXO%TYPE,
                             n_lin_cod        IN GERAL.PRE_PESSOA.LIN_COD%TYPE,
                             v_ppe_endereco   IN GERAL.PRE_PESSOA.PPE_ENDERECO%TYPE,
                             v_ppe_bairro     IN GERAL.PRE_PESSOA.PPE_BAIRRO%TYPE,
                             v_ppe_cidade     IN GERAL.PRE_PESSOA.PPE_CIDADE%TYPE,
                             n_est_codigo     IN GERAL.PRE_PESSOA.EST_CODIGO%TYPE,
                             v_ppe_estado     IN GERAL.PRE_PESSOA.PPE_ESTADO%TYPE,
                             v_ppe_cep        IN GERAL.PRE_PESSOA.PPE_CEP%TYPE,
                             n_pai_codigo     IN GERAL.PRE_PESSOA.PAI_CODIGO%TYPE,
                             c_tep_codigo     IN GERAL.PRE_PESSOA.TEP_CODIGO%TYPE,
                             v_ppe_e_nome     IN GERAL.PRE_PESSOA.PPE_E_NOME%TYPE,
                             v_ppe_e_endereco IN GERAL.PRE_PESSOA.PPE_E_ENDERECO%TYPE,
                             v_ppe_e_bairro   IN GERAL.PRE_PESSOA.PPE_E_BAIRRO%TYPE,
                             v_ppe_e_cidade   IN GERAL.PRE_PESSOA.PPE_E_CIDADE%TYPE,
                             n_est_e_codigo   IN GERAL.PRE_PESSOA.EST_E_CODIGO%TYPE,
                             v_ppe_e_estado   IN GERAL.PRE_PESSOA.PPE_E_ESTADO%TYPE,
                             v_ppe_e_cep      IN GERAL.PRE_PESSOA.PPE_E_CEP%TYPE,
                             n_pai_e_codigo   IN GERAL.PRE_PESSOA.PAI_E_CODIGO%TYPE,
                             v_ppe_e_homepage IN GERAL.PRE_PESSOA.PPE_E_HOMEPAGE%TYPE,
                             clb_ppe_motivo   IN GERAL.PRE_PESSOA.PPE_MOTIVO%TYPE,
                             n_ppe_codigo     OUT GERAL.PRE_PESSOA.PPE_CODIGO%TYPE);

  ---------------------------------------------------------
  ------------------ INSERE PRE PESSOA  -------------------
  ---------------------------------------------------------
  PROCEDURE SP_IN_PESSOA(v_ppe_codigo IN GERAL.PRE_PESSOA.PPE_CODIGO%TYPE,
                         n_pes_numero OUT GERAL.PRE_PESSOA.PPE_CODIGO%TYPE);

  ---------------------------------------------------------
  ------------------- INSERE EMPRESA  ---------------------
  ---------------------------------------------------------
  PROCEDURE SP_IN_EMPRESA(n_ppe_codigo  IN GERAL.PRE_PESSOA.PPE_CODIGO%TYPE,
                          v_codigo      IN VARCHAR2,
                          n_tep_codigo2 IN GERAL.PRE_PESSOA.TEP_CODIGO%TYPE,
                          n_emp_codigo  OUT GERAL.PRE_PESSOA.EMP_CODIGO%TYPE,
                          v_ppe_e_nome  OUT GERAL.PRE_PESSOA.PPE_E_NOME%TYPE,
                          n_tep_codigo  OUT GERAL.PRE_PESSOA.TEP_CODIGO%TYPE);

  ---------------------------------------------------------
  ------------------ INSERE PRE PESSOA  -------------------
  ---------------------------------------------------------
  PROCEDURE SP_IN_USUARIO(n_ppe_codigo IN GERAL.PRE_PESSOA.PPE_CODIGO%TYPE,
                          v_login      IN GERAL.PRE_PESSOA.PPE_NOME%TYPE,
                          v_email      IN GERAL.PRE_PESSOA.PPE_EMAIL%TYPE,
                          n_lin_cod    IN GERAL.PRE_PESSOA.LIN_COD%TYPE,
                          c_tep_codigo IN GERAL.PRE_PESSOA.TEP_CODIGO%TYPE,
                          n_empresa    IN GERAL.PRE_PESSOA.EMP_CODIGO%TYPE,
                          v_senha      IN VARCHAR2,
                          n_internet   IN INTEGER,
                          n_rede       IN INTEGER,
                          n_email      IN INTEGER,
                          n_lpr_codigo IN SIAOS.USUARIO.LPR_CODIGO%TYPE,
                          n_usu_chapa  OUT SIAOS.USUARIO.USU_CHAPA%TYPE);

  ---------------------------------------------------------
  -------------------- ALTERA EMPRESA  --------------------
  ---------------------------------------------------------
  PROCEDURE SP_UP_EMPRESA(n_emp_codigo     IN GERAL.EMPRESA.EMP_CODIGO%TYPE, 
                          v_emp_tipo       IN GERAL.EMPRESA.EMP_TIPO%TYPE, 
                          v_emp_nome       IN GERAL.EMPRESA.EMP_NOME%TYPE, 
                          v_emp_endereco   IN GERAL.EMPRESA.EMP_ENDERECO%TYPE, 
                          v_emp_cidade     IN GERAL.EMPRESA.EMP_CIDADE%TYPE, 
                          v_est_codigo     IN GERAL.EMPRESA.EST_CODIGO%TYPE, 
                          v_pai_codigo     IN GERAL.EMPRESA.PAI_CODIGO%TYPE, 
                          v_emp_estado     IN GERAL.EMPRESA.EMP_ESTADO%TYPE,
                          v_emp_bairro     IN GERAL.EMPRESA.EMP_BAIRRO%TYPE,
                          v_emp_cep        IN GERAL.EMPRESA.EMP_CEP%TYPE,
                          v_emp_homepage   IN GERAL.EMPRESA.EMP_HOMEPAGE%TYPE, 
                          v_emp_reduzido   IN GERAL.EMPRESA.EMP_REDUZIDO%TYPE, 
                          v_emp_acesso     IN GERAL.EMPRESA.EMP_ACESSO%TYPE, 
                          n_emp_codigo_fab IN GERAL.EMPRESA.EMP_CODIGO_FAB%TYPE, 
                          v_emp_desc_os    IN GERAL.EMPRESA.EMP_DESC_OS%TYPE, 
                          n_lpr_codigo     IN GERAL.EMPRESA.LPR_CODIGO%TYPE, 
                          n_emp_ativa      IN GERAL.EMPRESA.EMP_ATIVA%TYPE);
END PCK_USUARIO;
/
CREATE OR REPLACE PACKAGE BODY GERAL.PCK_USUARIO IS

  -- Author  : JULIANO BONINI
  -- Created : 10-Mai-06
  -- Purpose : PROCEDURES E FUNCOES DO SISTEMA DE CADASTRO DE NOVOS USUARIOS

  ---------------------------------------------------------
  ------------------ INSERE PRE PESSOA  -------------------
  ---------------------------------------------------------
  PROCEDURE SP_IN_PRE_PESSOA(v_ppe_nome       IN GERAL.PRE_PESSOA.PPE_NOME%TYPE,
                             v_ppe_email      IN GERAL.PRE_PESSOA.PPE_EMAIL%TYPE,
                             n_fus_codigo     IN GERAL.PRE_PESSOA.FUS_CODIGO%TYPE,
                             v_pre_sexo       IN GERAL.PRE_PESSOA.PRE_SEXO%TYPE,
                             n_lin_cod        IN GERAL.PRE_PESSOA.LIN_COD%TYPE,
                             v_ppe_endereco   IN GERAL.PRE_PESSOA.PPE_ENDERECO%TYPE,
                             v_ppe_bairro     IN GERAL.PRE_PESSOA.PPE_BAIRRO%TYPE,
                             v_ppe_cidade     IN GERAL.PRE_PESSOA.PPE_CIDADE%TYPE,
                             n_est_codigo     IN GERAL.PRE_PESSOA.EST_CODIGO%TYPE,
                             v_ppe_estado     IN GERAL.PRE_PESSOA.PPE_ESTADO%TYPE,
                             v_ppe_cep        IN GERAL.PRE_PESSOA.PPE_CEP%TYPE,
                             n_pai_codigo     IN GERAL.PRE_PESSOA.PAI_CODIGO%TYPE,
                             c_tep_codigo     IN GERAL.PRE_PESSOA.TEP_CODIGO%TYPE,
                             v_ppe_e_nome     IN GERAL.PRE_PESSOA.PPE_E_NOME%TYPE,
                             v_ppe_e_endereco IN GERAL.PRE_PESSOA.PPE_E_ENDERECO%TYPE,
                             v_ppe_e_bairro   IN GERAL.PRE_PESSOA.PPE_E_BAIRRO%TYPE,
                             v_ppe_e_cidade   IN GERAL.PRE_PESSOA.PPE_E_CIDADE%TYPE,
                             n_est_e_codigo   IN GERAL.PRE_PESSOA.EST_E_CODIGO%TYPE,
                             v_ppe_e_estado   IN GERAL.PRE_PESSOA.PPE_E_ESTADO%TYPE,
                             v_ppe_e_cep      IN GERAL.PRE_PESSOA.PPE_E_CEP%TYPE,
                             n_pai_e_codigo   IN GERAL.PRE_PESSOA.PAI_E_CODIGO%TYPE,
                             v_ppe_e_homepage IN GERAL.PRE_PESSOA.PPE_E_HOMEPAGE%TYPE,
                             clb_ppe_motivo   IN GERAL.PRE_PESSOA.PPE_MOTIVO%TYPE,
                             n_ppe_codigo     OUT GERAL.PRE_PESSOA.PPE_CODIGO%TYPE) IS
  
    n_emp_codigo INTEGER;
    v_assunto    CLOB;
    n_eml_numero INTEGER;
  
  BEGIN
    IF c_tep_codigo = 'S' THEN
      n_emp_codigo := 1;
    END IF;
  
    INSERT INTO PRE_PESSOA
      (PPE_NOME,
       PPE_EMAIL,
       FUS_CODIGO,
       PRE_SEXO,
       LIN_COD,
       PPE_ENDERECO,
       PPE_BAIRRO,
       PPE_CIDADE,
       EST_CODIGO,
       PPE_ESTADO,
       PPE_CEP,
       PAI_CODIGO,
       TEP_CODIGO,
       PPE_E_NOME,
       PPE_E_ENDERECO,
       PPE_E_BAIRRO,
       PPE_E_CIDADE,
       EST_E_CODIGO,
       PPE_E_ESTADO,
       PPE_E_CEP,
       PAI_E_CODIGO,
       PPE_E_HOMEPAGE,
       PPE_MOTIVO,
       EMP_CODIGO)
    VALUES
      (v_ppe_nome,
       v_ppe_email,
       n_fus_codigo,
       v_pre_sexo,
       n_lin_cod,
       v_ppe_endereco,
       v_ppe_bairro,
       v_ppe_cidade,
       n_est_codigo,
       v_ppe_estado,
       v_ppe_cep,
       n_pai_codigo,
       c_tep_codigo,
       v_ppe_e_nome,
       v_ppe_e_endereco,
       v_ppe_e_bairro,
       v_ppe_e_cidade,
       n_est_e_codigo,
       v_ppe_e_estado,
       v_ppe_e_cep,
       n_pai_e_codigo,
       v_ppe_e_homepage,
       clb_ppe_motivo,
       n_emp_codigo)
    RETURNING PPE_CODIGO INTO n_ppe_codigo;
  
    v_assunto := 'O usuario: <b>' || v_ppe_nome ||
                 '</b><br>
                 E-mail: <b>' || v_ppe_email ||
                 '</b><br>
                 Empresa: <b>' || v_ppe_e_nome ||
                 '</b><br>
                 Está pendente para ser avaliado.<br>
                 Motivo: <br>' || clb_ppe_motivo;
  
    FOR c_email IN (SELECT USUARIO.USU_NOME, USUARIO.USU_EMAIL
                      FROM SMARNET.ACESSO_FUNC, SIAOS.USUARIO
                     WHERE USUARIO.USU_CHAPA = ACESSO_FUNC.USU_CHAPA
                       AND ACESSO_FUNC.ACE_CODIGO = 737) LOOP
    
    SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_ppe_nome || '<' || v_ppe_email || '>',
                                      c_email.USU_NOME || '<' || c_email.USU_EMAIL || '>',
                                      NULL, NULL,
                                      'Solicitação de Novo Usuário',
                                      'Solicitação de Novo Usuário',
                                      v_assunto,
                                      NULL, NULL,
                                      1,
                                      n_eml_numero);
    
    END LOOP;
  
    COMMIT;
  
  END SP_IN_PRE_PESSOA;

  ---------------------------------------------------------
  ------------------ INSERE PRE PESSOA  -------------------
  ---------------------------------------------------------
  PROCEDURE SP_IN_PESSOA(v_ppe_codigo IN GERAL.PRE_PESSOA.PPE_CODIGO%TYPE,
                         n_pes_numero OUT GERAL.PRE_PESSOA.PPE_CODIGO%TYPE) IS
  
    v_ppe_nome     GERAL.PRE_PESSOA.PPE_NOME%TYPE;
    v_ppe_email    GERAL.PRE_PESSOA.PPE_EMAIL%TYPE;
    v_pre_sexo     GERAL.PRE_PESSOA.PRE_SEXO%TYPE;
    v_lin_cod      GERAL.PRE_PESSOA.LIN_COD%TYPE;
    n_pai_codigo   GERAL.PRE_PESSOA.PAI_CODIGO%TYPE;
    n_est_codigo   GERAL.PRE_PESSOA.EST_CODIGO%TYPE;
    n_emp_codigo   GERAL.PRE_PESSOA.EMP_CODIGO%TYPE;
    n_fun_chapa    GERAL.PRE_PESSOA.FUN_CHAPA%TYPE;
    v_ppe_cidade   SIAOS.PESSOA.PES_CIDADE%TYPE;
    v_ppe_estado   SIAOS.PESSOA.PES_ESTADO%TYPE;
    v_ppe_cep      SIAOS.PESSOA.PES_CEP%TYPE;
    v_ppe_endereco SIAOS.PESSOA.PES_ENDERECO%TYPE;
    v_ppe_bairro   SIAOS.PESSOA.PES_BAIRRO%TYPE;
  
  BEGIN
  
    SELECT PPE_NOME,
           PPE_EMAIL,
           PRE_SEXO,
           LIN_COD,
           PPE_CIDADE,
           PAI_CODIGO,
           PPE_ENDERECO,
           PPE_BAIRRO,
           EST_CODIGO,
           PPE_ESTADO,
           PPE_CEP,
           EMP_CODIGO,
           FUN_CHAPA
      INTO v_ppe_nome,
           v_ppe_email,
           v_pre_sexo,
           v_lin_cod,
           v_ppe_cidade,
           n_pai_codigo,
           v_ppe_endereco,
           v_ppe_bairro,
           n_est_codigo,
           v_ppe_estado,
           v_ppe_cep,
           n_emp_codigo,
           n_fun_chapa
      FROM GERAL.PRE_PESSOA
     WHERE PRE_PESSOA.PPE_CODIGO = v_ppe_codigo;
  
    SIAOS.SP_IN_PESSOA(v_ppe_nome,
                       v_ppe_email,
                       NULL,
                       v_pre_sexo,
                       n_pes_numero);
    
    UPDATE SIAOS.PESSOA
       SET PES_CIDADE = v_ppe_cidade,
           EST_CODIGO = n_est_codigo,
           PES_ESTADO = v_ppe_estado,
           PES_CEP = v_ppe_cep,
           PAI_CODIGO = n_pai_codigo,
           PES_ENDERECO = v_ppe_endereco,
           PES_BAIRRO = v_ppe_bairro
     WHERE PES_NUMERO = n_pes_numero;
    
    
    UPDATE GERAL.PRE_PESSOA
       SET PES_NUMERO = n_pes_numero
     WHERE PPE_CODIGO = v_ppe_codigo;
  
    IF n_fun_chapa IS NOT NULL THEN
    
      UPDATE SIAOS.FUNCIONARIO
         SET PES_NUMERO = n_pes_numero
       WHERE FUN_CHAPA = n_fun_chapa;
    
    END IF;
  
  END SP_IN_PESSOA;

  ---------------------------------------------------------
  ------------------- INSERE EMPRESA  ---------------------
  ---------------------------------------------------------
  PROCEDURE SP_IN_EMPRESA(n_ppe_codigo  IN GERAL.PRE_PESSOA.PPE_CODIGO%TYPE,
                          v_codigo      IN VARCHAR2,
                          n_tep_codigo2 IN GERAL.PRE_PESSOA.TEP_CODIGO%TYPE,
                          n_emp_codigo  OUT GERAL.PRE_PESSOA.EMP_CODIGO%TYPE,
                          v_ppe_e_nome  OUT GERAL.PRE_PESSOA.PPE_E_NOME%TYPE,
                          n_tep_codigo  OUT GERAL.PRE_PESSOA.TEP_CODIGO%TYPE) IS
  
    v_ppe_e_endereco GERAL.PRE_PESSOA.PPE_E_ENDERECO%TYPE;
    v_ppe_e_cidade   GERAL.PRE_PESSOA.PPE_E_CIDADE%TYPE;
    n_est_e_codigo   GERAL.PRE_PESSOA.EST_E_CODIGO%TYPE;
    n_pai_e_codigo   GERAL.PRE_PESSOA.PAI_E_CODIGO%TYPE;
    v_country_key    SIAOS.COUNTRIES.COUNTRY_KEY%TYPE;
    v_estado         VARCHAR2(100);
    v_ppe_e_estado   GERAL.PRE_PESSOA.PPE_E_ESTADO%TYPE;
    v_ppe_e_cep      GERAL.PRE_PESSOA.PPE_E_CEP%TYPE;
    v_ppe_e_home     GERAL.PRE_PESSOA.PPE_E_HOMEPAGE%TYPE;
    v_emp_reduzido   VARCHAR2(100);
  
  BEGIN
  
    IF n_ppe_codigo IS NOT NULL THEN
    
      SELECT PPE_E_NOME,
             PPE_E_ENDERECO,
             PPE_E_CIDADE,
             EST_E_CODIGO,
             PAI_E_CODIGO,
             PPE_E_ESTADO,
             PPE_E_CEP,
             PPE_E_HOMEPAGE,
             TEP_CODIGO
        INTO v_ppe_e_nome,
             v_ppe_e_endereco,
             v_ppe_e_cidade,
             n_est_e_codigo,
             n_pai_e_codigo,
             v_ppe_e_estado,
             v_ppe_e_cep,
             v_ppe_e_home,
             n_tep_codigo
        FROM GERAL.PRE_PESSOA
       WHERE PRE_PESSOA.PPE_CODIGO = n_ppe_codigo;
    
    ELSE
      n_tep_codigo := n_tep_codigo2;
    END IF;
  
    IF n_tep_codigo = 'C' THEN
    
      SELECT SUBSTR(TRIM(CLIENTE), 1, 50),
             SUBSTR(TRIM(TRIM(ENDERECO1) || ' ' || TRIM(ENDERECO2) || ' ' ||
                         TRIM(ENDERECO3)),
                    1,
                    100),
             SUBSTR(TRIM(CIDADE), 1, 60),
             SUBSTR(TRIM(ESTADO), 1, 30),
             SUBSTR(TRIM(CEP), 1, 11),
             TRIM(PAIS),
             SUBSTR(TRIM(DECODE(HOMEPAGE, NULL, v_ppe_e_home, HOMEPAGE)),
                    1,
                    100),
             SUBSTR(TRIM(REDUZIDO), 1, 25)
        INTO v_ppe_e_nome,
             v_ppe_e_endereco,
             v_ppe_e_cidade,
             v_estado,
             v_ppe_e_cep,
             v_country_key,
             v_ppe_e_home,
             v_emp_reduzido
        FROM SIAOS.CLIENTE
       WHERE CLIENTE.CODIGO = TO_NUMBER(v_codigo);
    
    ELSIF n_tep_codigo = 'F' THEN
    
      SELECT SUBSTR(TRIM(FORN_RAZAO_SOCIAL), 1, 50),
             SUBSTR(TRIM(FORN_ENDERECO), 1, 100),
             SUBSTR(TRIM(FORN_CIDADE), 1, 60),
             SUBSTR(TRIM(FORN_ESTADO), 1, 30),
             SUBSTR(TRIM(FORN_CEP), 1, 11),
             TRIM(COUNTRY_KEY),
             SUBSTR(TRIM(DECODE(FORN_HOMEPAGE,
                                NULL,
                                v_ppe_e_home,
                                FORN_HOMEPAGE)),
                    1,
                    100),
             SUBSTR(TRIM(FORN_NOME_REDUZ), 1, 25)
        INTO v_ppe_e_nome,
             v_ppe_e_endereco,
             v_ppe_e_cidade,
             v_estado,
             v_ppe_e_cep,
             v_country_key,
             v_ppe_e_home,
             v_emp_reduzido
        FROM SUPRIMENTO.FORNECEDOR
       WHERE FORNECEDOR.FORN_CODIGO = LPAD(v_codigo,5,'0');
    
    END IF;
  
    IF v_country_key IS NOT NULL THEN
      BEGIN
        SELECT PAI_CODIGO
          INTO n_pai_e_codigo
          FROM SIAOS.COUNTRIES
         WHERE COUNTRY_KEY = v_country_key;
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
          NULL;
      END;
    END IF;
  
    IF (v_estado IS NOT NULL) AND (n_pai_e_codigo IS NOT NULL) THEN
      BEGIN
        SELECT EST_CODIGO
          INTO n_est_e_codigo
          FROM GERAL.ESTADO
         WHERE EST_SIGLA = v_estado
           AND PAI_CODIGO = n_pai_e_codigo;
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
          NULL;
      END;
    END IF;
  
    IF n_est_e_codigo IS NULL AND v_ppe_e_estado IS NULL THEN
      v_ppe_e_estado := v_estado;
    END IF;
  
    IF v_ppe_e_nome IS NOT NULL THEN
    
      INSERT INTO GERAL.EMPRESA
        (EMP_NOME,
         EMP_TIPO,
         EMP_REDUZIDO,
         EMP_ENDERECO,
         EMP_CEP,
         PAI_CODIGO,
         EST_CODIGO,
         EMP_ESTADO,
         EMP_CIDADE,
         EMP_HOMEPAGE,
         EMP_ACESSO)
      VALUES
        (v_ppe_e_nome,
         SUBSTR(TRIM(n_tep_codigo), 1, 1),
         v_emp_reduzido,
         v_ppe_e_endereco,
         v_ppe_e_cep,
         n_pai_e_codigo,
         n_est_e_codigo,
         v_ppe_e_estado,
         v_ppe_e_cidade,
         v_ppe_e_home,
         'P')
      RETURNING EMP_CODIGO INTO n_emp_codigo;
    
      IF n_tep_codigo = 'C' THEN
      
        INSERT INTO GERAL.EMP_CLIE
          (EMP_CODIGO, CODIGO)
        VALUES
          (n_emp_codigo, v_codigo);
      
      ELSIF n_tep_codigo = 'F' THEN
      
        INSERT INTO GERAL.EMP_FORN
          (EMP_CODIGO, FORN_CODIGO)
        VALUES
          (n_emp_codigo, LPAD(TRIM(v_codigo), 5, '0'));
      
      END IF;
    
    END IF;
  
    IF n_ppe_codigo IS NOT NULL THEN
    
      UPDATE GERAL.PRE_PESSOA
         SET EMP_CODIGO = n_emp_codigo
       WHERE PPE_CODIGO = n_ppe_codigo;
    
    END IF;
  
    COMMIT;
  
  END SP_IN_EMPRESA;

  ---------------------------------------------------------
  ------------------ INSERE PRE PESSOA  -------------------
  ---------------------------------------------------------
  PROCEDURE SP_IN_USUARIO(n_ppe_codigo IN GERAL.PRE_PESSOA.PPE_CODIGO%TYPE,
                          v_login      IN GERAL.PRE_PESSOA.PPE_NOME%TYPE,
                          v_email      IN GERAL.PRE_PESSOA.PPE_EMAIL%TYPE,
                          n_lin_cod    IN GERAL.PRE_PESSOA.LIN_COD%TYPE,
                          c_tep_codigo IN GERAL.PRE_PESSOA.TEP_CODIGO%TYPE,
                          n_empresa    IN GERAL.PRE_PESSOA.EMP_CODIGO%TYPE,
                          v_senha      IN VARCHAR2,
                          n_internet   IN INTEGER,
                          n_rede       IN INTEGER,
                          n_email      IN INTEGER,
                          n_lpr_codigo IN SIAOS.USUARIO.LPR_CODIGO%TYPE,
                          n_usu_chapa  OUT SIAOS.USUARIO.USU_CHAPA%TYPE) IS
  
    n_pes_numero     GERAL.PRE_PESSOA.PES_NUMERO%TYPE;
    v_pes_nome       SIAOS.PESSOA.PES_NOME%TYPE;
    v_cc_codigo      SIAOS.FUNCIONARIO.CC_CODIGO%TYPE;
    n_fus_codigo     GERAL.PRE_PESSOA.FUS_CODIGO%TYPE;
    vc2_assunto      VARCHAR2(255);
    clb_conteudo     CLOB;
    clb_conteudo_adm CLOB;
    n_fun_chapa      GERAL.PRE_PESSOA.FUN_CHAPA%TYPE;
    v_tem_internet   VARCHAR2(3) := 'NÃO';
    v_tem_rede       VARCHAR2(3) := 'NÃO';
    v_tem_email      VARCHAR2(3) := 'NÃO';
    v_empresa        GERAL.EMPRESA.EMP_NOME%TYPE;
    n_eml_numero     INTEGER;
  
  BEGIN
  
    IF n_internet = 1 THEN
      v_tem_internet := 'SIM';
    END IF;
    IF n_rede = 1 THEN
      v_tem_rede := 'SIM';
    END IF;
    IF n_email = 1 THEN
      v_tem_email := 'SIM';
    END IF;
  
    SELECT PP.PES_NUMERO, 
           PP.FUS_CODIGO, 
           PP.FUN_CHAPA
      INTO n_pes_numero, n_fus_codigo, n_fun_chapa
      FROM GERAL.PRE_PESSOA PP
     WHERE PP.PPE_CODIGO = n_ppe_codigo
       AND PPE_DT_BAIXA IS NULL;
  
    SELECT EMP_NOME
      INTO v_empresa
      FROM GERAL.EMPRESA
     WHERE EMP_CODIGO = n_empresa;
  
    SELECT P.PES_NOME
      INTO v_pes_nome
      FROM SIAOS.PESSOA P
     WHERE P.PES_NUMERO = n_pes_numero;
  
    SELECT MAX(U.USU_CHAPA)
      INTO n_usu_chapa
      FROM SIAOS.USUARIO U
     WHERE U.PES_NUMERO = n_pes_numero;
  
    IF n_usu_chapa IS NOT NULL THEN
      BEGIN
        SELECT F.CC_CODIGO
          INTO v_cc_codigo
          FROM SIAOS.FUNCIONARIO F
         WHERE F.PES_NUMERO = n_pes_numero
           AND F.FUN_ATIVO = 'Y';
      EXCEPTION WHEN OTHERS THEN 
        v_cc_codigo := NULL;
      END;
    END IF;
  
    IF n_usu_chapa IS NULL THEN
    
      IF n_fun_chapa IS NULL THEN
        SELECT MAX(NVL(USU_CHAPA, 0)) + 1 USU_CHAPA
          INTO n_usu_chapa
          FROM SIAOS.USUARIO
				 WHERE USU_CHAPA < 60000;
      
        INSERT INTO SIAOS.USUARIO
          (USU_CHAPA,
           USU_NOME,
           USU_LOGINWEB,
           USU_EMAIL,
           CC_CODIGO,
           USU_STATUS,
           PES_NUMERO,
           EMP_CODIGO,
           FUS_CODIGO,
           LIN_COD,
           LPR_CODIGO)
        VALUES
          (n_usu_chapa,
           v_pes_nome,
           v_login,
           v_email,
           v_cc_codigo,
           0,
           n_pes_numero,
           n_empresa,
           n_fus_codigo,
           n_lin_cod,
           n_lpr_codigo);
      
      ELSE
      
        INSERT INTO SIAOS.USUARIO
          (USU_CHAPA,
           USU_NOME,
           USU_LOGINWEB,
           USU_EMAIL,
           CC_CODIGO,
           USU_STATUS,
           PES_NUMERO,
           EMP_CODIGO,
           FUS_CODIGO,
           LIN_COD,
           LPR_CODIGO)
        VALUES
          (n_fun_chapa,
           v_pes_nome,
           v_login,
           v_email,
           v_cc_codigo,
           0,
           n_pes_numero,
           n_empresa,
           n_fus_codigo,
           n_lin_cod,
           n_lpr_codigo)
        RETURNING USUARIO.USU_CHAPA INTO n_usu_chapa;
      
      END IF;
    
    ELSE
    
      UPDATE SIAOS.USUARIO
         SET USU_NOME     = v_pes_nome,
             USU_LOGINWEB = v_login,
             USU_EMAIL    = v_email,
             CC_CODIGO    = v_cc_codigo,
             USU_STATUS   = 0,
             EMP_CODIGO   = n_empresa,
             FUS_CODIGO   = n_fus_codigo,
             LIN_COD      = n_lin_cod,
             LPR_CODIGO   = n_lpr_codigo
       WHERE USUARIO.USU_CHAPA = n_usu_chapa;
    
    END IF;
    
    BEGIN
      INSERT INTO SMARNET.SENHA
        (USU_CHAPA, SEN_CONTEUDO, SEN_AUTENTICA)
      VALUES
        (n_usu_chapa, v_senha, 0);
    EXCEPTION WHEN OTHERS THEN
      UPDATE SMARNET.SENHA
         SET SEN_CONTEUDO  = v_senha,
             SEN_AUTENTICA = 0
       WHERE USU_CHAPA = n_usu_chapa;
    END;
  
    UPDATE GERAL.PRE_PESSOA
       SET PPE_DT_BAIXA = SYSDATE
     WHERE PPE_CODIGO = n_ppe_codigo;
  
    UPDATE SIAOS.PESSOA
       SET PES_EMAIL = v_email
     WHERE PES_NUMERO = n_pes_numero;
  
    IF n_lin_cod = 1 THEN
      vc2_assunto  := 'Smarnet - Cadastro de Usuários - Smar First in Fieldbus';
      clb_conteudo := '<p>Caro(a)<strong> ' ||
                      v_pes_nome ||
                      ',</strong></p>
                          <p>Seu acesso ao Smarnet foi <strong>aceito</strong>.</p>
                          <p>Seu login de acesso: <strong>' ||
                      v_login ||
                      '</strong><br />
                          Sua senha: <strong>' ||
                      v_senha || '</strong></p>
                          <p>Saudações</p>
                          <p>Equipe Smarnet </p>';
    ELSE
      vc2_assunto  := 'Smarnet - User Aproved - Smar First in Fieldbus';
      clb_conteudo := '<p>Dear<strong> ' ||
                      v_pes_nome ||
                      ',</strong></p>
                          <p>Your access to Smarnet was approved.</p>
                          <p>Login: <strong>' ||
                      v_login ||
                      '</strong><br />
                          Password: <strong>' ||
                      v_senha || '</strong></p>
                          <p>Your Sincerely</p>
                          <p>Smarnet Team</p>';
    END IF;
  
    clb_conteudo_adm := '<p>A solicitação de acesso ao Smarnet de: <strong> ' ||
                        v_pes_nome || ',</strong><br>
                          Empresa: ' || v_empresa ||
                        '.<br>
                          Foi <strong>realizada com sucesso!</strong>.</p>
                          <p>Login de acesso: <strong>' ||
                        v_login ||
                        '</strong><br />
                          Senha: <strong>' ||
                        v_senha ||
                        '</strong></p>
                          <p><strong>Outros acesso:</strong></p>
                          <p>
                          Internet: <strong>' ||
                        v_tem_internet ||
                        '</strong><br />
                          Rede    : <strong>' ||
                        v_tem_rede ||
                        '</strong><br />
                          Email   : <strong>' ||
                        v_tem_email || '</strong><br /></p>';
  
    IF n_fun_chapa IS NULL OR c_tep_codigo != 'S' THEN
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL('smarnet@smar.com.br',
                                   v_email,
                                   NULL, NULL,
                                   vc2_assunto,
                                   vc2_assunto,
                                   clb_conteudo,
                                   NULL, NULL,
                                   n_lin_cod,
                                   n_eml_numero);
    END IF;
  
    FOR c_user IN (SELECT U.USU_NOME, U.USU_EMAIL
                     FROM SIAOS.USUARIO U
                    INNER JOIN SMARNET.ACESSO_FUNC AF ON U.USU_CHAPA =
                                                         AF.USU_CHAPA
                    WHERE AF.ACE_CODIGO = 110) LOOP
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL('smarnet@smar.com.br',
                                   c_user.USU_NOME || '<' || c_user.USU_EMAIL || '>',
                                   NULL, NULL,
                                   vc2_assunto,
                                   vc2_assunto,
                                   clb_conteudo_adm,
                                   NULL, NULL,
                                   n_lin_cod,
                                   n_eml_numero);
    END LOOP;
  
  EXCEPTION WHEN OTHERS THEN
      FOR c_user IN (SELECT U.USU_NOME, U.USU_EMAIL
                       FROM SIAOS.USUARIO U
                      WHERE UPPER(U.USU_LOGINWEB) = USER) LOOP
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL('smarnet@smar.com.br',
                                     c_user.USU_NOME || '<' || c_user.USU_EMAIL || '>',
                                     NULL, NULL,
                                     'ERRO DO CADASTRO DE USUARIO',
                                     'ERRO DO CADASTRO DE USUARIO',
                                     SQLERRM,
                                     NULL, NULL,
                                     n_lin_cod,
                                     n_eml_numero);
      END LOOP;
      n_usu_chapa := NULL;
      ROLLBACK;
  END SP_IN_USUARIO;

  ---------------------------------------------------------
  -------------------- ALTERA EMPRESA  --------------------
  ---------------------------------------------------------

  PROCEDURE SP_UP_EMPRESA(n_emp_codigo     IN GERAL.EMPRESA.EMP_CODIGO%TYPE, 
                          v_emp_tipo       IN GERAL.EMPRESA.EMP_TIPO%TYPE, 
                          v_emp_nome       IN GERAL.EMPRESA.EMP_NOME%TYPE, 
                          v_emp_endereco   IN GERAL.EMPRESA.EMP_ENDERECO%TYPE, 
                          v_emp_cidade     IN GERAL.EMPRESA.EMP_CIDADE%TYPE, 
                          v_est_codigo     IN GERAL.EMPRESA.EST_CODIGO%TYPE, 
                          v_pai_codigo     IN GERAL.EMPRESA.PAI_CODIGO%TYPE, 
                          v_emp_estado     IN GERAL.EMPRESA.EMP_ESTADO%TYPE,
                          v_emp_bairro     IN GERAL.EMPRESA.EMP_BAIRRO%TYPE,
                          v_emp_cep        IN GERAL.EMPRESA.EMP_CEP%TYPE,
                          v_emp_homepage   IN GERAL.EMPRESA.EMP_HOMEPAGE%TYPE, 
                          v_emp_reduzido   IN GERAL.EMPRESA.EMP_REDUZIDO%TYPE, 
                          v_emp_acesso     IN GERAL.EMPRESA.EMP_ACESSO%TYPE, 
                          n_emp_codigo_fab IN GERAL.EMPRESA.EMP_CODIGO_FAB%TYPE, 
                          v_emp_desc_os    IN GERAL.EMPRESA.EMP_DESC_OS%TYPE, 
                          n_lpr_codigo     IN GERAL.EMPRESA.LPR_CODIGO%TYPE, 
                          n_emp_ativa      IN GERAL.EMPRESA.EMP_ATIVA%TYPE) IS
 
  BEGIN
      
    UPDATE GERAL.EMPRESA E
       SET E.EMP_NOME       = v_emp_nome,
           E.EMP_TIPO       = v_emp_tipo,
           E.EMP_ENDERECO   = v_emp_endereco,
           E.EMP_CIDADE     = v_emp_cidade,
           E.EST_CODIGO     = v_est_codigo,
           E.PAI_CODIGO     = v_pai_codigo,
           E.EMP_ESTADO     = v_emp_estado,
           E.EMP_BAIRRO     = v_emp_bairro,
           E.EMP_CEP        = v_emp_cep,
           E.EMP_HOMEPAGE   = v_emp_homepage,
           E.EMP_REDUZIDO   = v_emp_reduzido,
           E.EMP_ACESSO     = v_emp_acesso,
           E.EMP_CODIGO_FAB = n_emp_codigo_fab,
           E.EMP_DESC_OS    = v_emp_desc_os,
           E.LPR_CODIGO     = n_lpr_codigo,
           E.EMP_ATIVA      = n_emp_ativa
     WHERE E.EMP_CODIGO     = n_emp_codigo;
  
  END SP_UP_EMPRESA;
  
END PCK_USUARIO;
/
