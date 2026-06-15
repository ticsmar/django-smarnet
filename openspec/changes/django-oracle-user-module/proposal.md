## Why

ERP precisa base Django com autenticação Oracle antes de outros domínios. Usuário autentica com credenciais pessoais (`ORACLE_USER`/`ORACLE_PASSWORD`); após login, conexões de negócio usam usuário de schema SMAR (`ORACLE_SMAR_USER`/`ORACLE_SMAR_PASSWORD`). Primeiro domínio: usuário apenas.

## What Changes

- Scaffold projeto Django (settings, URLs, WSGI/ASGI) com Oracle como banco padrão
- Novo domínio `users/` seguindo estrutura modular (`domain/`, `application/`, `infrastructure/`, `presentation/`, `tests/`)
- Fluxo de login: validar credenciais Oracle do usuário; em sucesso, estabelecer sessão e trocar conexão ativa para credenciais SMAR
- Endpoints REST de autenticação (login, logout, sessão atual)
- Configuração dual de conexão Oracle via variáveis de ambiente (`.env.example` já documenta vars)
- Testes unitários e de integração para use cases de autenticação
- Contratos Import-Linter e cobertura para domínio `users`

## Capabilities

### New Capabilities

- `django-bootstrap`: Projeto Django mínimo, dependências Oracle (`oracledb`), settings multi-database e health check
- `user-authentication`: Login Oracle com credenciais pessoais, troca pós-login para conexão SMAR, logout e consulta de sessão

### Modified Capabilities

(nenhuma — repositório sem specs existentes)

## Impact

- Novos pacotes: `config/` (Django project), `users/` (domínio)
- Dependências runtime: Django, `oracledb`, `django-environ` (ou equivalente)
- `.importlinter`, `pyproject.toml` (coverage, mypy django plugin), `requirements-dev.txt`
- CI (`ci.yml`) passa a instalar deps Django e rodar testes do domínio `users`
- Variáveis: `ORACLE_HOST`, `ORACLE_PORT`, `ORACLE_SERVICE_NAME`, `ORACLE_CLIENT_PATH`, `ORACLE_USER`, `ORACLE_PASSWORD`, `ORACLE_SMAR_USER`, `ORACLE_SMAR_PASSWORD`
