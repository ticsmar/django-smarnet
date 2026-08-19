"""Tests for GetUserProfileUseCase."""

from unittest.mock import MagicMock

import pytest

from apps.users.application.use_cases.get_user_profile_use_case import (
    GetUserProfileUseCase,
)
from apps.users.domain.exceptions.auth_exceptions import NotAuthenticatedError
from apps.users.domain.repositories.user_profile import UserProfileSnapshot


def _empty_profile(username: str) -> UserProfileSnapshot:
    return UserProfileSnapshot(
        username=username,
        is_superuser=False,
        can_manage_access=False,
        is_branch_manager=False,
        groups=[],
        usu_chapa=None,
        display_name=username,
        email="",
        usu_login="",
        usu_loginweb="",
        usu_sigla="",
        usu_status=None,
        usu_status_label="",
        cc_codigo="",
        cc_nome="",
        origem="",
        pes_numero=None,
        emp_codigo=None,
        emp_nome="",
        emp_reduzido="",
        emp_cidade="",
        emp_estado="",
        is_funcionario=False,
        fun_chapa=None,
        fun_apelido="",
        fun_cargo="",
        fun_ativo="",
        fun_ativo_label="",
        fun_dt_adm=None,
        fun_ramal=None,
        fun_unidade="",
        fun_filial="",
        fun_endereco="",
        fun_cidade="",
        fun_uf="",
        fun_bairro="",
        fun_cep="",
    )


def test_get_user_profile_success() -> None:
    session = MagicMock()
    session.is_authenticated.return_value = True
    session.get_username.return_value = "oracle_user"
    repo = MagicMock()
    expected = _empty_profile("oracle_user")
    repo.get_by_username.return_value = expected

    result = GetUserProfileUseCase(session, repo).execute()

    assert result is expected
    repo.get_by_username.assert_called_once_with("oracle_user")


def test_get_user_profile_not_authenticated() -> None:
    session = MagicMock()
    session.is_authenticated.return_value = False
    repo = MagicMock()

    with pytest.raises(NotAuthenticatedError):
        GetUserProfileUseCase(session, repo).execute()

    repo.get_by_username.assert_not_called()
