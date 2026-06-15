## ADDED Requirements

### Requirement: Register new Oracle user

The system SHALL provide user registration that creates a new Oracle database user with the provided `username` and `password` using the SMAR database connection.

#### Scenario: Successful registration

- **WHEN** a client sends `POST /api/users/register/` with body `{"username": "new_user", "password": "secure_pass"}` and the Oracle user does not already exist
- **THEN** the response status is 201, the Oracle user is created, the session is authenticated, and the response body is `{"username": "new_user"}`

#### Scenario: Registration rejects existing user

- **WHEN** a client sends `POST /api/users/register/` with a `username` that already exists in Oracle
- **THEN** the response status is 409 and no session is created

#### Scenario: Registration rejects empty credentials

- **WHEN** a client sends `POST /api/users/register/` with missing or blank `username` or `password`
- **THEN** the response status is 400 and no Oracle user is created

#### Scenario: Post-registration database uses SMAR credentials

- **WHEN** registration succeeds and the client performs a subsequent authenticated database operation
- **THEN** the operation uses the `smar` database alias

### Requirement: Registration logic in application layer

Registration MUST be implemented as `RegisterUseCase`. Presentation views and serializers MUST NOT contain business rules for user creation.

#### Scenario: Register view delegates to use case

- **WHEN** the register endpoint receives a request
- **THEN** it delegates validation and user creation to `RegisterUseCase` without embedding creation logic in the view or serializer

### Requirement: Oracle user creation through repository

Oracle user existence checks and `CREATE USER` execution MUST occur only in an infrastructure repository implementation of the domain `OracleUserRepository` contract.

#### Scenario: Domain layer has no Oracle user-creation imports

- **WHEN** static analysis runs on `users/domain/`
- **THEN** no Oracle driver or Django ORM imports are present for user creation

## MODIFIED Requirements

### Requirement: Test coverage for authentication use cases

Every public authentication use case (`LoginUseCase`, `LogoutUseCase`, `GetCurrentUserUseCase`, `RegisterUseCase`) MUST have unit tests covering happy path and failure path, with overall domain coverage at or above 80%.

#### Scenario: Register use case failure path tested

- **WHEN** the test suite runs
- **THEN** there is a test proving `RegisterUseCase` returns failure when the repository reports the user already exists

#### Scenario: Login use case failure path tested

- **WHEN** the test suite runs
- **THEN** there is a test proving `LoginUseCase` returns failure when the repository rejects credentials
