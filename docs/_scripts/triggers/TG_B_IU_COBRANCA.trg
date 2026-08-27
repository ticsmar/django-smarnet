-- Compilar como SIAOS (API_SMAR toma ORA-01031).
-- Pre-requisito: PCK_DQANET.pck (SF_USU_CHAPA_USER).

CREATE OR REPLACE TRIGGER SIAOS.TG_B_IU_COBRANCA
  BEFORE INSERT OR UPDATE ON COBRANCA
  FOR EACH ROW
DECLARE
    v_log_cliente   SIAOS.LOG_CLIENTE.LCL_TEXTO%TYPE;
    n_usu_chapa     SIAOS.USUARIO.USU_CHAPA%TYPE;
BEGIN

  IF INSERTING THEN
    IF :NEW.CHAVECOBRA != 'COBRAN001' THEN
      v_log_cliente := 'COBRANCA CADASTRADO: ' || :NEW.CHAVECOBRA || '.<BR>';
    ELSE
      IF :NEW.CLI_CODIGO_REF IS NULL THEN
        :NEW.CLI_CODIGO_REF := :NEW.CODIGO;
      END IF;
    END IF;
		FOR c_cur IN (SELECT *
                    FROM CLIENTE C
									 WHERE C.CODIGO = :NEW.CLI_CODIGO_REF)
		LOOP
			:NEW.NOME       := c_cur.CLIENTE;
			:NEW.ENDERECO1  := c_cur.ENDERECO1;
			:NEW.ENDERECO2  := c_cur.ENDERECO2;
			:NEW.ENDERECO3  := c_cur.ENDERECO3;
			:NEW.CIDADE     := c_cur.CIDADE;
			:NEW.ESTADO     := c_cur.ESTADO;
			:NEW.CEP        := c_cur.CEP;
			:NEW.PAIS       := c_cur.PAIS;
			:NEW.CONTATO    := c_cur.CONTATO;
			:NEW.TELEFONE1  := c_cur.TELEFONE1;
			:NEW.TELEFONE2  := c_cur.TELEFONE2;
			:NEW.REDUZIDO   := c_cur.REDUZIDO;
			:NEW.E_MAIL     := c_cur.EMAIL;
			:NEW.COB_BAIRRO := SUBSTR(c_cur.CLI_BAIRRO,1,40);
			:NEW.CLI_CODIGO_REF := c_cur.codigo;
	  END LOOP;
  END IF;
  IF UPDATING THEN
    IF :OLD.CHAVECOBRA IS NOT NULL AND :OLD.NOME IS NOT NULL THEN
      IF NVL(:NEW.NOME,999) != NVL(:OLD.NOME,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO NOME ALTERADO DE "' || :OLD.NOME || '" PARA "' || :NEW.NOME || '",<BR>';
      END IF;
      IF NVL(:NEW.ENDERECO1,999) != NVL(:OLD.ENDERECO1,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO ENDERECO1 ALTERADO DE "' || :OLD.ENDERECO1 || '" PARA "' || :NEW.ENDERECO1 || '",<BR>';
      END IF;
      IF NVL(:NEW.ENDERECO2,999) != NVL(:OLD.ENDERECO2,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  ENDERECO2 ALTERADO DE "' || :OLD.ENDERECO2 || '" PARA "' || :NEW.ENDERECO2 || '",<BR>';
      END IF;
      IF NVL(:NEW.ENDERECO3,999) != NVL(:OLD.ENDERECO3,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  ENDERECO3 ALTERADO DE "' || :OLD.ENDERECO3 || '" PARA "' || :NEW.ENDERECO3 || '",<BR>';
      END IF;
      IF NVL(:NEW.CIDADE,999) != NVL(:OLD.CIDADE,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  CIDADE ALTERADO DE "' || :OLD.CIDADE || '" PARA "' || :NEW.CIDADE || '",<BR>';
      END IF;
      IF NVL(:NEW.ESTADO,999) != NVL(:OLD.ESTADO,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  ESTADO ALTERADO DE "' || :OLD.ESTADO || '" PARA "' || :NEW.ESTADO || '",<BR>';
      END IF;
      IF NVL(:NEW.CEP,999) != NVL(:OLD.CEP,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  CEP ALTERADO DE "' || :OLD.CEP || '" PARA "' || :NEW.CEP || '",<BR>';
      END IF;
      IF NVL(:NEW.PAIS,999) != NVL(:OLD.PAIS,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  PAIS ALTERADO DE "' || :OLD.PAIS || '" PARA "' || :NEW.PAIS || '",<BR>';
      END IF;
      IF NVL(:NEW.CONTATO,999) != NVL(:OLD.CONTATO,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  CONTATO ALTERADO DE "' || :OLD.CONTATO || '" PARA "' || :NEW.CONTATO || '",<BR>';
      END IF;
      IF NVL(:NEW.TELEFONE1,999) != NVL(:OLD.TELEFONE1,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  TELEFONE1 ALTERADO DE "' || :OLD.TELEFONE1 || '" PARA "' || :NEW.TELEFONE1 || '",<BR>';
      END IF;
      IF NVL(:NEW.TELEFONE2,999) != NVL(:OLD.TELEFONE2,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  TELEFONE2 ALTERADO DE "' || :OLD.TELEFONE2 || '" PARA "' || :NEW.TELEFONE2 || '",<BR>';
      END IF;
      IF NVL(:NEW.REDUZIDO,999) != NVL(:OLD.REDUZIDO,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  REDUZIDO ALTERADO DE "' || :OLD.REDUZIDO || '" PARA "' || :NEW.REDUZIDO || '",<BR>';
      END IF;
      IF NVL(:NEW.E_MAIL,999) != NVL(:OLD.E_MAIL,999) THEN
        v_log_cliente := v_log_cliente || 'A COBRANCA ' || :NEW.CHAVECOBRA || ' TEVE CAMPO  EMAIL ALTERADO DE "' || :OLD.E_MAIL || '" PARA "' || :NEW.E_MAIL || '",<BR>';
      END IF;
    END IF;

		UPDATE PROTPROD.SA1010 S
			 SET A1_ENDCOB   = SUBSTR(NVL(SIAOS.PCK_DQANET.SF_REMOVE_ACENTOS2(:NEW.ENDERECO1,2),' '),1,60),
					 A1_BAIRROC  = SUBSTR(NVL(SIAOS.PCK_DQANET.SF_REMOVE_ACENTOS2(:NEW.COB_BAIRRO,2),' '),1,40),
					 A1_CEPC     = SUBSTR(NVL(SUBSTR(REGEXP_REPLACE(:NEW.CEP,'[^[:digit:]]'),1,8),' '),1,8),
					 A1_MUNC     = SUBSTR(NVL(SIAOS.PCK_DQANET.SF_REMOVE_ACENTOS2(:NEW.CIDADE,2),' '),1,60),
					 A1_ESTC     = SUBSTR(NVL(SIAOS.PCK_DQANET.SF_REMOVE_ACENTOS2(:NEW.ESTADO,2),' '),1,2)
		 WHERE S.A1_COD    = LPAD(:NEW.CLI_CODIGO_REF,6,0);

  END IF;

  IF v_log_cliente IS NOT NULL THEN
    n_usu_chapa := SIAOS.PCK_DQANET.SF_USU_CHAPA_USER;
    IF USER = 'API_SMAR' AND n_usu_chapa = 7 THEN
      n_usu_chapa := NULL;
    END IF;
    IF n_usu_chapa IS NOT NULL THEN
      INSERT
        INTO LOG_CLIENTE(CODIGO, LCL_DATA, USU_CHAPA, LCL_TEXTO)
      VALUES (:NEW.CODIGO, SYSDATE, n_usu_chapa, v_log_cliente);
    END IF;
  END IF;

END TG_B_IU_COBRANCA;
/
