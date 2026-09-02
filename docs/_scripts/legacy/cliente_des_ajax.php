<?php
session_start();
header('Content-Type: text/html; charset=iso-8859-1');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past
require_once("../../dqanet/_src/php/function.php");
require_once("graficos.php");

$grupo = isset($_GET['grupo']) ? $_GET['grupo'] : 0;

$cod_sistema = 117;

$cliente = cliente($cli_codigo);

if ($op == 'dadosGerais') {
    $whereClienteRisco = " CRS_COD_SIAOS = '$cliente->BLOQUEADO'";
    $clienteRisco =  clienteRisco('', $whereClienteRisco);
    $cores = explode(',', $clienteRisco[0]->CRS_CORES);
    $style = $cores[3];
    $riscoDesc = $clienteRisco[0]->CRS_DESC;

    if (($style) && ($cliente->BLOQUEADO != 0)) {
        $mensagem = '<table cellpadding="4" cellspacing="0" border="0" style="width:400px; height:220px;" align="center"><tr><td align="center" valign="middle" style="background:' . $style . '; font:14px;" height="25"><strong>' . $riscoDesc . '</strong></td></tr><tr><td align="center" valign="middle">' . $cliente->MENSAGEM_BLOQUEIO . '</td></tr></table>';
    }

    $arlevel = arlevel($cliente->TERRITORIO);

    $arclass = arclass($cliente->CLASSE);

    $arsvia = arsvia($cliente->FORMAEMBAR);

    $natureza = natureza($cliente->TIPO);

    $vendedor = arsalesp($cliente->VENDEDOR);

    $tipoEmp = dominioCliente('TIPOEMP', $cliente->TIPOEMP);

    $area_os_com = area_os($cliente->AOS_CODIGO_COM);

    $area_os_tec = area_os($cliente->AOS_CODIGO_TEC);

    $pais = pais($cliente->PAI_CODIGO);

    $icone = statusCli($cliente->CODIGO);

    if (is_numeric(trim($cliente->USUARIO))) {
        $usuario = usuario($cliente->USUARIO);
        $USU_NOME = $usuario->USU_NOME;
    } else {
        $USU_NOME = $cliente->USUARIO;
    }

    $NOMECLI_GRP = $cliente->CODIGO . ' - ' . $cliente->CLIENTE;
    if (($cliente->CLI_GRUPO != $cliente->CODIGO) && ($cliente->CLI_GRUPO)) {
        $clienteGrupo = cliente($cliente->CLI_GRUPO);
        $NOMECLI_GRP = $clienteGrupo->CODIGO . ' - ' . $clienteGrupo->CLIENTE;
    }
    ?>
<style>
.msg {
background-color: <?=  $icone['LINHA1']; ?>;
    padding: 4px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    width: 410px;
    height: 220px;
}
</style>
<script>
$(document).ready(function() {
    mensRiscoC();
})

function mensRiscoC(){
    if($("#BLOQUEADO").val() != 0){
        var titulo = 'Alerta de Bloqueio!';
        var mensagem = "<div class='msg'>"+$("#mensRisco").html()+"</div>";
        motivoInfo(titulo,mensagem);
    }
}

function motivoInfo(titulo,mensagem){
  var height = 320;
  var width = 450;
  var btn = {};
  janelaJQNome(titulo,mensagem,height,width,btn,'motivoWin');
}

function verCNPJ(cnpj){
    var validaCNPJ = /^[0-9]{14}$/;
    var url, conteudo;
    var height = 600;
    var width = 600;
    var btn = {};
    janelaJQ("Alerta!",'<span name="validaCNPJ" id="validaCNPJ" style="font-size:12px"></span>',height,width,btn);
    if(validaCNPJ.test(cnpj)){
        $("#validaCNPJ").html('Aguarde...');
        $.ajax({
            url:"../pesquisa/verificaCNPJ.php?mostra=1&cnpj="+cnpj,
            success:function(data) {
                $("#validaCNPJ").html(data);/*
                var campos = data.split('*');
                $("#endereco").val(campos[1]);
                $("#complemento2").val(campos[2]);
                $("#CLI_BAIRRO").val(campos[3]);
                $("#cidade").val(campos[4]);
                $("#estado").val(campos[5]);
                $("#est_codigo").val(campos[6]);
                f_selEstado(campos[6],campos[5],campos[8]);     */
            }
        });
        //$("#validaCNPJ").load('../pesquisa/validaCNPJ.php','cep=' + cep.val());
    }else{
        $("#validaCNPJ").html('CNPJ Inválido!');
    }
    //window.open("../pesquisa/verificaCNPJ.php?cnpj="+cnpj);
}
</script>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(100,117); ?></label>
    <span class="campoM lbw600"><?= $cliente->CLIENTE ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170">Status</label>
    <input name="BLOQUEADO" type="hidden" id="BLOQUEADO" value="<?=  $cliente->BLOQUEADO; ?>">
    <span colspan="3" align="left" class="campoM pointer lbw600" style="background-color:<?=  $icone['LINHA1'] ?>;" onClick="mensRiscoC();" id="mensRisco"><?= $icone['ICONE'] ;?> &nbsp; <?= $icone['TITULO'] ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="coluna">
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(70,3); ?></label>
        <span class="campoM lbw350"><?= $cliente->REDUZIDO ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">CNPJ</label>
        <span class="campoM lbw350" onClick="verCNPJ('<?= trim($cliente->CGC) ;?>')"><?= $cliente->CGC ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Insc. Municipal</label>
        <span class="campoM lbw350"><?= $cliente->CLI_INSCR_MUN ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Grupo</label>
        <span class="campoM lbw350"><?= $cliente->NOMECLI_GRP; ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(80,3) ?></label>
        <span class="campoM lbw350"><?= $natureza->DESCRICAO; ?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(90,3) ?></label>
        <span class="campoM lbw200"><?= $arlevel->DESCRIPTION;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">I.E.</label>
        <span class="campoM lbw200"><?= $cliente->INSCR_EST ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">CNAE</label>
        <span class="campoM lbw200"><?= $cliente->CLI_CNAE ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Montador</label>
        <span class="campoM lbw200"><?= sim_nao(1,$cliente->CLI_MONTADOR) ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(100,3) ?> Cliente</label>
        <span class="campoM lbw200"><?= $tipoEmp->DESCRICAO ?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
</div>
<div class="mainDestaqueM"><?= idioma(570,3) ?></div>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(580,3) ?></label>
    <span class="campoM lbw500"><?= $cliente->CONTATO ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(590,3) ?></label>
    <span class="campoM lbw500"><?= $cliente->CONTATOTEC ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(600,3) ?></label>
    <span class="campoM lbw500"><?= $cliente->CONTATOFIN ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="mainDestaqueM"><?= idioma(110,3) ?></div>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(170,3); ?></label>
    <span class="campoM lbw200"><?= $cliente->CEP; ?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(120,3) ?></label>
    <span class="campoM lbw600"><?= $cliente->ENDERECO1 ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170"></label>
    <span class="campoM lbw600"><?= $cliente->ENDERECO2 ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170"></label>
    <span class="campoM lbw600"><?= $cliente->ENDERECO3 ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="coluna">
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(140,3) ?></label>
        <span class="campoM lbw350"><?= $pais->DESCRICAO; ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(160,3) ?></label>
        <span class="campoM lbw350"><?= $cliente->ESTADO ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(130,3) ?></label>
        <span class="campoM lbw350"><?= $cliente->CIDADE ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Bairro</label>
        <span class="campoM lbw350"><?= $cliente->CLI_BAIRRO ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">E-mail</label>
        <span class="campoM lbw350"><a href="mailto:<?= $cliente->EMAIL ;?>"><?= $cliente->EMAIL ;?></a>&nbsp;</span>
      </fieldset>
    </div>
  </div>
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(150,3) ?></label>
        <span class="campoM lbw200"><?= $cliente->TELEFONE1 ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(180,3) ?></label>
        <span class="campoM lbw200"><?= $cliente->TELEFONE2 ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Home Page</label>
        <span class="campoM lbw200"><a href="<?= $cliente->HOMEPAGE ;?>" target="_blank"><?= $cliente->HOMEPAGE ;?></a>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Fax</label>
        <span class="campoM lbw200"><?= $cliente->FAX ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(190,3) ?></label>
        <span class="campoM lbw200"><?= $pais->MOEDA; ?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
</div>
<div class="mainDestaqueM"><?= idioma(610,3) ?></div>
<div class="coluna">
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw180"><?= idioma(1610,3) ?></label>
        <span class="campoM lbw300"><?= $area_os_com->DESCRICAO . " (". usuario($area_os_com->USU_CHAPA)->USU_NOME.")"?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw180"><?= idioma(1620,3) ?></label>
        <span class="campoM lbw300"><?= $area_os_tec->DESCRICAO . " (". usuario($area_os_tec->USU_CHAPA)->USU_NOME.")"?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw180"><?= idioma(650,3) ?></label>
        <span class="campoM lbw300"><?= $arclass->CODIGO . ' - ' . $arclass->DESCRICAO ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw180">&Aacute;rea de Venda&nbsp;&nbsp;</label>
        <span class="campoM lbw300"><?= $arlevel->CODIGO . ' - ' . $arlevel->DESCRICAO; ?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
</div>
<div class="row">
  <fieldset>
    <label class="lbw180"><?= idioma(210,3) ?></label>
    <span class="campoM lbw600"><?= $arsvia->SHIP_VIA_KEY . " - " . $arsvia->NOME;?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw180"><?= idioma(220,3) ?></label>
    <span class="campoM lbw600"><?= $vendedor->CODIGO . ' - ' . $vendedor->NOME;?>&nbsp;</span>
  </fieldset>
</div>
    <?php
}
if ($op == 'cobraCli') {
    $cobrancaDefWR = " T.CODIGO = {$cliente->CODIGO} AND CHAVECOBRA = '{$cliente->COBRANCA}'";
    $cobrancaDef = cobranca('', $cobrancaDefWR);
    $cobrancaDef = $cobrancaDef[0];

    $paisWR = " TRIM(COUNTRY_KEY) = '$cobrancaDef->PAIS'";
    $paisDef = pais('', $paisWR);
    $paisDef = $paisDef[0];
    ?>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(350,3) ?></label>
    <label class="lbw600"><?= $cobrancaDef->CHAVECOBRA ?></label>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(360,3) ?></label>
    <span class="campoM lbw600"><?= $cobrancaDef->NOME ?>&nbsp;</span>
  </fieldset>
</div>
<div class="coluna">
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(370,3) ?></label>
        <span class="campoM lbw350"><?= $cobrancaDef->ENDERECO1 ?><br>
        <?= $cobrancaDef->ENDERECO2 ?><br>
        <?= $cobrancaDef->ENDERECO3 ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(380,3) ?></label>
        <span class="campoM lbw350"><?= $cobrancaDef->CIDADE ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(390,3) ?></label>
        <span class="campoM lbw350"><?=  $paisDef->DESCRICAO; ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(400,3) ?></label>
        <span class="campoM lbw350"><?= $cobrancaDef->CONTATO ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(410,3) ?></label>
        <span class="campoM lbw350"><?= $cobrancaDef->TELEFONE1 ?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(420,3) ?></label>
        <span class="campoM lbw200"><?= $cobrancaDef->ESTADO ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(430,3) ?></label>
        <span class="campoM lbw200"><?= $cobrancaDef->CEP ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(440,3) ?></label>
        <span class="campoM lbw200"><?= $cobrancaDef->REDUZIDO ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(450,3) ?></label>
        <span class="campoM lbw200"><?= $cobrancaDef->TELEFONE2 ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">E-mail</label>
        <span class="campoM lbw200"><a href="mailto:<?= $cobrancaDef->E_MAIL ;?>"><?= $cobrancaDef->E_MAIL ?></a></span>
      </fieldset>
    </div>
  </div>
</div>
<div class="mainDestaqueG">Outras Cobran&ccedil;as</div>
<div class="campoM campoObs" style="height:350px; background-color:#FFF;">
<?
  $cobrancasWR = ' T.CODIGO = '.$cliente->CODIGO;
  $cobrancas = cobranca('', $cobrancasWR);
  foreach($cobrancas as $cobranca){
    $paisWR = " TRIM(COUNTRY_KEY) = '$cobranca->PAIS'";
    $pais = pais('',$paisWR);

?>
  <div>
  <div class="mainDestaqueG" style="background-color: #D9D9D9" align="left"><?= idioma(350,3) ?> - <?= $cobranca->CHAVECOBRA; ?></div>
  <div class="row">
    <fieldset>
      <label class="lbw170"><?= idioma(470,3) ?></label>
      <span class="campoM lbw600"><?= $cobranca->NOME ?>&nbsp;</span>
    </fieldset>
  </div>
  <div class="coluna">
    <div class="parte">
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(480,3) ?></label>
          <span class="campoM lbw350"><?= $cobranca->ENDERECO1 ?><br>
          <?= $cobranca->ENDERECO2 ?><br>
          <?= $cobranca->ENDERECO3 ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(380,3) ?></label>
          <span class="campoM lbw350"><?= $cobranca->CIDADE ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(390,3) ?></label>
          <span class="campoM lbw350"><?=  $pais->DESCRICAO; ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(400,3) ?></label>
          <span class="campoM lbw350"><?= $cobranca->CONTATO ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(410,3) ?></label>
          <span class="campoM lbw200"><?= $cobranca->TELEFONE1 ?>
          </label>
        </fieldset>
      </div>
    </div>
    <div class="parte">
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(420,3) ?></label>
          <span class="campoM lbw200"><?= $cobranca->ESTADO ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(430,3) ?></label>
          <span class="campoM lbw200"><?= $cobranca->CEP ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(440,3) ?></label>
          <span class="campoM lbw200"><?= $cobranca->REDUZIDO ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(450,3) ?></label>
          <span class="campoM lbw200"><?= $cobranca->TELEFONE2 ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170">E-mail</label>
          <span class="campoM lbw200"><a href="mailto:<?= $cobranca->EMAIL ;?>"><?= $cobranca->E_MAIL ?></a></span>
        </fieldset>
      </div>
    </div>
    </div>
  </div>
<?php } ?>
</div>
<?php
}if ($op == 'embCli') {
    $embarqueDefWR = " T.CODIGO = {$cliente->CODIGO} AND CHAVE_EMB = '{$cliente->ENTREGA}'";
    $embarqueDef = embarque('', $embarqueDefWR);
    $embarqueDef = $embarqueDef[0];

    $paisWR = " TRIM(COUNTRY_KEY) = '$embarqueDef->PAIS'";
    $paisDef = pais('', $paisWR);
    $paisDef = $paisDef[0];
    ?>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(460,3) ?></label>
    <label class="lbw600"><?= $cliente->ENTREGA ?></label>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(470,3) ?></label>
    <span class="campoM lbw600"><?= $embarqueDef->NOME ?>&nbsp;</span>
  </fieldset>
</div>
<div class="coluna">
  <div class="parte">
  <div class="row">
    <fieldset>
      <label class="lbw170"><?= idioma(480,3) ?></label>
      <span class="campoM lbw350"><?=  $embarqueDef->ENDERECO1 ?><br>
      <?=  $embarqueDef->ENDERECO2 ?><br>
      <?=  $embarqueDef->ENDERECO3 ?>&nbsp;</span>
    </fieldset>
  </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(490,3) ?></label>
        <span class="campoM lbw350"><?= $embarqueDef->CIDADE ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(500,3) ?></label>
        <span class="campoM lbw350"><?=  $pais->DESCRICAO; ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(510,3) ?></label>
        <span class="campoM lbw350"><?= $embarqueDef->CONTATO ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(520,3) ?></label>
        <span class="campoM lbw350"><?= $embarqueDef->TELEFONE1 ?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(530,3) ?></label>
        <span class="campoM lbw200"><?= $embarqueDef->ESTADO ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(540,3) ?></label>
        <span class="campoM lbw200"><?= $embarqueDef->CEP ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(550,3) ?></label>
        <span class="campoM lbw200"><?= $embarqueDef->REDUZIDO ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(560,3) ?></label>
        <span class="campoM lbw200"><?= $embarqueDef->TELEFONE2 ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">E-mail</label>
        <span class="campoM lbw200"><a href="mailto:<?= $embarqueDef->E_MAIL ;?>"><?= $embarqueDef->E_MAIL ?></a></span>
      </fieldset>
    </div>
  </div>
</div>
<div class="mainDestaqueG">Outros Embarques</div>
<div class="campoM campoObs" style="height:350px; background-color:#FFF;">
<?
  $embarqueWR = " T.CODIGO = {$cliente->CODIGO}";
  $embarques = embarque('', $embarqueDefWR);
  foreach($embarques as $embarque){
  
    $paisWR = " TRIM(COUNTRY_KEY) = '$embarque->PAIS'";
    $pais = pais('',$paisWR);
    $pais = $pais[0];
?>
  <div class="mainDestaqueG" style="background-color: #D9D9D9"><?= idioma(460,3) ?> - <?= $embarque->CHAVE_EMB ?></div>
  <div class="row">
    <fieldset>
      <label class="lbw170"><?= idioma(470,3) ?></label>
      <span class="campoM lbw600"><?= $embarque->NOME ?>&nbsp;</span>
    </fieldset>
  </div>
  <div class="coluna">
    <div class="parte">
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(480,3) ?></label>
          <span class="campoM lbw350"><?=  $embarque->ENDERECO1 ?><br>
          <?=  $embarque->ENDERECO2 ?><br>
          <?=  $embarque->ENDERECO3 ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(490,3) ?></label>
          <span class="campoM lbw350"><?= $embarque->CIDADE ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(500,3) ?></label>
          <span class="campoM lbw350"><?=  $pais->DESCRICAO; ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(510,3) ?></label>
          <span class="campoM lbw350"><?= $embarque->CONTATO ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(520,3) ?></label>
          <span class="campoM lbw350"><?= $embarque->TELEFONE1 ?>&nbsp;</span>
        </fieldset>
      </div>
    </div>
    <div class="parte">
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(530,3) ?></label>
          <span class="campoM lbw200"><?= $embarque->ESTADO ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(540,3) ?></label>
          <span class="campoM lbw200"><?= $embarque->CEP ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(550,3) ?></label>
          <span class="campoM lbw200"><?= $embarque->REDUZIDO ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170"><?= idioma(560,3) ?></label>
          <span class="campoM lbw200"><?= $embarque->TELEFONE2 ?>&nbsp;</span>
        </fieldset>
      </div>
      <div class="row">
        <fieldset>
          <label class="lbw170">E-mail</label>
          <span class="campoM lbw200"><a href="mailto:<?= $embarque->E_MAIL ;?>"><?= $embarque->E_MAIL ?></a></span>
        </fieldset>
      </div>
    </div>
  </div>
<?php } ?>
</div>
<?php
}if ($op == 'finCli') {
    $pestipo  = !$cliente->CLI_PES_TIPO ? 'Normal' : dominioCliente('CLI_PES_TIPO', $cliente->CLI_PES_TIPO)->DESCRICAO;
    $recofinf = !$cliente->CLI_RECCOF ? 'Não' : dominioCliente('EMP_PUBLICA', $cliente->CLI_RECCOF)->DESCRICAO;
    $recsll   = !$cliente->CLI_RECCSLL ? 'Não' : dominioCliente('EMP_PUBLICA', $cliente->CLI_RECCSLL)->DESCRICAO;
    $repis    = !$cliente->CLI_RECPIS ? 'Não' : dominioCliente('EMP_PUBLICA', $cliente->CLI_RECPIS)->DESCRICAO;
    ?>
<div class="coluna">
  <div class="parte">
    <div class="row"> 
      <fieldset>
        <label class="lbw170">Grupo Tribut&aacute;rio</label>
        <span class="campoM lbw200"><?=  $cliente->CLI_GRUPO_TRIB; ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(240,3) ?></label>
        <span class="campoM lbw200"><?= $cliente->CCONTABIL ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Insc. Suframa</label>
        <span class="campoM lbw200"><?= $CLI_INSCR_SUFRAMA;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Contribuinte</label>
        <span class="campoM lbw200"><?= sim_nao(1,$cliente->CLI_CONTRIBUINTE) ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(270,3) ?></label>
        <span class="campoM lbw200"><?= $cliente->ISS ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(280,3) ?></label>
        <span class="campoM lbw200"><?= sim_nao(1,$cliente->ZONA_FRANCA) ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">Fome Zero</label>
        <span class="campoM lbw200"><?= sim_nao(1,$liente->CLI_FOME_ZERO) ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170"><?= idioma(340,3) ?></label>
        <span class="campoM lbw200"><?= sim_nao(1,$cliente->EXPORTACAO) ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw170">NIF</label>
        <span class="campoM lbw200"><?= $cliente->CLI_NIF ;?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
  <div class="parte">
    <div class="row">
      <fieldset>
        <label class="lbw140"><?= idioma(300,3) ?>&nbsp;a Prazo</label>
        <span class="campoM lbw200"><?= arruma_numero($cliente->LIMITECR,$lingua,2); ?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw140"><?= idioma(300,3) ?>&nbsp;a Vista</label>
        <span class="campoM lbw200"><?= arruma_numero($cliente->CLI_LIMITE_CRV,$lingua,2) ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw140"><?= idioma(250,3) ?></label>
        <span class="campoM lbw200"><?= sim_nao(1,$cliente->FLAGMULTA) ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw140"><?= idioma(320,3) ?></label>
        <span class="campoM lbw200"><?= sim_nao(1,$cliente->FLAGCOBRA) ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw140"><?= idioma(330,3) ?></label>
        <span class="campoM lbw200"><?= $cliente->VENCPROG ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw140">Tipo Pessoa</label>
        <span class="campoM lbw200"><?= $pestipo ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw140">Recolhe COFINS</label>
        <span class="campoM lbw200"><?= $recofinf ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw140">Recolhe CSLL</label>
        <span class="campoM lbw200"><?= $recsll ;?>&nbsp;</span>
      </fieldset>
    </div>
    <div class="row">
      <fieldset>
        <label class="lbw140">Recolhe PIS</label>
        <span class="campoM lbw200"><?= $repis ;?>&nbsp;</span>
      </fieldset>
    </div>
  </div>
</div>
<div class="row">
  <fieldset>
    <label class="lbw170"><?= idioma(290,3) ?></label>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <span class="campoM lbw600" style="height: 150px"><?= $cliente->OBSVENC ;?>&nbsp;</span>
  </fieldset>
</div>
    <?php
}
if ($op == 'estCli') {
    $x = 0;
    $anoValArr = array();
    $anoLabArray = array();
    $sql = "SELECT TO_CHAR(CL.DT_DIA,'YYYY') ANO
            FROM GERAL.CALENDARIO CL
           WHERE TRUNC(DT_DIA) > TRUNC(TO_DATE('01/01/'||TO_CHAR(SYSDATE-(356*11),'YYYY'),'DD/MM/YYYY'))
             AND DT_DIA <= SYSDATE
           GROUP BY
                 TO_CHAR(CL.DT_DIA,'YYYY')
           ORDER BY
                 TO_CHAR(CL.DT_DIA,'YYYY')";
    $curs = OCIParse($conn, "$sql");
    OCIDefineByName($curs, "ANO", $ANO);
    OCIExecute($curs);
    while (OCIFetch($curs)) {
        $anoValArr[ $x ] = 0;
        $sql2 = "SELECT TO_CHAR(SUM(SIAOS.PCK_DQANET.SF_CONVERTE_MOEDA(OL.QTY_ORDERED*(OL.VLVENDACLI + SIAOS.PCK_SMART_SALES3.SF_CALCULA_IMP_SAIDA(OL.ORDER_NO,NULL,OL.VLVENDACLI,1,1,OL.IPI,OL.ISS)),NVL(OS.MOEDA,'R$'),'R$',OL.DT_FATURAMENTO))/1000,'FM999999990.00') VALORANO
			  FROM SIAOS.OEHDR OS
			 INNER JOIN SIAOS.OELIN OL ON OS.ORDER_NO = OL.ORDER_NO
			 WHERE OS.CUST_KEY = $cliente->CODIGO
			   AND TO_CHAR(OL.DT_FATURAMENTO,'YYYY') = $ANO";
        $curs2 = OCIParse($conn, "$sql2");
        OCIDefineByName($curs2, "VALORANO", $VALORANO);
        OCIExecute($curs2);
        while (OCIFetch($curs2)) {
            $anoValArr[ $x ] = $VALORANO;
        }

        $valPropArr[ $x ] = 0;
        $sql2 = "SELECT TO_CHAR(PROPOSTA.VALOR/1000,'FM999999990.00') VALORPRP
               FROM (SELECT T.COD_CLIENTE,
                            T.ANO,
                            SUM(T.VALOR_RS) VALOR
                       FROM SADIG.VM_PROPOSTA T
                      GROUP BY ANO,
                            COD_CLIENTE
                      UNION
                     SELECT T.COD_CLIENTE,
                            T.ANO,
                            SUM(T.VALOR_RS) VALOR
                       FROM SADIG.VM_PROPOSTA_ANTIGA T
                       GROUP BY ANO,
                             COD_CLIENTE) PROPOSTA
             WHERE COD_CLIENTE = '$cliente->CODIGO'
               AND ANO = $ANO
             ORDER BY ANO";
      //  print $sql2;
        $curs2 = OCIParse($conn, "$sql2");
        OCIDefineByName($curs2, "VALORPRP", $VALORPRP);
        OCIExecute($curs2);
        while (OCIFetch($curs2)) {
            $valPropArr[ $x ] = $VALORPRP;
        }

        $propOsArr[ $x ] = 0;
        $sql2 = "SELECT TO_CHAR(PROPOSTA.VALOR/1000,'FM999999990.00') VALOROS
               FROM (SELECT T.COD_CLIENTE,
                            T.ANO,
                            SUM(T.VALOR_RS) VALOR
                       FROM SADIG.VM_PROPOSTA T
                      WHERE STATUS_PROPOSTA = 'OS ABERTA'
                      GROUP BY ANO,
                            COD_CLIENTE
                      UNION
                     SELECT T.COD_CLIENTE,
                            T.ANO,
                            SUM(T.VALOR_RS) VALOR
                       FROM SADIG.VM_PROPOSTA_ANTIGA T
                      WHERE STATUS_PROPOSTA = 'OS ABERTA'
                      GROUP BY ANO,
                            COD_CLIENTE) PROPOSTA
             WHERE COD_CLIENTE = '$cliente->CODIGO'
               AND ANO = $ANO";
        $curs2 = OCIParse($conn, "$sql2");
        OCIDefineByName($curs2, "VALOROS", $VALOROS);
        OCIExecute($curs2);
        while (OCIFetch($curs2)) {
            $propOsArr[ $x ] = $VALOROS;
        }
        $anoLabArray[ $x ] = $ANO;
        $x++;
    }

    $anoMedArr = array();
    for ($z = 0; $z < count($anoValArr); $z++) {
        $sum = 0;
        $med = -1;
        for ($a = $z; $a >= 0; $a--) {
            if ($z - 5 < $a) {
                $sum += $anoValArr[ $a ];
                $med++;
                //print 'if('.$z.'-4 >= '.$a.'),';
            }
        }
        $anoMedArr[ $z ] = $sum / ($med + 1);
    }

    $fnome = str_replace('+', '', $cliente->CLIENTE);
    $fnome = str_replace('__', '_', $fnome);
    $fnome = str_replace('.', '', $fnome);
    $fnome = str_replace('\\', '', $fnome);
    $fnome = str_replace('/', '', $fnome);
    $fnome = str_replace('?', '', $fnome);
    $fnome = str_replace('–', '', $fnome);
    $fnome = str_replace(' ', '_', $fnome);
    $fnome = str_replace('(', '', $fnome);
    $fnome = str_replace(')', '', $fnome);
    $fnome = str_replace('$', 's', $fnome);
    $fnome = str_replace('Ñ', 'N', $fnome);
    $fnome = strtolower($fnome);

    $sql = "SELECT GERAL.SF_REMOVE_ACENTOS('$fnome') NOME_ARRUMADO
            FROM DUAL";
  //print $sql;
    $curs = OCIParse($conn, $sql);
    OCIDefineByName($curs, "NOME_ARRUMADO", $NOME_ARRUMADO);
    OCIExecute($curs);
    OCIFetch($curs);
  //print $fnome."<br>";
    $NOME_ARRUMADO = str_replace('_', ' ', $NOME_ARRUMADO);

    $fnome = $cliente->CODIGO . 'FATANO';
    $legNomeArray = array('Valor', 'Media');
    $chAno = cliChart(1, $anoValArr, $anoMedArr, $anoLabArray, $NOME_ARRUMADO, 'Faturamento por Ano (k R$)', $fnome, $legNomeArray);

    $fnome = $cliente->CODIGO . 'PROPANO';
    $legNomeArray = array(array('Proposta', 'O.S.'), '');
    $propAno = cliChart(2, array($valPropArr, $propOsArr), '', $anoLabArray, $NOME_ARRUMADO, 'Proposta por Ano (k R$)', $fnome, $legNomeArray);

    $x = 0;
    $mesValArr = array();
    $mesLabArray = array();
    $sql = "SELECT TO_CHAR(CL.DT_DIA,'YYYY/MM') ANOMES
            FROM GERAL.CALENDARIO CL
           WHERE TRUNC(DT_DIA) > SYSDATE - 365 + 30
             AND DT_DIA <= SYSDATE
           GROUP BY
                 TO_CHAR(CL.DT_DIA,'YYYY/MM')
           ORDER BY
                 TO_CHAR(CL.DT_DIA,'YYYY/MM')";
    $curs = OCIParse($conn, "$sql");
    OCIDefineByName($curs, "ANOMES", $ANOMES);
    OCIExecute($curs);
    while (OCIFetch($curs)) {
        $sql2 = "SELECT TO_CHAR(SUM(SIAOS.PCK_DQANET.SF_CONVERTE_MOEDA(OL.QTY_ORDERED*(OL.VLVENDACLI + SIAOS.PCK_SMART_SALES3.SF_CALCULA_IMP_SAIDA(OL.ORDER_NO,NULL,OL.VLVENDACLI,1,1,OL.IPI,OL.ISS)),NVL(OS.MOEDA,'R$'),'R$',OL.DT_FATURAMENTO))/1000,'FM999999990.00') VALORANOMES
			  FROM SIAOS.OEHDR OS
			 INNER JOIN SIAOS.OELIN OL ON OS.ORDER_NO = OL.ORDER_NO
			 WHERE OS.CUST_KEY = $cliente->CODIGO
			   AND TO_CHAR(OL.DT_FATURAMENTO,'YYYY/MM') = '$ANOMES'";
        $curs2 = OCIParse($conn, "$sql2");
        OCIDefineByName($curs2, "VALORANOMES", $VALORANOMES);
        OCIExecute($curs2);
        while (OCIFetch($curs2)) {
            $mesValArr[ $x ] = $VALORANOMES;
            $mesLabArray[ $x ] = $ANOMES;
            $x++;
        }
    }

    $mesMedArr = array();
    for ($z = 0; $z < count($mesValArr); $z++) {
        $sum = 0;
        for ($a = 0; $a <= $z; $a++) {
            $sum += $mesValArr[ $a ];
        }
        $mesMedArr[ $z ] = $sum / ($z + 1);
    }

    $fnome = $cliente->CODIGO . 'FATMES';
    $legNomeArray = array('Valor', 'Media');
    $chMes = cliChart(1, $mesValArr, $mesMedArr, $mesLabArray, $NOME_ARRUMADO, 'Faturamento por Mês (R$)', $fnome, $legNomeArray);

    $sql = "SELECT AVG(T.E1_VENCTO-T.E1_BAIXA) MEDATZ";
    if ($cliente->ORIGEM != 'CO') {
        $sql .= "		  FROM INTEGRACAO.VW_TITULO_NF_SAIDA T";
    } else {
        $sql .= "		  FROM INTEGRACAO.VW_TITULO_INV_SAIDA T";
    }
    $sql .= " WHERE E1_TIPO IN ('NF')
             AND T.COD_CLI = LPAD($cliente->CODIGO,6,0)
             AND T.E1_VENCTO >= TO_DATE('20160101','YYYYMMDD')
             AND T.E1_BAIXA IS NOT NULL
             AND T.E1_VENCTO-T.E1_BAIXA < 0";
  //PRINT $sql;
    $curs = OCIParse($conn, "$sql");
    OCIDefineByName($curs, "MEDATZ", $MEDATZ);
    OCIExecute($curs);
    OCIFetch($curs);

    $sql = "SELECT AVG(T.E1_VENCTO-T.E1_BAIXA) MEDAD";
    if ($cliente->ORIGEM != 'CO') {
        $sql .= "		  FROM INTEGRACAO.VW_TITULO_NF_SAIDA T";
    } else {
        $sql .= "		  FROM INTEGRACAO.VW_TITULO_INV_SAIDA T";
    }
    $sql .= " WHERE E1_TIPO IN ('NF')
             AND T.COD_CLI = LPAD($cliente->CODIGO,6,0)
             AND T.E1_VENCTO >= TO_DATE('20160101','YYYYMMDD')
             AND T.E1_BAIXA IS NOT NULL
             AND T.E1_VENCTO-T.E1_BAIXA > 0";
  //print $sql;
    $curs = OCIParse($conn, "$sql");
    OCIDefineByName($curs, "MEDAD", $MEDAD);
    OCIExecute($curs);
    OCIFetch($curs);

    ?>
<script>

$(document).ready(function() {
    calculaLimites();
})
    
function calculaLimites(){

    var a1 = $("#E1_TVALOR_SUM").val()*(1);
    var a2 = $("#E1_TAVALOR_SUM").val()*(1);
    var b1 = $("#ANTECIPACAO_SUM").val()*(1);
    var b2 = $("#AVISTA_SUM").val()*(1);
    var b3 = $("#PARCELA_SUM").val()*(1);
    var c = $("#E1_AVALOR_SUM").val()*(1);
    var sp = a1 + a2 + b3;
    var sv = b1 + b2 + c;
    var lp = $("#LIMITECR").val()*(1);
    var lv = $("#CLI_LIMITE_CRV").val()*(1);
    var xp = lp + sp;
    var xv = lv + sv;

    if((xv <= 0) && (xp <= 0)){
        var xs = xv + xp;
    }else if (xv > 0){
        var xs = xv;
    }else{
        var xs = xp;
    }

    $("#C_E1_TVALOR_SUM").html(format(a1)+"&nbsp;");
    $("#C_E1_TAVALOR_SUM").html(format(a2)+"&nbsp;");
    $("#C_ANTECIPACAO_SUM").html(format(b1)+"&nbsp;");
    $("#C_AVISTA_SUM").html(format(b2)+"&nbsp;");
    $("#C_PARCELA_SUM").html(format(b3)+"&nbsp;");
    $("#C_E1_AVALOR_SUM").html(format(c)+"&nbsp;");
    $("#C_SALDOP").html(format(sp)+"&nbsp;");
    $("#C_SALDOV").html(format(sv)+"&nbsp;");
    $("#C_LIMITE_EXP").html(format(xp)+"&nbsp;");
    $("#C_LIMITE_EXV").html(format(xv)+"&nbsp;");
    $("#C_LIMITE_EXG").html(format(xs)+"&nbsp;");
    $("#C_LMT_CRP").html(format(lp)+"&nbsp;");
    $("#C_LMT_CRV").html(format(lv)+"&nbsp;");
    $("#salvaLmt").html("&nbsp;");

    if(sp < 0) $("#C_SALDOP").css('color','#F00');
    else       $("#C_SALDOP").css('color','#000');
    if(sv < 0) $("#C_SALDOV").css('color','#F00');
    else       $("#C_SALDOV").css('color','#000');
    if(xp < 0) $("#C_LIMITE_EXP").css('color','#F00');
    else       $("#C_LIMITE_EXP").css('color','#000');
    if(xv < 0) $("#C_LIMITE_EXV").css('color','#F00');
    else       $("#C_LIMITE_EXV").css('color','#000');
    if(xs < 0) $("#C_LIMITE_EXG").css('color','#F00');
    else       $("#C_LIMITE_EXG").css('color','#000');
    
}

function salvaLimite(campo,limite){
  var cli_codigo = $("#cli_codigo").val();
    var pagina = '../../cliente/cadastro/ajax.php';
    var parametro = 'op=5&cli_codigo=' + cli_codigo + '&campo=' + campo + '&limite=' + limite;
    $("#salvaLmt").html('Salvando...');
    $("#salvaLmt").load(pagina,parametro);
    calculaLimites();
}

function edRestricao(){
  var cli_codigo = $("#cli_codigo").val();
    var pagina = '../../cliente/cadastro/cad_bloqueio.php'
    var parametro = 'cod_cli=' + cli_codigo;
    var height = 420;
    var width = 650;
    var btn = {};
    var titulo = 'Editar Restricao Financeira';
    var mensagem = '<div id="pageRest"></div>';
    janelaJQ(titulo,mensagem,height,width,btn);
    $("#pageRest").load(pagina,parametro);
}

function format(x) {
    if(isNaN(x))return "";
    x = parseFloat(x).toFixed(2);
    n = x.toString().split('.');
    z = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")+(n.length>1?"."+n[1]:"");
    x = z.replace(',','#');
    x = x.replace('.',',');
    x = x.replace('#','.');
    return x;
}

function valTpCampo(tipo){
  var tecla = window.event.keyCode;
  tecla     = String.fromCharCode(tecla);
  if(tipo == 'int'){
    if(!((tecla >= "0") && (tecla <= "9"))){
        window.event.keyCode = 0;
    }
  }else if(tipo == 'num'){
    if(!(((tecla >= "0") && (tecla <= "9"))||(tecla == '.'))){
        window.event.keyCode = 0;
    }
  }
}

</script>
<style>
.clPanelsGr{
  width:740px;
  height:240px;
}
</style>
<div style="height:280px; float:left; padding:2px; width: auto; overflow: hidden;">
  <div id="TabbedPanelsGr1">
    <ul class="TabbedPanelsTabGroup">
      <li class="TabbedPanelsTab" tabindex="0" style="font-size:12px">Resumo do Cr&eacute;dito</li>
      <li class="TabbedPanelsTab" tabindex="1" style="font-size:12px">T&iacute;tulos Pendentes</li>
      <li class="TabbedPanelsTab" tabindex="2" style="font-size:12px">OSs e Antecipa&ccedil;&otilde;es</li>
      <?php if (valida_acesso($login, $pass, 370)) { ?>
      <li class="TabbedPanelsTab" tabindex="3" style="font-size:12px">Cadastros</li>
      <?php } ?>
    </ul>
    <div class="TabbedPanelsContentGroup">
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div>
          <table width="720" border="0" cellspacing="2" cellpadding="2">
            <tr>
              <td align="center" valign="top" class="lablel">Cr&eacute;dito a Prazo</td>
              <td align="center" valign="top" class="lablel">Cr&eacute;dito a Vista</td>
            </tr>
            <tr>
              <td valign="top"><table width="100%" border="0" cellspacing="2" cellpadding="2">
                  <tr>
                    <td align="left" class="label">(+) T&iacute;tulos Pendentes a Vencer&nbsp;</td>
                    <td width="100" align="right" class="campoM" id="C_E1_TVALOR_SUM" style="color:#F00">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="left" class="label">(+) T&iacute;tulos Pendentes Vencidos&nbsp;</td>
                    <td align="right" class="campoM" id="C_E1_TAVALOR_SUM" style="color:#F00">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="left" class="label">(+) Valores a Faturar a Prazo</td>
                    <td align="right" class="campoM" id="C_PARCELA_SUM" style="color:#F00">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="border-top:solid 1px #999;" align="left" class="label">(=) Credito Concedido a Prazo</td>
                    <td style="border-top:solid 1px #999;" align="right" class="campoM" id="C_SALDOP">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="left" class="label">(+) Limite de Cr&eacute;dito a Prazo</td>
                    <td align="right" class="campoM" id="C_LMT_CRP">0,00&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="border-top:solid 1px #999;" align="left" class="label">(=) Saldo de Cr&eacute;dito a Prazo</td>
                    <td style="border-top:solid 1px #999;" align="right" class="campoM" id="C_LIMITE_EXP">0.00&nbsp;</td>
                  </tr>
                </table></td>
              <td align="left" valign="top"><table width="100%" border="0" cellspacing="2" cellpadding="2">
                  <tr>
                    <td align="left" class="label">(+) Valores a Faturar c/ Antecipa&ccedil;&atilde;o</td>
                    <td width="100" align="right" class="campoM" id="C_ANTECIPACAO_SUM" style="color:#F00">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="left" class="label">(+) Valores a Faturar a Vista</td>
                    <td align="right" class="campoM" id="C_AVISTA_SUM" style="color:#F00">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="left" class="label">(-) Saldo de Antecipa&ccedil;&otilde;es Pagas</td>
                    <td align="right" class="campoM" id="C_E1_AVALOR_SUM">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="border-top:solid 1px #999;" align="left" class="label">(=) Credito Concedido a Vista</td>
                    <td style="border-top:solid 1px #999;" align="right" class="campoM" id="C_SALDOV">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="left" class="label">(+) Limite de Cr&eacute;dito a Vista</td>
                    <td align="right" class="campoM" id="C_LMT_CRV">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="border-top:solid 1px #999;" align="left" class="label">(=) Saldo de Cr&eacute;dito a Vista</td>
                    <td style="border-top:solid 1px #999;" align="right" class="campoM" id="C_LIMITE_EXV">0.00&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="border-top:double 2px #999;" align="left" class="label">(=) Saldo de Cr&eacute;dito Geral</td>
                    <td style="border-top:double 2px #999;" align="right" class="campoM" id="C_LIMITE_EXG">&nbsp;</td>
                  </tr>
                </table></td>
            </tr>
            <tr>
              <td valign="top" style="border-top:solid 1px #999;"><table width="100%" border="0" cellspacing="2" cellpadding="2">
                  <tr>
                    <td align="left" class="label">&nbsp;M&eacute;dia de atraso no pagamento</td>
                    <td width="100" align="right" class="campoM" style="color:#F00"><?=  arruma_numero($MEDATZ, 0, 0); ?>&nbsp;Dias&nbsp;</td>
                  </tr>
                </table></td>
              <td valign="top" style="border-top:solid 1px #999;"><table width="100%" border="0" cellspacing="2" cellpadding="2">
                  <tr>
                    <td align="left" class="label">&nbsp;M&eacute;dia de antecipa&ccedil;&atilde;o no pagamento</td>
                    <td width="100" align="right" class="campoM"><?=  arruma_numero($MEDAD, 0, 0); ?>&nbsp;Dias&nbsp;</td>
                  </tr>
                </table></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:left;">
        <div align="left">
          <div style="height:240px; width:720px; border:solid 1px #CCC; overflow-y:scroll; overflow-x:hidden; background-color: beige;">
            <table class="stripedTable">
              <thead>
                <tr>
                  <th align="center">&nbsp;OS</th>
                  <th>&nbsp;Nota Fiscal</th>
                  <th>&nbsp;S&eacute;rie</th>
                  <th>&nbsp;Parcela</th>
                  <th>&nbsp;Vencimeto</th>
                  <th>&nbsp;Valor</th>
                </tr>
              </thead>
              <tbody>
    <?php

    $titulosPendCliente = titulosPendCliente($cliente->CODIGO);
    var_dump($titulosPendCliente);

    foreach ($titulosPendCliente as $titulo) {
        if ($titulo->DIAS <= 0) {
            $style = ' class="lnStCancel"';
            $E1_TAVALOR_SUM += $titulo->E1_VALOR;
        } else {
            $style = '';
            $E1_TVALOR_SUM += $titulo->E1_VALOR;
        }
        ?>
              <tr <?= $style;?>>
                <td align="center"><?= $titulo->OS;?>&nbsp;</td>
                <td><?= $titulo->NF;?>&nbsp;</td>
                <td><?= $titulo->SERIE;?>&nbsp;</td>
                <td><?= $titulo->PARCELA;?>&nbsp;</td>
                <td><?= $titulo->E1_VENCTO_TXT;?>&nbsp;</td>
                <td align="right"><?= arruma_numero($titulo->E1_VALOR,1,2);?>&nbsp;</td>
              </tr>
              <?php
    }
    ?>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="5" align="right">Total T&iacute;tulos A vencer</td>
                <td align="right"><?= arruma_numero($E1_TVALOR_SUM,1,2);?>&nbsp;
                  <input name="E1_TVALOR_SUM" type="hidden" id="E1_TVALOR_SUM" value="<?= $E1_TVALOR_SUM;?>"></td>
              </tr>
              <tr>
                <td colspan="5" align="right">Total T&iacute;tulos Vencidos</td>
                <td align="right" style="font-weight:bolder; color:#F00"><?= arruma_numero($E1_TAVALOR_SUM,1,2);?>&nbsp;
                  <input name="E1_TAVALOR_SUM" type="hidden" id="E1_TAVALOR_SUM" value="<?= $E1_TAVALOR_SUM;?>"></td>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:left;">
        <div align="left">
          <div style="height:240px; width:720px; border:solid 1px #CCC; overflow-y:scroll; overflow-x:hidden; background-color: beige;">
            <table class="stripedTable">
              <thead>
                <tr>
                  <th colspan="5" align="center">OSs em Aberto</th>
                  <th colspan="4" align="center" class="lablel">Antecipa&ccedil;&otilde;es</th>
                </tr>
                <tr>
                  <th rowspan="2" align="center">&nbsp;OS</th>
                  <th rowspan="2" align="center">&nbsp;Total<br>Faturado</th>
                  <th colspan="3" align="center">&nbsp;Total a Faturar</th>
                  <th rowspan="2" align="center">Data de Pagamento</th>
                  <th rowspan="2" align="center">&nbsp;Valor </th>
                  <th rowspan="2" align="center">&nbsp;Saldo </th>
                </tr>
                <tr>
                  <th align="center"> Antecipado</th>
                  <th align="center"> A Vista</th>
                  <th align="center"> a Prazo</th>
                </tr>
              </thead>
              <tbody>
              <?php
                $ossPendCliente = ossPendCliente($cliente->CODIGO);
                $ossPendCliente = is_array($ossPendCliente) ? $ossPendCliente : array($ossPendCliente);
                foreach ($ossPendCliente as $osPend) {
                    $VALOR_OS_SUM += $VALOR_OS_REST;
                    $ANTECIPACAO_SUM += $osPend->ANTECIPACAO;
                    $SALDO_ANT_SUM += $osPend->SALDO_ANT;
                    $AVISTA_SUM += $osPend->AVISTA;
                    $PARCELA_SUM += $osPend->PARCELA;
                    if ($BAIXA) {
                        $E1_AVALOR_SUM += $osPend->PG_ANTECIPADO;
                        $SALDO_ANT_SUM += $osPend->SALDO_ANT;
                    }
                    ?>
                <tr>
                  <td align="center"><?= $osPend->OS;?></td>
                  <td align="right"><?= arruma_numero($osPend->VALOR_FAT,1,2);?>&nbsp;
                    <input name="VALOR_OS_TOTAL" type="hidden" id="VALOR_OS_TOTAL" value="<?= $osPend->VALOR_OS_TOTAL;?>"></td>
                  <td align="right"><?= arruma_numero($osPend->ANTECIPACAO,1,2);?>&nbsp;</td>
                  <td align="right"><?= arruma_numero($osPend->AVISTA,1,2);?>&nbsp;</td>
                  <td align="right"><?= arruma_numero($osPend->PARCELA,1,2);?>&nbsp;</td>
                  <td align="center"><?= $VENCTO;?>&nbsp;</td>
                  <td align="right"><?= arruma_numero($osPend->PG_ANTECIPADO,1,2);?>&nbsp;</td>
                  <td align="right"><?= arruma_numero($osPend->SALDO_ANT,1,2);?>&nbsp;</td>
                </tr>
                    <?php
                }
                ?>
              </tbody>
              <tfoot>
                <tr>
                  <td align="right">&nbsp;Total OS&nbsp;</td>
                  <td align="right"><?= arruma_numero($VALOR_OS_SUM,1,2);?>&nbsp;
                    <input name="VALOR_OS_SUM" type="hidden" id="VALOR_OS_SUM" value="<?= $VALOR_OS_SUM;?>"></td>
                  <td align="right"><?= arruma_numero($ANTECIPACAO_SUM,1,2);?>&nbsp;
                    <input name="ANTECIPACAO_SUM" type="hidden" id="ANTECIPACAO_SUM" value="<?= $ANTECIPACAO_SUM;?>"></td>
                  <td align="right"><?= arruma_numero($AVISTA_SUM,1,2);?>&nbsp;
                    <input name="AVISTA_SUM" type="hidden" id="AVISTA_SUM" value="<?= $AVISTA_SUM;?>"></td>
                  <td align="right"><?= arruma_numero($PARCELA_SUM,1,2);?>&nbsp;
                    <input name="PARCELA_SUM" type="hidden" id="PARCELA_SUM" value="<?= $PARCELA_SUM;?>"></td>
                  <td align="right">&nbsp;Total Antecipa&ccedil;&otilde;es&nbsp;</td>
                  <td align="right"><?= arruma_numero($E1_AVALOR_SUM,1,2);?>&nbsp;</td>
                  <td align="right"><?= arruma_numero($SALDO_ANT_SUM,1,2);?>&nbsp;
                    <input name="E1_AVALOR_SUM" type="hidden" id="E1_AVALOR_SUM" value="<?= $SALDO_ANT_SUM;?>"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <?php
        if (valida_acesso($login, $pass, 370)) {
            $icone = statusCli($cliente->CODIGO);
            ?>
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:left;">
        <div align="left">
          <div style="height:240px; width:720px; border:solid 1px #CCC; overflow-y:auto; overflow-x:hidden;">
            <table width="95%" border="0" cellpadding="2" cellspacing="2">
              <tr>
                <td height="25" align="left" class="label" width="150"><?= idioma(440, $cod_sistema); ?></td>
                <td align="left"><input name="LIMITECR" id="LIMITECR" type="text" class="in w150" style="text-align:right" value="<?= $cliente->LIMITECR ?>" maxlength="15" onKeyPress="valTpCampo('num');" onBlur="salvaLimite('LIMITECR',$(this).val());">
                  <span id="salvaLmt" style="color:#093"></span></td>
              </tr>
              <tr>
                <td height="25" align="left" class="label"><?= idioma(440, $cod_sistema); ?> a Vista</td>
                <td align="left"><input name="CLI_LIMITE_CRV" id="CLI_LIMITE_CRV" type="text" class="in w150" style="text-align:right" value="<?= $cliente->CLI_LIMITE_CRV ?>" maxlength="15" onKeyPress="valTpCampo('num');" onBlur="salvaLimite('CLI_LIMITE_CRV',$(this).val());"></td>
              </tr>
              <tr>
                <td height="25" align="left" class="label">&nbsp;Status</td>
                <td align="left"><input name="retricao" type="button" id="retricao" title="Editar Restri&ccedil;&otilde;es" onClick="edRestricao()" value="Editar Restri&ccedil;&otilde;es" class="btDefault w200"></td>
              </tr>
            </table>
            <div id="mensRiscoTxt" class="campoM" style="background-color:<?=  $icone['LINHA1'] ?>; cursor:pointer; width:95%; padding: 5px;" onClick="mensRisco();"><?= $icone['ICONE'].' &nbsp; '.$icone['TITULO'] ;?></div>
          </div>
        </div>
      </div>
      <? } ?>
    </div>
  </div>
</div>
<div style="height:280px; float:left; padding:2px; width: auto; overflow: hidden;">
  <div id="TabbedPanelsGr2" class="clPanelsGr">
    <ul class="TabbedPanelsTabGroup">
      <li class="TabbedPanelsTab" tabindex="0" style="font-size:12px">Gr&aacute;ficos</li>
      <li class="TabbedPanelsTab" tabindex="0" style="font-size:12px">Tabela</li>
    </ul>
    <div class="TabbedPanelsContentGroup">
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div><img src="<?=  $chMes ?>"  alt="<?=  $chMes ?>"/></div>
      </div>
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div>
          <table width="720" border="0" cellspacing="2" cellpadding="2">
            <tr>
              <td align="center" class="lablel">M&ecirc;s</td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[0] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[1] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[2] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[3] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[4] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[5] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[6] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[7] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[8] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[9] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[10] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $mesLabArray[11] ;?></td>
            </tr>
            <tr>
              <td align="center" class="lablel">Valor</td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[0],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[1],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[2],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[3],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[4],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[5],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[6],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[7],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[8],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[9],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[10],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesValArr[11],1,2) ;?></td>
            </tr>
            <tr>
              <td align="center" class="lablel">M&eacute;dia</td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[0],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[1],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[2],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[3],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[4],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[5],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[6],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[7],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[8],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[9],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[10],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($mesMedArr[11],1,2) ;?></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<div style="height:280px; float:left; padding:2px; width: auto; overflow: hidden;">
  <div id="TabbedPanelsGr3" class="clPanelsGr">
    <ul class="TabbedPanelsTabGroup">
      <li class="TabbedPanelsTab" tabindex="0" style="font-size:12px">Gr&aacute;ficos</li>
      <li class="TabbedPanelsTab" tabindex="0" style="font-size:12px">Tabela</li>
    </ul>
    <div class="TabbedPanelsContentGroup">
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div><img src="<?=  $chAno ?>"  alt="<?=  $chAno ?>"/></div>
      </div>
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div>
          <table width="720" border="0" cellspacing="2" cellpadding="2">
            <tr>
              <td align="center" class="lablel">&nbsp;Ano</td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[0] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[1] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[2] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[3] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[4] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[5] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[6] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[7] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[8] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[9] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[10] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[11] ;?></td>
            </tr>
            <tr>
              <td align="center" class="lablel">Valor</td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[0],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[1],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[2],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[3],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[4],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[5],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[6],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[7],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[8],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[9],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[10],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoValArr[11],1,2) ;?></td>
            </tr>
            <tr>
              <td align="center" class="lablel">M&eacute;dia</td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[0],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[1],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[2],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[3],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[4],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[5],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[6],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[7],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[8],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[9],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[10],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($anoMedArr[11],1,2) ;?></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<div style="height:280px; float:left; padding:2px; width: auto; overflow: hidden;">
  <div id="TabbedPanelsGr4" class="clPanelsGr">
    <ul class="TabbedPanelsTabGroup">
      <li class="TabbedPanelsTab" tabindex="0" style="font-size:12px">Gr&aacute;ficos</li>
      <li class="TabbedPanelsTab" tabindex="0" style="font-size:12px">Tabela</li>
    </ul>
    <div class="TabbedPanelsContentGroup">
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div><img src="<?=  $propAno ?>"  alt="<?=  $propAno ?>"/></div>
      </div>
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div>
          <table width="720" border="0" cellspacing="2" cellpadding="2">
            <tr>
              <td align="center" class="lablel">&nbsp;Ano</td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[0] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[1] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[2] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[3] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[4] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[5] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[6] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[7] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[8] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[9] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[10] ;?></td>
              <td align="center" class="lablel">&nbsp;<?= $anoLabArray[11] ;?></td>
            </tr>
            <tr>
              <td align="center" class="lablel">Proposta</td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[0],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[1],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[2],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[3],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[4],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[5],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[6],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[7],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[8],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[9],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[10],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($valPropArr[11],1,2) ;?></td>
            </tr>
            <tr>
              <td align="center" class="lablel">O.S.</td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[0],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[1],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[2],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[3],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[4],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[5],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[6],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[7],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[8],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[9],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[10],1,2) ;?></td>
              <td align="center" class="campoM">&nbsp;<?= arruma_numero($propOsArr[11],1,2) ;?></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
