## Why

Módulo `users/` tem login/logout/me, mas sem cadastro. Novos usuários Oracle precisam endpoint `register` pra criar credenciais pessoais antes do primeiro login.

## What Changes

- Novo endpoint `POST /api/users/register/` com `username` e `password`
- `RegisterUseCase` no application layer — valida input, cria usuário Oracle, abre sessão pós-sucesso
- Novo contrato `OracleUserRepository` no domain + implementação infra via conexão SMAR (`CREATE USER`)
- Exceções de domínio: `UserAlreadyExistsError`, `RegistrationFailedError`
- Serializer, view fina, testes unitários e API
- Atualizar spec `user-authentication` com requisitos de register

## Capabilities

### New Capabilities

(nenhuma — register estende autenticação existente)

### Modified Capabilities

- `user-authentication`: adicionar register Oracle, auto-login pós-cadastro, cobertura de testes

## Impact

- `users/domain/` — novo repository contract, exceções
- `users/application/` — `RegisterInputDTO`, `RegisterUseCase`
- `users/infrastructure/` — `OracleUserRepositoryImpl` (SQL via SMAR)
- `users/presentation/` — `RegisterView`, serializer, rota `register/`
- `users/tests/` — testes use case + API
