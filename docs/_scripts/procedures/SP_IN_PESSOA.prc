CREATE OR REPLACE PROCEDURE SIAOS.SP_IN_PESSOA(
      v_nome       IN  SIAOS.PESSOA.PES_NOME%TYPE,
      v_email      IN  SIAOS.PESSOA.PES_EMAIL%TYPE,
      n_codigo     IN  SIAOS.PESSOA.PES_NUMERO%TYPE,
      n_pes_sexo   IN  SIAOS.PESSOA.PES_SEXO%TYPE,
      n_pes_codigo OUT SIAOS.PESSOA.PES_NUMERO%TYPE) IS
BEGIN

  IF n_codigo IS NOT NULL THEN

    IF v_email IS NOT NULL THEN
      UPDATE SIAOS.PESSOA
         SET PES_NOME = v_nome,
             PES_EMAIL = v_email
       WHERE PESSOA.PES_NUMERO = n_codigo;
    ELSE
      UPDATE SIAOS.PESSOA
         SET PES_NOME = v_nome
       WHERE PESSOA.PES_NUMERO = n_codigo;
    END IF;
    
    n_pes_codigo := n_codigo;

  ELSE  

    BEGIN

      INSERT INTO SIAOS.PESSOA (PES_NOME,PES_EMAIL,PES_SEXO,PES_ATIVO)
           VALUES (v_nome,v_email,n_pes_sexo,1)
      RETURNING PESSOA.PES_NUMERO
           INTO n_pes_codigo;

    EXCEPTION WHEN OTHERS THEN
      RAISE_APPLICATION_ERROR(-20010, 'ERRO AO INSERIR PESSOA');
    END;
  
  END IF;
  
END SP_IN_PESSOA;
/
