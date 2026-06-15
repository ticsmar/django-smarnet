## Context

Repositório ERP em monólito modular (Python 3.13, Django, Oracle). Hoje só existe pacote `shared/` com bootstrap de testes. `.env.example` já define credenciais Oracle duplas: pessoal (`ORACLE_USER`/`ORACLE_PASSWORD`) e SMAR (`ORACLE_SMAR_USER`/`ORACLE_SMAR_PASSWORD`).

Padrão legado Oracle: usuário autentica com login/senha pessoal; aplicação opera no schema de negócio com usuário técnico SMAR após autenticação bem-sucedida.

## Goals / Non-Goals

**Goals:**

- Projeto Django executável com conexão Oracle via `oracledb`
- Domínio `users/` completo (domain → application → infrastructure → presentation)
- Login valida credenciais Oracle pessoais informadas pelo usuário
- Pós-login: todas queries de negócio usam conexão `smar` (credenciais SMAR do ambiente)
- API REST: login, logout, sessão atual
- Testes com cobertura ≥ 80%; contratos Import-Linter para `users`

**Non-Goals:**

- CRUD de usuários, perfis, permissões granulares
- Frontend React
- Outros domínios ERP (vendas, financeiro, etc.)
- Sincronização de usuários Django `auth.User` com tabelas Oracle legadas
- Refresh token / OAuth externo

## Decisions

### 1. Duas conexões Django (`default` + `smar`)

**Decisão:** `DATABASES` com alias `default` (credenciais pessoais, usado só na validação de login) e alias `smar` (credenciais SMAR, usado após autenticação).

**Alternativa rejeitada:** Conexão única com troca dinâmica de user/password em runtime — Django não suporta troca segura de credenciais por request sem middleware custom pesado; dois aliases é padrão Django, testável e explícito.

**Config:**

| Alias | User/Password source | Uso |
|-------|---------------------|-----|
| `default` | Input do formulário de login (validação) | `SELECT 1 FROM DUAL` ou `oracledb.connect()` efêmero |
| `smar` | `ORACLE_SMAR_USER` / `ORACLE_SMAR_PASSWORD` env | Todas operações pós-login via `using('smar')` |

Host, port, service name compartilhados (`ORACLE_HOST`, `ORACLE_PORT`, `ORACLE_SERVICE_NAME`). `ORACLE_CLIENT_PATH` inicializa thick mode se presente.

### 2. Validação de login via tentativa de conexão Oracle

**Decisão:** `OracleAuthRepository.authenticate(username, password)` abre conexão efêmera com credenciais informadas. Sucesso = credenciais válidas. Falha = credenciais inválidas.

**Alternativa rejeitada:** Consulta tabela de usuários legada — fora de escopo; usuário pediu auth direto Oracle.

### 3. Sessão Django padrão + flag de autenticação

**Decisão:** Após login válido, gravar em sessão: `oracle_username` (identificador exibido) e `authenticated=True`. Middleware `SmarDatabaseMiddleware` garante que views autenticadas roteiam para DB `smar`.

**Alternativa rejeitada:** JWT stateless — desnecessário para módulo inicial; sessão Django integra com logout nativo.

### 4. User identity sem modelo ORM de usuário

**Decisão:** `AuthenticatedUserEntity` (dataclass no domain) com `username: str`. Sem tabela Django `User` customizada neste change — identidade vem da sessão Oracle.

**Alternativa rejeitada:** `AbstractBaseUser` Django — adiciona migrações e acoplamento ORM sem benefício imediato.

### 5. Camadas e use cases

| Use Case | Responsabilidade |
|----------|------------------|
| `LoginUseCase` | Valida credenciais, retorna DTO de usuário autenticado |
| `LogoutUseCase` | Invalida sessão |
| `GetCurrentUserUseCase` | Lê usuário da sessão |

Presentation: views finas delegam a use cases injetados. Serializers só formatam DTOs.

### 6. Estrutura de pastas

```
config/                    # Django project (settings, urls, wsgi)
users/
├── domain/
│   ├── entities/authenticated_user_entity.py
│   ├── repositories/oracle_auth_repository.py  # Protocol
│   └── exceptions/auth_exceptions.py
├── application/
│   ├── dtos/
│   └── use_cases/
├── infrastructure/
│   ├── repositories/oracle_auth_repository_impl.py
│   └── middleware/smar_database_middleware.py
├── presentation/
│   ├── api/urls.py
│   ├── views/auth_views.py
│   └── serializers/
└── tests/
```

### 7. Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/users/login/` | Não | Body: `{username, password}` |
| POST | `/api/users/logout/` | Sim | Encerra sessão |
| GET | `/api/users/me/` | Sim | Retorna `{username}` |

### 8. Dependências

- `django>=5.1`
- `oracledb>=2.0`
- `djangorestframework` para API
- `django-environ` para settings

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| Credenciais pessoais trafegam no login | HTTPS obrigatório em produção; senha nunca persistida em sessão/DB |
| Conexão `default` com credenciais voláteis | Usar apenas conexão efêmera no repository, não pool Django com user dinâmico |
| SMAR user compartilhado perde rastreio por usuário Oracle | Registrar `oracle_username` em logs/auditoria futura; fora de escopo agora |
| Oracle Instant Client ausente em CI | Testes de integração mockam repository; CI roda unit tests sem Oracle real |
| Thick mode path Windows-specific | `ORACLE_CLIENT_PATH` opcional; thin mode default |

## Migration Plan

1. Adicionar dependências em `requirements.txt` (novo) e `requirements-dev.txt`
2. Criar `config/` e `users/` com estrutura de camadas
3. Atualizar `.importlinter` e `pyproject.toml`
4. Deploy: configurar env vars Oracle; rodar `migrate` (sessões Django)
5. Rollback: remover apps de `INSTALLED_APPS`; sem migração de dados de negócio

## Open Questions

- Formato exato de resposta de erro Oracle (códigos ORA) para mensagens user-friendly — tratar genérico "credenciais inválidas" no MVP
- Timeout de sessão — usar default Django (`SESSION_COOKIE_AGE`) até requisito explícito