var TabbedPanelsGr1 = new Spry.Widget.TabbedPanels("TabbedPanelsGr1");
var TabbedPanelsGr2 = new Spry.Widget.TabbedPanels("TabbedPanelsGr2");
var TabbedPanelsGr3 = new Spry.Widget.TabbedPanels("TabbedPanelsGr3");
var TabbedPanelsGr4 = new Spry.Widget.TabbedPanels("TabbedPanelsGr4");
</script>
<?php
}
if ($op == 'contCli') { 
?>
<script>

function cadCont(op,cli_codigo,con_codigo){
  const pagina = '../../cliente/cadastro/cad_contato_ajax.php';
  const parametro = 'op='+op+'&cli_codigo='+cli_codigo+'&con_codigo='+con_codigo;
  var btn = {};
  btn['<?= idioma(350,117); ?>'] = function() { salvaContato(); };
  ajxJanelaJQ('Cadastro de Contatos', pagina, parametro, 345, 490, btn, "cadContWin");
}

function mudaDef(campoRef,contNome,con_codigo){
    $('#cont'+campoRef+'lb').html('Salvando...');
    paginaAjax('../../cliente/cadastro/grava_dados.php','cadastro=11&cli_codigo=<?=  $cliente->CODIGO; ?>&campoRef='+campoRef+'&contNome='+contNome+'&con_codigo='+con_codigo,'#cont'+campoRef+'lb');
}

$(document).ready(function() {
//  $("#listContBox").height($(document).height()-150);
    $("#listContBox").height($(document).height()-250);
})
</script>
<div class="row">
  <fieldset>
    <label class="lbw130"><?= idioma(580,3) ?></label>
    <span class="campoM lbw500" id="contClb"><?= $cliente->CONTATO ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw130"><?= idioma(590,3) ?></label>
    <span class="campoM lbw500" id="contTlb"><?= $cliente->CONTATOTEC ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="row">
  <fieldset>
    <label class="lbw130"><?= idioma(600,3) ?></label>
    <span class="campoM lbw500" id="contFlb"><?= $cliente->CONTATOFIN ;?>&nbsp;</span>
  </fieldset>
</div>
<div class="coluna">
  <div class="parte">
   <div class="row">
    <label class="lbw90"><?= idioma(1,100) ?></label>
    <input type="text" name="locCont" id="locCont" class="in w200" style="height:18px" value="<?= $pesquisa; ?>" onBlur="buscaDado('contCli','pesquisa='+$(this).val())">
      <i class="icon-search pointer" onClick="buscaDado('contCli','pesquisa='+$('#locCont').val())"></i>
  </div>
  </div>
  <div class="parte">
   <div class="row">
    <input type="button" name="button" id="button" value="Novo" class="bt w150" onClick="cadCont('I',<?= $cliente->CODIGO; ?>,'');">
  </div>
</div>
</div>
<div class="campoM campoObs" style="height:95%; background-color:#FFF;" id="listContBox">
  <table width="95%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" valign="top"><table width="100%" border="0" cellspacing="1" cellpadding="1">
<?
  $contatosWR = " CODCLIENTE  = $cliente->CODIGO";
  $contatosOB = " CON_ATIVO DESC";
  if ($pesquisa)
    $where .= " AND UPPER(TRIM(NOME)||' '||TRIM(DEPTO)||' '||TRIM(CARGO)) LIKE UPPER('%$pesquisa%')";

  $contatos = contato('', $contatosWR, $contatosOB);
  foreach($contatos as $key => $contato){
?>
          <tr>
            <td align="left" class="titulo"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="130" align="left"><?= idioma(360,3) ?></td>
                  <td align="left">&nbsp;<?= $contato->NOME; ?><?= !$contato->ATIVO ? '&nbsp;(Inativo)' : ''; ?></td>
                  <td align="right" class="label"><?= idioma(730,3) ?></td>
                  <td width="300" align="center">
                    <input type="radio" name="contato_com" id="contato_com" value="<?= $contato->NOME ?>"<?= ($contato->NOME == $cliente->CONTATO) ? " checked" : ""; ?> onClick="mudaDef('C', '<?= $contato->NOME ?>', '<?= $contato->CON_CODIGO ?>')">
                    <label for="contato<?= $key ?>">Comercial</label>
                    <input type="radio" name="contato_tec" id="contato_tec" value="<?= $contato->NOME ?>"<?= ($contato->NOME == $cliente->CONTATOTEC) ? " checked" : ""; ?> onClick="mudaDef('T', '<?= $contato->NOME ?>', '<?= $contato->CON_CODIGO ?>')">
                    <label for="contato<?= $key ?>">T&eacute;cnico</label>
                    <input type="radio" name="contato_fin" id="contato_fin" value="<?= $contato->NOME ?>"<?= ($contato->NOME == $cliente->CONTATOFIN) ? " checked" : ""; ?> onClick="mudaDef('F', '<?=  $contato->NOME ?>', '<?= $contato->CON_CODIGO ?>')">
                    <label for="contato<?= $key ?>">Financeiro</label>
                  </td>
                  <td width="150" align="center">
                    <input type="button" name="button2" id="button2" value="Editar" class="bt w150" onClick="cadCont('A',<?=  $cliente->CODIGO; ?>,'<?= $contato->CON_CODIGO ?>');">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <?php if ($contato->ATIVO) { ?>
          <tr>
            <td colspan="4" align="left"><table width="100%" border="0" cellspacing="2" cellpadding="2">
                <tr>
                  <td width="130" align="left" class="label"><?= idioma(170,100) ?></td>
                  <td align="left" class="campoM"><?= $contato->DEPTO ?>&nbsp;</td>
                  <td width="100" align="left" class="label"><?= idioma(180,100) ?></td>
                  <td width="250" align="left" class="campoM"><?= $contato->CARGO ?>&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" class="label">Fone</td>
                  <td align="left" class="campoM"><?= $contato->TELEFONE ?>&nbsp;</td>
                  <td align="left" class="label">Fax</td>
                  <td align="left" class="campoM"><?= $contato->FAX ?>&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" class="label">E-mail</td>
                  <td align="left" class="campoM"><a href="mailto:<?= $contato->EMAIL ?>"><?= $contato->EMAIL ?></a>&nbsp;</td>
                  <td align="left" class="label">Cel Fone</td>
                  <td align="left" class="campoM"><?= $contato->CELULAR ?>&nbsp;</td>
                </tr>
              </table></td>
          </tr>
          <? } } ?>
          <tr>
            <td align="left" class="label">&nbsp;</td>
          </tr>
        </table></td>
    </tr>
  </table>
</div>
<?php }if ($op == 'logCli') { ?>
<table width="95%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td><table width="100%" border="0" cellspacing="2" cellpadding="2">
        <tr>
          <td colspan="4" align="left" class="label"><?= idioma(640,3) ?>&nbsp;</td>
        </tr>
        <tr>
          <td height="80" colspan="4" align="left" valign="top" class="campoM"><div class="campoObs"><?= $cliente->OBSERVA ;?>&nbsp;</div></td>
        </tr>
        <? if($cliente->COMEN_FAT){ ?>
        <tr>
          <td colspan="4" align="left" class="label"><?= idioma(670,3) ?>&nbsp;</td>
        </tr>
        <tr>
          <td height="80" colspan="4" align="left" valign="top" class="campoM"><div class="campoObs"><?= $cliente->COMEN_FAT;?>&nbsp;</div></td>
        </tr>
        <? }if($cliente->COMEN_COBR){ ?>
        <tr>
          <td colspan="4" align="left" class="label"><?= idioma(680,3) ?>&nbsp;</td>
        </tr>
        <tr>
          <td height="80" colspan="4" align="left" valign="top" class="campoM"><div class="campoObs"><?= $cliente->COMEN_COBR;?>&nbsp;</div></td>
        </tr>
        <? } ?>
        <tr>
          <td colspan="4" align="left" class="label">Log de Altera&ccedil;&otilde;es</td>
        </tr>
<?
        $log_cliente = log_cliente_txt($cliente->CODIGO);
?>
        <tr>
          <td align="left" class="campo"><div class="campoObs" style="height:300px;"><?=  $log_cliente; ?></div></td>
        </tr>
      </table></td>
  </tr>
</table>
<?php 
 }if ($op == 'arqCli') { 
?>
<iframe id="arq_frame" name="arq_frame" frameborder="0" height="250" width="100%" scrolling="no" src="../../ss3/complemento/arquivo_lista.php?filtro=<?= $cliente->CODIGO ;?>&op_file=7&desabilita=1"></iframe>
<?php
}if ($op == 'histCli') { 
?>
<script>
$(document).ready(function() {
    $("#TabbedPanelsHis").width($(window).width()-26);
    $("#TabbedPanelsHis").height($(window).height()-145);
    $("#histCliOS").width($(window).width()-50);
    $("#histCliOS").height($(window).height()-180);
    $("#histCliTit").width($(window).width()-50);
    $("#histCliTit").height($(window).height()-180);
    $("#fitroOS").buttonset();
    $("#fitroTit").buttonset();
    cllLink();
})

function cllLink(){
    buscaDado('histCliOS','');
}
</script>
<div style="padding:2px;">
  <div id="TabbedPanelsHis" class="clPanelsGr">
    <ul class="TabbedPanelsTabGroup">
      <li class="TabbedPanelsTab" tabindex="0" style="font-size:12px" onClick="buscaDado('histCliOS','')">OSs</li>
      <li class="TabbedPanelsTab" tabindex="1" style="font-size:12px" onClick="buscaDado('histCliTit','')">T&iacute;tulos</li>
    </ul>
    <div class="TabbedPanelsContentGroup">
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div id="fitroOS" style="width:100%; text-align:left; padding: 4px;"> <span class="label">&nbsp;&nbsp;&nbsp;&nbsp;Filtrar por: &nbsp;&nbsp;</span>
          <input name="fitroOS" type="radio" id="fitroOS1" value="1" onClick="buscaDado('histCliOS','grupo=0');" checked>
          <label for="fitroOS1">Cliente</label>
          <input name="fitroOS" type="radio" id="fitroOS2" value="2" onClick="buscaDado('histCliOS','grupo=1');">
          <label for="fitroOS2">Grupo</label>
        </div>
        <div id="histCliOS" style="border: 1px solid #A9A9A9; overflow: auto; background-color: floralwhite"></div>
      </div>
      <div class="TabbedPanelsContent painelIts" style="width:100%; height:100%; text-align:center;">
        <div id="fitroTit" style="width:100%; text-align:left; padding: 4px;"> <span class="label">&nbsp;&nbsp;&nbsp;&nbsp;Filtrar por: &nbsp;&nbsp;</span>
          <input name="fitroTit" type="radio" id="fitroTit1" value="1" onClick="buscaDado('histCliTit','grupo=0');" checked>
          <label for="fitroTit1">Cliente</label>
          <input name="fitroTit" type="radio" id="fitroTit2" value="2" onClick="buscaDado('histCliTit','grupo=1');">
          <label for="fitroTit2">Grupo</label>
        </div>
        <div id="histCliTit" style="border: 1px solid #A9A9A9; overflow: auto; background-color: floralwhite"></div>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
var TabbedPanelsHis = new Spry.Widget.TabbedPanels("TabbedPanelsHis");
</script>
<?php 
}if ($op == 'histCliOS') { 
?>
<script>
function abreLink(code,tipo){
    var titulo, caminho, posicao = 3, h, w, popup = 0;
    var btns = {};
    window.cod = code
    if(tipo == 1){
        caminho = '../../consulta/pdf/gera_invoice.php?order_no=' + cod;
        posicao = 0;
        h = 180;
        w = 400;
        popup = 1;
    }else if(tipo == 2){
        caminho = '../../consulta/pdf/pdf_os_geral.php?fs=2&tp_imp=5&cust_code=' + cod;
        popup = 1;
    }else if(tipo == 3){
        caminho = '../../consulta/pdf/pdf_os_geral.php?fs=2&tp_imp=1&cust_code=' + cod;
        popup = 1;
    }else if(tipo == 4){
        caminho = '../../consulta/pdf/pdf_os_geral.php?fs=2&tp_imp=2&cust_code=' + cod;
        popup = 1;
    }else if(tipo == 5){
        caminho = '../../consulta/pdf/pdf_os_geral.php?fs=2&tp_imp=4&cust_code=' + cod;
        popup = 1;
    }else if(tipo == 17){
        caminho = '../../plasma_m/ficha/imp_ficha.php?tp_imp=4&order_no=' + cod;
        popup = 1;
    }else if(tipo == 6){
        caminho = '../../revisor/aceite/pdf_proforma_inv.php?showpdf=2&cust_cod=' + cod;
        popup = 1;
        btns['Corrigir Nomes dos Itens']=function(){arrumaNome();};
    }else if((tipo == 7)||(tipo == 8)){
        caminho = '../../dqanet/followup/postit.php?t=OS&c=' + cod;
        posicao = 0;
        h = 400;
        w = 600;
        popup = 1;
    }else if(tipo == 9){
        caminho = '../../consulta/os/os_vendedor.php?os=' + cod;
        posicao = 2;
        h = 400;
        w = 850;
        popup = 1;
    }else if(tipo == 10){
        caminho = '../../revisor/aceite/aceite.php?os=' + cod;
        popup = 2;
    }else if(tipo == 14){
        caminho = '../../revisor/aceite/ck_list.php?os=' + cod;
        popup = 2;
    }else if(tipo == 11){
        caminho = '../../revisor/liberar/liberar_entrada.php?order_no=' + cod;
        popup = 0;
    }else if(tipo == 12){
        caminho = '../../revisor/liberar/liberar_consulta.php?order_no=' + cod;
        popup = 0;
    }
    
    if((popup == 1)||(popup == 2)){
        var caminhoArr = caminho.split('?');
        var pagina = caminhoArr[0];
        var parametro = caminhoArr[1];
        if(posicao == 3){
            w = $(window).width() - 20;
            h = $(window).height() - 20;
        }
        var mensagem = "<div id='usuResp' style='width:"+ (w - 30) +"px; height:"+ (h -90) +"px;'></div>";
        titulo = $("#nome"+tipo).html();
        parametro = parametro + "&jq=1&w=" + w + "&h=" + h;
        if(popup == 1){
            janelaJQ(titulo, mensagem, h, w, btns);
            $("#usuResp").load(pagina,parametro);
        }else if(popup == 2){
            ifmJanelaJQ(titulo, pagina, parametro, h, w);
        }
//      displayPopup(posicao, caminho, h, w, '', 1, '', 'imp_os');
    }else{
        location.href = caminho;
    }
    fechaMenu();
}
var painelH;

</script>
<div>
  <div id="menudiv" style="position:absolute; top:0px; display:none; left:0px;z-index:10000; width:200px;">
    <table border="0" cellpadding="2" cellspacing="1" bgcolor="#E0DFE3" style="border:outset 1px; width:200px;">
      <tr>
        <td class='titulo'><font size="1"><?= idioma(5520, 26) ?></font></td>
      </tr>
    </table>
    <table border="0" cellpadding="2" cellspacing="1" bgcolor="#E0DFE3" style="border:outset 1px; width:200px;">
      <tr class="menuItem" id="item1" onClick="abreLink(cod_pop,1)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Impres. Invoice">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/arq_icone/f_pdf.gif" border="0"></td>
        <td align="left" class='resp0' id='nome1'>Impres. Invoice</td>
      </tr>
      <tr class="menuItem" id="item2" onClick="abreLink(cod_pop,2)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="<?=  idioma(230, 3); ?>">
        <td width="20" height="23" align="center" valign="middle" align="left" class='resp0'>
        <img src="../../dqanet/imagens/arq_icone/f_pdf.gif" border="0">
        </td>
        <td align="left" class='resp0' id='nome2'><?= idioma(230, 3) ?></td>
      </tr>
      <tr class="menuItem" id="item3" onClick="abreLink(cod_pop,3)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="<?= idioma(5132, 3) ?>">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/arq_icone/f_pdf.gif" border="0"></td>
        <td align="left" class='resp0' id='nome3'><?= idioma(5132, 3) ?></td>
      </tr>
      <tr class="menuItem" id="item4" onClick="abreLink(cod_pop,4)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="<?= idioma(4000, 3) ?>">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/arq_icone/f_pdf.gif" border="0"></td>
        <td align="left" class='resp0' id='nome4'><?= idioma(4000, 3) ?></td>
      </tr>
      <tr class="menuItem" id="item5" onClick="abreLink(cod_pop,5)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="<?= idioma(3320, 3) ?>">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/arq_icone/f_pdf.gif" border="0"></td>
        <td align="left" class='resp0' id='nome5'><?= idioma(3320, 3) ?></td>
      </tr>
      <tr class="menuItem" id="item6" onClick="abreLink(cod_pop,6)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="<?= idioma(3320, 3) ?>">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/arq_icone/f_pdf.gif" border="0"></td>
        <td align="left" class='resp0' id='nome6'>Proforma Invoice</td>
      </tr>
      <tr class="menuItem" id="item17" onClick="abreLink(cod_pop,17)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Certificado de Calibra�ao">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/arq_icone/f_pdf.gif" border="0"></td>
        <td align="left" class='resp0' id='nome17'>Certificado de Calibração</td>
      </tr>
    </table>
    <table border="0" cellpadding="2" cellspacing="1" bgcolor="#E0DFE3" style="border:outset 1px; width:200px;">
      <tr>
        <td class='titulo'><font size="1">Outros</font></td>
      </tr>
    </table>
    <table border="0" cellpadding="2" cellspacing="1" bgcolor="#E0DFE3" style="border:outset 1px; width:200px;">
      <tr class="menuItem" id="item7" onClick="abreLink(cod_pop,7)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Post-It">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/geral/followup.gif" width="15" height="14" border="0" align="absmiddle"></td>
        <td align="left" class='resp0' id='nome7'>Post-It</td>
      </tr>
      <tr class="menuItem" id="item8" onClick="abreLink(cod_pop,8)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Post-It">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/geral/followup_v.gif" width="15" height="14" border="0" align="absmiddle"></td>
        <td align="left" class='resp0' id='nome8'>Post-It</td>
      </tr>
      <tr class="menuItem" id="item9" onClick="abreLink(cod_pop,9)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Resumo de Comissoes">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/geral/calculadora.png" width="12" height="16" border="0" align="absmiddle"></td>
        <td align="left" class='resp0' id='nome9'>Resumo de Comiss&otilde;es</td>
      </tr>
      <tr class="menuItem" id="item14" onClick="abreLink(cod_pop,14)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Fazer Check List">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/arq_icone/eml.png" width="13" height="11" border="0" align="absmiddle"></td>
        <td align="left" class='resp0' id='nome14'>Check List</td>
      </tr>
      <tr class="menuItem" id="item10" onClick="abreLink(cod_pop,10)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Enviar Aceite">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/arq_icone/eml.png" width="13" height="11" border="0" align="absmiddle"></td>
        <td align="left" class='resp0' id='nome10'>Enviar Aceite</td>
      </tr>
    </table>
    <table border="0" cellpadding="2" cellspacing="1" bgcolor="#E0DFE3" style="border:outset 1px; width:200px;">
      <tr>
        <td class='titulo'><font size="1">Libera&ccedil;&atilde;o de Itens</font></td>
      </tr>
    </table>
    <table border="0" cellpadding="2" cellspacing="1" bgcolor="#E0DFE3" style="border:outset 1px; width:200px;">
      <tr class="menuItem" id="item11" onClick="abreLink(cod_pop,11)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Enviar Aceite">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/caixa_pq.gif" width="15" height="15" alt="Liberar" border="0" align="absmiddle"></td>
        <td align="left" class='resp0' id='nome11'>Liberar</td>
      </tr>
      <tr class="menuItem" id="item12" onClick="abreLink(cod_pop,12)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Enviar Aceite">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/caixa_pq.gif" width="15" height="15" alt="Liberar" border="0" align="absmiddle"></td>
        <td align="left" class='resp0' id='nome12'>Cancelar</td>
      </tr>
      <tr class="menuItem" id="item13" onClick="f_recado(cod_pop,101)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="<?= idioma(3680, 26) ?>">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/entrada/documento.gif" width="15" height="16" alt="Follow-up"></td>
        <td align="left" class='resp0' id='nome13'><?= idioma(3680 , 26) ?></td>
      </tr>
      <tr class="menuItem" id="item15" onClick="cad_conflito(cod_pop)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Cadastro de Conflito">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/geral/pause.gif" width="15" height="16" alt="Conflito"></td>
        <td align="left" class='resp0' id='nome15'>Conflito</td>
      </tr>
      <tr class="menuItem" id="item16" onClick="abre_sgs(cod_pop)" style="cursor:pointer" onMouseOver="this.style.backgroundColor='#CCCCCC'" onMouseOut="this.style.backgroundColor='#E0DFE3'" title="Abrir SGS">
        <td width="20" height="23" align="center" valign="middle" class='resp0'><img src="../../dqanet/imagens/geral/relogio.gif" width="16" height="16" alt="Abrir SGS"></td>
        <td align="left" class='resp0' id='nome16'>Abrir SGS</td>
      </tr>
    </table>
  </div>
<?php
require_once("../../revisor/administracao/funcao.php");

if (!$inicio) {
$inicio = 1;
}
if ($inicio == 't') {
$passo = 1000;
$fim = 1000;
} else {
$passo = 16;
$fim = $inicio + $passo - 1;
}

if ($grupo == 1) {
$aux_con .= " AND O.CUST_KEY IN (SELECT LPAD(CC.CODIGO,6,0) 
               FROM SIAOS.CLIENTE CC 
              WHERE CC.CLI_GRUPO IN (SELECT CC.CLI_GRUPO 
                                       FROM SIAOS.CLIENTE CC 
                                      WHERE CC.CODIGO = $cli_codigo))";
} else {
$aux_con .= " AND O.CUST_KEY = $cli_codigo";
}

