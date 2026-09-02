"""Oracle repository for SIAOS.PCK_CLIENTE + INTEGRACAO.SP_FUNC2CLIENTE."""

from __future__ import annotations

from typing import TYPE_CHECKING, NoReturn, Protocol, cast

import oracledb
from django.db import DatabaseError, connections, transaction

if TYPE_CHECKING:
    from decimal import Decimal

from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteDatabaseError,
)
from apps.commercial.domain.repositories.cliente_repository import (
    CreateClienteFromFuncionarioParams,
    CreateClienteFromFuncionarioResult,
    GravaClienteCobrancaParams,
    GravaClienteContatoParams,
    GravaClienteContatoResult,
    GravaClienteDadosFinanParams,
    GravaClienteDadosGeraisParams,
    GravaClienteDadosGeraisResult,
    GravaClienteEmbarqueParams,
    GravaClienteObsParams,
    SetClienteContatoPadraoParams,
    SetClienteEnderecoPadraoParams,
)
from apps.shared.infrastructure.oracle_session_context import (
    ensure_smar_client_identifier,
)

_PACKAGE_CLIENTE = "SIAOS.PCK_CLIENTE"
_PROC_SP_ATUALIZA = f"{_PACKAGE_CLIENTE}.SP_ATUALIZA_DADOS_GERAIS"
_PROC_SP_FINAN = f"{_PACKAGE_CLIENTE}.SP_ATUALIZA_DADOS_FINAN"
_PROC_SP_CONTATO = f"{_PACKAGE_CLIENTE}.SP_ATUALIZA_CONTATO"
_PROC_SP_CONTATO_PADRAO = f"{_PACKAGE_CLIENTE}.SP_UPDATE_CONTATO_CLIENTE"
_PROC_SP_COBRANCA2 = f"{_PACKAGE_CLIENTE}.SP_ATUALIZA_COBRANCA2"
_PROC_SP_EMBARQUE2 = f"{_PACKAGE_CLIENTE}.SP_ATUALIZA_EMBARQUE2"
_PROC_SP_OBS = f"{_PACKAGE_CLIENTE}.SP_ATUALIZA_OBS"
_PROC_SP_FUNC2CLIENTE = "INTEGRACAO.SP_FUNC2CLIENTE"
_DB_ALIAS = "smar"
_COBRANCA_USER_LOOKUP_MSG = (
    "SIAOS.TG_B_IU_COBRANCA still looks up USUARIO.USU_LOGINWEB = USER "
    "(session is API_SMAR). DBA must compile "
    "docs/_scripts/triggers/TG_B_IU_COBRANCA.trg "
    "(use PCK_DQANET.SF_USU_CHAPA_USER)."
)


def _raise_cliente_database_error(exc: BaseException) -> NoReturn:
    msg = str(exc)
    if "ORA-01403" in msg and "TG_B_IU_COBRANCA" in msg.upper():
        raise ClienteDatabaseError(f"{_COBRANCA_USER_LOOKUP_MSG} {msg}") from exc
    raise ClienteDatabaseError(msg) from exc


_DUPLICATE_DOC_MSG = "Já existe cliente cadastrado com este CNPJ/CPF."
_PRESERVED_SQL = (
    "SELECT CLASSE, TERRITORIO, CLI_EMAIL_NFSE, COMEN_FAT, COMEN_COBR, "
    "FORMAEMBAR, VENDEDOR, TIPOEMP, CLI_GRUPO, CLI_MONTADOR, "
    "CLI_VENDEDOR2, AOS_CODIGO_TEC, AOS_CODIGO_COM, CLI_TIPO, "
    "CLI_FOME_ZERO, CCONTABIL, LIMITECR, CLI_LIMITE_CRV, "
    "CLI_RECCOF, CLI_RECCSLL, CLI_RECPIS, MPG_CODIGO, CLI_MOD_PAGT "
    "FROM SIAOS.CLIENTE WHERE CODIGO = %s"
)


class _InnerCursorWrapper(Protocol):
    cursor: oracledb.Cursor


class _DjangoCursorWrapper(Protocol):
    cursor: _InnerCursorWrapper

    def execute(self, sql: str, params: list[object] | None = None) -> object: ...

    def fetchone(self) -> tuple[object, ...] | None: ...


def _raw_oracle_cursor(django_cursor: object) -> oracledb.Cursor:
    nested = getattr(django_cursor, "cursor", None)
    raw = getattr(nested, "cursor", None)
    return cast("oracledb.Cursor", raw)


