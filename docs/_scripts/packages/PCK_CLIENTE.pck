CREATE OR REPLACE PACKAGE SIAOS.PCK_CLIENTE IS

  -- Author  : ROGERIOCORBO
  -- Created : 7/1/2004 09:40:39
  -- Purpose : Cadastro de Cliente na Web

 PROCEDURE SP_ATUALIZA_DADOS_GERAIS(
   n_codigo           IN OUT SIAOS.CLIENTE.CODIGO%TYPE,
   c_nome_cliente     IN     SIAOS.CLIENTE.CLIENTE%TYPE,
   c_nome_reduzido    IN     SIAOS.CLIENTE.REDUZIDO%TYPE,
   c_cgc              IN     SIAOS.CLIENTE.CGC%TYPE,
   c_origem           IN     SIAOS.CLIENTE.ORIGEM%TYPE,
   c_segmento         IN     SIAOS.CLIENTE.CLASSE%TYPE,
   c_area             IN     SIAOS.CLIENTE.TERRITORIO%TYPE,
   c_inscr_estadual   IN     SIAOS.CLIENTE.INSCR_EST%TYPE,
   c_tipo_cliente     IN     SIAOS.CLIENTE.TIPO%TYPE,
   c_endereco1        IN     SIAOS.CLIENTE.ENDERECO1%TYPE,
   c_endereco2        IN     SIAOS.CLIENTE.ENDERECO2%TYPE,
   c_endereco3        IN     SIAOS.CLIENTE.ENDERECO3%TYPE,
   c_cidade           IN     SIAOS.CLIENTE.CIDADE%TYPE,
   c_estado           IN     SIAOS.CLIENTE.ESTADO%TYPE,
   n_est_codigo       IN     SIAOS.CLIENTE.EST_CODIGO%TYPE,
   c_telefone1        IN     SIAOS.CLIENTE.TELEFONE1%TYPE,
   c_telefone2        IN     SIAOS.CLIENTE.TELEFONE2%TYPE,
   c_homepage         IN     SIAOS.CLIENTE.HOMEPAGE%TYPE,
   c_email            IN     SIAOS.CLIENTE.EMAIL%TYPE,
   c_cli_email_nfse   IN     SIAOS.CLIENTE.CLI_EMAIL_NFSE%TYPE,
   c_coment_fatura    IN     SIAOS.CLIENTE.COMEN_FAT%TYPE,
   c_coment_cobranca  IN     SIAOS.CLIENTE.COMEN_COBR%TYPE,
   n_transportadora   IN     SIAOS.CLIENTE.FORMAEMBAR%TYPE,
   c_vendedor         IN     SIAOS.CLIENTE.VENDEDOR%TYPE,
   n_pai_codigo       IN     SIAOS.CLIENTE.PAI_CODIGO%TYPE,
   c_cep              IN     SIAOS.CLIENTE.CEP%TYPE,
   c_fax              IN     SIAOS.CLIENTE.FAX%TYPE,
   c_usuario          IN     SIAOS.CLIENTE.USUARIO%TYPE,
   vc2_tipo_cadastro  IN     VARCHAR2,
   n_tipo_emp         IN     SIAOS.CLIENTE.TIPOEMP%TYPE,
   n_cli_grupo        IN     SIAOS.CLIENTE.CODIGO%TYPE,
   n_cli_montador     IN     SIAOS.CLIENTE.CLI_MONTADOR%TYPE,
   n_cli_vendedor2    IN     SIAOS.CLIENTE.CLI_VENDEDOR2%TYPE,
   n_aos_codigo_tec   IN     SIAOS.CLIENTE.AOS_CODIGO_TEC%TYPE,
   n_aos_codigo_com   IN     SIAOS.CLIENTE.AOS_CODIGO_COM%TYPE,
   n_cli_tipo         IN     SIAOS.CLIENTE.CLI_TIPO%TYPE,
   n_cli_cod_mun_ibge IN     SIAOS.CLIENTE.CLI_COD_MUN_IBGE%TYPE,
   n_cli_bairro       IN     SIAOS.CLIENTE.CLI_BAIRRO%TYPE,
   n_cli_ie_isento    IN     SIAOS.CLIENTE.CLI_IE_ISENTO%TYPE,
   c_cli_inscr_mun    IN     SIAOS.CLIENTE.CLI_INSCR_MUN%TYPE,
   c_cli_cnae         IN     SIAOS.CLIENTE.CLI_CNAE%TYPE,
   n_cli_fome_zero    IN     SIAOS.CLIENTE.CLI_FOME_ZERO%TYPE,
   c_cli_insc_suframa IN     SIAOS.CLIENTE.CLI_INSCR_SUFRAMA%TYPE,
   n_cli_contribuinte IN     SIAOS.CLIENTE.CLI_CONTRIBUINTE%TYPE,
   c_ccontabil        IN     SIAOS.CLIENTE.CCONTABIL%TYPE,
   n_limitecr         IN     SIAOS.CLIENTE.LIMITECR%TYPE,
   n_cli_limite_crv   IN     SIAOS.CLIENTE.CLI_LIMITE_CRV%TYPE,
   c_cli_nif          IN     SIAOS.CLIENTE.CLI_NIF%TYPE,
   C_cli_pes_tipo     IN     SIAOS.CLIENTE.CLI_PES_TIPO%TYPE,
   c_cli_reccof       IN     SIAOS.CLIENTE.CLI_RECCOF%TYPE,
   c_cli_reccsll      IN     SIAOS.CLIENTE.CLI_RECCSLL%TYPE,
   c_cli_recpis       IN     SIAOS.CLIENTE.CLI_RECPIS%TYPE,
   n_mpg_codigo       IN     SIAOS.CLIENTE.MPG_CODIGO%TYPE,
   c_cli_mod_pagt     IN     SIAOS.CLIENTE.CLI_MOD_PAGT%TYPE := 'T',
   n_erro             OUT    INTEGER);


 -----------------------------------------------------------------------------
 ---------------------- Grava/Altera/Exclui Area -----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_AREA(
 c_codigo_area     IN SIAOS.ARLEVEL.TERR_KEY%TYPE,
 c_descricao       IN SIAOS.ARLEVEL.DESCRIPTION%TYPE,
 vc2_tipo_cadastro IN VARCHAR2);


 -----------------------------------------------------------------------------
 ------------------- Grava/Altera/Exclui Cobranca ----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_COBRANCA(
 n_codigo_cli      IN SIAOS.COBRANCA.CODIGO%TYPE,
 c_cod_cobr        IN SIAOS.COBRANCA.CHAVECOBRA%TYPE,
 c_nome            IN SIAOS.COBRANCA.NOME%TYPE,
 c_endereco1       IN SIAOS.COBRANCA.ENDERECO1%TYPE,
 c_endereco2       IN SIAOS.COBRANCA.ENDERECO2%TYPE,
 c_endereco3       IN SIAOS.COBRANCA.ENDERECO3%TYPE,
 c_bairro          IN SIAOS.COBRANCA.COB_BAIRRO%TYPE,
 c_cidade          IN SIAOS.COBRANCA.CIDADE%TYPE,
 c_estado          IN SIAOS.COBRANCA.ESTADO%TYPE,
 c_cep             IN SIAOS.COBRANCA.CEP%TYPE,
 c_pais            IN SIAOS.COBRANCA.PAIS%TYPE,
 c_contato         IN SIAOS.COBRANCA.CONTATO%TYPE,
 c_telefone1       IN SIAOS.COBRANCA.TELEFONE1%TYPE,
 c_telefone2       IN SIAOS.COBRANCA.TELEFONE2%TYPE,
 c_reduzido        IN SIAOS.COBRANCA.REDUZIDO%TYPE,
 c_email           IN SIAOS.COBRANCA.E_MAIL%TYPE,
 n_cobr_default    IN NUMBER,
 vc2_tipo_cadastro IN VARCHAR2);


 -----------------------------------------------------------------------------
 ------------------- Grava/Altera/Exclui Cobranca ----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_COBRANCA2(
 n_codigo_cli      IN SIAOS.COBRANCA.CODIGO%TYPE,
 c_cod_cobr        IN SIAOS.COBRANCA.CHAVECOBRA%TYPE,
 n_ativo           IN SIAOS.COBRANCA.ATIVO%TYPE,
 n_cli_codigo_ref  IN SIAOS.COBRANCA.CLI_CODIGO_REF%TYPE,
 vc2_tipo_cadastro IN VARCHAR2); -- I(Inclusao), A(Alteracao), E(Exclusao)

 -----------------------------------------------------------------------------
 ------------------- Grava/Altera/Exclui Embarque ----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_EMBARQUE(
 n_codigo_cli      IN SIAOS.EMBARQUE.CODIGO%TYPE,
 c_cod_emb         IN SIAOS.EMBARQUE.CHAVE_EMB%TYPE,
 c_nome            IN SIAOS.EMBARQUE.NOME%TYPE,
 c_endereco1       IN SIAOS.EMBARQUE.ENDERECO1%TYPE,
 c_endereco2       IN SIAOS.EMBARQUE.ENDERECO2%TYPE,
 c_endereco3       IN SIAOS.EMBARQUE.ENDERECO3%TYPE,
 c_bairro          IN SIAOS.EMBARQUE.EMB_BAIRRO%TYPE,
 c_cidade          IN SIAOS.EMBARQUE.CIDADE%TYPE,
 c_estado          IN SIAOS.EMBARQUE.ESTADO%TYPE,
 c_cep             IN SIAOS.EMBARQUE.CEP%TYPE,
 c_pais            IN SIAOS.EMBARQUE.PAIS%TYPE,
 c_contato         IN SIAOS.EMBARQUE.CONTATO%TYPE,
 c_telefone1       IN SIAOS.EMBARQUE.TELEFONE1%TYPE,
 c_telefone2       IN SIAOS.EMBARQUE.TELEFONE2%TYPE,
 c_reduzido        IN SIAOS.EMBARQUE.REDUZIDO%TYPE,
 c_email           IN SIAOS.EMBARQUE.E_MAIL%TYPE,
 n_emb_default     IN NUMBER,
 vc2_tipo_cadastro IN VARCHAR2); -- I(Inclusao), A(Alteracao), E(Exclusao)

 -----------------------------------------------------------------------------
 ------------------- Grava/Altera/Exclui Embarque ----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_EMBARQUE2(
 n_codigo_cli      IN SIAOS.EMBARQUE.CODIGO%TYPE,
 c_cod_emb         IN SIAOS.EMBARQUE.CHAVE_EMB%TYPE,
 n_ativo           IN SIAOS.EMBARQUE.ATIVO%TYPE,
 n_cli_codigo_ref  IN SIAOS.EMBARQUE.CLI_CODIGO_REF%TYPE,
 vc2_tipo_cadastro IN VARCHAR2); -- I(Inclusao), A(Alteracao), E(Exclusao)

 ----------------------------------------------------------
 -------------- Atualiza dados financeiros ----------------
 ----------------------------------------------------------
 PROCEDURE SP_ATUALIZA_DADOS_FINAN(
 n_codigo_cliente  IN SIAOS.CLIENTE.CODIGO%TYPE,
 n_flag_suspenso   IN SIAOS.CLIENTE.FLAGSUSPEN%TYPE,
 n_flag_cobra      IN SIAOS.CLIENTE.FLAGCOBRA%TYPE,
 n_flag_multa      IN SIAOS.CLIENTE.FLAGMULTA%TYPE,
 n_venc_prog       IN SIAOS.CLIENTE.VENCPROG%TYPE,
 n_zona_franca     IN SIAOS.CLIENTE.ZONA_FRANCA%TYPE,
 n_iss             IN SIAOS.CLIENTE.ISS%TYPE,
 n_exportacao      IN SIAOS.CLIENTE.EXPORTACAO%TYPE,
 n_limite_cr       IN SIAOS.CLIENTE.LIMITECR%TYPE,
 n_taxa_multa      IN SIAOS.CLIENTE.TAXAMULTA%TYPE,
 n_desc_max        IN SIAOS.CLIENTE.DESC_MAX%TYPE,
 n_ccontabil       IN SIAOS.CLIENTE.CCONTABIL%TYPE,
 vc2_obsvenc       IN SIAOS.CLIENTE.OBSVENC%TYPE);

 -------------------------------------------------------
 ------- Verifica se tem embarque cadastrado -----------
 -------------------------------------------------------
 FUNCTION SF_CHECA_EMBARQ_CADASTRADO(
 n_codigo_cliente   SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN NUMBER;

 -------------------------------------------------------
 ------- Verifica qual embarque e o padrao   -----------
 -------------------------------------------------------
 FUNCTION SF_CHECA_EMBARQ_PADRAO(
 n_codigo_cliente   SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN VARCHAR;

 -------------------------------------------------------
 ------- Verifica se tem cobranca cadastrada -----------
 -------------------------------------------------------
 FUNCTION SF_CHECA_COBRAN_CADASTRADA(
 n_codigo_cliente   SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN NUMBER;

 -------------------------------------------------------
 ------- Verifica qual cobranca e a padrao   -----------
 -------------------------------------------------------
 FUNCTION SF_CHECA_COBRAN_PADRAO(
 n_codigo_cliente   SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN VARCHAR;

 -------------------------------------------------------
 -------------- Atualiza dados do contato --------------
 -------------------------------------------------------
 PROCEDURE SP_ATUALIZA_CONTATO(
 n_codigo_cliente  IN SIAOS.CONTATOS.CODCLIENTE%TYPE,
 c_nome_old        IN SIAOS.CONTATOS.NOME%TYPE,
 c_nome_new        IN SIAOS.CONTATOS.NOME%TYPE,
 c_depto           IN SIAOS.CONTATOS.DEPTO%TYPE,
 c_cargo           IN SIAOS.CONTATOS.CARGO%TYPE,
 c_telefone        IN SIAOS.CONTATOS.TELEFONE%TYPE,
 c_fax             IN SIAOS.CONTATOS.CELULAR%TYPE,
 c_celular         IN SIAOS.CONTATOS.CELULAR%TYPE,
 c_email           IN SIAOS.CONTATOS.EMAIL%TYPE,
 vc2_tipo_cadastro IN VARCHAR2);

 -------------------------------------------------------
 -------------- Atualiza dados do contato --------------
 -------------------------------------------------------
 PROCEDURE SP_ATUALIZA_CONTATO(
 n_con_codigo      IN OUT SIAOS.CONTATOS.CON_CODIGO%TYPE,
 n_codigo_cliente  IN     SIAOS.CONTATOS.CODCLIENTE%TYPE,
 c_nome_old        IN     SIAOS.CONTATOS.NOME%TYPE,
 c_nome_new        IN     SIAOS.CONTATOS.NOME%TYPE,
 c_depto           IN     SIAOS.CONTATOS.DEPTO%TYPE,
 c_cargo           IN     SIAOS.CONTATOS.CARGO%TYPE,
 c_telefone        IN     SIAOS.CONTATOS.TELEFONE%TYPE,
 c_fax             IN     SIAOS.CONTATOS.CELULAR%TYPE,
 c_celular         IN     SIAOS.CONTATOS.CELULAR%TYPE,
 c_email           IN     SIAOS.CONTATOS.EMAIL%TYPE,
 n_con_ativo       IN     SIAOS.CONTATOS.CON_ATIVO%TYPE,
 vc2_tipo_cadastro IN     VARCHAR2);


 -------------------------------------------------------
 -------------- Atualiza dados do contato --------------
 -------------------------------------------------------
 PROCEDURE SP_UPDATE_CONTATO_CLIENTE(
 n_codigo_cliente  IN SIAOS.CONTATOS.CODCLIENTE%TYPE,
 n_contato_com     IN SIAOS.CLIENTE.CON_CODIGO_COM%TYPE,
 n_contato_tec     IN SIAOS.CLIENTE.CON_CODIGO_TEC%TYPE,
 n_contato_fin     IN SIAOS.CLIENTE.CON_CODIGO_FIN%TYPE);

 -------------------------------------------------------
 -------------- Verifica tipo do contato ---------------
 -------------------------------------------------------
 FUNCTION SF_VERIFICA_TIPO_CONTATO(
 n_codigo_cliente SIAOS.CLIENTE.CODIGO%TYPE,
 c_nome           SIAOS.CLIENTE.CONTATO%TYPE)
 RETURN NUMBER;

 -------------------------------------------------------
 ---------------- Atualiza Observacao ------------------
 -------------------------------------------------------
 PROCEDURE SP_ATUALIZA_OBS(
 n_codigo_cliente IN SIAOS.CLIENTE.CODIGO%TYPE,
 n_obs            IN SIAOS.CLIENTE.OBSERVA%TYPE);

 -------------------------------------------------------
 ------ Verifica se existe o cliente pelo CGC/CPF ------
 -------------------------------------------------------
 FUNCTION SF_PESQ_CLIENTE_CNPJ(
 c_cnpj             IN SIAOS.CLIENTE.CGC%TYPE,
 n_cod_cli          IN SIAOS.CLIENTE.CODIGO%TYPE,
 c_tipo_cli         IN SIAOS.CLIENTE.TIPO%TYPE)
 RETURN NUMBER;

 -------------------------------------------------------
 ------------ Atualiza contatos do cliente -------------
 -------------------------------------------------------
 PROCEDURE SP_ATUALIZA_CONTATO_CLIENTE(
 c_contato_tec     IN SIAOS.CLIENTE.CONTATOTEC%TYPE,
 c_contato_com     IN SIAOS.CLIENTE.CONTATO%TYPE,
 c_contato_fin     IN SIAOS.CLIENTE.CONTATOFIN%TYPE,
 n_codigo_cliente  IN SIAOS.CONTATOS.CODCLIENTE%TYPE);

 -------------------------------------------------------
 --------- Verifica se um CNPJ ou CPF e valido ---------
 -------------------------------------------------------
 FUNCTION SF_VALIDA_CPF_CNPJ(
 n_numero           IN VARCHAR2,
 c_tipo_cli         IN SIAOS.CLIENTE.TIPO%TYPE)
 RETURN VARCHAR;

 -------------------------------------------------------
 ------------- Retorna status do cliente ---------------
 -------------------------------------------------------
 FUNCTION SF_STATUS_CLIENTE(
 n_cod     IN SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN VARCHAR;

 -------------------------------------------------------
 ------------- Retorna status do cliente ---------------
 -------------------------------------------------------
 FUNCTION SF_CHECA_CADASTRO(
 n_cod     IN SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN VARCHAR;

END PCK_CLIENTE;
/
CREATE OR REPLACE PACKAGE BODY SIAOS.PCK_CLIENTE IS


 -----------------------------------------------------------------------------
 ---------------------- Grava/Altera/Exclui Clientes -------------------------
 -----------------------------------------------------------------------------
PROCEDURE SP_ATUALIZA_DADOS_GERAIS(
   n_codigo           IN OUT SIAOS.CLIENTE.CODIGO%TYPE,
   c_nome_cliente     IN     SIAOS.CLIENTE.CLIENTE%TYPE,
   c_nome_reduzido    IN     SIAOS.CLIENTE.REDUZIDO%TYPE,
   c_cgc              IN     SIAOS.CLIENTE.CGC%TYPE,
   c_origem           IN     SIAOS.CLIENTE.ORIGEM%TYPE,
   c_segmento         IN     SIAOS.CLIENTE.CLASSE%TYPE,
   c_area             IN     SIAOS.CLIENTE.TERRITORIO%TYPE,
   c_inscr_estadual   IN     SIAOS.CLIENTE.INSCR_EST%TYPE,
   c_tipo_cliente     IN     SIAOS.CLIENTE.TIPO%TYPE,
   c_endereco1        IN     SIAOS.CLIENTE.ENDERECO1%TYPE,
   c_endereco2        IN     SIAOS.CLIENTE.ENDERECO2%TYPE,
   c_endereco3        IN     SIAOS.CLIENTE.ENDERECO3%TYPE,
   c_cidade           IN     SIAOS.CLIENTE.CIDADE%TYPE,
   c_estado           IN     SIAOS.CLIENTE.ESTADO%TYPE,
   n_est_codigo       IN     SIAOS.CLIENTE.EST_CODIGO%TYPE,
   c_telefone1        IN     SIAOS.CLIENTE.TELEFONE1%TYPE,
   c_telefone2        IN     SIAOS.CLIENTE.TELEFONE2%TYPE,
   c_homepage         IN     SIAOS.CLIENTE.HOMEPAGE%TYPE,
   c_email            IN     SIAOS.CLIENTE.EMAIL%TYPE,
   c_cli_email_nfse   IN     SIAOS.CLIENTE.CLI_EMAIL_NFSE%TYPE,
   c_coment_fatura    IN     SIAOS.CLIENTE.COMEN_FAT%TYPE,
   c_coment_cobranca  IN     SIAOS.CLIENTE.COMEN_COBR%TYPE,
   n_transportadora   IN     SIAOS.CLIENTE.FORMAEMBAR%TYPE,
   c_vendedor         IN     SIAOS.CLIENTE.VENDEDOR%TYPE,
   n_pai_codigo       IN     SIAOS.CLIENTE.PAI_CODIGO%TYPE,
   c_cep              IN     SIAOS.CLIENTE.CEP%TYPE,
   c_fax              IN     SIAOS.CLIENTE.FAX%TYPE,
   c_usuario          IN     SIAOS.CLIENTE.USUARIO%TYPE,
   vc2_tipo_cadastro  IN     VARCHAR2,
   n_tipo_emp         IN     SIAOS.CLIENTE.TIPOEMP%TYPE,
   n_cli_grupo        IN     SIAOS.CLIENTE.CODIGO%TYPE,
   n_cli_montador     IN     SIAOS.CLIENTE.CLI_MONTADOR%TYPE,
   n_cli_vendedor2    IN     SIAOS.CLIENTE.CLI_VENDEDOR2%TYPE,
   n_aos_codigo_tec   IN     SIAOS.CLIENTE.AOS_CODIGO_TEC%TYPE,
   n_aos_codigo_com   IN     SIAOS.CLIENTE.AOS_CODIGO_COM%TYPE,
   n_cli_tipo         IN     SIAOS.CLIENTE.CLI_TIPO%TYPE,
   n_cli_cod_mun_ibge IN     SIAOS.CLIENTE.CLI_COD_MUN_IBGE%TYPE,
   n_cli_bairro       IN     SIAOS.CLIENTE.CLI_BAIRRO%TYPE,
   n_cli_ie_isento    IN     SIAOS.CLIENTE.CLI_IE_ISENTO%TYPE,
   c_cli_inscr_mun    IN     SIAOS.CLIENTE.CLI_INSCR_MUN%TYPE,
   c_cli_cnae         IN     SIAOS.CLIENTE.CLI_CNAE%TYPE,
   n_cli_fome_zero    IN     SIAOS.CLIENTE.CLI_FOME_ZERO%TYPE,
   c_cli_insc_suframa IN     SIAOS.CLIENTE.CLI_INSCR_SUFRAMA%TYPE,
   n_cli_contribuinte IN     SIAOS.CLIENTE.CLI_CONTRIBUINTE%TYPE,
   c_ccontabil        IN     SIAOS.CLIENTE.CCONTABIL%TYPE,
   n_limitecr         IN     SIAOS.CLIENTE.LIMITECR%TYPE,
   n_cli_limite_crv   IN     SIAOS.CLIENTE.CLI_LIMITE_CRV%TYPE,
   c_cli_nif          IN     SIAOS.CLIENTE.CLI_NIF%TYPE,
   C_cli_pes_tipo     IN     SIAOS.CLIENTE.CLI_PES_TIPO%TYPE,
   c_cli_reccof       IN     SIAOS.CLIENTE.CLI_RECCOF%TYPE,
   c_cli_reccsll      IN     SIAOS.CLIENTE.CLI_RECCSLL%TYPE,
   c_cli_recpis       IN     SIAOS.CLIENTE.CLI_RECPIS%TYPE,
   n_mpg_codigo       IN     SIAOS.CLIENTE.MPG_CODIGO%TYPE,
   c_cli_mod_pagt     IN     SIAOS.CLIENTE.CLI_MOD_PAGT%TYPE := 'T',
   n_erro             OUT    INTEGER)

 -- I(Inclusao), A(Alteracao), E(Exclusao)
  IS

  --n_proximo_cod      INTEGER;
  n_grupo            SIAOS.CLIENTE.CODIGO%TYPE;
  n_cgc              SIAOS.CLIENTE.CGC%TYPE;
  n_cli_grupo_trib   SIAOS.CLIENTE.CLI_GRUPO_TRIB%TYPE;
  c_pais             SIAOS.COUNTRIES.COUNTRY_KEY%TYPE;
  c_cidade2          SIAOS.CLIENTE.CIDADE%TYPE;
  c_estado2          SIAOS.CLIENTE.ESTADO%TYPE;

  BEGIN
     n_erro := 0;

     BEGIN
       SELECT C.COUNTRY_KEY
         INTO c_pais
         FROM GERAL.PAIS P
        INNER JOIN SIAOS.COUNTRIES C ON C.PAI_CODIGO = P.PAI_CODIGO
        WHERE P.PAI_CODIGO = n_pai_codigo;
     EXCEPTION WHEN OTHERS THEN
       c_pais := 'ZZZ';
     END;

     IF n_est_codigo IS NOT NULL THEN
       SELECT E.EST_SIGLA
         INTO c_estado2
         FROM GERAL.ESTADO E
        WHERE E.EST_CODIGO = n_est_codigo;
     ELSE
        c_estado2 := n_est_codigo;
     END IF;

     IF vc2_tipo_cadastro = 'I' THEN
       IF c_tipo_cliente = 'J' THEN
           n_codigo := NVL(SF_PESQ_CLIENTE_CNPJ(c_cgc, n_codigo, c_tipo_cliente),0);
           n_erro := 0;
       ELSIF c_tipo_cliente = 'I' THEN
         n_erro := 0;
       ELSE
         n_erro := 0;
       END IF;

       IF n_erro = 0 THEN
        /*

        -- SELECT MAX(CODIGO)+1
        --   INTO n_proximo_cod
        --   FROM SIAOS.CLIENTE;

         SELECT SIAOS.SEQ_CLIENTE.NEXTVAL
           INTO n_proximo_cod
           FROM DUAL;


         IF(n_cli_grupo IS NULL) THEN
             n_grupo := n_proximo_cod;
         ELSE
             n_grupo := n_cli_grupo;
         END IF;
        */

        SELECT DISTINCT MAX(F7_GRPCLI) F7_GRPCLI
          INTO n_cli_grupo_trib
          FROM SIGA.SF7010 t
         WHERE F7_EST = c_estado2;

         IF n_cli_cod_mun_ibge IS NULL THEN
           c_cidade2 := c_cidade;
         ELSE
           SELECT SUBSTR(UPPER(TRIM(T.CC2_MUN)),1,25) CC2_MUN
             INTO c_cidade2
             FROM PROTPROD.CC2010 T
            WHERE TRIM(T.CC2_CODMUN) = TRIM(n_cli_cod_mun_ibge)
              AND TRIM(T.CC2_EST)    = TRIM(c_estado2);
         END IF;

         INSERT INTO SIAOS.CLIENTE(CLIENTE,
                                   REDUZIDO,
                                   CGC,
                                   ORIGEM,
                                   CLASSE,
                                   TERRITORIO,
                                   INSCR_EST,
                                   TIPO,
                                   ENDERECO1,
                                   ENDERECO2,
                                   ENDERECO3,
                                   CIDADE,
                                   ESTADO,
                                   EST_CODIGO,
                                   TELEFONE1,
                                   TELEFONE2,
                                   HOMEPAGE,
                                   EMAIL,
                                   CLI_EMAIL_NFSE,
                                   COMEN_FAT,
                                   COMEN_COBR,
                                   FORMAEMBAR,
                                   VENDEDOR,
                                   PAIS,
                                   CEP,
                                   FAX,
                                   USUARIO,
                                   DT_ATUAL,
                                   TIPOEMP,
                                   CLI_GRUPO,
                                   CLI_MONTADOR,
                                   CLI_VENDEDOR2,
                                   AOS_CODIGO_TEC,
                                   AOS_CODIGO_COM,
                                   CLI_TIPO,
                                   CLI_COD_MUN_IBGE,
                                   CLI_GRUPO_TRIB,
                                   CLI_BAIRRO,
                                   CLI_IE_ISENTO,
                                   PAI_CODIGO,
                                   CLI_INSCR_MUN,
                                   CLI_CNAE,
                                   CLI_FOME_ZERO,
                                   CLI_INSCR_SUFRAMA,
                                   CLI_CONTRIBUINTE,
                                   CCONTABIL,
                                   LIMITECR,
                                   CLI_NIF,
                                   CLI_LIMITE_CRV,
																	 CLI_PES_TIPO,
																	 CLI_RECCOF,
																	 CLI_RECCSLL,
																	 CLI_RECPIS,
                                   MPG_CODIGO,
                                   CLI_MOD_PAGT)
                            VALUES(UPPER(c_nome_cliente),
                                   UPPER(c_nome_reduzido),
                                   c_cgc,
                                   c_origem,
                                   c_segmento,
                                   c_area,
                                   c_inscr_estadual,
                                   c_tipo_cliente,
                                   UPPER(c_endereco1),
                                   UPPER(c_endereco2),
                                   UPPER(c_endereco3),
                                   UPPER(c_cidade2),
                                   c_estado2,
                                   n_est_codigo,
                                   c_telefone1,
                                   c_telefone2,
                                   c_homepage,
                                   c_email,
                                   c_cli_email_nfse,
                                   c_coment_fatura,
                                   c_coment_cobranca,
                                   n_transportadora,
                                   c_vendedor,
                                   c_pais,
                                   c_cep,
                                   c_fax,
                                   c_usuario,
                                   SYSDATE,
                                   n_tipo_emp,
                                   n_grupo,
                                   n_cli_montador,
                                   n_cli_vendedor2,
                                   n_aos_codigo_tec,
                                   n_aos_codigo_com,
                                   n_cli_tipo,
                                   n_cli_cod_mun_ibge,
                                   n_cli_grupo_trib,
                                   n_cli_bairro,
                                   n_cli_ie_isento,
                                   n_pai_codigo,
                                   c_cli_inscr_mun,
                                   c_cli_cnae,
                                   n_cli_fome_zero,
                                   c_cli_insc_suframa,
                                   n_cli_contribuinte,
                                   c_ccontabil,
                                   n_limitecr,
                                   c_cli_nif,
                                   n_cli_limite_crv,
																	 c_cli_pes_tipo,
																	 c_cli_reccof,
																	 c_cli_reccsll,
																	 c_cli_recpis,
                                   n_mpg_codigo,
                                   c_cli_mod_pagt)
         RETURNING CODIGO
         INTO n_codigo;
--         n_codigo := n_proximo_cod;
         COMMIT;
         -- Insere cobranca padrao
         SP_ATUALIZA_COBRANCA2(n_codigo,
                              '',
                              1,
                              n_codigo,
                              'I');

         -- Insere embarque padrao
         SP_ATUALIZA_EMBARQUE2(n_codigo,
                              '',
                              1,
                              n_codigo,
                              'I');
       END IF;
     END IF;

     IF(vc2_tipo_cadastro = 'A') THEN

       BEGIN
         SELECT CGC
           INTO n_cgc
           FROM SIAOS.CLIENTE
          WHERE CODIGO = n_codigo;
       EXCEPTION WHEN OTHERS THEN
         n_cgc := NULL;
       END;

       IF TO_NUMBER(TRIM(REGEXP_REPLACE(n_cgc,'[^[:digit:]]'))) != TO_NUMBER(TRIM(REGEXP_REPLACE(c_cgc,'[^[:digit:]]'))) THEN
          n_erro := SF_PESQ_CLIENTE_CNPJ(c_cgc, n_codigo, c_tipo_cliente);
       END IF;

       IF n_cgc IS NOT NULL OR n_erro = 0 THEN

         IF n_cli_cod_mun_ibge IS NULL THEN
           c_cidade2 := c_cidade;
         ELSE
           BEGIN
             SELECT SUBSTR(UPPER(TRIM(T.CC2_MUN)),1,25) CC2_MUN
               INTO c_cidade2
               FROM PROTPROD.CC2010 T
              WHERE TRIM(T.CC2_CODMUN) = TRIM(n_cli_cod_mun_ibge)
                AND TRIM(T.CC2_EST)    = TRIM(c_estado2);
           EXCEPTION WHEN OTHERS THEN
             NULL;
           END;
         END IF;

         UPDATE SIAOS.CLIENTE
            SET CLIENTE           = UPPER(c_nome_cliente),
                REDUZIDO          = UPPER(c_nome_reduzido),
                CGC               = c_cgc,
                ORIGEM            = c_origem,
                CLASSE            = c_segmento,
                TERRITORIO        = c_area,
               -- BLOQUEADO       = n_bloqueado,
                INSCR_EST         = c_inscr_estadual,
                TIPO              = c_tipo_cliente,
                ENDERECO1         = UPPER(c_endereco1),
                ENDERECO2         = UPPER(c_endereco2),
                ENDERECO3         = UPPER(c_endereco3),
                CIDADE            = UPPER(c_cidade2),
                ESTADO            = c_estado2,
                EST_CODIGO        = n_est_codigo,
                TELEFONE1         = c_telefone1,
                TELEFONE2         = c_telefone2,
                HOMEPAGE          = c_homepage,
                EMAIL             = c_email,                
                CLI_EMAIL_NFSE    = c_cli_email_nfse,
                COMEN_FAT         = c_coment_fatura,
                COMEN_COBR        = c_coment_cobranca,
                FORMAEMBAR        = n_transportadora,
                VENDEDOR          = c_vendedor,
                PAIS              = c_pais,
                CEP               = c_cep,
                FAX               = c_fax,
                USUARIO           = c_usuario,
                DT_ATUAL          = SYSDATE,
                TIPOEMP           = n_tipo_emp,
                CLI_GRUPO         = n_cli_grupo,
                CLI_MONTADOR      = n_cli_montador,
                CLI_VENDEDOR2     = n_cli_vendedor2,
                AOS_CODIGO_TEC    = n_aos_codigo_tec,
                AOS_CODIGO_COM    = n_aos_codigo_com,
                CLI_TIPO          = n_cli_tipo,
                CLI_COD_MUN_IBGE  = n_cli_cod_mun_ibge,
                CLI_GRUPO_TRIB    = n_cli_grupo_trib,
                CLI_BAIRRO        = n_cli_bairro,
                CLI_IE_ISENTO     = n_cli_ie_isento,
                PAI_CODIGO        = n_pai_codigo,
                CLI_INSCR_MUN     = c_cli_inscr_mun,
                CLI_CNAE          = c_cli_cnae,
                CLI_FOME_ZERO     = n_cli_fome_zero,
                CLI_INSCR_SUFRAMA = c_cli_insc_suframa,
                CLI_CONTRIBUINTE  = n_cli_contribuinte,
                CCONTABIL         = c_ccontabil,
                LIMITECR          = n_limitecr,
                CLI_NIF           = c_cli_nif,
                CLI_LIMITE_CRV    = n_cli_limite_crv,
								CLI_PES_TIPO      = c_cli_pes_tipo,
								CLI_RECCOF        = c_cli_reccof,
								CLI_RECCSLL       = c_cli_reccsll,
								CLI_RECPIS        = c_cli_recpis,
                MPG_CODIGO        = n_mpg_codigo,
                CLI_MOD_PAGT      = c_cli_mod_pagt
          WHERE CODIGO            = n_codigo;

       END IF;

    END IF;

    IF(vc2_tipo_cadastro = 'E') THEN
      DELETE
        FROM SIAOS.CLIENTE
       WHERE CLIENTE.CODIGO = n_codigo;
    END IF;

    COMMIT;
 END SP_ATUALIZA_DADOS_GERAIS;


 -----------------------------------------------------------------------------
 ---------------------- Grava/Altera/Exclui Area -----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_AREA(
 c_codigo_area     IN SIAOS.ARLEVEL.TERR_KEY%TYPE,
 c_descricao       IN SIAOS.ARLEVEL.DESCRIPTION%TYPE,
 vc2_tipo_cadastro IN VARCHAR2)

 IS

 BEGIN
     IF (vc2_tipo_cadastro = 'I') THEN -- Inclusao
         INSERT INTO SIAOS.ARLEVEL(TERR_KEY,
                                   DESCRIPTION)
                            VALUES(UPPER(c_codigo_area),
                                   UPPER(c_descricao));
     END IF;

     IF (vc2_tipo_cadastro = 'A') THEN -- Alteracao
         UPDATE SIAOS.ARLEVEL
            SET DESCRIPTION = UPPER(c_descricao)
          WHERE TERR_KEY = c_codigo_area;
     END IF;

     IF (vc2_tipo_cadastro = 'E') THEN -- Exclusao
         DELETE FROM SIAOS.ARLEVEL
               WHERE TERR_KEY = UPPER(c_codigo_area);
     END IF;

     COMMIT;
 END SP_ATUALIZA_AREA;


 -----------------------------------------------------------------------------
 ------------------- Grava/Altera/Exclui Cobranca ----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_COBRANCA(
 n_codigo_cli      IN SIAOS.COBRANCA.CODIGO%TYPE,
 c_cod_cobr        IN SIAOS.COBRANCA.CHAVECOBRA%TYPE,
 c_nome            IN SIAOS.COBRANCA.NOME%TYPE,
 c_endereco1       IN SIAOS.COBRANCA.ENDERECO1%TYPE,
 c_endereco2       IN SIAOS.COBRANCA.ENDERECO2%TYPE,
 c_endereco3       IN SIAOS.COBRANCA.ENDERECO3%TYPE,
 c_bairro          IN SIAOS.COBRANCA.COB_BAIRRO%TYPE,
 c_cidade          IN SIAOS.COBRANCA.CIDADE%TYPE,
 c_estado          IN SIAOS.COBRANCA.ESTADO%TYPE,
 c_cep             IN SIAOS.COBRANCA.CEP%TYPE,
 c_pais            IN SIAOS.COBRANCA.PAIS%TYPE,
 c_contato         IN SIAOS.COBRANCA.CONTATO%TYPE,
 c_telefone1       IN SIAOS.COBRANCA.TELEFONE1%TYPE,
 c_telefone2       IN SIAOS.COBRANCA.TELEFONE2%TYPE,
 c_reduzido        IN SIAOS.COBRANCA.REDUZIDO%TYPE,
 c_email           IN SIAOS.COBRANCA.E_MAIL%TYPE,
 n_cobr_default    IN NUMBER,
 vc2_tipo_cadastro IN VARCHAR2) -- I(Inclusao), A(Alteracao), E(Exclusao)

 IS

 n_ult_cod_cobr   INTEGER;
 c_novo_cod_cobr  SIAOS.COBRANCA.CHAVECOBRA%TYPE;
 c_cod_cobr_atual SIAOS.COBRANCA.CHAVECOBRA%TYPE;

 BEGIN
     c_novo_cod_cobr := c_cod_cobr;

     IF (vc2_tipo_cadastro = 'I') THEN
         SELECT MAX(SUBSTR(CHAVECOBRA,7))
           INTO n_ult_cod_cobr
           FROM SIAOS.COBRANCA
          WHERE COBRANCA.CODIGO = n_codigo_cli;

         IF(n_ult_cod_cobr IS NULL) THEN
             n_ult_cod_cobr := 0;
         END IF;

         c_novo_cod_cobr := 'COBRAN'||LPAD(n_ult_cod_cobr+1,3,0);

         IF(c_novo_cod_cobr IS NOT NULL) THEN
             INSERT INTO SIAOS.COBRANCA(CODIGO,
                                        CHAVECOBRA,
                                        NOME,
                                        ENDERECO1,
                                        ENDERECO2,
                                        ENDERECO3,
                                        CIDADE,
                                        ESTADO,
                                        CEP,
                                        PAIS,
                                        CONTATO,
                                        TELEFONE1,
                                        TELEFONE2,
                                        REDUZIDO,
                                        E_MAIL,
																				COB_BAIRRO)
                                 VALUES(n_codigo_cli,
                                        c_novo_cod_cobr,
                                        UPPER(c_nome),
                                        UPPER(c_endereco1),
                                        UPPER(c_endereco2),
                                        UPPER(c_endereco3),
                                        UPPER(c_cidade),
                                        c_estado,
                                        c_cep,
                                        c_pais,
                                        c_contato,
                                        c_telefone1,
                                        c_telefone2,
                                        UPPER(c_reduzido),
                                        c_email,
																				c_bairro);
         END IF;
     END IF;

     IF (vc2_tipo_cadastro = 'A') THEN
         UPDATE SIAOS.COBRANCA
            SET NOME      = UPPER(c_nome),
                ENDERECO1 = UPPER(c_endereco1),
                ENDERECO2 = UPPER(c_endereco2),
                ENDERECO3 = UPPER(c_endereco3),
                CIDADE    = c_cidade,
                ESTADO    = c_estado,
                CEP       = c_cep,
                PAIS      = c_pais,
                CONTATO   = c_contato,
                TELEFONE1 = c_telefone1,
                TELEFONE2 = c_telefone2,
                REDUZIDO  = UPPER(c_reduzido),
                E_MAIL    = c_email,
								COB_BAIRRO= c_bairro
          WHERE CODIGO           = n_codigo_cli
            AND TRIM(CHAVECOBRA) = TRIM(c_novo_cod_cobr);
     END IF;

     IF (vc2_tipo_cadastro = 'E') THEN
         DELETE FROM SIAOS.COBRANCA
               WHERE CODIGO           = n_codigo_cli
                 AND TRIM(CHAVECOBRA) = TRIM(c_novo_cod_cobr);
     END IF;

     IF(n_cobr_default = 1) THEN
         UPDATE SIAOS.CLIENTE
            SET COBRANCA = c_novo_cod_cobr,
                DT_ATUAL = SYSDATE
          WHERE CODIGO   = n_codigo_cli;
     /*ELSE
         SELECT COBRANCA
           INTO c_cod_cobr_atual
           FROM SIAOS.CLIENTE
          WHERE CODIGO = n_codigo_cli;
         IF(c_cod_cobr_atual = c_novo_cod_cobr) THEN
            UPDATE SIAOS.CLIENTE
               SET COBRANCA = NULL,
                   DT_ATUAL = SYSDATE
             WHERE CODIGO   = n_codigo_cli;
         END IF;*/
     END IF;

     COMMIT;
 END SP_ATUALIZA_COBRANCA;



 -----------------------------------------------------------------------------
 ------------------- Grava/Altera/Exclui Cobranca ----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_COBRANCA2(
 n_codigo_cli      IN SIAOS.COBRANCA.CODIGO%TYPE,
 c_cod_cobr        IN SIAOS.COBRANCA.CHAVECOBRA%TYPE,
 n_ativo           IN SIAOS.COBRANCA.ATIVO%TYPE,
 n_cli_codigo_ref  IN SIAOS.COBRANCA.CLI_CODIGO_REF%TYPE,
 vc2_tipo_cadastro IN VARCHAR2) -- I(Inclusao), A(Alteracao), E(Exclusao)

 IS

 n_ult_cod_cobr   INTEGER;
 c_novo_cod_cobr  SIAOS.COBRANCA.CHAVECOBRA%TYPE;
 c_cod_cobr_atual SIAOS.COBRANCA.CHAVECOBRA%TYPE;

 BEGIN

     IF (vc2_tipo_cadastro = 'I') THEN

       IF c_cod_cobr IS NOT NULL THEN
          RAISE_APPLICATION_ERROR(-20001, 'Codigo deve ser vazio.');
       ELSIF n_cli_codigo_ref IS NULL THEN
          RAISE_APPLICATION_ERROR(-20001, 'Cliente não pode ser vazio.');
       END IF;

       SELECT NVL(MAX(SUBSTR(CHAVECOBRA,7)),0)
         INTO n_ult_cod_cobr
         FROM SIAOS.COBRANCA
        WHERE COBRANCA.CODIGO = n_codigo_cli;

       c_novo_cod_cobr := 'COBRAN'||LPAD(n_ult_cod_cobr+1,3,0);

       IF(c_novo_cod_cobr IS NOT NULL) THEN
           INSERT INTO SIAOS.COBRANCA(CODIGO,
                                      CHAVECOBRA,
                                      CLI_CODIGO_REF,
                                      ATIVO)
                               VALUES(n_codigo_cli,
                                      c_novo_cod_cobr,
                                      n_cli_codigo_ref,
                                      1);
       END IF;

     ELSIF (vc2_tipo_cadastro = 'A') THEN

         UPDATE SIAOS.COBRANCA
            SET CLI_CODIGO_REF = n_cli_codigo_ref,
						    ATIVO = n_ativo
          WHERE CODIGO           = n_codigo_cli
            AND TRIM(CHAVECOBRA) = TRIM(c_novo_cod_cobr);

     ELSIF (vc2_tipo_cadastro = 'E') THEN

         DELETE
				   FROM SIAOS.COBRANCA
          WHERE CODIGO           = n_codigo_cli
            AND TRIM(CHAVECOBRA) = TRIM(c_novo_cod_cobr);

     END IF;

     COMMIT;

 END SP_ATUALIZA_COBRANCA2;


 -----------------------------------------------------------------------------
 ------------------- Grava/Altera/Exclui Embarque ----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_EMBARQUE(
 n_codigo_cli      IN SIAOS.EMBARQUE.CODIGO%TYPE,
 c_cod_emb         IN SIAOS.EMBARQUE.CHAVE_EMB%TYPE,
 c_nome            IN SIAOS.EMBARQUE.NOME%TYPE,
 c_endereco1       IN SIAOS.EMBARQUE.ENDERECO1%TYPE,
 c_endereco2       IN SIAOS.EMBARQUE.ENDERECO2%TYPE,
 c_endereco3       IN SIAOS.EMBARQUE.ENDERECO3%TYPE,
 c_bairro          IN SIAOS.EMBARQUE.EMB_BAIRRO%TYPE,
 c_cidade          IN SIAOS.EMBARQUE.CIDADE%TYPE,
 c_estado          IN SIAOS.EMBARQUE.ESTADO%TYPE,
 c_cep             IN SIAOS.EMBARQUE.CEP%TYPE,
 c_pais            IN SIAOS.EMBARQUE.PAIS%TYPE,
 c_contato         IN SIAOS.EMBARQUE.CONTATO%TYPE,
 c_telefone1       IN SIAOS.EMBARQUE.TELEFONE1%TYPE,
 c_telefone2       IN SIAOS.EMBARQUE.TELEFONE2%TYPE,
 c_reduzido        IN SIAOS.EMBARQUE.REDUZIDO%TYPE,
 c_email           IN SIAOS.EMBARQUE.E_MAIL%TYPE,
 n_emb_default     IN NUMBER,
 vc2_tipo_cadastro IN VARCHAR2) -- I(Inclusao), A(Alteracao), E(Exclusao)

 IS

 n_ult_cod_emb   INTEGER;
 c_novo_cod_emb  SIAOS.EMBARQUE.CHAVE_EMB%TYPE;
 c_cod_emb_atual SIAOS.EMBARQUE.CHAVE_EMB%TYPE;

 BEGIN
     c_novo_cod_emb := c_cod_emb;

     IF (vc2_tipo_cadastro = 'I') THEN
         SELECT MAX(SUBSTR(CHAVE_EMB,7))
           INTO n_ult_cod_emb
           FROM SIAOS.EMBARQUE
          WHERE EMBARQUE.CODIGO = n_codigo_cli;

         IF(n_ult_cod_emb IS NULL) THEN
             n_ult_cod_emb := 0;
         END IF;

         c_novo_cod_emb := 'EMBARQ'||LPAD(n_ult_cod_emb+1,3,0);

         IF(c_novo_cod_emb IS NOT NULL) THEN
             INSERT INTO SIAOS.EMBARQUE(CODIGO,
                                        CHAVE_EMB,
                                        NOME,
                                        ENDERECO1,
                                        ENDERECO2,
                                        ENDERECO3,
                                        CIDADE,
                                        ESTADO,
                                        CEP,
                                        PAIS,
                                        CONTATO,
                                        TELEFONE1,
                                        TELEFONE2,
                                        REDUZIDO,
                                        E_MAIL,
																				EMB_BAIRRO)
                                 VALUES(n_codigo_cli,
                                        c_novo_cod_emb,
                                        UPPER(c_nome),
                                        UPPER(c_endereco1),
                                        UPPER(c_endereco2),
                                        UPPER(c_endereco3),
                                        c_cidade,
                                        c_estado,
                                        c_cep,
                                        c_pais,
                                        c_contato,
                                        c_telefone1,
                                        c_telefone2,
                                        UPPER(c_reduzido),
                                        c_email,
																				c_bairro);
         END IF;
     END IF;

     IF (vc2_tipo_cadastro = 'A') THEN
         UPDATE SIAOS.EMBARQUE
            SET NOME      = UPPER(c_nome),
                ENDERECO1 = UPPER(c_endereco1),
                ENDERECO2 = UPPER(c_endereco2),
                ENDERECO3 = UPPER(c_endereco3),
                CIDADE    = c_cidade,
                ESTADO    = c_estado,
                CEP       = c_cep,
                PAIS      = c_pais,
                CONTATO   = c_contato,
                TELEFONE1 = c_telefone1,
                TELEFONE2 = c_telefone2,
                REDUZIDO  = UPPER(c_reduzido),
                E_MAIL    = c_email,
								EMB_BAIRRO= c_bairro
          WHERE CODIGO          = n_codigo_cli
            AND TRIM(CHAVE_EMB) = TRIM(c_novo_cod_emb);
     END IF;

     IF (vc2_tipo_cadastro = 'E') THEN
         DELETE FROM SIAOS.EMBARQUE
               WHERE CODIGO          = n_codigo_cli
                 AND TRIM(CHAVE_EMB) = TRIM(c_novo_cod_emb);
     END IF;

     IF(n_emb_default = 1) THEN
         UPDATE SIAOS.CLIENTE
            SET ENTREGA  = c_novo_cod_emb,
                DT_ATUAL = SYSDATE
          WHERE CODIGO  = n_codigo_cli;
     /*ELSE
         SELECT ENTREGA
           INTO c_cod_emb_atual
           FROM SIAOS.CLIENTE
          WHERE CODIGO = n_codigo_cli;
         IF(c_cod_emb_atual = c_novo_cod_emb) THEN
            UPDATE SIAOS.CLIENTE
               SET ENTREGA  = NULL,
                   DT_ATUAL = SYSDATE
             WHERE CODIGO   = n_codigo_cli;
         END IF;*/
     END IF;

     COMMIT;
 END SP_ATUALIZA_EMBARQUE;


 -----------------------------------------------------------------------------
 ------------------- Grava/Altera/Exclui Embarque ----------------------------
 -----------------------------------------------------------------------------
 PROCEDURE SP_ATUALIZA_EMBARQUE2(
 n_codigo_cli      IN SIAOS.EMBARQUE.CODIGO%TYPE,
 c_cod_emb         IN SIAOS.EMBARQUE.CHAVE_EMB%TYPE,
 n_ativo           IN SIAOS.EMBARQUE.ATIVO%TYPE,
 n_cli_codigo_ref  IN SIAOS.EMBARQUE.CLI_CODIGO_REF%TYPE,
 vc2_tipo_cadastro IN VARCHAR2) -- I(Inclusao), A(Alteracao), E(Exclusao)

 IS

 n_ult_cod_emb   INTEGER;
 c_novo_cod_emb  SIAOS.EMBARQUE.CHAVE_EMB%TYPE;
 c_cod_emb_atual SIAOS.EMBARQUE.CHAVE_EMB%TYPE;

 BEGIN
     c_novo_cod_emb := c_cod_emb;

     IF (vc2_tipo_cadastro = 'I') THEN

       IF c_cod_emb IS NOT NULL THEN
          RAISE_APPLICATION_ERROR(-20001, 'Codigo deve ser vazio.');
       ELSIF n_cli_codigo_ref IS NULL THEN
          RAISE_APPLICATION_ERROR(-20001, 'Cliente não pode ser vazio.');
       END IF;

			 SELECT NVL(MAX(SUBSTR(CHAVE_EMB,7)),0)
				 INTO n_ult_cod_emb
				 FROM SIAOS.EMBARQUE
				WHERE EMBARQUE.CODIGO = n_codigo_cli;

			 c_novo_cod_emb := 'COBRAN'||LPAD(n_ult_cod_emb+1,3,0);

			 IF(c_novo_cod_emb IS NOT NULL) THEN
					 INSERT INTO SIAOS.EMBARQUE(CODIGO,
																			CHAVE_EMB,
																			ATIVO,
																			CLI_CODIGO_REF)
															 VALUES(n_codigo_cli,
																			c_novo_cod_emb,
																			1,
																			n_cli_codigo_ref);
			 END IF;

     ElSIF (vc2_tipo_cadastro = 'A') THEN

			 UPDATE SIAOS.EMBARQUE
					SET ATIVO           = n_ativo,
							CLI_CODIGO_REF  = n_cli_codigo_ref
				WHERE CODIGO          = n_codigo_cli
					AND TRIM(CHAVE_EMB) = TRIM(c_novo_cod_emb);

     ELSIF (vc2_tipo_cadastro = 'E') THEN

			 DELETE
				 FROM SIAOS.EMBARQUE
				WHERE CODIGO          = n_codigo_cli
					AND TRIM(CHAVE_EMB) = TRIM(c_novo_cod_emb);

     END IF;
     COMMIT;
 END SP_ATUALIZA_EMBARQUE2;

 ----------------------------------------------------------
 -------------- Atualiza dados financeiros ----------------
 ----------------------------------------------------------
 PROCEDURE SP_ATUALIZA_DADOS_FINAN(
 n_codigo_cliente  IN SIAOS.CLIENTE.CODIGO%TYPE,
 n_flag_suspenso   IN SIAOS.CLIENTE.FLAGSUSPEN%TYPE,
 n_flag_cobra      IN SIAOS.CLIENTE.FLAGCOBRA%TYPE,
 n_flag_multa      IN SIAOS.CLIENTE.FLAGMULTA%TYPE,
 n_venc_prog       IN SIAOS.CLIENTE.VENCPROG%TYPE,
 n_zona_franca     IN SIAOS.CLIENTE.ZONA_FRANCA%TYPE,
 n_iss             IN SIAOS.CLIENTE.ISS%TYPE,
 n_exportacao      IN SIAOS.CLIENTE.EXPORTACAO%TYPE,
 n_limite_cr       IN SIAOS.CLIENTE.LIMITECR%TYPE,
 n_taxa_multa      IN SIAOS.CLIENTE.TAXAMULTA%TYPE,
 n_desc_max        IN SIAOS.CLIENTE.DESC_MAX%TYPE,
 n_ccontabil       IN SIAOS.CLIENTE.CCONTABIL%TYPE,
 vc2_obsvenc       IN SIAOS.CLIENTE.OBSVENC%TYPE)

 IS

 BEGIN
     UPDATE SIAOS.CLIENTE
	      SET FLAGSUSPEN  = NVL(n_flag_suspenso,0),
				    FLAGCOBRA   = NVL(n_flag_cobra,0),
				    FLAGMULTA   = NVL(n_flag_multa,0),
	          VENCPROG    = NVL(n_venc_prog,0),
				    ZONA_FRANCA = NVL(n_zona_franca,0),
				    ISS         = NVL(n_iss,0),
				    EXPORTACAO  = NVL(n_exportacao,0),
				    LIMITECR    = NVL(n_limite_cr,0),
				    TAXAMULTA   = NVL(n_taxa_multa,0),
				    DESC_MAX    = NVL(n_desc_max,0),
				    CCONTABIL   = NVL(n_ccontabil,0),
				    OBSVENC     = UPPER(vc2_obsvenc),
            DT_ATUAL    = SYSDATE
      WHERE CODIGO      = n_codigo_cliente;
 END SP_ATUALIZA_DADOS_FINAN;


 -------------------------------------------------------
 ------- Verifica se tem embarque cadastrado -----------
 -------------------------------------------------------
 FUNCTION SF_CHECA_EMBARQ_CADASTRADO(
 n_codigo_cliente   SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN NUMBER IS

 n_tem_emb   NUMBER(10);

 BEGIN
    SELECT COUNT(CHAVE_EMB)
      INTO n_tem_emb
      FROM SIAOS.EMBARQUE
     WHERE CODIGO = n_codigo_cliente;

     RETURN(n_tem_emb);
 END SF_CHECA_EMBARQ_CADASTRADO;

 -------------------------------------------------------
 ------- Verifica qual embarque e o padrao   -----------
 -------------------------------------------------------
 FUNCTION SF_CHECA_EMBARQ_PADRAO(
 n_codigo_cliente   SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN VARCHAR IS

 c_cod_embarque   SIAOS.EMBARQUE.CHAVE_EMB%TYPE;

 BEGIN
    SELECT ENTREGA
      INTO c_cod_embarque
      FROM SIAOS.CLIENTE
     WHERE CODIGO = n_codigo_cliente;

     RETURN(c_cod_embarque);
 END SF_CHECA_EMBARQ_PADRAO;


 -------------------------------------------------------
 ------- Verifica se tem cobranca cadastrada -----------
 -------------------------------------------------------
 FUNCTION SF_CHECA_COBRAN_CADASTRADA(
 n_codigo_cliente   SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN NUMBER IS

 n_tem_cob   NUMBER(10);

 BEGIN
    SELECT COUNT(CHAVECOBRA)
      INTO n_tem_cob
      FROM SIAOS.COBRANCA
     WHERE CODIGO = n_codigo_cliente;

     RETURN(n_tem_cob);
 END SF_CHECA_COBRAN_CADASTRADA;

 -------------------------------------------------------
 ------- Verifica qual cobranca e a padrao   -----------
 -------------------------------------------------------
 FUNCTION SF_CHECA_COBRAN_PADRAO(
 n_codigo_cliente   SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN VARCHAR IS

 c_cod_cobranca   SIAOS.COBRANCA.CHAVECOBRA%TYPE;

 BEGIN
    SELECT COBRANCA
      INTO c_cod_cobranca
      FROM SIAOS.CLIENTE
     WHERE CODIGO = n_codigo_cliente;

     RETURN(c_cod_cobranca);
 END SF_CHECA_COBRAN_PADRAO;

 -------------------------------------------------------
 -------------- Atualiza dados do contato --------------
 -- vc2_tipo_cadastro:   I-Inclusao   A-Alteracao ------
 -------------------------------------------------------
 PROCEDURE SP_ATUALIZA_CONTATO(
 n_codigo_cliente  IN SIAOS.CONTATOS.CODCLIENTE%TYPE,
 c_nome_old        IN SIAOS.CONTATOS.NOME%TYPE,
 c_nome_new        IN SIAOS.CONTATOS.NOME%TYPE,
 c_depto           IN SIAOS.CONTATOS.DEPTO%TYPE,
 c_cargo           IN SIAOS.CONTATOS.CARGO%TYPE,
 c_telefone        IN SIAOS.CONTATOS.TELEFONE%TYPE,
 c_fax             IN SIAOS.CONTATOS.CELULAR%TYPE,
 c_celular         IN SIAOS.CONTATOS.CELULAR%TYPE,
 c_email           IN SIAOS.CONTATOS.EMAIL%TYPE,
 vc2_tipo_cadastro IN VARCHAR2) IS

 n_codigo_contato NUMBER;
 n_con_ativo      NUMBER := 1;

 BEGIN

    SP_ATUALIZA_CONTATO(n_codigo_contato, n_codigo_cliente, c_nome_old, c_nome_new, c_depto, c_cargo, c_telefone, c_fax, c_celular, c_email, n_con_ativo, vc2_tipo_cadastro);

 END SP_ATUALIZA_CONTATO;



 -------------------------------------------------------
 -------------- Atualiza dados do contato --------------
 -- vc2_tipo_cadastro:   I-Inclusao   A-Alteracao ------
 -------------------------------------------------------
 PROCEDURE SP_ATUALIZA_CONTATO(
 n_con_codigo      IN OUT SIAOS.CONTATOS.CON_CODIGO%TYPE,
 n_codigo_cliente  IN     SIAOS.CONTATOS.CODCLIENTE%TYPE,
 c_nome_old        IN     SIAOS.CONTATOS.NOME%TYPE,
 c_nome_new        IN     SIAOS.CONTATOS.NOME%TYPE,
 c_depto           IN     SIAOS.CONTATOS.DEPTO%TYPE,
 c_cargo           IN     SIAOS.CONTATOS.CARGO%TYPE,
 c_telefone        IN     SIAOS.CONTATOS.TELEFONE%TYPE,
 c_fax             IN     SIAOS.CONTATOS.CELULAR%TYPE,
 c_celular         IN     SIAOS.CONTATOS.CELULAR%TYPE,
 c_email           IN     SIAOS.CONTATOS.EMAIL%TYPE,
 n_con_ativo       IN     SIAOS.CONTATOS.CON_ATIVO%TYPE,
 vc2_tipo_cadastro IN     VARCHAR2) IS

 BEGIN
     IF((vc2_tipo_cadastro = 'I') AND (c_nome_new IS NOT NULL)) THEN

        INSERT
          INTO SIAOS.CONTATOS(CODCLIENTE, NOME,DEPTO, CARGO, TELEFONE, FAX, CELULAR, EMAIL, CON_ATIVO)
        VALUES (n_codigo_cliente, c_nome_new, c_depto, c_cargo, c_telefone, c_fax, c_celular, c_email, n_con_ativo)
     RETURNING CON_CODIGO
          INTO n_con_codigo;

     ELSIF(vc2_tipo_cadastro = 'A') THEN

        IF n_con_codigo IS NULL THEN
          UPDATE SIAOS.CONTATOS
             SET NOME     = c_nome_new,
                 DEPTO    = c_depto,
                 CARGO    = c_cargo,
                 TELEFONE = c_telefone,
                 FAX      = c_fax,
                 CELULAR  = c_celular,
                 EMAIL    = c_email
           WHERE CODCLIENTE = n_codigo_cliente
             AND TRIM(NOME) = TRIM(c_nome_old);
        ELSE
          UPDATE SIAOS.CONTATOS
             SET NOME       = c_nome_new,
                 DEPTO      = c_depto,
                 CARGO      = c_cargo,
                 TELEFONE   = c_telefone,
                 FAX        = c_fax,
                 CELULAR    = c_celular,
                 EMAIL      = c_email,
                 CON_ATIVO  = n_con_ativo
           WHERE CODCLIENTE = n_codigo_cliente
             AND CON_CODIGO = n_con_codigo;
        END IF;
     END IF;

     COMMIT;
 END SP_ATUALIZA_CONTATO;


 -------------------------------------------------------
 -------------- Verifica tipo do contato ---------------
 -------------------------------------------------------
 FUNCTION SF_VERIFICA_TIPO_CONTATO(
 n_codigo_cliente SIAOS.CLIENTE.CODIGO%TYPE,
 c_nome           SIAOS.CLIENTE.CONTATO%TYPE)
 RETURN NUMBER IS

 c_nome_cont      SIAOS.CLIENTE.CONTATO%TYPE;
 n_tipo           NUMBER := 0;

 BEGIN

    SELECT CONTATO
      INTO c_nome_cont
      FROM SIAOS.CLIENTE
     WHERE CODIGO = n_codigo_cliente;

    IF(TRIM(c_nome_cont) = TRIM(c_nome)) THEN
       n_tipo      := 2; -- Contato Comercial
       c_nome_cont := NULL;
    END IF;

    SELECT CONTATOTEC
      INTO c_nome_cont
      FROM SIAOS.CLIENTE
     WHERE CODIGO = n_codigo_cliente;

    IF(TRIM(c_nome_cont) = TRIM(c_nome)) THEN
       n_tipo      := 1; -- Contato Tecnico
       c_nome_cont := NULL;
    END IF;

    SELECT CONTATOFIN
      INTO c_nome_cont
      FROM SIAOS.CLIENTE
     WHERE CODIGO = n_codigo_cliente;

    IF(TRIM(c_nome_cont) = TRIM(c_nome)) THEN
       n_tipo      := 3; -- Contato Financeiro
       --c_nome_cont := NULL;
    END IF;

    RETURN(n_tipo);
 END SF_VERIFICA_TIPO_CONTATO;

 -------------------------------------------------------
 ---------------- Atualiza Observacao ------------------
 -------------------------------------------------------
 PROCEDURE SP_ATUALIZA_OBS(
 n_codigo_cliente IN SIAOS.CLIENTE.CODIGO%TYPE,
 n_obs            IN SIAOS.CLIENTE.OBSERVA%TYPE)
 IS
 BEGIN
    UPDATE SIAOS.CLIENTE
       SET OBSERVA  = n_obs,
           DT_ATUAL = SYSDATE
     WHERE CODIGO  = n_codigo_cliente;

    COMMIT;
 END SP_ATUALIZA_OBS;

 -------------------------------------------------------
 ------ Verifica se existe o cliente pelo CNPJ/CPF -----
 -------------------------------------------------------
 FUNCTION SF_PESQ_CLIENTE_CNPJ(
 c_cnpj             IN SIAOS.CLIENTE.CGC%TYPE,
 n_cod_cli          IN SIAOS.CLIENTE.CODIGO%TYPE,
 c_tipo_cli         IN SIAOS.CLIENTE.TIPO%TYPE)
 RETURN NUMBER IS

 n_tem_cli          INTEGER;
 /*
 vc2_cliente        VARCHAR2(100);
 c_tipo_doc         VARCHAR2(10);
 n_codigo           SIAOS.CLIENTE.CODIGO%TYPE;
 vc2_msg            VARCHAR2(20);
  */

 BEGIN

  IF n_cod_cli IS NULL THEN

     SELECT MAX(CODIGO)
       INTO n_tem_cli
       FROM SIAOS.CLIENTE
      WHERE TO_NUMBER(TRIM(REGEXP_REPLACE(CGC,'[^[:digit:]]'))) = TO_NUMBER(TRIM(REGEXP_REPLACE(c_cnpj,'[^[:digit:]]')));

  ELSE

     SELECT COUNT(CODIGO)
       INTO n_tem_cli
       FROM SIAOS.CLIENTE
      WHERE TO_NUMBER(TRIM(REGEXP_REPLACE(CGC,'[^[:digit:]]'))) = TO_NUMBER(TRIM(REGEXP_REPLACE(c_cnpj,'[^[:digit:]]')))
        AND CODIGO != n_cod_cli
        AND BLOQUEADO != 2;

  END IF;
  -- n_tem_cli := 0 CPF/CNPJ NAO UTILIZADO
  -- n_tem_cli > 0  CPF/CNPJ UTILIZADO

  RETURN(n_tem_cli);
/*
      IF(n_tem_cli = 0) THEN
          vc2_cliente := '0';
      ELSIF(n_tem_cli = 1) THEN
          SELECT TRIM(REDUZIDO) REDUZIDO,
                 DECODE(TIPO,'J','CNPJ','F','CPF') TIPO,
                 CODIGO
            INTO vc2_cliente,
                 c_tipo_doc,
                 n_codigo
            FROM SIAOS.CLIENTE
           WHERE LTRIM(TRIM(TRANSLATE(CGC,'#./-','#')),'0') = LTRIM(TRIM(TRANSLATE(c_cnpj,'#./-','#')),'0');
          IF(n_codigo = n_cod_cli) THEN -- Alteracao de CNPJ/CPF
              vc2_cliente := '0';
          ELSE
              vc2_cliente := 'Já existe o cliente '||vc2_cliente||' cadastrado com esse '||c_tipo_doc||'.';
          END IF;
      ELSIF(n_tem_cli > 1) THEN
          SELECT DECODE(TIPO,'J','CNPJ','F','CPF') TIPO
            INTO c_tipo_doc
            FROM SIAOS.CLIENTE
           WHERE LTRIM(TRIM(TRANSLATE(CGC,'#./-','#')),'0') = LTRIM(TRIM(TRANSLATE(c_cnpj,'#./-','#')),'0')
             AND ROWNUM = 1;
          vc2_cliente := 'Já existem '||n_tem_cli||' clientes cadastrados com esse '||c_tipo_doc||'.';
      END IF;

      RETURN(vc2_cliente);

      -------------------- Checa se o CPF ou CNPJ e valido --------------------
      IF(c_tipo_cli = 'F') THEN
         n_tp := 1;
      ELSIF(c_tipo_cli = 'J') THEN
         n_tp := 2;
      ELSE
         n_tp := 0;
      END IF;

      vc2_msg := SIAOS.PCK_CLIENTE.SF_VALIDA_CPF_CNPJ(TO_NUMBER(c_cnpj),n_tp);

      IF((vc2_msg IS NOT NULL) AND (vc2_cliente = '0')) THEN
         vc2_cliente := vc2_msg;
      END IF;
*/
 END SF_PESQ_CLIENTE_CNPJ;


 -------------------------------------------------------
 ------------ Atualiza contatos do cliente -------------
 -------------------------------------------------------
 PROCEDURE SP_ATUALIZA_CONTATO_CLIENTE(
 c_contato_tec     IN SIAOS.CLIENTE.CONTATOTEC%TYPE,
 c_contato_com     IN SIAOS.CLIENTE.CONTATO%TYPE,
 c_contato_fin     IN SIAOS.CLIENTE.CONTATOFIN%TYPE,
 n_codigo_cliente  IN SIAOS.CONTATOS.CODCLIENTE%TYPE)
 IS

 BEGIN

    UPDATE SIAOS.CLIENTE
       SET CONTATO    = c_contato_com,
           CONTATOTEC = c_contato_tec,
           CONTATOFIN = c_contato_fin
     WHERE CODIGO     = n_codigo_cliente;
    COMMIT;

 END SP_ATUALIZA_CONTATO_CLIENTE;

 -------------------------------------------------------
 ------------ Atualiza contatos do cliente -------------
 -------------------------------------------------------
 PROCEDURE SP_UPDATE_CONTATO_CLIENTE(
 n_codigo_cliente  IN SIAOS.CONTATOS.CODCLIENTE%TYPE,
 n_contato_com     IN SIAOS.CLIENTE.CON_CODIGO_COM%TYPE,
 n_contato_tec     IN SIAOS.CLIENTE.CON_CODIGO_TEC%TYPE,
 n_contato_fin     IN SIAOS.CLIENTE.CON_CODIGO_FIN%TYPE)
 IS

 BEGIN

  UPDATE SIAOS.CLIENTE
     SET CON_CODIGO_COM = n_contato_com,
         CON_CODIGO_TEC = n_contato_tec,
         CON_CODIGO_FIN = n_contato_fin
   WHERE CODIGO         = n_codigo_cliente;

  COMMIT;

 END SP_UPDATE_CONTATO_CLIENTE;

 -------------------------------------------------------
 --------- Verifica se um CNPJ ou CPF e valido ---------
 -------------------------------------------------------
 FUNCTION SF_VALIDA_CPF_CNPJ(
 n_numero           IN VARCHAR2,
 c_tipo_cli         IN SIAOS.CLIENTE.TIPO%TYPE) -- F:CPF     --  J:CNPJ
 RETURN VARCHAR IS
   n_num_comp  VARCHAR2(20);
   n_num_comp2 VARCHAR2(20);
   vc2_msg     VARCHAR2(20);
   n_tamanho   NUMBER(2);
   n_d1        NUMBER(1);
   n_d2        NUMBER(1);
   n_d3        NUMBER(1);
   n_d4        NUMBER(1);
   n_d5        NUMBER(1);
   n_d6        NUMBER(1);
   n_d7        NUMBER(1);
   n_d8        NUMBER(1);
   n_d9        NUMBER(1);
   n_d10       NUMBER(1);
   n_d11       NUMBER(1);
   n_d12       NUMBER(1);
   n_d13       NUMBER(1);
   n_d14       NUMBER(1);
   n_soma      INTEGER;
   n_fator1    INTEGER;
   n_fator2    INTEGER;
   n_digito_v  INTEGER;
 BEGIN
     n_num_comp := TO_CHAR(n_numero);
     n_tamanho  := LENGTH(n_num_comp);

     IF((n_tamanho >= 11) OR (n_tamanho <= 13)) THEN
         n_num_comp2 := LPAD(TO_CHAR(n_numero),11,'0');
     END IF;

     n_d1  := SUBSTR(n_num_comp,1,1);
     n_d2  := SUBSTR(n_num_comp,2,1);
     n_d3  := SUBSTR(n_num_comp,3,1);
     n_d4  := SUBSTR(n_num_comp,4,1);
     n_d5  := SUBSTR(n_num_comp,5,1);
     n_d6  := SUBSTR(n_num_comp,6,1);
     n_d7  := SUBSTR(n_num_comp,7,1);
     n_d8  := SUBSTR(n_num_comp,8,1);
     n_d9  := SUBSTR(n_num_comp,9,1);
     IF   (n_tamanho >= 10) THEN
        n_d10 := SUBSTR(n_num_comp,10,1);
     END IF;
     IF(n_tamanho >= 11) THEN
        n_d11 := SUBSTR(n_num_comp,11,1);
     END IF;
     IF(n_tamanho >= 12) THEN
        n_d12 := SUBSTR(n_num_comp,12,1);
     END IF;
     IF(n_tamanho >= 13) THEN
        n_d13 := SUBSTR(n_num_comp,13,1);
     END IF;
     IF(n_tamanho >= 14) THEN
        n_d14 := SUBSTR(n_num_comp,14,1);
     END IF;

     IF(c_tipo_cli = 'F') THEN -- Valida CPF
       IF n_tamanho >= 11 AND  n_tamanho <= 14  THEN
         n_soma := (n_d9 * 2) +
                   (n_d8 * 3) +
                   (n_d7 * 4) +
                   (n_d6 * 5) +
                   (n_d5 * 6) +
                   (n_d4 * 7) +
                   (n_d3 * 8) +
                   (n_d2 * 9) +
                   (n_d1 * 10);
         n_fator1 := MOD((n_soma * 10), 11);
         IF(n_fator1 >= 10) THEN
             n_fator1 := 0;
         END IF;

         n_soma := (n_fator1 * 2) +
                   (n_d9 * 3) +
                   (n_d8 * 4) +
                   (n_d7 * 5) +
                   (n_d6 * 6) +
                   (n_d5 * 7) +
                   (n_d4 * 8) +
                   (n_d3 * 9) +
                   (n_d2 * 10) +
                   (n_d1 * 11);
         n_fator2 := MOD((n_soma * 10), 11);
         IF(n_fator2 >= 10) THEN
             n_fator2 := 0;
         END IF;

         IF((n_fator1 != n_d10) OR (n_fator2 != n_d11)) THEN
             vc2_msg := 'CPF Invalido !';
         ELSE
             vc2_msg := '';
         END IF;
       ELSE
          vc2_msg := 'CPF Invalido !';
       END IF;
     ELSIF(c_tipo_cli = 'J') THEN -- Valida CNPJ
       IF n_tamanho >= 12 AND  n_tamanho <= 14  THEN
         n_soma := (n_d1 * 5) +
                   (n_d2 * 4) +
                   (n_d3 * 3) +
                   (n_d4 * 2) +
                   (n_d5 * 9) +
                   (n_d6 * 8) +
                   (n_d7 * 7) +
                   (n_d8 * 6) +
                   (n_d9 * 5) +
                   (n_d10 * 4) +
                   (n_d11 * 3) +
                   (n_d12 * 2);
         n_fator1 := MOD(n_soma, 11);
         IF((n_fator1 = 0) OR (n_fator1 = 1)) THEN
             n_fator1 := 0;
         ELSE
             n_fator1 := 11 - n_fator1;
         END IF;

         n_soma := (n_d1 * 6) +
                   (n_d2 * 5) +
                   (n_d3 * 4) +
                   (n_d4 * 3) +
                   (n_d5 * 2) +
                   (n_d6 * 9) +
                   (n_d7 * 8) +
                   (n_d8 * 7) +
                   (n_d9 * 6) +
                   (n_d10 * 5) +
                   (n_d11 * 4) +
                   (n_d12 * 3) +
                   (n_fator1 * 2);
         n_fator2 := MOD(n_soma, 11);
         IF((n_fator2 = 0) OR (n_fator2 = 1)) THEN
             n_fator2 := 0;
         ELSE
             n_fator2 := 11 - n_fator2;
         END IF;

         n_digito_v := (n_fator1 * 10) + n_fator2;

         IF(n_digito_v != (n_d13||n_d14)) THEN
             vc2_msg := 'CNPJ Inválido !';
         ELSE
             vc2_msg := '';
         END IF;
       ELSE
         vc2_msg := 'CNPJ Inválido !';
       END IF;

     ELSE
        vc2_msg := 'CPF Inválido !';
     END IF;

     RETURN(vc2_msg);

 EXCEPTION WHEN OTHERS THEN
    RETURN('CPF Inválido !');
 END SF_VALIDA_CPF_CNPJ;


 -------------------------------------------------------
 ------------- Retorna status do cliente ---------------
 -------------------------------------------------------
 FUNCTION SF_STATUS_CLIENTE(
 n_cod     IN SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN VARCHAR IS
   n_bloqueado  NUMBER(1);
   vc2_icone    VARCHAR2(200);
 BEGIN
    SELECT BLOQUEADO
      INTO n_bloqueado
      FROM SIAOS.CLIENTE
     WHERE CODIGO = n_cod;

     IF(n_bloqueado = 1) THEN
        vc2_icone := '<img align="absmiddle" src="../../dqanet/imagens/geral/atencao.gif" width="21" height="16" alt="Pendencia Financeira (Somente Advertencia)">';
     ELSIF(n_bloqueado = 2) THEN
        vc2_icone := '<img align="absmiddle" src="../../dqanet/imagens/geral/x.gif" width="18" height="18" alt="Cadastro Duplicado">';
     ELSIF(n_bloqueado = 3) THEN
        vc2_icone := '<img align="absmiddle" src="../../dqanet/imagens/geral/perigo.gif" width="20" height="16" alt="Pendencia Financeira (Distribuicão de O.S. Bloqueada)">';
     ELSE
        vc2_icone := '';
     END IF;

     RETURN(vc2_icone);

     EXCEPTION
       WHEN NO_DATA_FOUND THEN
       BEGIN
          vc2_icone := 'Cliente não encontrado !';
          RETURN(vc2_icone);
       END;
 END SF_STATUS_CLIENTE;


 -------------------------------------------------------
 ------------- Retorna status do cliente ---------------
 -------------------------------------------------------
 FUNCTION SF_CHECA_CADASTRO(
 n_cod     IN SIAOS.CLIENTE.CODIGO%TYPE)
 RETURN VARCHAR IS

    n_erro             INTEGER := 0;
    c_origem           SIAOS.CLIENTE.ORIGEM%TYPE;
    c_cliente          SIAOS.CLIENTE.CLIENTE%TYPE;
    c_reduzido         SIAOS.CLIENTE.REDUZIDO%TYPE;
    c_cli_tipo         SIAOS.CLIENTE.CLI_TIPO%TYPE;
    c_endereco1        SIAOS.CLIENTE.ENDERECO1%TYPE;
    c_pais             SIAOS.CLIENTE.PAIS%TYPE;
    n_aos_codigo_tec   SIAOS.CLIENTE.AOS_CODIGO_TEC%TYPE;
    n_aos_codigo_com   SIAOS.CLIENTE.AOS_CODIGO_COM%TYPE;
    c_formaembar       SIAOS.CLIENTE.FORMAEMBAR%TYPE;
    c_classe           SIAOS.CLIENTE.CLASSE%TYPE;
    c_territorio       SIAOS.CLIENTE.TERRITORIO%TYPE;
    c_vendedor         SIAOS.CLIENTE.VENDEDOR%TYPE;
    c_cli_vendedor2    SIAOS.CLIENTE.CLI_VENDEDOR2%TYPE;
    c_tipo             SIAOS.CLIENTE.TIPO%TYPE;
    c_cgc              VARCHAR2(20);
    c_inscr_est        SIAOS.CLIENTE.INSCR_EST%TYPE;
    c_cidade           SIAOS.CLIENTE.CIDADE%TYPE;
    c_estado           SIAOS.CLIENTE.ESTADO%TYPE;
    c_cep              SIAOS.CLIENTE.CEP%TYPE;
    c_cli_bairro       SIAOS.CLIENTE.CLI_BAIRRO%TYPE;
    n_cli_cod_mun_ibge SIAOS.CLIENTE.CLI_COD_MUN_IBGE%TYPE;
    n_cli_ie_isento    SIAOS.CLIENTE.CLI_IE_ISENTO%TYPE;
    n_est_codigo       SIAOS.CLIENTE.EST_CODIGO%TYPE;
    n_pai_codigo       SIAOS.CLIENTE.PAI_CODIGO%TYPE;
    n_ccontabil        SIAOS.CLIENTE.CCONTABIL%TYPE;
    v_email            SIAOS.CLIENTE.EMAIL%TYPE;
    v_ship_via         SIAOS.CLIENTE.FORMAEMBAR%TYPE;

 BEGIN

    SELECT TRIM(C.ORIGEM),
           TRIM(C.CLIENTE),
           TRIM(C.CLI_TIPO),
           TRIM(C.REDUZIDO),
           TRIM(C.ENDERECO1),
           TRIM(C.PAIS),
           TRIM(C.AOS_CODIGO_TEC),
           TRIM(C.AOS_CODIGO_COM),
           TRIM(C.FORMAEMBAR),
           TRIM(C.CLASSE),
           TRIM(C.TERRITORIO),
           TRIM(C.VENDEDOR),
           TRIM(C.CLI_VENDEDOR2),
           TRIM(C.TIPO),
           DECODE(TIPO,'F',LPAD(TRIM(TRANSLATE(TRIM(C.CGC),'#./-','#')),11,'0'),
           DECODE(TIPO,'J',LPAD(TRIM(TRANSLATE(TRIM(C.CGC),'#./-','#')),14,'0'),TRIM(CGC))),
           TRIM(REGEXP_REPLACE(C.INSCR_EST,'[^[:digit:]]')),
           TRIM(C.CIDADE),
           TRIM(C.ESTADO),
           TRIM(C.EMAIL),
           TRIM(C.CEP),
           TRIM(C.CLI_BAIRRO),
           TRIM(C.CLI_COD_MUN_IBGE),
           C.CLI_IE_ISENTO,
           C.EST_CODIGO,
           C.PAI_CODIGO,
           C.CCONTABIL,
           C.FORMAEMBAR
      INTO c_origem,
           c_cliente,
           c_cli_tipo,
           c_reduzido,
           c_endereco1,
           c_pais,
           n_aos_codigo_tec,
           n_aos_codigo_com,
           c_formaembar,
           c_classe,
           c_territorio,
           c_vendedor,
           c_cli_vendedor2,
           c_tipo,
           c_cgc,
           c_inscr_est,
           c_cidade,
           c_estado,
           v_email,
           c_cep,
           c_cli_bairro,
           n_cli_cod_mun_ibge,
           n_cli_ie_isento,
           n_est_codigo,
           n_pai_codigo,
           n_ccontabil,
           v_ship_via
      FROM SIAOS.CLIENTE C
     WHERE CODIGO = n_cod;

     BEGIN
       SELECT A.SHIP_VIA_KEY
         INTO v_ship_via
         FROM SIAOS.ARSVIA2 A
        WHERE TRIM(A.SHIP_VIA_KEY) = TRIM(v_ship_via)
          AND A.ARS_STATUS = 1;
     EXCEPTION WHEN OTHERS THEN
       v_ship_via := NULL;
     END;

     IF c_origem IS NULL THEN
        n_erro := 1;
     ELSIF c_cliente IS NULL THEN
        n_erro := 1;
     ELSIF c_reduzido IS NULL THEN
        n_erro := 1;
     ELSIF c_cli_tipo IS NULL THEN
        n_erro := 1;
     ELSIF c_endereco1 IS NULL THEN
        n_erro := 1;
     ELSIF c_pais IS NULL THEN
        n_erro := 1;
     ELSIF n_aos_codigo_tec IS NULL THEN
        n_erro := 1;
     ELSIF n_aos_codigo_com IS NULL THEN
        n_erro := 1;
     ELSIF c_classe IS NULL THEN
        n_erro := 1;
     ELSIF c_territorio IS NULL THEN
        n_erro := 1;
     ELSIF c_vendedor IS NULL THEN
        n_erro := 1;
     ELSIF c_cli_vendedor2 IS NOT NULL AND c_vendedor = c_cli_vendedor2 THEN
        n_erro := 1;
     ELSIF c_tipo IS NULL THEN
        n_erro := 1;
     ELSIF c_cidade IS NULL THEN
        n_erro := 1;
     ELSIF v_ship_via IS NULL THEN
        n_erro := 1;
     ELSE
       IF c_tipo != 'I' THEN
         IF c_cgc IS NULL THEN
            n_erro := 1;
         ELSIF c_inscr_est IS NULL AND n_cli_ie_isento = 0 THEN
            n_erro := 1;
         ELSIF c_formaembar IS NULL THEN
            n_erro := 1;
         ELSIF v_email IS NULL THEN
            n_erro := 1;
         ELSIF c_estado IS NULL THEN
            n_erro := 1;
         ELSIF c_cep IS NULL THEN
            n_erro := 1;
         ELSIF c_cli_bairro IS NULL OR c_cli_bairro = '.' THEN
            n_erro := 1;
         ELSIF n_cli_cod_mun_ibge IS NULL THEN
            n_erro := 1;
         ELSIF n_est_codigo IS NULL THEN
            n_erro := 1;
         ELSIF n_pai_codigo IS NULL THEN
            n_erro := 1;
         ELSIF n_ccontabil IS NULL THEN
            n_erro := 1;
         ELSIF SF_VALIDA_CPF_CNPJ(c_cgc,c_tipo) IS NOT NULL AND c_tipo = 'J' THEN
            n_erro := 2;
         END IF;
       END IF;
     END IF;

     RETURN(n_erro);

 EXCEPTION WHEN NO_DATA_FOUND THEN
    n_erro := 999;
    RETURN(n_erro);
 END SF_CHECA_CADASTRO;

END PCK_CLIENTE;
/
