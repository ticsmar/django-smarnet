## 1. Dependencies and project scaffold

- [x] 1.1 Create `requirements.txt` with `django`, `oracledb`, `djangorestframework`, `django-environ`
- [x] 1.2 Add `django-stubs`, `djangorestframework-stubs` to `requirements-dev.txt`
- [x] 1.3 Run `django-admin startproject config .` and create root `manage.py`
- [x] 1.4 Configure `config/settings.py`: env loading, `DATABASES` (`default` + `smar`), Oracle client init, `INSTALLED_APPS`, DRF, sessions
- [x] 1.5 Wire `config/urls.py` to mount `/api/users/`

## 2. Users domain — domain layer

- [x] 2.1 Create `users/domain/` package structure
- [x] 2.2 Implement `AuthenticatedUserEntity` dataclass
- [x] 2.3 Define `OracleAuthRepository` protocol (`authenticate(username, password) -> bool`)
- [x] 2.4 Add `InvalidCredentialsError` and related domain exceptions

## 3. Users domain — application layer

- [x] 3.1 Create DTOs: `LoginInputDTO`, `AuthenticatedUserOutputDTO`
- [x] 3.2 Implement `LoginUseCase` (validate input, call repository, return user entity/DTO)
- [x] 3.3 Implement `LogoutUseCase` (clear session keys)
- [x] 3.4 Implement `GetCurrentUserUseCase` (read `oracle_username` from session)

## 4. Users domain — infrastructure layer

- [x] 4.1 Implement `OracleAuthRepositoryImpl` with ephemeral `oracledb.connect()` using submitted credentials
- [x] 4.2 Implement `SmarDatabaseMiddleware` or DB router so authenticated requests use `smar` alias
- [x] 4.3 Create session helper to set/clear `oracle_username` and `authenticated` flag

## 5. Users domain — presentation layer

- [x] 5.1 Create DRF serializers for login request and user response (format only, no business logic)
- [x] 5.2 Implement `LoginView`, `LogoutView`, `CurrentUserView` (thin — delegate to use cases)
- [x] 5.3 Register `users/presentation/api/urls.py` with `login/`, `logout/`, `me/` routes
- [x] 5.4 Add `users.presentation` to `INSTALLED_APPS`

## 6. Quality tooling and architecture contracts

- [x] 6.1 Add Import-Linter contracts for `users` domain (layers, domain isolation, app-no-presentation, infra boundary)
- [x] 6.2 Add `users` to `domain-independence` module list in `.importlinter`
- [x] 6.3 Add `users` to `[tool.coverage.run].source` in `pyproject.toml`
- [x] 6.4 Enable `mypy_django_plugin` and django settings module in `pyproject.toml`

## 7. Tests

- [x] 7.1 Unit tests: `LoginUseCase` happy path and invalid credentials
- [x] 7.2 Unit tests: `LogoutUseCase` and `GetCurrentUserUseCase` happy/failure paths
- [x] 7.3 Unit tests: `OracleAuthRepositoryImpl` with mocked `oracledb`
- [x] 7.4 API tests: login 200/401/400, logout 204/401, me 200/401
- [x] 7.5 Verify coverage ≥ 80% with `pytest`

## 8. CI and documentation

- [x] 8.1 Update `.github/workflows/ci.yml` to install `requirements.txt` and run full quality suite
- [x] 8.2 Verify `.env.example` documents all required Oracle variables (already present — confirm alignment)
- [x] 8.3 Run `python manage.py check` locally with test env vars
