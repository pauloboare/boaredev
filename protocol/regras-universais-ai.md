# Regras Universais

Prioridade: CONTEXT.md do módulo > .dev/CLAUDE.md > checklist > este arquivo

## Comportamento
- Resposta curta, direta, sem repetir pedido
- Não adicionar feature/refactor além do solicitado
- Ler arquivo antes de editar
- Multi-arquivo → classificar complexidade antes de codar

## Guardrails (imutáveis)
- PDO + prepared statements com placeholders nomeados
- Soft delete: `ativo = 0` (sem DELETE físico em dados de negócio)
- Credenciais em `.env`; auth web com sessão PHP
- Dados sensíveis: AES-256-CBC; busca: HMAC-SHA256
- URLs com dado pessoal: UUID (não ID sequencial)
- Testes: lógica/retorno; não testar HTML

## Fluxo
Qualquer implementação → `checklist-pre-implementacao.md`
Feature nova complexa → `fluxo-prd-spec-codigo.md`
