"""Unit tests for cliente tab list use cases."""

import pytest

from apps.commercial.application.dtos.cliente_dtos import ActorContextDTO
from apps.commercial.application.use_cases.list_cliente_tabs_use_case import (
    ListClienteCobrancasUseCase,
    ListClienteContatosUseCase,
    ListClienteEmbarquesUseCase,
)
from apps.commercial.domain.exceptions.cliente_exceptions import (
    ClienteForbiddenError,
    ClienteNotFoundError,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteCobrancaRecord,
    ClienteContatoRecord,
    ClienteEmbarqueRecord,
    ClienteRecord,
)


def _actor(owner: int = 1, link: int = 1) -> ActorContextDTO:
    return ActorContextDTO(
        username="tester",
        usu_chapa=99,
        link_emp_codigo=link,
        owner_emp_codigo=owner,
    )


def _cliente(*, codigo: int = 10, emp_codigo: int = 1, **extra: object) -> ClienteRecord:
    data: dict[str, object] = {
        "codigo": codigo,
        "origem": None,
        "cliente": "ACME",
        "reduzido": "ACME",
        "endereco1": None,
        "endereco2": None,
        "endereco3": None,
        "cli_bairro": None,
        "cidade": None,
        "estado": None,
        "cep": None,
        "pais": None,
        "pai_codigo": 76,
        "est_codigo": None,
        "telefone1": None,
        "telefone2": None,
        "fax": None,
        "email": None,
        "homepage": None,
        "cgc": None,
        "inscr_est": None,
        "cli_inscr_mun": None,
        "tipo": "J",
        "cli_tipo": None,
        "cli_pes_tipo": None,
        "cli_contribuinte": 2,
        "cli_ie_isento": 0,
        "cli_cnae": None,
        "cli_cod_mun_ibge": None,
        "cli_inscr_suframa": None,
        "cli_nif": None,
        "contato": None,
        "contatotec": None,
        "contatofin": None,
        "observa": None,
        "emp_codigo": emp_codigo,
        "bloqueado": 0,
        "dt_atual": None,
        "dt_cad": None,
        "con_codigo_com": 9,
        "con_codigo_tec": None,
        "con_codigo_fin": None,
    }
    data.update(extra)
    return ClienteRecord(**data)  # type: ignore[arg-type]


class _FakeTabRepo:
    def __init__(self, cliente: ClienteRecord | None) -> None:
        self._cliente = cliente
        self.contatos: list[ClienteContatoRecord] = []
        self.cobrancas: list[ClienteCobrancaRecord] = []
        self.embarques: list[ClienteEmbarqueRecord] = []

    def get_cliente(self, *, actor_owner, codigo):
        if self._cliente is None or self._cliente.codigo != codigo:
            return None
        return self._cliente

    def list_contatos(self, *, codigo, search):
        return self.contatos

    def list_cobrancas(self, *, codigo):
        return self.cobrancas

    def list_embarques(self, *, codigo):
        return self.embarques


def test_list_contatos_marks_comercial_role() -> None:
    repo = _FakeTabRepo(_cliente())
    repo.contatos = [
        ClienteContatoRecord(
            con_codigo=9,
            codcliente=10,
            nome="Ana",
            depto="Vendas",
            cargo="Gerente",
            telefone="111",
            fax=None,
            celular=None,
            email="ana@acme.com",
            con_ativo=1,
        )
    ]
    items = ListClienteContatosUseCase(repo).execute(
        actor=_actor(), codigo=10, search=""
    )
    assert items[0].is_comercial is True
    assert items[0].is_tecnico is False


def test_list_contatos_not_found() -> None:
    repo = _FakeTabRepo(None)
    with pytest.raises(ClienteNotFoundError):
        ListClienteContatosUseCase(repo).execute(
            actor=_actor(), codigo=99, search=""
        )


def test_list_cobrancas_maps_padrao() -> None:
    repo = _FakeTabRepo(_cliente())
    repo.cobrancas = [
        ClienteCobrancaRecord(
            codigo=10,
            chavecobra="000000001",
            nome="ACME",
            endereco1="Rua A",
            endereco2=None,
            endereco3=None,
            cob_bairro=None,
            cidade="Piracicaba",
            estado="SP",
            est_nome="Sao Paulo",
            cep="13400-000",
            pais="BRA",
            pais_nome="Brasil",
            contato=None,
            telefone1=None,
            telefone2=None,
            e_mail=None,
            ativo=1,
            cli_codigo_ref=20,
            is_padrao=True,
        )
    ]
    items = ListClienteCobrancasUseCase(repo).execute(actor=_actor(), codigo=10)
    assert items[0].chavecobra == "000000001"
    assert items[0].est_nome == "Sao Paulo"
    assert items[0].is_padrao is True


def test_list_cobrancas_out_of_scope() -> None:
    repo = _FakeTabRepo(_cliente(emp_codigo=5))
    with pytest.raises(ClienteForbiddenError):
        ListClienteCobrancasUseCase(repo).execute(actor=_actor(), codigo=10)


def test_list_embarques_maps_chave() -> None:
    repo = _FakeTabRepo(_cliente())
    repo.embarques = [
        ClienteEmbarqueRecord(
            codigo=10,
            chave_emb="000000002",
            nome="ACME",
            endereco1=None,
            endereco2=None,
            endereco3=None,
            emb_bairro=None,
            cidade=None,
            estado=None,
            est_nome=None,
            cep=None,
            pais=None,
            pais_nome=None,
            contato=None,
            telefone1=None,
            telefone2=None,
            e_mail=None,
            ativo=1,
            cli_codigo_ref=21,
            is_padrao=False,
        )
    ]
    items = ListClienteEmbarquesUseCase(repo).execute(actor=_actor(), codigo=10)
    assert items[0].chave_emb == "000000002"
    assert items[0].is_padrao is False
