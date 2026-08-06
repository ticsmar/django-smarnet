# Smarnet ERP

Monólito modular de ERP (Django + React) com contextos de usuários, autenticação de filial e compras.

## Language

**Fornecedor**:
Empresa ou pessoa fornecedora cadastrada no módulo de Compras.
_Avoid_: Supplier (em textos PT), vendor, cliente

**Inativar fornecedor**:
Desativação lógica (`for_ativo = 0`) via procedure Oracle; não é exclusão física do registro.
_Avoid_: delete, apagar, hard delete

**Token de device**:
Credencial emitida para um dispositivo/filial autenticar-se via branch-auth; valor cru só na criação.
_Avoid_: API key genérica, senha de usuário

**Máquina (device)**:
Dispositivo identificado por `device_uuid`, vinculado a um token no primeiro verify bem-sucedido.
_Avoid_: computador genérico, servidor

**Gestor de filial**:
Papel (grupo Django `branch_managers`) autorizado a gerir tokens de device.
_Avoid_: admin genérico, superusuário (papéis distintos)

**Admin de acesso**:
Papel (grupo Django `access_admins`) autorizado a gerir usuários e grupos em `/settings` e `/api/admin/`.
_Avoid_: gestor de filial, superusuário (podem coexistir, mas não são sinônimos)

**Superusuário**:
Usuário Django com `is_superuser`, com acesso a ferramentas de desenvolvimento como o Design System.
_Avoid_: gestor de filial, admin de acesso

**Design System**:
Documentação in-app de componentes e padrões de UI em `/design-system`.
_Avoid_: Documentação do Sistema (produto/domínio/operação em `docs/`)

**Documentação do Sistema**:
Conjunto de Markdown em `docs/` por público (developers, admins, operators), mais `CONTEXT.md` e `AGENTS.md`.
_Avoid_: Design System, Swagger sozinho

**Padrão de cadastro e listagem**:
Contrato de UX/API/perms para entidades mestre: ViewToggle (tabela/lista/cards), ações ⋮ à esquerda ou botões no rodapé do card, soft inativar, breadcrumb global, camadas hexagonais.
_Avoid_: listagem só-tabela, hard delete genérico sem alinhar ao domínio, breadcrumb embutido na página
