## 1. Domain layer

- [x] 1.1 Define `OracleUserRepository` protocol (`user_exists`, `create_user`)
- [x] 1.2 Add `UserAlreadyExistsError` and `RegistrationFailedError` exceptions
- [x] 1.3 Add username validation rules (non-empty, Oracle-safe pattern)

## 2. Application layer

- [x] 2.1 Create `RegisterInputDTO`
- [x] 2.2 Implement `RegisterUseCase` (validate, check exists, create user, open session)

## 3. Infrastructure layer

- [x] 3.1 Implement `OracleUserRepositoryImpl` using SMAR connection config
- [x] 3.2 Add `user_exists` query against Oracle catalog
- [x] 3.3 Add `create_user` with parameterized password

## 4. Presentation layer

- [x] 4.1 Create `RegisterRequestSerializer`
- [x] 4.2 Implement `RegisterView` (thin — delegate to use case)
- [x] 4.3 Register route `register/` in `users/presentation/api/urls.py`
- [x] 4.4 Wire `build_register_use_case` in `dependencies.py`

## 5. Tests

- [x] 5.1 Unit tests: `RegisterUseCase` happy path, empty input, user exists
- [x] 5.2 Unit tests: `OracleUserRepositoryImpl` with mocked `oracledb`
- [x] 5.3 API tests: register 201/409/400
- [x] 5.4 Verify coverage remains ≥ 80%

## 6. Verification

- [x] 6.1 Run `ruff check`, `mypy`, `lint-imports`, `pytest`
- [x] 6.2 Run `python manage.py check`