def _as_str(value: object | None) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _as_optional_int(value: object | None) -> int | None:
    if value is None:
        return None
    return int(float(str(value)))


class OracleClienteRepositoryImpl:
    def grava_dados_gerais(
        self, params: GravaClienteDadosGeraisParams
    ) -> GravaClienteDadosGeraisResult:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                preserved: dict[str, object | None] = {}
                if params.codigo is not None:
                    preserved = _read_preserved_binds(cursor, params.codigo)
                return _call_atualiza(
                    _raw_oracle_cursor(cursor),
                    params.codigo,
                    _grava_binds(params, preserved),
                )
        except (DatabaseError, oracledb.Error) as exc:
            _raise_cliente_database_error(exc)

    def set_cli_grupo_trib(self, *, codigo: int, cli_grupo_trib: str | None) -> None:
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                cursor.execute(
                    "UPDATE SIAOS.CLIENTE SET CLI_GRUPO_TRIB = %s WHERE CODIGO = %s",
                    [_as_str(cli_grupo_trib), codigo],
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def grava_dados_finan(self, params: GravaClienteDadosFinanParams) -> None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = _raw_oracle_cursor(cursor)
                limite = params.limitecr if params.apply_limites else None
                raw.callproc(
                    _PROC_SP_FINAN,
                    keyword_parameters={
                        "n_codigo_cliente": params.codigo,
                        "n_flag_suspenso": params.flagsuspen,
                        "n_flag_cobra": params.flagcobra,
                        "n_flag_multa": params.flagmulta,
                        "n_venc_prog": params.vencprog,
                        "n_zona_franca": params.zona_franca,
                        "n_iss": params.iss,
                        "n_exportacao": params.exportacao,
                        "n_limite_cr": limite,
                        "n_taxa_multa": params.taxamulta,
                        "n_desc_max": params.desc_max,
                        "n_ccontabil": _as_str(params.ccontabil),
                        "vc2_obsvenc": _as_str(params.obsvenc),
                    },
                )
                extras = [
                    "CLI_FOME_ZERO = %s",
                    "CLI_MONTADOR = %s",
                    "CLI_RECCOF = %s",
                    "CLI_RECCSLL = %s",
                    "CLI_RECPIS = %s",
                    "MPG_CODIGO = %s",
                    "CLI_MOD_PAGT = %s",
                    "CLI_INSCR_SUFRAMA = %s",
                    "CLI_CNAE = %s",
                    "CLI_NIF = %s",
                    "CLI_PES_TIPO = %s",
                    "CLI_GRUPO_TRIB = %s",
                ]
                extra_params: list[object] = [
                    params.cli_fome_zero,
                    params.cli_montador,
                    _as_str(params.cli_reccof),
                    _as_str(params.cli_reccsll),
                    _as_str(params.cli_recpis),
                    params.mpg_codigo,
                    _as_str(params.cli_mod_pagt),
                    _as_str(params.cli_inscr_suframa),
                    _as_str(params.cli_cnae),
                    _as_str(params.cli_nif),
                    _as_str(params.cli_pes_tipo),
                    _as_str(params.cli_grupo_trib),
                ]
                if params.apply_limites:
                    extras.append("CLI_LIMITE_CRV = %s")
                    extra_params.append(params.cli_limite_crv)
                extra_params.append(params.codigo)
                cursor.execute(
                    "UPDATE SIAOS.CLIENTE SET "
                    + ", ".join(extras)
                    + " WHERE CODIGO = %s",
                    extra_params,  # type: ignore[arg-type]
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def grava_contato(
        self, params: GravaClienteContatoParams
    ) -> GravaClienteContatoResult:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = _raw_oracle_cursor(cursor)
                n_con = raw.var(oracledb.DB_TYPE_NUMBER)
                if params.con_codigo is not None:
                    n_con.setvalue(0, params.con_codigo)
                raw.callproc(
                    _PROC_SP_CONTATO,
                    keyword_parameters={
                        "n_con_codigo": n_con,
                        "n_codigo_cliente": params.codigo,
                        "c_nome_old": _as_str(params.nome_old),
                        "c_nome_new": _as_str(params.nome),
                        "c_depto": _as_str(params.depto),
                        "c_cargo": _as_str(params.cargo),
                        "c_telefone": _as_str(params.telefone),
                        "c_fax": _as_str(params.fax),
                        "c_celular": _as_str(params.celular),
                        "c_email": _as_str(params.email),
                        "n_con_ativo": params.con_ativo,
                        "vc2_tipo_cadastro": params.tipo_cadastro,
                    },
                )
                return GravaClienteContatoResult(
                    con_codigo=_as_optional_int(n_con.getvalue(0)),
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def set_contato_padrao(self, params: SetClienteContatoPadraoParams) -> None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                _raw_oracle_cursor(cursor).callproc(
                    _PROC_SP_CONTATO_PADRAO,
                    keyword_parameters={
                        "n_codigo_cliente": params.codigo,
                        "n_contato_com": params.con_codigo_com,
                        "n_contato_tec": params.con_codigo_tec,
                        "n_contato_fin": params.con_codigo_fin,
                    },
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def grava_cobranca(self, params: GravaClienteCobrancaParams) -> None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                _raw_oracle_cursor(cursor).callproc(
                    _PROC_SP_COBRANCA2,
                    keyword_parameters={
                        "n_codigo_cli": params.codigo,
                        "c_cod_cobr": _as_str(params.chavecobra),
                        "n_ativo": params.ativo,
                        "n_cli_codigo_ref": params.cli_codigo_ref,
                        "vc2_tipo_cadastro": params.tipo_cadastro,
                    },
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def set_cobranca_padrao(self, params: SetClienteEnderecoPadraoParams) -> None:
        self._set_cliente_chave("COBRANCA", params)

    def grava_embarque(self, params: GravaClienteEmbarqueParams) -> None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                _raw_oracle_cursor(cursor).callproc(
                    _PROC_SP_EMBARQUE2,
                    keyword_parameters={
                        "n_codigo_cli": params.codigo,
                        "c_cod_emb": _as_str(params.chave_emb),
                        "n_ativo": params.ativo,
                        "n_cli_codigo_ref": params.cli_codigo_ref,
                        "vc2_tipo_cadastro": params.tipo_cadastro,
                    },
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def set_embarque_padrao(self, params: SetClienteEnderecoPadraoParams) -> None:
        self._set_cliente_chave("ENTREGA", params)

    def grava_bloqueio(
        self, *, codigo: int, bloqueado: int, mensagem_bloqueio: str | None
    ) -> None:
        """Persist BLOQUEADO = CRS_COD_SIAOS and MENSAGEM_BLOQUEIO.

        Via 2 (ADR 0005): PCK_CLIENTE.SP_ATUALIZA_DADOS_GERAIS has BLOQUEADO
        commented out; SP_ATUALIZA_DADOS_FINAN does not write BLOQUEADO or
        MENSAGEM_BLOQUEIO. PHP cad_bloqueio.php / grava_dados.php (cadastro=7)
        updated SIAOS.CLIENTE directly. Do not persist CRS_CODIGO.
        """
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                cursor.execute(
                    "UPDATE SIAOS.CLIENTE "
                    "SET BLOQUEADO = %s, MENSAGEM_BLOQUEIO = %s, "
                    "DT_ATUAL = SYSDATE WHERE CODIGO = %s",
                    [bloqueado, _as_str(mensagem_bloqueio), codigo],
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def grava_limites(
        self,
        *,
        codigo: int,
        limitecr: Decimal | None,
        cli_limite_crv: Decimal | None,
    ) -> None:
        """Persist LIMITECR and CLI_LIMITE_CRV (estCli Cadastros).

        Via 2 (ADR 0005): ajax.php?op=5 used SET $campo — not ported.
        SP_ATUALIZA_DADOS_FINAN would rewrite the rest of the finan tab.
        """
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                cursor.execute(
                    "UPDATE SIAOS.CLIENTE "
                    "SET LIMITECR = %s, CLI_LIMITE_CRV = %s, "
                    "DT_ATUAL = SYSDATE WHERE CODIGO = %s",
                    [limitecr, cli_limite_crv, codigo],
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def grava_obs(self, params: GravaClienteObsParams) -> None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                _raw_oracle_cursor(cursor).callproc(
                    _PROC_SP_OBS,
                    keyword_parameters={
                        "n_codigo_cliente": params.codigo,
                        "n_obs": _as_str(params.observa),
                    },
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def _set_cliente_chave(
        self, column: str, params: SetClienteEnderecoPadraoParams
    ) -> None:
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                cursor.execute(
                    f"UPDATE SIAOS.CLIENTE SET {column} = %s WHERE CODIGO = %s",
                    [_as_str(params.chave), params.codigo],
                )
        except (DatabaseError, oracledb.Error) as extra:
            _raise_cliente_database_error(extra)

    def read_emp_codigo(self, codigo: int) -> int | None:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                cursor.execute(
                    "SELECT EMP_CODIGO FROM SIAOS.CLIENTE WHERE CODIGO = %s",
                    [codigo],
                )
                row = cursor.fetchone()
        except (DatabaseError, oracledb.Error) as exc:
            _raise_cliente_database_error(exc)
        if row is None:
            return None
        return _as_optional_int(row[0])

    def set_emp_codigo(self, *, codigo: int, emp_codigo: int) -> None:
        ensure_smar_client_identifier()
        try:
            with (
                transaction.atomic(using=_DB_ALIAS),
                connections[_DB_ALIAS].cursor() as cursor,
            ):
                cursor.execute(
                    "UPDATE SIAOS.CLIENTE SET EMP_CODIGO = %s WHERE CODIGO = %s",
                    [emp_codigo, codigo],
                )
        except (DatabaseError, oracledb.Error) as exc:
            _raise_cliente_database_error(exc)

    def create_from_funcionario(
        self, params: CreateClienteFromFuncionarioParams
    ) -> CreateClienteFromFuncionarioResult:
        ensure_smar_client_identifier()
        try:
            with connections[_DB_ALIAS].cursor() as cursor:
                raw = _raw_oracle_cursor(cursor)
                n_codigo = raw.var(oracledb.DB_TYPE_NUMBER)
                raw.callproc(
                    _PROC_SP_FUNC2CLIENTE,
                    [params.cnpj_or_cpf, n_codigo],
                )
                return CreateClienteFromFuncionarioResult(
                    codigo=_as_optional_int(n_codigo.getvalue(0)),
                )
        except (DatabaseError, oracledb.Error) as exc:
            _raise_cliente_database_error(exc)


def _grava_binds(
    params: GravaClienteDadosGeraisParams,
    preserved: dict[str, object | None],
) -> dict[str, object | None]:
    """Named IN binds matching PCK_CLIENTE.SP_ATUALIZA_DADOS_GERAIS."""
    binds = {**_preserved_insert_defaults(), **preserved, **_form_binds(params)}
    if params.cli_tipo is not None:
        binds["n_cli_tipo"] = _as_str(params.cli_tipo)
    if params.aos_codigo_com is not None:
        binds["n_aos_codigo_com"] = params.aos_codigo_com
    if params.aos_codigo_tec is not None:
        binds["n_aos_codigo_tec"] = params.aos_codigo_tec
    if params.classe is not None:
        binds["c_segmento"] = _as_str(params.classe)
    if params.mpg_codigo is not None:
        binds["n_mpg_codigo"] = params.mpg_codigo
    if params.cli_mod_pagt is not None:
        binds["c_cli_mod_pagt"] = _as_str(params.cli_mod_pagt)
    if params.cli_email_nfse is not None:
        binds["c_cli_email_nfse"] = _as_str(params.cli_email_nfse)
    if params.territorio is not None:
        binds["c_area"] = _as_str(params.territorio)
    if params.vendedor is not None:
        binds["c_vendedor"] = _as_str(params.vendedor)
    return binds


def _form_binds(params: GravaClienteDadosGeraisParams) -> dict[str, object | None]:
    return {
        "c_nome_cliente": _as_str(params.cliente),
        "c_nome_reduzido": _as_str(params.reduzido),
        "c_cgc": _as_str(params.cgc),
        "c_origem": _as_str(params.origem),
        "c_inscr_estadual": _as_str(params.inscr_est),
        "c_tipo_cliente": _as_str(params.tipo),
        "c_endereco1": _as_str(params.endereco1),
        "c_endereco2": _as_str(params.endereco2),
        "c_endereco3": _as_str(params.endereco3),
        "c_cidade": _as_str(params.cidade),
        "c_estado": _as_str(params.estado),
        "n_est_codigo": params.est_codigo,
        "c_telefone1": _as_str(params.telefone1),
        "c_telefone2": _as_str(params.telefone2),
        "c_homepage": _as_str(params.homepage),
        "c_email": _as_str(params.email),
        "n_pai_codigo": params.pai_codigo,
        "c_cep": _as_str(params.cep),
        "c_fax": _as_str(params.fax),
        "c_usuario": str(params.usu_chapa),
        "vc2_tipo_cadastro": params.tipo_cadastro,
        "n_cli_cod_mun_ibge": _as_str(params.cli_cod_mun_ibge),
        "n_cli_bairro": _as_str(params.cli_bairro),
        "n_cli_ie_isento": params.cli_ie_isento,
        "c_cli_inscr_mun": _as_str(params.cli_inscr_mun),
        "c_cli_cnae": _as_str(params.cli_cnae),
        "c_cli_insc_suframa": _as_str(params.cli_inscr_suframa),
        "n_cli_contribuinte": params.cli_contribuinte,
        "c_cli_nif": _as_str(params.cli_nif),
        "c_cli_pes_tipo": _as_str(params.cli_pes_tipo),
    }


def _preserved_insert_defaults() -> dict[str, object | None]:
    """SP columns the v1 form does not send; table defaults on insert."""
    return {
        "c_segmento": None,
        "c_area": None,
        "c_cli_email_nfse": None,
        "c_coment_fatura": None,
        "c_coment_cobranca": None,
        "n_transportadora": None,
        "c_vendedor": None,
        "n_tipo_emp": None,
        "n_cli_grupo": None,
        "n_cli_montador": 0,
        "n_cli_vendedor2": None,
        "n_aos_codigo_tec": None,
        "n_aos_codigo_com": None,
        "n_cli_tipo": None,
        "n_cli_fome_zero": 0,
        "c_ccontabil": None,
        "n_limitecr": None,
        "n_cli_limite_crv": None,
        "c_cli_reccof": "N",
        "c_cli_reccsll": "N",
        "c_cli_recpis": "N",
        "n_mpg_codigo": None,
        "c_cli_mod_pagt": "T",
    }


def _read_preserved_binds(cursor: object, codigo: int) -> dict[str, object | None]:
    typed = cast("_DjangoCursorWrapper", cursor)
    typed.execute(_PRESERVED_SQL, [codigo])
    row = typed.fetchone()
    if row is None:
        return {}
    return _preserved_from_row(row)


def _preserved_from_row(row: tuple[object, ...]) -> dict[str, object | None]:
    return {
        "c_segmento": _as_str(row[0]),
        "c_area": _as_str(row[1]),
        "c_cli_email_nfse": _as_str(row[2]),
        "c_coment_fatura": _as_str(row[3]),
        "c_coment_cobranca": _as_str(row[4]),
        "n_transportadora": _as_optional_int(row[5]),
        "c_vendedor": _as_str(row[6]),
        "n_tipo_emp": _as_optional_int(row[7]),
        "n_cli_grupo": _as_optional_int(row[8]),
        "n_cli_montador": _as_optional_int(row[9]),
        "n_cli_vendedor2": _as_str(row[10]),
        "n_aos_codigo_tec": _as_optional_int(row[11]),
        "n_aos_codigo_com": _as_optional_int(row[12]),
        "n_cli_tipo": _as_str(row[13]),
        "n_cli_fome_zero": _as_optional_int(row[14]),
        "c_ccontabil": _as_str(row[15]),
        "n_limitecr": _as_optional_int(row[16]),
        "n_cli_limite_crv": _as_optional_int(row[17]),
        "c_cli_reccof": _as_str(row[18]),
        "c_cli_reccsll": _as_str(row[19]),
        "c_cli_recpis": _as_str(row[20]),
        "n_mpg_codigo": _as_optional_int(row[21]),
        "c_cli_mod_pagt": _as_str(row[22]) or "T",
    }


def _call_atualiza(
    raw: oracledb.Cursor,
    codigo: int | None,
    binds: dict[str, object | None],
) -> GravaClienteDadosGeraisResult:
    n_cod = raw.var(oracledb.DB_TYPE_NUMBER)
    if codigo is not None:
        n_cod.setvalue(0, codigo)
    n_erro = raw.var(oracledb.DB_TYPE_NUMBER)
    raw.callproc(
        _PROC_SP_ATUALIZA,
        keyword_parameters={**binds, "n_codigo": n_cod, "n_erro": n_erro},
    )
    erro = _as_optional_int(n_erro.getvalue(0)) or 0
    return GravaClienteDadosGeraisResult(
        codigo=_as_optional_int(n_cod.getvalue(0)),
        tipo_msg="E" if erro else None,
        msg=_DUPLICATE_DOC_MSG if erro else None,
        acao=None,
    )


def build_oracle_cliente_repository() -> OracleClienteRepositoryImpl:
    return OracleClienteRepositoryImpl()
