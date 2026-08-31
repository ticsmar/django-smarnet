CREATE OR REPLACE PACKAGE SIAOS.PCK_SMART_SALES3 IS

  clb_texto_gl CLOB;
  n_prp_codigo SIAOS.PROPOSTA.PRP_CODIGO%TYPE;

  PROCEDURE SP_NOVA_PROPOSTA(v_login      IN SIAOS.PROPOSTA.LOGIN%TYPE,
                             n_usu_chapa  IN SIAOS.PROPOSTA.USU_CHAPA%TYPE,
                             n_cliente    IN SIAOS.PROPOSTA.CLI_CODIGO%TYPE,
                             v_ori_codigo IN OUT SIAOS.ORIGEM.ORIGEM%TYPE,
                             n_proposta   OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_APAGA_PROPOSTA(n_proposta IN INTEGER, n_chapa IN INTEGER);

  PROCEDURE SP_APAGA_PRODUTO(n_ipr_cod IN INTEGER);

  PROCEDURE SP_UP_CLIENTE(n_proposta IN INTEGER, n_cliente IN INTEGER);

  PROCEDURE SP_UP_CLIENTE_FIM(n_proposta IN INTEGER, n_cliente IN INTEGER);

  PROCEDURE SP_CLIENTE_TEMP(n_operacao        IN INTEGER,
                            n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            c_ori_codigo      IN SIAOS.PROPOSTA.ORI_CODIGO%TYPE,
                            vc2_cte_nome      IN SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE,
                            vc2_cte_endereco1 IN SIAOS.CLIENTE_TEMP.CTE_ENDERECO1%TYPE,
                            vc2_cte_endereco2 IN SIAOS.CLIENTE_TEMP.CTE_ENDERECO2%TYPE,
                            vc2_cte_endereco3 IN SIAOS.CLIENTE_TEMP.CTE_ENDERECO3%TYPE,
                            vc2_cte_cidade    IN SIAOS.CLIENTE_TEMP.CTE_CIDADE%TYPE,
                            n_est_codigo      IN SIAOS.CLIENTE_TEMP.EST_CODIGO%TYPE,
                            vc2_cte_estado    IN SIAOS.CLIENTE_TEMP.CTE_ESTADO%TYPE,
                            n_pai_codigo      IN SIAOS.CLIENTE_TEMP.PAI_CODIGO%TYPE,
                            vc2_cte_cep       IN SIAOS.CLIENTE_TEMP.CTE_CEP%TYPE,
                            vc2_cte_telefone  IN SIAOS.CLIENTE_TEMP.CTE_TELEFONE%TYPE,
                            vc2_cte_fax       IN SIAOS.CLIENTE_TEMP.CTE_FAX%TYPE,
                            vc2_cte_email     IN SIAOS.CLIENTE_TEMP.CTE_EMAIL%TYPE,
                            vc2_cte_cgc       IN SIAOS.CLIENTE_TEMP.CTE_CGC%TYPE,
                            vc2_cte_ie        IN SIAOS.CLIENTE_TEMP.CTE_IE%TYPE);

  PROCEDURE SP_SE_PRODUTO1(n_prp_codigo     IN INTEGER,
                           v_pro_codigo     OUT VARCHAR2,
                           v_ipr_item       OUT VARCHAR2,
                           v_ipr_classe     OUT VARCHAR2,
                           n_ipr_quantidade OUT INTEGER,
                           n_ipr_item_prop  OUT INTEGER,
                           n_total_grupo    OUT INTEGER);

  PROCEDURE SP_IN_PRODUTO1(n_prp_codigo     IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           c_pro_codigo     IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                           n_ipr_quantidade IN SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE,
                           n_ipr_semana_ent IN SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE,
                           v_ipr_diversos   IN SIAOS.ITEM_PROP.IPR_DIVERSOS%TYPE,
                           n_ipr_nao_fab    IN SIAOS.ITEM_PROP.IPR_NAO_FAB%TYPE,
                           n_ipr_item       IN SIAOS.ITEM_PROP.IPR_ITEM%TYPE,
                           n_pas_codigo     IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE,
                           n_mpe_codigo     IN SIAOS.ITEM_PROP_UNI.MPE_CODIGO%TYPE,
                           n_ipr_item_prop  OUT SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE);

  PROCEDURE SP_IN_PRODUTO2(n_prp_codigo     IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           n_sensor         IN SIAOS.ITEM_PROP.SENSOR%TYPE,
                           c_pro_codigo     IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                           c_ipr_item       IN SIAOS.ITEM_PROP.IPR_ITEM%TYPE,
                           c_ipr_classe     IN SIAOS.ITEM_PROP.IPR_CLASSE%TYPE,
                           n_ipr_item_prop  IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_ipr_quantidade IN SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE,
                           v_mpe_codigo     IN SUPRIMENTO.MATERIAL_PECA.MPE_CODIGO%TYPE,
                           n_erro           OUT INTEGER);

  PROCEDURE SP_IN_PRODUTO3(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           n_serie         IN SIAOS.ITEM_PROP.IPR_N_SERIE%TYPE,
                           c_pro_codigo    IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                           c_ipr_item      IN SIAOS.ITEM_PROP.IPR_ITEM%TYPE,
                           n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_ipr_codigo    OUT SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                           n_erro          OUT INTEGER);

  PROCEDURE SP_IN_SELO_REMO(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                            c_pro_codigo    IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                            n_ipr_selo_lado IN SIAOS.ITEM_PROP.IPR_SELO_LADO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_pas_codigo    IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE,
                            /*      n_ipr_semana_ent    IN   ITEM_PROP.IPR_SEMANA_ENT%TYPE,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              n_ipr_dt_ent        IN   VARCHAR2,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
                            n_ipr_item_prop_sr OUT SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE);

  PROCEDURE SP_IN_DADOS_OP(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_erro          OUT INTEGER);

  PROCEDURE SP_IN_DADOS_OP1(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_erro          OUT INTEGER);

  PROCEDURE SP_IN_DADOS_OP2(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_erro          OUT INTEGER);

  PROCEDURE SP_IN_DADOS_OP3(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_erro          OUT INTEGER);

  PROCEDURE SP_SE_DADOS_ITEM(n_prp_codigo     IN INTEGER,
                             n_ipr_item_prop  IN INTEGER,
                             v2_ipr_item_prop OUT VARCHAR2,
                             v2_qtd           OUT VARCHAR2,
                             v2_produto       OUT VARCHAR2,
                             v2_ipr_obs       OUT VARCHAR2,
                             v2_familia       OUT VARCHAR2,
                             v2_desc_port     OUT VARCHAR2,
                             v2_desc_ingl     OUT VARCHAR2);

  PROCEDURE SP_CAD_ITEM_DIV(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE,
                            n_ipi_codigo    IN OUT SIAOS.ITEM_PROP_DIV.IPI_CODIGO%TYPE,
                            v_ipi_descricao IN SIAOS.ITEM_PROP_DIV.IPI_DESCRICAO%TYPE,
                            n_ipi_oculta    IN SIAOS.ITEM_PROP_DIV.IPI_OCULTA%TYPE);

  PROCEDURE SP_UP_PRO_ITEM(n_prp_codigo    IN INTEGER,
                           c_ipr_item      IN CHAR,
                           c_ipr_obs       IN CHAR,
                           n_ipr_item_prop IN INTEGER,
                           c_iop_nserie    IN VARCHAR2);

  PROCEDURE SP_UP_PRO_CLAS(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           c_pro_codigo    IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                           n_ipr_classe    IN SIAOS.ITEM_PROP.IPR_CLASSE%TYPE,
                           c_ipr_obs       IN SIAOS.ITEM_PROP.IPR_OBS%TYPE,
                           n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE);

  PROCEDURE SP_UP_PRECO_MOEDA(n_prp_codigo IN PROPOSTA.PRP_CODIGO%TYPE,
                              c_ifi_codigo IN PROPOSTA.IFI_CODIGO%TYPE);

  PROCEDURE SP_UP_PRO_PRECO(n_prp_codigo     IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                            n_ipr_item_prop  IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_ipr_preco      IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                            n_ipr_venda_fim2 IN SIAOS.ITEM_PROP.IPR_VENDA_FIM%TYPE,
                            n_ipr_venda_cli2 IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                            n_ipr_adicional  IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                            n_ipr_desconto   IN SIAOS.ITEM_PROP.IPR_DESCONTO%TYPE,
                            n_ipr_desc_fim2  IN SIAOS.ITEM_PROP.IPR_DESC_FIM%TYPE,
                            n_ipr_desc_cli2  IN SIAOS.ITEM_PROP.IPR_DESC_CLI%TYPE,
                            n_ipr_antecipa   IN SIAOS.ITEM_PROP.IPR_ANTECIPA%TYPE,
                            n_ipr_fatura     IN SIAOS.ITEM_PROP.IPR_FATURA%TYPE,
                            n_ipr_semana_ent IN SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE,
                            v_ipr_dt_entrega IN VARCHAR2,
                            v_ipr_pedido     IN SIAOS.ITEM_PROP.IPR_PEDIDO%TYPE,
                            v_ipr_dt_pedido  IN VARCHAR2,
                            v_ipr_cons_prazo IN SIAOS.ITEM_PROP.IPR_CONS_PRAZO%TYPE,
                            v_ipr_obs        IN SIAOS.ITEM_PROP.IPR_OBS%TYPE,
                            d_ipr_dt_contrat IN VARCHAR2,
                            v_ipr_prop_fil   IN SIAOS.ITEM_PROP.IPR_PROP_FIL%TYPE,
                            v_ipr_os_fil     IN SIAOS.ITEM_PROP.IPR_OS_FIL%TYPE,
                            v_tipo           IN SIAOS.ITEM_PROP.TIPO%TYPE,
                            n_ipr_refugo     IN SIAOS.ITEM_PROP.IPR_REFUGO%TYPE,
                            n_ipr_os_rev     IN SIAOS.ITEM_PROP.IPR_OS_REV%TYPE,
                            n_ipr_item_rev   IN SIAOS.ITEM_PROP.IPR_ITEM_REV%TYPE,
                            n_ipr_nao_fab    IN SIAOS.ITEM_PROP.IPR_NAO_FAB%TYPE,
                            n_copia          IN INTEGER,
                            n_qtd            IN INTEGER,
                            n_ipu_valor_cot  IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                            n_ipu_oculto     IN SIAOS.ITEM_PROP_UNI.IPU_OCULTO%TYPE,
                            n_ipu_oculta_qtd IN SIAOS.ITEM_PROP_UNI.IPU_OCULTA_QTD%TYPE,
                            c_tes_recno      IN SIAOS.ITEM_PROP_UNI.TES_RECNO%TYPE,
                            n_msv_codigo     IN SIAOS.ITEM_PROP_UNI.MSV_CODIGO%TYPE);

  PROCEDURE SP_GRAVA_DESCONTO(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                              n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                              n_porcentual    IN NUMBER);

  PROCEDURE SP_UP_PRO_CALIBRA(n_ipr_codigo IN NUMBER);

  PROCEDURE SP_UP_PRO_CALIBRA2(n_prp_codigo    IN INTEGER,
                               n_ipr_item_prop IN INTEGER,
                               v_ipr_obs       IN VARCHAR2);

  PROCEDURE SP_UP_PRO_CALIBRA3(n_ipr_codigo IN SIAOS.ITEM_PROP_DADO.IPR_CODIGO%TYPE,
                               v_status     IN SIAOS.ITEM_PROP_DADO.STATUS%TYPE,
                               v_tipo       IN SIAOS.ITEM_PROP_DADO.IPD_TIPO%TYPE,
                               n_ipd_valor  IN SIAOS.ITEM_PROP_DADO.IPD_VALOR_DADO%TYPE,
                               n_nroclas    IN SIAOS.ITEM_PROP_DADO.NROCLAS%TYPE,
                               v_opclas     IN SIAOS.ITEM_PROP_DADO.OPCLAS%TYPE,
                               v_valor_dado IN SIAOS.ITEM_PROP_DADO.IPD_VALOR_DADO%TYPE,
                               v_copia      IN VARCHAR2);

  PROCEDURE SP_UP_PRO_N_SERIE(n_ipr_codigo IN ITEM_PROP.IPR_CODIGO%TYPE,
                              v_n_serie    IN ITEM_PROP.IPR_N_SERIE%TYPE,
                              n_erro       OUT INTEGER);

  FUNCTION SF_MASCARA_DO_ITEM(vc2_produto2 IN PRODUTO.PRODUTO%Type,
                              vc2_opcat2   IN Varchar2,
                              vc2_opesp2   IN OELIN.OP_ESP%Type)
    RETURN VARCHAR2;

  FUNCTION SF_RETORNA_SELO(n_prp_codigo    IN ITEM_PROP.PRP_CODIGO%Type,
                           n_prp_item_prop IN ITEM_PROP.IPR_ITEM_PROP%Type)
    RETURN NUMBER;

  PROCEDURE SP_APAGA_ITREF(n_prp_codigo    IN ITEM_PROP.PRP_CODIGO%TYPE,
                           n_prp_item_prop IN ITEM_PROP.IPR_ITEM_PROP%TYPE);

  FUNCTION SF_RETORNA_TIPO_SELO(n_prp_codigo    IN ITEM_PROP.PRP_CODIGO%Type,
                                n_prp_item_prop IN ITEM_PROP.IPR_ITEM_PROP%Type)
    RETURN OPCAO.SELOREMO%Type;

  PROCEDURE SP_GRAVA_DADO_OPERACAO_OELIN(n_control  IN OELIN.CONTROLE%Type,
                                         n_control1 IN ITEM_PROP.IPR_CODIGO%Type);

  FUNCTION SF_VERIFICA_DIVERSOS(n_prp_codigo IN PROPOSTA.PRP_CODIGO%Type)
    RETURN INTEGER;

  FUNCTION SF_VERIFICA_ITEM_PROPOSTA(n_prop      IN PROPOSTA.PRP_CODIGO%Type,
                                     n_item_prop IN ITEM_PROP.IPR_ITEM_PROP%Type)
    RETURN NUMBER;

  FUNCTION SF_DATA_ENTREGA(n_prp_codigo IN PROPOSTA.PRP_CODIGO%Type,
                           n_item_prop  IN ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN NUMBER;

  FUNCTION SF_TEM_ITEM(c_pro_codigo IN PRODUTO.PRODUTO%Type) RETURN NUMBER;

  FUNCTION SF_TEM_CLASSE(c_pro_codigo IN PRODUTO.PRODUTO%Type) RETURN NUMBER;

  FUNCTION SF_TEM_CLASSE2(c_pro_codigo IN PRODUTO.PRODUTO%Type) RETURN NUMBER;

  FUNCTION SF_TEM_DADOS(c_pro_codigo IN SIAOS.DADOSREG.PRODUTO%Type)
    RETURN NUMBER;

  FUNCTION SF_TEM_DADOS2(n_ipr_codigo IN ITEM_PROP.PRP_CODIGO%TYPE,
                         n_ipr_item   IN ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN NUMBER;

  PROCEDURE SP_UP_DIV_OS(n_prp_codigo        IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         c_ori_codigo        IN SIAOS.PROPOSTA.ORI_CODIGO%TYPE,
                         c_fil_codigo        IN SIAOS.PROPOSTA.FIL_CODIGO%TYPE,
                         n_prp_antecipa      IN SIAOS.PROPOSTA.PRP_ANTECIPA%TYPE,
                         n_prp_parcial       IN SIAOS.PROPOSTA.PRP_PARCIAL%TYPE,
                         n_prp_insp_externa  IN SIAOS.PROPOSTA.PRP_INSP_EXTERNA%TYPE,
                         dt_prp_dt_insp      IN VARCHAR2,
                         n_prp_comissao_subs IN SIAOS.PROPOSTA.PRP_COMISSAO_SUBS%TYPE,
                         n_prp_pedido        IN SIAOS.PROPOSTA.PRP_PEDIDO%TYPE,
                         dt_prp_pedido       IN VARCHAR2,
                         n_prp_pedido_receb  IN SIAOS.PROPOSTA.PRP_PEDIDO_RECEBIDO%TYPE,
                         n_emissor           IN SIAOS.PROPOSTA.EMISSOR%TYPE,
                         v_cont_com          IN SIAOS.PROPOSTA.PRP_CONT_COM%TYPE,
                         v_cont_tec          IN SIAOS.PROPOSTA.PRP_CONT_TEC%TYPE,
                         v_cont_fin          IN SIAOS.PROPOSTA.PRP_CONT_FIN%TYPE,
                         n_top_codigo        IN SIAOS.PROPOSTA.TOP_CODIGO%TYPE,
                         v_media_manual      IN SIAOS.PROPOSTA.PRP_MEDIA_MANUAL%TYPE,
                         c_territorio        IN SIAOS.PROPOSTA.TERR_KEY%TYPE,
                         n_prp_validade      IN SIAOS.PROPOSTA.PRP_VALIDADE%TYPE,
                         n_prp_sistema       IN SIAOS.PROPOSTA.PRP_SISTEMA%TYPE,
                         n_prp_desenho_apr   IN SIAOS.PROPOSTA.PRP_DESENHO_APR%TYPE,
                         n_prp_desenho_cer   IN SIAOS.PROPOSTA.PRP_DESENHO_CER%TYPE,
                         n_emp_abertura      IN SIAOS.PROPOSTA.EMP_ABERTURA%TYPE,
                         n_prp_prob_venda    IN SIAOS.PROPOSTA.PRP_PROB_VENDA%TYPE,
                         dt_prp_dt_prob      IN VARCHAR2,
                         n_cve_codigo        IN SIAOS.PROPOSTA.CVE_CODIGO%TYPE,
                         n_mve_codigo        IN SIAOS.PROPOSTA.MVE_CODIGO%TYPE,
                         n_erro              OUT INTEGER);

  PROCEDURE SP_UP_DIV_EMB(n_prp_codigo       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_prp_emb_codigo   IN SIAOS.PROPOSTA.PRP_EMB_CODIGO%TYPE,
                          n_prp_vl_embalagem IN SIAOS.PROPOSTA.PRP_VL_EMBALAGEM%TYPE,
                          n_prp_embalagem    IN SIAOS.PROPOSTA.PRP_EMBALAGEM%TYPE,
                          v_prp_transporte   IN SIAOS.PROPOSTA.PRP_TRANSPORTE%TYPE,
                          n_prp_vl_frete     IN SIAOS.PROPOSTA.PRP_VL_FRETE%TYPE,
                          n_erro             OUT INTEGER);

  PROCEDURE SP_UP_DIV_COB(n_prp_codigo       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          v_prp_cob_codigo   IN SIAOS.PROPOSTA.PRP_COB_CODIGO%TYPE,
                          n_prp_reajuste     IN SIAOS.PROPOSTA.PRP_REAJUSTE%TYPE,
                          v_prp_dt_reajuste  IN VARCHAR2,
                          v_ifi_codigo       IN SIAOS.PROPOSTA.IFI_CODIGO%TYPE,
                          n_prp_cambio       IN SIAOS.PROPOSTA.PRP_CAMBIO%TYPE,
                          n_prp_multa        IN SIAOS.PROPOSTA.PRP_MULTA%TYPE,
                          n_prp_finame       IN SIAOS.PROPOSTA.PRP_FINAME%TYPE,
                          n_prp_nota_prom    IN SIAOS.PROPOSTA.PRP_NOTA_PROM%TYPE,
                          n_prp_carta_fianca IN SIAOS.PROPOSTA.PRP_CARTA_FIANCA%TYPE,
                          n_prp_seg_fianca   IN SIAOS.PROPOSTA.PRP_SEG_FIANCA%TYPE,
                          n_prp_porc_produto IN SIAOS.PROPOSTA.PRP_PORC_PRODUTO%TYPE,
                          v_prp_destino      IN SIAOS.PROPOSTA.PRP_DESTINO%TYPE,
                          v_prp_tipo_fatur   IN SIAOS.PROPOSTA.PRP_TIPO_FATUR%TYPE,
                          n_prp_ipi          IN SIAOS.PROPOSTA.PRP_IPI%TYPE,
                          n_prp_icms         IN SIAOS.PROPOSTA.PRP_ICMS%TYPE,
                          n_prp_iss          IN SIAOS.PROPOSTA.PRP_ISS%TYPE,
                          n_erro             OUT INTEGER);

  PROCEDURE SP_UP_DIV_EX(n_prp_codigo        IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         v_prp_subsidiaria   IN SIAOS.PROPOSTA.PRP_SUBSIDIARIA%TYPE,
                         v_prp_repr_direto   IN SIAOS.PROPOSTA.PRP_REPR_DIRETO%TYPE,
                         v_prp_repr_indireto IN SIAOS.PROPOSTA.PRP_REPR_INDIRETO%TYPE,
                         v_prp_forwarder     IN SIAOS.PROPOSTA.PRP_FORWARDER%TYPE,
                         v_prp_porto_emb     IN SIAOS.PROPOSTA.PRP_PORTO_EMB%TYPE,
                         v_prp_porto_dest    IN SIAOS.PROPOSTA.PRP_PORTO_DEST%TYPE,
                         n_prp_ha_invoice    IN SIAOS.PROPOSTA.PRP_HA_INVOICE%TYPE,
                         n_cli_codigo_not    IN SIAOS.PROPOSTA.CLI_CODIGO_NOT%TYPE,
                         n_cli_codigo_con    IN SIAOS.PROPOSTA.CLI_CODIGO_CON%TYPE,
                         v_prp_shipmarks     IN SIAOS.PROPOSTA.PRP_SHIPMARKS%TYPE,
                         n_erro              OUT INTEGER);

  PROCEDURE SP_UP_DIV_NOTA(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           v_prp_nota   IN SIAOS.PROPOSTA.PRP_NOTA%TYPE,
                           n_erro       OUT INTEGER);

  PROCEDURE SP_UP_DIV_OBS(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          v_prp_obs    IN SIAOS.PROPOSTA.PRP_OBS%TYPE,
                          n_erro       OUT INTEGER);

  PROCEDURE SP_IN_MODELO_PAGTO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                               n_mpg_codigo IN SIAOS.MODELO_PAGT.MPG_CODIGO%TYPE,
                               n_erro       OUT INTEGER);

  PROCEDURE SP_IN_PAGAMENTO(n_prp_codigo   IN PROP_PAGTO.PRP_CODIGO%Type,
                            n_fpa_codigo   IN PROP_PAGTO.FPA_CODIGO%Type,
                            v_ppa_tipo     IN PROP_PAGTO.PPA_TIPO%Type,
                            n_ppa_valor    IN PROP_PAGTO.PPA_VALOR%Type,
                            n_ppa_porcento IN PROP_PAGTO.PPA_PORCENTO%Type,
                            n_ppa_data     IN VARCHAR2,
                            n_ppa_dias     IN PROP_PAGTO.PPA_DIAS%Type,
                            n_erro         OUT INTEGER);

  PROCEDURE SP_IN_PAGAMENTO_AUTO(n_prp_codigo   IN SIAOS.PROP_PAGTO.PRP_CODIGO%TYPE,
                                 n_fpa_codigo   IN SIAOS.PROP_PAGTO.FPA_CODIGO%TYPE,
                                 v_ppa_tipo     IN SIAOS.PROP_PAGTO.PPA_TIPO%TYPE,
                                 n_ppa_valor    IN SIAOS.PROP_PAGTO.PPA_VALOR%TYPE,
                                 n_ppa_porcento IN SIAOS.PROP_PAGTO.PPA_PORCENTO%TYPE,
                                 n_ppa_data     IN VARCHAR2,
                                 n_ppa_dias     IN SIAOS.PROP_PAGTO.PPA_DIAS%TYPE,
                                 n_parc         IN INTEGER,
                                 n_dias         IN INTEGER,
                                 n_erro         OUT INTEGER);

  PROCEDURE SP_DL_PAGAMENTO(n_ppa_codigo IN PROP_PAGTO.PPA_CODIGO%TYPE);

  PROCEDURE SP_RESP_CONSULTA_PGTO(n_proposta     IN PROPOSTA.PRP_CODIGO%TYPE,
                                  v_status       IN PROPOSTA.PRP_PGT_STATUS%TYPE,
                                  v_consulta_txt IN CONSULTA.CON_DESCRICAO%TYPE,
                                  n_erro         OUT NUMBER);

  PROCEDURE SP_UP_CONFIRMA(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%Type);

  FUNCTION SF_CHECA_CALIBRACAO(n_num_controle IN ITEM_PROP_DADO.IPR_CODIGO%Type,
                               vc2_unid_cal   IN UNIDADE.UNIDADE%Type,
                               n_val_min      IN OPCAO.VL_MINIMO%Type,
                               n_val_max      IN OPCAO.VL_MAXIMO%Type,
                               n_sistema      IN NUMBER) RETURN NUMBER;

  PROCEDURE SP_INSERE_VENDEDORES(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                 c_vend     IN SIAOS.VENDEDOR_PROP.SALESP_KEY%TYPE,
                                 n_com      IN SIAOS.VENDEDOR_PROP.COMISSAO%TYPE,
                                 n_ven      IN SIAOS.VENDEDOR_PROP.VPR_COMIS_VEND%TYPE,
                                 n_com_pdr  IN SIAOS.VENDEDOR_PROP.VPR_COM_PADRAO%TYPE,
                                 n_pos      IN SIAOS.VENDEDOR_PROP.VPR_CODIGO%TYPE);

  PROCEDURE SP_INSERE_TRANSPORTADORA(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE,
                                     c_tran     IN TRANSP_PROP.SHIP_VIA_KEY%TYPE);

  PROCEDURE SP_APAGA_VENDEDORES(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_APAGA_TRANSPORTADORAS(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE);

  FUNCTION SF_CONF_MASCARA(n_proposta  IN PROPOSTA.PRP_CODIGO%Type,
                           n_item_prop IN ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN VARCHAR2;

  FUNCTION SF_CONF_MASCARA2(n_codigo IN ITEM_PROP.IPR_CODIGO%Type)
    RETURN VARCHAR2;

  PROCEDURE SP_UP_PRODUTO_DESC(n_proposta   IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                               n_item       IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                               v_descricao  IN SIAOS.ITEM_PROP.IPR_DIVERSOS%TYPE,
                               v_mpe_codigo IN SIAOS.ITEM_PROP_UNI.MPE_CODIGO%TYPE,
                               n_qtd        IN SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE);

  FUNCTION SF_VERIFICA_PRE_OS(n_proposta IN ITEM_PROP.PRP_CODIGO%TYPE)
    RETURN NUMBER;

  FUNCTION SF_TABELA_SER(v_produto IN PRODUTO.PRODUTO%TYPE) RETURN NUMBER;

  PROCEDURE SP_GRAVA_ASSINATURAS(n_usuario   IN USUARIO.USU_CHAPA%TYPE,
                                 n_chapa_ass IN USUARIO.USU_CHAPA%TYPE);

  PROCEDURE SP_IN_ASS_PROPOSTA(n_usu_chapa IN PROP_ASSINATURA.USU_CHAPA%TYPE,
                               n_proposta  IN PROP_ASSINATURA.PRP_CODIGO%TYPE,
                               n_operacao  IN PROP_ASSINATURA.PAS_POSICAO%TYPE);

  FUNCTION SF_CHECA_RESERVA(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE)
    RETURN NUMBER;

  PROCEDURE SP_ABRE_OS(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                       n_dist     IN INTEGER,
                       c_acesso   IN CHAR,
                       n_erro     OUT INTEGER);

  PROCEDURE SP_PRAZO_PROPOSTA(n_proposta     IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              n_lote         IN SIAOS.ITEM_PROP.IPR_LOTE%TYPE,
                              n_prazo_prop   OUT VARCHAR,
                              n_prazo_req    OUT VARCHAR,
                              n_prazo_cons   OUT VARCHAR,
                              v_status       OUT VARCHAR,
                              n_prazo_prop_q OUT INTEGER,
                              n_prazo_req_q  OUT INTEGER,
                              n_prazo_cons_q OUT INTEGER);

  PROCEDURE SP_GRAVA_PRAZO(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_lote       IN SIAOS.ITEM_PROP.IPR_LOTE%TYPE,
                           n_sem_req    IN VARCHAR2,
                           n_semanas    IN VARCHAR2,
                           v_dt_req     IN VARCHAR2,
                           n_consultar  IN INTEGER,
                           n_aprova     IN INTEGER,
                           v_dt_contrat IN VARCHAR2,
                           n_erro       OUT VARCHAR2);

  PROCEDURE SP_GRAVA_CONSULTA_PRAZO(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE,
                                    n_semana   IN NUMBER,
                                    n_lote     IN NUMBER,
                                    n_erro     OUT NUMBER);

  PROCEDURE SP_GRAVA_CONS_PRAZO(n_proposta     IN PROPOSTA.PRP_CODIGO%TYPE,
                                c_operacao     IN CHAR,
                                v_consulta_txt IN CONSULTA.CON_DESCRICAO%TYPE,
                                n_cons_prazo   OUT CONSULTA.CON_NUMERO%TYPE,
                                n_erro         OUT NUMBER);

  PROCEDURE SP_GRAVA_CONS_PGTO(n_proposta       IN PROPOSTA.PRP_CODIGO%TYPE,
                               c_operacao       IN CHAR,
                               v_consulta_txt   IN CONSULTA.CON_DESCRICAO%TYPE,
                               n_prp_pgt_status IN SIAOS.PROPOSTA.PRP_PGT_STATUS%TYPE,
                               n_mpg_codigo     IN SIAOS.PROPOSTA.MPG_CODIGO%TYPE,
                               n_cons_prazo     OUT CONSULTA.CON_NUMERO%TYPE,
                               n_erro           OUT NUMBER);

  PROCEDURE SP_GRAVA_CONS_FSVF(n_proposta     IN PROPOSTA.PRP_CODIGO%TYPE,
                               c_operacao     IN CHAR,
                               v_consulta_txt IN CONSULTA.CON_DESCRICAO%TYPE,
                               n_con_numero   OUT CONSULTA.CON_NUMERO%TYPE,
                               n_erro         OUT NUMBER);

  PROCEDURE SP_GRAVA_CONSULTA(n_referencia   IN NUMBER,
                              v_sistema      IN VARCHAR2,
                              c_operacao     IN CHAR,
                              v_consulta_txt IN VARCHAR2,
                              n_cons_tipo    IN CONSULTA.CON_TIPO%TYPE,
                              n_con_numero   OUT VARCHAR2,
                              n_erro         OUT NUMBER);

  FUNCTION SF_STATUS_CONS(n_proposta  IN PROPOSTA.PRP_CODIGO%TYPE,
                          n_cons_tipo IN CONSULTA.CON_TIPO%TYPE) RETURN CHAR;

  PROCEDURE SP_GRAVA_DT_SER(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE,
                            n_lote     IN INTEGER,
                            v_data_ser IN VARCHAR2,
                            v_data_con IN VARCHAR2,
                            n_erro     OUT INTEGER);

  PROCEDURE SP_ALTERA_LOTE(n_prop      IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           n_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_codigo    IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                           n_lote_e    IN SIAOS.ITEM_PROP.IPR_LOTE%TYPE,
                           n_lote_s    IN SIAOS.ITEM_PROP.IPR_LOTE%TYPE,
                           v_qtd       IN SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE,
                           n_sistema   IN INTEGER,
                           n_erro      OUT INTEGER);

  FUNCTION SF_DIFERENCA_SEMANA(
    n_semana IN NUMBER,
    n_prometida IN NUMBER := 1) 
   RETURN NUMBER;

  FUNCTION SF_ST_PROP_CONSULTA(n_prop IN INTEGER) RETURN VARCHAR2;

  FUNCTION SF_ST_CONSULTA_PRAZO(n_prop IN INTEGER) RETURN VARCHAR2;

  FUNCTION SF_ST_CTRL_FSVF(n_ctrl IN NUMBER, n_tabela IN INTEGER)
    RETURN VARCHAR2;

  FUNCTION SF_ST_PROP_FSVF(n_prop IN INTEGER) RETURN VARCHAR2;

  FUNCTION SF_ST_FSVF(n_prop IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE)
    RETURN VARCHAR2;

  FUNCTION SF_ST_FSRF(n_prop IN INTEGER) RETURN VARCHAR2;

  FUNCTION SF_PESO_ITEM(n_prop IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                        n_item IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE)
    RETURN INTEGER;

  FUNCTION SF_RETORNA_SEMANA(n_qtde_semana IN INTEGER) RETURN VARCHAR2;

  PROCEDURE SP_ATUALIZA_STATUS(n_proposta IN INTEGER);

  PROCEDURE SP_SALVA_REVISAO(n_proposta IN INTEGER, n_is_set IN INTEGER);

  PROCEDURE SP_TRAVA_REVISAO(n_proposta IN INTEGER, n_chapa IN INTEGER);

  FUNCTION SF_BLOQUEIA_PROP(n_proposta IN INTEGER) RETURN INTEGER;

  PROCEDURE SP_CANCELA_PROPOSTA(n_proposta IN INTEGER,
                                n_chapa    IN INTEGER,
                                n_motivo   IN INTEGER,
                                v_recado   IN VARCHAR2);

  FUNCTION SF_MP_PRODUTO(n_material IN SUPRIMENTO.MATERIAL_PECA.MPE_CODIGO%TYPE,
                         n_tipo     IN INTEGER) RETURN VARCHAR2;

  FUNCTION SF_VALOR_POR_TIPO(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_revisao  IN SIAOS.PROPOSTA.PRP_REVISAO%TYPE,
                             n_tipo     IN INTEGER) -- 1-EQUIPAMENTO, 2-SERVIÇOS, 3-SOFTWARE, 4-EMBALAGEM
   RETURN NUMBER;
   
  FUNCTION SF_VALOR_POR_TIPO_FIM(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_revisao  IN SIAOS.PROPOSTA.PRP_REVISAO%TYPE,
                             n_tipo     IN INTEGER) -- 1-EQUIPAMENTO, 2-SERVIÇOS, 3-SOFTWARE, 4-EMBALAGEM
  RETURN NUMBER;

  FUNCTION SF_RETORNA_DET_ITEM(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                               n_item     IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                               n_rev      IN INTEGER,
                               n_set      IN INTEGER) RETURN CLOB;

  FUNCTION SF_NIVEL_ARQUIVO(n_par_codigo IN INTEGER) RETURN VARCHAR2;

  FUNCTION SF_ORDENA_ARQUIVO(v_par_codigo IN INTEGER) RETURN VARCHAR2;

  FUNCTION SF_NIVEL_ARQUIVO_NOME(n_par_codigo IN INTEGER) RETURN VARCHAR2;

  PROCEDURE SP_PEND_FOLLOW_UP;

  PROCEDURE SP_TROCA_ORIGEM(n_prop   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            v_origem IN SIAOS.ORIGEM.ORIGEM%TYPE,
                            n_erro   OUT INTEGER);

  PROCEDURE SP_UP_TX_CONSULTA(n_prop      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              v_descricao IN SIAOS.CONSULTA.CON_DESCRICAO%TYPE,
                              n_chapa     IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                              n_resposta  IN INTEGER,
                              n_erro      OUT INTEGER);

  PROCEDURE SP_COPIA_OS(n_prop      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                        n_chapa     IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                        n_prop_nova OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_COPIA_ITEM(n_prop       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_prop_para  IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_ipg_codigo IN SIAOS.ITEM_PROP.IPG_CODIGO%TYPE,
                          n_item       IN SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE,
                          n_pas_codigo IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE,
                          n_selo       IN INTEGER,
                          n_item_novo  OUT SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE);

  FUNCTION SF_TIPO_LINK(n_prop IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                        n_item IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN CHAR;

  PROCEDURE SP_UP_ITEM_REV(n_ipr_codigo   IN SIAOS.ITEM_REV.IPR_CODIGO%TYPE,
                           n_ire_garantia IN SIAOS.ITEM_REV.IRE_GARANTIA%TYPE,
                           v_ire_local    IN SIAOS.ITEM_REV.IRE_LOCAL%TYPE,
                           n_pri_codigo   IN SIAOS.ITEM_REV.PRI_CODIGO%TYPE,
                           n_set_codigo   IN SIAOS.ITEM_REV.SET_CODIGO%TYPE,
                           n_tcam_codigo  IN SIAOS.ITEM_REV.TCAM_CODIGO%TYPE,
                           n_erro         OUT NUMBER);

  PROCEDURE SP_PROP_REV(n_prp_codigo     IN SIAOS.PROP_REVISOES.PRP_CODIGO%TYPE,
                        n_prs_frete      IN SIAOS.PROP_REVISOES.PRS_FRETE%TYPE,
                        v_prs_documento  IN SIAOS.PROP_REVISOES.PRS_DOCUMENTO%TYPE,
                        v_prs_nf_entrada IN SIAOS.PROP_REVISOES.PRS_NF_ENTRADA%TYPE,
                        n_erro           OUT NUMBER);

  PROCEDURE SP_EMAIL_CLIENTE(vc2_de       IN SIAOS.PASTA_EMAIL.EML_DE%TYPE,
                             vc2_para     IN SIAOS.PASTA_EMAIL.EML_PARA%TYPE,
                             vc2_assunto  IN SIAOS.PASTA_EMAIL.EML_ASSUNTO%TYPE,
                             clb_conteudo IN SIAOS.PASTA_EMAIL.EML_CONTEUDO1%TYPE);

  PROCEDURE SP_ALTERA_PRECO_PROP(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_IMPORTA_PROP(n_pre IN INTEGER, n_proposta OUT INTEGER);

  PROCEDURE SP_ARRUMA_LOTE(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_EDITA_GRUPO(n_ipg_codigo     IN OUT SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                           n_prp_codigo     IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                           v_ipg_nome       IN SIAOS.ITEM_PROP_GRUPO.IPG_NOME%TYPE,
                           n_ipg_posicao    IN SIAOS.ITEM_PROP_GRUPO.IPG_POSICAO%TYPE,
                           n_ipg_codigo_pai IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO_PAI%TYPE);

  PROCEDURE SP_COPIA_GRUPO(n_ipg_codigo IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                           n_prp_codigo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                           n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE);

  PROCEDURE SP_AGRUPA_ITEM(n_prp_codigo    IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                           n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_ipg_codigo_d  IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE);

  PROCEDURE SP_ARRUMA_GRUPO(n_prp_codigo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                            n_ipg_codigo IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE);

  PROCEDURE SP_APAGA_GRUPO(n_ipg_codigo IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                           n_prp_codigo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE);

  PROCEDURE SP_CONFIG_PESSOAL;

  PROCEDURE SP_CONFIG_IMP(n_prp_codigo       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_usu_chapa        IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                          vc2_pim_tipo       IN SIAOS.PROPOSTA_IMP.PIM_TIPO%TYPE,
                          n_pim_agrupamento  IN SIAOS.PROPOSTA_IMP.PIM_AGRUPAMENTO%TYPE,
                          c_pim_posicao_desc IN SIAOS.PROPOSTA_IMP.PIM_POSICAO_DESC%TYPE,
                          n_pim_grupos       IN SIAOS.PROPOSTA_IMP.PIM_GRUPOS%TYPE,
                          n_pim_lotes        IN SIAOS.PROPOSTA_IMP.PIM_LOTES%TYPE,
                          n_pim_dados_op     IN SIAOS.PROPOSTA_IMP.PIM_DADOS_OP%TYPE,
                          n_pim_op_padrao    IN SIAOS.PROPOSTA_IMP.PIM_OP_PADRAO%TYPE,
                          n_pim_valor_agrup  IN SIAOS.PROPOSTA_IMP.PIM_VALOR_AGRUP%TYPE,
                          n_prp_validade     IN SIAOS.PROPOSTA.PRP_VALIDADE%TYPE,
                          c_incoterm         IN SIAOS.PROPOSTA.PRP_TRANSPORTE%TYPE,
                          n_lin_cod          IN SIAOS.LINGUA.LIN_COD%TYPE,
                          n_pim_sumario      IN SIAOS.PROPOSTA_IMP.PIM_SUMARIO%TYPE,
                          n_pin_consolida    IN SIAOS.PROPOSTA_IMP.PIN_CONSOLIDA%TYPE,
                          n_erro             OUT INTEGER);

  PROCEDURE SP_GRAVA_TEXTO(n_chapa         IN INTEGER,
                           n_prp_codigo    IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                           n_ipr_item_prop IN INTEGER,
                           c_tabela        IN VARCHAR,
                           c_campo         IN VARCHAR2,
                           n_erro          OUT INTEGER);

  PROCEDURE SP_GRAVA_TEXTO_NOVO(n_cip_codigo IN OUT ORDERIN.CONTEUDO_IMP_PROP.CIP_CODIGO%TYPE,
                                n_prp_codigo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_tco_codigo IN ORDERIN.CONTEUDO_IMP_PROP.TCO_CODIGO%TYPE,
                                n_erro       OUT INTEGER);

  PROCEDURE SP_VALIDADE(n_prp_codigo    IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                        dt_validade     OUT DATE,
                        n_dias_validade OUT INTEGER);

  PROCEDURE SP_ATUALIZA_PRECO_LISTA(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                                    n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                                    n_preco         OUT NUMBER);

  PROCEDURE SP_AMARRA_CONTROLE(n_codigo_pai   IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                               n_codigo_filho IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                               n_erro         OUT NUMBER);

  PROCEDURE SP_AMARRA_ITEMS(n_prp_codigo IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                            n_item_pai   IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_item_filho IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_erro       OUT NUMBER);

  PROCEDURE SP_EXPIRA_RESERVA;

  PROCEDURE SP_ITEM_HOLD(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                         n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                         n_hold          IN INTEGER,
                         n_erro          OUT NUMBER);

  PROCEDURE SP_CONTATO(n_operacao            IN INTEGER,
                       n_prp_codigo          IN SIAOS.CONTATO_PROP.PRP_CODIGO%TYPE,
                       n_cop_numero          IN OUT SIAOS.CONTATO_PROP.COP_NUMERO%TYPE,
                       n_cop_tipo            IN SIAOS.CONTATO_PROP.COP_TIPO%TYPE,
                       vc2_cop_nome          IN SIAOS.CONTATO_PROP.COP_NOME%TYPE,
                       vc2_cop_cargo1        IN SIAOS.CONTATO_PROP.COP_CARGO%TYPE,
                       vc2_cop_departamento1 IN SIAOS.CONTATO_PROP.COP_DEPARTAMENTO%TYPE,
                       vc2_cop_fone1         IN SIAOS.CONTATO_PROP.COP_FONE%TYPE,
                       vc2_cop_celular1      IN SIAOS.CONTATO_PROP.COP_CELULAR%TYPE,
                       vc2_cop_email1        IN SIAOS.CONTATO_PROP.COP_EMAIL%TYPE,
                       vc2_cop_fax1          IN SIAOS.CONTATO_PROP.COP_FAX%TYPE,
                       n_temporario          IN INTEGER);

  -------------------------------------------------------------------
  -- Calcula Imposto do Produto
  -------------------------------------------------------------------
  FUNCTION SF_CALC_PRECO_IMPOSTO(c_moeda      SIAOS.INDICFIN.MOEDA%TYPE,
                                 n_ipi        NUMBER,
                                 n_icms       NUMBER,
                                 n_preco      NUMBER,
                                 n_tem_pis    NUMBER,
                                 n_tem_cofins NUMBER,
                                 vc_produto   CADBASICO.ITEM_NEGOCIO.INE_CODIGO%TYPE)
    RETURN NUMBER;

  PROCEDURE SP_CALCULA_PRECO(vc2_produto      IN PRODUTO.PRODUTO%TYPE,
                             vc2_opcat        IN VARCHAR2,
                             vc2_opesp        IN OELIN.OP_ESP%TYPE,
                             vc2_moeda        IN INDICFIN.MOEDA%TYPE,
                             n_completo       IN NUMBER,
                             n_consulta_preco OUT NUMBER,
                             n_preco_final    OUT NUMBER);

  PROCEDURE SP_CALCULA_PRECO_IMP(vc2_produto      IN SIAOS.PRODUTO.PRODUTO%TYPE,
                                 vc2_opcat        IN VARCHAR2,
                                 vc2_opesp        IN SIAOS.OELIN.OP_ESP%TYPE,
                                 vc2_moeda        IN SIAOS.INDICFIN.MOEDA%TYPE,
                                 n_icms           IN SIAOS.ITEM_PROP.IPR_ICMS%TYPE,
                                 n_ipi            IN SIAOS.ITEM_PROP.IPR_ISS%TYPE,
                                 n_preco          OUT NUMBER,
                                 n_consulta_preco OUT NUMBER);

  PROCEDURE SP_CALCULA_PRECO_IMP2(vc2_produto      IN SIAOS.PRODUTO.PRODUTO%TYPE,
                                  vc2_opcat        IN VARCHAR2,
                                  vc2_opesp        IN SIAOS.OELIN.OP_ESP%TYPE,
                                  vc2_moeda        IN SIAOS.INDICFIN.MOEDA%TYPE,
                                  n_icms           IN SIAOS.ITEM_PROP.IPR_ICMS%TYPE,
                                  n_ipi            IN SIAOS.ITEM_PROP.IPR_ISS%TYPE,
                                  n_tem_pis        IN NUMBER,
                                  n_tem_cofins     IN NUMBER,
                                  n_preco          OUT NUMBER,
                                  n_consulta_preco OUT NUMBER);

  PROCEDURE SP_APAGA_ITEM(n_proposta IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                          n_item     IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                          n_erro     OUT NUMBER);

  FUNCTION SF_CALCULA_IMP_SAIDA(n_os      IN NUMBER,
                                n_prop    IN NUMBER,
                                n_preco   IN NUMBER,
                                n_ipi_inc IN NUMBER,
                                n_iss_inc IN NUMBER,
                                n_ipi     IN NUMBER,
                                n_iss     IN NUMBER) RETURN NUMBER;

  FUNCTION SF_VERIFICA_SEMANA(vc2_semana IN VARCHAR2) RETURN NUMBER;

  PROCEDURE SP_GRAVA_MODELO(v_op         IN VARCHAR,
                            n_cmo_codigo IN SIAOS.CONFIGURA_MODELO.CMO_CODIGO%TYPE,
                            v_cmo_nome   IN SIAOS.CONFIGURA_MODELO.CMO_NOME%TYPE,
                            n_erro       OUT NUMBER);

  PROCEDURE SP_GERA_SET(n_proposta     IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                        n_pas_codigo   IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                        clb_set_obs    IN VARCHAR2,
                        dt_set_retorno IN SIAOS.PROP_SET.SET_DT_RETORNO%TYPE,
                        vc2_set_tipo   IN SIAOS.PROP_SET.SET_TIPO%TYPE,
                        n_erro         OUT NUMBER);

  PROCEDURE SP_MODERA_SET(n_proposta    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_usu_chapa   IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                          n_pas_codigo  IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                          v_set_tipo    IN SIAOS.PROP_SET.SET_TIPO%TYPE,
                          vc2_set_obs   IN VARCHAR2,
                          dt_set_reprog IN SIAOS.PROP_SET.SET_DT_REPROG%TYPE,
                          c_pre_msg_rep IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                          n_sac         IN OUT DIATNET.SAC.SAC_NUMERO%TYPE,
                          n_erro        OUT NUMBER);

  PROCEDURE SP_REPROGRAMA_SET(n_proposta    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              n_pas_codigo  IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                              dt_set_reprog IN SIAOS.PROP_SET.SET_DT_REPROG%TYPE,
                              c_pre_msg_rep IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                              n_erro        OUT NUMBER);

  PROCEDURE SP_GRAVA_RECADO(n_opcao          IN INTEGER,
                            n_pre_codigo     IN SIAOS.PROP_RECADO.PRE_CODIGO%TYPE,
                            n_proposta       IN SIAOS.PROP_RECADO.PRP_CODIGO%TYPE,
                            n_tre_codigo     IN SIAOS.PROP_RECADO.TRE_CODIGO%TYPE,
                            clb_pre_mensagem IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                            v_pre_alarm      IN VARCHAR2,
                            n_usu_chapa      IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                            n_erro           OUT NUMBER);

  PROCEDURE SP_GRAVA_FOLLOWUP(n_opcao          IN INTEGER,
                              n_pre_codigo     IN SIAOS.PROP_RECADO.PRE_CODIGO%TYPE,
                              n_pre_filtro     IN SIAOS.PROP_RECADO.PRE_FILTRO%TYPE,
                              n_tre_codigo     IN SIAOS.PROP_RECADO.TRE_CODIGO%TYPE,
                              n_mot_codigo     IN SIAOS.PROP_RECADO.MOT_CODIGO%TYPE,
                              clb_pre_mensagem IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                              v_pre_alarm      IN VARCHAR2,
                              n_pnu_numero     IN SIAOS.PROP_RECADO.PNU_NUMERO%TYPE,
                              n_pen_numero     IN SIAOS.PROP_RECADO.PEN_NUMERO%TYPE,
                              n_erro           OUT NUMBER);

  PROCEDURE SP_GRAVA_RECADO(n_opcao          IN INTEGER,
                            n_pre_codigo     IN SIAOS.PROP_RECADO.PRE_CODIGO%TYPE,
                            n_proposta       IN SIAOS.PROP_RECADO.PRP_CODIGO%TYPE,
                            n_tre_codigo     IN SIAOS.PROP_RECADO.TRE_CODIGO%TYPE,
                            clb_pre_mensagem IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                            v_pre_alarm      IN VARCHAR2,
                            n_erro           OUT NUMBER);
                            
  PROCEDURE SP_EXECUTA_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_usu_chapa  IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                           n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                           cl_notas     IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                           n_env_email  IN NUMBER,
                           n_erro       OUT NUMBER);

  PROCEDURE SP_REPROVA_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                           cl_notas     IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                           n_env_email  IN NUMBER,
                           n_erro       OUT NUMBER);
                           
  PROCEDURE SP_APROVA_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_usu_chapa  IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                          n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                          cl_notas     IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                          n_erro       OUT NUMBER);

  PROCEDURE SP_CANCELA_APROVACAO_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                     n_usu_chapa  IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                                     n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                                     cl_notas     IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                                     n_erro       OUT NUMBER);

  FUNCTION SF_STATUS_SET(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE)
    RETURN NUMBER;


  FUNCTION SF_STATUS_SET_AREA(
    n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
    n_pas_codigo IN SIAOS.PROP_SET.PAS_CODIGO%TYPE)
    RETURN NUMBER;
    
  PROCEDURE SP_CANCELA_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                           cl_notas     IN CLOB,
                           n_erro       OUT NUMBER);

  FUNCTION SF_VALOR_COTACAO(c_produto IN SIAOS.PRODUTO.PRODUTO%TYPE,
                            c_moeda   IN SIAOS.INDICFIN.MOEDA%TYPE,
                            n_empresa IN GERAL.EMPRESA.EMP_CODIGO%TYPE)
    RETURN NUMBER;

  FUNCTION SF_VL_LISTA_EST(n_vl_lista  IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                           n_vl_cotado IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                           n_vl_venda  IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                           dt_data     IN DATE) RETURN NUMBER;

  FUNCTION SF_PER_COMISSAO(n_iqv IN NUMBER, dt_data IN DATE) RETURN NUMBER;

  PROCEDURE SP_DADOS_COMISSAO(n_vl_lista     IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                              n_vl_adicional IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                              n_vl_cotado    IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                              n_vl_venda     IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                              c_origem       IN SIAOS.ORIGEM.ORIGEM%TYPE,
                              c_salesp_key   IN SIAOS.ARSALESP.SALESP_KEY%TYPE,
                              n_comiss_var   IN NUMBER,
                              dt_aval        IN DATE,
                              n_vl_lista_est OUT NUMBER,
                              n_iqv          OUT NUMBER,
                              n_comissao     OUT NUMBER,
                              n_erro         OUT NUMBER);

  PROCEDURE SP_DADOS_COMISSAO_OLD(n_vl_lista     IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                                  n_vl_adicional IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                                  n_vl_cotado    IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                                  n_vl_venda     IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                                  n_comiss_var   IN NUMBER,
                                  dt_aval        IN DATE,
                                  n_vl_lista_est OUT NUMBER,
                                  n_iqv          OUT NUMBER,
                                  n_comissao     OUT NUMBER,
                                  n_erro         OUT NUMBER);

  PROCEDURE SP_PACOTE(c_operacao     IN CHAR,
                      n_pac_codigo   IN OUT SIAOS.PACOTE.PAC_CODIGO%TYPE,
                      v_lte_desc     IN SMARNET.LEGENDA_TEXTO.LTE_DESCRICAO%TYPE,
                      n_pac_grupo    IN SIAOS.PACOTE.PAC_GRUPO%TYPE,
                      v_lte_desc_gr  IN SMARNET.LEGENDA_TEXTO.LTE_DESCRICAO%TYPE,
                      n_pac_varios   IN SIAOS.PACOTE.PAC_VARIOS%TYPE,
                      v_pac_processo IN SIAOS.PACOTE.PAC_PROCESSO%TYPE,
                      n_pac_ativo    IN SIAOS.PACOTE.PAC_ATIVO%TYPE,
                      n_usu_chapa    IN SIAOS.PACOTE.USU_CHAPA%TYPE,
                      v_pac_desc     IN SIAOS.PACOTE.PAC_DESCRICAO%TYPE,
                      n_erro         OUT NUMBER);

  PROCEDURE SP_PACOTE_PROD(c_operacao       IN CHAR,
                           n_pap_codigo     IN OUT SIAOS.PACOTE_PROD.PAP_CODIGO%TYPE,
                           n_pac_codigo     IN SIAOS.PACOTE_PROD.PAC_CODIGO%TYPE,
                           v_produto        IN SIAOS.PACOTE_PROD.PRODUTO%TYPE,
                           v_descricao      IN SIAOS.PACOTE_PROD.PAP_DESCRICAO%TYPE,
                           v_pap_opcoes     IN SIAOS.PACOTE_PROD.PAP_OPCOES%TYPE,
                           v_pap_opesp      IN SIAOS.PACOTE_PROD.PAP_OPESP%TYPE,
                           v_datasheet      IN SIAOS.PACOTE_PROD.PAP_DATASHEET%TYPE,
                           v_obs            IN SIAOS.PACOTE_PROD.PAP_OBS%TYPE,
                           n_pap_quantidade IN SIAOS.PACOTE_PROD.PAP_QUANTIDADE%TYPE,
                           n_pap_principal  IN SIAOS.PACOTE_PROD.PAP_PRINCIPAL%TYPE,
                           n_pap_posicao    IN SIAOS.PACOTE_PROD.PAP_POSICAO%TYPE,
                           n_pap_ativo      IN SIAOS.PACOTE_PROD.PAP_ATIVO%TYPE,
                           n_erro           OUT NUMBER);

  PROCEDURE SP_INSERE_PACOTE(n_pac_codigo     IN SIAOS.PACOTE_PROD.PAC_CODIGO%TYPE,
                             v_ipg_nome       IN SIAOS.ITEM_PROP_GRUPO.IPG_NOME%TYPE,
                             n_pap_quantidade IN SIAOS.PACOTE_PROD.PAP_QUANTIDADE%TYPE,
                             n_prp_codigo     IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_pas_codigo     IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE,
                             n_erro           OUT NUMBER);

  PROCEDURE SP_CONSULTA_PRECO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              v_cpe_log    IN SIAOS.CONSULTA_PRECO.CPE_LOG%TYPE,
                              n_usu_chapa  IN SIAOS.CONSULTA_PRECO.USU_CHAPA%TYPE,
                              n_erro       OUT NUMBER);

  PROCEDURE SP_BAIXA_CONSULTA_PRECO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                    v_cpe_log    IN SIAOS.CONSULTA_PRECO.CPE_LOG%TYPE,
                                    n_erro       OUT NUMBER);

  PROCEDURE SP_GRAVA_PRECO_CONS(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                                n_ipr_adicional IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                                n_erro          OUT NUMBER);

  PROCEDURE SP_TROCA_SET(n_proposta        IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         n_prop_set        IN SIAOS.PROP_SET.PRP_SET%TYPE,
                         n_pas_codigo      IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                         n_pas_codigo_novo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                         c_pre_mensagem    IN SIAOS.PROP_SET.SET_OBS%TYPE,
                         n_erro            OUT NUMBER);

  FUNCTION SF_ACESSA_PROP(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_usu_login  IN SIAOS.USUARIO.USU_CHAPA%TYPE)
    RETURN NUMBER;
  /*
    PROCEDURE SP_IMPOSTOS_PRODUTO(c_pro_codigo IN SIAOS.PRODUTO.PRODUTO%TYPE,
                                  n_cli_codigo IN SIAOS.CLIENTE.CODIGO%TYPE,
                                  c_estado     IN SIAOS.ICMS.ESTADO%TYPE,
                                  n_servico    OUT SIAOS.FAMILIA.SERVICO%TYPE,
                                  vc2_ccf      OUT SIAOS.VM_PRODUTO.CCF%TYPE,
                                  n_ipi        OUT SIAOS.VM_PRODUTO.IPI%TYPE,
                                  n_iss        OUT SIAOS.VM_SERVICO.PISS%TYPE,
                                  n_icms       OUT SIAOS.ICMS.PORC%TYPE,
                                  n_erro       OUT NUMBER);
  */
  PROCEDURE SP_MSG_ARQUIVO(n_par_codigo    IN SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE,
                           n_par_nome      IN SIAOS.PROP_ARQUIVO.PAR_NOME%TYPE,
                           n_par_descricao IN SIAOS.PROP_ARQUIVO.PAR_DESCRICAO%TYPE,
                           n_par_sistema   IN SIAOS.PROP_ARQUIVO.PAR_SISTEMA%TYPE,
                           n_par_filtro    IN SIAOS.PROP_ARQUIVO.PAR_FILTRO%TYPE);

  PROCEDURE SP_ABRE_SAC;

  PROCEDURE SP_APAGA_LIXEIRA;

  PROCEDURE SP_PASTAS_AUTOMATICAS(n_par_sistema IN SIAOS.PROP_ARQUIVO.PAR_SISTEMA%TYPE,
                                  n_par_filtro  IN SIAOS.PROP_ARQUIVO.PAR_FILTRO%TYPE,
                                  n_codigo_pai  IN INTEGER,
                                  n_par_codigo  IN SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE,
                                  n_erro        OUT NUMBER);

  PROCEDURE SP_GRAVA_PASTAS(n_par_sistema     IN SIAOS.PROP_ARQUIVO.PAR_SISTEMA%TYPE,
                            n_par_filtro      IN SIAOS.PROP_ARQUIVO.PAR_FILTRO%TYPE,
                            n_leg_codigo      IN SIAOS.PROP_ARQUIVO.LEG_CODIGO%TYPE,
                            n_leg_codigo_desc IN SIAOS.PROP_ARQUIVO.LEG_CODIGO_DESC%TYPE,
                            n_ace_codigo      IN SIAOS.PROP_ARQUIVO.ACE_CODIGO%TYPE,
                            n_par_codigo_pai  IN SIAOS.PROP_ARQUIVO.PAR_CODIGO_PAI%TYPE,
                            n_par_codigo      OUT SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE);

  PROCEDURE SP_PASTAS_OS(n_par_sistema IN SIAOS.PROP_ARQUIVO.PAR_SISTEMA%TYPE,
                         n_par_filtro  IN SIAOS.PROP_ARQUIVO.PAR_FILTRO%TYPE);

  PROCEDURE SP_SET_ITEM(n_prop       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                        n_item       IN SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE,
                        n_pas_codigo IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE);

  FUNCTION SF_ORDEM_PROP(n_prp_codigo    IN INTEGER,
                         n_ipr_item_prop IN INTEGER,
                         n_ipg_codigo    IN INTEGER,
                         vc2_posicao     IN VARCHAR2) RETURN VARCHAR2;

  FUNCTION SF_ORDEM_GRUP(n_prp_codigo IN INTEGER,
                         n_ipg_codigo IN INTEGER,
                         vc2_nome     IN VARCHAR2,
                         n_tipo       IN INTEGER) RETURN VARCHAR2;

  PROCEDURE SP_IMP_PADRAO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_STATUS_CLI(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          v_tipo       IN VARCHAR2);

  PROCEDURE SP_EMAIL_SISTEMA(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_cli_codigo IN SIAOS.PROPOSTA.CLI_CODIGO%TYPE);

  PROCEDURE SP_GRUPO_DESC(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_gde_codigo IN OUT SIAOS.GRUPO_DESC.GDE_CODIGO%TYPE,
                          n_gde_tipo   IN SIAOS.GRUPO_DESC.GDE_TIPO%TYPE,
                          v_gde_nome   IN SIAOS.GRUPO_DESC.GDE_NOME%TYPE,
                          v_gde_ref    IN SIAOS.GRUPO_DESC.GDE_REF%TYPE,
                          n_erro       OUT INTEGER);

  PROCEDURE SP_GRUPO_DESC_AUTO(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                               n_prp_item_prop IN SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE,
                               n_erro          OUT INTEGER);

  FUNCTION SF_CUSTO_ITEM(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN VARCHAR2;

  PROCEDURE SP_GRUPO_DESP(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_gde_codigo IN SIAOS.GRUPO_DESC.GDE_CODIGO%TYPE,
                          n_pcd_porc   IN SIAOS.PROP_CUSTO_DIAS.PCD_PORCENTO%TYPE,
                          n_pcd_dias   IN SIAOS.PROP_CUSTO_DIAS.PCD_DIAS%TYPE,
                          n_erro       OUT INTEGER);

  PROCEDURE SP_CK_LIST(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                       n_plc_notas  IN SIAOS.PROP_CKLIST.PLC_NOTAS%TYPE,
                       vc2_array    IN VARCHAR2);

  PROCEDURE SP_CK_VERSAO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  FUNCTION SF_VALOR_DO_GRUPO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_ipg_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_tipo       IN NUMBER,
                             n_hierarquia IN NUMBER) RETURN NUMBER;
                             
  FUNCTION SF_VALOR_DO_GRUPO_FIM(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_ipg_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_tipo       IN NUMBER,
                             n_hierarquia IN NUMBER) RETURN NUMBER;

  FUNCTION SF_PRPOSTA_IQV(n_prp_numero IN NUMBER) RETURN NUMBER;

  PROCEDURE SP_COPIA_CAB(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         n_prp_codigo_novo OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_EXPORT_GRP(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_grupo           IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                          n_prp_codigo_novo IN OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_EXPORT_ITN_GRP(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              n_grupo           IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                              n_prp_codigo_novo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              n_grupo_novo      IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE);

  PROCEDURE SP_EXPORT_ITN(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_item_prop       IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                          n_prp_codigo_novo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_grupo_novo      IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE);

  PROCEDURE SP_EXPORT_PCLI(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_item_prop       IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_prp_codigo_novo IN OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_EXPORT_GRUPOS_REV(n_prp_codigo      IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                 n_prp_codigo_novo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                 n_ipr_codigo      IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                                 n_ipg_codigo      IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                                 n_ipg_codigo_sv   IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                                 n_ipg_codigo_pc   IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE);

  PROCEDURE SP_EXPORT_GRUPO_REV(n_prp_codigo      IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_ipr_codigo      IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                                n_prp_codigo_novo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_ipg_codigo      IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                                n_tipo_insumo     IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_ipg_codigo_pai  IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_grupo_novo      OUT SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE);

  PROCEDURE SP_VERIFICA_PROPOSTA(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                 v_erro       OUT VARCHAR);

  FUNCTION SF_MENOR_IQV(n_ori_codigo IN SIAOS.PROPOSTA.ORI_CODIGO%TYPE)
    RETURN NUMBER;

  FUNCTION SF_EH_DESPESA(vc_ine_codigo IN CADBASICO.ITEM_NEGOCIO.INE_CODIGO%TYPE)
    RETURN NUMBER;

  PROCEDURE SP_DESVINCULA_PROPOSTA(
    n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE);

  PROCEDURE SP_VENDEDOR_PROPOSTA(
    n_prp_codigo     IN   SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
    n_usu_chapa_ven  OUT  SIAOS.USUARIO.USU_CHAPA%TYPE,
    v_usu_nome_ven   OUT  SIAOS.USUARIO.USU_NOME%TYPE,
    v_usu_email_ven  OUT  SIAOS.USUARIO.USU_EMAIL%TYPE,
    v_end_email_vend OUT  VARCHAR2);
        
END PCK_SMART_SALES3;
/
CREATE OR REPLACE PACKAGE BODY SIAOS.PCK_SMART_SALES3 IS

  ----------------------------------------------------------
  --------------------- NOVA PROPOSTA ----------------------
  ----------------------------------------------------------

  PROCEDURE SP_NOVA_PROPOSTA(v_login      IN SIAOS.PROPOSTA.LOGIN%TYPE,
                             n_usu_chapa  IN SIAOS.PROPOSTA.USU_CHAPA%TYPE,
                             n_cliente    IN SIAOS.PROPOSTA.CLI_CODIGO%TYPE,
                             v_ori_codigo IN OUT SIAOS.ORIGEM.ORIGEM%TYPE,
                             n_proposta   OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
    vc2_filial       SIAOS.FILIAL.ORIGEM%TYPE; -- CODIGO DA FILIAL
    dt_reajuste      DATE;
    c_embarque       SIAOS.CLIENTE.FORMAEMBAR%TYPE;
    n_embalagem      SIAOS.PROPOSTA.PRP_EMBALAGEM%TYPE;
    n_erro           INTEGER;
    n_prp_parcial    SIAOS.PROPOSTA.PRP_PARCIAL%TYPE := 1;
    n_prp_antecipa   SIAOS.PROPOSTA.PRP_ANTECIPA%TYPE := 1;
    n_emp_codigo     SIAOS.PROPOSTA.EMP_ABERTURA%TYPE;
    c_incoterm       SIAOS.INCOTERM.CHAVE%TYPE;
    n_prp_validade   SIAOS.PROPOSTA.PRP_VALIDADE%TYPE;
    n_top_codigo     SIAOS.PROPOSTA.TOP_CODIGO%TYPE;
    n_exportacao     SIAOS.PROPOSTA.PRP_EXPORTACAO%TYPE;
    n_ifi_codigo     SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    c_pais           SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    v_ori_codigo_cli SIAOS.ORIGEM.ORIGEM%TYPE;
    n_par_codigo     SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE;
    --n_par_codigo2    SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE;
  
  BEGIN
    -- RETORA OS DADOS DO CLIENTE (SEM MOEDA, RETORNA R$)
    IF n_cliente IS NOT NULL THEN
    
      SELECT C.ORIGEM, NVL(C.PAIS, 'USA')
        INTO v_ori_codigo_cli, c_pais
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cliente;
    
      IF TRIM(v_ori_codigo) IS NULL THEN
        IF c_pais = 'BRA' THEN
          v_ori_codigo := 'BR';
        ELSE
          v_ori_codigo := 'CO';
        END IF;
      END IF;
    
    END IF;
  
    IF v_ori_codigo_cli IS NULL THEN
      v_ori_codigo_cli := 'BR';
    END IF;
  
    IF v_ori_codigo IS NULL THEN
      v_ori_codigo := v_ori_codigo_cli;
    END IF;
  
    IF v_ori_codigo_cli = 'CO' THEN
      n_exportacao := 1;
      n_top_codigo := 2;
      n_ifi_codigo := 'USD';
    ELSE
      n_exportacao := 0;
      n_top_codigo := 1;
      n_ifi_codigo := 'R$';
    END IF;
  
    BEGIN
    
      SELECT PP.PPE_INCOTERM, PP.PPE_VALIDADE_PROP
        INTO c_incoterm, n_prp_validade
        FROM SIAOS.PROP_PERSONAL PP
       WHERE PP.USU_CHAPA = n_usu_chapa;
    
    EXCEPTION
      WHEN OTHERS THEN
        c_incoterm     := NULL;
        n_prp_validade := 30;
    END;
  
    BEGIN
    
      SELECT DECODE(A.FILIAL,
                    'IN',
                    'NS',
                    'ST',
                    'NS',
                    'IT',
                    'NS',
                    'WS',
                    'NS',
                    'EC',
                    'NS',
                    A.FILIAL)
        INTO vc2_filial
        FROM SIAOS.ARSALESP A
       INNER JOIN SIAOS.CLIENTE C
          ON C.VENDEDOR = A.SALESP_KEY
       WHERE C.CODIGO = n_cliente;
    
      SELECT U.EMP_CODIGO
        INTO n_emp_codigo
        FROM SIAOS.USUARIO U
       WHERE U.USU_CHAPA = n_usu_chapa;
    
    EXCEPTION
      WHEN OTHERS THEN
        BEGIN
        
          SELECT DECODE(U.ORIGEM, 'IN', 'NS', 'ST', 'NS', U.ORIGEM),
                 U.EMP_CODIGO
            INTO vc2_filial, n_emp_codigo
            FROM SIAOS.USUARIO U
           WHERE U.USU_CHAPA = n_usu_chapa;
        
        EXCEPTION
          WHEN OTHERS THEN
            vc2_filial   := 'NS';
            n_emp_codigo := 1;
        END;
    END;
  
    SELECT MAX(DATA) PRP_DT_REAJUSTE
      INTO dt_reajuste
      FROM SIAOS.MOEDA
     WHERE MOEDA.COD_MOEDA = 'USD';
     
    SIAOS.PCK_SMART_SALES3.SP_CONFIG_PESSOAL;
    
    -- Insere o numero da proposta
    -- For reg_cli_prop In consulta_cliente Loop
    -- RETORNA O NUMERO DA PROPOSTA
    SELECT SEQ_PRP_CODIGO.NEXTVAL INTO n_proposta FROM DUAL;
  
    INSERT INTO SIAOS.PROPOSTA
      (PRP_CODIGO,
       LOGIN,
       PRP_DT_ABERTURA,
       PRP_REAJUSTE,
       ORI_CODIGO,
       FIL_CODIGO,
       USU_CHAPA,
       PRP_DESTINO,
       PRP_DT_REAJUSTE,
       PRP_EMBALAGEM,
       PST_CODIGO,
       PRP_SIST_VERSAO,
       PRP_PARCIAL,
       PRP_ANTECIPA,
       EMP_ABERTURA,
       PRP_TRANSPORTE,
       PRP_VALIDADE,
       IFI_CODIGO,
       TOP_CODIGO,
       PRP_EXPORTACAO)
    VALUES
      (n_proposta,
       v_login,
       SYSDATE,
       'F',
       substr(v_ori_codigo, 1, 2),
       vc2_filial,
       n_usu_chapa,
       'C',
       dt_reajuste,
       n_embalagem,
       2,
       '3.04.000',
       n_prp_parcial,
       n_prp_antecipa,
       n_emp_codigo,
       c_incoterm,
       n_prp_validade,
       n_ifi_codigo,
       n_top_codigo,
       n_exportacao);
  
    COMMIT;
  
    IF n_cliente IS NOT NULL THEN
      SIAOS.PCK_SMART_SALES3.SP_UP_CLIENTE(n_proposta, n_cliente);
      SIAOS.PCK_SMART_SALES3.SP_UP_CLIENTE_FIM(n_proposta, n_cliente);
    END IF;
  
    IF c_embarque != 0 THEN
      SIAOS.PCK_SMART_SALES3.SP_INSERE_TRANSPORTADORA(n_proposta,
                                                      c_embarque);
    END IF;
  
    COMMIT;
    /*
    TODO: owner="juliano" category="Fix" priority="1 - High" created="17/06/2022" closed="07/11/2022"
    text="pau no banco"
    */
    SP_PASTAS_AUTOMATICAS(1, n_proposta, 0, NULL, n_erro);
  
    IF v_ori_codigo = 'RV' THEN
      INSERT INTO SIAOS.PROP_ARQUIVO
        (PRP_CODIGO,
         ORDER_NO,
         PAR_NOME,
         PAR_DESCRICAO,
         PAR_TIPO,
         PAR_CODIGO_PAI,
         PAR_SISTEMA,
         PAR_FILTRO,
         PAR_PASTA_FIXA)
      VALUES
        (n_proposta,
         NULL,
         'Revisões',
         'Documentos emitidos por Revisões',
         0,
         NULL,
         1,
         n_proposta,
         1) RETURN PAR_CODIGO INTO n_par_codigo;
      -- SP_GRAVA_PASTAS(1, n_proposta, 'Revisões', 'Documentos emitidos por Revisões', NULL, 0, n_par_codigo2);
      INSERT INTO SIAOS.PROP_ARQUIVO
        (PRP_CODIGO,
         ORDER_NO,
         PAR_NOME,
         PAR_DESCRICAO,
         PAR_TIPO,
         PAR_CODIGO_PAI,
         PAR_SISTEMA,
         PAR_FILTRO,
         PAR_PASTA_FIXA)
      VALUES
        (n_proposta,
         NULL,
         'Laudo',
         'Laudos\Diagnostico emitidos por Revisões',
         0,
         n_par_codigo,
         1,
         n_proposta,
         1);
      --SP_GRAVA_PASTAS(1, n_proposta, 'Laudo', 'Laudos emitidos por Revisões', NULL, n_par_codigo2, n_par_codigo);
      INSERT INTO SIAOS.PROP_ARQUIVO
        (PRP_CODIGO,
         ORDER_NO,
         PAR_NOME,
         PAR_DESCRICAO,
         PAR_TIPO,
         PAR_CODIGO_PAI,
         PAR_SISTEMA,
         PAR_FILTRO,
         PAR_PASTA_FIXA)
      VALUES
        (n_proposta,
         NULL,
         'Outros',
         'Outros documentos de Revisões',
         0,
         n_par_codigo,
         1,
         n_proposta,
         1);
      --SP_GRAVA_PASTAS(1, n_proposta, 'Outros', 'Outros documentos de Revisões', NULL, n_par_codigo2, n_par_codigo);
    END IF;
  
  End SP_NOVA_PROPOSTA;

  ----------------------------------------------------------
  --------------------- APAGA PROPOSTA ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_APAGA_PROPOSTA(n_proposta IN INTEGER, n_chapa IN INTEGER) IS
  
    n_pst_codigo SIAOS.PROPOSTA.PST_CODIGO%TYPE;
  
  BEGIN
  
    SELECT PST_CODIGO
      INTO n_pst_codigo
      FROM SIAOS.PROPOSTA
     WHERE PRP_CODIGO = n_proposta;
  
    IF n_pst_codigo = 1 THEN
    
      FOR reg_dado_item IN (SELECT IPR_CODIGO
                              FROM ITEM_PROP
                             WHERE ITEM_PROP.PRP_CODIGO = n_proposta) LOOP
        DELETE FROM SIAOS.ITEM_PECA
         WHERE IPR_CODIGO = reg_dado_item.IPR_CODIGO;
        DELETE FROM SIAOS.ITEM_OS_PERIFERICO
         WHERE IPR_CODIGO = reg_dado_item.IPR_CODIGO;
        DELETE FROM SIAOS.ITEM_PECA
         WHERE IPR_CODIGO = reg_dado_item.IPR_CODIGO;
        DELETE FROM SIAOS.ITEM_OS_PERIFERICO
         WHERE IPR_CODIGO = reg_dado_item.IPR_CODIGO;
        DELETE FROM SIAOS.ITEM_PROP_DADO
         WHERE IPR_CODIGO = reg_dado_item.IPR_CODIGO;
        DELETE FROM SIAOS.ITEM_PROP
         WHERE IPR_COD_TR = reg_dado_item.IPR_CODIGO;
        DELETE FROM SIAOS.ITEM_P_D_REV
         WHERE IPR_CODIGO = reg_dado_item.IPR_CODIGO;
        DELETE FROM SGC.REVISAO
         WHERE IPR_CODIGO = reg_dado_item.IPR_CODIGO;
      END LOOP;
    
      COMMIT;
    
      -- Apaga proposta
    
      DELETE FROM SIAOS.PROP_ARQUIVO WHERE PRP_CODIGO = n_proposta;
      COMMIT;
      DELETE FROM SIAOS.ITEM_P_REV WHERE PRP_CODIGO = n_proposta;
      DELETE FROM SIAOS.PROP_PAG_REV WHERE PRP_CODIGO = n_proposta;
      DELETE FROM SIAOS.PROP_RECADO WHERE PRP_CODIGO = n_proposta;
      DELETE FROM SIAOS.PROPOSTA_REV WHERE PRP_CODIGO = n_proposta;
    
      DELETE FROM SIAOS.PROP_PAGTO WHERE PRP_CODIGO = n_proposta;
      DELETE FROM SIAOS.VENDEDOR_PROP WHERE PRP_CODIGO = n_proposta;
      DELETE FROM SIAOS.TRANSP_PROP WHERE PRP_CODIGO = n_proposta;
      DELETE FROM SIAOS.ITEM_PROP WHERE PRP_CODIGO = n_proposta;
      DELETE FROM SIAOS.PROP_SET WHERE PRP_CODIGO = n_proposta;
      DELETE FROM SIAOS.PROPOSTA WHERE PRP_CODIGO = n_proposta;
    
    ELSE
    
      SIAOS.PCK_SMART_SALES3.SP_CANCELA_PROPOSTA(n_proposta,
                                                 n_chapa,
                                                 NULL,
                                                 NULL);
    
    END IF;
  
    COMMIT;
  
  END SP_APAGA_PROPOSTA;

  ----------------------------------------------------------
  --------------------- APAGA PRODUTO ----------------------
  ----------------------------------------------------------

  PROCEDURE SP_APAGA_PRODUTO(n_ipr_cod IN INTEGER) IS
  
    n_proposta   SIAOS.ITEM_PROP.PRP_CODIGO%TYPE;
    n_item_prop  SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE;
    n_ipg_codigo SIAOS.ITEM_PROP.IPG_CODIGO%TYPE;
    n_qtd_item   INTEGER;
    n_erro       INTEGER;
  
  BEGIN
    BEGIN
      -- Apaga Produto da Proposta
      SELECT PRP_CODIGO, IPR_ITEM_PROP, IPG_CODIGO
        INTO n_proposta, n_item_prop, n_ipg_codigo
        FROM ITEM_PROP
       WHERE ITEM_PROP.IPR_CODIGO = n_ipr_cod;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_erro := 1;
    END;
  
    IF n_erro IS NULL THEN
    
      DELETE FROM ITEM_PROP WHERE IPR_CODIGO = n_ipr_cod;
    
      DELETE FROM SIAOS.ITEM_PROP_DIV
       WHERE PRP_CODIGO = n_proposta
         AND IPR_ITEM_PROP = n_item_prop;
    
      SGCPDIE.SP_DELETA_DOC_SER(n_ipr_cod);
    
      SIAOS.PCK_SMART_SALES3.SP_ARRUMA_GRUPO(n_proposta, n_ipg_codigo);
    
      COMMIT;
    
      SELECT NVL(COUNT(IPR_CODIGO), 0)
        INTO n_qtd_item
        FROM ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_proposta
         AND ITEM_PROP.IPR_ITEM_PROP = n_item_prop;
    
      IF n_qtd_item = 0 THEN
      
        DELETE FROM SIAOS.ITEM_PROP_UNI
         WHERE PRP_CODIGO = n_proposta
           AND IPR_ITEM_PROP = n_item_prop;
      
      END IF;
    
      COMMIT;
    
    END IF;
  END SP_APAGA_PRODUTO;

  ----------------------------------------------------------
  ------------------- ATUALIZA CLIENTE ---------------------
  ----------------------------------------------------------
  PROCEDURE SP_UP_CLIENTE(n_proposta IN INTEGER, n_cliente IN INTEGER) IS
    -- RETORA OS DADOS DO CLIENTE (SEM MOEDA RETORNA R$)
  
    c_moeda          SIAOS.COUNTRIES.MOEDA%TYPE;
    c_moedap         SIAOS.COUNTRIES.MOEDA%TYPE;
    c_idioma         SIAOS.COUNTRIES.IDIOMA%TYPE;
    c_embarque       SIAOS.CLIENTE.FORMAEMBAR%TYPE;
    c_entrega        SIAOS.CLIENTE.ENTREGA%TYPE;
    c_cobranca       SIAOS.CLIENTE.COBRANCA%TYPE;
    c_vendedor       SIAOS.CLIENTE.VENDEDOR%TYPE;
    c_vendedor2      SIAOS.CLIENTE.VENDEDOR%TYPE;
    c_flagmulta      SIAOS.CLIENTE.FLAGMULTA%TYPE;
    v_cont_com       SIAOS.CLIENTE.CONTATO%TYPE;
    v_cont_tec       SIAOS.CLIENTE.CONTATOTEC%TYPE;
    v_cont_fin       SIAOS.CLIENTE.CONTATOFIN%TYPE;
    c_territorio     SIAOS.CLIENTE.TERRITORIO%TYPE;
    v_ori_codigo     SIAOS.CLIENTE.ORIGEM%TYPE;
    n_vend_com       SIAOS.ARSALESP.PORCOMISSAO%TYPE;
    n_vend_com2      SIAOS.ARSALESP.PORCOMISSAO%TYPE;
    n_usu_chapa      SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_usu_chapa_v    SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_usu_chapa_ger  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_pais           SIAOS.COUNTRIES.COUNTRY_KEY%TYPE;
    n_cod_contato    INTEGER;
    n_erro           INTEGER;
    n_gdi_codigo     SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    c_incoterm       SIAOS.INCOTERM.CHAVE%TYPE;
    c_risco          CHAR(1);
    n_mpg_prioridade SIAOS.MODELO_PAGT.MPG_PRIORIDADE%TYPE;
    n_mpg_codigo     SIAOS.MODELO_PAGT.MPG_CODIGO%TYPE;
  
  BEGIN
    -- Insere o numero da proposta
    BEGIN
      SELECT USU_CHAPA
        INTO n_usu_chapa
        FROM SIAOS.USUARIO U
       WHERE UPPER(U.USU_LOGINWEB) = UPPER(USER);
    EXCEPTION WHEN OTHERS THEN
      n_usu_chapa := 1;
    END;
      
    BEGIN
    
      SELECT PP.PPE_INCOTERM
        INTO c_incoterm
        FROM SIAOS.PROP_PERSONAL PP
       WHERE PP.USU_CHAPA =
             (SELECT U.USU_CHAPA
                FROM SIAOS.USUARIO U
               WHERE UPPER(U.USU_LOGINWEB) = USER);
    
    EXCEPTION
      WHEN OTHERS THEN
      
        c_incoterm := NULL;
      
    END;
  
    SELECT P.ORI_CODIGO, P.IFI_CODIGO
      INTO v_ori_codigo, c_moedap
      FROM SIAOS.PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    SELECT NVL(B.MOEDA, 'R$') MOEDA,
           B.IDIOMA,
           A.FORMAEMBAR,
           A.ENTREGA,
           A.COBRANCA,
           A.VENDEDOR,
           V.USU_CHAPA,
           A.CONTATO,
           A.CONTATOTEC,
           A.CONTATOFIN,
           V.PORCOMISSAO,
           B.COUNTRY_KEY,
           A.TERRITORIO,
           A.CLI_VENDEDOR2,
           V2.USU_CHAPA,
           V2.PORCOMISSAO,
           NVL(TRIM(A.FLAGMULTA),0) FLAGMULTA,
           DECODE(NVL(TRIM(A.BLOQUEADO),0),0,A.MPG_CODIGO,NULL) MPG_CODIGO,
           DECODE(v_ori_codigo,
                  'IN',
                  'IN',
                  'RV',
                  'RV',
                  'RE',
                  'RE',
                  A.ORIGEM)
      INTO c_moeda,
           c_idioma,
           c_embarque,
           c_entrega,
           c_cobranca,
           c_vendedor,
           n_usu_chapa_v,
           v_cont_com,
           v_cont_tec,
           v_cont_fin,
           n_vend_com,
           n_pais,
           c_territorio,
           c_vendedor2,
           n_usu_chapa_ger,
           n_vend_com2,
           c_flagmulta,
           n_mpg_codigo,
           v_ori_codigo
      FROM SIAOS.CLIENTE   A,
           SIAOS.COUNTRIES B,
           SIAOS.ARSALESP  V,
           SIAOS.ARSALESP  V2
     WHERE A.PAIS = B.COUNTRY_KEY(+)
       AND A.VENDEDOR = V.SALESP_KEY(+)
       AND A.CLI_VENDEDOR2 = V2.SALESP_KEY(+)
       AND A.CODIGO = n_cliente;
  
    IF v_ori_codigo IS NOT NULL THEN
    
      SELECT GDI_CODIGO
        INTO n_gdi_codigo
        FROM ORIGEM O
       WHERE O.ORIGEM = v_ori_codigo;
    
      IF SQL%NOTFOUND THEN
        n_gdi_codigo := 18;
      END IF;
    
    END IF;
  
    IF TRIM(c_moeda) != TRIM(c_moedap) THEN
      SIAOS.PCK_SMART_SALES3.SP_ALTERA_PRECO_PROP(n_proposta);
    END IF;
  
    SIAOS.PCK_SMART_SALES3.SP_APAGA_TRANSPORTADORAS(n_proposta);
  
    IF c_embarque IS NOT NULL THEN
      SIAOS.PCK_SMART_SALES3.SP_INSERE_TRANSPORTADORA(n_proposta,
                                                      c_embarque);
    END IF;
  
    SIAOS.PCK_SMART_SALES3.SP_CLIENTE_TEMP(3,
                                           n_proposta,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL);
  
    UPDATE PROPOSTA
       SET IDI_CODIGO_MANUAL = c_idioma,
           CLI_CODIGO        = n_cliente,
           IFI_CODIGO        = c_moeda,
           PRP_TRANSPORTE    = c_incoterm,
           PRP_EMB_CODIGO    = c_entrega,
           PRP_COB_CODIGO    = c_cobranca,
           TERR_KEY          = c_territorio,
           CLI_CODIGO_NOT    = n_cliente,
           CLI_CODIGO_CON    = n_cliente,
           MVE_CODIGO        = NULL,
           ORI_CODIGO        = v_ori_codigo,
           PRP_MULTA         = c_flagmulta,
           CON_NUMERO_PGT    = NULL,
           PRP_PGT_STATUS    = NULL
     WHERE PRP_CODIGO = n_proposta;
  
    DELETE FROM SIAOS.PROP_PAGTO P WHERE PRP_CODIGO = n_proposta;
  
    IF nvl(n_pais, ' ') != 'BRA' THEN
      UPDATE PROPOSTA
         SET PRP_EXPORTACAO = '1',
             PRP_EMBALAGEM  = 1,
             PRP_PARCIAL    = 0,
             PRP_ANTECIPA   = 0
       WHERE PRP_CODIGO = n_proposta;
    ELSE
      UPDATE PROPOSTA
         SET PRP_EXPORTACAO = '0',
             PRP_EMBALAGEM  = 0,
             PRP_PARCIAL    = 1,
             PRP_ANTECIPA   = 1
       WHERE PRP_CODIGO = n_proposta;
    END IF;
  
    SIAOS.PCK_SMART_SALES3.SP_CONTATO(1,
                                      n_proposta,
                                      n_cod_contato,
                                      1,
                                      v_cont_com,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      0);
    SIAOS.PCK_SMART_SALES3.SP_CONTATO(1,
                                      n_proposta,
                                      n_cod_contato,
                                      2,
                                      v_cont_tec,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      0);
    SIAOS.PCK_SMART_SALES3.SP_CONTATO(1,
                                      n_proposta,
                                      n_cod_contato,
                                      3,
                                      v_cont_fin,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      NULL,
                                      0);
  
    IF n_gdi_codigo = 13 THEN
    
      c_vendedor := 'S/CDR';
      n_vend_com := 0;
    
    ELSIF n_gdi_codigo = 18 THEN
    
      c_vendedor := 'S/COM';
      n_vend_com := 0;
    
    ELSIF n_gdi_codigo = 6 THEN
    
      c_vendedor := 'S/CSZ';
      n_vend_com := 0;
    
    ELSE
    
      IF c_vendedor IS NULL THEN
      
        IF n_gdi_codigo = 3 OR n_gdi_codigo = 11 THEN
        
          c_vendedor := 'S/COM';
          n_vend_com := 0;
        
        ELSE
        
          c_vendedor := 'S/CSZ';
          n_vend_com := 0;
        
        END IF;
      
      END IF;
    
    END IF;
  
    DELETE FROM VENDEDOR_PROP WHERE PRP_CODIGO = n_proposta;
  
    SP_INSERE_VENDEDORES(n_proposta, c_vendedor, 100, 100, n_vend_com, 1);
    SP_IN_ASS_PROPOSTA(NULL, n_proposta, 4);
    SP_IN_ASS_PROPOSTA(n_usu_chapa_v, n_proposta, 1);
  
    IF (TRIM(c_vendedor2) IS NOT NULL) THEN
      BEGIN
        SP_INSERE_VENDEDORES(n_proposta,
                             c_vendedor2,
                             100,
                             0,
                             n_vend_com2,
                             2);
      EXCEPTION
        WHEN OTHERS THEN
          NULL;
      END;
    END IF;
    IF n_usu_chapa_ger IS NOT NULL THEN
      SP_IN_ASS_PROPOSTA(n_usu_chapa_ger, n_proposta, 1);
    END IF;
  
    IF (SF_USUARIO_MONTADORA = 0) THEN
      c_risco := INTEGRACAO.PCK_TOTVS_OS.SF_RISCO_CLI(n_cliente);
      IF c_risco!= 'A' THEN
        n_mpg_codigo := NULL;
      END IF;
    ELSE
      c_risco := 'A';
    END IF;
    
    IF n_mpg_codigo IS NULL THEN
      IF v_ori_codigo = 'CO' THEN
      
        SELECT MAX(M.MPG_PRIORIDADE)
          INTO n_mpg_prioridade
          FROM SIAOS.MODELO_PAGT M
         INNER JOIN SIAOS.MODELO_RISCO R
            ON M.MPG_CODIGO = R.MPG_CODIGO
         WHERE R.MRI_RISCO = c_risco
           AND M.MPG_AREA IN ('G', 'I')
           AND M.MPG_STATUS = 1;
      
      ELSE
      
        SELECT MIN(M.MPG_PRIORIDADE)
          INTO n_mpg_prioridade
          FROM SIAOS.MODELO_PAGT M
         INNER JOIN SIAOS.MODELO_RISCO R
            ON M.MPG_CODIGO = R.MPG_CODIGO
         WHERE R.MRI_RISCO = c_risco
           AND M.MPG_AREA IN ('G', 'N')
           AND M.MPG_STATUS = 1;
      
      END IF;
    
      IF n_mpg_prioridade IS NOT NULL THEN
        SELECT MAX(M.MPG_CODIGO)
          INTO n_mpg_codigo
          FROM SIAOS.MODELO_PAGT M
         WHERE M.MPG_PRIORIDADE = n_mpg_prioridade
           AND M.MPG_STATUS = 1;
      
      END IF;
    END IF;

    SIAOS.PCK_SMART_SALES3.SP_IN_MODELO_PAGTO(n_proposta, n_mpg_codigo, n_erro);

    /*
    BEGIN
    
      SELECT A.SALESP_KEY,
             A.PORCOMISSAO
        INTO c_vendedor3,
             n_vend_com3
        FROM CENTRO_CUSTO CC
       INNER JOIN ARSALESP A ON CC.USU_DIRETOR = A.USU_CHAPA
       WHERE CC.CC_CODIGO = '7.16.00.0'
         AND A.STATUS = 'A';
    
      IF c_vendedor3 IS NOT NULL THEN
         SP_INSERE_VENDEDORES(n_proposta, c_vendedor3, 100, 0, n_vend_com3, 3);
      END IF;
    
    EXCEPTION WHEN OTHERS THEN
      NULL;
    END;
    */
  
    --SIAOS.PCK_SMART_SALES3.SP_STATUS_CLI(n_proposta, 'P');
  
    COMMIT;
  
  END SP_UP_CLIENTE;

  ----------------------------------------------------------
  ---------------- ATUALIZA CLIENTE FINAL ------------------
  ----------------------------------------------------------

  PROCEDURE SP_UP_CLIENTE_FIM(n_proposta IN INTEGER, n_cliente IN INTEGER) IS
  
    v_pais   SIAOS.PROPOSTA.COUNTRY_KEY%TYPE;
    v_classe SIAOS.PROPOSTA.CLASS_KEY%TYPE;
  
  BEGIN
    -- Insere o numero da proposta
    BEGIN
      SELECT PAIS, CLASSE
        INTO v_pais, v_classe
        FROM CLIENTE
       WHERE CLIENTE.CODIGO = n_cliente;
    EXCEPTION
      WHEN OTHERS THEN
        v_pais   := NULL;
        v_classe := NULL;
    END;
  
    BEGIN
      UPDATE PROPOSTA
         SET CLI_CODIGO_FIM = n_cliente,
             COUNTRY_KEY    = v_pais,
             CLASS_KEY      = v_classe
       WHERE PRP_CODIGO = n_proposta;
      COMMIT;
    EXCEPTION
      WHEN OTHERS THEN
        UPDATE PROPOSTA
           SET CLI_CODIGO_FIM = n_cliente
         WHERE PRP_CODIGO = n_proposta;
    END;
  END SP_UP_CLIENTE_FIM;

  ---------------------------------------------------------------------
  ------ GRAVA CLIENTE TEMPORÁRIO -------------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_CLIENTE_TEMP(n_operacao        IN INTEGER,
                            n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            c_ori_codigo      IN SIAOS.PROPOSTA.ORI_CODIGO%TYPE,
                            vc2_cte_nome      IN SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE,
                            vc2_cte_endereco1 IN SIAOS.CLIENTE_TEMP.CTE_ENDERECO1%TYPE,
                            vc2_cte_endereco2 IN SIAOS.CLIENTE_TEMP.CTE_ENDERECO2%TYPE,
                            vc2_cte_endereco3 IN SIAOS.CLIENTE_TEMP.CTE_ENDERECO3%TYPE,
                            vc2_cte_cidade    IN SIAOS.CLIENTE_TEMP.CTE_CIDADE%TYPE,
                            n_est_codigo      IN SIAOS.CLIENTE_TEMP.EST_CODIGO%TYPE,
                            vc2_cte_estado    IN SIAOS.CLIENTE_TEMP.CTE_ESTADO%TYPE,
                            n_pai_codigo      IN SIAOS.CLIENTE_TEMP.PAI_CODIGO%TYPE,
                            vc2_cte_cep       IN SIAOS.CLIENTE_TEMP.CTE_CEP%TYPE,
                            vc2_cte_telefone  IN SIAOS.CLIENTE_TEMP.CTE_TELEFONE%TYPE,
                            vc2_cte_fax       IN SIAOS.CLIENTE_TEMP.CTE_FAX%TYPE,
                            vc2_cte_email     IN SIAOS.CLIENTE_TEMP.CTE_EMAIL%TYPE,
                            vc2_cte_cgc       IN SIAOS.CLIENTE_TEMP.CTE_CGC%TYPE,
                            vc2_cte_ie        IN SIAOS.CLIENTE_TEMP.CTE_IE%TYPE) IS
  
  BEGIN
  
    IF n_operacao = 1 THEN
    
      INSERT INTO CLIENTE_TEMP
        (PRP_CODIGO,
         CTE_NOME,
         CTE_ENDERECO1,
         CTE_ENDERECO2,
         CTE_ENDERECO3,
         CTE_CIDADE,
         EST_CODIGO,
         CTE_ESTADO,
         PAI_CODIGO,
         CTE_CEP,
         CTE_TELEFONE,
         CTE_FAX,
         CTE_EMAIL,
         CTE_CGC,
         CTE_IE)
      VALUES
        (n_prp_codigo,
         vc2_cte_nome,
         vc2_cte_endereco1,
         vc2_cte_endereco2,
         vc2_cte_endereco3,
         vc2_cte_cidade,
         n_est_codigo,
         vc2_cte_estado,
         n_pai_codigo,
         vc2_cte_cep,
         vc2_cte_telefone,
         vc2_cte_fax,
         vc2_cte_email,
         vc2_cte_cgc,
         vc2_cte_ie);
    
      UPDATE SIAOS.PROPOSTA
         SET CLI_CODIGO     = NULL,
             CLI_CODIGO_FIM = NULL,
             ORI_CODIGO     = c_ori_codigo
       WHERE PRP_CODIGO = n_prp_codigo;
    
    ELSIF n_operacao = 2 THEN
    
      UPDATE CLIENTE_TEMP
         SET CTE_NOME      = vc2_cte_nome,
             CTE_ENDERECO1 = vc2_cte_endereco1,
             CTE_ENDERECO2 = vc2_cte_endereco2,
             CTE_ENDERECO3 = vc2_cte_endereco3,
             CTE_CIDADE    = vc2_cte_cidade,
             EST_CODIGO    = n_est_codigo,
             CTE_ESTADO    = vc2_cte_estado,
             PAI_CODIGO    = n_pai_codigo,
             CTE_CEP       = vc2_cte_cep,
             CTE_TELEFONE  = vc2_cte_telefone,
             CTE_FAX       = vc2_cte_fax,
             CTE_EMAIL     = vc2_cte_email,
             CTE_CGC       = vc2_cte_cgc,
             CTE_IE        = vc2_cte_ie
       WHERE PRP_CODIGO = n_prp_codigo;
    
      UPDATE SIAOS.PROPOSTA
         SET CLI_CODIGO = NULL, CLI_CODIGO_FIM = NULL
       WHERE PRP_CODIGO = n_prp_codigo;
    
    ELSIF n_operacao = 3 THEN
    
      DELETE CLIENTE_TEMP WHERE PRP_CODIGO = n_prp_codigo;
    
      DELETE SIAOS.CONTATO_PROP WHERE PRP_CODIGO = n_prp_codigo;
    
    END IF;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END SP_CLIENTE_TEMP;

  ----------------------------------------------------------
  ------------------- SELECIONA PRODUTO --------------------
  ----------------------------------------------------------

  PROCEDURE SP_SE_PRODUTO1(n_prp_codigo     IN INTEGER,
                           v_pro_codigo     OUT VARCHAR2,
                           v_ipr_item       OUT VARCHAR2,
                           v_ipr_classe     OUT VARCHAR2,
                           n_ipr_quantidade OUT INTEGER,
                           n_ipr_item_prop  OUT INTEGER,
                           n_total_grupo    OUT INTEGER) IS
  BEGIN
  
    SELECT PRO_CODIGO,
           IPR_ITEM,
           IPR_CLASSE,
           IPR_QUANTIDADE,
           IPR_ITEM_PROP,
           COUNT(IPR_ITEM_PROP) TOTAL_GRUPO
      INTO v_pro_codigo,
           v_ipr_item,
           v_ipr_classe,
           n_ipr_quantidade,
           n_ipr_item_prop,
           n_total_grupo
      FROM SIAOS.ITEM_PROP
     WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
     GROUP BY PRO_CODIGO,
              IPR_ITEM,
              IPR_CLASSE,
              IPR_QUANTIDADE,
              IPR_ITEM_PROP;
  
  END SP_SE_PRODUTO1;

  ----------------------------------------------------------
  -------------- INSERE PRODUTOS NA PROPOSTA ---------------
  ----------------------------------------------------------

  PROCEDURE SP_IN_PRODUTO1(n_prp_codigo     IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           c_pro_codigo     IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                           n_ipr_quantidade IN SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE,
                           n_ipr_semana_ent IN SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE,
                           v_ipr_diversos   IN SIAOS.ITEM_PROP.IPR_DIVERSOS%TYPE,
                           n_ipr_nao_fab    IN SIAOS.ITEM_PROP.IPR_NAO_FAB%TYPE,
                           n_ipr_item       IN SIAOS.ITEM_PROP.IPR_ITEM%TYPE,
                           n_pas_codigo     IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE,
                           n_mpe_codigo     IN SIAOS.ITEM_PROP_UNI.MPE_CODIGO%TYPE,
                           n_ipr_item_prop  OUT SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE) IS
  
    n_itemizar        INTEGER;
    n_ipr_codigo      SIAOS.ITEM_PROP.IPR_CODIGO%TYPE;
    v_prp_dt_pedido   SIAOS.PROPOSTA.PRP_DT_PEDIDO%TYPE;
    v_prp_pedido      SIAOS.PROPOSTA.PRP_PEDIDO%TYPE;
    v_ori_codigo      SIAOS.PROPOSTA.ORI_CODIGO%TYPE;
    n_con_numero      SIAOS.PROPOSTA.CON_NUMERO%TYPE;
    v_ipr_pedido      SIAOS.ITEM_PROP.IPR_PEDIDO%TYPE;
    n_ipr_antecipa    SIAOS.ITEM_PROP.IPR_ANTECIPA%TYPE;
    d_ipr_dt_entrega  SIAOS.ITEM_PROP.IPR_DT_ENTREGA%TYPE;
    n_ipr_apnf        SIAOS.ITEM_PROP.IPR_APNF%TYPE;
    n_ipr_semana_ent2 SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
    d_ipr_dt_pedido   SIAOS.ITEM_PROP.IPR_DT_PEDIDO%TYPE;
    d_ipr_dt_contrat  SIAOS.ITEM_PROP.IPR_DT_CONTRAT%TYPE;
    v_ipr_prop_fil    SIAOS.ITEM_PROP.IPR_PROP_FIL%TYPE;
    v_ipr_os_fil      SIAOS.ITEM_PROP.IPR_OS_FIL%TYPE;
    v_pedido          SIAOS.ITEM_PROP.IPR_PEDIDO%TYPE;
    v_dt_pedido       SIAOS.ITEM_PROP.IPR_DT_PEDIDO%TYPE;
    n_semana_ent      SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
    c_ifi_codigo      SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    n_checa           INTEGER := 1;
    n_ipr_os_rev      SIAOS.ITEM_PROP.IPR_OS_REV%TYPE;
    n_ipr_item_rev    SIAOS.ITEM_PROP.IPR_ITEM_REV%TYPE;
    n_ipr_desc_cli    SIAOS.ITEM_PROP.IPR_DESC_CLI%TYPE;
    n_ipr_desc_fim    SIAOS.ITEM_PROP.IPR_DESC_FIM%TYPE;
    n_ipr_copia       SIAOS.ITEM_PROP.IPR_COPIA%TYPE;
    n_gdi_codigo      SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    n_semana          NUMBER(6);
    n_preco           NUMBER(11, 2);
    n_consulta        INTEGER;
    n_tem_grupo       INTEGER;
    n_erro            INTEGER;
    n_temdatasheet    SIAOS.PRODUTO.TEMDATASHEET%TYPE;
    n_ipg_codigo      SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE;
    n_ipr_folha       SIAOS.ITEM_PROP.IPR_FOLHA%TYPE;
    vc2_ccf           SIAOS.VM_PRODUTO.CCF%TYPE;
    n_ipi             SIAOS.ITEM_PROP.IPR_IPI%TYPE;
    n_iss             SIAOS.ITEM_PROP.IPR_ISS%TYPE;
    n_icms            SIAOS.ITEM_PROP.IPR_ICMS%TYPE;
    c_estado          SIAOS.ICMS.ESTADO%TYPE;
    --    n_servico         SIAOS.FAMILIA.SERVICO%TYPE;
    n_ipr_desconto    SIAOS.ITEM_PROP.IPR_DESCONTO%TYPE;
    n_cli_codigo      SIAOS.CLIENTE.CODIGO%TYPE;
    c_destmat         SIAOS.PROPOSTA.PRP_DESTINO%TYPE;
    n_top_codigo      SIAOS.PROPOSTA.TOP_CODIGO%TYPE;
    n_tes_recno       NUMBER(11);
    n_pis             SIAOS.SAPP.SAP_PIS%TYPE;
    n_cofins          SIAOS.SAPP.SAP_COFINS%TYPE;
    n_cfiscal         VARCHAR2(12);
    n_ipr_lote        SIAOS.ITEM_PROP.IPR_LOTE%TYPE;
    n_ipr_seman_cons  SIAOS.ITEM_PROP.IPR_SEMAN_CONS%TYPE;
    n_ipr_status_cons SIAOS.ITEM_PROP.IPR_STATUS_CONS%TYPE;
    n_ipr_semanas     SIAOS.ITEM_PROP.IPR_SEMANAS%TYPE;
    n_diferencial     INTEGER;
    n_per_dif         NUMBER(11, 2);
    n_substituicao    INTEGER;
    n_qtd_item        INTEGER;
    n_per_sub         NUMBER(11, 2);
  
  BEGIN
  
    BEGIN
    
      SELECT NVL(P.INE_CONSULTA, 0) CONSULTA,
             NVL(P.INE_ITEMIZAR, 0) ITEMIZAR,
             NVL(P.INE_TEMDS, 0) TEMDATASHEET
        INTO n_consulta, n_itemizar, n_temdatasheet
        FROM CADBASICO.ITEM_NEGOCIO P
       WHERE TRIM(P.INE_CODIGO) = TRIM(c_pro_codigo);
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20000,
                                'Produto não informado corretamente!');
    END;
  
    -- VERIFICA numero do item da proposta
    SELECT NVL(MAX(IPR_ITEM_PROP), 0) + 1 IPR_ITEM_PROP,
           NVL(COUNT(DISTINCT IPR_ITEM_PROP), 0)
      INTO n_ipr_item_prop, n_qtd_item
      FROM SIAOS.ITEM_PROP
     WHERE PRP_CODIGO = n_prp_codigo;
  
    IF n_qtd_item > 990 THEN
      RAISE_APPLICATION_ERROR(-20000,
                              'A Proposta atingiu a o limite de itens possivel!');
    ELSIF n_itemizar = 1 AND n_ipr_quantidade > 5000 THEN
      RAISE_APPLICATION_ERROR(-20000,
                              'O item atingiu a o limite de quantidade possivel! (Produto itemizado!)');
    END IF;
  
    BEGIN
    
      SELECT P.CLI_CODIGO,
             DECODE(P.CLI_CODIGO,
                    NULL,
                    (SELECT E.EST_SIGLA
                       FROM SIAOS.CLIENTE_TEMP CT
                      INNER JOIN GERAL.ESTADO E
                         ON CT.EST_CODIGO = E.EST_CODIGO
                      WHERE CT.PRP_CODIGO = P.PRP_CODIGO),
                    (SELECT E.EST_SIGLA
                       FROM SIAOS.CLIENTE C
                      INNER JOIN GERAL.ESTADO E
                         ON C.EST_CODIGO = E.EST_CODIGO
                      WHERE C.CODIGO = P.CLI_CODIGO)) EST_SIGLA,
             DECODE(P.PRP_DESTINO, 'C', 'F', P.PRP_DESTINO),
             P.TOP_CODIGO
        INTO n_cli_codigo, c_estado, c_destmat, n_top_codigo
        FROM SIAOS.PROPOSTA P
        LEFT JOIN SIAOS.CLIENTE_TEMP CT
          ON P.PRP_CODIGO = CT.PRP_CODIGO
        LEFT JOIN GERAL.ESTADO E
          ON CT.EST_CODIGO = E.EST_CODIGO
       WHERE P.PRP_CODIGO = n_prp_codigo;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        c_estado  := 'SP';
        c_destmat := 'F';
    END;
  
    INTEGRACAO.PCK_DADO_FISCAL.SP_IMP_ITEM(c_pro_codigo,
                         LPAD(n_cli_codigo, 6, '0'),
                         c_estado,
                         c_destmat,
                         n_tes_recno,
                         n_top_codigo,
                         n_ipi,
                         n_icms,
                         n_iss,
                         n_diferencial,
                         n_per_dif,
                         n_substituicao,
                         n_per_sub,
                         n_pis,
                         n_cofins,
                         n_cfiscal,
                         NULL);
  
    BEGIN
      SELECT P.CCF
        INTO vc2_ccf
        FROM CADBASICO.ITEM_NEGOCIO P
       WHERE TRIM(P.INE_CODIGO) = TRIM(c_pro_codigo);
    EXCEPTION
      WHEN OTHERS THEN
        vc2_ccf := NULL;
    END;
    /*
        IF vc2_ccf IS NULL THEN
          BEGIN
            SELECT CF.CCF
              INTO vc2_ccf
              FROM MULTGESTOR.FATCCF3 CF
             WHERE PRODUTO = (SELECT P.PRODUTO FROM MULTGESTOR.ESTPRO P WHERE P.MODELO = TRIM(c_pro_codigo))
               AND DATA_TERMINO IS NULL;
          EXCEPTION WHEN OTHERS THEN
            vc2_ccf := NULL;
          END;
        END IF;
    
        IF vc2_ccf IS NULL THEN
          BEGIN
            SELECT CF.CCF
              INTO vc2_ccf
              FROM MULTGESTOR.FATCCF CF
             WHERE TRIM(REPLACE(CF.CLASSIFICACAO,'.','')) = TRIM(n_cfiscal);
          EXCEPTION WHEN OTHERS THEN
            vc2_ccf := NULL;
          END;
        END IF;
    */
  
    /*
    SIAOS.PCK_SMART_SALES3.SP_IMPOSTOS_PRODUTO(c_pro_codigo,
                                               n_cli_codigo,
                                               c_estado,
                                               n_servico,
                                               vc2_ccf,
                                               n_ipi,
                                               n_iss,
                                               n_icms,
                                               n_erro);
    
    -- VERIFICA PEDIDO, DT PEDIDO E ORIGEM DA PROPOSTA
    */
    BEGIN
    
      SELECT PRP_DT_PEDIDO,
             PRP_PEDIDO,
             ORI_CODIGO,
             TRIM(IFI_CODIGO),
             ORIGEM.GDI_CODIGO,
             CON_NUMERO
        INTO v_prp_dt_pedido,
             v_prp_pedido,
             v_ori_codigo,
             c_ifi_codigo,
             n_gdi_codigo,
             n_con_numero
        FROM SIAOS.PROPOSTA
       INNER JOIN SIAOS.ORIGEM
          ON PROPOSTA.ORI_CODIGO = ORIGEM.ORIGEM
       WHERE PRP_CODIGO = n_prp_codigo;
    
    EXCEPTION
    
      WHEN NO_DATA_FOUND THEN
      
        v_prp_dt_pedido := NULL;
        v_prp_pedido    := NULL;
        v_ori_codigo    := NULL;
        n_gdi_codigo    := NULL;
        n_con_numero    := NULL;
      
    END;
  
    IF c_ifi_codigo != 'R$' THEN
      n_ipi  := NULL;
      n_iss  := NULL;
      n_icms := NULL;
    END IF;
  
    IF n_ipr_nao_fab = 1 THEN
      n_ipr_copia := 'N';
    ELSE
      n_ipr_copia := 'S';
    END IF;
  
    -- VERIFICA PEDIDO, DT PEDIDO.. DO ITEM
    BEGIN
    
      SELECT IPR_PEDIDO,
             IPR_ANTECIPA,
             IPR_DT_ENTREGA,
             IPR_APNF,
             IPR_SEMANA_ENT,
             IPR_DT_PEDIDO,
             IPR_DT_CONTRAT,
             IPR_PROP_FIL,
             IPR_OS_FIL,
             IPR_OS_REV,
             IPR_ITEM_REV,
             IPR_DESC_CLI,
             IPR_DESC_FIM,
             IPR_DESCONTO,
             --IPR_LOTE,
             IPR_SEMAN_CONS,
             IPR_STATUS_CONS,
             IPR_SEMANAS
        INTO v_ipr_pedido,
             n_ipr_antecipa,
             d_ipr_dt_entrega,
             n_ipr_apnf,
             n_ipr_semana_ent2,
             d_ipr_dt_pedido,
             d_ipr_dt_contrat,
             v_ipr_prop_fil,
             v_ipr_os_fil,
             n_ipr_os_rev,
             n_ipr_item_rev,
             n_ipr_desc_cli,
             n_ipr_desc_fim,
             n_ipr_desconto,
             --n_ipr_lote,
             n_ipr_seman_cons,
             n_ipr_status_cons,
             n_ipr_semanas
        FROM SIAOS.ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
         AND ITEM_PROP.IPR_CODIGO =
             (SELECT MAX(IPR_CODIGO)
                FROM ITEM_PROP
               WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo);
    
    EXCEPTION
    
      WHEN NO_DATA_FOUND THEN
      
        v_ipr_pedido      := NULL;
        n_ipr_antecipa    := NULL;
        n_ipr_apnf        := NULL;
        n_ipr_semana_ent2 := NULL;
        d_ipr_dt_pedido   := NULL;
        d_ipr_dt_contrat  := NULL;
        v_ipr_prop_fil    := NULL;
        v_ipr_os_fil      := NULL;
        n_checa           := NULL;
        n_ipr_os_rev      := NULL;
        n_ipr_item_rev    := NULL;
        n_ipr_desc_cli    := NULL;
        n_ipr_desc_fim    := NULL;
        n_ipr_desconto    := 1;
      
    END;
  
    IF n_checa IS NOT NULL THEN
      IF n_consulta != 0 THEN
      
        UPDATE SIAOS.ITEM_PROP
           SET ITEM_PROP.IPR_STATUS_CONS = NULL,
               ITEM_PROP.IPR_SEMAN_CONS  = NULL,
               ITEM_PROP.IPR_SEMANA_ENT  = NULL
         WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo;
      
        --n_ipr_lote        := NULL;
        n_ipr_seman_cons := NULL;
        n_ipr_semanas    := NULL;
      
      END IF;
    END IF;
  
    -- CHECA NUMEROS DE PEDIDO
    IF v_ipr_pedido IS NULL THEN
    
      v_pedido    := v_prp_pedido;
      v_dt_pedido := v_prp_dt_pedido;
    
    ELSE
    
      v_pedido    := v_ipr_pedido;
      v_dt_pedido := d_ipr_dt_pedido;
    
    END IF;
  
    BEGIN
      -- NUMERO DO LOTE
      SELECT NVL(MAX(IPR_LOTE), 1)
        INTO n_ipr_lote
        FROM SIAOS.ITEM_PROP
       WHERE PRP_CODIGO = n_prp_codigo;
    EXCEPTION
      WHEN OTHERS THEN
        n_ipr_lote := 1;
    END;
  
    -- BUSCA MAIOR DATA DE ENTREGA
    IF n_consulta = 0 THEN
    
      IF n_ipr_semana_ent2 > n_ipr_semana_ent THEN
      
        n_semana_ent := n_ipr_semana_ent2;
      
      ELSIF n_ipr_semana_ent IS NULL THEN
      
        n_semana_ent := n_ipr_semana_ent2;
      
      ELSE
      
        n_semana_ent := n_ipr_semana_ent;
      
      END IF;
    
    ELSE
    
      BEGIN
        -- NUMERO DO LOTE
        SELECT MAX(IPR_SEMANA_ENT)
          INTO n_semana_ent
          FROM SIAOS.ITEM_PROP
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_LOTE = n_ipr_lote;
      EXCEPTION
        WHEN OTHERS THEN
          n_semana_ent := NULL;
      END;
    
    END IF;
  
    -- NUMERO DO GRUPO
    SELECT NVL(MAX(IPG_CODIGO), 0)
      INTO n_tem_grupo
      FROM SIAOS.ITEM_PROP_GRUPO
     WHERE PRP_CODIGO = n_prp_codigo;
  
    IF n_tem_grupo = 0 THEN
      SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_ipg_codigo,
                                            n_prp_codigo,
                                            NULL,
                                            NULL,
                                            NULL);
    ELSE
      n_ipg_codigo := n_tem_grupo;
    END IF;
  
    -- NUMERO DA FOLHA
    SELECT NVL(MAX(IPR_FOLHA), 0) + 1
      INTO n_ipr_folha
      FROM SIAOS.ITEM_PROP
     WHERE PRP_CODIGO = n_prp_codigo
       AND IPG_CODIGO = n_ipg_codigo;
    BEGIN
    
      INSERT INTO SIAOS.ITEM_PROP_UNI
        (PRP_CODIGO,
         IPR_ITEM_PROP,
         IPU_VALOR_COTADO,
         CCF,
         PAS_CODIGO,
         TES_RECNO,
         IPU_NCM,
         MPE_CODIGO,
         IPU_TEM_DIF,
         IPU_PER_DIF,
         IPU_TEM_ST,
         IPU_PER_ST)
      VALUES
        (n_prp_codigo,
         n_ipr_item_prop,
         NULL,
         vc2_ccf,
         n_pas_codigo,
         n_tes_recno,
         TRIM(n_cfiscal),
         n_mpe_codigo,
         n_diferencial,
         n_per_dif,
         n_substituicao,
         n_per_sub);
    
    EXCEPTION
      WHEN OTHERS THEN
        NULL;
    END;
  
    -- INSERE ITEM NA PROPOSTA
    IF n_itemizar = 0 THEN
    
      -- BUSCA VALOR NA SEQUENCE
      INSERT INTO SIAOS.ITEM_PROP
        (PRP_CODIGO,
         PRO_CODIGO,
         IPR_QUANTIDADE,
         IPR_ITEM_PROP,
         IPR_ADICIONAL,
         IPR_DT_PEDIDO,
         IPR_PEDIDO,
         IPR_SEMANA_ENT,
         IPR_ANTECIPA,
         --               IPR_DT_ENTREGA,
         IPR_APNF,
         IPR_DT_CONTRAT,
         IPR_PROP_FIL,
         IPR_OS_FIL,
         IPR_DIVERSOS,
         IPR_NAO_FAB,
         IPR_CONS_PRAZO,
         IPR_OS_REV,
         IPR_ITEM_REV,
         IPR_DESC_CLI,
         IPR_DESC_FIM,
         IPR_COPIA,
         IPG_CODIGO,
         IPR_FOLHA,
         IPR_ISS,
         IPR_ICMS,
         IPR_IPI,
         IPR_DESCONTO,
         IPR_LOTE,
         IPR_SEMAN_CONS,
         IPR_STATUS_CONS,
         IPR_SEMANAS)
      VALUES
        (n_prp_codigo,
         RPAD(c_pro_codigo, 10, ' '),
         n_ipr_quantidade,
         n_ipr_item_prop,
         0,
         v_dt_pedido,
         v_pedido,
         n_semana_ent,
         n_ipr_antecipa,
         --               d_ipr_dt_entrega,
         n_ipr_apnf,
         d_ipr_dt_contrat,
         v_ipr_prop_fil,
         v_ipr_os_fil,
         v_ipr_diversos,
         n_ipr_nao_fab,
         n_con_numero,
         n_ipr_os_rev,
         n_ipr_item_rev,
         n_ipr_desc_cli,
         n_ipr_desc_fim,
         n_ipr_copia,
         n_ipg_codigo,
         n_ipr_folha,
         n_iss,
         n_icms,
         n_ipi,
         n_ipr_desconto,
         n_ipr_lote,
         n_ipr_seman_cons,
         n_ipr_status_cons,
         n_ipr_semanas)
      RETURNING IPR_CODIGO INTO n_ipr_codigo;
    
      IF n_ipr_item IS NOT NULL THEN
        SIAOS.PCK_SMART_SALES3.SP_UP_PRO_ITEM(n_prp_codigo,
                                              n_ipr_item,
                                              NULL,
                                              n_ipr_item_prop,
                                              NULL);
      END IF;
    
      IF v_ori_codigo = 'RP' THEN
      
        INSERT INTO SIAOS.ITEM_OS_PERIFERICO
          (IPR_CODIGO)
        VALUES
          (n_ipr_codigo);
      
      END IF;
    
      IF n_gdi_codigo = 13 THEN
      
        n_semana := TO_NUMBER(REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(0),
                                      '/',
                                      ''));
      
        UPDATE SIAOS.ITEM_PROP
           SET ITEM_PROP.IPR_SEMANA_ENT  = n_semana,
               ITEM_PROP.IPR_PESO_ITEM   = 0,
               ITEM_PROP.IPR_SEMAN_CONS  = 0,
               ITEM_PROP.IPR_LOTE        = 1,
               ITEM_PROP.IPR_STATUS_CONS = 'C'
         WHERE ITEM_PROP.IPR_CODIGO = n_ipr_codigo;
      
        INSERT INTO SIAOS.ITEM_REV (IPR_CODIGO) VALUES (n_ipr_codigo);
      
      END IF;
    
    ELSE
    
      FOR i IN 1 .. n_ipr_quantidade LOOP
      
        -- BUSCA VALOR NA SEQUENCE
        INSERT INTO SIAOS.ITEM_PROP
          (PRP_CODIGO,
           PRO_CODIGO,
           IPR_QUANTIDADE,
           IPR_ITEM_PROP,
           IPR_ADICIONAL,
           IPR_DT_PEDIDO,
           IPR_PEDIDO,
           IPR_SEMANA_ENT,
           IPR_ANTECIPA,
           --IPR_DT_ENTREGA,
           IPR_APNF,
           IPR_DT_CONTRAT,
           IPR_PROP_FIL,
           IPR_OS_FIL,
           IPR_DIVERSOS,
           IPR_NAO_FAB,
           IPR_CONS_PRAZO,
           IPR_ITEM,
           IPR_DESC_CLI,
           IPR_DESC_FIM,
           IPR_COPIA,
           IPG_CODIGO,
           IPR_FOLHA,
           IPR_ISS,
           IPR_ICMS,
           IPR_IPI,
           IPR_DESCONTO,
           IPR_LOTE,
           IPR_SEMAN_CONS,
           IPR_STATUS_CONS,
           IPR_SEMANAS)
        VALUES
          (n_prp_codigo,
           RPAD(c_pro_codigo, 10, ' '),
           1,
           n_ipr_item_prop,
           0,
           v_dt_pedido,
           v_pedido,
           n_semana_ent,
           n_ipr_antecipa,
           --d_ipr_dt_entrega,
           n_ipr_apnf,
           d_ipr_dt_contrat,
           v_ipr_prop_fil,
           v_ipr_os_fil,
           v_ipr_diversos,
           n_ipr_nao_fab,
           n_con_numero,
           n_ipr_item,
           n_ipr_desc_cli,
           n_ipr_desc_fim,
           n_ipr_copia,
           n_ipg_codigo,
           n_ipr_folha,
           n_iss,
           n_icms,
           n_ipi,
           n_ipr_desconto,
           n_ipr_lote,
           n_ipr_seman_cons,
           n_ipr_status_cons,
           n_ipr_semanas)
        RETURNING IPR_CODIGO INTO n_ipr_codigo;
      
        IF v_ori_codigo = 'RP' THEN
          INSERT INTO ITEM_OS_PERIFERICO
            (IPR_CODIGO)
          VALUES
            (n_ipr_codigo);
        END IF;
      
        IF n_gdi_codigo = 13 THEN
        
          n_semana := TO_NUMBER(REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(0),
                                        '/',
                                        ''));
        
          UPDATE SIAOS.ITEM_PROP
             SET ITEM_PROP.IPR_SEMANA_ENT  = n_semana,
                 ITEM_PROP.IPR_PESO_ITEM   = 0,
                 ITEM_PROP.IPR_SEMAN_CONS  = 0,
                 ITEM_PROP.IPR_LOTE        = 1,
                 ITEM_PROP.IPR_STATUS_CONS = 'C'
           WHERE ITEM_PROP.IPR_CODIGO = n_ipr_codigo;
        
          INSERT INTO SIAOS.ITEM_REV (IPR_CODIGO) VALUES (n_ipr_codigo);
        
        END IF;
      
      END LOOP;
    
    END IF;
  
    COMMIT;
  
    --SIAOS.PCK_SMART_SALES3.SP_ARRUMA_GRUPO(n_prp_codigo, n_ipg_codigo);
  
    SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP1(n_prp_codigo,
                                           n_ipr_item_prop,
                                           n_erro);
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo,
                                                   n_ipr_item_prop,
                                                   n_preco);
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_prp_codigo);
  
  END SP_IN_PRODUTO1;

  ----------------------------------------------------------
  -------------- INSERE SENSORES NA PROPOSTA ---------------
  ----------------------------------------------------------

  PROCEDURE SP_IN_PRODUTO2(n_prp_codigo     IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           n_sensor         IN SIAOS.ITEM_PROP.SENSOR%TYPE,
                           c_pro_codigo     IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                           c_ipr_item       IN SIAOS.ITEM_PROP.IPR_ITEM%TYPE,
                           c_ipr_classe     IN SIAOS.ITEM_PROP.IPR_CLASSE%TYPE,
                           n_ipr_item_prop  IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_ipr_quantidade IN SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE,
                           v_mpe_codigo     IN SUPRIMENTO.MATERIAL_PECA.MPE_CODIGO%TYPE,
                           n_erro           OUT INTEGER) IS
  
    n_ipr_codigo      SIAOS.ITEM_PROP.IPR_CODIGO%TYPE;
    v_prp_dt_pedido   SIAOS.PROPOSTA.PRP_DT_PEDIDO%TYPE;
    v_prp_pedido      SIAOS.PROPOSTA.PRP_PEDIDO%TYPE;
    v_pedido          SIAOS.PROPOSTA.PRP_PEDIDO%TYPE;
    v_dt_pedido       SIAOS.PROPOSTA.PRP_DT_PEDIDO%TYPE;
    n_prp_sen_res     SIAOS.ITEM_PROP.PRP_CODIGO%TYPE;
    v_ipr_pedido      SIAOS.ITEM_PROP.IPR_PEDIDO%TYPE;
    n_ipr_antecipa    SIAOS.ITEM_PROP.IPR_ANTECIPA%TYPE;
    d_ipr_dt_entrega  SIAOS.ITEM_PROP.IPR_DT_ENTREGA%TYPE;
    n_ipr_apnf        SIAOS.ITEM_PROP.IPR_APNF%TYPE;
    n_ipr_semana_ent2 SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
    d_ipr_dt_pedido   SIAOS.ITEM_PROP.IPR_DT_PEDIDO%TYPE;
    d_ipr_dt_contrat  SIAOS.ITEM_PROP.IPR_DT_CONTRAT%TYPE;
    v_ipr_prop_fil    SIAOS.ITEM_PROP.IPR_PROP_FIL%TYPE;
    v_ipr_os_fil      SIAOS.ITEM_PROP.IPR_OS_FIL%TYPE;
    c_ifi_codigo      SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    n_checa           INTEGER := 1;
    v_itemiza         SIAOS.PRODUTO.ITEMIZAR%TYPE;
    i                 INTEGER;
    n_ipr_desc_cli    SIAOS.ITEM_PROP.IPR_DESC_CLI%TYPE;
    n_ipr_desc_fim    SIAOS.ITEM_PROP.IPR_DESC_FIM%TYPE;
    n_gdi_codigo      SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    n_semana          NUMBER(6);
    n_itemizar        SIAOS.PRODUTO.ITEMIZAR%TYPE;
    n_temdatasheet    SIAOS.PRODUTO.TEMDATASHEET%TYPE;
    n_tem_grupo       INTEGER;
    n_ipg_codigo      SIAOS.ITEM_PROP.IPG_CODIGO%TYPE;
    n_ipr_folha       SIAOS.ITEM_PROP.IPR_FOLHA%TYPE;
    n_preco           NUMBER(11, 2);
    n_ipr_icms        SIAOS.ITEM_PROP.IPR_ICMS%TYPE;
    n_ipr_iss         SIAOS.ITEM_PROP.IPR_ISS%TYPE;
    n_ipr_ipi         SIAOS.ITEM_PROP.IPR_IPI%TYPE;
    n_ipi_iss         SIAOS.PRODUTO.IPI_ISS%TYPE;
    n_servico         SIAOS.FAMILIA.SERVICO%TYPE;
    n_ipr_desconto    SIAOS.ITEM_PROP.IPR_DESCONTO%TYPE;
    n_qtd_item_prop   INTEGER;
  
  BEGIN
  
    n_erro := 0;
  
    IF n_sensor IS NOT NULL THEN
    
      n_erro := 1;
    
      BEGIN
      
        -- VERIFICA SE SENSOR JÁ FOI SELECIONADO EM OUTRA PROPOSTA
        SELECT ITEM_PROP.PRP_CODIGO
          INTO n_prp_sen_res
          FROM SIAOS.ITEM_PROP
         WHERE ITEM_PROP.SENSOR = n_sensor
           AND ITEM_PROP.CONTROLE IS NULL;
      
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
          n_erro := 0;
      END;
    
      BEGIN
      
        -- VERIFICA SE SENSOR JÁ FOI SELECIONADO EM OUTRA PROPOSTA
        SELECT CAPACITIVO.ORDER_NO
          INTO n_prp_sen_res
          FROM SGC.CAPACITIVO
         WHERE CAPACITIVO.SENSOR = n_sensor;
      
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
          n_erro := 0;
      END;
    
    END IF;
  
    IF n_erro = 0 THEN
      -- VERIFICA CONSULTA, IPI E ISS
      BEGIN
      
        SELECT P.IPI_ISS, F.SERVICO
          INTO n_ipi_iss, n_servico
          FROM SIAOS.PRODUTO P, SIAOS.FAMILIA F
         WHERE P.FAMILIA = F.CODIGO
           AND P.PRODUTO = c_pro_codigo;
      
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
        
          n_ipi_iss := 0;
          n_servico := 0;
        
      END;
    
      IF n_servico = 1 THEN
        n_ipr_iss := n_ipi_iss;
        n_ipr_ipi := NULL;
      ELSE
        n_ipr_iss := NULL;
        n_ipr_ipi := n_ipi_iss;
      END IF;
    
      BEGIN
      
        SELECT PRP_DT_PEDIDO, PRP_PEDIDO, IFI_CODIGO, ORIGEM.GDI_CODIGO
          INTO v_prp_dt_pedido, v_prp_pedido, c_ifi_codigo, n_gdi_codigo
          FROM SIAOS.PROPOSTA, SIAOS.ORIGEM
         WHERE PROPOSTA.ORI_CODIGO = ORIGEM.ORIGEM
           AND PRP_CODIGO = n_prp_codigo;
      
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
        
          v_prp_dt_pedido := NULL;
          v_prp_pedido    := NULL;
          n_gdi_codigo    := NULL;
        
      END;
    
      -- VERIFICA SE PRODUTO ITEMIZA
      SELECT ITEMIZAR, TEMDATASHEET
        INTO n_itemizar, n_temdatasheet
        FROM SIAOS.PRODUTO
       WHERE PRODUTO = c_pro_codigo;
    
      IF n_temdatasheet = 1 THEN
      
        SELECT NVL(MAX(IPG_CODIGO), 0)
          INTO n_tem_grupo
          FROM SIAOS.ITEM_PROP_GRUPO
         WHERE PRP_CODIGO = n_prp_codigo;
      
        IF n_tem_grupo = 0 THEN
          SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_ipg_codigo,
                                                n_prp_codigo,
                                                NULL,
                                                NULL,
                                                NULL);
        ELSE
          n_ipg_codigo := n_tem_grupo;
        END IF;
      
      END IF;
    
      SELECT NVL(COUNT(IPR_CODIGO), 0), MAX(IPR_FOLHA)
        INTO n_qtd_item_prop, n_ipr_folha
        FROM SIAOS.ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
         AND ITEM_PROP.IPR_ITEM_PROP = n_ipr_item_prop;
    
      IF n_qtd_item_prop = 0 THEN
        -- NUMERO DA FOLHA
        SELECT NVL(MAX(IPR_FOLHA), 0) + 1
          INTO n_ipr_folha
          FROM SIAOS.ITEM_PROP
         WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
           AND ITEM_PROP.IPG_CODIGO = n_ipg_codigo;
      END IF;
    
      BEGIN
      
        -- VERIFICA PEDIDO, DT PEDIDO E ORIGEM DA PROPOSTA
        BEGIN
        
          SELECT PRP_DT_PEDIDO, PRP_PEDIDO, IFI_CODIGO, ORIGEM.GDI_CODIGO
            INTO v_prp_dt_pedido, v_prp_pedido, c_ifi_codigo, n_gdi_codigo
            FROM SIAOS.PROPOSTA, SIAOS.ORIGEM
           WHERE PROPOSTA.ORI_CODIGO = ORIGEM.ORIGEM
             AND PRP_CODIGO = n_prp_codigo;
        
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
          
            v_prp_dt_pedido := NULL;
            v_prp_pedido    := NULL;
            n_gdi_codigo    := NULL;
          
        END;
      
        -- VERIFICA PEDIDO, DT PEDIDO.. DO ITEM
        BEGIN
        
          SELECT DISTINCT IPR_PEDIDO,
                          IPR_ANTECIPA,
                          IPR_DT_ENTREGA,
                          IPR_APNF,
                          IPR_SEMANA_ENT,
                          IPR_DT_PEDIDO,
                          IPR_DT_CONTRAT,
                          IPR_PROP_FIL,
                          IPR_OS_FIL,
                          IPR_DESC_CLI,
                          IPR_DESC_FIM,
                          IPR_ICMS,
                          IPR_DESCONTO
            INTO v_ipr_pedido,
                 n_ipr_antecipa,
                 d_ipr_dt_entrega,
                 n_ipr_apnf,
                 n_ipr_semana_ent2,
                 d_ipr_dt_pedido,
                 d_ipr_dt_contrat,
                 v_ipr_prop_fil,
                 v_ipr_os_fil,
                 n_ipr_desc_cli,
                 n_ipr_desc_fim,
                 n_ipr_icms,
                 n_ipr_desconto
            FROM SIAOS.ITEM_PROP
           WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
             AND ITEM_PROP.IPR_CODIGO =
                 (SELECT MAX(IPR_CODIGO)
                    FROM ITEM_PROP
                   WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo);
        
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
          
            v_ipr_pedido      := NULL;
            d_ipr_dt_entrega  := NULL;
            n_ipr_semana_ent2 := NULL;
            d_ipr_dt_pedido   := NULL;
            d_ipr_dt_contrat  := NULL;
            v_ipr_prop_fil    := NULL;
            v_ipr_os_fil      := NULL;
            n_checa           := NULL;
            n_ipr_desc_cli    := NULL;
            n_ipr_desc_fim    := NULL;
            n_ipr_icms        := 12;
            n_ipr_desconto    := 1;
          
        END;
      
        IF n_checa IS NOT NULL THEN
        
          UPDATE SIAOS.ITEM_PROP
             SET ITEM_PROP.IPR_STATUS_CONS = NULL,
                 ITEM_PROP.IPR_SEMAN_CONS  = NULL
           WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo;
        
        END IF;
      
        -- CHECA NUMEROS DE PEDIDO
        IF v_ipr_pedido IS NULL THEN
        
          v_pedido    := v_prp_pedido;
          v_dt_pedido := v_prp_dt_pedido;
        
        ELSE
        
          v_pedido    := v_ipr_pedido;
          v_dt_pedido := d_ipr_dt_pedido;
        
        END IF;
      
        BEGIN
          INSERT INTO SIAOS.ITEM_PROP_UNI
            (PRP_CODIGO, IPR_ITEM_PROP, IPU_VALOR_COTADO)
          VALUES
            (n_prp_codigo, c_ipr_item, NULL);
        EXCEPTION
          WHEN OTHERS THEN
            NULL;
        END;
      
        IF v_mpe_codigo IS NULL THEN
          -- BUSCA VALOR NA SEQUENCE
          INSERT INTO SIAOS.ITEM_PROP
            (PRP_CODIGO,
             PRO_CODIGO,
             IPR_ITEM,
             IPR_QUANTIDADE,
             IPR_ITEM_PROP,
             IPR_ADICIONAL,
             IPR_DT_PEDIDO,
             IPR_PEDIDO,
             IPR_DT_CONTRAT,
             IPR_PROP_FIL,
             IPR_OS_FIL,
             IPR_SEMANA_ENT,
             IPR_DT_ENTREGA,
             SENSOR,
             IPR_DESC_CLI,
             IPR_DESC_FIM,
             IPG_CODIGO,
             IPR_FOLHA,
             IPR_ISS,
             IPR_ICMS,
             IPR_IPI,
             IPR_DESCONTO)
          VALUES
            (n_prp_codigo,
             RPAD(c_pro_codigo, 10, ' '),
             c_ipr_item,
             1,
             n_ipr_item_prop,
             0,
             v_dt_pedido,
             v_pedido,
             d_ipr_dt_contrat,
             v_ipr_prop_fil,
             v_ipr_os_fil,
             n_ipr_semana_ent2,
             d_ipr_dt_entrega,
             n_sensor,
             n_ipr_desc_cli,
             n_ipr_desc_fim,
             n_ipg_codigo,
             n_ipr_folha,
             n_ipr_iss,
             n_ipr_icms,
             n_ipr_ipi,
             n_ipr_desconto)
          RETURNING IPR_CODIGO INTO n_ipr_codigo;
        
          IF n_gdi_codigo = 13 THEN
          
            n_semana := TO_NUMBER(REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(0),
                                          '/',
                                          ''));
          
            UPDATE SIAOS.ITEM_PROP
               SET ITEM_PROP.IPR_SEMANA_ENT  = n_semana,
                   ITEM_PROP.IPR_PESO_ITEM   = 0,
                   ITEM_PROP.IPR_SEMAN_CONS  = 0,
                   ITEM_PROP.IPR_LOTE        = 1,
                   ITEM_PROP.IPR_STATUS_CONS = 'C'
             WHERE ITEM_PROP.IPR_CODIGO = n_ipr_codigo;
          
            INSERT INTO SIAOS.ITEM_REV (IPR_CODIGO) VALUES (n_ipr_codigo);
          
          END IF;
        
          BEGIN
            SGC.PCK_WINSGC.SP_RESERVA_SENSOR(n_ipr_codigo);
          
            COMMIT;
          
          EXCEPTION
            WHEN OTHERS THEN
            
              n_erro := 3;
              SP_APAGA_PRODUTO(n_ipr_codigo);
            
          END;
        
        ELSE
        
          SELECT ITEMIZAR
            INTO v_itemiza
            FROM SIAOS.PRODUTO
           WHERE PRODUTO.PRODUTO = c_pro_codigo;
        
          IF v_itemiza IS NULL THEN
          
            -- BUSCA VALOR NA SEQUENCE
            INSERT INTO SIAOS.ITEM_PROP
              (PRP_CODIGO,
               PRO_CODIGO,
               IPR_ITEM,
               IPR_CLASSE,
               IPR_QUANTIDADE,
               IPR_ITEM_PROP,
               IPR_ADICIONAL,
               IPR_DT_PEDIDO,
               IPR_PEDIDO,
               IPR_DT_CONTRAT,
               IPR_PROP_FIL,
               IPR_OS_FIL,
               IPR_SEMANA_ENT,
               IPR_DT_ENTREGA,
               SENSOR,
               IPR_DESC_CLI,
               IPR_DESC_FIM,
               IPG_CODIGO,
               IPR_FOLHA,
               IPR_ISS,
               IPR_ICMS,
               IPR_IPI,
               IPR_DESCONTO)
            VALUES
              (n_prp_codigo,
               RPAD(c_pro_codigo, 10, ' '),
               c_ipr_item,
               c_ipr_classe,
               n_ipr_quantidade,
               n_ipr_item_prop,
               0,
               v_dt_pedido,
               v_pedido,
               d_ipr_dt_contrat,
               v_ipr_prop_fil,
               v_ipr_os_fil,
               n_ipr_semana_ent2,
               d_ipr_dt_entrega,
               n_sensor,
               n_ipr_desc_cli,
               n_ipr_desc_fim,
               n_ipg_codigo,
               n_ipr_folha,
               n_ipr_iss,
               n_ipr_icms,
               n_ipr_ipi,
               n_ipr_desconto)
            RETURNING IPR_CODIGO INTO n_ipr_codigo;
          
            BEGIN
            
              SGCPDIE.SP_RESERVA_SER(n_ipr_codigo,
                                     v_mpe_codigo,
                                     n_ipr_quantidade,
                                     '');
              COMMIT;
            
            EXCEPTION
              WHEN OTHERS THEN
              
                n_erro := 3;
                SP_APAGA_PRODUTO(n_ipr_codigo);
              
            END;
          
          ELSE
          
            FOR I IN 1 .. n_ipr_quantidade LOOP
            
              -- BUSCA VALOR NA SEQUENCE
              INSERT INTO SIAOS.ITEM_PROP
                (PRP_CODIGO,
                 PRO_CODIGO,
                 IPR_ITEM,
                 IPR_CLASSE,
                 IPR_QUANTIDADE,
                 IPR_ITEM_PROP,
                 IPR_ADICIONAL,
                 IPR_DT_PEDIDO,
                 IPR_PEDIDO,
                 IPR_DT_CONTRAT,
                 IPR_PROP_FIL,
                 IPR_OS_FIL,
                 IPR_SEMANA_ENT,
                 IPR_DT_ENTREGA,
                 SENSOR,
                 IPR_DESC_CLI,
                 IPR_DESC_FIM,
                 IPG_CODIGO,
                 IPR_FOLHA,
                 IPR_ISS,
                 IPR_ICMS,
                 IPR_IPI,
                 ipr_desconto)
              VALUES
                (n_prp_codigo,
                 RPAD(c_pro_codigo, 10, ' '),
                 c_ipr_item,
                 c_ipr_classe,
                 1,
                 n_ipr_item_prop,
                 0,
                 v_dt_pedido,
                 v_pedido,
                 d_ipr_dt_contrat,
                 v_ipr_prop_fil,
                 v_ipr_os_fil,
                 n_ipr_semana_ent2,
                 d_ipr_dt_entrega,
                 n_sensor,
                 n_ipr_desc_cli,
                 n_ipr_desc_fim,
                 n_ipg_codigo,
                 n_ipr_folha,
                 n_ipr_iss,
                 n_ipr_icms,
                 n_ipr_ipi,
                 n_ipr_desconto)
              RETURNING IPR_CODIGO INTO n_ipr_codigo;
            
              BEGIN
                SGCPDIE.SP_RESERVA_SER(n_ipr_codigo, v_mpe_codigo, 1, '');
              
                COMMIT;
              
              EXCEPTION
                WHEN OTHERS THEN
                
                  n_erro := 3;
                  SP_APAGA_PRODUTO(n_ipr_codigo);
                
              END;
            
            END LOOP;
          
          END IF;
        
        END IF;
      
        COMMIT;
      
      EXCEPTION
        WHEN OTHERS THEN
        
          n_erro := 2;
          SP_APAGA_PRODUTO(n_ipr_codigo);
          SGCPDIE.SP_DELETA_DOC_SER(n_ipr_codigo);
        
      END;
    
    END IF;
  
    COMMIT;
  
    --SIAOS.PCK_SMART_SALES3.SP_ARRUMA_GRUPO(n_prp_codigo, n_ipg_codigo);
  
    SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP1(n_prp_codigo,
                                           n_ipr_item_prop,
                                           n_erro);
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_prp_codigo);
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo,
                                                   n_ipr_item_prop,
                                                   n_preco);
  
  End SP_IN_PRODUTO2;

  --======================================================--
  --                     NÃO USADA                        --
  ----------------------------------------------------------
  -------------- INSERE SENSORES NA PROPOSTA ---------------
  ----------------------------------------------------------

  Procedure SP_IN_PRODUTO3(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           n_serie         IN SIAOS.ITEM_PROP.IPR_N_SERIE%TYPE,
                           c_pro_codigo    IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                           c_ipr_item      IN SIAOS.ITEM_PROP.IPR_ITEM%TYPE,
                           n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_ipr_codigo    OUT SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                           n_erro          OUT INTEGER) IS
  
    v_prp_dt_pedido   SIAOS.PROPOSTA.PRP_DT_PEDIDO%TYPE;
    v_prp_pedido      SIAOS.PROPOSTA.PRP_PEDIDO%TYPE;
    v_pedido          SIAOS.PROPOSTA.PRP_PEDIDO%TYPE;
    v_dt_pedido       SIAOS.PROPOSTA.PRP_DT_PEDIDO%TYPE;
    v_ipr_pedido      SIAOS.ITEM_PROP.IPR_PEDIDO%TYPE;
    n_ipr_antecipa    SIAOS.ITEM_PROP.IPR_ANTECIPA%TYPE;
    d_ipr_dt_entrega  SIAOS.ITEM_PROP.IPR_DT_ENTREGA%TYPE;
    n_ipr_apnf        SIAOS.ITEM_PROP.IPR_APNF%TYPE;
    n_ipr_semana_ent2 SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
    d_ipr_dt_pedido   SIAOS.ITEM_PROP.IPR_DT_PEDIDO%TYPE;
    d_ipr_dt_contrat  SIAOS.ITEM_PROP.IPR_DT_CONTRAT%TYPE;
    v_ipr_prop_fil    SIAOS.ITEM_PROP.IPR_PROP_FIL%TYPE;
    v_ipr_os_fil      SIAOS.ITEM_PROP.IPR_OS_FIL%TYPE;
    n_ipr_preco       SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
    c_ifi_codigo      SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    n_consulta        SIAOS.ITEM_PROP.IPR_CONS_PRAZO%TYPE;
    n_checa           INTEGER := 1;
    n_ipr_desc_cli    SIAOS.ITEM_PROP.IPR_DESC_CLI%TYPE;
    n_ipr_desc_fim    SIAOS.ITEM_PROP.IPR_DESC_FIM%TYPE;
    n_gdi_codigo      SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    n_semana          NUMBER(6);
    n_itemizar        SIAOS.PRODUTO.ITEMIZAR%TYPE;
    n_temdatasheet    SIAOS.PRODUTO.TEMDATASHEET%TYPE;
    n_tem_grupo       INTEGER;
    n_ipg_codigo      SIAOS.ITEM_PROP.IPG_CODIGO%TYPE;
    n_ipr_folha       SIAOS.ITEM_PROP.IPR_FOLHA%TYPE;
    n_preco           NUMBER(11, 2);
  
  BEGIN
  
    -- VERIFICA SE PRODUTO ITEMIZA
    SELECT ITEMIZAR, TEMDATASHEET
      INTO n_itemizar, n_temdatasheet
      FROM SIAOS.PRODUTO
     WHERE PRODUTO = c_pro_codigo;
  
    IF n_temdatasheet = 1 THEN
    
      SELECT NVL(MAX(IPG_CODIGO), 0)
        INTO n_tem_grupo
        FROM SIAOS.ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo;
    
      IF n_tem_grupo = 0 THEN
        SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_ipg_codigo,
                                              n_prp_codigo,
                                              NULL,
                                              NULL,
                                              NULL);
      ELSE
        n_ipg_codigo := n_tem_grupo;
      END IF;
    
    END IF;
  
    -- NUMERO DA FOLHA
    SELECT NVL(MAX(IPR_FOLHA), 0) + 1
      INTO n_ipr_folha
      FROM SIAOS.ITEM_PROP
     WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
       AND ITEM_PROP.IPG_CODIGO = n_ipg_codigo;
  
    BEGIN
    
      -- VERIFICA PEDIDO, DT PEDIDO.. DO ITEM
      BEGIN
      
        SELECT CON_NUMERO
          INTO n_consulta
          FROM SIAOS.PROPOSTA
         WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
      
      EXCEPTION
      
        WHEN NO_DATA_FOUND THEN
        
          n_consulta := NULL;
        
      END;
    
      IF n_consulta = 0 THEN
        n_consulta := NULL;
      END IF;
    
      -- VERIFICA PEDIDO, DT PEDIDO E ORIGEM DA PROPOSTA
      BEGIN
      
        SELECT PRP_DT_PEDIDO, PRP_PEDIDO, IFI_CODIGO, ORIGEM.GDI_CODIGO
          INTO v_prp_dt_pedido, v_prp_pedido, c_ifi_codigo, n_gdi_codigo
          FROM SIAOS.PROPOSTA, SIAOS.ORIGEM
         WHERE PROPOSTA.ORI_CODIGO = ORIGEM.ORIGEM
           AND PRP_CODIGO = n_prp_codigo;
      
      EXCEPTION
      
        WHEN NO_DATA_FOUND THEN
        
          v_prp_dt_pedido := NULL;
          v_prp_pedido    := NULL;
          n_gdi_codigo    := NULL;
        
      END;
    
      -- VERIFICA PEDIDO, DT PEDIDO.. DO ITEM
      BEGIN
      
        SELECT DISTINCT IPR_PEDIDO,
                        IPR_ANTECIPA,
                        IPR_DT_ENTREGA,
                        IPR_APNF,
                        IPR_SEMANA_ENT,
                        IPR_DT_PEDIDO,
                        IPR_DT_CONTRAT,
                        IPR_PROP_FIL,
                        IPR_OS_FIL,
                        IPR_CONS_PRAZO,
                        IPR_DESC_CLI,
                        IPR_DESC_FIM
          INTO v_ipr_pedido,
               n_ipr_antecipa,
               d_ipr_dt_entrega,
               n_ipr_apnf,
               n_ipr_semana_ent2,
               d_ipr_dt_pedido,
               d_ipr_dt_contrat,
               v_ipr_prop_fil,
               v_ipr_os_fil,
               n_consulta,
               n_ipr_desc_cli,
               n_ipr_desc_fim
          FROM SIAOS.ITEM_PROP
         WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
           AND ROWNUM = 1
           AND ITEM_PROP.IPR_ITEM_PROP =
               (SELECT MAX(IPR_ITEM_PROP)
                  FROM ITEM_PROP
                 WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo);
      
      EXCEPTION
      
        WHEN NO_DATA_FOUND THEN
        
          v_ipr_pedido     := NULL;
          d_ipr_dt_pedido  := NULL;
          d_ipr_dt_contrat := NULL;
          v_ipr_prop_fil   := NULL;
          v_ipr_os_fil     := NULL;
          n_consulta       := NULL;
          n_checa          := NULL;
          n_ipr_desc_cli   := NULL;
          n_ipr_desc_fim   := NULL;
        
      END;
    
      SELECT PCK_PROPOSTA_OS3.SF_CALCULA_PRECO(c_pro_codigo,
                                               NULL,
                                               NULL,
                                               c_ifi_codigo) AS n_ipr_preco
        INTO n_ipr_preco
        FROM DUAL;
    
      IF n_checa IS NOT NULL THEN
      
        UPDATE SIAOS.ITEM_PROP
           SET ITEM_PROP.IPR_STATUS_CONS = NULL,
               ITEM_PROP.IPR_SEMAN_CONS  = NULL
         WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo;
      
      END IF;
    
      -- CHECA NUMEROS DE PEDIDO
      IF v_ipr_pedido IS NULL THEN
      
        v_pedido    := v_prp_pedido;
        v_dt_pedido := v_prp_dt_pedido;
      
      ELSE
      
        v_pedido    := v_ipr_pedido;
        v_dt_pedido := d_ipr_dt_pedido;
      
      END IF;
    
      -- BUSCA VALOR NA SEQUENCE
      INSERT INTO SIAOS.ITEM_PROP
        (PRP_CODIGO,
         PRO_CODIGO,
         IPR_ITEM,
         IPR_QUANTIDADE,
         IPR_ITEM_PROP,
         IPR_ADICIONAL,
         IPR_DT_PEDIDO,
         IPR_PEDIDO,
         IPR_N_SERIE,
         IPR_DT_CONTRAT,
         IPR_PROP_FIL,
         IPR_OS_FIL,
         --IPR_SEMANA_ENT,
         --IPR_DT_ENTREGA,
         IPR_PRECO,
         IPR_CONS_PRAZO,
         IPR_DESC_CLI,
         IPR_DESC_FIM,
         IPG_CODIGO,
         IPR_FOLHA)
      VALUES
        (n_prp_codigo,
         RPAD(c_pro_codigo, 10, ' '),
         c_ipr_item,
         1,
         n_ipr_item_prop,
         0,
         v_dt_pedido,
         v_pedido,
         n_serie,
         d_ipr_dt_contrat,
         v_ipr_prop_fil,
         v_ipr_os_fil,
         --                 n_ipr_semana_ent2,
         --                 d_ipr_dt_entrega,
         n_ipr_preco,
         n_consulta,
         n_ipr_desc_cli,
         n_ipr_desc_fim,
         n_ipg_codigo,
         n_ipr_folha)
      RETURNING IPR_CODIGO INTO n_ipr_codigo;
    
      IF n_gdi_codigo = 13 THEN
      
        n_semana := TO_NUMBER(REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(0),
                                      '/',
                                      ''));
      
        UPDATE SIAOS.ITEM_PROP
           SET ITEM_PROP.IPR_SEMANA_ENT  = n_semana,
               ITEM_PROP.IPR_PESO_ITEM   = 0,
               ITEM_PROP.IPR_SEMAN_CONS  = 0,
               ITEM_PROP.IPR_LOTE        = 1,
               ITEM_PROP.IPR_STATUS_CONS = 'C'
         WHERE ITEM_PROP.IPR_CODIGO = n_ipr_codigo;
      
        INSERT INTO SIAOS.ITEM_REV (IPR_CODIGO) VALUES (n_ipr_codigo);
      
      END IF;
    
      COMMIT;
    
    EXCEPTION
    
      WHEN OTHERS THEN
      
        n_erro := 2;
        SP_APAGA_PRODUTO(n_ipr_codigo);
      
    END;
  
    BEGIN
    
      SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP1(n_prp_codigo,
                                             n_ipr_item_prop,
                                             n_erro);
    
      COMMIT;
    
    EXCEPTION
    
      WHEN OTHERS THEN
      
        n_erro := 3;
        SP_APAGA_PRODUTO(n_ipr_codigo);
      
    END;
  
    --SIAOS.PCK_SMART_SALES3.SP_ARRUMA_GRUPO(n_prp_codigo, n_ipg_codigo);
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo,
                                                   n_ipr_item_prop,
                                                   n_preco);
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_prp_codigo);
  
  End SP_IN_PRODUTO3;

  ----------------------------------------------------------
  ----------- INSERE SELO REMOTO NA PROPOSTA ---------------
  ----------------------------------------------------------

  PROCEDURE SP_IN_SELO_REMO(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                            c_pro_codigo    IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                            n_ipr_selo_lado IN SIAOS.ITEM_PROP.IPR_SELO_LADO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_pas_codigo    IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE,
                            /*    n_ipr_semana_ent    IN   SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      n_ipr_dt_ent        IN   VARCHAR2,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
                            n_ipr_item_prop_sr OUT SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE) IS
  
    n_erro           INTEGER;
    v_prp_dt_pedido  SIAOS.PROPOSTA.PRP_DT_PEDIDO%TYPE;
    v_prp_pedido     SIAOS.PROPOSTA.PRP_PEDIDO%TYPE;
    v_ori_codigo     SIAOS.PROPOSTA.ORI_CODIGO%TYPE;
    n_gdi_codigo     SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    n_semana         NUMBER(6);
    n_ire_garantia   SIAOS.ITEM_REV.IRE_GARANTIA%TYPE;
    v_ire_local      SIAOS.ITEM_REV.IRE_LOCAL%TYPE;
    n_pri_codigo     SIAOS.ITEM_REV.PRI_CODIGO%TYPE;
    n_set_codigo     SIAOS.ITEM_REV.SET_CODIGO%TYPE;
    n_tcam_codigo    SIAOS.ITEM_REV.TCAM_CODIGO%TYPE;
    n_ipg_codigo     SIAOS.ITEM_PROP.IPG_CODIGO%TYPE;
    n_ipr_selo_lado2 SIAOS.ITEM_PROP.IPR_SELO_LADO%TYPE;
    n_qtd_lado_h     INTEGER;
    --n_qtd_lado_l      INTEGER;
  
  BEGIN
  
    -- VERIFICA PEDIDO, DT PEDIDO E ORIGEM DA PROPOSTA
    BEGIN
    
      SELECT PROPOSTA.PRP_DT_PEDIDO,
             PROPOSTA.PRP_PEDIDO,
             PROPOSTA.ORI_CODIGO,
             ORIGEM.GDI_CODIGO
        INTO v_prp_dt_pedido, v_prp_pedido, v_ori_codigo, n_gdi_codigo
        FROM SIAOS.PROPOSTA, SIAOS.ORIGEM
       WHERE PROPOSTA.ORI_CODIGO = ORIGEM.ORIGEM
         AND PRP_CODIGO = n_prp_codigo;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
      
        n_gdi_codigo := NULL;
      
    END;
    /*
    
         -- VERIFICA numero do item da proposta
         SELECT NVL(MAX(IPR_ITEM_PROP),0)+1 IPR_ITEM_PROP
          INTO n_ipr_item_prop_sr
           FROM ITEM_PROP
           WHERE PRP_CODIGO = n_prp_codigo;
    
         BEGIN
            INSERT
              INTO SIAOS.ITEM_PROP_UNI (PRP_CODIGO,IPR_ITEM_PROP,IPU_VALOR_COTADO)
            VALUES (n_prp_codigo,n_ipr_item_prop_sr,NULL);
         EXCEPTION WHEN OTHERS THEN
            NULL;
         END;
    
         SELECT DISTINCT TRIM(FAMILIA.CODIGO) COD_FAMILIA
           INTO v_familia
           FROM ITEM_PROP
               ,PRODUTO
               ,FAMILIA
          WHERE PRODUTO.PRODUTO         = ITEM_PROP.PRO_CODIGO
            AND PRODUTO.FAMILIA         = FAMILIA.CODIGO
            AND ITEM_PROP.PRP_CODIGO    = n_prp_codigo
            AND ITEM_PROP.IPR_ITEM_PROP = n_ipr_item_prop;
    
         IF v_familia = 'SR' THEN
    
            SELECT DISTINCT T.IPR_ITEM_PROP
              INTO n_ipr_item_tr
              FROM SIAOS.ITEM_PROP S,
                   SIAOS.ITEM_PROP T
             WHERE S.IPR_ITEM_PROP = n_ipr_item_prop
               AND S.PRP_CODIGO    =  n_prp_codigo
               AND S.IPR_COD_TR    = T.IPR_CODIGO;
    
          ELSE
    
            n_ipr_item_tr := n_ipr_item_prop;
    
          END IF;
    
         -- VERIFICA NUMRO DO ITEM
    
          FOR cs_nro_item IN(
          SELECT IPR_CODIGO,
                 IPR_SEMANA_ENT,
                 IPR_DT_ENTREGA,
                 IPR_CONS_PRAZO,
                 IPR_PEDIDO,
                 IPR_DT_PEDIDO,
                 IPR_APNF,
                 IPR_ANTECIPA,
                 IPR_DT_CONTRAT,
                 IPR_PROP_FIL,
                 IPR_OS_FIL,
                 IPR_DESC_CLI,
                 IPR_DESC_FIM,
                 IPG_CODIGO,
                 IPR_FOLHA,
                 IPR_ICMS,
                 IPR_IPI,
                 IPR_ISS
            FROM SIAOS.ITEM_PROP
           WHERE ITEM_PROP.IPR_ITEM_PROP = n_ipr_item_tr
             AND ITEM_PROP.PRP_CODIGO = n_prp_codigo)
          LOOP
    
            -- BUSCA VALOR NA SEQUENCE
                 n_ipg_codigo := cs_nro_item.IPG_CODIGO;
    
                 INSERT INTO
                   SIAOS.ITEM_PROP
                     (PRP_CODIGO,
                      PRO_CODIGO,
                      IPR_QUANTIDADE,
                      IPR_ITEM_PROP,
                      IPR_SELO_LADO,
                      IPR_COD_TR,
                      IPR_CONS_PRAZO,
                      IPR_PEDIDO,
                      IPR_DT_PEDIDO,
                      IPR_APNF,
                      IPR_ANTECIPA,
                      IPR_DT_CONTRAT,
                      IPR_PROP_FIL,
                      IPR_OS_FIL,
                      IPR_DESC_CLI,
                      IPR_DESC_FIM,
                      IPG_CODIGO,
                      IPR_FOLHA,
                      IPR_ICMS,
                      IPR_IPI,
                      IPR_ISS)
                 VALUES
                     (n_prp_codigo,
                      c_pro_codigo,
                      1,
                      n_ipr_item_prop_sr,
                      n_ipr_selo_lado,
                      cs_nro_item.IPR_CODIGO,
                      cs_nro_item.IPR_CONS_PRAZO,
                      cs_nro_item.IPR_PEDIDO,
                      cs_nro_item.IPR_DT_PEDIDO,
                      cs_nro_item.IPR_APNF,
                      cs_nro_item.IPR_ANTECIPA,
                      cs_nro_item.IPR_DT_CONTRAT,
                      cs_nro_item.IPR_PROP_FIL,
                      cs_nro_item.IPR_OS_FIL,
                      cs_nro_item.IPR_DESC_CLI,
                      cs_nro_item.IPR_DESC_FIM,
                      cs_nro_item.IPG_CODIGO,
                      cs_nro_item.IPR_FOLHA + 1,
                      cs_nro_item.IPR_ICMS,
                      cs_nro_item.IPR_IPI,
                      cs_nro_item.IPR_ISS)
            RETURNING IPR_CODIGO
                 INTO n_ipr_codigo;
    
                 IF n_gdi_codigo = 13 THEN
    
                    BEGIN
                      SELECT IRE_GARANTIA,
                             IRE_LOCAL,
                             PRI_CODIGO,
                             SET_CODIGO,
                             TCAM_CODIGO
                        INTO n_ire_garantia,
                             v_ire_local,
                             n_pri_codigo,
                             n_set_codigo,
                             n_tcam_codigo
                        FROM SIAOS.ITEM_REV
                       WHERE ITEM_REV.IPR_CODIGO = cs_nro_item.IPR_CODIGO;
                    EXCEPTION WHEN OTHERS THEN
                       n_erro  := 1;
                    END;
    
                    n_semana := TO_NUMBER(REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(0),'/',''));
    
                    UPDATE SIAOS.ITEM_PROP
                       SET ITEM_PROP.IPR_SEMANA_ENT  = n_semana,
                           ITEM_PROP.IPR_PESO_ITEM   = 0,
                           ITEM_PROP.IPR_SEMAN_CONS  = 0,
                           ITEM_PROP.IPR_LOTE        = 1,
                           ITEM_PROP.IPR_STATUS_CONS = 'C',
                           ITEM_PROP.IPR_VENDA_FIM   = 1,
                           ITEM_PROP.IPR_VENDA_CLI   = 1,
                           ITEM_PROP.IPR_ADICIONAL   = 0,
                           ITEM_PROP.IPR_DESC_FIM    = 0,
                           ITEM_PROP.IPR_DESC_CLI    = 0
                     WHERE ITEM_PROP.IPR_CODIGO      = n_ipr_codigo;
    
                    INSERT INTO SIAOS.ITEM_REV
                      (IPR_CODIGO)
                    VALUES
                      (n_ipr_codigo);
    
                    IF n_erro IS NULL THEN
                       SIAOS.PCK_SMART_SALES3.SP_UP_ITEM_REV(n_ipr_codigo,n_ire_garantia,v_ire_local,n_pri_codigo,n_set_codigo,n_tcam_codigo,n_erro);
                    END IF;
    
                  END IF;
    
                  SP_GRAVA_DADO_OPERACAO(c_pro_codigo,null,n_ipr_codigo);
    
            END LOOP;
    */
  
    FOR cs_nro_item IN (SELECT SUM(IP.IPR_QUANTIDADE) IPR_QUANTIDADE,
                               IP.IPR_DT_ENTREGA,
                               IP.IPR_CONS_PRAZO,
                               IP.IPR_PEDIDO,
                               IP.IPR_DT_PEDIDO,
                               IP.IPR_APNF,
                               IP.IPR_ANTECIPA,
                               IP.IPR_DT_CONTRAT,
                               IP.IPR_PROP_FIL,
                               IP.IPR_OS_FIL,
                               IP.IPR_DESC_CLI,
                               IP.IPR_DESC_FIM,
                               IP.IPG_CODIGO,
                               IP.IPR_ICMS,
                               IP.IPR_IPI,
                               IP.IPR_ISS,
                               IP.IPR_SEMANA_ENT,
                               IP.IPR_NAO_FAB,
                               IP.IPR_DESCONTO
                          FROM SIAOS.ITEM_PROP IP
                         WHERE IP.IPR_ITEM_PROP = n_ipr_item_prop
                           AND IP.PRP_CODIGO = n_prp_codigo
                         GROUP BY IP.IPR_DT_ENTREGA,
                                  IP.IPR_CONS_PRAZO,
                                  IP.IPR_PEDIDO,
                                  IP.IPR_DT_PEDIDO,
                                  IP.IPR_APNF,
                                  IP.IPR_ANTECIPA,
                                  IP.IPR_DT_CONTRAT,
                                  IP.IPR_PROP_FIL,
                                  IP.IPR_OS_FIL,
                                  IP.IPR_DESC_CLI,
                                  IP.IPR_DESC_FIM,
                                  IP.IPG_CODIGO,
                                  IP.IPR_ICMS,
                                  IP.IPR_IPI,
                                  IP.IPR_ISS,
                                  IP.IPR_SEMANA_ENT,
                                  IP.IPR_NAO_FAB,
                                  IP.IPR_DESCONTO) LOOP
    
      n_ipg_codigo := cs_nro_item.IPG_CODIGO;
    
      -- BUSCA VALOR NA SEQUENCE
      SIAOS.PCK_SMART_SALES3.SP_IN_PRODUTO1(n_prp_codigo,
                                            c_pro_codigo,
                                            cs_nro_item.IPR_QUANTIDADE,
                                            cs_nro_item.IPR_SEMANA_ENT,
                                            NULL,
                                            cs_nro_item.IPR_NAO_FAB,
                                            NULL,
                                            n_pas_codigo,
                                            NULL,
                                            n_ipr_item_prop_sr);
      /*
                   VALUES
                       (n_prp_codigo,
                        c_pro_codigo,
                        1,
                        n_ipr_item_prop_sr,
                        n_ipr_selo_lado,
                        cs_nro_item.IPR_CODIGO,
                        cs_nro_item.IPR_CONS_PRAZO,
                        cs_nro_item.IPR_PEDIDO,
                        cs_nro_item.IPR_DT_PEDIDO,
                        cs_nro_item.IPR_APNF,
                        cs_nro_item.IPR_ANTECIPA,
                        cs_nro_item.IPR_DT_CONTRAT,
                        cs_nro_item.IPR_PROP_FIL,
                        cs_nro_item.IPR_OS_FIL,
                        cs_nro_item.IPR_DESC_CLI,
                        cs_nro_item.IPR_DESC_FIM,
                        cs_nro_item.IPG_CODIGO,
                        cs_nro_item.IPR_FOLHA + 1,
                        cs_nro_item.IPR_ICMS,
                        cs_nro_item.IPR_IPI,
                        cs_nro_item.IPR_ISS)
              RETURNING IPR_CODIGO
                   INTO n_ipr_codigo;
      */
    
      FOR c_contr IN (SELECT IP2.IPR_CODIGO
                        FROM SIAOS.ITEM_PROP IP2
                       WHERE IP2.IPR_ITEM_PROP = n_ipr_item_prop_sr
                         AND IP2.PRP_CODIGO = n_prp_codigo) LOOP
      
        IF n_gdi_codigo = 13 THEN
        
          BEGIN
            SELECT IRE_GARANTIA,
                   IRE_LOCAL,
                   PRI_CODIGO,
                   SET_CODIGO,
                   TCAM_CODIGO
              INTO n_ire_garantia,
                   v_ire_local,
                   n_pri_codigo,
                   n_set_codigo,
                   n_tcam_codigo
              FROM SIAOS.ITEM_REV
             WHERE ITEM_REV.IPR_CODIGO = c_contr.IPR_CODIGO;
          EXCEPTION
            WHEN OTHERS THEN
              n_erro := 1;
          END;
        
          n_semana := TO_NUMBER(REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(0),
                                        '/',
                                        ''));
        
          UPDATE SIAOS.ITEM_PROP
             SET ITEM_PROP.IPR_SEMANA_ENT  = n_semana,
                 ITEM_PROP.IPR_PESO_ITEM   = 0,
                 ITEM_PROP.IPR_SEMAN_CONS  = 0,
                 ITEM_PROP.IPR_LOTE        = 1,
                 ITEM_PROP.IPR_STATUS_CONS = 'C',
                 ITEM_PROP.IPR_VENDA_FIM   = 1,
                 ITEM_PROP.IPR_VENDA_CLI   = 1,
                 ITEM_PROP.IPR_ADICIONAL   = 0,
                 ITEM_PROP.IPR_DESC_FIM    = 0,
                 ITEM_PROP.IPR_DESC_CLI    = 0
           WHERE ITEM_PROP.IPR_CODIGO = c_contr.IPR_CODIGO;
        
          INSERT INTO SIAOS.ITEM_REV
            (IPR_CODIGO)
          VALUES
            (c_contr.IPR_CODIGO);
        
          IF n_erro IS NULL THEN
            SIAOS.PCK_SMART_SALES3.SP_UP_ITEM_REV(c_contr.IPR_CODIGO,
                                                  n_ire_garantia,
                                                  v_ire_local,
                                                  n_pri_codigo,
                                                  n_set_codigo,
                                                  n_tcam_codigo,
                                                  n_erro);
          END IF;
        
        ELSE
        
          UPDATE SIAOS.ITEM_PROP
             SET ITEM_PROP.IPR_DESCONTO = cs_nro_item.IPR_DESCONTO,
                 ITEM_PROP.IPR_NAO_FAB  = cs_nro_item.IPR_NAO_FAB
           WHERE ITEM_PROP.IPR_CODIGO = c_contr.IPR_CODIGO;
        
        END IF;
      
      END LOOP;
    
    END LOOP;
  
    SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP1(n_prp_codigo,
                                           n_ipr_item_prop,
                                           n_erro);
  
    SIAOS.PCK_SMART_SALES3.SP_AMARRA_ITEMS(n_prp_codigo,
                                           n_ipr_item_prop,
                                           n_ipr_item_prop_sr,
                                           n_erro);
  
    IF n_ipr_selo_lado = 3 THEN
      SELECT NVL(SUM(IPU.IPR_ITEM_PROP), 0)
        INTO n_qtd_lado_h
        FROM SIAOS.ITEM_PROP_UNI IPU
       INNER JOIN SIAOS.ITEM_PROP IP
          ON IP.PRP_CODIGO = IPU.PRP_CODIGO
         AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
       WHERE IPU.PRP_CODIGO = n_prp_codigo
         AND IPU.IPR_ITEM_PAI = n_ipr_item_prop
         AND IP.IPR_SELO_LADO = 2;
      IF n_qtd_lado_h = 0 THEN
        n_ipr_selo_lado2 := 2;
      ELSE
        n_ipr_selo_lado2 := 1;
      END IF;
    ELSE
      IF n_ipr_selo_lado = 1 THEN
        n_ipr_selo_lado2 := 1;
      ELSE
        n_ipr_selo_lado2 := 2;
      END IF;
    END IF;
  
    UPDATE ITEM_PROP IP
       SET IP.IPR_LINK_MANUAL = 0,
           IP.IPR_SELO_LADO   = DECODE(SUBSTR(c_pro_codigo, 1, 2),
                                       'SR',
                                       n_ipr_selo_lado2,
                                       NULL),
           IP.IPG_CODIGO      = n_ipg_codigo
     WHERE IP.PRP_CODIGO = n_prp_codigo
       AND IP.IPR_ITEM_PROP = n_ipr_item_prop_sr;
  
    COMMIT;
  
    SIAOS.PCK_SMART_SALES3.SP_ARRUMA_GRUPO(n_prp_codigo, n_ipg_codigo);
  
    COMMIT;
  
  End SP_IN_SELO_REMO;

  -------------------------------------------------------------------
  -- INSERE DADOS DE OPERAÇÃO DO ITEM
  -------------------------------------------------------------------
  PROCEDURE SP_IN_DADOS_OP(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_erro          OUT INTEGER) IS
  
    c_ipr_item   SIAOS.ITEM_PROP.IPR_ITEM%TYPE;
    c_ipr_classe SIAOS.ITEM_PROP.IPR_CLASSE%TYPE;
  
  BEGIN
  
    SELECT TRIM(I.IPR_ITEM), TRIM(I.IPR_CLASSE)
      INTO c_ipr_item, c_ipr_classe
      FROM ITEM_PROP I
     WHERE I.PRP_CODIGO = n_prp_codigo
       AND I.IPR_ITEM_PROP = n_ipr_item_prop
       AND ROWNUM = 1;
  
    SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP1(n_prp_codigo,
                                           n_ipr_item_prop,
                                           n_erro);
    IF c_ipr_item IS NOT NULL THEN
      SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP2(n_prp_codigo,
                                             n_ipr_item_prop,
                                             n_erro);
    END IF;
    IF c_ipr_classe IS NOT NULL THEN
      SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP3(n_prp_codigo,
                                             n_ipr_item_prop,
                                             n_erro);
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
      n_erro := 1;
  END SP_IN_DADOS_OP;

  -------------------------------------------------------------------
  -- INSERE DADOS DE OPERAÇÃO DO ITEM
  -------------------------------------------------------------------
  PROCEDURE SP_IN_DADOS_OP1(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_erro          OUT INTEGER) IS
  
    c_valor_dado SIAOS.DADOPCAT.VALOR_DO_DADO%TYPE;
    n_idioma     INTEGER := 1;
    n_posicao    INTEGER := 1;
  
  BEGIN
  
    SELECT DECODE(NVL(P.PRP_EXPORTACAO,0),0,1,2)
      INTO n_idioma
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    IF SQL%NOTFOUND THEN
      n_idioma := 1;
    END IF;
  
    FOR reg_dados IN (SELECT I.PRO_CODIGO PRODUTO, I.IPR_CODIGO
                        FROM ITEM_PROP I
                       WHERE I.PRP_CODIGO = n_prp_codigo
                         AND I.IPR_ITEM_PROP = n_ipr_item_prop) LOOP
    
      FOR cur_dop IN (SELECT DO.NROCLAS,
                             DO.OPCLAS,
                             DO.IPD_VALOR,
                             DO.IPR_CODIGO,
                             DO.IPD_DESCRICAO_P,
                             DO.IPD_VALOR_DADO,
                             DO.IPD_TIPO
                        FROM ITEM_PROP I
                       INNER JOIN ITEM_PROP_DADO DO
                          ON DO.IPR_CODIGO = I.IPR_CODIGO
                       WHERE I.IPR_CODIGO = reg_dados.IPR_CODIGO
                         AND DO.STATUS = 'R'
                         AND (TRIM(I.PRO_CODIGO), DO.NROCLAS) NOT IN
                             (SELECT DR.INE_CODIGO, DR.DOP_POSICAO
                                FROM CADBASICO.DADOS_OPERA DR
                               WHERE DR.INE_CODIGO = TRIM(I.PRO_CODIGO)
                                 AND DR.CIT_TIPO IS NULL)
                       ORDER BY DO.NROCLAS, TRIM(DO.OPCLAS)) LOOP
      
        SP_GRAVA_BKP_DADO(cur_dop.IPR_CODIGO,
                          cur_dop.IPD_DESCRICAO_P,
                          cur_dop.NROCLAS,
                          cur_dop.IPD_VALOR_DADO,
                          cur_dop.IPD_TIPO);
      
        DELETE ITEM_PROP_DADO IPD
         WHERE IPD.NROCLAS = cur_dop.NROCLAS
           AND IPD.IPD_VALOR = cur_dop.IPD_VALOR
           AND IPD.IPR_CODIGO = cur_dop.IPR_CODIGO
           AND IPD.STATUS = 'R';
      
      END LOOP;
    
      FOR reg_parte IN (SELECT D.PRODUTO,
                               D.NROCLAS,
                               D.TIPODADO,
                               D.TAM_MAX,
                               D.PROMPT1,
                               D.PROMPT1P,
                               D.DEFAULT1,
                               D.PROMPT2,
                               D.DEFAULT2,
                               D.PROMPT3,
                               D.DEFAULT3
                          FROM (SELECT DO.INE_CODIGO PRODUTO,
                                       DO.DOP_POSICAO NROCLAS,
                                       DO.DOP_TPDADO TIPODADO,
                                       DO.DOP_TAM_MAX TAM_MAX,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP1,  n_idioma) PROMPT1,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP1,  1) PROMPT1P,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT1, n_idioma) DEFAULT1,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP2,  n_idioma) PROMPT2,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT2, n_idioma) DEFAULT2,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP3,  n_idioma) PROMPT3,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT3, n_idioma) DEFAULT3
                                  FROM CADBASICO.DADOS_OPERA DO
                                 WHERE DO.CIT_TIPO IS NULL
                                   AND DO.INE_CODIGO = TRIM(reg_dados.PRODUTO)) D
                         WHERE (D.PRODUTO, D.NROCLAS) NOT IN
                               (SELECT TRIM(I.PRO_CODIGO), DO.NROCLAS
                                  FROM ITEM_PROP I
                                 INNER JOIN ITEM_PROP_DADO DO
                                    ON DO.IPR_CODIGO = I.IPR_CODIGO
                                 WHERE I.IPR_CODIGO = reg_dados.IPR_CODIGO
                                   AND DO.STATUS = 'R')
                         ORDER BY D.NROCLAS) LOOP
      
        IF reg_parte.TIPODADO = 'CAL' THEN
          c_valor_dado := RPAD(SUBSTR(TRIM(reg_parte.DEFAULT2), 1, 13), 13 ,' ') ||
                          RPAD(SUBSTR(TRIM(reg_parte.DEFAULT3), 1, 13), 13 ,' ') ||
                          RPAD(SUBSTR(TRIM(reg_parte.DEFAULT1), 1, 13), 13 ,' ');
        ELSE
          SP_BUSCA_BKP_DADO(reg_dados.IPR_CODIGO,
                            reg_parte.PROMPT1,
                            reg_parte.NROCLAS,
                            c_valor_dado);
        
          IF c_valor_dado IS NULL THEN
            c_valor_dado := reg_parte.DEFAULT1;
          END IF;
        END IF;
      
        INSERT INTO ITEM_PROP_DADO
          (IPR_CODIGO,
           NROCLAS,
           OPCLAS,
           IPD_TIPO,
           IPD_VALOR,
           IPD_VALOR_DADO,
           STATUS,
           IPD_DESCRICAO_P,
           IPD_DESCRICAO_I,
           IPD_CANCELA)
        VALUES
          (reg_dados.IPR_CODIGO,
           reg_parte.NROCLAS,
           reg_parte.NROCLAS,
           reg_parte.TIPODADO,
           n_posicao,
           c_valor_dado,
           'R',
           reg_parte.PROMPT1P,
           reg_parte.PROMPT1,
           NULL);
      
      END LOOP;
    
    END LOOP;
  
    COMMIT;
  
  EXCEPTION WHEN OTHERS THEN
      n_erro := 1;
  END SP_IN_DADOS_OP1;

  -------------------------------------------------------------------
  -- INSERE DADOS DE OPERAÇÃO DO ITEM
  -------------------------------------------------------------------
  PROCEDURE SP_IN_DADOS_OP2(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_erro          OUT INTEGER) IS
  
    c_valor_dado  SIAOS.DADOPCAT.VALOR_DO_DADO%TYPE;
    c_opcao       VARCHAR2(2);
    n_posicao     INTEGER := 1;
    n_nroclas_aux INTEGER := 0;
    n_cal_exp     INTEGER := 0;
    --n_cal_exp_1        INTEGER := 0;
    n_cal_exp_2 INTEGER := 0;
    n_idioma    INTEGER := 1; -- 1 - BR, 2 - ENG
  
  BEGIN
  
    SELECT DECODE(NVL(P.PRP_EXPORTACAO,0),0,1,2)
      INTO n_idioma
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    IF SQL%NOTFOUND THEN
      n_idioma := 1;
    END IF;
  
    FOR reg_dados IN (SELECT I.IPR_CODIGO,
                             I.PRO_CODIGO PRODUTO,
                             TRIM(I.IPR_ITEM) ITEM
                        FROM ITEM_PROP I
                       WHERE I.PRP_CODIGO = n_prp_codigo
                         AND I.IPR_ITEM_PROP = n_ipr_item_prop) LOOP
    
      FOR cur_dop IN (SELECT DO.IPR_CODIGO,
                             I.PRO_CODIGO,
                             DO.IPD_DESCRICAO_P,
                             DO.IPD_VALOR_DADO,
                             DO.IPD_TIPO,
                             DO.NROCLAS,
                             DO.OPCLAS,
                             DO.STATUS,
                             DO.IPD_VALOR
                        FROM ITEM_PROP I
                       INNER JOIN ITEM_PROP_DADO DO
                          ON DO.IPR_CODIGO = I.IPR_CODIGO
                       WHERE I.IPR_CODIGO = reg_dados.IPR_CODIGO
                         AND DO.STATUS = 'C'
                         AND (TRIM(I.PRO_CODIGO), DO.NROCLAS, TRIM(DO.OPCLAS),
                              DO.STATUS) NOT IN
                             (SELECT DC.INE_CODIGO,
                                     DC.CIT_NROCLAS,
                                     DC.OIT_OPCAO,
                                     'C' STATUS
                                FROM CADBASICO.DADOS_OPERA DC
                               WHERE DC.INE_CODIGO = TRIM(reg_dados.PRODUTO)
                                 AND DC.CIT_TIPO = 1
                                 AND (DC.CIT_NROCLAS, DC.OIT_OPCAO) IN
                                     (SELECT ROWNUM         NROCLAS,
                                             T.COLUMN_VALUE OPCLAS
                                        FROM TABLE(SIAOS.PCK_DQANET.SF_SPLIT(SIAOS.PCK_DQANET.SF_SEPARAR(reg_dados.ITEM, ';', 1), ';')) T))
                       ORDER BY DO.NROCLAS, TRIM(DO.OPCLAS)) LOOP
      
        SP_GRAVA_BKP_DADO(cur_dop.IPR_CODIGO,
                          cur_dop.IPD_DESCRICAO_P,
                          cur_dop.NROCLAS,
                          cur_dop.IPD_VALOR_DADO,
                          cur_dop.IPD_TIPO);
      
        DELETE ITEM_PROP_DADO IPD
         WHERE IPD.NROCLAS = cur_dop.NROCLAS
           AND IPD.OPCLAS = cur_dop.OPCLAS
           AND IPD.IPD_VALOR = cur_dop.IPD_VALOR
           AND IPD.IPR_CODIGO = cur_dop.IPR_CODIGO
           AND IPD.STATUS = cur_dop.STATUS;
      
      END LOOP;
    
      FOR reg_parte IN (SELECT D.PRODUTO,
                               D.NROCLAS,
                               D.OPCLAS,
                               D.TIPODADO,
                               D.TAM_MAX,
                               D.PROMPT1,
                               D.PROMPT1P,
                               D.DEFAULT1,
                               D.PROMPT2,
                               D.DEFAULT2,
                               D.PROMPT3,
                               D.DEFAULT3,
                               'C' STATUS
                          FROM (SELECT DO.INE_CODIGO PRODUTO,
                                       DO.CIT_NROCLAS NROCLAS,
                                       DO.DOP_TPDADO TIPODADO,
                                       DO.DOP_TAM_MAX TAM_MAX,
                                       DO.OIT_OPCAO OPCLAS,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP1, n_idioma) PROMPT1,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP1, 1) PROMPT1P,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT1, n_idioma) DEFAULT1,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP2, n_idioma) PROMPT2,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT2, n_idioma) DEFAULT2,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP3, n_idioma) PROMPT3,
                                       SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT3, n_idioma) DEFAULT3
                                  FROM CADBASICO.DADOS_OPERA DO
                                 WHERE DO.INE_CODIGO = TRIM(reg_dados.PRODUTO)
                                   AND DO.CIT_TIPO = 1) D
                         WHERE (D.NROCLAS, TRIM(D.OPCLAS)) IN
                               (SELECT ROWNUM NROCLAS, T.COLUMN_VALUE OPCLAS
                                  FROM TABLE(SIAOS.PCK_DQANET.SF_SPLIT(SIAOS.PCK_DQANET.SF_SEPARAR(reg_dados.ITEM, ';', 1), ';')) T)
                           AND (D.PRODUTO, D.NROCLAS, TRIM(D.OPCLAS)) NOT IN
                               (SELECT I.PRO_CODIGO,
                                       DO.NROCLAS,
                                       TRIM(DO.OPCLAS)
                                  FROM ITEM_PROP I
                                 INNER JOIN ITEM_PROP_DADO DO
                                    ON DO.IPR_CODIGO = I.IPR_CODIGO
                                 WHERE I.IPR_CODIGO = reg_dados.IPR_CODIGO
                                   AND DO.STATUS = 'C')
                         ORDER BY D.NROCLAS, TRIM(D.OPCLAS)) LOOP
      
        IF reg_parte.NROCLAS != n_nroclas_aux THEN
          n_posicao     := 1;
          n_nroclas_aux := reg_parte.NROCLAS;
        END IF;
      
        IF reg_parte.TIPODADO = 'CAL' THEN
          n_cal_exp := CADBASICO.SF_APURA_DADOS_OPERA(TRIM(reg_dados.PRODUTO), 1, n_posicao, reg_parte.OPCLAS, 1);        
          IF n_cal_exp = 1 THEN
          
            --n_cal_exp_1 := CADBASICO.SF_APURA_DADOS_OPERA(TRIM(reg_dados.PRODUTO),1,n_posicao,reg_parte.OPCLAS,2);
            n_cal_exp_2 := CADBASICO.SF_APURA_DADOS_OPERA(TRIM(reg_dados.PRODUTO), 1, n_posicao, reg_parte.OPCLAS, 3);
            c_opcao     := SUBSTR(reg_dados.ITEM, n_cal_exp_2, 1);
          
            SELECT RPAD(SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(T.LEG_DEFAULT2, n_idioma), 13, ' ') || 
                   RPAD(SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(T.LEG_DEFAULT3, n_idioma), 13, ' ') || 
                   RPAD(SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(T.LEG_DEFAULT1, n_idioma), 13, ' ') DEFAULT1
              INTO c_valor_dado
              FROM CADBASICO.DAD_CLASSE T
             WHERE INE_CODIGO = TRIM(reg_dados.PRODUTO)
               AND CIT_TIPO = 1
               AND CIT_NROCLAS = n_posicao
               AND OIT_OPCAO = TRIM(reg_parte.OPCLAS)
               AND INE_CODIGO1 = TRIM(reg_dados.PRODUTO)
               AND CIT_TIPO1 = 1
               AND CIT_NROCLAS1 = n_cal_exp_2
               AND OIT_OPCAO1 = TRIM(c_opcao);
          
          ELSE          
            c_valor_dado := RPAD(SUBSTR(TRIM(reg_parte.DEFAULT2), 1, 13), 13 ,' ') ||
                            RPAD(SUBSTR(TRIM(reg_parte.DEFAULT3), 1, 13), 13 ,' ') ||
                            RPAD(SUBSTR(TRIM(reg_parte.DEFAULT1), 1, 13), 13 ,' ');
          END IF;
        
        ELSE
        
          SP_BUSCA_BKP_DADO(reg_dados.IPR_CODIGO,
                            reg_parte.PROMPT1P,
                            reg_parte.NROCLAS,
                            c_valor_dado);
        
          IF c_valor_dado IS NULL THEN
            c_valor_dado := reg_parte.DEFAULT1;
          END IF;
        END IF;
        BEGIN
          INSERT INTO ITEM_PROP_DADO
            (IPR_CODIGO,
             NROCLAS,
             OPCLAS,
             IPD_TIPO,
             IPD_VALOR_DADO,
             IPD_VALOR,
             STATUS,
             IPD_DESCRICAO_P,
             IPD_DESCRICAO_I,
             IPD_CANCELA)
          VALUES
            (reg_dados.IPR_CODIGO,
             reg_parte.NROCLAS,
             reg_parte.OPCLAS,
             reg_parte.TIPODADO,
             c_valor_dado,
             n_posicao,
             'C',
             reg_parte.PROMPT1P,
             reg_parte.PROMPT1,
             NULL);
        
          n_posicao := n_posicao + 1;
        
        EXCEPTION WHEN OTHERS THEN
            n_erro := 1;
        END;
      
      END LOOP;
    
      n_posicao := 1;
    
    END LOOP;
  
    COMMIT;
  
    --  EXCEPTION WHEN OTHERS THEN
    --    n_erro := 1;
  END SP_IN_DADOS_OP2;

  -------------------------------------------------------------------
  -- INSERE DADOS DE OPERAÇÃO DO ITEM
  -------------------------------------------------------------------
  PROCEDURE SP_IN_DADOS_OP3(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_erro          OUT INTEGER) IS
  
    c_valor_dado  SIAOS.DADOPCAT.VALOR_DO_DADO%TYPE;
    n_idioma      INTEGER := 1;
    n_posicao     INTEGER := 1;
    n_nroclas_aux INTEGER := 0;
  
  BEGIN
  
    SELECT DECODE(NVL(P.PRP_EXPORTACAO,0),0,1,2)
      INTO n_idioma
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    IF SQL%NOTFOUND THEN
      n_idioma := 1;
    END IF;
  
    FOR reg_dados IN (SELECT I.IPR_CODIGO,
                             I.PRO_CODIGO PRODUTO,
                             TRIM(I.IPR_CLASSE) IPR_CLASSE
                        FROM ITEM_PROP I
                       WHERE I.PRP_CODIGO = n_prp_codigo
                         AND I.IPR_ITEM_PROP = n_ipr_item_prop) LOOP
    
      FOR reg_parte IN (SELECT I.IPR_CODIGO,
                               DO.IPD_DESCRICAO_P,
                               DO.NROCLAS,
                               DO.IPD_VALOR_DADO,
                               DO.OPCLAS,
                               DO.IPD_VALOR,
                               DO.STATUS,
                               DO.IPD_TIPO
                          FROM ITEM_PROP I
                         INNER JOIN ITEM_PROP_DADO DO
                            ON DO.IPR_CODIGO = I.IPR_CODIGO
                         WHERE I.IPR_CODIGO = reg_dados.IPR_CODIGO
                           AND DO.STATUS = 'O'
                           AND (TRIM(I.PRO_CODIGO), DO.NROCLAS,
                                TRIM(DO.OPCLAS)) NOT IN
                               (SELECT DC.INE_CODIGO,
                                       DC.CIT_NROCLAS,
                                       DC.OIT_OPCAO
                                  FROM CADBASICO.DADOS_OPERA DC
                                 WHERE DC.INE_CODIGO = TRIM(I.PRO_CODIGO)
                                   AND DC.CIT_TIPO = 2
                                   AND DC.OIT_OPCAO IN
                                       (SELECT T.COLUMN_VALUE OPCLAS
                                          FROM TABLE(SIAOS.PCK_DQANET.SF_SPLIT(SIAOS.PCK_DQANET.SF_SEPARAR(reg_dados.IPR_CLASSE,
                                                                                                           ';',
                                                                                                           2),
                                                                               ';')) T))
                         ORDER BY DO.NROCLAS, TRIM(DO.OPCLAS)) LOOP
      
        SP_GRAVA_BKP_DADO(reg_parte.IPR_CODIGO,
                          reg_parte.IPD_DESCRICAO_P,
                          reg_parte.NROCLAS,
                          reg_parte.IPD_VALOR_DADO,
                          reg_parte.IPD_TIPO);
      
        DELETE ITEM_PROP_DADO IPD
         WHERE IPD.NROCLAS = reg_parte.NROCLAS
           AND IPD.OPCLAS = reg_parte.OPCLAS
           AND IPD.IPD_VALOR = reg_parte.IPD_VALOR
           AND IPD.STATUS = reg_parte.STATUS
           AND IPD.IPR_CODIGO = reg_parte.IPR_CODIGO;
      
      END LOOP;
    
      FOR reg_parte IN (SELECT DO.INE_CODIGO PRODUTO,
                               DO.CIT_NROCLAS NROCLAS,
                               DO.OIT_OPCAO OPCLAS,
                               DO.DOP_TPDADO TIPODADO,
                               DO.DOP_TAM_MAX TAM_MAX,
                               SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP1, 1) PROMPT1P,
                               SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP1, n_idioma) PROMPT1,
                               SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT1, n_idioma) DEFAULT1,
                               SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP2, n_idioma) PROMPT2,
                               SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT2, n_idioma) DEFAULT2,
                               SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DESCOP3, n_idioma) PROMPT3,
                               SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(LEG_DEFAULT3, n_idioma) DEFAULT3
                          FROM CADBASICO.DADOS_OPERA DO
                         WHERE DO.INE_CODIGO = TRIM(reg_dados.PRODUTO)
                           AND DO.CIT_TIPO = 2
                           AND DO.OIT_OPCAO IN
                               (SELECT T.COLUMN_VALUE OPCLAS
                                  FROM TABLE(SIAOS.PCK_DQANET.SF_SPLIT(SIAOS.PCK_DQANET.SF_SEPARAR(reg_dados.IPR_CLASSE, ';', 2), ';')) T)
                           AND (DO.INE_CODIGO, DO.CIT_NROCLAS,
                                TRIM(DO.OIT_OPCAO)) NOT IN
                               (SELECT TRIM(I.PRO_CODIGO),
                                       DO.NROCLAS,
                                       TRIM(DO.OPCLAS)
                                  FROM ITEM_PROP I
                                 INNER JOIN ITEM_PROP_DADO DO
                                    ON DO.IPR_CODIGO = I.IPR_CODIGO
                                 WHERE I.IPR_CODIGO = reg_dados.IPR_CODIGO
                                   AND DO.STATUS = 'O')
                         ORDER BY DO.CIT_NROCLAS, DO.OIT_OPCAO) LOOP
      
        IF reg_parte.NROCLAS != n_nroclas_aux THEN
          n_posicao     := 1;
          n_nroclas_aux := reg_parte.NROCLAS;
        END IF;
      
        IF reg_parte.TIPODADO = 'CAL' THEN
          c_valor_dado := SUBSTR(reg_parte.DEFAULT2, 1, 13) ||
                          SUBSTR(reg_parte.DEFAULT3, 1, 13) ||
                          SUBSTR(reg_parte.DEFAULT1, 1, 13);
        ELSE
          SP_BUSCA_BKP_DADO(reg_dados.IPR_CODIGO,
                            reg_parte.PROMPT1P,
                            reg_parte.NROCLAS,
                            c_valor_dado);
        
          IF c_valor_dado IS NULL THEN
            c_valor_dado := reg_parte.DEFAULT1;
          END IF;
        END IF;
      
        INSERT INTO ITEM_PROP_DADO
          (IPR_CODIGO,
           NROCLAS,
           OPCLAS,
           IPD_TIPO,
           IPD_VALOR,
           IPD_VALOR_DADO,
           STATUS,
           IPD_DESCRICAO_P,
           IPD_DESCRICAO_I,
           IPD_CANCELA)
        VALUES
          (reg_dados.IPR_CODIGO,
           reg_parte.NROCLAS,
           reg_parte.OPCLAS,
           reg_parte.TIPODADO,
           n_posicao,
           c_valor_dado,
           'O',
           reg_parte.PROMPT1P,
           reg_parte.PROMPT1,
           NULL);
      
        n_posicao := n_posicao + 1;
      
      END LOOP;
    
      n_posicao := 1;
    
    END LOOP;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
      n_erro := 1;
  END SP_IN_DADOS_OP3;

  ----------------------------------------------------------
  --------   TRAS DADOS DO ITEM DA PROPOSTA      -----------
  ----------------------------------------------------------

  Procedure SP_SE_DADOS_ITEM(n_prp_codigo     IN INTEGER,
                             n_ipr_item_prop  IN INTEGER,
                             v2_ipr_item_prop OUT VARCHAR2,
                             v2_qtd           OUT VARCHAR2,
                             v2_produto       OUT VARCHAR2,
                             v2_ipr_obs       OUT VARCHAR2,
                             v2_familia       OUT VARCHAR2,
                             v2_desc_port     OUT VARCHAR2,
                             v2_desc_ingl     OUT VARCHAR2) IS
  
    n_qtd_item        INTEGER;
    v2_qtd_item       VARCHAR2(200);
    n_ipr_quantidade  INTEGER;
    v2_ipr_quantidade VARCHAR2(200);
  
  BEGIN
  
    -- SELECIONA DADOS DO ITEM DA PROPOSTA --
  
    SELECT TRIM(TO_CHAR(IPR_ITEM_PROP, '99,999,000')) AS IPR_ITEM_PROP,
           TRIM(COUNT(IPR_QUANTIDADE)) AS QTD_ITEM,
           TRIM(TO_CHAR(COUNT(IPR_QUANTIDADE), '99,999,000')) AS QTD_ITEM2,
           TRIM(IPR_QUANTIDADE) AS IPR_QUANTIDADE,
           TRIM(TO_CHAR(IPR_QUANTIDADE, '99,999,000')) AS IPR_QUANTIDADE2,
           PCK_SMART_SALES3.SF_MASCARA_DO_ITEM(PRO_CODIGO,
                                               IPR_ITEM,
                                               IPR_CLASSE) PRODUTO,
           IPR_OBS,
           FAMILIA.DESCRICAO,
           PRODUTO.DESCRICAO1,
           PRODUTO.DESCRICAO2
      INTO v2_ipr_item_prop,
           n_qtd_item,
           v2_qtd_item,
           n_ipr_quantidade,
           v2_ipr_quantidade,
           v2_produto,
           v2_ipr_obs,
           v2_familia,
           v2_desc_port,
           v2_desc_ingl
      FROM ITEM_PROP, PRODUTO, FAMILIA
     WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
       AND ITEM_PROP.IPR_ITEM_PROP = n_ipr_item_prop
       AND PRODUTO.PRODUTO = ITEM_PROP.PRO_CODIGO
       AND PRODUTO.FAMILIA = FAMILIA.CODIGO
     GROUP BY IPR_ITEM_PROP,
              IPR_QUANTIDADE,
              PRO_CODIGO,
              IPR_OBS,
              IPR_ITEM,
              IPR_CLASSE,
              FAMILIA.DESCRICAO,
              PRODUTO.DESCRICAO1,
              PRODUTO.DESCRICAO2;
  
    -- AJUSTA VALOR DA QUANTIDADE --
  
    IF n_qtd_item >= n_ipr_quantidade THEN
    
      v2_qtd := v2_qtd_item;
    
    ELSE
    
      v2_qtd := v2_ipr_quantidade;
    
    END IF;
  
  END SP_SE_DADOS_ITEM;

  ----------------------------------------------------------
  ---------- GRAVA ITENS DO PRODUTO NA PROPOSTA-------------
  ----------------------------------------------------------

  PROCEDURE SP_CAD_ITEM_DIV(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            n_ipr_item_prop IN SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE,
                            n_ipi_codigo    IN OUT SIAOS.ITEM_PROP_DIV.IPI_CODIGO%TYPE,
                            v_ipi_descricao IN SIAOS.ITEM_PROP_DIV.IPI_DESCRICAO%TYPE,
                            n_ipi_oculta    IN SIAOS.ITEM_PROP_DIV.IPI_OCULTA%TYPE) IS
  
    n_ref         INTEGER := 140;
    n_pos         INTEGER;
    n_corte       INTEGER;
    n_ipi_codigo2 SIAOS.ITEM_PROP_DIV.IPI_CODIGO%TYPE;
  
  BEGIN
  
    IF n_ipi_codigo IS NULL THEN
    
      SELECT MAX(NVL(IPI_CODIGO, 0)) + 1 PROX_IPI_CODIGO
        INTO n_ipi_codigo
        FROM SIAOS.ITEM_PROP_DIV
       WHERE IPR_ITEM_PROP = n_ipr_item_prop
         AND PRP_CODIGO = n_prp_codigo;
    
      IF n_ipi_codigo IS NULL THEN
        n_ipi_codigo := 1;
      END IF;
    
      n_pos := NVL(INSTR(SUBSTR(v_ipi_descricao, 1, n_ref), ' ', -1, 1), 0);
    
      IF n_pos <= n_ref AND n_pos > 0 AND
         LENGTH(TRIM(v_ipi_descricao)) > n_ref THEN
        n_corte := n_pos;
      ELSE
        n_corte := n_ref;
      END IF;
    
      INSERT INTO SIAOS.ITEM_PROP_DIV
        (PRP_CODIGO, IPR_ITEM_PROP, IPI_CODIGO, IPI_DESCRICAO, IPI_OCULTA)
      VALUES
        (n_prp_codigo,
         n_ipr_item_prop,
         n_ipi_codigo,
         SUBSTR(v_ipi_descricao, 1, n_corte),
         n_ipi_oculta);
    
      n_ipi_codigo2 := NULL;
    
      IF LENGTH(TRIM(v_ipi_descricao)) > n_ref THEN
      
        SP_CAD_ITEM_DIV(n_prp_codigo,
                        n_ipr_item_prop,
                        n_ipi_codigo2,
                        SUBSTR(v_ipi_descricao,
                               n_corte + 1,
                               LENGTH(TRIM(v_ipi_descricao))),
                        n_ipi_oculta);
      
      END IF;
    
    ELSE
    
      UPDATE SIAOS.ITEM_PROP_DIV
         SET IPI_DESCRICAO = v_ipi_descricao, IPI_OCULTA = n_ipi_oculta
       WHERE IPR_ITEM_PROP = n_ipr_item_prop
         AND PRP_CODIGO = n_prp_codigo
         AND IPI_CODIGO = n_ipi_codigo;
    
    END IF;
  
    --    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_prp_codigo);
  
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END SP_CAD_ITEM_DIV;

  ----------------------------------------------------------
  ---------- GRAVA ITENS DO PRODUTO NA PROPOSTA-------------
  ----------------------------------------------------------

  Procedure SP_UP_PRO_ITEM(n_prp_codigo    IN INTEGER,
                           c_ipr_item      IN CHAR,
                           c_ipr_obs       IN CHAR,
                           n_ipr_item_prop IN INTEGER,
                           c_iop_nserie    IN VARCHAR2) IS
  
    c_produto    SIAOS.ITEM_PROP.PRO_CODIGO%TYPE;
    c_item       SIAOS.ITEM_PROP.IPR_ITEM%TYPE;
    n_tipo_selo  SIAOS.OPCAO.SELOREMO%TYPE;
    n_ipr_preco  SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
    c_ifi_codigo SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    c_ipr_obs2   SIAOS.ITEM_PROP.IPR_OBS%TYPE;
    c_old_item   SIAOS.ITEM_PROP.IPR_ITEM%TYPE;
    c_old_obs    SIAOS.ITEM_PROP.IPR_OBS%TYPE;
    n_consulta   SIAOS.PRODUTO.CONSULTA%TYPE;
    n_erro       INTEGER := 0;
  
  BEGIN
  
    c_ipr_obs2 := REPLACE(c_ipr_obs, '##', '"');
    c_ipr_obs2 := REPLACE(c_ipr_obs2, '**', '''');
  
    SELECT DISTINCT IPR_ITEM,
                    IPR_OBS,
                    PROPOSTA.IFI_CODIGO,
                    ITEM_PROP.PRO_CODIGO,
                    ITEM_PROP.IPR_ITEM
      INTO c_old_item, c_old_obs, c_ifi_codigo, c_produto, c_item
      FROM SIAOS.ITEM_PROP
     INNER JOIN SIAOS.PROPOSTA
        ON PROPOSTA.PRP_CODIGO = ITEM_PROP.PRP_CODIGO
     WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
       AND ITEM_PROP.IPR_ITEM_PROP = n_ipr_item_prop;
  
    IF (c_old_item IS NULL) OR (c_old_item != c_ipr_item) OR
       (c_old_obs != c_ipr_obs) OR
       (c_old_obs IS NULL AND c_ipr_obs IS NOT NULL) OR
       (TRIM(c_iop_nserie) IS NOT NULL) THEN
    
      --- apaga dados de consulta de prazo da proposta
      IF c_item != c_ipr_item THEN
      
        BEGIN
        
          SELECT NVL(P.CONSULTA, 0)
            INTO n_consulta
            FROM SIAOS.PRODUTO P
           WHERE P.PRODUTO = c_produto;
        
        EXCEPTION
        
          WHEN NO_DATA_FOUND THEN
          
            n_consulta := 0;
          
        END;
      
        IF n_consulta != 0 THEN
        
          UPDATE SIAOS.ITEM_PROP
             SET ITEM_PROP.IPR_STATUS_CONS = NULL,
                 ITEM_PROP.IPR_SEMAN_CONS  = NULL
           WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo;
        
          UPDATE SIAOS.PROPOSTA
             SET PROPOSTA.PRP_STATUS_CONS = NULL
           WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
        
        END IF;
      
        UPDATE SIAOS.PROPOSTA
           SET PROPOSTA.PRP_STATUS_IQV = NULL
         WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
      
        UPDATE SIAOS.ITEM_PROP_UNI IPU
           SET IPU.IPU_STATUS_FSVC = NULL
         WHERE IPU.PRP_CODIGO = n_prp_codigo
           AND IPU.IPR_ITEM_PROP = n_ipr_item_prop
           AND IPU.MSV_CODIGO IS NOT NULL;
      
      END IF;
    
      --- Insere as opções dos itens na proposta
    
      UPDATE ITEM_PROP
         SET IPR_ITEM = c_ipr_item, IPR_OBS = c_ipr_obs2
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = n_ipr_item_prop;
    
      --- INSERE PREÇO
    
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo    => n_prp_codigo,
                                                     n_ipr_item_prop => n_ipr_item_prop,
                                                     n_preco         => n_ipr_preco);
    
      COMMIT;
    
      n_tipo_selo := SF_RETORNA_TIPO_SELO(n_prp_codigo, n_ipr_item_prop);
    
      FOR cs_sr IN (SELECT IPR_CODIGO
                      FROM ITEM_PROP
                     WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
                       AND ITEM_PROP.IPR_ITEM_PROP = n_ipr_item_prop) LOOP
      
        IF c_iop_nserie IS NOT NULL THEN
        
          UPDATE ITEM_OS_PERIFERICO
             SET IOP_NSERIE = c_iop_nserie
           WHERE IPR_CODIGO = cs_sr.IPR_CODIGO;
          COMMIT;
        
        END IF;
      
        IF (n_tipo_selo = 0) THEN
        
          DELETE ITEM_PROP
           WHERE ITEM_PROP.IPR_COD_TR = cs_sr.IPR_CODIGO
             AND SUBSTR(ITEM_PROP.PRO_CODIGO, 1, 2) = 'SR';
          COMMIT;
        
        ELSIF (n_tipo_selo = 1) THEN
        
          DELETE ITEM_PROP
           WHERE ITEM_PROP.IPR_COD_TR = cs_sr.IPR_CODIGO
             AND ITEM_PROP.IPR_SELO_LADO = 2
             AND SUBSTR(ITEM_PROP.PRO_CODIGO, 1, 2) = 'SR';
          COMMIT;
        
        ELSIF n_tipo_selo = 2 THEN
        
          DELETE ITEM_PROP
           WHERE ITEM_PROP.IPR_COD_TR = cs_sr.IPR_CODIGO
             AND ITEM_PROP.IPR_SELO_LADO = 1
             AND SUBSTR(ITEM_PROP.PRO_CODIGO, 1, 2) = 'SR';
          COMMIT;
        
        END IF;
      
      END LOOP;
    
      SIAOS.PCK_SMART_SALES3.SP_APAGA_ITREF(n_prp_codigo, n_ipr_item_prop);
    
      SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP(n_prp_codigo,
                                            n_ipr_item_prop,
                                            n_erro);
    
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_prp_codigo);
    
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END SP_UP_PRO_ITEM;

  ----------------------------------------------------------
  ------------ ATUALIZA CLASSE DO PRODUTO ------------------
  ----------------------------------------------------------

  PROCEDURE SP_UP_PRO_CLAS(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           c_pro_codigo    IN SIAOS.ITEM_PROP.PRO_CODIGO%TYPE,
                           n_ipr_classe    IN SIAOS.ITEM_PROP.IPR_CLASSE%TYPE,
                           c_ipr_obs       IN SIAOS.ITEM_PROP.IPR_OBS%TYPE,
                           n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE) IS
  
    c_ifi_codigo     SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    c_ipr_item       SIAOS.ITEM_PROP.IPR_ITEM%TYPE;
    n_ipr_preco      SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
    c_ipr_semana_ent SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
    n_classe         SIAOS.ITEM_PROP.IPR_CLASSE%TYPE;
    c_ipr_obs2       SIAOS.ITEM_PROP.IPR_OBS%TYPE;
    c_old_classe     SIAOS.ITEM_PROP.IPR_CLASSE%TYPE;
    c_old_obs        SIAOS.ITEM_PROP.IPR_OBS%TYPE;
    c_old_preco      SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
    n_consulta       SIAOS.PRODUTO.CONSULTA%TYPE;
    n_erro           INTEGER;
  
  BEGIN
    c_ipr_obs2 := REPLACE(c_ipr_obs, '##', '"');
    c_ipr_obs2 := REPLACE(c_ipr_obs2, '**', '''');
  
    SELECT DISTINCT TRIM(IPR_CLASSE), IPR_OBS, IPR_PRECO
      INTO c_old_classe, c_old_obs, c_old_preco
      FROM SIAOS.ITEM_PROP
     WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
       AND IPR_ITEM_PROP = n_ipr_item_prop;
  
    IF (NVL(c_old_classe, 0) != NVL(n_ipr_classe, 0)) OR
       (NVL(c_old_obs, 0) != NVL(c_ipr_obs, 0)) THEN
    
      SELECT ITEM_PROP.IPR_ITEM,
             PROPOSTA.IFI_CODIGO,
             ITEM_PROP.IPR_SEMANA_ENT,
             ITEM_PROP.IPR_CLASSE
        INTO c_ipr_item, c_ifi_codigo, c_ipr_semana_ent, n_classe
        FROM ITEM_PROP
       INNER JOIN PROPOSTA
          ON PROPOSTA.PRP_CODIGO = ITEM_PROP.PRP_CODIGO
       WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
         AND ITEM_PROP.IPR_ITEM_PROP = n_ipr_item_prop
         AND ROWNUM = 1
       GROUP BY ITEM_PROP.IPR_ITEM,
                PROPOSTA.IFI_CODIGO,
                ITEM_PROP.IPR_SEMANA_ENT,
                ITEM_PROP.IPR_CLASSE;
    
      --- apaga dados de consulta de prazo da proposta
      IF n_classe != n_ipr_classe THEN
      
        BEGIN
        
          SELECT NVL(P.INE_CONSULTA, 0)
            INTO n_consulta
            FROM CADBASICO.ITEM_NEGOCIO P
           WHERE P.INE_CODIGO = TRIM(c_pro_codigo);
        
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            n_consulta := 0;
        END;
      
        IF n_consulta != 0 THEN
          UPDATE SIAOS.ITEM_PROP
             SET ITEM_PROP.IPR_STATUS_CONS = NULL,
                 ITEM_PROP.IPR_SEMAN_CONS  = NULL
           WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo;
        END IF;
      
        UPDATE SIAOS.PROPOSTA
           SET PROPOSTA.PRP_STATUS_IQV = NULL
         WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
      
        UPDATE SIAOS.ITEM_PROP_UNI IPU
           SET IPU.IPU_STATUS_FSVC = NULL
         WHERE IPU.PRP_CODIGO = n_prp_codigo
           AND IPU.IPR_ITEM_PROP = n_ipr_item_prop
           AND IPU.MSV_CODIGO IS NOT NULL;
      
      END IF;
    
      IF n_ipr_preco IS NULL THEN
        n_ipr_preco := 0;
      END IF;
    
      -- Insere o numero da proposta
      UPDATE ITEM_PROP
         SET IPR_CLASSE = n_ipr_classe, IPR_OBS = c_ipr_obs2
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = n_ipr_item_prop;
      --AND TRIM(PRO_CODIGO) = TRIM(c_pro_codigo);
    
      COMMIT;
    
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo,
                                                     n_ipr_item_prop,
                                                     n_ipr_preco);
    
      SIAOS.PCK_SMART_SALES3.SP_APAGA_ITREF(n_prp_codigo, n_ipr_item_prop);
    
      SIAOS.PCK_SMART_SALES3.SP_IN_DADOS_OP(n_prp_codigo,
                                            n_ipr_item_prop,
                                            n_erro);
    
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_prp_codigo);
    
    END IF;
  
  END SP_UP_PRO_CLAS;

  ----------------------------------------------------------
  ------------ ATUALIZA MOEDA DE PRODUTO -------------------
  ----------------------------------------------------------

  PROCEDURE SP_UP_PRECO_MOEDA(n_prp_codigo IN PROPOSTA.PRP_CODIGO%TYPE,
                              c_ifi_codigo IN PROPOSTA.IFI_CODIGO%TYPE) IS
  
    n_ipr_preco NUMBER(11, 2);
  
    CURSOR cs_preco IS
      SELECT IPR_ITEM_PROP, PRO_CODIGO, IPR_ITEM, IPR_CLASSE
        FROM ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo
       GROUP BY IPR_ITEM_PROP, PRO_CODIGO, IPR_ITEM, IPR_CLASSE;
  BEGIN
  
    FOR reg_preco IN cs_preco LOOP
    
      --- INSERE PREÇO
      COMMIT;
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo,
                                                     reg_preco.IPR_ITEM_PROP,
                                                     n_ipr_preco);
    
    END LOOP;
    COMMIT;
  
  END SP_UP_PRECO_MOEDA;

  ----------------------------------------------------------
  ------------- ATUALIZA PRECO DO PRODUTO ------------------
  ----------------------------------------------------------

  PROCEDURE SP_UP_PRO_PRECO(n_prp_codigo     IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                            n_ipr_item_prop  IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_ipr_preco      IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                            n_ipr_venda_fim2 IN SIAOS.ITEM_PROP.IPR_VENDA_FIM%TYPE,
                            n_ipr_venda_cli2 IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                            n_ipr_adicional  IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                            n_ipr_desconto   IN SIAOS.ITEM_PROP.IPR_DESCONTO%TYPE,
                            n_ipr_desc_fim2  IN SIAOS.ITEM_PROP.IPR_DESC_FIM%TYPE,
                            n_ipr_desc_cli2  IN SIAOS.ITEM_PROP.IPR_DESC_CLI%TYPE,
                            n_ipr_antecipa   IN SIAOS.ITEM_PROP.IPR_ANTECIPA%TYPE,
                            n_ipr_fatura     IN SIAOS.ITEM_PROP.IPR_FATURA%TYPE,
                            n_ipr_semana_ent IN SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE,
                            v_ipr_dt_entrega IN VARCHAR2,
                            v_ipr_pedido     IN SIAOS.ITEM_PROP.IPR_PEDIDO%TYPE,
                            v_ipr_dt_pedido  IN VARCHAR2,
                            v_ipr_cons_prazo IN SIAOS.ITEM_PROP.IPR_CONS_PRAZO%TYPE,
                            v_ipr_obs        IN SIAOS.ITEM_PROP.IPR_OBS%TYPE,
                            d_ipr_dt_contrat IN VARCHAR2,
                            v_ipr_prop_fil   IN SIAOS.ITEM_PROP.IPR_PROP_FIL%TYPE,
                            v_ipr_os_fil     IN SIAOS.ITEM_PROP.IPR_OS_FIL%TYPE,
                            v_tipo           IN SIAOS.ITEM_PROP.TIPO%TYPE,
                            n_ipr_refugo     IN SIAOS.ITEM_PROP.IPR_REFUGO%TYPE,
                            n_ipr_os_rev     IN SIAOS.ITEM_PROP.IPR_OS_REV%TYPE,
                            n_ipr_item_rev   IN SIAOS.ITEM_PROP.IPR_ITEM_REV%TYPE,
                            n_ipr_nao_fab    IN SIAOS.ITEM_PROP.IPR_NAO_FAB%TYPE,
                            n_copia          IN INTEGER,
                            n_qtd            IN INTEGER,
                            n_ipu_valor_cot  IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                            n_ipu_oculto     IN SIAOS.ITEM_PROP_UNI.IPU_OCULTO%TYPE,
                            n_ipu_oculta_qtd IN SIAOS.ITEM_PROP_UNI.IPU_OCULTA_QTD%TYPE,
                            c_tes_recno      IN SIAOS.ITEM_PROP_UNI.TES_RECNO%TYPE,
                            n_msv_codigo     IN SIAOS.ITEM_PROP_UNI.MSV_CODIGO%TYPE) IS
  
    n_prp_codigo2     SIAOS.ITEM_PROP.PRP_CODIGO%TYPE;
    c_tes_recno_bd    SIAOS.ITEM_PROP.IPR_ICMS%TYPE;
    n_tes_recno       SIAOS.ITEM_PROP_UNI.TES_RECNO%TYPE;
    n_qtd_msv_tes     INTEGER;
    n_qtd_tes_msv     INTEGER;
    n_prop_parcial    INTEGER;
    c_ipr_obs2        SIAOS.ITEM_PROP.IPR_OBS%TYPE;
    v_ipr_diversos    SIAOS.ITEM_PROP.IPR_DIVERSOS%TYPE;
    n_ipg_codigo      SIAOS.ITEM_PROP.IPG_CODIGO%TYPE;
    n_pas_codigo      SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE := NULL;
    c_pro_codigo      SIAOS.ITEM_PROP.PRO_CODIGO%TYPE;
    v_mpe_codigo      SIAOS.ITEM_PROP_UNI.MPE_CODIGO%TYPE;
    n_preco           SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
    n_ipr_apnf        SIAOS.ITEM_PROP.IPR_APNF%TYPE;
    n_msv_codigo_old  SIAOS.ITEM_PROP_UNI.MSV_CODIGO%TYPE;
    n_ipu_status_fsvc SIAOS.ITEM_PROP_UNI.IPU_STATUS_FSVC%TYPE;
  
    n_ipr_venda_fim SIAOS.ITEM_PROP.IPR_VENDA_FIM%TYPE;
    n_ipr_venda_cli SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE;
    n_ipr_desc_fim  SIAOS.ITEM_PROP.IPR_DESC_FIM%TYPE;
    n_ipr_desc_cli  SIAOS.ITEM_PROP.IPR_DESC_CLI%TYPE;
  
  BEGIN
  
    n_ipr_venda_fim := n_ipr_venda_fim2;
    n_ipr_venda_cli := n_ipr_venda_cli2;
  
    IF (NVL(TRIM(n_ipu_valor_cot), 0) + NVL(TRIM(n_ipr_preco), 0) +
       NVL(TRIM(n_ipr_adicional), 0)) > 0 THEN
      n_ipr_desc_cli := (1 -
                        (n_ipr_venda_cli / (NVL(TRIM(n_ipu_valor_cot), 0) +
                        NVL(TRIM(n_ipr_preco), 0) +
                        NVL(TRIM(n_ipr_adicional), 0)))) * 100;
      n_ipr_desc_fim := n_ipr_desc_cli;
    ELSE
      n_ipr_desc_cli := 0;
      n_ipr_desc_fim := 0;
    END IF;
  
    c_ipr_obs2 := REPLACE(v_ipr_obs, '##', '"');
    c_ipr_obs2 := REPLACE(c_ipr_obs2, '**', '''');
  
    SELECT DISTINCT I.IPR_DIVERSOS,
                    I.IPG_CODIGO,
                    I.PRO_CODIGO,
                    U.TES_RECNO,
                    U.MSV_CODIGO,
                    U.IPU_STATUS_FSVC
      INTO v_ipr_diversos,
           n_ipg_codigo,
           c_pro_codigo,
           c_tes_recno_bd,
           n_msv_codigo_old,
           n_ipu_status_fsvc
      FROM SIAOS.ITEM_PROP I
     INNER JOIN SIAOS.ITEM_PROP_UNI U
        ON U.PRP_CODIGO = I.PRP_CODIGO
       AND U.IPR_ITEM_PROP = I.IPR_ITEM_PROP
     WHERE I.PRP_CODIGO = n_prp_codigo
       AND I.IPR_ITEM_PROP = n_ipr_item_prop;

    n_tes_recno := c_tes_recno;
    IF n_msv_codigo IS NOT NULL THEN
      SELECT COUNT(*)
        INTO n_qtd_msv_tes
        FROM SIAOS.MOTIVO_FSVC_TES M
       WHERE M.MSV_CODIGO = n_msv_codigo;

      IF n_qtd_msv_tes > 0 THEN
        SELECT COUNT(*)
          INTO n_qtd_tes_msv
          FROM INTEGRACAO.VW_TES2 T
         WHERE T.R_E_C_N_O_ = n_tes_recno
           AND T.CLT_CODIGO IN (SELECT M.CLT_CODIGO
                                  FROM SIAOS.MOTIVO_FSVC_TES M
                                 WHERE M.MSV_CODIGO = n_msv_codigo);

        IF n_tes_recno IS NULL OR n_qtd_tes_msv = 0 THEN
          SELECT MAX(T.R_E_C_N_O_)
            INTO n_tes_recno
            FROM INTEGRACAO.VW_TES2 T
           WHERE T.F4_TIPO = 'S'
             AND T.CLT_CODIGO IN (SELECT M.CLT_CODIGO
                                    FROM SIAOS.MOTIVO_FSVC_TES M
                                   WHERE M.MSV_CODIGO = n_msv_codigo);
        END IF;
      END IF;
    END IF;
  
    IF n_msv_codigo = 7 THEN
      n_ipu_status_fsvc := 'A';
    ELSIF NVL(n_msv_codigo_old, 0) != NVL(n_msv_codigo, 0) THEN
      IF n_msv_codigo_old IS NOT NULL AND n_msv_codigo IS NULL THEN
        n_ipu_status_fsvc := NULL;
      ELSIF n_msv_codigo_old IS NULL AND n_msv_codigo IS NOT NULL THEN
        n_ipu_status_fsvc := 'P';
      END IF;
    END IF;
  
    SELECT IU.MPE_CODIGO
      INTO v_mpe_codigo
      FROM SIAOS.ITEM_PROP_UNI IU
     WHERE IU.PRP_CODIGO = n_prp_codigo
       AND IU.IPR_ITEM_PROP = n_ipr_item_prop;
  
    IF NVL(c_tes_recno_bd, 0) != NVL(n_tes_recno, 0) THEN
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo,
                                                     n_ipr_item_prop,
                                                     n_preco);
      --SIAOS.PCK_SMART_SALES3.SP_ALTERA_PRECO_PROP(n_prp_codigo);
    ELSE
      n_preco := n_ipr_preco;
    END IF;
  
    IF NVL(TRIM(n_msv_codigo), 0) = 0 THEN
      n_ipr_apnf := NULL;
    ELSE
      n_ipr_apnf := n_prp_codigo;
    END IF;
  
    UPDATE ITEM_PROP
       SET IPR_PRECO      = n_preco,
           IPR_VENDA_FIM  = n_ipr_venda_fim,
           IPR_VENDA_CLI  = n_ipr_venda_cli,
           IPR_DESCONTO   = n_ipr_desconto,
           IPR_ADICIONAL  = n_ipr_adicional,
           IPR_DESC_FIM   = n_ipr_desc_fim,
           IPR_DESC_CLI   = n_ipr_desc_cli,
           IPR_ANTECIPA   = n_ipr_antecipa,
           IPR_FATURA     = n_ipr_fatura,
           IPR_APNF       = n_ipr_apnf,
           IPR_PEDIDO     = v_ipr_pedido,
           IPR_DT_PEDIDO  = TO_DATE(v_ipr_dt_pedido, 'DD/MM/YYYY'),
           IPR_CONS_PRAZO = v_ipr_cons_prazo,
           IPR_OBS        = c_ipr_obs2,
           IPR_PROP_FIL   = v_ipr_prop_fil,
           IPR_OS_FIL     = v_ipr_os_fil,
           TIPO           = v_tipo,
           IPR_REFUGO     = n_ipr_refugo,
           IPR_OS_REV     = n_ipr_item_rev,
           IPR_ITEM_REV   = n_ipr_item_rev,
           IPR_NAO_FAB    = n_ipr_nao_fab
     WHERE PRP_CODIGO = n_prp_codigo
       AND IPR_ITEM_PROP = n_ipr_item_prop;
  
    SELECT PROPOSTA.PRP_PARCIAL
      INTO n_prop_parcial
      FROM SIAOS.PROPOSTA
     WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
  
    UPDATE SIAOS.ITEM_PROP_UNI
       SET IPU_VALOR_COTADO = n_ipu_valor_cot,
           IPU_OCULTO       = n_ipu_oculto,
           IPU_OCULTA_QTD   = n_ipu_oculta_qtd,
           TES_RECNO        = n_tes_recno,
           MSV_CODIGO       = n_msv_codigo,
           IPU_STATUS_FSVC  = n_ipu_status_fsvc
     WHERE PRP_CODIGO = n_prp_codigo
       AND IPR_ITEM_PROP = n_ipr_item_prop;
  
    COMMIT;
  
    SIAOS.PCK_SMART_SALES3.SP_UP_PRODUTO_DESC(n_prp_codigo,
                                              n_ipr_item_prop,
                                              v_ipr_diversos,
                                              v_mpe_codigo,
                                              n_qtd);
  
    BEGIN
    
      INSERT INTO SIAOS.ITEM_PROP_UNI
        (PRP_CODIGO, IPR_ITEM_PROP, IPU_VALOR_COTADO)
      VALUES
        (n_prp_codigo, n_ipr_item_prop, n_ipu_valor_cot);
    
    EXCEPTION
      WHEN OTHERS THEN
        UPDATE SIAOS.ITEM_PROP_UNI
           SET IPU_VALOR_COTADO = n_ipu_valor_cot
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_ITEM_PROP = n_ipr_item_prop;
    END;
  
    UPDATE SIAOS.PROPOSTA
       SET PRP_PEDIDO    = v_ipr_pedido,
           PRP_DT_PEDIDO = TO_DATE(v_ipr_dt_pedido, 'DD/MM/YYYY')
     WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo
       AND PRP_PEDIDO IS NULL
       AND PRP_DT_PEDIDO IS NULL;
  
    UPDATE SIAOS.PROPOSTA P
       SET P.PRP_STATUS_CONS = NULL,
           P.PRP_STATUS_FSVC = NULL,
           P.PRP_STATUS_IQV  = NULL
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    COMMIT;
  
    FOR c_tens IN (SELECT I.PRP_CODIGO,
                          I.IPR_ITEM_PROP,
                          I.IPR_PRECO,
                          DECODE(n_msv_codigo,
                                 NULL,
                                 DECODE(I.IPR_VENDA_FIM,
                                        0,
                                        I.IPR_PRECO + I.IPR_ADICIONAL,
                                        I.IPR_VENDA_FIM),
                                 0) IPR_VENDA_FIM,
                          DECODE(n_msv_codigo,
                                 NULL,
                                 DECODE(I.IPR_VENDA_CLI,
                                        0,
                                        I.IPR_PRECO + I.IPR_ADICIONAL,
                                        I.IPR_VENDA_CLI),
                                 0) IPR_VENDA_CLI,
                          I.IPR_ADICIONAL,
                          I.IPR_DESCONTO,
                          DECODE(n_msv_codigo,
                                 NULL,
                                 DECODE(I.IPR_DESC_FIM,
                                        100,
                                        n_ipr_desc_fim,
                                        I.IPR_DESC_FIM),
                                 100) IPR_DESC_FIM,
                          DECODE(n_msv_codigo,
                                 NULL,
                                 DECODE(I.IPR_DESC_CLI,
                                        100,
                                        n_ipr_desc_cli,
                                        I.IPR_DESC_CLI),
                                 100) IPR_DESC_CLI,
                          I.IPR_ANTECIPA,
                          I.IPR_FATURA,
                          I.IPR_IPI,
                          I.IPR_ICMS,
                          I.IPR_ISS,
                          I.IPR_APNF,
                          I.IPR_PEDIDO,
                          TO_CHAR(I.IPR_DT_PEDIDO, 'DD/MM/YYYY') IPR_DT_PEDIDO,
                          I.IPR_CONS_PRAZO,
                          I.IPR_OBS,
                          I.IPR_PROP_FIL,
                          I.IPR_OS_FIL,
                          I.TIPO,
                          I.IPR_REFUGO,
                          I.IPR_OS_REV,
                          I.IPR_ITEM_REV,
                          I.IPR_NAO_FAB,
                          I.IPR_COPIA,
                          SUM(I.IPR_QUANTIDADE) IPR_QUANTIDADE,
                          O.IPU_VALOR_COTADO,
                          O.IPU_OCULTO,
                          O.IPU_OCULTA_QTD
                     FROM SIAOS.ITEM_PROP I
                    INNER JOIN SIAOS.ITEM_PROP_UNI O
                       ON I.PRP_CODIGO = O.PRP_CODIGO
                      AND I.IPR_ITEM_PROP = O.IPR_ITEM_PROP
                    WHERE I.PRP_CODIGO = n_prp_codigo
                      AND O.IPR_ITEM_PAI = n_ipr_item_prop
                    GROUP BY I.PRP_CODIGO,
                             I.IPR_ITEM_PROP,
                             I.IPR_PRECO,
                             I.IPR_VENDA_FIM,
                             I.IPR_VENDA_CLI,
                             I.IPR_ADICIONAL,
                             I.IPR_DESCONTO,
                             I.IPR_DESC_FIM,
                             I.IPR_DESC_CLI,
                             I.IPR_ANTECIPA,
                             I.IPR_FATURA,
                             I.IPR_IPI,
                             I.IPR_ICMS,
                             I.IPR_ISS,
                             I.IPR_APNF,
                             I.IPR_PEDIDO,
                             I.IPR_DT_PEDIDO,
                             I.IPR_CONS_PRAZO,
                             I.IPR_OBS,
                             I.IPR_PROP_FIL,
                             I.IPR_OS_FIL,
                             I.TIPO,
                             I.IPR_REFUGO,
                             I.IPR_OS_REV,
                             I.IPR_ITEM_REV,
                             I.IPR_NAO_FAB,
                             I.IPR_COPIA,
                             O.IPU_VALOR_COTADO,
                             O.IPU_OCULTO,
                             O.IPU_OCULTA_QTD) LOOP
      SIAOS.PCK_SMART_SALES3.SP_UP_PRO_PRECO(c_tens.PRP_CODIGO, -- n_prp_codigo     IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                                             c_tens.IPR_ITEM_PROP, -- n_ipr_item_prop  IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                                             c_tens.IPR_PRECO, -- n_ipr_preco      IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                                             c_tens.IPR_VENDA_FIM, -- n_ipr_venda_fim  IN SIAOS.ITEM_PROP.IPR_VENDA_FIM%TYPE,
                                             c_tens.IPR_VENDA_CLI, -- n_ipr_venda_cli  IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                                             c_tens.IPR_ADICIONAL, -- n_ipr_adicional  IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                                             c_tens.IPR_DESCONTO, -- n_ipr_desconto   IN SIAOS.ITEM_PROP.IPR_DESCONTO%TYPE,
                                             c_tens.IPR_DESC_FIM, -- n_ipr_desc_fim   IN SIAOS.ITEM_PROP.IPR_DESC_FIM%TYPE,
                                             c_tens.IPR_DESC_CLI, -- n_ipr_desc_cli   IN SIAOS.ITEM_PROP.IPR_DESC_CLI%TYPE,
                                             c_tens.IPR_ANTECIPA, -- n_ipr_antecipa   IN SIAOS.ITEM_PROP.IPR_ANTECIPA%TYPE,
                                             c_tens.IPR_FATURA, -- n_ipr_fatura     IN SIAOS.ITEM_PROP.IPR_FATURA%TYPE,
                                             NULL, -- n_ipr_semana_ent IN SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE,
                                             NULL, -- v_ipr_dt_entrega IN VARCHAR2,
                                             --n_ipr_apnf,             -- n_ipr_apnf       IN SIAOS.ITEM_PROP.IPR_APNF%TYPE,
                                             v_ipr_pedido, -- v_ipr_pedido     IN SIAOS.ITEM_PROP.IPR_PEDIDO%TYPE,
                                             v_ipr_dt_pedido, -- v_ipr_dt_pedido  IN VARCHAR2,
                                             c_tens.IPR_CONS_PRAZO, -- v_ipr_cons_prazo IN SIAOS.ITEM_PROP.IPR_CONS_PRAZO%TYPE,
                                             c_tens.IPR_OBS, -- v_ipr_obs        IN SIAOS.ITEM_PROP.IPR_OBS%TYPE,
                                             NULL, -- d_ipr_dt_contrat IN VARCHAR2,
                                             c_tens.IPR_PROP_FIL, -- v_ipr_prop_fil   IN SIAOS.ITEM_PROP.IPR_PROP_FIL%TYPE,
                                             c_tens.IPR_OS_FIL, -- v_ipr_os_fil     IN SIAOS.ITEM_PROP.IPR_OS_FIL%TYPE,
                                             c_tens.TIPO, -- v_tipo           IN SIAOS.ITEM_PROP.TIPO%TYPE,
                                             c_tens.IPR_REFUGO, -- n_ipr_refugo     IN SIAOS.ITEM_PROP.IPR_REFUGO%TYPE,
                                             c_tens.IPR_OS_REV, -- n_ipr_os_rev     IN SIAOS.ITEM_PROP.IPR_OS_REV%TYPE,
                                             c_tens.IPR_ITEM_REV, -- n_ipr_item_rev   IN SIAOS.ITEM_PROP.IPR_ITEM_REV%TYPE,
                                             n_ipr_nao_fab, -- n_ipr_nao_fab    IN SIAOS.ITEM_PROP.IPR_NAO_FAB%TYPE,
                                             NULL, -- n_copia          IN INTEGER,
                                             c_tens.IPR_QUANTIDADE, -- n_qtd            IN INTEGER,
                                             c_tens.IPU_VALOR_COTADO, -- n_ipu_valor_cot  IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                                             c_tens.IPU_OCULTO, -- n_ipu_oculto     IN SIAOS.ITEM_PROP_UNI.IPU_OCULTO%TYPE,
                                             c_tens.IPU_OCULTA_QTD, -- n_ipu_oculta_qtd IN SIAOS.ITEM_PROP_UNI.IPU_OCULTA_QTD%TYPE,
                                             n_tes_recno, -- c_tes_recno      IN SIAOS.ITEM_PROP_UNI.TES_RECNO%TYPE
                                             n_msv_codigo);
    END LOOP;
  
    n_ipu_status_fsvc := SIAOS.PCK_SMART_SALES3.SF_ST_PROP_FSVF(n_prp_codigo);
  
    UPDATE PROPOSTA P
       SET P.PRP_STATUS_FSVC = n_ipu_status_fsvc
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    COMMIT;
  
    IF n_copia = 1 THEN
    
      SELECT IU.PAS_CODIGO
        INTO n_pas_codigo
        FROM SIAOS.ITEM_PROP_UNI IU
       WHERE IU.PRP_CODIGO = n_prp_codigo
         AND IU.IPR_ITEM_PROP = n_ipr_item_prop;
    
      IF SQL%FOUND THEN
        n_pas_codigo := NULL;
      END IF;
    
      SIAOS.PCK_SMART_SALES3.SP_COPIA_ITEM(n_prp_codigo,
                                           n_prp_codigo,
                                           n_ipg_codigo,
                                           n_ipr_item_prop,
                                           n_pas_codigo,
                                           1,
                                           n_prp_codigo2);
    
      COMMIT;
    
    END IF;
  
  End SP_UP_PRO_PRECO;

  ----------------------------------------------------------
  ------------- ATUALIZA DESCONTO DO PRODUTO ------------------
  ----------------------------------------------------------

  PROCEDURE SP_GRAVA_DESCONTO(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                              n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                              n_porcentual    IN NUMBER) IS
  
    n_ipu_valor_cotado SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE;
  BEGIN
  
    SELECT NVL(IPU_VALOR_COTADO, 0)
      INTO n_ipu_valor_cotado
      FROM SIAOS.ITEM_PROP_UNI
     WHERE IPR_ITEM_PROP = n_ipr_item_prop
       AND PRP_CODIGO = n_prp_codigo;
  
    --IF n_ipu_valor_cotado IS NULL AND n_porcentual >= 0 THEN
    IF n_ipu_valor_cotado = 0 AND n_porcentual >= 0 THEN
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_DESC_FIM  = n_porcentual,
             IPR_DESC_CLI  = n_porcentual,
             IPR_VENDA_FIM =
             (IPR_PRECO + IPR_ADICIONAL) * (1 - (n_porcentual / 100)),
             IPR_VENDA_CLI =
             (IPR_PRECO + IPR_ADICIONAL) * (1 - (n_porcentual / 100))
       WHERE IPR_ITEM_PROP = n_ipr_item_prop
         AND PRP_CODIGO = n_prp_codigo
         AND (IPR_PRECO + IPR_ADICIONAL) > 0;
    
    ELSIF n_ipu_valor_cotado = 0 AND n_porcentual < 0 THEN
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_DESC_FIM  = n_porcentual,
             IPR_DESC_CLI  = n_porcentual,
             IPR_VENDA_FIM =
             (IPR_PRECO + IPR_ADICIONAL) *
             (1 + ((n_porcentual * (-1) / 100))),
             IPR_VENDA_CLI =
             (IPR_PRECO + IPR_ADICIONAL) *
             (1 + ((n_porcentual * (-1) / 100)))
       WHERE IPR_ITEM_PROP = n_ipr_item_prop
         AND PRP_CODIGO = n_prp_codigo;
    
    ELSIF n_ipu_valor_cotado > 0 AND n_porcentual < 0 THEN
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_DESC_FIM  = n_porcentual,
             IPR_DESC_CLI  = n_porcentual,
             IPR_VENDA_FIM = n_ipu_valor_cotado *
                             (1 + ((n_porcentual * (-1) / 100))),
             IPR_VENDA_CLI = n_ipu_valor_cotado *
                             (1 + ((n_porcentual * (-1) / 100)))
       WHERE IPR_ITEM_PROP = n_ipr_item_prop
         AND PRP_CODIGO = n_prp_codigo;
    
    END IF;
  
    COMMIT;
  
  END SP_GRAVA_DESCONTO;

  ----------------------------------------------------------
  ------------ ATUALIZA CALIBRAO DO PRODUTO ----------------
  ----------------------------------------------------------

  Procedure SP_UP_PRO_CALIBRA(n_ipr_codigo IN NUMBER) IS
  Begin
    -- Insere Dados na proposta
    UPDATE ITEM_PROP
       SET IPR_QUANTIDADE = 1
     WHERE IPR_CODIGO = n_ipr_codigo;
    COMMIT;
  End SP_UP_PRO_CALIBRA;

  ----------------------------------------------------------
  ---------- ATUALIZA CALIBRACAO DO PRODUTO 2 --------------
  ----------------------------------------------------------

  Procedure SP_UP_PRO_CALIBRA2(n_prp_codigo    IN INTEGER,
                               n_ipr_item_prop IN INTEGER,
                               v_ipr_obs       IN VARCHAR2) IS
  Begin
    -- Insere Dados na proposta
    UPDATE ITEM_PROP
       SET IPR_OBS = v_ipr_obs
     WHERE PRP_CODIGO = n_prp_codigo
       AND IPR_ITEM_PROP = n_ipr_item_prop;
    COMMIT;
  End SP_UP_PRO_CALIBRA2;

  ----------------------------------------------------------
  ---------- ATUALIZA CALIBRACAO DO PRODUTO 3 --------------
  ----------------------------------------------------------

  Procedure SP_UP_PRO_CALIBRA3(n_ipr_codigo IN SIAOS.ITEM_PROP_DADO.IPR_CODIGO%TYPE,
                               v_status     IN SIAOS.ITEM_PROP_DADO.STATUS%TYPE,
                               v_tipo       IN SIAOS.ITEM_PROP_DADO.IPD_TIPO%TYPE,
                               n_ipd_valor  IN SIAOS.ITEM_PROP_DADO.IPD_VALOR_DADO%TYPE,
                               n_nroclas    IN SIAOS.ITEM_PROP_DADO.NROCLAS%TYPE,
                               v_opclas     IN SIAOS.ITEM_PROP_DADO.OPCLAS%TYPE,
                               v_valor_dado IN SIAOS.ITEM_PROP_DADO.IPD_VALOR_DADO%TYPE,
                               v_copia      IN VARCHAR2) IS
  
    v_opd_valor_dadoC UNIDADE.UNIDADE%TYPE;
    v_opd_valor_dadoA VARCHAR2(100); --OPCAO.VL_MINIMO%TYPE;
    v_opd_valor_dadoB OPCAO.VL_MAXIMO%TYPE;
  
    n_cal_ok  INTEGER := 0;
    n_cal_txt VARCHAR2(60);
    n_item    INTEGER;
    n_prop    INTEGER;
  
  BEGIN
  
    IF v_tipo = 'CAL' THEN
    
      v_opd_valor_dadoA := SUBSTR(v_valor_dado, 1, 13);
      v_opd_valor_dadoA := TRIM(v_opd_valor_dadoA);
      v_opd_valor_dadoA := TO_NUMBER(v_opd_valor_dadoA);
    
      v_opd_valor_dadoB := TO_NUMBER(TRIM(SUBSTR(v_valor_dado, 14, 13)));
      v_opd_valor_dadoC := TRIM(SUBSTR(v_valor_dado, 27, 13));
    
      n_cal_ok := PCK_SMART_SALES3.SF_CHECA_CALIBRACAO(n_ipr_codigo,
                                                       v_opd_valor_dadoC,
                                                       v_opd_valor_dadoA,
                                                       v_opd_valor_dadoB,
                                                       1);
    
    END IF;
  
    IF (v_tipo = 'CAL' AND n_cal_ok = 0) OR (v_tipo != 'CAL') THEN
    
      SELECT DISTINCT IP.IPR_ITEM_PROP, IP.PRP_CODIGO
        INTO n_item, n_prop
        FROM ITEM_PROP IP
       WHERE IP.IPR_CODIGO = n_ipr_codigo;
    
      IF v_copia = 'N' THEN
      
        -- Insere Dados na proposta
        UPDATE ITEM_PROP_DADO
           SET IPD_VALOR_DADO = v_valor_dado
         WHERE IPR_CODIGO = n_ipr_codigo
           AND STATUS = v_status
           AND NROCLAS = n_nroclas
           AND OPCLAS = v_opclas
           AND IPD_VALOR = n_ipd_valor;
      
        COMMIT;
      
      ELSIF v_copia = 'S' THEN
      
        -- Insere Dados na proposta
      
        FOR cur_item IN (SELECT IPR_CODIGO
                           FROM SIAOS.ITEM_PROP
                          WHERE ITEM_PROP.IPR_ITEM_PROP = n_item
                            AND ITEM_PROP.PRP_CODIGO = n_prop) 
        LOOP
        
          UPDATE ITEM_PROP_DADO
             SET IPD_VALOR_DADO = v_valor_dado
           WHERE IPR_CODIGO = cur_item.IPR_CODIGO
             AND STATUS = v_status
             AND NROCLAS = n_nroclas
             AND OPCLAS = v_opclas
             AND IPD_VALOR = n_ipd_valor;
        
        END LOOP;
      
        COMMIT;
      
      END IF;
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_COPIA = v_copia
       WHERE IPR_ITEM_PROP = n_item
         AND PRP_CODIGO = n_prop;
    ELSE
      CASE n_cal_ok      
       WHEN 0 THEN n_cal_txt := '';
       WHEN 1 THEN n_cal_txt := 'na checagem minima "0%"';
       WHEN 2 THEN n_cal_txt := 'na checagem maxima "100%"';
       WHEN 3 THEN n_cal_txt := 'na checagem do SPAN';
       WHEN 4 THEN n_cal_txt := 'na checagem do limite do Selo';
       ELSE n_cal_txt := '"Erro Desconhecido"';
      END CASE;
      RAISE_APPLICATION_ERROR('-20001', 'Erro ao validar calibração '||n_cal_txt);   
    END IF;
  
  END SP_UP_PRO_CALIBRA3;

  ----------------------------------------------------------
  -------------- VERIFICA NUMERO DE SÉRIE ------------------
  ----------------------------------------------------------

  PROCEDURE SP_UP_PRO_N_SERIE(n_ipr_codigo IN ITEM_PROP.IPR_CODIGO%TYPE,
                              v_n_serie    IN ITEM_PROP.IPR_N_SERIE%TYPE,
                              n_erro       OUT INTEGER) IS
  
    n_qtd_oi     INTEGER := 0; -- order in
    v_pro_codigo ITEM_PROP.PRO_CODIGO%TYPE;
    v_tor_codigo ORIGEM.TOR_CODIGO%TYPE;
  
  BEGIN
  
    n_erro := NULL;
  
    SELECT ORIGEM.TOR_CODIGO
      INTO v_tor_codigo
      FROM SIAOS.ITEM_PROP, SIAOS.PROPOSTA, SIAOS.ORIGEM
     WHERE ITEM_PROP.PRP_CODIGO = PROPOSTA.PRP_CODIGO
       AND ORIGEM.ORIGEM = PROPOSTA.ORI_CODIGO
       AND ITEM_PROP.IPR_CODIGO = n_ipr_codigo;
  
    IF v_tor_codigo != 2 THEN
    
      IF v_n_serie IS NOT NULL THEN
      
        SELECT TRIM(ITEM_PROP.PRO_CODIGO) PRO_CODIGO
          INTO v_pro_codigo
          FROM SIAOS.ITEM_PROP
         WHERE ITEM_PROP.IPR_CODIGO = n_ipr_codigo;
      
        SELECT COUNT(ITEM_PROP.PRP_CODIGO) QTD
          INTO n_qtd_oi
          FROM SIAOS.ITEM_PROP B, SIAOS.ITEM_PROP
         WHERE ITEM_PROP.PRP_CODIGO = B.PRP_CODIGO
           AND ITEM_PROP.IPR_N_SERIE = v_n_serie
           AND ITEM_PROP.PRO_CODIGO = v_pro_codigo
           AND B.IPR_CODIGO = n_ipr_codigo
           AND ITEM_PROP.IPR_CODIGO != n_ipr_codigo;
      
        IF n_qtd_oi > 0 THEN
          n_erro := 1;
        END IF;
      
      END IF;
    
      IF n_erro IS NULL THEN
        -- Insere n série noitem da proposta
      
        UPDATE ITEM_PROP
           SET ITEM_PROP.IPR_N_SERIE = v_n_serie
         WHERE ITEM_PROP.IPR_CODIGO = n_ipr_codigo;
        COMMIT;
      
      END IF;
    
    END IF;
  
  END SP_UP_PRO_N_SERIE;

  ----------------------------------------------------------
  ------------ MOSTRA MASCARA DO PRODUTO -------------------
  ----------------------------------------------------------

  FUNCTION SF_MASCARA_DO_ITEM(vc2_produto2 IN PRODUTO.PRODUTO%Type,
                              vc2_opcat2   IN VARCHAR2,
                              vc2_opesp2   IN OELIN.OP_ESP%Type)
    RETURN VARCHAR2 IS
    vc2_produto            PRODUTO.PRODUTO%TYPE;
    vc2_prod2              PRODUTO.PRODUTO%TYPE;
    vc2_opcat              VARCHAR2(60);
    vc2_opesp              OELIN.OP_ESP%TYPE;
    vc2_result_produto     VARCHAR2(2000);
    vc2_result_produto_aux VARCHAR2(2000);
    vc2_op_espc            VARCHAR2(200);
    vc2_separa_produto     PRODUTO.SEPARADOR%Type;
    vc2_respons            PRODUTO.RESPONS%Type;
    vc2_descricao          PRODUTO.DES_DESCRICAO%Type;
    vc2_separa_opcao       ITEM.SEPARADOR%Type;
    j                      NUMBER := 1;
    v_def                  VARCHAR2(1);
  
  BEGIN
  
    vc2_prod2   := TRIM(vc2_produto2);
    vc2_produto := RTRIM(vc2_produto2);
    vc2_opcat   := RTRIM(vc2_opcat2);
    vc2_opesp   := RTRIM(vc2_opesp2);
  
    IF vc2_prod2 IS NOT NULL THEN
    
      SELECT SEPARADOR, RESPONS, DES_DESCRICAO
        INTO vc2_separa_produto, vc2_respons, vc2_descricao
        FROM PRODUTO
       WHERE PRODUTO = vc2_produto;
    
      IF vc2_respons = 'RAO' THEN
      
        IF SUBSTR(vc2_produto2, 1, 5) = '11000' THEN
        
          SELECT PRODUTO.DESCRICAO2
            INTO vc2_result_produto_aux
            FROM PRODUTO
           WHERE PRODUTO.PRODUTO = vc2_produto;
        
          vc2_result_produto := vc2_result_produto_aux;
        
        ELSE
        
          SELECT DESCRICAO2
            INTO vc2_result_produto_aux
            FROM OPCAO
           WHERE OPCAO.PRODUTO = vc2_produto
             AND OPCAO.OPITEM = vc2_opcat;
        
          vc2_result_produto := vc2_produto || vc2_opcat || ' PN' ||
                                vc2_result_produto_aux;
        
        END IF;
      
        RETURN(vc2_result_produto);
      
      ELSE
      
        IF vc2_separa_produto IS NOT NULL THEN
          vc2_result_produto := RTRIM(vc2_produto) || vc2_separa_produto;
        ELSE
          vc2_result_produto := RTRIM(vc2_produto);
        END IF;
        IF TRIM(vc2_opcat) IS NOT NULL THEN
          FOR I IN 1 .. LENGTH(RTRIM(vc2_opcat)) LOOP
            IF LENGTH(SUBSTR(RTRIM(vc2_opcat), I, 1)) > 0 THEN
              vc2_separa_opcao := null;
              SELECT SEPARADOR
                INTO vc2_separa_opcao
                FROM ITEM
               WHERE PRODUTO = vc2_produto
                 AND NROITEM = i;
              vc2_result_produto := vc2_result_produto ||
                                    substr(RTRIM(vc2_opcat), i, 1) ||
                                    vc2_separa_opcao;
            END IF;
          END LOOP;
        END IF;
        IF TRIM(vc2_opesp) IS NOT NULL THEN
          WHILE j <= LENGTH(TRIM(vc2_opesp)) LOOP
          
            vc2_op_espc := SUBSTR(RTRIM(vc2_opesp), j, 2);
          
            SELECT DEF_AULT
              INTO v_def
              FROM OPCLAS
             WHERE PRODUTO = vc2_produto
               AND OPCLAS = vc2_op_espc;
          
            IF v_def = 'S' THEN
            
              vc2_op_espc := '<FONT COLOR=#808080>' || vc2_op_espc ||
                             '</FONT>';
            
            END IF;
          
            IF j = 1 THEN
            
              vc2_result_produto := vc2_result_produto || ' . ' ||
                                    vc2_op_espc;
            
            ELSE
            
              vc2_result_produto := vc2_result_produto || '/' ||
                                    vc2_op_espc;
            
            END IF;
            j := j + 2;
          END LOOP;
        END IF;
        RETURN(vc2_result_produto);
      END IF;
    ELSE
      RETURN(NULL);
    END IF;
  END SF_MASCARA_DO_ITEM;

  ----------------------------------------------------------
  ------------ RETORNA SE TEM SELO REMOTO ------------------
  ----------------------------------------------------------

  FUNCTION SF_RETORNA_SELO(n_prp_codigo    IN ITEM_PROP.PRP_CODIGO%TYPE,
                           n_prp_item_prop IN ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN NUMBER IS
  
    vc2_produto  PRODUTO.PRODUTO%TYPE;
    vc2_opcat    ITEM_PROP.IPR_ITEM%TYPE;
    vc2_opesp    ITEM_PROP.IPR_CLASSE%TYPE;
    n_item       INTEGER;
    j            INTEGER;
    n_qtd_sr     INTEGER;
    n_qtd_it     INTEGER;
    c_opcao      VARCHAR2(2);
    n_seloremo   OPCAO.SELOREMO%TYPE := 0;
    n_subItem    INTEGER := 0;
    n_sumSubItem INTEGER := 0;
  
  BEGIN
  
    SELECT DISTINCT IP.PRO_CODIGO
      INTO vc2_produto
      FROM ITEM_PROP IP
     WHERE IP.IPR_ITEM_PROP = n_prp_item_prop
       AND IP.PRP_CODIGO = n_prp_codigo;
  
    --- ITENS NA OS ---
    SELECT COUNT(IPR_CODIGO) QTD_IT
      INTO n_qtd_it
      FROM ITEM_PROP
     WHERE IPR_ITEM_PROP = n_prp_item_prop
       AND PRP_CODIGO = n_prp_codigo;
  
    SELECT COUNT(IO.IPR_QUANTIDADE) QTD_SR
      INTO n_qtd_sr
      FROM SIAOS.ITEM_PROP_UNI A
     INNER JOIN SIAOS.ITEM_PROP_UNI B
        ON A.PRP_CODIGO = B.PRP_CODIGO
       AND A.IPR_ITEM_PROP = B.IPR_ITEM_PAI
     INNER JOIN SIAOS.ITEM_PROP IO
        ON B.PRP_CODIGO = IO.PRP_CODIGO
       AND B.IPR_ITEM_PROP = IO.IPR_ITEM_PROP
     WHERE A.IPR_ITEM_PROP = n_prp_item_prop
       AND A.PRP_CODIGO = n_prp_codigo;
  
    SELECT DISTINCT IP.PRO_CODIGO, IP.IPR_ITEM, IP.IPR_CLASSE
      INTO vc2_produto, vc2_opcat, vc2_opesp
      FROM ITEM_PROP IP
     WHERE IP.IPR_ITEM_PROP = n_prp_item_prop
       AND IP.PRP_CODIGO = n_prp_codigo;
  
    j := 1;
    WHILE j <= length(vc2_opcat) LOOP
    
      c_opcao    := substr(vc2_opcat, j, 1);
      n_item     := j;
      n_seloremo := 0;
    
      SELECT DISTINCT NVL(P.OIT_SELOREMO, 0) SUNITEM
        INTO n_subItem
        FROM CADBASICO.OPCAO_ITNEG P
       WHERE P.INE_CODIGO = TRIM(vc2_produto)
         AND P.CIT_NROCLAS = n_item
         AND P.OIT_OPCAO = c_opcao
         AND P.CIT_TIPO = 1;
    
      IF n_subItem > 0 THEN
      
        SELECT COUNT(T.INE_CODIGO) SELO
          INTO n_seloremo
          FROM CADBASICO.ITNEG_REF T
         WHERE INE_CODIGO = TRIM(vc2_produto)
           AND CIT_TIPO = 1
           AND CIT_NROCLAS = n_item
           AND OIT_OPCAO = c_opcao
           AND INE_CODIGO_REF LIKE 'SR%';
      
        --- SELOS DO ITEM NA PROPOSTA ---
        IF n_seloremo > 0 THEN
          IF n_subItem = 1 THEN
            n_subItem := 1;
          ELSIF n_subItem = 2 THEN
            n_subItem := 1;
          ELSIF n_subItem = 3 THEN
            n_subItem := 2;
          END IF;
        END IF;
      
      END IF;
    
      n_sumSubItem := n_sumSubItem + (n_subItem * n_qtd_it);
    
      j := j + 1;
    
    END LOOP;
  
    j := 1;
    WHILE j <= length(vc2_opesp) LOOP
    
      c_opcao    := substr(vc2_opesp, j, 2);
      n_item     := j;
      n_seloremo := 0;
    
      SELECT DISTINCT NVL(P.OIT_SELOREMO, 0) SUNITEM
        INTO n_subItem
        FROM CADBASICO.OPCAO_ITNEG P
       WHERE P.INE_CODIGO = TRIM(vc2_produto)
            --AND P.CIT_NROCLAS = n_item
         AND P.OIT_OPCAO = c_opcao
         AND P.CIT_TIPO = 2;
    
      IF n_subItem > 0 THEN
      
        SELECT COUNT(T.INE_CODIGO) SELO
          INTO n_seloremo
          FROM CADBASICO.ITNEG_REF T
         WHERE INE_CODIGO = TRIM(vc2_produto)
           AND CIT_TIPO = 1
           AND CIT_NROCLAS = n_item
           AND OIT_OPCAO = c_opcao
           AND INE_CODIGO_REF LIKE 'SR%';
      
        --- SELOS DO ITEM NA PROPOSTA ---
        IF n_seloremo > 0 THEN
          IF n_subItem = 1 THEN
            n_subItem := 1;
          ELSIF n_subItem = 2 THEN
            n_subItem := 1;
          ELSIF n_subItem = 3 THEN
            n_subItem := 2;
          END IF;
        END IF;
      
      END IF;
    
      n_sumSubItem := n_sumSubItem + (n_subItem * n_qtd_it);
    
      j := j + 2;
    
    END LOOP;
  
    RETURN(n_sumSubItem - n_qtd_sr);
  
  END SF_RETORNA_SELO;

  ----------------------------------------------------------
  ------------ APAGA ITEM REFERENTE (AMARRADO) -------------
  ----------------------------------------------------------

  PROCEDURE SP_APAGA_ITREF(n_prp_codigo    IN ITEM_PROP.PRP_CODIGO%TYPE,
                           n_prp_item_prop IN ITEM_PROP.IPR_ITEM_PROP%TYPE) IS
  
    vc2_produto PRODUTO.PRODUTO%TYPE;
    vc2_opcat   ITEM_PROP.IPR_ITEM%TYPE;
    vc2_opesp   ITEM_PROP.IPR_CLASSE%TYPE;
    n_qtd_it    INTEGER;
    n_qtd_ref   INTEGER;
    c_op_parte  VARCHAR2(2);
    n_erro      INTEGER;
  
  BEGIN
  
    SELECT DISTINCT IP.PRO_CODIGO, IP.IPR_ITEM, IP.IPR_CLASSE
      INTO vc2_produto, vc2_opcat, vc2_opesp
      FROM ITEM_PROP IP
     WHERE IP.IPR_ITEM_PROP = n_prp_item_prop
       AND IP.PRP_CODIGO = n_prp_codigo;
  
    --- ITENS NA OS ---
    SELECT COUNT(IPR_CODIGO) QTD_IT
      INTO n_qtd_it
      FROM ITEM_PROP
     WHERE IPR_ITEM_PROP = n_prp_item_prop
       AND PRP_CODIGO = n_prp_codigo;
  
    FOR c_itens IN (SELECT IP.PRO_CODIGO,
                           SUM(IP.IPR_QUANTIDADE) QTD,
                           IP.IPR_ITEM_PROP
                      FROM SIAOS.ITEM_PROP IP
                     INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                        ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                       AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                     WHERE IP.PRP_CODIGO = n_prp_codigo
                       AND IPU.IPR_ITEM_PAI = n_prp_item_prop
                       AND IP.IPR_LINK_MANUAL = 0
                     GROUP BY IP.PRO_CODIGO, IP.IPR_ITEM_PROP) LOOP
      FOR c_itene IN (SELECT T.CIT_TIPO, T.CIT_NROCLAS, T.OIT_OPCAO
                        FROM CADBASICO.ITNEG_REF T
                       WHERE INE_CODIGO = TRIM(vc2_produto)
                         AND INE_CODIGO_REF = TRIM(c_itens.PRO_CODIGO)
                         AND SUBSTR(INE_CODIGO_REF, 1, 2) != 'SR') LOOP
      
        IF c_itene.CIT_TIPO = 1 THEN
          c_op_parte := SUBSTR(vc2_opcat, c_itene.CIT_NROCLAS, 1);
        ELSE
          c_op_parte := SUBSTR(vc2_opcat, c_itene.CIT_NROCLAS * 2, 2);
        END IF;
      
        SELECT COUNT(T.INE_CODIGO_REF)
          INTO n_qtd_ref
          FROM CADBASICO.ITNEG_REF T
         WHERE INE_CODIGO = TRIM(vc2_produto)
           AND INE_CODIGO_REF = TRIM(c_itens.PRO_CODIGO)
           AND T.CIT_TIPO = c_itene.CIT_TIPO
           AND T.CIT_NROCLAS = c_itene.CIT_NROCLAS
           AND T.OIT_OPCAO = c_op_parte
           AND SUBSTR(INE_CODIGO_REF, 1, 2) != 'SR';
      
        IF c_op_parte != c_itene.OIT_OPCAO AND n_qtd_ref = 0 THEN
          SIAOS.PCK_SMART_SALES3.SP_APAGA_ITEM(n_prp_codigo,
                                               c_itens.IPR_ITEM_PROP,
                                               n_erro);
        END IF;
      
      END LOOP;
    
    END LOOP;
  
  END SP_APAGA_ITREF;

  ----------------------------------------------------------
  ------------ RETORNA SE TEM SELO REMOTO ------------------
  ----------------------------------------------------------

  Function SF_RETORNA_TIPO_SELO(n_prp_codigo    IN ITEM_PROP.PRP_CODIGO%Type,
                                n_prp_item_prop IN ITEM_PROP.IPR_ITEM_PROP%Type)
    Return OPCAO.SELOREMO%Type IS
  
    vc2_produto PRODUTO.PRODUTO%Type;
    vc2_opcat   ITEM_PROP.IPR_ITEM%Type;
    n_item      INTEGER;
    j           INTEGER;
    n_sr_sensor ITEM_PROP.IPR_ITEM_PROP%Type;
    c_opcao     CHAR;
    n_seloremo  OPCAO.SELOREMO%Type := 0;
  
  BEGIN
  
    SELECT DISTINCT ITEM_PROP.PRO_CODIGO
      INTO vc2_produto
      FROM ITEM_PROP
     WHERE ITEM_PROP.IPR_ITEM_PROP = n_prp_item_prop
       AND ITEM_PROP.PRP_CODIGO = n_prp_codigo;
  
    IF SUBSTR(vc2_produto, 1, 2) = 'SR' THEN
    
      BEGIN
      
        SELECT DISTINCT T.IPR_ITEM_PROP
          INTO n_sr_sensor
          FROM ITEM_PROP S, ITEM_PROP T
         WHERE S.IPR_ITEM_PROP = n_prp_item_prop
           AND S.PRP_CODIGO = n_prp_codigo
           AND S.IPR_COD_TR = T.IPR_CODIGO;
      
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
          n_sr_sensor := NULL;
        
      END;
    
    ELSE
    
      n_sr_sensor := n_prp_item_prop;
    
    END IF;
  
    IF n_sr_sensor IS NOT NULL THEN
    
      SELECT DISTINCT ITEM_PROP.PRO_CODIGO, ITEM_PROP.IPR_ITEM
        INTO vc2_produto, vc2_opcat
        FROM ITEM_PROP
       WHERE ITEM_PROP.IPR_ITEM_PROP = n_sr_sensor
         AND ITEM_PROP.PRP_CODIGO = n_prp_codigo;
    
      j := 1;
      WHILE j <= length(vc2_opcat) LOOP
      
        c_opcao := substr(vc2_opcat, j, 1);
        n_item  := j;
        IF n_seloremo = 0 THEN
          SELECT DISTINCT SELOREMO
            INTO n_seloremo
            FROM OPCAO
           WHERE PRODUTO = vc2_produto
             AND NROITEM = n_item
             AND OPITEM = c_opcao;
        END IF;
        j := j + 1;
      END LOOP;
    
    END IF;
  
    Return(n_seloremo);
  
  END SF_RETORNA_TIPO_SELO;

  ----------------------------------------------------------
  ------  GRAVA DADOS DE OPERACAO DA PROPOSTA NA OS  -------
  ----------------------------------------------------------
  PROCEDURE SP_GRAVA_DADO_OPERACAO_OELIN(n_control  IN OELIN.CONTROLE%Type,
                                         n_control1 IN ITEM_PROP.IPR_CODIGO%Type) IS
  
  BEGIN
    FOR reg_opera IN (SELECT *
                        FROM ITEM_PROP_DADO
                       WHERE ITEM_PROP_DADO.IPR_CODIGO = n_control1) LOOP
      
         /*     INSERT INTO DADOPCAT (CONTROLE,
                                    NROCLAS,
                                    TIPO,
                                    VALOR_DO_DADO,
                                    VALOR,
                                    STATUS,
                                    DESCRICAO1,
                                    DESCRICAO2,
                                    CANCEL,
                                    OPCLAS)
              VALUES(n_control,
                     reg_opera.NROCLAS,
                     TRIM(reg_opera.IPD_TIPO),
                     TRIM(reg_opera.IPD_VALOR_DADO),
                     reg_opera.IPD_VALOR,
                     TRIM(reg_opera.STATUS),
                     TRIM(reg_opera.IPD_DESCRICAO_I),
                     TRIM(reg_opera.IPD_DESCRICAO_P),
                     TRIM(reg_opera.IPD_CANCELA),
                     TRIM(reg_opera.OPCLAS));
      */
      UPDATE DADOPCAT
         SET DADOPCAT.TIPO          = TRIM(reg_opera.IPD_TIPO),
             DADOPCAT.VALOR_DO_DADO = TRIM(reg_opera.IPD_VALOR_DADO),
             DADOPCAT.VALOR         = TRIM(reg_opera.IPD_VALOR)
       WHERE DADOPCAT.CONTROLE = n_control
         AND NROCLAS = reg_opera.NROCLAS
         AND DADOPCAT.STATUS = reg_opera.STATUS; 
    
    END LOOP;
    COMMIT;
  END SP_GRAVA_DADO_OPERACAO_OELIN;

  ----------------------------------------------------------
  ------------------  VEREFICA DIVERSOS  -------------------
  ----------------------------------------------------------
  FUNCTION SF_VERIFICA_DIVERSOS(n_prp_codigo IN PROPOSTA.PRP_CODIGO%Type)
    RETURN INTEGER IS
  
    n_div_ok INTEGER;
    n_vend   INTEGER;
    n_tran   INTEGER;
  
  BEGIN
  
    n_div_ok := 0;
    /*
      SELECT PRP_DT_REAJUSTE
        INTO d_data
        FROM PROPOSTA
      WHERE PRP_CODIGO = n_prp_codigo;
    */
    SELECT COUNT(VENDEDOR_PROP.SALESP_KEY) AS SHIP_VIA_KEY
      INTO n_vend
      FROM VENDEDOR_PROP
     WHERE VENDEDOR_PROP.PRP_CODIGO = n_prp_codigo;
  
    SELECT COUNT(TRANSP_PROP.SHIP_VIA_KEY) AS SHIP_VIA_KEY
      INTO n_tran
      FROM TRANSP_PROP
     WHERE TRANSP_PROP.PRP_CODIGO = n_prp_codigo;
  
    --   IF ((d_data IS NOT NULL) AND (n_vend IS NOT NULL) AND (n_tran IS NOT NULL)) THEN
    IF ((n_vend IS NOT NULL) AND (n_tran IS NOT NULL)) THEN
    
      n_div_ok := 0;
    
    ELSE
    
      n_div_ok := 1;
    
    END IF;
  
    RETURN n_div_ok;
  
  END SF_VERIFICA_DIVERSOS;

  ----------------------------------------------------------
  -------------------  VEREFICA ITENS  ---------------------
  ----------------------------------------------------------
  FUNCTION SF_VERIFICA_ITEM_PROPOSTA(n_prop      IN PROPOSTA.PRP_CODIGO%Type,
                                     n_item_prop IN ITEM_PROP.IPR_ITEM_PROP%Type)
    RETURN number IS
  
    n_erro NUMBER := 0;
    --n_tem_item     PRODUTO.QTD_OP_CAT%Type;
    --n_tem_classes  PRODUTO.TEM_OPCOES%Type;
    n_tem_dados NUMBER := 0;
    --n_tipo_selo    NUMBER := 0;
    n_tem_selo NUMBER := 0;
    --n_itens        NUMBER := 0;
    n_qtd NUMBER := 0;
    --n_qtd_ip       NUMBER := 0;
    --n_selo_cad     NUMBER := 0;
    --n_qtd_selo     NUMBER := 0;
    --n_total_selos  NUMBER := 0;
    n_eh_num       NUMBER := 0;
    dt_dia_min     DATE;
    v_ipu_st_preco SIAOS.ITEM_PROP_UNI.IPU_STATUS_PRECO%Type;
    vc2_unid_cal   VARCHAR2(13);
    n_val_min      OPCAO.VL_MINIMO%TYPE;
    n_val_max      OPCAO.VL_MAXIMO%TYPE;
    n_ck_cal       NUMBER;
    vc2_semana     SIAOS.OELIN.SEMANA_PROMET%TYPE;
    n_msv_codigo   SIAOS.ITEM_PROP_UNI.MSV_CODIGO%TYPE;
    v_fsvc_status  SIAOS.ITEM_PROP_UNI.IPU_STATUS_FSVC%TYPE;
    n_tes_recno    SIAOS.ITEM_PROP_UNI.TES_RECNO%TYPE;
    c_f4_icm       INTEGRACAO.VW_TES.F4_ICM%TYPE;
    c_f4_iss       INTEGRACAO.VW_TES.F4_ISS%TYPE;
    c_f4_ipi       INTEGRACAO.VW_TES.F4_IPI%TYPE;
    c_f4_lficm     INTEGRACAO.VW_TES.F4_LFICM%TYPE;
  
  BEGIN
  
    FOR cur_item IN (SELECT DISTINCT PDT.INE_CODIGO PRO_CODIGO,
                                     IP.IPR_ITEM,
                                     IP.IPR_CLASSE,
                                     IP.IPR_PRECO,
                                     NVL(IP.IPR_VENDA_CLI, 0) IPR_VENDA_CLI,
                                     NVL(IP.IPR_VENDA_FIM, 0) IPR_VENDA_FIM,
                                     MIN(IP.IPR_DT_ENTREGA) IPR_DT_ENTREGA,
                                     MIN(IP.IPR_SEMANA_ENT) IPR_SEMANA_ENT,
                                     NVL(IP.IPR_APNF, 0) IPR_APNF,
                                     NVL(IP.IPR_IPI, 0) IPR_IPI,
                                     NVL(IP.IPR_ICMS, 0) IPR_ICMS,
                                     NVL(IP.IPR_ISS, 0) IPR_ISS,
                                     O.TOR_CODIGO,
                                     O.GDI_CODIGO,
                                     IP.IPR_STATUS_CONS,
                                     IP.IPR_HOLD,
                                     PRP.PRP_STATUS_CONS,
                                     PDT.INE_DISP,
                                     NVL(PDT.INE_PRZERO, 0) PODEZERO,
                                     PDT.GRA_CODIGO,
                                     PRP.PRP_STATUS_FSVC
                       FROM SIAOS.PROPOSTA PRP
                      INNER JOIN SIAOS.ITEM_PROP IP ON IP.PRP_CODIGO = PRP.PRP_CODIGO
                      INNER JOIN SIAOS.ORIGEM O ON O.ORIGEM = PRP.ORI_CODIGO
                      INNER JOIN CADBASICO.ITEM_NEGOCIO PDT ON PDT.INE_CODIGO = TRIM(IP.PRO_CODIGO)
                      WHERE IP.PRP_CODIGO = n_prop
                        AND IP.IPR_ITEM_PROP = n_item_prop
                      GROUP BY PDT.INE_CODIGO,
                               IP.IPR_ITEM,
                               IP.IPR_CLASSE,
                               IP.IPR_PRECO,
                               IP.IPR_VENDA_CLI,
                               IP.IPR_VENDA_FIM,
                               IP.IPR_APNF,
                               IP.IPR_IPI,
                               IP.IPR_ICMS,
                               IP.IPR_ISS,
                               O.TOR_CODIGO,
                               O.GDI_CODIGO,
                               IP.IPR_STATUS_CONS,
                               IP.IPR_HOLD,
                               PRP.PRP_STATUS_CONS,
                               PDT.INE_DISP,
                               PDT.INE_PRZERO,
                               PDT.GRA_CODIGO,
                               PRP.PRP_STATUS_FSVC) 
    LOOP
        
      SELECT IPU.MSV_CODIGO, IPU.IPU_STATUS_FSVC, IPU.TES_RECNO
        INTO n_msv_codigo, v_fsvc_status, n_tes_recno
        FROM SIAOS.ITEM_PROP_UNI IPU
       WHERE IPU.PRP_CODIGO = n_prop
         AND IPU.IPR_ITEM_PROP = n_item_prop;
    
      IF cur_item.IPR_HOLD = 0 THEN
      
        n_tem_dados := SF_TEM_DADOS(cur_item.PRO_CODIGO);
      
        /* Verifica Dados que nao podem estar sem preenchimento */
        /* Opcao de Catalogo */
      
        IF n_tem_dados > 0 THEN
        
          n_qtd := 0;
        
          FOR cur_dadoop IN (SELECT TRIM(IPD.IPD_TIPO) IPD_TIPO,
                                    TRIM(IPD.IPD_DESCRICAO_P) IPD_DESCRICAO_P,
                                    TRIM(IPD.IPD_VALOR_DADO) IPD_VALOR_DADO,
                                    IPD.IPD_VALOR_DADO IPD_VALOR_DADO_CAL,
                                    IPD.IPR_CODIGO
                               FROM SIAOS.ITEM_PROP_DADO IPD
                              INNER JOIN SIAOS.ITEM_PROP IP
                                 ON IP.IPR_CODIGO = IPD.IPR_CODIGO
                              WHERE IP.PRP_CODIGO = n_prop
                                AND IP.IPR_ITEM_PROP = n_item_prop) LOOP
          
            n_qtd := 1;
          
            IF NVL(INSTR(cur_dadoop.IPD_DESCRICAO_P, 'TAG'), 0) = 0 THEN
            
              IF cur_dadoop.IPD_TIPO = 'CAL' THEN
              
                IF cur_item.GRA_CODIGO = 1 THEN
                
                  BEGIN
                    vc2_unid_cal := TRIM(SUBSTR(cur_dadoop.IPD_VALOR_DADO_CAL, 27, 13));
                    n_val_min    := TO_NUMBER(TRIM(SUBSTR(cur_dadoop.IPD_VALOR_DADO_CAL, 1, 13)), 'FM9999999990.000000');
                    n_val_max    := TO_NUMBER(TRIM(SUBSTR(cur_dadoop.IPD_VALOR_DADO_CAL, 14, 13)), 'FM9999999990.000000');
                  
                    n_ck_cal := SIAOS.PCK_SMART_SALES3.SF_CHECA_CALIBRACAO(cur_dadoop.IPR_CODIGO, vc2_unid_cal, n_val_min, n_val_max, 1);
                    IF n_ck_cal > 0 THEN
                      n_erro := 2;
                    END IF;
                  EXCEPTION WHEN OTHERS THEN
                      n_erro := 2;
                  END;
                
                ELSE
                
                  vc2_unid_cal := TRIM(SUBSTR(cur_dadoop.IPD_VALOR_DADO_CAL, 27, 13));
                  n_val_min    := TO_NUMBER(TRIM(SUBSTR(cur_dadoop.IPD_VALOR_DADO_CAL, 1, 13)), 'FM9999999990.000000');
                  n_val_max    := TO_NUMBER(TRIM(SUBSTR(cur_dadoop.IPD_VALOR_DADO_CAL, 14, 13)), 'FM9999999990.000000');
                
                  IF vc2_unid_cal IS NULL OR n_val_min IS NULL OR n_val_max IS NULL OR n_val_min = n_val_max THEN
                    n_erro := 2;
                  END IF;
                
                END IF;
              
              ELSIF cur_dadoop.IPD_TIPO = 'NUM' AND cur_dadoop.IPD_VALOR_DADO != '----' THEN
                BEGIN
                  n_eh_num := TO_NUMBER(cur_dadoop.IPD_VALOR_DADO);
                EXCEPTION WHEN OTHERS THEN
                    n_erro := 16;
                END;
              ELSE
                IF cur_dadoop.IPD_VALOR_DADO IS NULL AND cur_dadoop.IPD_VALOR_DADO != '----' THEN
                  n_erro := 16;
                END IF;
              END IF;
            
            END IF;
          
          END LOOP;
        
          IF n_erro = 0 THEN
          
            SIAOS.SP_CK_DADO_OP(n_prop, n_item_prop, n_erro);
          
            IF n_erro > 0 THEN
              n_erro := 16;
            END IF;
          
          END IF;
        
        END IF;
      
        IF n_erro > 0 THEN
        
          IF n_qtd = 0 THEN
            n_erro := 2;
          ELSE
            n_qtd := 0;
          END IF;
        
        END IF;
      
        IF n_erro = 0 THEN
          n_erro := CADBASICO.SF_VALIDA_PRODUTO(cur_item.PRO_CODIGO, cur_item.IPR_ITEM,  cur_item.IPR_CLASSE);
        END IF;
      
        IF n_erro = 0 THEN
        
          IF n_msv_codigo IS NOT NULL AND TRIM(v_fsvc_status) IS NULL THEN
            n_erro := 23;
          ELSIF n_msv_codigo IS NOT NULL AND v_fsvc_status = 'P' THEN
            n_erro := 24;
          ELSIF n_msv_codigo IS NOT NULL AND v_fsvc_status = 'N' THEN
            n_erro := 25;
          ELSIF n_msv_codigo IS NOT NULL AND v_fsvc_status = 'A' AND cur_item.PRP_STATUS_FSVC = 'R' THEN
            n_erro := 23;
          END IF;
        
        END IF;
      
        /* Opcao Especial */
        IF cur_item.PODEZERO = 0 AND NVL(n_erro, 0) = 0 THEN
          /* Valor Venda Cliente */
          IF n_erro = 0 THEN
            IF ((cur_item.IPR_VENDA_CLI = 0) AND n_msv_codigo IS NULL) THEN
              n_erro := 5;
            ELSE
              n_erro := 0;
            END IF;
          END IF;
        
          /* Valor Venda Usuario Final */
          IF n_erro = 0 THEN
            IF ((cur_item.IPR_VENDA_FIM = 0) AND n_msv_codigo IS NULL) THEN
              n_erro := 6;
            ELSE
              n_erro := 0;
            END IF;
          END IF;
        END IF;
      
        IF n_erro = 0 AND n_tes_recno IS NULL THEN
          n_erro := 26;
        END IF;
      
        /* Valor Venda Usuario Final */
        IF n_erro = 0 AND cur_item.GDI_CODIGO NOT IN (3, 15) AND
           SUBSTR(cur_item.PRO_CODIGO, 1, 4) != 'PCLI' THEN
        
          SELECT DISTINCT T.F4_ICM, T.F4_ISS, T.F4_IPI, T.F4_LFICM
            INTO c_f4_icm, c_f4_iss, c_f4_ipi, c_f4_lficm
            FROM INTEGRACAO.VW_TES2 T
           WHERE T.R_E_C_N_O_ = trim(n_tes_recno);
        
          IF n_erro = 0 THEN
            IF cur_item.IPR_ICMS = 0 THEN
              IF cur_item.IPR_IPI != 0 THEN
                IF c_f4_ipi = 'N' OR c_f4_icm = 'N' THEN
                  n_erro := 0;
                ELSE
                  n_erro := 22;
                END IF;
              ELSIF cur_item.IPR_ISS = 0 THEN
                IF c_f4_iss = 'N' THEN
                  n_erro := 0;
                ELSE
                  n_erro := 22;
                END IF;
              ELSE
                n_erro := 0;
              END IF;
            ELSE
              IF cur_item.IPR_ISS != 0 THEN
                IF c_f4_icm = 'N' OR c_f4_lficm IN ('I', 'N') THEN
                  n_erro := 0;
                ELSE
                  n_erro := 22;
                END IF;
              ELSE
                n_erro := 0;
              END IF;
            END IF;
          END IF;
        END IF;
      
        IF n_erro = 0 THEN
        
          n_tem_selo := SIAOS.PCK_SMART_SALES3.SF_RETORNA_SELO(n_prop, n_item_prop);
          /*
                    SELECT COUNT(DISTINCT OPCAO.PRODUTO)
                      INTO n_tem_selo
                      FROM SIAOS.ITEM_PROP
                     INNER JOIN SIAOS.ITEM_PROP ON OPCAO.PRODUTO = ITEM_PROP.PRO_CODIGO
                     WHERE ITEM_PROP.IPR_ITEM_PROP = n_item_prop
                       AND ITEM_PROP.PRP_CODIGO = n_prop;
          */
          IF n_tem_selo > 0 THEN
            n_erro := 10;
          
            /*  n_tipo_selo := SF_RETORNA_TIPO_SELO(n_prop, n_item_prop);
            
                        IF n_tipo_selo > 0 THEN
            
                          BEGIN
                            SELECT SUM(ITEM_PROP.IPR_QUANTIDADE)
                              INTO n_qtd
                              FROM SIAOS.ITEM_PROP
                             WHERE ITEM_PROP.IPR_ITEM_PROP = n_item_prop
                               AND ITEM_PROP.PRP_CODIGO = n_prop
                               AND ITEM_PROP.IPR_HOLD = 0
                             GROUP BY ITEM_PROP.IPR_QUANTIDADE;
                          EXCEPTION WHEN NO_DATA_FOUND THEN
                              n_erro := 2; -- PRODUTO SEM DADOS DE CALIBRACAO
                          END;
            
                          BEGIN
                            SELECT SUM(ITEM_PROP.IPR_QUANTIDADE)
                              INTO n_selo_cad
                              FROM SIAOS.ITEM_PROP
                             INNER JOIN SIAOS.ITEM_PROP ITEM_SELO ON ITEM_SELO.IPR_COD_TR = ITEM_PROP.IPR_CODIGO
                             WHERE ITEM_PROP.PRP_CODIGO = n_prop
                               AND ITEM_PROP.IPR_ITEM_PROP = n_item_prop
                               AND ITEM_PROP.IPR_HOLD = 0;
                          EXCEPTION WHEN NO_DATA_FOUND THEN
                              n_erro := 10; -- PRODUTO SEM DADOS DE CALIBRACAO
                          END;
            
                          IF ((n_tipo_selo = 1) OR (n_tipo_selo = 2)) THEN
            
                            n_qtd_selo := 1;
            
                          ELSIF n_tipo_selo = 3 THEN
            
                            n_qtd_selo := 2;
            
                          END IF;
            
                          n_total_selos := n_qtd_selo * n_qtd;
            
                          IF (n_total_selos > n_selo_cad) OR
                             ((n_total_selos IS NOT NULL) AND (n_selo_cad IS NULL)) THEN
            
                            n_erro := 10;
            
                          END IF;
            
                        END IF;
            */
          END IF;
        
        END IF;
      
        /* Status do prazo */
        IF n_erro = 0 THEN
          IF (cur_item.IPR_STATUS_CONS = 'P' OR
             cur_item.IPR_STATUS_CONS = 'R') THEN
            n_erro := 12;
          ELSIF cur_item.IPR_STATUS_CONS IS NULL THEN
            n_erro := 11;
          ELSIF cur_item.IPR_STATUS_CONS = 'C' THEN
            n_erro := 0;
          ELSE
            n_erro := 0;
          END IF;
        END IF;
      
        /* PENDENCIA DE CONSULTA DE PRECO */
        IF n_erro = 0 THEN
        
          SELECT IPU.IPU_STATUS_PRECO
            INTO v_ipu_st_preco
            FROM SIAOS.ITEM_PROP_UNI IPU
           WHERE IPU.PRP_CODIGO = n_prop
             AND IPU.IPR_ITEM_PROP = n_item_prop;
        
          IF v_ipu_st_preco = 'P' THEN
            BEGIN
              SELECT DECODE(CPE_DT_SOLIC, NULL, 0, 1)
                INTO v_ipu_st_preco
                FROM SIAOS.CONSULTA_PRECO CP
               INNER JOIN SIAOS.PROPOSTA P
                  ON P.CPE_CODIGO = CP.CPE_CODIGO
               WHERE PRP_CODIGO = n_prop;
            EXCEPTION WHEN OTHERS THEN
                v_ipu_st_preco := 0;
            END;
            IF v_ipu_st_preco = 0 THEN            
              n_erro := 13;            
            ELSE            
              n_erro := 14;            
            END IF;
          
          ELSIF v_ipu_st_preco = 'C' THEN
            n_erro := 0;
          END IF;
        
        END IF;
      
        IF cur_item.INE_DISP = 2 THEN
          n_erro := 15;
        ELSIF cur_item.INE_DISP = 0 THEN
          n_erro := 21;
        END IF;
      
        /* Valor Venda Cliente */
        IF n_erro = 0 THEN
          IF ((cur_item.IPR_SEMANA_ENT IS NULL) AND
             (cur_item.IPR_DT_ENTREGA IS NULL)) THEN
            n_erro := 7;
          ELSE
            IF cur_item.TOR_CODIGO != 2 THEN
              /* Verifica se Semana nao e retroativa */
              SELECT TO_CHAR(SYSDATE, 'YYYY') || TO_CHAR(SYSDATE, 'IW')
                INTO vc2_semana
                FROM DUAL;
              IF (vc2_semana <= cur_item.IPR_SEMANA_ENT) THEN
                n_erro := 0;
              ELSE
                n_erro := 8;
              END IF;
            ELSE
              /* Verifica se data nao e retroativa */
              IF cur_item.IPR_DT_ENTREGA IS NOT NULL THEN
                SELECT SYSDATE + CPR_DIA_MIN_SER DIA_MIN
                  INTO dt_dia_min
                  FROM SIAOS.CONFIGURA_PROPOSTA;
                IF (TRUNC(dt_dia_min) <= TRUNC(cur_item.IPR_DT_ENTREGA)) THEN
                  n_erro := 0;
                ELSE
                  n_erro := 9;
                END IF;
              
              END IF;
            
            END IF;
          
          END IF;
        
        END IF;
      
        IF n_erro = 0 THEN
          IF cur_item.GDI_CODIGO IN (13, 19) THEN
            FOR c_revit IN (SELECT *
                              FROM SGC.REVISAO R
                             INNER JOIN SIAOS.ITEM_PROP IP
                                ON IP.IPR_CODIGO = R.IPR_CODIGO
                             WHERE IP.PRP_CODIGO = n_prop
                               AND IP.IPR_ITEM_PROP = n_item_prop) LOOP
              IF c_revit.IPG_CODIGO_SV IS NULL THEN
                n_erro := 28;
              ELSE
                SELECT COUNT(*)
                  INTO n_qtd
                  FROM SIAOS.ITEM_PROP IP
                 WHERE IP.PRP_CODIGO = n_prop
                   AND IP.IPG_CODIGO = c_revit.IPG_CODIGO_PC;
                IF n_qtd > 0 THEN
                  SELECT COUNT(*)
                    INTO n_qtd
                    FROM SIAOS.ITEM_PROP IP
                   WHERE IP.PRP_CODIGO = n_prop
                     AND IP.IPG_CODIGO = c_revit.IPG_CODIGO_SV;
                
                  IF n_qtd <= 0 THEN
                    n_erro := 28;
                  END IF;
                
                END IF;
              
              END IF;
            END LOOP;
          END IF;
        END IF;
      
      END IF;
    
      SELECT COUNT(*) QTD
        INTO n_qtd
        FROM CADBASICO.PRODGEN P
       WHERE P.INE_CODIGO = TRIM(cur_item.PRO_CODIGO);
    
      IF n_erro = 0 AND n_qtd != 0 THEN
        n_erro := 90;
      END IF;
    
    END LOOP;
  
    RETURN(n_erro);
  
  EXCEPTION WHEN OTHERS THEN
    
      RETURN(1);
    
  END SF_VERIFICA_ITEM_PROPOSTA;

  ----------------------------------------------------------
  -------------------  VEREFICA ITENS  ---------------------
  ----------------------------------------------------------
  FUNCTION SF_DATA_ENTREGA(n_prp_codigo IN PROPOSTA.PRP_CODIGO%TYPE,
                           n_item_prop  IN ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN NUMBER IS
  
    n_prp_qtd      ITEM_PROP.IPR_QUANTIDADE%Type;
    c_pro_codigo   ITEM_PROP.PRO_CODIGO%Type;
    c_ipr_item     ITEM_PROP.IPR_ITEM%Type;
    c_ipr_classe   ITEM_PROP.IPR_CLASSE%Type;
    n_tempo_sem    INTEGER; -- SEMANAS PARA ENTREG
    n_tempo_dia    INTEGER; -- SEMANAS PARA ENTREG
    c_sem_ent      VARCHAR2(10); -- ULTIMO DIA DO ANO
    n_consulta     INTEGER; -- TEM CONSULTA
    n_dia          INTEGER; -- DIA DA SEMANA E HURA
    n_emp_abertura PROPOSTA.EMP_ABERTURA%TYPE;
    c_respons      PRODUTO.RESPONS%TYPE;
  
  BEGIN
  
    SELECT SUM(IPR_QUANTIDADE) PRP_QTD,
           PRO_CODIGO,
           IPR_ITEM,
           IPR_CLASSE,
           SIAOS.PCK_REVISOR.SF_PRODUTO_CONSULTA(ITEM_PROP.PRO_CODIGO) CONSULTA,
           PROPOSTA.EMP_ABERTURA,
           PRODUTO.RESPONS
      INTO n_prp_qtd,
           c_pro_codigo,
           c_ipr_item,
           c_ipr_classe,
           n_consulta,
           n_emp_abertura,
           c_respons
      FROM SIAOS.PROPOSTA, SIAOS.ITEM_PROP, SIAOS.PRODUTO
     WHERE PROPOSTA.PRP_CODIGO = ITEM_PROP.PRP_CODIGO
       AND PRODUTO.PRODUTO = ITEM_PROP.PRO_CODIGO
       AND ITEM_PROP.PRP_CODIGO = n_prp_codigo
       AND ITEM_PROP.IPR_ITEM_PROP = n_item_prop
     GROUP BY PRO_CODIGO,
              IPR_ITEM,
              IPR_CLASSE,
              NVL(PRODUTO.CONSULTA, 0),
              PROPOSTA.EMP_ABERTURA,
              PRODUTO.RESPONS;
  
    IF n_consulta > 0 THEN
    
      SELECT PCK_SIAOS.SF_TEMPO_ENTREGA(n_prp_qtd,
                                        PCK_SIAOS.SF_MAIOR_PESO(c_pro_codigo,
                                                                c_ipr_item,
                                                                c_ipr_classe),
                                        n_emp_abertura,
                                        c_respons) AS TEMPO
        INTO n_tempo_sem
        FROM DUAL;
    
      IF n_tempo_sem = 99 THEN
      
        c_sem_ent := NULL;
      
      ELSE
      
        n_dia := TO_CHAR(SYSDATE, 'DHH24');
      
        -- Compara se a hora e menor ou igual ha QUARTA 12:00
        IF n_dia >= 412 THEN
        
          n_tempo_sem := n_tempo_sem + 1;
        
        END IF;
      
        n_tempo_dia := n_tempo_sem * 7;
      
        SELECT TO_CHAR(SYSDATE + n_tempo_dia, 'IYYYIW') AS SEM
          INTO c_sem_ent
          FROM DUAL;
      
      END IF;
    
    ELSE
    
      SELECT TO_CHAR(SYSDATE, 'IYYYIW') AS SEM INTO c_sem_ent FROM DUAL;
    
    END IF;
  
    RETURN(c_sem_ent);
  
  END SF_DATA_ENTREGA;

  ----------------------------------------------------------
  -------------------  VEREFICA ITEM  ----------------------
  ----------------------------------------------------------
  FUNCTION SF_TEM_ITEM(c_pro_codigo IN PRODUTO.PRODUTO%Type) RETURN number IS
  
    n_tem_item NUMBER := 1;
  
  BEGIN
  
    BEGIN
    
      SELECT DECODE(COUNT(C.INE_CODIGO), 0, 0, 1) ITENS
        INTO n_tem_item
        FROM CADBASICO.OPCAO_ITNEG C
       WHERE C.INE_CODIGO = TRIM(c_pro_codigo)
         AND C.OIT_DISPON != 2
         AND C.CIT_TIPO = 1;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_tem_item := 0; -- PRODUTO SEM ITENS
    
    END;
  
    RETURN(n_tem_item);
  
  END SF_TEM_ITEM;

  ----------------------------------------------------------
  -------------------  VEREFICA CLASSE  ---------------------
  ----------------------------------------------------------
  FUNCTION SF_TEM_CLASSE(c_pro_codigo IN PRODUTO.PRODUTO%Type) RETURN number IS
  
    n_tem_classes NUMBER := 1;
  
  BEGIN
  
    BEGIN
    
      SELECT DECODE(COUNT(C.INE_CODIGO), 0, 0, 1) ITENS
        INTO n_tem_classes
        FROM CADBASICO.OPCAO_ITNEG C
       WHERE C.INE_CODIGO = TRIM(c_pro_codigo)
         AND C.OIT_DISPON != 2
         AND C.CIT_TIPO = 2;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_tem_classes := 0; -- PRODUTO SEM CLASSES
    
    END;
  
    RETURN(n_tem_classes);
  
  END SF_TEM_CLASSE;

  ----------------------------------------------------------
  --------  VEREFICA CLASSE PARA CHECK DE PROPOSTA ---------
  ----------------------------------------------------------
  FUNCTION SF_TEM_CLASSE2(c_pro_codigo IN PRODUTO.PRODUTO%Type) RETURN number IS
  
    n_tem_classes NUMBER := 1;
  
  BEGIN
  
    BEGIN
    
      SELECT DECODE(COUNT(OPCLAS.PRODUTO), 0, 0, 1) CLASSES
        INTO n_tem_classes
        FROM SIAOS.OPCLAS, SIAOS.CLASSE
       WHERE OPCLAS.PRODUTO = CLASSE.PRODUTO
         AND OPCLAS.NROCLAS = CLASSE.NROCLAS
         AND OPCLAS.DISPONIV = 1
         AND CLASSE.OBRIGATORI = 1
         AND OPCLAS.PRODUTO = c_pro_codigo;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_tem_classes := 0; -- PRODUTO SEM CLASSES
    
    END;
  
    RETURN(n_tem_classes);
  
  END SF_TEM_CLASSE2;

  ----------------------------------------------------------
  -------------------  VEREFICA DADOS  ---------------------
  ----------------------------------------------------------
  FUNCTION SF_TEM_DADOS(c_pro_codigo IN SIAOS.DADOSREG.PRODUTO%Type)
    RETURN number IS
  
    n_tem_dados NUMBER := 0;
    n_dados     NUMBER := 0;
  
  BEGIN
  
    SELECT NVL(COUNT(PD.INE_CODIGO), 0)
      INTO n_dados
      FROM CADBASICO.DADOS_OPERA PD
     WHERE PD.INE_CODIGO = TRIM(c_pro_codigo);
  
    IF n_dados > 0 THEN
      n_tem_dados := 1;
    END IF;
  
    RETURN(n_tem_dados);
  
  EXCEPTION
    WHEN OTHERS THEN
      RETURN(0);
  END SF_TEM_DADOS;

  ----------------------------------------------------------
  -------------------  VEREFICA DADOS  ---------------------
  ----------------------------------------------------------
  FUNCTION SF_TEM_DADOS2(n_ipr_codigo IN ITEM_PROP.PRP_CODIGO%TYPE,
                         n_ipr_item   IN ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN number IS
  
    n_tem_dados NUMBER := 1;
    n_nao_fab   NUMBER;
    n_itemiza   NUMBER;
    v_prod      ITEM_PROP.PRO_CODIGO%TYPE;
  
  BEGIN
    BEGIN
      SELECT DISTINCT ITEM_PROP.IPR_NAO_FAB, ITEM_PROP.PRO_CODIGO
        INTO n_nao_fab, v_prod
        FROM SIAOS.ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_ipr_codigo
         AND ITEM_PROP.IPR_ITEM_PROP = n_ipr_item;
    
      SELECT ITEMIZAR
        INTO n_itemiza
        FROM SIAOS.PRODUTO
       WHERE PRODUTO.PRODUTO = v_prod;
    
      SELECT PCK_SMART_SALES3.SF_TEM_DADOS(TRIM(v_prod))
        INTO n_tem_dados
        FROM DUAL;
    EXCEPTION
      WHEN OTHERS THEN
        NULL;
    END;
  
    IF ((n_nao_fab = 1) AND (n_itemiza = 1)) THEN
    
      n_tem_dados := 1;
    
    END IF;
  
    RETURN(n_tem_dados);
  
  END SF_TEM_DADOS2;

  ----------------------------------------------------------
  -----------------  GRAVA DIVERSOS - OS -------------------
  ----------------------------------------------------------
  PROCEDURE SP_UP_DIV_OS(n_prp_codigo        IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         c_ori_codigo        IN SIAOS.PROPOSTA.ORI_CODIGO%TYPE,
                         c_fil_codigo        IN SIAOS.PROPOSTA.FIL_CODIGO%TYPE,
                         n_prp_antecipa      IN SIAOS.PROPOSTA.PRP_ANTECIPA%TYPE,
                         n_prp_parcial       IN SIAOS.PROPOSTA.PRP_PARCIAL%TYPE,
                         n_prp_insp_externa  IN SIAOS.PROPOSTA.PRP_INSP_EXTERNA%TYPE,
                         dt_prp_dt_insp      IN VARCHAR2,
                         n_prp_comissao_subs IN SIAOS.PROPOSTA.PRP_COMISSAO_SUBS%TYPE,
                         n_prp_pedido        IN SIAOS.PROPOSTA.PRP_PEDIDO%TYPE,
                         dt_prp_pedido       IN VARCHAR2,
                         n_prp_pedido_receb  IN SIAOS.PROPOSTA.PRP_PEDIDO_RECEBIDO%TYPE,
                         n_emissor           IN SIAOS.PROPOSTA.EMISSOR%TYPE,
                         v_cont_com          IN SIAOS.PROPOSTA.PRP_CONT_COM%TYPE,
                         v_cont_tec          IN SIAOS.PROPOSTA.PRP_CONT_TEC%TYPE,
                         v_cont_fin          IN SIAOS.PROPOSTA.PRP_CONT_FIN%TYPE,
                         n_top_codigo        IN SIAOS.PROPOSTA.TOP_CODIGO%TYPE,
                         v_media_manual      IN SIAOS.PROPOSTA.PRP_MEDIA_MANUAL%TYPE,
                         c_territorio        IN SIAOS.PROPOSTA.TERR_KEY%TYPE,
                         n_prp_validade      IN SIAOS.PROPOSTA.PRP_VALIDADE%TYPE,
                         n_prp_sistema       IN SIAOS.PROPOSTA.PRP_SISTEMA%TYPE,
                         n_prp_desenho_apr   IN SIAOS.PROPOSTA.PRP_DESENHO_APR%TYPE,
                         n_prp_desenho_cer   IN SIAOS.PROPOSTA.PRP_DESENHO_CER%TYPE,
                         n_emp_abertura      IN SIAOS.PROPOSTA.EMP_ABERTURA%TYPE,
                         n_prp_prob_venda    IN SIAOS.PROPOSTA.PRP_PROB_VENDA%TYPE,
                         dt_prp_dt_prob      IN VARCHAR2,
                         n_cve_codigo        IN SIAOS.PROPOSTA.CVE_CODIGO%TYPE,
                         n_mve_codigo        IN SIAOS.PROPOSTA.MVE_CODIGO%TYPE,
                         n_erro              OUT INTEGER) IS
  
    n_cop_numero SIAOS.CONTATO_PROP.COP_NUMERO%TYPE;
    n_exportacao SIAOS.PROPOSTA.PRP_EXPORTACAO%TYPE;
  
  BEGIN
  
    IF n_top_codigo = 2 THEN
      n_exportacao := 1;
    ELSE
      n_exportacao := 0;
    END IF;
  
    BEGIN
      UPDATE SIAOS.PROPOSTA
         SET ORI_CODIGO          = c_ori_codigo,
             FIL_CODIGO          = c_fil_codigo,
             PRP_ANTECIPA        = n_prp_antecipa,
             PRP_PARCIAL         = n_prp_parcial,
             PRP_INSP_EXTERNA    = n_prp_insp_externa,
             PRP_DT_INSP         = TO_DATE(dt_prp_dt_insp, 'DD/MM/YYYY'),
             PRP_COMISSAO_SUBS   = n_prp_comissao_subs,
             PRP_PEDIDO          = n_prp_pedido,
             PRP_DT_PEDIDO       = TO_DATE(dt_prp_pedido, 'DD/MM/YYYY'),
             PRP_PEDIDO_RECEBIDO = n_prp_pedido_receb,
             PRP_DOCUM_CERTIF    = 0,
             EMISSOR             = n_emissor,
             PRP_CONT_COM        = v_cont_com,
             PRP_CONT_TEC        = v_cont_tec,
             PRP_CONT_FIN        = v_cont_fin,
             PRP_EXPORTACAO      = n_exportacao,
             PRP_MEDIA_MANUAL    = v_media_manual,
             TERR_KEY            = c_territorio,
             PRP_VALIDADE        = n_prp_validade,
             PRP_SISTEMA         = n_prp_sistema,
             PRP_DESENHO_APR     = n_prp_desenho_apr,
             PRP_DESENHO_CER     = n_prp_desenho_cer,
             EMP_ABERTURA        = n_emp_abertura,
             PRP_PROB_VENDA      = n_prp_prob_venda,
             PRP_DT_PROB         = TO_DATE(dt_prp_dt_prob, 'DD/MM/YYYY'),
             TOP_CODIGO          = n_top_codigo,
             CVE_CODIGO          = n_cve_codigo,
             MVE_CODIGO          = n_mve_codigo
       WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
    
      n_cop_numero := 1;
      SIAOS.PCK_SMART_SALES3.SP_CONTATO(2,
                                        n_prp_codigo,
                                        n_cop_numero,
                                        1,
                                        v_cont_com,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        0);
      n_cop_numero := 2;
      SIAOS.PCK_SMART_SALES3.SP_CONTATO(2,
                                        n_prp_codigo,
                                        n_cop_numero,
                                        2,
                                        v_cont_tec,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        0);
      n_cop_numero := 3;
      SIAOS.PCK_SMART_SALES3.SP_CONTATO(2,
                                        n_prp_codigo,
                                        n_cop_numero,
                                        3,
                                        v_cont_fin,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        NULL,
                                        0);
    
      UPDATE SIAOS.ITEM_PROP IP
         SET IP.IPR_PEDIDO    = n_prp_pedido,
             IP.IPR_DT_PEDIDO = TO_DATE(dt_prp_pedido, 'DD/MM/YYYY')
       WHERE IP.PRP_CODIGO = n_prp_codigo
         AND IP.IPR_PEDIDO IS NULL
         AND IP.IPR_DT_PEDIDO IS NULL;
    
    EXCEPTION
      WHEN OTHERS THEN
        n_erro := 1;
    END;
  
  END SP_UP_DIV_OS;

  ----------------------------------------------------------
  -----------------  GRAVA DIVERSOS - OS -------------------
  ----------------------------------------------------------
  PROCEDURE SP_UP_DIV_EMB(n_prp_codigo       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_prp_emb_codigo   IN SIAOS.PROPOSTA.PRP_EMB_CODIGO%TYPE,
                          n_prp_vl_embalagem IN SIAOS.PROPOSTA.PRP_VL_EMBALAGEM%TYPE,
                          n_prp_embalagem    IN SIAOS.PROPOSTA.PRP_EMBALAGEM%TYPE,
                          v_prp_transporte   IN SIAOS.PROPOSTA.PRP_TRANSPORTE%TYPE,
                          n_prp_vl_frete     IN SIAOS.PROPOSTA.PRP_VL_FRETE%TYPE,
                          n_erro             OUT INTEGER) IS
  
  BEGIN
    BEGIN
      UPDATE SIAOS.PROPOSTA
         SET PRP_EMB_CODIGO   = n_prp_emb_codigo,
             PRP_VL_EMBALAGEM = n_prp_vl_embalagem,
             PRP_EMBALAGEM    = n_prp_embalagem,
             PRP_TRANSPORTE   = v_prp_transporte,
             PRP_VL_FRETE     = n_prp_vl_frete
       WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
    EXCEPTION
      WHEN OTHERS THEN
        n_erro := 1;
    END;
  
  END SP_UP_DIV_EMB;

  ----------------------------------------------------------
  ---------------  GRAVA DADOS FINACEIROS ------------------
  ----------------------------------------------------------
  PROCEDURE SP_UP_DIV_COB(n_prp_codigo       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          v_prp_cob_codigo   IN SIAOS.PROPOSTA.PRP_COB_CODIGO%TYPE,
                          n_prp_reajuste     IN SIAOS.PROPOSTA.PRP_REAJUSTE%TYPE,
                          v_prp_dt_reajuste  IN VARCHAR2,
                          v_ifi_codigo       IN SIAOS.PROPOSTA.IFI_CODIGO%TYPE,
                          n_prp_cambio       IN SIAOS.PROPOSTA.PRP_CAMBIO%TYPE,
                          n_prp_multa        IN SIAOS.PROPOSTA.PRP_MULTA%TYPE,
                          n_prp_finame       IN SIAOS.PROPOSTA.PRP_FINAME%TYPE,
                          n_prp_nota_prom    IN SIAOS.PROPOSTA.PRP_NOTA_PROM%TYPE,
                          n_prp_carta_fianca IN SIAOS.PROPOSTA.PRP_CARTA_FIANCA%TYPE,
                          n_prp_seg_fianca   IN SIAOS.PROPOSTA.PRP_SEG_FIANCA%TYPE,
                          n_prp_porc_produto IN SIAOS.PROPOSTA.PRP_PORC_PRODUTO%TYPE,
                          v_prp_destino      IN SIAOS.PROPOSTA.PRP_DESTINO%TYPE,
                          v_prp_tipo_fatur   IN SIAOS.PROPOSTA.PRP_TIPO_FATUR%TYPE,
                          n_prp_ipi          IN SIAOS.PROPOSTA.PRP_IPI%TYPE,
                          n_prp_icms         IN SIAOS.PROPOSTA.PRP_ICMS%TYPE,
                          n_prp_iss          IN SIAOS.PROPOSTA.PRP_ISS%TYPE,
                          n_erro             OUT INTEGER) IS
  
  BEGIN
    BEGIN
      UPDATE SIAOS.PROPOSTA
         SET PRP_COB_CODIGO   = v_prp_cob_codigo,
             PRP_REAJUSTE     = n_prp_reajuste,
             PRP_DT_REAJUSTE  = TO_DATE(v_prp_dt_reajuste, 'DD/MM/YYYY'),
             IFI_CODIGO       = v_ifi_codigo,
             PRP_CAMBIO       = n_prp_cambio,
             PRP_MULTA        = n_prp_multa,
             PRP_FINAME       = n_prp_finame,
             PRP_NOTA_PROM    = n_prp_nota_prom,
             PRP_CARTA_FIANCA = n_prp_carta_fianca,
             PRP_SEG_FIANCA   = n_prp_seg_fianca,
             PRP_PORC_PRODUTO = n_prp_porc_produto,
             PRP_DESTINO      = v_prp_destino,
             PRP_TIPO_FATUR   = v_prp_tipo_fatur,
             PRP_IPI          = n_prp_ipi,
             PRP_ICMS         = n_prp_icms,
             PRP_ISS          = n_prp_iss
       WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
    EXCEPTION
      WHEN OTHERS THEN
        n_erro := 1;
    END;
  
  END SP_UP_DIV_COB;

  ----------------------------------------------------------
  ---------------  GRAVA DADOS EXPORTAÇÃO ------------------
  ----------------------------------------------------------
  PROCEDURE SP_UP_DIV_EX(n_prp_codigo        IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         v_prp_subsidiaria   IN SIAOS.PROPOSTA.PRP_SUBSIDIARIA%TYPE,
                         v_prp_repr_direto   IN SIAOS.PROPOSTA.PRP_REPR_DIRETO%TYPE,
                         v_prp_repr_indireto IN SIAOS.PROPOSTA.PRP_REPR_INDIRETO%TYPE,
                         v_prp_forwarder     IN SIAOS.PROPOSTA.PRP_FORWARDER%TYPE,
                         v_prp_porto_emb     IN SIAOS.PROPOSTA.PRP_PORTO_EMB%TYPE,
                         v_prp_porto_dest    IN SIAOS.PROPOSTA.PRP_PORTO_DEST%TYPE,
                         n_prp_ha_invoice    IN SIAOS.PROPOSTA.PRP_HA_INVOICE%TYPE,
                         n_cli_codigo_not    IN SIAOS.PROPOSTA.CLI_CODIGO_NOT%TYPE,
                         n_cli_codigo_con    IN SIAOS.PROPOSTA.CLI_CODIGO_CON%TYPE,
                         v_prp_shipmarks     IN SIAOS.PROPOSTA.PRP_SHIPMARKS%TYPE,
                         n_erro              OUT INTEGER) IS
  
  BEGIN
    BEGIN
      UPDATE SIAOS.PROPOSTA
         SET PRP_SUBSIDIARIA   = v_prp_subsidiaria,
             PRP_REPR_DIRETO   = v_prp_repr_direto,
             PRP_REPR_INDIRETO = v_prp_repr_indireto,
             PRP_FORWARDER     = v_prp_forwarder,
             PRP_PORTO_EMB     = v_prp_porto_emb,
             PRP_PORTO_DEST    = v_prp_porto_dest,
             PRP_HA_INVOICE    = n_prp_ha_invoice,
             CLI_CODIGO_NOT    = n_cli_codigo_not,
             CLI_CODIGO_CON    = n_cli_codigo_con,
             PRP_SHIPMARKS     = v_prp_shipmarks
       WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
    EXCEPTION
      WHEN OTHERS THEN
        n_erro := 1;
    END;
  
  END SP_UP_DIV_EX;

  ----------------------------------------------------------
  ---------------  GRAVA DADOS NOTA E OBS ------------------
  ----------------------------------------------------------
  PROCEDURE SP_UP_DIV_NOTA(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           v_prp_nota   IN SIAOS.PROPOSTA.PRP_NOTA%TYPE,
                           n_erro       OUT INTEGER) IS
  
    v_prp_nota2 SIAOS.PROPOSTA.PRP_NOTA%TYPE;
  
  BEGIN
  
    v_prp_nota2 := REPLACE(v_prp_nota, '##', '"');
    v_prp_nota2 := REPLACE(v_prp_nota2, '**', '''');
  
    BEGIN
      UPDATE SIAOS.PROPOSTA
         SET PRP_NOTA = v_prp_nota2
       WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
    EXCEPTION
      WHEN OTHERS THEN
        n_erro := 1;
    END;
  
  END SP_UP_DIV_NOTA;

  ----------------------------------------------------------
  ---------------  GRAVA DADOS NOTA E OBS ------------------
  ----------------------------------------------------------
  PROCEDURE SP_UP_DIV_OBS(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          v_prp_obs    IN SIAOS.PROPOSTA.PRP_OBS%TYPE,
                          n_erro       OUT INTEGER) IS
  
    v_prp_obs2 SIAOS.PROPOSTA.PRP_OBS%TYPE;
  
  BEGIN
  
    v_prp_obs2 := REPLACE(v_prp_obs, '##', '"');
    v_prp_obs2 := REPLACE(v_prp_obs2, '**', '''');
  
    BEGIN
      UPDATE SIAOS.PROPOSTA
         SET PRP_OBS = v_prp_obs2
       WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
    EXCEPTION
      WHEN OTHERS THEN
        n_erro := 1;
    END;
  
  END SP_UP_DIV_OBS;

  ----------------------------------------------------------
  ------------------  GRAVA PAGAMENTOS ---------------------
  ----------------------------------------------------------
  PROCEDURE SP_IN_PAGAMENTO(n_prp_codigo   IN PROP_PAGTO.PRP_CODIGO%TYPE,
                            n_fpa_codigo   IN PROP_PAGTO.FPA_CODIGO%TYPE,
                            v_ppa_tipo     IN PROP_PAGTO.PPA_TIPO%TYPE,
                            n_ppa_valor    IN PROP_PAGTO.PPA_VALOR%TYPE,
                            n_ppa_porcento IN PROP_PAGTO.PPA_PORCENTO%TYPE,
                            n_ppa_data     IN VARCHAR2,
                            n_ppa_dias     IN PROP_PAGTO.PPA_DIAS%TYPE,
                            n_erro         OUT INTEGER) IS
  
    n_valor        PROP_PAGTO.PPA_VALOR%TYPE := 0;
    n_porcento     PROP_PAGTO.PPA_PORCENTO%TYPE := 0;
    n_vl_total_os  NUMBER(11, 2) := 0;
    v_ppa_tipo2    PROP_PAGTO.PPA_TIPO%TYPE;
    n_fpa_ref_data FORMA_PAG.FPA_REF_DATA%TYPE;
  
  BEGIN
  
    SELECT F.FPA_REF_DATA
      INTO n_fpa_ref_data
      FROM SIAOS.FORMA_PAG F
     WHERE F.FPA_CODIGO = n_fpa_codigo;
  
    IF n_fpa_ref_data = 3 THEN
      IF n_ppa_dias > 0 THEN
        v_ppa_tipo2 := 'P';
      ELSE
        v_ppa_tipo2 := 'V';
      END IF;
    ELSE
      IF n_ppa_dias > 0 THEN
        v_ppa_tipo2 := 'A';
      ELSE
        v_ppa_tipo2 := 'S';
      END IF;
    END IF;
  
    SELECT NVL(SUM(PPA_VALOR), 0), NVL(SUM(PPA_PORCENTO), 0)
      INTO n_valor, n_porcento
      FROM SIAOS.PROP_PAGTO
     WHERE PRP_CODIGO = n_prp_codigo;
  
    SELECT SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(P.PRP_CODIGO,
                                                    P.PRP_REVISAO,
                                                    26)
      INTO n_vl_total_os
      FROM SIAOS.PROPOSTA P
     WHERE PRP_CODIGO = n_prp_codigo;
  
    n_valor    := n_valor + n_ppa_valor;
    n_porcento := n_porcento + n_ppa_porcento;
  
    IF n_porcento > 100 THEN
      n_erro := 1;
    END IF;
  
    IF n_valor > n_vl_total_os THEN
      n_erro := 1;
    END IF;
  
    IF n_erro IS NULL THEN
    
      INSERT INTO SIAOS.PROP_PAGTO
        (PRP_CODIGO,
         FPA_CODIGO,
         PPA_TIPO,
         PPA_VALOR,
         PPA_PORCENTO,
         PPA_DATA,
         PPA_DIAS)
      VALUES
        (n_prp_codigo,
         n_fpa_codigo,
         v_ppa_tipo2,
         n_ppa_valor,
         n_ppa_porcento,
         TO_DATE(n_ppa_data, 'dd/mm/yyyy'),
         n_ppa_dias);
      COMMIT;
    
    END IF;
  
  END SP_IN_PAGAMENTO;

  ----------------------------------------------------------
  ---------------  GRAVA MODELO PAGAMENTOS -----------------
  ----------------------------------------------------------
  PROCEDURE SP_IN_MODELO_PAGTO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                               n_mpg_codigo IN SIAOS.MODELO_PAGT.MPG_CODIGO%TYPE,
                               n_erro       OUT INTEGER) IS
  
    n_qtd          INTEGER := 0;
    n_order_no     PROPOSTA.ORDER_NO%TYPE;
    v_ppa_tipo     PROP_PAGTO.PPA_TIPO%TYPE;
    n_fpa_ref_data FORMA_PAG.FPA_REF_DATA%TYPE;
  
  BEGIN
    n_erro := 0;
    SELECT P.ORDER_NO
      INTO n_order_no
      FROM SIAOS.PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;
     
    SELECT NVL(COUNT(M.MPG_CODIGO),0)
      INTO n_qtd
      FROM SIAOS.MODELO_PAGT M
     WHERE M.MPG_CODIGO = n_mpg_codigo
       AND M.MPG_STATUS = 1;
  
    IF n_order_no IS NULL AND n_qtd > 0 THEN
    
      DELETE FROM PROP_PAGTO WHERE PRP_CODIGO = n_prp_codigo;
    
      COMMIT;
    
      FOR c_mod IN (SELECT FPA_CODIGO, MPI_DIAS, MPI_PERC
                      FROM SIAOS.MODELO_PAGT_IT M
                     WHERE M.MPG_CODIGO = n_mpg_codigo
                     ORDER BY MPI_POSICAO) LOOP
      
        SELECT F.FPA_REF_DATA
          INTO n_fpa_ref_data
          FROM SIAOS.FORMA_PAG F
         WHERE F.FPA_CODIGO = c_mod.FPA_CODIGO;
      
        IF n_fpa_ref_data = 3 THEN
          v_ppa_tipo := 'P';
        ELSE
          v_ppa_tipo := 'A';
        END IF;
      
        SIAOS.PCK_SMART_SALES3.SP_IN_PAGAMENTO(n_prp_codigo   => n_prp_codigo,
                                               n_fpa_codigo   => c_mod.FPA_CODIGO,
                                               v_ppa_tipo     => v_ppa_tipo,
                                               n_ppa_porcento => c_mod.MPI_PERC,
                                               n_ppa_valor    => NULL,
                                               n_ppa_data     => NULL,
                                               n_ppa_dias     => c_mod.MPI_DIAS,
                                               n_erro         => n_erro);
      END LOOP;
    
      UPDATE SIAOS.PROPOSTA P
         SET P.MPG_CODIGO = n_mpg_codigo
       WHERE P.PRP_CODIGO = n_prp_codigo;
    
      COMMIT;
    
    END IF;
  
  END SP_IN_MODELO_PAGTO;

  ----------------------------------------------------------
  ---------- GERA PAGAMENTOS AUTOMATICOS  ------------------
  ----------------------------------------------------------
  PROCEDURE SP_IN_PAGAMENTO_AUTO(n_prp_codigo   IN SIAOS.PROP_PAGTO.PRP_CODIGO%Type,
                                 n_fpa_codigo   IN SIAOS.PROP_PAGTO.FPA_CODIGO%Type,
                                 v_ppa_tipo     IN SIAOS.PROP_PAGTO.PPA_TIPO%Type,
                                 n_ppa_valor    IN SIAOS.PROP_PAGTO.PPA_VALOR%Type,
                                 n_ppa_porcento IN SIAOS.PROP_PAGTO.PPA_PORCENTO%Type,
                                 n_ppa_data     IN VARCHAR2,
                                 n_ppa_dias     IN SIAOS.PROP_PAGTO.PPA_DIAS%Type,
                                 n_parc         IN INTEGER,
                                 n_dias         IN INTEGER,
                                 n_erro         OUT INTEGER) IS
  
    i                   INTEGER := 1;
    n_ppa_valor_parc    SIAOS.PROP_PAGTO.PPA_VALOR%Type;
    n_ppa_porcento_parc SIAOS.PROP_PAGTO.PPA_PORCENTO%Type;
    n_ppa_data_parc     DATE;
    n_ppa_dias_parc     SIAOS.PROP_PAGTO.PPA_DIAS%Type;
  
  BEGIN
  
    IF n_ppa_valor IS NOT NULL THEN
    
      n_ppa_valor_parc := (n_ppa_valor / n_parc);
    
    END IF;
  
    IF n_ppa_porcento IS NOT NULL THEN
    
      n_ppa_porcento_parc := (n_ppa_porcento / n_parc);
    
    END IF;
  
    WHILE n_parc >= i LOOP
    
      IF n_ppa_data IS NOT NULL THEN
      
        n_ppa_data_parc := TO_DATE(n_ppa_data, 'DD/MM/YYYY') + (n_dias * i);
      
      END IF;
    
      IF n_ppa_dias IS NOT NULL THEN
      
        n_ppa_dias_parc := n_ppa_dias + (n_dias * i);
      
      END IF;
    
      IF i = n_parc THEN
        n_ppa_porcento_parc := n_ppa_porcento -
                               (n_ppa_porcento_parc * (i - 1));
        n_ppa_valor_parc    := n_ppa_valor - (n_ppa_valor_parc * (i - 1));
      END IF;
    
      SIAOS.PCK_SMART_SALES3.SP_IN_PAGAMENTO(n_prp_codigo,
                                             n_fpa_codigo,
                                             v_ppa_tipo,
                                             n_ppa_valor_parc,
                                             n_ppa_porcento_parc,
                                             TO_CHAR(n_ppa_data_parc,
                                                     'DD/MM/YYYY'),
                                             n_ppa_dias_parc,
                                             n_erro);
    
      i := i + 1;
    
    END LOOP;
  
  END SP_IN_PAGAMENTO_AUTO;

  ----------------------------------------------------------
  ------------------  APAGA PAGAMENTOS ---------------------
  ----------------------------------------------------------
  PROCEDURE SP_DL_PAGAMENTO(n_ppa_codigo IN PROP_PAGTO.PPA_CODIGO%Type) IS
    n_prp_codigo SIAOS.PROP_PAGTO.PRP_CODIGO%TYPE;
  BEGIN
  
    SELECT PRP_CODIGO
      INTO n_prp_codigo
      FROM SIAOS.PROP_PAGTO P
     WHERE P.PPA_CODIGO = n_ppa_codigo;
  
    DELETE SIAOS.PROP_PAGTO P WHERE P.PPA_CODIGO = n_ppa_codigo;
  
    UPDATE SIAOS.PROPOSTA P
       SET P.PRP_PGT_STATUS = DECODE(P.PRP_PGT_STATUS, 'E', 'E', 'N')
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    COMMIT;
  
  END SP_DL_PAGAMENTO;

  ----------------------------------------------------------
  ------ RESPONDE CONSULTA DE PAGAMENTOS -------------------
  ----------------------------------------------------------
  PROCEDURE SP_RESP_CONSULTA_PGTO(n_proposta     IN PROPOSTA.PRP_CODIGO%TYPE,
                                  v_status       IN PROPOSTA.PRP_PGT_STATUS%TYPE,
                                  v_consulta_txt IN CONSULTA.CON_DESCRICAO%TYPE,
                                  n_erro         OUT NUMBER) IS
  
    n_cons_pgto CONSULTA.CON_NUMERO%TYPE;
  BEGIN
  
    SP_GRAVA_CONSULTA(n_proposta,
                      'PRE-OS',
                      'C',
                      v_consulta_txt,
                      2,
                      n_cons_pgto,
                      n_erro);
  
    UPDATE PROPOSTA P
       SET P.PRP_PGT_STATUS = v_status
     WHERE P.PRP_CODIGO = n_proposta;
  
  END SP_RESP_CONSULTA_PGTO;

  ----------------------------------------------------------
  ------------------  APAGA PAGAMENTOS ---------------------
  ----------------------------------------------------------
  PROCEDURE SP_UP_CONFIRMA(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%Type) IS
  
    n_conf INTEGER;
  
  BEGIN
  
    SELECT PRP_CONFIRMA
      INTO n_conf
      FROM SIAOS.PROPOSTA
     WHERE PRP_CODIGO = n_prp_codigo;
  
    IF n_conf = 1 THEN
      n_conf := 0;
    ELSE
      n_conf := 1;
    END IF;
  
    UPDATE SIAOS.PROPOSTA
       SET PRP_CONFIRMA = n_conf
     WHERE PRP_CODIGO = n_prp_codigo;
  
    COMMIT;
  
  END SP_UP_CONFIRMA;

  ----------------------------------------------------------
  ------------------  CHECA CALIBRAÇÃO ---------------------
  ----------------------------------------------------------

  FUNCTION SF_CHECA_CALIBRACAO(n_num_controle IN ITEM_PROP_DADO.IPR_CODIGO%Type,
                               vc2_unid_cal   IN UNIDADE.UNIDADE%Type,
                               n_val_min      IN OPCAO.VL_MINIMO%Type,
                               n_val_max      IN OPCAO.VL_MAXIMO%Type,
                               n_sistema      IN NUMBER) RETURN NUMBER IS
  
    vc2_prd      PRODUTO.PRODUTO%Type;
    n_num_classe OPCAO.NROITEM%Type;
    n_classe     OPCLAS.OPCLAS%Type;
    c_familia    PRODUTO.FAMILIA%Type;
    --n_valor_minimo OPCAO.VL_MINIMO%Type;
    --n_valor_maximo OPCAO.VL_MAXIMO%Type;
    --n_span         OPCAO.SPANMIN%Type;
    --n_span_max     OPCAO.SPANMAX%Type;
    vc2_tipo_cal   DADOPCAT.TIPO%Type;
    vc2_status_cal DADOPCAT.STATUS%Type;
    --n_ERRO         NUMBER(1) := 0;
    n_OK NUMBER(1) := 0; /* Informa se a calibracao esta correta */
    --n_fator_os     UNIPRESS.FATOR%Type;
    --vc2_undpress   UNIDADE.UNIDADE%Type;
    --n_fator_prd    UNIPRESS.FATOR%Type;
    --n_VALOR_A      NUMBER(20, 10);
    --n_VALOR_B      NUMBER(20, 10);
    --n_VALOR_LRL    NUMBER(20, 10);
    --n_VALOR_URL    NUMBER(20, 10);
    --n_SPANOS       UNIPRESS.FATOR%Type;
    v_opcao         SIAOS.ITEM_PROP.IPR_ITEM%TYPE;
    v_opcao_esp     SIAOS.ITEM_PROP.IPR_CLASSE%TYPE;
    vc2_sr          PRODUTO.PRODUTO%TYPE;
    vc2_opc_sr      VARCHAR2(100);
    vc2_opc_sr_esp  VARCHAR2(100);
    vc2_sr2         PRODUTO.PRODUTO%TYPE;
    vc2_opc_sr2     VARCHAR2(100);
    vc2_opc_sr_esp2 VARCHAR2(100);
    n_qtd_sr        INTEGER;
  
    /*
      n_sistema = 1 --> ORDER IN
      n_sistema = 2 --> REVISOR
      n_sistema = 1 --> WINSGC
    
       n_OK = 0 -->  Calibracao Aceita
       n_OK = 1 -->  Erro Primeira checagem 0%
       n_OK = 2 -->  Erro Segunda checagem 100%
       n_OK = 3 -->  Erro Terceira checagem SPAN
       n_OK = 4 -->  Erro Calibração excede limite do Selo
    */
  
  BEGIN
    /* Procura Produto do Controle */
  
    IF vc2_unid_cal IS NULL OR n_val_min IS NULL OR n_val_max IS NULL THEN
      n_OK := 1;
    ELSIF n_val_min = n_val_max THEN
      n_OK := 3;
    END IF;
  
    BEGIN
    
      BEGIN
        SELECT COUNT(DISTINCT T.PRO_CODIGO || T.IPR_ITEM || T.IPR_CLASSE) QTD_SR
          INTO n_qtd_sr
          FROM ITEM_PROP T
         WHERE IPR_COD_TR = n_num_controle;
      EXCEPTION
        WHEN OTHERS THEN
          n_qtd_sr := 0;
      END;
    
      IF n_sistema = 1 THEN
      
        SELECT IP.PRO_CODIGO, TRIM(P.FAMILIA), IP.IPR_ITEM, IP.IPR_CLASSE
          INTO vc2_prd, c_familia, v_opcao, v_opcao_esp
          FROM ITEM_PROP IP
         INNER JOIN PRODUTO P
            ON P.PRODUTO = IP.PRO_CODIGO
         WHERE IP.IPR_CODIGO = n_num_controle;
      
        IF n_qtd_sr = 1 THEN
          SELECT DISTINCT T.PRO_CODIGO, T.IPR_ITEM, T.IPR_CLASSE
            INTO vc2_sr, vc2_opc_sr, vc2_opc_sr_esp
            FROM ITEM_PROP T
           WHERE IPR_COD_TR = n_num_controle;
        ELSIF n_qtd_sr > 1 THEN
          SELECT DISTINCT T.PRO_CODIGO, T.IPR_ITEM, T.IPR_CLASSE
            INTO vc2_sr, vc2_opc_sr, vc2_opc_sr_esp
            FROM ITEM_PROP T
           WHERE T.IPR_COD_TR = n_num_controle
             AND T.IPR_SELO_LADO = 1;
        
          SELECT DISTINCT T.PRO_CODIGO, T.IPR_ITEM, T.IPR_CLASSE
            INTO vc2_sr2, vc2_opc_sr2, vc2_opc_sr_esp2
            FROM ITEM_PROP T
           WHERE IPR_COD_TR = n_num_controle
             AND T.IPR_SELO_LADO = 2;
        END IF;
      
      ELSIF n_sistema = 2 THEN
      
        SELECT IP.PRODUTO,
               TRIM(P.FAMILIA),
               SUBSTR(TRIM(IP.ITEM_KEY), 11, 100),
               TRIM(IP.OP_ESP)
          INTO vc2_prd, c_familia, v_opcao, v_opcao_esp
          FROM OELIN IP
         INNER JOIN PRODUTO P
            ON P.PRODUTO = IP.PRODUTO
         WHERE IP.CONTROLE = n_num_controle;
      
      ELSIF n_sistema = 3 THEN
      
        SELECT SUBSTR(IP.ITEM_KEY, 1, 10),
               TRIM(P.FAMILIA),
               SUBSTR(IP.ITEM_KEY, 11, 100),
               TRIM(IP.OP_ESP)
          INTO vc2_prd, c_familia, v_opcao, v_opcao_esp
          FROM SGC.CAPACITIVO IP
         INNER JOIN PRODUTO P
            ON P.PRODUTO = SUBSTR(IP.ITEM_KEY, 1, 10)
         WHERE IP.CONTROLE = n_num_controle;
      
      END IF;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20001,
                                'Não existe nenhum item com o controle = ' ||
                                n_num_controle);
    END;
  
    -- Procura Numero e Opcao da Classe *  NAO SERVE PARA TT303
    --    SELECT ITEM_PROP_DADO.NROCLAS, ITEM_PROP_DADO.IPD_VALOR, ITEM_PROP_DADO.IPD_TIPO,
    IF c_familia = 'CA' THEN
      IF n_sistema = 1 THEN
      
        SELECT D.NROCLAS, D.OPCLAS, D.IPD_TIPO, D.STATUS
        --      INTO n_num_classe, n_classe, vc2_tipo_cal, vc2_status_cal
          INTO n_num_classe, n_classe, vc2_tipo_cal, vc2_status_cal
          FROM ITEM_PROP_DADO D
         WHERE D.IPD_TIPO = 'CAL'
           AND D.IPR_CODIGO = n_num_controle;
      
      ELSIF n_sistema = 2 THEN
      
        SELECT D.NROCLAS, D.OPCLAS, D.TIPO, D.STATUS
        --      INTO n_num_classe, n_classe, vc2_tipo_cal, vc2_status_cal
          INTO n_num_classe, n_classe, vc2_tipo_cal, vc2_status_cal
          FROM SIAOS.DADOPCAT D
         WHERE D.TIPO = 'CAL'
           AND D.CONTROLE = n_num_controle;
      
      ELSIF n_sistema = 3 THEN
      
        SELECT D.NROCLAS, D.TIPO, D.STATUS
        --      INTO n_num_classe, n_classe, vc2_tipo_cal, vc2_status_cal
          INTO n_num_classe, vc2_tipo_cal, vc2_status_cal
          FROM SIAOS.DADOPCAT D
         WHERE D.TIPO = 'CAL'
           AND D.CONTROLE = n_num_controle;
        /*
         SELECT SUBSTR(IP.ITEM_KEY,10+n_num_classe,1)
           INTO n_classe
           FROM SGC.CAPACITIVO IP
          WHERE IP.CONTROLE = n_num_controle;
        */
      END IF;
      /*
         BEGIN
           SELECT UNIPRESS.FATOR
             INTO n_fator_os
             FROM UNIPRESS
            WHERE UNIPRESS.UNIDADE = vc2_unid_cal;
         EXCEPTION
           WHEN NO_DATA_FOUND THEN
             n_ERRO := 1;
         END;
      
         IF n_ERRO = 0 THEN
          -- Procura Valor Minimo, Maximo e Span Default do Produto
           BEGIN
             SELECT O.VL_MINIMO,
                    O.VL_MAXIMO,
                    O.SPANMIN,
                    O.SPANMAX,
                    O.UNIDADE
               INTO n_valor_minimo, n_valor_maximo, n_span, n_span_max, vc2_undpress
               FROM OPCAO O
              WHERE O.PRODUTO = vc2_prd
                AND O.NROITEM = n_num_classe
                AND O.OPITEM = n_classe;
           EXCEPTION
             WHEN NO_DATA_FOUND THEN
               n_ERRO := 2; --!RAISE_APPLICATION_ERROR(-20000, 'O Produto ' || vc2_prd || ' nao possui calibracao');
           END;
      
           BEGIN
             SELECT UNIPRESS.FATOR
               INTO n_fator_prd
               FROM UNIPRESS
              WHERE UNIPRESS.UNIDADE = vc2_undpress;
           EXCEPTION
             WHEN NO_DATA_FOUND THEN
               n_ERRO := 1; --RAISE_APPLICATION_ERROR(-20002,'Nao encontrou o fator da Unidade ' || OPCAO.UNIDADE);
           END;
      
         END IF;
      
         IF n_ERRO = 0 THEN
      
           n_VALOR_A   := (n_val_min * n_fator_os);
           n_VALOR_B   := (n_val_max * n_fator_os);
           n_VALOR_URL := (n_valor_maximo * n_fator_prd);
           n_VALOR_LRL := (n_valor_minimo * n_fator_prd);
      
           -- Primeira Checagem ( 0% )
           IF n_VALOR_A >= n_VALOR_LRL THEN
             n_OK := 0;
           ELSE
             n_OK := 1;
           END IF;
      
           IF n_OK = 0 THEN
             IF n_VALOR_A <= n_VALOR_URL THEN
               n_OK := 0;
             ELSE
               n_OK := 1;
             END IF;
           END IF;
      
           -- Segunda Checagem ( 100 % )
           IF n_OK = 0 THEN
             IF n_VALOR_B >= n_VALOR_LRL THEN
               n_OK := 0;
             ELSE
               n_OK := 2;
             END IF;
      
             IF n_OK = 0 THEN
               IF n_VALOR_B <= n_VALOR_URL THEN
                 n_OK := 0;
               ELSE
                 n_OK := 2;
               END IF;
             END IF;
           END IF;
      
           -- Terceira Checagem ( SPAN )
           IF n_OK = 0 THEN
             n_SPANOS := ABS(n_VALOR_B * 1 - n_VALOR_A);
             IF n_SPANOS >= (n_span * n_fator_prd) THEN
               n_OK := 0;
             ELSE
               n_OK := 3;
             END IF;
      
             IF n_OK = 0 THEN
               IF n_SPANOS <= (n_VALOR_URL * n_span_max) THEN
                 n_OK := 0;
               ELSE
                 n_OK := 3;
               END IF;
             END IF;
           END IF;
         ELSE
           n_OK := 1;
         END IF;
      */
    
    END IF;
  
    IF c_familia = 'CA' THEN
      IF n_OK = 0 THEN
        n_OK := CADBASICO.SF_VERIFICA_CALIBRA(vc2_prd,
                                              v_opcao,
                                              v_opcao_esp,
                                              vc2_unid_cal,
                                              n_val_min,
                                              n_val_max,
                                              vc2_sr,
                                              vc2_opc_sr,
                                              vc2_opc_sr_esp,
                                              1,
                                              n_num_classe);
      END IF;
    END IF;
  
    IF n_OK = 0 AND vc2_sr IS NOT NULL THEN
      n_OK := CADBASICO.SF_VERIFICA_CALIBRA(vc2_prd,
                                            v_opcao,
                                            v_opcao_esp,
                                            vc2_unid_cal,
                                            n_val_min,
                                            n_val_max,
                                            vc2_sr2,
                                            vc2_opc_sr2,
                                            vc2_opc_sr_esp2,
                                            1,
                                            n_num_classe);
    END IF;
  
    RETURN(n_OK);
  
  EXCEPTION
    WHEN OTHERS THEN
      RETURN(1);
  END SF_CHECA_CALIBRACAO;

  -----------------------------------------------------------------
  ---------------------- INSERE VENDEDORES ------------------------
  -----------------------------------------------------------------

  PROCEDURE SP_INSERE_VENDEDORES(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                 c_vend     IN SIAOS.VENDEDOR_PROP.SALESP_KEY%TYPE,
                                 n_com      IN SIAOS.VENDEDOR_PROP.COMISSAO%TYPE,
                                 n_ven      IN SIAOS.VENDEDOR_PROP.VPR_COMIS_VEND%TYPE,
                                 n_com_pdr  IN SIAOS.VENDEDOR_PROP.VPR_COM_PADRAO%TYPE,
                                 n_pos      IN SIAOS.VENDEDOR_PROP.VPR_CODIGO%TYPE) IS
  
    n_porcomissao SIAOS.ARSALESP.PORCOMISSAO%TYPE;
    n_asp_status  SIAOS.ARSALESP.ASP_STATUS%TYPE;
    n_com_pdr2    SIAOS.VENDEDOR_PROP.VPR_COM_PADRAO%TYPE;
    n_tba_codigo  SIAOS.TIPO_BASE.TBA_CODIGO%TYPE;
    c_vend2       SIAOS.ARSALESP.SALESP_KEY%TYPE;
  
  BEGIN
  
    SELECT A.SALESP_KEY, A.PORCOMISSAO, NVL(A.ASP_STATUS, 0), T.TBA_CODIGO
      INTO c_vend2, n_porcomissao, n_asp_status, n_tba_codigo
      FROM SIAOS.ARSALESP A
     INNER JOIN SIAOS.BASE_COMISSAO B
        ON A.BCO_CODIGO = B.BCO_CODIGO
     INNER JOIN SIAOS.TIPO_BASE T
        ON B.TBA_CODIGO = T.TBA_CODIGO
     WHERE A.SALESP_KEY = c_vend;
  
    IF n_tba_codigo = 3 THEN
      n_com_pdr2 := n_com_pdr;
    ELSE
      n_com_pdr2 := n_porcomissao;
    END IF;
  
    IF n_asp_status = 0 THEN
      c_vend2    := 'S/COM';
      n_com_pdr2 := '0';
    END IF;
  
    INSERT INTO SIAOS.VENDEDOR_PROP
      (PRP_CODIGO,
       SALESP_KEY,
       COMISSAO,
       VPR_COMIS_VEND,
       VPR_CODIGO,
       VPR_COM_PADRAO)
    VALUES
      (n_proposta, c_vend2, n_com, n_ven, n_pos, n_com_pdr2);
  
    COMMIT;
  
  END SP_INSERE_VENDEDORES;

  -----------------------------------------------------------------
  ------------------- INSERE TRANSPORTADORAS ----------------------
  -----------------------------------------------------------------

  PROCEDURE SP_INSERE_TRANSPORTADORA(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE,
                                     c_tran     IN TRANSP_PROP.SHIP_VIA_KEY%TYPE) IS
  
    c_ars_status SIAOS.ARSVIA2.ARS_STATUS%TYPE;
  BEGIN
  
    SELECT A.ARS_STATUS
      INTO c_ars_status
      FROM SIAOS.ARSVIA2 A
     WHERE TRIM(A.SHIP_VIA_KEY) = TRIM(c_tran);
  
    IF c_ars_status = 1 THEN
      INSERT INTO TRANSP_PROP
        (PRP_CODIGO, SHIP_VIA_KEY)
      VALUES
        (n_proposta, c_tran);
    END IF;
  
    COMMIT;
  
  END SP_INSERE_TRANSPORTADORA;

  -----------------------------------------------------------------
  ----------------------- APAGA VENDEDORES ------------------------
  -----------------------------------------------------------------

  PROCEDURE SP_APAGA_VENDEDORES(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE) IS
  BEGIN
    DELETE FROM VENDEDOR_PROP WHERE PRP_CODIGO = n_proposta;
    COMMIT;
  
  END SP_APAGA_VENDEDORES;

  -----------------------------------------------------------------
  -------------------- APAGA TRANSPORTADORAS ----------------------
  -----------------------------------------------------------------

  PROCEDURE SP_APAGA_TRANSPORTADORAS(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE) IS
  BEGIN
    DELETE FROM TRANSP_PROP WHERE PRP_CODIGO = n_proposta;
    COMMIT;
  
  END SP_APAGA_TRANSPORTADORAS;

  ----------------------------------------------------------
  -------- CONFIGURA MASCARA DO PRODUTO AGRUPADO -----------
  ----------------------------------------------------------

  FUNCTION SF_CONF_MASCARA(n_proposta  IN PROPOSTA.PRP_CODIGO%Type,
                           n_item_prop IN ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN VARCHAR2 IS
  
    vc2_produto SIAOS.ITEM_PROP.PRO_CODIGO%Type;
    vc2_opcat   SIAOS.ITEM_PROP.IPR_ITEM%Type;
    vc2_opesp   SIAOS.ITEM_PROP.IPR_CLASSE%Type;
    vc2_result  VARCHAR2(2000);
    vc2_desc1   SIAOS.PRODUTO.DESCRICAO1%Type;
    vc2_desc2   SIAOS.PRODUTO.DESCRICAO2%Type;
    c_resp      SIAOS.PRODUTO.RESPONS%Type;
  BEGIN
  
    SELECT DISTINCT ITEM_PROP.PRO_CODIGO,
                    ITEM_PROP.IPR_ITEM,
                    ITEM_PROP.IPR_CLASSE,
                    ITEM_PROP.IPR_DIVERSOS,
                    PRODUTO.DESCRICAO1,
                    PRODUTO.DESCRICAO2,
                    PRODUTO.RESPONS
      INTO vc2_produto,
           vc2_opcat,
           vc2_opesp,
           vc2_result,
           vc2_desc1,
           vc2_desc2,
           c_resp
      FROM ITEM_PROP, SIAOS.PRODUTO
     WHERE ITEM_PROP.PRP_CODIGO = n_proposta
       AND ITEM_PROP.IPR_ITEM_PROP = n_item_prop
       AND PRODUTO.PRODUTO = ITEM_PROP.PRO_CODIGO;
  
    IF (SUBSTR(vc2_produto, 1, 8) != 'DIVERSOS') THEN
    
      vc2_result := SIAOS.PCK_SMART_SALES3.SF_MASCARA_DO_ITEM(vc2_produto,
                                                              vc2_opcat,
                                                              vc2_opesp);
    
      IF c_resp = 'RAO' THEN
      
        IF (SUBSTR(vc2_produto, 1, 5) = '11000') THEN
        
          vc2_result := vc2_desc1;
        
        ELSE
        
          SELECT DESCRICAO2
            INTO vc2_result
            FROM SIAOS.OPCAO
           WHERE OPCAO.PRODUTO = vc2_produto
             AND OPCAO.NROITEM = 1
             AND OPCAO.OPITEM = SUBSTR(vc2_opcat, 1, 1);
        
          IF vc2_result IS NULL THEN
          
            vc2_result := vc2_result;
          
          END IF;
        
        END IF;
      
      END IF;
    
    ELSE
    
      vc2_result := vc2_result;
    
    END IF;
  
    RETURN(vc2_result);
  
  END SF_CONF_MASCARA;

  ----------------------------------------------------------
  -------- CONFIGURA MASCARA DO PRODUTO AGRUPADO -----------
  ----------------------------------------------------------

  FUNCTION SF_CONF_MASCARA2(n_codigo IN ITEM_PROP.IPR_CODIGO%Type)
    RETURN VARCHAR2 IS
  
    vc2_result VARCHAR2(2000);
  
  BEGIN
  
    FOR reg_prod IN (SELECT DISTINCT ITEM_PROP.PRO_CODIGO,
                                     ITEM_PROP.IPR_ITEM,
                                     ITEM_PROP.IPR_CLASSE,
                                     ITEM_PROP.IPR_DIVERSOS
                     /*INTO vc2_produto,
                     vc2_opcat,
                     vc2_opesp,
                     vc2_result */
                       FROM ITEM_PROP
                      WHERE ITEM_PROP.IPR_CODIGO = n_codigo) LOOP
    
      IF (SUBSTR(reg_prod.PRO_CODIGO, 1, 8) != 'DIVERSOS') THEN
      
        vc2_result := SIAOS.PCK_SMART_SALES3.SF_MASCARA_DO_ITEM(reg_prod.PRO_CODIGO,
                                                                reg_prod.IPR_ITEM,
                                                                reg_prod.IPR_CLASSE);
      
      END IF;
    
    END LOOP;
  
    RETURN(vc2_result);
  
  END SF_CONF_MASCARA2;

  -------------------------------------------------------------
  ----- ATUALIZA DESCRIÇÃO E QUANTIDADE DE DIVERSOS E ETC -----
  -------------------------------------------------------------

  PROCEDURE SP_UP_PRODUTO_DESC(n_proposta   IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                               n_item       IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                               v_descricao  IN SIAOS.ITEM_PROP.IPR_DIVERSOS%TYPE,
                               v_mpe_codigo IN SIAOS.ITEM_PROP_UNI.MPE_CODIGO%TYPE,
                               n_qtd        IN SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE) IS
  
    n_qtd_bd         INTEGER;
    n_qtd_dif        INTEGER;
    n_controle_db    INTEGER;
    n_controle       INTEGER;
    n_controle2      INTEGER;
    n_qtd_total      INTEGER;
    n_maior_controle INTEGER;
    n_i              INTEGER := 1;
    n_des_desc       SIAOS.PRODUTO.DES_DESCRICAO%TYPE := 0;
    n_itemizar       SIAOS.PRODUTO.ITEMIZAR%TYPE;
    n_ipr_peso_item  SIAOS.ITEM_PROP.IPR_PESO_ITEM%TYPE;
  
  BEGIN
    IF n_qtd > 0 THEN
      SELECT SUM(IP.IPR_QUANTIDADE),
             P.INE_DES_DESC DES_DESCRICAO,
             P.INE_ITEMIZAR ITEMIZAR,
             SIAOS.PCK_SMART_SALES3.SF_PESO_ITEM(IP.PRP_CODIGO, IP.IPR_ITEM_PROP) IPR_PESO_ITEM
        INTO n_qtd_bd, 
             n_des_desc, 
             n_itemizar, 
             n_ipr_peso_item
        FROM SIAOS.ITEM_PROP IP
       INNER JOIN CADBASICO.ITEM_NEGOCIO P ON TRIM(IP.PRO_CODIGO) = P.INE_CODIGO
       WHERE IP.PRP_CODIGO = n_proposta
         AND IP.IPR_ITEM_PROP = n_item
       GROUP BY P.INE_DES_DESC,
                P.INE_ITEMIZAR,
                IP.PRP_CODIGO,
                IP.IPR_ITEM_PROP;
    
      IF n_itemizar = 1 THEN
      
        IF n_qtd > n_qtd_bd THEN
        
          n_qtd_dif := n_qtd - n_qtd_bd;
        
          SELECT IPR_CODIGO
            INTO n_controle_db
            FROM SIAOS.ITEM_PROP
           WHERE ITEM_PROP.PRP_CODIGO = n_proposta
             AND ITEM_PROP.IPR_ITEM_PROP = n_item
             AND ROWNUM = 1;
        
          FOR cur_item IN (SELECT I.PRP_CODIGO,
                                  I.PRO_CODIGO,
                                  I.IPR_ITEM_PROP,
                                  I.IPR_ITEM,
                                  I.IPR_CLASSE,
                                  I.IPR_PRECO,
                                  I.IPR_VENDA_FIM,
                                  I.IPR_VENDA_CLI,
                                  I.IPR_ADICIONAL,
                                  I.IPR_QUANTIDADE,
                                  I.IPR_DESCONTO,
                                  I.IPR_DESC_FIM,
                                  I.IPR_DESC_CLI,
                                  I.IPR_PEDIDO,
                                  I.IPR_ANTECIPA,
                                  I.IPR_FATURA,
                                  I.IPR_IPI,
                                  I.IPR_ICMS,
                                  I.IPR_ISS,
                                  I.IPR_DT_ENTREGA,
                                  I.IPR_APNF,
                                  I.IPR_OBS,
                                  I.IPR_SELO_LADO,
                                  I.IPR_COD_TR,
                                  I.IPR_SEMANA_ENT,
                                  I.IPR_DT_PEDIDO,
                                  I.IPR_CONS_PRAZO,
                                  I.SENSOR,
                                  I.CONTROLE,
                                  I.IPR_DT_CONTRAT,
                                  I.IPR_PROP_FIL,
                                  I.IPR_OS_FIL,
                                  I.IPR_DIVERSOS,
                                  I.IPR_N_SERIE,
                                  I.IPR_NAO_FAB,
                                  I.IPR_LOTE,
                                  I.IPR_COPIA,
                                  I.IPR_PESO_CONS,
                                  I.TIPO,
                                  I.IPR_REFUGO,
                                  I.IPR_OS_REV,
                                  I.IPR_ITEM_REV,
                                  I.IPR_LINK_MANUAL,
                                  I.IPR_SEMAN_CONS,
                                  I.IPR_STATUS_CONS,
                                  I.IPG_CODIGO,
                                  I.IPR_FOLHA,
                                  I.IPR_HOLD,
                                  I.IPR_POSICAO
                             FROM SIAOS.ITEM_PROP I
                            WHERE I.IPR_CODIGO = n_controle_db) LOOP
            FOR n_i IN 1 .. n_qtd_dif LOOP
            
              INSERT INTO SIAOS.ITEM_PROP
                (PRP_CODIGO,
                 PRO_CODIGO,
                 IPR_ITEM_PROP,
                 IPR_ITEM,
                 IPR_CLASSE,
                 IPR_PRECO,
                 IPR_VENDA_FIM,
                 IPR_VENDA_CLI,
                 IPR_ADICIONAL,
                 IPR_QUANTIDADE,
                 IPR_DESCONTO,
                 IPR_DESC_FIM,
                 IPR_DESC_CLI,
                 IPR_PEDIDO,
                 IPR_ANTECIPA,
                 IPR_FATURA,
                 IPR_IPI,
                 IPR_ICMS,
                 IPR_ISS,
                 IPR_DT_ENTREGA,
                 IPR_APNF,
                 IPR_OBS,
                 IPR_SELO_LADO,
                 IPR_COD_TR,
                 IPR_SEMANA_ENT,
                 IPR_DT_PEDIDO,
                 IPR_CONS_PRAZO,
                 SENSOR,
                 CONTROLE,
                 IPR_DT_CONTRAT,
                 IPR_PROP_FIL,
                 IPR_OS_FIL,
                 IPR_DIVERSOS,
                 IPR_N_SERIE,
                 IPR_NAO_FAB,
                 IPR_LOTE,
                 IPR_COPIA,
                 IPR_PESO_CONS,
                 TIPO,
                 IPR_REFUGO,
                 IPR_OS_REV,
                 IPR_ITEM_REV,
                 IPR_LINK_MANUAL,
                 IPR_SEMAN_CONS,
                 IPR_STATUS_CONS,
                 IPG_CODIGO,
                 IPR_FOLHA,
                 IPR_HOLD,
                 IPR_POSICAO)
              VALUES
                (cur_item.PRP_CODIGO,
                 cur_item.PRO_CODIGO,
                 cur_item.IPR_ITEM_PROP,
                 cur_item.IPR_ITEM,
                 cur_item.IPR_CLASSE,
                 cur_item.IPR_PRECO,
                 cur_item.IPR_VENDA_FIM,
                 cur_item.IPR_VENDA_CLI,
                 cur_item.IPR_ADICIONAL,
                 cur_item.IPR_QUANTIDADE,
                 cur_item.IPR_DESCONTO,
                 cur_item.IPR_DESC_FIM,
                 cur_item.IPR_DESC_CLI,
                 cur_item.IPR_PEDIDO,
                 cur_item.IPR_ANTECIPA,
                 cur_item.IPR_FATURA,
                 cur_item.IPR_IPI,
                 cur_item.IPR_ICMS,
                 cur_item.IPR_ISS,
                 cur_item.IPR_DT_ENTREGA,
                 cur_item.IPR_APNF,
                 cur_item.IPR_OBS,
                 cur_item.IPR_SELO_LADO,
                 cur_item.IPR_COD_TR,
                 cur_item.IPR_SEMANA_ENT,
                 cur_item.IPR_DT_PEDIDO,
                 cur_item.IPR_CONS_PRAZO,
                 cur_item.SENSOR,
                 cur_item.CONTROLE,
                 cur_item.IPR_DT_CONTRAT,
                 cur_item.IPR_PROP_FIL,
                 cur_item.IPR_OS_FIL,
                 cur_item.IPR_DIVERSOS,
                 cur_item.IPR_N_SERIE,
                 cur_item.IPR_NAO_FAB,
                 cur_item.IPR_LOTE,
                 cur_item.IPR_COPIA,
                 cur_item.IPR_PESO_CONS,
                 cur_item.TIPO,
                 cur_item.IPR_REFUGO,
                 cur_item.IPR_OS_REV,
                 cur_item.IPR_ITEM_REV,
                 cur_item.IPR_LINK_MANUAL,
                 cur_item.IPR_SEMAN_CONS,
                 cur_item.IPR_STATUS_CONS,
                 cur_item.IPG_CODIGO,
                 cur_item.IPR_FOLHA,
                 cur_item.IPR_HOLD,
                 cur_item.IPR_POSICAO)
              RETURNING IPR_CODIGO INTO n_controle;
            
              INSERT INTO SIAOS.ITEM_REV
                (IPR_CODIGO,
                 IRE_GARANTIA,
                 IRE_LOCAL,
                 PRI_CODIGO,
                 IRE_NF,
                 SET_CODIGO,
                 TCAM_CODIGO)
                SELECT n_controle IPR_CODIGO,
                       IRE_GARANTIA,
                       IRE_LOCAL,
                       PRI_CODIGO,
                       IRE_NF,
                       SET_CODIGO,
                       TCAM_CODIGO
                  FROM SIAOS.ITEM_REV
                 WHERE ITEM_REV.IPR_CODIGO = n_controle_db;
            
              INSERT INTO SIAOS.ITEM_PROP_DADO
                (IPR_CODIGO,
                 NROCLAS,
                 OPCLAS,
                 IPD_TIPO,
                 IPD_VALOR_DADO,
                 IPD_VALOR,
                 STATUS,
                 IPD_DESCRICAO_P,
                 IPD_DESCRICAO_I,
                 IPD_CANCELA)
                SELECT n_controle IPR_CODIGO,
                       NROCLAS,
                       OPCLAS,
                       IPD_TIPO,
                       IPD_VALOR_DADO,
                       IPD_VALOR,
                       STATUS,
                       IPD_DESCRICAO_P,
                       IPD_DESCRICAO_I,
                       IPD_CANCELA
                  FROM SIAOS.ITEM_PROP_DADO
                 WHERE ITEM_PROP_DADO.IPR_CODIGO = n_controle_db;
            
              FOR cur_link IN (SELECT IPR_CODIGO      IPR_CODIGO_DB,
                                      PRP_CODIGO,
                                      PRO_CODIGO,
                                      IPR_ITEM_PROP,
                                      IPR_ITEM,
                                      IPR_CLASSE,
                                      IPR_PRECO,
                                      IPR_VENDA_FIM,
                                      IPR_VENDA_CLI,
                                      IPR_ADICIONAL,
                                      IPR_QUANTIDADE,
                                      IPR_DESCONTO,
                                      IPR_DESC_FIM,
                                      IPR_DESC_CLI,
                                      IPR_ANTECIPA,
                                      IPR_FATURA,
                                      IPR_IPI,
                                      IPR_ICMS,
                                      IPR_ISS,
                                      IPR_DT_ENTREGA,
                                      IPR_APNF,
                                      IPR_OBS,
                                      IPR_SELO_LADO,
                                      n_controle      IPR_COD_TR,
                                      IPR_DIVERSOS,
                                      IPR_NAO_FAB,
                                      IPR_LOTE,
                                      IPR_COPIA,
                                      TIPO,
                                      IPR_LINK_MANUAL,
                                      IPR_SEMAN_CONS,
                                      IPR_STATUS_CONS,
                                      IPG_CODIGO,
                                      IPR_FOLHA,
                                      IPR_HOLD,
                                      IPR_PROP_FIL,
                                      IPR_OS_FIL,
                                      IPR_POSICAO
                                 FROM SIAOS.ITEM_PROP
                                WHERE ITEM_PROP.IPR_COD_TR = n_controle_db) LOOP
              
                INSERT INTO SIAOS.ITEM_PROP
                  (PRP_CODIGO,
                   PRO_CODIGO,
                   IPR_ITEM_PROP,
                   IPR_ITEM,
                   IPR_CLASSE,
                   IPR_PRECO,
                   IPR_VENDA_FIM,
                   IPR_VENDA_CLI,
                   IPR_ADICIONAL,
                   IPR_QUANTIDADE,
                   IPR_DESCONTO,
                   IPR_DESC_FIM,
                   IPR_DESC_CLI,
                   IPR_ANTECIPA,
                   IPR_FATURA,
                   IPR_IPI,
                   IPR_ICMS,
                   IPR_ISS,
                   IPR_DT_ENTREGA,
                   IPR_APNF,
                   IPR_OBS,
                   IPR_SELO_LADO,
                   IPR_COD_TR,
                   IPR_DIVERSOS,
                   IPR_NAO_FAB,
                   IPR_LOTE,
                   IPR_COPIA,
                   TIPO,
                   IPR_LINK_MANUAL,
                   IPR_SEMAN_CONS,
                   IPR_STATUS_CONS,
                   IPG_CODIGO,
                   IPR_FOLHA,
                   IPR_HOLD,
                   IPR_PROP_FIL,
                   IPR_OS_FIL,
                   IPR_POSICAO)
                VALUES
                  (cur_link.PRP_CODIGO,
                   cur_link.PRO_CODIGO,
                   cur_link.IPR_ITEM_PROP,
                   cur_link.IPR_ITEM,
                   cur_link.IPR_CLASSE,
                   cur_link.IPR_PRECO,
                   cur_link.IPR_VENDA_FIM,
                   cur_link.IPR_VENDA_CLI,
                   cur_link.IPR_ADICIONAL,
                   cur_link.IPR_QUANTIDADE,
                   cur_link.IPR_DESCONTO,
                   cur_link.IPR_DESC_FIM,
                   cur_link.IPR_DESC_CLI,
                   cur_link.IPR_ANTECIPA,
                   cur_link.IPR_FATURA,
                   cur_link.IPR_IPI,
                   cur_link.IPR_ICMS,
                   cur_link.IPR_ISS,
                   cur_link.IPR_DT_ENTREGA,
                   cur_link.IPR_APNF,
                   cur_link.IPR_OBS,
                   cur_link.IPR_SELO_LADO,
                   cur_link.IPR_COD_TR,
                   cur_link.IPR_DIVERSOS,
                   cur_link.IPR_NAO_FAB,
                   cur_link.IPR_LOTE,
                   cur_link.IPR_COPIA,
                   cur_link.TIPO,
                   cur_link.IPR_LINK_MANUAL,
                   cur_link.IPR_SEMAN_CONS,
                   cur_link.IPR_STATUS_CONS,
                   cur_link.IPG_CODIGO,
                   cur_link.IPR_FOLHA,
                   cur_link.IPR_HOLD,
                   cur_link.IPR_PROP_FIL,
                   cur_link.IPR_OS_FIL,
                   cur_link.IPR_POSICAO) RETURN IPR_CODIGO INTO n_controle2;
              
                INSERT INTO SIAOS.ITEM_PROP_DADO
                  (IPR_CODIGO,
                   NROCLAS,
                   OPCLAS,
                   IPD_TIPO,
                   IPD_VALOR_DADO,
                   IPD_VALOR,
                   STATUS,
                   IPD_DESCRICAO_P,
                   IPD_DESCRICAO_I,
                   IPD_CANCELA)
                  SELECT n_controle2 IPR_CODIGO,
                         NROCLAS,
                         OPCLAS,
                         IPD_TIPO,
                         IPD_VALOR_DADO,
                         IPD_VALOR,
                         STATUS,
                         IPD_DESCRICAO_P,
                         IPD_DESCRICAO_I,
                         IPD_CANCELA
                    FROM SIAOS.ITEM_PROP_DADO
                   WHERE ITEM_PROP_DADO.IPR_CODIGO = cur_link.IPR_CODIGO_DB;
              
              END LOOP;
            
            END LOOP;
          
          END LOOP;
        
          IF n_ipr_peso_item > 0 THEN
          
            UPDATE SIAOS.ITEM_PROP
               SET ITEM_PROP.IPR_STATUS_CONS = NULL,
                   ITEM_PROP.IPR_SEMAN_CONS  = NULL,
                   ITEM_PROP.IPR_PESO_CONS   = NULL,
                   ITEM_PROP.IPR_PESO_ITEM   = n_ipr_peso_item
             WHERE ITEM_PROP.PRP_CODIGO = n_proposta
               AND ITEM_PROP.IPR_ITEM_PROP = n_item;
          
            UPDATE SIAOS.PROPOSTA
               SET PROPOSTA.PRP_STATUS_CONS = NULL,
                   PROPOSTA.PRP_STATUS_FSVC = NULL,
                   PROPOSTA.PRP_STATUS_IQV  = NULL
             WHERE PROPOSTA.PRP_CODIGO = n_proposta;
          
          END IF;
        
        ELSIF n_qtd < n_qtd_bd THEN
        
          n_qtd_dif := n_qtd_bd - n_qtd;
        
          DELETE FROM SIAOS.ITEM_PROP
           WHERE ITEM_PROP.IPR_CODIGO IN
                 (SELECT IPR_CODIGO
                    FROM (SELECT IPR_CODIGO
                            FROM ITEM_PROP IPS
                           WHERE IPS.PRP_CODIGO = n_proposta
                             AND IPS.IPR_ITEM_PROP = n_item
                           ORDER BY IPR_CODIGO DESC) IP
                   WHERE ROWNUM <= n_qtd_dif);
        
        END IF;
      
      ELSE
      
        SELECT SUM(ITEM_PROP.IPR_QUANTIDADE), MAX(ITEM_PROP.IPR_CODIGO)
          INTO n_qtd_total, n_maior_controle
          FROM ITEM_PROP
         WHERE ITEM_PROP.PRP_CODIGO = n_proposta
           AND ITEM_PROP.IPR_ITEM_PROP = n_item;
      
        IF n_qtd >= n_qtd_total THEN
        
          UPDATE ITEM_PROP
             SET ITEM_PROP.IPR_QUANTIDADE = ITEM_PROP.IPR_QUANTIDADE +
                                            (n_qtd - n_qtd_total)
           WHERE ITEM_PROP.IPR_CODIGO = n_maior_controle;
        
        ELSE
        
          n_qtd_dif := n_qtd_total - n_qtd;
        
          FOR c_item IN (SELECT IPR_CODIGO, IPR_QUANTIDADE
                           FROM SIAOS.ITEM_PROP
                          WHERE ITEM_PROP.PRP_CODIGO = n_proposta
                            AND ITEM_PROP.IPR_ITEM_PROP = n_item
                          ORDER BY IPR_QUANTIDADE ASC, IPR_LOTE DESC) LOOP
            IF n_qtd_dif >= c_item.IPR_QUANTIDADE THEN
            
              n_qtd_dif := n_qtd_dif - c_item.IPR_QUANTIDADE;
            
              DELETE ITEM_PROP
               WHERE ITEM_PROP.IPR_CODIGO = c_item.IPR_CODIGO;
            
            ELSIF n_qtd_dif < c_item.IPR_QUANTIDADE AND n_qtd_dif > 0 THEN
            
              UPDATE ITEM_PROP
                 SET ITEM_PROP.IPR_QUANTIDADE = ITEM_PROP.IPR_QUANTIDADE -
                                                n_qtd_dif
               WHERE ITEM_PROP.IPR_CODIGO = c_item.IPR_CODIGO;
            
              n_qtd_dif := 0;
            
            END IF;
          
          END LOOP;
        
        END IF;
      
        IF n_ipr_peso_item > 0 AND n_qtd > n_qtd_bd THEN
        
          UPDATE SIAOS.ITEM_PROP
             SET ITEM_PROP.IPR_STATUS_CONS = NULL,
                 ITEM_PROP.IPR_SEMAN_CONS  = NULL,
                 ITEM_PROP.IPR_PESO_CONS   = NULL,
                 ITEM_PROP.IPR_PESO_ITEM   = n_ipr_peso_item
           WHERE ITEM_PROP.PRP_CODIGO = n_proposta
             AND ITEM_PROP.IPR_ITEM_PROP = n_item;
        
          UPDATE SIAOS.ITEM_PROP_UNI I
             SET I.IPU_STATUS_FSVC = NULL
           WHERE I.PRP_CODIGO = n_proposta
             AND I.IPR_ITEM_PROP = n_item;
        
          UPDATE SIAOS.PROPOSTA
             SET PROPOSTA.PRP_STATUS_CONS = NULL,
                 PROPOSTA.PRP_STATUS_FSVC = NULL,
                 PROPOSTA.PRP_STATUS_IQV  = NULL
           WHERE PROPOSTA.PRP_CODIGO = n_proposta;
        
        END IF;
      
      END IF;
    
    END IF;
  
    IF n_des_desc = 0 THEN
    
      UPDATE ITEM_PROP
         SET ITEM_PROP.IPR_DIVERSOS = v_descricao
       WHERE ITEM_PROP.PRP_CODIGO = n_proposta
         AND ITEM_PROP.IPR_ITEM_PROP = n_item;
    
    END IF;
  
    UPDATE ITEM_PROP_UNI
       SET MPE_CODIGO = v_mpe_codigo
     WHERE PRP_CODIGO = n_proposta
       AND IPR_ITEM_PROP = n_item;
  
    IF n_qtd > n_qtd_bd THEN
    
      UPDATE SIAOS.PROPOSTA
         SET PRP_STATUS_IQV = NULL
       WHERE PRP_CODIGO = n_proposta;
    
      UPDATE ITEM_PROP_UNI
         SET IPU_STATUS_FSVC = NULL
       WHERE PRP_CODIGO = n_proposta
         AND IPR_ITEM_PROP = n_item;
    
    END IF;
  
    SIAOS.PCK_SMART_SALES3.SP_ARRUMA_LOTE(n_proposta);
  
    COMMIT;
  
  END SP_UP_PRODUTO_DESC;

  -------------------------------------------------------------
  -------- VERIFICA SE TEM OS ABERTA PARA UMA PRÉ-OS ----------
  -------------------------------------------------------------

  FUNCTION SF_VERIFICA_PRE_OS(n_proposta IN ITEM_PROP.PRP_CODIGO%TYPE)
    RETURN NUMBER IS
  
    n_qtd NUMBER;
  
  BEGIN
  
    SELECT COUNT(ORDER_NO) TEM_OS
      INTO n_qtd
      FROM PROPOSTA
     WHERE PRP_CODIGO = n_proposta;
  
    RETURN(n_qtd);
  
  END SF_VERIFICA_PRE_OS;

  -------------------------------------------------------------
  -------------- VERIFICA DESTINO CONSULTA SER ----------------
  -------------------------------------------------------------

  FUNCTION SF_TABELA_SER(v_produto IN PRODUTO.PRODUTO%TYPE) RETURN NUMBER IS
  
    v_resp PRODUTO.RESPONS%TYPE;
    n_num  INTEGER;
  
  BEGIN
  
    SELECT PRODUTO.RESPONS
      INTO v_resp
      FROM PRODUTO
     WHERE PRODUTO.PRODUTO = v_produto;
  
    IF v_resp = 'SMC' THEN
    
      n_num := 2; -- CONSULTA QUADRO
    
    ELSE
    
      n_num := 1; -- CONSULTA CAPACITIVO
    
    END IF;
  
    RETURN(n_num);
  
  END SF_TABELA_SER;

  -------------------------------------------------------------
  --------------     CADASTTRA   ASSINATURA    ----------------
  -------------------------------------------------------------

  PROCEDURE SP_GRAVA_ASSINATURAS(n_usuario   IN USUARIO.USU_CHAPA%TYPE,
                                 n_chapa_ass IN USUARIO.USU_CHAPA%TYPE) IS
  
    n_usuario2 USUARIO.USU_CHAPA%TYPE;
  
  BEGIN
  
    BEGIN
      SELECT ASS_CHAPA
        INTO n_usuario2
        FROM SIAOS.PROP_PER_ASS
       WHERE PROP_PER_ASS.ASS_CHAPA = n_chapa_ass
         AND PROP_PER_ASS.USU_CHAPA = n_usuario;
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        INSERT INTO SIAOS.PROP_PER_ASS
          (USU_CHAPA, ASS_CHAPA)
        VALUES
          (n_usuario, n_chapa_ass);
    END;
  
  END SP_GRAVA_ASSINATURAS;

  -------------------------------------------------------------
  --------------     CADASTTRA   ASSINATURA    ----------------
  -------------------------------------------------------------

  PROCEDURE SP_IN_ASS_PROPOSTA(n_usu_chapa IN PROP_ASSINATURA.USU_CHAPA%TYPE,
                               n_proposta  IN PROP_ASSINATURA.PRP_CODIGO%TYPE,
                               n_operacao  IN PROP_ASSINATURA.PAS_POSICAO%TYPE) IS
  
    n_pas_posicao PROP_ASSINATURA.PAS_POSICAO%TYPE;
  
  BEGIN
  
    IF n_operacao = 1 THEN
    
      SELECT NVL(MAX(PAS_POSICAO), 0) + 1
        INTO n_pas_posicao
        FROM PROP_ASSINATURA
       WHERE PRP_CODIGO = n_proposta;
    
      INSERT INTO PROP_ASSINATURA
        (PRP_CODIGO, USU_CHAPA, PAS_POSICAO)
      VALUES
        (n_proposta, n_usu_chapa, n_pas_posicao);
    
    ELSIF n_operacao = 2 THEN
    
      DELETE PROP_ASSINATURA
       WHERE PRP_CODIGO = n_proposta
         AND USU_CHAPA = n_usu_chapa;
    
    ELSIF n_operacao = 3 THEN
    
      FOR cur_ass IN (SELECT ASS_CHAPA
                        FROM PROP_PER_ASS P
                       WHERE P.USU_CHAPA =
                             (SELECT USU_CHAPA
                                FROM USUARIO U
                               WHERE UPPER(U.USU_LOGINWEB) = USER)) LOOP
        SP_IN_ASS_PROPOSTA(cur_ass.ASS_CHAPA, n_proposta, 1);
      END LOOP;
    
    ELSIF n_operacao = 4 THEN
    
      FOR cur_ass IN (SELECT USU_CHAPA
                        FROM PROP_ASSINATURA P
                       WHERE P.PRP_CODIGO = n_proposta) LOOP
        SP_IN_ASS_PROPOSTA(cur_ass.USU_CHAPA, n_proposta, 2);
      END LOOP;
    
    END IF;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END SP_IN_ASS_PROPOSTA;

  -------------------------------------------------------------
  --------------     CADASTTRA   ASSINATURA    ----------------
  -------------------------------------------------------------

  FUNCTION SF_CHECA_RESERVA(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE)
    RETURN NUMBER IS
  
    n_vale INTEGER := 0;
    n_tipo SIAOS.ORIGEM.TOR_CODIGO%TYPE;
  
  BEGIN
  
    BEGIN
    
      SELECT ORIGEM.TOR_CODIGO
        INTO n_tipo
        FROM SIAOS.PROPOSTA, SIAOS.ORIGEM
       WHERE ORIGEM.ORIGEM = PROPOSTA.ORI_CODIGO
         AND PROPOSTA.PRP_CODIGO = n_proposta;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_tipo := NULL;
    END;
  
    IF n_tipo = 2 THEN
    
      FOR reg_prod IN (SELECT VW_ITEM_PROP_PAGINA.TEMPO_DIA,
                              VW_ITEM_PROP_PAGINA.DT_EX_CONF
                         FROM VW_ITEM_PROP_PAGINA
                        WHERE VW_ITEM_PROP_PAGINA.PRP_CODIGO = n_proposta) LOOP
      
        IF ((reg_prod.TEMPO_DIA < 1) AND (reg_prod.DT_EX_CONF IS NOT NULL)) THEN
        
          n_vale := 1;
        
        END IF;
      
      END LOOP;
    
    END IF;
  
    RETURN n_vale;
  
  END SF_CHECA_RESERVA;

  -------------------------------------------------------------
  ---------------------     ABRE O.S.    ----------------------
  -------------------------------------------------------------

  PROCEDURE SP_ABRE_OS(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                       n_dist     IN INTEGER,
                       c_acesso   IN CHAR,
                       n_erro     OUT INTEGER) IS
  
    n_qtd_pagto    INTEGER := 0;
    n_dist_2       INTEGER := 1; -- n_dist = 1   OS SEM DISTRIBUIÇÃO AUTOMÁTICA
    c_origem       SIAOS.ORIGEM.ORIGEM%TYPE;
    c_ori_nome     SIAOS.ORIGEM.DESCRICAO%TYPE;
    n_tor_codigo   SIAOS.ORIGEM.TOR_CODIGO%TYPE;
    n_gdi_codigo   SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    n_order_no     SIAOS.PROPOSTA.ORDER_NO%TYPE;
    n_cliente      SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    n_cliente_fim  SIAOS.PROPOSTA.CLI_CODIGO_FIM%TYPE;
    n_div          SIAOS.PROPOSTA.PRP_PORC_PRODUTO%TYPE;
    n_cli_bloq     SIAOS.CLIENTE.BLOQUEADO%TYPE;
    n_cli_fim_bloq SIAOS.CLIENTE.BLOQUEADO%TYPE;
    n_emp_abertura SIAOS.PROPOSTA.EMP_ABERTURA%TYPE;
  
    n_eml_numero SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    n_iqv        SIAOS.IQV_OS.IQV_VALOR%TYPE;
  
    v_assunto  VARCHAR2(4000);
    v_conteudo VARCHAR2(4000);
  
    v_vl_venda    VARCHAR2(13);
    n_dist_autom  INTEGER := 0;
    n_qtd         INTEGER := 0;
    n_emp_cod_fab INTEGER := 1;
  
  BEGIN
  
    n_erro := 0;
  
    BEGIN
    
      SELECT ORIGEM.ORIGEM,
             ORIGEM.DESCRICAO,
             ORIGEM.TOR_CODIGO,
             ORIGEM.GDI_CODIGO,
             PROPOSTA.ORDER_NO,
             PROPOSTA.CLI_CODIGO,
             PROPOSTA.CLI_CODIGO_FIM,
             PROPOSTA.EMP_ABERTURA,
             SIAOS.PCK_SMART_SALES3.SF_VERIFICA_DIVERSOS(PROPOSTA.PRP_CODIGO) DIV,
             NVL(CLIENTE.BLOQUEADO, 0),
             NVL(CLIENTE_FIM.BLOQUEADO, 0)
        INTO c_origem,
             c_ori_nome,
             n_tor_codigo,
             n_gdi_codigo,
             n_order_no,
             n_cliente,
             n_cliente_fim,
             n_emp_abertura,
             n_div,
             n_cli_bloq,
             n_cli_fim_bloq
        FROM SIAOS.PROPOSTA,
             SIAOS.ORIGEM,
             SIAOS.CLIENTE,
             SIAOS.CLIENTE CLIENTE_FIM
       WHERE ORIGEM.ORIGEM = PROPOSTA.ORI_CODIGO
         AND CLIENTE.CODIGO = PROPOSTA.CLI_CODIGO
         AND PROPOSTA.CLI_CODIGO_FIM = CLIENTE_FIM.CODIGO
         AND PROPOSTA.PRP_CODIGO = n_proposta;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_erro := 11; -- PROPOSTA NÃO ENCONTRADA
    END;
  
    n_cli_fim_bloq := 0;
  
    SELECT COUNT(*) QTD
      INTO n_qtd_pagto
      FROM SIAOS.PROP_PAGTO
     WHERE PRP_CODIGO = n_proposta;
  
    IF n_emp_abertura != 1 THEN
      n_qtd_pagto := 1;
    END IF;
  
    IF ((n_cliente IS NULL) OR (n_cliente_fim IS NULL) OR (n_div != 0) OR
       (n_cli_bloq IN (3, 4, 5)) OR (n_cli_fim_bloq = 2) OR
       (n_qtd_pagto = 0)) THEN
    
      n_erro := 12; -- CADASTRO DE PROPOSTA INCOMPLETO
    
    ELSIF n_order_no IS NOT NULL THEN
    
      n_erro := 15; -- OS ABERTA
    
    END IF;
  
    IF n_erro = 0 THEN
    
      IF (n_tor_codigo = 2) OR (n_gdi_codigo = 4) THEN
      
        n_dist_2 := 0; -- OS DISTRIBUIDA AUTOMATICAMENTE
      
      ELSE
      
        IF c_acesso IS NOT NULL AND n_dist = 1 THEN
        
          n_dist_2 := 0; -- OS DISTRIBUIDA AUTOMATICAMENTE
        
        END IF;
      
      END IF;
    
      SIAOS.PCK_PROPOSTA_OS3.SP_GRAVA_PROPOSTA(n_proposta, n_dist_2);
    
      COMMIT;
    
      SELECT PROPOSTA.ORDER_NO
        INTO n_order_no
        FROM SIAOS.PROPOSTA
       WHERE PROPOSTA.PRP_CODIGO = n_proposta;
    
      IF n_dist_2 = 0 THEN
      
        SIAOS.PCK_REVISOR.SP_GRAVA_IQV(n_order_no,
                                       NULL,
                                       NULL,
                                       NULL,
                                       n_erro);
      
      END IF;
    
      -- Se a O.S. não for Smar Brazil "n_gdi_codigo != 14(FÁBRICAS)"
      IF n_gdi_codigo != 14 THEN
      
        SIAOS.PCK_REVISOR_SOL.SP_SOLICITACAO(n_order_no,
                                             SYSDATE + 7,
                                             'EMISSÃO/EMISSION',
                                             n_erro);
      
        -- Verifica se foi distribuição automática.
        -- Caso não, envia O.S. direto para moderação de Engenharia
        -- ================================================================
        SELECT DIST_AUTOM
          INTO n_dist_autom
          FROM OEHDR O
         WHERE ORDER_NO = n_order_no;
      
        IF (n_dist_autom = 1) THEN
          PCK_REVISOR_SOL.SP_ENVIA_DIRETO_ENG(n_order_no, n_erro);
        END IF;
        -- ================================================================
      
      END IF;
    
      UPDATE SIAOS.PROPOSTA
         SET PROPOSTA.PRP_STATUS_CONS = 'C', 
             PROPOSTA.PST_CODIGO = 4
       WHERE PROPOSTA.PRP_CODIGO = n_proposta;
    
      IF n_tor_codigo = 2 THEN
      
        FOR cur_ele IN (SELECT ITEM_PROP.IPR_ITEM_PROP,
                               ITEM_PROP.IPR_QUANTIDADE,
                               TO_DATE(ITEM_PROP.IPR_DT_ENTREGA || ' 12:00',
                                       'DD/MM/YY HH:MI') IPR_DT_ENTREGA,
                               ITEM_PROP.CONTROLE,
                               SIAOS.PCK_REVISOR.SF_MASCARA_DO_ITEM(ITEM_PROP.PRP_CODIGO,
                                                                    ITEM_PROP.IPR_ITEM_PROP,
                                                                    2,
                                                                    0) PRODUTO,
                               PROPOSTA.ORDER_NO
                          FROM SIAOS.ITEM_PROP,
                               SIAOS.PRODUTO,
                               SIAOS.PROPOSTA
                         WHERE ITEM_PROP.PRO_CODIGO = PRODUTO.PRODUTO
                           AND ITEM_PROP.PRP_CODIGO = n_proposta
                           AND PRODUTO.RESPONS = 'SMC'
                           AND PROPOSTA.PRP_CODIGO = ITEM_PROP.PRP_CODIGO) LOOP
        
          INSERT INTO SGCPDIE.DADOS_SER
            (DSE_CONTROLE,
             DSE_OS,
             DSE_ITEM,
             DSE_PRODUTO,
             DSE_QTDE,
             DSE_PRAZO_ENTREGA)
          VALUES
            (cur_ele.CONTROLE,
             cur_ele.ORDER_NO,
             cur_ele.IPR_ITEM_PROP,
             cur_ele.PRODUTO,
             cur_ele.IPR_QUANTIDADE,
             TO_DATE(cur_ele.IPR_DT_ENTREGA, 'DD/MM/YY HH:MI'));
        END LOOP;
      
      END IF;
    
      IF n_gdi_codigo = 13 THEN
      
        SELECT PROPOSTA.ORDER_NO
          INTO n_order_no
          FROM SIAOS.PROPOSTA
         WHERE PROPOSTA.PRP_CODIGO = n_proposta;
      
        SGR.SP_GRAVA_REVISOES(n_order_no);
      
      END IF;
    
      FOR cur_pend IN (SELECT PRE_CODIGO, PNU_NUMERO, PEN_NUMERO
                         FROM SIAOS.PROP_RECADO
                        WHERE PROP_RECADO.PRP_CODIGO = n_proposta) LOOP
      
        UPDATE SIAOS.PROP_RECADO
           SET PRE_DT_BAIXA = SYSDATE
         WHERE PRE_CODIGO = cur_pend.PRE_CODIGO
           AND PRP_CODIGO = n_proposta;
      
        IF cur_pend.PNU_NUMERO IS NOT NULL THEN
          SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(cur_pend.PNU_NUMERO,
                                              cur_pend.PEN_NUMERO);
        END IF;
      
      END LOOP;
    
      SELECT E.EMP_CODIGO_FAB
        INTO n_emp_cod_fab
        FROM SIAOS.OEHDR O
       INNER JOIN GERAL.EMPRESA E
          ON E.EMP_CODIGO = O.EMP_ABERTURA
       WHERE O.ORDER_NO = n_order_no;
    
      IF n_emp_cod_fab = 1 THEN
      
        FOR cur_vend IN (SELECT EMPRESA.EMP_NOME       ELABORADOR_EMP,
                                ELABORADOR.USU_NOME    ELABORADOR,
                                ELABORADOR.USU_EMAIL   ELABORADOR_EMAIL,
                                CLIENTE.CLIENTE,
                                CLIENTE_FIM.CLIENTE    CLIENTE_FIM,
                                COUNTRIES.COUNTRY_NAME,
                                INDICFIN.SIGLA_MOEDA,
                                VENDEDOR.USU_NOME      VENDEDOR,
                                VENDEDOR.USU_EMAIL     EMAIL,
                                PROPOSTA.PRP_PEDIDO,
                                PROPOSTA.ORDER_NO
                           FROM SIAOS.PROPOSTA,
                                SIAOS.CLIENTE,
                                SIAOS.CLIENTE       CLIENTE_FIM,
                                SIAOS.INDICFIN,
                                SIAOS.USUARIO       ELABORADOR,
                                SIAOS.COUNTRIES,
                                SIAOS.VENDEDOR_PROP,
                                SIAOS.ARSALESP,
                                SIAOS.USUARIO       VENDEDOR,
                                GERAL.EMPRESA
                          WHERE PROPOSTA.IFI_CODIGO = INDICFIN.MOEDA
                            AND PROPOSTA.USU_CHAPA = ELABORADOR.USU_CHAPA
                            AND CLIENTE.CODIGO = PROPOSTA.CLI_CODIGO
                            AND CLIENTE.PAIS = COUNTRIES.COUNTRY_KEY
                            AND CLIENTE_FIM.CODIGO = PROPOSTA.CLI_CODIGO_FIM
                            AND PROPOSTA.PRP_CODIGO =
                                VENDEDOR_PROP.PRP_CODIGO
                            AND VENDEDOR_PROP.SALESP_KEY =
                                ARSALESP.SALESP_KEY
                            AND VENDEDOR.USU_CHAPA = ARSALESP.USU_CHAPA
                            AND ELABORADOR.EMP_CODIGO = EMPRESA.EMP_CODIGO
                            AND PROPOSTA.PRP_CODIGO = n_proposta) LOOP
        
          SELECT TRIM(TO_CHAR(SUM(ITEM_PROP.IPR_VENDA_CLI *
                                  ITEM_PROP.IPR_QUANTIDADE),
                              '9,999,990.00')) IPR_VENDA_CLI
            INTO v_vl_venda
            FROM ITEM_PROP
           WHERE ITEM_PROP.PRP_CODIGO = n_proposta;
        
          IF TRIM(cur_vend.EMAIL) IS NULL THEN
            cur_vend.VENDEDOR := 'Inside Sales';
            cur_vend.EMAIL    := 'insales@smar.com.br';
          END IF;
        
          SELECT TO_CHAR(MAX(I.IQV_VALOR), 'FM999990.00')
            INTO n_iqv
            FROM SIAOS.IQV_OS I
           WHERE I.ORDER_NO = cur_vend.ORDER_NO;
        
          IF n_gdi_codigo = 3 THEN
          
            v_assunto := 'Purchase Order - PO ' || cur_vend.PRP_PEDIDO ||
                         ' - SO ' || SUBSTR(cur_vend.ORDER_NO, 1, 4) || '/' ||
                         SUBSTR(cur_vend.ORDER_NO, 5, 5);
          
            v_conteudo := 'This purchase order was received today for your area:<br>';
            v_conteudo := v_conteudo || '<strong>DIVISION:</strong> ' ||
                          c_ori_nome || '<br>';
            v_conteudo := v_conteudo || '<strong>P.O.:</strong> ' ||
                          cur_vend.PRP_PEDIDO || '<br>';
            v_conteudo := v_conteudo || '<strong>S.O.:</strong> ' ||
                          SUBSTR(cur_vend.ORDER_NO, 1, 4) || '/' ||
                          SUBSTR(cur_vend.ORDER_NO, 5, 5) || '<br>';
            v_conteudo := v_conteudo || '<strong>DATE:</strong> ' ||
                          TO_CHAR(SYSDATE(), 'MM/DD/YYYY') || '<br><br>';
            v_conteudo := v_conteudo || '<strong>CUSTOMER:</strong> ' ||
                          cur_vend.CLIENTE || '<br>';
            v_conteudo := v_conteudo || '<strong>END USER: </strong> ' ||
                          cur_vend.CLIENTE_FIM || '<br>';
            v_conteudo := v_conteudo || '<strong>COUNTRY:</strong> ' ||
                          cur_vend.COUNTRY_NAME || '<br><br>';
            v_conteudo := v_conteudo || '<strong>TOTAL ORDER:</strong> ' ||
                          cur_vend.SIGLA_MOEDA || ' ' || v_vl_venda ||
                          '<br>';
            v_conteudo := v_conteudo || '<strong>IQV:</strong> ' || n_iqv ||
                          '<br><br><br>';
            v_conteudo := v_conteudo ||
                          'Best regards,<br><br><a href="mailto:insales@smar.com.br">Inside Sales</a>';
          
          ELSE
          
            v_assunto := 'Pedido: ' || cur_vend.PRP_PEDIDO || ' - OS ' ||
                         SUBSTR(cur_vend.ORDER_NO, 1, 4) || '/' ||
                         SUBSTR(cur_vend.ORDER_NO, 5, 5);
          
            v_conteudo := 'Novo pedido recebido para sua área:<br>';
            v_conteudo := v_conteudo || '<strong>DIVISÃO:</strong> ' ||
                          c_ori_nome || '<br>';
            v_conteudo := v_conteudo || '<strong>P.O.:</strong> ' ||
                          cur_vend.PRP_PEDIDO || '<br>';
            v_conteudo := v_conteudo || '<strong>O.S.:</strong> ' ||
                          SUBSTR(cur_vend.ORDER_NO, 1, 4) || '/' ||
                          SUBSTR(cur_vend.ORDER_NO, 5, 5) || '<br>';
            v_conteudo := v_conteudo || '<strong>DATA:</strong> ' ||
                          TO_CHAR(SYSDATE(), 'MM/DD/YYYY') || '<br><br>';
            v_conteudo := v_conteudo || '<strong>CLIENTE:</strong> ' ||
                          cur_vend.CLIENTE || '<br>';
            v_conteudo := v_conteudo || '<strong>CLIENTE FINAL: </strong> ' ||
                          cur_vend.CLIENTE_FIM || '<br>';
            v_conteudo := v_conteudo || '<strong>PAIS:</strong> ' ||
                          cur_vend.COUNTRY_NAME || '<br><br>';
            v_conteudo := v_conteudo || '<strong>TOTAL:</strong> ' ||
                          cur_vend.SIGLA_MOEDA || ' ' || v_vl_venda ||
                          '<br>';
            v_conteudo := v_conteudo || '<strong>IQV:</strong> ' || n_iqv ||
                          '<br><br><br>';
            v_conteudo := v_conteudo ||
                          'Sds,<br><br><a href="mailto:insales@smar.com.br">Inside Sales</a>';
          
          END IF;
        
          SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL('insales@smar.com.br',
                                            cur_vend.VENDEDOR || '<' ||
                                            cur_vend.EMAIL || '>',
                                            NULL,
                                            NULL,
                                            v_assunto,
                                            'Dear ' || cur_vend.VENDEDOR,
                                            REPLACE(v_conteudo,
                                                    CHR(10),
                                                    '<br>'),
                                            'Made by ' ||
                                            cur_vend.ELABORADOR,
                                            cur_vend.ELABORADOR_EMP ||
                                            '<br /><a href="mailto:' ||
                                            cur_vend.ELABORADOR_EMAIL || '">' ||
                                            cur_vend.ELABORADOR_EMAIL ||
                                            '</a>',
                                            2,
                                            n_eml_numero);
        
        END LOOP;
      
        COMMIT;
      
      END IF;
      /*
      TODO: owner="juliano" category="Fix" priority="1 - High" created="17/06/2022" closed="07/11/2022"
      text="Pau no banco"
      */
      
      SIAOS.PCK_SMART_SALES3.SP_PASTAS_AUTOMATICAS(2, n_order_no, 0, NULL, n_erro);
      SIAOS.PCK_SMART_SALES3.SP_PASTAS_OS(2, n_order_no);
      /*
      SIAOS.PCK_SMART_SALES3.SP_STATUS_CLI(n_proposta, 'P');
      SIAOS.PCK_SMART_SALES3.SP_STATUS_CLI(n_proposta, 'OS');
      */
      IF n_emp_cod_fab = 1 AND n_dist_autom = 1 THEN
      
        SELECT NVL(COUNT(*), 0) QTD
          INTO n_qtd
          FROM SIAOS.PROP_CKLIST
         WHERE PRP_CODIGO = n_proposta;
      
        IF n_qtd = 0 THEN
          SIAOS.PCK_SMART_SALES3.SP_CK_LIST(n_proposta, NULL, NULL);
        END IF;
      
        SELECT NVL(COUNT(*), 0) QTD
          INTO n_qtd
          FROM SIAOS.ACEITE
         WHERE PRP_CODIGO = n_proposta;
      
        IF n_qtd = 0 THEN
          SIAOS.PCK_REVISOR.SP_ACEITE(n_order_no, n_proposta, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
        END IF;
      
      END IF;
    
    END IF;
  
  END SP_ABRE_OS;

  -------------------------------------------------------------
  --------------       PRAZO DA PROPOSTA       ----------------
  -------------------------------------------------------------

  PROCEDURE SP_PRAZO_PROPOSTA(n_proposta     IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              n_lote         IN SIAOS.ITEM_PROP.IPR_LOTE%TYPE,
                              n_prazo_prop   OUT VARCHAR,
                              n_prazo_req    OUT VARCHAR,
                              n_prazo_cons   OUT VARCHAR,
                              v_status       OUT VARCHAR,
                              n_prazo_prop_q OUT INTEGER,
                              n_prazo_req_q  OUT INTEGER,
                              n_prazo_cons_q OUT INTEGER)
  
   IS
  
    n_prazo_soma INTEGER := 0;
    v_status_bd  VARCHAR2(30);
    n_tempo_cons INTEGER;
    --    n_sem_ad         INTEGER := 0;
    --    n_dia            INTEGER := 0;
    n_sem_auto       INTEGER;
    n_emp_codigo_fab GERAL.EMPRESA.EMP_CODIGO_FAB%TYPE;
  
  BEGIN
  
    BEGIN
      SELECT P.PRP_SEMANA_AUTO
        INTO n_sem_auto
        FROM SIAOS.PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_sem_auto := NULL;
    END;
  
    SELECT E.EMP_CODIGO_FAB
      INTO n_emp_codigo_fab
      FROM PROPOSTA P
     INNER JOIN GERAL.EMPRESA E
        ON P.EMP_ABERTURA = E.EMP_CODIGO
     WHERE P.PRP_CODIGO = n_proposta;
  
    IF n_sem_auto IS NOT NULL THEN
    
      n_prazo_prop := REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(n_sem_auto), '/', '');
    
    ELSE
    
      BEGIN
      
        SELECT MAX(DECODE(V.IPR_NAO_FAB, 1, 0,
                          SIAOS.PCK_SIAOS.SF_TEMPO_ENTREGA(SUM(V.IPR_QUANTIDADE),
                                                           V.IPR_PESO_ITEM,
                                                           n_emp_codigo_fab,
                                                           V.RESPONS))) MAX_SEM
          INTO n_prazo_soma
          FROM SIAOS.VW_ITEM_PROP_1 V
         WHERE V.IPR_ITEM_PSELO IS NULL
           AND V.PRP_CODIGO = n_proposta
           AND V.IPR_LOTE <= n_lote
           AND V.PRO_CODIGO NOT IN (SELECT P.INE_CODIGO FROM CADBASICO.PRODGEN P)
         GROUP BY V.TIPO,
                  V.IPR_PESO_ITEM,
                  V.IPR_NAO_FAB,
                  V.EMP_ABERTURA,
                  V.RESPONS,
                  V.TIPO;
      
        n_prazo_prop := REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(n_prazo_soma), '/', '');
      
      EXCEPTION WHEN NO_DATA_FOUND THEN
          NULL;
      END;
    
    END IF;
  
    BEGIN
    
      SELECT ITEM_PROP.IPR_STATUS_CONS, MAX(ITEM_PROP.IPR_SEMANAS)
        INTO v_status_bd, n_prazo_req_q
        FROM SIAOS.ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_proposta
         AND ITEM_PROP.IPR_LOTE = n_lote
         AND ITEM_PROP.IPR_HOLD = 0
         AND ITEM_PROP.PRO_CODIGO NOT IN (SELECT P.INE_CODIGO FROM CADBASICO.PRODGEN P)
         AND ROWNUM = 1
       GROUP BY ITEM_PROP.IPR_STATUS_CONS;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        v_status_bd   := NULL;
        n_prazo_req_q := 0;
    END;
  
    BEGIN
    
      SELECT DISTINCT IPR_SEMAN_CONS
        INTO n_tempo_cons
        FROM SIAOS.ITEM_PROP IP
       WHERE IP.PRP_CODIGO = n_proposta
         AND IP.IPR_LOTE = n_lote
         AND IP.PRO_CODIGO NOT IN (SELECT P.INE_CODIGO FROM CADBASICO.PRODGEN P)
         AND IP.IPR_HOLD = 0
         AND ROWNUM = 1;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_tempo_cons := NULL;
        n_prazo_cons := NULL;
    END;
  
    IF n_tempo_cons IS NOT NULL THEN
    
      n_prazo_cons := REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(n_tempo_cons), '/', '');
    
    END IF;
  
    BEGIN
    
      SELECT DISTINCT IP.IPR_SEMANAS
        INTO n_prazo_req
        FROM SIAOS.ITEM_PROP IP
       WHERE IP.PRP_CODIGO = n_proposta
         AND IP.IPR_LOTE = n_lote
         AND IP.PRO_CODIGO NOT IN (SELECT P.INE_CODIGO FROM CADBASICO.PRODGEN P)
         AND IP.IPR_HOLD = 0
         AND ROWNUM = 1;
    
    EXCEPTION WHEN NO_DATA_FOUND THEN
        n_prazo_req := NULL;
    END;
  
    IF n_prazo_req IS NULL THEN
    
      n_prazo_req := n_prazo_prop;
    
    ELSE
    
      n_prazo_req := REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(n_prazo_req), '/', '');
    
    END IF;
  
    IF v_status_bd IS NULL THEN
    
      IF (n_prazo_prop = 999999) OR (n_prazo_prop > n_prazo_req) THEN
        -- NECESSITA DE CONSULTA
      
        IF ((n_prazo_req IS NULL) AND (n_prazo_cons IS NULL) AND
           (v_status_bd IS NULL)) THEN
        
          v_status := 1; -- NECESSITA DE CONSULTA MAS NÃO TEM PRAZO PROPOSTO
        
        ELSIF ((n_prazo_req IS NOT NULL) AND (n_prazo_cons IS NULL) AND
              (v_status_bd IS NULL)) THEN
        
          v_status := 2; -- NECESSITA DE CONSULTA MAS JÁ TEM PRAZO PROPOSTO
        
        END IF;
      
      ELSIF n_prazo_prop != 999999 AND n_prazo_prop <= n_prazo_req THEN
        -- NÃO NECESSITA DE CONSULTA
      
        v_status := NULL; -- NÃO NECESSITA DE CONSULTA
      
      ELSE
      
        v_status := NULL; -- NÃO NECESSITA DE CONSULTA
      
      END IF;
    
    ELSE
    
      v_status := v_status_bd;
    
    END IF;
  
    --n_dia := TO_CHAR(SYSDATE, 'DHH24');
  
    -- Compara se a hora e menor ou igual a QUARTA 12:00
    /*
    IF n_dia >= 412 THEN
    
      n_sem_ad := 1;
    
    END IF;
    */
    n_prazo_prop_q := n_prazo_soma;
  
    IF n_prazo_req_q IS NULL THEN
    
      n_prazo_req_q := n_prazo_prop_q;
    
    END IF;
  
    /*
        n_prazo_req := REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(n_prazo_req_q + n_sem_ad), '/', '');
        n_prazo_req_q  := SF_DIFERENCA_SEMANA(TO_NUMBER(n_prazo_req)) -
                          n_sem_ad;
    */
    n_prazo_cons_q := n_tempo_cons;
  
  END SP_PRAZO_PROPOSTA;

  -------------------------------------------------------------
  --------------    GRAVA PRAZO DA PROPOSTA    ----------------
  -------------------------------------------------------------

  PROCEDURE SP_GRAVA_PRAZO(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_lote       IN SIAOS.ITEM_PROP.IPR_LOTE%TYPE,
                           n_sem_req    IN VARCHAR2,
                           n_semanas    IN VARCHAR2,
                           v_dt_req     IN VARCHAR2,
                           n_consultar  IN INTEGER,
                           n_aprova     IN INTEGER,
                           v_dt_contrat IN VARCHAR2,
                           n_erro       OUT VARCHAR2) IS
  
    v_status_prop VARCHAR(1);
  
    n_nova_sem INTEGER;
    n_sem_req2 INTEGER;
  
    n_prazo_prop   VARCHAR(7);
    n_prazo_req    VARCHAR(7);
    n_prazo_cons   VARCHAR(7);
    n_prazo_cons2  INTEGER;
    v_status       VARCHAR(1);
    n_prazo_prop_q INTEGER;
    n_prazo_req_q  INTEGER;
    n_prazo_cons_q INTEGER;
    n_sem_req3     INTEGER;
  
  BEGIN
  
    IF n_sem_req IS NULL THEN
      n_sem_req3 := TO_NUMBER(REPLACE(SIAOS.PCK_SMART_SALES3.SF_RETORNA_SEMANA(n_semanas),
                                      '/',
                                      ''));
    ELSE
      n_sem_req3 := TO_NUMBER(REPLACE(n_sem_req, '/', ''));
    END IF;
  
    n_erro := 0;
    SIAOS.PCK_SMART_SALES3.SP_PRAZO_PROPOSTA(n_proposta,
                                             n_lote,
                                             n_prazo_prop,
                                             n_prazo_req,
                                             n_prazo_cons,
                                             v_status,
                                             n_prazo_prop_q,
                                             n_prazo_req_q,
                                             n_prazo_cons_q);
  
    n_prazo_cons2 := TO_NUMBER(REPLACE(n_prazo_cons, '/', ''));
    n_sem_req2    := n_sem_req3;
  
    IF n_aprova IS NOT NULL THEN
    
      IF n_prazo_cons_q IS NOT NULL THEN
      
        n_nova_sem := n_prazo_cons2;
      
        IF n_nova_sem < n_sem_req2 THEN
        
          n_nova_sem := n_sem_req2;
        
        END IF;
      
      ELSE
      
        n_nova_sem := n_sem_req2;
      
      END IF;
    
      v_status := 'C';
    
    ELSE
    
      n_nova_sem := n_sem_req3;
    
      IF n_consultar IS NULL THEN
      
        IF n_semanas >= n_prazo_prop_q THEN
          v_status := 'C';
        ELSE
          v_status := '';
        END IF;
      
      ELSE
      
        v_status := 'P';
      
      END IF;
    
    END IF;
  
    UPDATE SIAOS.ITEM_PROP
       SET ITEM_PROP.IPR_SEMANA_ENT  = n_nova_sem,
           ITEM_PROP.IPR_SEMANAS     = n_semanas,
           ITEM_PROP.IPR_STATUS_CONS = DECODE(v_status,
                                              'P',
                                              DECODE(ITEM_PROP.IPR_CONS_PRAZO,
                                                     NULL,
                                                     'P',
                                                     'R'),
                                              v_status),
           ITEM_PROP.IPR_DT_CONTRAT  = TRUNC(TO_DATE(v_dt_contrat,
                                                     'DD/MM/YYYY'))
     WHERE ITEM_PROP.PRP_CODIGO = n_proposta
       AND ITEM_PROP.IPR_LOTE = n_lote;
    /*
    AND (ITEM_PROP.IPR_DT_CONTRAT != TO_DATE(v_dt_contrat,'DD/MM/YYYY')
         OR ITEM_PROP.IPR_DT_CONTRAT IS NULL);*/
  
    --    COMMIT;
  
    v_status_prop := SIAOS.PCK_SMART_SALES3.SF_ST_CONSULTA_PRAZO(n_proposta);
  
    UPDATE PROPOSTA
       SET PRP_STATUS_CONS = v_status_prop
     WHERE PRP_CODIGO = n_proposta;
  
    COMMIT;
  
  END SP_GRAVA_PRAZO;

  -------------------------------------------------------------
  -----------  POE PESO NA CONSULTA DA PROPOSTA   -------------
  -------------------------------------------------------------

  PROCEDURE SP_GRAVA_CONSULTA_PRAZO(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE,
                                    n_semana   IN NUMBER,
                                    n_lote     IN NUMBER,
                                    n_erro     OUT NUMBER) IS
  BEGIN
  
    UPDATE SIAOS.ITEM_PROP
       SET ITEM_PROP.IPR_SEMAN_CONS  = n_semana,
           ITEM_PROP.IPR_STATUS_CONS = 'A'
     WHERE ITEM_PROP.PRP_CODIGO = n_proposta
       AND ITEM_PROP.IPR_LOTE = n_lote;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      n_erro := 2;
    
  END SP_GRAVA_CONSULTA_PRAZO;

  -------------------------------------------------------------
  -----------  POE PESO NA CONSULTA DA PROPOSTA   -------------
  -------------------------------------------------------------

  PROCEDURE SP_GRAVA_CONS_PRAZO(n_proposta     IN PROPOSTA.PRP_CODIGO%TYPE,
                                c_operacao     IN CHAR,
                                v_consulta_txt IN CONSULTA.CON_DESCRICAO%TYPE,
                                n_cons_prazo   OUT CONSULTA.CON_NUMERO%TYPE,
                                n_erro         OUT NUMBER) IS
  
    v_status_prop PROPOSTA.PRP_STATUS_CONS%TYPE;
  
  BEGIN
  
    SP_GRAVA_CONSULTA(n_proposta,
                      'PRE-OS',
                      c_operacao,
                      v_consulta_txt,
                      1,
                      n_cons_prazo,
                      n_erro);
  
    IF c_operacao = 'P' THEN
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_CONS_PRAZO = TO_NUMBER(TRIM(n_cons_prazo))
       WHERE PRP_CODIGO = n_proposta;
    
      UPDATE SIAOS.PROPOSTA
         SET CON_NUMERO = TO_NUMBER(TRIM(n_cons_prazo))
       WHERE PRP_CODIGO = n_proposta;
    
    ELSIF c_operacao = 'A' THEN
    
      v_status_prop := SIAOS.PCK_SMART_SALES3.SF_ST_CONSULTA_PRAZO(n_proposta);
    
      UPDATE PROPOSTA
         SET PRP_STATUS_CONS = v_status_prop
       WHERE PRP_CODIGO = n_proposta;
    
    END IF;
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_proposta);
  
    COMMIT;
  
  END SP_GRAVA_CONS_PRAZO;

  -------------------------------------------------------------
  --------- GRAVA CONSULTA PAGAMENTO DA PROPOSTA   ------------
  -------------------------------------------------------------

  PROCEDURE SP_GRAVA_CONS_PGTO(n_proposta       IN PROPOSTA.PRP_CODIGO%TYPE,
                               c_operacao       IN CHAR,
                               v_consulta_txt   IN CONSULTA.CON_DESCRICAO%TYPE,
                               n_prp_pgt_status IN SIAOS.PROPOSTA.PRP_PGT_STATUS%TYPE,
                               n_mpg_codigo     IN SIAOS.PROPOSTA.MPG_CODIGO%TYPE,
                               n_cons_prazo     OUT CONSULTA.CON_NUMERO%TYPE,
                               n_erro           OUT NUMBER) IS
  
  BEGIN
  
    SP_GRAVA_CONSULTA(n_proposta,
                      'PRE-OS',
                      c_operacao,
                      v_consulta_txt,
                      2,
                      n_cons_prazo,
                      n_erro);
  
    IF c_operacao = 'P' THEN
    
      UPDATE SIAOS.PROPOSTA
         SET CON_NUMERO_PGT = TO_NUMBER(TRIM(n_cons_prazo)),
             PRP_PGT_STATUS = 'P'
       WHERE PRP_CODIGO = n_proposta;
    
    ELSIF c_operacao = 'A' THEN
    
      UPDATE PROPOSTA
         SET PRP_PGT_STATUS = n_prp_pgt_status, MPG_CODIGO = n_mpg_codigo
       WHERE PRP_CODIGO = n_proposta;
    
    END IF;
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_proposta);
  
    COMMIT;
  
  END SP_GRAVA_CONS_PGTO;

  -------------------------------------------------------------
  --------- GRAVA CONSULTA PAGAMENTO DA PROPOSTA   ------------
  -------------------------------------------------------------

  PROCEDURE SP_GRAVA_CONS_FSVF(n_proposta     IN PROPOSTA.PRP_CODIGO%TYPE,
                               c_operacao     IN CHAR,
                               v_consulta_txt IN CONSULTA.CON_DESCRICAO%TYPE,
                               n_con_numero   OUT CONSULTA.CON_NUMERO%TYPE,
                               n_erro         OUT NUMBER) IS
  
    n_os        SIAOS.PROPOSTA.ORDER_NO%TYPE;
    n_proposta2 SIAOS.PROPOSTA.PRP_CODIGO%TYPE;
  
  BEGIN
    BEGIN
      SELECT P.ORDER_NO, P.PRP_CODIGO
        INTO n_os, n_proposta2
        FROM SIAOS.PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
    EXCEPTION
      WHEN OTHERS THEN
        SELECT O.ORDER_NO, P.PRP_CODIGO
          INTO n_os, n_proposta2
          FROM SIAOS.OEHDR O
         INNER JOIN SIAOS.PROPOSTA P
            ON O.ORDER_NO = P.ORDER_NO
         WHERE P.ORDER_NO = n_proposta;
    END;
  
    IF n_os IS NULL THEN
      SP_GRAVA_CONSULTA(n_proposta,
                        'PRE-OS',
                        c_operacao,
                        v_consulta_txt,
                        3,
                        n_con_numero,
                        n_erro);
      --SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_proposta);
    ELSE
      SP_GRAVA_CONSULTA(n_os,
                        'OS',
                        c_operacao,
                        v_consulta_txt,
                        3,
                        n_con_numero,
                        n_erro);
    END IF;
  
    IF c_operacao = 'P' THEN
      IF n_os IS NULL THEN
      
        UPDATE SIAOS.PROPOSTA P
           SET CON_NUMERO_FSVF   = TO_NUMBER(n_con_numero),
               P.PST_CODIGO      = 1,
               P.PRP_STATUS_FSVC = 'P'
         WHERE PRP_CODIGO = n_proposta;
      
        UPDATE SIAOS.ITEM_PROP_UNI P
           SET P.IPU_STATUS_FSVC = 'P'
         WHERE P.PRP_CODIGO = n_proposta
           AND NVL(P.MSV_CODIGO, 0) != 0;
      
        UPDATE SIAOS.ITEM_PROP P
           SET P.IPR_APNF = n_proposta
         WHERE (P.PRP_CODIGO, P.IPR_ITEM_PROP) IN
               (SELECT PU.PRP_CODIGO, PU.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP_UNI PU
                 WHERE PU.PRP_CODIGO = n_proposta
                   AND NVL(PU.MSV_CODIGO, 0) != 0);
      
      ELSE
      
        UPDATE SIAOS.OEHDR O
           SET CON_NUMERO_FSVF = TO_NUMBER(n_con_numero)
         WHERE ORDER_NO = n_os;
      
        UPDATE SIAOS.ITEM_OS P
           SET P.IOS_STATUS_FSVC = 'P'
         WHERE P.ORDER_NO = n_os
           AND NVL(P.MSV_CODIGO, 0) != 0;
      
        UPDATE SIAOS.OELIN P
           SET P.APNF = n_proposta
         WHERE (P.ORDER_NO, P.ITEM_NO) IN
               (SELECT PU.ORDER_NO, PU.ITEM_NO
                  FROM SIAOS.ITEM_OS PU
                 WHERE PU.ORDER_NO = n_os
                   AND NVL(PU.MSV_CODIGO, 0) != 0);
      
      END IF;
    
      UPDATE SIAOS.CONSULTA P
         SET P.CON_DT_RESP = NULL
       WHERE CON_NUMERO = n_con_numero;
    
    ELSIF c_operacao = 'R' OR c_operacao IS NULL THEN
      IF n_os IS NULL THEN
        UPDATE PROPOSTA P
           SET P.PRP_STATUS_FSVC = c_operacao,
               P.PST_CODIGO      = DECODE(P.PST_CODIGO_ANT,
                                          1,
                                          2,
                                          P.PST_CODIGO_ANT),
               P.USU_CHAPA_RESP =
               (SELECT U.USU_CHAPA
                  FROM USUARIO U
                 WHERE UPPER(U.USU_LOGINWEB) = USER)
         WHERE P.PRP_CODIGO = n_proposta;
        IF c_operacao IS NULL THEN
          UPDATE SIAOS.ITEM_PROP_UNI P
             SET P.IPU_STATUS_FSVC = ''
           WHERE P.PRP_CODIGO = n_proposta
             AND NVL(P.MSV_CODIGO, 0) != 0;
        END IF;
      ELSE
        UPDATE SIAOS.OEHDR P
           SET P.OEH_STATUS_FSVC = DECODE(c_operacao, NULL, 'E', c_operacao),
               P.USU_CHAPA_RESP =
               (SELECT U.USU_CHAPA
                  FROM USUARIO U
                 WHERE UPPER(U.USU_LOGINWEB) = USER)
         WHERE P.ORDER_NO = n_os;
        IF c_operacao IS NULL THEN
          UPDATE SIAOS.ITEM_OS P
             SET P.IOS_STATUS_FSVC = 'P'
           WHERE P.ORDER_NO = n_os
             AND NVL(P.MSV_CODIGO, 0) != 0;
        END IF;
      END IF;
    ELSE
      IF n_os IS NULL THEN
        UPDATE PROPOSTA P
           SET P.PRP_STATUS_FSVC = c_operacao,
               P.PST_CODIGO      = DECODE(P.PST_CODIGO_ANT,
                                          1,
                                          2,
                                          P.PST_CODIGO_ANT)
         WHERE P.PRP_CODIGO = n_proposta;
      ELSE
        UPDATE SIAOS.OEHDR P
           SET P.OEH_STATUS_FSVC = c_operacao
         WHERE P.ORDER_NO = n_os;
      END IF;
    
    END IF;
  
    COMMIT;
  
  END SP_GRAVA_CONS_FSVF;

  -------------------------------------------------------------
  -----------  POE PESO NA CONSULTA DA PROPOSTA   -------------
  -------------------------------------------------------------

  PROCEDURE SP_GRAVA_CONSULTA(n_referencia   IN NUMBER,
                              v_sistema      IN VARCHAR2,
                              c_operacao     IN CHAR,
                              v_consulta_txt IN VARCHAR2,
                              n_cons_tipo    IN CONSULTA.CON_TIPO%TYPE,
                              n_con_numero   OUT VARCHAR2,
                              n_erro         OUT NUMBER) IS
  
    n_proposta       PROPOSTA.PRP_CODIGO%TYPE;
    v_descricao_cc   SIAOS.CONSULTA.CON_DESCRICAO%TYPE;
    v_descricao_cc2  SIAOS.CONSULTA.CON_DESCRICAO%TYPE;
    n_pen_numero     SIAOS.TIPO_CONSULTA.PEN_NUMERO%TYPE;
    n_pnu_numero     SIAOS.PENDENCIA_USER_ITEM.PNU_NUMERO%TYPE;
    v_descricao      SIAOS.PENDENCIA_USER_ITEM.PNI_DESCRICAO%TYPE;
    c_pre_mensagem   CLOB;
    n_tre_codigo     PROP_RECADO.TRE_CODIGO%TYPE;
    n_rev            SIAOS.PROPOSTA.PRP_REVISAO%TYPE;
    n_nome           SIAOS.USUARIO.USU_NOME%TYPE;
    n_chapa          SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_lin_cod        SIAOS.USUARIO.LIN_COD%TYPE;
    n_opcao          INTEGER;
    vc2_cli_nome     SIAOS.CLIENTE.CLIENTE%TYPE;
    vc2_email        VARCHAR2(255);
    vc2_email_para   VARCHAR2(255);
    vc2_eml_assunto  SIAOS.PASTA_EMAIL.EML_ASSUNTO%TYPE;
    vc2_eml_conteudo SIAOS.PASTA_EMAIL.EML_CONTEUDO1%TYPE;
    vc2_tipo_txt     VARCHAR2(30);
    n_order_no       SIAOS.PROPOSTA.ORDER_NO%TYPE;
    n_pst_codigo     SIAOS.PROPOSTA.PST_CODIGO%TYPE := 2;
    n_eml_numero     INTEGER;
    --v_status           VARCHAR2(1);
    vc2_sql        VARCHAR2(2000);
    vc2_sql_set    VARCHAR2(1000);
    vc2_coluna     VARCHAR2(200);
    vc2_coluna2    VARCHAR2(200);
    vc2_coluna3    VARCHAR2(200);
    vc2_coluna4    VARCHAR2(200);
    vc2_parametros VARCHAR2(200);
    c_operacao2    CHAR;
  
  BEGIN
    /*
    c_operacao
    'P' - Solicitação de consulta
    'X' - Cancelamento de consulta
    NULL - Cancelamento de consulta
    'R,A' - Respondida 'ok'
    'N' - Respondida 'Negada'
    'C' - Concluir (se aceita)
    */
  
    SELECT USU_NOME,
           USU_CHAPA,
           USUARIO.USU_NOME || '<' || USUARIO.USU_EMAIL || '>',
           LIN_COD
      INTO n_nome, n_chapa, vc2_email, n_lin_cod
      FROM SIAOS.USUARIO
     WHERE UPPER(USUARIO.USU_LOGINWEB) = UPPER(USER);
  
    SELECT DECODE(n_lin_cod, 1, T.TCS_DESC_PORT, T.TCS_DESC_ING) DESCR,
           T.TCS_CAMPO_PROP,
           T.TCS_CAMPO_OS,
           T.TCS_CAMPO_ST_PROP,
           T.TCS_CAMPO_ST_OS,
           T.PEN_NUMERO
      INTO vc2_tipo_txt,
           vc2_coluna,
           vc2_coluna2,
           vc2_coluna3,
           vc2_coluna4,
           n_pen_numero
      FROM SIAOS.TIPO_CONSULTA T
     WHERE T.TCS_CODIGO = n_cons_tipo;
  
    IF NVL(v_sistema, 'PRE-OS') = 'PRE-OS' THEN
      SELECT PRP_CODIGO, PRP_REVISAO, ORDER_NO
        INTO n_proposta, n_rev, n_order_no
        FROM PROPOSTA P
       WHERE P.PRP_CODIGO = n_referencia;
    ELSE
      SELECT PRP_CODIGO, PRP_REVISAO, ORDER_NO
        INTO n_proposta, n_rev, n_order_no
        FROM PROPOSTA P
       WHERE P.ORDER_NO = n_referencia;
    END IF;
  
    SELECT PRP_REVISAO, ORDER_NO
      INTO n_rev, n_order_no
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    SELECT MAX(C.CON_NUMERO)
      INTO n_con_numero
      FROM CONSULTA C
     WHERE C.PRP_CODIGO = n_proposta
       AND C.CON_TIPO = n_cons_tipo;
  
    IF n_con_numero IS NULL AND vc2_coluna IS NOT NULL AND
       vc2_coluna2 IS NOT NULL THEN
      vc2_sql := 'SELECT DECODE(P.ORDER_NO, NULL,TO_NUMBER(P.' ||
                 vc2_coluna || ',(SELECT O.' || vc2_coluna2 ||
                 ' FROM OEHDR O WHERE O.ORDER_NO = P.ORDER_NO))) FROM SIAOS.PROPOSTA P WHERE P.PRP_CODIGO = ' ||
                 n_proposta;
    
      /* Executando Consulta por SQL Dinamico */
      EXECUTE IMMEDIATE vc2_sql
        INTO n_con_numero;
      /*
      IF n_cons_tipo = 1 THEN
      
        SELECT DECODE(P.ORDER_NO, NULL,TO_NUMBER(P.CON_NUMERO),(SELECT O.CON_NUMERO FROM OEHDR O WHERE O.ORDER_NO = P.ORDER_NO))
          INTO n_con_numero
          FROM PROPOSTA P
         WHERE P.PRP_CODIGO = n_proposta;
      
      ELSIF n_cons_tipo = 2 THEN
      
        SELECT DECODE(P.ORDER_NO, NULL,TO_NUMBER(P.CON_NUMERO_PGT),(SELECT O.CON_NUMERO_PGT FROM OEHDR O WHERE O.ORDER_NO = P.ORDER_NO))
          INTO n_con_numero
          FROM PROPOSTA P
         WHERE P.PRP_CODIGO = n_proposta;
      
      ELSIF n_cons_tipo = 3 THEN
      
        SELECT DECODE(P.ORDER_NO, NULL,TO_NUMBER(P.CON_NUMERO_FSVF),(SELECT O.CON_NUMERO_FSVF FROM OEHDR O WHERE O.ORDER_NO = P.ORDER_NO))
          INTO n_con_numero
          FROM PROPOSTA P
         WHERE P.PRP_CODIGO = n_proposta;
      
      ELSIF n_cons_tipo = 4 THEN
      
        SELECT DECODE(P.ORDER_NO, NULL,TO_NUMBER(P.CON_NUMERO_IQV),(SELECT O.CON_NUMERO_IQV FROM OEHDR O WHERE O.ORDER_NO = P.ORDER_NO))
          INTO n_con_numero
          FROM PROPOSTA P
         WHERE P.PRP_CODIGO = n_proposta;
      
      END IF;
      */
    END IF;
  
    IF n_con_numero IS NULL THEN
    
      INSERT INTO CONSULTA
        (CON_TIPO, USU_CHAPA, PRP_CODIGO, CON_STATUS)
      VALUES
        (n_cons_tipo, n_chapa, n_proposta, c_operacao)
      RETURNING CON_NUMERO INTO n_con_numero;
    
      COMMIT;
    
    END IF;
  
    IF c_operacao = 'A' THEN
      c_operacao2 := 'R';
    ELSE
      c_operacao2 := c_operacao;
    END IF;
  
    IF c_operacao2 = 'P' AND n_pen_numero IS NOT NULL AND
       n_con_numero IS NOT NULL THEN
    
      IF n_order_no IS NULL THEN
        /*
        TODO: owner="juliano" category="Fix" priority="1 - High" created="14/11/2024"
        text="Função para verificar se tem SET e retornar status de consulta para SET"
        */
        IF NVL(SIAOS.PCK_SMART_SALES3.SF_STATUS_SET(n_prp_codigo), 0) = 0 THEN
          n_pst_codigo := 5;
        END IF;
        v_descricao    := 'Proposta: ' || n_proposta;
        vc2_parametros := 'op=2&con_numero=' || n_con_numero || '&ctipo=' ||
                          n_cons_tipo || '&sist=PRE-OS&ref_numero=' ||
                          n_proposta;
      ELSE
        v_descricao    := 'OS: ' || n_order_no;
        vc2_parametros := 'op=2&con_numero=' || n_con_numero || '&ctipo=' ||
                          n_cons_tipo || '&sist=OS&ref_numero=' ||
                          n_order_no;
      END IF;
    
      SIAOS.PCK_PENDENCIA.SP_GERA_PENDENCIA2('Pendência de consulta de  ' ||
                                             vc2_tipo_txt || ' - ' ||
                                             v_descricao,
                                             'SIAOS.PENDENCIA',
                                             n_pen_numero,
                                             NULL,
                                             n_chapa,
                                             vc2_parametros,
                                             n_pnu_numero);
    
      UPDATE SIAOS.CONSULTA C
         SET C.PNU_NUMERO = n_pnu_numero, C.PEN_NUMERO = n_pen_numero
       WHERE C.CON_NUMERO = n_con_numero;
    
    END IF;
  
    IF n_cons_tipo = 4 AND c_operacao2 = 'R' THEN
      c_operacao2 := 'C';
    ELSIF c_operacao2 = 'X' THEN
      c_operacao2 := NULL;
    END IF;
  
    IF c_operacao2 = 'P' THEN
      c_pre_mensagem := 'Solicitação de consulta de ' || vc2_tipo_txt || '!';
    ELSIF c_operacao2 IS NULL OR c_operacao2 = 'X' THEN
      c_pre_mensagem := 'Cancelamento de consulta de ' || vc2_tipo_txt || '!';
    ELSE
      c_pre_mensagem := 'Consulta de ' || vc2_tipo_txt || '!';
    END IF;
    n_tre_codigo := 10;
  
    IF c_operacao2 = 'P' THEN
      n_opcao        := 1;
      v_descricao_cc := '----- SOLICITAÇÃO -----------------------------' ||
                        CHR(13) || CHR(10);
    ELSIF c_operacao2 = 'X' OR c_operacao2 IS NULL THEN
      n_opcao        := 2;
      v_descricao_cc := '----- SOLICITAÇÃO CANCELADA -------------------' ||
                        CHR(13) || CHR(10);
    ELSIF c_operacao2 = 'C' THEN
      n_opcao        := 2;
      v_descricao_cc := '----- SOLICITAÇÃO CONCLUIDA -------------------' ||
                        CHR(13) || CHR(10);
    ELSIF c_operacao2 = 'R' THEN
      n_opcao        := 2;
      v_descricao_cc := '----- RESPOSTA --------------------------------' ||
                        CHR(13) || CHR(10);
    ELSIF c_operacao2 = 'N' THEN
      n_opcao        := 2;
      v_descricao_cc := '----- CONSULTA NEGADA -------------------------' ||
                        CHR(13) || CHR(10);
    ELSE
      n_opcao        := 2;
      v_descricao_cc := '----- FOLLOW UP -------------------------------' ||
                        CHR(13) || CHR(10);
    END IF;
  
    v_descricao_cc := v_descricao_cc ||
                      TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI') || ' - ' ||
                      n_chapa || ' - ' || n_nome || CHR(13) || CHR(10);
    IF n_order_no IS NULL THEN
      v_descricao_cc := v_descricao_cc || 'PRÉ-OS: ' || n_proposta || '-' ||
                        n_rev || CHR(13) || CHR(10);
    ELSE
      v_descricao_cc := v_descricao_cc || 'OS: ' || n_order_no || CHR(13) ||
                        CHR(10);
    END IF;
    v_descricao_cc := v_descricao_cc ||
                      '-----------------------------------------------' ||
                      CHR(13) || CHR(10);
    v_descricao_cc := v_descricao_cc || v_consulta_txt || CHR(13) ||
                      CHR(10);
  
    IF c_operacao2 = 'A' OR c_operacao2 = 'C' OR c_operacao2 = 'R' THEN
      v_descricao_cc := v_descricao_cc ||
                        '===============================================' ||
                        CHR(13) || CHR(10) || CHR(13) || CHR(10);
    
      SELECT TRIM(DECODE(C.CLIENTE, NULL, CT.CTE_NOME, C.CLIENTE)) CLIENTE
        INTO vc2_cli_nome
        FROM SIAOS.PROPOSTA P
        LEFT JOIN SIAOS.CLIENTE C
          ON P.CLI_CODIGO = C.CODIGO
        LEFT JOIN SIAOS.CLIENTE_TEMP CT
          ON CT.PRP_CODIGO = P.PRP_CODIGO
       WHERE P.PRP_CODIGO = n_proposta;
    
      SELECT U.USU_NOME || '<' || U.USU_EMAIL || '>',
             PEN_NUMERO,
             PNU_NUMERO
        INTO vc2_email_para, n_pen_numero, n_pnu_numero
        FROM CONSULTA C
       INNER JOIN USUARIO U
          ON U.USU_CHAPA = C.USU_CHAPA
       WHERE C.CON_NUMERO = n_con_numero;
    
      IF n_lin_cod = 1 THEN
        vc2_eml_assunto := 'Consulta de ' || vc2_tipo_txt ||
                           ' respondida!: ';
        /*
        IF c_operacao2 = 'R' THEN
          vc2_eml_assunto  := vc2_eml_assunto||' CONSULTA RESPONDIDA!';
        END IF;
        */
        IF n_order_no IS NULL THEN
          vc2_eml_assunto := vc2_eml_assunto || n_proposta || ' - ' ||
                             vc2_cli_nome;
        ELSE
          vc2_eml_assunto := vc2_eml_assunto || SUBSTR(n_order_no, 1, 4) || '/' ||
                             SUBSTR(n_order_no, 5, 5) || ' - ' ||
                             vc2_cli_nome;
        END IF;
        vc2_eml_conteudo := vc2_eml_assunto || '<br>' || chr(13) || chr(10);
        vc2_eml_conteudo := vc2_eml_conteudo || 'Favor verificar ' ||
                            vc2_tipo_txt || ' respondido.' || '<br>' ||
                            chr(13) || chr(10) || '<br>' || chr(13) ||
                            chr(10) ||
                            REPLACE(v_consulta_txt,
                                    chr(10),
                                    chr(10) || '<br>');
      ELSE
        vc2_eml_assunto := vc2_tipo_txt || ' consult returned!: ';
        /*IF c_operacao2 = 'R' AND n_cons_tipo = 3 THEN
          vc2_eml_assunto  := vc2_eml_assunto||' CONSULT RETURNED!';
        END IF;*/
        IF n_order_no IS NULL THEN
          vc2_eml_assunto := vc2_eml_assunto || n_proposta || ' - ' ||
                             vc2_cli_nome;
        ELSE
          vc2_eml_assunto := vc2_eml_assunto || SUBSTR(n_order_no, 1, 4) || '/' ||
                             SUBSTR(n_order_no, 5, 5) || ' - ' ||
                             vc2_cli_nome;
        END IF;
        vc2_eml_conteudo := vc2_eml_assunto || '<br>' || chr(13) || chr(10);
        vc2_eml_conteudo := vc2_eml_conteudo || 'Please check ' ||
                            vc2_tipo_txt || ' returned.' || '<br>' ||
                            chr(13) || chr(10) || '<br>' || chr(13) ||
                            chr(10) ||
                            REPLACE(v_consulta_txt,
                                    chr(10),
                                    chr(10) || '<br>');
      END IF;
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(vc2_email,
                                        vc2_email_para,
                                        NULL,
                                        NULL,
                                        vc2_eml_assunto,
                                        vc2_eml_assunto,
                                        vc2_eml_conteudo,
                                        NULL,
                                        NULL,
                                        n_lin_cod,
                                        n_eml_numero);
    END IF;
  
    SELECT C.CON_DESCRICAO
      INTO v_descricao_cc2
      FROM SIAOS.CONSULTA C
     WHERE C.CON_NUMERO = RPAD(n_con_numero, 6, ' ');
  
    v_descricao_cc := v_descricao_cc || v_descricao_cc2;
  
    UPDATE SIAOS.CONSULTA C
       SET C.CON_DESCRICAO = v_descricao_cc
     WHERE C.CON_NUMERO = RPAD(n_con_numero, 6, ' ');
  
    IF c_operacao2 = 'P' THEN
      UPDATE SIAOS.CONSULTA C
         SET C.USU_CHAPA   = n_chapa,
             C.CON_LIDA    = 0,
             C.CON_DT_RESP = NULL,
             C.CON_STATUS  = c_operacao2,
             C.PRP_CODIGO  = n_proposta
       WHERE C.CON_NUMERO = RPAD(n_con_numero, 6, ' ');
      IF n_order_no IS NULL THEN
        UPDATE SIAOS.PROPOSTA P
           SET P.PST_CODIGO = 1
         WHERE P.PRP_CODIGO = n_proposta;
      END IF;
    ELSIF c_operacao2 = 'R' OR c_operacao2 = 'N' THEN
      UPDATE SIAOS.CONSULTA C
         SET C.CON_DT_RESP    = SYSDATE,
             C.USU_CHAPA_RESP = n_chapa,
             C.CON_STATUS     = c_operacao2,
             C.PRP_CODIGO     = n_proposta
       WHERE C.CON_NUMERO = RPAD(n_con_numero, 6, ' ');
    
      IF n_pen_numero IS NOT NULL THEN
        SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(n_pnu_numero => n_pnu_numero,
                                            n_pen_numero => n_pen_numero);
      END IF;
    
      IF n_order_no IS NULL THEN
        UPDATE SIAOS.PROPOSTA P
           SET P.PST_CODIGO = n_pst_codigo
         WHERE P.PRP_CODIGO = n_proposta;
      END IF;
    
    ELSIF c_operacao2 = 'C' THEN
      UPDATE SIAOS.CONSULTA C
         SET C.CON_DT_RESP    = NVL(C.CON_DT_RESP, SYSDATE),
             C.USU_CHAPA_RESP = NVL(C.USU_CHAPA_RESP, n_chapa),
             C.CON_STATUS     = c_operacao2,
             C.PRP_CODIGO     = NVL(C.PRP_CODIGO, n_proposta)
       WHERE C.CON_NUMERO = RPAD(n_con_numero, 6, ' ');
      IF n_order_no IS NULL THEN
        UPDATE SIAOS.PROPOSTA P
           SET P.PST_CODIGO = n_pst_codigo
         WHERE P.PRP_CODIGO = n_proposta;
      END IF;
    ELSIF c_operacao2 = 'X' OR c_operacao2 IS NULL THEN
      UPDATE SIAOS.CONSULTA C
         SET C.CON_DT_RESP    = NULL,
             C.USU_CHAPA_RESP = NULL,
             C.CON_STATUS     = NULL,
             C.PRP_CODIGO     = NVL(C.PRP_CODIGO, n_proposta)
       WHERE C.CON_NUMERO = RPAD(n_con_numero, 6, ' ');
      IF n_order_no IS NULL THEN
        UPDATE SIAOS.PROPOSTA P
           SET P.PST_CODIGO = n_pst_codigo
         WHERE P.PRP_CODIGO = n_proposta;
      END IF;
    ELSE
      UPDATE SIAOS.CONSULTA C
         SET C.CON_STATUS = c_operacao2, C.PRP_CODIGO = n_proposta
       WHERE C.CON_NUMERO = RPAD(n_con_numero, 6, ' ');
    END IF;
  
    COMMIT;
  
    vc2_sql     := NULL;
    vc2_sql_set := NULL;
    IF n_con_numero IS NOT NULL THEN
      IF vc2_coluna IS NOT NULL THEN
        vc2_sql_set := ' P.' || vc2_coluna || ' = ' || n_con_numero || ' ';
      END IF;
      IF vc2_coluna3 IS NOT NULL THEN
        IF vc2_sql_set IS NOT NULL THEN
          vc2_sql_set := vc2_sql_set || ',';
        END IF;
        vc2_sql_set := vc2_sql_set || ' P.' || vc2_coluna3 || ' = ''' ||
                       c_operacao2 || ''' ';
      END IF;
      IF vc2_sql_set IS NOT NULL THEN
        vc2_sql_set := ' SET ' || vc2_sql_set;
        vc2_sql     := 'UPDATE SIAOS.PROPOSTA P';
        vc2_sql     := vc2_sql || vc2_sql_set;
        vc2_sql     := vc2_sql || ' WHERE P.PRP_CODIGO = ' || n_proposta;
      END IF;
    
      IF vc2_sql IS NOT NULL THEN
        EXECUTE IMMEDIATE vc2_sql;
      END IF;
    END IF;
  
    vc2_sql     := NULL;
    vc2_sql_set := NULL;
  
    IF n_con_numero IS NOT NULL THEN
      IF vc2_coluna IS NOT NULL THEN
        vc2_sql_set := ' O.' || vc2_coluna2 || ' = ' || n_con_numero || ' ';
      END IF;
      IF vc2_coluna3 IS NOT NULL THEN
        IF vc2_sql_set IS NOT NULL THEN
          vc2_sql_set := vc2_sql_set || ',';
        END IF;
        vc2_sql_set := vc2_sql_set || ' O.' || vc2_coluna4 || ' = ''' ||
                       c_operacao2 || ''' ';
      END IF;
      IF vc2_sql_set IS NOT NULL THEN
        vc2_sql_set := ' SET ' || vc2_sql_set;
        vc2_sql     := 'UPDATE SIAOS.OEHDR O';
        vc2_sql     := vc2_sql || vc2_sql_set;
        vc2_sql     := vc2_sql ||
                       'WHERE O.ORDER_NO = (SELECT P.ORDER_NO FROM SIAOS.PROPOSTA P WHERE P.PRP_CODIGO = ' ||
                       n_proposta || ')';
      END IF;
    
      IF vc2_sql IS NOT NULL THEN
        EXECUTE IMMEDIATE vc2_sql;
      END IF;
    END IF;
  
    COMMIT;
    /*
    IF n_cons_tipo = 3 THEN
      IF c_operacao2 = 'P'  THEN
        v_status := 'P';
      ELSIF c_operacao2 = 'R'  THEN
        v_status := 'R';
      ELSIF c_operacao2 = 'C'  THEN
        v_status := 'C';
      END IF;
    
      IF n_order_no IS NULL THEN
        --v_status := SIAOS.PCK_SMART_SALES3.SF_ST_PROP_FSVF(n_prop);
        UPDATE SIAOS.PROPOSTA
           SET PROPOSTA.PRP_STATUS_FSVC = v_status
         WHERE PROPOSTA.PRP_CODIGO = n_proposta;
      ELSE
        UPDATE SIAOS.OEHDR
           SET OEHDR.OEH_STATUS_FSVC = v_status
         WHERE OEHDR.ORDER_NO = n_order_no;
      END IF;
    END IF;
    
    COMMIT;
    */
    SIAOS.SP_LOG_CONSULTA_PRAZO(n_opcao,
                                RPAD(n_con_numero, 6, ' '),
                                n_chapa);
  
    SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1,
                                           NULL,
                                           n_proposta,
                                           n_tre_codigo,
                                           c_pre_mensagem,
                                           NULL,
                                           n_erro);
  
    IF n_order_no IS NULL THEN
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_proposta);
    END IF;
  
  END SP_GRAVA_CONSULTA;

  -------------------------------------------------------------
  -----------  STATUS DA CONSULTA   ---------------------------
  -------------------------------------------------------------

  FUNCTION SF_STATUS_CONS(n_proposta  IN PROPOSTA.PRP_CODIGO%TYPE,
                          n_cons_tipo IN CONSULTA.CON_TIPO%TYPE) RETURN CHAR IS
  
    n_con_numero CONSULTA.CON_NUMERO%TYPE;
    c_con_status CONSULTA.CON_STATUS%TYPE;
    n_order_no   PROPOSTA.ORDER_NO%TYPE;
    vc2_sql      VARCHAR2(2000);
    vc2_coluna   VARCHAR2(200);
    vc2_coluna2  VARCHAR2(200);
  
  BEGIN
  
    SELECT T.TCS_CAMPO_ST_PROP, T.TCS_CAMPO_ST_OS
      INTO vc2_coluna, vc2_coluna2
      FROM SIAOS.TIPO_CONSULTA T
     WHERE T.TCS_CODIGO = n_cons_tipo;
  
    SELECT ORDER_NO
      INTO n_order_no
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    SELECT MAX(C.CON_NUMERO)
      INTO n_con_numero
      FROM CONSULTA C
     WHERE C.PRP_CODIGO = n_proposta
       AND C.CON_TIPO = n_cons_tipo;
  
    IF n_con_numero IS NOT NULL THEN
    
      SELECT C.CON_STATUS
        INTO c_con_status
        FROM CONSULTA C
       WHERE C.CON_NUMERO = n_con_numero;
    
    END IF;
  
    IF n_con_numero IS NULL AND vc2_coluna IS NOT NULL AND
       vc2_coluna2 IS NOT NULL THEN
      vc2_sql := 'SELECT DECODE(P.ORDER_NO, NULL,TO_NUMBER(P.' ||
                 vc2_coluna || ',(SELECT O.' || vc2_coluna2 ||
                 ' FROM OEHDR O WHERE O.ORDER_NO = P.ORDER_NO))) FROM SIAOS.PROPOSTA P WHERE P.PRP_CODIGO = ' ||
                 n_proposta;
    
      /* Executando Consulta por SQL Dinamico */
      EXECUTE IMMEDIATE vc2_sql
        INTO c_con_status;
    END IF;
  
    RETURN c_con_status;
  
  END SF_STATUS_CONS;

  -------------------------------------------------------------
  -----------  POE PESO NA CONSULTA DA PROPOSTA   -------------
  -------------------------------------------------------------

  PROCEDURE SP_GRAVA_DT_SER(n_proposta IN PROPOSTA.PRP_CODIGO%TYPE,
                            n_lote     IN INTEGER,
                            v_data_ser IN VARCHAR2,
                            v_data_con IN VARCHAR2,
                            n_erro     OUT INTEGER) IS
  
    d_data_ser2 DATE;
    d_data_con2 DATE;
    dt_min      DATE;
    v_sem_con   VARCHAR2(6);
  
  BEGIN
  
    d_data_ser2 := TO_DATE(v_data_ser, 'DD/MM/YYYY');
    d_data_con2 := TO_DATE(v_data_con, 'DD/MM/YYYY');
    n_erro      := 0;
  
    IF d_data_ser2 IS NOT NULL THEN
    
      v_sem_con := TO_CHAR(d_data_ser2, 'IYYYIW');
    
    END IF;
  
    SELECT SYSDATE + CONFIGURA_PROPOSTA.CPR_DIA_MIN_SER DATA_MIN_CK
      INTO dt_min
      FROM SIAOS.CONFIGURA_PROPOSTA;
  
    IF n_proposta IS NULL OR n_lote IS NULL OR v_data_ser IS NULL THEN
    
      n_erro := 1;
    
    ELSIF TRUNC(d_data_ser2) < TRUNC(dt_min) THEN
    
      n_erro := 2;
    
    END IF;
  
    IF n_erro = 0 THEN
    
      UPDATE SIAOS.ITEM_PROP
         SET ITEM_PROP.IPR_DT_ENTREGA  = d_data_ser2,
             ITEM_PROP.IPR_DT_CONTRAT  = d_data_con2,
             ITEM_PROP.IPR_SEMANA_ENT  = v_sem_con,
             ITEM_PROP.IPR_STATUS_CONS = 'C'
       WHERE ITEM_PROP.PRP_CODIGO = n_proposta
         AND ITEM_PROP.IPR_LOTE = n_lote;
    
    END IF;
  
    COMMIT;
  
  END SP_GRAVA_DT_SER;

  -------------------------------------------------------------
  -------------------  ALTERA LOTE DO ITEM  -------------------
  -------------------------------------------------------------

  PROCEDURE SP_ALTERA_LOTE(n_prop      IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                           n_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_codigo    IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                           n_lote_e    IN SIAOS.ITEM_PROP.IPR_LOTE%TYPE,
                           n_lote_s    IN SIAOS.ITEM_PROP.IPR_LOTE%TYPE,
                           v_qtd       IN SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE,
                           n_sistema   IN INTEGER,
                           n_erro      OUT INTEGER) IS
  
    n_item       INTEGER;
    n_dif_qtd    INTEGER;
    n_itemizar   INTEGER;
    n_proposta   INTEGER;
    n_qtd        INTEGER;
    dt_ent_ser   SIAOS.ITEM_PROP.IPR_DT_ENTREGA%TYPE;
    n_ent_normal SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
  
  BEGIN
  
    n_erro := 0;
  
    BEGIN
    
      SELECT MAX(IPR_DT_ENTREGA), MAX(IPR_SEMANA_ENT)
        INTO dt_ent_ser, n_ent_normal
        FROM ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_prop
         AND ITEM_PROP.IPR_LOTE = n_lote_e
         AND ITEM_PROP.IPR_HOLD = 0
         AND ROWNUM = 1
       GROUP BY IPR_DT_ENTREGA, IPR_SEMANA_ENT;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
      
        BEGIN
          SELECT IPR_DT_ENTREGA, IPR_SEMANA_ENT
            INTO dt_ent_ser, n_ent_normal
            FROM ITEM_PROP
           WHERE ITEM_PROP.PRP_CODIGO = n_prop
             AND ITEM_PROP.IPR_LOTE = n_lote_s
             AND ROWNUM = 1
           GROUP BY IPR_DT_ENTREGA, IPR_SEMANA_ENT;
        
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
          
            dt_ent_ser   := NULL;
            n_ent_normal := NULL;
          
        END;
      
    END;
  
    IF n_sistema = 122 THEN
      -- LOTE NO ORDER IN
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_STATUS_CONS = NULL,
             IPR_SEMAN_CONS  = NULL,
             IPR_PESO_CONS   = NULL,
             IPR_SEMANA_ENT  = NULL
       WHERE PRP_CODIGO = n_prop;
    
    END IF;
  
    IF n_codigo IS NOT NULL THEN
      -- LOTE ITEMIZADO (POR CONTROLE)
    
      IF n_sistema = 122 THEN
        -- LOTE NO ORDER IN
      
        UPDATE ITEM_PROP
           SET IPR_LOTE       = n_lote_e,
               IPR_DT_ENTREGA = dt_ent_ser,
               IPR_SEMANA_ENT = n_ent_normal
         WHERE IPR_CODIGO = n_codigo;
      
        FOR cur_filho IN (SELECT ITEM_PROP.IPR_CODIGO,
                                 ITEM_PROP.IPR_ITEM_PROP,
                                 ITEM_PROP.PRP_CODIGO
                            FROM SIAOS.ITEM_PROP
                           WHERE ITEM_PROP.IPR_COD_TR = n_codigo) LOOP
        
          UPDATE ITEM_PROP
             SET IPR_LOTE       = n_lote_e,
                 IPR_DT_ENTREGA = dt_ent_ser,
                 IPR_SEMANA_ENT = n_ent_normal
           WHERE IPR_CODIGO = cur_filho.IPR_CODIGO;
          n_item     := cur_filho.IPR_ITEM_PROP;
          n_proposta := cur_filho.PRP_CODIGO;
        
        END LOOP;
      
      ELSE
        -- LOTE NA CONSULTA DE PRAZO
      
        UPDATE ITEM_PROP
           SET IPR_LOTE       = n_lote_e,
               IPR_DT_ENTREGA = dt_ent_ser,
               IPR_SEMANA_ENT = n_ent_normal
         WHERE IPR_CODIGO = n_codigo
           AND IPR_LOTE = n_lote_s;
      
        FOR cur_filho IN (SELECT ITEM_PROP.IPR_CODIGO,
                                 ITEM_PROP.IPR_ITEM_PROP,
                                 ITEM_PROP.PRP_CODIGO
                            FROM SIAOS.ITEM_PROP
                           WHERE ITEM_PROP.IPR_COD_TR = n_codigo
                             AND IPR_LOTE = n_lote_s) LOOP
        
          UPDATE ITEM_PROP
             SET IPR_LOTE       = n_lote_e,
                 IPR_DT_ENTREGA = dt_ent_ser,
                 IPR_SEMANA_ENT = n_ent_normal
           WHERE IPR_CODIGO = cur_filho.IPR_CODIGO;
          n_item     := cur_filho.IPR_ITEM_PROP;
          n_proposta := cur_filho.PRP_CODIGO;
        
        END LOOP;
      
      END IF;
    
    END IF;
  
    IF (n_prop IS NOT NULL) OR (n_item_prop IS NOT NULL) THEN
      -- LOTE ITEMIZADO (POR CONTROLE)
    
      IF n_item_prop IS NOT NULL THEN
        SELECT PRODUTO.ITEMIZAR, SUM(ITEM_PROP.IPR_QUANTIDADE)
          INTO n_itemizar, n_qtd
          FROM SIAOS.ITEM_PROP, SIAOS.PRODUTO
         WHERE ITEM_PROP.PRO_CODIGO = PRODUTO.PRODUTO
           AND ITEM_PROP.PRP_CODIGO = n_prop
           AND ITEM_PROP.IPR_ITEM_PROP = n_item_prop
           AND ITEM_PROP.IPR_LOTE = n_lote_s
         GROUP BY PRODUTO.ITEMIZAR;
      ELSE
        SELECT PRODUTO.ITEMIZAR, SUM(ITEM_PROP.IPR_QUANTIDADE)
          INTO n_itemizar, n_qtd
          FROM SIAOS.ITEM_PROP, SIAOS.PRODUTO
         WHERE ITEM_PROP.PRO_CODIGO = PRODUTO.PRODUTO
           AND ITEM_PROP.IPR_CODIGO = n_codigo
         GROUP BY PRODUTO.ITEMIZAR;
      END IF;
    
      IF n_itemizar = 1 OR n_qtd = v_qtd THEN
      
        FOR cur_pai IN (SELECT ITEM_PROP.IPR_CODIGO
                          FROM SIAOS.ITEM_PROP
                         WHERE ITEM_PROP.PRP_CODIGO = n_prop
                           AND ITEM_PROP.IPR_ITEM_PROP = n_item_prop
                           AND IPR_LOTE = n_lote_s
                           AND ROWNUM <= v_qtd) LOOP
        
          UPDATE ITEM_PROP
             SET IPR_LOTE       = n_lote_e,
                 IPR_DT_ENTREGA = dt_ent_ser,
                 IPR_SEMANA_ENT = n_ent_normal
           WHERE IPR_CODIGO = cur_pai.IPR_CODIGO;
        
          FOR cur_filho IN (SELECT ITEM_PROP.IPR_CODIGO,
                                   ITEM_PROP.IPR_ITEM_PROP,
                                   ITEM_PROP.PRP_CODIGO
                              FROM SIAOS.ITEM_PROP
                             WHERE ITEM_PROP.IPR_COD_TR = cur_pai.IPR_CODIGO) LOOP
          
            UPDATE ITEM_PROP
               SET IPR_LOTE       = n_lote_e,
                   IPR_DT_ENTREGA = dt_ent_ser,
                   IPR_SEMANA_ENT = n_ent_normal
             WHERE IPR_CODIGO = cur_filho.IPR_CODIGO
               AND IPR_LOTE = n_lote_s;
            n_item     := cur_filho.IPR_ITEM_PROP;
            n_proposta := cur_filho.PRP_CODIGO;
          
          END LOOP;
        
        END LOOP;
      ELSE
      
        n_dif_qtd := v_qtd;
      
        FOR c_itens IN (SELECT IPR_CODIGO, IPR_QUANTIDADE
                          FROM SIAOS.ITEM_PROP
                         WHERE ITEM_PROP.PRP_CODIGO = n_prop
                           AND ITEM_PROP.IPR_ITEM_PROP = n_item_prop
                           AND ITEM_PROP.IPR_LOTE = n_lote_s
                         ORDER BY IPR_QUANTIDADE ASC) LOOP
          IF c_itens.IPR_QUANTIDADE <= n_dif_qtd THEN
          
            n_dif_qtd := n_dif_qtd - c_itens.IPR_QUANTIDADE;
          
            UPDATE ITEM_PROP
               SET IPR_LOTE       = n_lote_e,
                   IPR_DT_ENTREGA = dt_ent_ser,
                   IPR_SEMANA_ENT = n_ent_normal
             WHERE IPR_CODIGO = c_itens.IPR_CODIGO;
          
          ELSIF c_itens.IPR_QUANTIDADE > n_dif_qtd AND n_dif_qtd > 0 THEN
          
            INSERT INTO SIAOS.ITEM_PROP
              (PRP_CODIGO,
               PRO_CODIGO,
               IPR_ITEM_PROP,
               IPR_ITEM,
               IPR_CLASSE,
               IPR_PRECO,
               IPR_VENDA_FIM,
               IPR_VENDA_CLI,
               IPR_ADICIONAL,
               IPR_QUANTIDADE,
               IPR_DESC_FIM,
               IPR_DESC_CLI,
               IPR_PEDIDO,
               IPR_ANTECIPA,
               IPR_FATURA,
               IPR_IPI,
               IPR_ICMS,
               IPR_ISS,
               IPR_DT_ENTREGA,
               IPR_APNF,
               IPR_OBS,
               IPR_SELO_LADO,
               IPR_COD_TR,
               IPR_SEMANA_ENT,
               IPR_DT_PEDIDO,
               IPR_CONS_PRAZO,
               SENSOR,
               CONTROLE,
               IPR_DT_CONTRAT,
               IPR_PROP_FIL,
               IPR_OS_FIL,
               IPR_DIVERSOS,
               IPR_N_SERIE,
               IPR_NAO_FAB,
               IPR_STATUS_CONS,
               IPR_SEMAN_CONS,
               IPR_LOTE,
               IPR_COPIA,
               IPR_PESO_CONS,
               TIPO,
               IPR_REFUGO,
               IPR_OS_REV,
               IPR_ITEM_REV,
               IPR_PESO_ITEM,
               IPR_LINK_MANUAL,
               IPG_CODIGO,
               IPR_FOLHA,
               IPR_HOLD,
               IPR_DESCONTO)
              SELECT PRP_CODIGO,
                     PRO_CODIGO,
                     IPR_ITEM_PROP,
                     IPR_ITEM,
                     IPR_CLASSE,
                     IPR_PRECO,
                     IPR_VENDA_FIM,
                     IPR_VENDA_CLI,
                     IPR_ADICIONAL,
                     n_dif_qtd,
                     IPR_DESC_FIM,
                     IPR_DESC_CLI,
                     IPR_PEDIDO,
                     IPR_ANTECIPA,
                     IPR_FATURA,
                     IPR_IPI,
                     IPR_ICMS,
                     IPR_ISS,
                     dt_ent_ser,
                     IPR_APNF,
                     IPR_OBS,
                     IPR_SELO_LADO,
                     IPR_COD_TR,
                     n_ent_normal,
                     IPR_DT_PEDIDO,
                     IPR_CONS_PRAZO,
                     SENSOR,
                     CONTROLE,
                     IPR_DT_CONTRAT,
                     IPR_PROP_FIL,
                     IPR_OS_FIL,
                     IPR_DIVERSOS,
                     IPR_N_SERIE,
                     IPR_NAO_FAB,
                     IPR_STATUS_CONS,
                     IPR_SEMAN_CONS,
                     n_lote_e,
                     IPR_COPIA,
                     IPR_PESO_CONS,
                     TIPO,
                     IPR_REFUGO,
                     IPR_OS_REV,
                     IPR_ITEM_REV,
                     IPR_PESO_ITEM,
                     IPR_LINK_MANUAL,
                     IPG_CODIGO,
                     IPR_FOLHA,
                     IPR_HOLD,
                     IPR_DESCONTO
                FROM ITEM_PROP
               WHERE IPR_CODIGO = c_itens.IPR_CODIGO;
          
            n_dif_qtd := c_itens.IPR_QUANTIDADE - n_dif_qtd;
          
            UPDATE ITEM_PROP
               SET IPR_QUANTIDADE = n_dif_qtd
             WHERE IPR_CODIGO = c_itens.IPR_CODIGO;
          
            EXIT;
          
          END IF;
        
        END LOOP;
      
      END IF;
    
    END IF;
  
    COMMIT;
  
  END SP_ALTERA_LOTE;

  -----------------------------------------------------------------------------
  -----------  Retrona diferença entre semana atual com a requerida -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_DIFERENCA_SEMANA(n_semana    IN NUMBER,
                               n_prometida IN NUMBER := 1) RETURN NUMBER IS

    n_diferenca    NUMBER(5) := 0;
    n_dia          NUMBER(5) := 0;
    n_qtde_sem     NUMBER(5) := 1;
    n_semana_atual NUMBER(6);
    n_semana_maior NUMBER(6);
    n_semana_menor NUMBER(6);
    n_sinal        NUMBER(6) := 1;
    --vc2_valor      VARCHAR2(20);
  
  BEGIN
  
    IF n_semana != 999999 THEN
    
      n_dia := TO_CHAR(SYSDATE, 'DHH24');
      
      IF n_dia >= 412 THEN      
        n_qtde_sem := 2;
      END IF;
    
      n_semana_atual := TO_NUMBER(TO_CHAR(SYSDATE, 'IYYY') || TO_CHAR(SYSDATE, 'IW'));
      
      n_semana_maior := n_semana;
      n_semana_menor := n_semana_atual;
      IF n_semana_atual > n_semana THEN
        n_semana_maior := n_semana_atual;
        n_semana_menor := n_semana;
        n_sinal := -1;
      END IF;
      
      SELECT COUNT(SEMANA) SEMANAS
        INTO n_diferenca
        FROM (SELECT DISTINCT TO_CHAR(C.DT_DIA,'IYYYIW') SEMANA
                FROM GERAL.CALENDARIO C) 
       WHERE SEMANA >= n_semana_menor
         AND SEMANA <= n_semana_maior;
         
       IF NVL(n_prometida,0) = 0 THEN
         n_diferenca := n_diferenca - 1;
       END IF;
              
       n_diferenca := (n_diferenca - n_qtde_sem) * n_sinal;
       
    ELSE
    
      n_diferenca := NULL;
    
    END IF;
    RETURN(n_diferenca);
  
  END SF_DIFERENCA_SEMANA;

  -----------------------------------------------------------------------------
  -----------  Retrona diferença entre semana atual com a requerida -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_ST_PROP_CONSULTA(n_prop IN INTEGER) RETURN VARCHAR2 IS
  
    v_status VARCHAR2(1);
    --v_status2        VARCHAR2(1) := 'Z';
    n_pst_codigo     SIAOS.PROPOSTA.PST_CODIGO%TYPE;
    n_pst_codigo_ant SIAOS.PROPOSTA.PST_CODIGO_ANT%TYPE;
    n_qtd_set        INTEGER;
  
  BEGIN
  
    SELECT PST_CODIGO, DECODE(PST_CODIGO_ANT, NULL, 2, PST_CODIGO_ANT)
      INTO n_pst_codigo, n_pst_codigo_ant
      FROM SIAOS.PROPOSTA
     WHERE PROPOSTA.PRP_CODIGO = n_prop;
  
    FOR c_status IN (SELECT DISTINCT IP.IPR_STATUS_CONS
                       FROM SIAOS.PROPOSTA P
                      INNER JOIN SIAOS.ITEM_PROP IP
                         ON IP.PRP_CODIGO = P.PRP_CODIGO
                      INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                         ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                        AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                      WHERE IP.PRP_CODIGO = n_prop
                        AND IP.IPR_HOLD = 0
                        AND P.PST_CODIGO != 5) LOOP
    
      IF c_status.IPR_STATUS_CONS IN ('P', 'R') THEN
      
        v_status := 'P';
      
      ELSIF c_status.IPR_STATUS_CONS IN ('C') THEN
      
        v_status := 'C';
      
        IF n_pst_codigo NOT IN (3, 4) AND n_pst_codigo_ant != 4 THEN
          n_pst_codigo := n_pst_codigo_ant;
        END IF;
      
      ELSIF c_status.IPR_STATUS_CONS = 'A' THEN
      
        v_status := 'A';
      
        IF n_pst_codigo NOT IN (3, 4) AND n_pst_codigo_ant != 4 THEN
          n_pst_codigo := n_pst_codigo_ant;
        END IF;
      
      END IF;
    
    END LOOP;
  
    UPDATE SIAOS.PROPOSTA
       SET PROPOSTA.PRP_STATUS_CONS = v_status
     WHERE PROPOSTA.PRP_CODIGO = n_prop;
  
    IF NVL(v_status, 0) != 'P' THEN
      v_status := SIAOS.PCK_SMART_SALES3.SF_ST_PROP_FSVF(n_prop);
      IF v_status = 'P' THEN
        n_pst_codigo := 1;
      END IF;
    END IF;
  
    IF n_pst_codigo IS NOT NULL THEN
    
      IF n_pst_codigo = 5 THEN
      
        SELECT COUNT(*)
          INTO n_qtd_set
          FROM SIAOS.PROP_SET PS
         WHERE PS.PRP_CODIGO = n_prop
           AND PS.SET_DATA_APR IS NULL;
      
        IF n_qtd_set = 0 THEN
          n_pst_codigo := 2;
        END IF;
      
      END IF;
    
      UPDATE SIAOS.PROPOSTA
         SET PROPOSTA.PST_CODIGO = n_pst_codigo
       WHERE PROPOSTA.PRP_CODIGO = n_prop;
    
    END IF;
  
    COMMIT;
  
    RETURN(v_status);
  
  END SF_ST_PROP_CONSULTA;

  -----------------------------------------------------------------------------
  -----------  Retrona diferença entre semana atual com a requerida -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_ST_CONSULTA_PRAZO(n_prop IN INTEGER) RETURN VARCHAR2 IS
  
    v_status VARCHAR2(1);
    --v_status2        VARCHAR2(1) := 'Z';
    n_pst_codigo     SIAOS.PROPOSTA.PST_CODIGO%TYPE;
    n_pst_codigo_ant SIAOS.PROPOSTA.PST_CODIGO_ANT%TYPE;
    n_qtd_set        INTEGER;
  
  BEGIN
  
    SELECT PST_CODIGO, DECODE(PST_CODIGO_ANT, NULL, 2, PST_CODIGO_ANT)
      INTO n_pst_codigo, n_pst_codigo_ant
      FROM SIAOS.PROPOSTA
     WHERE PROPOSTA.PRP_CODIGO = n_prop;
  
    FOR c_status IN (SELECT DISTINCT IP.IPR_STATUS_CONS
                       FROM SIAOS.PROPOSTA P
                      INNER JOIN SIAOS.ITEM_PROP IP
                         ON IP.PRP_CODIGO = P.PRP_CODIGO
                      INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                         ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                        AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                      WHERE IP.PRP_CODIGO = n_prop
                        AND IP.IPR_HOLD = 0
                        AND P.PST_CODIGO != 5) LOOP
    
      IF c_status.IPR_STATUS_CONS IN ('P', 'R') THEN
      
        v_status := 'P';
      
      ELSIF c_status.IPR_STATUS_CONS IN ('C') THEN
      
        v_status := 'C';
      
        IF n_pst_codigo NOT IN (3, 4) AND n_pst_codigo_ant != 4 THEN
          n_pst_codigo := n_pst_codigo_ant;
        END IF;
      
      ELSIF c_status.IPR_STATUS_CONS = 'A' THEN
      
        v_status := 'A';
      
        IF n_pst_codigo NOT IN (3, 4) AND n_pst_codigo_ant != 4 THEN
          n_pst_codigo := n_pst_codigo_ant;
        END IF;
      
      END IF;
    
    END LOOP;
  
    UPDATE SIAOS.PROPOSTA
       SET PROPOSTA.PRP_STATUS_CONS = v_status
     WHERE PROPOSTA.PRP_CODIGO = n_prop;
    /*
        IF NVL(v_status,0) != 'P' THEN
          v_status := SIAOS.PCK_SMART_SALES3.SF_ST_PROP_FSVF(n_prop);
          IF v_status = 'P' THEN
            n_pst_codigo := 1;
          END IF;
        END IF;
    */
    IF n_pst_codigo IS NOT NULL THEN
    
      IF n_pst_codigo = 5 THEN
      
        SELECT COUNT(*)
          INTO n_qtd_set
          FROM SIAOS.PROP_SET PS
         WHERE PS.PRP_CODIGO = n_prop
           AND PS.SET_DATA_APR IS NULL;
      
        IF n_qtd_set = 0 THEN
          n_pst_codigo := 2;
        END IF;
      
      END IF;
    
      UPDATE SIAOS.PROPOSTA
         SET PROPOSTA.PST_CODIGO = n_pst_codigo
       WHERE PROPOSTA.PRP_CODIGO = n_prop;
    
    END IF;
  
    COMMIT;
  
    RETURN(v_status);
  
  END SF_ST_CONSULTA_PRAZO;

  -----------------------------------------------------------------------------
  -----------  Retrona status da consulta de FSVF por controle      -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_ST_CTRL_FSVF(n_ctrl IN NUMBER, n_tabela IN INTEGER)
    RETURN VARCHAR2 IS
  
    v_status      VARCHAR2(1) := 'Z';
    n_ipr_codigo  SIAOS.ITEM_PROP.IPR_CODIGO%TYPE;
    n_controle    SIAOS.OELIN.CONTROLE%TYPE;
    n_pst_codigo  SIAOS.PROPOSTA.PST_CODIGO%TYPE;
    n_prp_codigo  SIAOS.PROPOSTA.PRP_CODIGO%TYPE;
    v_prp_st_fsvc SIAOS.ITEM_PROP_UNI.IPU_STATUS_FSVC%TYPE;
    n_msv_codigo  SIAOS.ITEM_PROP_UNI.MSV_CODIGO%TYPE;
    n_msv_retorno SIAOS.MOTIVO_FSVC.MSV_RETORNO%TYPE;
    dt_data_fat   SIAOS.OELIN.DT_FATURAMENTO%TYPE;
    dt_data_canc  SIAOS.OELIN.DT_CANC%TYPE;
  
  BEGIN
    /*
    n_tabela = 1 - ITEM_PROP, 2 - OELIN
    NULL - SEM CONSULTA (Z)
    --- STATUS DA CONSULTA ---------------
    1 = ERRO (SEM STATUS - CONSULTAR)
    2 = PENDENTE (AGUARDANDO RESPOSTA)
    3 = RESPONDIDO/CONCLUIDO
    4 = OS ABERTA
    5 = OS CONCLUIDA (S/RET)
    6 = OS CONCLUIDA (C/RET)
    7 = OS RETORNADA
    8 = NEGADO
    */
  
    IF n_tabela = 1 THEN
    
      n_ipr_codigo := n_ctrl;
      SELECT P.CONTROLE, P.PRP_CODIGO, U.IPU_STATUS_FSVC, U.MSV_CODIGO
        INTO n_controle, n_prp_codigo, v_prp_st_fsvc, n_msv_codigo
        FROM SIAOS.ITEM_PROP P
       INNER JOIN SIAOS.ITEM_PROP_UNI U
          ON U.PRP_CODIGO = P.PRP_CODIGO
         AND U.IPR_ITEM_PROP = P.IPR_ITEM_PROP
       WHERE P.IPR_CODIGO = n_ipr_codigo;
    
    ELSE
    
      n_controle := n_ctrl;
      SELECT IO.IOS_STATUS_FSVC,
             IO.MSV_CODIGO,
             O.DT_FATURAMENTO,
             O.DT_CANC,
             M.MSV_RETORNO
        INTO v_prp_st_fsvc,
             n_msv_codigo,
             dt_data_fat,
             dt_data_canc,
             n_msv_retorno
        FROM SIAOS.OELIN O
       INNER JOIN SIAOS.ITEM_OS IO
          ON IO.ORDER_NO = O.ORDER_NO
         AND IO.ITEM_NO = O.ITEM_NO
       INNER JOIN SIAOS.MOTIVO_FSVC M
          ON M.MSV_CODIGO = IO.MSV_CODIGO
       WHERE O.CONTROLE = n_controle;
    
    END IF;
  
    IF n_controle IS NULL THEN
    
      SELECT PST_CODIGO
        INTO n_pst_codigo
        FROM SIAOS.PROPOSTA P
       WHERE P.PRP_CODIGO = n_prp_codigo;
    
      IF n_pst_codigo != 4 THEN
        IF v_prp_st_fsvc = 'E' THEN
          v_status := 1;
        ELSIF v_prp_st_fsvc = 'P' THEN
          v_status := 2;
        ELSIF v_prp_st_fsvc = 'N' THEN
          v_status := 8;
        ELSE
          v_status := 3;
        END IF;
      ELSE
        v_status := 3;
      END IF;
    ELSE
      IF dt_data_fat IS NULL THEN
        IF v_prp_st_fsvc = 'E' THEN
          v_status := 1;
        ELSIF v_prp_st_fsvc = 'P' THEN
          v_status := 2;
        ELSIF v_prp_st_fsvc = 'N' THEN
          v_status := 8;
        ELSE
          v_status := 4;
        END IF;
      ELSE
        IF dt_data_canc IS NOT NULL THEN
          v_status := 7;
        ELSE
          IF n_msv_retorno = 1 THEN
            v_status := 6;
          ELSE
            v_status := 5;
          END IF;
        END IF;
      END IF;
    END IF;
  
    RETURN(v_status);
  
  END SF_ST_CTRL_FSVF;

  -----------------------------------------------------------------------------
  -----------  Retrona status da consulta de FSVF                   -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_ST_PROP_FSVF(n_prop IN INTEGER) RETURN VARCHAR2 IS
  
    v_status          VARCHAR2(1) := 'Z';
    v_prp_st_fsvc     SIAOS.PROPOSTA.PRP_STATUS_FSVC%TYPE;
    n_con_numero_fsvf SIAOS.PROPOSTA.CON_NUMERO_FSVF%TYPE;
    --n_qtd_set           INTEGER;
  
  BEGIN
    /*
    --- STATUS DA CONSULTA ---------------
    E - ERRO (SEM STATUS - CONSULTAR)
    P - PENDENTE (AGUARDANDO RESPOSTA)
    R - RESPONDIDO
    C - CONCLUIDO
    --- STATUS DOS ITENS ---------------
    Z - INICIO
    P - PENDENTE (AGUARDANDO RESPOSTA)
    R - REPROVADO
    A - APROVADO
    */
  
    SELECT PRP_STATUS_FSVC,
           CON_NUMERO_FSVF
      INTO v_prp_st_fsvc,
           n_con_numero_fsvf
      FROM SIAOS.PROPOSTA P
     WHERE P.PRP_CODIGO = n_prop;
  
    FOR c_status IN (SELECT DISTINCT IPU.IPR_ITEM_PROP,
                                     IPU.IPU_STATUS_FSVC,
                                     IPU.MSV_CODIGO
                       FROM SIAOS.PROPOSTA P
                      INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                         ON IPU.PRP_CODIGO = P.PRP_CODIGO
                      WHERE P.PRP_CODIGO = n_prop) LOOP
    
      IF c_status.MSV_CODIGO != 7 THEN
        IF c_status.MSV_CODIGO IS NOT NULL AND
           c_status.IPU_STATUS_FSVC IS NULL THEN
          v_status := 'E';
        ELSIF c_status.MSV_CODIGO IS NOT NULL AND
              c_status.IPU_STATUS_FSVC = 'P' THEN
          IF v_status IN ('Z', 'P') THEN
            v_status := 'P';
          END IF;
        ELSIF c_status.MSV_CODIGO IS NOT NULL AND
              c_status.IPU_STATUS_FSVC IN ('R', 'A') THEN
          IF v_status IN ('Z', 'R', 'A') AND v_prp_st_fsvc = 'C' THEN
            v_status := 'C';
          ELSIF v_status IN ('Z', 'R', 'A') AND v_prp_st_fsvc = 'R' THEN
            v_status := 'R';
          END IF;
        END IF;
      END IF;
    
    END LOOP;
  
    IF v_status = 'Z' THEN
      v_status := NULL;
    END IF;
    /*
    UPDATE SIAOS.PROPOSTA
       SET PROPOSTA.PRP_STATUS_FSVC = v_status
     WHERE PROPOSTA.PRP_CODIGO = n_prop;
    
    COMMIT;
    */
    RETURN(v_status);
  
  END SF_ST_PROP_FSVF;

  -----------------------------------------------------------------------------
  -----------  Retrona status da consulta de FSVF                   -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_ST_FSVF(n_prop IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE)
    RETURN VARCHAR2 IS
  
    v_status      VARCHAR2(1) := 'Z';
    v_prp_st_fsvc SIAOS.PROPOSTA.PRP_STATUS_FSVC%TYPE;
    n_pst_codigo  SIAOS.PROPOSTA.PST_CODIGO%TYPE;
    n_order_no    SIAOS.PROPOSTA.ORDER_NO%TYPE;
    --n_qtd_set           INTEGER;
  
  BEGIN
    /*
    NULL - SEM CONSULTA (Z)
    --- STATUS DA CONSULTA ---------------
    1 = ERRO (SEM STATUS - CONSULTAR)
    2 = PENDENTE (AGUARDANDO RESPOSTA)
    3 = RESPONDIDO/CONCLUIDO
    4 = OS ABERTA
    5 = OS CONCLUIDA (S/RET)
    6 = OS CONCLUIDA (C/RET)
    7 = OS RETORNADA
    */
  
    SELECT PST_CODIGO, ORDER_NO
      INTO n_pst_codigo, n_order_no
      FROM SIAOS.PROPOSTA P
     WHERE P.PRP_CODIGO = n_prop;
  
    IF n_order_no IS NOT NULL THEN
      n_pst_codigo := SIAOS.PCK_REVISOR.SF_STATUS_OS(n_order_no);
    
      IF n_pst_codigo = 4 THEN
        FOR c_ctrl IN (SELECT DISTINCT MS.MSV_RETORNO
                         FROM SIAOS.ITEM_OS IO
                        INNER JOIN SIAOS.MOTIVO_FSVC MS
                           ON MS.MSV_CODIGO = IO.MSV_CODIGO
                        INNER JOIN SIAOS.OELIN O
                           ON O.ORDER_NO = IO.ORDER_NO
                          AND O.ITEM_NO = IO.ITEM_NO
                        WHERE IO.ORDER_NO = n_order_no
                          AND IO.MSV_CODIGO != 7
                          AND O.DT_FATURAMENTO IS NOT NULL) LOOP
          IF c_ctrl.MSV_RETORNO = 1 THEN
            v_status := 5;
          ELSIF v_status != 5 THEN
            v_status := 6;
          END IF;
        END LOOP;
      ELSE
        SELECT O.OEH_STATUS_FSVC
          INTO v_prp_st_fsvc
          FROM SIAOS.OEHDR O
         WHERE O.ORDER_NO = n_order_no;
        IF v_prp_st_fsvc = 'C' THEN
          v_status := 4;
        ELSIF v_prp_st_fsvc IN ('P', 'R') THEN
          v_status := 1;
        ELSE
          v_status := 4;
        END IF;
      END IF;
    ELSE
      IF n_pst_codigo != 4 THEN
        v_prp_st_fsvc := SF_ST_PROP_FSVF(n_prop);
        IF v_prp_st_fsvc = 'E' THEN
          v_status := 1;
        ELSIF v_prp_st_fsvc = 'P' THEN
          v_status := 2;
        ELSE
          v_status := 3;
        END IF;
      ELSE
        v_status := 3;
      END IF;
    END IF;
  
    IF v_status = 'Z' THEN
      v_status := NULL;
    END IF;
  
    RETURN(v_status);
  
  END SF_ST_FSVF;

  -----------------------------------------------------------------------------
  -----------  Retrona diferença entre semana atual com a requerida -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_ST_FSRF(n_prop IN INTEGER) RETURN VARCHAR2 IS
  
    v_status   VARCHAR2(1);
    n_qtd_prod INTEGER;
  
  BEGIN
  
    SELECT COUNT(*)
      INTO n_qtd_prod
      FROM SIAOS.ITEM_PROP IP
     INNER JOIN SIAOS.ITEM_PROP_UNI IPU
        ON IPU.PRP_CODIGO = IP.PRP_CODIGO
       AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
     WHERE IPU.PRP_CODIGO = n_prop
       AND IP.IPR_HOLD = 0
       AND IPU.MSV_CODIGO != 7
       AND IPU.MSV_CODIGO IS NOT NULL;
  
    IF n_qtd_prod > 0 THEN
    
      SELECT COUNT(*)
        INTO n_qtd_prod
        FROM SIAOS.ITEM_PROP IP
       INNER JOIN SIAOS.ITEM_PROP_UNI IPU
          ON IPU.PRP_CODIGO = IP.PRP_CODIGO
         AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
       WHERE IPU.PRP_CODIGO = n_prop
         AND IP.IPR_HOLD = 0
         AND IPU.MSV_CODIGO != 7
         AND IPU.MSV_CODIGO IS NOT NULL
         AND NVL(IPU.IPU_STATUS_FSVC, 'A') = 'A';
    
      IF n_qtd_prod > 0 THEN
        v_status := 'A';
      ELSE
      
        SELECT COUNT(*)
          INTO n_qtd_prod
          FROM SIAOS.ITEM_PROP IP
         INNER JOIN SIAOS.ITEM_PROP_UNI IPU
            ON IPU.PRP_CODIGO = IP.PRP_CODIGO
           AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
         WHERE IPU.PRP_CODIGO = n_prop
           AND IP.IPR_HOLD = 0
           AND IPU.MSV_CODIGO != 7
           AND IPU.MSV_CODIGO IS NOT NULL
           AND NVL(IPU.IPU_STATUS_FSVC, 'A') = 'P';
      
        IF n_qtd_prod > 0 THEN
          v_status := 'P';
        ELSE
        
          SELECT COUNT(*)
            INTO n_qtd_prod
            FROM SIAOS.ITEM_PROP IP
           INNER JOIN SIAOS.ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           WHERE IP.PRP_CODIGO = n_prop
             AND IP.IPR_HOLD = 0
             AND IPU.MSV_CODIGO != 7
             AND IPU.MSV_CODIGO IS NOT NULL
             AND NVL(IPU.IPU_STATUS_FSVC, 'A') = 'N';
        
          IF n_qtd_prod > 0 THEN
            v_status := 'N';
          ELSE
            v_status := 'C';
          END IF;
        
        END IF;
      END IF;
    END IF;
  
    RETURN(v_status);
  
  END SF_ST_FSRF;

  -----------------------------------------------------------------------------
  -----------  Retrona diferença entre semana atual com a requerida -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_PESO_ITEM(n_prop IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                        n_item IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE)
    RETURN INTEGER IS
  
    n_peso_fim INTEGER := 0;
    n_gdi      INTEGER := 0;
  
  BEGIN
  
    SELECT ORIGEM.GDI_CODIGO
      INTO n_gdi
      FROM SIAOS.PROPOSTA, SIAOS.ORIGEM
     WHERE PROPOSTA.ORI_CODIGO = ORIGEM.ORIGEM
       AND PROPOSTA.PRP_CODIGO = n_prop;
  
    IF n_gdi = 13 THEN
    
      n_peso_fim := 0;
    
    ELSE
    
      FOR curs IN (SELECT DISTINCT SIAOS.PCK_SIAOS.SF_MAIOR_PESO(ITEM_PROP_SELO.PRO_CODIGO,
                                                                 ITEM_PROP_SELO.IPR_ITEM,
                                                                 ITEM_PROP_SELO.IPR_CLASSE) PESO
                     FROM SIAOS.ITEM_PROP, SIAOS.ITEM_PROP ITEM_PROP_SELO
                    WHERE ITEM_PROP.IPR_CODIGO = ITEM_PROP_SELO.IPR_COD_TR
                      AND ITEM_PROP.PRP_CODIGO = n_prop
                      AND ITEM_PROP.IPR_ITEM_PROP = n_item
                      AND ITEM_PROP.IPR_LINK_MANUAL = 0) LOOP
      
        IF curs.PESO > n_peso_fim THEN
          n_peso_fim := curs.PESO;
        END IF;
      
      END LOOP;
    
      FOR curs IN (SELECT DISTINCT SIAOS.PCK_SIAOS.SF_MAIOR_PESO(ITEM_PROP.PRO_CODIGO,
                                                                 ITEM_PROP.IPR_ITEM,
                                                                 ITEM_PROP.IPR_CLASSE) PESO
                     FROM SIAOS.VW_ITEM_PROP_1 ITEM_PROP
                    WHERE ITEM_PROP.PRP_CODIGO = n_prop
                      AND ITEM_PROP.IPR_ITEM_PROP = n_item) LOOP
      
        IF curs.PESO > n_peso_fim THEN
          n_peso_fim := curs.PESO;
        END IF;
      
      END LOOP;
    
    END IF;
  
    RETURN(n_peso_fim);
  
  END SF_PESO_ITEM;

  -----------------------------------------------------------------------------
  -----------  Retrona diferença entre semana atual com a requerida -----------
  -----------------------------------------------------------------------------
  FUNCTION SF_RETORNA_SEMANA(n_qtde_semana IN INTEGER)
  
   RETURN VARCHAR2 IS
  
    n_semana    VARCHAR2(7);
    n_dia       INTEGER := 0;
    n_qtde_dias INTEGER := 0;
  
  BEGIN
    
    n_dia := TO_CHAR(SYSDATE, 'DHH24');
    
    IF n_dia >= 412 THEN      
      n_qtde_dias := 7;
    END IF;
    
    IF n_qtde_semana = 0 THEN
        
        SELECT DISTINCT TO_CHAR(T.DT_DIA,'IYYYIW') SEMANA 
          INTO n_semana
          FROM GERAL.CALENDARIO T
         WHERE TO_CHAR(T.DT_DIA,'IYYYIW') = TO_CHAR(SYSDATE + n_qtde_dias,'IYYYIW');
         
        n_semana := SUBSTR(n_semana,0,4)||'/'||SUBSTR(n_semana,5,6);
        
    ELSIF n_qtde_semana <> 99 THEN
    
      SELECT MAX(SEMANA)
        INTO n_semana
        FROM (SELECT DISTINCT TO_CHAR(T.DT_DIA,'IYYYIW') SEMANA 
                FROM GERAL.CALENDARIO T
               WHERE TO_CHAR(T.DT_DIA,'IYYYIW') >= TO_CHAR(SYSDATE + 7 + n_qtde_dias,'IYYYIW')
               ORDER BY TO_CHAR(T.DT_DIA,'IYYYIW'))
        WHERE ROWNUM <= n_qtde_semana;
        
      n_semana := SUBSTR(n_semana,0,4)||'/'||SUBSTR(n_semana,5,6);  
      
    ELSE
    
      n_semana := '9999/99';
    
    END IF;
  
    RETURN(n_semana);
  
  END SF_RETORNA_SEMANA;

  -----------------------------------------------------------------------------
  -----------  Retrona diferença entre semana atual com a requerida -----------
  -----------------------------------------------------------------------------
  PROCEDURE SP_ATUALIZA_STATUS(n_proposta IN INTEGER) IS
  
    v_status VARCHAR2(1);
  
  BEGIN
  
    v_status := SIAOS.PCK_SMART_SALES3.SF_ST_CONSULTA_PRAZO(n_proposta);
  
  END SP_ATUALIZA_STATUS;

  -----------------------------------------------------------------------------
  --------------------  GRAVA REVISAO DA PROPOSTA  ----------------------------
  -----------------------------------------------------------------------------
  PROCEDURE SP_SALVA_REVISAO(n_proposta IN INTEGER, n_is_set IN INTEGER) IS
  
    n_rev                  INTEGER;
    n_set                  INTEGER;
    n_chapa                INTEGER;
    --vc2_pim_texto          SIAOS.PROPOSTA_IMP.PIM_TEXTO%TYPE;
    vc2_pim_texto2         SIAOS.PROPOSTA_IMP.PIM_TEXTO2%TYPE;
    --clb_pim_txt_intro      SIAOS.PROPOSTA_IMP.PIM_TXT_INTRO%TYPE;
    --clb_pim_texto_tecnico  SIAOS.PROPOSTA_IMP.PIM_TEXTO_TECNICO%TYPE;
    --clb_pim_texto_tecnico2 SIAOS.PROPOSTA_IMP.PIM_TEXTO_TECNICO2%TYPE;
    --clb_pim_cons_final     SIAOS.PROPOSTA_IMP.PIM_CONS_FINAL%TYPE;
    n_pst_codigo           SIAOS.PROP_STATUS.PST_CODIGO%TYPE;
    n_pst_codigo2          SIAOS.PROP_STATUS.PST_CODIGO%TYPE;
    n_pst_codigo_ant       SIAOS.PROP_STATUS.PST_CODIGO%TYPE;
    n_preco                NUMBER;
  
  BEGIN
  
    SELECT PST_CODIGO, PST_CODIGO_ANT
      INTO n_pst_codigo2, n_pst_codigo_ant
      FROM SIAOS.PROPOSTA
     WHERE PRP_CODIGO = n_proposta;
  
    IF n_pst_codigo2 IN (3, 4) THEN
    
      FOR cur_prop IN (SELECT *
                         FROM SIAOS.PROPOSTA
                        WHERE PROPOSTA.PRP_CODIGO = n_proposta) LOOP
      
        n_rev := cur_prop.PRP_REVISAO;
        n_set := cur_prop.PRP_SET;
      
        BEGIN
        
          SELECT USU_CHAPA
            INTO n_chapa
            FROM USUARIO
           WHERE TRIM(UPPER(USUARIO.USU_LOGINWEB)) = TRIM(UPPER(USER))
             AND ROWNUM = 1;
        
        EXCEPTION
          WHEN OTHERS THEN
          
            n_chapa := 0;
          
        END;
      
        IF cur_prop.PST_CODIGO = 3 THEN
        
          INSERT INTO SIAOS.PROP_RECADO
            (PRP_CODIGO,
             TRE_CODIGO,
             USU_CHAPA,
             PRE_MENSAGEM,
             PRE_DT_BAIXA,
             PRP_REVISAO)
          VALUES
            (n_proposta,
             4,
             n_chapa,
             'REATIVADA/REACTIVATED',
             SYSDATE,
             n_rev);
        
          UPDATE SIAOS.PROPOSTA
             SET PST_CODIGO = DECODE(PST_CODIGO_ANT, NULL, 2, 3, 2, 4, 2, PST_CODIGO_ANT)
           WHERE PRP_CODIGO = n_proposta;
           
          COMMIT;
          
        ELSE
        
          BEGIN
          
            INSERT INTO SIAOS.PROP_RECADO
              (PRP_CODIGO,
               TRE_CODIGO,
               USU_CHAPA,
               PRE_MENSAGEM,
               PRE_DT_BAIXA,
               PRP_REVISAO)
            VALUES
              (n_proposta,
               3,
               n_chapa,
               cur_prop.PRP_CODIGO || '-' || n_rev || '/' || n_set ||
               ' REVISAO/REVIEW',
               SYSDATE,
               n_rev);
          
            FOR cur_pend IN (SELECT PRE_CODIGO, PNU_NUMERO, PEN_NUMERO
                               FROM SIAOS.PROP_RECADO
                              WHERE PROP_RECADO.PRE_CODIGO IN
                                    (SELECT PRE_CODIGO
                                       FROM SIAOS.PROP_RECADO
                                      WHERE PROP_RECADO.PRP_CODIGO = n_proposta
                                        AND PROP_RECADO.TRE_CODIGO IN (5, 6, 8, 14))) 
            LOOP
            
              IF cur_pend.PNU_NUMERO IS NOT NULL THEN
                SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(cur_pend.PNU_NUMERO, cur_pend.PEN_NUMERO);
              END IF;         
              
              --=================================================--
              /*
              TODO: owner="juliano" category="Test" priority="3 - Low" created="15/09/2022" closed="07/11/2024"
              text="Aterado para não apagar followups históricos"
              */
              ------ Novo ----------------------------------------
              UPDATE SIAOS.PROP_RECADO
                 SET PROP_RECADO.PRE_DT_BAIXA = SYSDATE
               WHERE PRE_CODIGO = cur_pend.PRE_CODIGO
                 AND PRP_CODIGO = n_proposta
                 AND TRE_CODIGO IN (5, 6);
              ------ Add "AND TRE_CODIGO IN (8, 14)" ---------------
              DELETE FROM SIAOS.PROP_RECADO
               WHERE PRE_CODIGO = cur_pend.PRE_CODIGO
                 AND PRP_CODIGO = n_proposta
                 AND TRE_CODIGO IN (8, 14);        
              --=================================================--
            END LOOP;
                /*
              
                BEGIN
                  SELECT --PP.PPE_TEXTO,
                         PP.PPE_TEXTO2
                         --PP.PPE_TEXTO_TECNICO,
                         --PP.PPE_TEXTO_TECNICO2
                    INTO --vc2_pim_texto,
                         vc2_pim_texto2
                         --clb_pim_texto_tecnico,
                         --clb_pim_texto_tecnico2
                    FROM SIAOS.PROP_PERSONAL PP
                   WHERE PP.USU_CHAPA = n_chapa;
                EXCEPTION
                  WHEN OTHERS THEN
                  
                    SELECT --CP.CPR_TEXTO,
                           CP.CPR_TEXTO2
                           --CP.CPR_TEXTO_TECNICO,
                           --CP.CPR_TEXTO_TECNICO2
                      INTO --vc2_pim_texto,
                           vc2_pim_texto2
                           --clb_pim_texto_tecnico,
                           --clb_pim_texto_tecnico2
                      FROM SIAOS.CONFIGURA_PROPOSTA CP;
                  
                END;
                
                
                
            UPDATE ORDERIN.CONTEUDO_IMP_PROP C
              SET CIP_TEXTO = vc2_pim_texto2
              WHERE TCO_CODIGO = 3 
                AND PRP_CODIGO = n_proposta;
                
                */
            /*
              INSERT INTO SIAOS.PROPOSTA_REV
                (PRP_CODIGO,
                 PRR_CODIGO,
                 PRR_SET,
                 FIL_CODIGO,
                 IDI_CODIGO_MANUAL,
                 CLI_CODIGO,
                 CLI_CODIGO_FIM,
                 IFI_CODIGO,
                 PRR_COB_CODIGO,
                 PRR_REAJUSTE,
                 PRR_DT_REAJUSTE,
                 PRR_MULTA,
                 PRR_FINAME,
                 PRR_TRANSPORTE,
                 PRR_EMB_CODIGO,
                 PRR_CARTA_FIANCA,
                 PRR_SEG_FIANCA,
                 PRR_NOTA_PROM,
                 PRR_DESTINO,
                 PRR_PEDIDO,
                 PRR_PARCIAL,
                 PRR_ANTECIPA,
                 PRR_ENGENHARIA,
                 PRR_INSP_EXTERNA,
                 PRR_DT_INSP,
                 PRR_OBS,
                 PRR_NOTA,
                 PRR_IPI,
                 PRR_ICMS,
                 PRR_ISS,
                 PRR_DT_PEDIDO,
                 PRR_NOTAFISCAL,
                 ORI_CODIGO,
                 USU_CHAPA,
                 PRR_CONFIRMA,
                 PRR_PORC_PRODUTO,
                 PRR_PEDIDO_RECEBIDO,
                 PRR_DESENHO_APR,
                 PRR_DESENHO_CER,
                 PRR_EMBALAGEM,
                 PRR_VL_EMBALAGEM,
                 PRR_SUBSIDIARIA,
                 PRR_REPR_DIRETO,
                 PRR_REPR_INDIRETO,
                 PRR_FORWARDER,
                 PRR_PORTO_EMB,
                 PRR_PORTO_DEST,
                 PRR_HA_INVOICE,
                 PRR_COMISSAO_SUBS,
                 PST_CODIGO,
                 PRR_CAMBIO,
                 PRR_TIPO_FATUR,
                 PRR_DOCUM_CERTIF,
                 PRR_TEXTO,
                 PRR_TEXTO2,
                 PRR_TXT_INTRO,
                 PRR_TEXTO_TECNICO,
                 PRR_TEXTO_TECNICO2,
                 PRR_CONS_FINAL)
              VALUES
                (cur_prop.PRP_CODIGO,
                 n_rev,
                 n_set,
                 cur_prop.FIL_CODIGO,
                 cur_prop.IDI_CODIGO_MANUAL,
                 cur_prop.CLI_CODIGO,
                 cur_prop.CLI_CODIGO_FIM,
                 cur_prop.IFI_CODIGO,
                 cur_prop.PRP_COB_CODIGO,
                 cur_prop.PRP_REAJUSTE,
                 cur_prop.PRP_DT_REAJUSTE,
                 cur_prop.PRP_MULTA,
                 cur_prop.PRP_FINAME,
                 cur_prop.PRP_TRANSPORTE,
                 cur_prop.PRP_EMB_CODIGO,
                 cur_prop.PRP_CARTA_FIANCA,
                 cur_prop.PRP_SEG_FIANCA,
                 cur_prop.PRP_NOTA_PROM,
                 cur_prop.PRP_DESTINO,
                 cur_prop.PRP_PEDIDO,
                 cur_prop.PRP_PARCIAL,
                 cur_prop.PRP_ANTECIPA,
                 cur_prop.PRP_ENGENHARIA,
                 cur_prop.PRP_INSP_EXTERNA,
                 cur_prop.PRP_DT_INSP,
                 cur_prop.PRP_OBS,
                 cur_prop.PRP_NOTA,
                 cur_prop.PRP_IPI,
                 cur_prop.PRP_ICMS,
                 cur_prop.PRP_ISS,
                 cur_prop.PRP_DT_PEDIDO,
                 cur_prop.PRP_NOTAFISCAL,
                 cur_prop.ORI_CODIGO,
                 cur_prop.USU_CHAPA,
                 cur_prop.PRP_CONFIRMA,
                 cur_prop.PRP_PORC_PRODUTO,
                 cur_prop.PRP_PEDIDO_RECEBIDO,
                 cur_prop.PRP_DESENHO_APR,
                 cur_prop.PRP_DESENHO_CER,
                 cur_prop.PRP_EMBALAGEM,
                 cur_prop.PRP_VL_EMBALAGEM,
                 cur_prop.PRP_SUBSIDIARIA,
                 cur_prop.PRP_REPR_DIRETO,
                 cur_prop.PRP_REPR_INDIRETO,
                 cur_prop.PRP_FORWARDER,
                 cur_prop.PRP_PORTO_EMB,
                 cur_prop.PRP_PORTO_DEST,
                 cur_prop.PRP_HA_INVOICE,
                 cur_prop.PRP_COMISSAO_SUBS,
                 cur_prop.PST_CODIGO,
                 cur_prop.PRP_CAMBIO,
                 cur_prop.PRP_TIPO_FATUR,
                 cur_prop.PRP_DOCUM_CERTIF,
                 vc2_pim_texto,
                 vc2_pim_texto2,
                 clb_pim_txt_intro,
                 clb_pim_texto_tecnico,
                 clb_pim_texto_tecnico2,
                 clb_pim_cons_final);
            
              FOR cur_item IN (SELECT IPR_CODIGO,
                                      PRP_CODIGO,
                                      PRO_CODIGO,
                                      IPR_ITEM_PROP,
                                      IPR_ITEM,
                                      IPR_CLASSE,
                                      IPR_PRECO,
                                      IPR_VENDA_FIM,
                                      IPR_VENDA_CLI,
                                      IPR_ADICIONAL,
                                      IPR_QUANTIDADE,
                                      IPR_DESC_FIM,
                                      IPR_DESC_CLI,
                                      IPR_PEDIDO,
                                      IPR_ANTECIPA,
                                      IPR_FATURA,
                                      IPR_IPI,
                                      IPR_ICMS,
                                      IPR_ISS,
                                      IPR_DT_ENTREGA,
                                      IPR_APNF,
                                      IPR_OBS,
                                      IPR_SELO_LADO,
                                      IPR_COD_TR,
                                      IPR_SEMANA_ENT,
                                      IPR_DT_PEDIDO,
                                      IPR_CONS_PRAZO,
                                      SENSOR,
                                      CONTROLE,
                                      IPR_DT_CONTRAT,
                                      IPR_PROP_FIL,
                                      IPR_OS_FIL,
                                      IPR_DIVERSOS,
                                      IPR_N_SERIE,
                                      IPR_NAO_FAB,
                                      IPR_STATUS_CONS,
                                      IPR_SEMAN_CONS,
                                      IPR_LOTE,
                                      IPR_COPIA,
                                      IPR_PESO_CONS,
                                      TIPO,
                                      IPR_REFUGO,
                                      IPR_OS_REV,
                                      IPR_ITEM_REV,
                                      IPR_PESO_ITEM,
                                      IPR_LINK_MANUAL,
                                      IPG_CODIGO,
                                      IPR_FOLHA,
                                      IPR_HOLD,
                                      IPR_POSICAO
                                 FROM SIAOS.ITEM_PROP
                                WHERE ITEM_PROP.PRP_CODIGO = n_proposta) LOOP
            
                INSERT INTO SIAOS.ITEM_P_REV
                  (IPV_CODIGO,
                   PRR_CODIGO,
                   PRR_SET,
                   PRP_CODIGO,
                   PRO_CODIGO,
                   IPV_ITEM_P_REV,
                   IPV_ITEM,
                   IPV_CLASSE,
                   IPV_PRECO,
                   IPV_VENDA_FIM,
                   IPV_VENDA_CLI,
                   IPV_ADICIONAL,
                   IPV_QUANTIDADE,
                   IPV_DESC_FIM,
                   IPV_DESC_CLI,
                   IPV_PEDIDO,
                   IPV_ANTECIPA,
                   IPV_FATURA,
                   IPV_IPI,
                   IPV_ICMS,
                   IPV_ISS,
                   IPV_DT_ENTREGA,
                   IPV_APNF,
                   IPV_OBS,
                   IPV_SELO_LADO,
                   IPV_COD_TR,
                   IPV_SEMANA_ENT,
                   IPV_DT_PEDIDO,
                   IPV_CONS_PRAZO,
                   SENSOR,
                   IPV_DT_CONTRAT,
                   IPV_PROP_FIL,
                   IPV_OS_FIL,
                   IPV_DIVERSOS,
                   IPV_N_SERIE,
                   IPV_NAO_FAB,
                   IPV_STATUS_CONS,
                   IPV_SEMAN_CONS,
                   IPV_LOTE,
                   IPV_COPIA,
                   IPV_PESO_CONS,
                   TIPO,
                   IPV_REFUGO,
                   IPV_OS_REV,
                   IPV_ITEM_REV,
                   IPV_PESO_ITEM,
                   IPG_CODIGO,
                   IPV_FOLHA,
                   IPV_HOLD,
                   IPV_POSICAO)
                VALUES
                  (cur_item.IPR_CODIGO,
                   n_rev,
                   n_set,
                   cur_item.PRP_CODIGO,
                   cur_item.PRO_CODIGO,
                   cur_item.IPR_ITEM_PROP,
                   cur_item.IPR_ITEM,
                   cur_item.IPR_CLASSE,
                   cur_item.IPR_PRECO,
                   cur_item.IPR_VENDA_FIM,
                   cur_item.IPR_VENDA_CLI,
                   cur_item.IPR_ADICIONAL,
                   cur_item.IPR_QUANTIDADE,
                   cur_item.IPR_DESC_FIM,
                   cur_item.IPR_DESC_CLI,
                   cur_item.IPR_PEDIDO,
                   cur_item.IPR_ANTECIPA,
                   cur_item.IPR_FATURA,
                   cur_item.IPR_IPI,
                   cur_item.IPR_ICMS,
                   cur_item.IPR_ISS,
                   cur_item.IPR_DT_ENTREGA,
                   cur_item.IPR_APNF,
                   cur_item.IPR_OBS,
                   cur_item.IPR_SELO_LADO,
                   cur_item.IPR_COD_TR,
                   cur_item.IPR_SEMANA_ENT,
                   cur_item.IPR_DT_PEDIDO,
                   cur_item.IPR_CONS_PRAZO,
                   cur_item.SENSOR,
                   cur_item.IPR_DT_CONTRAT,
                   cur_item.IPR_PROP_FIL,
                   cur_item.IPR_OS_FIL,
                   cur_item.IPR_DIVERSOS,
                   cur_item.IPR_N_SERIE,
                   cur_item.IPR_NAO_FAB,
                   cur_item.IPR_STATUS_CONS,
                   cur_item.IPR_SEMAN_CONS,
                   cur_item.IPR_LOTE,
                   cur_item.IPR_COPIA,
                   cur_item.IPR_PESO_CONS,
                   cur_item.TIPO,
                   cur_item.IPR_REFUGO,
                   cur_item.IPR_OS_REV,
                   cur_item.IPR_ITEM_REV,
                   cur_item.IPR_PESO_ITEM,
                   cur_item.IPG_CODIGO,
                   cur_item.IPR_FOLHA,
                   cur_item.IPR_HOLD,
                   cur_item.IPR_POSICAO);
            
                COMMIT;
            
                FOR cur_itda IN (SELECT IPR_CODIGO,
                                        NROCLAS,
                                        OPCLAS,
                                        IPD_TIPO,
                                        IPD_VALOR_DADO,
                                        IPD_VALOR,
                                        STATUS,
                                        IPD_DESCRICAO_P,
                                        IPD_DESCRICAO_I,
                                        IPD_CANCELA
                                   FROM SIAOS.ITEM_PROP_DADO
                                  WHERE ITEM_PROP_DADO.IPR_CODIGO =
                                        cur_item.IPR_CODIGO) LOOP
                  INSERT INTO SIAOS.ITEM_P_D_REV
                    (IPR_CODIGO,
                     PRR_CODIGO,
                     PRR_SET,
                     NROCLAS,
                     OPCLAS,
                     IDR_TIPO,
                     IDR_VALOR_DADO,
                     IDR_VALOR,
                     IDR_STATUS,
                     IDR_DESCRICAO_P,
                     IDR_DESCRICAO_I,
                     IDR_CANCELA)
                  VALUES
                    (cur_itda.IPR_CODIGO,
                     n_rev,
                     n_set,
                     cur_itda.NROCLAS,
                     cur_itda.OPCLAS,
                     cur_itda.IPD_TIPO,
                     cur_itda.IPD_VALOR_DADO,
                     cur_itda.IPD_VALOR,
                     cur_itda.STATUS,
                     cur_itda.IPD_DESCRICAO_P,
                     cur_itda.IPD_DESCRICAO_I,
                     cur_itda.IPD_CANCELA);
                END LOOP;
            
              END LOOP;
            
              FOR cur_pgto IN (SELECT PRP_CODIGO,
                                      PPA_CODIGO,
                                      FPA_CODIGO,
                                      PPA_TIPO,
                                      PPA_VALOR,
                                      PPA_PORCENTO,
                                      PPA_DATA,
                                      PPA_DIAS
                                 FROM SIAOS.PROP_PAGTO
                                WHERE PROP_PAGTO.PRP_CODIGO = n_proposta) LOOP
            
                INSERT INTO SIAOS.PROP_PAG_REV
                  (PRP_CODIGO,
                   PRR_CODIGO,
                   PRR_SET,
                   PPR_CODIGO,
                   FPA_CODIGO,
                   PPR_TIPO,
                   PPR_VALOR,
                   PPR_PORCENTO,
                   PPR_DATA,
                   PPR_DIAS)
                VALUES
                  (n_proposta,
                   n_rev,
                   n_set,
                   cur_pgto.PPA_CODIGO,
                   cur_pgto.FPA_CODIGO,
                   cur_pgto.PPA_TIPO,
                   cur_pgto.PPA_VALOR,
                   cur_pgto.PPA_PORCENTO,
                   cur_pgto.PPA_DATA,
                   cur_pgto.PPA_DIAS);
              END LOOP;
            
              FOR cur_div IN (SELECT ITEM_PROP_DIV.PRP_CODIGO,
                                     ITEM_PROP_DIV.IPR_ITEM_PROP,
                                     ITEM_PROP_DIV.IPI_CODIGO,
                                     ITEM_PROP_DIV.IPI_DESCRICAO
                                FROM SIAOS.ITEM_PROP_DIV
                               WHERE ITEM_PROP_DIV.PRP_CODIGO = n_proposta) LOOP
            
                INSERT INTO SIAOS.ITEM_PROP_DIV_REV
                  (PRP_CODIGO,
                   PRR_CODIGO,
                   PRR_SET,
                   IPR_ITEM_PROP,
                   IDR_CODIGO,
                   IDR_DESCRICAO)
                VALUES
                  (n_proposta,
                   n_rev,
                   n_set,
                   cur_div.IPR_ITEM_PROP,
                   cur_div.IPI_CODIGO,
                   cur_div.IPI_DESCRICAO);
              END LOOP;
            
              FOR cur_det IN (SELECT ITEM_PROP_UNI.IPR_ITEM_PROP,
                                     ITEM_PROP_UNI.IPU_DETALHE,
                                     ITEM_PROP_UNI.IPU_DATA,
                                     ITEM_PROP_UNI.IPU_VALOR_COTADO,
                                     ITEM_PROP_UNI.PAS_CODIGO,
                                     ITEM_PROP_UNI.IPU_STATUS_PRECO,
                                     ITEM_PROP_UNI.IPU_OCULTO,
                                     ITEM_PROP_UNI.IPU_OCULTA_QTD,
                                     ITEM_PROP_UNI.CCF,
                                     ITEM_PROP_UNI.IPR_ITEM_PAI
                                FROM SIAOS.ITEM_PROP_UNI
                               WHERE ITEM_PROP_UNI.PRP_CODIGO = n_proposta) LOOP
            
                INSERT INTO SIAOS.ITEM_PROP_UNI_REV
                  (PRP_CODIGO,
                   PRR_CODIGO,
                   PRR_SET,
                   IPR_ITEM_PROP,
                   IUR_DETALHE,
                   IPU_DATA,
                   IPU_VALOR_COTADO,
                   PAS_CODIGO,
                   IPU_STATUS_PRECO,
                   IPU_OCULTO,
                   IPU_OCULTA_QTD,
                   CCF,
                   IPU_ITEM_PAI)
                VALUES
                  (n_proposta,
                   n_rev,
                   n_set,
                   cur_det.IPR_ITEM_PROP,
                   cur_det.IPU_DETALHE,
                   cur_det.IPU_DATA,
                   cur_det.IPU_VALOR_COTADO,
                   cur_det.PAS_CODIGO,
                   cur_det.IPU_STATUS_PRECO,
                   cur_det.IPU_OCULTO,
                   cur_det.IPU_OCULTA_QTD,
                   cur_det.CCF,
                   cur_det.IPR_ITEM_PAI);
              END LOOP;
            
              FOR cur_cont IN (SELECT PRP_CODIGO,
                                      COP_NUMERO,
                                      COP_TIPO,
                                      COP_NOME,
                                      COP_CARGO,
                                      COP_DEPARTAMENTO,
                                      COP_FONE,
                                      COP_CELULAR,
                                      COP_EMAIL,
                                      COP_FAX,
                                      COP_TEMP
                                 FROM CONTATO_PROP
                                WHERE PRP_CODIGO = n_proposta) LOOP
            
                INSERT INTO CONTATO_PROP_REV
                  (PRP_CODIGO,
                   PRR_CODIGO,
                   COP_NUMERO,
                   COP_TIPO,
                   COP_NOME,
                   COP_CARGO,
                   COP_DEPARTAMENTO,
                   COP_FONE,
                   COP_CELULAR,
                   COP_EMAIL,
                   COP_FAX,
                   COP_TEMP)
                VALUES
                  (n_proposta,
                   n_rev,
                   cur_cont.COP_NUMERO,
                   cur_cont.COP_TIPO,
                   cur_cont.COP_NOME,
                   cur_cont.COP_CARGO,
                   cur_cont.COP_DEPARTAMENTO,
                   cur_cont.COP_FONE,
                   cur_cont.COP_CELULAR,
                   cur_cont.COP_EMAIL,
                   cur_cont.COP_FAX,
                   cur_cont.COP_TEMP);
            
              END LOOP;
            
              FOR cur_cli IN (SELECT PRP_CODIGO,
                                     CTE_NOME,
                                     CTE_ENDERECO1,
                                     CTE_ENDERECO2,
                                     CTE_ENDERECO3,
                                     CTE_CIDADE,
                                     EST_CODIGO,
                                     CTE_ESTADO,
                                     PAI_CODIGO,
                                     CTE_CEP,
                                     CTE_TELEFONE,
                                     CTE_FAX,
                                     CTE_EMAIL,
                                     CTE_CGC,
                                     CTE_IE
                                FROM CLIENTE_TEMP
                               WHERE PRP_CODIGO = n_proposta) LOOP
                INSERT INTO CLIENTE_TEMP_REV
                  (PRP_CODIGO,
                   PRR_CODIGO,
                   CTE_NOME,
                   CTE_ENDERECO1,
                   CTE_ENDERECO2,
                   CTE_ENDERECO3,
                   CTE_CIDADE,
                   EST_CODIGO,
                   CTE_ESTADO,
                   PAI_CODIGO,
                   CTE_CEP,
                   CTE_TELEFONE,
                   CTE_FAX,
                   CTE_EMAIL,
                   CTE_CGC,
                   CTE_IE)
                VALUES
                  (n_proposta,
                   n_rev,
                   cur_cli.CTE_NOME,
                   cur_cli.CTE_ENDERECO1,
                   cur_cli.CTE_ENDERECO2,
                   cur_cli.CTE_ENDERECO3,
                   cur_cli.CTE_CIDADE,
                   cur_cli.EST_CODIGO,
                   cur_cli.CTE_ESTADO,
                   cur_cli.PAI_CODIGO,
                   cur_cli.CTE_CEP,
                   cur_cli.CTE_TELEFONE,
                   cur_cli.CTE_FAX,
                   cur_cli.CTE_EMAIL,
                   cur_cli.CTE_CGC,
                   cur_cli.CTE_IE);
            
              END LOOP;
            
              COMMIT;
            */
          EXCEPTION WHEN OTHERS THEN
              NULL;
          END;
        
          IF NVL(n_is_set, 0) = 0 THEN
            n_rev := n_rev + 1;
          END IF;
        
          IF n_is_set IS NULL THEN
            n_pst_codigo := 2;
          ELSE
            n_set        := n_set;
            n_pst_codigo := 5;
          END IF;
        
          UPDATE SIAOS.PROPOSTA
             SET PRP_REVISAO = n_rev, 
                 PRP_SET = n_set, 
                 PST_CODIGO = n_pst_codigo
           WHERE PRP_CODIGO = n_proposta;
        
          COMMIT;
        
        END IF;
      
      END LOOP;
      
     BEGIN
      
        FOR c_teste IN (SELECT P.PRP_CODIGO, IP.IPR_ITEM_PROP
                          FROM SIAOS.PROPOSTA P
                         INNER JOIN SIAOS.ITEM_PROP IP
                            ON IP.PRP_CODIGO = P.PRP_CODIGO
                         WHERE P.PRP_CODIGO = n_proposta) 
        LOOP
          PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(c_teste.PRP_CODIGO,
                                                   c_teste.IPR_ITEM_PROP,
                                                   n_preco);
        END LOOP;
      EXCEPTION WHEN OTHERS THEN
        NULL;  
      END;
    END IF;
  
  EXCEPTION WHEN OTHERS THEN
      ROLLBACK;
  END SP_SALVA_REVISAO;

  -----------------------------------------------------------------------------
  -----------   ALTERA STATUS DA PRE-OS PARA ENVIO DE PROPOSTA      -----------
  -----------------------------------------------------------------------------
  PROCEDURE SP_TRAVA_REVISAO(n_proposta IN INTEGER, n_chapa IN INTEGER) IS
  
    v_recado      VARCHAR2(2000);
    v_recado2     VARCHAR2(2000);
    n_prp_revisao SIAOS.PROPOSTA.PRP_REVISAO%TYPE;
    n_prp_set     SIAOS.PROPOSTA.PRP_SET%TYPE;
    n_usu_chapa   SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_erro        INTEGER;
  
  BEGIN
  
    FOR cur_pend IN (SELECT PRE_CODIGO, PNU_NUMERO, PEN_NUMERO
                       FROM SIAOS.PROP_RECADO
                      WHERE PROP_RECADO.PRP_CODIGO = n_proposta
                        AND PROP_RECADO.TRE_CODIGO IN (8, 14)
                        AND PROP_RECADO.PRE_DT_BAIXA IS NULL) LOOP
    
      IF cur_pend.PNU_NUMERO IS NOT NULL THEN
        SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(cur_pend.PNU_NUMERO,
                                            cur_pend.PEN_NUMERO);
      END IF;
    
      UPDATE SIAOS.PROP_RECADO
         SET PRE_DT_BAIXA = SYSDATE
       WHERE PRE_CODIGO = cur_pend.PRE_CODIGO
         AND PRP_CODIGO = n_proposta;
    
    END LOOP;
  
    UPDATE SIAOS.PROPOSTA
       SET PST_CODIGO  = 4,
           PRP_DT_PROB = DECODE(PRP_DT_PROB,
                                NULL,
                                TO_CHAR(SYSDATE + 30),
                                PRP_DT_PROB)
     WHERE PRP_CODIGO = n_proposta;
  
    SELECT 'APROVAÇÃO DA PROPOSTA:' || PRP_CODIGO || '-' || PRP_REVISAO || '/' ||
           PRP_SET,
           PRP_REVISAO,
           PRP_SET
      INTO v_recado, n_prp_revisao, n_prp_set
      FROM PROPOSTA
     WHERE PRP_CODIGO = n_proposta;
  
    v_recado2 := 'AGENDAMENTO AUTOMÁTICO DE FOLLOW UP, PROPOSTA: ' ||
                 n_proposta || '.';
    /*
    TODO: owner="juliano" category="Fix" priority="1 - High" created="17/06/2022" closed="07/11/2022"
    text="Pau no banco"
    */
      
      INSERT INTO PROP_ARQ_HIST
        (PRP_CODIGO, PRP_REVISAO, PRP_SET, PIM_TIPO)
      VALUES
        (n_proposta, n_prp_revisao, n_prp_set, 'MC');
    
      INSERT INTO PROP_ARQ_HIST
        (PRP_CODIGO, PRP_REVISAO, PRP_SET, PIM_TIPO)
      VALUES
        (n_proposta, n_prp_revisao, n_prp_set, 'C');
    
    SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1,
                                           NULL,
                                           n_proposta,
                                           7,
                                           v_recado,
                                           NULL,
                                           n_erro);
  
    BEGIN
      SELECT DECODE(USUARIO.USU_EMAIL,
                    NULL,
                    USU_P.USU_CHAPA,
                    USUARIO.USU_CHAPA) USU_CHAPA
        INTO n_usu_chapa
        FROM PROPOSTA
        LEFT JOIN VENDEDOR_PROP
          ON PROPOSTA.PRP_CODIGO = VENDEDOR_PROP.PRP_CODIGO
        LEFT JOIN ARSALESP
          ON VENDEDOR_PROP.SALESP_KEY = ARSALESP.SALESP_KEY
        LEFT JOIN USUARIO
          ON ARSALESP.USU_CHAPA = USUARIO.USU_CHAPA
       INNER JOIN USUARIO USU_P
          ON USU_P.USU_CHAPA = PROPOSTA.USU_CHAPA
       WHERE NVL(VENDEDOR_PROP.VPR_CODIGO, 1) = 1
         AND PROPOSTA.PRP_CODIGO = n_proposta;
    EXCEPTION
      WHEN OTHERS THEN
        SELECT U.USU_CHAPA
          INTO n_usu_chapa
          FROM USUARIO U
         WHERE UPPER(U.USU_LOGINWEB) = UPPER(USER);
    END;
  
    SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1,
                                           NULL,
                                           n_proposta,
                                           14,
                                           v_recado2,
                                           TO_CHAR(GERAL.SF_PROX_DATA_UTIL(SYSDATE,
                                                                           5,
                                                                           1),
                                                   'DD/MM/YYYY HH24:MI'),
                                           n_usu_chapa,
                                           n_erro);
  
    --SIAOS.PCK_SMART_SALES3.SP_STATUS_CLI(n_proposta, 'P');
  
    COMMIT;
  
  END SP_TRAVA_REVISAO;

  -----------------------------------------------------------------------------
  ------------------      RETRONA SE PROPOSTA ESTA BLOQUEADA      -------------
  -----------------------------------------------------------------------------
  FUNCTION SF_BLOQUEIA_PROP(n_proposta IN INTEGER) RETURN INTEGER IS
  
    n_os      INTEGER;
    n_bloq    INTEGER := 0; -- 1 TOTAL, 2 PARCIAL
  
  BEGIN
  
    SELECT P.ORDER_NO, 
           PS.PST_BLOQUEIO
      INTO n_os, 
           n_bloq
      FROM SIAOS.PROPOSTA P
     INNER JOIN SIAOS.PROP_STATUS PS ON PS.PST_CODIGO = P.PST_CODIGO
     WHERE P.PRP_CODIGO = n_proposta;
  
    IF n_os IS NOT NULL THEN
    
      n_bloq := 1;
    
    ELSIF n_bloq = 1 THEN
    
      n_bloq := 2;
    
    ELSIF n_bloq = 2 THEN
    
      n_bloq := 3;
    
    END IF;
  
    RETURN n_bloq;
    
  EXCEPTION WHEN OTHERS THEN
    RETURN n_bloq;
  END SF_BLOQUEIA_PROP;

  -----------------------------------------------------------------------------
  -----------   ALTERA STATUS DA PRE-OS PARA ENVIO DE PROPOSTA      -----------
  -----------------------------------------------------------------------------
  PROCEDURE SP_CANCELA_PROPOSTA(n_proposta IN INTEGER,
                                n_chapa    IN INTEGER,
                                n_motivo   IN INTEGER,
                                v_recado   IN VARCHAR2) IS
  
    n_tipo       INTEGER;
    n_status     INTEGER;
    n_rev        INTEGER;
    n_erro       INTEGER;
    n_pre_codigo SIAOS.PROP_RECADO.PRE_CODIGO%TYPE;
    v_usu_nome   SIAOS.USUARIO.USU_NOME%TYPE;
    v_mot_desc1  SIAOS.MOTIVO.MOT_DESCRICAO%TYPE;
    v_mot_desc2  SIAOS.MOTIVO.MOT_DESCRICAO%TYPE;
    v_recado2    VARCHAR2(2000);
  
  BEGIN
  
    SELECT MAX(R.PRE_CODIGO) PRE_CODIGO
      INTO n_pre_codigo
      FROM SIAOS.PROP_RECADO R, SIAOS.PROPOSTA P
     WHERE R.PRP_CODIGO = n_proposta
       AND R.TRE_CODIGO = 4
       AND R.MOT_CODIGO IS NOT NULL
       AND R.PRP_CODIGO = P.PRP_CODIGO
       AND P.PST_CODIGO = 3;
  
    IF n_pre_codigo IS NOT NULL THEN
    
      SELECT USU_NOME
        INTO v_usu_nome
        FROM SIAOS.USUARIO U
       WHERE UPPER(U.USU_LOGINWEB) = UPPER(USER);
    
      SELECT M.MOT_DESCRICAO
        INTO v_mot_desc1
        FROM SIAOS.MOTIVO M
       WHERE M.MOT_CODIGO = n_motivo;
    
      BEGIN
        SELECT M.MOT_DESCRICAO
          INTO v_mot_desc2
          FROM SIAOS.PROP_RECADO R
         INNER JOIN SIAOS.MOTIVO M
            ON M.MOT_CODIGO = R.MOT_CODIGO
         WHERE R.PRE_CODIGO = n_pre_codigo;
      EXCEPTION
        WHEN OTHERS THEN
          v_mot_desc2 := 'NÃO CONSTA';
      END;
    
      UPDATE SIAOS.PROP_RECADO
         SET MOT_CODIGO   = n_motivo,
             PRE_MENSAGEM = DECODE(v_recado,
                                   NULL,
                                   PRE_MENSAGEM,
                                   PRE_MENSAGEM || CHR(10) || CHR(10) ||
                                   'Alterado por: ' || v_usu_nome || '(' ||
                                   TO_CHAR(SYSDATE, 'DD/MM/YYYY') || ').' ||
                                   CHR(10) || v_recado || CHR(10) || ' De:' ||
                                   v_mot_desc2 || ' Para:' || v_mot_desc1 ||
                                   CHR(10))
       WHERE PRP_CODIGO = n_proposta
         AND TRE_CODIGO = 4;
    
    ELSE
    
      SELECT ORIGEM.TOR_CODIGO, PROPOSTA.PST_CODIGO, PROPOSTA.PRP_REVISAO
        INTO n_tipo, n_status, n_rev
        FROM SIAOS.PROPOSTA, SIAOS.ORIGEM
       WHERE ORIGEM.ORIGEM = PROPOSTA.ORI_CODIGO
         AND PROPOSTA.PRP_CODIGO = n_proposta;
      /*
            IF n_status != 4 THEN
              SIAOS.PCK_SMART_SALES3.SP_TRAVA_REVISAO(n_proposta, n_chapa);
            END IF;
      */
      UPDATE SIAOS.PROPOSTA
         SET PST_CODIGO      = 3,
             PRP_STATUS_CONS = NULL,
             PRP_STATUS_FSVC = NULL,
             PRP_STATUS_IQV  = NULL
       WHERE PRP_CODIGO = n_proposta;
    
      IF v_recado IS NULL THEN
        v_recado2 := 'CANCELADA/CANCELLED';
      ELSE
        v_recado2 := v_recado;
      END IF;
    
      INSERT INTO SIAOS.PROP_RECADO
        (PRP_CODIGO,
         TRE_CODIGO,
         USU_CHAPA,
         PRE_MENSAGEM,
         MOT_CODIGO,
         PRE_DT_BAIXA,
         PRP_REVISAO)
      VALUES
        (n_proposta, 4, n_chapa, v_recado2, n_motivo, SYSDATE, n_rev);
    
      IF n_tipo = 2 THEN
      
        DELETE FROM SIAOS.ITEM_PROP
         WHERE ITEM_PROP.PRP_CODIGO = n_proposta;
      
      END IF;
    
      FOR cur_pend IN (SELECT PNU_NUMERO, PEN_NUMERO
                         FROM SIAOS.PROP_RECADO
                        WHERE PROP_RECADO.PRP_CODIGO = n_proposta) LOOP
      
        SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(cur_pend.PNU_NUMERO,
                                            cur_pend.PEN_NUMERO);
      
      END LOOP;
    
      FOR cur_pend IN (SELECT PAS.PAS_CODIGO, PSE.USU_CHAPA_APR
                         FROM SIAOS.PROP_SET PSE
                        INNER JOIN SIAOS.PROP_AREA_SET PAS
                           ON PSE.PAS_CODIGO = PAS.PAS_CODIGO
                        WHERE PSE.PRP_CODIGO = n_proposta
                          AND PSE.PRP_SET =
                              (SELECT MAX(PS.PRP_SET)
                                 FROM SIAOS.PROP_SET PS
                                WHERE PS.PRP_CODIGO = PSE.PRP_CODIGO
                                  AND PS.SET_DATA_APR IS NULL)) LOOP
      
        SIAOS.PCK_SMART_SALES3.SP_CANCELA_SET(n_proposta,
                                              cur_pend.PAS_CODIGO,
                                              v_recado2,
                                              n_erro);
      
      END LOOP;
    
    END IF;
  
    UPDATE SIAOS.PROP_RECADO
       SET PRE_DT_BAIXA = SYSDATE
     WHERE PRP_CODIGO = n_proposta
       AND PRE_DT_ALARM IS NOT NULL;
  
    COMMIT;
  
  END SP_CANCELA_PROPOSTA;

  -----------------------------------------------------------------------------
  ----------------   RETORNA PRODUTO DO CODIGO MATERIAL PEÇA ------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_MP_PRODUTO(n_material IN SUPRIMENTO.MATERIAL_PECA.MPE_CODIGO%TYPE,
                         n_tipo     IN INTEGER) RETURN VARCHAR2 IS
  
    v_produto VARCHAR2(2000);
    v_item    VARCHAR2(2000);
    v_opcao   VARCHAR2(2000);
  
  BEGIN
  
    FOR cur_exp IN (SELECT PRODUTO, OPITEM, OPCLAS
                      FROM SIAOS.CONDICAO_EXPLOSAO
                     WHERE CONDICAO_EXPLOSAO.MPE_CODIGO = n_material
                     ORDER BY NROITEM, NROCLAS) LOOP
    
      v_produto := cur_exp.PRODUTO;
      v_item    := v_item || cur_exp.OPITEM;
      v_opcao   := v_opcao || cur_exp.OPCLAS;
    
    END LOOP;
  
    IF v_produto IS NOT NULL THEN
    
      RETURN SIAOS.PCK_WINPLAN.SF_MASCARA_DO_ITEM2(v_produto,
                                                   v_item,
                                                   v_opcao,
                                                   n_tipo);
    
    ELSE
    
      FOR cur_exp IN (SELECT PRODUTO
                        FROM SIAOS.PRODUTO_MATERIAL_PECA
                       WHERE PRODUTO_MATERIAL_PECA.MPE_CODIGO = n_material) LOOP
      
        v_produto := cur_exp.PRODUTO;
      
      END LOOP;
    
      RETURN SIAOS.PCK_WINPLAN.SF_MASCARA_DO_ITEM2(v_produto,
                                                   v_item,
                                                   v_opcao,
                                                   n_tipo);
    
    END IF;
  
  END SF_MP_PRODUTO;

  -----------------------------------------------------------------------------
  ------------------   RETORNA VALOR RESUMIDO DA PROPOSTA  --------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_VALOR_POR_TIPO(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_revisao  IN SIAOS.PROPOSTA.PRP_REVISAO%TYPE,
                             n_tipo     IN INTEGER) RETURN NUMBER IS
  
    -- TIPOS
    --   1-EQUIPAMENTO,
    -- 101-EQUIPAMENTO IMP. PROPOSTA,
    --   2-SOFTWARE,
    -- 102-SOFTWARE IMP. PROPOSTA,
    --   3-SERVIÇOS,
    -- 103-SERVIÇOS IMP. PROPOSTA,
    --   4-EMBALAGEM,
    --   5-INSPEÇÃO,
    --   6-TOTAL
    --   7-EQUIP DE TERCEIROS (MEMORIAL DE CALCULO)
    --   8-TOTAL IPI
    --   9-TOTAL ISS
    --  10-TOTAL ICMS
    --  11-TOTAL IMPOSTOS
    --  12-BASE DE CALCULO DO ICMS
    --  13-VALOR TOTAL LISTA ESTIMADO
    --  14-TOTAL IQV AVALIADO
    --  15-TOTAL VALOR LISTA PERSONALIZADA
    --  17-SOFTWARE DE TERCEIROS,
    --  18-CUSTO TOTAL
    --  19-COMISSÃO 3OS
    --  20-COMISSÃO TOTAL
    --  21-TOTAL VENDA LIQUIDO
    --  22-CUSTO TOTAL ITENS
    --  23-TOTAL DESPESAS
    --  24-TOTAL PIS
    --  25-TOTAL COFINS
    --  26-TOTAL PROPOSTA COM IMPOSTOS
    --  27-TOTAL ST
    --  28-BASE ICMS ST
    --  29-TOTAL FRETE
    --  30-TOTAL APNF
  
    v_valor     NUMBER(15, 4) := 0;
    v_valor2    NUMBER(15, 4) := 0;
    v_valor3    NUMBER(15, 4) := 0;
    v_valor4    NUMBER(15, 4) := 0;
    v_valor_emb NUMBER(15, 4) := 0;
    n_iqv       NUMBER(15, 4) := 0;
    n_custo_com NUMBER(15, 4) := 0;
    --     n_insp                 INTEGER;
    n_emb              INTEGER;
    n_prp_porc_produto SIAOS.PROPOSTA.PRP_PORC_PRODUTO%TYPE;
    n_prp_destino      SIAOS.PROPOSTA.PRP_DESTINO%TYPE;
    dt_prp_abertura    SIAOS.PROPOSTA.PRP_DT_ABERTURA%TYPE;
    n_prp_vl_frete     SIAOS.PROPOSTA.PRP_VL_FRETE%TYPE;
    c_est_sigla        GERAL.ESTADO.EST_SIGLA%TYPE;
  
  BEGIN
  
    SELECT P.PRP_PORC_PRODUTO,
           TRIM(P.PRP_DESTINO),
           P.PRP_DT_ABERTURA,
           NVL(P.PRP_VL_FRETE, 0) + NVL(PRP_VL_EMBALAGEM, 0),
           (SELECT E.EST_SIGLA
              FROM CLIENTE C
             INNER JOIN GERAL.ESTADO E
                ON E.EST_CODIGO = C.EST_CODIGO
             WHERE C.CODIGO = P.CLI_CODIGO)
      INTO n_prp_porc_produto,
           n_prp_destino,
           dt_prp_abertura,
           n_prp_vl_frete,
           c_est_sigla
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    IF n_prp_porc_produto > 0 THEN
    
      IF n_tipo = 1 THEN
        -- 1-EQUIPAMENTO,
      
        SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IP
         INNER JOIN CADBASICO.ITEM_NEGOCIO P
            ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
         INNER JOIN CADBASICO.FAMILIA_ITNEG F
            ON F.FIT_CODIGO = P.FIT_CODIGO
         WHERE F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
           AND IP.PRP_CODIGO = n_proposta
           AND F.FIT_SERVICO = 0
           AND IP.IPG_CODIGO NOT IN
               (SELECT IPG.IPG_CODIGO
                  FROM ITEM_PROP_GRUPO IPG
                 WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPG.IPG_NAO_SOMAR = 1);
      
      ELSIF n_tipo = 101 THEN
        -- 101-EQUIPAMENTO PROPOSTA,
      
        SELECT SUM(IPX.IPR_VENDA_CLI * IPX.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IPX
         WHERE (IPX.PRP_CODIGO, IPX.IPR_ITEM_PROP) IN
               (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 INNER JOIN CADBASICO.ITEM_NEGOCIO P
                    ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
                 INNER JOIN CADBASICO.FAMILIA_ITNEG F
                    ON F.FIT_CODIGO = P.FIT_CODIGO
                 WHERE F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
                   AND IP.PRP_CODIGO = n_proposta
                   AND IPU.IPR_ITEM_PAI IS NULL
                   AND F.FIT_SERVICO = 0
                   AND IP.IPG_CODIGO NOT IN
                       (SELECT IPG.IPG_CODIGO
                          FROM ITEM_PROP_GRUPO IPG
                         WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                           AND IPG.IPG_NAO_SOMAR = 1)
                UNION
                SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 WHERE (IP.PRP_CODIGO, IPU.IPR_ITEM_PAI) IN
                       (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
                          FROM SIAOS.ITEM_PROP IP2
                         INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
                            ON IPU2.PRP_CODIGO = IP2.PRP_CODIGO
                           AND IPU2.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                         INNER JOIN CADBASICO.ITEM_NEGOCIO P2
                            ON P2.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                         INNER JOIN CADBASICO.FAMILIA_ITNEG F2
                            ON F2.FIT_CODIGO = P2.FIT_CODIGO
                         WHERE F2.FIT_FAMILIA NOT IN
                               ('SW', 'SWT', 'PCLI', 'QM')
                           AND IP2.PRP_CODIGO = n_proposta
                           AND IPU2.IPR_ITEM_PAI IS NULL
                           AND F2.FIT_SERVICO = 0
                           AND IP2.IPG_CODIGO NOT IN
                               (SELECT IPG2.IPG_CODIGO
                                  FROM ITEM_PROP_GRUPO IPG2
                                 WHERE IPG2.PRP_CODIGO = IP.PRP_CODIGO
                                   AND IPG2.IPG_NAO_SOMAR = 1)));
      
      ELSIF n_tipo = 3 THEN
        -- 3-SERVIÇOS,
      
        SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IP
         INNER JOIN CADBASICO.ITEM_NEGOCIO P
            ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
         INNER JOIN CADBASICO.FAMILIA_ITNEG F
            ON F.FIT_CODIGO = P.FIT_CODIGO
         WHERE IP.PRP_CODIGO = n_proposta
           AND F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
           AND F.FIT_SERVICO = 1
           AND IP.IPG_CODIGO NOT IN
               (SELECT IPG.IPG_CODIGO
                  FROM ITEM_PROP_GRUPO IPG
                 WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPG.IPG_NAO_SOMAR = 1);
      
      ELSIF n_tipo = 103 THEN
        -- 103-SERVIÇO PROPOSTA,
      
        SELECT SUM(IPX.IPR_VENDA_CLI * IPX.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IPX
         WHERE (IPX.PRP_CODIGO, IPX.IPR_ITEM_PROP) IN
               (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 INNER JOIN CADBASICO.ITEM_NEGOCIO P
                    ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
                 INNER JOIN CADBASICO.FAMILIA_ITNEG F
                    ON F.FIT_CODIGO = P.FIT_CODIGO
                 WHERE F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
                   AND IP.PRP_CODIGO = n_proposta
                   AND IPU.IPR_ITEM_PAI IS NULL
                   AND F.FIT_SERVICO = 1
                   AND IP.IPG_CODIGO NOT IN
                       (SELECT IPG.IPG_CODIGO
                          FROM ITEM_PROP_GRUPO IPG
                         WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                           AND IPG.IPG_NAO_SOMAR = 1)
                UNION
                SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 WHERE (IP.PRP_CODIGO, IPU.IPR_ITEM_PAI) IN
                       (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
                          FROM SIAOS.ITEM_PROP IP2
                         INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
                            ON IPU2.PRP_CODIGO = IP2.PRP_CODIGO
                           AND IPU2.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                         INNER JOIN CADBASICO.ITEM_NEGOCIO P2
                            ON P2.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                         INNER JOIN CADBASICO.FAMILIA_ITNEG F2
                            ON F2.FIT_CODIGO = P2.FIT_CODIGO
                         WHERE F2.FIT_FAMILIA NOT IN
                               ('SW', 'SWT', 'PCLI', 'QM')
                           AND IP2.PRP_CODIGO = n_proposta
                           AND IPU2.IPR_ITEM_PAI IS NULL
                           AND F2.FIT_SERVICO = 1
                           AND IP2.IPG_CODIGO NOT IN
                               (SELECT IPG2.IPG_CODIGO
                                  FROM ITEM_PROP_GRUPO IPG2
                                 WHERE IPG2.PRP_CODIGO = IP.PRP_CODIGO
                                   AND IPG2.IPG_NAO_SOMAR = 1)));
      
      ELSIF n_tipo = 16 THEN
        -- 16-SERVIÇOS DE TERCEIROS,
      
        SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IP
         INNER JOIN PRODUTO P
            ON P.PRODUTO = IP.PRO_CODIGO
         INNER JOIN FAMILIA F
            ON F.CODIGO = P.FAMILIA
         WHERE IP.PRP_CODIGO = n_proposta
           AND P.FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
           AND F.FAM_EXIGCOT = 1
           AND P.FAMILIA IN (SELECT CODIGO FROM FAMILIA WHERE SERVICO = 1)
           AND IP.IPG_CODIGO NOT IN
               (SELECT IPG.IPG_CODIGO
                  FROM ITEM_PROP_GRUPO IPG
                 WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPG.IPG_NAO_SOMAR = 1);
      END IF;
    
    ELSE
    
      IF n_tipo = 1 THEN
        -- 1-EQUIPAMENTO,
      
        v_valor := 0;
      
      ELSIF n_tipo = 3 THEN
        -- 3-SERVIÇOS,
        /*
        SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM SIAOS.ITEM_PROP IP
         WHERE IP.IPR_CODIGO IN (SELECT IP2.IPR_CODIGO
                                   FROM ITEM_PROP IP2
                                  INNER JOIN SIAOS.ITEM_PROP_UNI IPU ON IPU.PRP_CODIGO = IP2.PRP_CODIGO
                                                                    AND IPU.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                                  INNER JOIN SIAOS.ITEM_PROP_GRUPO IPG ON IPG.PRP_CODIGO = IP2.PRP_CODIGO
                                                                      AND IPG.IPG_CODIGO = IP2.IPG_CODIGO
                                  INNER JOIN CADBASICO.ITEM_NEGOCIO P  ON P.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                                  INNER JOIN CADBASICO.FAMILIA_ITNEG F ON F.FIT_CODIGO = P.FIT_CODIGO
                                  INNER JOIN INTEGRACAO.CLASS_TES T ON T.CLT_RECNO = IPU.TES_RECNO
                                  WHERE IP2.PRP_CODIGO = n_proposta
                                    AND IPG.IPG_NAO_SOMAR = 0
                                    AND T.CLT_PRODUTO = 2
                                    AND P.INE_CODIGO != 'SERV_INSPE'
                                    AND F.FIT_FAMILIA NOT IN ('SW', 'SWT','PCLI','QM'));
        */
        SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IP
         INNER JOIN SIAOS.ITEM_PROP_UNI IPU
            ON IPU.PRP_CODIGO = IP.PRP_CODIGO
           AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
         INNER JOIN CADBASICO.ITEM_NEGOCIO P
            ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
         INNER JOIN CADBASICO.FAMILIA_ITNEG F
            ON F.FIT_CODIGO = P.FIT_CODIGO
         WHERE P.INE_CODIGO != 'SERV_INSPE'
           AND IP.PRP_CODIGO = n_proposta
           AND F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
           AND F.FIT_SERVICO = 1
           AND IP.IPG_CODIGO NOT IN
               (SELECT IPG.IPG_CODIGO
                  FROM ITEM_PROP_GRUPO IPG
                 WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPG.IPG_NAO_SOMAR = 1);
      
      ELSIF n_tipo = 103 THEN
        -- 103-SERVIÇO PROPOSTA,
      
        SELECT SUM(IPX.IPR_VENDA_CLI * IPX.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IPX
         WHERE (IPX.PRP_CODIGO, IPX.IPR_ITEM_PROP) IN
               (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 INNER JOIN CADBASICO.ITEM_NEGOCIO P
                    ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
                 INNER JOIN CADBASICO.FAMILIA_ITNEG F
                    ON F.FIT_CODIGO = P.FIT_CODIGO
                 WHERE F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
                   AND IP.PRP_CODIGO = n_proposta
                   AND IPU.IPR_ITEM_PAI IS NULL
                   AND F.FIT_SERVICO = 1
                   AND IP.IPG_CODIGO NOT IN
                       (SELECT IPG.IPG_CODIGO
                          FROM ITEM_PROP_GRUPO IPG
                         WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                           AND IPG.IPG_NAO_SOMAR = 1)
                UNION
                SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 WHERE (IP.PRP_CODIGO, IPU.IPR_ITEM_PAI) IN
                       (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
                          FROM SIAOS.ITEM_PROP IP2
                         INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
                            ON IPU2.PRP_CODIGO = IP2.PRP_CODIGO
                           AND IPU2.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                         INNER JOIN CADBASICO.ITEM_NEGOCIO P2
                            ON P2.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                         INNER JOIN CADBASICO.FAMILIA_ITNEG F2
                            ON F2.FIT_CODIGO = P2.FIT_CODIGO
                         WHERE F2.FIT_FAMILIA NOT IN
                               ('SW', 'SWT', 'PCLI', 'QM')
                           AND IP2.PRP_CODIGO = n_proposta
                           AND IPU2.IPR_ITEM_PAI IS NULL
                           AND F2.FIT_SERVICO = 1
                           AND IP2.IPG_CODIGO NOT IN
                               (SELECT IPG2.IPG_CODIGO
                                  FROM ITEM_PROP_GRUPO IPG2
                                 WHERE IPG2.PRP_CODIGO = IP.PRP_CODIGO
                                   AND IPG2.IPG_NAO_SOMAR = 1)));
      
      END IF;
    
    END IF;
  
    IF n_tipo = 2 THEN
      -- 2-SOFTWARE,
    
      SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP
       INNER JOIN SIAOS.ITEM_PROP_UNI IPU
          ON IPU.PRP_CODIGO = IP.PRP_CODIGO
         AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
       INNER JOIN CADBASICO.ITEM_NEGOCIO P
          ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
       INNER JOIN CADBASICO.FAMILIA_ITNEG F
          ON F.FIT_CODIGO = P.FIT_CODIGO
       WHERE IP.PRP_CODIGO = n_proposta
         AND F.FIT_FAMILIA IN ('SW', 'SWT')
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 102 THEN
      -- 103-SOFTWARE PROPOSTA,
    
      SELECT SUM(IPX.IPR_VENDA_CLI * IPX.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IPX
       WHERE (IPX.PRP_CODIGO, IPX.IPR_ITEM_PROP) IN
             (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                FROM SIAOS.ITEM_PROP IP
               INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                  ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
               INNER JOIN CADBASICO.ITEM_NEGOCIO P
                  ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
               INNER JOIN CADBASICO.FAMILIA_ITNEG F
                  ON F.FIT_CODIGO = P.FIT_CODIGO
               WHERE F.FIT_FAMILIA IN ('SW', 'SWT')
                 AND IP.PRP_CODIGO = n_proposta
                 AND IPU.IPR_ITEM_PAI IS NULL
                 AND IP.IPG_CODIGO NOT IN
                     (SELECT IPG.IPG_CODIGO
                        FROM ITEM_PROP_GRUPO IPG
                       WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                         AND IPG.IPG_NAO_SOMAR = 1)
              UNION
              SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                FROM SIAOS.ITEM_PROP IP
               INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                  ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
               WHERE (IP.PRP_CODIGO, IPU.IPR_ITEM_PAI) IN
                     (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
                        FROM SIAOS.ITEM_PROP IP2
                       INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
                          ON IPU2.PRP_CODIGO = IP2.PRP_CODIGO
                         AND IPU2.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                       INNER JOIN CADBASICO.ITEM_NEGOCIO P2
                          ON P2.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                       INNER JOIN CADBASICO.FAMILIA_ITNEG F2
                          ON F2.FIT_CODIGO = P2.FIT_CODIGO
                       WHERE F2.FIT_FAMILIA IN ('SW', 'SWT')
                         AND IP2.PRP_CODIGO = n_proposta
                         AND IPU2.IPR_ITEM_PAI IS NULL
                         AND IP2.IPG_CODIGO NOT IN
                             (SELECT IPG2.IPG_CODIGO
                                FROM ITEM_PROP_GRUPO IPG2
                               WHERE IPG2.PRP_CODIGO = IP.PRP_CODIGO
                                 AND IPG2.IPG_NAO_SOMAR = 1)));
    
    ELSIF n_tipo = 17 THEN
      -- 17-SOFTWARE DE TERCEIROS,
    
      SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO
       WHERE PRODUTO.PRODUTO = IP.PRO_CODIGO
         AND PRODUTO.FAMILIA = 'SWT'
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 4 THEN
      -- 4-EMBALAGEM
    
      SELECT NVL(P.PRP_VL_EMBALAGEM, 0) VALOR,
             NVL(P.PRP_EMBALAGEM, 0) PRP_EMBALAGEM
        INTO v_valor, n_emb
        FROM PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
    
      IF n_emb = 1 THEN
        v_valor := 0;
      END IF;
    
    ELSIF n_tipo = 5 THEN
      -- 5-INSPEÇÃO
    
      SELECT NVL(SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE), 0) VALOR
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.PRODUTO = 'SERV_INSPE'
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 6 THEN
      -- 6-TOTAL
    
      SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      /*
      SELECT NVL(P.PRP_VL_EMBALAGEM, 0) VALOR,
             NVL(P.PRP_EMBALAGEM, 0) PRP_EMBALAGEM
        INTO v_valor_emb, n_emb
        FROM PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
      */
      IF n_prp_vl_frete > 0 THEN
        v_valor := v_valor + n_prp_vl_frete;
      END IF;
    
    ELSIF n_tipo = 7 THEN
      -- 7 - EQUIP DE TERCEIROS (MEMORIAL DE CALCULO)
    
      SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P, FAMILIA F
       WHERE IP.PRO_CODIGO = P.PRODUTO
         AND P.FAMILIA = F.CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND F.FAM_EXIGCOT = 1
         AND IP.PRP_CODIGO = n_proposta
         AND F.SERVICO = 0
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 8 THEN
      -- 8 - TOTAL IPI
    
      SELECT SUM(T.IPR_QUANTIDADE * T.IPR_VENDA_CLI_IMP) IMP
        INTO v_valor
        FROM SIAOS.VW_ITENS_PROPOSTA T
       WHERE T.PRP_CODIGO = n_proposta
         AND T.FIT_CODIGO NOT IN (15, 75)
         AND T.IPR_VENDA_CLI > 0
         AND NVL(T.IPR_IPI, 0) > 0
         AND T.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = T.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
      /*
      SELECT SUM(ROUND(SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) * (IP.IPR_IPI / 100),2)) IPR_VENDA_CLI
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI','QM')
         AND IP.PRP_CODIGO = n_proposta
         AND NVL(IP.IPR_IPI, 0) > 0
         AND IP.IPG_CODIGO NOT IN (SELECT IPG.IPG_CODIGO
                                 FROM ITEM_PROP_GRUPO IPG
                                WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                                  AND IPG.IPG_NAO_SOMAR = 1)
       GROUP BY IP.IPR_IPI;
       */
    ELSIF n_tipo = 9 THEN
      -- 9 - TOTAL ISS
    
      SELECT SUM(ROUND((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                       (1 - (IP.IPR_ISS / 100))),
                       2) - SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE)) IPR_VENDA_CLI
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND NVL(IP.IPR_ISS, 0) > 0
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1)
       GROUP BY IP.IPR_ISS;
    
    ELSIF n_tipo = 10 THEN
      -- 10 - TOTAL ICMS
      v_valor2 := NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                               NULL,
                                                               6),
                      0);
    
      IF n_prp_destino = 'C' THEN
        -- ICMS PARA CONSUMO PRÓPRIO
        IF n_prp_vl_frete > 0 THEN
          SELECT --SUM((SUM((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100))) * IP.IPR_QUANTIDADE) + ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE)/v_valor2)*n_prp_vl_frete)) * (IP.IPR_ICMS / 100)) VALOR
           SUM(((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100)) *
               IP.IPR_QUANTIDADE) + ((IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
               v_valor2) * n_prp_vl_frete) *
               ((IP.IPR_ICMS * BASEICM) / 100)) VALOR
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           INNER JOIN INTEGRACAO.VW_TES SF
              ON SF.R_E_C_N_O_ = IPU.TES_RECNO
           WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
             AND IP.PRP_CODIGO = n_proposta
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1);
          --GROUP BY IP.IPR_ICMS;
        ELSE
          SELECT SUM((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100)) *
                     IP.IPR_QUANTIDADE) * ((IP.IPR_ICMS * BASEICM) / 100)) VALOR
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           INNER JOIN INTEGRACAO.VW_TES SF
              ON SF.R_E_C_N_O_ = IPU.TES_RECNO
           WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
             AND IP.PRP_CODIGO = n_proposta
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1);
          --GROUP BY IP.IPR_ICMS;
        END IF;
      ELSE
        -- ICMS PARA REVENDA
        IF n_prp_vl_frete > 0 THEN
          SELECT SUM((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) +
                     ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                     v_valor2) * n_prp_vl_frete)) *
                     ((IP.IPR_ICMS * BASEICM) / 100)) VALOR
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           INNER JOIN INTEGRACAO.VW_TES SF
              ON SF.R_E_C_N_O_ = IPU.TES_RECNO
           WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
             AND IP.PRP_CODIGO = n_proposta
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1)
           GROUP BY IP.IPR_ICMS, BASEICM;
        ELSE
          SELECT SUM((IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) *
                     ((IP.IPR_ICMS * BASEICM) / 100)) VALOR
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           INNER JOIN INTEGRACAO.VW_TES SF
              ON SF.R_E_C_N_O_ = IPU.TES_RECNO
           WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
             AND IP.PRP_CODIGO = n_proposta
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1);
          -- GROUP BY IP.IPR_ICMS;
        END IF;
      END IF;
    
    ELSIF n_tipo = 11 THEN
      -- 11 - TOTAL DOS IMPOSTOS
      /*
      v_valor2 := SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,n_revisao,6);
      SELECT SAP_PIS
        INTO v_valor_emb
        FROM SIAOS.SAPP;
      v_valor := (v_valor2 * (v_valor_emb/100));
      SELECT SAP_COFINS
        INTO v_valor_emb
        FROM SIAOS.SAPP;
      v_valor := v_valor + (v_valor2 * (v_valor_emb/100));
      */
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        8),
                               0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        9),
                               0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        10),
                               0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        24),
                               0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        25),
                               0);
    
    ELSIF n_tipo = 12 THEN
      -- 12 - ICMS incidente
    
      SELECT SUM((IP.IPR_VENDA_CLI * BASEICM) * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP
       INNER JOIN PRODUTO P
          ON P.PRODUTO = IP.PRO_CODIGO
       INNER JOIN ITEM_PROP_UNI IPU
          ON IPU.PRP_CODIGO = IP.PRP_CODIGO
         AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
       INNER JOIN INTEGRACAO.VW_TES SF
          ON SF.R_E_C_N_O_ = IPU.TES_RECNO
       WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND NVL(IP.IPR_ICMS, 0) > 0
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      IF n_prp_destino = 'C' THEN
        -- ICMS PARA CONSUMO PRÓPRIO
        v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                          n_revisao,
                                                                          8),
                                 0);
      END IF;
    
      v_valor := v_valor + n_prp_vl_frete;
    
    ELSIF n_tipo = 13 THEN
      -- 13 - Lista estimado
    
      SELECT SUM(SF_VL_LISTA_EST(IP.IPR_PRECO + IP.IPR_ADICIONAL,
                                 IPU.IPU_VALOR_COTADO,
                                 IP.IPR_VENDA_CLI,
                                 dt_prp_abertura) * IP.IPR_QUANTIDADE)
        INTO v_valor
        FROM ITEM_PROP IP
       INNER JOIN ITEM_PROP_UNI IPU
          ON IP.PRP_CODIGO = IPU.PRP_CODIGO
         AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
       INNER JOIN PRODUTO P
          ON P.PRODUTO = IP.PRO_CODIGO
       WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IPU.MSV_CODIGO IS NULL
         AND IP.PRP_CODIGO = n_proposta
         AND NVL(IP.IPR_PRECO, 0) + NVL(IP.IPR_ADICIONAL, 0) +
             NVL(IPU.IPU_VALOR_COTADO, 0) > 0
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 14 THEN
      -- 14-TOTAL IQV AVALIADO
    
      SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor_emb
        FROM ITEM_PROP IP, ITEM_PROP_UNI IPU, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND IP.PRP_CODIGO = IPU.PRP_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
         AND IP.PRP_CODIGO = n_proposta
         AND (NVL(IP.IPR_PRECO, 0) + NVL(IP.IPR_ADICIONAL, 0) +
             NVL(IPU.IPU_VALOR_COTADO, 0)) > 0
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      SELECT NVL(SUM((VP.VPR_COM_PADRAO / 100) * v_valor_emb), 0)
        INTO n_custo_com --v_valor_emb
        FROM SIAOS.VENDEDOR_PROP VP
       INNER JOIN SIAOS.ARSALESP V
          ON VP.SALESP_KEY = V.SALESP_KEY
       WHERE V.BCO_CODIGO = 7
         AND VP.PRP_CODIGO = n_proposta;
    
      v_valor := v_valor_emb - n_custo_com;
    
    ELSIF n_tipo = 15 THEN
      -- 15 - TOTAL LISTA PERSONALIZADA
    
      SELECT SUM(IP.IPR_VENDA_FIM * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      SELECT NVL(P.PRP_VL_EMBALAGEM, 0) VALOR,
             NVL(P.PRP_EMBALAGEM, 0) PRP_EMBALAGEM
        INTO v_valor_emb, n_emb
        FROM PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
    
      IF n_emb = 0 THEN
        v_valor := v_valor + v_valor_emb;
      END IF;
    
    ELSIF n_tipo = 18 THEN
      -- 18 - CUSTO TOTAL
    
      -- CUSTO EMBALAGEM
      v_valor := v_valor + NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        NULL,
                                                                        29),
                               0);
      -- CUSTO ITENS
      v_valor := v_valor + NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        NULL,
                                                                        22),
                               0);
      -- CUSTO IMPOSTOS
      v_valor := v_valor + NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        NULL,
                                                                        11),
                               0);
      -- CUSTO COMISSÃO 3OS
      v_valor := v_valor + NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        NULL,
                                                                        19),
                               0);
    
    ELSIF n_tipo = 19 THEN
      -- 19 - COMISSÃO 3OS
    
      -- 13-VALOR TOTAL LISTA ESTIMADO
      -- 14-TOTAL IQV AVALIADO
    
      SELECT NVL(SUM((VP.VPR_COM_PADRAO / 100)), 0)
        INTO n_custo_com --v_valor_emb
        FROM SIAOS.VENDEDOR_PROP VP
       INNER JOIN SIAOS.ARSALESP V
          ON VP.SALESP_KEY = V.SALESP_KEY
       WHERE V.BCO_CODIGO = 7
         AND VP.PRP_CODIGO = n_proposta;
    
      IF n_custo_com > 0 THEN
        v_valor := SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                            NULL,
                                                            6) *
                   n_custo_com;
      
        n_iqv := (SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                           NULL,
                                                           14) /
                 SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                           NULL,
                                                           13) -
                 n_custo_com) * 100;
      
        v_valor := ((SIAOS.PCK_SMART_SALES3.SF_PER_COMISSAO(n_iqv, SYSDATE) / 100) *
                   v_valor) + n_custo_com;
      ELSE
        v_valor := 0;
      END IF;
    
    ELSIF n_tipo = 20 THEN
      -- 20 - COMISSÃO TOTAL
    
      -- 13-VALOR TOTAL LISTA ESTIMADO
      -- 14-TOTAL IQV AVALIADO
      v_valor := SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                          NULL,
                                                          6);
    
      SELECT NVL(SUM((VP.VPR_COM_PADRAO / 100) * v_valor), 0)
        INTO n_custo_com --v_valor_emb
        FROM SIAOS.VENDEDOR_PROP VP
       INNER JOIN SIAOS.ARSALESP V
          ON VP.SALESP_KEY = V.SALESP_KEY
       WHERE VP.PRP_CODIGO = n_proposta;
    
      v_valor := v_valor - n_custo_com;
    
      BEGIN
        n_iqv := (SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                           NULL,
                                                           14) /
                 SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                           NULL,
                                                           13) -
                 n_custo_com) * 100;
      EXCEPTION
        WHEN OTHERS THEN
          n_iqv := 0;
      END;
      v_valor := ((SIAOS.PCK_SMART_SALES3.SF_PER_COMISSAO(n_iqv, SYSDATE) / 100) *
                 v_valor) + n_custo_com;
    
    ELSIF n_tipo = 21 THEN
      -- 21-TOTAL VENDA LIQUIDO
    
      SELECT SUM(SIAOS.SF_VLR_VENDA_LIQ(P.IFI_CODIGO,
                                        IP.IPR_IPI,
                                        IP.IPR_ICMS,
                                        IP.IPR_VENDA_CLI,
                                        IP.PRO_CODIGO) * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM PROPOSTA P
       INNER JOIN ITEM_PROP IP
          ON P.PRP_CODIGO = IP.PRP_CODIGO
       INNER JOIN PRODUTO P
          ON P.PRODUTO = IP.PRO_CODIGO
       WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 22 THEN
      -- 22 - CUSTO TOTAL ITENS
    
      SELECT SUM(I.IPR_QUANTIDADE * NVL(SIAOS.PCK_SMART_SALES3.SF_CUSTO_ITEM(I.PRP_CODIGO,
                                                                             I.IPR_ITEM_PROP),
                                        0)) VALOR
        INTO v_valor
        FROM ITEM_PROP I, PRODUTO P
       WHERE P.PRODUTO = I.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND I.PRP_CODIGO = n_proposta;
    
    ELSIF n_tipo = 23 THEN
      -- 23 - TOTAL DESPESAS
    
      SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP
       INNER JOIN PRODUTO P
          ON P.PRODUTO = IP.PRO_CODIGO
       INNER JOIN ITEM_PROP_UNI IU
          ON IP.PRP_CODIGO = IU.PRP_CODIGO
         AND IP.IPR_ITEM_PROP = IU.IPR_ITEM_PROP
       WHERE IP.PRP_CODIGO = n_proposta
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND (NVL(IP.IPR_PRECO, 0) + NVL(IP.IPR_ADICIONAL, 0) +
             NVL(IU.IPU_VALOR_COTADO, 0)) = 0
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 24 THEN
      -- 23 - TOTAL PIS
    
      SELECT SUM(DECODE(V.F4_PISBRUT,
                        2,
                        (T.IPR_QUANTIDADE * T.IPR_VENDA_CLI_IMP) +
                        T.IPR_VENDA_CLI,
                        0)) IMP_PIS
        INTO v_valor2
        FROM SIAOS.VW_ITENS_PROPOSTA T
       INNER JOIN INTEGRACAO.VW_TES2 V
          ON V.R_E_C_N_O_ = T.TES_RECNO
       WHERE T.PRP_CODIGO = n_proposta
         AND T.FIT_CODIGO NOT IN (15, 75)
         AND T.IPR_VENDA_CLI > 0
         AND T.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = T.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      SELECT NVL(SUM(ROUND((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                           (1 - (IP.IPR_ISS / 100))),
                           2)),
                 0) IPR_VENDA_CLI
        INTO v_valor3
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1)
       GROUP BY IP.IPR_ISS;
    
      v_valor4 := nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                               n_revisao,
                                                               27),
                      0);
    
      v_valor := v_valor2 + v_valor3 + v_valor4;
    
      SELECT v_valor * (S.SAP_PIS / 100) INTO v_valor FROM SIAOS.SAPP S;
    
    ELSIF n_tipo = 25 THEN
    
      -- 23 - TOTAL COFINS
      SELECT SUM(DECODE(V.F4_COFBRUT,
                        2,
                        (T.IPR_QUANTIDADE * T.IPR_VENDA_CLI_IMP) +
                        T.IPR_VENDA_CLI,
                        0)) IMP_COFINS
        INTO v_valor2
        FROM SIAOS.VW_ITENS_PROPOSTA T
       INNER JOIN INTEGRACAO.VW_TES2 V
          ON V.R_E_C_N_O_ = T.TES_RECNO
       WHERE T.PRP_CODIGO = n_proposta
         AND T.FIT_CODIGO NOT IN (15, 75)
         AND T.IPR_VENDA_CLI > 0
         AND T.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = T.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      SELECT NVL(SUM(ROUND((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                           (1 - (IP.IPR_ISS / 100))),
                           2)),
                 0) IPR_VENDA_CLI
        INTO v_valor3
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1)
       GROUP BY IP.IPR_ISS;
    
      v_valor4 := nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                               n_revisao,
                                                               27),
                      0);
    
      v_valor := v_valor2 + v_valor3 + v_valor4;
    
      SELECT v_valor * (S.SAP_COFINS / 100) INTO v_valor FROM SIAOS.SAPP S;
    
    ELSIF n_tipo = 26 THEN
      -- 23 - TOTAL PROPOSTA COM IMPOSTOS
    
      v_valor := nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                              n_revisao,
                                                              6),
                     0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        8),
                               0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        9),
                               0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        27),
                               0);
    
    ELSIF n_tipo = 27 THEN
      -- 12 - ICMS incidente
      IF n_prp_destino = 'R' OR n_prp_destino = 'S' THEN
        v_valor2 := NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                 NULL,
                                                                 6),
                        0);
      
        -- ICMS PARA CONSUMO PRÓPRIO
        BEGIN
          SELECT SUM(X.VAL * (X.ICMSIN / 100) - (X.VT * (IPR_ICMS / 100)))
            INTO v_valor
            FROM (SELECT SUM((DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                             (1 + (IP.IPR_IPI / 100))) * IP.IPR_QUANTIDADE) +
                         ((SUM(DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                               IP.IPR_QUANTIDADE) / v_valor2) *
                          n_prp_vl_frete) +
                         SUM((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100))) *
                             IP.IPR_QUANTIDADE * (IPU.IPU_PER_ST / 100)) +
                         ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE *
                               (IPU.IPU_PER_ST / 100)) / v_valor2) *
                          n_prp_vl_frete) VAL,
                         SUM((DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                             (1 + (IP.IPR_IPI / 100))) * IP.IPR_QUANTIDADE) +
                         ((SUM(DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                               IP.IPR_QUANTIDADE) / v_valor2) *
                          n_prp_vl_frete) DDD,
                         IPU.IPU_NCM,
                         DECODE(c_est_sigla,
                                'SP',
                                (SELECT T.F7_ALIQINT
                                   FROM PROTPROD.SF7010 T
                                  WHERE F7_TIPOCLI = 'R'
                                    AND F7_GRPCLI = '077'
                                    AND D_E_L_E_T_ = ' '
                                    AND F7_ZZDESCR = IPU.IPU_NCM),
                                (SELECT I.IAI_VALOR + I.IAI_PER_FOMEZERO
                                   FROM INTEGRACAO.ICMS_ALIQ_INT I
                                  INNER JOIN SIAOS.CLIENTE C
                                     ON C.ESTADO = I.IAI_ESTADO
                                  INNER JOIN SIAOS.PROPOSTA PR
                                     ON C.CODIGO = PR.CLI_CODIGO
                                  WHERE PR.PRP_CODIGO = n_proposta)) ICMSIN,
                         DECODE(IPU.IPU_TEM_ST,
                                1,
                                SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) +
                                ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                                 v_valor2) * n_prp_vl_frete),
                                0) VT,
                         IP.IPR_ICMS
                    FROM ITEM_PROP IP
                   INNER JOIN PRODUTO P
                      ON P.PRODUTO = IP.PRO_CODIGO
                   INNER JOIN ITEM_PROP_UNI IPU
                      ON IP.PRP_CODIGO = IPU.PRP_CODIGO
                     AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                   WHERE IP.PRP_CODIGO = n_proposta
                     AND P.FAMILIA NOT IN ('PCLI', 'QM')
                     AND NVL(IP.IPR_ICMS, 0) > 0
                     AND IP.IPG_CODIGO NOT IN
                         (SELECT IPG.IPG_CODIGO
                            FROM ITEM_PROP_GRUPO IPG
                           WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                             AND IPG.IPG_NAO_SOMAR = 1)
                   GROUP BY IPU.IPU_NCM, IP.IPR_ICMS, IPU.IPU_TEM_ST) X
           WHERE NVL(X.ICMSIN, 0) > 0
             AND NVL(X.VT, 0) > 0;
        EXCEPTION
          WHEN OTHERS THEN
            v_valor := 0;
        END;
        /*
        ELSIF n_prp_destino = 'C' OR n_prp_destino = 'I' THEN
        
          v_valor := nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta, n_revisao, 10), 0);
        */
      END IF;
    
    ELSIF n_tipo = 28 THEN
      -- 12 - ICMS incidente
    
      /*
      IF n_prp_destino = 'C' OR n_prp_destino = 'I' THEN
        -- ICMS PARA CONSUMO PRÓPRIO
      
       v_valor := nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta, n_revisao, 12), 0);
      
      ELS
      */
      IF n_prp_destino = 'R' OR n_prp_destino = 'S' THEN
        -- ICMS PARA REVENDA
      
        v_valor2 := NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta, NULL, 6), 0);
        BEGIN
          SELECT SUM((DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                     (1 + (IP.IPR_IPI / 100))) * IP.IPR_QUANTIDADE) +
                 ((SUM(DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                       IP.IPR_QUANTIDADE) / v_valor2) * n_prp_vl_frete) +
                 SUM((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100))) *
                     IP.IPR_QUANTIDADE * (IPU.IPU_PER_ST / 100)) +
                 ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE *
                       (IPU.IPU_PER_ST / 100)) / v_valor2) * n_prp_vl_frete) XXV
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IP.PRP_CODIGO = IPU.PRP_CODIGO
             AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
           WHERE IP.PRP_CODIGO = n_proposta
             AND P.FAMILIA NOT IN ('PCLI', 'QM')
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1);
        EXCEPTION WHEN OTHERS THEN
            v_valor := 0;
        END;
      END IF;
    
    ELSIF n_tipo = 29 THEN
      -- 29 - Total Frete
      v_valor := n_prp_vl_frete;
    
    ELSIF n_tipo = 30 THEN
      -- 30 - Total APNF
    
      SELECT SUM((((IP.IPR_PRECO + IP.IPR_ADICIONAL) * 0.35) +
                 IPU.IPU_VALOR_COTADO) * IP.IPR_QUANTIDADE)
        INTO v_valor
        FROM ITEM_PROP IP
       INNER JOIN ITEM_PROP_UNI IPU
          ON IP.PRP_CODIGO = IPU.PRP_CODIGO
         AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
       INNER JOIN PRODUTO P
          ON P.PRODUTO = IP.PRO_CODIGO
       WHERE IPU.MSV_CODIGO IS NOT NULL
         AND IPU.MSV_CODIGO != 7
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    ELSIF n_tipo = 31 THEN
      -- 30 - Total Prop Pis
    
      SELECT SUM(DECODE(V.F4_PISBRUT,
                        2,
                        (T.IPR_QUANTIDADE * T.IPR_VENDA_CLI_IMP) +
                        T.IPR_VENDA_CLI,
                        0)) IMP_PIS,
             SUM(DECODE(V.F4_COFBRUT,
                        2,
                        (T.IPR_QUANTIDADE * T.IPR_VENDA_CLI_IMP) +
                        T.IPR_VENDA_CLI,
                        0)) IMP_COFINS
        INTO v_valor, v_valor2
        FROM SIAOS.VW_ITENS_PROPOSTA T
       INNER JOIN INTEGRACAO.VW_TES2 V
          ON V.R_E_C_N_O_ = T.TES_RECNO
       WHERE T.PRP_CODIGO = n_proposta
         AND T.FIT_CODIGO NOT IN (15, 75)
         AND T.IPR_VENDA_CLI > 0
         AND T.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = T.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      SELECT NVL(SUM(ROUND((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                           (1 - (IP.IPR_ISS / 100))),
                           2)),
                 0) IPR_VENDA_CLI,
             NVL(SUM(ROUND((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                           (1 - (IP.IPR_ISS / 100))),
                           2)),
                 0) IPR_VENDA_CLI
        INTO v_valor3, v_valor4
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1)
       GROUP BY IP.IPR_ISS;
    
      --v_valor := v_valor + v_valor3;
      v_valor := v_valor2 + v_valor4;
    
    END IF;
  
    RETURN v_valor;
  
  END SF_VALOR_POR_TIPO;
  
  -----------------------------------------------------------------------------
  ---------   RETORNA VALOR RESUMIDO DA PROPOSTA PARA CLIENTE FINAL -----------
  -----------------------------------------------------------------------------
  
  
  FUNCTION SF_VALOR_POR_TIPO_FIM(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_revisao  IN SIAOS.PROPOSTA.PRP_REVISAO%TYPE,
                             n_tipo     IN INTEGER) RETURN NUMBER IS
  
    -- TIPOS
    --   1-EQUIPAMENTO,
    -- 101-EQUIPAMENTO IMP. PROPOSTA,
    --   2-SOFTWARE,
    -- 102-SOFTWARE IMP. PROPOSTA,
    --   3-SERVIÇOS,
    -- 103-SERVIÇOS IMP. PROPOSTA,
    --   4-EMBALAGEM,
    --   5-INSPEÇÃO,
    --   6-TOTAL
    --   8-TOTAL IPI
    --   9-TOTAL ISS
    --  10-TOTAL ICMS
    --  12-BASE DE CALCULO DO ICMS
    --  26-TOTAL PROPOSTA COM IMPOSTOS
    --  27-TOTAL ST
  
    v_valor     NUMBER(15, 4) := 0;
    v_valor2    NUMBER(15, 4) := 0;
    v_valor3    NUMBER(15, 4) := 0;
    v_valor4    NUMBER(15, 4) := 0;
    v_valor_emb NUMBER(15, 4) := 0;
    n_iqv       NUMBER(15, 4) := 0;
    n_custo_com NUMBER(15, 4) := 0;
    --     n_insp                 INTEGER;
    n_emb              INTEGER;
    n_prp_porc_produto SIAOS.PROPOSTA.PRP_PORC_PRODUTO%TYPE;
    n_prp_destino      SIAOS.PROPOSTA.PRP_DESTINO%TYPE;
    dt_prp_abertura    SIAOS.PROPOSTA.PRP_DT_ABERTURA%TYPE;
    n_prp_vl_frete     SIAOS.PROPOSTA.PRP_VL_FRETE%TYPE;
    c_est_sigla        GERAL.ESTADO.EST_SIGLA%TYPE;
  
  BEGIN
  
    SELECT P.PRP_PORC_PRODUTO,
           TRIM(P.PRP_DESTINO),
           P.PRP_DT_ABERTURA,
           NVL(P.PRP_VL_FRETE, 0) + NVL(PRP_VL_EMBALAGEM, 0),
           (SELECT E.EST_SIGLA
              FROM CLIENTE C
             INNER JOIN GERAL.ESTADO E
                ON E.EST_CODIGO = C.EST_CODIGO
             WHERE C.CODIGO = P.CLI_CODIGO)
      INTO n_prp_porc_produto,
           n_prp_destino,
           dt_prp_abertura,
           n_prp_vl_frete,
           c_est_sigla
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    IF n_prp_porc_produto > 0 THEN
    
      IF n_tipo = 1 THEN
        -- 1-EQUIPAMENTO,
      
        SELECT SUM(IP.IPR_VENDA_FIM * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IP
         INNER JOIN CADBASICO.ITEM_NEGOCIO P
            ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
         INNER JOIN CADBASICO.FAMILIA_ITNEG F
            ON F.FIT_CODIGO = P.FIT_CODIGO
         WHERE F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
           AND IP.PRP_CODIGO = n_proposta
           AND F.FIT_SERVICO = 0
           AND IP.IPG_CODIGO NOT IN
               (SELECT IPG.IPG_CODIGO
                  FROM ITEM_PROP_GRUPO IPG
                 WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPG.IPG_NAO_SOMAR = 1);
      
      ELSIF n_tipo = 101 THEN
        -- 101-EQUIPAMENTO PROPOSTA,
      
        SELECT SUM(IPX.IPR_VENDA_FIM * IPX.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IPX
         WHERE (IPX.PRP_CODIGO, IPX.IPR_ITEM_PROP) IN
               (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 INNER JOIN CADBASICO.ITEM_NEGOCIO P
                    ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
                 INNER JOIN CADBASICO.FAMILIA_ITNEG F
                    ON F.FIT_CODIGO = P.FIT_CODIGO
                 WHERE F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
                   AND IP.PRP_CODIGO = n_proposta
                   AND IPU.IPR_ITEM_PAI IS NULL
                   AND F.FIT_SERVICO = 0
                   AND IP.IPG_CODIGO NOT IN
                       (SELECT IPG.IPG_CODIGO
                          FROM ITEM_PROP_GRUPO IPG
                         WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                           AND IPG.IPG_NAO_SOMAR = 1)
                UNION
                SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 WHERE (IP.PRP_CODIGO, IPU.IPR_ITEM_PAI) IN
                       (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
                          FROM SIAOS.ITEM_PROP IP2
                         INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
                            ON IPU2.PRP_CODIGO = IP2.PRP_CODIGO
                           AND IPU2.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                         INNER JOIN CADBASICO.ITEM_NEGOCIO P2
                            ON P2.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                         INNER JOIN CADBASICO.FAMILIA_ITNEG F2
                            ON F2.FIT_CODIGO = P2.FIT_CODIGO
                         WHERE F2.FIT_FAMILIA NOT IN
                               ('SW', 'SWT', 'PCLI', 'QM')
                           AND IP2.PRP_CODIGO = n_proposta
                           AND IPU2.IPR_ITEM_PAI IS NULL
                           AND F2.FIT_SERVICO = 0
                           AND IP2.IPG_CODIGO NOT IN
                               (SELECT IPG2.IPG_CODIGO
                                  FROM ITEM_PROP_GRUPO IPG2
                                 WHERE IPG2.PRP_CODIGO = IP.PRP_CODIGO
                                   AND IPG2.IPG_NAO_SOMAR = 1)));
      
      ELSIF n_tipo = 3 THEN
        -- 3-SERVIÇOS,
      
        SELECT SUM(IP.IPR_VENDA_FIM * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IP
         INNER JOIN CADBASICO.ITEM_NEGOCIO P
            ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
         INNER JOIN CADBASICO.FAMILIA_ITNEG F
            ON F.FIT_CODIGO = P.FIT_CODIGO
         WHERE IP.PRP_CODIGO = n_proposta
           AND F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
           AND F.FIT_SERVICO = 1
           AND IP.IPG_CODIGO NOT IN
               (SELECT IPG.IPG_CODIGO
                  FROM ITEM_PROP_GRUPO IPG
                 WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPG.IPG_NAO_SOMAR = 1);
      
      ELSIF n_tipo = 103 THEN
        -- 103-SERVIÇO PROPOSTA,
      
        SELECT SUM(IPX.IPR_VENDA_FIM * IPX.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IPX
         WHERE (IPX.PRP_CODIGO, IPX.IPR_ITEM_PROP) IN
               (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 INNER JOIN CADBASICO.ITEM_NEGOCIO P
                    ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
                 INNER JOIN CADBASICO.FAMILIA_ITNEG F
                    ON F.FIT_CODIGO = P.FIT_CODIGO
                 WHERE F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
                   AND IP.PRP_CODIGO = n_proposta
                   AND IPU.IPR_ITEM_PAI IS NULL
                   AND F.FIT_SERVICO = 1
                   AND IP.IPG_CODIGO NOT IN
                       (SELECT IPG.IPG_CODIGO
                          FROM ITEM_PROP_GRUPO IPG
                         WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                           AND IPG.IPG_NAO_SOMAR = 1)
                UNION
                SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 WHERE (IP.PRP_CODIGO, IPU.IPR_ITEM_PAI) IN
                       (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
                          FROM SIAOS.ITEM_PROP IP2
                         INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
                            ON IPU2.PRP_CODIGO = IP2.PRP_CODIGO
                           AND IPU2.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                         INNER JOIN CADBASICO.ITEM_NEGOCIO P2
                            ON P2.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                         INNER JOIN CADBASICO.FAMILIA_ITNEG F2
                            ON F2.FIT_CODIGO = P2.FIT_CODIGO
                         WHERE F2.FIT_FAMILIA NOT IN
                               ('SW', 'SWT', 'PCLI', 'QM')
                           AND IP2.PRP_CODIGO = n_proposta
                           AND IPU2.IPR_ITEM_PAI IS NULL
                           AND F2.FIT_SERVICO = 1
                           AND IP2.IPG_CODIGO NOT IN
                               (SELECT IPG2.IPG_CODIGO
                                  FROM ITEM_PROP_GRUPO IPG2
                                 WHERE IPG2.PRP_CODIGO = IP.PRP_CODIGO
                                   AND IPG2.IPG_NAO_SOMAR = 1)));
      
    
    ELSE
    
      IF n_tipo = 1 THEN
        -- 1-EQUIPAMENTO,
      
        v_valor := 0;
      
      ELSIF n_tipo = 3 THEN
        -- 3-SERVIÇOS,
        /*
        SELECT SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM SIAOS.ITEM_PROP IP
         WHERE IP.IPR_CODIGO IN (SELECT IP2.IPR_CODIGO
                                   FROM ITEM_PROP IP2
                                  INNER JOIN SIAOS.ITEM_PROP_UNI IPU ON IPU.PRP_CODIGO = IP2.PRP_CODIGO
                                                                    AND IPU.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                                  INNER JOIN SIAOS.ITEM_PROP_GRUPO IPG ON IPG.PRP_CODIGO = IP2.PRP_CODIGO
                                                                      AND IPG.IPG_CODIGO = IP2.IPG_CODIGO
                                  INNER JOIN CADBASICO.ITEM_NEGOCIO P  ON P.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                                  INNER JOIN CADBASICO.FAMILIA_ITNEG F ON F.FIT_CODIGO = P.FIT_CODIGO
                                  INNER JOIN INTEGRACAO.CLASS_TES T ON T.CLT_RECNO = IPU.TES_RECNO
                                  WHERE IP2.PRP_CODIGO = n_proposta
                                    AND IPG.IPG_NAO_SOMAR = 0
                                    AND T.CLT_PRODUTO = 2
                                    AND P.INE_CODIGO != 'SERV_INSPE'
                                    AND F.FIT_FAMILIA NOT IN ('SW', 'SWT','PCLI','QM'));
        */
        SELECT SUM(IP.IPR_VENDA_FIM * IP.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IP
         INNER JOIN SIAOS.ITEM_PROP_UNI IPU
            ON IPU.PRP_CODIGO = IP.PRP_CODIGO
           AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
         INNER JOIN CADBASICO.ITEM_NEGOCIO P
            ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
         INNER JOIN CADBASICO.FAMILIA_ITNEG F
            ON F.FIT_CODIGO = P.FIT_CODIGO
         WHERE P.INE_CODIGO != 'SERV_INSPE'
           AND IP.PRP_CODIGO = n_proposta
           AND F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
           AND F.FIT_SERVICO = 1
           AND IP.IPG_CODIGO NOT IN
               (SELECT IPG.IPG_CODIGO
                  FROM ITEM_PROP_GRUPO IPG
                 WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPG.IPG_NAO_SOMAR = 1);
      
      ELSIF n_tipo = 103 THEN
        -- 103-SERVIÇO PROPOSTA,
      
        SELECT SUM(IPX.IPR_VENDA_FIM * IPX.IPR_QUANTIDADE) VALOR
          INTO v_valor
          FROM ITEM_PROP IPX
         WHERE (IPX.PRP_CODIGO, IPX.IPR_ITEM_PROP) IN
               (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 INNER JOIN CADBASICO.ITEM_NEGOCIO P
                    ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
                 INNER JOIN CADBASICO.FAMILIA_ITNEG F
                    ON F.FIT_CODIGO = P.FIT_CODIGO
                 WHERE F.FIT_FAMILIA NOT IN ('SW', 'SWT', 'PCLI', 'QM')
                   AND IP.PRP_CODIGO = n_proposta
                   AND IPU.IPR_ITEM_PAI IS NULL
                   AND F.FIT_SERVICO = 1
                   AND IP.IPG_CODIGO NOT IN
                       (SELECT IPG.IPG_CODIGO
                          FROM ITEM_PROP_GRUPO IPG
                         WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                           AND IPG.IPG_NAO_SOMAR = 1)
                UNION
                SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                  FROM SIAOS.ITEM_PROP IP
                 INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                    ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                   AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
                 WHERE (IP.PRP_CODIGO, IPU.IPR_ITEM_PAI) IN
                       (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
                          FROM SIAOS.ITEM_PROP IP2
                         INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
                            ON IPU2.PRP_CODIGO = IP2.PRP_CODIGO
                           AND IPU2.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                         INNER JOIN CADBASICO.ITEM_NEGOCIO P2
                            ON P2.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                         INNER JOIN CADBASICO.FAMILIA_ITNEG F2
                            ON F2.FIT_CODIGO = P2.FIT_CODIGO
                         WHERE F2.FIT_FAMILIA NOT IN
                               ('SW', 'SWT', 'PCLI', 'QM')
                           AND IP2.PRP_CODIGO = n_proposta
                           AND IPU2.IPR_ITEM_PAI IS NULL
                           AND F2.FIT_SERVICO = 1
                           AND IP2.IPG_CODIGO NOT IN
                               (SELECT IPG2.IPG_CODIGO
                                  FROM ITEM_PROP_GRUPO IPG2
                                 WHERE IPG2.PRP_CODIGO = IP.PRP_CODIGO
                                   AND IPG2.IPG_NAO_SOMAR = 1)));
      
      END IF;
    
    END IF;
  
    IF n_tipo = 2 THEN
      -- 2-SOFTWARE,
    
      SELECT SUM(IP.IPR_VENDA_FIM * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP
       INNER JOIN SIAOS.ITEM_PROP_UNI IPU
          ON IPU.PRP_CODIGO = IP.PRP_CODIGO
         AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
       INNER JOIN CADBASICO.ITEM_NEGOCIO P
          ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
       INNER JOIN CADBASICO.FAMILIA_ITNEG F
          ON F.FIT_CODIGO = P.FIT_CODIGO
       WHERE IP.PRP_CODIGO = n_proposta
         AND F.FIT_FAMILIA IN ('SW', 'SWT')
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 102 THEN
      -- 103-SOFTWARE PROPOSTA,
    
      SELECT SUM(IPX.IPR_VENDA_FIM * IPX.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IPX
       WHERE (IPX.PRP_CODIGO, IPX.IPR_ITEM_PROP) IN
             (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                FROM SIAOS.ITEM_PROP IP
               INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                  ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
               INNER JOIN CADBASICO.ITEM_NEGOCIO P
                  ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
               INNER JOIN CADBASICO.FAMILIA_ITNEG F
                  ON F.FIT_CODIGO = P.FIT_CODIGO
               WHERE F.FIT_FAMILIA IN ('SW', 'SWT')
                 AND IP.PRP_CODIGO = n_proposta
                 AND IPU.IPR_ITEM_PAI IS NULL
                 AND IP.IPG_CODIGO NOT IN
                     (SELECT IPG.IPG_CODIGO
                        FROM ITEM_PROP_GRUPO IPG
                       WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                         AND IPG.IPG_NAO_SOMAR = 1)
              UNION
              SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                FROM SIAOS.ITEM_PROP IP
               INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                  ON IPU.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
               WHERE (IP.PRP_CODIGO, IPU.IPR_ITEM_PAI) IN
                     (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
                        FROM SIAOS.ITEM_PROP IP2
                       INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
                          ON IPU2.PRP_CODIGO = IP2.PRP_CODIGO
                         AND IPU2.IPR_ITEM_PROP = IP2.IPR_ITEM_PROP
                       INNER JOIN CADBASICO.ITEM_NEGOCIO P2
                          ON P2.INE_CODIGO = TRIM(IP2.PRO_CODIGO)
                       INNER JOIN CADBASICO.FAMILIA_ITNEG F2
                          ON F2.FIT_CODIGO = P2.FIT_CODIGO
                       WHERE F2.FIT_FAMILIA IN ('SW', 'SWT')
                         AND IP2.PRP_CODIGO = n_proposta
                         AND IPU2.IPR_ITEM_PAI IS NULL
                         AND IP2.IPG_CODIGO NOT IN
                             (SELECT IPG2.IPG_CODIGO
                                FROM ITEM_PROP_GRUPO IPG2
                               WHERE IPG2.PRP_CODIGO = IP.PRP_CODIGO
                                 AND IPG2.IPG_NAO_SOMAR = 1)));
    
    ELSIF n_tipo = 4 THEN
      -- 4-EMBALAGEM
    
      SELECT NVL(P.PRP_VL_EMBALAGEM, 0) VALOR,
             NVL(P.PRP_EMBALAGEM, 0) PRP_EMBALAGEM
        INTO v_valor, n_emb
        FROM PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
    
      IF n_emb = 1 THEN
        v_valor := 0;
      END IF;
    
    ELSIF n_tipo = 5 THEN
      -- 5-INSPEÇÃO
    
      SELECT NVL(SUM(IP.IPR_VENDA_FIM * IP.IPR_QUANTIDADE), 0) VALOR
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.PRODUTO = 'SERV_INSPE'
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
    ELSIF n_tipo = 6 THEN
      -- 6-TOTAL
    
      SELECT SUM(IP.IPR_VENDA_FIM * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      /*
      SELECT NVL(P.PRP_VL_EMBALAGEM, 0) VALOR,
             NVL(P.PRP_EMBALAGEM, 0) PRP_EMBALAGEM
        INTO v_valor_emb, n_emb
        FROM PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
      */
      IF n_prp_vl_frete > 0 THEN
        v_valor := v_valor + n_prp_vl_frete;
      END IF;
    
    ELSIF n_tipo = 8 THEN
      -- 8 - TOTAL IPI
    
      SELECT SUM(T.IPR_QUANTIDADE * T.IPR_VENDA_CLI_IMP) IMP
        INTO v_valor
        FROM SIAOS.VW_ITENS_PROPOSTA T
       WHERE T.PRP_CODIGO = n_proposta
         AND T.FIT_CODIGO NOT IN (15, 75)
         AND T.IPR_VENDA_CLI > 0
         AND NVL(T.IPR_IPI, 0) > 0
         AND T.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = T.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
      /*
      SELECT SUM(ROUND(SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) * (IP.IPR_IPI / 100),2)) IPR_VENDA_CLI
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI','QM')
         AND IP.PRP_CODIGO = n_proposta
         AND NVL(IP.IPR_IPI, 0) > 0
         AND IP.IPG_CODIGO NOT IN (SELECT IPG.IPG_CODIGO
                                 FROM ITEM_PROP_GRUPO IPG
                                WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                                  AND IPG.IPG_NAO_SOMAR = 1)
       GROUP BY IP.IPR_IPI;
       */
    ELSIF n_tipo = 9 THEN
      -- 9 - TOTAL ISS
    
      SELECT SUM(ROUND((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                       (1 - (IP.IPR_ISS / 100))),
                       2) - SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE)) IPR_VENDA_CLI
        INTO v_valor
        FROM ITEM_PROP IP, PRODUTO P
       WHERE P.PRODUTO = IP.PRO_CODIGO
         AND P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND NVL(IP.IPR_ISS, 0) > 0
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1)
       GROUP BY IP.IPR_ISS;
    
    ELSIF n_tipo = 10 THEN
      -- 10 - TOTAL ICMS
      v_valor2 := NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                               NULL,
                                                               6),
                      0);
    
      IF n_prp_destino = 'C' THEN
        -- ICMS PARA CONSUMO PRÓPRIO
        IF n_prp_vl_frete > 0 THEN
          SELECT --SUM((SUM((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100))) * IP.IPR_QUANTIDADE) + ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE)/v_valor2)*n_prp_vl_frete)) * (IP.IPR_ICMS / 100)) VALOR
           SUM(((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100)) *
               IP.IPR_QUANTIDADE) + ((IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
               v_valor2) * n_prp_vl_frete) *
               ((IP.IPR_ICMS * BASEICM) / 100)) VALOR
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           INNER JOIN INTEGRACAO.VW_TES SF
              ON SF.R_E_C_N_O_ = IPU.TES_RECNO
           WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
             AND IP.PRP_CODIGO = n_proposta
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1);
          --GROUP BY IP.IPR_ICMS;
        ELSE
          SELECT SUM((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100)) *
                     IP.IPR_QUANTIDADE) * ((IP.IPR_ICMS * BASEICM) / 100)) VALOR
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           INNER JOIN INTEGRACAO.VW_TES SF
              ON SF.R_E_C_N_O_ = IPU.TES_RECNO
           WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
             AND IP.PRP_CODIGO = n_proposta
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1);
          --GROUP BY IP.IPR_ICMS;
        END IF;
      ELSE
        -- ICMS PARA REVENDA
        IF n_prp_vl_frete > 0 THEN
          SELECT SUM((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) +
                     ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                     v_valor2) * n_prp_vl_frete)) *
                     ((IP.IPR_ICMS * BASEICM) / 100)) VALOR
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           INNER JOIN INTEGRACAO.VW_TES SF
              ON SF.R_E_C_N_O_ = IPU.TES_RECNO
           WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
             AND IP.PRP_CODIGO = n_proposta
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1)
           GROUP BY IP.IPR_ICMS, BASEICM;
        ELSE
          SELECT SUM((IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) *
                     ((IP.IPR_ICMS * BASEICM) / 100)) VALOR
            INTO v_valor
            FROM ITEM_PROP IP
           INNER JOIN PRODUTO P
              ON P.PRODUTO = IP.PRO_CODIGO
           INNER JOIN ITEM_PROP_UNI IPU
              ON IPU.PRP_CODIGO = IP.PRP_CODIGO
             AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
           INNER JOIN INTEGRACAO.VW_TES SF
              ON SF.R_E_C_N_O_ = IPU.TES_RECNO
           WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
             AND IP.PRP_CODIGO = n_proposta
             AND NVL(IP.IPR_ICMS, 0) > 0
             AND IP.IPG_CODIGO NOT IN
                 (SELECT IPG.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO IPG
                   WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                     AND IPG.IPG_NAO_SOMAR = 1);
          -- GROUP BY IP.IPR_ICMS;
        END IF;
      END IF;
    
    ELSIF n_tipo = 12 THEN
      -- 12 - ICMS incidente
    
      SELECT SUM((IP.IPR_VENDA_CLI * BASEICM) * IP.IPR_QUANTIDADE) VALOR
        INTO v_valor
        FROM ITEM_PROP IP
       INNER JOIN PRODUTO P
          ON P.PRODUTO = IP.PRO_CODIGO
       INNER JOIN ITEM_PROP_UNI IPU
          ON IPU.PRP_CODIGO = IP.PRP_CODIGO
         AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
       INNER JOIN INTEGRACAO.VW_TES SF
          ON SF.R_E_C_N_O_ = IPU.TES_RECNO
       WHERE P.FAMILIA NOT IN ('PCLI', 'QM')
         AND IP.PRP_CODIGO = n_proposta
         AND NVL(IP.IPR_ICMS, 0) > 0
         AND IP.IPG_CODIGO NOT IN
             (SELECT IPG.IPG_CODIGO
                FROM ITEM_PROP_GRUPO IPG
               WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                 AND IPG.IPG_NAO_SOMAR = 1);
    
      IF n_prp_destino = 'C' THEN
        -- ICMS PARA CONSUMO PRÓPRIO
        v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                          n_revisao,
                                                                          8),
                                 0);
      END IF;
    
      v_valor := v_valor + n_prp_vl_frete;
    
    ELSIF n_tipo = 26 THEN
      -- 23 - TOTAL PROPOSTA COM IMPOSTOS
    
      v_valor := nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                              n_revisao,
                                                              6),
                     0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        8),
                               0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        9),
                               0);
      v_valor := v_valor + nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                        n_revisao,
                                                                        27),
                               0);                              
    
    ELSIF n_tipo = 27 THEN
      -- 12 - ICMS incidente
      IF n_prp_destino = 'R' OR n_prp_destino = 'S' THEN
        v_valor2 := NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta,
                                                                 NULL,
                                                                 6),
                        0);
      
        -- ICMS PARA CONSUMO PRÓPRIO
        BEGIN
          SELECT SUM(X.VAL * (X.ICMSIN / 100) - (X.VT * (IPR_ICMS / 100)))
            INTO v_valor
            FROM (SELECT SUM((DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                             (1 + (IP.IPR_IPI / 100))) * IP.IPR_QUANTIDADE) +
                         ((SUM(DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                               IP.IPR_QUANTIDADE) / v_valor2) *
                          n_prp_vl_frete) +
                         SUM((IP.IPR_VENDA_CLI * (1 + (IP.IPR_IPI / 100))) *
                             IP.IPR_QUANTIDADE * (IPU.IPU_PER_ST / 100)) +
                         ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE *
                               (IPU.IPU_PER_ST / 100)) / v_valor2) *
                          n_prp_vl_frete) VAL,
                         SUM((DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                             (1 + (IP.IPR_IPI / 100))) * IP.IPR_QUANTIDADE) +
                         ((SUM(DECODE(IPU.IPU_TEM_ST, 1, IP.IPR_VENDA_CLI, 0) *
                               IP.IPR_QUANTIDADE) / v_valor2) *
                          n_prp_vl_frete) DDD,
                         IPU.IPU_NCM,
                         DECODE(c_est_sigla,
                                'SP',
                                (SELECT T.F7_ALIQINT
                                   FROM PROTPROD.SF7010 T
                                  WHERE F7_TIPOCLI = 'R'
                                    AND F7_GRPCLI = '077'
                                    AND D_E_L_E_T_ = ' '
                                    AND F7_ZZDESCR = IPU.IPU_NCM),
                                (SELECT I.IAI_VALOR + I.IAI_PER_FOMEZERO
                                   FROM INTEGRACAO.ICMS_ALIQ_INT I
                                  INNER JOIN SIAOS.CLIENTE C
                                     ON C.ESTADO = I.IAI_ESTADO
                                  INNER JOIN SIAOS.PROPOSTA PR
                                     ON C.CODIGO = PR.CLI_CODIGO
                                  WHERE PR.PRP_CODIGO = n_proposta)) ICMSIN,
                         DECODE(IPU.IPU_TEM_ST,
                                1,
                                SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) +
                                ((SUM(IP.IPR_VENDA_CLI * IP.IPR_QUANTIDADE) /
                                 v_valor2) * n_prp_vl_frete),
                                0) VT,
                         IP.IPR_ICMS
                    FROM ITEM_PROP IP
                   INNER JOIN PRODUTO P
                      ON P.PRODUTO = IP.PRO_CODIGO
                   INNER JOIN ITEM_PROP_UNI IPU
                      ON IP.PRP_CODIGO = IPU.PRP_CODIGO
                     AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                   WHERE IP.PRP_CODIGO = n_proposta
                     AND P.FAMILIA NOT IN ('PCLI', 'QM')
                     AND NVL(IP.IPR_ICMS, 0) > 0
                     AND IP.IPG_CODIGO NOT IN
                         (SELECT IPG.IPG_CODIGO
                            FROM ITEM_PROP_GRUPO IPG
                           WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                             AND IPG.IPG_NAO_SOMAR = 1)
                   GROUP BY IPU.IPU_NCM, IP.IPR_ICMS, IPU.IPU_TEM_ST) X
           WHERE NVL(X.ICMSIN, 0) > 0
             AND NVL(X.VT, 0) > 0;
        EXCEPTION
          WHEN OTHERS THEN
            v_valor := 0;
        END;
        /*
        ELSIF n_prp_destino = 'C' OR n_prp_destino = 'I' THEN
        
          v_valor := nvl(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_proposta, n_revisao, 10), 0);
        */
      END IF;
    
    END IF;
  
    RETURN v_valor;
  
  END IF;
  
  END SF_VALOR_POR_TIPO_FIM;

  -----------------------------------------------------------------------------
  ------------------   RETORNA VALOR RESUMIDO DA PROPOSTA  --------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_RETORNA_DET_ITEM(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                               n_item     IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                               n_rev      IN INTEGER,
                               n_set      IN INTEGER) RETURN CLOB IS
  
    c_det CLOB;
  
  BEGIN
  
    BEGIN
    
      IF ((n_rev >= 0) OR (n_set >= 0)) THEN
      
        SELECT IUR_DETALHE
          INTO c_det
          FROM ITEM_PROP_UNI_REV
         WHERE PRP_CODIGO = n_proposta
           AND IPR_ITEM_PROP = n_item
           AND PRR_CODIGO = n_rev
           AND PRR_SET = n_set;
      
      ELSE
      
        SELECT IPU_DETALHE
          INTO c_det
          FROM ITEM_PROP_UNI
         WHERE PRP_CODIGO = n_proposta
           AND IPR_ITEM_PROP = n_item;
      
      END IF;
    
    EXCEPTION
      WHEN OTHERS THEN
      
        NULL;
      
    END;
  
    RETURN c_det;
  
  END SF_RETORNA_DET_ITEM;

  -----------------------------------------------------------------------------
  ------------------   RETORNA VALOR RESUMIDO DA PROPOSTA  --------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_NIVEL_ARQUIVO(n_par_codigo IN INTEGER) RETURN VARCHAR2 IS
  
    v_ordem           VARCHAR2(4000);
    n_par_codigo2     INTEGER;
    n_par_codigo_pai2 INTEGER;
  
  BEGIN
  
    SELECT ROWNUM, PAR_CODIGO, PAR_CODIGO_PAI
      INTO v_ordem, n_par_codigo2, n_par_codigo_pai2
      FROM PROP_ARQUIVO
     WHERE PAR_CODIGO = n_par_codigo;
  
    IF n_par_codigo_pai2 IS NULL THEN
      RETURN(n_par_codigo2);
    ELSE
      RETURN(SF_NIVEL_ARQUIVO(n_par_codigo_pai2) || '' || n_par_codigo2);
    END IF;
  
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
    
      RETURN(NULL);
    
  END SF_NIVEL_ARQUIVO;

  -----------------------------------------------------------------------------
  ------------------   RETORNA VALOR RESUMIDO DA PROPOSTA  --------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_ORDENA_ARQUIVO(v_par_codigo IN INTEGER) RETURN VARCHAR2 IS
  
    v_ordem           VARCHAR2(4000);
    n_par_codigo2     INTEGER;
    n_par_codigo_pai2 INTEGER;
  
  BEGIN
  
    SELECT UPPER(PAR_TIPO || ' - ' || PAR_NOME), PAR_CODIGO, PAR_CODIGO_PAI
      INTO v_ordem, n_par_codigo2, n_par_codigo_pai2
      FROM PROP_ARQUIVO
     WHERE PAR_CODIGO = v_par_codigo;
  
    IF n_par_codigo_pai2 IS NULL THEN
      RETURN(v_ordem);
    ELSE
      RETURN(SF_ORDENA_ARQUIVO(n_par_codigo_pai2) || ' - ' || v_ordem);
    END IF;
  
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
    
      RETURN(NULL);
    
  END SF_ORDENA_ARQUIVO;

  -----------------------------------------------------------------------------
  ------------------   RETORNA VALOR RESUMIDO DA PROPOSTA  --------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_NIVEL_ARQUIVO_NOME(n_par_codigo IN INTEGER) RETURN VARCHAR2 IS
  
    v_ordem          VARCHAR2(4000);
    n_par_codigo2    INTEGER;
    n_par_codigo_pai INTEGER;
  
  BEGIN
  
    SELECT PAR_NOME, PAR_CODIGO, PAR_CODIGO_PAI
      INTO v_ordem, n_par_codigo2, n_par_codigo_pai
      FROM PROP_ARQUIVO
     WHERE PAR_CODIGO = n_par_codigo;
  
    IF n_par_codigo_pai IS NULL THEN
      RETURN(v_ordem || '/');
    ELSE
      RETURN(SF_NIVEL_ARQUIVO_NOME(n_par_codigo_pai) || v_ordem || '/');
    END IF;
  
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
    
      RETURN(NULL);
    
  END SF_NIVEL_ARQUIVO_NOME;

  ----------------------------------------------------------
  ------------ CRIA PENDENCIAS PARA FOLLOW UP --------------
  ----------------------------------------------------------

  PROCEDURE SP_PEND_FOLLOW_UP IS
  
    vc2_descricao  SIAOS.PENDENCIA_USER_ITEM.PNI_DESCRICAO%TYPE;
    vc2_para_baixa SIAOS.PENDENCIA_USER_ITEM.PNI_PARAMBAIXA%TYPE;
    n_numpend      INTEGER;
    n_erro         INTEGER;
    n_chapa        SIAOS.USUARIO.USU_CHAPA%TYPE;
  
  BEGIN
  
    FOR cur_vencida IN (SELECT PROPOSTA.PRP_CODIGO,
                               PROPOSTA.PRP_REVISAO,
                               (TRUNC(MAX(PROP_RECADO.PRE_DATA)) +
                               PROPOSTA.PRP_VALIDADE) - TRUNC(SYSDATE) DIAS
                          FROM PROP_RECADO,
                               PROPOSTA,
                               (SELECT PR.PRP_CODIGO,
                                       MAX(PR.TRE_CODIGO) TRE_CODIGO
                                  FROM PROP_RECADO PR
                                 WHERE PR.TRE_CODIGO IN (3, 7, 8)
                                 GROUP BY PR.PRP_CODIGO) PR_MAX
                         WHERE PROP_RECADO.PRP_CODIGO = PROPOSTA.PRP_CODIGO
                           AND PR_MAX.PRP_CODIGO = PROPOSTA.PRP_CODIGO
                           AND PR_MAX.TRE_CODIGO NOT IN (8, 4)
                           AND PROPOSTA.PST_CODIGO = 4
                           AND PROPOSTA.PRP_SIST_VERSAO = '2.02.000'
                           AND PROPOSTA.ORDER_NO IS NULL
                           AND PROP_RECADO.PNU_NUMERO IS NULL
                           AND (TRUNC(PROP_RECADO.PRE_DATA) +
                               PROPOSTA.PRP_VALIDADE) - TRUNC(SYSDATE) < 0
                         GROUP BY PROPOSTA.PRP_CODIGO,
                                  PROPOSTA.PRP_REVISAO,
                                  PROPOSTA.PRP_VALIDADE
                         ORDER BY PROPOSTA.PRP_CODIGO, PROPOSTA.PRP_REVISAO) LOOP
    
      BEGIN
      
        SELECT DECODE(USUARIO.USU_EMAIL,
                      NULL,
                      USU_P.USU_CHAPA,
                      USUARIO.USU_CHAPA) USU_CHAPA
          INTO n_chapa
          FROM PROPOSTA
          LEFT JOIN VENDEDOR_PROP
            ON PROPOSTA.PRP_CODIGO = VENDEDOR_PROP.PRP_CODIGO
          LEFT JOIN ARSALESP
            ON VENDEDOR_PROP.SALESP_KEY = ARSALESP.SALESP_KEY
          LEFT JOIN USUARIO
            ON ARSALESP.USU_CHAPA = USUARIO.USU_CHAPA
         INNER JOIN USUARIO USU_P
            ON USU_P.USU_CHAPA = PROPOSTA.USU_CHAPA
         WHERE NVL(VENDEDOR_PROP.VPR_CODIGO, 1) = 1
           AND PROPOSTA.PRP_CODIGO = cur_vencida.PRP_CODIGO;
      
        SP_GRAVA_RECADO(1,
                        NULL,
                        cur_vencida.PRP_CODIGO,
                        8,
                        'PROPOSTA ' || cur_vencida.PRP_CODIGO ||
                        ' COM VALIDADE VENCIDA',
                        NULL,
                        n_chapa,
                        n_erro);
      
      EXCEPTION
        WHEN OTHERS THEN
          NULL;
      END;
    
    END LOOP;
  
    COMMIT;
  
    FOR c_rec IN (SELECT PR.PRP_CODIGO,
                         PR.PRE_CODIGO,
                         DECODE(C.REDUZIDO,
                                NULL,
                                DECODE(C.CLIENTE,
                                       NULL,
                                       CT.CTE_NOME,
                                       C.CLIENTE),
                                C.REDUZIDO) CLIENTE,
                         NVL(PR.USU_CHAPA,
                             (SELECT P.USU_C_RESP_SIS
                                FROM HELPDESK.PROJETO P
                               WHERE P.PRO_CODIGO = 65)) USU_CHAPA,
                         PR.PRE_MENSAGEM,
                         PR.PRE_DATA,
                         PR.MOT_CODIGO,
                         TO_CHAR(PR.PRE_DT_ALARM, 'DD/MM/YYYY HH24:MI') PRE_DT_ALARM,
                         TR.TRE_DESCRICAO,
                         TR.TRE_LEGENDA,
                         TR.TRE_SISTEMA,
                         P.ORDER_NO
                    FROM SIAOS.PROP_RECADO  PR,
                         SIAOS.TIPO_RECADO  TR,
                         SIAOS.PROPOSTA     P,
                         SIAOS.CLIENTE      C,
                         SIAOS.CLIENTE_TEMP CT
                   WHERE TR.TRE_CODIGO = PR.TRE_CODIGO
                     AND P.PRP_CODIGO = PR.PRP_CODIGO
                     AND C.CODIGO(+) = P.CLI_CODIGO
                     AND CT.PRP_CODIGO(+) = P.PRP_CODIGO
                     AND PR.PRE_DT_BAIXA IS NULL
                     AND PR.PNU_NUMERO IS NULL
                     AND P.ORDER_NO IS NULL
                     AND P.PST_CODIGO != 3
                     AND DECODE(PR.PRE_DT_ALARM, NULL, 0, 1) = 1
                     AND TRUNC(PR.PRE_DT_ALARM) <= TRUNC(SYSDATE)) LOOP
    
      vc2_descricao  := 'PROPOSTA: ' || c_rec.PRP_CODIGO || ' - FOLLOW UP:' ||
                        c_rec.TRE_DESCRICAO || ' EXPIROU EM:' ||
                        c_rec.PRE_DT_ALARM;
      vc2_para_baixa := 'op=7=' || c_rec.PRP_CODIGO;
    
      SIAOS.PCK_PENDENCIA.SP_GERA_PENDENCIA2(vc2_descricao,
                                             'PROP_RECADO',
                                             68,
                                             '',
                                             c_rec.USU_CHAPA,
                                             vc2_para_baixa,
                                             n_numpend);
    
      IF n_numpend IS NOT NULL THEN
        UPDATE SIAOS.PROP_RECADO
           SET PROP_RECADO.PNU_NUMERO = n_numpend,
               PROP_RECADO.PEN_NUMERO = 68
         WHERE PROP_RECADO.PRE_CODIGO = c_rec.PRE_CODIGO;
      END IF;
    
    END LOOP;
  
    COMMIT;
  
    FOR cur_pend IN (SELECT PR.PRE_CODIGO
                       FROM SIAOS.PROP_RECADO PR
                      INNER JOIN SIAOS.PROPOSTA P
                         ON PR.PRP_CODIGO = P.PRP_CODIGO
                      INNER JOIN SIAOS.USUARIO U
                         ON PR.USU_CHAPA = U.USU_CHAPA
                      WHERE (U.USU_LOGINWEB IS NULL OR
                            P.ORDER_NO IS NOT NULL OR P.PST_CODIGO = 3 OR
                            PR.PRE_DT_ALARM < SYSDATE - 360)
                        AND PR.PRE_DT_BAIXA IS NULL
                        AND PR.PNU_NUMERO IS NOT NULL) LOOP
    
      UPDATE SIAOS.PROP_RECADO
         SET PROP_RECADO.PRE_DT_BAIXA = SYSDATE
       WHERE PROP_RECADO.PRE_CODIGO = cur_pend.PRE_CODIGO;
    
    END LOOP;
  
    COMMIT;
  
  END SP_PEND_FOLLOW_UP;

  ----------------------------------------------------------
  ---------- TROCA ORIGEM DA PROPOSTA QUE NAO É SER --------
  ----------------------------------------------------------

  PROCEDURE SP_TROCA_ORIGEM(n_prop   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                            v_origem IN SIAOS.ORIGEM.ORIGEM%TYPE,
                            n_erro   OUT INTEGER) IS
  
    n_tor_codigo_de   SIAOS.TIPO_ORIGEM.TOR_CODIGO%TYPE;
    n_tor_codigo_para SIAOS.TIPO_ORIGEM.TOR_CODIGO%TYPE;
  
  BEGIN
  
    SELECT DECODE(ORIGEM.TOR_CODIGO, 2, 2, 1)
      INTO n_tor_codigo_de
      FROM SIAOS.ORIGEM, SIAOS.PROPOSTA
     WHERE ORIGEM.ORIGEM = PROPOSTA.ORI_CODIGO
       AND PROPOSTA.PRP_CODIGO = n_prop;
  
    SELECT DECODE(ORIGEM.TOR_CODIGO, 2, 2, 1)
      INTO n_tor_codigo_para
      FROM SIAOS.ORIGEM
     WHERE ORIGEM.ORIGEM = v_origem;
  
    UPDATE SIAOS.PROPOSTA
       SET ORI_CODIGO = v_origem
     WHERE PRP_CODIGO = n_prop;
  
    IF n_tor_codigo_de != n_tor_codigo_para THEN
    
      BEGIN
      
        DELETE FROM SIAOS.ITEM_PROP WHERE ITEM_PROP.PRP_CODIGO = n_prop;
      
      EXCEPTION
        WHEN OTHERS THEN
          ROLLBACK;
          n_erro := 1;
      END;
    
    ELSE
    
      n_erro := 1;
    
    END IF;
  
    COMMIT;
  
  END SP_TROCA_ORIGEM;

  ----------------------------------------------------------
  -------- GRAVA DESCRIÇÃO NO CAMPO CONSULTA DE PRAZO ------
  ----------------------------------------------------------

  PROCEDURE SP_UP_TX_CONSULTA(n_prop      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              v_descricao IN SIAOS.CONSULTA.CON_DESCRICAO%TYPE,
                              n_chapa     IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                              n_resposta  IN INTEGER,
                              n_erro      OUT INTEGER) IS
  
    v_numero       SIAOS.CONSULTA.CON_NUMERO%TYPE;
    v_descricao_bd SIAOS.CONSULTA.CON_DESCRICAO%TYPE;
    v_descricao_cc SIAOS.CONSULTA.CON_DESCRICAO%TYPE;
    n_nome         SIAOS.USUARIO.USU_NOME%TYPE;
    n_rev          SIAOS.PROPOSTA.PRP_REVISAO%TYPE;
  
  BEGIN
    BEGIN
      SELECT CONSULTA.CON_DESCRICAO,
             CONSULTA.CON_NUMERO,
             PROPOSTA.PRP_REVISAO
        INTO v_descricao_bd, v_numero, n_rev
        FROM SIAOS.CONSULTA, SIAOS.PROPOSTA
       WHERE PROPOSTA.CON_NUMERO = CONSULTA.CON_NUMERO
         AND PROPOSTA.PRP_CODIGO = n_prop;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        n_erro := 1;
    END;
  
    IF n_erro IS NULL THEN
    
      BEGIN
      
        SELECT USU_NOME
          INTO n_nome
          FROM SIAOS.USUARIO
         WHERE USUARIO.USU_CHAPA = n_chapa;
      
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
          n_erro := 2;
      END;
    
    END IF;
  
    IF n_erro IS NULL THEN
    
      IF v_numero IS NOT NULL THEN
        IF n_resposta = 1 THEN
          v_descricao_cc := v_descricao_cc ||
                            '----- RESPOSTA    --------------------------------' ||
                            CHR(13) || CHR(10);
        ELSE
          v_descricao_cc := v_descricao_cc ||
                            '----- SOLICITAÇÃO -----------------------------' ||
                            CHR(13) || CHR(10);
        END IF;
        v_descricao_cc := v_descricao_cc ||
                          TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI') || ' - ' ||
                          n_chapa || ' - ' || n_nome || CHR(13) || CHR(10);
        v_descricao_cc := v_descricao_cc || 'PRÉ-OS: ' || n_prop || '-' ||
                          n_rev || CHR(13) || CHR(10);
        v_descricao_cc := v_descricao_cc ||
                          '-----------------------------------------------' ||
                          CHR(13) || CHR(10);
      
        v_descricao_cc := v_descricao_cc || v_descricao || CHR(13) ||
                          CHR(10) || v_descricao_bd;
      
        IF n_resposta = 1 THEN
          UPDATE SIAOS.CONSULTA
             SET CONSULTA.CON_DESCRICAO = v_descricao_cc
           WHERE CONSULTA.CON_NUMERO = v_numero;
        ELSE
          UPDATE SIAOS.CONSULTA
             SET CONSULTA.CON_DESCRICAO = v_descricao_cc,
                 CONSULTA.USU_CHAPA     = n_chapa
           WHERE CONSULTA.CON_NUMERO = v_numero;
        END IF;
      
        SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_prop);
      
        COMMIT;
      
      END IF;
    
    END IF;
  
  END SP_UP_TX_CONSULTA;

  ----------------------------------------------------------
  -------- COPIA PROPOSTA/OS EMITIDAS  ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_COPIA_OS(n_prop      IN  SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                        n_chapa     IN  SIAOS.USUARIO.USU_CHAPA%TYPE,
                        n_prop_nova OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
    n_cop_numero INTEGER;
    --n_erro           INTEGER;
    n_usu_chapa INTEGER;
    n_item_novo INTEGER;
  
  BEGIN
    FOR cur_prop IN (SELECT FIL_CODIGO,
                            IDI_CODIGO_MANUAL,
                            CLI_CODIGO,
                            CLI_CODIGO_FIM,
                            IFI_CODIGO,
                            PRP_COB_CODIGO,
                            PRP_REAJUSTE,
                            PRP_DT_REAJUSTE,
                            PRP_MULTA,
                            PRP_FINAME,
                            PRP_TRANSPORTE,
                            PRP_EMB_CODIGO,
                            PRP_CARTA_FIANCA,
                            PRP_SEG_FIANCA,
                            PRP_NOTA_PROM,
                            PRP_DESTINO,
                            PRP_PARCIAL,
                            PRP_ANTECIPA,
                            PRP_ENGENHARIA,
                            PRP_INSP_EXTERNA,
                            PRP_DT_INSP,
                            PRP_OBS,
                            PRP_NOTA,
                            PRP_IPI,
                            PRP_ICMS,
                            PRP_ISS,
                            ORI_CODIGO,
                            PRP_PORC_PRODUTO,
                            PRP_CONFIRMA,
                            PRP_EMBALAGEM,
                            PRP_VL_EMBALAGEM,
                            PRP_SUBSIDIARIA,
                            PRP_REPR_DIRETO,
                            PRP_REPR_INDIRETO,
                            PRP_FORWARDER,
                            PRP_PORTO_EMB,
                            PRP_PORTO_DEST,
                            PRP_HA_INVOICE,
                            PRP_COMISSAO_SUBS,
                            PST_CODIGO,
                            COO_COMERCIAL,
                            COO_TECNICO,
                            PRP_CAMBIO,
                            PRP_TIPO_FATUR,
                            COUNTRY_KEY,
                            CLASS_KEY,
                            PRP_DOCUM_CERTIF,
                            EMISSOR,
                            PRP_CONT_COM,
                            PRP_CONT_TEC,
                            PRP_CONT_FIN,
                            PRP_SIST_VERSAO,
                            PRP_EXPORTACAO,
                            PRP_MEDIA_MANUAL,
                            TERR_KEY,
                            EMP_ABERTURA,
                            PRP_VALIDADE
                       FROM SIAOS.PROPOSTA
                      WHERE PROPOSTA.PRP_CODIGO = n_prop) LOOP
    
      SELECT USU_CHAPA
        INTO n_usu_chapa
        FROM SIAOS.USUARIO
       WHERE UPPER(USU_LOGINWEB) = UPPER(USER);
    
      SIAOS.PCK_SMART_SALES3.SP_NOVA_PROPOSTA(USER,
                                              n_usu_chapa,
                                              cur_prop.CLI_CODIGO,
                                              cur_prop.ORI_CODIGO,
                                              n_prop_nova);
    
      SIAOS.PCK_SMART_SALES3.SP_UP_CLIENTE_FIM(n_prop_nova,
                                               cur_prop.CLI_CODIGO_FIM);
                                               
      SIAOS.PCK_COPIA_OS_COMPLETA.SP_COPIA_CONSIDERACOES(n_prop, n_prop_nova);
    
      IF cur_prop.CLI_CODIGO IS NULL THEN
      
        BEGIN
        
          INSERT INTO SIAOS.CLIENTE_TEMP
            (PRP_CODIGO,
             CTE_NOME,
             CTE_ENDERECO1,
             CTE_ENDERECO2,
             CTE_ENDERECO3,
             CTE_CIDADE,
             EST_CODIGO,
             CTE_ESTADO,
             PAI_CODIGO,
             CTE_CEP,
             CTE_TELEFONE,
             CTE_FAX,
             CTE_EMAIL,
             CTE_CGC,
             CTE_IE)
          
            SELECT n_prop_nova PRP_CODIGO,
                   CTE_NOME,
                   CTE_ENDERECO1,
                   CTE_ENDERECO2,
                   CTE_ENDERECO3,
                   CTE_CIDADE,
                   EST_CODIGO,
                   CTE_ESTADO,
                   PAI_CODIGO,
                   CTE_CEP,
                   CTE_TELEFONE,
                   CTE_FAX,
                   CTE_EMAIL,
                   CTE_CGC,
                   CTE_IE
              FROM CLIENTE_TEMP
             WHERE PRP_CODIGO = n_prop;
        
        EXCEPTION
          WHEN OTHERS THEN
          
            NULL;
          
        END;
      
      END IF;
    
    END LOOP;
  /*
    FOR cur_cont IN (SELECT *
                       FROM SIAOS.CONTATO_PROP
                      WHERE CONTATO_PROP.PRP_CODIGO = n_prop) LOOP
    
      SIAOS.PCK_SMART_SALES3.SP_CONTATO(1,
                                        n_prop_nova,
                                        n_cop_numero,
                                        cur_cont.COP_TIPO,
                                        cur_cont.COP_NOME,
                                        cur_cont.COP_CARGO,
                                        cur_cont.COP_DEPARTAMENTO,
                                        cur_cont.COP_FONE,
                                        cur_cont.COP_CELULAR,
                                        cur_cont.COP_EMAIL,
                                        cur_cont.COP_FAX,
                                        1);
    
    END LOOP;
    /*
      FOR cur_txt IN (SELECT *
                        FROM PROPOSTA_IMP
                       WHERE PROPOSTA_IMP.PRP_CODIGO = n_prop) LOOP
      
        INSERT INTO SIAOS.PROPOSTA_IMP
          (PRP_CODIGO,
           PIM_TEXTO,
           PIM_TEXTO2,
           PIM_TXT_INTRO,
           PIM_TEXTO_TECNICO,
           PIM_TEXTO_TECNICO2,
           PIM_TIPO,
           PIM_AGRUPAMENTO,
           PIM_POSICAO_DESC,
           PIM_GRUPOS,
           PIM_LOTES,
           PIM_DADOS_OP,
           PIM_OP_PADRAO,
           PIM_VALOR_AGRUP,
           PIM_SUMARIO)
        VALUES
          (n_prop_nova,
           cur_txt.PIM_TEXTO,
           cur_txt.PIM_TEXTO2,
           cur_txt.PIM_TXT_INTRO,
           cur_txt.PIM_TEXTO_TECNICO,
           cur_txt.PIM_TEXTO_TECNICO2,
           cur_txt.PIM_TIPO,
           cur_txt.PIM_AGRUPAMENTO,
           cur_txt.PIM_POSICAO_DESC,
           cur_txt.PIM_GRUPOS,
           cur_txt.PIM_LOTES,
           cur_txt.PIM_DADOS_OP,
           cur_txt.PIM_OP_PADRAO,
           cur_txt.PIM_VALOR_AGRUP,
           cur_txt.PIM_SUMARIO);
      
      END LOOP;
    */
    -- VENDEDOR -------------------
    DELETE FROM SIAOS.VENDEDOR_PROP WHERE PRP_CODIGO = n_prop_nova;
  
    COMMIT;
  
    INSERT INTO SIAOS.VENDEDOR_PROP
      (PRP_CODIGO,
       SALESP_KEY,
       COMISSAO,
       VPR_CODIGO,
       VPR_COMIS_VEND,
       VPR_COM_PADRAO)
      SELECT n_prop_nova PRP_CODIGO,
             SALESP_KEY,
             COMISSAO,
             VPR_CODIGO,
             VPR_COMIS_VEND,
             VPR_COM_PADRAO
        FROM VENDEDOR_PROP
       WHERE VENDEDOR_PROP.PRP_CODIGO = n_prop;
  
    -- TRANSPORTADORA --------------
    DELETE FROM SIAOS.TRANSP_PROP WHERE PRP_CODIGO = n_prop_nova;
    COMMIT;
  
    INSERT INTO SIAOS.TRANSP_PROP
      (PRP_CODIGO, SHIP_VIA_KEY)
      SELECT n_prop_nova PRP_CODIGO, SHIP_VIA_KEY
        FROM SIAOS.TRANSP_PROP
       WHERE TRANSP_PROP.PRP_CODIGO = n_prop;
  
    -- COMPATIBILIZAR GRUPOS PARA CÓPIAS DE VERÇÕES ANTERIORES
    INSERT INTO SIAOS.ITEM_PROP_GRUPO
      (PRP_CODIGO,
       IPG_CODIGO,
       IPG_NOME,
       IPG_DESCRICAO,
       IPG_POSICAO,
       IPG_CODIGO_PAI)
      SELECT n_prop_nova PRP_CODIGO,
             IPG_CODIGO,
             IPG_NOME,
             IPG_DESCRICAO,
             IPG_POSICAO,
             IPG_CODIGO_PAI
        FROM SIAOS.ITEM_PROP_GRUPO
       WHERE ITEM_PROP_GRUPO.PRP_CODIGO = n_prop;
  
    -- DADOS DIVERSOS ----------------
  
    INSERT INTO SIAOS.ITEM_PROP_DIV
      (PRP_CODIGO, IPR_ITEM_PROP, IPI_CODIGO, IPI_DESCRICAO, IPI_OCULTA)
      SELECT n_prop_nova PRP_CODIGO,
             IPR_ITEM_PROP,
             IPI_CODIGO,
             IPI_DESCRICAO,
             IPI_OCULTA
        FROM SIAOS.ITEM_PROP_DIV
       WHERE ITEM_PROP_DIV.PRP_CODIGO = n_prop;
  
    FOR c_itens IN (SELECT DISTINCT I.PRP_CODIGO,
                                    I.IPR_ITEM_PROP,
                                    O.IPG_CODIGO
                      FROM SIAOS.ITEM_PROP_UNI I
                     INNER JOIN SIAOS.ITEM_PROP O
                        ON I.PRP_CODIGO = O.PRP_CODIGO
                       AND I.IPR_ITEM_PROP = O.IPR_ITEM_PROP
                     WHERE I.PRP_CODIGO = n_prop
                       AND I.IPR_ITEM_PAI IS NULL) LOOP
    
      SIAOS.PCK_SMART_SALES3.SP_COPIA_ITEM(c_itens.PRP_CODIGO,
                                           n_prop_nova,
                                           c_itens.IPG_CODIGO,
                                           c_itens.IPR_ITEM_PROP,
                                           NULL,
                                           NULL,
                                           n_item_novo);
    
    END LOOP;
  
    -- ITEM ------------------------
    /*
    INSERT
      INTO SIAOS.ITEM_PROP_UNI
          (PRP_CODIGO,
           IPR_ITEM_PROP,
           IPU_DETALHE,
           IPU_DATA,
           IPU_VALOR_COTADO,
           IPU_OCULTO,
           IPU_OCULTA_QTD,
           CCF,
           IPR_ITEM_PAI,
           MPR_CODIGO,
           IPU_VLCUSTO,
           TES_RECNO,
           IPU_NCM)
    SELECT n_prop_nova PRP_CODIGO,
           IPR_ITEM_PROP,
           IPU_DETALHE,
           IPU_DATA,
           IPU_VALOR_COTADO,
           IPU_OCULTO,
           IPU_OCULTA_QTD,
           CCF,
           IPR_ITEM_PAI,
           MPR_CODIGO,
           IPU_VLCUSTO,
           TES_RECNO,
           IPU_NCM
      FROM SIAOS.ITEM_PROP_UNI
     WHERE ITEM_PROP_UNI.PRP_CODIGO = n_prop;
    
    FOR cur_item IN (SELECT ITEM_PROP.IPR_CODIGO,
                            ITEM_PROP.PRP_CODIGO,
                            ITEM_PROP.PRO_CODIGO,
                            ITEM_PROP.IPR_ITEM_PROP,
                            ITEM_PROP.IPR_ITEM,
                            ITEM_PROP.IPR_CLASSE,
                            ITEM_PROP.IPR_PRECO,
                            ITEM_PROP.IPR_VENDA_FIM,
                            ITEM_PROP.IPR_VENDA_CLI,
                            ITEM_PROP.IPR_ADICIONAL,
                            ITEM_PROP.IPR_QUANTIDADE,
                            ITEM_PROP.IPR_DESC_FIM,
                            ITEM_PROP.IPR_DESC_CLI,
                            ITEM_PROP.IPR_ANTECIPA,
                            ITEM_PROP.IPR_FATURA,
                            ITEM_PROP.IPR_IPI,
                            ITEM_PROP.IPR_ICMS,
                            ITEM_PROP.IPR_ISS,
                            ITEM_PROP.IPR_APNF,
                            ITEM_PROP.IPR_OBS,
                            ITEM_PROP.IPR_SELO_LADO,
                            ITEM_PROP.IPR_COD_TR,
                            ITEM_PROP.IPR_DIVERSOS,
                            ITEM_PROP.IPR_LOTE,
                            ITEM_PROP.IPR_COPIA,
                            ITEM_PROP.TIPO,
                            ITEM_PROP.IPR_REFUGO,
                            ITEM_PROP.IPR_OS_REV,
                            ITEM_PROP.IPR_ITEM_REV,
                            ITEM_PROP.IPR_LINK_MANUAL,
                            ITEM_PROP.IPG_CODIGO,
                            ITEM_PROP.IPR_FOLHA,
                            ITEM_PROP.IPR_HOLD,
                            ITEM_PROP.IPR_POSICAO,
                            PRODUTO.TEMDATASHEET
                       FROM SIAOS.ITEM_PROP, SIAOS.PRODUTO
                      WHERE ITEM_PROP.PRO_CODIGO = PRODUTO.PRODUTO
                        AND ITEM_PROP.PRP_CODIGO = n_prop
                        AND ITEM_PROP.IPR_COD_TR IS NULL
                      ORDER BY ITEM_PROP.IPG_CODIGO,
                               ITEM_PROP.IPR_FOLHA,
                               ITEM_PROP.IPR_CODIGO) LOOP
    
      IF (cur_item.TEMDATASHEET IS NOT NULL) AND
         (cur_item.IPG_CODIGO IS NULL) AND (n_criar_grupo IS NULL) THEN
        n_criar_grupo := 1;
      END IF;
    
      INSERT INTO SIAOS.ITEM_PROP
        (PRP_CODIGO,
         PRO_CODIGO,
         IPR_ITEM_PROP,
         IPR_ITEM,
         IPR_CLASSE,
         IPR_PRECO,
         IPR_VENDA_FIM,
         IPR_VENDA_CLI,
         IPR_ADICIONAL,
         IPR_QUANTIDADE,
         IPR_DESC_FIM,
         IPR_DESC_CLI,
         IPR_ANTECIPA,
         IPR_FATURA,
         IPR_IPI,
         IPR_ICMS,
         IPR_ISS,
         IPR_APNF,
         IPR_OBS,
         IPR_SELO_LADO,
         IPR_DIVERSOS,
         IPR_LOTE,
         IPR_COPIA,
         TIPO,
         IPR_LINK_MANUAL,
         IPG_CODIGO,
         IPR_FOLHA,
         IPR_HOLD,
         IPR_POSICAO)
      VALUES
        (n_prop_nova,
         cur_item.PRO_CODIGO,
         cur_item.IPR_ITEM_PROP,
         cur_item.IPR_ITEM,
         cur_item.IPR_CLASSE,
         cur_item.IPR_PRECO,
         cur_item.IPR_VENDA_FIM,
         cur_item.IPR_VENDA_CLI,
         cur_item.IPR_ADICIONAL,
         cur_item.IPR_QUANTIDADE,
         cur_item.IPR_DESC_FIM,
         cur_item.IPR_DESC_CLI,
         cur_item.IPR_ANTECIPA,
         cur_item.IPR_FATURA,
         cur_item.IPR_IPI,
         cur_item.IPR_ICMS,
         cur_item.IPR_ISS,
         cur_item.IPR_APNF,
         cur_item.IPR_OBS,
         cur_item.IPR_SELO_LADO,
         cur_item.IPR_DIVERSOS,
         1,
         cur_item.IPR_COPIA,
         cur_item.TIPO,
         cur_item.IPR_LINK_MANUAL,
         cur_item.IPG_CODIGO,
         cur_item.IPR_FOLHA,
         cur_item.IPR_HOLD,
         cur_item.IPR_POSICAO)
      RETURNING IPR_CODIGO INTO n_controle;
    
      FOR cur_dado IN (SELECT NROCLAS,
                              OPCLAS,
                              IPD_TIPO,
                              IPD_VALOR_DADO,
                              IPD_VALOR,
                              STATUS,
                              IPD_DESCRICAO_P,
                              IPD_DESCRICAO_I,
                              IPD_CANCELA
                         FROM SIAOS.ITEM_PROP_DADO
                        WHERE IPR_CODIGO = cur_item.IPR_CODIGO) LOOP
    
        INSERT INTO SIAOS.ITEM_PROP_DADO
          (IPR_CODIGO,
           NROCLAS,
           OPCLAS,
           IPD_TIPO,
           IPD_VALOR_DADO,
           IPD_VALOR,
           STATUS,
           IPD_DESCRICAO_P,
           IPD_DESCRICAO_I,
           IPD_CANCELA)
        VALUES
          (n_controle,
           cur_dado.NROCLAS,
           cur_dado.OPCLAS,
           cur_dado.IPD_TIPO,
           cur_dado.IPD_VALOR_DADO,
           cur_dado.IPD_VALOR,
           cur_dado.STATUS,
           cur_dado.IPD_DESCRICAO_P,
           cur_dado.IPD_DESCRICAO_I,
           cur_dado.IPD_CANCELA);
    
      END LOOP;
    
      FOR cur_selo IN (SELECT IP.IPR_CODIGO,
                              IP.PRP_CODIGO,
                              IP.PRO_CODIGO,
                              IP.IPR_ITEM_PROP,
                              IP.IPR_ITEM,
                              IP.IPR_CLASSE,
                              IP.IPR_PRECO,
                              IP.IPR_VENDA_FIM,
                              IP.IPR_VENDA_CLI,
                              IP.IPR_ADICIONAL,
                              IP.IPR_QUANTIDADE,
                              IP.IPR_DESC_FIM,
                              IP.IPR_DESC_CLI,
                              IP.IPR_ANTECIPA,
                              IP.IPR_FATURA,
                              IP.IPR_IPI,
                              IP.IPR_ICMS,
                              IP.IPR_ISS,
                              IP.IPR_APNF,
                              IP.IPR_OBS,
                              IP.IPR_SELO_LADO,
                              IP.IPR_COD_TR,
                              IP.IPR_DIVERSOS,
                              IP.IPR_LOTE,
                              IP.IPR_COPIA,
                              IP.TIPO,
                              IP.IPR_REFUGO,
                              IP.IPR_OS_REV,
                              IP.IPR_ITEM_REV,
                              IP.IPR_LINK_MANUAL,
                              IP.IPG_CODIGO,
                              IP.IPR_FOLHA,
                              IP.IPR_HOLD,
                              IP.IPR_POSICAO
                         FROM SIAOS.ITEM_PROP IP
                        WHERE IP.IPR_COD_TR = cur_item.IPR_CODIGO) LOOP
        INSERT INTO SIAOS.ITEM_PROP
          (PRP_CODIGO,
           PRO_CODIGO,
           IPR_ITEM_PROP,
           IPR_ITEM,
           IPR_CLASSE,
           IPR_PRECO,
           IPR_VENDA_FIM,
           IPR_VENDA_CLI,
           IPR_ADICIONAL,
           IPR_QUANTIDADE,
           IPR_DESC_FIM,
           IPR_DESC_CLI,
           IPR_ANTECIPA,
           IPR_FATURA,
           IPR_IPI,
           IPR_ICMS,
           IPR_ISS,
           IPR_APNF,
           IPR_OBS,
           IPR_SELO_LADO,
           IPR_COD_TR,
           IPR_DIVERSOS,
           IPR_LOTE,
           IPR_COPIA,
           TIPO,
           IPR_REFUGO,
           IPR_OS_REV,
           IPR_ITEM_REV,
           IPR_LINK_MANUAL,
           IPG_CODIGO,
           IPR_FOLHA,
           IPR_HOLD,
           IPR_POSICAO)
        VALUES
          (n_prop_nova,
           cur_selo.PRO_CODIGO,
           cur_selo.IPR_ITEM_PROP,
           cur_selo.IPR_ITEM,
           cur_selo.IPR_CLASSE,
           cur_selo.IPR_PRECO,
           cur_selo.IPR_VENDA_FIM,
           cur_selo.IPR_VENDA_CLI,
           cur_selo.IPR_ADICIONAL,
           cur_selo.IPR_QUANTIDADE,
           cur_selo.IPR_DESC_FIM,
           cur_selo.IPR_DESC_CLI,
           cur_selo.IPR_ANTECIPA,
           cur_selo.IPR_FATURA,
           cur_selo.IPR_IPI,
           cur_selo.IPR_ICMS,
           cur_selo.IPR_ISS,
           cur_selo.IPR_APNF,
           cur_selo.IPR_OBS,
           cur_selo.IPR_SELO_LADO,
           n_controle,
           cur_selo.IPR_DIVERSOS,
           1,
           cur_selo.IPR_COPIA,
           cur_selo.TIPO,
           cur_selo.IPR_REFUGO,
           cur_selo.IPR_OS_REV,
           cur_selo.IPR_ITEM_REV,
           cur_selo.IPR_LINK_MANUAL,
           cur_selo.IPG_CODIGO,
           cur_selo.IPR_FOLHA,
           cur_selo.IPR_HOLD,
           cur_selo.IPR_POSICAO)
        RETURNING IPR_CODIGO INTO n_controle2;
    
        FOR cur_dado IN (SELECT NROCLAS,
                                OPCLAS,
                                IPD_TIPO,
                                IPD_VALOR_DADO,
                                IPD_VALOR,
                                STATUS,
                                IPD_DESCRICAO_P,
                                IPD_DESCRICAO_I,
                                IPD_CANCELA
                           FROM SIAOS.ITEM_PROP_DADO
                          WHERE IPR_CODIGO = cur_selo.IPR_CODIGO) LOOP
    
          INSERT INTO SIAOS.ITEM_PROP_DADO
            (IPR_CODIGO,
             NROCLAS,
             OPCLAS,
             IPD_TIPO,
             IPD_VALOR_DADO,
             IPD_VALOR,
             STATUS,
             IPD_DESCRICAO_P,
             IPD_DESCRICAO_I,
             IPD_CANCELA)
          VALUES
            (n_controle2,
             cur_dado.NROCLAS,
             cur_dado.OPCLAS,
             cur_dado.IPD_TIPO,
             cur_dado.IPD_VALOR_DADO,
             cur_dado.IPD_VALOR,
             cur_dado.STATUS,
             cur_dado.IPD_DESCRICAO_P,
             cur_dado.IPD_DESCRICAO_I,
             cur_dado.IPD_CANCELA);
    
        END LOOP;
    
      END LOOP;
    
    END LOOP;
        */
  
    COMMIT;
    /*
        -- COMPATIBILIZAR GRUPOS PARA CÓPIAS DE VERÇÕES ANTERIORES
        IF n_criar_grupo = 1 THEN
    
          SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_ipg_codigo,
                                                n_prop_nova,
                                                NULL,
                                                1,
                                                NULL);
    
          COMMIT;
    
          FOR cur_item IN (SELECT ITEM_PROP.ROWID ID, TEMDATASHEET
                             FROM SIAOS.ITEM_PROP, SIAOS.PRODUTO
                            WHERE ITEM_PROP.PRO_CODIGO = PRODUTO.PRODUTO
                              AND ITEM_PROP.PRP_CODIGO = n_prop_nova
                              AND IPR_COD_TR IS NULL
                            ORDER BY IPR_CODIGO) LOOP
    
            IF cur_item.TEMDATASHEET = 1 THEN
    
              UPDATE SIAOS.ITEM_PROP
                 SET IPG_CODIGO = n_ipg_codigo
               WHERE ITEM_PROP.ROWID = cur_item.ID;
    
            END IF;
    
          END LOOP;
    
        END IF;
    
        COMMIT;
    
        FOR cur_item2 IN (SELECT DISTINCT IPR_ITEM_PROP
                           FROM SIAOS.ITEM_PROP
                          WHERE IPR_CODIGO = n_prop_nova) LOOP
    
          SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prop_nova,
                                                         cur_item2.IPR_ITEM_PROP,
                                                         n_ipr_preco);
    
        END LOOP;
    */
    --   SIAOS.PCK_SMART_SALES3.SP_PASTAS_AUTOMATICAS(1, n_prop_nova, 0, NULL, n_erro);
  
  END SP_COPIA_OS;

  ----------------------------------------------------------
  -------- COPIA ITEM DA PROPOSTA  -------------------------
  ----------------------------------------------------------

  PROCEDURE SP_COPIA_ITEM(n_prop       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_prop_para  IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_ipg_codigo IN SIAOS.ITEM_PROP.IPG_CODIGO%TYPE,
                          n_item       IN SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE,
                          n_pas_codigo IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE,
                          n_selo       IN INTEGER,
                          n_item_novo  OUT SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE) IS
  
    n_erro        INTEGER := 0;
    n_item_novo2  SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE;
    n_item_pai_sr SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE;
    n_preco       SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
    n_ipg_codigo2 SIAOS.ITEM_PROP.IPG_CODIGO%TYPE;
  
  BEGIN
  
    FOR cur_ppro IN (SELECT IP.PRO_CODIGO PRODUTO,
                            TRIM(IP.IPR_ITEM) PAP_OPCOES,
                            TRIM(IP.IPR_CLASSE) PAP_OPESP,
                            SUM(IP.IPR_QUANTIDADE) QTD,
                            IP.IPR_DIVERSOS,
                            IP.IPR_NAO_FAB,
                            IP.IPR_OBS,
                            IP.IPR_VENDA_FIM,
                            IP.IPR_VENDA_CLI,
                            IP.IPR_DESC_FIM,
                            IP.IPR_DESC_CLI,
                            IPU.IPU_OCULTO,
                            IPU.IPU_OCULTA_QTD,
                            IPU.IPU_VALOR_COTADO,
                            IP.IPG_CODIGO
                       FROM SIAOS.ITEM_PROP IP
                      INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                         ON IP.PRP_CODIGO = IPU.PRP_CODIGO
                        AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                      WHERE IP.PRP_CODIGO = n_prop
                        AND IP.IPR_ITEM_PROP = n_item
                      GROUP BY IP.PRO_CODIGO,
                               IP.IPR_ITEM,
                               IP.IPR_CLASSE,
                               IP.IPR_DIVERSOS,
                               IP.IPR_NAO_FAB,
                               IP.IPR_OBS,
                               IP.IPR_VENDA_FIM,
                               IP.IPR_VENDA_CLI,
                               IP.IPR_DESC_FIM,
                               IP.IPR_DESC_CLI,
                               IPU.IPU_OCULTO,
                               IPU.IPU_OCULTA_QTD,
                               IPU.IPU_VALOR_COTADO,
                               IP.IPG_CODIGO) LOOP
      n_item_novo2 := NULL;
    
      IF n_selo = 1 THEN
      
        SELECT DISTINCT I.IPR_ITEM_PAI
          INTO n_item_pai_sr
          FROM SIAOS.ITEM_PROP_UNI I
         WHERE I.PRP_CODIGO = n_prop
           AND I.IPR_ITEM_PROP = n_item;
      
        SIAOS.PCK_SMART_SALES3.SP_IN_SELO_REMO(n_prop_para,
                                               cur_ppro.PRODUTO,
                                               1,
                                               n_item_pai_sr,
                                               n_pas_codigo,
                                               n_item_novo);
      
      ELSE
        SIAOS.PCK_SMART_SALES3.SP_IN_PRODUTO1(n_prop_para,
                                              cur_ppro.PRODUTO,
                                              cur_ppro.QTD,
                                              NULL,
                                              cur_ppro.IPR_DIVERSOS,
                                              cur_ppro.IPR_NAO_FAB,
                                              NULL,
                                              n_pas_codigo,
                                              NULL,
                                              n_item_novo);
      
      END IF;
    
      FOR cur_item IN (SELECT ID.IPI_CODIGO, ID.IPI_DESCRICAO, ID.IPI_OCULTA
                         FROM SIAOS.ITEM_PROP_DIV ID
                        WHERE ID.PRP_CODIGO = n_prop
                          AND ID.IPR_ITEM_PROP = n_item) LOOP
        BEGIN
          INSERT INTO SIAOS.ITEM_PROP_DIV
            (PRP_CODIGO,
             IPR_ITEM_PROP,
             IPI_CODIGO,
             IPI_DESCRICAO,
             IPI_OCULTA)
          VALUES
            (n_prop_para,
             n_item_novo,
             cur_item.IPI_CODIGO,
             cur_item.IPI_DESCRICAO,
             cur_item.IPI_OCULTA);
        EXCEPTION
          WHEN OTHERS THEN
            NULL;
        END;
      END LOOP;
    
      IF n_ipg_codigo IS NULL THEN
        n_ipg_codigo2 := cur_ppro.IPG_CODIGO;
      ELSE
        n_ipg_codigo2 := n_ipg_codigo;
      END IF;
    
      SIAOS.PCK_SMART_SALES3.SP_AGRUPA_ITEM(n_prop_para,
                                            n_item_novo,
                                            n_ipg_codigo2);
    
      SIAOS.PCK_SMART_SALES3.SP_UP_PRO_ITEM(n_prop_para,
                                            cur_ppro.PAP_OPCOES,
                                            cur_ppro.IPR_OBS,
                                            n_item_novo,
                                            NULL);
    
      SIAOS.PCK_SMART_SALES3.SP_UP_PRO_CLAS(n_prop_para,
                                            cur_ppro.PRODUTO,
                                            cur_ppro.PAP_OPESP,
                                            cur_ppro.IPR_OBS,
                                            n_item_novo);
    
      FOR cur_ppro2 IN (SELECT DISTINCT IPS.IPR_ITEM_PROP,
                                        IPS.IPR_LINK_MANUAL,
                                        IPS.IPR_SELO_LADO,
                                        IPS.IPR_FOLHA
                          FROM SIAOS.ITEM_PROP_UNI IPU
                         INNER JOIN SIAOS.ITEM_PROP_UNI IPUS
                            ON IPUS.PRP_CODIGO = IPU.PRP_CODIGO
                           AND IPUS.IPR_ITEM_PROP = IPU.IPR_ITEM_PAI
                         INNER JOIN SIAOS.ITEM_PROP IPS
                            ON IPS.PRP_CODIGO = IPU.PRP_CODIGO
                           AND IPS.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                         WHERE IPU.PRP_CODIGO = n_prop
                           AND IPUS.IPR_ITEM_PROP = n_item
                         ORDER BY IPS.IPR_FOLHA) LOOP
      
        SIAOS.PCK_SMART_SALES3.SP_COPIA_ITEM(n_prop,
                                             n_prop_para,
                                             n_ipg_codigo2,
                                             cur_ppro2.IPR_ITEM_PROP,
                                             n_pas_codigo,
                                             NULL,
                                             n_item_novo2);
        SIAOS.PCK_SMART_SALES3.SP_AMARRA_ITEMS(n_prop_para,
                                               n_item_novo,
                                               n_item_novo2,
                                               n_erro);
        SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prop_para,
                                                       n_item_novo,
                                                       n_preco);
      
        UPDATE SIAOS.ITEM_PROP IP
           SET IP.IPR_LINK_MANUAL = cur_ppro2.IPR_LINK_MANUAL,
               IP.IPR_SELO_LADO   = cur_ppro2.IPR_SELO_LADO
         WHERE PRP_CODIGO = n_prop_para
           AND IPR_ITEM_PROP = n_item_novo2;
      
      END LOOP;
      /*
            FOR cur_ppro3 IN (SELECT IPD.IPI_CODIGO, IPD.IPI_DESCRICAO
                                FROM SIAOS.ITEM_PROP_DIV IPD
                               WHERE IPD.PRP_CODIGO = n_prop
                                 AND IPD.IPR_ITEM_PROP = n_item
                               ORDER BY IPD.IPI_CODIGO) LOOP
      
              INSERT INTO SIAOS.ITEM_PROP_DIV
                (PRP_CODIGO, IPR_ITEM_PROP, IPI_CODIGO, IPI_DESCRICAO)
              VALUES
                (n_prop_para,
                 n_item_novo,
                 cur_ppro3.IPI_CODIGO,
                 cur_ppro3.IPI_DESCRICAO);
      
            END LOOP;
      */
      UPDATE SIAOS.ITEM_PROP_UNI
         SET IPU_OCULTO       = cur_ppro.IPU_OCULTO,
             IPU_OCULTA_QTD   = cur_ppro.IPU_OCULTA_QTD,
             IPU_VALOR_COTADO = cur_ppro.IPU_VALOR_COTADO
       WHERE PRP_CODIGO = n_prop_para
         AND IPR_ITEM_PROP = n_item_novo;
    
      UPDATE SIAOS.ITEM_PROP IP
         SET IP.IPR_VENDA_FIM = cur_ppro.IPR_VENDA_FIM,
             IP.IPR_VENDA_CLI = cur_ppro.IPR_VENDA_CLI,
             IP.IPR_DESC_FIM  = cur_ppro.IPR_DESC_FIM,
             IP.IPR_DESC_CLI  = cur_ppro.IPR_DESC_CLI
       WHERE PRP_CODIGO = n_prop_para
         AND IPR_ITEM_PROP = n_item_novo;
    
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prop_para,
                                                     n_item_novo,
                                                     n_preco);
    
    END LOOP;
  
    COMMIT;
  
    SIAOS.PCK_SMART_SALES3.SP_ARRUMA_GRUPO(n_prop_para, n_ipg_codigo);
  
  END SP_COPIA_ITEM;

  ----------------------------------------------------------
  -------- GRAVA DESCRIÇÃO NO CAMPO CONSULTA DE PRAZO ------
  ----------------------------------------------------------

  FUNCTION SF_TIPO_LINK(n_prop IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                        n_item IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN CHAR IS
  
    n_pai   INTEGER := 0;
    n_filho INTEGER := 0;
    v_tipo  CHAR(1) := 'N';
  
  BEGIN
  
    SELECT COUNT(NVL(IP.IPR_CODIGO, 0))
      INTO n_pai
      FROM SIAOS.ITEM_PROP IP, SIAOS.ITEM_PROP SR
     WHERE IP.IPR_CODIGO = SR.IPR_COD_TR
       AND IP.PRP_CODIGO = n_prop
       AND IP.IPR_ITEM_PROP = n_item;
  
    IF n_pai = 0 THEN
    
      SELECT COUNT(NVL(ITEM_PROP.IPR_CODIGO, 0))
        INTO n_filho
        FROM SIAOS.ITEM_PROP
       WHERE ITEM_PROP.PRP_CODIGO = n_prop
         AND ITEM_PROP.IPR_ITEM_PROP = n_item
         AND ITEM_PROP.IPR_COD_TR IS NOT NULL;
    
      IF n_filho > 0 THEN
        v_tipo := 'F'; -- TRANSM FILHO
      ELSE
        v_tipo := 'N'; -- TRANSM NADA
      END IF;
    
    ELSE
      v_tipo := 'P'; -- TRANSM PAI
    END IF;
  
    RETURN(v_tipo);
  
  END SF_TIPO_LINK;

  ----------------------------------------------------------
  -------- GRAVA COMPLEMENTO PARA O.S.s DE REVISÕES --------
  ----------------------------------------------------------

  PROCEDURE SP_UP_ITEM_REV(n_ipr_codigo   IN SIAOS.ITEM_REV.IPR_CODIGO%TYPE,
                           n_ire_garantia IN SIAOS.ITEM_REV.IRE_GARANTIA%TYPE,
                           v_ire_local    IN SIAOS.ITEM_REV.IRE_LOCAL%TYPE,
                           n_pri_codigo   IN SIAOS.ITEM_REV.PRI_CODIGO%TYPE,
                           n_set_codigo   IN SIAOS.ITEM_REV.SET_CODIGO%TYPE,
                           n_tcam_codigo  IN SIAOS.ITEM_REV.TCAM_CODIGO%TYPE,
                           n_erro         OUT NUMBER) IS
  
  BEGIN
  
    UPDATE SIAOS.ITEM_REV
       SET ITEM_REV.IRE_GARANTIA = n_ire_garantia,
           ITEM_REV.IRE_LOCAL    = v_ire_local,
           ITEM_REV.PRI_CODIGO   = n_pri_codigo,
           ITEM_REV.SET_CODIGO   = n_set_codigo,
           ITEM_REV.TCAM_CODIGO  = n_tcam_codigo
     WHERE ITEM_REV.IPR_CODIGO IN
           (SELECT IP.IPR_CODIGO
              FROM SIAOS.ITEM_PROP IP
             WHERE IP.IPR_CODIGO = n_ipr_codigo
                OR IP.IPR_COD_TR = n_ipr_codigo);
  
    IF NOT SQL%FOUND THEN
      n_erro := 1;
    END IF;
  
    COMMIT;
  
  END SP_UP_ITEM_REV;

  ----------------------------------------------------------
  -------- GRAVA COMPLEMENTO PARA O.S.s DE REVISÕES --------
  ----------------------------------------------------------

  PROCEDURE SP_PROP_REV(n_prp_codigo     IN SIAOS.PROP_REVISOES.PRP_CODIGO%TYPE,
                        n_prs_frete      IN SIAOS.PROP_REVISOES.PRS_FRETE%TYPE,
                        v_prs_documento  IN SIAOS.PROP_REVISOES.PRS_DOCUMENTO%TYPE,
                        v_prs_nf_entrada IN SIAOS.PROP_REVISOES.PRS_NF_ENTRADA%TYPE,
                        n_erro           OUT NUMBER) IS
  
  BEGIN
  
    n_erro := 0;
  
    BEGIN
    
      INSERT INTO SIAOS.PROP_REVISOES
        (PRP_CODIGO, PRS_FRETE, PRS_DOCUMENTO, PRS_NF_ENTRADA)
      VALUES
        (n_prp_codigo, n_prs_frete, v_prs_documento, v_prs_nf_entrada);
    
    EXCEPTION
      WHEN OTHERS THEN
      
        UPDATE SIAOS.PROP_REVISOES
           SET PROP_REVISOES.PRS_FRETE      = n_prs_frete,
               PROP_REVISOES.PRS_DOCUMENTO  = v_prs_documento,
               PROP_REVISOES.PRS_NF_ENTRADA = v_prs_nf_entrada
         WHERE PROP_REVISOES.PRP_CODIGO = n_prp_codigo;
      
        IF NOT SQL%FOUND THEN
          n_erro := 1;
        END IF;
      
    END;
  
    COMMIT;
  
  END SP_PROP_REV;

  ----------------------------------------------------------------------------------------------------
  -- Gera e-mail para Cliente informando o recebimento do PO e número da OS gerada -------------------
  ----------------------------------------------------------------------------------------------------
  PROCEDURE SP_EMAIL_CLIENTE(vc2_de       IN SIAOS.PASTA_EMAIL.EML_DE%TYPE,
                             vc2_para     IN SIAOS.PASTA_EMAIL.EML_PARA%TYPE,
                             vc2_assunto  IN SIAOS.PASTA_EMAIL.EML_ASSUNTO%TYPE,
                             clb_conteudo IN SIAOS.PASTA_EMAIL.EML_CONTEUDO1%TYPE) IS
  
    clb_corpo SIAOS.PASTA_EMAIL.EML_CONTEUDO1%TYPE;
  
  BEGIN
  
    clb_corpo := '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
                         <html>
                         <head>
                         <title>Untitled Document</title>
                         <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
                         </head>

                         <body>
                         <table width="100%" border="1" cellpadding="1">
                           <tr>
                             <td>' ||
                 REPLACE(clb_conteudo, CHR(10), '<br>') || '
                             </td>
                           </tr>
                         </table>

                         </body>
                         </html>';
  
    SIAOS.PCK_DQANET.SP_IN_EMAIL(vc2_de, vc2_para, vc2_assunto, clb_corpo);
  
  END SP_EMAIL_CLIENTE;

  ---------------------------------------------------------------------
  -- Altera preço da proposta de acordo com a moeda -------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_ALTERA_PRECO_PROP(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
    c_ifi_codigo SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    n_preco      SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
  
  BEGIN
  
    SELECT PROPOSTA.IFI_CODIGO
      INTO c_ifi_codigo
      FROM SIAOS.PROPOSTA
     WHERE PROPOSTA.PRP_CODIGO = n_proposta;
  
    FOR c_prop IN (SELECT DISTINCT IPR_ITEM_PROP,
                                   PRO_CODIGO,
                                   IPR_ITEM,
                                   IPR_CLASSE,
                                   IPR_PRECO,
                                   IPR_ADICIONAL,
                                   IPR_DESC_FIM,
                                   IPR_DESC_CLI,
                                   IPR_VENDA_CLI,
                                   IPR_VENDA_FIM,
                                   IPR_ICMS,
                                   IPR_IPI
                     FROM SIAOS.ITEM_PROP
                    WHERE ITEM_PROP.PRP_CODIGO = N_PROPOSTA) LOOP
    
      --- INSERE PREÇO
    
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo    => n_proposta,
                                                     n_ipr_item_prop => c_prop.IPR_ITEM_PROP,
                                                     n_preco         => n_preco);
    
    END LOOP;
  
  END SP_ALTERA_PRECO_PROP;

  ---------------------------------------------------------------------
  -- Altera preço da proposta de acordo com a moeda -------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_IMPORTA_PROP(n_pre IN INTEGER, n_proposta OUT INTEGER) IS
  
    n_cont       INTEGER := 1;
    c_ori_codigo SIAOS.PROPOSTA.ORI_CODIGO%TYPE := 'CO';
  
  BEGIN
  
    FOR c_ponte IN (SELECT PRP_CODIGO, USU_CHAPA, CLI_CODIGO
                      FROM SIAOS.PROP_PONTE
                     WHERE PROP_PONTE.PPO_CODIGO = n_pre) LOOP
      SIAOS.PCK_SMART_SALES3.SP_NOVA_PROPOSTA(USER,
                                              c_ponte.USU_CHAPA,
                                              c_ponte.CLI_CODIGO,
                                              c_ori_codigo,
                                              n_proposta);
      SIAOS.PCK_SMART_SALES3.SP_UP_CLIENTE_FIM(n_proposta,
                                               c_ponte.CLI_CODIGO);
    
      FOR c_item IN (SELECT PRO_CODIGO,
                            PIP_PRO_DESC,
                            PIP_ITEM,
                            PIP_CLASSE,
                            PIP_PRECO,
                            PIP_QUANTIDADE
                       FROM SIAOS.PROP_ITEM_PONTE
                      WHERE PROP_ITEM_PONTE.PPO_CODIGO = n_pre
                      ORDER BY PIP_CODIGO) LOOP
        SIAOS.PCK_SMART_SALES3.SP_IN_PRODUTO1(n_proposta,
                                              c_item.PRO_CODIGO,
                                              c_item.PIP_QUANTIDADE,
                                              NULL,
                                              c_item.PIP_PRO_DESC,
                                              0,
                                              c_item.PIP_ITEM,
                                              NULL,
                                              NULL,
                                              n_cont);
        IF c_item.PIP_CLASSE IS NOT NULL THEN
          SIAOS.PCK_SMART_SALES3.SP_UP_PRO_CLAS(n_proposta,
                                                c_item.PRO_CODIGO,
                                                c_item.PIP_CLASSE,
                                                NULL,
                                                n_cont);
        END IF;
      END LOOP;
    
    END LOOP;
  
    UPDATE SIAOS.PROP_PONTE
       SET PROP_PONTE.PRP_CODIGO = n_proposta
     WHERE PROP_PONTE.PPO_CODIGO = n_pre;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      NULL;
    
  END SP_IMPORTA_PROP;

  ---------------------------------------------------------------------
  ------------------------ Arruma Lotes -------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_ARRUMA_LOTE(n_proposta IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
  BEGIN
  
    UPDATE SIAOS.ITEM_PROP
       SET IPR_LOTE = NULL
     WHERE PRP_CODIGO = n_proposta
       AND IPR_HOLD = 1;
  
    FOR c_lotes IN (SELECT LOTES.*, ROWNUM LOTE
                      FROM (SELECT NVL(IPR_SEMANA_ENT, 0) IPR_SEMANA_ENT,
                                   NVL(IPR_SEMAN_CONS, 0) IPR_SEMAN_CONS,
                                   NVL(TO_CHAR(IPR_DT_CONTRAT, 'YYYYMMDD'), 0) IPR_DT_CONTRAT,
                                   I.IPR_STATUS_CONS
                              FROM SIAOS.ITEM_PROP I
                             WHERE PRP_CODIGO = n_proposta
                               AND IPR_HOLD = 0
                               AND IPR_LOTE IS NOT NULL
                             GROUP BY IPR_SEMANA_ENT,
                                      IPR_SEMAN_CONS,
                                      NVL(TO_CHAR(IPR_DT_CONTRAT, 'YYYYMMDD'),
                                          0),
                                      I.IPR_STATUS_CONS
                             ORDER BY IPR_SEMANA_ENT,
                                      IPR_SEMAN_CONS,
                                      TRUNC(IPR_DT_CONTRAT)) LOTES) LOOP
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_LOTE = c_lotes.LOTE
       WHERE PRP_CODIGO = n_proposta
         AND NVL(IPR_SEMANA_ENT, 0) = c_lotes.IPR_SEMANA_ENT
         AND NVL(IPR_SEMAN_CONS, 0) = c_lotes.IPR_SEMAN_CONS
         AND NVL(TO_CHAR(IPR_DT_CONTRAT, 'YYYYMMDD'), 0) =
             c_lotes.IPR_DT_CONTRAT
         AND IPR_LOTE IS NOT NULL
         AND IPR_HOLD = 0
         AND (IPR_SEMANA_ENT != 999999 OR IPR_SEMANA_ENT IS NULL);
    
    END LOOP;
  
    COMMIT;
  
  END SP_ARRUMA_LOTE;

  ---------------------------------------------------------------------
  ------------------------ EDITA GRUPO --------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_EDITA_GRUPO(n_ipg_codigo     IN OUT SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                           n_prp_codigo     IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                           v_ipg_nome       IN SIAOS.ITEM_PROP_GRUPO.IPG_NOME%TYPE,
                           n_ipg_posicao    IN SIAOS.ITEM_PROP_GRUPO.IPG_POSICAO%TYPE,
                           n_ipg_codigo_pai IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO_PAI%TYPE) IS
  
    v_desc_grpos   SIAOS.ITEM_PROP_GRUPO.IPG_NOME%TYPE;
    n_grp_div      SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    n_ipg_posicao2 SIAOS.ITEM_PROP_GRUPO.IPG_POSICAO%TYPE;
  
  BEGIN
  
    IF n_ipg_codigo IS NULL THEN
    
      SELECT NVL(MAX(IPG_CODIGO), 0) + 1
        INTO n_ipg_codigo
        FROM ITEM_PROP_GRUPO
       WHERE PRP_CODIGO = n_prp_codigo;
    
      SELECT NVL(MAX(IPG_POSICAO), 0) + 1
        INTO n_ipg_posicao2
        FROM ITEM_PROP_GRUPO
       WHERE PRP_CODIGO = n_prp_codigo;
    
      SELECT O.GDI_CODIGO
        INTO n_grp_div
        FROM SIAOS.PROPOSTA P, SIAOS.ORIGEM O
       WHERE P.ORI_CODIGO = O.ORIGEM
         AND P.PRP_CODIGO = n_prp_codigo;
    
      IF n_ipg_codigo = 1 AND v_ipg_nome IS NULL THEN
      
        IF n_grp_div = 3 THEN
          v_desc_grpos := 'EMISSION';
        ELSE
          v_desc_grpos := 'EMISSAO';
        END IF;
      
      ELSE
      
        v_desc_grpos := v_ipg_nome;
      
      END IF;
    
      INSERT INTO ITEM_PROP_GRUPO
        (IPG_CODIGO,
         PRP_CODIGO,
         IPG_NOME,
         IPG_POSICAO,
         IPG_CODIGO_PAI,
         IPG_DESCRICAO)
      VALUES
        (n_ipg_codigo,
         n_prp_codigo,
         v_desc_grpos,
         n_ipg_posicao2,
         n_ipg_codigo_pai,
         clb_texto_gl);
    
    ELSIF n_ipg_codigo IS NOT NULL AND v_ipg_nome IS NOT NULL THEN
    
      UPDATE ITEM_PROP_GRUPO
         SET IPG_NOME       = v_ipg_nome,
             IPG_POSICAO    = n_ipg_posicao,
             IPG_CODIGO_PAI = n_ipg_codigo_pai,
             IPG_DESCRICAO  = clb_texto_gl
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPG_CODIGO = n_ipg_codigo;
    
    END IF;
  
  END SP_EDITA_GRUPO;

  ---------------------------------------------------------------------
  ------------------------ APAGA GURPO -------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_APAGA_GRUPO(n_ipg_codigo IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                           n_prp_codigo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE) IS
  
  BEGIN
  
    IF n_ipg_codigo IS NOT NULL THEN
    
      UPDATE SIAOS.ITEM_PROP
         SET IPG_CODIGO = NULL
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPG_CODIGO = n_ipg_codigo;
    
      UPDATE SIAOS.ITEM_PROP_GRUPO
         SET IPG_CODIGO_PAI = NULL
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPG_CODIGO_PAI = n_ipg_codigo;
    
      DELETE ITEM_PROP_GRUPO
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPG_CODIGO = n_ipg_codigo;
    
    END IF;
  
  END SP_APAGA_GRUPO;

  ---------------------------------------------------------------------
  ------------------------ APAGA GURPO -------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_COPIA_GRUPO(n_ipg_codigo IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                           n_prp_codigo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                           n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE) IS
  
    v_ipg_nome        SIAOS.ITEM_PROP_GRUPO.IPG_NOME%TYPE;
    clb_ipg_descricao SIAOS.ITEM_PROP_GRUPO.IPG_DESCRICAO%TYPE;
    n_ipg_codigo_pai  SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO_PAI%TYPE;
    n_ipg_codigo_novo SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE;
    n_ipr_item_p_novo SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE;
  
  BEGIN
  
    SELECT IPG.IPG_NOME, IPG.IPG_DESCRICAO, IPG.IPG_CODIGO_PAI
      INTO v_ipg_nome, clb_ipg_descricao, n_ipg_codigo_pai
      FROM SIAOS.ITEM_PROP_GRUPO IPG
     WHERE IPG.PRP_CODIGO = n_prp_codigo
       AND IPG.IPG_CODIGO = n_ipg_codigo;
  
    SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_ipg_codigo_novo,
                                          n_prp_codigo,
                                          v_ipg_nome,
                                          NULL,
                                          n_ipg_codigo_pai);
  
    UPDATE ITEM_PROP_GRUPO
       SET IPG_DESCRICAO = clb_ipg_descricao
     WHERE PRP_CODIGO = n_prp_codigo
       AND IPG_CODIGO = n_ipg_codigo_novo;
  
    FOR c_itens IN (SELECT DISTINCT IP.IPR_ITEM_PROP, IP.IPR_FOLHA
                      FROM SIAOS.ITEM_PROP_GRUPO IPG
                     INNER JOIN SIAOS.ITEM_PROP IP
                        ON IP.IPG_CODIGO = IPG.IPG_CODIGO
                       AND IP.PRP_CODIGO = IPG.PRP_CODIGO
                     INNER JOIN SIAOS.ITEM_PROP_UNI IPU
                        ON IP.PRP_CODIGO = IPU.PRP_CODIGO
                       AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                     WHERE IPG.PRP_CODIGO = n_prp_codigo
                       AND IPG.IPG_CODIGO = n_ipg_codigo
                       AND IPU.IPR_ITEM_PAI IS NULL
                     ORDER BY IP.IPR_FOLHA) LOOP
    
      SIAOS.PCK_SMART_SALES3.SP_COPIA_ITEM(n_prp_codigo,
                                           n_prp_codigo,
                                           n_ipg_codigo_novo,
                                           c_itens.IPR_ITEM_PROP,
                                           n_pas_codigo,
                                           NULL,
                                           n_ipr_item_p_novo);
    
    END LOOP;
  
  END SP_COPIA_GRUPO;

  ---------------------------------------------------------------------
  ------------------------ SP_AGRUPA_ITEM -----------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_AGRUPA_ITEM(n_prp_codigo    IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                           n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_ipg_codigo_d  IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE) IS
  
    n_posicao    INTEGER := 1;
    n_ipg_codigo INTEGER := 0;
  
  BEGIN
    FOR c_itens IN (SELECT DISTINCT P.IPR_ITEM_PROP,
                                    0 IPR_FOLHA,
                                    IPU.IPU_OCULTO,
                                    P.IPG_CODIGO
                      FROM ITEM_PROP P
                     INNER JOIN ITEM_PROP_UNI IPU
                        ON P.PRP_CODIGO = IPU.PRP_CODIGO
                       AND P.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                     WHERE P.PRP_CODIGO = n_prp_codigo
                       AND P.IPR_ITEM_PROP = n_ipr_item_prop
                    UNION
                    SELECT DISTINCT S.IPR_ITEM_PROP,
                                    P.IPR_FOLHA,
                                    IPU.IPU_OCULTO,
                                    P.IPG_CODIGO
                      FROM ITEM_PROP P
                     INNER JOIN ITEM_PROP_UNI IPU
                        ON P.PRP_CODIGO = IPU.PRP_CODIGO
                       AND P.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                     INNER JOIN ITEM_PROP_UNI S
                        ON S.PRP_CODIGO = IPU.PRP_CODIGO
                       AND S.IPR_ITEM_PAI = IPU.IPR_ITEM_PROP
                     WHERE P.PRP_CODIGO = n_prp_codigo
                       AND P.IPR_ITEM_PROP = n_ipr_item_prop
                     ORDER BY IPU_OCULTO, IPR_FOLHA) LOOP
    
      SELECT NVL(MAX(IPR_FOLHA), 0) + 1
        INTO n_posicao
        FROM ITEM_PROP
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPG_CODIGO = n_ipg_codigo_d;
    
      UPDATE ITEM_PROP
         SET IPG_CODIGO = n_ipg_codigo_d, IPR_FOLHA = n_posicao
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = c_itens.IPR_ITEM_PROP;
    
      IF c_itens.IPG_CODIGO != n_ipg_codigo THEN
        n_ipg_codigo := c_itens.IPG_CODIGO;
        SP_ARRUMA_GRUPO(n_prp_codigo, n_ipg_codigo);
      END IF;
    
    END LOOP;
  
  END SP_AGRUPA_ITEM;

  ---------------------------------------------------------------------
  ------------------------ SP_ARRUMA_GRUPO -----------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_ARRUMA_GRUPO(n_prp_codigo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                            n_ipg_codigo IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE) IS
  
    n_folha       INTEGER := 1;
    n_folha2      INTEGER := 1;
    v_posicao_imp VARCHAR2(10);
    v_posicao     INTEGER := 1;
    v_posicao2    INTEGER := 1;
  
  BEGIN
  
    FOR c_sempai IN (SELECT ISR.IPR_ITEM_FALTA
                       FROM (SELECT DISTINCT IU.PRP_CODIGO, IU.IPR_ITEM_PROP
                               FROM ITEM_PROP_UNI IU
                              WHERE IU.PRP_CODIGO = n_prp_codigo) I
                      RIGHT JOIN (SELECT DISTINCT IU.PRP_CODIGO,
                                                 IU.IPR_ITEM_PAI  IPR_ITEM_PROP,
                                                 IU.IPR_ITEM_PROP IPR_ITEM_FALTA
                                   FROM ITEM_PROP_UNI IU
                                  WHERE IU.PRP_CODIGO = n_prp_codigo
                                    AND IU.IPR_ITEM_PAI IS NOT NULL) ISR
                         ON I.IPR_ITEM_PROP = ISR.IPR_ITEM_PROP
                      WHERE I.IPR_ITEM_PROP IS NULL) LOOP
    
      UPDATE ITEM_PROP_UNI U
         SET U.IPR_ITEM_PAI = NULL
       WHERE U.PRP_CODIGO = n_prp_codigo
         AND U.IPR_ITEM_PROP = c_sempai.IPR_ITEM_FALTA;
    
      UPDATE ITEM_PROP U
         SET U.IPR_LINK_MANUAL = NULL
       WHERE U.PRP_CODIGO = n_prp_codigo
         AND U.IPR_ITEM_PROP = c_sempai.IPR_ITEM_FALTA;
    
    END LOOP;
  
    COMMIT;
  
    IF n_ipg_codigo IS NULL THEN
    
      FOR c_itens IN (SELECT DISTINCT IPG_CODIGO
                        FROM SIAOS.ITEM_PROP
                       WHERE ITEM_PROP.PRP_CODIGO = n_ipg_codigo) LOOP
      
        SP_ARRUMA_GRUPO(n_prp_codigo, c_itens.IPG_CODIGO);
      
      END LOOP;
    
    ELSE
    
      FOR c_itens IN (SELECT DISTINCT IPU.IPU_OCULTO,
                                      IP.IPR_FOLHA,
                                      IP.IPR_POSICAO,
                                      IPU.IPR_ITEM_PROP
                        FROM SIAOS.ITEM_PROP IP
                       INNER JOIN ITEM_PROP_UNI IPU
                          ON IP.PRP_CODIGO = IPU.PRP_CODIGO
                         AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                       WHERE IP.PRP_CODIGO = n_prp_codigo
                         AND IP.IPG_CODIGO = n_ipg_codigo
                         AND IPU.IPR_ITEM_PAI IS NULL
                       ORDER BY IPU.IPU_OCULTO,
                                IP.IPR_FOLHA,
                                IP.IPR_POSICAO,
                                IPU.IPR_ITEM_PROP) LOOP
      
        v_posicao_imp := v_posicao;
      
        UPDATE ITEM_PROP
           SET IPR_FOLHA = n_folha, IPR_POSICAO = v_posicao_imp
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_ITEM_PROP = c_itens.IPR_ITEM_PROP;
      
        COMMIT;
      
        FOR c_subit IN (SELECT DISTINCT IPU.IPU_OCULTO,
                                        IP.IPR_FOLHA,
                                        IP.IPR_POSICAO,
                                        IPU.IPR_ITEM_PROP
                          FROM SIAOS.ITEM_PROP IP
                         INNER JOIN ITEM_PROP_UNI IPU
                            ON IP.PRP_CODIGO = IPU.PRP_CODIGO
                           AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
                         WHERE IP.PRP_CODIGO = n_prp_codigo
                           AND IP.IPG_CODIGO = n_ipg_codigo
                           AND IPU.IPR_ITEM_PAI = c_itens.IPR_ITEM_PROP
                         ORDER BY IPU.IPU_OCULTO,
                                  IP.IPR_FOLHA,
                                  IP.IPR_POSICAO,
                                  IPU.IPR_ITEM_PROP) LOOP
        
          v_posicao_imp := v_posicao || '.' || v_posicao2;
        
          UPDATE ITEM_PROP
             SET IPR_FOLHA   = n_folha2,
                 IPR_POSICAO = v_posicao_imp,
                 IPG_CODIGO  = n_ipg_codigo
           WHERE PRP_CODIGO = n_prp_codigo
             AND IPR_ITEM_PROP = c_subit.IPR_ITEM_PROP;
        
          v_posicao2 := v_posicao2 + 1;
          n_folha2   := n_folha2 + 1;
        
        END LOOP;
      
        v_posicao  := v_posicao + 1;
        v_posicao2 := 1;
        n_folha2   := 1;
        n_folha    := n_folha + 1;
      
      END LOOP;
    
    END IF;
  
  END SP_ARRUMA_GRUPO;

  ---------------------------------------------------------------------
  ------------------------ SP_CONFIG_PESSOAL -----------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_CONFIG_PESSOAL IS
  
    n_qtd              INTEGER;
    clb_ppe_texto      SIAOS.PROP_PERSONAL.PPE_TEXTO%TYPE;
    clb_ppe_texto2     SIAOS.PROP_PERSONAL.PPE_TEXTO2%TYPE;
    clb_ppe_tecnico    SIAOS.PROP_PERSONAL.PPE_TEXTO_TECNICO%TYPE;
    clb_ppe_tecnico2   SIAOS.PROP_PERSONAL.PPE_TEXTO_TECNICO2%TYPE;
    n_ppe_agrupamento  SIAOS.PROP_PERSONAL.PPE_AGRUPAMENTO%TYPE := 2;
    n_ppe_posicao_desc SIAOS.PROP_PERSONAL.PPE_POSICAO_DESC%TYPE := 2;
    n_ppe_grupos       SIAOS.PROP_PERSONAL.PPE_GRUPOS%TYPE := 2;
    n_ppe_lotes        SIAOS.PROP_PERSONAL.PPE_LOTES%TYPE := 1;
    n_ppe_dados_op     SIAOS.PROP_PERSONAL.PPE_DADOS_OP%TYPE := 1;
    n_ppe_op_padrao    SIAOS.PROP_PERSONAL.PPE_OP_PADRAO%TYPE := 0;
    n_ppe_valor_agrup  SIAOS.PROP_PERSONAL.PPE_VALOR_AGRUP%TYPE := 2;
    n_usu_chapa        SIAOS.USUARIO.USU_CHAPA%TYPE;
    c_cpr_incoterm     SIAOS.CONFIGURA_PROPOSTA.CPR_INCOTERM%TYPE;
    c_cpr_validade     SIAOS.CONFIGURA_PROPOSTA.CPR_VALIDADE%TYPE := 30;
  
  BEGIN
  
    SELECT USU_CHAPA
      INTO n_usu_chapa
      FROM SIAOS.USUARIO U
     WHERE UPPER(U.USU_LOGINWEB) = UPPER(USER);
  
    SELECT NVL(COUNT(*), 0) QTD
      INTO n_qtd
      FROM PROP_PERSONAL P
     WHERE P.USU_CHAPA = n_usu_chapa;
  
    IF n_qtd = 0 THEN
    
      BEGIN
      
        INSERT INTO SIAOS.PROP_PER_ASS
          (USU_CHAPA, ASS_CHAPA)
        VALUES
          (n_usu_chapa, n_usu_chapa);
      
      EXCEPTION
        WHEN OTHERS THEN
        
          NULL;
        
      END;
    
      SELECT CPR_TEXTO,
             CPR_TEXTO2,
             CPR_TEXTO_TECNICO,
             CPR_TEXTO_TECNICO2,
             CPR_INCOTERM,
             CPR_VALIDADE
        INTO clb_ppe_texto,
             clb_ppe_texto2,
             clb_ppe_tecnico,
             clb_ppe_tecnico2,
             c_cpr_incoterm,
             c_cpr_validade
        FROM CONFIGURA_PROPOSTA;
    
      INSERT INTO PROP_PERSONAL
        (USU_CHAPA,
         PPE_LISTA_ITEM,
         PPE_TEXTO,
         PPE_TEXTO2,
         PPE_TEXTO_TECNICO,
         PPE_TEXTO_TECNICO2,
         PPE_AGRUPAMENTO,
         PPE_POSICAO_DESC,
         PPE_GRUPOS,
         PPE_LOTES,
         PPE_DADOS_OP,
         PPE_OP_PADRAO,
         PPE_VALOR_AGRUP,
         PPE_VALIDADE_PROP,
         PPE_INCOTERM,
         PPE_ASSIST_TEC)
      VALUES
        (n_usu_chapa,
         1,
         clb_ppe_texto,
         clb_ppe_texto2,
         clb_ppe_tecnico,
         clb_ppe_tecnico2,
         n_ppe_agrupamento,
         n_ppe_posicao_desc,
         n_ppe_grupos,
         n_ppe_lotes,
         n_ppe_dados_op,
         n_ppe_op_padrao,
         n_ppe_valor_agrup,
         c_cpr_validade,
         c_cpr_incoterm,
         NULL);
    
    ELSE
  
        SELECT cpr.CPR_TEXTO,
             cpr.CPR_TEXTO2,
             cpr.CPR_TEXTO_TECNICO,
             cpr.CPR_TEXTO_TECNICO2
        INTO clb_ppe_texto,
             clb_ppe_texto2,
             clb_ppe_tecnico,
             clb_ppe_tecnico2
        FROM SIAOS.CONFIGURA_PROPOSTA cpr;
              
        UPDATE SIAOS.PROP_PERSONAL ppe
        SET
             ppe.PPE_TEXTO = NVL(ppe.PPE_TEXTO, clb_ppe_texto),
             ppe.PPE_TEXTO2 = NVL(ppe.PPE_TEXTO2, clb_ppe_texto2),
             ppe.PPE_TEXTO_TECNICO = NVL(ppe.PPE_TEXTO_TECNICO, clb_ppe_tecnico),
             ppe.PPE_TEXTO_TECNICO2 = NVL(ppe.PPE_TEXTO_TECNICO2, clb_ppe_tecnico2)
        WHERE ppe.USU_CHAPA = n_usu_chapa;
        
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      NULL;
    
  END SP_CONFIG_PESSOAL;
  
  ---------------------------------------------------------------------
  ----------------------SP_CONFIG_PESSOAL_FORCED-----------------------
  ---------------------------------------------------------------------
  
  PROCEDURE SP_CONFIG_PESSOAL_FORCED(
   n_usu_chapa              SIAOS.PROP_PERSONAL.USU_CHAPA%TYPE) IS
   
   clb_ppe_texto            SIAOS.CONFIGURA_PROPOSTA.CPR_TEXTO%TYPE;
   clb_ppe_texto2           SIAOS.CONFIGURA_PROPOSTA.CPR_TEXTO2%TYPE;
   clb_ppe_tecnico          SIAOS.CONFIGURA_PROPOSTA.CPR_TEXTO_TECNICO%TYPE;
   clb_ppe_tecnico2         SIAOS.CONFIGURA_PROPOSTA.CPR_TEXTO_TECNICO2%TYPE;
   BEGIN
  
      SELECT cpr.CPR_TEXTO,
             cpr.CPR_TEXTO2,
             cpr.CPR_TEXTO_TECNICO,
             cpr.CPR_TEXTO_TECNICO2
        INTO clb_ppe_texto,
             clb_ppe_texto2,
             clb_ppe_tecnico,
             clb_ppe_tecnico2
        FROM SIAOS.CONFIGURA_PROPOSTA cpr;
        
        UPDATE SIAOS.PROP_PERSONAL ppe
        SET
             ppe.PPE_TEXTO = NVL(ppe.PPE_TEXTO, clb_ppe_texto),
             ppe.PPE_TEXTO2 = NVL(ppe.PPE_TEXTO2, clb_ppe_texto2),
             ppe.PPE_TEXTO_TECNICO = NVL(ppe.PPE_TEXTO_TECNICO, clb_ppe_tecnico),
             ppe.PPE_TEXTO_TECNICO2 = NVL(ppe.PPE_TEXTO_TECNICO2, clb_ppe_tecnico2)
        WHERE ppe.USU_CHAPA = n_usu_chapa;
         
  END SP_CONFIG_PESSOAL_FORCED;

  ---------------------------------------------------------------------
  ------------------------ SP_CONFIG_IMP -----------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_CONFIG_IMP(n_prp_codigo       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_usu_chapa        IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                          vc2_pim_tipo       IN SIAOS.PROPOSTA_IMP.PIM_TIPO%TYPE,
                          n_pim_agrupamento  IN SIAOS.PROPOSTA_IMP.PIM_AGRUPAMENTO%TYPE,
                          c_pim_posicao_desc IN SIAOS.PROPOSTA_IMP.PIM_POSICAO_DESC%TYPE,
                          n_pim_grupos       IN SIAOS.PROPOSTA_IMP.PIM_GRUPOS%TYPE,
                          n_pim_lotes        IN SIAOS.PROPOSTA_IMP.PIM_LOTES%TYPE,
                          n_pim_dados_op     IN SIAOS.PROPOSTA_IMP.PIM_DADOS_OP%TYPE,
                          n_pim_op_padrao    IN SIAOS.PROPOSTA_IMP.PIM_OP_PADRAO%TYPE,
                          n_pim_valor_agrup  IN SIAOS.PROPOSTA_IMP.PIM_VALOR_AGRUP%TYPE,
                          n_prp_validade     IN SIAOS.PROPOSTA.PRP_VALIDADE%TYPE,
                          c_incoterm         IN SIAOS.PROPOSTA.PRP_TRANSPORTE%TYPE,
                          n_lin_cod          IN SIAOS.LINGUA.LIN_COD%TYPE,
                          n_pim_sumario      IN SIAOS.PROPOSTA_IMP.PIM_SUMARIO%TYPE,
                          n_pin_consolida    IN SIAOS.PROPOSTA_IMP.PIN_CONSOLIDA%TYPE,
                          n_erro             OUT INTEGER) IS
  
  BEGIN
  
    IF n_prp_codigo IS NOT NULL THEN
      SP_IMP_PADRAO(n_prp_codigo);
      IF vc2_pim_tipo NOT IN ('P', 'DS') THEN
      
        UPDATE PROPOSTA
           SET PRP_VALIDADE = n_prp_validade
         WHERE PRP_CODIGO = n_prp_codigo;
      
        UPDATE ORDERIN.CONF_IMP_PROPOSTA
           SET CIP_TIPO         = vc2_pim_tipo,
               CIP_AGRUPAMENTO  = n_pim_agrupamento,
               CIP_POSICAO_DESC = c_pim_posicao_desc,
               CIP_GRUPOS       = n_pim_grupos,
               CIP_LOTES        = n_pim_lotes,
               CIP_DADOS_OP     = n_pim_dados_op,
               CIP_OP_PADRAO    = n_pim_op_padrao,
               CIP_VALOR_AGRUP  = n_pim_valor_agrup,
               LIN_COD          = n_lin_cod,
               CIP_SUMARIO      = n_pim_sumario,
               CIP_CONSOLIDA    = n_pin_consolida
         WHERE PRP_CODIGO = n_prp_codigo;
      
      END IF;
    
    ELSE
    
      UPDATE PROP_PERSONAL
         SET PPE_AGRUPAMENTO   = n_pim_agrupamento,
             PPE_POSICAO_DESC  = c_pim_posicao_desc,
             PPE_GRUPOS        = n_pim_grupos,
             PPE_LOTES         = n_pim_lotes,
             PPE_DADOS_OP      = n_pim_dados_op,
             PPE_OP_PADRAO     = n_pim_op_padrao,
             PPE_VALOR_AGRUP   = n_pim_valor_agrup,
             PPE_VALIDADE_PROP = n_prp_validade,
             PPE_INCOTERM      = c_incoterm
       WHERE USU_CHAPA = n_usu_chapa;
    
      IF SQL%NOTFOUND THEN
      
        FOR cur_conf IN (SELECT CPR_TEXTO,
                                CPR_TEXTO2,
                                CPR_TEXTO_TECNICO,
                                CPR_TEXTO_TECNICO2,
                                CPR_INCOTERM
                           FROM SIAOS.CONFIGURA_PROPOSTA) LOOP
        
          INSERT INTO PROP_PERSONAL
            (USU_CHAPA,
             PPE_TEXTO,
             PPE_TEXTO2,
             PPE_TEXTO_TECNICO,
             PPE_TEXTO_TECNICO2,
             PPE_AGRUPAMENTO,
             PPE_POSICAO_DESC,
             PPE_GRUPOS,
             PPE_LOTES,
             PPE_DADOS_OP,
             PPE_OP_PADRAO,
             PPE_VALOR_AGRUP,
             PPE_VALIDADE_PROP,
             PPE_INCOTERM)
          VALUES
            (n_usu_chapa,
             cur_conf.CPR_TEXTO,
             cur_conf.CPR_TEXTO2,
             cur_conf.CPR_TEXTO_TECNICO,
             cur_conf.CPR_TEXTO_TECNICO2,
             n_pim_agrupamento,
             c_pim_posicao_desc,
             n_pim_grupos,
             n_pim_lotes,
             n_pim_dados_op,
             n_pim_op_padrao,
             n_pim_valor_agrup,
             n_prp_validade,
             cur_conf.CPR_INCOTERM);
        
        END LOOP;
      
      END IF;
    
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
      n_erro := 1;
  END SP_CONFIG_IMP;

  ---------------------------------------------------------------------
  ------------------------ SP_GRAVA_TEXTO -----------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_GRAVA_TEXTO(n_chapa         IN INTEGER,
                           n_prp_codigo    IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                           n_ipr_item_prop IN INTEGER,
                           c_tabela        IN VARCHAR,
                           c_campo         IN VARCHAR2,
                           n_erro          OUT INTEGER) IS
  
    n_imp_qtd    INTEGER := 0;
    n_tco_codigo ORDERIN.TIPO_CONTEUDO.TCO_CODIGO%TYPE := 0;
    n_cip_codigo ORDERIN.CONTEUDO_IMP_PROP.CIP_CODIGO%TYPE := 0;
  
  BEGIN
  
    IF c_tabela = 'PROP_PERSONAL' THEN
    
      SELECT NVL(COUNT(*), 0)
        INTO n_imp_qtd
        FROM SIAOS.PROP_PERSONAL
       WHERE USU_CHAPA = n_chapa;
    
      IF n_imp_qtd = 0 THEN
      
        FOR c_padrao IN (SELECT CP.CPR_TEXTO,
                                CP.CPR_TEXTO2,
                                CP.CPR_TEXTO_TECNICO,
                                CP.CPR_TEXTO_TECNICO2
                           FROM SIAOS.CONFIGURA_PROPOSTA CP) LOOP
        
          INSERT INTO SIAOS.PROP_PERSONAL
            (USU_CHAPA,
             PPE_TEXTO,
             PPE_TEXTO2,
             PPE_TEXTO_TECNICO,
             PPE_TEXTO_TECNICO2)
          VALUES
            (n_chapa,
             c_padrao.CPR_TEXTO,
             c_padrao.CPR_TEXTO2,
             c_padrao.CPR_TEXTO_TECNICO,
             c_padrao.CPR_TEXTO_TECNICO2);
        
        END LOOP;
      
      END IF;
    
      IF c_campo = 'PPE_TEXTO' THEN
      
        UPDATE SIAOS.PROP_PERSONAL
           SET PPE_TEXTO = clb_texto_gl
         WHERE USU_CHAPA = n_chapa;
      
      ELSIF c_campo = 'PPE_TEXTO2' THEN
      
        UPDATE SIAOS.PROP_PERSONAL
           SET PPE_TEXTO2 = clb_texto_gl
         WHERE USU_CHAPA = n_chapa;
      
      ELSIF c_campo = 'PPE_TEXTO_TECNICO' THEN
      
        UPDATE SIAOS.PROP_PERSONAL
           SET PPE_TEXTO_TECNICO = clb_texto_gl
         WHERE USU_CHAPA = n_chapa;
      
      ELSIF c_campo = 'PPE_TEXTO_TECNICO2' THEN
      
        UPDATE SIAOS.PROP_PERSONAL
           SET PPE_TEXTO_TECNICO2 = clb_texto_gl
         WHERE USU_CHAPA = n_chapa;
      
      ELSIF c_campo = 'PPE_TXT_INTRO' THEN
      
        UPDATE SIAOS.PROP_PERSONAL
           SET PPE_TXT_INTRO = clb_texto_gl
         WHERE USU_CHAPA = n_chapa;
      
      END IF;
    
    ELSIF c_tabela = 'PROPOSTA_IMP' THEN
    
      --SP_IMP_PADRAO(n_prp_codigo);
    
      IF c_campo = 'PIM_TEXTO' THEN
        n_tco_codigo := 2;
        /*
        UPDATE SIAOS.PROPOSTA_IMP
           SET PIM_TEXTO = clb_texto_gl
         WHERE PRP_CODIGO = n_prp_codigo;
        */
      ELSIF c_campo = 'PIM_TEXTO2' THEN
        n_tco_codigo := 3;
        /*
        UPDATE SIAOS.PROPOSTA_IMP
           SET PIM_TEXTO2 = clb_texto_gl
         WHERE PRP_CODIGO = n_prp_codigo;
        */
      ELSIF c_campo = 'PIM_TXT_INTRO' THEN
        n_tco_codigo := 4;
        /*
        UPDATE SIAOS.PROPOSTA_IMP
           SET PIM_TXT_INTRO = clb_texto_gl
         WHERE PRP_CODIGO = n_prp_codigo;
        */
      ELSIF c_campo = 'PIM_CONS_FINAL' THEN
        n_tco_codigo := 7;
        /*
        UPDATE SIAOS.PROPOSTA_IMP
           SET PIM_CONS_FINAL = clb_texto_gl
         WHERE PRP_CODIGO = n_prp_codigo;
        */
      ELSIF c_campo = 'PIM_TEXTO_TECNICO' THEN
        n_tco_codigo := 5;
        /*
        UPDATE SIAOS.PROPOSTA_IMP
           SET PIM_TEXTO_TECNICO = clb_texto_gl
         WHERE PRP_CODIGO = n_prp_codigo;
        */
      ELSIF c_campo = 'PIM_TEXTO_TECNICO2' THEN
        n_tco_codigo := 6;
        /*
        UPDATE SIAOS.PROPOSTA_IMP
           SET PIM_TEXTO_TECNICO2 = clb_texto_gl
         WHERE PRP_CODIGO = n_prp_codigo;
        */
      ELSIF c_campo = 'PIM_ASSIST_TEC' THEN
        n_tco_codigo := 8;
        /*
        UPDATE SIAOS.PROPOSTA_IMP
           SET PIM_ASSIST_TEC = clb_texto_gl
         WHERE PRP_CODIGO = n_prp_codigo;
        */
      ELSE
        n_tco_codigo := 1;
      END IF;
    
      BEGIN
        SELECT CIP_CODIGO
          INTO n_cip_codigo
          FROM ORDERIN.CONTEUDO_IMP_PROP C
         WHERE C.PRP_CODIGO = n_prp_codigo
           AND TCO_CODIGO = n_tco_codigo;
      EXCEPTION
        WHEN OTHERS THEN
          n_cip_codigo := NULL;
      END;
    
      IF n_cip_codigo IS NULL THEN
        INSERT INTO ORDERIN.CONTEUDO_IMP_PROP
          (PRP_CODIGO, TCO_CODIGO, CIP_TEXTO)
        VALUES
          (n_prp_codigo, n_tco_codigo, clb_texto_gl);
      ELSE
        UPDATE ORDERIN.CONTEUDO_IMP_PROP
           SET CIP_TEXTO = clb_texto_gl
         WHERE CIP_CODIGO = n_cip_codigo;
      END IF;
    
    END IF;
  
    IF c_tabela = 'ITEM_PROP_UNI' THEN
    
      IF c_campo = 'IPU_DETALHE' THEN
      
        UPDATE SIAOS.ITEM_PROP_UNI
           SET IPU_DETALHE = clb_texto_gl
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_ITEM_PROP = n_ipr_item_prop;
      
      END IF;
    
    END IF;
    COMMIT;
  EXCEPTION
    WHEN OTHERS THEN
      n_erro := 1;
  END SP_GRAVA_TEXTO;

  ---------------------------------------------------------------------
  -------------------- SP_GRAVA_TEXTO_NOVO ----------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_GRAVA_TEXTO_NOVO(n_cip_codigo IN OUT ORDERIN.CONTEUDO_IMP_PROP.CIP_CODIGO%TYPE,
                                n_prp_codigo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_tco_codigo IN ORDERIN.CONTEUDO_IMP_PROP.TCO_CODIGO%TYPE,
                                n_erro       OUT INTEGER) IS
  
  BEGIN
  
    SP_IMP_PADRAO(n_prp_codigo);
  
    IF n_cip_codigo IS NULL THEN
      INSERT INTO ORDERIN.CONTEUDO_IMP_PROP
        (PRP_CODIGO, TCO_CODIGO, CIP_TEXTO)
      VALUES
        (n_prp_codigo, n_tco_codigo, clb_texto_gl)
      RETURNING CIP_CODIGO INTO n_cip_codigo;
    ELSE
      UPDATE ORDERIN.CONTEUDO_IMP_PROP
         SET CIP_TEXTO = clb_texto_gl
       WHERE CIP_CODIGO = n_cip_codigo;
    END IF;
  
    COMMIT;
  EXCEPTION
    WHEN OTHERS THEN
      n_erro := 1;
  END SP_GRAVA_TEXTO_NOVO;

  ---------------------------------------------------------------------
  ------ TEMPO DE VALIDADE DA PROPOSTA EM DIAS ------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_VALIDADE(n_prp_codigo    IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                        dt_validade     OUT DATE,
                        n_dias_validade OUT INTEGER) IS
  
  BEGIN
  
    SELECT DISTINCT TRUNC(PROP_RECADO.PRE_DATA) + PROPOSTA.PRP_VALIDADE VALIDO_ATE,
                    (TRUNC(PROP_RECADO.PRE_DATA) + PROPOSTA.PRP_VALIDADE) -
                    TRUNC(SYSDATE) FALTAM_DIAS
      INTO dt_validade, n_dias_validade
      FROM PROP_RECADO, PROPOSTA
     WHERE PROP_RECADO.PRP_CODIGO = PROPOSTA.PRP_CODIGO
       AND PROP_RECADO.TRE_CODIGO = 7
       AND PROPOSTA.PRP_CODIGO = n_prp_codigo
       AND PROPOSTA.PST_CODIGO = 4
       AND PROPOSTA.ORDER_NO IS NULL
       AND PROP_RECADO.PRE_DATA =
           (SELECT MAX(PR.PRE_DATA)
              FROM PROP_RECADO PR
             WHERE PR.TRE_CODIGO = 7
               AND PR.PRP_CODIGO = n_prp_codigo);
  
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
    
      dt_validade     := NULL;
      n_dias_validade := NULL;
    
  END SP_VALIDADE;

  ---------------------------------------------------------------------
  ------ ATUALIZA PREÇO LISTA DO PRODUTO   ----------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_ATUALIZA_PRECO_LISTA(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                                    n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                                    n_preco         OUT NUMBER) IS
  
    c_ifi_codigo       SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    n_cpe_codigo       SIAOS.PROPOSTA.CPE_CODIGO%TYPE;
    n_peso_prod        SIAOS.ITEM_PROP.IPR_PESO_ITEM%TYPE;
    n_ipr_ipi          SIAOS.ITEM_PROP.IPR_IPI%TYPE;
    n_ipr_icms         SIAOS.ITEM_PROP.IPR_ICMS%TYPE;
    n_ipr_iss          SIAOS.ITEM_PROP.IPR_ISS%TYPE;
    c_pro_codigo       SIAOS.ITEM_PROP.PRO_CODIGO%TYPE;
    n_ipr_item         SIAOS.ITEM_PROP.IPR_ITEM%TYPE;
    n_ipr_classe       SIAOS.ITEM_PROP.IPR_CLASSE%TYPE;
    n_ipr_desconto     SIAOS.ITEM_PROP.IPR_DESCONTO%TYPE;
    n_preco_lista      SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
    n_preco_fim        SIAOS.ITEM_PROP.IPR_VENDA_FIM%TYPE;
    n_ipr_venda_fim    SIAOS.ITEM_PROP.IPR_VENDA_FIM%TYPE;
    n_ipr_venda_cli    SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE;
    n_ipr_desc_fim     SIAOS.ITEM_PROP.IPR_DESC_FIM%TYPE;
    n_ipr_desc_cli     SIAOS.ITEM_PROP.IPR_DESC_CLI%TYPE;
    n_ipr_adicional    SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE;
    vc2_produto        SIAOS.ITEM_PROP.PRO_CODIGO%TYPE;
    n_ipu_valor_cotado SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE;
    n_ipu_status_preco SIAOS.ITEM_PROP_UNI.IPU_STATUS_PRECO%TYPE;
    n_mpr_codigo       SIAOS.ITEM_PROP_UNI.MPR_CODIGO%TYPE;
    n_mpe_codigo       SIAOS.ITEM_PROP_UNI.MPE_CODIGO%TYPE;
    n_ipu_vlcusto      SIAOS.ITEM_PROP_UNI.IPU_VLCUSTO%TYPE;
    n_consulta_preco   NUMBER(11, 2);
    n_empresa          SIAOS.PROPOSTA.EMP_ABERTURA%TYPE;
    n_cli_codigo       SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    n_pend             INTEGER;
    c_destmat          SIAOS.PROPOSTA.PRP_DESTINO%TYPE;
    n_top_codigo       SIAOS.PROPOSTA.TOP_CODIGO%TYPE;
    n_erro             INTEGER;
    n_lpr_codigo       SIAOS.LISTA_PRECO.LPR_CODIGO%TYPE;
    n_indice           SIAOS.LISTA_PRECO.LPR_INDICE%TYPE := 1;
    n_indice_desc      SIAOS.LISTA_PRECO.LPR_INDICE%TYPE := 1;
    n_ipu_preco_per    SIAOS.ITEM_PROP_UNI.IPU_PRECO_PER%TYPE;
    n_tes_recno        SIAOS.ITEM_PROP_UNI.TES_RECNO%TYPE;
    n_ipr_item_pai     SIAOS.ITEM_PROP_UNI.IPR_ITEM_PAI%TYPE;
    n_usu_chapa        SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_pis              SIAOS.SAPP.SAP_PIS%TYPE := 0;
    n_cofins           SIAOS.SAPP.SAP_COFINS%TYPE := 0;
    v_ipu_ncm          VARCHAR2(10);
    c_estado           VARCHAR2(20);
    n_busca_custo      NUMBER := 1;
    n_tem_opcao        NUMBER := 1;
    n_tem_opcao_esp    NUMBER := 1;
    n_tem_pis          NUMBER := 1;
    n_tem_cofins       NUMBER := 1;
    n_diferencial      INTEGER;
    n_per_dif          NUMBER(11, 2);
    n_substituicao     INTEGER;
    n_per_sub          NUMBER(11, 2);
    n_msv_codigo       SIAOS.ITEM_PROP_UNI.MSV_CODIGO%TYPE;
    n_valor_pcli       NUMBER(11, 2);
    n_ine_montadora    CADBASICO.ITEM_NEGOCIO.INE_MONTADORA%TYPE;
    n_ine_tpcad        CADBASICO.ITEM_NEGOCIO.INE_TPCAD%TYPE;
    n_gdi_codigo       SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    c_f4_pisbrut       INTEGRACAO.VW_TES.F4_PISBRUT%TYPE := 1;
    c_f4_cofbrut       INTEGRACAO.VW_TES.F4_COFBRUT%TYPE := 1;
  
  BEGIN
  
    BEGIN
    
      SELECT DECODE(USU_CHAPA_INI, NULL, USU_CHAPA, USU_CHAPA_INI),
             P.IFI_CODIGO,
             P.EMP_ABERTURA,
             P.CPE_CODIGO,
             TRIM(DECODE(C.ESTADO, NULL, E.EST_SIGLA, C.ESTADO)),
             P.CLI_CODIGO,
             CASE P.PRP_DESTINO
               WHEN 'C' THEN
                'F' -- C CORRESPONDE AO F (CONSUMIDOR FINAL)
               WHEN 'I' THEN
                'R' -- 'I' INDUSTRIALIZAÇÃO SEGUE REGRAS DE 'R' REVENDA SEGUNDO CARLOS (TOTVS)
               ELSE
                P.PRP_DESTINO
             END DESTINO,
             P.TOP_CODIGO,
             O.GDI_CODIGO
        INTO n_usu_chapa,
             c_ifi_codigo,
             n_empresa,
             n_cpe_codigo,
             c_estado,
             n_cli_codigo,
             c_destmat,
             n_top_codigo,
             n_gdi_codigo
        FROM SIAOS.PROPOSTA P
       INNER JOIN SIAOS.ORIGEM O
          ON O.ORIGEM = P.ORI_CODIGO
        LEFT JOIN SIAOS.CLIENTE C
          ON P.CLI_CODIGO = C.CODIGO
        LEFT JOIN SIAOS.CLIENTE_TEMP CT
          ON P.PRP_CODIGO = CT.PRP_CODIGO
        LEFT JOIN GERAL.ESTADO E
          ON CT.EST_CODIGO = E.EST_CODIGO
       WHERE P.PRP_CODIGO = n_prp_codigo;
    
    EXCEPTION WHEN NO_DATA_FOUND THEN
        c_estado  := 'SP';
        c_destmat := 'F';
    END;
  
    SELECT LPR_CODIGO
      INTO n_lpr_codigo
      FROM SIAOS.USUARIO
     WHERE USU_CHAPA = n_usu_chapa;
  
    SELECT IPU.IPR_ITEM_PAI, IPU.TES_RECNO
      INTO n_ipr_item_pai, n_tes_recno
      FROM SIAOS.ITEM_PROP_UNI IPU
     WHERE IPU.PRP_CODIGO = n_prp_codigo
       AND IPU.IPR_ITEM_PROP = n_ipr_item_prop;
  
    SELECT COUNT(*)
      INTO n_pend
      FROM SIAOS.CONSULTA_PRECO CP
     WHERE CP.CPE_CODIGO = n_cpe_codigo
       AND CP.CPE_DT_SOLIC IS NOT NULL
       AND CP.CPE_DT_RESP IS NULL;
  
    SELECT I.PRO_CODIGO,
           I.IPR_ITEM,
           I.IPR_CLASSE,
           I.IPR_DESCONTO,
           NVL(I.IPR_VENDA_FIM, 0),
           NVL(I.IPR_VENDA_CLI, 0),
           NVL(I.IPR_DESC_FIM, 0),
           NVL(I.IPR_DESC_CLI, 0),
           I.IPR_ADICIONAL,
           I.PRO_CODIGO,
           P.INE_MONTADORA,
           P.INE_TPCAD
      INTO c_pro_codigo,
           n_ipr_item,
           n_ipr_classe,
           n_ipr_desconto,
           n_ipr_venda_fim,
           n_ipr_venda_cli,
           n_ipr_desc_fim,
           n_ipr_desc_cli,
           n_ipr_adicional,
           vc2_produto,
           n_ine_montadora,
           n_ine_tpcad
      FROM SIAOS.ITEM_PROP I
     INNER JOIN CADBASICO.ITEM_NEGOCIO P
        ON P.INE_CODIGO = TRIM(I.PRO_CODIGO)
     WHERE I.PRP_CODIGO = n_prp_codigo
       AND I.IPR_ITEM_PROP = n_ipr_item_prop
       AND ROWNUM = 1;
       
    n_peso_prod := SIAOS.PCK_SMART_SALES3.SF_PESO_ITEM(n_prp_codigo,n_ipr_item_prop);
  
    IF n_ipr_item_pai IS NULL THEN
      BEGIN
          SELECT IPU_VALOR_COTADO,
              IPU.TES_RECNO,
              IPU.MSV_CODIGO,
              IPU.IPU_STATUS_PRECO
          INTO n_ipu_valor_cotado, 
              n_tes_recno,
              n_msv_codigo,
               n_ipu_status_preco
          FROM SIAOS.ITEM_PROP_UNI IPU
         WHERE IPU.PRP_CODIGO = n_prp_codigo
           AND IPU.IPR_ITEM_PROP = n_ipr_item_prop;
      EXCEPTION WHEN OTHERS THEN
          n_ipu_valor_cotado := NULL;
      END;
    
      INTEGRACAO.PCK_DADO_FISCAL.SP_IMP_ITEM(c_pro_codigo,
                     n_cli_codigo,
                     c_estado,
                     c_destmat,
                     n_tes_recno,
                     n_top_codigo,
                     n_ipr_ipi,
                     n_ipr_icms,
                     n_ipr_iss,
                     n_diferencial,
                     n_per_dif,
                     n_substituicao,
                     n_per_sub,
                     n_pis,
                     n_cofins,
                     v_ipu_ncm,
                     n_msv_codigo);
    
    ELSE
    
      SELECT DISTINCT IP.IPR_IPI, 
             IP.IPR_ICMS, 
             IP.IPR_ISS, 
             IPU.TES_RECNO
        INTO n_ipr_ipi, 
             n_ipr_icms, 
             n_ipr_iss, 
             n_tes_recno
        FROM SIAOS.ITEM_PROP IP
       INNER JOIN SIAOS.ITEM_PROP_UNI IPU
          ON IPU.PRP_CODIGO = IP.PRP_CODIGO
         AND IPU.IPR_ITEM_PROP = IP.IPR_ITEM_PROP
       WHERE IP.PRP_CODIGO = n_prp_codigo
         AND IP.IPR_ITEM_PROP = n_ipr_item_pai;
    
      SELECT T.F4_PISBRUT, 
             T.F4_COFBRUT
        INTO c_f4_pisbrut, 
             c_f4_cofbrut
        FROM INTEGRACAO.VW_TES2 T
       WHERE T.R_E_C_N_O_ = n_tes_recno;
    
      SELECT IPU_VALOR_COTADO, 
             IPU.IPU_STATUS_PRECO
        INTO n_ipu_valor_cotado, 
             n_ipu_status_preco
        FROM SIAOS.ITEM_PROP_UNI IPU
       WHERE IPU.PRP_CODIGO = n_prp_codigo
         AND IPU.IPR_ITEM_PROP = n_ipr_item_prop;
    
      SELECT IPU.TES_RECNO,
             IPU.IPU_TEM_DIF,
             IPU.IPU_PER_DIF,
             IPU.IPU_TEM_ST,
             IPU.IPU_PER_ST,
             IPU.IPU_NCM
        INTO n_tes_recno,
             n_diferencial,
             n_per_dif,
             n_substituicao,
             n_per_sub,
             v_ipu_ncm
        FROM SIAOS.ITEM_PROP_UNI IPU
       WHERE IPU.PRP_CODIGO = n_prp_codigo
         AND IPU.IPR_ITEM_PROP = n_ipr_item_pai;
      BEGIN
        SELECT IPU.TES_RECNO,
               IPU.IPU_TEM_DIF,
               IPU.IPU_PER_DIF,
               IPU.IPU_TEM_ST,
               IPU.IPU_PER_ST,
               IPU.IPU_NCM
          INTO n_tes_recno,
               n_diferencial,
               n_per_dif,
               n_substituicao,
               n_per_sub,
               v_ipu_ncm
          FROM SIAOS.ITEM_PROP_UNI IPU
         WHERE IPU.PRP_CODIGO = n_prp_codigo
           AND IPU.IPR_ITEM_PROP = n_ipr_item_prop;
      EXCEPTION WHEN OTHERS THEN
          n_ipu_valor_cotado := NULL;
      END;
    END IF;
  
    IF n_lpr_codigo IS NOT NULL THEN
    
      n_indice      := PCK_SAPP.SF_FATOR_REP(vc2_produto, n_usu_chapa);
      n_indice_desc := PCK_SAPP.SF_FATOR_CLI(vc2_produto, n_usu_chapa);
    
    ELSE
    
      n_indice := 1;
    
    END IF;
  
    IF c_f4_pisbrut = 1 AND n_pis = 0 THEN
      n_tem_pis := 0;
    END IF;
  
    IF c_f4_cofbrut = 1 AND n_cofins = 0 THEN
      n_tem_cofins := 0;
    END IF;
  
    SIAOS.PCK_SMART_SALES3.SP_CALCULA_PRECO_IMP2(vc2_produto      => c_pro_codigo,
                                                 vc2_opcat        => n_ipr_item,
                                                 vc2_opesp        => n_ipr_classe,
                                                 vc2_moeda        => c_ifi_codigo,
                                                 n_icms           => n_ipr_icms,
                                                 n_ipi            => n_ipr_ipi,
                                                 n_tem_pis        => n_tem_pis,
                                                 n_tem_cofins     => n_tem_cofins,
                                                 n_preco          => n_preco,
                                                 n_consulta_preco => n_consulta_preco);
  
    IF n_preco >= 0 THEN
      /*
      Juliano Bonini -- 23/06/2020
      Produtos de venda quando em Revisões sofrer desconto de 30%
      no preço lista conforme definido pela direção.
      produtos de venda para revisões deve ficar inalterado.
      */
      IF n_ine_montadora = 0 AND n_gdi_codigo IN (19, 13) AND
         n_ine_tpcad != 3 THEN
        n_preco := n_preco * 0.7;
      END IF;
    
      n_preco_fim := n_preco * n_indice;
    
      IF n_consulta_preco = 1 THEN
      
        IF n_ipr_adicional IS NOT NULL THEN
          n_preco     := n_ipr_adicional;
          n_preco_fim := n_ipr_adicional * n_indice;
        END IF;
      
        IF n_pend > 0 THEN
          SIAOS.PCK_SMART_SALES3.SP_BAIXA_CONSULTA_PRECO(n_prp_codigo,
                                                         'Itens Revisados',
                                                         n_erro);
        END IF;
      
      ELSIF n_consulta_preco = 2 THEN
      
        --      n_preco := SIAOS.PCK_SMART_SALES3.SF_VALOR_COTACAO(c_pro_codigo,c_ifi_codigo,n_empresa);
      
        IF n_ipu_valor_cotado IS NOT NULL THEN
          n_preco     := n_ipu_valor_cotado;
          n_preco_fim := n_ipu_valor_cotado * n_indice;
        END IF;
      
      END IF;
    
      IF SUBSTR(vc2_produto, 1, 4) = 'PCLI' THEN
      
        SELECT NVL(MAX(NF.D1_VUNIT), 0)
          INTO n_valor_pcli
          FROM PROTPROD.SD1010 NF
         INNER JOIN SIAOS.ITEM_PROP_UNI IPU2
            ON IPU2.C6_IDENTB6 = NF.D1_IDENTB6
           AND IPU2.C6_ITEMORI = NF.D1_ITEM
           AND IPU2.C6_NFORI = NF.D1_DOC
           AND IPU2.C6_SERIORI = NF.D1_SERIE
         WHERE IPU2.PRP_CODIGO = n_prp_codigo
           AND IPU2.IPR_ITEM_PROP = n_ipr_item_prop;
      
        n_consulta_preco := 0;
        n_preco          := n_valor_pcli;
        n_preco_fim      := n_valor_pcli;
        n_ipr_desc_cli   := 100;
        n_ipr_desc_fim   := 100;
      
      END IF;
    
      IF n_preco > 0 OR n_consulta_preco != 0 THEN
      
        IF n_ipr_venda_cli = 0 AND n_ipr_desc_cli = 0 THEN
        
          n_ipr_venda_cli := n_preco * n_indice_desc;
          n_ipr_venda_fim := n_preco_fim * n_indice_desc;
        
        END IF;
      
        IF n_consulta_preco = 1 THEN
          n_ipu_valor_cotado := 0;
          n_ipr_adicional    := n_preco;
          n_preco_lista      := 0;
          IF n_ipu_status_preco != 'C' OR n_ipu_status_preco IS NULL THEN
            n_ipu_status_preco := 'P';
          END IF;
          n_ipu_preco_per := n_preco_fim;
        ELSIF n_consulta_preco = 2 THEN
          n_ipu_valor_cotado := n_preco;
          n_ipr_adicional    := 0;
          n_preco_lista      := 0;
          n_ipu_status_preco := NULL;
          n_ipu_preco_per    := n_preco_fim;
        ELSE
          n_ipr_adicional    := 0;
          n_ipu_valor_cotado := 0;
          n_preco_lista      := n_preco;
          n_ipu_status_preco := NULL;
          n_ipu_preco_per    := n_preco_fim;
        END IF;
      
        IF n_ipr_venda_fim = n_preco_fim THEN
        
          IF n_indice_desc != 1 THEN
          
            n_ipr_venda_fim := n_ipr_venda_fim * n_indice_desc;
            n_ipr_venda_cli := n_ipr_venda_cli * n_indice_desc;
            n_ipr_desc_fim  := n_indice_desc * 100;
            n_ipr_desc_cli  := n_indice_desc * 100;
          
          ELSE
          
            n_ipr_desc_fim := 0;
            n_ipr_desc_cli := 0;
          
          END IF;
        
        ELSIF n_ipr_desconto = 1 AND n_consulta_preco != 2 THEN
        
          IF n_indice_desc != 1 THEN
          
            n_ipr_desc_fim := n_indice_desc * 100;
            n_ipr_desc_cli := n_indice_desc * 100;
          
          END IF;
        
          IF n_preco > 0 THEN
            n_ipr_venda_fim := n_preco_fim * (1 - (n_ipr_desc_fim / 100));
            --ELSE
            --  n_ipr_venda_fim := n_preco_fim;
          END IF;
        
          IF n_preco > 0 THEN
            n_ipr_venda_cli := n_preco * (1 - (n_ipr_desc_cli / 100));
            --ELSE
            --  n_ipr_venda_cli := n_preco;
          END IF;
        
        ELSE
        
          IF NVL(n_preco, 0) = 0 THEN
            n_ipr_desc_fim := 0;
            n_ipr_desc_cli := 0;
          ELSE
            n_ipr_desc_fim := (1 - (n_ipr_venda_fim / n_preco_fim)) * 100;
            n_ipr_desc_cli := (1 - (n_ipr_venda_cli / n_preco)) * 100;
          END IF;
        
        END IF;
      
        UPDATE ITEM_PROP IP
           SET IP.IPR_PRECO     = n_preco_lista,
               IP.IPR_ADICIONAL = n_ipr_adicional,
               IP.IPR_DESC_FIM  = n_ipr_desc_fim,
               IP.IPR_DESC_CLI  = n_ipr_desc_cli,
               IP.IPR_VENDA_FIM = n_ipr_venda_fim,
               IP.IPR_VENDA_CLI = n_ipr_venda_cli,
               IP.IPR_IPI       = n_ipr_ipi,
               IP.IPR_ICMS      = n_ipr_icms,
               IP.IPR_ISS       = n_ipr_iss,
               IP.IPR_PESO_ITEM = n_peso_prod
         WHERE IP.PRP_CODIGO = n_prp_codigo
           AND IP.IPR_ITEM_PROP = n_ipr_item_prop;
      
        UPDATE ITEM_PROP IP
           SET IP.IPR_IPI  = n_ipr_ipi,
               IP.IPR_ICMS = n_ipr_icms,
               IP.IPR_ISS  = n_ipr_iss
         WHERE (IP.PRP_CODIGO, IP.IPR_ITEM_PROP) IN
               (SELECT P.PRP_CODIGO, P.IPR_ITEM_PROP
                  FROM ITEM_PROP_UNI P
                 WHERE P.PRP_CODIGO = n_prp_codigo
                   AND P.IPR_ITEM_PAI = n_ipr_item_prop);
      
        n_tem_opcao := SIAOS.PCK_SMART_SALES3.SF_TEM_ITEM(c_pro_codigo);
        IF n_tem_opcao = 1 AND n_ipr_item IS NULL THEN
          n_busca_custo := 0;
        END IF;
      
        n_tem_opcao_esp := SIAOS.PCK_SMART_SALES3.SF_TEM_CLASSE2(c_pro_codigo);
        IF n_tem_opcao_esp = 1 AND n_ipr_classe IS NULL THEN
          n_busca_custo := 0;
        END IF;
      
        IF n_busca_custo = 1 THEN
          /*
          BEGIN
            n_ipu_vlcusto := CUSTOIND.SF_MPRIMA_MOD_PROD(c_pro_codigo,n_ipr_item,n_ipr_classe,1);
          EXCEPTION WHEN OTHERS THEN
            n_ipu_vlcusto := NULL;
          END;
          */
          BEGIN
            -- Alterei aqui Sebastiao - Inclui o SUBSTR na coluna de OPCAO do item
            /*
            SELECT MPR_CODIGO
              INTO n_mpr_codigo
              FROM CUSTOIND.MOD_PRODUTO P
             WHERE P.PRODUTO = c_pro_codigo
               AND P.MPR_OPCAT = n_ipr_item
               AND P.MPR_OPESP = n_ipr_classe;
            */
          
            SELECT MPR_CODIGO
              INTO n_mpr_codigo
              FROM CUSTOIND.MOD_PRODUTO P
             WHERE TRIM(P.PRODUTO) = TRIM(c_pro_codigo)
               AND TRIM(P.MPR_OPCAT) = SUBSTR(TRIM(n_ipr_item), 11, 40)
               AND TRIM(P.MPR_OPESP) = TRIM(n_ipr_classe);
          
          EXCEPTION
            WHEN OTHERS THEN
              n_mpr_codigo := NULL;
          END;
        
          BEGIN
            CUSTOIND.SP_CAD_MOD_PROD(c_pro_codigo,
                                     n_ipr_item,
                                     n_ipr_classe,
                                     1,
                                     n_mpr_codigo,
                                     n_ipu_vlcusto,
                                     n_erro);
          EXCEPTION
            WHEN OTHERS THEN
              n_ipu_vlcusto := NULL;
          END;
        
        END IF;
        IF n_mpr_codigo IS NOT NULL THEN
          SELECT MPE_CODIGO
            INTO n_mpe_codigo
            FROM CUSTOIND.MOD_PRODUTO P
           WHERE P.MPR_CODIGO = n_mpr_codigo;
        END IF;
      
        UPDATE SIAOS.ITEM_PROP_UNI IPU
           SET IPU_VALOR_COTADO = n_ipu_valor_cotado,
               IPU_STATUS_PRECO = n_ipu_status_preco,
               IPU_PRECO_PER    = n_ipu_preco_per,
               IPU.IPU_VLCUSTO  = n_ipu_vlcusto,
               IPU.MPR_CODIGO   = n_mpr_codigo,
               IPU.MPE_CODIGO   = n_mpe_codigo,
               IPU.IPU_NCM      = v_ipu_ncm,
               IPU.TES_RECNO    = n_tes_recno,
               IPU.IPU_TEM_DIF  = n_diferencial,
               IPU.IPU_PER_DIF  = n_per_dif,
               IPU.IPU_TEM_ST   = n_substituicao,
               IPU.IPU_PER_ST   = n_per_sub
         WHERE IPU.PRP_CODIGO = n_prp_codigo
           AND IPU.IPR_ITEM_PROP = n_ipr_item_prop;
      
        UPDATE SIAOS.ITEM_PROP_UNI IPU
           SET IPU.IPU_NCM     = v_ipu_ncm,
               IPU.TES_RECNO   = n_tes_recno,
               IPU.IPU_TEM_DIF = n_diferencial,
               IPU.IPU_PER_DIF = n_per_dif,
               IPU.IPU_TEM_ST  = n_substituicao,
               IPU.IPU_PER_ST  = n_per_sub
         WHERE IPU.PRP_CODIGO = n_prp_codigo
           AND IPU.IPR_ITEM_PAI = n_ipr_item_prop;
      
        COMMIT;
      
      ELSIF n_preco = 0 AND n_consulta_preco = 0 THEN
      
        UPDATE ITEM_PROP IP
           SET IP.IPR_IPI  = n_ipr_ipi,
               IP.IPR_ICMS = n_ipr_icms,
               IP.IPR_ISS  = n_ipr_iss,
               IP.IPR_PESO_ITEM = n_peso_prod
         WHERE IP.PRP_CODIGO = n_prp_codigo
           AND IP.IPR_ITEM_PROP = n_ipr_item_prop;
      
        UPDATE ITEM_PROP IP
           SET IP.IPR_IPI  = n_ipr_ipi,
               IP.IPR_ICMS = n_ipr_icms,
               IP.IPR_ISS  = n_ipr_iss
         WHERE (IP.PRP_CODIGO, IP.IPR_ITEM_PROP) IN
               (SELECT P.PRP_CODIGO, P.IPR_ITEM_PROP
                  FROM ITEM_PROP_UNI P
                 WHERE P.PRP_CODIGO = n_prp_codigo
                   AND P.IPR_ITEM_PAI = n_ipr_item_prop);
      
        n_tem_opcao := SIAOS.PCK_SMART_SALES3.SF_TEM_ITEM(c_pro_codigo);
        IF n_tem_opcao = 1 AND n_ipr_item IS NULL THEN
          n_busca_custo := 0;
        END IF;
      
        n_tem_opcao_esp := SIAOS.PCK_SMART_SALES3.SF_TEM_CLASSE2(c_pro_codigo);
        IF n_tem_opcao_esp = 1 AND n_ipr_classe IS NULL THEN
          n_busca_custo := 0;
        END IF;
      
        IF n_busca_custo = 1 THEN
          BEGIN
            n_ipu_vlcusto := CUSTOIND.SF_MPRIMA_MOD_PROD(c_pro_codigo,
                                                         n_ipr_item,
                                                         n_ipr_classe,
                                                         1);
          EXCEPTION
            WHEN OTHERS THEN
              n_ipu_vlcusto := NULL;
          END;
        
          BEGIN
          
            SELECT MPR_CODIGO
              INTO n_mpr_codigo
              FROM CUSTOIND.MOD_PRODUTO P
             WHERE P.PRODUTO = c_pro_codigo
               AND P.MPR_OPCAT = SUBSTR(n_ipr_item, 11, 40)
               AND P.MPR_OPESP = n_ipr_classe;
          
          EXCEPTION
            WHEN OTHERS THEN
              n_mpr_codigo := NULL;
          END;
        
          BEGIN
            CUSTOIND.SP_CAD_MOD_PROD(c_pro_codigo,
                                     n_ipr_item,
                                     n_ipr_classe,
                                     1,
                                     n_mpr_codigo,
                                     n_ipu_vlcusto,
                                     n_erro);
          EXCEPTION
            WHEN OTHERS THEN
              n_ipu_vlcusto := NULL;
          END;
        
        END IF;
        IF n_mpr_codigo IS NOT NULL THEN
          SELECT MPE_CODIGO
            INTO n_mpe_codigo
            FROM CUSTOIND.MOD_PRODUTO P
           WHERE P.MPR_CODIGO = n_mpr_codigo;
        END IF;
      
        UPDATE SIAOS.ITEM_PROP_UNI IPU
           SET IPU_PRECO_PER   = n_ipu_preco_per,
               IPU.IPU_VLCUSTO = n_ipu_vlcusto,
               IPU.MPR_CODIGO  = n_mpr_codigo,
               IPU.MPE_CODIGO  = n_mpe_codigo,
               IPU.IPU_NCM     = v_ipu_ncm,
               IPU.TES_RECNO   = n_tes_recno,
               IPU.IPU_TEM_DIF = n_diferencial,
               IPU.IPU_PER_DIF = n_per_dif,
               IPU.IPU_TEM_ST  = n_substituicao,
               IPU.IPU_PER_ST  = n_per_sub
         WHERE IPU.PRP_CODIGO = n_prp_codigo
           AND IPU.IPR_ITEM_PROP = n_ipr_item_prop;
      
        UPDATE SIAOS.ITEM_PROP_UNI IPU
           SET IPU.IPU_NCM     = v_ipu_ncm,
               IPU.TES_RECNO   = n_tes_recno,
               IPU.IPU_TEM_DIF = n_diferencial,
               IPU.IPU_PER_DIF = n_per_dif,
               IPU.IPU_TEM_ST  = n_substituicao,
               IPU.IPU_PER_ST  = n_per_sub
         WHERE IPU.PRP_CODIGO = n_prp_codigo
           AND IPU.IPR_ITEM_PAI = n_ipr_item_prop;
      
        COMMIT;
      
      END IF;
    
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      n_preco := NULL;
    
  END SP_ATUALIZA_PRECO_LISTA;

  ---------------------------------------------------------------------
  ------ AMARRA / DESAMARRA CONTROLES ---------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_AMARRA_CONTROLE(n_codigo_pai   IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                               n_codigo_filho IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                               n_erro         OUT NUMBER) IS
  
    n_ipr_dt_entrega_p SIAOS.ITEM_PROP.IPR_DT_ENTREGA%TYPE;
    n_ipr_semana_ent_p SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
    n_ipr_lote_p       SIAOS.ITEM_PROP.IPR_LOTE%TYPE;
    n_ipr_dt_entrega_f SIAOS.ITEM_PROP.IPR_DT_ENTREGA%TYPE;
    n_ipr_semana_ent_f SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
    n_ipr_lote_f       SIAOS.ITEM_PROP.IPR_LOTE%TYPE;
    n_ipr_status_con   SIAOS.ITEM_PROP.IPR_STATUS_CONS%TYPE;
    n_ipg_codigo       SIAOS.ITEM_PROP.IPG_CODIGO%TYPE;
  
  BEGIN
    IF n_codigo_pai IS NOT NULL AND n_codigo_filho IS NOT NULL THEN
      SELECT IPR_DT_ENTREGA, IPR_SEMANA_ENT, IPR_LOTE, IPG_CODIGO
        INTO n_ipr_dt_entrega_p,
             n_ipr_semana_ent_p,
             n_ipr_lote_p,
             n_ipg_codigo
        FROM SIAOS.ITEM_PROP
       WHERE IPR_CODIGO = n_codigo_pai;
    
      SELECT IPR_DT_ENTREGA, IPR_SEMANA_ENT, IPR_LOTE, IPR_STATUS_CONS
        INTO n_ipr_dt_entrega_f,
             n_ipr_semana_ent_f,
             n_ipr_lote_f,
             n_ipr_status_con
        FROM SIAOS.ITEM_PROP
       WHERE IPR_CODIGO = n_codigo_filho;
    
      IF n_ipr_lote_f != n_ipr_lote_p THEN
        n_ipr_status_con := NULL;
      END IF;
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_COD_TR      = n_codigo_pai,
             IPR_LINK_MANUAL = 1,
             IPR_LOTE        = n_ipr_lote_p,
             IPR_DT_ENTREGA  = n_ipr_dt_entrega_p,
             IPR_SEMANA_ENT  = n_ipr_semana_ent_p,
             IPR_STATUS_CONS = n_ipr_status_con,
             IPG_CODIGO      = n_ipg_codigo
       WHERE ITEM_PROP.IPR_CODIGO = n_codigo_filho;
    
    ELSIF n_codigo_pai IS NULL AND n_codigo_filho IS NOT NULL THEN
    
      UPDATE SIAOS.ITEM_PROP
         SET IPR_COD_TR = NULL, IPR_LINK_MANUAL = 0
       WHERE ITEM_PROP.IPR_CODIGO = n_codigo_filho
         AND IPR_LINK_MANUAL = 1;
    
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
      n_erro := 1;
  END SP_AMARRA_CONTROLE;

  ---------------------------------------------------------------------
  ------ AMARRA / DESAMARRA ITENS -------------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_AMARRA_ITEMS(n_prp_codigo IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                            n_item_pai   IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_item_filho IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                            n_erro       OUT NUMBER) IS
  
    n_ipr_codigo_f  SIAOS.ITEM_PROP.IPR_CODIGO%TYPE;
    vc2_ccf         SIAOS.ITEM_PROP_UNI.CCF%TYPE;
    n_ipr_ipi       SIAOS.ITEM_PROP.IPR_IPI%TYPE;
    n_ipr_icms      SIAOS.ITEM_PROP.IPR_ICMS%TYPE;
    n_ipr_iss       SIAOS.ITEM_PROP.IPR_ISS%TYPE;
    c_pro_codigo    SIAOS.ITEM_PROP.PRO_CODIGO%TYPE;
    n_cli_codigo    SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    n_ipr_qtd_p     SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE;
    n_ipr_qtd_f     SIAOS.ITEM_PROP.IPR_QUANTIDADE%TYPE;
    n_razao         NUMBER;
    n_itemizar_P    SIAOS.PRODUTO.ITEMIZAR%TYPE;
    n_itemizar_f    SIAOS.PRODUTO.ITEMIZAR%TYPE;
    c_familia_pai   SIAOS.PRODUTO.FAMILIA%TYPE;
    c_familia_fil   SIAOS.PRODUTO.FAMILIA%TYPE;
    n_ipg_codigo    SIAOS.ITEM_PROP.IPG_CODIGO%TYPE;
    n_ipi           SIAOS.ITEM_PROP.IPR_IPI%TYPE;
    n_iss           SIAOS.ITEM_PROP.IPR_ISS%TYPE;
    n_icms          SIAOS.ITEM_PROP.IPR_ICMS%TYPE;
    n_ipr_venda_fim SIAOS.ITEM_PROP.IPR_VENDA_FIM%TYPE;
    c_estado        SIAOS.ICMS.ESTADO%TYPE;
    c_destmat       SIAOS.PROPOSTA.PRP_DESTINO%TYPE;
    n_tes_recno     NUMBER(11);
    n_pis           SIAOS.SAPP.SAP_PIS%TYPE;
    n_cofins        SIAOS.SAPP.SAP_COFINS%TYPE;
    n_cfiscal       VARCHAR2(12);
    n_top_codigo    SIAOS.PROPOSTA.TOP_CODIGO%TYPE;
    n_diferencial   INTEGER;
    n_per_dif       NUMBER(11, 2);
    n_substituicao  INTEGER;
    n_per_sub       NUMBER(11, 2);
  
  BEGIN
  
    IF n_item_pai IS NOT NULL AND n_item_filho IS NOT NULL THEN
    
      SELECT CCF, TES_RECNO, IPU_NCM
        INTO vc2_ccf, n_tes_recno, n_cfiscal
        FROM ITEM_PROP_UNI
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = n_item_pai;
    
      SELECT DISTINCT IPR_IPI, IPR_ICMS, IPR_ISS, PRO_CODIGO, IPG_CODIGO, P.INE_ITEMIZAR, TRIM(F.FIT_FAMILIA) FAMILIA
        INTO n_ipr_ipi, n_ipr_icms, n_ipr_iss, c_pro_codigo, n_ipg_codigo, n_itemizar_p, c_familia_pai
        FROM SIAOS.ITEM_PROP IP
       INNER JOIN CADBASICO.ITEM_NEGOCIO P ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
       INNER JOIN CADBASICO.FAMILIA_ITNEG F ON F.FIT_CODIGO = P.FIT_CODIGO
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = n_item_pai
         AND ROWNUM = 1;
    
      SELECT DISTINCT P.INE_ITEMIZAR, TRIM(F.FIT_FAMILIA) FAMILIA
        INTO n_itemizar_f, c_familia_fil
        FROM SIAOS.ITEM_PROP IP
       INNER JOIN CADBASICO.ITEM_NEGOCIO P ON P.INE_CODIGO = TRIM(IP.PRO_CODIGO)
       INNER JOIN CADBASICO.FAMILIA_ITNEG F ON F.FIT_CODIGO = P.FIT_CODIGO
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = n_item_filho
         AND ROWNUM = 1;
    
      UPDATE ITEM_PROP_UNI
         SET CCF           = vc2_ccf,
             IPR_ITEM_PAI  = n_item_pai,
             TES_RECNO     = n_tes_recno,
             IPU_NCM       = n_cfiscal
       WHERE PRP_CODIGO    = n_prp_codigo
         AND IPR_ITEM_PROP = n_item_filho;
    
      UPDATE ITEM_PROP
         SET IPR_IPI       = n_ipr_ipi,
             IPR_ICMS      = n_ipr_icms,
             IPR_ISS       = n_ipr_iss,
             IPR_COD_TR    = NULL
       WHERE PRP_CODIGO    = n_prp_codigo
         AND IPR_ITEM_PROP = n_item_filho;
    
      IF (c_familia_pai IN ('SENS','CA')) AND (c_familia_fil = 'SR') THEN
        /*
              IF (n_itemizar_p = 0 AND n_itemizar_f = 1) OR
                 (n_itemizar_p = 1 AND n_itemizar_f = 1) THEN
        */
        SELECT SUM(IPR_QUANTIDADE)
          INTO n_ipr_qtd_p
          FROM ITEM_PROP
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_ITEM_PROP = n_item_pai;
      
        SELECT SUM(IPR_QUANTIDADE)
          INTO n_ipr_qtd_f
          FROM ITEM_PROP
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_ITEM_PROP = n_item_filho;
      
        n_razao := n_ipr_qtd_f / n_ipr_qtd_p;
      
        IF (n_razao - TRUNC(n_razao)) = 0 THEN
        
          FOR cur_item IN (SELECT IPR_CODIGO
                             FROM ITEM_PROP IP
                            WHERE IP.PRP_CODIGO = n_prp_codigo
                              AND IP.IPR_ITEM_PROP = n_item_pai
                            ORDER BY IPR_CODIGO) LOOP
          
            SELECT MIN(IPR_CODIGO)
              INTO n_ipr_codigo_f
              FROM ITEM_PROP IP
             WHERE IP.PRP_CODIGO = n_prp_codigo
               AND IP.IPR_ITEM_PROP = n_item_filho
               AND IP.IPR_COD_TR IS NULL;
          
            SIAOS.PCK_SMART_SALES3.SP_AMARRA_CONTROLE(cur_item.IPR_CODIGO,
                                                      n_ipr_codigo_f,
                                                      n_erro);
          
          END LOOP;
        
          SELECT NVL(COUNT(IPR_CODIGO), 0)
            INTO n_ipr_codigo_f
            FROM ITEM_PROP IP
           WHERE IP.PRP_CODIGO = n_prp_codigo
             AND IP.IPR_ITEM_PROP = n_item_filho
             AND IP.IPR_COD_TR IS NULL;
        
          IF n_ipr_codigo_f > 0 THEN
            SIAOS.PCK_SMART_SALES3.SP_AMARRA_ITEMS(n_prp_codigo,
                                                   n_item_pai,
                                                   n_item_filho,
                                                   n_erro);
          END IF;
        
        END IF;
      ELSE
      
        UPDATE ITEM_PROP
           SET IPR_LINK_MANUAL = 1
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_ITEM_PROP = n_item_filho;
      
      END IF;
    
    ELSIF n_item_pai IS NULL AND n_item_filho IS NOT NULL THEN
    
      SELECT CLI_CODIGO
        INTO n_cli_codigo
        FROM PROPOSTA
       WHERE PRP_CODIGO = n_prp_codigo;
    
      SELECT DISTINCT PRO_CODIGO
        INTO c_pro_codigo
        FROM ITEM_PROP
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = n_item_filho;
    
      BEGIN
      
        SELECT E.EST_SIGLA,
               P.CLI_CODIGO,
               DECODE(P.PRP_DESTINO, 'C', 'F', P.PRP_DESTINO)
          INTO c_estado, n_cli_codigo, c_destmat
          FROM SIAOS.PROPOSTA P
          LEFT JOIN SIAOS.CLIENTE_TEMP CT
            ON P.PRP_CODIGO = CT.PRP_CODIGO
          LEFT JOIN GERAL.ESTADO E
            ON CT.EST_CODIGO = E.EST_CODIGO
         WHERE P.PRP_CODIGO = n_prp_codigo;
      
      EXCEPTION
        WHEN NO_DATA_FOUND THEN
          c_estado  := 'SP';
          c_destmat := 'F';
      END;
    
      INTEGRACAO.PCK_DADO_FISCAL.SP_IMP_ITEM(c_pro_codigo,
                     LPAD(n_cli_codigo, 6, '0'),
                     c_estado,
                     c_destmat,
                     n_tes_recno,
                     n_top_codigo,
                     n_ipi,
                     n_icms,
                     n_iss,
                     n_diferencial,
                     n_per_dif,
                     n_substituicao,
                     n_per_sub,
                     n_pis,
                     n_cofins,
                     n_cfiscal,
                     NULL);
    
      BEGIN
        SELECT CF.CCF
          INTO vc2_ccf
          FROM MULTGESTOR.FATCCF CF
         WHERE TRIM(REPLACE(CF.CLASSIFICACAO, '.', '')) = TRIM(n_cfiscal);
      EXCEPTION
        WHEN OTHERS THEN
          vc2_ccf := NULL;
      END;
    
      /*
            SIAOS.PCK_SMART_SALES3.SP_IMPOSTOS_PRODUTO(c_pro_codigo,
                                                       n_cli_codigo,
                                                       NULL,
                                                       n_servico,
                                                       vc2_ccf,
                                                       n_ipr_ipi,
                                                       n_ipr_iss,
                                                       n_ipr_icms,
                                                       n_erro);
      */
      UPDATE ITEM_PROP_UNI
         SET CCF          = vc2_ccf,
             IPR_ITEM_PAI = NULL,
             TES_RECNO    = n_tes_recno,
             IPU_NCM      = TRIM(n_cfiscal)
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = n_item_filho;
    
      UPDATE ITEM_PROP
         SET IPR_IPI  = n_ipr_ipi,
             IPR_ICMS = n_ipr_icms,
             IPR_ISS  = n_ipr_iss
       WHERE PRP_CODIGO = n_prp_codigo
         AND IPR_ITEM_PROP = n_item_filho;
    
      FOR cur_item IN (SELECT IPR_CODIGO
                         FROM ITEM_PROP IP
                        WHERE IP.PRP_CODIGO = n_prp_codigo
                          AND IP.IPR_ITEM_PROP = n_item_filho
                        ORDER BY IPR_CODIGO) LOOP
        SIAOS.PCK_SMART_SALES3.SP_AMARRA_CONTROLE(NULL,
                                                  cur_item.IPR_CODIGO,
                                                  n_erro);
      END LOOP;
    
    END IF;
  
    COMMIT;
  
    SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo,
                                                   n_item_filho,
                                                   n_ipr_venda_fim);
    SIAOS.PCK_SMART_SALES3.SP_ARRUMA_GRUPO(n_prp_codigo, n_ipg_codigo);
  
    --  EXCEPTION WHEN OTHERS THEN
    --      n_erro := 1;
  END SP_AMARRA_ITEMS;

  ---------------------------------------------------------------------
  ------ EXPIRA RESERVA -----------------------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_EXPIRA_RESERVA IS
  
    c_origem SIAOS.ORIGEM.ORIGEM%TYPE := 'ID';
  
  BEGIN
  
    FOR cur_prop IN (SELECT P.PRP_CODIGO
                       FROM SGC.RESERVA R, SIAOS.PROPOSTA P
                      WHERE R.PRP_CODIGO = P.PRP_CODIGO
                        AND TIP_TIPORES = 2
                        AND TRUNC(DECODE(P.PRP_CONFIRMA,
                                         0,
                                         R.IPR_DT_PEDIDO + 3,
                                         R.IPR_DT_PEDIDO + 7)) <=
                            TRUNC(SYSDATE)
                        AND P.ORDER_NO IS NULL
                      GROUP BY P.PRP_CODIGO,
                               P.PRP_CONFIRMA,
                               TRUNC(R.IPR_DT_PEDIDO)) LOOP
    
      FOR cur_item IN (SELECT IPR_CODIGO
                         FROM SIAOS.ITEM_PROP
                        WHERE ITEM_PROP.PRP_CODIGO = cur_prop.PRP_CODIGO) LOOP
      
        SGC.PCK_WINSGC.SP_CANC_RESERVA(cur_item.IPR_CODIGO, 1); --Cancela a Reserva
      
        UPDATE SIAOS.ITEM_PROP
           SET ITEM_PROP.SENSOR = NULL, ITEM_PROP.IPR_N_SERIE = NULL
         WHERE ITEM_PROP.IPR_CODIGO = cur_item.IPR_CODIGO;
      
      END LOOP;
    
      BEGIN
        SELECT O.ORIGEM
          INTO c_origem
          FROM ORIGEM O
         WHERE O.GDI_CODIGO =
               (SELECT ORIGEM.GDI_CODIGO
                  FROM ORIGEM, PROPOSTA
                 WHERE ORIGEM.ORIGEM = PROPOSTA.ORI_CODIGO
                   AND PROPOSTA.PRP_CODIGO = cur_prop.PRP_CODIGO)
           AND O.ORI_STATUS = 1
           AND O.TOR_CODIGO = 1
           AND ROWNUM = 1;
      EXCEPTION
        WHEN OTHERS THEN
          c_origem := 'ID';
      END;
    
      UPDATE SIAOS.PROPOSTA
         SET PROPOSTA.ORI_CODIGO = c_origem
       WHERE PROPOSTA.PRP_CODIGO = cur_prop.PRP_CODIGO;
    
    END LOOP;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
  END SP_EXPIRA_RESERVA;

  ---------------------------------------------------------------------
  ------ CONFIGURA ITEM HOLD ------------------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_ITEM_HOLD(n_prp_codigo    IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                         n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                         n_hold          IN INTEGER,
                         n_erro          OUT NUMBER) IS
  
    n_ipr_semana_ent SIAOS.ITEM_PROP.IPR_LOTE%TYPE;
    n_ipr_lote       SIAOS.ITEM_PROP.IPR_SEMANA_ENT%TYPE;
  
  BEGIN
  
    IF n_hold = 1 THEN
      FOR cur_item IN (SELECT IPR_CODIGO
                         FROM ITEM_PROP
                        WHERE PRP_CODIGO = n_prp_codigo
                          AND IPR_ITEM_PROP = n_ipr_item_prop) LOOP
      
        UPDATE SIAOS.ITEM_PROP
           SET IPR_HOLD = 1, IPR_LOTE = NULL, IPR_SEMANA_ENT = '999999'
         WHERE IPR_CODIGO = cur_item.IPR_CODIGO
            OR IPR_COD_TR = cur_item.IPR_CODIGO;
      
      END LOOP;
    
    ELSE
      BEGIN
        SELECT DISTINCT IPR_SEMANA_ENT, IPR_LOTE
          INTO n_ipr_semana_ent, n_ipr_lote
          FROM SIAOS.ITEM_PROP
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_LOTE = (SELECT MAX(IPR_LOTE)
                             FROM SIAOS.ITEM_PROP IP
                            WHERE IP.PRP_CODIGO = n_prp_codigo);
      EXCEPTION
        WHEN OTHERS THEN
          n_ipr_semana_ent := NULL;
          n_ipr_lote       := 1;
      END;
    
      FOR cur_item IN (SELECT IPR_CODIGO
                         FROM ITEM_PROP
                        WHERE PRP_CODIGO = n_prp_codigo
                          AND IPR_ITEM_PROP = n_ipr_item_prop) LOOP
      
        UPDATE SIAOS.ITEM_PROP
           SET IPR_HOLD        = 0,
               IPR_LOTE        = n_ipr_lote,
               IPR_SEMANA_ENT  = n_ipr_semana_ent,
               IPR_STATUS_CONS = NULL
         WHERE IPR_CODIGO = cur_item.IPR_CODIGO
            OR IPR_COD_TR = cur_item.IPR_CODIGO;
      
      END LOOP;
    
      UPDATE SIAOS.PROPOSTA
         SET PRP_STATUS_CONS = NULL,
             PRP_STATUS_FSVC = NULL,
             PRP_STATUS_IQV  = NULL
       WHERE PRP_CODIGO = n_prp_codigo;
    
    END IF;
  
  END SP_ITEM_HOLD;

  ---------------------------------------------------------------------
  ------ GRAVA CONTATO EXTRA -------------------------------------
  ---------------------------------------------------------------------
  PROCEDURE SP_CONTATO(n_operacao            IN INTEGER,
                       n_prp_codigo          IN SIAOS.CONTATO_PROP.PRP_CODIGO%TYPE,
                       n_cop_numero          IN OUT SIAOS.CONTATO_PROP.COP_NUMERO%TYPE,
                       n_cop_tipo            IN SIAOS.CONTATO_PROP.COP_TIPO%TYPE,
                       vc2_cop_nome          IN SIAOS.CONTATO_PROP.COP_NOME%TYPE,
                       vc2_cop_cargo1        IN SIAOS.CONTATO_PROP.COP_CARGO%TYPE,
                       vc2_cop_departamento1 IN SIAOS.CONTATO_PROP.COP_DEPARTAMENTO%TYPE,
                       vc2_cop_fone1         IN SIAOS.CONTATO_PROP.COP_FONE%TYPE,
                       vc2_cop_celular1      IN SIAOS.CONTATO_PROP.COP_CELULAR%TYPE,
                       vc2_cop_email1        IN SIAOS.CONTATO_PROP.COP_EMAIL%TYPE,
                       vc2_cop_fax1          IN SIAOS.CONTATO_PROP.COP_FAX%TYPE,
                       n_temporario          IN INTEGER) IS
  
    vc2_cop_cargo        SIAOS.CONTATO_PROP.COP_CARGO%TYPE;
    vc2_cop_departamento SIAOS.CONTATO_PROP.COP_DEPARTAMENTO%TYPE;
    vc2_cop_fone         SIAOS.CONTATO_PROP.COP_FONE%TYPE;
    vc2_cop_celular      SIAOS.CONTATO_PROP.COP_CELULAR%TYPE;
    vc2_cop_email        SIAOS.CONTATO_PROP.COP_EMAIL%TYPE;
    vc2_cop_fax          SIAOS.CONTATO_PROP.COP_FAX%TYPE;
  
    --     n_cop_numero_novo          SIAOS.CONTATO_PROP.COP_NUMERO%TYPE;
    n_cli_codigo SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
  
  BEGIN
  
    IF n_temporario = 0 THEN
    
      SELECT PROPOSTA.CLI_CODIGO
        INTO n_cli_codigo
        FROM SIAOS.PROPOSTA
       WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo;
    
      BEGIN
      
        SELECT CARGO, DEPTO, TELEFONE, CELULAR, EMAIL, FAX
          INTO vc2_cop_cargo,
               vc2_cop_departamento,
               vc2_cop_fone,
               vc2_cop_celular,
               vc2_cop_email,
               vc2_cop_fax
          FROM SIAOS.CONTATOS
         WHERE CONTATOS.CODCLIENTE = n_cli_codigo
           AND TRIM(CONTATOS.NOME) = TRIM(vc2_cop_nome);
      
      EXCEPTION
        WHEN OTHERS THEN
        
          SELECT CARGO, DEPTO, TELEFONE, CELULAR, EMAIL, FAX
            INTO vc2_cop_cargo,
                 vc2_cop_departamento,
                 vc2_cop_fone,
                 vc2_cop_celular,
                 vc2_cop_email,
                 vc2_cop_fax
            FROM SIAOS.CONTATOS
           WHERE CONTATOS.CODCLIENTE = n_cli_codigo
             AND ROWNUM = 1;
        
      END;
    
    ELSE
    
      vc2_cop_cargo        := vc2_cop_cargo1;
      vc2_cop_departamento := vc2_cop_departamento1;
      vc2_cop_fone         := vc2_cop_fone1;
      vc2_cop_celular      := vc2_cop_celular1;
      vc2_cop_email        := vc2_cop_email1;
      vc2_cop_fax          := vc2_cop_fax1;
    
    END IF;
  
    IF n_operacao = 1 THEN
    
      SELECT NVL(MAX(COP_NUMERO), 0) + 1
        INTO n_cop_numero
        FROM CONTATO_PROP
       WHERE PRP_CODIGO = n_prp_codigo;
    
      INSERT INTO CONTATO_PROP
        (PRP_CODIGO,
         COP_NUMERO,
         COP_TIPO,
         COP_NOME,
         COP_CARGO,
         COP_DEPARTAMENTO,
         COP_FONE,
         COP_CELULAR,
         COP_EMAIL,
         COP_FAX,
         COP_TEMP)
      VALUES
        (n_prp_codigo,
         n_cop_numero,
         n_cop_tipo,
         vc2_cop_nome,
         vc2_cop_cargo,
         vc2_cop_departamento,
         vc2_cop_fone,
         vc2_cop_celular,
         vc2_cop_email,
         vc2_cop_fax,
         n_temporario);
    
    ELSIF n_operacao = 2 THEN
    
      UPDATE CONTATO_PROP
         SET COP_TIPO         = n_cop_tipo,
             COP_NOME         = vc2_cop_nome,
             COP_CARGO        = vc2_cop_cargo,
             COP_DEPARTAMENTO = vc2_cop_departamento,
             COP_FONE         = vc2_cop_fone,
             COP_CELULAR      = vc2_cop_celular,
             COP_EMAIL        = vc2_cop_email,
             COP_FAX          = vc2_cop_fax,
             COP_TEMP         = n_temporario
       WHERE PRP_CODIGO = n_prp_codigo
         AND COP_NUMERO = n_cop_numero;
    
    ELSIF n_operacao = 3 THEN
    
      DELETE CONTATO_PROP
       WHERE PRP_CODIGO = n_prp_codigo
         AND COP_NUMERO = n_cop_numero;
    
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END SP_CONTATO;

  -------------------------------------------------------------------
  -- Calcula Imposto do Produto
  -------------------------------------------------------------------
  FUNCTION SF_CALC_PRECO_IMPOSTO(c_moeda      SIAOS.INDICFIN.MOEDA%TYPE,
                                 n_ipi        NUMBER,
                                 n_icms       NUMBER,
                                 n_preco      NUMBER,
                                 n_tem_pis    NUMBER,
                                 n_tem_cofins NUMBER,
                                 vc_produto   CADBASICO.ITEM_NEGOCIO.INE_CODIGO%TYPE)
    RETURN NUMBER IS
  
    n_retorno          NUMBER(17, 2) := 0;
    n_fator_imposto    NUMBER(17, 8) := 1;
    n_fat_ajuste       SIAOS.FATOR_AJUSTE.FAJ_FATOR_R%TYPE := 1;
    n_sap_f_mercado_p  SIAOS.SAPP.SAP_F_MERCADO_P%TYPE;
    n_sap_f_mercado_s  SIAOS.SAPP.SAP_F_MERCADO_S%TYPE;
    n_sap_f_mercado    SIAOS.SAPP.SAP_F_MERCADO_S%TYPE;
    n_sap_cotacao_us   SIAOS.SAPP.SAP_COTACAO_US%TYPE;
    n_sap_cotacao_euro SIAOS.SAPP.SAP_COTACAO_EURO%TYPE;
    n_sap_cotacao_rmb  SIAOS.SAPP.SAP_COTACAO_RMB%TYPE;
    n_sap_pis          SIAOS.SAPP.SAP_PIS%TYPE;
    n_sap_cofins       SIAOS.SAPP.SAP_COFINS%TYPE;
    n_servico          SIAOS.FAMILIA.SERVICO%TYPE;
  
  BEGIN
    -- FATORES PARA CALCULOS
    SELECT SAP_F_MERCADO_P,
           SAP_F_MERCADO_S,
           SAP_COTACAO_US,
           SAP_COTACAO_EURO,
           SAP_COTACAO_RMB,
           SAP_PIS,
           SAP_COFINS
      INTO n_sap_f_mercado_p,
           n_sap_f_mercado_s,
           n_sap_cotacao_us,
           n_sap_cotacao_euro,
           n_sap_cotacao_rmb,
           n_sap_pis,
           n_sap_cofins
      FROM SAPP;
  
    IF n_tem_pis = 0 THEN
      n_sap_pis := 0;
    END IF;
  
    IF n_tem_cofins = 0 THEN
      n_sap_cofins := 0;
    END IF;
  
    -- Pega o fator de ajuste do preco em Reais
    BEGIN
      /*
              SELECT FAJ_FATOR_R
                INTO n_fat_ajuste
                FROM SIAOS.FATOR_AJUSTE
               WHERE PRODUTO = c_produto;
      */
      SELECT I.INE_FATORAJ
        INTO n_fat_ajuste
        FROM CADBASICO.ITEM_NEGOCIO I
       WHERE I.INE_CODIGO = TRIM(vc_produto);
    
    EXCEPTION
      WHEN OTHERS THEN
        n_fat_ajuste := 1;
    END;
  
    -- BUSCA SE É PRODUTO OU SERVIÇO
    BEGIN
    
      SELECT NVL(F.FIT_SERVICO, 0)
        INTO n_servico
        FROM CADBASICO.FAMILIA_ITNEG F
       INNER JOIN CADBASICO.ITEM_NEGOCIO P
          ON P.FIT_CODIGO = F.FIT_CODIGO
       WHERE P.INE_CODIGO = TRIM(vc_produto);
    
    EXCEPTION
      WHEN OTHERS THEN
        n_servico := 0;
    END;
  
    IF n_servico = 1 THEN
    
      n_sap_f_mercado := n_sap_f_mercado_s;
    
      n_fator_imposto := 100 / (100 - (n_sap_pis + n_sap_cofins));
    
    ELSE
    
      n_sap_f_mercado := n_sap_f_mercado_p;
    
      n_fator_imposto := 100 /
                         (100 - (n_sap_pis + n_sap_cofins + NVL(n_icms, 0)) -
                         NVL(n_ipi, 0) * (NVL(n_icms, 0) / 100));
    
    END IF;
  
    IF (c_moeda = 'USD') OR (c_moeda = 'US') THEN
      -- Dólar
      n_retorno := n_preco;
    ELSIF (c_moeda = 'R$') OR (c_moeda = 'RS') THEN
      -- Real
      n_retorno := n_preco * n_fator_imposto * n_sap_f_mercado * n_sap_cotacao_us * n_fat_ajuste;
    ELSIF (c_moeda = 'EUR') THEN
      -- Euro Tipo B
      n_retorno := n_preco / n_sap_cotacao_euro;
    ELSIF (c_moeda = 'CNY') THEN
      -- CNY Tipo A
      n_retorno := n_preco * n_sap_cotacao_rmb;
    END IF;
  
    RETURN(n_retorno);
  
  END SF_CALC_PRECO_IMPOSTO;

  -------------------------------------------------------------------
  -- Calcula Preco do Produto
  -------------------------------------------------------------------
  PROCEDURE SP_CALCULA_PRECO(vc2_produto      IN PRODUTO.PRODUTO%TYPE,
                             vc2_opcat        IN VARCHAR2,
                             vc2_opesp        IN OELIN.OP_ESP%TYPE,
                             vc2_moeda        IN INDICFIN.MOEDA%TYPE,
                             n_completo       IN NUMBER,
                             n_consulta_preco OUT NUMBER,
                             n_preco_final    OUT NUMBER) IS
  
    /* Variaveis Locais para Calculo do Preco do Produto */
    n_ite_operacao    ITEM.ITE_OPERACAO%TYPE;
    n_link            OPCAO.LINK1%Type;
    n_multiplicador   OPCAO.MULTIP1%Type;
    n_preco_produto   PRODUTO.PRECO1%Type;
    n_preco_opcat     PRODUTO.PRECO1%Type;
    n_acum_opcat      PRODUTO.PRECO1%Type := 0;
    n_preco_opesp     PRODUTO.PRECO1%Type;
    n_acum_opesp      PRODUTO.PRECO1%Type := 0;
    n_exige_cotacao   FAMILIA.FAM_EXIGCOT%Type;
    vc2_tipo_coluna   varchar2(30);
    vc2_tipo_coluna2  varchar2(30);
    vc2_consulta      varchar2(500);
    n_consulta_preco2 NUMBER;
    i                 NUMBER;
    vc2_moeda_def     SIAOS.INDICFIN.MOEDA%TYPE;
    --  vc2_cons_opcao       varchar2(100);
    --  vc2_cons_opclas     varchar2(100);
  
  BEGIN
  
    SELECT CP.CRR_MOEDA_CALC
      INTO vc2_moeda_def
      FROM SIAOS.CONFIGURA_PROPOSTA CP;
  
    --IF vc2_moeda_def IS NULL THEN
      --vc2_moeda_def := vc2_moeda;
    --END IF;
  
    n_consulta_preco := 0;
  
    /* Verifica MOEDA e armazena o SELECT em uma variavel
    IF vc2_moeda_def = 'USD' THEN
      vc2_tipo_coluna  := 'PRECO1';
    ELSIF vc2_moeda_def = 'EUR' THEN
      vc2_tipo_coluna  := 'PRECO3';
    ELSE
      vc2_tipo_coluna  := 'PRECO2';
    END IF;
    */
    vc2_tipo_coluna := 'INE_PRECO';
  
    IF vc2_moeda = 'USD' THEN
      vc2_tipo_coluna2 := 'INE_CONSD';
    ELSIF vc2_moeda = 'EUR' THEN
      vc2_tipo_coluna2 := 'INE_CONSE';
    ELSE
      vc2_tipo_coluna2 := 'INE_CONSR';
    END IF;
  
    SELECT F.FIT_EXIGCOT
      INTO n_exige_cotacao
      FROM CADBASICO.FAMILIA_ITNEG F
     INNER JOIN CADBASICO.ITEM_NEGOCIO P
        ON F.FIT_CODIGO = P.FIT_CODIGO
     WHERE P.INE_CODIGO = TRIM(vc2_produto);
  
    IF NVL(n_exige_cotacao, 0) = 0 THEN
      /* Procura Preco do Produto aramzenado em uma variavel */
      vc2_consulta := 'SELECT ' || vc2_tipo_coluna || ', ' ||
                      vc2_tipo_coluna2 || '
                         FROM CADBASICO.ITEM_NEGOCIO
                        WHERE INE_CODIGO = TRIM(' || '''' ||
                      vc2_produto || ''')';
    
      /* Executando Consulta por SQL Dinamico */
      EXECUTE IMMEDIATE vc2_consulta
        INTO n_preco_produto, n_consulta_preco2;
    
      IF NVL(n_consulta_preco2, 0) = 1 THEN
        n_consulta_preco := 1;
        n_preco_final    := 0;
      ELSE
      
        /* Procura Preco das Opcoes de Catalogo do Produto */
        IF vc2_opcat IS NOT NULL THEN
          vc2_tipo_coluna := 'P.OIT_PRECO';
          /* Verifica MOEDA e armazena o SELECT em uma variavel */
          IF vc2_moeda = 'USD' THEN
            vc2_tipo_coluna2 := 'P.OIT_CONSD';
          ELSIF vc2_moeda = 'EUR' THEN
            vc2_tipo_coluna2 := 'P.OIT_CONSE';
          ELSE
            vc2_tipo_coluna2 := 'P.OIT_CONSR';
          END IF;
        
          i := 1;
          WHILE i <= LENGTH(TRIM(vc2_opcat)) LOOP
            -- Verifica se item é de valor negativo
            vc2_consulta := 'SELECT DECODE(NVL(P.CIT_OPERACAO,1),0,1) ITE_OPERACAO
                               FROM CADBASICO.CLASSE_ITNEG P
                              WHERE P.CIT_TIPO = 1
                                AND P.INE_CODIGO = TRIM(' || '''' ||
                            vc2_produto || ''')' || '
                                AND P.CIT_NROCLAS  = ' || i;
            EXECUTE IMMEDIATE vc2_consulta
              INTO n_ite_operacao; /* Executa SQL Dinamico */
          
            vc2_consulta := 'SELECT ' || vc2_tipo_coluna || ', ' ||
                            vc2_tipo_coluna2 || ',
                                    P.OIT_LINK
                               FROM CADBASICO.OPCAO_ITNEG P
                              WHERE P.CIT_TIPO = 1
                                AND P.INE_CODIGO = TRIM(' || '''' ||
                            vc2_produto || ''')' || '
                                AND P.CIT_NROCLAS = ' || I || '
                                AND P.OIT_OPCAO = ' || '''' ||
                            SUBSTR(vc2_opcat, i, 1) || '''';
            EXECUTE IMMEDIATE vc2_consulta
              INTO n_preco_opcat, n_consulta_preco2, n_link; /* Executa SQL Dinamico */
          
            /* Procura se a Opcao tem algum link com outra Opcao, se tiver procura qual o valor do
            multiplicador  */
            IF NVL(n_consulta_preco2, 0) = 1 THEN
              n_consulta_preco := 1;
              n_preco_final    := 0;
              IF NVL(n_completo, 0) = 0 THEN
                i               := LENGTH(TRIM(vc2_opcat));
                n_preco_opcat   := 0;
                n_acum_opcat    := 0;
                n_preco_produto := 0;
              END IF;
            ELSE
              IF n_link <> 0 THEN
                SELECT P.OIT_MULTIP
                  INTO n_multiplicador
                  FROM CADBASICO.OPCAO_ITNEG P
                 WHERE P.CIT_TIPO    = 1
                   AND P.INE_CODIGO  = TRIM(vc2_produto)
                   AND P.CIT_NROCLAS = n_link
                   AND P.OIT_OPCAO   = SUBSTR(vc2_opcat, n_link, 1);
                /* se for zero multiplicador e igual a 1 */
                IF n_multiplicador = 0 THEN
                  n_multiplicador := 1;
                END IF;
                n_preco_opcat := NVL(n_preco_opcat, 0) *
                                 NVL(n_multiplicador, 1) *
                                 NVL(n_ite_operacao, 1);
              END IF;
              n_acum_opcat := n_acum_opcat + NVL(n_preco_opcat, 0);
            END IF;
            i := i + 1;
          END LOOP;
        
        END IF;
      
        IF NVL(n_consulta_preco, 0) = 0 OR NVL(n_completo, 0) = 1 THEN
          vc2_tipo_coluna := 'P.OIT_PRECO';
          /* Procura Preco das Opcoes Especiais do Produto */
          IF vc2_opesp IS NOT NULL THEN
            IF vc2_moeda = 'USD' THEN
              vc2_tipo_coluna2 := 'P.OIT_CONSD';
            ELSIF vc2_moeda = 'EUR' THEN
              vc2_tipo_coluna2 := 'P.OIT_CONSE';
            ELSE
              vc2_tipo_coluna2 := 'P.OIT_CONSR';
            END IF;
            i := 1;
            WHILE i <= LENGTH(TRIM(vc2_opesp)) LOOP
            
              BEGIN
                vc2_consulta := 'SELECT ' || vc2_tipo_coluna || ', ' ||
                                vc2_tipo_coluna2 || '
                                   FROM CADBASICO.OPCAO_ITNEG P
                                  WHERE P.CIT_TIPO = 2
                                    AND P.INE_CODIGO = TRIM(' || '''' ||
                                vc2_produto || ''')' || '
                                    AND P.OIT_OPCAO  = ' || '''' ||
                                substr(vc2_opesp, i, 2) || '''';
              
                EXECUTE IMMEDIATE vc2_consulta
                  INTO n_preco_opesp, n_consulta_preco2;
              
                IF NVL(n_consulta_preco2, 0) = 1 THEN
                  n_consulta_preco := 1;
                  n_preco_final    := 0;
                  IF NVL(n_completo, 0) = 0 THEN
                    i               := LENGTH(TRIM(vc2_opesp));
                    n_acum_opesp    := 0;
                    n_preco_opesp   := 0;
                    n_acum_opcat    := 0;
                    n_preco_produto := 0;
                  END IF;
                END IF;
              
              EXCEPTION
                WHEN NO_DATA_FOUND THEN
                  NULL;
              END;
            
              i            := i + 2;
              n_acum_opesp := n_acum_opesp + NVL(n_preco_opesp, 0);
            
            END LOOP;
          
          END IF;
        
        END IF;
        /* Preco Final do Produto */
        n_preco_final := NVL(n_preco_produto, 0) + 
                         NVL(n_acum_opcat, 0) +
                         NVL(n_acum_opesp, 0);
      
      END IF;
    
    ELSE
      n_preco_final    := 0;
      n_consulta_preco := 2;
    END IF;
  
  END SP_CALCULA_PRECO;

  ----------------------------------------------------------------------
  -- CALCULA PRECO DOS PRODUTOS COM IMPOSTO
  ----------------------------------------------------------------------

  PROCEDURE SP_CALCULA_PRECO_IMP(vc2_produto      IN SIAOS.PRODUTO.PRODUTO%TYPE,
                                 vc2_opcat        IN VARCHAR2,
                                 vc2_opesp        IN SIAOS.OELIN.OP_ESP%TYPE,
                                 vc2_moeda        IN SIAOS.INDICFIN.MOEDA%TYPE,
                                 n_icms           IN SIAOS.ITEM_PROP.IPR_ICMS%TYPE,
                                 n_ipi            IN SIAOS.ITEM_PROP.IPR_ISS%TYPE,
                                 n_preco          OUT NUMBER,
                                 n_consulta_preco OUT NUMBER) IS
  BEGIN
  
    SIAOS.PCK_SMART_SALES3.SP_CALCULA_PRECO(vc2_produto,
                                            vc2_opcat,
                                            vc2_opesp,
                                            vc2_moeda,
                                            1,
                                            n_consulta_preco,
                                            n_preco);
  
    --IF n_consulta_preco = 0 THEN
    n_preco := SIAOS.PCK_SMART_SALES3.SF_CALC_PRECO_IMPOSTO(vc2_moeda,
                                                            n_ipi,
                                                            n_icms,
                                                            n_preco,
                                                            1,
                                                            1,
                                                            vc2_produto);
    --END IF;
  
  END SP_CALCULA_PRECO_IMP;

  ----------------------------------------------------------------------
  -- CALCULA PRECO DOS PRODUTOS COM IMPOSTO
  ----------------------------------------------------------------------

  PROCEDURE SP_CALCULA_PRECO_IMP2(vc2_produto      IN SIAOS.PRODUTO.PRODUTO%TYPE,
                                  vc2_opcat        IN VARCHAR2,
                                  vc2_opesp        IN SIAOS.OELIN.OP_ESP%TYPE,
                                  vc2_moeda        IN SIAOS.INDICFIN.MOEDA%TYPE,
                                  n_icms           IN SIAOS.ITEM_PROP.IPR_ICMS%TYPE,
                                  n_ipi            IN SIAOS.ITEM_PROP.IPR_ISS%TYPE,
                                  n_tem_pis        IN NUMBER,
                                  n_tem_cofins     IN NUMBER,
                                  n_preco          OUT NUMBER,
                                  n_consulta_preco OUT NUMBER) IS
  BEGIN
  
    SIAOS.PCK_SMART_SALES3.SP_CALCULA_PRECO(vc2_produto,
                                            vc2_opcat,
                                            vc2_opesp,
                                            vc2_moeda,
                                            1,
                                            n_consulta_preco,
                                            n_preco);
  
    --IF n_consulta_preco = 0 THEN
    n_preco := SIAOS.PCK_SMART_SALES3.SF_CALC_PRECO_IMPOSTO(vc2_moeda,
                                                            n_ipi,
                                                            n_icms,
                                                            n_preco,
                                                            n_tem_pis,
                                                            n_tem_cofins,
                                                            vc2_produto);
    --END IF;
  
  END SP_CALCULA_PRECO_IMP2;

  ----------------------------------------------------------------------
  -- APAGA ITEM DA PROPOSTA
  ----------------------------------------------------------------------

  PROCEDURE SP_APAGA_ITEM(n_proposta IN SIAOS.ITEM_PROP.PRP_CODIGO%TYPE,
                          n_item     IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                          n_erro     OUT NUMBER) IS
  
  BEGIN
  
    FOR c_item IN (SELECT ITEM_PROP.IPR_CODIGO
                     FROM SIAOS.ITEM_PROP
                    WHERE ITEM_PROP.PRP_CODIGO = n_proposta
                      AND ITEM_PROP.IPR_ITEM_PROP = n_item) LOOP
      SIAOS.PCK_SMART_SALES3.SP_APAGA_PRODUTO(c_item.IPR_CODIGO);
    END LOOP;
  
  EXCEPTION
    WHEN OTHERS THEN
      n_erro := 1;
  END SP_APAGA_ITEM;

  ----------------------------------------------------------------------
  -- Calcula Imposto de Saida
  ----------------------------------------------------------------------

  FUNCTION SF_CALCULA_IMP_SAIDA(n_os      IN NUMBER,
                                n_prop    IN NUMBER,
                                n_preco   IN NUMBER,
                                n_ipi_inc IN NUMBER,
                                n_iss_inc IN NUMBER,
                                n_ipi     IN NUMBER,
                                n_iss     IN NUMBER) RETURN NUMBER IS
  
    n_preco_final NUMBER(11, 4);
  
  BEGIN
  
    n_preco_final := 0;
  
    IF n_os > 200700000 OR n_prop > 110000 THEN
    
      IF n_ipi_inc = 1 THEN
      
        IF NVL(n_ipi, 0) > 0 THEN
        
          n_preco_final := (n_preco * (1 + (n_ipi / 100))) - n_preco;
        
        END IF;
      
      END IF;
    
      IF n_iss_inc = 1 THEN
      
        IF NVL(n_iss, 0) > 0 THEN
        
          n_preco_final := (n_preco / (1 - (n_iss / 100))) - n_preco;
        
        END IF;
      
      END IF;
    
    END IF;
  
    RETURN(n_preco_final);
  
  END SF_CALCULA_IMP_SAIDA;

  -------------------------------------------------------------
  --------------- VERIFICA SE SEMANA É VÁLIDA -----------------
  -------------------------------------------------------------

  FUNCTION SF_VERIFICA_SEMANA(vc2_semana IN VARCHAR2) RETURN NUMBER IS
  
    n_sem NUMBER;
  
  BEGIN
  
    BEGIN
    
      n_sem := REPLACE(vc2_semana, '/', '');
    
      SELECT DISTINCT TO_CHAR(DT_DIA, 'IYYYIW')
        INTO n_sem
        FROM GERAL.CALENDARIO
       WHERE TO_CHAR(DT_DIA, 'YYYY') || CAL_SEMANA = n_sem;
    
    EXCEPTION
      WHEN OTHERS THEN
        RETURN(0);
    END;
  
    RETURN(1);
  
  END SF_VERIFICA_SEMANA;

  ----------------------------------------------------------------------
  -- GRAVA MODELO
  ----------------------------------------------------------------------

  PROCEDURE SP_GRAVA_MODELO(v_op         IN VARCHAR,
                            n_cmo_codigo IN SIAOS.CONFIGURA_MODELO.CMO_CODIGO%TYPE,
                            v_cmo_nome   IN SIAOS.CONFIGURA_MODELO.CMO_NOME%TYPE,
                            n_erro       OUT NUMBER) IS
  
    n_usu_chapa_user SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_usu_chapa_def  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_acesso         INTEGER := 0;
  
  BEGIN
  
    SELECT U.USU_CHAPA
      INTO n_usu_chapa_user
      FROM SIAOS.USUARIO U
     WHERE UPPER(U.USU_LOGINWEB) = USER;
  
    IF v_op = 'in_modelo' THEN
    
      INSERT INTO SIAOS.CONFIGURA_MODELO
        (CMO_NOME, CMO_TEXTO, USU_CHAPA)
      VALUES
        (v_cmo_nome, clb_texto_gl, n_usu_chapa_user);
    
    ELSIF n_cmo_codigo IS NOT NULL THEN
    
      SELECT C.USU_CHAPA
        INTO n_usu_chapa_def
        FROM SIAOS.CONFIGURA_MODELO C
       WHERE C.CMO_CODIGO = n_cmo_codigo;
    
      IF n_usu_chapa_def = n_usu_chapa_user THEN
      
        n_acesso := 1;
      
      ELSE
      
        SELECT COUNT(*)
          INTO n_acesso
          FROM SMARNET.ACESSO_FUNC A
         WHERE A.ACE_CODIGO = 105;
      
      END IF;
    
      IF n_acesso > 0 THEN
      
        IF v_op = 'up_modelo' THEN
        
          UPDATE SIAOS.CONFIGURA_MODELO C
             SET C.CMO_NOME = v_cmo_nome, C.CMO_TEXTO = clb_texto_gl
           WHERE CMO_CODIGO = n_cmo_codigo;
        
        ELSIF v_op = 'dl_modelo' THEN
        
          DELETE FROM SIAOS.CONFIGURA_MODELO
           WHERE CMO_CODIGO = n_cmo_codigo;
        
        END IF;
      ELSE
        n_erro := 2;
      END IF;
    ELSE
      n_erro := 1;
    END IF;
  
  END SP_GRAVA_MODELO;

  ----------------------------------------------------------------------
  -- GERA SET  ---------------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_GERA_SET(n_proposta     IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                        n_pas_codigo   IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                        clb_set_obs    IN VARCHAR2,
                        dt_set_retorno IN SIAOS.PROP_SET.SET_DT_RETORNO%TYPE,
                        vc2_set_tipo   IN SIAOS.PROP_SET.SET_TIPO%TYPE,
                        n_erro         OUT NUMBER) IS
  
    n_set        INTEGER;
    n_usu_chapa  SIAOS.USUARIO.USU_CHAPA%TYPE;
    v_usu_nome   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_pas_nome   SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    n_eml_numero SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    clb_set_obs2 SIAOS.PROP_SET.SET_OBS%TYPE;
    n_rev        SIAOS.PROPOSTA.PRP_REVISAO%TYPE;
    n_cli_codigo SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    v_cli_nome   SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
    n_set_aberto INTEGER := 0;
  
  BEGIN
  
    SELECT NVL(MAX(PS.PRP_SET), 0)
      INTO n_set_aberto
      FROM SIAOS.PROP_SET PS
     WHERE PS.PRP_CODIGO = n_proposta
       AND PS.PAS_CODIGO = n_pas_codigo
       AND PS.SET_DATA_APR IS NULL;
  
    IF vc2_set_tipo = 'S' THEN
    
      UPDATE SIAOS.PROPOSTA
         SET PRP_SISTEMA = 1
       WHERE PRP_CODIGO = n_proposta;
    
    END IF;
  
    IF n_set_aberto = 0 THEN
    
      SELECT P.PRP_REVISAO, P.CLI_CODIGO
        INTO n_rev, n_cli_codigo
        FROM PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
    
      IF n_cli_codigo IS NOT NULL THEN
      
        SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
          INTO v_cli_nome
          FROM SIAOS.CLIENTE C
         WHERE C.CODIGO = n_cli_codigo;
      
      ELSE
      
        SELECT C.CTE_NOME
          INTO v_cli_nome
          FROM SIAOS.CLIENTE_TEMP C
         WHERE C.PRP_CODIGO = n_proposta;
      
      END IF;
    
      IF v_cli_nome IS NULL THEN
        v_cli_nome := '----';
      END IF;
    
      SELECT NVL(MAX(PS.PRP_SET), 0)
        INTO n_set
        FROM SIAOS.PROP_SET PS
       WHERE PS.PRP_CODIGO = n_proposta
         AND PS.SET_DATA_APR IS NULL;
    
      IF n_set = 0 THEN
        SELECT NVL(MAX(PS.PRP_SET), 0) + 1
          INTO n_set
          FROM SIAOS.PROP_SET PS
         WHERE PS.PRP_CODIGO = n_proposta
           AND PS.SET_DATA_APR IS NOT NULL;
      END IF;
    
      SELECT U.USU_CHAPA, U.USU_NOME, U.USU_EMAIL
        INTO n_usu_chapa, v_usu_nome, v_usu_email
        FROM SIAOS.USUARIO U
       WHERE UPPER(U.USU_LOGINWEB) = USER;
    
      clb_set_obs2 := '<font size="2">';
      clb_set_obs2 := clb_set_obs2 ||
                      '<strong>NOTAS DO SOLICITANTE</strong></br>';
      clb_set_obs2 := clb_set_obs2 || '<strong>' || v_usu_nome || ' ' ||
                      TO_CHAR(SYSDATE, 'DD/MM/YYYY HH24:MI:SS') ||
                      '</strong></br>';
      clb_set_obs2 := clb_set_obs2 || '</font>';
      clb_set_obs2 := clb_set_obs2 || '</br>';
      clb_set_obs2 := clb_set_obs2 || clb_set_obs || '</br>';
    
      INSERT INTO SIAOS.PROP_SET
        (PRP_CODIGO,
         PAS_CODIGO,
         PRP_SET,
         USU_CHAPA_SOL,
         SET_DATA_SOL,
         SET_OBS,
         SET_DT_RETORNO,
         SET_DT_REPROG,
         SET_TIPO)
      VALUES
        (n_proposta,
         n_pas_codigo,
         n_set,
         n_usu_chapa,
         SYSDATE,
         clb_set_obs2,
         dt_set_retorno,
         dt_set_retorno,
         vc2_set_tipo);
    
      UPDATE SIAOS.PROPOSTA
         SET PROPOSTA.PST_CODIGO = 5, PROPOSTA.PRP_SET = n_set
       WHERE PROPOSTA.PRP_CODIGO = n_proposta;
    
      --    SIAOS.PCK_SMART_SALES3.SP_SALVA_REVISAO(n_proposta,1);
    
      SELECT PAS.PAS_NOME
        INTO v_pas_nome
        FROM SIAOS.PROP_AREA_SET PAS
       WHERE PAS.PAS_CODIGO = n_pas_codigo;
    
      SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1,
                                             NULL,
                                             n_proposta,
                                             10,
                                             'SET ÁREA: ' || v_pas_nome ||
                                             '<BR>MOTIVO:<br>' || CHR(10) ||
                                             clb_set_obs,
                                             NULL,
                                             n_erro);
    
      FOR cur_set IN (SELECT PAS.PAS_NOME,
                             PAS.PAS_DESCRICAO,
                             U.USU_NOME,
                             U.USU_EMAIL
                        FROM SIAOS.PROP_AREA_SET PAS
                       INNER JOIN SMARNET.ACESSO_FUNC AF
                          ON PAS.ACE_CODIGO_MOD = AF.ACE_CODIGO
                       INNER JOIN USUARIO U
                          ON AF.USU_CHAPA = U.USU_CHAPA
                       WHERE PAS.PAS_CODIGO = n_pas_codigo) LOOP
      
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                          cur_set.USU_NOME || '<' ||
                                          cur_set.USU_EMAIL || '>',
                                          NULL,
                                          NULL,
                                          'SET ' || n_proposta || '-' ||
                                          n_rev || ' - ' || v_cli_nome,
                                          'Solicitação Pendente:',
                                          cur_set.PAS_NOME || ' - ' ||
                                          cur_set.PAS_DESCRICAO ||
                                          '<BR /><BR />Motivo:<BR />' ||
                                          REPLACE(clb_set_obs,
                                                  CHR(10),
                                                  '<br>'),
                                          'Proposta:' || n_proposta || '-' ||
                                          n_rev || ' SET-' || n_set,
                                          'Cliente: ' || v_cli_nome ||
                                          '<br />Solicitante: ' ||
                                          v_usu_nome ||
                                          '<br />Data Retorno: ' ||
                                          TO_DATE(dt_set_retorno,
                                                  'DD/MM/YYYY'),
                                          1,
                                          n_eml_numero);
      
      END LOOP;
    
    ELSE
    
      SELECT P.PRP_SET, P.PRP_REVISAO, P.CLI_CODIGO
        INTO n_set, n_rev, n_cli_codigo
        FROM PROPOSTA P
       WHERE P.PRP_CODIGO = n_proposta;
    
      IF n_cli_codigo IS NOT NULL THEN
      
        SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
          INTO v_cli_nome
          FROM SIAOS.CLIENTE C
         WHERE C.CODIGO = n_cli_codigo;
      
      ELSE
      
        SELECT C.CTE_NOME
          INTO v_cli_nome
          FROM SIAOS.CLIENTE_TEMP C
         WHERE C.PRP_CODIGO = n_proposta;
      
      END IF;
    
      clb_set_obs2 := '<font size="2">';
      clb_set_obs2 := clb_set_obs2 ||
                      '<strong>NOTAS ADICIONAIS DO SOLICITANTE</strong></br>';
      clb_set_obs2 := clb_set_obs2 || '<strong>' || v_usu_nome || ' ' ||
                      TO_CHAR(SYSDATE, 'DD/MM/YYYY HH24:MI:SS') ||
                      '</strong></br>';
      clb_set_obs2 := clb_set_obs2 || '</font>';
      clb_set_obs2 := clb_set_obs2 || '</br>';
      clb_set_obs2 := clb_set_obs2 || clb_set_obs || '</br>';
    
      UPDATE SIAOS.PROP_SET PS
         SET PS.USU_CHAPA_MOD  = NULL,
             PS.SET_DATA_MOD   = NULL,
             PS.USU_CHAPA_APR  = NULL,
             PS.SET_DATA_EXEC  = NULL,
             PS.SET_DATA_APR   = NULL,
             PS.USU_CHAPA_EXE  = NULL,
             PS.SET_DT_RETORNO = dt_set_retorno,
             PS.SET_OBS        = clb_set_obs2 || '<br><hr><br><br>' ||
                                 PS.SET_OBS
       WHERE PRP_CODIGO = n_proposta
         AND PAS_CODIGO = n_pas_codigo
         AND PS.PRP_SET = n_set_aberto;
    
      IF SQL%NOTFOUND THEN
        n_erro := 1;
      END IF;
    
      COMMIT;
    
      IF n_erro IS NULL THEN
      
        SELECT PAS.PAS_NOME
          INTO v_pas_nome
          FROM SIAOS.PROP_AREA_SET PAS
         WHERE PAS.PAS_CODIGO = n_pas_codigo;
      
        SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1,
                                               NULL,
                                               n_proposta,
                                               12,
                                               'SET ÁREA: ' || v_pas_nome ||
                                               '<BR>MOTIVO:<br>' || CHR(10) ||
                                               clb_set_obs,
                                               NULL,
                                               n_erro);
      
        SELECT U.USU_CHAPA, U.USU_NOME, U.USU_EMAIL
          INTO n_usu_chapa, v_usu_nome, v_usu_email
          FROM SIAOS.USUARIO U
         WHERE UPPER(U.USU_LOGINWEB) = USER;
      
        FOR c_mod IN (SELECT DISTINCT U.USU_NOME, U.USU_EMAIL
                        FROM SIAOS.PROP_AREA_SET PA
                       INNER JOIN SMARNET.ACESSO_FUNC AF
                          ON AF.ACE_CODIGO = PA.ACE_CODIGO_MOD
                       INNER JOIN SIAOS.USUARIO U
                          ON U.USU_CHAPA = AF.USU_CHAPA
                       WHERE U.USU_LOGINWEB IS NOT NULL
                         AND PA.PAS_CODIGO = n_pas_codigo
                      UNION
                      SELECT U.USU_NOME, U.USU_EMAIL
                        FROM SIAOS.PROPOSTA P
                       INNER JOIN SIAOS.PROP_SET PS
                          ON PS.PRP_CODIGO = P.PRP_CODIGO
                       INNER JOIN SIAOS.USUARIO U
                          ON PS.USU_CHAPA_SOL = U.USU_CHAPA
                       WHERE PS.PRP_CODIGO = n_proposta
                         AND PS.PAS_CODIGO = n_pas_codigo
                         AND PS.PRP_SET = n_set_aberto) LOOP
        
          SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' ||
                                            v_usu_email || '>',
                                            c_mod.USU_NOME || '<' ||
                                            c_mod.USU_EMAIL || '>',
                                            NULL,
                                            NULL,
                                            'SET ' || n_proposta || '-' ||
                                            n_rev || ' - ' || v_cli_nome,
                                            'SET de ' || v_pas_nome ||
                                            ' retornou ao estado de moderação:',
                                            '<BR />Motivo:<BR />' ||
                                            REPLACE(clb_set_obs,
                                                    CHR(10),
                                                    '<br>'),
                                            'Proposta:' || n_proposta || '-' ||
                                            n_rev || ' SET-' || n_set,
                                            'Cliente: ' || v_cli_nome ||
                                            '<br />Solicitante: ' ||
                                            v_usu_nome ||
                                            '<br />Data Retorno: ' ||
                                            TO_CHAR(dt_set_retorno,
                                                    'DD/MM/YYYY'),
                                            1,
                                            n_eml_numero);
        
        END LOOP;
      
      END IF;
    
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      n_erro := 3;
    
  END SP_GERA_SET;

  ----------------------------------------------------------------------
  -- MODERA SET
  ----------------------------------------------------------------------

  PROCEDURE SP_MODERA_SET(n_proposta    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_usu_chapa   IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                          n_pas_codigo  IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                          v_set_tipo    IN SIAOS.PROP_SET.SET_TIPO%TYPE,
                          vc2_set_obs   IN VARCHAR2,
                          dt_set_reprog IN SIAOS.PROP_SET.SET_DT_REPROG%TYPE,
                          c_pre_msg_rep IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                          n_sac         IN OUT DIATNET.SAC.SAC_NUMERO%TYPE,
                          n_erro        OUT NUMBER) IS
  
    c_pre_mensagem     SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE;
    n_usu_chapa_mod    SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_tem_sac          SIAOS.USUARIO.USU_CHAPA%TYPE;
    v_usu_nome         SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email        SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_sol     SIAOS.USUARIO.USU_NOME%TYPE;
    n_usu_chapa_sol    SIAOS.USUARIO.USU_CHAPA%TYPE;
    v_usu_email_sol    SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_exe     SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_exe    SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_chapa_ven    SIAOS.USUARIO.USU_CHAPA%TYPE;
    v_usu_nome_ven     SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_ven    SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_end_email_vend   VARCHAR2(2000);
    v_usu_nome_exe_db  SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_exe_db SIAOS.USUARIO.USU_EMAIL%TYPE;
    n_cli_codigo       SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    n_cli_codigo_fim   SIAOS.PROPOSTA.CLI_CODIGO_FIM%TYPE;
    v_cli_nome         SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
    n_pas_gerar_sac    SIAOS.PROP_AREA_SET.PAS_GERAR_SAC%TYPE;
    dt_set_retorno     SIAOS.PROP_SET.SET_DT_RETORNO%TYPE;
    dt_set_reprog_db   SIAOS.PROP_SET.SET_DT_REPROG%TYPE;
    dt_set_moderada    SIAOS.PROP_SET.SET_DATA_MOD%TYPE;
    n_set_chapa_exe    SIAOS.PROP_SET.USU_CHAPA_EXE%TYPE;
    clb_set_obs2       SIAOS.PROP_SET.SET_OBS%TYPE;
    v_pas_nome         SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    n_rev              INTEGER;
    n_set              INTEGER;
    n_eml_numero       SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
  
    n_tipo_sac   DIATNET.SAC.TSA_CODIGO%TYPE := 5;
    n_forma_cont DIATNET.SAC.FCO_CODIGO%TYPE := 6;
  
  BEGIN
  
    -- NOME DA AREA (MOSTRAR NO E-MAIL E FOLLOW UP
    SELECT PAS_NOME
      INTO v_pas_nome
      FROM SIAOS.PROP_AREA_SET
     WHERE PAS_CODIGO = n_pas_codigo;
  
    SELECT P.PRP_SET, P.PRP_REVISAO
      INTO n_set, n_rev
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    -- BUSCA DADOS GRAVADOS NA SET
    SELECT TRUNC(SET_DT_RETORNO),
           TRUNC(SET_DT_REPROG),
           SET_DATA_MOD,
           USU_CHAPA_EXE,
           SET_OBS
      INTO dt_set_retorno,
           dt_set_reprog_db,
           dt_set_moderada,
           n_set_chapa_exe,
           clb_set_obs2
      FROM SIAOS.PROP_SET PS
     WHERE PS.PRP_CODIGO = n_proposta
       AND PS.PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET = n_set;
  
    -- BUSCA DADOS DO MODERADOR
    SELECT U.USU_CHAPA, U.USU_NOME, U.USU_EMAIL
      INTO n_usu_chapa_mod, v_usu_nome, v_usu_email
      FROM SIAOS.USUARIO U
     WHERE UPPER(U.USU_LOGINWEB) = USER;
  
    -- BUSCA DADOS DO EXECUTANTE
    SELECT U.USU_NOME, U.USU_EMAIL
      INTO v_usu_nome_exe, v_usu_email_exe
      FROM SIAOS.USUARIO U
     WHERE U.USU_CHAPA = n_usu_chapa;
  
    IF vc2_set_obs IS NOT NULL THEN
      clb_set_obs2 := clb_set_obs2 || '<font size="2">';
      clb_set_obs2 := clb_set_obs2 || '<hr />';
      clb_set_obs2 := clb_set_obs2 ||
                      '<strong>NOTAS DO MODERADOR</strong></br>';
      clb_set_obs2 := clb_set_obs2 || '<strong>' || v_usu_nome || ' ' ||
                      TO_CHAR(SYSDATE, 'DD/MM/YYYY HH24:MI:SS') ||
                      '</strong></br>';
      clb_set_obs2 := clb_set_obs2 || '</font>';
      clb_set_obs2 := clb_set_obs2 || '</br>';
      clb_set_obs2 := clb_set_obs2 || vc2_set_obs || '</br>';
    END IF;
  
    -- VERIFICA SE SET JÁ FOI LIBERADO ANTERIORMENTE
    IF dt_set_moderada IS NULL THEN
      c_pre_mensagem := c_pre_mensagem || '<STRONG>LIBERAÇÃO DO MODERADOR</STRONG><BR>';
    ELSE
      c_pre_mensagem := c_pre_mensagem || '<STRONG>ALTERAÇÃO DE LIBERAÇÃO DO MODERADOR</STRONG><BR>';
    
      -- VERIFICA SE EXECUTANTE FOI ALTERADO
      IF n_usu_chapa != n_set_chapa_exe THEN
      
        -- BUSCA DADOS DO ANTERIOR
        SELECT U.USU_NOME, U.USU_EMAIL
          INTO v_usu_nome_exe_db, v_usu_email_exe_db
          FROM SIAOS.USUARIO U
         WHERE U.USU_CHAPA = n_set_chapa_exe;
      
        c_pre_mensagem := c_pre_mensagem || '<STRONG>ALTERADO EXECUTANTE.</STRONG><BR>';
        c_pre_mensagem := c_pre_mensagem || 'DE  : ' || v_usu_nome_exe_db || '<BR>';
        c_pre_mensagem := c_pre_mensagem || 'PARA: ' || v_usu_nome_exe || '<BR><BR>';
      
      END IF;
    
    END IF;
  
    -- VERIFICA SE DATA DE ENTREGA FOI REPROGRAMADA
    IF TRUNC(dt_set_reprog) != TRUNC(dt_set_reprog_db) THEN
      c_pre_mensagem := c_pre_mensagem || '<STRONG>REPROGRAMAÇÃO NA DATA DE ENTREGA.</STRONG><BR>';
      IF dt_set_reprog_db IS NULL THEN
        c_pre_mensagem := c_pre_mensagem || 'DE  : A DEFINIR<BR>';
      ELSE
        c_pre_mensagem := c_pre_mensagem || 'DE  : ' || TO_CHAR(dt_set_reprog_db, 'DD/MM/YYYY') || '<BR>';
      END IF;
      c_pre_mensagem := c_pre_mensagem || 'PARA: ' || TO_CHAR(dt_set_reprog, 'DD/MM/YYYY') || '<BR>';
      c_pre_mensagem := c_pre_mensagem || 'MOTIVO:<BR>' || c_pre_msg_rep || '<BR>';
    END IF;
  
    -- ATUALIZA DADOS DO SET
    UPDATE SIAOS.PROP_SET PS
       SET PS.SET_DATA_MOD   = DECODE(PS.SET_DATA_MOD,
                                      NULL,
                                      SYSDATE,
                                      PS.SET_DATA_MOD), -- MANTEM DATA DE LIBERAÇÃO ANTERIOR (SE HOUVER)
           PS.USU_CHAPA_MOD  = n_usu_chapa_mod,
           PS.USU_CHAPA_EXE  = n_usu_chapa,
           PS.SET_DT_RETORNO = DECODE(PS.SET_DT_RETORNO,
                                      NULL,
                                      dt_set_reprog,
                                      PS.SET_DT_RETORNO), -- CASO DATA DE RETORNO VAZIA PREENCHER COM DATA REPROGRAMADA
           PS.SET_DT_REPROG  = dt_set_reprog,
           PS.SET_TIPO       = v_set_tipo,
           PS.SET_OBS        = clb_set_obs2 || '<br><hr><br><br>' ||
                               PS.SET_OBS
     WHERE PS.PRP_CODIGO = n_proposta
       AND PS.PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET =
           (SELECT P.PRP_SET FROM PROPOSTA P WHERE P.PRP_CODIGO = n_proposta);
  
    IF SQL%NOTFOUND THEN
      n_erro := 1;
    END IF;
  
    IF n_erro IS NULL THEN
    
      SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1,
                                             NULL,
                                             n_proposta,
                                             11,
                                             c_pre_mensagem,
                                             NULL,
                                             n_erro);
    
      SELECT U.USU_NOME, 
             U.USU_CHAPA, 
             U.USU_EMAIL, 
             PAS.PAS_GERAR_SAC
        INTO v_usu_nome_sol,
             n_usu_chapa_sol,
             v_usu_email_sol,
             n_pas_gerar_sac
        FROM SIAOS.PROP_SET PS, SIAOS.USUARIO U, SIAOS.PROP_AREA_SET PAS
       WHERE PS.USU_CHAPA_SOL = U.USU_CHAPA
         AND PS.PAS_CODIGO = PAS.PAS_CODIGO
         AND PS.PRP_CODIGO = n_proposta
         AND PS.PAS_CODIGO = n_pas_codigo
         AND PS.PRP_SET = (SELECT P.PRP_SET
                             FROM PROPOSTA P
                            WHERE P.PRP_CODIGO = n_proposta);
    
      IF n_pas_gerar_sac = 1 THEN
      
        SELECT P.CLI_CODIGO,
               DECODE(P.CLI_CODIGO_FIM, NULL, P.CLI_CODIGO, P.CLI_CODIGO_FIM)
          INTO n_cli_codigo, n_cli_codigo_fim
          FROM SIAOS.PROPOSTA P
         WHERE P.PRP_CODIGO = n_proposta;
      
        IF n_cli_codigo_fim IS NOT NULL THEN
        
          SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
            INTO v_cli_nome
            FROM SIAOS.CLIENTE C
           WHERE C.CODIGO = n_cli_codigo_fim;
        
        ELSE
        
          n_cli_codigo := 6293;
        
          SELECT C.CTE_NOME
            INTO v_cli_nome
            FROM SIAOS.CLIENTE_TEMP C
           WHERE C.PRP_CODIGO = n_proposta;
        
        END IF;
      
        SELECT NVL(COUNT(*), 0) QTD
          INTO n_tem_sac
          FROM DIATNET.ACAO_SAC T
         WHERE T.PRP_CODIGO = n_proposta;
        IF n_tem_sac = 0 THEN
          IF n_sac IS NULL THEN
            DIATNET.PCK_DIATNET.SP_SAC_OS(1,
                                          NULL,
                                          n_usu_chapa,
                                          TO_CHAR(dt_set_reprog_db, 'DD/MM/YYYY'),
                                          NULL,
                                          'N',
                                          n_tipo_sac,
                                          n_forma_cont,
                                          n_cli_codigo,
                                          v_cli_nome,
                                          NULL,
                                          'PROPOSTA - SET',
                                          7,
                                          18,
                                          NULL,
                                          0,
                                          0,
                                          0,
                                          NULL,
                                          NULL,
                                          n_sac);
          END IF;
          DIATNET.PCK_DIATNET.SP_ACAO_SAC(9,
                                          NULL,
                                          n_sac,
                                          2,
                                          n_usu_chapa,
                                          TO_CHAR(SYSDATE, 'DD/MM/YYYY'),
                                          TO_CHAR(SYSDATE, 'DD/MM/YYYY'),
                                          NULL,
                                          0,
                                          n_usu_chapa,
                                          n_proposta);
        END IF;
      /*
      TODO: owner="juliano" category="Finish" priority="3 - Low" created="19/08/2024" closed="07/11/2024"
      text="Retirada de email"
      */
      
      ELSE
      
        SELECT P.CLI_CODIGO
          INTO n_cli_codigo
          FROM SIAOS.PROPOSTA P
         WHERE P.PRP_CODIGO = n_proposta;
      
        IF n_cli_codigo IS NOT NULL THEN
        
          SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
            INTO v_cli_nome
            FROM SIAOS.CLIENTE C
           WHERE C.CODIGO = n_cli_codigo;
        
        ELSE
        
          SELECT C.CTE_NOME
            INTO v_cli_nome
            FROM SIAOS.CLIENTE_TEMP C
           WHERE C.PRP_CODIGO = n_proposta;
        
        END IF;
        
      END IF;
      /*
      TODO: owner="juliano" category="Review" priority="3 - Low" created="19/08/2024" closed="07/11/2024"
      text="Retirada de email"
      */
      
      SP_VENDEDOR_PROPOSTA(n_proposta, v_usu_chapa_ven, v_usu_nome_ven, v_usu_email_ven, v_end_email_vend);
      /*
      BEGIN
      
        SELECT U.USU_NOME, 
               U.USU_EMAIL
          INTO v_usu_nome_ven, 
               v_usu_email_ven
          FROM VENDEDOR_PROP P
         INNER JOIN ARSALESP A ON P.SALESP_KEY = A.SALESP_KEY
         INNER JOIN USUARIO U ON U.USU_CHAPA = A.USU_CHAPA
         WHERE P.PRP_CODIGO = n_proposta
           AND P.VPR_CODIGO = 1
           AND U.USU_EMAIL IS NOT NULL;
           
        v_end_email_vend := v_usu_nome_ven || '<' ||  v_usu_email_ven || '>';
        
      EXCEPTION WHEN OTHERS THEN
        v_end_email_vend := NULL;
         
        BEGIN
          
           SELECT A.SALESPERSON
             INTO v_usu_nome_ven
             FROM VENDEDOR_PROP P
            INNER JOIN ARSALESP A ON P.SALESP_KEY = A.SALESP_KEY
            WHERE P.PRP_CODIGO = n_proposta
              AND P.VPR_CODIGO = 1;
          
        EXCEPTION WHEN OTHERS THEN
           v_usu_nome_ven := 'Não Localizado';
        END;
      END;
      */
      
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                        v_usu_nome_exe || '<' || v_usu_email_exe || '>;',
                                        v_usu_nome_sol || '<' || v_usu_email_sol || '>' || v_usu_nome_ven,
                                        NULL,
                                        'SET ' || n_proposta || '-' || n_rev || ' - ' || v_cli_nome,
                                        'SET de ' || v_pas_nome || ' para encaminhado para execução:',
                                        REPLACE(c_pre_mensagem, CHR(10), '<br>') ||
                                        '<BR /><BR />Motivo da Solicitação:<BR />' ||
                                        REPLACE(clb_set_obs2, CHR(10), '<br>'),
                                        'Proposta:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                        'Cliente: ' || v_cli_nome ||
                                        '<br />Solicitante: ' || v_usu_nome_sol ||
                                        '<br />Moderador: ' || v_usu_nome ||
                                        '<br />Executante: ' || v_usu_nome_exe ||
                                        '<br />Vendedor: ' || v_usu_nome_ven ||
                                        '<br />Data Retorno: ' || TO_CHAR(dt_set_reprog, 'DD/MM/YYYY'),
                                        1, n_eml_numero);
      
    END IF;
  
  END SP_MODERA_SET;

  ----------------------------------------------------------------------
  -- MODERA SET
  ----------------------------------------------------------------------

  PROCEDURE SP_REPROGRAMA_SET(n_proposta    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              n_pas_codigo  IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                              dt_set_reprog IN SIAOS.PROP_SET.SET_DT_REPROG%TYPE,
                              c_pre_msg_rep IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                              n_erro        OUT NUMBER) IS
  
    c_pre_mensagem   SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE;
    n_usu_chapa      SIAOS.USUARIO.USU_CHAPA%TYPE;
    vc_in_chapa      VARCHAR2(200);
    n_set_chapa_sol  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_set_chapa_mod  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_usu_chapa_ven  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_set_chapa_exe  SIAOS.USUARIO.USU_CHAPA%TYPE;
    v_usu_nome       SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_mod   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_ven   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_ven  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_end_email_vend VARCHAR2(2000);
    v_usu_email      SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_pas_nome       SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    n_eml_numero     SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    dt_set_retorno   SIAOS.PROP_SET.SET_DT_RETORNO%TYPE;
    dt_set_reprog_db SIAOS.PROP_SET.SET_DT_REPROG%TYPE;
    v_usu_nome_exe   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_exe  SIAOS.USUARIO.USU_EMAIL%TYPE;
    n_cli_codigo     SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    v_cli_nome       SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
    n_rev            INTEGER;
    n_set            INTEGER;
    sql_query        VARCHAR2(4000);
    
   TYPE UsuarioRecord IS RECORD (
      usu_nome  SIAOS.USUARIO.USU_NOME%TYPE,
      usu_email SIAOS.USUARIO.USU_EMAIL%TYPE
   );
    TYPE UsuarioTable IS TABLE OF UsuarioRecord;
       usuario_data UsuarioTable;
  
  BEGIN
  
    -- NOME DA AREA (MOSTRAR NO E-MAIL E FOLLOW UP
    SELECT PAS_NOME
      INTO v_pas_nome
      FROM SIAOS.PROP_AREA_SET
     WHERE PAS_CODIGO = n_pas_codigo;
  
    SELECT P.PRP_SET, P.PRP_REVISAO, P.CLI_CODIGO
      INTO n_set, n_rev, n_cli_codigo
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    -- BUSCA DADOS GRAVADOS NA SET
    SELECT TRUNC(SET_DT_RETORNO), TRUNC(SET_DT_REPROG), USU_CHAPA_SOL, USU_CHAPA_MOD, USU_CHAPA_EXE
      INTO dt_set_retorno, dt_set_reprog_db, n_set_chapa_sol, n_set_chapa_mod, n_set_chapa_exe
      FROM SIAOS.PROP_SET PS
     WHERE PS.PRP_CODIGO = n_proposta
       AND PS.PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET = n_set;
  
    -- BUSCA DADOS DO USUARIO
    SELECT U.USU_CHAPA, U.USU_NOME, U.USU_EMAIL
      INTO n_usu_chapa, v_usu_nome, v_usu_email
      FROM SIAOS.USUARIO U
     WHERE UPPER(U.USU_LOGINWEB) = USER;
    
    -- BUSCA DADOS DO USUARIO
    SELECT U.USU_NOME
      INTO v_usu_nome_mod
      FROM SIAOS.USUARIO U
     WHERE U.USU_CHAPA = n_set_chapa_mod; 
     
    -- BUSCA DADOS DO USUARIO
    SELECT U.USU_NOME
      INTO v_usu_nome_exe
      FROM SIAOS.USUARIO U
     WHERE U.USU_CHAPA = n_set_chapa_exe; 
  
    -- VERIFICA SE DATA DE ENTREGA FOI REPROGRAMADA
    IF TRUNC(dt_set_reprog) != TRUNC(dt_set_reprog_db) THEN
      c_pre_mensagem := c_pre_mensagem || '<STRONG>REPROGRAMAÇÃO NA DATA DE ENTREGA.</STRONG><BR>';
      IF dt_set_reprog_db IS NULL THEN
        c_pre_mensagem := c_pre_mensagem || 'DE  : A DEFINIR<BR>';
      ELSE
        c_pre_mensagem := c_pre_mensagem || 'DE  : ' || TO_CHAR(dt_set_reprog_db, 'DD/MM/YYYY') || '<BR>';
      END IF;
      c_pre_mensagem := c_pre_mensagem || 'PARA: ' || TO_CHAR(dt_set_reprog, 'DD/MM/YYYY') || '<BR>';
      c_pre_mensagem := c_pre_mensagem || 'MOTIVO:<BR>' || c_pre_msg_rep || '<BR>';
    END IF;
  
    -- ATUALIZA DADOS DO SET
    UPDATE SIAOS.PROP_SET PS
       SET PS.SET_DT_REPROG = dt_set_reprog
     WHERE PS.PRP_CODIGO = n_proposta
       AND PS.PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET = n_set;
  
    IF SQL%NOTFOUND THEN
      n_erro := 1;
    END IF;
  
    IF n_erro IS NULL THEN
    
      SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1, NULL,  n_proposta, 11, c_pre_mensagem, NULL, n_erro);
    
      IF n_cli_codigo IS NOT NULL THEN
      
        SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
          INTO v_cli_nome
          FROM SIAOS.CLIENTE C
         WHERE C.CODIGO = n_cli_codigo;
      
      ELSE
      
        SELECT C.CTE_NOME
          INTO v_cli_nome
          FROM SIAOS.CLIENTE_TEMP C
         WHERE C.PRP_CODIGO = n_proposta;
      
      END IF;
    
    END IF;
    
    IF n_usu_chapa != n_set_chapa_mod THEN
       vc_in_chapa := vc_in_chapa || n_set_chapa_mod||',';
    END IF;
    
    IF n_usu_chapa != n_set_chapa_exe AND n_set_chapa_mod != n_set_chapa_exe THEN
       vc_in_chapa := vc_in_chapa || n_set_chapa_exe||',';
    END IF;    
    
    SP_VENDEDOR_PROPOSTA(n_proposta, n_usu_chapa_ven, v_usu_nome_ven, v_usu_email_ven, v_end_email_vend);
    
    IF n_usu_chapa_ven IS NOT NULL THEN
      vc_in_chapa := vc_in_chapa || n_usu_chapa_ven||',';
    END IF;
    
    vc_in_chapa := vc_in_chapa || n_set_chapa_sol; 
     
    sql_query := 'SELECT DISTINCT U.USU_NOME, U.USU_EMAIL ' ||
                   'FROM SIAOS.USUARIO U ' ||
                  'WHERE U.USU_CHAPA IN (' || vc_in_chapa || ')';
    
    -- Executa a consulta dinâmica e coleta os resultados na coleção
   EXECUTE IMMEDIATE sql_query BULK COLLECT INTO usuario_data;

   -- Itera sobre a coleção para acessar os resultados
   FOR i IN 1 .. usuario_data.COUNT LOOP
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                        usuario_data(i).USU_NOME || '<' || usuario_data(i).USU_EMAIL || '>',
                                        NULL, NULL,
                                        'SET ' || n_proposta || '-' || n_rev || ' - ' || v_cli_nome,
                                        'SET ' || n_proposta || '-' || n_rev || ' - ' || v_cli_nome,
                                        'SET de ' || v_pas_nome || ' para encaminhado para execução:' || CHR(10) || '<br>' || c_pre_mensagem,
                                        'Prop.:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                        'Cliente: ' || v_cli_nome ||
                                          '<br />Moderador: ' || v_usu_nome_mod ||
                                          '<br />Executante: ' || v_usu_nome_exe ||
                                          '<br />Vendedor: ' || v_usu_nome_ven ||
                                          '<br />Data Retorno: ' || TO_CHAR(dt_set_reprog, 'DD/MM/YYYY'),
                                        1, n_eml_numero);                       
     END LOOP;     

   
  END SP_REPROGRAMA_SET;

  ----------------------------------------------------------------------
  -- GRAVA RECADO  -----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_GRAVA_RECADO(n_opcao          IN INTEGER,
                            n_pre_codigo     IN SIAOS.PROP_RECADO.PRE_CODIGO%TYPE,
                            n_proposta       IN SIAOS.PROP_RECADO.PRP_CODIGO%TYPE,
                            n_tre_codigo     IN SIAOS.PROP_RECADO.TRE_CODIGO%TYPE,
                            clb_pre_mensagem IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                            v_pre_alarm      IN VARCHAR2,
                            n_usu_chapa      IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                            n_erro           OUT NUMBER) IS
  
    --  n_revisao    SIAOS.PROPOSTA.PRP_REVISAO%TYPE;
    --  n_set        SIAOS.PROPOSTA.PRP_SET%TYPE;
    --  dt_pre_alarm DATE;
  
  BEGIN
  
    SIAOS.PCK_SMART_SALES3.SP_GRAVA_FOLLOWUP(n_opcao,
                                             n_pre_codigo,
                                             n_proposta,
                                             n_tre_codigo,
                                             NULL,
                                             clb_pre_mensagem,
                                             v_pre_alarm,
                                             NULL,
                                             NULL,
                                             n_erro);
    /*
    IF v_pre_alarm IS NOT NULL THEN
      dt_pre_alarm := TO_DATE(v_pre_alarm, 'DD/MM/YYYY HH24:MI');
    END IF;
    
    SELECT PRP_REVISAO, PRP_SET
      INTO n_revisao, n_set
      FROM SIAOS.PROPOSTA
     WHERE PROPOSTA.PRP_CODIGO = n_proposta;
    
    IF n_opcao = 1 THEN
    
      INSERT INTO SIAOS.PROP_RECADO
        (PRP_CODIGO,
         TRE_CODIGO,
         USU_CHAPA,
         PRE_MENSAGEM,
         PRE_DT_ALARM,
         PRP_REVISAO,
         PRP_SET)
      VALUES
        (n_proposta,
         n_tre_codigo,
         n_usu_chapa,
         clb_pre_mensagem,
         dt_pre_alarm,
         n_revisao,
         n_set);
    
    ELSIF n_opcao = 2 THEN
    
      UPDATE SIAOS.PROP_RECADO
         SET PRE_MENSAGEM = clb_pre_mensagem,
             PRE_DATA     = SYSDATE,
             PRE_DT_ALARM = dt_pre_alarm,
             PRP_REVISAO  = n_revisao,
             PRP_SET      = n_set
       WHERE PRE_CODIGO = n_pre_codigo
         AND USU_CHAPA = n_usu_chapa;
    
      IF SQL%NOTFOUND THEN
        n_erro := 1;
      END IF;
    
    ELSIF n_opcao = 3 THEN
    
      UPDATE SIAOS.PROP_RECADO
         SET PRE_DT_BAIXA = SYSDATE
       WHERE PRE_CODIGO = n_pre_codigo;
    
      FOR reg IN (SELECT PNU_NUMERO, PEN_NUMERO
                    FROM PROP_RECADO
                   WHERE PRE_CODIGO = n_pre_codigo
                     AND PNU_NUMERO IS NOT NULL)
      LOOP
          SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(reg.PNU_NUMERO, reg.PEN_NUMERO);
      END LOOP;
    
    END IF;
    
    COMMIT;
    */
  END SP_GRAVA_RECADO;

  ----------------------------------------------------------------------
  -- GRAVA RECADO  -----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_GRAVA_FOLLOWUP(n_opcao          IN INTEGER,
                              n_pre_codigo     IN SIAOS.PROP_RECADO.PRE_CODIGO%TYPE,
                              n_pre_filtro     IN SIAOS.PROP_RECADO.PRE_FILTRO%TYPE,
                              n_tre_codigo     IN SIAOS.PROP_RECADO.TRE_CODIGO%TYPE,
                              n_mot_codigo     IN SIAOS.PROP_RECADO.MOT_CODIGO%TYPE,
                              clb_pre_mensagem IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                              v_pre_alarm      IN VARCHAR2,
                              n_pnu_numero     IN SIAOS.PROP_RECADO.PNU_NUMERO%TYPE,
                              n_pen_numero     IN SIAOS.PROP_RECADO.PEN_NUMERO%TYPE,
                              n_erro           OUT NUMBER) IS
  
    n_pre_sistema SIAOS.PROP_RECADO.PRE_SISTEMA%TYPE;
    n_proposta    SIAOS.PROPOSTA.PRP_CODIGO%TYPE;
    n_revisao     SIAOS.PROPOSTA.PRP_REVISAO%TYPE;
    n_set         SIAOS.PROPOSTA.PRP_SET%TYPE;
    dt_pre_alarm  DATE;
    n_usu_chapa   SIAOS.USUARIO.USU_CHAPA%TYPE;
  
  BEGIN
    BEGIN
      SELECT USU_CHAPA
        INTO n_usu_chapa
        FROM SIAOS.USUARIO
       WHERE UPPER(USUARIO.USU_LOGINWEB) = USER;
    EXCEPTION
      WHEN OTHERS THEN
        n_usu_chapa := 2623;
    END;
  
    SELECT DECODE(TRE_SISTEMA, NULL, 121, TRE_SISTEMA)
      INTO n_pre_sistema
      FROM TIPO_RECADO TR
     WHERE TR.TRE_CODIGO = n_tre_codigo;
  
    IF n_pre_sistema = 101 THEN
      n_proposta := n_pre_filtro;
    ELSIF n_pre_sistema = 121 THEN
      n_proposta := n_pre_filtro;
      IF n_tre_codigo IN (5, 6, 14) AND n_opcao = 1 THEN
        FOR cur_pend IN (SELECT PRE_CODIGO,
                                PNU_NUMERO,
                                PEN_NUMERO,
                                TRE_CODIGO
                           FROM SIAOS.PROP_RECADO
                          WHERE PROP_RECADO.PRE_CODIGO IN
                                (SELECT PRE_CODIGO
                                   FROM SIAOS.PROP_RECADO
                                  WHERE PROP_RECADO.PRP_CODIGO = n_proposta
                                    AND PROP_RECADO.TRE_CODIGO IN (5, 6, 14))) LOOP
        
          IF cur_pend.PNU_NUMERO IS NOT NULL THEN
            SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(cur_pend.PNU_NUMERO,
                                                cur_pend.PEN_NUMERO);
          END IF;
          IF cur_pend.TRE_CODIGO = 14 THEN
            DELETE FROM SIAOS.PROP_RECADO
             WHERE PRE_CODIGO = cur_pend.PRE_CODIGO
               AND PRP_CODIGO = n_proposta;
          ELSE
            UPDATE SIAOS.PROP_RECADO
               SET PRE_DT_BAIXA = SYSDATE
             WHERE PRE_CODIGO = cur_pend.PRE_CODIGO
               AND PRP_CODIGO = n_proposta;
          END IF;
        END LOOP;
      END IF;
    ELSIF n_pre_sistema = 125 THEN
      n_proposta := n_pre_filtro;
    ELSIF n_pre_sistema = 243 THEN
      n_proposta := n_pre_filtro;
    ELSIF n_pre_sistema = 3 THEN
      BEGIN
        SELECT PRP_CODIGO
          INTO n_proposta
          FROM PROPOSTA
         WHERE ORDER_NO = n_pre_filtro;
      EXCEPTION
        WHEN OTHERS THEN
          NULL;
      END;
    END IF;
  
    IF v_pre_alarm IS NOT NULL THEN
      dt_pre_alarm := TO_DATE(v_pre_alarm, 'DD/MM/YYYY HH24:MI');
    END IF;
  
    IF n_proposta IS NOT NULL THEN
      BEGIN
        SELECT PRP_REVISAO, PRP_SET
          INTO n_revisao, n_set
          FROM SIAOS.PROPOSTA
         WHERE PROPOSTA.PRP_CODIGO = n_proposta;
      EXCEPTION
        WHEN OTHERS THEN
          n_revisao  := NULL;
          n_set      := NULL;
          n_proposta := NULL;
      END;
    END IF;
  
    IF n_opcao = 1 THEN
    
      INSERT INTO SIAOS.PROP_RECADO
        (PRP_CODIGO,
         TRE_CODIGO,
         MOT_CODIGO,
         USU_CHAPA,
         PRE_MENSAGEM,
         PRE_DT_ALARM,
         PRP_REVISAO,
         PRP_SET,
         PRE_SISTEMA,
         PRE_FILTRO,
         PNU_NUMERO,
         PEN_NUMERO)
      VALUES
        (n_proposta,
         n_tre_codigo,
         n_mot_codigo,
         n_usu_chapa,
         clb_pre_mensagem,
         dt_pre_alarm,
         n_revisao,
         n_set,
         n_pre_sistema,
         n_pre_filtro,
         n_pnu_numero,
         n_pen_numero);
    
    ELSIF n_opcao = 2 THEN
    
      UPDATE SIAOS.PROP_RECADO
         SET PRE_MENSAGEM = clb_pre_mensagem,
             PRE_DATA     = SYSDATE,
             PRE_DT_ALARM = dt_pre_alarm,
             PRP_REVISAO  = n_revisao,
             PRP_SET      = n_set,
             MOT_CODIGO   = n_mot_codigo,
             PNU_NUMERO   = n_pnu_numero,
             PEN_NUMERO   = n_pen_numero
       WHERE PRE_CODIGO = n_pre_codigo;
      --AND USU_CHAPA    = n_usu_chapa;
    
      IF SQL%NOTFOUND THEN
        n_erro := 1;
      END IF;
    
    ELSIF n_opcao = 3 THEN
    
      UPDATE SIAOS.PROP_RECADO
         SET PRE_DT_BAIXA = SYSDATE
       WHERE PRE_CODIGO = n_pre_codigo;
    
      FOR reg IN (SELECT PNU_NUMERO, PEN_NUMERO
                    FROM PROP_RECADO
                   WHERE PRE_CODIGO = n_pre_codigo
                     AND PNU_NUMERO IS NOT NULL) LOOP
        SIAOS.PCK_PENDENCIA.SP_UP_BAIXA_PEN(reg.PNU_NUMERO, reg.PEN_NUMERO);
      END LOOP;
    
    END IF;
  
    COMMIT;
  
  END SP_GRAVA_FOLLOWUP;

  ----------------------------------------------------------------------
  -- GRAVA RECADO  -----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_GRAVA_RECADO(n_opcao          IN INTEGER,
                            n_pre_codigo     IN SIAOS.PROP_RECADO.PRE_CODIGO%TYPE,
                            n_proposta       IN SIAOS.PROP_RECADO.PRP_CODIGO%TYPE,
                            n_tre_codigo     IN SIAOS.PROP_RECADO.TRE_CODIGO%TYPE,
                            clb_pre_mensagem IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                            v_pre_alarm      IN VARCHAR2,
                            n_erro           OUT NUMBER) IS
  
    --n_usu_chapa  SIAOS.USUARIO.USU_CHAPA%TYPE;
  
  BEGIN
  
    SIAOS.PCK_SMART_SALES3.SP_GRAVA_FOLLOWUP(n_opcao,
                                             n_pre_codigo,
                                             n_proposta,
                                             n_tre_codigo,
                                             NULL,
                                             clb_pre_mensagem,
                                             v_pre_alarm,
                                             NULL,
                                             NULL,
                                             n_erro);
    /*
    SELECT USU_CHAPA
      INTO n_usu_chapa
      FROM SIAOS.USUARIO
     WHERE UPPER(USUARIO.USU_LOGINWEB) = USER;
    
    SP_GRAVA_RECADO(n_opcao, n_pre_codigo, n_proposta, n_tre_codigo, clb_pre_mensagem, v_pre_alarm, n_usu_chapa, n_erro);
    */
  END SP_GRAVA_RECADO;
  
  ----------------------------------------------------------------------
  -- EXECUTA SET    -----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_EXECUTA_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_usu_chapa  IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                           n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                           cl_notas     IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                           n_env_email  IN NUMBER,
                           n_erro       OUT NUMBER) IS
 
  
    n_usu_chapa_exe  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_usu_chapa_mod  SIAOS.USUARIO.USU_CHAPA%TYPE;
    c_pre_mensagem   SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE;
    v_usu_nome_elab  SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_apr   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_apr  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_exe   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_exe  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_sol   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_mod   SIAOS.USUARIO.USU_NOME%TYPE;
    v_pas_nome       SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    dt_set_dt_reprog SIAOS.PROP_SET.SET_DT_REPROG%TYPE;
    clb_set_obs      SIAOS.PROP_SET.SET_OBS%TYPE;
    n_eml_numero     SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    n_rev            INTEGER;
    n_set            INTEGER;
    n_cli_codigo     SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    v_cli_nome       SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
    --n_ipr_preco      NUMBER;
    
  
  BEGIN
    
    n_usu_chapa_exe := SIAOS.PCK_DQANET.SF_USU_CHAPA_USER;
  
    SELECT P.PRP_SET, P.PRP_REVISAO, P.CLI_CODIGO
      INTO n_set, n_rev, n_cli_codigo
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    IF n_cli_codigo IS NOT NULL THEN
    
      SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
        INTO v_cli_nome
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cli_codigo;
    
    ELSE
    
      SELECT C.CTE_NOME
        INTO v_cli_nome
        FROM SIAOS.CLIENTE_TEMP C
       WHERE C.PRP_CODIGO = n_proposta;
    
    END IF;
  
    IF v_cli_nome IS NULL THEN
      v_cli_nome := '----';
    END IF;
    /*
    SELECT PS.SET_OBS
      INTO clb_set_obs
      FROM SIAOS.PROP_SET PS
     WHERE PRP_CODIGO = n_proposta
       AND PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET = n_set;
    */  
    SELECT U.USU_NOME, U.USU_EMAIL
      INTO v_usu_nome_exe, v_usu_email_exe
      FROM SIAOS.USUARIO U
     WHERE U.USU_CHAPA = n_usu_chapa_exe;
  
    IF cl_notas IS NOT NULL THEN
      clb_set_obs := '<font size="2">';
      clb_set_obs := clb_set_obs || '<hr />';
      clb_set_obs := clb_set_obs || '<strong>NOTAS DO EXECUTANTE</strong></br>';
      clb_set_obs := clb_set_obs || '<strong>' || v_usu_nome_exe || ' ' ||
                      TO_CHAR(SYSDATE, 'DD/MM/YYYY HH24:MI:SS') || '</strong></br>';
      clb_set_obs := clb_set_obs || '</font>';
      clb_set_obs := clb_set_obs || '</br>';
      clb_set_obs := clb_set_obs || cl_notas || '</br>';
    END IF;
  
    UPDATE SIAOS.PROP_SET PS
       SET PS.USU_CHAPA_EXE = n_usu_chapa_exe, 
           PS.SET_DATA_EXEC = SYSDATE,
           PS.USU_CHAPA_APR = n_usu_chapa,
           PS.SET_OBS = clb_set_obs || '<br><hr><br><br>' || PS.SET_OBS
     WHERE PRP_CODIGO = n_proposta
       AND PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET = n_set;
  
    IF SQL%NOTFOUND THEN
      n_erro := 1;
    END IF;
  
    COMMIT;
    /*
    TODO: owner="juliano" category="Review" priority="3 - Low" created="19/08/2024" closed="07/11/2024"
    text="Retirada de email"
    */
    
    IF n_erro IS NULL THEN    
      
      SELECT U.USU_NOME, U.USU_EMAIL
        INTO v_usu_nome_apr, v_usu_email_apr
        FROM SIAOS.USUARIO U
       WHERE U.USU_CHAPA = n_usu_chapa;
    
      SELECT PAS.PAS_NOME
        INTO v_pas_nome
        FROM SIAOS.PROP_AREA_SET PAS
       WHERE PAS.PAS_CODIGO = n_pas_codigo;
    
      c_pre_mensagem := 'O SET da Área: ' || v_pas_nome ||
                        ' foi enviado para aprovação de '||v_usu_nome_apr||'!<br><br>Notas do Elaborador:<BR>' ||
                        cl_notas;
      
    
      SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1, NULL, n_proposta, 12, c_pre_mensagem, NULL, n_erro);
    
      BEGIN
        SELECT U.USU_NOME,
               U2.USU_NOME      USU_NOME_EXE,
               E.USU_NOME       USU_NOME_ELAB,
               U3.USU_NOME      USU_NOME_MOD,
               U3.USU_CHAPA,
               PS.SET_DT_REPROG,
               PS.SET_OBS
          INTO v_usu_nome_sol,
               v_usu_nome_exe,
               v_usu_nome_elab,
               v_usu_nome_mod,
               n_usu_chapa_mod,
               dt_set_dt_reprog,
               clb_set_obs
          FROM SIAOS.PROPOSTA P
         INNER JOIN SIAOS.PROP_SET PS ON PS.PRP_CODIGO = P.PRP_CODIGO
         INNER JOIN SIAOS.USUARIO U   ON PS.USU_CHAPA_SOL = U.USU_CHAPA
         INNER JOIN SIAOS.USUARIO U2  ON PS.USU_CHAPA_EXE = U2.USU_CHAPA
         INNER JOIN SIAOS.USUARIO U3  ON PS.USU_CHAPA_MOD = U3.USU_CHAPA
         INNER JOIN SIAOS.USUARIO E   ON P.USU_CHAPA = E.USU_CHAPA
         WHERE PS.PRP_CODIGO = n_proposta
           AND PS.PAS_CODIGO = n_pas_codigo
           AND PS.PRP_SET = n_set;
      EXCEPTION WHEN OTHERS THEN
          NULL;
      END;
      
      IF n_env_email = 1 THEN
    
        FOR c_mod IN (SELECT DISTINCT U.USU_NOME, U.USU_EMAIL
                        FROM SIAOS.USUARIO U
                       WHERE U.USU_CHAPA = n_usu_chapa) 
        LOOP
          SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome_exe || '<' || v_usu_email_exe || '>',
                                            c_mod.USU_NOME || '<' || c_mod.USU_EMAIL || '>',
                                            NULL, NULL,
                                            'SET ' || n_proposta || '-' ||  n_rev || ' - ' || v_cli_nome || ' Está aguardando aprovação!',
                                            'SET de ' || v_pas_nome || ' está aguardando aprovação:',
                                            REPLACE(c_pre_mensagem, CHR(10), '<br>') || '<br /><br />Motivo da Solicitação:<br />' ||
                                            REPLACE(clb_set_obs, CHR(10), '<br>'),
                                            'Proposta:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                            'Cliente: ' || v_cli_nome || 
                                            '<br />Solicitante: ' || v_usu_nome_sol || '<br />Moderador: ' || v_usu_nome_mod ||
                                            '<br />Executante: ' || v_usu_nome_exe || '<br />Aprovador: ' || v_usu_nome_apr ||
                                            '<br />Data Retorno: ' || TO_CHAR(dt_set_dt_reprog, 'DD/MM/YYYY') ||
                                            '<br />Data Conclusão: ' || TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI'), 1, n_eml_numero);
        END LOOP;
    
      END IF;
    
    END IF;
    
    COMMIT;
    
  END SP_EXECUTA_SET;
  

  
  ----------------------------------------------------------------------
  -- REPROVA SET    ----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_REPROVA_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                           cl_notas     IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                           n_env_email  IN NUMBER,
                           n_erro       OUT NUMBER) IS
 
  
    n_usu_chapa_exe  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_usu_chapa_mod  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_usu_chapa_sol  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_usu_chapa      SIAOS.USUARIO.USU_CHAPA%TYPE;
    c_pre_mensagem   SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE;
    --v_usu_nome_elab  SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_apr   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_apr  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_exe   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_exe  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_sol   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_mod   SIAOS.USUARIO.USU_NOME%TYPE;
    v_pas_nome       SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    dt_set_dt_reprog SIAOS.PROP_SET.SET_DT_REPROG%TYPE;
    clb_set_obs      SIAOS.PROP_SET.SET_OBS%TYPE;
    n_eml_numero     SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    n_rev            INTEGER;
    n_set            INTEGER;
    n_cli_codigo     SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    v_cli_nome       SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
    --n_ipr_preco      NUMBER;
    
  
  BEGIN
    
    n_usu_chapa := SIAOS.PCK_DQANET.SF_USU_CHAPA_USER;
  
    SELECT P.PRP_SET, P.PRP_REVISAO, P.CLI_CODIGO
      INTO n_set, n_rev, n_cli_codigo
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    IF n_cli_codigo IS NOT NULL THEN
    
      SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
        INTO v_cli_nome
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cli_codigo;
    
    ELSE
    
      SELECT C.CTE_NOME
        INTO v_cli_nome
        FROM SIAOS.CLIENTE_TEMP C
       WHERE C.PRP_CODIGO = n_proposta;
    
    END IF;
  
    IF v_cli_nome IS NULL THEN
      v_cli_nome := '----';
    END IF;
  
    SELECT PS.USU_CHAPA_EXE,
           PS.USU_CHAPA_SOL
      INTO n_usu_chapa_exe,
           n_usu_chapa_sol
      FROM SIAOS.PROP_SET PS
     WHERE PRP_CODIGO = n_proposta
       AND PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET = n_set;
      
    SELECT U.USU_NOME, U.USU_EMAIL
      INTO v_usu_nome_exe, v_usu_email_exe
      FROM SIAOS.USUARIO U
     WHERE U.USU_CHAPA = n_usu_chapa_exe;
  
    IF cl_notas IS NOT NULL THEN
      clb_set_obs := '<font size="2">';
      clb_set_obs := clb_set_obs || '<hr />';
      clb_set_obs := clb_set_obs ||
                      '<strong>NOTAS DO EXECUTANTE</strong></br>';
      clb_set_obs := clb_set_obs || '<strong>' || v_usu_nome_exe || ' ' ||
                      TO_CHAR(SYSDATE, 'DD/MM/YYYY HH24:MI:SS') ||
                      '</strong></br>';
      clb_set_obs := clb_set_obs || '</font>';
      clb_set_obs := clb_set_obs || '</br>';
      clb_set_obs := clb_set_obs || cl_notas || '</br>';
    END IF;
  
    UPDATE SIAOS.PROP_SET PS
       SET PS.SET_DATA_EXEC = NULL,
           PS.USU_CHAPA_APR = NULL,
           PS.SET_OBS = clb_set_obs || '<br><hr><br><br>' ||
                        PS.SET_OBS
     WHERE PRP_CODIGO = n_proposta
       AND PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET = n_set;
  
    IF SQL%NOTFOUND THEN
      n_erro := 1;
    END IF;
  
    COMMIT;
  
    IF n_erro IS NULL THEN    
      
      SELECT U.USU_NOME, U.USU_EMAIL
        INTO v_usu_nome_apr, v_usu_email_apr
        FROM SIAOS.USUARIO U
       WHERE U.USU_CHAPA = n_usu_chapa;
    
      SELECT PAS.PAS_NOME
        INTO v_pas_nome
        FROM SIAOS.PROP_AREA_SET PAS
       WHERE PAS.PAS_CODIGO = n_pas_codigo;
    
      c_pre_mensagem := 'O SET da Área: ' || v_pas_nome ||
                        ' foi reprovado por '||v_usu_nome_apr||'!<br><br>Notas do Elaborador:<BR>' ||
                        cl_notas;
      
    
      SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1,
                                             NULL,
                                             n_proposta,
                                             12,
                                             c_pre_mensagem,
                                             NULL,
                                             n_erro);
    
      BEGIN
        SELECT U.USU_NOME,
               U.USU_CHAPA      USU_CHAPA_SOL,
               E.USU_NOME       USU_NOME_EXE,
               U3.USU_NOME      USU_NOME_MOD,
               U3.USU_CHAPA,
               PS.SET_DT_REPROG,
               PS.SET_OBS
          INTO v_usu_nome_sol,
               n_usu_chapa_sol,
               v_usu_nome_exe,
               v_usu_nome_mod,
               n_usu_chapa_mod,
               dt_set_dt_reprog,
               clb_set_obs
          FROM SIAOS.PROPOSTA P
         INNER JOIN SIAOS.PROP_SET PS ON PS.PRP_CODIGO = P.PRP_CODIGO
         INNER JOIN SIAOS.USUARIO U   ON PS.USU_CHAPA_SOL = U.USU_CHAPA
         INNER JOIN SIAOS.USUARIO U2  ON PS.USU_CHAPA_EXE = U2.USU_CHAPA
         INNER JOIN SIAOS.USUARIO U3  ON PS.USU_CHAPA_MOD = U3.USU_CHAPA
         INNER JOIN SIAOS.USUARIO E   ON P.USU_CHAPA = E.USU_CHAPA
         WHERE PS.PRP_CODIGO = n_proposta
           AND PS.PAS_CODIGO = n_pas_codigo
           AND PS.PRP_SET = n_set;
      EXCEPTION WHEN OTHERS THEN
          NULL;
      END;
      
      IF n_env_email = 1 THEN
    
        FOR c_mod IN (SELECT DISTINCT U.USU_NOME, U.USU_EMAIL
                        FROM SIAOS.USUARIO U
                       WHERE U.USU_CHAPA = n_usu_chapa_mod
                      UNION
                      SELECT DISTINCT U.USU_NOME, U.USU_EMAIL
                        FROM SIAOS.USUARIO U
                       WHERE U.USU_CHAPA = n_usu_chapa_sol) 
        LOOP
          SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome_exe || '<' || v_usu_email_exe || '>',
                                            c_mod.USU_NOME || '<' || c_mod.USU_EMAIL || '>',
                                            NULL, NULL,
                                            'SET ' || n_proposta || '-' ||  n_rev || ' - ' || v_cli_nome || ' foi reprovada!',
                                            'SET de ' || v_pas_nome || ' está aguardando correção:',
                                            REPLACE(c_pre_mensagem, CHR(10), '<br>') || '<br /><br />Motivo da Reprova:<br />' ||
                                            REPLACE(clb_set_obs, CHR(10), '<br>'),
                                            'Proposta:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                            'Cliente: ' || v_cli_nome || 
                                            '<br />Solicitante: ' || v_usu_nome_sol || '<br />Moderador: ' || v_usu_nome_mod ||
                                            '<br />Executante: ' || v_usu_nome_exe || '<br />Aprovador: ' || v_usu_nome_apr ||
                                            '<br />Data Retorno: ' || TO_CHAR(dt_set_dt_reprog, 'DD/MM/YYYY') ||
                                            '<br />Data Conclusão: ' || TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI'), 1, n_eml_numero);
        END LOOP;
    
      END IF;
    
    END IF;
  
    COMMIT;
    
  END SP_REPROVA_SET;  

  ----------------------------------------------------------------------
  -- APROVA SET    -----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_APROVA_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_usu_chapa  IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                          n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                          cl_notas     IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                          n_erro       OUT NUMBER) IS
 
  
    c_pre_mensagem   SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE;
    v_usu_nome_elab  SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_apr   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_apr  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_exe   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_sol   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_nome_mod   SIAOS.USUARIO.USU_NOME%TYPE;
    n_usu_chapa_apr  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_qtd_pend       INTEGER := 0;
    v_pas_nome       SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    dt_set_dt_reprog SIAOS.PROP_SET.SET_DT_REPROG%TYPE;
    dt_set_dt_exe    SIAOS.PROP_SET.SET_DATA_EXEC%TYPE;
    clb_set_obs      SIAOS.PROP_SET.SET_OBS%TYPE;
    n_eml_numero     SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    n_rev            INTEGER;
    n_set            INTEGER;
    n_cli_codigo     SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    v_cli_nome       SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
    n_tem_sac        INTEGER;
    n_ipr_preco      NUMBER;
  
  BEGIN
    
    n_usu_chapa_apr := SIAOS.PCK_DQANET.SF_USU_CHAPA_USER;
  
    SELECT P.PRP_SET, P.PRP_REVISAO, P.CLI_CODIGO
      INTO n_set, n_rev, n_cli_codigo
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    SELECT P.SET_DATA_EXEC
      INTO dt_set_dt_exe
      FROM PROP_SET P
     WHERE P.PRP_CODIGO = n_proposta
       AND P.PAS_CODIGO = n_pas_codigo
       AND P.PRP_SET = n_set;
  
    IF n_cli_codigo IS NOT NULL THEN
    
      SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
        INTO v_cli_nome
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cli_codigo;
    
    ELSE
    
      SELECT C.CTE_NOME
        INTO v_cli_nome
        FROM SIAOS.CLIENTE_TEMP C
       WHERE C.PRP_CODIGO = n_proposta;
    
    END IF;
  
    IF v_cli_nome IS NULL THEN
      v_cli_nome := '----';
    END IF;
    
    IF dt_set_dt_exe IS NULL THEN
      SP_EXECUTA_SET(n_proposta, n_usu_chapa_apr, n_pas_codigo, cl_notas, 0, n_erro);   
    END IF;
    
    IF n_erro IS NULL THEN
  
      UPDATE SIAOS.PROP_SET PS
         SET PS.USU_CHAPA_APR = n_usu_chapa_apr, 
             PS.SET_DATA_APR = SYSDATE
       WHERE PRP_CODIGO = n_proposta
         AND PAS_CODIGO = n_pas_codigo
         AND PS.PRP_SET = n_set;
    
      IF SQL%NOTFOUND THEN
        n_erro := 1;
      END IF;
    
      COMMIT;
      
    END IF;
  
    IF n_erro IS NULL THEN
    
      SELECT NVL(COUNT(*), 0) QTD
        INTO n_tem_sac
        FROM DIATNET.ACAO_SAC T
       WHERE T.PRP_CODIGO = n_proposta;
    
      IF n_tem_sac > 0 THEN
        UPDATE DIATNET.ACAO_SAC
           SET ACS_DATA_FINAL = SYSDATE
         WHERE PRP_CODIGO = n_proposta;
      END IF;
    
      SELECT NVL(COUNT(*), 0) QTD_PEND
        INTO n_qtd_pend
        FROM SIAOS.PROP_SET PS
       WHERE PS.PRP_CODIGO = n_proposta
         AND PS.SET_DATA_APR IS NULL
         AND PS.SET_DT_CANCEL IS NULL;
    
      SELECT PAS.PAS_NOME
        INTO v_pas_nome
        FROM SIAOS.PROP_AREA_SET PAS
       WHERE PAS.PAS_CODIGO = n_pas_codigo;
    
      IF n_qtd_pend = 0 THEN
      
        UPDATE SIAOS.PROPOSTA
           SET PROPOSTA.PST_CODIGO = 2
         WHERE PROPOSTA.PRP_CODIGO = n_proposta;
      
        SIAOS.PCK_SMART_SALES3.SP_SALVA_REVISAO(n_proposta, 1);
      
        c_pre_mensagem := 'O SET da Área: ' || v_pas_nome ||
                          ' foi aprovado e encerrado<br>Não há mais nenhum SET pendente!<br><br>Notas do Elaborador:<br>' ||
                          cl_notas;
      
      ELSE
      
        c_pre_mensagem := 'O SET da Área: ' || v_pas_nome ||
                          ' foi aprovado e encerrado<br>Existe(m) SET ainda pendente!<br><br>Notas do Elaborador:<BR>' ||
                          cl_notas;
      
      END IF;
    
      SELECT U.USU_NOME, U.USU_EMAIL
        INTO v_usu_nome_apr, v_usu_email_apr
        FROM SIAOS.USUARIO U
       WHERE U.USU_CHAPA = n_usu_chapa;
    
      SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1, NULL, n_proposta, 12, c_pre_mensagem, NULL, n_erro);
    
      BEGIN
        SELECT U.USU_NOME,
               U2.USU_NOME      USU_NOME_EXE,
               E.USU_NOME       USU_NOME_ELAB,
               U3.USU_NOME      USU_NOME_MOD,
               PS.SET_DT_REPROG,
               PS.SET_OBS
          INTO v_usu_nome_sol,
               v_usu_nome_exe,
               v_usu_nome_elab,
               v_usu_nome_mod,
               dt_set_dt_reprog,
               clb_set_obs
          FROM SIAOS.PROPOSTA P
         INNER JOIN SIAOS.PROP_SET PS
            ON PS.PRP_CODIGO = P.PRP_CODIGO
         INNER JOIN SIAOS.USUARIO U
            ON PS.USU_CHAPA_SOL = U.USU_CHAPA
         INNER JOIN SIAOS.USUARIO U2
            ON PS.USU_CHAPA_EXE = U2.USU_CHAPA
         INNER JOIN SIAOS.USUARIO U3
            ON PS.USU_CHAPA_MOD = U3.USU_CHAPA
         INNER JOIN SIAOS.USUARIO E
            ON P.USU_CHAPA = E.USU_CHAPA
         WHERE PS.PRP_CODIGO = n_proposta
           AND PS.PAS_CODIGO = n_pas_codigo
           AND PS.PRP_SET = n_set;
      EXCEPTION WHEN OTHERS THEN
          NULL;
      END;
    
      FOR c_mod IN (/*
                    SELECT DISTINCT U.USU_NOME, U.USU_EMAIL
                      FROM SIAOS.PROP_AREA_SET PA
                     INNER JOIN SMARNET.ACESSO_FUNC AF
                        ON AF.ACE_CODIGO = PA.ACE_CODIGO_MOD
                     INNER JOIN SIAOS.USUARIO U
                        ON U.USU_CHAPA = AF.USU_CHAPA
                     WHERE U.USU_LOGINWEB IS NOT NULL
                       AND PA.PAS_CODIGO = n_pas_codigo
                    UNION   
                    SELECT DISTINCT U.USU_NOME, U.USU_EMAIL
                      FROM SIAOS.PROP_AREA_SET PA
                     INNER JOIN SMARNET.ACESSO_FUNC AF
                        ON AF.ACE_CODIGO = PA.ACE_CODIGO_EXE
                     INNER JOIN SIAOS.USUARIO U
                        ON U.USU_CHAPA = AF.USU_CHAPA
                     WHERE U.USU_LOGINWEB IS NOT NULL
                       AND PA.PAS_CODIGO = n_pas_codigo
                       AND PA.ACE_CODIGO_EXE != n_usu_chapa
                    UNION
                    */
                    SELECT U.USU_NOME, U.USU_EMAIL
                      FROM SIAOS.PROPOSTA P
                     INNER JOIN SIAOS.PROP_SET PS
                        ON PS.PRP_CODIGO = P.PRP_CODIGO
                     INNER JOIN SIAOS.USUARIO U
                        ON PS.USU_CHAPA_SOL = U.USU_CHAPA
                     WHERE PS.PRP_CODIGO = n_proposta
                       AND PS.PAS_CODIGO = n_pas_codigo
                       AND PS.PRP_SET = n_set) 
      LOOP
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome_apr || '<' ||v_usu_email_apr || '>',
                                          c_mod.USU_NOME || '<' ||c_mod.USU_EMAIL || '>',
                                          NULL, NULL,
                                          'SET ' || n_proposta || '-' ||
                                          n_rev || ' - ' || v_cli_nome ||' Foi Concluido!',
                                          'SET de ' || v_pas_nome ||' foi aprovado e encerrado:',
                                          REPLACE(c_pre_mensagem,CHR(10),'<br>') ||
                                          '<BR /><BR />Motivo da Solicitação:<BR />' ||
                                          REPLACE(clb_set_obs,CHR(10),'<br>'),
                                          'Proposta:' || n_proposta || '-' ||n_rev || ' SET-' || n_set,
                                          'Cliente: ' || v_cli_nome ||
                                          '<br />Solicitante: ' ||v_usu_nome_sol ||
                                          '<br />Moderador: ' ||v_usu_nome_mod ||
                                          '<br />Executante: ' ||v_usu_nome_exe ||
                                          '<br />Aprovador: ' ||v_usu_nome_apr ||
                                          '<br />Data Retorno: ' ||
                                          TO_CHAR(dt_set_dt_reprog,'DD/MM/YYYY') ||
                                          '<br />Data Conclusão: ' ||
                                          TO_CHAR(SYSDATE,'DD/MM/YYYY HH:MI'),
                                          1,
                                          n_eml_numero);
      END LOOP;
    
    END IF;  
    
    BEGIN
      
      INSERT INTO PROP_ARQ_HIST
        (PRP_CODIGO, PRP_REVISAO, PRP_SET, PIM_TIPO, PAS_CODIGO)
      VALUES
        (n_proposta, n_rev, n_set, 'SET', n_pas_codigo);
      
    EXCEPTION
      WHEN OTHERS THEN
        NULL;
    END;
    
    FOR cur_item IN (SELECT IPR_ITEM_PROP
                       FROM SIAOS.ITEM_PROP_UNI
                      WHERE PRP_CODIGO = n_proposta) LOOP
    
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_proposta, cur_item.IPR_ITEM_PROP, n_ipr_preco);
    
    END LOOP;
  
    COMMIT;
  
  END SP_APROVA_SET;

  ----------------------------------------------------------------------
  -- CANCELA APROVA SET    ---------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_CANCELA_APROVACAO_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                     n_usu_chapa  IN SIAOS.USUARIO.USU_CHAPA%TYPE,
                                     n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                                     cl_notas     IN SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE,
                                     n_erro       OUT NUMBER) IS
  
    c_pre_mensagem   SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE;
    v_usu_nome_mod   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_mod  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_sol   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_sol  SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_exe   SIAOS.USUARIO.USU_NOME%TYPE;
    n_qtd_pend       INTEGER;
    v_pas_nome       SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    dt_set_dt_reprog SIAOS.PROP_SET.SET_DT_REPROG%TYPE;
    clb_set_obs      SIAOS.PROP_SET.SET_OBS%TYPE;
    n_eml_numero     SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    n_rev            INTEGER;
    n_set            INTEGER;
    n_cli_codigo     SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    v_cli_nome       SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
  
  BEGIN
  
    SELECT P.PRP_SET, P.PRP_REVISAO, P.CLI_CODIGO
      INTO n_set, n_rev, n_cli_codigo
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    IF n_cli_codigo IS NOT NULL THEN
    
      SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
        INTO v_cli_nome
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cli_codigo;
    
    ELSE
    
      SELECT C.CTE_NOME
        INTO v_cli_nome
        FROM SIAOS.CLIENTE_TEMP C
       WHERE C.PRP_CODIGO = n_proposta;
    
    END IF;
  
    SELECT COUNT(*) QTD_PEND
      INTO n_qtd_pend
      FROM SIAOS.PROP_SET PS
     WHERE PS.PRP_CODIGO = n_proposta
       AND PS.SET_DATA_APR IS NULL;
  
    IF n_qtd_pend > 0 THEN
    
      UPDATE SIAOS.PROP_SET PS
         SET PS.USU_CHAPA_APR = NULL, 
             PS.SET_DATA_APR = NULL
       WHERE PRP_CODIGO = n_proposta
         AND PAS_CODIGO = n_pas_codigo
         AND PS.PRP_SET = n_set;
    
      IF SQL%NOTFOUND THEN
        n_erro := 1;
      END IF;
    
      COMMIT;
    
      IF n_erro IS NULL THEN
      
        SELECT PAS.PAS_NOME
          INTO v_pas_nome
          FROM SIAOS.PROP_AREA_SET PAS
         WHERE PAS.PAS_CODIGO = n_pas_codigo;
      
        c_pre_mensagem := cl_notas;
      
        SELECT U.USU_NOME, U.USU_EMAIL
          INTO v_usu_nome_mod, v_usu_email_mod
          FROM SIAOS.USUARIO U
         WHERE UPPER(U.USU_LOGINWEB) = USER;
      
        SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1, NULL, n_proposta, 12, c_pre_mensagem, NULL, n_erro);
      
        SELECT U.USU_NOME,
               U.USU_EMAIL,
               U2.USU_NOME USU_NOME_EXE,
               PS.SET_DT_REPROG,
               PS.SET_OBS
          INTO v_usu_nome_sol,
               v_usu_email_sol,
               v_usu_nome_exe,
               dt_set_dt_reprog,
               clb_set_obs
          FROM SIAOS.PROP_SET PS
         INNER JOIN SIAOS.USUARIO U
            ON PS.USU_CHAPA_SOL = U.USU_CHAPA
         INNER JOIN SIAOS.USUARIO U2
            ON PS.USU_CHAPA_EXE = U2.USU_CHAPA
         WHERE PS.PRP_CODIGO = n_proposta
           AND PS.PAS_CODIGO = n_pas_codigo
           AND PS.PRP_SET =
               (SELECT MAX(PS2.PRP_SET)
                  FROM SIAOS.PROP_SET PS2
                 WHERE PS2.PRP_CODIGO = n_proposta);
      
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome_mod || '<' || v_usu_email_mod || '>',
                                          v_usu_nome_sol || '<' ||  v_usu_email_sol || '>',
                                          NULL, NULL,
                                          'SET ' || n_proposta || '-' || n_rev || ' - ' || v_cli_nome,
                                          'SET de ' || v_pas_nome || ' retornou ao estado de execução:',
                                          REPLACE(c_pre_mensagem, CHR(10), '<br>') ||
                                          '<BR /><BR />Motivo:<BR />' ||
                                          REPLACE(clb_set_obs, CHR(10), '<br>'),
                                          'Proposta:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                          'Cliente: ' || v_cli_nome ||
                                          '<br />Solicitante: ' || v_usu_nome_sol ||
                                          '<br />Moderador: ' || v_usu_nome_mod ||
                                          '<br />Executante: ' || v_usu_nome_exe ||
                                          '<br />Data Retorno: ' || TO_CHAR(dt_set_dt_reprog, 'DD/MM/YYYY'),
                                          1, n_eml_numero);
      
      END IF;
    
    END IF;
  
    COMMIT;
  
  END SP_CANCELA_APROVACAO_SET;

  -------------------------------------------------------------
  --------------- VERIFICA SE SEMANA É VÁLIDA -----------------
  -------------------------------------------------------------
  
/*
TODO: owner="juliano" category="Fix" priority="1 - High" created="28/08/2023" closed="07/11/2024"
text="CORRIGIR STATUS DA SET GERAL PARA CONSIDERAR EDITAR E APROVAR
      MODIFICADO 3 PARA SET_DATA_APR DE SET_DATA_EXECSET_DATA_EXEC"
*/
  FUNCTION SF_STATUS_SET(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE)
    RETURN NUMBER IS
  
    n_status NUMBER;
    n_qtd    NUMBER;
  
  BEGIN
  
    SELECT COUNT(*)
      INTO n_qtd
      FROM SIAOS.PROP_SET PS
     WHERE PS.PRP_CODIGO = n_prp_codigo
       AND PS.SET_DATA_SOL IS NOT NULL
       AND PS.SET_DATA_MOD IS NULL
       AND PS.SET_DATA_EXEC IS NULL;
  
    IF n_qtd > 0 THEN
      n_status := 1;
    ELSE
    
      SELECT COUNT(*)
        INTO n_qtd
        FROM SIAOS.PROP_SET PS
       WHERE PS.PRP_CODIGO = n_prp_codigo
         AND PS.SET_DATA_SOL IS NOT NULL
         AND PS.SET_DATA_MOD IS NOT NULL
         AND PS.SET_DATA_EXEC IS NULL;
    
      IF n_qtd > 0 THEN
        n_status := 2;
      ELSE
        SELECT COUNT(*)
          INTO n_qtd
          FROM SIAOS.PROP_SET PS
         WHERE PS.PRP_CODIGO = n_prp_codigo
           AND PS.SET_DATA_SOL IS NOT NULL
           AND PS.SET_DATA_MOD IS NOT NULL
           AND PS.SET_DATA_EXEC IS NOT NULL
           AND PS.SET_DATA_APR IS NULL;
        IF n_qtd > 0 THEN
          n_status := 3;
        ELSE
          n_status := 0;
        END IF;
      END IF;
    END IF;
  
    RETURN(n_status);
  
  EXCEPTION
    WHEN OTHERS THEN
      n_status := 0;
      RETURN(n_status);
  END SF_STATUS_SET;

  -------------------------------------------------------------
  --------------- VERIFICA SE SEMANA É VÁLIDA -----------------
  -------------------------------------------------------------

/*
TODO: owner="juliano" category="Fix" priority="1 - High" created="28/08/2023" closed="07/11/2024"
text="CORRIGIR STATTUS DA SET AREA"
*/
  FUNCTION SF_STATUS_SET_AREA(
    n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
    n_pas_codigo IN SIAOS.PROP_SET.PAS_CODIGO%TYPE)
    RETURN NUMBER IS
  
    n_status NUMBER;
    --n_qtd    NUMBER;
  
  BEGIN
    IF n_pas_codigo IS NULL THEN
       n_status := SF_STATUS_SET(n_prp_codigo);
    ELSE
      SELECT DECODE(PS.SET_DATA_EXEC, NULL,
             DECODE(PS.SET_DATA_MOD, NULL,
             DECODE(PS.SET_DATA_SOL, NULL, 0, 1), 2), 3) STATUS
        INTO n_status
        FROM SIAOS.PROP_SET PS
       WHERE PS.PRP_CODIGO = n_prp_codigo
         AND PS.PAS_CODIGO = n_pas_codigo;
    END IF;
    
    RETURN(n_status);
  
  EXCEPTION WHEN OTHERS THEN
      n_status := 0;
      RETURN(n_status);
  END SF_STATUS_SET_AREA;
  ----------------------------------------------------------------------
  -- CANCELA SET    -----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_CANCELA_SET(n_proposta   IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_pas_codigo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                           cl_notas     IN CLOB,
                           n_erro       OUT NUMBER) IS
  
    c_pre_mensagem  SIAOS.PROP_RECADO.PRE_MENSAGEM%TYPE;
    v_usu_nome      SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email     SIAOS.USUARIO.USU_EMAIL%TYPE;
    n_usu_chapa     SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_qtd_pend      INTEGER;
    v_pas_nome      SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    v_usu_nome_sol  SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_sol SIAOS.USUARIO.USU_EMAIL%TYPE;
    n_eml_numero    SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    n_rev           INTEGER;
    n_set           INTEGER;
    n_cli_codigo    SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    v_cli_nome      SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
    clb_set_obs     SIAOS.PROP_SET.SET_OBS%TYPE;
  
  BEGIN
  
    SELECT P.PRP_SET, P.PRP_REVISAO, P.CLI_CODIGO
      INTO n_set, n_rev, n_cli_codigo
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    IF n_cli_codigo IS NOT NULL THEN
    
      SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
        INTO v_cli_nome
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cli_codigo;
    
    ELSE
    
      SELECT C.CTE_NOME
        INTO v_cli_nome
        FROM SIAOS.CLIENTE_TEMP C
       WHERE C.PRP_CODIGO = n_proposta;
    
    END IF;
  
    SELECT U.USU_NOME, U.USU_EMAIL, U.USU_CHAPA
      INTO v_usu_nome, v_usu_email, n_usu_chapa
      FROM SIAOS.USUARIO U
     WHERE UPPER(U.USU_LOGINWEB) = USER;
  
    IF cl_notas IS NOT NULL THEN
      clb_set_obs := '<font size="2">';
      clb_set_obs := clb_set_obs || '<hr />';
      clb_set_obs := clb_set_obs ||
                      '<strong>NOTAS DO EXECUTANTE</strong></br>';
      clb_set_obs := clb_set_obs || '<strong>' || v_usu_nome || ' ' ||
                      TO_CHAR(SYSDATE, 'DD/MM/YYYY HH24:MI:SS') ||
                      '</strong></br>';
      clb_set_obs := clb_set_obs || '</font>';
      clb_set_obs := clb_set_obs || '</br>';
      clb_set_obs := clb_set_obs || cl_notas || '</br>';
    END IF;
  
    UPDATE SIAOS.PROP_SET PS
       SET PS.USU_CHAPA_MOD = NVL(PS.USU_CHAPA_MOD,n_usu_chapa),
           PS.SET_DATA_MOD  = NVL(PS.SET_DATA_MOD,SYSDATE),
           PS.USU_CHAPA_EXE = NVL(PS.USU_CHAPA_EXE,n_usu_chapa),
           PS.SET_DATA_EXEC = NVL(PS.SET_DATA_EXEC,SYSDATE),
           PS.SET_DATA_APR  = NVL(PS.SET_DATA_APR,SYSDATE),
           PS.USU_CHAPA_APR = n_usu_chapa,
           PS.SET_DT_CANCEL = SYSDATE,
           PS.SET_OBS       = clb_set_obs || '<br><hr><br><br>' ||
                              PS.SET_OBS
     WHERE PRP_CODIGO = n_proposta
       AND PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET =
           (SELECT P.PRP_SET FROM PROPOSTA P WHERE P.PRP_CODIGO = n_proposta);
  
    IF SQL%NOTFOUND THEN
      n_erro := 1;
    END IF;
  
    COMMIT;
  
    IF n_erro IS NULL THEN
    
      SELECT COUNT(*) QTD_PEND
        INTO n_qtd_pend
        FROM SIAOS.PROP_SET PS
       WHERE PS.PRP_CODIGO = n_proposta
         AND PS.SET_DATA_EXEC IS NULL;
    
      SELECT PAS.PAS_NOME
        INTO v_pas_nome
        FROM SIAOS.PROP_AREA_SET PAS
       WHERE PAS.PAS_CODIGO = n_pas_codigo;
    
      IF n_qtd_pend = 0 THEN
      
        SIAOS.PCK_SMART_SALES3.SP_SALVA_REVISAO(n_proposta, 1);
      
        c_pre_mensagem := 'O SET DA ÁREA: ' || v_pas_nome ||
                          'FOI CANCELADO PELO USUARIO: ' || v_usu_nome ||
                          '<BR>NÃO HÁ MAIS NENHUM SET PENDENTE!<BR><BR>NOTAS:<BR>' ||
                          cl_notas;
      
      ELSE
      
        c_pre_mensagem := 'O SET DA ÁREA: ' || v_pas_nome ||
                          'FOI CANCELADO PELO USUARIO: ' || v_usu_nome ||
                          '<BR>EXISTE(M) SET(S) AINDA PENDENTE(S)!<BR><BR>NOTAS:<BR>' ||
                          cl_notas;
      
      END IF;
    
      SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_STATUS(n_proposta);
    
      SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1, NULL, n_proposta, 10, c_pre_mensagem, NULL, n_erro);
    
      /*SELECT U.USU_NOME, U.USU_EMAIL
        INTO v_usu_nome_sol, v_usu_email_sol
        FROM SIAOS.PROP_SET PS, SIAOS.USUARIO U
       WHERE PS.USU_CHAPA_SOL = U.USU_CHAPA
         AND PS.PRP_CODIGO = n_proposta
         AND PS.PAS_CODIGO = n_pas_codigo
         AND PS.PRP_SET = (SELECT MAX(PS2.PRP_SET)
                             FROM SIAOS.PROP_SET PS2
                            WHERE PS2.PRP_CODIGO = n_proposta);
    
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                        v_usu_nome_sol || '<' || v_usu_email_sol || '>',
                                        NULL, NULL,
                                        'SET CANCELAMENTO ' || n_proposta || '-' ||
                                        n_rev || ' - ' || v_cli_nome,
                                        'SET DA ÁREA ' || v_pas_nome || ' CANCELADO!',
                                        '<BR />Motivo:<BR />' ||
                                        REPLACE(c_pre_mensagem, CHR(10), '<br>'),
                                        'Proposta:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                        'Cliente: ' || v_cli_nome ||
                                        '<br />Solicitante: ' || v_usu_nome_sol ||
                                        '<br />Data do Cancelamento: ' || TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI') || '<br />',
                                        1, n_eml_numero);
    
      FOR cur_set IN (SELECT PAS.PAS_NOME, U.USU_NOME, U.USU_EMAIL
                        FROM SIAOS.PROP_AREA_SET PAS
                       INNER JOIN SMARNET.ACESSO_FUNC AF
                          ON PAS.ACE_CODIGO_MOD = AF.ACE_CODIGO
                       INNER JOIN USUARIO U
                          ON AF.USU_CHAPA = U.USU_CHAPA
                       WHERE PAS.PAS_CODIGO = n_pas_codigo) LOOP
      
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                          cur_set.USU_NOME || '<' || cur_set.USU_EMAIL || '>',
                                          NULL, NULL,
                                          'SET CANCELAMENTO ' || n_proposta || '-' || n_rev || ' - ' || v_cli_nome,
                                          'SET da Área ' || v_pas_nome ||
                                          ' foi CANCELADO!',
                                          '<BR />Motivo:<BR />' || REPLACE(c_pre_mensagem, CHR(10), '<br>'),
                                          'Proposta:' || n_proposta || '-' ||
                                          n_rev || ' SET-' || n_set,
                                          'Cliente: ' || v_cli_nome ||
                                          '<br />Solicitante: ' || v_usu_nome_sol ||
                                          '<br />Data do Cancelamento: ' || TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI') || '<br />',
                                          1, n_eml_numero);
      END LOOP;*/
    
    END IF;
  
  END SP_CANCELA_SET;

  -----------------------------------------------------------------------------
  ----------------   RETORNA VALOR DE COTACAO SRC   ---------------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_VALOR_COTACAO(c_produto IN SIAOS.PRODUTO.PRODUTO%TYPE,
                            c_moeda   IN SIAOS.INDICFIN.MOEDA%TYPE,
                            n_empresa IN GERAL.EMPRESA.EMP_CODIGO%TYPE)
    RETURN NUMBER IS
  
    n_preco         NUMBER(11, 2);
    n_preco_usd     SUPRIMENTO.PRECO_PROD.PPR_PRFOB%TYPE;
    n_preco_usd_imp SUPRIMENTO.PRECO_PROD.PPR_PRECO%TYPE;
    n_preco_rs_imp  SUPRIMENTO.PRECO_PROD.PPR_PRECO%TYPE;
    n_cotacao_euro  SIAOS.SAPP.SAP_COTACAO_EURO%TYPE;
    n_cotacao_rmb  SIAOS.SAPP.SAP_COTACAO_RMB%TYPE;
  
  BEGIN
  
    SELECT PR.PPR_PRFOB,
           PR.PPR_PRECO,
           ROUND(PR.PPR_PRECO *
                 SUPRIMENTO.PCK_FECHA_MOVIM.SF_VALOR_DOLAR(TO_CHAR(PR.PPR_DTULT, 'DD/MM/YYYY'), 'USD'),
                 2) PRECO_REAL
      INTO n_preco_usd, n_preco_usd_imp, n_preco_rs_imp
      FROM SUPRIMENTO.PRECO_PROD PR
     WHERE PR.PRODUTO = c_produto;  
  
    IF c_moeda = 'USD' THEN
      IF n_empresa = 5 THEN
        n_preco := n_preco_usd;
      ELSE
        n_preco := n_preco_usd_imp;
      END IF;
    ELSIF c_moeda = 'EUR' THEN      
      SELECT SAPP.SAP_COTACAO_EURO INTO n_cotacao_euro FROM SIAOS.SAPP;      
      IF n_empresa = 5 THEN
        n_preco := n_preco_usd / n_cotacao_euro;
      ELSE
        n_preco := n_preco_usd_imp / n_cotacao_euro;
      END IF;
    ELSIF c_moeda = 'CNY' THEN
      SELECT SAPP.SAP_COTACAO_RMB INTO n_cotacao_rmb FROM SIAOS.SAPP;
      IF n_empresa = 5 THEN
        n_preco := n_preco_usd / n_cotacao_rmb;
      ELSE
        n_preco := n_preco_usd_imp / n_cotacao_rmb;
      END IF;
    ELSIF c_moeda = 'R$' THEN
      n_preco := n_preco_rs_imp;
    END IF;
  
    RETURN n_preco;
  
  END SF_VALOR_COTACAO;

  -----------------------------------------------------------------------------
  ----------------   RETORNA LISTA ESTIMADA  ----------------------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_VL_LISTA_EST(n_vl_lista  IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                           n_vl_cotado IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                           n_vl_venda  IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                           dt_data     IN DATE) RETURN NUMBER IS
  
    n_var_C      NUMBER;
    n_var_D      NUMBER;
    n_iqv        NUMBER;
    n_mkup       NUMBER;
    n_vl_lista2  NUMBER;
    n_mkp_limite NUMBER;
  
  BEGIN
  
    SELECT IC.ICO_VAR_C, IC.ICO_VAR_D, IC.ICO_MKP_LIMITE
      INTO n_var_C, n_var_D, n_mkp_limite
      FROM SIAOS.IQV_CONFIGURA IC
     WHERE TRUNC(ICO_DT_INI) =
           (SELECT MAX(TRUNC(ICO_DT_INI))
              FROM IQV_CONFIGURA I
             WHERE TRUNC(I.ICO_DT_INI) <= TRUNC(dt_data));
  
    IF n_vl_cotado IS NOT NULL AND n_vl_lista = 0 THEN
      n_mkup := (n_vl_venda / n_vl_cotado) - 1;
      IF n_mkup < n_mkp_limite THEN
        n_mkup := n_mkp_limite;
      END IF;
      n_iqv       := (n_var_C * LN(100 * n_mkup)) + n_var_D;
      n_vl_lista2 := 100 * (n_vl_venda / n_iqv);
    ELSE
      n_vl_lista2 := n_vl_lista;
    END IF;
  
    RETURN ROUND(n_vl_lista2, 2);
  
  EXCEPTION
    WHEN OTHERS THEN
    
      RETURN n_vl_venda * 10;
    
  END SF_VL_LISTA_EST;

  -----------------------------------------------------------------------------
  ----------------   COMISSAO IQV   -------------------------------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_PER_COMISSAO(n_iqv IN NUMBER, dt_data IN DATE) RETURN NUMBER IS
  
  BEGIN
  
    RETURN SIAOS.PCK_COMISSAO.SF_COMISSAO_CURVA(n_iqv, dt_data);
  
  END SF_PER_COMISSAO;

  ----------------------------------------------------------------------
  -- Retorna dados geral do IQV ----------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_DADOS_COMISSAO(n_vl_lista     IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                              n_vl_adicional IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                              n_vl_cotado    IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                              n_vl_venda     IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                              c_origem       IN SIAOS.ORIGEM.ORIGEM%TYPE,
                              c_salesp_key   IN SIAOS.ARSALESP.SALESP_KEY%TYPE,
                              n_comiss_var   IN NUMBER,
                              dt_aval        IN DATE,
                              n_vl_lista_est OUT NUMBER,
                              n_iqv          OUT NUMBER,
                              n_comissao     OUT NUMBER,
                              n_erro         OUT NUMBER) IS
  
    --vl_lista_total NUMBER;
  
  BEGIN
  
    n_erro := 0;
  
    IF n_vl_adicional > 0 THEN
      n_vl_lista_est := SIAOS.PCK_SMART_SALES3.SF_VL_LISTA_EST(n_vl_adicional,
                                                               n_vl_cotado,
                                                               n_vl_venda,
                                                               dt_aval);
    ELSE
      n_vl_lista_est := SIAOS.PCK_SMART_SALES3.SF_VL_LISTA_EST(n_vl_lista,
                                                               n_vl_cotado,
                                                               n_vl_venda,
                                                               dt_aval);
    END IF;
  
    n_iqv := SIAOS.PCK_COMISSAO.SF_CALC_ITEM_IQV(n_vl_lista_est,
                                                 NULL,
                                                 NULL,
                                                 n_vl_venda,
                                                 dt_aval);
  
    n_comissao := SIAOS.PCK_COMISSAO.SF_CALC_COM(n_iqv,
                                                 c_origem,
                                                 c_salesp_key,
                                                 NULL,
                                                 dt_aval);
    /*
    IF n_comiss_var IS NOT NULL AND n_comiss_var > 0 THEN
       n_comissao := n_comissao * (n_comiss_var/100);
    END IF;
    */
    IF n_comiss_var IS NOT NULL AND n_comiss_var > 0 THEN
      n_comissao := n_comiss_var * (n_comissao / 2);
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
    
      n_erro := 1;
    
  END SP_DADOS_COMISSAO;

  ----------------------------------------------------------------------
  -- Retorna dados geral do IQV ----------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_DADOS_COMISSAO_OLD(n_vl_lista     IN SIAOS.ITEM_PROP.IPR_PRECO%TYPE,
                                  n_vl_adicional IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                                  n_vl_cotado    IN SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE,
                                  n_vl_venda     IN SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE,
                                  n_comiss_var   IN NUMBER,
                                  dt_aval        IN DATE,
                                  n_vl_lista_est OUT NUMBER,
                                  n_iqv          OUT NUMBER,
                                  n_comissao     OUT NUMBER,
                                  n_erro         OUT NUMBER) IS
  
    --n_vl_lista_total NUMBER;
  
  BEGIN
  
    n_erro := 0;
  
    IF n_vl_lista_est > 0 THEN
      n_iqv := SIAOS.PCK_COMISSAO.SF_CALC_ITEM_IQV(n_vl_lista,
                                                   n_vl_adicional,
                                                   n_vl_cotado,
                                                   n_vl_venda,
                                                   dt_aval);
    ELSE
      n_iqv := 0;
    END IF;
  
    n_comissao := SF_PER_COMISSAO(n_iqv, dt_aval);
  
    IF n_comiss_var IS NOT NULL THEN
      n_comissao := n_comiss_var * (n_comissao / 2);
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      n_erro := 1;
    
  END SP_DADOS_COMISSAO_OLD;

  ----------------------------------------------------------------------
  -- Edita pacotes de Produtos -----------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_PACOTE(c_operacao     IN CHAR,
                      n_pac_codigo   IN OUT SIAOS.PACOTE.PAC_CODIGO%TYPE,
                      v_lte_desc     IN SMARNET.LEGENDA_TEXTO.LTE_DESCRICAO%TYPE,
                      n_pac_grupo    IN SIAOS.PACOTE.PAC_GRUPO%TYPE,
                      v_lte_desc_gr  IN SMARNET.LEGENDA_TEXTO.LTE_DESCRICAO%TYPE,
                      n_pac_varios   IN SIAOS.PACOTE.PAC_VARIOS%TYPE,
                      v_pac_processo IN SIAOS.PACOTE.PAC_PROCESSO%TYPE,
                      n_pac_ativo    IN SIAOS.PACOTE.PAC_ATIVO%TYPE,
                      n_usu_chapa    IN SIAOS.PACOTE.USU_CHAPA%TYPE,
                      v_pac_desc     IN SIAOS.PACOTE.PAC_DESCRICAO%TYPE,
                      n_erro         OUT NUMBER) IS
  
    n_leg_codigo    SMARNET.LEGENDA_TEXTO.LEG_CODIGO%TYPE;
    n_leg_codigo_gr SMARNET.LEGENDA_TEXTO.LEG_CODIGO%TYPE;
  
  BEGIN
  
    n_erro := 0;
  
    IF c_operacao = 'I' THEN
    
      SMARNET.PCK_LEGENDA.SP_ATUALIZA_LEGENDA(n_leg_codigo, 1, v_lte_desc);
      SMARNET.PCK_LEGENDA.SP_ATUALIZA_LEGENDA(n_leg_codigo_gr,
                                              1,
                                              v_lte_desc_gr);
    
      INSERT INTO PACOTE
        (LEG_CODIGO,
         PAC_GRUPO,
         PAC_VARIOS,
         PAC_PROCESSO,
         PAC_ATIVO,
         USU_CHAPA,
         LEG_CODIGO_GR,
         PAC_DESCRICAO)
      VALUES
        (n_leg_codigo,
         n_pac_grupo,
         n_pac_varios,
         v_pac_processo,
         n_pac_ativo,
         n_usu_chapa,
         n_leg_codigo_gr,
         v_pac_desc)
      RETURNING pac_codigo INTO n_pac_codigo;
    
    ELSIF c_operacao = 'U' THEN
    
      UPDATE PACOTE
         SET PAC_GRUPO     = n_pac_grupo,
             PAC_VARIOS    = n_pac_varios,
             PAC_PROCESSO  = v_pac_processo,
             PAC_ATIVO     = n_pac_ativo,
             USU_CHAPA     = n_usu_chapa,
             PAC_DESCRICAO = v_pac_desc
       WHERE PAC_CODIGO = n_pac_codigo;
    
    ELSIF c_operacao = 'D' THEN
    
      DELETE pacote WHERE pac_codigo = n_pac_codigo;
    
    END IF;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      n_erro := 1;
    
  END SP_PACOTE;

  ----------------------------------------------------------------------
  -- Edita pacotes de Produtos -----------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_PACOTE_PROD(c_operacao       IN CHAR,
                           n_pap_codigo     IN OUT SIAOS.PACOTE_PROD.PAP_CODIGO%TYPE,
                           n_pac_codigo     IN SIAOS.PACOTE_PROD.PAC_CODIGO%TYPE,
                           v_produto        IN SIAOS.PACOTE_PROD.PRODUTO%TYPE,
                           v_descricao      IN SIAOS.PACOTE_PROD.PAP_DESCRICAO%TYPE,
                           v_pap_opcoes     IN SIAOS.PACOTE_PROD.PAP_OPCOES%TYPE,
                           v_pap_opesp      IN SIAOS.PACOTE_PROD.PAP_OPESP%TYPE,
                           v_datasheet      IN SIAOS.PACOTE_PROD.PAP_DATASHEET%TYPE,
                           v_obs            IN SIAOS.PACOTE_PROD.PAP_OBS%TYPE,
                           n_pap_quantidade IN SIAOS.PACOTE_PROD.PAP_QUANTIDADE%TYPE,
                           n_pap_principal  IN SIAOS.PACOTE_PROD.PAP_PRINCIPAL%TYPE,
                           n_pap_posicao    IN SIAOS.PACOTE_PROD.PAP_POSICAO%TYPE,
                           n_pap_ativo      IN SIAOS.PACOTE_PROD.PAP_ATIVO%TYPE,
                           n_erro           OUT NUMBER) IS
  
  BEGIN
  
    n_erro := 0;
  
    IF c_operacao = 'I' THEN
    
      INSERT INTO PACOTE_PROD
        (PAC_CODIGO,
         PRODUTO,
         PAP_DESCRICAO,
         PAP_OPCOES,
         PAP_OPESP,
         PAP_DATASHEET,
         PAP_OBS,
         PAP_QUANTIDADE,
         PAP_PRINCIPAL,
         PAP_POSICAO,
         PAP_ATIVO)
      VALUES
        (n_pac_codigo,
         v_produto,
         UPPER(v_descricao),
         UPPER(v_pap_opcoes),
         UPPER(v_pap_opesp),
         UPPER(v_datasheet),
         UPPER(v_obs),
         n_pap_quantidade,
         n_pap_principal,
         n_pap_posicao,
         n_pap_ativo)
      RETURNING PAP_CODIGO INTO n_pap_codigo;
    
    ELSIF c_operacao = 'U' THEN
    
      UPDATE PACOTE_PROD
         SET PAC_CODIGO     = n_pac_codigo,
             PRODUTO        = v_produto,
             PAP_DESCRICAO  = UPPER(v_descricao),
             PAP_OPCOES     = UPPER(v_pap_opcoes),
             PAP_OPESP      = UPPER(v_pap_opesp),
             PAP_DATASHEET  = UPPER(v_datasheet),
             PAP_OBS        = UPPER(v_obs),
             PAP_QUANTIDADE = n_pap_quantidade,
             PAP_PRINCIPAL  = n_pap_principal,
             PAP_POSICAO    = n_pap_posicao,
             PAP_ATIVO      = n_pap_ativo
       WHERE PAP_CODIGO = n_pap_codigo;
    
    ELSIF c_operacao = 'D' THEN
    
      DELETE pacote_prod WHERE pap_codigo = n_pap_codigo;
    
    END IF;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      n_erro := 1;
    
  END SP_PACOTE_PROD;

  ----------------------------------------------------------------------
  -- Insere pacotes na Proposta ----------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_INSERE_PACOTE(n_pac_codigo     IN SIAOS.PACOTE_PROD.PAC_CODIGO%TYPE,
                             v_ipg_nome       IN SIAOS.ITEM_PROP_GRUPO.IPG_NOME%TYPE,
                             n_pap_quantidade IN SIAOS.PACOTE_PROD.PAP_QUANTIDADE%TYPE,
                             n_prp_codigo     IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_pas_codigo     IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE,
                             n_erro           OUT NUMBER) IS
  
    n_passou        INTEGER := 0;
    n_x             INTEGER := 0;
    n_ipg_codigo    SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE;
    n_ipr_item_prop SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE;
    n_item_pai      SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE;
    n_ipi_codigo    SIAOS.ITEM_PROP_DIV.IPI_CODIGO%TYPE;
  
  BEGIN
  
    n_erro := 0;
    FOR cur_pac IN (SELECT P.PAC_CODIGO,
                           P.PAC_GRUPO,
                           P.PAC_VARIOS,
                           P.PAC_PROCESSO,
                           P.PAC_ATIVO,
                           P.USU_CHAPA,
                           P.PAC_BLOQUEADO
                      FROM PACOTE P
                     WHERE P.PAC_CODIGO = n_pac_codigo)
    
     LOOP
    
      IF cur_pac.PAC_PROCESSO IS NOT NULL THEN
      
        PCK_SMART_SALES3.n_prp_codigo := n_prp_codigo;
        EXECUTE IMMEDIATE 'BEGIN ' || cur_pac.PAC_PROCESSO || '; END;';
        --         SIAOS.PCK_SMART_SALES3.SP_ABRE_SAC();
      
      END IF;
    
      LOOP
      
        n_x := n_x + 1;
      
        IF cur_pac.PAC_GRUPO = 1 AND n_passou = 0 THEN
        
          SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_ipg_codigo, n_prp_codigo, v_ipg_nome, NULL, NULL);
        
          IF cur_pac.PAC_VARIOS = 0 THEN
          
            n_passou := 1;
          
          END IF;
        
        END IF;
      
        FOR cur_ppro IN (SELECT PP.PRODUTO,
                                SUBSTR(TRIM(PP.PAP_OPCOES), 1, 30) PAP_OPCOES,
                                TRIM(PP.PAP_OPESP) PAP_OPESP,
                                TRIM(PP.PAP_DESCRICAO) PAP_DESCRICAO,
                                PP.PAP_OBS,
                                PP.PAP_QUANTIDADE,
                                PP.PAP_PRINCIPAL,
                                PP.PAP_DATASHEET
                           FROM PACOTE_PROD PP
                          WHERE PP.PAC_CODIGO = n_pac_codigo
                            AND PP.PAP_ATIVO = 1
                          ORDER BY PP.PAP_PRINCIPAL DESC, PP.PAP_POSICAO) LOOP
        
          SIAOS.PCK_SMART_SALES3.SP_IN_PRODUTO1(n_prp_codigo,
                                                cur_ppro.PRODUTO,
                                                cur_ppro.PAP_QUANTIDADE,
                                                NULL,
                                                cur_ppro.PAP_DESCRICAO,
                                                NULL,
                                                trim(cur_ppro.PAP_OPCOES),
                                                n_pas_codigo,
                                                NULL,
                                                n_ipr_item_prop);
        
          COMMIT;
        
          IF cur_ppro.PAP_OPESP IS NOT NULL OR cur_ppro.PAP_OBS IS NOT NULL THEN
          
            SIAOS.PCK_SMART_SALES3.SP_UP_PRO_CLAS(n_prp_codigo, cur_ppro.PRODUTO, cur_ppro.PAP_OPESP, cur_ppro.PAP_OBS, n_ipr_item_prop);
          END IF;
        
          IF n_ipg_codigo IS NOT NULL THEN
          
            UPDATE SIAOS.ITEM_PROP I
               SET I.IPG_CODIGO = n_ipg_codigo
             WHERE I.PRP_CODIGO = n_prp_codigo
               AND I.IPR_ITEM_PROP = n_ipr_item_prop;
          
          END IF;
        
          IF cur_ppro.PAP_PRINCIPAL = 1 AND n_item_pai IS NULL THEN
          
            n_item_pai := n_ipr_item_prop;
          
          ELSIF cur_ppro.PAP_PRINCIPAL = 0 AND n_item_pai IS NOT NULL THEN
          
            SIAOS.PCK_SMART_SALES3.SP_AMARRA_ITEMS(n_prp_codigo, n_item_pai, n_ipr_item_prop, n_erro);
          
          END IF;
        
          IF TRIM(cur_ppro.PAP_DATASHEET) IS NOT NULL THEN
            FOR cur_piro IN (SELECT T.COLUMN_VALUE DESCRICAO
                               FROM TABLE(PCK_DQANET.SF_SPLIT(TRIM(cur_ppro.PAP_DATASHEET),
                                                              CHR(10))) T) LOOP
              n_ipi_codigo := NULL;
              SP_CAD_ITEM_DIV(n_prp_codigo, n_ipr_item_prop, n_ipi_codigo, cur_piro.DESCRICAO, 0);
            
            END LOOP;
          
          END IF;
        
        END LOOP;
      
        n_item_pai   := NULL;
        n_ipg_codigo := NULL;
      
        EXIT WHEN n_x = n_pap_quantidade;
      
      END LOOP;
    
    END LOOP;
  
    COMMIT;
  
    SIAOS.PCK_SMART_SALES3.SP_ARRUMA_GRUPO(n_prp_codigo, n_ipg_codigo);
  
    COMMIT;
  
    --  EXCEPTION WHEN OTHERS THEN
  
    --      n_erro := 1;
  
  END SP_INSERE_PACOTE;

  ----------------------------------------------------------------------
  -- GERA CONSULTA DE PREÇO --------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_CONSULTA_PRECO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              v_cpe_log    IN SIAOS.CONSULTA_PRECO.CPE_LOG%TYPE,
                              n_usu_chapa  IN SIAOS.CONSULTA_PRECO.USU_CHAPA%TYPE,
                              n_erro       OUT NUMBER) IS
  
    n_cpe_codigo SIAOS.CONSULTA_PRECO.CPE_CODIGO%TYPE;
  
  BEGIN
  
    n_erro := 0;
  
    BEGIN
    
      SELECT P.CPE_CODIGO
        INTO n_cpe_codigo
        FROM SIAOS.PROPOSTA P
       WHERE P.PRP_CODIGO = n_prp_codigo;
    
    EXCEPTION
      WHEN OTHERS THEN
        n_cpe_codigo := NULL;
    END;
  
    SIAOS.PCK_CONS_PRECO.SP_SOLIC_CONS(n_cpe_codigo, v_cpe_log, n_usu_chapa, n_erro);
    /*
        UPDATE SIAOS.PROPOSTA
           SET CPE_CODIGO = n_cpe_codigo,
               PST_CODIGO = 1
         WHERE PRP_CODIGO = n_prp_codigo;
    */
    UPDATE SIAOS.PROPOSTA
       SET CPE_CODIGO = n_cpe_codigo
     WHERE PRP_CODIGO = n_prp_codigo;
  
--  EXCEPTION WHEN OTHERS THEN
    
      n_erro := 1;
    
  END SP_CONSULTA_PRECO;

  ----------------------------------------------------------------------
  -- BAIXA CONSULTA DE PREÇO -------------------------------------------
  ----------------------------------------------------------------------
  PROCEDURE SP_BAIXA_CONSULTA_PRECO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                    v_cpe_log    IN SIAOS.CONSULTA_PRECO.CPE_LOG%TYPE,
                                    n_erro       OUT NUMBER) IS
  
    n_cpe_codigo SIAOS.CONSULTA_PRECO.CPE_CODIGO%TYPE;
  
  BEGIN
  
    n_erro := 0;
  
    SELECT P.CPE_CODIGO
      INTO n_cpe_codigo
      FROM SIAOS.PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;
    /*
    UPDATE SIAOS.PROPOSTA P
       SET P.PST_CODIGO = 1
     WHERE PRP_CODIGO = n_prp_codigo;
      */
    UPDATE SIAOS.ITEM_PROP_UNI P
       SET P.IPU_STATUS_PRECO = NULL
     WHERE PRP_CODIGO = n_prp_codigo
       AND P.IPU_STATUS_PRECO != 'C';
  
    SIAOS.PCK_CONS_PRECO.SP_BAIXA_CONS(n_cpe_codigo, v_cpe_log, n_erro);
  
  EXCEPTION
    WHEN OTHERS THEN
    
      n_erro := 1;
    
  END SP_BAIXA_CONSULTA_PRECO;

  ----------------------------------------------------------------------
  -- GERA CONSULTA DE PREÇO --------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_GRAVA_PRECO_CONS(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                                n_ipr_adicional IN SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE,
                                n_erro          OUT NUMBER) IS
  
    n_qtd        INTEGER;
    n_lpr_codigo SIAOS.LISTA_PRECO.LPR_CODIGO%type;
    n_indice     SIAOS.LISTA_PRECO.LPR_INDICE%type;
    n_pst_codigo SIAOS.PROPOSTA.PST_CODIGO%TYPE := 2;
  
  BEGIN
  
    n_erro := 0;
  
    SELECT U.LPR_CODIGO
      INTO n_lpr_codigo
      FROM SIAOS.USUARIO U
     WHERE U.USU_CHAPA =
           (SELECT DECODE(USU_CHAPA_INI, NULL, USU_CHAPA, USU_CHAPA_INI)
              FROM SIAOS.PROPOSTA
             WHERE PRP_CODIGO = n_prp_codigo);
  
    IF n_lpr_codigo IS NOT NULL THEN
    
      SELECT DECODE(IDC_PROD, NULL, IDC_LIST, IDC_PROD) INDICE
        INTO n_indice
        FROM (SELECT (SELECT L.LPR_INDICE
                        FROM SIAOS.LISTA_PRECO L
                       WHERE L.LPR_CODIGO = 13) IDC_LIST,
                     (SELECT LP.LPD_INDICE
                        FROM SIAOS.LISTA_PRODUTO LP
                       WHERE LP.LPR_CODIGO = n_lpr_codigo
                         AND LP.PRODUTO =
                             (SELECT DISTINCT PRO_CODIGO
                                FROM ITEM_PROP
                               WHERE PRP_CODIGO = n_prp_codigo
                                 AND IPR_ITEM_PROP = n_ipr_item_prop)) IDC_PROD
                FROM DUAL);
    
    ELSE
    
      n_indice := 1;
    
    END IF;
  
    UPDATE SIAOS.ITEM_PROP
       SET IPR_ADICIONAL = n_ipr_adicional, IPR_PRECO = 0
     WHERE PRP_CODIGO = n_prp_codigo
       AND IPR_ITEM_PROP = n_ipr_item_prop;
  
    UPDATE SIAOS.ITEM_PROP_UNI
       SET IPU_STATUS_PRECO = 'C',
           IPU_PRECO_PER    = n_ipr_adicional * n_indice
     WHERE PRP_CODIGO = n_prp_codigo
       AND IPR_ITEM_PROP = n_ipr_item_prop;
  
    COMMIT;
  
    SELECT COUNT(I.IPR_ITEM_PROP)
      INTO n_qtd
      FROM SIAOS.ITEM_PROP_UNI I
     WHERE PRP_CODIGO = n_prp_codigo
       AND IPU_STATUS_PRECO = 'P';
  
    IF n_qtd = 0 THEN
      IF NVL(SIAOS.PCK_SMART_SALES3.SF_STATUS_SET(n_prp_codigo), 0) = 0 THEN
        n_pst_codigo := 5;
      END IF;
          
      UPDATE SIAOS.PROPOSTA P
         SET P.PST_CODIGO = n_pst_codigo
       WHERE PRP_CODIGO = n_prp_codigo
         AND P.PST_CODIGO != 4;
    
    END IF;
  
    COMMIT;
  
  EXCEPTION WHEN OTHERS THEN
    
      n_erro := 1;
    
  END SP_GRAVA_PRECO_CONS;

  ----------------------------------------------------------------------
  -- TROCA SET  ---------------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_TROCA_SET(n_proposta        IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         n_prop_set        IN SIAOS.PROP_SET.PRP_SET%TYPE,
                         n_pas_codigo      IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                         n_pas_codigo_novo IN SIAOS.PROP_AREA_SET.PAS_CODIGO%TYPE,
                         c_pre_mensagem    IN SIAOS.PROP_SET.SET_OBS%TYPE,
                         n_erro            OUT NUMBER) IS
  
    n_usu_chapa     SIAOS.USUARIO.USU_CHAPA%TYPE;
    v_usu_nome      SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email     SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_sol  SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_sol SIAOS.USUARIO.USU_EMAIL%TYPE;
    c_pre_mensagem2 SIAOS.PROP_SET.SET_OBS%TYPE;
    n_eml_numero    SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
    v_pas_nome      SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    v_pas_nome_novo SIAOS.PROP_AREA_SET.PAS_NOME%TYPE;
    clb_set_obs     SIAOS.PROP_SET.SET_OBS%TYPE;
  
    n_rev        INTEGER;
    n_set        INTEGER;
    n_cli_codigo SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    v_cli_nome   SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
  
  BEGIN
  
    SELECT P.PRP_SET, P.PRP_REVISAO, P.CLI_CODIGO
      INTO n_set, n_rev, n_cli_codigo
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_proposta;
  
    SELECT PAS.PAS_NOME
      INTO v_pas_nome
      FROM SIAOS.PROP_AREA_SET PAS
     WHERE PAS.PAS_CODIGO = n_pas_codigo;
  
    SELECT PAS.PAS_NOME
      INTO v_pas_nome_novo
      FROM SIAOS.PROP_AREA_SET PAS
     WHERE PAS.PAS_CODIGO = n_pas_codigo_novo;
  
    SELECT U.USU_CHAPA, U.USU_NOME, U.USU_EMAIL
      INTO n_usu_chapa, v_usu_nome, v_usu_email
      FROM SIAOS.USUARIO U
     WHERE UPPER(U.USU_LOGINWEB) = USER;
  
    SELECT U.USU_NOME, U.USU_EMAIL, PS.SET_OBS
      INTO v_usu_nome_sol, v_usu_email_sol, clb_set_obs
      FROM SIAOS.PROP_SET PS, SIAOS.USUARIO U
     WHERE PS.USU_CHAPA_SOL = U.USU_CHAPA
       AND PS.PRP_CODIGO = n_proposta
       AND PS.PAS_CODIGO = n_pas_codigo
       AND PS.PRP_SET = n_set;
  
    c_pre_mensagem2 := '<font style="arial" size="2"><br><strong>Troca de Área</strong><br><strong>Usuário:</strong>' ||
                       v_usu_nome || '<br><strong>Data:</strong>' ||
                       TO_CHAR(SYSDATE, 'DD/MM/YYYY') || '<br><br>' ||
                       c_pre_mensagem ||
                       '<br>---------------------------------------------</font><br />';
  
    UPDATE SIAOS.PROP_SET
       SET PAS_CODIGO    = n_pas_codigo_novo,
           SET_OBS       = c_pre_mensagem2 || SET_OBS,
           USU_CHAPA_EXE = NULL,
           SET_DATA_MOD  = NULL,
           USU_CHAPA_MOD = NULL
     WHERE PRP_CODIGO = n_proposta
       AND PAS_CODIGO = n_pas_codigo
       AND PRP_SET = NVL(n_prop_set, 0);
  
    IF n_cli_codigo IS NOT NULL THEN
    
      SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
        INTO v_cli_nome
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cli_codigo;
    
    ELSE
    
      SELECT C.CTE_NOME
        INTO v_cli_nome
        FROM SIAOS.CLIENTE_TEMP C
       WHERE C.PRP_CODIGO = n_proposta;
    
    END IF;
  
    IF v_cli_nome IS NULL THEN
      v_cli_nome := '----';
    END IF;
  
    SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1, NULL,  n_proposta, 10,
                                           'SET - MOTIVO: Troca de Área em Solicitação Pendente:<br>' ||
                                           CHR(10) || c_pre_mensagem, NULL, n_erro);
  
    SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                      v_usu_nome_sol || '<' || v_usu_email_sol || '>',
                                      NULL, NULL,
                                      'SET Troca de Área ' || n_proposta || '-' || n_rev || ' - ' || v_cli_nome,
                                      'SET DA ÁREA ' || v_pas_nome || ' alterado!',
                                      '<BR />O SET da Área ' || v_pas_nome ||
                                      ' foi alterado para a Área  ' ||
                                      v_pas_nome_novo || ' pelo usuário ' ||
                                      v_usu_nome ||
                                      '.<BR /><BR />Motivo da Troca:<BR />' ||
                                      REPLACE(c_pre_mensagem, CHR(10), '<br>') ||
                                      '<BR /><BR />Motivo da Solicitação:<BR />' ||
                                      REPLACE(clb_set_obs, CHR(10), '<br>'),
                                      'Proposta:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                      'Solicitante: ' || v_usu_nome_sol ||
                                      '<br />Data da Troca: ' || TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI') || '<br />',
                                      1, n_eml_numero);
  
    FOR cur_set IN (SELECT PAS.PAS_NOME, U.USU_NOME, U.USU_EMAIL
                      FROM SIAOS.PROP_AREA_SET PAS
                     INNER JOIN SMARNET.ACESSO_FUNC AF
                        ON PAS.ACE_CODIGO_MOD = AF.ACE_CODIGO
                     INNER JOIN USUARIO U
                        ON AF.USU_CHAPA = U.USU_CHAPA
                     WHERE PAS.PAS_CODIGO = n_pas_codigo) LOOP
    
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                        cur_set.USU_NOME || '<' || cur_set.USU_EMAIL || '>',
                                        NULL, NULL,
                                        'SET Troca de Área ' || n_proposta || '-' || n_rev || ' - ' || v_cli_nome,
                                        'SET DA ÁREA ' || v_pas_nome || ' alterado!',
                                        '<BR />O SET da Área ' || v_pas_nome ||
                                        ' foi alterado para a Área  ' ||
                                        v_pas_nome_novo || ' pelo usuário ' ||
                                        v_usu_nome || '.<BR /><BR />Motivo da Troca:<BR />' ||
                                        REPLACE(c_pre_mensagem, CHR(10), '<br>') ||
                                        '<BR /><BR />Motivo da Solicitação:<BR />' ||
                                        REPLACE(clb_set_obs, CHR(10), '<br>'),
                                        'Proposta:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                        'Solicitante: ' || v_usu_nome_sol || '<br />Data da Troca: ' ||
                                        TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI') || '<br />',
                                        1, n_eml_numero);
    END LOOP;
  
    FOR cur_set IN (SELECT PAS.PAS_NOME, U.USU_NOME, U.USU_EMAIL
                      FROM SIAOS.PROP_AREA_SET PAS
                     INNER JOIN SMARNET.ACESSO_FUNC AF
                        ON PAS.ACE_CODIGO_MOD = AF.ACE_CODIGO
                     INNER JOIN USUARIO U
                        ON AF.USU_CHAPA = U.USU_CHAPA
                     WHERE PAS.PAS_CODIGO = n_pas_codigo_novo) LOOP
    
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                        cur_set.USU_NOME || '<' || cur_set.USU_EMAIL || '>',
                                        NULL, NULL,
                                        'SET Troca de Área ' || n_proposta || '-' ||
                                        n_rev || ' - ' || v_cli_nome,
                                        'SET DA ÁREA ' || v_pas_nome ||
                                        ' alterado!',
                                        '<BR />O SET da Área ' ||
                                        v_pas_nome || ' foi alterado para a Área  ' ||
                                        v_pas_nome_novo || ' pelo usuário ' ||
                                        v_usu_nome || '.<BR /><BR />Motivo da Troca:<BR />' ||
                                        REPLACE(c_pre_mensagem, CHR(10), '<br>') ||
                                        '<BR /><BR />Motivo da Solicitação:<BR />' ||
                                        REPLACE(clb_set_obs, CHR(10), '<br>'),
                                        'Proposta:' || n_proposta || '-' || n_rev || ' SET-' || n_set,
                                        'Solicitante: ' || v_usu_nome_sol ||
                                        '<br />Data da Troca: ' ||
                                        TO_CHAR(SYSDATE, 'DD/MM/YYYY HH:MI') ||
                                        '<br />',
                                        1, n_eml_numero);
    END LOOP;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      n_erro := 3;
    
  END SP_TROCA_SET;

  -----------------------------------------------------------------------------
  ----------------   ACESSO A PROPOSTA   --------------------------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_ACESSA_PROP(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_usu_login  IN SIAOS.USUARIO.USU_CHAPA%TYPE)
    RETURN NUMBER IS
  
    v_cc_proposta SIAOS.USUARIO.CC_CODIGO%TYPE;
    v_cc_login    SIAOS.USUARIO.CC_CODIGO%TYPE;
    n_elab_chapa  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_vend_chapa  SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_valida      INTEGER := 0;
  
  BEGIN
  
    SELECT P.USU_CHAPA
      INTO n_elab_chapa
      FROM PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    SELECT MAX(V.USU_CHAPA)
      INTO n_vend_chapa
      FROM VENDEDOR_PROP VP
     INNER JOIN ARSALESP V
        ON V.SALESP_KEY = VP.SALESP_KEY
     WHERE VP.VPR_CODIGO = 1
       AND VP.PRP_CODIGO = n_prp_codigo;
  
    IF n_vend_chapa = n_usu_login THEN
      n_valida := 1;
    END IF;
  
    IF n_valida = 0 THEN
    
      SELECT U.CC_CODIGO
        INTO v_cc_login
        FROM USUARIO U
       WHERE U.USU_CHAPA = n_usu_login;
    
      SELECT U.CC_CODIGO
        INTO v_cc_proposta
        FROM USUARIO U
       WHERE U.USU_CHAPA = n_elab_chapa;
    
      FOR c_cc IN (SELECT VW_CENTRO_CUSTO.CC_CODIGO
                     FROM GERAL.VW_CENTRO_CUSTO
                   CONNECT BY PRIOR VW_CENTRO_CUSTO.CC_CODIGO =
                               VW_CENTRO_CUSTO.CC_RESP
                    START WITH VW_CENTRO_CUSTO.CC_CODIGO = v_cc_login) LOOP
        IF c_cc.CC_CODIGO = v_cc_proposta THEN
          n_valida := 1;
        END IF;
      END LOOP;
    
    END IF;
  
    IF n_valida = 0 THEN
    
      FOR c_ch IN (SELECT U.USU_CHAPA
                     FROM SIAOS.USER_PROP U
                    WHERE U.GUP_CODIGO IN
                          (SELECT DISTINCT USER_PROP.GUP_CODIGO
                             FROM SIAOS.USER_PROP
                            WHERE USER_PROP.USU_CHAPA = n_usu_login)
                      AND U.UPR_OCULTO = 0)
      
       LOOP
      
        IF c_ch.USU_CHAPA = n_elab_chapa THEN
          n_valida := 1;
        END IF;
      
      END LOOP;
    
    END IF;
  
    RETURN n_valida;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      RETURN 0;
    
  END SF_ACESSA_PROP;
  /*
    -----------------------------------------------------------------------------
    ---- RETORNA IMPOSTOS DOS PRODUTOS ------------------------------------------
    -----------------------------------------------------------------------------
    PROCEDURE SP_IMPOSTOS_PRODUTO(c_pro_codigo IN SIAOS.PRODUTO.PRODUTO%TYPE,
                                  n_cli_codigo IN SIAOS.CLIENTE.CODIGO%TYPE,
                                  c_estado     IN SIAOS.ICMS.ESTADO%TYPE,
                                  n_servico    OUT SIAOS.FAMILIA.SERVICO%TYPE,
                                  vc2_ccf      OUT SIAOS.VM_PRODUTO.CCF%TYPE,
                                  n_ipi        OUT SIAOS.VM_PRODUTO.IPI%TYPE,
                                  n_iss        OUT SIAOS.VM_SERVICO.PISS%TYPE,
                                  n_icms       OUT SIAOS.ICMS.PORC%TYPE,
                                  n_erro       OUT NUMBER) IS
  
      c_estado2     SIAOS.ICMS.ESTADO%TYPE;
      c_destmat     CHAR(1) := 'F';
      n_tes_recno   VARCHAR2(5);
      n_cfiscal     VARCHAR2(10);
      n_pis         SIAOS.SAPP.SAP_PIS%TYPE;
      n_cofins      SIAOS.SAPP.SAP_COFINS%TYPE;
  
    BEGIN
  
      BEGIN
  
        SELECT F.SERVICO
          INTO n_servico
          FROM SIAOS.PRODUTO P, SIAOS.FAMILIA F
         WHERE P.FAMILIA = F.CODIGO
           AND TRIM(P.PRODUTO) = TRIM(c_pro_codigo);
  
      EXCEPTION WHEN NO_DATA_FOUND THEN
          n_servico := 0;
      END;
  
      INTEGRACAO.SP_IMP_ITEM(c_pro_codigo,
                             LPAD(n_cli_codigo,6,'0'),
                             c_estado,
                             c_destmat,
                             n_tes_recno,
                             n_ipi,
                             n_icms,
                             n_iss,
                             n_pis,
                             n_cofins,
                             n_cfiscal);
  
      BEGIN
        SELECT CF.CCF
          INTO vc2_ccf
          FROM MULTGESTOR.FATCCF CF
         WHERE TRIM(REPLACE(CF.CLASSIFICACAO,'.','')) = TRIM(n_cfiscal);
      EXCEPTION WHEN OTHERS THEN
        vc2_ccf := NULL;
      END;
  
      IF n_iss IS NOT NULL THEN
        n_servico := 1;
      END IF;
  /*
      BEGIN
  
        SELECT P.CCF
          INTO vc2_ccf
          FROM VM_PRODUTO P
         WHERE TRIM(P.MODELO) = TRIM(c_pro_codigo)
           AND P.DESATIVADO = 'N';
  
      EXCEPTION WHEN OTHERS THEN
          vc2_ccf := NULL;
      END;
  
      BEGIN
  
        SELECT NVL(P.IPI, 0), NVL(P.ICMS, 0)
          INTO n_ipi, n_icms
          FROM SIAOS.VM_PRODUTO P
         WHERE TRIM(P.MODELO) = TRIM(c_pro_codigo)
           AND P.DESATIVADO = 'N';
  
      EXCEPTION WHEN OTHERS THEN
  
          SELECT NVL(P.IPI_ISS, 0)
            INTO n_ipi
            FROM SIAOS.PRODUTO P
           WHERE TRIM(P.PRODUTO) = TRIM(c_pro_codigo);
  
          n_icms := 12;
  
      END;
  
      BEGIN
  
        SELECT NVL(MAX(S.PISS), 0)
          INTO n_iss
          FROM SIAOS.VM_SERVICO S
         INNER JOIN SIAOS.VM_SERVICO_PRO SP ON S.SERVICO = SP.SERVICO
         WHERE TRIM(SP.MODELO) = TRIM(c_pro_codigo);
  
      EXCEPTION WHEN NO_DATA_FOUND THEN
          n_iss := NULL;
      END;
  
      IF c_estado IS NULL THEN
        SELECT C.ESTADO
          INTO c_estado2
          FROM SIAOS.CLIENTE C
         WHERE C.CODIGO = n_cli_codigo;
      ELSE
        c_estado2 := c_estado;
      END IF;
  
      IF c_estado2 != 'SP' THEN
  
        BEGIN
  
          SELECT I.ICMS
            INTO n_icms
            FROM SIAOS.VM_ICMS I
           WHERE I.ESTADO = c_estado2;
  
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
  
            n_icms := 12;
  
        END;
  
      END IF;
  
      IF n_servico = 1 THEN
        n_iss  := n_iss;
        n_ipi  := NULL;
        n_icms := NULL;
      ELSE
        n_iss := NULL;
        n_ipi := n_ipi;
      END IF;
    */ /*

  EXCEPTION WHEN OTHERS THEN

      n_erro := 1;

  END SP_IMPOSTOS_PRODUTO;
*/
  ----------------------------------------------------------------------
  -- TROCA SET  ---------------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_MSG_ARQUIVO(n_par_codigo    IN SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE,
                           n_par_nome      IN SIAOS.PROP_ARQUIVO.PAR_NOME%TYPE,
                           n_par_descricao IN SIAOS.PROP_ARQUIVO.PAR_DESCRICAO%TYPE,
                           n_par_sistema   IN SIAOS.PROP_ARQUIVO.PAR_SISTEMA%TYPE,
                           n_par_filtro    IN SIAOS.PROP_ARQUIVO.PAR_FILTRO%TYPE) IS
  
    n_usu_chapa    SIAOS.USUARIO.USU_CHAPA%TYPE;
    v_usu_nome     SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email    SIAOS.USUARIO.USU_EMAIL%TYPE;
    c_pre_mensagem VARCHAR2(4000);
    n_eml_numero   SIAOS.PASTA_EMAIL.EML_NUMERO%TYPE;
  
  BEGIN
  
    SELECT U.USU_CHAPA, U.USU_NOME, U.USU_EMAIL
      INTO n_usu_chapa, v_usu_nome, v_usu_email
      FROM SIAOS.USUARIO U
     WHERE UPPER(U.USU_LOGINWEB) = USER;
  
    c_pre_mensagem := '<strong>Nome do Arquivo:</strong>' || n_par_nome ||
                      '<br><strong>Descrição:</strong>' || n_par_descricao ||
                      '<br>
                      <strong>Data:</strong>' ||
                      TO_CHAR(SYSDATE, 'DD/MM/YYYY') || '<br>';
  
    IF n_par_sistema = 1 THEN
    
      c_pre_mensagem := c_pre_mensagem || '<strong>Proposta:</strong>' ||
                        n_par_filtro || '<br>';
    
      FOR cur_set IN (SELECT *
                        FROM (SELECT DISTINCT 
                                     U.USU_CHAPA,
                                     U.USU_NOME,
                                     U.USU_EMAIL
                                FROM SIAOS.PROP_SET PS
                               INNER JOIN SIAOS.USUARIO U
                                  ON U.USU_CHAPA = PS.USU_CHAPA_EXE
                               WHERE PS.PRP_CODIGO = n_par_filtro
                                 AND PS.SET_DATA_APR IS NULL
                              UNION
                              SELECT DISTINCT 
                                     U.USU_CHAPA,
                                     U.USU_NOME,
                                     U.USU_EMAIL
                                FROM SIAOS.PROPOSTA P
                               INNER JOIN SIAOS.USUARIO U
                                  ON U.USU_CHAPA = P.USU_CHAPA
                               WHERE P.PRP_CODIGO = n_par_filtro) G
                       WHERE G.USU_CHAPA != n_usu_chapa
                         AND G.USU_EMAIL IS NOT NULL) LOOP
      
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                          cur_set.USU_NOME || '<' ||
                                          cur_set.USU_EMAIL || '>',
                                          NULL, NULL,
                                          'Revisor O.S.: ' || n_par_filtro ||
                                          ' - Aviso de Inclusão de Arquivo',
                                          'Novo arquivo anexado a O.S.',
                                          REPLACE(c_pre_mensagem, CHR(10), '<br>'),
                                          'O.S.:' || n_par_filtro,
                                          'Usuário: ' || v_usu_nome ||
                                          '<br />Email: ' || v_usu_email ||
                                          '<br />Data: ' || TO_CHAR(SYSDATE, 'DD/MM/YYYY'),
                                          1, n_eml_numero);
      END LOOP;
    
    ELSIF n_par_sistema = 2 THEN
    
      c_pre_mensagem := c_pre_mensagem || '<strong>O.S.:</strong>' ||
                        n_par_filtro || '<br>';
    
      FOR cur_set IN (SELECT *
                        FROM (SELECT DISTINCT U.USU_CHAPA,
                                              U.USU_NOME,
                                              U.USU_EMAIL
                                FROM SIAOS.OEHDR OS
                               INNER JOIN SIAOS.COORDENADORES C
                                  ON C.CHAVE = OS.COORD_COMERCIAL
                               INNER JOIN SIAOS.USUARIO U
                                  ON U.USU_CHAPA = C.USU_CHAPA
                               WHERE OS.ORDER_NO = n_par_filtro
                                 AND OS.PENDCONT IS NULL
                              UNION
                              SELECT DISTINCT U.USU_CHAPA,
                                              U.USU_NOME,
                                              U.USU_EMAIL
                                FROM SIAOS.OEHDR OS
                               INNER JOIN SIAOS.COORDENADORES C
                                  ON C.CHAVE = OS.COORD_TECNICO
                               INNER JOIN SIAOS.USUARIO U
                                  ON U.USU_CHAPA = C.USU_CHAPA
                               WHERE OS.ORDER_NO = n_par_filtro
                                 AND OS.PENDENGA IS NULL
                                 AND OS.PENDCONT IS NULL
                              /*
                              UNION
                              SELECT DISTINCT U.USU_CHAPA,
                                              U.USU_NOME,
                                              U.USU_EMAIL
                                FROM SIAOS.PROPOSTA P
                               INNER JOIN SIAOS.OEHDR OS ON OS.ORDER_NO = P.ORDER_NO
                               INNER JOIN SIAOS.USUARIO U ON U.USU_CHAPA = P.USU_CHAPA
                               WHERE OS.ORDER_NO = n_par_filtro
                                 AND OS.PENDENGA IS NULL
                                 AND OS.PENDCONT IS NULL*/
                              ) G
                       WHERE G.USU_CHAPA != n_usu_chapa
                         AND G.USU_EMAIL IS NOT NULL) LOOP
      
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                          cur_set.USU_NOME || '<' ||
                                          cur_set.USU_EMAIL || '>',
                                          NULL,
                                          NULL,
                                          'Order-in Proposta:' ||
                                          n_par_filtro ||
                                          '- Aviso de Inclusão de Arquivo',
                                          'Novo arquivo anexado a Proposta',
                                          REPLACE(c_pre_mensagem,
                                                  CHR(10),
                                                  '<br>'),
                                          'Proposta:' || n_par_filtro,
                                          'Usuário: ' || v_usu_nome ||
                                          '<br />Email: ' || v_usu_email ||
                                          '<br />Data: ' ||
                                          TO_CHAR(SYSDATE, 'DD/MM/YYYY'),
                                          1,
                                          n_eml_numero);
      END LOOP;
    
    END IF;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      NULL;
    
  END SP_MSG_ARQUIVO;

  ----------------------------------------------------------------------
  -- ABRE SAC CGPS
  ----------------------------------------------------------------------

  PROCEDURE SP_ABRE_SAC IS
  
    n_prp_codigo     SIAOS.PROPOSTA.PRP_CODIGO%TYPE := PCK_SMART_SALES3.n_prp_codigo;
    n_tem_sac        SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_cli_codigo     SIAOS.PROPOSTA.CLI_CODIGO%TYPE;
    n_cli_codigo_fim SIAOS.PROPOSTA.CLI_CODIGO_FIM%TYPE;
    v_cli_nome       SIAOS.CLIENTE_TEMP.CTE_NOME%TYPE;
    n_usu_chapa      SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_sac            DIATNET.SAC.SAC_NUMERO%TYPE;
    n_tipo_sac       DIATNET.SAC.TSA_CODIGO%TYPE := 5;
    n_forma_cont     DIATNET.SAC.FCO_CODIGO%TYPE := 6;
  
  BEGIN
  
    SELECT U.USU_CHAPA
      INTO n_usu_chapa
      FROM SIAOS.USUARIO U
     WHERE UPPER(U.USU_LOGINWEB) = USER;
  
    SELECT P.CLI_CODIGO,
           DECODE(P.CLI_CODIGO_FIM, NULL, P.CLI_CODIGO, P.CLI_CODIGO_FIM)
      INTO n_cli_codigo, n_cli_codigo_fim
      FROM SIAOS.PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    IF n_cli_codigo_fim IS NOT NULL THEN
    
      SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
        INTO v_cli_nome
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cli_codigo_fim;
    
    ELSE
    
      n_cli_codigo := 6293;
    
      SELECT C.CTE_NOME
        INTO v_cli_nome
        FROM SIAOS.CLIENTE_TEMP C
       WHERE C.PRP_CODIGO = n_prp_codigo;
    
    END IF;
  
    SELECT NVL(COUNT(*), 0) QTD
      INTO n_tem_sac
      FROM DIATNET.ACAO_SAC T
     WHERE T.PRP_CODIGO = n_prp_codigo;
  
    IF n_tem_sac = 0 THEN
    
      DIATNET.PCK_DIATNET.SP_SAC_OS(1,
                                    NULL,
                                    n_usu_chapa,
                                    TO_CHAR(SYSDATE, 'DD/MM/YYYY'),
                                    NULL,
                                    'N',
                                    n_tipo_sac,
                                    n_forma_cont,
                                    n_cli_codigo,
                                    v_cli_nome,
                                    NULL,
                                    'PROPOSTA - CGPS',
                                    7,
                                    18,
                                    NULL,
                                    0,
                                    0,
                                    NULL,
                                    NULL,
                                    NULL,
                                    n_sac);
      DIATNET.PCK_DIATNET.SP_ACAO_SAC(9,
                                      NULL,
                                      n_sac,
                                      2,
                                      n_usu_chapa,
                                      TO_CHAR(SYSDATE, 'DD/MM/YYYY'),
                                      TO_CHAR(SYSDATE, 'DD/MM/YYYY'),
                                      NULL,
                                      0,
                                      n_usu_chapa,
                                      n_prp_codigo);
    
      UPDATE DIATNET.ACAO_SAC
         SET ACAO_SAC.ACS_DATA_FINAL = SYSDATE
       WHERE ACAO_SAC.PRP_CODIGO = n_prp_codigo
         AND ACAO_SAC.SAC_NUMERO = n_sac
         AND ACAO_SAC.ACS_DATA_FINAL IS NULL;
    
    END IF;
  
  END SP_ABRE_SAC;

  ----------------------------------------------------------------------
  -- APAGA LIXEIRA  ----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_APAGA_LIXEIRA IS
  
  BEGIN
  
    DELETE FROM SIAOS.PROP_ARQUIVO WHERE PAR_LIXEIRA < (SYSDATE - 15);
  
    COMMIT;
  
  END SP_APAGA_LIXEIRA;

  ----------------------------------------------------------------------
  -- Pastas Automáticas  -----------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_PASTAS_AUTOMATICAS(n_par_sistema IN SIAOS.PROP_ARQUIVO.PAR_SISTEMA%TYPE,
                                  n_par_filtro  IN SIAOS.PROP_ARQUIVO.PAR_FILTRO%TYPE,
                                  n_codigo_pai  IN INTEGER,
                                  n_par_codigo  IN SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE,
                                  n_erro        OUT NUMBER) IS
  
    v_pastas      SIAOS.CONFIGURA_PROPOSTA.CPR_PASTAS%TYPE;
    n_par_codigo2 SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE;
    n_gdi_codigo  SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    n_qtd_mod     INTEGER := 0;
  
  BEGIN
    SELECT NVL(COUNT(P.PAR_CODIGO), 0)
      INTO n_qtd_mod
      FROM SIAOS.PROP_ARQ_MOD P
     WHERE P.PAR_SISTEMA = n_par_sistema;
  
    IF n_qtd_mod = 0 THEN
      IF n_par_sistema = 1 THEN
        -- ORDER IN
      
        SELECT CPR_PASTAS INTO v_pastas FROM SIAOS.CONFIGURA_PROPOSTA;
      
        SELECT O.GDI_CODIGO
          INTO n_gdi_codigo
          FROM PROPOSTA P
         INNER JOIN ORIGEM O
            ON O.ORIGEM = P.ORI_CODIGO
         WHERE P.PRP_CODIGO = n_par_filtro;
      
      ELSIF n_par_sistema = 2 THEN
        -- REVISOR
      
        SELECT CPR_PASTAS_OS INTO v_pastas FROM SIAOS.CONFIGURA_PROPOSTA;
      
        SELECT O.GDI_CODIGO
          INTO n_gdi_codigo
          FROM OEHDR P
         INNER JOIN ORIGEM O
            ON O.ORIGEM = P.ORIGEM
         WHERE P.ORDER_NO = n_par_filtro;
      
      ELSIF n_par_sistema = 4 THEN
      
        v_pastas := '1#0#27088##
2#1#27089##
3#1#27090##
4#1#27091##
5#1#27092##
6#1#27093##
7#0#27094##
8#7#27095##
9#8#27096##
10#8#27097##
11#7#27098##
12#11#27096##
13#11#27097##';
      
        n_gdi_codigo := 1;
      
      ELSE
        NULL;
      END IF;
    
      IF v_pastas IS NOT NULL AND n_gdi_codigo != 14 THEN
      
        FOR c_pastas IN (SELECT SUBSTR(PASTA, 1, X1 - 1) COD,
                                SUBSTR(PASTA, X1 + 1, X2 - X1 - 1) COD_PAI,
                                SUBSTR(PASTA, X2 + 1, X3 - X2 - 1) LEG1,
                                SUBSTR(PASTA, X3 + 1, X4 - X3 - 1) LEG2,
                                SUBSTR(PASTA, X4 + 1, LENGTH(PASTA)) ACESSO
                           FROM (SELECT T.COLUMN_VALUE PASTA,
                                        INSTR(T.COLUMN_VALUE, '#', 1) X1,
                                        INSTR(T.COLUMN_VALUE, '#', 1, 2) X2,
                                        INSTR(T.COLUMN_VALUE, '#', 1, 3) X3,
                                        INSTR(T.COLUMN_VALUE, '#', 1, 4) X4
                                   FROM TABLE(PCK_DQANET.SF_SPLIT(v_pastas,
                                                                  CHR(10))) T) Y
                          WHERE SUBSTR(PASTA, X1 + 1, X2 - X1 - 1) =
                                n_codigo_pai) LOOP
        
          SP_GRAVA_PASTAS(n_par_sistema,
                          n_par_filtro,
                          c_pastas.LEG1,
                          c_pastas.LEG2,
                          c_pastas.ACESSO,
                          n_par_codigo,
                          n_par_codigo2);
        
          SP_PASTAS_AUTOMATICAS(n_par_sistema,
                                n_par_filtro,
                                c_pastas.COD,
                                n_par_codigo2,
                                n_erro);
        
        END LOOP;
      
      END IF;
    
    ELSE
    
      FOR c_pastas IN (SELECT Y.PAR_CODIGO      COD,
                              Y.LEG_CODIGO      LEG1,
                              Y.LEG_CODIGO_DESC LEG2,
                              Y.ACE_CODIGO      ACESSO
                         FROM SIAOS.PROP_ARQ_MOD Y
                        WHERE NVL(Y.PAR_CODIGO_PAI, 0) =
                              NVL(n_codigo_pai, 0)
                          AND Y.PAR_SISTEMA = n_par_sistema) LOOP
      
        SP_GRAVA_PASTAS(n_par_sistema,
                        n_par_filtro,
                        c_pastas.LEG1,
                        c_pastas.LEG2,
                        c_pastas.ACESSO,
                        n_par_codigo,
                        n_par_codigo2);
        IF c_pastas.COD IS NOT NULL THEN
          SP_PASTAS_AUTOMATICAS(n_par_sistema,
                                n_par_filtro,
                                c_pastas.COD,
                                n_par_codigo2,
                                n_erro);
        END IF;
      END LOOP;
    
    END IF;
  
    COMMIT;
  
  END SP_PASTAS_AUTOMATICAS;

  ----------------------------------------------------------------------
  -- Grava Pastas  -----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_GRAVA_PASTAS(n_par_sistema     IN SIAOS.PROP_ARQUIVO.PAR_SISTEMA%TYPE,
                            n_par_filtro      IN SIAOS.PROP_ARQUIVO.PAR_FILTRO%TYPE,
                            n_leg_codigo      IN SIAOS.PROP_ARQUIVO.LEG_CODIGO%TYPE,
                            n_leg_codigo_desc IN SIAOS.PROP_ARQUIVO.LEG_CODIGO_DESC%TYPE,
                            n_ace_codigo      IN SIAOS.PROP_ARQUIVO.ACE_CODIGO%TYPE,
                            n_par_codigo_pai  IN SIAOS.PROP_ARQUIVO.PAR_CODIGO_PAI%TYPE,
                            n_par_codigo      OUT SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE) IS
  
    n_prp_codigo     SIAOS.PROP_ARQUIVO.PRP_CODIGO%TYPE;
    v_par_nome       SIAOS.PROP_ARQUIVO.PAR_NOME%TYPE;
    v_par_descricao  SIAOS.PROP_ARQUIVO.PAR_DESCRICAO%TYPE;
    d_par_data       SIAOS.PROP_ARQUIVO.PAR_DATA%TYPE;
    n_order_no       SIAOS.PROP_ARQUIVO.ORDER_NO%TYPE;
    n_par_tipo       SIAOS.PROP_ARQUIVO.PAR_TIPO%TYPE;
    n_usu_chapa      SIAOS.PROP_ARQUIVO.USU_CHAPA%TYPE;
    n_par_pasta_fixa SIAOS.PROP_ARQUIVO.PAR_PASTA_FIXA%TYPE;
  
  BEGIN
  
    IF n_par_sistema = 1 THEN
    
      n_prp_codigo := n_par_filtro;
    
    ELSIF n_par_sistema = 2 THEN
    
      n_order_no := n_par_filtro;
    
      SELECT PRP_CODIGO
        INTO n_prp_codigo
        FROM SIAOS.PROPOSTA
       WHERE ORDER_NO = n_par_filtro;
    
    END IF;
  
    d_par_data       := SYSDATE;
    n_par_tipo       := 0;
    n_par_pasta_fixa := 1;
  
    BEGIN
      SELECT USU_CHAPA
        INTO n_usu_chapa
        FROM SIAOS.USUARIO
       WHERE UPPER(USU_LOGINWEB) = UPPER(USER);
    
      IF SQL%NOTFOUND THEN
        n_usu_chapa := NULL;
      END IF;
    EXCEPTION
      WHEN OTHERS THEN
        n_usu_chapa := NULL;
    END;
  
    v_par_nome      := SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(n_leg_codigo, 1);
    v_par_descricao := SMARNET.PCK_LEGENDA.SF_TEXTO_LEGENDA(n_leg_codigo_desc,
                                                            1);
  
    INSERT INTO SIAOS.PROP_ARQUIVO
      (PRP_CODIGO,
       PAR_NOME,
       PAR_DESCRICAO,
       PAR_DATA,
       ORDER_NO,
       PAR_CODIGO_PAI,
       PAR_TIPO,
       USU_CHAPA,
       PAR_SISTEMA,
       PAR_FILTRO,
       ACE_CODIGO,
       PAR_PASTA_FIXA,
       LEG_CODIGO,
       LEG_CODIGO_DESC)
    VALUES
      (n_prp_codigo,
       v_par_nome,
       v_par_descricao,
       d_par_data,
       n_order_no,
       n_par_codigo_pai,
       n_par_tipo,
       n_usu_chapa,
       n_par_sistema,
       n_par_filtro,
       n_ace_codigo,
       n_par_pasta_fixa,
       n_leg_codigo,
       n_leg_codigo_desc)
    RETURNING PAR_CODIGO INTO n_par_codigo;
  
    COMMIT;
  
  END SP_GRAVA_PASTAS;

  ----------------------------------------------------------------------
  -- Pastas  O.S.  -----------------------------------------------------
  ----------------------------------------------------------------------

  PROCEDURE SP_PASTAS_OS(n_par_sistema IN SIAOS.PROP_ARQUIVO.PAR_SISTEMA%TYPE,
                         n_par_filtro  IN SIAOS.PROP_ARQUIVO.PAR_FILTRO%TYPE) IS
  
    n_par_codigo_pai SIAOS.PROP_ARQUIVO.PAR_CODIGO%TYPE;
    n_gdi_codigo     SIAOS.ORIGEM.GDI_CODIGO%TYPE;
  
  BEGIN
  
    IF n_par_sistema = 2 THEN
    
      SELECT O.GDI_CODIGO
        INTO n_gdi_codigo
        FROM OEHDR P
       INNER JOIN ORIGEM O
          ON O.ORIGEM = P.ORIGEM
       WHERE P.ORDER_NO = n_par_filtro;
    
      IF n_gdi_codigo != 14 THEN
      
        SELECT MAX(PAR_CODIGO)
          INTO n_par_codigo_pai
          FROM SIAOS.PROP_ARQUIVO
         WHERE PAR_SISTEMA = n_par_sistema
           AND PAR_FILTRO = n_par_filtro
           AND LEG_CODIGO = 26018;
      
        UPDATE SIAOS.PROP_ARQUIVO
           SET PAR_CODIGO_PAI =
               (n_par_codigo_pai),
               ORDER_NO       = n_par_filtro
         WHERE PAR_CODIGO_PAI IS NULL
           AND PAR_CODIGO IN
               (SELECT PAR_CODIGO
                  FROM SIAOS.PROP_ARQUIVO PA
                 WHERE PA.PAR_SISTEMA = 1
                   AND PA.PAR_FILTRO =
                       (SELECT PRP_CODIGO
                          FROM SIAOS.PROPOSTA
                         WHERE ORDER_NO = n_par_filtro));
      
      END IF;
    
    END IF;
  
    COMMIT;
  
  END SP_PASTAS_OS;

  ----------------------------------------------------------
  -------- COPIA ITEM DA PROPOSTA  -------------------------
  ----------------------------------------------------------

  PROCEDURE SP_SET_ITEM(n_prop       IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                        n_item       IN SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE,
                        n_pas_codigo IN SIAOS.ITEM_PROP_UNI.PAS_CODIGO%TYPE) IS
  
  BEGIN
  
    UPDATE ITEM_PROP_UNI I
       SET I.PAS_CODIGO = n_pas_codigo
     WHERE I.PRP_CODIGO = n_prop
       AND I.IPR_ITEM_PROP = n_item
        OR I.IPR_ITEM_PAI = n_item;
  
    COMMIT;
  
  END SP_SET_ITEM;

  ----------------------------------------------------------
  -------- ORDEM DOS ITENS  --------------------------------
  ----------------------------------------------------------

  FUNCTION SF_ORDEM_PROP(n_prp_codigo    IN INTEGER,
                         n_ipr_item_prop IN INTEGER,
                         n_ipg_codigo    IN INTEGER,
                         vc2_posicao     IN VARCHAR2) RETURN VARCHAR2 IS
  
    vc2_posicao2     VARCHAR2(2000);
    n_ipr_item_pai   INTEGER;
    n_ipg_codigo_pai INTEGER;
    n_nivel          INTEGER;
    n_tam_de         INTEGER;
    n_tam_para       INTEGER;
    n_p1             VARCHAR2(20);
    n_p2             VARCHAR2(20);
  
  BEGIN
  
    IF n_ipr_item_prop IS NOT NULL THEN
    
      SELECT DISTINCT LPAD(I.IPR_FOLHA, 3, '0'),
                      I.IPR_ITEM_PAI,
                      I.IPG_CODIGO
        INTO vc2_posicao2, n_ipr_item_pai, n_ipg_codigo_pai
        FROM VW_ITEM_PROP_UNI I
       WHERE I.PRP_CODIGO = n_prp_codigo
         AND I.IPR_ITEM_PROP = n_ipr_item_prop;
    
    ELSIF n_ipg_codigo IS NOT NULL THEN
    
      SELECT IPG.IPG_CODIGO_PAI,
             LPAD(IPG.IPG_POSICAO, 3, '0') || vc2_posicao
        INTO n_ipg_codigo_pai, vc2_posicao2
        FROM SIAOS.ITEM_PROP_GRUPO IPG
       WHERE IPG.PRP_CODIGO = n_prp_codigo
         AND IPG.IPG_CODIGO = n_ipg_codigo;
    
    ELSE
      vc2_posicao2 := vc2_posicao;
    END IF;
  
    IF n_ipr_item_pai IS NOT NULL THEN
    
      SELECT LPAD(I.IPR_FOLHA, 3, '0') || vc2_posicao2
        INTO vc2_posicao2
        FROM VW_ITEM_PROP_UNI I
       WHERE I.PRP_CODIGO = n_prp_codigo
         AND I.IPR_ITEM_PROP = n_ipr_item_pai;
    
      vc2_posicao2 := SF_ORDEM_PROP(n_prp_codigo,
                                    NULL,
                                    n_ipg_codigo_pai,
                                    vc2_posicao2);
    
    ELSE
      IF vc2_posicao IS NULL THEN
        vc2_posicao2 := vc2_posicao2 || '000';
      END IF;
      IF n_ipg_codigo_pai IS NOT NULL THEN
        vc2_posicao2 := SF_ORDEM_PROP(n_prp_codigo,
                                      NULL,
                                      n_ipg_codigo_pai,
                                      vc2_posicao2); -- || vc2_posicao;
      ELSE
      
        IF n_ipg_codigo_pai IS NULL THEN
        
          SELECT MAX(LEVEL)
            INTO n_tam_para
            FROM (SELECT *
                    FROM SIAOS.ITEM_PROP_GRUPO G1
                   WHERE G1.PRP_CODIGO = n_prp_codigo) G
          CONNECT BY G.IPG_CODIGO_PAI = PRIOR G.IPG_CODIGO
           START WITH G.IPG_CODIGO_PAI IS NULL;
        
          SELECT LEVEL
            INTO n_tam_de
            FROM (SELECT *
                    FROM SIAOS.ITEM_PROP_GRUPO G1
                   WHERE G1.PRP_CODIGO = n_prp_codigo) G
           WHERE G.IPG_CODIGO = n_ipg_codigo
          CONNECT BY G.IPG_CODIGO_PAI = PRIOR G.IPG_CODIGO
           START WITH G.IPG_CODIGO_PAI IS NULL;
        
          IF n_tam_de < n_tam_para THEN
            n_nivel := n_tam_para * 3;
            --           vc2_posicao2 := vc2_posicao2 || vc2_posicao;
            n_p1         := SUBSTR(vc2_posicao2,
                                   1,
                                   LENGTH(vc2_posicao2) - 6);
            n_p2         := SUBSTR(vc2_posicao2,
                                   LENGTH(vc2_posicao2) - 5,
                                   LENGTH(vc2_posicao2));
            vc2_posicao2 := RPAD(n_p1, n_nivel, '0') || n_p2;
          
          ELSE
            vc2_posicao2 := vc2_posicao2 || vc2_posicao;
          END IF;
        
        ELSE
        
          vc2_posicao2 := vc2_posicao2 || vc2_posicao;
        
        END IF;
      
      END IF;
    
    END IF;
  
    RETURN(vc2_posicao2);
  
    --EXCEPTION WHEN OTHERS THEN
  
    RETURN(vc2_posicao2 || vc2_posicao);
  
  END SF_ORDEM_PROP;

  ----------------------------------------------------------
  -------- ORDEM DOS GRUPOS --------------------------------
  ----------------------------------------------------------

  FUNCTION SF_ORDEM_GRUP(n_prp_codigo IN INTEGER,
                         n_ipg_codigo IN INTEGER,
                         vc2_nome     IN VARCHAR2,
                         n_tipo       IN INTEGER) RETURN VARCHAR2 IS
  
    vc2_nome2        VARCHAR2(2000);
    n_ipg_codigo_pai INTEGER;
  
  BEGIN
  
    IF n_ipg_codigo IS NOT NULL THEN
    
      SELECT IPG.IPG_CODIGO_PAI,
             DECODE(n_tipo,
                    1,
                    IPG.IPG_POSICAO || ' - ' || IPG.IPG_NOME,
                    IPG.IPG_POSICAO)
        INTO n_ipg_codigo_pai, vc2_nome2
        FROM SIAOS.ITEM_PROP_GRUPO IPG
       WHERE IPG.PRP_CODIGO = n_prp_codigo
         AND IPG.IPG_CODIGO = n_ipg_codigo;
    ELSE
      vc2_nome2 := NULL;
    END IF;
  
    IF n_ipg_codigo_pai IS NOT NULL THEN
      IF vc2_nome IS NULL THEN
        vc2_nome2 := SIAOS.PCK_SMART_SALES3.SF_ORDEM_GRUP(n_prp_codigo,
                                                          n_ipg_codigo_pai,
                                                          vc2_nome2,
                                                          n_tipo);
      ELSE
        IF n_tipo = 1 THEN
          vc2_nome2 := SIAOS.PCK_SMART_SALES3.SF_ORDEM_GRUP(n_prp_codigo,
                                                            n_ipg_codigo_pai,
                                                            vc2_nome2,
                                                            n_tipo) ||
                       ' \ ' || vc2_nome;
        ELSE
          vc2_nome2 := SIAOS.PCK_SMART_SALES3.SF_ORDEM_GRUP(n_prp_codigo,
                                                            n_ipg_codigo_pai,
                                                            vc2_nome2,
                                                            n_tipo) || '.' ||
                       vc2_nome;
        END IF;
      END IF;
    ELSE
      IF vc2_nome IS NULL THEN
        vc2_nome2 := vc2_nome2;
      ELSE
        IF n_tipo = 1 THEN
          vc2_nome2 := vc2_nome2 || ' \ ' || vc2_nome;
        ELSE
          vc2_nome2 := vc2_nome2 || '.' || vc2_nome;
        END IF;
      END IF;
    END IF;
  
    RETURN(vc2_nome2);
  
  EXCEPTION
    WHEN OTHERS THEN
    
      RETURN(vc2_nome);
    
  END SF_ORDEM_GRUP;

  ----------------------------------------------------------
  -------- COPIA ITEM DA PROPOSTA  -------------------------
  ----------------------------------------------------------

  PROCEDURE SP_IMP_PADRAO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
    n_qtd              INTEGER;
    clb_texto          SIAOS.PROP_PERSONAL.PPE_TEXTO%TYPE;
    clb_ppe_texto      SIAOS.PROP_PERSONAL.PPE_TEXTO%TYPE;
    clb_ppe_texto2     SIAOS.PROP_PERSONAL.PPE_TEXTO2%TYPE;
    clb_ppe_intro      SIAOS.PROP_PERSONAL.PPE_TXT_INTRO%TYPE;
    clb_ppe_tecnico    SIAOS.PROP_PERSONAL.PPE_TEXTO_TECNICO%TYPE;
    clb_ppe_tecnico2   SIAOS.PROP_PERSONAL.PPE_TEXTO_TECNICO2%TYPE;
    clb_ppe_assist_tec SIAOS.PROP_PERSONAL.PPE_ASSIST_TEC%TYPE;
    n_ppe_agrupamento  SIAOS.PROP_PERSONAL.PPE_AGRUPAMENTO%TYPE := 2;
    n_ppe_posicao_desc SIAOS.PROP_PERSONAL.PPE_POSICAO_DESC%TYPE := 2;
    n_ppe_grupos       SIAOS.PROP_PERSONAL.PPE_GRUPOS%TYPE := 2;
    n_ppe_lotes        SIAOS.PROP_PERSONAL.PPE_LOTES%TYPE := 1;
    n_ppe_dados_op     SIAOS.PROP_PERSONAL.PPE_DADOS_OP%TYPE := 1;
    n_ppe_op_padrao    SIAOS.PROP_PERSONAL.PPE_OP_PADRAO%TYPE := 0;
    n_ppe_valor_agrup  SIAOS.PROP_PERSONAL.PPE_VALOR_AGRUP%TYPE := 2;
    n_ppe_sumario      SIAOS.PROP_PERSONAL.PPE_SUMARIO%TYPE := '0';
    vc2_pim_tipo       SIAOS.PROPOSTA_IMP.PIM_TIPO%TYPE := 'C2';
    n_lin_cod          SIAOS.PROPOSTA_IMP.LIN_COD%TYPE;
    n_usu_chapa        SIAOS.USUARIO.USU_CHAPA%TYPE;
    n_gdi_codigo       SIAOS.GRUPO_DIVISAO.GDI_CODIGO%TYPE;
    n_pin_consolida    SIAOS.PROPOSTA_IMP.PIN_CONSOLIDA%TYPE := 0;
    n_tco_codigo       ORDERIN.TIPO_CONTEUDO.TCO_CODIGO%TYPE;
  
  BEGIN
  
    SELECT NVL(COUNT(*), 0) QTD
      INTO n_qtd
      FROM ORDERIN.CONF_IMP_PROPOSTA
     WHERE PRP_CODIGO = n_prp_codigo;
  
    IF n_qtd = 0 THEN
      SP_IMPORTA_TXT_PROP(n_prp_codigo);
    END IF;
  
    SELECT NVL(COUNT(*), 0) QTD
      INTO n_qtd
      FROM ORDERIN.CONF_IMP_PROPOSTA
     WHERE PRP_CODIGO = n_prp_codigo;
  
    IF n_qtd = 0 THEN
    
      SELECT DECODE(O.GDI_CODIGO, 3, 2, 1) LIN_COD, O.GDI_CODIGO
        INTO n_lin_cod, n_gdi_codigo
        FROM PROPOSTA P
       INNER JOIN ORIGEM O
          ON P.ORI_CODIGO = O.ORIGEM
       WHERE P.PRP_CODIGO = n_prp_codigo;
    
      IF n_gdi_codigo IN (13, 19) THEN
        n_pin_consolida := 1;
      END IF;
    
      SELECT USU_CHAPA
        INTO n_usu_chapa
        FROM PROPOSTA
       WHERE PRP_CODIGO = n_prp_codigo;
    
      BEGIN
      
        SELECT PPE_TEXTO,
               PPE_TEXTO2,
               PPE_TXT_INTRO,
               PPE_TEXTO_TECNICO,
               PPE_TEXTO_TECNICO2,
               PPE_AGRUPAMENTO,
               PPE_POSICAO_DESC,
               PPE_GRUPOS,
               PPE_LOTES,
               PPE_DADOS_OP,
               PPE_OP_PADRAO,
               PPE_VALOR_AGRUP,
               PPE_ASSIST_TEC,
               PPE_SUMARIO
          INTO clb_ppe_texto,
               clb_ppe_texto2,
               clb_ppe_intro,
               clb_ppe_tecnico,
               clb_ppe_tecnico2,
               n_ppe_agrupamento,
               n_ppe_posicao_desc,
               n_ppe_grupos,
               n_ppe_lotes,
               n_ppe_dados_op,
               n_ppe_op_padrao,
               n_ppe_valor_agrup,
               clb_ppe_assist_tec,
               n_ppe_sumario
          FROM PROP_PERSONAL
         WHERE USU_CHAPA = n_usu_chapa;
         
        IF clb_ppe_texto IS NULL OR 
           clb_ppe_texto2 IS NULL OR
           clb_ppe_tecnico IS NULL OR
           clb_ppe_tecnico2 IS NULL THEN
           SP_CONFIG_PESSOAL_FORCED(n_usu_chapa);
        END IF;
      
        IF n_gdi_codigo = 3 THEN
        
          SELECT T.CMO_TEXTO
            INTO clb_ppe_texto
            FROM SIAOS.CONFIGURA_MODELO T
           WHERE CMO_CODIGO = 123;
          SELECT T.CMO_TEXTO
            INTO clb_ppe_texto2
            FROM SIAOS.CONFIGURA_MODELO T
           WHERE CMO_CODIGO = 124;
          SELECT T.CMO_TEXTO
            INTO clb_ppe_tecnico
            FROM SIAOS.CONFIGURA_MODELO T
           WHERE CMO_CODIGO = 132;
          SELECT T.CMO_TEXTO
            INTO clb_ppe_tecnico2
            FROM SIAOS.CONFIGURA_MODELO T
           WHERE CMO_CODIGO = 134;
        
        ELSIF n_gdi_codigo = 19 THEN
        
          SELECT T.CMO_TEXTO
            INTO clb_ppe_texto
            FROM SIAOS.CONFIGURA_MODELO T
           WHERE CMO_CODIGO = 180;
          SELECT T.CMO_TEXTO
            INTO clb_ppe_texto2
            FROM SIAOS.CONFIGURA_MODELO T
           WHERE CMO_CODIGO = 182;
          SELECT T.CMO_TEXTO
            INTO clb_ppe_tecnico
            FROM SIAOS.CONFIGURA_MODELO T
           WHERE CMO_CODIGO = 181;
          /*SELECT T.CMO_TEXTO
           INTO clb_ppe_tecnico2
           FROM SIAOS.CONFIGURA_MODELO T
          WHERE CMO_CODIGO = 134;*/
        
        END IF;
      
      EXCEPTION
        WHEN OTHERS THEN
          SIAOS.PCK_SMART_SALES3.SP_CONFIG_PESSOAL;
      END;
    
      INSERT INTO ORDERIN.CONF_IMP_PROPOSTA
        (PRP_CODIGO,
         CIP_TIPO,
         CIP_AGRUPAMENTO,
         CIP_POSICAO_DESC,
         CIP_GRUPOS,
         CIP_LOTES,
         CIP_DADOS_OP,
         CIP_OP_PADRAO,
         CIP_VALOR_AGRUP,
         LIN_COD,
         CIP_SUMARIO,
         CIP_CONSOLIDA)
      VALUES
        (n_prp_codigo,
         vc2_pim_tipo,
         n_ppe_agrupamento,
         n_ppe_posicao_desc,
         n_ppe_grupos,
         n_ppe_lotes,
         n_ppe_dados_op,
         n_ppe_op_padrao,
         n_ppe_valor_agrup,
         n_lin_cod,
         n_ppe_sumario,
         n_pin_consolida);
    
      IF clb_ppe_texto IS NOT NULL THEN
        n_tco_codigo := 2;
        clb_texto    := clb_ppe_texto;
      
        INSERT INTO ORDERIN.CONTEUDO_IMP_PROP
          (PRP_CODIGO, TCO_CODIGO, CIP_ORDEM, CIP_TEXTO)
        VALUES
          (n_prp_codigo, n_tco_codigo, 1, clb_texto);
      
      END IF;
    
      IF clb_ppe_texto2 IS NOT NULL THEN
        n_tco_codigo := 3;
        clb_texto    := clb_ppe_texto2;
      
        INSERT INTO ORDERIN.CONTEUDO_IMP_PROP
          (PRP_CODIGO, TCO_CODIGO, CIP_ORDEM, CIP_TEXTO)
        VALUES
          (n_prp_codigo, n_tco_codigo, 1, clb_texto);
      END IF;
    
      IF clb_ppe_intro IS NOT NULL THEN
        n_tco_codigo := 4;
        clb_texto    := clb_ppe_intro;
      
        INSERT INTO ORDERIN.CONTEUDO_IMP_PROP
          (PRP_CODIGO, TCO_CODIGO, CIP_ORDEM, CIP_TEXTO)
        VALUES
          (n_prp_codigo, n_tco_codigo, 1, clb_texto);
      END IF;
    
      IF clb_ppe_tecnico IS NOT NULL THEN
        n_tco_codigo := 5;
        clb_texto    := clb_ppe_tecnico;
      
        INSERT INTO ORDERIN.CONTEUDO_IMP_PROP
          (PRP_CODIGO, TCO_CODIGO, CIP_ORDEM, CIP_TEXTO)
        VALUES
          (n_prp_codigo, n_tco_codigo, 1, clb_texto);
      END IF;
    
      IF clb_ppe_tecnico2 IS NOT NULL THEN
        n_tco_codigo := 6;
        clb_texto    := clb_ppe_tecnico2;
      
        INSERT INTO ORDERIN.CONTEUDO_IMP_PROP
          (PRP_CODIGO, TCO_CODIGO, CIP_ORDEM, CIP_TEXTO)
        VALUES
          (n_prp_codigo, n_tco_codigo, 1, clb_texto);
      END IF;
    
      IF clb_ppe_assist_tec IS NOT NULL THEN
        n_tco_codigo := 8;
        clb_texto    := clb_ppe_assist_tec;
      
        INSERT INTO ORDERIN.CONTEUDO_IMP_PROP
          (PRP_CODIGO, TCO_CODIGO, CIP_ORDEM, CIP_TEXTO)
        VALUES
          (n_prp_codigo, n_tco_codigo, 1, clb_texto);
      END IF;
    
      /*
      INSERT INTO PROPOSTA_IMP
        (PRP_CODIGO,
         PIM_TEXTO,
         PIM_TEXTO2,
         PIM_TXT_INTRO,
         PIM_TEXTO_TECNICO,
         PIM_TEXTO_TECNICO2,
         PIM_TIPO,
         PIM_AGRUPAMENTO,
         PIM_POSICAO_DESC,
         PIM_GRUPOS,
         PIM_LOTES,
         PIM_DADOS_OP,
         PIM_OP_PADRAO,
         PIM_VALOR_AGRUP,
         PIM_ASSIST_TEC,
         PIM_SUMARIO,
         PIN_CONSOLIDA,
         LIN_COD)
      VALUES
        (n_prp_codigo,
         clb_ppe_texto,
         clb_ppe_texto2,
         clb_ppe_intro,
         clb_ppe_tecnico,
         clb_ppe_tecnico2,
         vc2_pim_tipo,
         n_ppe_agrupamento,
         n_ppe_posicao_desc,
         n_ppe_grupos,
         n_ppe_lotes,
         n_ppe_dados_op,
         n_ppe_op_padrao,
         n_ppe_valor_agrup,
         clb_ppe_assist_tec,
         n_ppe_sumario,
         n_pin_consolida,
         n_lin_cod);
      /*
      ELSE
        UPDATE PROPOSTA_IMP
           SET PIM_TIPO = vc2_pim_tipo,
               PIM_AGRUPAMENTO = n_ppe_agrupamento,
               PIM_POSICAO_DESC = n_ppe_posicao_desc,
               PIM_GRUPOS = n_ppe_grupos,
               PIM_LOTES = n_ppe_lotes,
               PIM_DADOS_OP = n_ppe_dados_op,
               PIM_OP_PADRAO = n_ppe_op_padrao,
               PIM_VALOR_AGRUP = n_ppe_valor_agrup,
               PIM_ASSIST_TEC = clb_ppe_assist_tec,
               PIM_SUMARIO = n_ppe_sumario,
               LIN_COD = n_lin_cod
         WHERE PRP_CODIGO = n_prp_codigo
           */
    END IF;
  
  END SP_IMP_PADRAO;

  ----------------------------------------------------------
  -------- COPIA ITEM DA PROPOSTA  -------------------------
  ----------------------------------------------------------

  PROCEDURE SP_STATUS_CLI(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          v_tipo       IN VARCHAR2) IS
  
    v_cliente       VARCHAR2(200);
    v_status        SIAOS.CLIENTE.FLAGSUSPEN%TYPE;
    n_usu_chapa     SIAOS.USUARIO.USU_CHAPA%TYPE;
    v_usu_nome      SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email     SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_ger  SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_ger SIAOS.USUARIO.USU_EMAIL%TYPE;
    v_usu_nome_fin  SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email_fin SIAOS.USUARIO.USU_EMAIL%TYPE;
    n_order_no      SIAOS.PROPOSTA.ORDER_NO%TYPE;
    n_ifi_codigo    SIAOS.PROPOSTA.IFI_CODIGO%TYPE;
    n_emp_abertura  SIAOS.PROPOSTA.EMP_ABERTURA%TYPE;
    v_mensagem      VARCHAR2(100);
    v_status_txt    VARCHAR2(100);
    clb_texto       CLOB;
    clb_texto_det   CLOB;
    n_eml_numero    INTEGER;
    n_numpend       INTEGER;
    n_qtd_recado    INTEGER := 0;
    n_erro          INTEGER := 0;
    n_valor         NUMBER(11, 2);
  
  BEGIN
    -- v_status = 1  // Pendência Financeira (Somente Advertência)
    -- v_status = 2  // Cadastro Duplicado
    -- v_status = 3  // Pendência Financeira (BLOQUEIO PARCIAL - Abre propposta mas não OS)
    -- v_status = 4  // Pendência Financeira (BLOQUEIO TOTAL   - Não abre proposta e nem OS)
  
    IF v_tipo = 'P' THEN
    
      SELECT COUNT(*) QTD
        INTO n_qtd_recado
        FROM SIAOS.PROP_RECADO R
       WHERE R.PRP_CODIGO = n_prp_codigo
         AND R.TRE_CODIGO = 15;
    
    END IF;
  
    BEGIN
    
      SELECT TRIM(C.REDUZIDO),
             C.BLOQUEADO,
             P.ORDER_NO,
             P.IFI_CODIGO,
             P.EMP_ABERTURA
        INTO v_cliente, v_status, n_order_no, n_ifi_codigo, n_emp_abertura
        FROM SIAOS.PROPOSTA P
       INNER JOIN CLIENTE C
          ON C.CODIGO = P.CLI_CODIGO
       WHERE P.PRP_CODIGO = n_prp_codigo;
    
    EXCEPTION
      WHEN OTHERS THEN
        n_qtd_recado := 1;
        v_status     := 0;
    END;
  
    IF n_qtd_recado = 0 AND n_emp_abertura = 1 THEN
    
      SELECT C.CRS_DESC
        INTO v_status_txt
        FROM INTEGRACAO.CLIENTE_RISCO C
       WHERE C.CRS_COD_SIAOS = v_status;
    
      BEGIN
      
        SELECT U.USU_NOME,
               U.USU_EMAIL,
               U2.USU_NOME  AS USU_NOME_GER,
               U2.USU_EMAIL AS USU_EMAIL_GER,
               U2.USU_CHAPA
          INTO v_usu_nome,
               v_usu_email,
               v_usu_nome_ger,
               v_usu_email_ger,
               n_usu_chapa
          FROM VENDEDOR_PROP V
         INNER JOIN ARSALESP A
            ON V.SALESP_KEY = A.SALESP_KEY
         INNER JOIN USUARIO U
            ON A.USU_CHAPA = U.USU_CHAPA
         INNER JOIN CENTRO_CUSTO CC
            ON CC.CC_CODIGO = U.CC_CODIGO
         INNER JOIN USUARIO U2
            ON CC.USU_RESP_RH = U2.USU_CHAPA
         WHERE V.VPR_CODIGO = 1
           AND V.PRP_CODIGO = n_prp_codigo;
      
      EXCEPTION
        WHEN OTHERS THEN
        
          SELECT U.USU_NOME,
                 U.USU_EMAIL,
                 U2.USU_NOME  AS USU_NOME_GER,
                 U2.USU_EMAIL AS USU_EMAIL_GER,
                 U2.USU_CHAPA
            INTO v_usu_nome,
                 v_usu_email,
                 v_usu_nome_ger,
                 v_usu_email_ger,
                 n_usu_chapa
            FROM PROPOSTA V
           INNER JOIN USUARIO U
              ON V.USU_CHAPA = U.USU_CHAPA
            LEFT JOIN CENTRO_CUSTO CC
              ON CC.CC_CODIGO = U.CC_CODIGO
            LEFT JOIN USUARIO U2
              ON CC.USU_RESP_RH = U2.USU_CHAPA
           WHERE V.PRP_CODIGO = n_prp_codigo;
        
      END;
    
      n_valor := SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_prp_codigo,
                                                          0,
                                                          6);
    
      clb_texto_det := '<strong>Proposta:</strong> ' || n_prp_codigo ||
                       '<br>';
      clb_texto_det := clb_texto_det || '<strong>Vendedor:</strong> ' ||
                       v_usu_nome || '<br>';
      clb_texto_det := clb_texto_det || '<strong>Valor:</strong> ' ||
                       n_ifi_codigo || ' ' || n_valor || '<br>';
    
      
      IF n_order_no IS NOT NULL THEN
        v_mensagem    := SUBSTR('OS: ' || n_order_no || ' - ' || v_cliente ||
                                ', avaliar cliente com Pendência Financeira',
                                0,
                                100);
        clb_texto     := 'A OS ' || n_order_no ||
                         ' foi aberta e destina-se ao cliente ' ||
                         v_cliente || ' que possui ' || v_status_txt ||
                         '.<br><br>Favor verificar e contactar os responsáveis se necessário.';
        clb_texto_det := '<strong>OS:</strong> ' || n_order_no || '<br>' ||
                         clb_texto_det;
      ELSE
        v_mensagem := SUBSTR('Proposta: ' || n_prp_codigo || ' - ' ||
                             v_cliente ||
                             ', avaliar cliente com Pendência Financeira',
                             0,
                             100);
        clb_texto  := 'A Proposta ' || n_prp_codigo ||
                      ' foi aberta e destina-se ao cliente ' || v_cliente ||
                      ' que possui ' || v_status_txt ||
                      '.<br><br>Favor verificar e contactar os responsáveis se necessário.';
      END IF;
    
      IF v_status = 4 OR v_status = 2 OR (v_status = 3 AND v_tipo = 'P') THEN
      
        SIAOS.PCK_PENDENCIA.SP_GERA_PENDENCIA2(v_mensagem, NULL, 82, NULL, n_usu_chapa, NULL, n_numpend);
      
      ELSIF v_status = 1 AND v_tipo = 'OS' THEN
        BEGIN
        
          SELECT U.USU_CHAPA,
                 U.USU_NOME  AS USU_NOME_FIN,
                 U.USU_EMAIL AS USU_EMAIL_FIN
            INTO n_usu_chapa, v_usu_nome_fin, v_usu_email_fin
            FROM SIAOS.CENTRO_CUSTO CC
           INNER JOIN SIAOS.USUARIO U
              ON U.USU_CHAPA = CC.USU_DIRETOR
           WHERE CC.CC_CODIGO = '7.01.01.0';
        
        EXCEPTION WHEN OTHERS THEN
          
            ---Comentado em 24/03/2015 por solicitação do Cláudio
            SELECT U.USU_CHAPA,
                   U.USU_NOME  AS USU_NOME_FIN,
                   U.USU_EMAIL AS USU_EMAIL_FIN
              INTO n_usu_chapa, v_usu_nome_fin, v_usu_email_fin
              FROM SIAOS.USUARIO U
             WHERE U.USU_CHAPA = 2623;
          
        END;
      
        SIAOS.PCK_PENDENCIA.SP_GERA_PENDENCIA2(v_mensagem, NULL, 82, NULL, n_usu_chapa, NULL, n_numpend);
        
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL('smarnet@smar.com.br',
                                          v_usu_nome_fin || '<' || v_usu_email_fin || '>',
                                          NULL,
                                          NULL,
                                          v_mensagem,
                                          v_mensagem,
                                          clb_texto,
                                          'Cliente - ' || v_cliente,
                                          clb_texto_det,
                                          1,
                                          n_eml_numero);
      
      END IF;
    
      IF n_numpend IS NOT NULL THEN
        SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL('smarnet@smar.com.br',
                                          v_usu_nome || '<' || v_usu_email || '>',
                                          NULL,
                                          NULL,
                                          v_mensagem,
                                          v_mensagem,
                                          clb_texto,
                                          'Cliente - ' || v_cliente,
                                          clb_texto_det,
                                          1,
                                          n_eml_numero);
        IF v_usu_email_ger IS NOT NULL THEN
          SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL('smarnet@smar.com.br',
                                            v_usu_nome_ger || '<' || v_usu_email_ger || '>',
                                            NULL,
                                            NULL,
                                            v_mensagem,
                                            v_mensagem,
                                            clb_texto,
                                            'Cliente - ' || v_cliente,
                                            clb_texto_det,
                                            1,
                                            n_eml_numero);
        END IF;
        SIAOS.PCK_SMART_SALES3.SP_GRAVA_RECADO(1,
                                               NULL,
                                               n_prp_codigo,
                                               15,
                                               v_mensagem,
                                               NULL,
                                               n_usu_chapa,
                                               n_erro);
      END IF;
    
    END IF;
  
  END SP_STATUS_CLI;

  ----------------------------------------------------------
  -------- COPIA ITEM DA PROPOSTA  -------------------------
  ----------------------------------------------------------

  PROCEDURE SP_EMAIL_SISTEMA(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_cli_codigo IN SIAOS.PROPOSTA.CLI_CODIGO%TYPE) IS
  
    PRAGMA AUTONOMOUS_TRANSACTION;
  
    v_usu_nome   SIAOS.USUARIO.USU_NOME%TYPE;
    v_usu_email  SIAOS.USUARIO.USU_EMAIL%TYPE;
    c_vend_nome  SIAOS.ARSALESP.SALESPERSON%TYPE;
    v_cli_nome   VARCHAR2(300);
    vc2_assunto  VARCHAR2(600);
    clb_titulo   CLOB;
    clb_texto    CLOB;
    n_eml_numero INTEGER;
  
  BEGIN
  
    SELECT USU_NOME, USU_EMAIL
      INTO v_usu_nome, v_usu_email
      FROM SIAOS.USUARIO
     WHERE UPPER(USU_LOGINWEB) = UPPER(USER);
  
    SELECT V.SALESPERSON
      INTO c_vend_nome
      FROM VENDEDOR_PROP P
     INNER JOIN ARSALESP V
        ON P.SALESP_KEY = V.SALESP_KEY
     WHERE P.PRP_CODIGO = n_prp_codigo
       AND P.VPR_CODIGO = 1;
  
    IF n_cli_codigo IS NOT NULL THEN
    
      SELECT SUBSTR(TRIM(C.REDUZIDO), 0, 60)
        INTO v_cli_nome
        FROM SIAOS.CLIENTE C
       WHERE C.CODIGO = n_cli_codigo;
    
    ELSE
    
      SELECT C.CTE_NOME
        INTO v_cli_nome
        FROM SIAOS.CLIENTE_TEMP C
       WHERE C.PRP_CODIGO = n_prp_codigo;
    
    END IF;
  
    vc2_assunto := 'Proposta ' || n_prp_codigo || ' definda como Sistemas';
    clb_titulo  := 'Aviso de proposta de Sistemas';
    clb_texto   := 'A proposta nº ' || n_prp_codigo || ' do cliente ' ||
                   v_cli_nome ||
                   ' foi definida como proposta de Sistemas<br><br>';
    clb_texto   := clb_texto || 'O vendedor responsável é: ' || c_vend_nome;
  
    FOR cur_set IN (SELECT U.USU_NOME, U.USU_EMAIL
                      FROM SMARNET.ACESSO_FUNC AF
                     INNER JOIN USUARIO U
                        ON AF.USU_CHAPA = U.USU_CHAPA
                     WHERE AF.ACE_CODIGO = 1404) LOOP
    
      SIAOS.PCK_DQANET.SP_IN_HTML_EMAIL(v_usu_nome || '<' || v_usu_email || '>',
                                        cur_set.USU_NOME || '<' ||
                                        cur_set.USU_EMAIL || '>',
                                        NULL,
                                        NULL,
                                        vc2_assunto,
                                        clb_titulo,
                                        clb_texto,
                                        'Proposta:' || n_prp_codigo,
                                        'Cliente: ' || v_cli_nome ||
                                        '<br />Vendedor: ' || c_vend_nome,
                                        1,
                                        n_eml_numero);
    
    END LOOP;
  
  END SP_EMAIL_SISTEMA;

  ----------------------------------------------------------
  ---------------  GRAVA GRUPO DE DESCONTOS ----------------
  ----------------------------------------------------------
  PROCEDURE SP_GRUPO_DESC(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_gde_codigo IN OUT SIAOS.GRUPO_DESC.GDE_CODIGO%TYPE,
                          n_gde_tipo   IN SIAOS.GRUPO_DESC.GDE_TIPO%TYPE,
                          v_gde_nome   IN SIAOS.GRUPO_DESC.GDE_NOME%TYPE,
                          v_gde_ref    IN SIAOS.GRUPO_DESC.GDE_REF%TYPE,
                          n_erro       OUT INTEGER) IS
  
  BEGIN
    IF n_gde_codigo IS NOT NULL THEN
      SELECT GDE_CODIGO
        INTO n_gde_codigo
        FROM GRUPO_DESC G
       WHERE G.PRP_CODIGO = n_prp_codigo
         AND G.GDE_REF = v_gde_ref;
    END IF;
  
    IF n_gde_codigo IS NULL THEN
    
      SELECT NVL(MAX(GDE_CODIGO), 0) + 1
        INTO n_gde_codigo
        FROM GRUPO_DESC G
       WHERE G.PRP_CODIGO = n_prp_codigo;
    
      INSERT INTO GRUPO_DESC
        (PRP_CODIGO, GDE_CODIGO, GDE_TIPO, GDE_NOME, GDE_REF)
      VALUES
        (n_prp_codigo, n_gde_codigo, n_gde_tipo, v_gde_nome, v_gde_ref);
    
    ELSE
    
      UPDATE GRUPO_DESC
         SET PRP_CODIGO = n_prp_codigo,
             GDE_CODIGO = n_gde_codigo,
             GDE_TIPO   = n_gde_tipo,
             GDE_NOME   = v_gde_nome,
             GDE_REF    = v_gde_ref
       WHERE PRP_CODIGO = n_prp_codigo
         AND GDE_CODIGO = n_gde_codigo;
    
    END IF;
  
    COMMIT;
  
  EXCEPTION
    WHEN OTHERS THEN
      n_erro := 1;
  END SP_GRUPO_DESC;

  ----------------------------------------------------------
  ---------------  GRAVA GRUPO DE DESCONTOS ----------------
  ----------------------------------------------------------
  PROCEDURE SP_GRUPO_DESC_AUTO(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                               n_prp_item_prop IN SIAOS.ITEM_PROP_UNI.IPR_ITEM_PROP%TYPE,
                               n_erro          OUT INTEGER) IS
  
    n_gde_codigo SIAOS.GRUPO_DESC.GDE_CODIGO%TYPE;
  
  BEGIN
  
    IF n_prp_item_prop IS NULL THEN
      UPDATE ITEM_PROP_UNI
         SET GDE_CODIGO = NULL
       WHERE PRP_CODIGO = n_prp_codigo
         AND GDE_CODIGO IN (SELECT GDE_CODIGO
                              FROM GRUPO_DESC GD
                             WHERE GD.PRP_CODIGO = n_prp_codigo
                               AND GD.GDE_REF IS NOT NULL);
    
      COMMIT;
    
      DELETE GRUPO_DESC
       WHERE PRP_CODIGO = n_prp_codigo
         AND GDE_REF IS NOT NULL;
    
      COMMIT;
    
      FOR c_grupo IN (SELECT DISTINCT T.TIPO, T.CODIGO, T.FAMILIA
                        FROM VW_GR_DESC_REF T
                       WHERE PRP_CODIGO = n_prp_codigo
                       ORDER BY TIPO, FAMILIA) LOOP
        SP_GRUPO_DESC(n_prp_codigo,
                      n_gde_codigo,
                      c_grupo.TIPO,
                      c_grupo.FAMILIA,
                      c_grupo.CODIGO,
                      n_erro);
        n_gde_codigo := NULL;
      END LOOP;
    
      COMMIT;
    
      FOR c_item IN (SELECT T.IPR_ITEM_PROP, D.GDE_CODIGO
                       FROM VW_GR_DESC_REF T
                      INNER JOIN GRUPO_DESC D
                         ON T.PRP_CODIGO = D.PRP_CODIGO
                        AND T.CODIGO = D.GDE_REF
                      WHERE T.PRP_CODIGO = n_prp_codigo) LOOP
      
        UPDATE ITEM_PROP_UNI
           SET GDE_CODIGO = c_item.GDE_CODIGO
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_ITEM_PROP = c_item.IPR_ITEM_PROP;
      
      END LOOP;
    
    ELSE
    
      SELECT I.GDE_CODIGO
        INTO n_gde_codigo
        FROM ITEM_PROP_UNI I
       WHERE I.PRP_CODIGO = n_prp_codigo
         AND I.IPR_ITEM_PROP = n_prp_item_prop;
    
      IF n_gde_codigo IS NULL THEN
      
        FOR c_grupo IN (SELECT DISTINCT T.TIPO, T.CODIGO, T.FAMILIA
                          FROM VW_GR_DESC_REF T
                         WHERE PRP_CODIGO = n_prp_codigo
                           AND T.IPR_ITEM_PROP = n_prp_item_prop
                         ORDER BY TIPO, FAMILIA) LOOP
          SP_GRUPO_DESC(n_prp_codigo,
                        n_gde_codigo,
                        c_grupo.TIPO,
                        c_grupo.FAMILIA,
                        c_grupo.CODIGO,
                        n_erro);
        END LOOP;
      
        UPDATE ITEM_PROP_UNI
           SET GDE_CODIGO = n_gde_codigo
         WHERE PRP_CODIGO = n_prp_codigo
           AND IPR_ITEM_PROP = n_prp_item_prop;
      
        COMMIT;
      
      END IF;
    
    END IF;
  
    COMMIT;
  
    --  EXCEPTION  WHEN OTHERS THEN
    --    n_erro := 1;
  END SP_GRUPO_DESC_AUTO;

  ----------------------------------------------------------
  ---------------  CUSTO DOS ITENS -------------------------
  ----------------------------------------------------------
  -- VALOR UNITÁRIO DO CUSTO
  --
  FUNCTION SF_CUSTO_ITEM(n_prp_codigo    IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         n_ipr_item_prop IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE)
    RETURN VARCHAR2 IS
  
    n_custo  NUMBER(11, 2) := 0;
    n_custo1 NUMBER(11, 2) := 0;
    n_custo2 NUMBER(11, 2) := 0;
    n_custo3 NUMBER(11, 2) := 0;
    n_custo4 NUMBER(11, 2) := 0;
  
  BEGIN
  
    SELECT NVL((IU.IPU_VLCUSTO), 0) C,
           NVL((I.IPR_PRECO + I.IPR_ADICIONAL), 0) * 0.35 C2,
           NVL(IU.IPU_VALOR_COTADO, 0) C3,
           NVL(I.IPR_VENDA_CLI, 0) C4
      INTO n_custo1, n_custo2, n_custo3, n_custo4
      FROM ITEM_PROP I
     INNER JOIN ITEM_PROP_UNI IU
        ON IU.PRP_CODIGO = I.PRP_CODIGO
       AND IU.IPR_ITEM_PROP = I.IPR_ITEM_PROP
     WHERE I.PRP_CODIGO = n_prp_codigo
       AND I.IPR_ITEM_PROP = n_ipr_item_prop
       AND NVL(IU.MSV_CODIGO, 0) != 7
       AND ROWNUM = 1;
  
    IF n_custo1 > 0 THEN
      n_custo := n_custo1;
    ELSIF n_custo2 > 0 THEN
      n_custo := n_custo2;
    ELSIF n_custo3 > 0 THEN
      n_custo := n_custo3;
    ELSIF n_custo4 > 0 THEN
      n_custo := n_custo4;
    END IF;
  
    IF n_custo < (n_custo4 * 0.1) THEN
      n_custo := (n_custo4 * 0.30);
    END IF;
  
    RETURN n_custo;
  
  END SF_CUSTO_ITEM;

  ----------------------------------------------------------
  ---------------  GRAVA GRUPO DE DESPESAS -----------------
  ----------------------------------------------------------
  PROCEDURE SP_GRUPO_DESP(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_gde_codigo IN SIAOS.GRUPO_DESC.GDE_CODIGO%TYPE,
                          n_pcd_porc   IN SIAOS.PROP_CUSTO_DIAS.PCD_PORCENTO%TYPE,
                          n_pcd_dias   IN SIAOS.PROP_CUSTO_DIAS.PCD_DIAS%TYPE,
                          n_erro       OUT INTEGER) IS
  
    n_pcd_codigo SIAOS.PROP_CUSTO_DIAS.PCD_CODIGO%TYPE;
    n_limite     SIAOS.PROP_CUSTO_DIAS.PCD_PORCENTO%TYPE;
  
  BEGIN
  
    SELECT NVL(MAX(C.PCD_CODIGO), 0) + 1
      INTO n_pcd_codigo
      FROM SIAOS.PROP_CUSTO_DIAS C
     WHERE C.PRP_CODIGO = n_prp_codigo;
  
    SELECT nvl(SUM(PCD_PORCENTO), 0)
      INTO n_limite
      FROM SIAOS.PROP_CUSTO_DIAS C
     WHERE C.PRP_CODIGO = n_prp_codigo
       AND C.GDE_CODIGO = n_gde_codigo;
  
    IF n_limite + n_pcd_porc <= 100 THEN
      INSERT INTO PROP_CUSTO_DIAS
        (PRP_CODIGO, PCD_CODIGO, GDE_CODIGO, PCD_PORCENTO, PCD_DIAS)
      VALUES
        (n_prp_codigo, n_pcd_codigo, n_gde_codigo, n_pcd_porc, n_pcd_dias);
    ELSE
      n_erro := 2;
    END IF;
  
    COMMIT;
  
  EXCEPTION WHEN OTHERS THEN
      n_erro := 1;
  END SP_GRUPO_DESP;

  ----------------------------------------------------------
  ---------------  GRAVA GRUPO DE DESPESAS -----------------
  ----------------------------------------------------------
  PROCEDURE SP_CK_LIST(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                       n_plc_notas  IN SIAOS.PROP_CKLIST.PLC_NOTAS%TYPE,
                       vc2_array    IN VARCHAR2) IS
  
    n_qtd       INTEGER;
    n_usu_chapa SIAOS.USUARIO.USU_CHAPA%TYPE;
  
  BEGIN
  
    SELECT NVL(COUNT(*), 0) QTD
      INTO n_qtd
      FROM SIAOS.PROP_CKLIST
     WHERE PRP_CODIGO = n_prp_codigo;
  
    n_usu_chapa := SIAOS.PCK_DQANET.SF_USU_CHAPA_USER;
  
    IF n_qtd > 0 THEN
    
      UPDATE SIAOS.PROP_CKLIST
         SET PLC_NOTAS   = n_plc_notas,
             PLC_DT_ABRE = SYSDATE,
             USU_CHAPA   = n_usu_chapa
       WHERE PRP_CODIGO = n_prp_codigo;
    
    ELSE
    
      INSERT INTO SIAOS.PROP_CKLIST
        (PRP_CODIGO, PLC_NOTAS, PLC_DT_ABRE, USU_CHAPA)
      VALUES
        (n_prp_codigo, n_plc_notas, SYSDATE, n_usu_chapa);
    
    END IF;
  
    DELETE SIAOS.PROP_CKLIST_DIV WHERE PRP_CODIGO = n_prp_codigo;
  
    COMMIT;
  
    FOR c_pastas IN (SELECT T.COLUMN_VALUE ITEM
                       FROM TABLE(PCK_DQANET.SF_SPLIT(vc2_array, ',')) T) LOOP
    
      INSERT INTO SIAOS.PROP_CKLIST_DIV
        (PRP_CODIGO, PCO_CODIGO)
      VALUES
        (n_prp_codigo, c_pastas.ITEM);
    
    END LOOP;
  
    COMMIT;
  
    --  EXCEPTION  WHEN OTHERS THEN
    --    n_erro := 1;
  END SP_CK_LIST;

  ----------------------------------------------------------
  --------------- AJUSTA VERSÃO DA PROPOSTA ----------------
  ----------------------------------------------------------
  PROCEDURE SP_CK_VERSAO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
    n_ori_codigo SIAOS.PROPOSTA.ORI_CODIGO%TYPE;
    n_top_codigo SIAOS.PROPOSTA.TOP_CODIGO%TYPE;
    n_ipr_preco  SIAOS.ITEM_PROP.IPR_PRECO%TYPE;
    n_versao     INTEGER;
  
  BEGIN
  
    SELECT TO_NUMBER(REPLACE(P.PRP_SIST_VERSAO, '.', '')) PRP_SIST_VERSAO,
           P.ORI_CODIGO
      INTO n_versao, n_ori_codigo
      FROM SIAOS.PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    IF n_versao < 304000 THEN
    
      FOR cur_item IN (SELECT IPR_ITEM_PROP
                         FROM SIAOS.ITEM_PROP_UNI
                        WHERE PRP_CODIGO = n_prp_codigo) LOOP
      
        SIAOS.PCK_SMART_SALES3.SP_ATUALIZA_PRECO_LISTA(n_prp_codigo,
                                                       cur_item.IPR_ITEM_PROP,
                                                       n_ipr_preco);
      
      END LOOP;
    
      IF n_ori_codigo = 'CO' THEN
        n_top_codigo := 2;
      ELSE
        n_top_codigo := 1;
      END IF;
    
      UPDATE SIAOS.PROPOSTA P
         SET P.PRP_SIST_VERSAO = '3.04.000', P.TOP_CODIGO = n_top_codigo
       WHERE P.PRP_CODIGO = n_prp_codigo;
    
    END IF;
  
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END SP_CK_VERSAO;

  ----------------------------------------------------------
  --------------- CALCULA O VALOR DO GRUPO -----------------
  ----------------------------------------------------------
  FUNCTION SF_VALOR_DO_GRUPO(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_ipg_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_tipo       IN NUMBER,
                             n_hierarquia IN NUMBER) RETURN NUMBER IS
  
    n_valor  NUMBER := 0;
    n_valorL NUMBER := 0;
    n_valorI NUMBER := 0;
  
  BEGIN
  
    SELECT NVL(SUM(DECODE(G.IPG_NAO_SOMAR, 1, 0, IP.IPR_VENDA_CLI) *
                   IP.IPR_QUANTIDADE),
               0),
           NVL(SUM(DECODE(G.IPG_NAO_SOMAR, 1, 0, IP.IPR_VENDA_CLI_IMP) *
                   IP.IPR_QUANTIDADE),
               0)
      INTO n_valorL, n_valorI
      FROM ITEM_PROP_GRUPO G
     INNER JOIN SIAOS.VW_ITENS_PROPOSTA IP
        ON IP.PRP_CODIGO = G.PRP_CODIGO
       AND IP.IPG_CODIGO = G.IPG_CODIGO
     WHERE G.PRP_CODIGO = n_prp_codigo
       AND G.IPG_CODIGO = n_ipg_codigo
       AND IP.IPR_ITEM_PAI IS NULL;
  
    IF n_tipo = 2 THEN
      n_valor := n_valorL + n_valorI;
    ELSE
      n_valor := n_valorL;
    END IF;
  
    n_valorL := 0;
    n_valorI := 0;
  
    SELECT NVL(SUM(DECODE(G.IPG_NAO_SOMAR, 1, 0, IP.IPR_VENDA_CLI) *
                   IP.IPR_QUANTIDADE),
               0),
           NVL(SUM(DECODE(G.IPG_NAO_SOMAR, 1, 0, IP.IPR_VENDA_CLI_IMP) *
                   IP.IPR_QUANTIDADE),
               0)
      INTO n_valorL, n_valorI
      FROM ITEM_PROP_GRUPO G
     INNER JOIN SIAOS.VW_ITENS_PROPOSTA IP
        ON IP.PRP_CODIGO = G.PRP_CODIGO
       AND IP.IPG_CODIGO = G.IPG_CODIGO
     WHERE (IP.PRP_CODIGO, IP.IPR_ITEM_PAI) IN
           (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
              FROM ITEM_PROP_GRUPO G2
             INNER JOIN SIAOS.VW_ITENS_PROPOSTA IP2
                ON IP2.PRP_CODIGO = G2.PRP_CODIGO
               AND IP2.IPG_CODIGO = G2.IPG_CODIGO
             WHERE G2.PRP_CODIGO = n_prp_codigo
               AND G2.IPG_CODIGO = n_ipg_codigo);
  
    IF n_tipo = 2 THEN
      n_valor := n_valorL + n_valorI + n_valor;
    ELSE
      n_valor := n_valorL + n_valor;
    END IF;
  
    FOR c_grp IN (SELECT DISTINCT G.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO G
                   WHERE G.PRP_CODIGO = n_prp_codigo
                     AND G.IPG_CODIGO_PAI = n_ipg_codigo) LOOP
    
      IF NVL(n_hierarquia, 0) = 1 THEN
        n_valor := n_valor + SF_VALOR_DO_GRUPO(n_prp_codigo,
                                               c_grp.IPG_CODIGO,
                                               n_tipo,
                                               n_hierarquia);
      END IF;
    
    END LOOP;
  
    RETURN(n_valor);
  
  END SF_VALOR_DO_GRUPO;

  ----------------------------------------------------------
  --------------- CALCULA O VALOR DO GRUPO FINAL -----------------
  ----------------------------------------------------------
  FUNCTION SF_VALOR_DO_GRUPO_FIM(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_ipg_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                             n_tipo       IN NUMBER,
                             n_hierarquia IN NUMBER) RETURN NUMBER IS
  
    n_valor  NUMBER := 0;
    n_valorL NUMBER := 0;
    n_valorI NUMBER := 0;
  
  BEGIN
  
    SELECT NVL(SUM(DECODE(G.IPG_NAO_SOMAR, 1, 0, IP.IPR_VENDA_FIM) *
                   IP.IPR_QUANTIDADE),
               0),
           NVL(SUM(DECODE(G.IPG_NAO_SOMAR, 1, 0, IP.IPR_VENDA_FIM) *
                   IP.IPR_QUANTIDADE),
               0)
      INTO n_valorL, n_valorI
      FROM ITEM_PROP_GRUPO G
     INNER JOIN SIAOS.VW_ITENS_PROPOSTA IP
        ON IP.PRP_CODIGO = G.PRP_CODIGO
       AND IP.IPG_CODIGO = G.IPG_CODIGO
     WHERE G.PRP_CODIGO = n_prp_codigo
       AND G.IPG_CODIGO = n_ipg_codigo
       AND IP.IPR_ITEM_PAI IS NULL;
  
    IF n_tipo = 2 THEN
      n_valor := n_valorL + n_valorI;
    ELSE
      n_valor := n_valorL;
    END IF;
  
    n_valorL := 0;
    n_valorI := 0;
  
    SELECT NVL(SUM(DECODE(G.IPG_NAO_SOMAR, 1, 0, IP.IPR_VENDA_FIM) *
                   IP.IPR_QUANTIDADE),
               0),
           NVL(SUM(DECODE(G.IPG_NAO_SOMAR, 1, 0, IP.IPR_VENDA_FIM) *
                   IP.IPR_QUANTIDADE),
               0)
      INTO n_valorL, n_valorI
      FROM ITEM_PROP_GRUPO G
     INNER JOIN SIAOS.VW_ITENS_PROPOSTA IP
        ON IP.PRP_CODIGO = G.PRP_CODIGO
       AND IP.IPG_CODIGO = G.IPG_CODIGO
     WHERE (IP.PRP_CODIGO, IP.IPR_ITEM_PAI) IN
           (SELECT IP2.PRP_CODIGO, IP2.IPR_ITEM_PROP
              FROM ITEM_PROP_GRUPO G2
             INNER JOIN SIAOS.VW_ITENS_PROPOSTA IP2
                ON IP2.PRP_CODIGO = G2.PRP_CODIGO
               AND IP2.IPG_CODIGO = G2.IPG_CODIGO
             WHERE G2.PRP_CODIGO = n_prp_codigo
               AND G2.IPG_CODIGO = n_ipg_codigo);
  
    IF n_tipo = 2 THEN
      n_valor := n_valorL + n_valorI + n_valor;
    ELSE
      n_valor := n_valorL + n_valor;
    END IF;
  
    FOR c_grp IN (SELECT DISTINCT G.IPG_CODIGO
                    FROM ITEM_PROP_GRUPO G
                   WHERE G.PRP_CODIGO = n_prp_codigo
                     AND G.IPG_CODIGO_PAI = n_ipg_codigo) LOOP
    
      IF NVL(n_hierarquia, 0) = 1 THEN
        n_valor := n_valor + SF_VALOR_DO_GRUPO(n_prp_codigo,
                                               c_grp.IPG_CODIGO,
                                               n_tipo,
                                               n_hierarquia);
      END IF;
    
    END LOOP;
  
    RETURN(n_valor);
  
  END SF_VALOR_DO_GRUPO_FIM;
  
  ----------------------------------------------------------------------
  -- Retorna dados geral do IQV ----------------------------------------
  ----------------------------------------------------------------------

  FUNCTION SF_PRPOSTA_IQV(n_prp_numero IN NUMBER) RETURN NUMBER IS

    n_vl_lista       SIAOS.ITEM_PROP.IPR_PRECO%TYPE := 0;
    n_vl_adicional   SIAOS.ITEM_PROP.IPR_ADICIONAL%TYPE := 0;
    n_vl_cotado      SIAOS.ITEM_PROP_UNI.IPU_VALOR_COTADO%TYPE := 0;
    n_vl_venda       SIAOS.ITEM_PROP.IPR_VENDA_CLI%TYPE := 0;
    n_iqv            NUMBER := 0;
    dt_aval          DATE := SYSDATE;

  BEGIN
    /*
    SELECT NVL(SUM(NVL(IPR_PRECO, 0) * IP.IPR_QUANTIDADE), 0) IPR_PRECO,
           NVL(SUM(NVL(IPR_ADICIONAL, 0) * IP.IPR_QUANTIDADE), 0) IPR_ADICIONAL,
           NVL(SUM(NVL(IPU.IPU_VALOR_COTADO, 0) * IP.IPR_QUANTIDADE), 0) IPU_VALOR_COTADO,
           NVL(SUM(NVL(IP.IPR_VENDA_CLI, 0) * IP.IPR_QUANTIDADE), 0) VENDA_CLI
      INTO n_vl_lista, n_vl_adicional, n_vl_cotado, n_vl_venda
      FROM SIAOS.ITEM_PROP IP
     INNER JOIN SIAOS.ITEM_PROP_UNI IPU ON IP.PRP_CODIGO = IPU.PRP_CODIGO
                                       AND IP.IPR_ITEM_PROP = IPU.IPR_ITEM_PROP
     WHERE IPU.MSV_CODIGO IS NULL
       AND SIAOS.PCK_SMART_SALES3.SF_EH_DESPESA(IP.PRO_CODIGO) = 0
       AND IP.PRP_CODIGO = n_prp_numero
       AND IP.IPG_CODIGO NOT IN (SELECT IPG.IPG_CODIGO
                                   FROM ITEM_PROP_GRUPO IPG
                                  WHERE IPG.PRP_CODIGO = IP.PRP_CODIGO
                                    AND IPG.IPG_NAO_SOMAR = 1);

*/
    SELECT NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_prp_numero,0,13),0) TOTAL_EST,
           NVL(SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_prp_numero,0,14),0) TOTAL_AVAL
      INTO n_vl_lista, n_vl_venda
      FROM DUAL;

    n_iqv := SIAOS.PCK_COMISSAO.SF_CALC_ITEM_IQV(n_vl_lista, n_vl_adicional, n_vl_cotado, n_vl_venda, dt_aval);
    
    RETURN n_iqv;

  EXCEPTION WHEN OTHERS THEN
    RETURN n_iqv;
  END SF_PRPOSTA_IQV;

  ----------------------------------------------------------
  -------- COPIA PROPOSTA/OS EMITIDAS  ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_COPIA_CAB(n_prp_codigo      IN  SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                         n_prp_codigo_novo OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
    --n_cop_numero     INTEGER;
    --n_erro           INTEGER;
    n_usu_chapa INTEGER;
  
  BEGIN
  
    FOR cur_prop IN (SELECT FIL_CODIGO,
                            IDI_CODIGO_MANUAL,
                            CLI_CODIGO,
                            CLI_CODIGO_FIM,
                            IFI_CODIGO,
                            PRP_COB_CODIGO,
                            PRP_REAJUSTE,
                            PRP_DT_REAJUSTE,
                            PRP_MULTA,
                            PRP_FINAME,
                            PRP_TRANSPORTE,
                            PRP_EMB_CODIGO,
                            PRP_CARTA_FIANCA,
                            PRP_SEG_FIANCA,
                            PRP_NOTA_PROM,
                            PRP_DESTINO,
                            PRP_PARCIAL,
                            PRP_ANTECIPA,
                            PRP_ENGENHARIA,
                            PRP_INSP_EXTERNA,
                            PRP_DT_INSP,
                            PRP_OBS,
                            PRP_NOTA,
                            PRP_IPI,
                            PRP_ICMS,
                            PRP_ISS,
                            ORI_CODIGO,
                            PRP_PORC_PRODUTO,
                            PRP_CONFIRMA,
                            PRP_EMBALAGEM,
                            PRP_VL_EMBALAGEM,
                            PRP_SUBSIDIARIA,
                            PRP_REPR_DIRETO,
                            PRP_REPR_INDIRETO,
                            PRP_FORWARDER,
                            PRP_PORTO_EMB,
                            PRP_PORTO_DEST,
                            PRP_HA_INVOICE,
                            PRP_COMISSAO_SUBS,
                            PST_CODIGO,
                            COO_COMERCIAL,
                            COO_TECNICO,
                            PRP_CAMBIO,
                            PRP_TIPO_FATUR,
                            COUNTRY_KEY,
                            CLASS_KEY,
                            PRP_DOCUM_CERTIF,
                            EMISSOR,
                            PRP_CONT_COM,
                            PRP_CONT_TEC,
                            PRP_CONT_FIN,
                            PRP_SIST_VERSAO,
                            PRP_EXPORTACAO,
                            PRP_MEDIA_MANUAL,
                            TERR_KEY,
                            EMP_ABERTURA,
                            PRP_VALIDADE
                       FROM SIAOS.PROPOSTA
                      WHERE PROPOSTA.PRP_CODIGO = n_prp_codigo) LOOP
    
      SELECT USU_CHAPA
        INTO n_usu_chapa
        FROM SIAOS.USUARIO
       WHERE UPPER(USU_LOGINWEB) = UPPER(USER);
    
      SIAOS.PCK_SMART_SALES3.SP_NOVA_PROPOSTA(USER,
                                              n_usu_chapa,
                                              cur_prop.CLI_CODIGO,
                                              cur_prop.ORI_CODIGO,
                                              n_prp_codigo_novo);
    
      SIAOS.PCK_SMART_SALES3.SP_UP_CLIENTE_FIM(n_prp_codigo_novo,
                                               cur_prop.CLI_CODIGO_FIM);
    
      IF cur_prop.CLI_CODIGO IS NULL THEN
      
        BEGIN
        
          INSERT INTO SIAOS.CLIENTE_TEMP
            (PRP_CODIGO,
             CTE_NOME,
             CTE_ENDERECO1,
             CTE_ENDERECO2,
             CTE_ENDERECO3,
             CTE_CIDADE,
             EST_CODIGO,
             CTE_ESTADO,
             PAI_CODIGO,
             CTE_CEP,
             CTE_TELEFONE,
             CTE_FAX,
             CTE_EMAIL,
             CTE_CGC,
             CTE_IE)
          
            SELECT n_prp_codigo_novo PRP_CODIGO,
                   CTE_NOME,
                   CTE_ENDERECO1,
                   CTE_ENDERECO2,
                   CTE_ENDERECO3,
                   CTE_CIDADE,
                   EST_CODIGO,
                   CTE_ESTADO,
                   PAI_CODIGO,
                   CTE_CEP,
                   CTE_TELEFONE,
                   CTE_FAX,
                   CTE_EMAIL,
                   CTE_CGC,
                   CTE_IE
              FROM CLIENTE_TEMP
             WHERE PRP_CODIGO = n_prp_codigo;
        
        EXCEPTION
          WHEN OTHERS THEN
          
            NULL;
          
        END;
      
      END IF;
    
    END LOOP;
  
    COMMIT;
  
  END SP_COPIA_CAB;

  ----------------------------------------------------------
  -------- COPIA PROPOSTA/OS EMITIDAS  ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_EXPORT_GRP(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_grupo           IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                          n_prp_codigo_novo IN OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
    n_grupo_novo     INTEGER;
    n_ipg_codigo_pai INTEGER;
  
  BEGIN
  
    IF n_prp_codigo_novo IS NULL THEN
      SP_COPIA_CAB(n_prp_codigo, n_prp_codigo_novo);
    END IF;
  
    FOR c_grupo IN (SELECT *
                      FROM SIAOS.ITEM_PROP_GRUPO IPG
                     WHERE IPG.PRP_CODIGO = n_prp_codigo
                       AND IPG.IPG_CODIGO = n_grupo) LOOP
      IF c_grupo.IPG_CODIGO_PAI IS NOT NULL THEN
        SELECT IPG.GRUPO_OS
          INTO n_ipg_codigo_pai
          FROM SIAOS.ITEM_PROP_GRUPO IPG
         WHERE IPG.PRP_CODIGO = n_prp_codigo
           AND IPG.IPG_CODIGO = c_grupo.IPG_CODIGO_PAI;
      END IF;
    
      SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_grupo_novo,
                                            n_prp_codigo_novo,
                                            c_grupo.IPG_NOME,
                                            c_grupo.IPG_POSICAO,
                                            n_ipg_codigo_pai);
    
      UPDATE SIAOS.ITEM_PROP_GRUPO IPG
         SET IPG.GRUPO_OS = n_grupo_novo
       WHERE IPG.PRP_CODIGO = n_prp_codigo
         AND IPG.IPG_CODIGO = n_grupo;
    
      UPDATE SIAOS.ITEM_PROP_GRUPO IPG
         SET IPG.IPG_DESCRICAO = c_grupo.IPG_DESCRICAO
       WHERE IPG.PRP_CODIGO = n_prp_codigo_novo
         AND IPG.IPG_CODIGO = n_grupo_novo;
    
      COMMIT;
    
      FOR c_grupo IN (SELECT *
                        FROM SIAOS.ITEM_PROP_GRUPO IPG
                       WHERE IPG.PRP_CODIGO = n_prp_codigo
                         AND IPG.IPG_CODIGO = n_grupo) LOOP
        SP_EXPORT_ITN_GRP(n_prp_codigo,
                          n_grupo,
                          n_prp_codigo_novo,
                          n_grupo_novo);
      END LOOP;
    
    END LOOP;
  
    FOR c_grupo IN (SELECT *
                      FROM SIAOS.ITEM_PROP_GRUPO IPG
                     WHERE IPG.PRP_CODIGO = n_prp_codigo
                       AND IPG.IPG_CODIGO_PAI = n_grupo) LOOP
      SP_EXPORT_GRP(n_prp_codigo, c_grupo.IPG_CODIGO, n_prp_codigo_novo);
    END LOOP;
  
    BEGIN
      DELETE SIAOS.ITEM_PROP_GRUPO IPG
       WHERE IPG.PRP_CODIGO = n_prp_codigo
         AND IPG.IPG_CODIGO = n_grupo;
    EXCEPTION
      WHEN OTHERS THEN
        NULL;
    END;
  
    COMMIT;
  
  END SP_EXPORT_GRP;

  ----------------------------------------------------------
  -------- COPIA PROPOSTA/OS EMITIDAS  ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_EXPORT_ITN_GRP(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              n_grupo           IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                              n_prp_codigo_novo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                              n_grupo_novo      IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE) IS
  BEGIN
    --ALTER TABLE products DISABLE CONSTRAINT fk_supplier;
    /*
    UPDATE ITEM_PROP_UNI IPU
       SET IPU.PRP_CODIGO = n_prp_codigo_novo,
           IPU.GDE_CODIGO = ''
     WHERE (IPU.PRP_CODIGO, IPU.IPR_ITEM_PROP) IN (SELECT IP.PRP_CODIGO,
                                                          IP.IPR_ITEM_PROP
                                                     FROM ITEM_PROP IP
                                                    WHERE IP.PRP_CODIGO = n_prp_codigo
                                                      AND IP.IPG_CODIGO = n_grupo);
    
    UPDATE ITEM_PROP IP
       SET IP.PRP_CODIGO = n_prp_codigo_novo,
           IP.IPG_CODIGO = n_grupo_novo
     WHERE IP.PRP_CODIGO = n_prp_codigo
       AND IP.IPG_CODIGO = n_grupo;
    */
    FOR c_grupo IN (SELECT IP.PRP_CODIGO, IP.IPR_ITEM_PROP
                      FROM ITEM_PROP IP
                     WHERE IP.PRP_CODIGO = n_prp_codigo
                       AND IP.IPG_CODIGO = n_grupo) LOOP
      SIAOS.PCK_SMART_SALES3.SP_EXPORT_ITN(c_grupo.PRP_CODIGO,
                                           c_grupo.IPR_ITEM_PROP,
                                           n_prp_codigo_novo,
                                           n_grupo_novo);
    END LOOP;
  
    COMMIT;
  
  END SP_EXPORT_ITN_GRP;

  ----------------------------------------------------------
  -------- COPIA PROPOSTA/OS EMITIDAS  ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_EXPORT_ITN(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_item_prop       IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                          n_prp_codigo_novo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                          n_grupo_novo      IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE) IS
  BEGIN
    --ALTER TABLE products DISABLE CONSTRAINT fk_item_p_uni#item_prop  (item_prop_uni) ;
  
    UPDATE ITEM_PROP_UNI IPU
       SET IPU.PRP_CODIGO = n_prp_codigo_novo, IPU.GDE_CODIGO = ''
     WHERE IPU.PRP_CODIGO = n_prp_codigo
       AND IPU.IPR_ITEM_PROP = n_item_prop;
  
    UPDATE ITEM_PROP IP
       SET IP.PRP_CODIGO = n_prp_codigo_novo, IP.IPG_CODIGO = n_grupo_novo
     WHERE IP.PRP_CODIGO = n_prp_codigo
       AND IP.IPR_ITEM_PROP = n_item_prop;
  
    COMMIT;
  
  END SP_EXPORT_ITN;

  ----------------------------------------------------------
  -------- COPIA PROPOSTA/OS EMITIDAS  ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_EXPORT_PCLI(n_prp_codigo      IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                           n_item_prop       IN SIAOS.ITEM_PROP.IPR_ITEM_PROP%TYPE,
                           n_prp_codigo_novo IN OUT SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
  
    n_ipg_codigo  SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE;
    c_pro_codigo  CADBASICO.ITEM_NEGOCIO.INE_CODIGO%TYPE;
    n_ipg_codigo2 SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE;
    vc2_ipg_nome  SIAOS.ITEM_PROP_GRUPO.IPG_NOME%TYPE := 'EQUIPAMENTOS DO CLIENTE ENTREGUES PARA REVISÃO';
    vc2_ipg_nome2 SIAOS.ITEM_PROP_GRUPO.IPG_NOME%TYPE := 'SERVIÇOS DE REVISÃO DE EQUIPAMENTOS';
  
  BEGIN
  
    SELECT DISTINCT TRIM(PRO_CODIGO)
      INTO c_pro_codigo
      FROM SIAOS.ITEM_PROP IP
     WHERE IP.PRP_CODIGO = n_prp_codigo
       AND IP.IPR_ITEM_PROP = n_item_prop;
  
    IF SUBSTR(c_pro_codigo, 1, 4) = 'PCLI' THEN
    
      IF n_prp_codigo_novo IS NULL THEN
        SP_COPIA_CAB(n_prp_codigo, n_prp_codigo_novo);
        UPDATE SIAOS.PROPOSTA P
           SET P.PRP_CODIGO_REF = n_prp_codigo
         WHERE P.PRP_CODIGO = n_prp_codigo_novo;
        COMMIT;
        n_ipg_codigo := NULL;
      ELSE
        SELECT MIN(IPG.IPG_CODIGO)
          INTO n_ipg_codigo
          FROM ITEM_PROP_GRUPO IPG
         WHERE PRP_CODIGO = n_prp_codigo_novo
           AND IPG_NOME = vc2_ipg_nome;
      END IF;
    
      IF n_ipg_codigo IS NULL THEN
        SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_ipg_codigo,
                                              n_prp_codigo_novo,
                                              vc2_ipg_nome,
                                              NULL,
                                              NULL);
        SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_ipg_codigo2,
                                              n_prp_codigo_novo,
                                              vc2_ipg_nome2,
                                              NULL,
                                              NULL);
      END IF;
    
      COMMIT;
    
      FOR c_grupo IN (SELECT IP.PRP_CODIGO,
                             R.IPR_CODIGO,
                             R.IPG_CODIGO,
                             R.IPG_CODIGO_SV,
                             R.IPG_CODIGO_PC
                        FROM SIAOS.ITEM_PROP IP
                       INNER JOIN SGC.REVISAO R
                          ON R.IPR_CODIGO = IP.IPR_CODIGO
                       WHERE IP.PRP_CODIGO = n_prp_codigo
                         AND IP.IPR_ITEM_PROP = n_item_prop) LOOP
        SIAOS.PCK_SMART_SALES3.SP_EXPORT_GRUPOS_REV(n_prp_codigo,
                                                    n_prp_codigo_novo,
                                                    c_grupo.IPR_CODIGO,
                                                    c_grupo.IPG_CODIGO,
                                                    c_grupo.IPG_CODIGO_SV,
                                                    c_grupo.IPG_CODIGO_PC);
      END LOOP;
    
      COMMIT;
    
      SIAOS.PCK_SMART_SALES3.SP_EXPORT_ITN(n_prp_codigo,
                                           n_item_prop,
                                           n_prp_codigo_novo,
                                           n_ipg_codigo);
    
      COMMIT;
    
    END IF;
  
  END SP_EXPORT_PCLI;

  ----------------------------------------------------------
  -------- COPIA PROPOSTA/OS EMITIDAS  ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_EXPORT_GRUPOS_REV(n_prp_codigo      IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                 n_prp_codigo_novo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                 n_ipr_codigo      IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                                 n_ipg_codigo      IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                                 n_ipg_codigo_sv   IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                                 n_ipg_codigo_pc   IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE) IS
  
    n_grupo_novo     INTEGER;
    n_ipg_codigo_pai INTEGER := 2;
  
  BEGIN
  
    SIAOS.PCK_SMART_SALES3.SP_EXPORT_GRUPO_REV(n_prp_codigo,
                                               n_ipr_codigo,
                                               n_prp_codigo_novo,
                                               n_ipg_codigo,
                                               0,
                                               n_ipg_codigo_pai,
                                               n_grupo_novo);
  
    n_ipg_codigo_pai := n_grupo_novo;
  
    SIAOS.PCK_SMART_SALES3.SP_EXPORT_GRUPO_REV(n_prp_codigo,
                                               n_ipr_codigo,
                                               n_prp_codigo_novo,
                                               n_ipg_codigo_sv,
                                               1,
                                               n_ipg_codigo_pai,
                                               n_grupo_novo);
  
    SIAOS.PCK_SMART_SALES3.SP_EXPORT_GRUPO_REV(n_prp_codigo,
                                               n_ipr_codigo,
                                               n_prp_codigo_novo,
                                               n_ipg_codigo_pc,
                                               2,
                                               n_ipg_codigo_pai,
                                               n_grupo_novo);
  
  END SP_EXPORT_GRUPOS_REV;

  ----------------------------------------------------------
  -------- COPIA PROPOSTA/OS EMITIDAS  ---------------------
  ----------------------------------------------------------

  PROCEDURE SP_EXPORT_GRUPO_REV(n_prp_codigo      IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_ipr_codigo      IN SIAOS.ITEM_PROP.IPR_CODIGO%TYPE,
                                n_prp_codigo_novo IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_ipg_codigo      IN SIAOS.ITEM_PROP_GRUPO.IPG_CODIGO%TYPE,
                                n_tipo_insumo     IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_ipg_codigo_pai  IN SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE,
                                n_grupo_novo      OUT SIAOS.ITEM_PROP_GRUPO.PRP_CODIGO%TYPE) IS
  
  BEGIN
  
    FOR c_grupo IN (SELECT *
                      FROM SIAOS.ITEM_PROP_GRUPO IPG
                     WHERE IPG.PRP_CODIGO = n_prp_codigo
                       AND IPG.IPG_CODIGO = n_ipg_codigo)
    
     LOOP
    
      SIAOS.PCK_SMART_SALES3.SP_EDITA_GRUPO(n_grupo_novo,
                                            n_prp_codigo_novo,
                                            c_grupo.IPG_NOME,
                                            c_grupo.IPG_POSICAO,
                                            n_ipg_codigo_pai);
    
      COMMIT;
    
      UPDATE SIAOS.ITEM_PROP_GRUPO IPG
         SET IPG.GRUPO_OS      = c_grupo.GRUPO_OS,
             IPG.IPG_DESCRICAO = c_grupo.IPG_DESCRICAO
       WHERE IPG.PRP_CODIGO = c_grupo.PRP_CODIGO
         AND IPG.IPG_CODIGO = c_grupo.IPG_CODIGO;
    
      COMMIT;
    
      IF n_tipo_insumo != 0 THEN
        SP_EXPORT_ITN_GRP(n_prp_codigo,
                          n_ipg_codigo,
                          n_prp_codigo_novo,
                          n_grupo_novo);
      
        COMMIT;
      
        IF n_tipo_insumo = 1 THEN
          UPDATE SGC.REVISAO R
             SET R.IPG_CODIGO_SV = n_grupo_novo
           WHERE R.IPR_CODIGO = n_ipr_codigo;
        ELSE
          UPDATE SGC.REVISAO R
             SET R.IPG_CODIGO_SV = n_grupo_novo
           WHERE R.IPR_CODIGO = n_ipr_codigo;
        END IF;
      
        COMMIT;
      
      ELSE
      
        UPDATE SGC.REVISAO R
           SET R.IPG_CODIGO = n_grupo_novo
         WHERE R.IPR_CODIGO = n_ipr_codigo;
      
        COMMIT;
      
      END IF;
    
    END LOOP;
  
    BEGIN
      DELETE SIAOS.ITEM_PROP_GRUPO IPG
       WHERE IPG.PRP_CODIGO = n_prp_codigo
         AND IPG.IPG_CODIGO = n_ipg_codigo;
    EXCEPTION
      WHEN OTHERS THEN
        NULL;
    END;
  
    COMMIT;
  
  END SP_EXPORT_GRUPO_REV;

  -------------------------------------------------------------
  -------- VERIFICA SE TEM OS ABERTA PARA UMA PRÉ-OS ----------
  -------------------------------------------------------------

  PROCEDURE SP_VERIFICA_PROPOSTA(n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
                                 v_erro       OUT VARCHAR) IS
    n_iqv      NUMBER;
    n_tot_aval NUMBER;
    --n_prp_dt_abertura DATE;
    n_cpr_iqv_min     NUMBER;
    v_prp_status_iqv  VARCHAR(1);
    c_ori_codigo      SIAOS.PROPOSTA.ORI_CODIGO%TYPE;
    n_qtd             NUMBER;
    n_qtd_transp      NUMBER;
    n_mpg_codigo      SIAOS.PROPOSTA.MPG_CODIGO%TYPE;
    n_prp_transporte  SIAOS.PROPOSTA.PRP_TRANSPORTE%TYPE;
    c_prp_status_cons SIAOS.PROPOSTA.PRP_STATUS_CONS%TYPE;
    n_ori_codigo      SIAOS.ORIGEM.ORIGEM%TYPE;
    n_gdi_codigo      SIAOS.ORIGEM.GDI_CODIGO%TYPE;
    n_tor_codigo      SIAOS.ORIGEM.TOR_CODIGO%TYPE;
  
  BEGIN
  
    n_iqv      := SIAOS.PCK_SMART_SALES3.SF_PRPOSTA_IQV(n_prp_codigo);
    n_tot_aval := SIAOS.PCK_SMART_SALES3.SF_VALOR_POR_TIPO(n_prp_codigo,
                                                           '',
                                                           14);
  
    SELECT P.PRP_STATUS_IQV,
           P.ORI_CODIGO,
           P.MPG_CODIGO,
           O.GDI_CODIGO,
           O.ORIGEM,
           O.TOR_CODIGO,
           P.PRP_TRANSPORTE,
           P.PRP_STATUS_CONS
      INTO v_prp_status_iqv,
           c_ori_codigo,
           n_mpg_codigo,
           n_gdi_codigo,
           n_ori_codigo,
           n_tor_codigo,
           n_prp_transporte,
           c_prp_status_cons
      FROM SIAOS.PROPOSTA P
     INNER JOIN SIAOS.ORIGEM O
        ON O.ORIGEM = P.ORI_CODIGO
     WHERE P.PRP_CODIGO = n_prp_codigo;
  
    n_cpr_iqv_min := PCK_SMART_SALES3.SF_MENOR_IQV(n_ori_codigo);
  
    IF n_cpr_iqv_min <= n_iqv OR n_tot_aval <= 0 THEN
      UPDATE SIAOS.PROPOSTA P
         SET P.PRP_STATUS_IQV = ''
       WHERE P.PRP_CODIGO = n_prp_codigo
         AND P.CON_NUMERO_IQV IS NULL;
      COMMIT;
    ELSE
      IF v_prp_status_iqv IS NULL AND (n_cpr_iqv_min > n_iqv) AND
         n_tot_aval > 0 THEN
        UPDATE SIAOS.PROPOSTA P
           SET P.PRP_STATUS_IQV = 'E'
         WHERE P.PRP_CODIGO = n_prp_codigo;
        COMMIT;
        v_erro := '26,';
      ELSIF v_prp_status_iqv IN ('E', 'R') THEN
        v_erro := '26,';
      ELSIF v_prp_status_iqv = 'P' THEN
        v_erro := '27,';
      ELSIF v_prp_status_iqv != 'C' THEN
        v_erro := '26,';
      END IF;
    END IF;
  
    IF c_ori_codigo = 'RV' THEN
    
      SELECT COUNT(T.IPR_CODIGO) QTDPCLI
        INTO n_qtd
        FROM SIAOS.ITEM_PROP T
       WHERE PRP_CODIGO = n_prp_codigo
         AND T.PRO_CODIGO LIKE 'PCLI%';
    
      IF n_qtd = 0 THEN
        v_erro := v_erro || '21,';
      END IF;
    
    END IF;
  
    SELECT NVL(COUNT(DISTINCT IP.IPG_CODIGO), 0) QTD_OPC
      INTO n_qtd
      FROM SIAOS.ITEM_PROP IP
     INNER JOIN SIAOS.ITEM_PROP_GRUPO IPG
        ON IP.IPG_CODIGO = IPG.IPG_CODIGO
       AND IP.PRP_CODIGO = IPG.PRP_CODIGO
     WHERE IP.PRP_CODIGO = n_prp_codigo
       AND IPG.IPG_NAO_SOMAR = 1;
  
    IF n_qtd > 0 THEN
      v_erro := v_erro || '20,';
    END IF;
  
    SELECT COUNT(T.IPR_CODIGO) QTDPPEND
      INTO n_qtd
      FROM SIAOS.ITEM_PROP T
     WHERE PRP_CODIGO = n_prp_codigo
       AND NVL(T.IPR_VENDA_CLI, 0) = 0
       AND NVL(TRIM(T.IPR_APNF), 0) = 0
       AND TRIM(PRO_CODIGO) NOT IN (SELECT P.INE_CODIGO FROM CADBASICO.PRODGEN P);
  
    IF n_qtd > 0 THEN
      v_erro := v_erro || '23,';
    END IF;
  
    IF n_mpg_codigo = 1 THEN
    
      SELECT COUNT(*) QTDPG
        INTO n_qtd
        FROM SIAOS.PROP_PAGTO T
       WHERE PRP_CODIGO = n_prp_codigo;
    
      IF n_gdi_codigo = 3 THEN
        v_erro := v_erro || '24,';
      ELSIF n_qtd > 4 THEN
        v_erro := v_erro || '25,';
      END IF;
    
    END IF;
  
    IF n_gdi_codigo != 6 AND n_gdi_codigo != 14 THEN
      IF n_prp_transporte IS NULL THEN
        v_erro := v_erro || '14,';
      ELSIF TRIM(n_prp_transporte) = 'FOT-Transportadora' THEN
      
        SELECT COUNT(*) TRANSPS
          INTO n_qtd_transp
          FROM SIAOS.TRANSP_PROP
         WHERE TRANSP_PROP.PRP_CODIGO = n_prp_codigo;
      
        IF n_qtd_transp <= 0 AND n_tor_codigo = 2 THEN
          v_erro := v_erro || '15,';
        END IF;
      
      END IF;
    END IF;
  
    FOR c_item IN (SELECT DISTINCT SIAOS.PCK_SMART_SALES3.SF_VERIFICA_ITEM_PROPOSTA(IP.PRP_CODIGO,
                                                                                    IP.IPR_ITEM_PROP) VALIDA
                     FROM (SELECT DISTINCT ITEM_PROP.PRP_CODIGO,
                                           ITEM_PROP.IPR_ITEM_PROP
                             FROM SIAOS.ITEM_PROP_UNI ITEM_PROP
                            WHERE ITEM_PROP.PRP_CODIGO = n_prp_codigo) IP) LOOP
      IF c_item.VALIDA != 0 AND c_item.VALIDA != 11 AND c_item.VALIDA != 90 THEN
        v_erro := v_erro || '3,';
      ELSE
        v_erro := v_erro || c_item.VALIDA || ',';
      END IF;
    END LOOP;
  
    IF n_gdi_codigo != 3 AND n_gdi_codigo != 6 AND n_gdi_codigo != 14 THEN
      SELECT COUNT(I.IPR_CODIGO) QTD_DT
        INTO n_qtd
        FROM SIAOS.ITEM_PROP I
       WHERE I.PRP_CODIGO = n_prp_codigo
         AND I.IPR_DT_CONTRAT IS NULL
         AND I.IPR_LOTE IS NOT NULL;
      IF n_qtd > 0 THEN
        v_erro := v_erro || '19,';
      END IF;
    END IF;
  
    IF c_prp_status_cons = 'A' THEN
      v_erro := v_erro || '12,';
    ELSE
      IF c_prp_status_cons IS NULL AND n_tor_codigo != 2 THEN
        v_erro := v_erro || '11,';
      ELSE
        IF c_prp_status_cons = 'P' OR c_prp_status_cons = 'R' THEN
          v_erro := v_erro || '10,';
        END IF;
      END IF;
    
      IF c_ori_codigo = 'RE' THEN
        v_erro := v_erro || '22,';
      END IF;
    END IF;
    /*
    IF n_gdi_codigo IN (13,19) THEN
      FOR c_revit IN (SELECT *
                        FROM SGC.REVISAO R
                       INNER JOIN SIAOS.ITEM_PROP IP ON IP.IPR_CODIGO = R.IPR_CODIGO
                       WHERE IP.PRP_CODIGO = n_prp_codigo)
      LOOP
        IF c_revit.IPG_CODIGO_SV IS NULL THEN
          v_erro := v_erro|| '28,';
        ELSE
          SELECT COUNT(*)
            INTO n_qtd
            FROM SIAOS.ITEM_PROP IP
           WHERE IP.PRP_CODIGO = n_prp_codigo
             AND IP.IPG_CODIGO = c_revit.IPG_CODIGO_PC;
          IF n_qtd > 0 THEN
            SELECT COUNT(*)
              INTO n_qtd
              FROM SIAOS.ITEM_PROP IP
             WHERE IP.PRP_CODIGO = n_prp_codigo
               AND IP.IPG_CODIGO = c_revit.IPG_CODIGO_SV;
    
            IF n_qtd <= 0 THEN
              v_erro := v_erro|| '28,';
            END IF;
    
          END IF;
    
        END IF;
      END LOOP;
    END IF;
    */
  END SP_VERIFICA_PROPOSTA;

  -----------------------------------------------------------------------------
  ----------------   RETORNA LISTA ESTIMADA  ----------------------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_MENOR_IQV(n_ori_codigo IN SIAOS.PROPOSTA.ORI_CODIGO%TYPE)
    RETURN NUMBER IS
    n_gdi_iqv_min SIAOS.GRUPO_DIVISAO.GDI_IQV_MIN%TYPE;
  BEGIN
  
    SELECT GD.GDI_IQV_MIN
      INTO n_gdi_iqv_min
      FROM SIAOS.GRUPO_DIVISAO GD
     INNER JOIN SIAOS.ORIGEM O
        ON O.GDI_CODIGO = GD.GDI_CODIGO
     WHERE O.ORIGEM = n_ori_codigo;
  
    RETURN n_gdi_iqv_min;
  
  EXCEPTION
    WHEN OTHERS THEN
    
      RETURN 0.00;
    
  END SF_MENOR_IQV;


  -----------------------------------------------------------------------------
  ----------------   RETORNA SE É DESPESA -------------------------------------
  -----------------------------------------------------------------------------
  FUNCTION SF_EH_DESPESA(vc_ine_codigo IN CADBASICO.ITEM_NEGOCIO.INE_CODIGO%TYPE)
    RETURN NUMBER IS
    n_eh_despesa   INTEGER := 0;
  BEGIN
  
    SELECT COUNT(I.INE_CODIGO) QTD
      INTO n_eh_despesa
      FROM CADBASICO.ITEM_NEGOCIO I
     INNER JOIN CADBASICO.FAMILIA_ITNEG F ON I.FIT_CODIGO = F.FIT_CODIGO
     WHERE NVL(INE_PRECO,0) = 0
       AND INE_TPCAD = 3
       AND NVL(INE_PRZERO,0) = 0
       AND NVL(F.FIT_EXIGCOT,0) = 0
       AND NVL(INE_CONSD,0) = 0
       AND NVL(INE_DISP,1) = 1
       AND INE_CODIGO = TRIM(vc_ine_codigo);
   
    RETURN n_eh_despesa;
  
  EXCEPTION WHEN OTHERS THEN
    
    RETURN 0;
    
  END SF_EH_DESPESA;

  ----------------------------------------------------------
  -------- DESVINCULA PROPOSTA DA OS  ----------------------
  ----------------------------------------------------------
  PROCEDURE SP_DESVINCULA_PROPOSTA(
    n_prp_codigo IN SIAOS.PROPOSTA.PRP_CODIGO%TYPE) IS
    
    n_order_no      SIAOS.PROPOSTA.ORDER_NO%TYPE;
    dt_cancel       DATE;
    
  BEGIN
    
    SELECT P.ORDER_NO          
      INTO n_order_no
      FROM SIAOS.PROPOSTA P
     WHERE P.PRP_CODIGO = n_prp_codigo;   
   
    IF n_order_no IS NOT NULL THEN
      
       SELECT O.CANCEL_DATE
         INTO dt_cancel
         FROM SIAOS.OEHDR O
        WHERE O.ORDER_NO = n_order_no;
    
        IF dt_cancel IS NOT NULL THEN
          FOR c_rev IN (SELECT R.REV_NUMERO
                          FROM SGC.REVISAO R
                         WHERE R.IPR_CODIGO IN (SELECT IP.IPR_CODIGO
                                                  FROM SIAOS.ITEM_PROP IP
                                                 WHERE IP.PRP_CODIGO = n_prp_codigo))
          LOOP
            UPDATE SGC.REVISAO R
               SET R.CONTROLE = NULL,
                   R.STA_CODIGO = 58
             WHERE R.REV_NUMERO = c_rev.REV_NUMERO;
          END LOOP;
          
          UPDATE SIAOS.ITEM_PROP IP
             SET IP.CONTROLE = NULL
           WHERE IP.PRP_CODIGO = n_prp_codigo;
          
          UPDATE SIAOS.PROPOSTA P
             SET P.ORDER_NO = NULL
           WHERE P.PRP_CODIGO = n_prp_codigo;          
          
          COMMIT;
        ELSE
          RAISE_APPLICATION_ERROR(-20001, 'ERRO: OS PRECISA ESTAR CANCELADA.');
        END IF;
    ELSE
      RAISE_APPLICATION_ERROR(-20001, 'ERRO: OS NÃO ENCONTRADA.');
    END IF;
  
  END SP_DESVINCULA_PROPOSTA;
  
  
  ----------------------------------------------------------
  -------- VENDEDOR DA PROPOSTA  ---------------------------
  ----------------------------------------------------------
  PROCEDURE SP_VENDEDOR_PROPOSTA(
    n_prp_codigo     IN   SIAOS.PROPOSTA.PRP_CODIGO%TYPE,
    n_usu_chapa_ven  OUT  SIAOS.USUARIO.USU_CHAPA%TYPE,
    v_usu_nome_ven   OUT  SIAOS.USUARIO.USU_NOME%TYPE,
    v_usu_email_ven  OUT  SIAOS.USUARIO.USU_EMAIL%TYPE,
    v_end_email_vend OUT  VARCHAR2) IS
    
  BEGIN
    BEGIN
      SELECT U.USU_NOME, 
             U.USU_EMAIL,
             U.USU_CHAPA
        INTO v_usu_nome_ven, 
             v_usu_email_ven,
             n_usu_chapa_ven
        FROM VENDEDOR_PROP P
       INNER JOIN ARSALESP A ON P.SALESP_KEY = A.SALESP_KEY
       INNER JOIN USUARIO U ON U.USU_CHAPA = A.USU_CHAPA
       WHERE P.PRP_CODIGO = n_prp_codigo
         AND P.VPR_CODIGO = 1
         AND U.USU_EMAIL IS NOT NULL;
           
      v_end_email_vend := v_usu_nome_ven || '<' ||  v_usu_email_ven || '>';
        
    EXCEPTION WHEN OTHERS THEN
      v_end_email_vend := NULL;
         
      BEGIN
        SELECT A.SALESPERSON
          INTO v_usu_nome_ven
          FROM VENDEDOR_PROP P
         INNER JOIN ARSALESP A ON P.SALESP_KEY = A.SALESP_KEY
         WHERE P.PRP_CODIGO = n_prp_codigo
           AND P.VPR_CODIGO = 1;
          
        EXCEPTION WHEN OTHERS THEN
           v_usu_nome_ven := 'Não Localizado';
        END;
    END;
  
  END SP_VENDEDOR_PROPOSTA;
  
END PCK_SMART_SALES3;
/
