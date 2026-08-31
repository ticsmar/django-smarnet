"""Unit tests for CNPJ/CEP field shaping (getCNPJ.php / getCEP.php)."""

from apps.commercial.domain.services.cnpj_receita import (
    digits_only,
    endereco_logradouro,
    fantasia_from_nome,
    is_cnpj_key,
    is_cpf_key,
    municipio_ibge,
    normalize_cnpj,
    split_telefones,
    strip_accents,
)


def test_digits_only_strips_mask() -> None:
    assert digits_only("12.345.678/0001-99") == "12345678000199"


def test_normalize_cnpj_strips_mask_keeps_leading_zero() -> None:
    assert normalize_cnpj("02.596.588/0001-13") == "02596588000113"
    assert is_cnpj_key("02.596.588/0001-13") is True


def test_normalize_cnpj_allows_letters() -> None:
    assert normalize_cnpj("ab.123.456/0001-xy") == "AB1234560001XY"
    assert is_cnpj_key("AB.123.456/0001-XY") is True
    assert is_cnpj_key("123") is False


def test_is_cpf_key_strips_mask() -> None:
    assert is_cpf_key("123.456.789-01") is True
    assert is_cpf_key("123") is False


def test_strip_accents_keeps_case() -> None:
    assert strip_accents("São Paulo") == "Sao Paulo"


def test_fantasia_uses_first_word_when_missing() -> None:
    assert fantasia_from_nome("ACME INDUSTRIA", None) == "ACME"
    assert fantasia_from_nome("SA INDUSTRIA", None) == "SA SA"
    assert fantasia_from_nome("ACME", "FANTASIA") == "FANTASIA"


def test_split_telefones_on_slash() -> None:
    assert split_telefones("1633334444 / 1699998888") == (
        "1633334444",
        "1699998888",
    )


def test_municipio_ibge_drops_uf_prefix() -> None:
    assert municipio_ibge("3550704") == "50704"


def test_endereco_joins_number() -> None:
    assert endereco_logradouro("RUA A", "10") == "RUA A, 10"
    assert endereco_logradouro("RUA A", None) == "RUA A"
