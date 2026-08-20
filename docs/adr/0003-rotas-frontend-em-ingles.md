# Paths de rota do frontend em inglês

URLs misturavam português e inglês (`/settings/usuarios` vs `/request-access`), o que dificultava consistência e deep links. Decidimos que **paths de rota** do React Router são sempre em **inglês** (kebab-case); **labels e copy** da UI continuam em português.

- Settings: tabela canônica em `docs/developers/admin-settings.md`; paths PT redirecionam com `<Navigate replace />`.
- App autenticado: tabela canônica em `docs/developers/app-routes.md`; paths PT sob `/app/*` também redirecionam.
- **Toda rota nova ou existente** deve seguir inglês; não deixar path PT “estabilizado” sem migração.

## Status

accepted