$order_by2 = "ORDER_NO DESC, CLIENTE";
//print '$s_pend:'.$s_pend;

$sql_from = "SELECT X.*,
     ROWNUM LINHA		 
FROM ((SELECT V.*,
(SELECT S.PST_NOME 
FROM SIAOS.PEND_OS PO 
INNER JOIN SIAOS.PEND_OS_STATUS S ON (S.PST_CODIGO = PO.PST_CODIGO)
WHERE PO.POS_CODIGO = SIAOS.PCK_REVISOR_SOL.SF_POS_CODIGO_ATUAL(ORDER_NO)
AND PO.ORDER_NO   = V.ORDER_NO) PST_NOME
FROM (SELECT O.ORDER_NO,
        SIAOS.PCK_REVISOR.SF_STATUS_OS(O.ORDER_NO) STATUS_NO,
        TRIM(CLIENTE_REDUZIDO) CLIENTE, 
O.USU_CHAPA_COM,
O.USU_CHAPA_TEC,
DECODE(O.USU_CHAPA_TEC,NULL,
(SELECT AE.AOS_NOME      FROM SIAOS.AREA_OS AE WHERE AE.AOS_CODIGO = O.AOS_CODIGO_TEC),
(SELECT TRIM(E.USU_NOME) FROM SIAOS.USUARIO E  WHERE E.USU_CHAPA   = O.USU_CHAPA_TEC)) COORD_TECNICO, 
C.USU_NOME COORD_COMERCIAL,
        O.PENDCONT,
        O.PENDENGA,
        O.DISTRIBUI,
        O.CANCEL,
        O.CITY,
        O.PO_NO,
        DECODE(U.USU_NOME,UPPER(U.USU_NOME)||' ('||TRIM(O.USUARIO)||')','') NOME_USUARIO,
TRIM(O.USUARIO) USUARIO,
        O.VERSAO_OS,
        O.STATUS_CONSULTA,
        O.INSPECAO_EXTERNA,
        DECODE(O.FLAG_PARCIAL,'P',1,0) PARCIAL,
NVL(O.TEM_PEDIDO,0) TEM_PEDIDO,
NVL(O.DOCUM_CERTIF,0) DOCUM_CERTIF,
        G.GDI_CODIGO,
O.MOEDA,
H.MULTA,
(SELECT TO_CHAR(SYSDATE - MAX(TRUNC(DT_PROD_TERMIN)),'FM990') FROM SIAOS.OELIN OE WHERE OE.ORDER_NO = O.ORDER_NO) DIAS_TER,
REPLACE(TRIM(SUBSTR(O.OBSERVACAO,0,DECODE(INSTR(O.OBSERVACAO, CHR(10)),0,100,INSTR(O.OBSERVACAO, CHR(10))))),CHR(10),'') OBSERVACAO,
(SELECT MP.MPG_DESCICAO FROM SIAOS.MODELO_PAGT MP WHERE MP.MPG_CODIGO = O.MPG_CODIGO) MPG_DESCICAO
   FROM SIAOS.OEHDR O 
INNER JOIN SIAOS.OEHDOM        H ON (H.ORDER_NO     = O.ORDER_NO)
INNER JOIN SIAOS.ORIGEM        G ON (O.ORIGEM       = G.ORIGEM)
INNER JOIN SIAOS.GRUPO_DIVISAO D ON (G.GDI_CODIGO   = D.GDI_CODIGO)
LEFT JOIN SIAOS.USUARIO       U ON (U.USU_CHAPA    = TRIM(O.USUARIO))
INNER JOIN GERAL.EMPRESA       E ON (O.EMP_ABERTURA = E.EMP_CODIGO)
INNER JOIN SIAOS.AREA_OS       A ON (A.AOS_CODIGO   = O.AOS_CODIGO_COM)
INNER JOIN SIAOS.USUARIO       C ON (C.USU_CHAPA    = A.USU_CHAPA)
  WHERE E.EMP_CODIGO_FAB = 1
    $aux_con) V									
  ORDER BY $order_by2) X) 
