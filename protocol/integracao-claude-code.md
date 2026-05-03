# Integração Claude Code

## Scripts
`~/.claude/scripts/`: ag.php (Gemini) | github-models.php (Copilot) | session-closer.php
Gemini expirada: `ag.php --check` → exit 2 → renovar em https://aistudio.google.com/app/apikey → atualizar `settings.json` env.GEMINI_API_KEY

## Sessão
/clear: mudou de assunto ou histórico tem decisões descartadas — nunca no meio de implementação
/compact: sessão longa, trabalho não terminou
Subagentes: retornam apenas resumo ao contexto principal

## .dev/CLAUDE.md do projeto
Incluir: banco/tabelas, módulos ativos, entidades do domínio, funções LGPD, padrões únicos, controle de acesso
Não incluir: stack, regras globais — cobertos pelo DevProtocol
