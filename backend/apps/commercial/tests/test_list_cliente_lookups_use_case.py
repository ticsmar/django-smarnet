"""Unit tests for cliente catalog lookups."""

from apps.commercial.application.use_cases.list_cliente_lookups_use_case import (
    ListClienteArclassesUseCase,
    ListClienteAreasOsUseCase,
    ListClienteArlevelsUseCase,
    ListClienteArsalespsUseCase,
    ListClienteCidadesUseCase,
    ListClienteGruposTributariosUseCase,
    ListClienteModelosPagtoUseCase,
    ListClienteRiscosUseCase,
)
from apps.commercial.domain.repositories.cliente_query_repository import (
    ClienteArclassRecord,
    ClienteAreaOsRecord,
    ClienteArlevelRecord,
    ClienteArsalespRecord,
    ClienteCidadeRecord,
    ClienteGrupoTributarioRecord,
    ClienteModeloPagtRecord,
    ClienteRiscoRecord,
)


class _FakeGruposRepo:
    def list_grupos_tributarios(self, *, est_codigo, cli_tipo):
        assert est_codigo == 25
        assert cli_tipo == "R"
        return [
            ClienteGrupoTributarioRecord(codigo="001", descricao="A", uf="SP"),
            ClienteGrupoTributarioRecord(codigo="077", descricao="SP default", uf="SP"),
        ]


class _FakeArclassRepo:
    def list_arclasses(self):
        return [
            ClienteArclassRecord(class_key="AUTO", descr="Automotivo"),
            ClienteArclassRecord(class_key="IND", descr="Industrial"),
        ]


class _FakeArlevelRepo:
    def list_arlevels(self):
        return [
            ClienteArlevelRecord(terr_key="01", description="Sul"),
            ClienteArlevelRecord(terr_key="02", description="Norte"),
        ]


class _FakeArsalespRepo:
    def list_arsalesps(self):
        return [
            ClienteArsalespRecord(
                salesp_key="00001", nome="Ana", emp_nome="NOVA SMAR S/A"
            ),
            ClienteArsalespRecord(
                salesp_key="00002", nome="Bruno", emp_nome="Filial"
            ),
        ]


def test_grupos_tributarios_marks_php_default_for_est_25():
    items = ListClienteGruposTributariosUseCase(_FakeGruposRepo()).execute(
        est_codigo=25, cli_tipo="R"
    )
    chosen = [item for item in items if item.is_default]
    assert len(chosen) == 1
    assert chosen[0].codigo == "077"


def test_arclasses_maps_class_key_and_descr():
    items = ListClienteArclassesUseCase(_FakeArclassRepo()).execute()
    assert [(item.class_key, item.descr) for item in items] == [
        ("AUTO", "Automotivo"),
        ("IND", "Industrial"),
    ]


def test_arlevels_maps_terr_key_and_description():
    items = ListClienteArlevelsUseCase(_FakeArlevelRepo()).execute()
    assert [(item.terr_key, item.description) for item in items] == [
        ("01", "Sul"),
        ("02", "Norte"),
    ]


class _FakeRiscoRepo:
    def list_riscos(self):
        return [
            ClienteRiscoRecord(
                codigo=4,
                letra="D",
                desc="Pendência financeira (bloqueia OS)",
                desc_longa=None,
                restricao=1,
            )
        ]


def test_arsalesps_maps_nome_and_emp_nome():
    items = ListClienteArsalespsUseCase(_FakeArsalespRepo()).execute()
    assert [
        (item.salesp_key, item.nome, item.emp_nome) for item in items
    ] == [
        ("00001", "Ana", "NOVA SMAR S/A"),
        ("00002", "Bruno", "Filial"),
    ]


class _FakeGruposEst27Repo:
    def list_grupos_tributarios(self, *, est_codigo, cli_tipo):
        assert est_codigo == 27
        return [
            ClienteGrupoTributarioRecord(codigo="001", descricao="A", uf="MG"),
            ClienteGrupoTributarioRecord(codigo="070", descricao="MG default", uf="MG"),
        ]


class _FakeGruposFallbackRepo:
    def list_grupos_tributarios(self, *, est_codigo, cli_tipo):
        return [
            ClienteGrupoTributarioRecord(codigo="010", descricao="First", uf="RJ"),
        ]


class _FakeCidadesRepo:
    def list_cidades(self, *, pai_codigo, est_codigo):
        assert pai_codigo == 76
        assert est_codigo == 25
        return [ClienteCidadeRecord(codigo="38709", descricao="PIRACICABA", uf="SP")]


class _FakeAreasOsRepo:
    def list_areas_os(
        self, *, tipo_area, mun_ibge, est_codigo, pai_codigo, current_codigo
    ):
        assert tipo_area == "C"
        return [
            ClienteAreaOsRecord(
                aos_codigo=3,
                aos_nome="Comercial",
                usu_chapa=10,
                usu_nome="Ana",
                qtd=2,
                is_default=True,
            )
        ]


class _FakeModelosRepo:
    def __init__(self) -> None:
        self.unrestricted = None

    def list_modelos_pagto(
        self, *, origem, mpg_codigo, risco_protheus, unrestricted
    ):
        self.unrestricted = unrestricted
        return [
            ClienteModeloPagtRecord(
                mpg_codigo=7, descricao="Boleto", mpg_area="C", mpg_status=1
            )
        ]


def test_grupos_tributarios_marks_php_default_for_est_27():
    items = ListClienteGruposTributariosUseCase(_FakeGruposEst27Repo()).execute(
        est_codigo=27, cli_tipo="R"
    )
    chosen = [item for item in items if item.is_default]
    assert len(chosen) == 1
    assert chosen[0].codigo == "070"


def test_grupos_tributarios_falls_back_to_first_row():
    items = ListClienteGruposTributariosUseCase(_FakeGruposFallbackRepo()).execute(
        est_codigo=19, cli_tipo="R"
    )
    chosen = [item for item in items if item.is_default]
    assert chosen[0].codigo == "010"


def test_cidades_maps_codigo_and_uf():
    items = ListClienteCidadesUseCase(_FakeCidadesRepo()).execute(
        pai_codigo=76, est_codigo=25
    )
    assert items[0].codigo == "38709"
    assert items[0].uf == "SP"


def test_areas_os_maps_default_flag():
    items = ListClienteAreasOsUseCase(_FakeAreasOsRepo()).execute(
        tipo_area="C",
        mun_ibge=None,
        est_codigo=25,
        pai_codigo=76,
        current_codigo=None,
    )
    assert items[0].aos_codigo == 3
    assert items[0].is_default is True


def test_modelos_pagto_forwards_unrestricted():
    repo = _FakeModelosRepo()
    items = ListClienteModelosPagtoUseCase(repo).execute(
        origem="BR",
        mpg_codigo=None,
        risco_protheus="A",
        unrestricted=True,
    )
    assert repo.unrestricted is True
    assert items[0].mpg_codigo == 7
