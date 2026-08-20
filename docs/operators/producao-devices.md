# Produção — Devices

**Caminho:** Acessos → Devices (`/app/devices`).  
**Precisa de:** ser **gestor de filial** (grupo `branch_managers`) ou superusuário. Sem isso o item não aparece.

## Ver tokens

A tabela mostra label, prefixo do token, status, data de criação e se há máquina vinculada (UUID) ou ainda sem vínculo.

## Criar token

1. **Criar token**.
2. Informe um **rótulo** opcional (para reconhecer o device depois).
3. Confirme.
4. **Copie o token completo na hora** — ele não será mostrado de novo.
5. Entregue o valor com segurança ao responsável pelo equipamento.

## No dispositivo

O equipamento autentica com o token e um `device_uuid` próprio. Na primeira verificação bem-sucedida, o UUID fica ligado àquele token.

## Revogar

1. Na linha de um token **ativo**, escolha revogar.
2. Confirme.
3. Token (e máquina ligada) deixam de funcionar.

Use revogação quando o device for descomissionado, perdido ou suspeito.

## Problemas comuns

| Sintoma | Possível causa |
|---------|----------------|
| Menu Devices sumiu | Usuário sem grupo `branch_managers` |
| Token “não funciona” | Já revogado, digitado errado, ou UUID diferente do vinculado |
| Esqueci o token | Não há recuperação do valor cru — **crie outro** e revogue o antigo |
