# Contexto — Paulo

Stack: PHP procedural/DDD + PDO MySQL | Vanilla JS ES6+ + Bootstrap 5 | PHPUnit
Ambiente: XAMPP Windows `D:\xampp\htdocs\`
Sem: Laravel, Symfony, React, Vue.

## Trabalho
- Direto ao ponto. Não repita o pedido.
- Não adicione features além do solicitado.
- Não adicione comentários sem pedido explícito.
- Leia arquivo antes de editar.
- `.dev/CLAUDE.md` no projeto → leia antes de qualquer ação.
- `CONTEXT.md` no módulo ativo → leia antes de qualquer ação.

## Arquivos por projeto (criar antes de qualquer código)
CLAUDE.md → Claude Code | .github/copilot-instructions.md → VS Code Copilot
GEMINI.md → Antigravity | .cursorrules → Cursor global | .cursor/rules/*.mdc → Cursor contextual
Todos apontam para `.dev/CLAUDE.md` e `.dev/AI_RULES.md`

## .dev/CLAUDE.md: o que vai
Banco/tabelas/exceções ao soft delete | módulos ativos | entidades do domínio | funções LGPD do projeto | padrões únicos (TransitorDeStatus, etc.) | controle de acesso contextual
Não vai: stack, prepared statements, softDelete, exigirPermissao — cobertos pelo DevProtocol global.