$aux_con2";
// print $sql_from;
// print $aux_con2;
/*
$sql = "SELECT COUNT(*) TOT_LINHA
FROM ($sql_from) ";
$curs = OCIParse($conn,$sql);
//print $sql;
OCIDefineByName($curs,"TOT_LINHA",$TOT_LINHA);
OCIExecute($curs);
OCIFetch($curs);
*/
$TOT_LINHA = $fim;
$linhas = 0;
$cab1 = 0;
$cab2 = 0;

?>
  <script>
function f_novaPreNota(order_no){
    var page = '../faturamento/grava.php?op=2&order_no='+order_no;
    if(confirm('Deseja iniciar uma Pré-Nota?')){
        //document.location.href = '../faturamento/grava.php?op=2&order_no='+order_no;
        document.location.assign(page);
    }
}
</script>
  <table width="100%" border="0" cellspacing="1" cellpadding="2" class="cab1">
    <?
    $sql = "SELECT T.*
      FROM ($sql_from) T ";

    if ($inicio != 't')
      $sql .= "     WHERE LINHA BETWEEN $inicio AND $fim";
    //print $sql;
    $curs = OCIParse($conn, $sql);
    OCIDefineByName($curs, "ORDER_NO", $ORDER_NO);
    OCIDefineByName($curs, "STATUS_NO", $STATUS_NO);
    OCIDefineByName($curs, "CLIENTE", $CLIENTE);
    OCIDefineByName($curs, "USU_CHAPA_COM", $USU_CHAPA_COM);
    OCIDefineByName($curs, "USU_CHAPA_TEC", $USU_CHAPA_TEC);
    OCIDefineByName($curs, "COORD_COMERCIAL", $COORD_COMERCIAL);
    OCIDefineByName($curs, "COORD_TECNICO", $COORD_TECNICO);
    OCIDefineByName($curs, "PENDCONT", $PENDCONT);
    OCIDefineByName($curs, "PENDENGA", $PENDENGA);
    OCIDefineByName($curs, "DISTRIBUI", $DISTRIBUI);
    OCIDefineByName($curs, "CANCEL", $CANCEL);
    OCIDefineByName($curs, "CITY", $CITY);
    OCIDefineByName($curs, "PO_NO", $PO_NO);
    OCIDefineByName($curs, "NOME_USUARIO", $NOME_USUARIO);
    OCIDefineByName($curs, "USUARIO", $USUARIO);
    OCIDefineByName($curs, "VERSAO_OS", $VERSAO_OS);
    OCIDefineByName($curs, "STATUS_CONSULTA", $STATUS_CONSULTA);
    OCIDefineByName($curs, "INSPECAO_EXTERNA", $INSPECAO_EXTERNA);
    OCIDefineByName($curs, "PARCIAL", $PARCIAL);
    OCIDefineByName($curs, "TEM_PEDIDO", $TEM_PEDIDO);
    OCIDefineByName($curs, "DOCUM_CERTIF", $DOCUM_CERTIF);
    OCIDefineByName($curs, "GDI_CODIGO", $GDI_CODIGO);
    OCIDefineByName($curs, "MOEDA", $MOEDA);
    OCIDefineByName($curs, "OBSERVACAO", $OBSERVACAO);
    OCIDefineByName($curs, "PST_NOME", $PST_NOME);
    OCIDefineByName($curs, "MULTA", $MULTA);
    OCIDefineByName($curs, "LINHA", $LINHA);
    OCIDefineByName($curs, "DIAS_TER", $DIAS_TER);
    OCIDefineByName($curs, "MPG_DESCICAO", $MPG_DESCICAO);
    OCIExecute($curs);
    while (OCIFetch($curs)) {
      $TOT_LINHA++;
      $linhas++;
      $img_al = '';
      $PRE_DT_ALARM = '';

      $PROTHEUS = "";
      /*
        $sqlP = "SELECT MIN(C5_NUM) PROTHEUS
                  FROM PROTPROD.SC5010 P
                 WHERE TRIM(P.C5_NUMOS) = TRIM(TO_CHAR($ORDER_NO))";
        $cursP = OCIParse($conn,"$sqlP");
        OCIDefineByName($cursP, "PROTHEUS", $PROTHEUS);
        OCIExecute($cursP);
        OCIFetch($cursP);*/
      if ($PROTHEUS)$PROTHEUS = "[$PROTHEUS]";

      $sqx = "SELECT TO_CHAR(MIN(R.PRE_DT_ALARM) - SYSDATE,'FM999999999990') ALARME,
                   TO_CHAR(SYSDATE,'YYYYMMDDHH24MI') HOJE,
                   TO_CHAR(MIN(R.PRE_DT_ALARM),'DD/MM/YYYY HH:MI:SS') PRE_DT_ALARM,
                   T.TRE_DESCRICAO,
                   P.PRP_CODIGO
              FROM SIAOS.PROP_RECADO R
             INNER JOIN  SIAOS.TIPO_RECADO T ON T.TRE_CODIGO = R.TRE_CODIGO
             INNER JOIN  SIAOS.PROPOSTA P ON P.PRP_CODIGO = R.PRP_CODIGO
             WHERE P.ORDER_NO = $ORDER_NO
               AND R.PRE_DT_BAIXA IS NULL
               AND TRUNC(R.PRE_DT_ALARM) <= TRUNC(SYSDATE+30)
             GROUP BY
                   T.TRE_DESCRICAO,
                   P.PRP_CODIGO";

      $cox = OCIParse($conn, $sqx);
      OCIDefineByName($cox, "ALARME", $ALARME);
      OCIDefineByName($cox, "HOJE", $HOJE);
      OCIDefineByName($cox, "PRE_DT_ALARM", $PRE_DT_ALARM);
      OCIDefineByName($cox, "TRE_DESCRICAO", $TRE_DESCRICAO);
      OCIExecute($cox);
      OCIFetch($cox);
      if ($PRE_DT_ALARM) {
        if ($ALARME > 0)
          $img_al = '<img src="../../dqanet/imagens/geral/alarme.gif" width="16" height="11" alt="' . $TRE_DESCRICAO . ": " . $PRE_DT_ALARM . '" border="0" align="absmiddle" onClick="f_recado(' . $ORDER_NO . ')" style="cursor:hand"> ';
        else
          $img_al = '<img src="../../dqanet/imagens/geral/alarme_on.gif" width="16" height="11" alt="' . $TRE_DESCRICAO . ": " . $PRE_DT_ALARM . '" border="0" align="absmiddle" onClick="f_recado(' . $ORDER_NO . ')" style="cursor:hand"> ';
      }
      /*$sql_ts = "SELECT SIAOS.PCK_REVISOR_SOL.SF_POS_CODIGO_ATUAL($ORDER_NO) POS_CODIGO
                 FROM DUAL";
      //        print $sql_ts;
      $curs_ts = OCIParse($conn,$sql_ts);
      OCIDefineByName($curs_ts,"POS_CODIGO",$POS_CODIGO);
      OCIExecute($curs_ts);
      OCIFetch($curs_ts);*/
      $POG_CODIGO = "";
      $sql = "SELECT PS.PST_CODIGO,
                   PS.PST_NOME,
                   PS.POG_CODIGO,
                   P.USU_CHAPA_SOL,
                   P.USU_CHAPA_AC,
                   P.USU_CHAPA_EX,
                   P.USU_CHAPA_AP_EA,
                   P.USU_CHAPA_AP_AC                   
              FROM SIAOS.PEND_OS P INNER JOIN SIAOS.PEND_OS_STATUS PS ON PS.PST_CODIGO = P.PST_CODIGO
             WHERE ORDER_NO = $ORDER_NO
               AND POS_CODIGO = SIAOS.PCK_REVISOR_SOL.SF_POS_CODIGO_ATUAL(ORDER_NO)";
      //    print $sql;
      $curs_iv = OCIParse($conn, "$sql");
      OCIDefineByName($curs_iv, "PST_CODIGO", $PST_CODIGO);
      OCIDefineByName($curs_iv, "PST_NOME", $PST_NOME);
      OCIDefineByName($curs_iv, "POG_CODIGO", $POG_CODIGO);
      OCIDefineByName($curs_iv, "USU_CHAPA_SOL", $USU_CHAPA_SOL);
      OCIDefineByName($curs_iv, "USU_CHAPA_AC", $USU_CHAPA_AC);
      OCIDefineByName($curs_iv, "USU_CHAPA_EX", $USU_CHAPA_EX);
      OCIDefineByName($curs_iv, "USU_CHAPA_AP_EA", $USU_CHAPA_AP_EA);
      OCIDefineByName($curs_iv, "USU_CHAPA_AP_AC", $USU_CHAPA_AP_AC);
      OCIExecute($curs_iv);
      OCIFetch($curs_iv);

      $STATUS = $PST_NOME;
      $bg_hover = '#00CC99';

      if (($CANCEL == 'S') || ($STATUS_NO == 2)) {
        $bg_hover = '#FF8000';
        if ($css == "respRed")
          $css = "respRed2";
        else
          $css = "respRed";
      } elseif ($STATUS_NO == 4) {
        $bg_hover = '#CFCFFF';
        if ($css == "respYellow")
          $css = "respYellow2";
        else
          $css = "respYellow";
      }
      elseif ($STATUS_NO == 21) {
        $bg_hover = '#CFCFFF';
        if ($css == "respBlue")
          $css = "respBlue2";
        else
          $css = "respBlue";
      }
      elseif (($STATUS_NO == 15) || ($STATUS_NO == 16) || ($STATUS_NO == 20)) {
        if ($css == "resp_v")
          $css = "resp_v2";
        else
          $css = "resp_v";
      }
      else {
        if ($css == "resp")
          $css = "resp2";
        else
          $css = "resp";
      }

      $tx_ep = "";
      $ORDER_NO_EP = "";
      $nome_ref = "";

      if (!$passou) {
        ?>
    <tr>
      <td class="lablel" align="center" height="23" width="230">O.S.</td>
      <td class="lablel" align="center" width="70"><table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size:9px; text-align:center;">
          <tr>
            <td colspan="3" style="padding:0px 0px 4px 0px ">Aprova&ccedil;&atilde;o</td>
          </tr>
          <tr>
            <td>CO</td>
            <td>EN</td>
            <td>DI</td>
          </tr>
        </table></td>
      <td class="lablel">&nbsp;Cliente</td>
      <td width="110" align="center" class="lablel">Data<br>
        Contratual</td>
      <td width="190" align="center" class="lablel">Status</td>
      <td align="center" class="lablel">Valor OS</td>
      <td width="120" align="center" class="lablel">Forma Pgto.</td>
    </tr>
    <?
    }
    $passou = 1;

    if ($PENDCONT)$co = "<img src='../../dqanet/imagens/geral/vermelho.gif' alt='Aprovação Comercial Pendente'>";
    else $co = "<img src='../../dqanet/imagens/geral/verde.gif' alt='Aprovação Comercial OK'>";

    if ($PENDENGA)$en = "<img src='../../dqanet/imagens/geral/vermelho.gif' alt='Aprovaçãoo Técnica Pendente'>";
    else $en = "<img src='../../dqanet/imagens/geral/verde.gif' alt='Aprovação Técnica OK'>";

    if ($DISTRIBUI != 1)$di = "<img src='../../dqanet/imagens/geral/vermelho.gif' alt='Distribuição Pendente'>";
    else $di = "<img src='../../dqanet/imagens/geral/verde.gif' alt='Distribuída'>";

    $sql = "SELECT  COUNT(*) TOTAL
              FROM SIAOS.VW_INVOICE_OS
             WHERE ORDER_NO = $ORDER_NO";
    //print $sql;
    $curs_iv = OCIParse($conn, "$sql");
    OCIDefineByName($curs_iv, "TOTAL", $TEM_INVOICE);
    OCIExecute($curs_iv);
    OCIFetch($curs_iv);
    /*
    $sql_lk = "SELECT SIAOS.PCK_DQANET.SF_ACESSA_OS($ORDER_NO,$s_chapa,$acesso) LK FROM DUAL";          
    $curs_lk = OCIParse($conn,$sql_lk);
    OCIDefineByName($curs_lk,"LK",$LK);
    OCIExecute($curs_lk);
    OCIFetch($curs_lk);
    */
    $sql_f = "SELECT SIAOS.PCK_WEB_RELATORIO.SF_TEM_FOLLOWUP(OEHDR.ORDER_NO) FOLLOW,
                    TO_NUMBER(SIAOS.PCK_DQANET.SF_CONVERTE_MOEDA(NVL(SIAOS.PCK_REVISOR.SF_VALOR_POR_TIPO(OEHDR.ORDER_NO,11),0),'$pais->MOEDA','R$',SYSDATE)) VALOR_OS
               FROM SIAOS.OEHDR
              WHERE OEHDR.ORDER_NO = $ORDER_NO";
    $curs_f = OCIParse($conn, "$sql_f");
    OCIDefineByName($curs_f, "FOLLOW", $FOLLOW);
    OCIDefineByName($curs_f, "VALOR_OS", $VALOR_OS);
    OCIExecute($curs_f);
    OCIFetch($curs_f);
    /*
    $sql_f = "SELECT PEP.ORDER_NO ORDER_NO_EP,
                     PEP.PEP_TIPO,
                    (SELECT P.PNI_DTBAIXA  FROM SIAOS.PENDENCIA_USER_ITEM P  WHERE P.PNU_NUMERO  = PEP.PNU_NUMERO_AC)  DT_BXAC,
                    (SELECT P2.PNI_DTBAIXA FROM SIAOS.PENDENCIA_USER_ITEM P2 WHERE P2.PNU_NUMERO = PEP.PNU_NUMERO) DT_BXEP
               FROM SIAOS.PEND_EP PEP
              WHERE PEP.ORDER_NO = $ORDER_NO";
    //print $sql_f.";<br>";
    $curs_f = OCIParse($conn,"$sql_f");
    OCIDefineByName($curs_f,"ORDER_NO_EP",$ORDER_NO_EP);
    OCIDefineByName($curs_f,"PEP_TIPO",$PEP_TIPO);
    OCIDefineByName($curs_f,"DT_BXAC",$DT_BXAC);
    OCIDefineByName($curs_f,"DT_BXEP",$DT_BXEP);
    OCIExecute($curs_f);
    OCIFetch($curs_f);      
    */
    $SAC_NUMERO = "";
    $sql_sac = "SELECT A.SAC_NUMERO
                  FROM SIAOS.PROPOSTA P
                 INNER JOIN DIATNET.ACAO_SAC A ON P.PRP_CODIGO = A.PRP_CODIGO
                 WHERE P.ORDER_NO = $ORDER_NO";
    //print $sql_sac;
    $curs_sac = OCIParse($conn, "$sql_sac");
    OCIDefineByName($curs_sac, "SAC_NUMERO", $SAC_NUMERO);
    OCIExecute($curs_sac);
    OCIFetch($curs_sac);

    $sql_sac = "SELECT P.PED_CODIGO
                  FROM INTEGRACAO.PEDIDO P
                 WHERE P.ORDER_NO = $ORDER_NO
                   AND P.PED_DT_FECHAMENTO IS NULL";
    //print $sql_sac;
    $curs_sac = OCIParse($conn, "$sql_sac");
    OCIDefineByName($curs_sac, "PED_CODIGO", $PED_CODIGO);
    OCIExecute($curs_sac);
    OCIFetch($curs_sac);

    $bx_ep_pend = 0;
    $ep_ok = 0;
    if (!$ORDER_NO_EP) {
      $tx_ep = "";
      $PEP_TIPO = 0;
      $bx_ep_pend = 0;
      $ep_ok = 0;
    } else {
      $tx_ep = "Aguardando definição de EP";
      $bx_ep_pend = 1;

      if ($PEP_TIPO == 1) {
        if (($DT_BXEP) && (!$DT_BXAC)) {
          $tx_ep = "Aguardando revisão de AC";
        } else {
          $tx_ep = "EP Coordena Tecnicamente";
          $ep_ok = 1;
        }
        $bx_ep_pend = 2;
      } elseif ($PEP_TIPO == 2) {
        $tx_ep = "O.S. Coordenada por EP";
        $bx_ep_pend = 2;
        $ep_ok = 1;
      } else {
        if (!$DT_BXEP) {
          $tx_ep = "Aguardando definição de EP";
          $bx_ep_pend = 1;
          $ep_ok = 0;
        } else {
          $tx_ep = "";
          $bx_ep_pend = 0;
          $ep_ok = 0;
        }
      }
    }

    $restricao = "";
    /*
    if((!$TEM_INVOICE) || (!valida_acesso($login,$pass,276)))
        $restricao = "1,";*/
    if (!$LK)
      $restricao .= "2,3,4,5,6,7,8,9,10,";
    if ($FOLLOW)
      $restricao .= "7,";
    else
      $restricao .= "8,";
    if (!valida_acesso($login, $pass, 408))
      $restricao .= "9,";
    if ((!valida_acesso($login, $pass, 182)) && (valida_acesso($login, $pass, 183)))
      $restricao .= "10,";

    if ($PED_CODIGO) {
      $link_os = '<a style="text-decoration:underline" target="_self" href="../faturamento/grava.php?op=1&ped_codigo=' . $PED_CODIGO . '">';
    } else {
      $link_os = "";
    }

    if ($nome_ref)
      $valor_ref = nome_reduzido($nome_ref, 1);
    else
    if ($VALOR_OS > 0)
      $valor_ref = number_format($VALOR_OS, 2, ",", ".");
    else
      $valor_ref = "";

    $icone = "";
    if ($PARCIAL) {
      $titulo = "Aceita Parcial";
      $icone = "<div class=\"tagRisco tagRLA\" title=\"$titulo\">P</div>";
    }
    if ($VALOR_PN) {
      if ($VALOR_PN == $VALOR_TER) {
        $titulo = "Pré Nota: " . number_format($VALOR_INV, 2, ",", ".");
        $icone .= "<div class=\"tagRisco tagRVE\" title=\"$titulo\">In</div>";
      }
      if ($VALOR_TER > $VALOR_PN) {
        $titulo = "Pré Nota Parcial: " . number_format($VALOR_INV, 2, ",", ".");
        $icone .= "<div class=\"tagRisco tagRLA\" title=\"$titulo\">In</div>";
      }
    }
    if ($VALOR_INV) {
      if ($VALOR_INV == $VALOR_TER) {
        $titulo = "Invoice: " . number_format($VALOR_INV, 2, ",", ".");
        $icone .= "<div class=\"tagRisco tagRVE\" title=\"$titulo\">In</div>";
      }
      if ($VALOR_TER > $VALOR_INV) {
        $titulo = "Invoice Parcial: " . number_format($VALOR_INV, 2, ",", ".");
        $icone .= "<div class=\"tagRisco tagRLA\" title=\"$titulo\">In</div>";
      }
    }
    ?>
    <tr class="<?= $css ?>" id="ln<?= $ORDER_NO ?>">
      <td height="30" align="center"><table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="20" align="center" style="cursor:pointer" onClick="detalheOS(<?= $ORDER_NO ?>,'<?= $s_pend ?>')"><img src="../../dqanet/imagens/geral/c3.gif" width="16" height="16" alt="Expandir" align="absmiddle" id="img<?= $ORDER_NO ?>">
              <input id="numOS" name="numOS" type="hidden" value="<?= $ORDER_NO ?>"></td>
            <td align="center" class="resp0"><div style="position:relative; float: left;margin: 2px 2px 2px 0px;"><?= $link_os.substr($ORDER_NO,0,4).'/'.substr($ORDER_NO,4,5); if($PED_CODIGO) print "</a>&nbsp;&nbsp;<span title='Número de Pré-Nota' style='color:#090;font:bold;'>PN: $PED_CODIGO<span>"; ?></div>
              <?= $icone ?></td>
            <td width="20" align="center"><? if($VERSAO_OS != 1) { ?>
              <img src="../../dqanet/imagens/geral/star.gif" width="10" height="10" alt="O.S. Antiga - SIAOS ">
              <? } elseif($STATUS_CONSULTA == 'A') { ?>
              <img src="../../dqanet/imagens/geral/avancar.gif" alt="<?= idioma(4067,26,$lingua,$db_qinet) ?>" width="20" height="16">
              <? } elseif($STATUS_CONSULTA == 'P') { ?>
              <img src="../../dqanet/imagens/geral/atencao.gif" alt="<?= idioma(4060,26,$lingua,$db_qinet) ?>" width="20" height="16">
              <? } elseif(($tx_ep)&&($bx_ep_pend == 1)) { ?>
              <img src="../../dqanet/imagens/visivel.jpg" width="14" height="14" alt="<?= $tx_ep; if($SAC_NUMERO) print " - SAC: ".$SAC_NUMERO;?>" align="absmiddle"<?php if ($link_ep) {?> onClick="location.href='../projetos/baixa_analise.php?ORDER_NO=<?= $ORDER_NO ?>'" style="cursor:pointer"<?php } ?>>
              <? } elseif($INSPECAO_EXTERNA == "I") { ?>
              <img src="../../dqanet/imagens/geral/lupa.gif" width="14" height="14" alt="Inspeção Externa - <?  if($tx_ep) print $tx_ep; if($SAC_NUMERO) print " - SAC: ".$SAC_NUMERO; ?>">
              <? } elseif($tx_ep) { ?>
              <img src="../../dqanet/imagens/geral/gerente.png" alt="<?= $tx_ep; if($SAC_NUMERO) print " - SAC: ".$SAC_NUMERO; ?>" align="absmiddle"<?php if (!$ep_ok) { ?> style="opacity: 0.5; filter: alpha(opacity=50);"<?php } ?>>
              <? } elseif($SAC_NUMERO) { ?>
              <img src="../../dqanet/imagens/geral/tecnico.png" border="0" alt="<?= "SAC Nº: ".$SAC_NUMERO ?>">
              <? } elseif($TOR_CODIGO == 2) { ?>
              <img src="../../dqanet/imagens/geral/raio.gif" width="10" height="13" alt="SER">
              <? } elseif($GDI_CODIGO == 6) { ?>
              <img src="../../dqanet/imagens/images/interna.gif" alt="<?= idioma(4030, 26) ?>" width="14" height="12" align="absmiddle">
              <? } else {?>
              &nbsp;
              <? } ?></td>
            <td width="20" align="center"><?
            //var_dump($CANCEL);
            if ($STATUS_NO == 20) {
              ?>
              <img src="../../dqanet/imagens/geral/cadeado_red.gif" width="13" height="15" alt="<?= $STATUS ?>" align="absmiddle">
              <? } elseif(($POG_CODIGO == 1)||($POG_CODIGO == 2)) { ?>
              <?= $link_os ?><img style="cursor:pointer" title="Editar O.S." src="../../dqanet/imagens/geral/edit.gif" width="16" height="14" border="0"></a>
              <? } elseif($POG_CODIGO == 5) { ?>
              <img src="../../dqanet/imagens/geral/edit.gif" alt="" width="16" height="14" border="0" title="Editar O.S." style="cursor:pointer" onClick="location.href='grava.php?ORDER_NO=<?= $ORDER_NO ?>'">
              <? } else { ?>
              <img src="../../dqanet/imagens/geral/edit.gif" alt="" width="16" height="14" border="0" style="cursor:pointer" title="Editar O.S." onClick="top.location.href='../../revisor/comercial/comercial_grava.php?op=19&tipo_sol=2&ORDER_NO=<?= $ORDER_NO ?>'">
              <? } ?></td>
            <td width="20" align="center" style="cursor:pointer" onClick="contextoMenu(<?=  $ORDER_NO ?>,'<?=  $restricao ?>');"><img src="../../dqanet/imagens/geral/menu.gif" width="16" height="16" border="0" align="absmiddle" alt="<?=  idioma(4990, 26); ?>" name="editar_prp" id="list"></td>
          </tr>
        </table></td>
      <td align="center"><table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="20" align="center"><?= $co ?></td>
            <td width="20" align="center"><?= $en ?></td>
            <td width="20" align="center"><?= $di ?></td>
          </tr>
        </table></td>
      <td align="left">&nbsp;<?= $img_al; ?><?=  $CLIENTE ?>
              <?php if ($OBSERVACAO) {?>
        &nbsp;<span style="font-size:10px; color:#090; position:relative" title="Descrição">[<?=  $OBSERVACAO; ?>]</span>
              <?php } ?></td>
      <td width="120" align="center"><?php if ($DT_CONTRATUAL) { ?>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="<?= $css ?>">
            <td align="center" width="20"><? if($MULTA == 'M'){ ?>
              <span style="color:#8A0303; font-weight:900; background:#FFD600; border:1px #8A0303; padding: 4px">M</span></td>
                                     <?php } ?>
            <td align="center"<? if($DIAS < 0){ ?> style="color:#FF0000; font-weight:900;"<? } ?>><?= $DT_CONTRATUAL; ?></td>
            <td width="40" align="center"<?php if ($DIAS < 0) {
                ?> style="color:#FF0000; font-weight:900;"<?php
                                         } ?>><?=  "[" . $DIAS . "]"; ?></td>
          </tr>
        </table>
          <?php } else {
              print "Não Consta";
          }?></td>
      <td align="center" style="cursor:pointer" onClick="MostraDetalheStatus(<?= $ORDER_NO ?>);"><?= $STATUS; ?></td>
      <?php
        $subTotal += $VALOR_TER;
        $geralTotal += $VALOR_TER;
        ?>
      <td align="<?= $txt_align ?>"><?=  $valor_ref; ?>&nbsp;</td>
      <td><?=  $MPG_DESCICAO ?></td>
    </tr>
<?php } ?>
    <?php
    if ($s_pend) {
        ?>
    <tr class="resp2" style="font:bolder 12px;">
      <td align="right" height="23" colspan="4" style="border-top:#000 1px solid;">Subtotal (R$)</td>
      <td align="right" style="border-top:#000 1px solid;"><?= number_format($subTotal,2,",","."); ?>&nbsp;</td>
      <td align="right" style="border-top:#000 1px solid;">&nbsp;</td>
      <td align="right" style="border-top:#000 1px solid;">&nbsp;</td>
    </tr>
    <tr class="resp2" style="font:bolder 12px;">
      <td align="right" height="23" colspan="4" style="border-top:#000 1px solid;">Total Geral (R$)</td>
      <td align="right" style="border-top:#000 1px solid;"><?= number_format($geralTotal,2,",","."); ?>&nbsp;</td>
      <td align="right" style="border-top:#000 1px solid;">&nbsp;</td>
      <td align="right" style="border-top:#000 1px solid;">&nbsp;</td>
    </tr>
        <?php
        $subTotal = 0;
    }
    ?>
  </table>
  </td>
  </tr>
  <tr id="paginador">
    <td align="center"><?
    if (($linhas >= $passo) || ($inicio > 1)) {
      ?>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:inset 1px;">
        <tr>
          <td class="lablel">&nbsp;</td>
          <? if($inicio > 1) { ?>
          <td class="lablel2" width="70" align="center" height="30"><a style="text-decoration:underline " href="#" onClick="buscaDado('histCliOS','grupo=0&inicio=<?= $inicio-$passo ?>')">Anterior</a></td>
          <? } ?>
          <td class="lablel" width="50">&nbsp;</td>
          <? if($fim < $TOT_LINHA){ ?>
          <td class="lablel2" width="70" height="30" align="center"><a style="text-decoration:underline " href="#" onClick="buscaDado('histCliOS','grupo=0&inicio=<?= $fim+1 ?>')">Pr&oacute;ximo</a></td>
          <? } ?>
          <td class="lablel">&nbsp;</td>
          <td class="lablel"><a style="text-decoration:underline " href="#" onClick="buscaDado('histCliOS','grupo=0&inicio=t')">Todas</a></td>
        </tr>
        <?php
        }
        ?>
      </table>
