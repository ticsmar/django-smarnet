## Context

Domínio `users/` já implementa login Oracle (credenciais pessoais no request), logout e `/me`. Pós-login, DB usa alias `smar`. Register deve criar usuário Oracle novo — operação privilegiada, só via conexão SMAR.

## Goals / Non-Goals

**Goals:**

- `POST /api/users/register/` cria usuário Oracle com `username`/`password` informados
- Sucesso → sessão autenticada (mesmo fluxo pós-login que login)
- Rejeitar username vazio, password vazio, usuário já existente
- Use case + repository; view fina

**Non-Goals:**

- Confirmação de password (`password_confirm`)
- Email, perfil, permissões granulares
- Alterar senha, reset, CRUD usuários
- Registro sem auto-login

## Decisions

### 1. Criação Oracle via SMAR

**Decisão:** `OracleUserRepositoryImpl.create_user(username, password)` usa conexão `smar` (env `ORACLE_SMAR_USER`/`ORACLE_SMAR_PASSWORD`) pra executar `CREATE USER`.

**SQL (MVP):**

```sql
CREATE USER <username> IDENTIFIED BY <password>
```

Username validado: alfanumérico + `_`, max 30 chars (limite Oracle). Password passado bind param, nunca logado.

**Alternativa rejeitada:** Register sem privilégio SMAR — criar user Oracle exige conta com `CREATE USER`.

### 2. Verificar existência antes de criar

**Decisão:** `user_exists(username)` consulta `ALL_USERS` (ou `DBA_USERS` se SMAR tiver acesso) via SMAR. Se existe → `UserAlreadyExistsError` → HTTP 409.

### 3. Auto-login pós-register

**Decisão:** `RegisterUseCase` chama `session_port.create_session(username)` após `create_user` sucesso. Resposta 201 `{"username": "..."}` — igual login mas status 201.

**Alternativa rejeitada:** Register sem sessão — força login duplo; pior UX.

### 4. Camadas

| Componente | Responsabilidade |
|------------|------------------|
| `RegisterInputDTO` | username, password |
| `RegisterUseCase` | valida, checa exists, cria user, abre sessão |
| `OracleUserRepository` (Protocol) | `user_exists`, `create_user` |
| `OracleUserRepositoryImpl` | SQL via `oracledb` + alias smar settings |
| `RegisterView` | delega use case |

### 5. Endpoint

| Método | Path | Auth | Status sucesso |
|--------|------|------|----------------|
| POST | `/api/users/register/` | Não | 201 |

Erros: 400 (input inválido), 409 (user existe), 500 (falha Oracle genérica).

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| SMAR precisa `CREATE USER` | Documentar privilégio obrigatório; erro genérico se falhar |
| SQL injection em username | Whitelist regex; bind param só no password |
| Register aberto em produção | Fora escopo MVP; flag env futura |
| `CREATE USER` sem tablespace/quota | MVP mínimo; grants/tablespace em change futuro |

## Migration Plan

1. Adicionar domain contract + exceções
2. Implementar repository infra
3. `RegisterUseCase` + presentation
4. Testes mockando repository
5. Deploy: confirmar SMAR tem `CREATE USER`

## Open Questions

- Grants padrão pós-`CREATE USER` (CONNECT, RESOURCE?) — MVP cria user bare; grants em change futuro se necessário
