## ADDED Requirements

### Requirement: Login with Oracle personal credentials

The system SHALL authenticate users by validating the provided `username` and `password` against Oracle using personal credentials (`ORACLE_USER`/`ORACLE_PASSWORD` pattern — credentials supplied in the login request, not the SMAR service account).

#### Scenario: Successful login with valid Oracle credentials

- **WHEN** a client sends `POST /api/users/login/` with body `{"username": "valid_user", "password": "valid_pass"}` and Oracle accepts those credentials
- **THEN** the response status is 200, the session is marked authenticated, and the response body contains `{"username": "valid_user"}`

#### Scenario: Failed login with invalid Oracle credentials

- **WHEN** a client sends `POST /api/users/login/` with credentials Oracle rejects
- **THEN** the response status is 401 and the session is not authenticated

#### Scenario: Login rejects empty credentials

- **WHEN** a client sends `POST /api/users/login/` with missing or blank `username` or `password`
- **THEN** the response status is 400 and no authentication attempt is made against Oracle

### Requirement: Post-login database uses SMAR credentials

After successful login, the system SHALL route authenticated business database operations through the `smar` database alias using `ORACLE_SMAR_USER` and `ORACLE_SMAR_PASSWORD`.

#### Scenario: Authenticated request uses SMAR connection

- **WHEN** an authenticated session performs a database operation through the application layer
- **THEN** the operation uses the `smar` database alias, not personal user credentials

### Requirement: Session does not store password

The system SHALL store only the Oracle username in the session after login. The password MUST NOT be persisted in session, cookies, logs, or database.

#### Scenario: Session contains username only

- **WHEN** login succeeds for user `valid_user`
- **THEN** the session contains `oracle_username` equal to `valid_user` and does not contain the password

### Requirement: Logout ends session

The system SHALL provide logout that invalidates the authenticated session.

#### Scenario: Successful logout

- **WHEN** an authenticated client sends `POST /api/users/logout/`
- **THEN** the response status is 204 and subsequent requests to protected endpoints are treated as unauthenticated

#### Scenario: Logout without session

- **WHEN** an unauthenticated client sends `POST /api/users/logout/`
- **THEN** the response status is 401

### Requirement: Current user endpoint

The system SHALL expose the authenticated Oracle username via a current-user endpoint.

#### Scenario: Authenticated user retrieves identity

- **WHEN** an authenticated client sends `GET /api/users/me/`
- **THEN** the response status is 200 and the body is `{"username": "<oracle_username>"}`

#### Scenario: Unauthenticated access to current user

- **WHEN** an unauthenticated client sends `GET /api/users/me/`
- **THEN** the response status is 401

### Requirement: Authentication logic in application layer

Login, logout, and current-user behavior MUST be implemented as application use cases. Presentation views and serializers MUST NOT contain business rules.

#### Scenario: Login view delegates to use case

- **WHEN** the login endpoint receives a request
- **THEN** it delegates validation and authentication to `LoginUseCase` without embedding credential-check logic in the view or serializer

### Requirement: Oracle access through repository

Oracle credential validation MUST occur only in an infrastructure repository implementation of the domain `OracleAuthRepository` contract. No raw SQL or Oracle driver calls outside repository implementations.

#### Scenario: Domain layer has no Oracle imports

- **WHEN** static analysis runs on `users/domain/`
- **THEN** no Oracle driver or Django ORM imports are present

### Requirement: Test coverage for authentication use cases

Every public authentication use case (`LoginUseCase`, `LogoutUseCase`, `GetCurrentUserUseCase`) MUST have unit tests covering happy path and failure path, with overall domain coverage at or above 80%.

#### Scenario: Login use case failure path tested

- **WHEN** the test suite runs
- **THEN** there is a test proving `LoginUseCase` returns failure when the repository rejects credentials
