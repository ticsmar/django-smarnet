# ERP Generation Specification

You are generating code for a modular monolith ERP.

Before generating code:

1. Verify compliance with ARCHITECTURE.md
2. Verify compliance with AI_DEVELOPMENT_RULES.md
3. Reject any design that violates dependency rules

For every feature:

Generate:

- Domain entities
- Repository interfaces
- DTOs
- Use cases
- Repository implementations
- API endpoints
- Unit tests
- Integration tests

Never:

- Place business logic in Django views
- Place business logic in serializers
- Place business logic in ORM models

Business logic belongs exclusively in Application Use Cases.

When multiple implementations are possible:

Choose the solution that:

- Maximizes maintainability
- Minimizes coupling
- Maximizes testability

Assume the codebase will exceed 500,000 lines of code.

Optimize for long-term maintainability over short-term speed.
