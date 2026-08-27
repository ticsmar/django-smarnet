-- Compilar como SIAOS (API_SMAR toma ORA-01031).
-- Pre-requisito: PCK_DQANET.pck (SF_USU_CHAPA_USER).

CREATE OR REPLACE TRIGGER SIAOS.TG_B_IU_CLIENTE
  BEFORE INSERT OR UPDATE ON CLIENTE
  FOR EACH ROW
DECLARE
    v_log_cliente       SIAOS.LOG_CLIENTE.LCL_TEXTO%TYPE;
    v_crs_cod_prot_new  INTEGRACAO.CLIENTE_RISCO.CRS_COD_PROTHEUS%TYPE;
    n_usu_chapa         SIAOS.USUARIO.USU_CHAPA%TYPE;
BEGIN
  :NEW.BLOQUEADO := NVL(:NEW.BLOQUEADO,0);
  IF INSERTING THEN
     v_log_cliente := 'CLIENTE CADASTRADO.<BR>';
     -- Atualiza o cùdigo da empresa do usuario que cadastrou/alterou o cliente
     :NEW.EMP_CODIGO := SGC.PCK_WINSGC.SF_EMP_CODIGO;

      IF :NEW.PAIS = 'BRA' THEN
        :NEW.CCONTABIL := '11201001';
      ELSE
        :NEW.CCONTABIL := '11201002';
      END IF;

  END IF;

  IF UPDATING AND TRIM(:NEW.CCONTABIL) IS NULL THEN

      IF :NEW.PAIS = 'BRA' THEN
        :NEW.CCONTABIL := '11201001';
      ELSE
        :NEW.CCONTABIL := '11201002';
      END IF;

  END IF;

  IF UPDATING THEN

      IF :NEW.CON_CODIGO_COM != :OLD.CON_CODIGO_COM THEN
        IF :NEW.CON_CODIGO_COM IS NULL THEN
          :NEW.CONTATO := NULL;
        ELSE
          SELECT TRIM(C.NOME)
            INTO :NEW.CONTATO
            FROM SIAOS.CONTATOS C
           WHERE C.CON_CODIGO = :NEW.CON_CODIGO_COM;
        END IF;
      END IF;

      IF :NEW.CON_CODIGO_TEC != :OLD.CON_CODIGO_TEC THEN
        IF :NEW.CON_CODIGO_TEC IS NULL THEN
          :NEW.CONTATO := NULL;
        ELSE
          SELECT TRIM(C.NOME)
            INTO :NEW.CONTATOTEC
            FROM SIAOS.CONTATOS C
           WHERE C.CON_CODIGO = :NEW.CON_CODIGO_TEC;
        END IF;
      END IF;

      IF :NEW.CON_CODIGO_FIN != :OLD.CON_CODIGO_FIN THEN
        IF :NEW.CON_CODIGO_FIN IS NULL THEN
          :NEW.CONTATOFIN := NULL;
        ELSE
          SELECT TRIM(C.NOME)
            INTO :NEW.CONTATOFIN
            FROM SIAOS.CONTATOS C
           WHERE C.CON_CODIGO = :NEW.CON_CODIGO_FIN;
        END IF;
      END IF;

	    UPDATE COBRANCA C
				 SET NOME       = :NEW.CLIENTE,
						 ENDERECO1  = :NEW.ENDERECO1,
						 ENDERECO2  = :NEW.ENDERECO2,
						 ENDERECO3  = :NEW.ENDERECO3,
						 CIDADE     = :NEW.CIDADE,
						 ESTADO     = :NEW.ESTADO,
						 CEP        = :NEW.CEP,
						 PAIS       = :NEW.PAIS,
						 CONTATO    = :NEW.CONTATO,
						 TELEFONE1  = :NEW.TELEFONE1,
						 TELEFONE2  = :NEW.TELEFONE2,
						 REDUZIDO   = :NEW.REDUZIDO,
						 E_MAIL     = :NEW.EMAIL,
						 COB_BAIRRO = SUBSTR(:NEW.CLI_BAIRRO,1,40)
			 WHERE CLI_CODIGO_REF = :NEW.codigo;


	    UPDATE EMBARQUE C
				 SET NOME       = :NEW.CLIENTE,
						 ENDERECO1  = :NEW.ENDERECO1,
						 ENDERECO2  = :NEW.ENDERECO2,
						 ENDERECO3  = :NEW.ENDERECO3,
						 CIDADE     = :NEW.CIDADE,
						 ESTADO     = :NEW.ESTADO,
						 CEP        = :NEW.CEP,
						 PAIS       = :NEW.PAIS,
						 CONTATO    = :NEW.CONTATO,
						 TELEFONE1  = :NEW.TELEFONE1,
						 TELEFONE2  = :NEW.TELEFONE2,
						 REDUZIDO   = :NEW.REDUZIDO,
						 E_MAIL     = :NEW.EMAIL,
						 EMB_BAIRRO = SUBSTR(:NEW.CLI_BAIRRO,1,40)
			 WHERE CLI_CODIGO_REF = :NEW.codigo;


      IF NVL(:NEW.ORIGEM,999) != NVL(:OLD.ORIGEM,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ORIGEM FOI ALTERADO DE "' || :OLD.ORIGEM || '" PARA "' || :NEW.ORIGEM || '",<BR>';
      END IF;
      IF NVL(:NEW.CLIENTE,999) != NVL(:OLD.CLIENTE,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CLIENTE FOI ALTERADO DE "' || :OLD.CLIENTE || '" PARA "' || :NEW.CLIENTE || '",<BR>';
      END IF;
      IF NVL(:NEW.REDUZIDO,999) != NVL(:OLD.REDUZIDO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO REDUZIDO FOI ALTERADO DE "' || :OLD.REDUZIDO || '" PARA "' || :NEW.REDUZIDO || '",<BR>';
      END IF;
      IF NVL(:NEW.ENDERECO1,999) != NVL(:OLD.ENDERECO1,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ENDERECO1 FOI ALTERADO DE "' || :OLD.ENDERECO1 || '" PARA "' || :NEW.ENDERECO1 || '",<BR>';
      END IF;
      IF NVL(:NEW.ENDERECO2,999) != NVL(:OLD.ENDERECO2,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ENDERECO2 FOI ALTERADO DE "' || :OLD.ENDERECO2 || '" PARA "' || :NEW.ENDERECO2 || '",<BR>';
      END IF;
      IF NVL(:NEW.ENDERECO3,999) != NVL(:OLD.ENDERECO3,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ENDERECO3 FOI ALTERADO DE "' || :OLD.ENDERECO3 || '" PARA "' || :NEW.ENDERECO3 || '",<BR>';
      END IF;
      IF NVL(:NEW.CIDADE,999) != NVL(:OLD.CIDADE,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CIDADE FOI ALTERADO DE "' || :OLD.CIDADE || '" PARA "' || :NEW.CIDADE || '",<BR>';
      END IF;
      IF NVL(:NEW.ESTADO,999) != NVL(:OLD.ESTADO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ESTADO FOI ALTERADO DE "' || :OLD.ESTADO || '" PARA "' || :NEW.ESTADO || '",<BR>';
      END IF;
      IF NVL(:NEW.CEP,999) != NVL(:OLD.CEP,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CEP FOI ALTERADO DE "' || :OLD.CEP || '" PARA "' || :NEW.CEP || '",<BR>';
      END IF;
      IF NVL(:NEW.PAIS,999) != NVL(:OLD.PAIS,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO PAIS FOI ALTERADO DE "' || :OLD.PAIS || '" PARA "' || :NEW.PAIS || '",<BR>';
      END IF;
      IF NVL(:NEW.TELEFONE1,999) != NVL(:OLD.TELEFONE1,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TELEFONE1 FOI ALTERADO DE "' || :OLD.TELEFONE1 || '" PARA "' || :NEW.TELEFONE1 || '",<BR>';
      END IF;
      IF NVL(:NEW.TELEFONE2,999) != NVL(:OLD.TELEFONE2,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TELEFONE2 FOI ALTERADO DE "' || :OLD.TELEFONE2 || '" PARA "' || :NEW.TELEFONE2 || '",<BR>';
      END IF;
      IF NVL(:NEW.FAX,999) != NVL(:OLD.FAX,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO FAX FOI ALTERADO DE "' || :OLD.FAX || '" PARA "' || :NEW.FAX || '",<BR>';
      END IF;
      IF NVL(:NEW.EMAIL,999) != NVL(:OLD.EMAIL,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO EMAIL FOI ALTERADO DE "' || :OLD.EMAIL || '" PARA "' || :NEW.EMAIL || '",<BR>';
      END IF;
      IF :NEW.LIMITECR != :OLD.LIMITECR THEN
        v_log_cliente := v_log_cliente || 'O CAMPO LIMITE DE CRùDITO A PRAZO FOI ALTERADO DE "' || :OLD.LIMITECR || '" PARA "' || :NEW.LIMITECR || '",<BR>';
      END IF;
      IF NVL(:NEW.FLAGSUSPEN,999) != NVL(:OLD.FLAGSUSPEN,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO FLAGSUSPEN FOI ALTERADO DE "' || :OLD.FLAGSUSPEN || '" PARA "' || :NEW.FLAGSUSPEN || '",<BR>';
      END IF;
      IF NVL(:NEW.FLAGCOBRA,999) != NVL(:OLD.FLAGCOBRA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO FLAGCOBRA FOI ALTERADO DE "' || :OLD.FLAGCOBRA || '" PARA "' || :NEW.FLAGCOBRA || '",<BR>';
      END IF;
      IF NVL(:NEW.FLAGMULTA,999) != NVL(:OLD.FLAGMULTA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO FLAGMULTA FOI ALTERADO DE "' || :OLD.FLAGMULTA || '" PARA "' || :NEW.FLAGMULTA || '",<BR>';
      END IF;
      IF NVL(:NEW.TAXAMULTA,999) != NVL(:OLD.TAXAMULTA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TAXA MULTA FOI ALTERADO DE "' || :OLD.TAXAMULTA || '" PARA "' || :NEW.TAXAMULTA || '",<BR>';
      END IF;
      IF NVL(:NEW.FORMAEMBAR,999) != NVL(:OLD.FORMAEMBAR,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO FORMA EMBARQUE FOI ALTERADO DE "' || :OLD.FORMAEMBAR || '" PARA "' || :NEW.FORMAEMBAR || '",<BR>';
      END IF;
      IF NVL(:NEW.SHIP_VIA,999) != NVL(:OLD.SHIP_VIA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TRANSPORTADORA FOI ALTERADO DE "' || :OLD.SHIP_VIA || '" PARA "' || :NEW.SHIP_VIA || '",<BR>';
      END IF;
      IF NVL(:NEW.CLASSE,999) != NVL(:OLD.CLASSE,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CLASSE FOI ALTERADO DE "' || :OLD.CLASSE || '" PARA "' || :NEW.CLASSE || '",<BR>';
      END IF;
      IF NVL(:NEW.ENTREGA,999) != NVL(:OLD.ENTREGA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ENTREGA FOI ALTERADO DE "' || :OLD.ENTREGA || '" PARA "' || :NEW.ENTREGA || '",<BR>';
      END IF;
      IF NVL(:NEW.COBRANCA,999) != NVL(:OLD.COBRANCA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO COBRANCA FOI ALTERADO DE "' || :OLD.COBRANCA || '" PARA "' || :NEW.COBRANCA || '",<BR>';
      END IF;
      IF NVL(:NEW.TERRITORIO,999) != NVL(:OLD.TERRITORIO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TERRITORIO FOI ALTERADO DE "' || :OLD.TERRITORIO || '" PARA "' || :NEW.TERRITORIO || '",<BR>';
      END IF;
      IF NVL(:NEW.VENDEDOR,999) != NVL(:OLD.VENDEDOR,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO VENDEDOR FOI ALTERADO DE "' || :OLD.VENDEDOR || '" PARA "' || :NEW.VENDEDOR || '",<BR>';
      END IF;
      IF NVL(:NEW.COMEN_FAT,999) != NVL(:OLD.COMEN_FAT,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO COMEN_FAT FOI ALTERADO DE "' || :OLD.COMEN_FAT || '" PARA "' || :NEW.COMEN_FAT || '",<BR>';
      END IF;
      IF NVL(:NEW.COMEN_COBR,999) != NVL(:OLD.COMEN_COBR,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO COMEN_COBR FOI ALTERADO DE "' || :OLD.COMEN_COBR || '" PARA "' || :NEW.COMEN_COBR || '",<BR>';
      END IF;
      IF NVL(:NEW.CGC,999) != NVL(:OLD.CGC,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CGC FOI ALTERADO DE "' || :OLD.CGC || '" PARA "' || :NEW.CGC || '",<BR>';
      END IF;
      IF NVL(:NEW.INSCR_EST,999) != NVL(:OLD.INSCR_EST,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO INSCRIùùO ESTADUAL FOI ALTERADO DE "' || :OLD.INSCR_EST || '" PARA "' || :NEW.INSCR_EST || '",<BR>';
      END IF;
      IF NVL(:NEW.BLOQUEADO,999) != NVL(:OLD.BLOQUEADO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO BLOQUEADO FOI ALTERADO DE "' || :OLD.BLOQUEADO || '" PARA "' || :NEW.BLOQUEADO || '",<BR>';
      END IF;
      IF NVL(:NEW.CONTATO,999) != NVL(:OLD.CONTATO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CONTATO FOI ALTERADO DE "' || :OLD.CONTATO || '" PARA "' || :NEW.CONTATO || '",<BR>';
      END IF;
      IF NVL(:NEW.CONTATOTEC,999) != NVL(:OLD.CONTATOTEC,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CONTATO TECNICO FOI ALTERADO DE "' || :OLD.CONTATOTEC || '" PARA "' || :NEW.CONTATOTEC || '",<BR>';
      END IF;
      IF NVL(:NEW.CONTATOFIN,999) != NVL(:OLD.CONTATOFIN,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CONTATO FINANCEIRO FOI ALTERADO DE "' || :OLD.CONTATOFIN || '" PARA "' || :NEW.CONTATOFIN || '",<BR>';
      END IF;
      IF NVL(:NEW.DESC_MAX,999) != NVL(:OLD.DESC_MAX,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO DESCONTO MAXIMO FOI ALTERADO DE "' || :OLD.DESC_MAX || '" PARA "' || :NEW.DESC_MAX || '",<BR>';
      END IF;
      IF NVL(:NEW.HOMEPAGE,999) != NVL(:OLD.HOMEPAGE,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO HOMEPAGE FOI ALTERADO DE "' || :OLD.HOMEPAGE || '" PARA "' || :NEW.HOMEPAGE || '",<BR>';
      END IF;
      IF NVL(:NEW.TIPO,999) != NVL(:OLD.TIPO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TIPO FOI ALTERADO DE "' || :OLD.TIPO || '" PARA "' || :NEW.TIPO || '",<BR>';
      END IF;
      IF NVL(:NEW.TIPOEMP,999) != NVL(:OLD.TIPOEMP,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TIPO EMPRESA FOI ALTERADO DE "' || :OLD.TIPOEMP || '" PARA "' || :NEW.TIPOEMP || '",<BR>';
      END IF;
      IF NVL(:NEW.VENCPROG,999) != NVL(:OLD.VENCPROG,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO VENCIMENTO PROGRAMADO FOI ALTERADO DE "' || :OLD.VENCPROG || '" PARA "' || :NEW.VENCPROG || '",<BR>';
      END IF;
      IF NVL(:NEW.OBSVENC,999) != NVL(:OLD.OBSVENC,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO VENCIMENTO FOI ALTERADO DE "' || :OLD.OBSVENC || '" PARA "' || :NEW.OBSVENC || '",<BR>';
      END IF;
      IF NVL(:NEW.ZONA_FRANCA,999) != NVL(:OLD.ZONA_FRANCA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ZONA FRANCA FOI ALTERADO DE "' || :OLD.ZONA_FRANCA || '" PARA "' || :NEW.ZONA_FRANCA || '",<BR>';
      END IF;
      IF NVL(:NEW.EXPORTACAO,999) != NVL(:OLD.EXPORTACAO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO EXPORTACAO FOI ALTERADO DE "' || :OLD.EXPORTACAO || '" PARA "' || :NEW.EXPORTACAO || '",<BR>';
      END IF;
      IF NVL(:NEW.ISS,999) != NVL(:OLD.ISS,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ISS FOI ALTERADO DE "' || :OLD.ISS || '" PARA "' || :NEW.ISS || '",<BR>';
      END IF;
      IF NVL(:NEW.CCONTABIL,999) != NVL(:OLD.CCONTABIL,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CCONTABIL FOI ALTERADO DE "' || :OLD.CCONTABIL || '" PARA "' || :NEW.CCONTABIL || '",<BR>';
      END IF;
      IF NVL(:NEW.OBSERVA,999) != NVL(:OLD.OBSERVA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO OBSERVAùùO FOI ALTERADO DE "' || :OLD.OBSERVA || '" PARA "' || :NEW.OBSERVA || '",<BR>';
      END IF;
      IF NVL(:NEW.MENSAGEM_BLOQUEIO,999) != NVL(:OLD.MENSAGEM_BLOQUEIO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO MENSAGEM DE BLOQUEIO FOI ALTERADO DE "' || :OLD.MENSAGEM_BLOQUEIO || '" PARA "' || :NEW.MENSAGEM_BLOQUEIO || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_GRUPO,999) != NVL(:OLD.CLI_GRUPO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO GRUPO FOI ALTERADO DE "' || :OLD.CLI_GRUPO || '" PARA "' || :NEW.CLI_GRUPO || '",<BR>';
      END IF;
      IF NVL(:NEW.EMP_CODIGO,999) != NVL(:OLD.EMP_CODIGO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO EMPRESA FOI ALTERADO DE "' || :OLD.EMP_CODIGO || '" PARA "' || :NEW.EMP_CODIGO || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_MONTADOR,999) != NVL(:OLD.CLI_MONTADOR,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO MONTADOR FOI ALTERADO DE "' || :OLD.CLI_MONTADOR || '" PARA "' || :NEW.CLI_MONTADOR || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_VENDEDOR2,999) != NVL(:OLD.CLI_VENDEDOR2,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO VENDEDOR 2 FOI ALTERADO DE "' || :OLD.CLI_VENDEDOR2 || '" PARA "' || :NEW.CLI_VENDEDOR2 || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_COD_MUN_IBGE,999) != NVL(:OLD.CLI_COD_MUN_IBGE,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO MUNICIPIO FOI ALTERADO DE "' || :OLD.CLI_COD_MUN_IBGE || '" PARA "' || :NEW.CLI_COD_MUN_IBGE || '",<BR>';
      END IF;
      IF :NEW.CLI_GRUPO_TRIB != :OLD.CLI_GRUPO_TRIB THEN
        v_log_cliente := v_log_cliente || 'O CAMPO GRUPO TRIBUTARIO FOI ALTERADO DE "' || :OLD.CLI_GRUPO_TRIB || '" PARA "' || :NEW.CLI_GRUPO_TRIB || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_TIPO,999) != NVL(:OLD.CLI_TIPO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TIPO FOI ALTERADO DE "' || :OLD.CLI_TIPO || '" PARA "' || :NEW.CLI_TIPO || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_BAIRRO,999) != NVL(:OLD.CLI_BAIRRO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO BAIRRO FOI ALTERADO DE "' || :OLD.CLI_BAIRRO || '" PARA "' || :NEW.CLI_BAIRRO || '",<BR>';
      END IF;
      IF NVL(:NEW.EST_CODIGO,999) != NVL(:OLD.EST_CODIGO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO ESTADO FOI ALTERADO DE "' || :OLD.EST_CODIGO || '" PARA "' || :NEW.EST_CODIGO || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_CNAE,999) != NVL(:OLD.CLI_CNAE,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CNAE FOI ALTERADO DE "' || :OLD.CLI_CNAE || '" PARA "' || :NEW.CLI_CNAE || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_INSCR_SUFRAMA,999) != NVL(:OLD.CLI_INSCR_SUFRAMA,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO BAIRRO FOI ALTERADO DE "' || :OLD.CLI_INSCR_SUFRAMA || '" PARA "' || :NEW.CLI_INSCR_SUFRAMA || '",<BR>';
      END IF;
      IF NVL(:NEW.CLI_CONTRIBUINTE,999) != NVL(:OLD.CLI_CONTRIBUINTE,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO CONTRIBUINTE FOI ALTERADO DE "' || :OLD.CLI_CONTRIBUINTE || '" PARA "' || :NEW.CLI_CONTRIBUINTE || '",<BR>';
      END IF;
      IF NVL(:NEW.PAI_CODIGO,999) != NVL(:OLD.PAI_CODIGO,999) THEN
        v_log_cliente := v_log_cliente || 'O CAMPO PAI_CODIGO FOI ALTERADO DE "' || :OLD.PAI_CODIGO || '" PARA "' || :NEW.PAI_CODIGO || '",<BR>';
      END IF;
      IF :NEW.CLI_LIMITE_CRV != :OLD.CLI_LIMITE_CRV THEN
        v_log_cliente := v_log_cliente || 'O CAMPO LIMITE CREDITO A VISTA FOI ALTERADO DE "' || :OLD.CLI_LIMITE_CRV || '" PARA "' || :NEW.CLI_LIMITE_CRV || '",<BR>';
      END IF;
      IF :NEW.CLI_PES_TIPO != :OLD.CLI_PES_TIPO THEN
        v_log_cliente := v_log_cliente || 'O CAMPO TIPO PESSOA FOI ALTERADO DE "' || :OLD.CLI_PES_TIPO || '" PARA "' || :NEW.CLI_PES_TIPO || '",<BR>';
      END IF;
      IF :NEW.CLI_RECCOF != :OLD.CLI_RECCOF THEN
        v_log_cliente := v_log_cliente || 'O CAMPO RECOLHE COFINS FOI ALTERADO DE "' || :OLD.CLI_RECCOF || '" PARA "' || :NEW.CLI_RECCOF || '",<BR>';
      END IF;
      IF :NEW.CLI_RECCSLL != :OLD.CLI_RECCSLL THEN
        v_log_cliente := v_log_cliente || 'O CAMPO RECOLHE CSLL FOI ALTERADO DE "' || :OLD.CLI_RECCSLL || '" PARA "' || :NEW.CLI_RECCSLL || '",<BR>';
      END IF;
      IF :NEW.CLI_RECPIS != :OLD.CLI_RECPIS THEN
        v_log_cliente := v_log_cliente || 'O CAMPO RECOLHE PIS FOI ALTERADO DE "' || :OLD.CLI_RECPIS || '" PARA "' || :NEW.CLI_RECPIS || '",<BR>';
      END IF;

    END IF;

    IF UPDATING('BLOQUEADO') THEN

      SELECT NVL(CRS_COD_PROTHEUS,'A')
        INTO v_crs_cod_prot_new
        FROM INTEGRACAO.CLIENTE_RISCO
       WHERE CRS_COD_SIAOS = :NEW.BLOQUEADO;

      IF v_crs_cod_prot_new = 'B' THEN
        :NEW.LIMITECR := 0;
      ELSIF v_crs_cod_prot_new != 'A' AND v_crs_cod_prot_new != 'B' THEN
        :NEW.LIMITECR := 0;
        :NEW.CLI_LIMITE_CRV := 0;
      END IF;

    END IF;

    IF v_log_cliente IS NOT NULL THEN
      n_usu_chapa := SIAOS.PCK_DQANET.SF_USU_CHAPA_USER;
      -- API_SMAR + function antiga devolve 7 (operador PHP). Preferir
      -- c_usuario ja gravado pelo package (chapa do ator Django).
      IF USER = 'API_SMAR' AND n_usu_chapa = 7 THEN
        n_usu_chapa := NULL;
      END IF;
      IF n_usu_chapa IS NULL THEN
        BEGIN
          n_usu_chapa := TO_NUMBER(TRIM(:NEW.USUARIO));
        EXCEPTION WHEN OTHERS THEN
          n_usu_chapa := NULL;
        END;
      END IF;
      IF n_usu_chapa IS NOT NULL THEN
        :NEW.USUARIO := n_usu_chapa;
        BEGIN
          INSERT
            INTO LOG_CLIENTE(CODIGO, LCL_DATA, USU_CHAPA, LCL_TEXTO)
          VALUES (:NEW.CODIGO, SYSDATE, n_usu_chapa, SUBSTR(v_log_cliente,1,2000));
        EXCEPTION WHEN OTHERS THEN
          NULL;
        END;
      END IF;
    END IF;

END TG_B_IU_CLIENTE;
/
