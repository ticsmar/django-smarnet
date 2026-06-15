## ADDED Requirements

### Requirement: Django project is runnable

The system SHALL provide a Django project package (`config/`) with `settings`, `urls`, `wsgi`, and `asgi` entry points so the application can start with `manage.py runserver`.

#### Scenario: Server starts with valid configuration

- **WHEN** environment variables for Oracle connectivity are set and `python manage.py check` is executed
- **THEN** the command exits with status 0 and reports no system check errors

### Requirement: Oracle database configuration

The system SHALL configure Django `DATABASES` with at least two aliases: `default` (personal Oracle credentials from login) and `smar` (business schema credentials from `ORACLE_SMAR_USER` and `ORACLE_SMAR_PASSWORD` environment variables). Both aliases MUST share `ORACLE_HOST`, `ORACLE_PORT`, and `ORACLE_SERVICE_NAME`.

#### Scenario: SMAR connection uses environment credentials

- **WHEN** the application loads settings with `ORACLE_SMAR_USER=smar_user` and `ORACLE_SMAR_PASSWORD=smar_pass` set
- **THEN** the `smar` database alias is configured with user `smar_user` and password `smar_pass`

### Requirement: Oracle client initialization

The system SHALL initialize the Oracle client using `ORACLE_CLIENT_PATH` when that variable is set, and SHALL operate in thin mode when it is unset.

#### Scenario: Thick mode with client path

- **WHEN** `ORACLE_CLIENT_PATH` points to a valid Instant Client directory
- **THEN** the Oracle driver initializes in thick mode before database connections are opened

#### Scenario: Thin mode without client path

- **WHEN** `ORACLE_CLIENT_PATH` is empty or unset
- **THEN** the application starts without calling thick-mode initialization

### Requirement: Users domain registered

The system SHALL register the `users` domain presentation layer in Django `INSTALLED_APPS` and include its API URLs under `/api/users/`.

#### Scenario: Users API routes are mounted

- **WHEN** the root URL configuration is loaded
- **THEN** requests to `/api/users/` are routed to the users presentation layer

### Requirement: Development dependencies documented

The system SHALL declare runtime dependencies (`django`, `oracledb`, `djangorestframework`, `django-environ`) in a `requirements.txt` file and SHALL keep quality tooling (`ruff`, `mypy`, `pytest`, `import-linter`) in `requirements-dev.txt`.

#### Scenario: Dependencies installable

- **WHEN** a developer runs `pip install -r requirements.txt`
- **THEN** all packages required to run the Django application are installed