</div>
<?php }if ($op == 'histCliTit') { ?>
<div style="background-color: beige;">
  <table class="stripedTable">
    <thead>
      <tr>
        <th align="center">Cliente</th>
        <th align="center" class="lablel">OS</th>
        <th>Nota Fiscal</th>
        <th>Status</th>
        <th>Parcela</th>
        <th>Vencimeto</th>
        <th>Baixa</th>
        <th>Dias</th>
        <th>Saldo</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
    <?php
    $DT_DE = '01/01/2014';
    $DT_ATE = date('d/m/Y');
    $where = '';
    if ($grupo == 1) {
        $where = " COD_CLI IN (SELECT LPAD(CC.CODIGO,6,0) 
                                  FROM SIAOS.CLIENTE CC 
                                 WHERE CC.CLI_GRUPO IN (SELECT CC.CLI_GRUPO 
                                                          FROM SIAOS.CLIENTE CC 
                                                         WHERE CC.CODIGO = {$cliente->CODIGO}))";
    } else {
        $where = " COD_CLI = LPAD(TRIM('{$cliente->CODIGO}'),6,'0')";
    }
    $orderBy = "TO_DATE(TRIM(T.E1_VENCTO),'DD/MM/YYYY') DESC, OS, NF, SERIE, PARCELA";
    //$showSql = 1;
    $titulos = titulosCadCliente('', $where, $orderBy);
    $resumo = array();
    foreach ($titulos as $titulo) {
        if ($titulo->LEGENDA == 'ANTECIPADO') {
            $class = 'Info';
            //$style = ' style="border-bottom: 1px solid #B3B3B3; font-weight:bolder; color:#00A;"';
            $ANT_VALOR_SUM  += $titulo->E1_VALOR_DB;
            $ANT_VALOR_MPON += $titulo->E1_VALOR_DB * $DIAS;
            $ANT_DIAS_SUM   += $titulo->DIAS;
            $comp = '';
            $cod = 3;
            $resumo[$cod]['class'] = $class;
            $resumo[$cod]['posicao'] = 'P';
            $resumo[$cod]['DESC'] = 'Total T&iacute;tulos de Antecipa&ccedil;&atilde;o';
            $resumo[$cod]['LEGENDA'] = $titulo->LEGENDA.$comp;
            $resumo[$cod]['VALOR_SUM'] += $titulo->E1_VALOR_DB;
            $resumo[$cod]['VALOR_MPON'] += $titulo->E1_VALOR_DB * $DIAS;
            $resumo[$cod]['DIAS_SUM'] += $titulo->DIAS;
        } elseif ($titulo->LEGENDA == 'VENCIDO') {            
            $class = 'Danger';
            //$$style = ' style="border-bottom: 1px solid #B3B3B3; font-weight:bolder; color:#B60;"';
            $VEN_VALOR_SUM  += $titulo->E1_VALOR_DB;
            $VEN_VALOR_MPON += $titulo->E1_VALOR_DB * $titulo->DIAS;
            $VEN_DIAS_SUM   += $titulo->DIAS;
            $comp = '';
            $cod = 4;
            $resumo[$cod]['class'] = $class;
            $resumo[$cod]['posicao'] = 'A';
            $resumo[$cod]['DESC'] = 'Total T&iacute;tulos A Vencer';
            $resumo[$cod]['LEGENDA'] = $titulo->LEGENDA.$comp;
            $resumo[$cod]['VALOR_SUM'] += $titulo->E1_VALOR_DB;
            $resumo[$cod]['VALOR_MPON'] += $titulo->E1_VALOR_DB * $DIAS;
            $resumo[$cod]['DIAS_SUM'] += $titulo->DIAS;
        } elseif ($titulo->LEGENDA == 'AVENCER') {            
            $class = '';
            //$$style = ' style="border-bottom: 1px solid #B3B3B3; font-weight:bolder; color:#0A6;"';
            $AVE_VALOR_SUM  += $titulo->E1_VALOR_DB;
            $AVE_VALOR_MPON += $titulo->E1_VALOR_DB * $titulo->DIAS;
            $AVE_DIAS_SUM   += $titulo->DIAS;
            $comp = '2';
            $cod = 5;
            $resumo[$cod]['class'] = $class;
            $resumo[$cod]['posicao'] = 'A';
            $resumo[$cod]['DESC'] = 'Total T&iacute;tulos Vencidos';
            $resumo[$cod]['LEGENDA'] = $titulo->LEGENDA.$comp;
            $resumo[$cod]['VALOR_SUM'] += $titulo->E1_VALOR_DB;
            $resumo[$cod]['VALOR_MPON'] += $titulo->E1_VALOR_DB * $DIAS;
            $resumo[$cod]['DIAS_SUM'] += $titulo->DIAS;
        } elseif ($titulo->DIAS > 5) {            
            $class = 'Info';
            //$$style = ' style="border-bottom: 1px solid #B3B3B3; font-weight:bolder; color:#070;"';
            $ADI_VALOR_SUM  += $titulo->E1_VALOR_DB;
            $ADI_VALOR_MPON += $titulo->E1_VALOR_DB * $titulo->DIAS;
            $ADI_DIAS_SUM   += $titulo->DIAS;
            $comp = ' ANTEC.';
            $cod = 2;
            $resumo[$cod]['class'] = $class;
            $resumo[$cod]['posicao'] = 'P';
            $resumo[$cod]['DESC'] = 'Total T&iacute;tulos Pagos Adiantados';
            $resumo[$cod]['LEGENDA'] = $titulo->LEGENDA.$comp;
            $resumo[$cod]['VALOR_SUM'] += $titulo->E1_VALOR_DB;
            $resumo[$cod]['VALOR_MPON'] += $titulo->E1_VALOR_DB * $DIAS;
            $resumo[$cod]['DIAS_SUM'] += $titulo->DIAS;
        } elseif (($titulo->DIAS <= 5) && ($titulo->DIAS >= -5)) {            
            $class = 'Confirm';
            //$$style = ' style="border-bottom: 1px solid #B3B3B3;"';
            $DIA_VALOR_SUM  += $titulo->E1_VALOR_DB;
            $DIA_VALOR_MPON += $titulo->E1_VALOR_DB * $titulo->DIAS;
            $DIA_DIAS_SUM   += $titulo->DIAS;
            $comp = ' EM DIA';
            $cod = 1;
            $resumo[$cod]['class'] = $class;
            $resumo[$cod]['posicao'] = 'P';
            $resumo[$cod]['DESC'] = 'Total T&iacute;tulos Pagos em Dia';
            $resumo[$cod]['LEGENDA'] = $titulo->LEGENDA.$comp;
            $resumo[$cod]['VALOR_SUM'] += $titulo->E1_VALOR_DB;
            $resumo[$cod]['VALOR_MPON'] += $titulo->E1_VALOR_DB * $DIAS;
            $resumo[$cod]['DIAS_SUM'] += $titulo->DIAS;
        } else {            
            //$$style = ' style="border-bottom: 1px solid #B3B3B3; font-weight:bolder; color:#F00;"';
            $ATR_VALOR_SUM  += $titulo->E1_VALOR_DB;
            $ATR_VALOR_MPON += $titulo->E1_VALOR_DB * $titulo->DIAS;
            $ATR_DIAS_SUM   += $titulo->DIAS;
            $comp = ' ATRAZO';
            $cod = 0;
            $resumo[$cod]['class'] = 'Orange';
            $resumo[$cod]['posicao'] = 'P';
            $resumo[$cod]['DESC'] = 'Total T&iacute;tulos Pagos em Atrazo';
            $resumo[$cod]['LEGENDA'] = $titulo->LEGENDA.$comp;
            $resumo[$cod]['VALOR_SUM'] += $titulo->E1_VALOR_DB;
            $resumo[$cod]['VALOR_MPON'] += $titulo->E1_VALOR_DB * $DIAS;
            $resumo[$cod]['DIAS_SUM'] += $titulo->DIAS;
            $class = $resumo[$cod]['class'];
        }
        ?>
      <tr class="<?= $class ? 'lnSt'.$class : '';?>">
        <td align="center"><?= $titulo->COD_CLI;?>&nbsp;</td>
        <td align="center"><?= $titulo->OS;?>&nbsp;</td>
        <td><?= $titulo->NF;?><?= (trim($titulo->SERIE) == 1) ? '  (NF)' : ' (RPS)'; ?>&nbsp;</td>
        <td><?= $titulo->LEGENDA.$comp;?>&nbsp;</td>
        <td><?= $titulo->PARCELA;?>&nbsp;</td>
        <td><?= $titulo->E1_VENCTO;?>&nbsp;</td>
        <td><?= $titulo->BAIXA;?>&nbsp;</td>
        <td><?= arruma_numero($titulo->DIAS);?>&nbsp;</td>
        <td align="right"><?= arruma_numero($titulo->E1_SALDO,1,2);?>&nbsp;</td>
        <td align="right"><?= arruma_numero($titulo->E1_VALOR_DB,1,2);?>&nbsp;</td>
      </tr>
        <?php
    }
    $GERAL_VALOR_SUM = $ANT_VALOR_SUM + $ADI_VALOR_SUM + $DIA_VALOR_SUM + $ATR_VALOR_SUM;
    $GERAL_VALOR_SUMa = $VEN_VALOR_SUM + $AVE_VALOR_SUM;
    //usort($resumo);
    ?>
    </tbody>
  </table>
  <?php //var_dump($resumo); ?>
  <table width="700" border="0" cellspacing="2" cellpadding="2" align="left" bgcolor="#CCCCCC">
    <tr>
      <td align="right" class="label">&nbsp;Periodo avaliado de <?=  $DT_DE; ?> at&eacute; <?=  $DT_ATE; ?>.</td>
      <td class="label">%</td>
      <td class="label">M. Pond. Dias</td>
      <td class="label" align="right">Total</td>
    </tr>
    <?php
    for($x = 0;$x < 5; $x++){
      if($resumo[$x]['DESC']){
        $GVS = ($resumo[$x]['posicao'] == 'P') ? $GERAL_VALOR_SUM : $GERAL_VALOR_SUMa;
        $style = (($x > 3)&&(!$style)) ? ' style="border-top: 2px double #666 !important;"' : '';
    ?>
    <tr>
      <td align="right" class="label"<?= $style; ?>><?= $resumo[$x]['DESC'] ?></td>
      <td align="right" class="resp<?= $resumo[$x]['class'] ?>"<?= $style; ?>>
        <?= ($resumo[$x]['VALOR_SUM']) ? arruma_numero(($resumo[$x]['VALOR_SUM'] / $GVS) * 100, 1, 2) : '0,00'; ?>
      </td>
      <td align="right" class="resp<?= $resumo[$x]['class'] ?>"<?= $style; ?>>
        <?= ($resumo[$x]['VALOR_SUM']) ? arruma_numero($resumo[$x]['VALOR_MPON'] / $resumo[$x]['VALOR_SUM'], 1, 2) : '0,00'; ?></td>
      <td align="right" class="resp<?= $resumo[$x]['class'] ?>"<?= $style; ?>><?= arruma_numero($resumo[$x]['VALOR_SUM'],1,2);?>&nbsp;
        <input name="ATR_VALOR_SUM" type="hidden" id="ATR_VALOR_SUM" value="<?= $resumo[$x]['VALOR_SUM'];?>"></td>
    </tr>
    <?php
      }
    }
  /*
    ?>
    <tr>
      <td align="right" class="label">Total T&iacute;tulos Pagos em Atrazo</td>
      <td align="right" class="campoM label" style="font-weight:bolder; color:#F00">
        <?= ($ATR_VALOR_SUM) ? arruma_numero(($ATR_VALOR_SUM / $GERAL_VALOR_SUM) * 100, 1, 2) : '0,00'; ?>
      </td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#F00">
        <?= ($ATR_VALOR_SUM) ? arruma_numero($ATR_VALOR_MPON / $ATR_VALOR_SUM, 1, 2) : '0,00'; ?></td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#F00"><?= arruma_numero($ATR_VALOR_SUM,1,2);?>&nbsp;
        <input name="ATR_VALOR_SUM" type="hidden" id="ATR_VALOR_SUM" value="<?= $ATR_VALOR_SUM;?>"></td>
    </tr>
    <tr>
      <td align="right" class="label">Total T&iacute;tulos Pagos em Dia</td>
      <td align="right" class="campoM">
        <?= ($DIA_VALOR_SUM) ? arruma_numero(($DIA_VALOR_SUM / $GERAL_VALOR_SUM) * 100, 1, 2) : '0,00'; ?>
      </td>
      <td align="right" class="campoM">
        <?= ($DIA_VALOR_SUM) ? arruma_numero($DIA_VALOR_MPON / $DIA_VALOR_SUM, 1, 2) : '0,00'; ?>
      </td>
      <td align="right" class="campoM"><?= arruma_numero($DIA_VALOR_SUM,1,2);?>&nbsp;
        <input name="DIA_VALOR_SUM" type="hidden" id="DIA_VALOR_SUM" value="<?= $DIA_VALOR_SUM;?>">
      </td>
    </tr>
    <tr>
      <td align="right" class="label">Total T&iacute;tulos Pagos Adiantados</td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#070">
        <?= $ADI_VALOR_SUM ? arruma_numero(($ADI_VALOR_SUM / $GERAL_VALOR_SUM) * 100, 1, 2) : '0,00';?>
      </td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#070">
        <?= $ADI_VALOR_SUM ? arruma_numero($ADI_VALOR_MPON / $ADI_VALOR_SUM, 1, 2) : '0,00'; ?>
      </td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#070">
        <?= arruma_numero($ADI_VALOR_SUM,1,2);?>&nbsp;
        <input name="ADI_VALOR_SUM" type="hidden" id="ADI_VALOR_SUM" value="<?= $ADI_VALOR_SUM;?>">
      </td>
    </tr>
    <tr>
      <td align="right" class="label" style="border-bottom: 2px double #969696;">Total T&iacute;tulos de Antecipa&ccedil;&atilde;o</td>
      <td align="right" class="campoM" style="border-bottom: 2px double #969696;font-weight:bolder; color:#00A">
        <?= ($ANT_VALOR_SUM) ? arruma_numero(($ANT_VALOR_SUM / $GERAL_VALOR_SUM) * 100, 1, 2) : '0,00'; ?>
      </td>
      <td align="right" class="campoM" style="border-bottom: 2px double #969696;font-weight:bolder; color:#00A">0,00</td>
      <td align="right" class="campoM" style="border-bottom: 2px double #969696;font-weight:bolder; color:#00A">
        <?= arruma_numero($ANT_VALOR_SUM,1,2); ?>&nbsp;
        <input name="ANT_VALOR_SUM" type="hidden" id="ANT_VALOR_SUM" value="<?= $ANT_VALOR_SUM; ?>">
      </td>
    </tr>
    <tr>
      <td align="right" class="label">Total T&iacute;tulos Vencidos</td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#B60">
        <?= ($GERAL_VALOR_SUMa) ? arruma_numero(($VEN_VALOR_SUM / $GERAL_VALOR_SUMa) * 100, 1, 2) : $VEN_VALOR_SUMa . '0,00'; ?>
      </td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#B60">
        <?= ($VEN_VALOR_SUM) ? arruma_numero($VEN_VALOR_MPON / $VEN_VALOR_SUM, 1, 2) : '0,00'; ?>
      </td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#B60"><?= arruma_numero($VEN_VALOR_SUM,1,2); ?>&nbsp;
        <input name="ANT_VALOR_SUM" type="hidden" id="ANT_VALOR_SUM" value="<?= $VEN_VALOR_SUM; ?>">
      </td>
    </tr>
    <tr>
      <td align="right" class="label">Total T&iacute;tulos A Vencer</td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#0A6">
        <?= ($GERAL_VALOR_SUMa) ? arruma_numero(($AVE_VALOR_SUM / $GERAL_VALOR_SUMa) * 100, 1, 2) : '0,00'; ?></td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#0A6">
        <?= ($AVE_VALOR_SUM) ? arruma_numero($AVE_VALOR_MPON / $AVE_VALOR_SUM, 1, 2) : '0,00'; ?></td>
      <td align="right" class="campoM" style="font-weight:bolder; color:#0A6"><?= arruma_numero($AVE_VALOR_SUM,1,2);?>&nbsp;
        <input name="ANT_VALOR_SUM" type="hidden" id="ANT_VALOR_SUM" value="<?= $AVE_VALOR_SUM;?>">
      </td>
    </tr>
<?php  */?>
  </table>
</div>
<?php } ?>