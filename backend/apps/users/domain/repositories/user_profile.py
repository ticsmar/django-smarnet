"""Read model of the authenticated user profile (account + legacy links)."""

from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True, slots=True)
class UserProfileSnapshot:
    username: str
    is_superuser: bool
    can_manage_access: bool
    is_branch_manager: bool
    groups: list[str]
    # Conta Smarnet / vínculo
    usu_chapa: int | None
    display_name: str
    email: str
    # SIAOS.USUARIO
    usu_login: str
    usu_loginweb: str
    usu_sigla: str
    usu_status: int | None
    usu_status_label: str
    cc_codigo: str
    cc_nome: str
    origem: str
    pes_numero: int | None
    # Empresa
    emp_codigo: int | None
    emp_nome: str
    emp_reduzido: str
    emp_cidade: str
    emp_estado: str
    # Funcionário (quando houver)
    is_funcionario: bool
    fun_chapa: int | None
    fun_apelido: str
    fun_cargo: str
    fun_ativo: str
    fun_ativo_label: str
    fun_dt_adm: date | None
    fun_ramal: int | None
    fun_unidade: str
    fun_filial: str
    fun_endereco: str
    fun_cidade: str
    fun_uf: str
    fun_bairro: str
    fun_cep: str
