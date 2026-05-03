# Setup de Arquivos de Contexto — Novo Projeto

> Executar **antes de qualquer código** em projetos novos.
> Invocar via skill `/novo-projeto`.

---

## `CLAUDE.md` (raiz do projeto — lido automaticamente pelo Claude Code)

```markdown
# Contexto do Projeto — [Nome]

Leia obrigatoriamente antes de qualquer ação:

1. `.dev/CLAUDE.md` — contexto de negócio, módulos, entidades e regras do domínio
2. `.dev/AI_RULES.md` — regras específicas de código deste projeto

Contexto global (stack, arquitetura, LGPD, testes) está em `~/.claude/CLAUDE.md`.
```

## `.github/copilot-instructions.md` (lido automaticamente pelo VS Code Copilot)

```markdown
# Copilot Instructions — [Nome]

## Ação obrigatória antes de qualquer implementação

Leia `.dev/CLAUDE.md` (contexto de negócio) e `.dev/AI_RULES.md` (regras específicas) antes de qualquer ação.

## Stack

PHP procedural/DDD + PDO MySQL + Vanilla JS ES6+ + Bootstrap 5. Sem Laravel, Symfony, React, Vue.

## Contexto completo

- Negócio e módulos: `.dev/CLAUDE.md`
- Regras de código do projeto: `.dev/AI_RULES.md`
- Regras globais: carregadas via `settings.json` (arquivos do Obsidian em `D:\Obsidian\DevProtocol\`)
```

## `.github/prompts/*.prompt.md` (VS Code Copilot — skills invocáveis com `/nome`)

Criar um arquivo por skill necessário. Frontmatter mínimo:

```markdown
---
mode: 'agent'
description: 'Descrição do skill'
---
Conteúdo das instruções do skill.
```

Skills padrão a criar: `criar-teste`, `novo-modulo`, `revisar-padrao`, `arquiteto`, `dba`, `lgpd`.

## `GEMINI.md` (raiz do projeto — lido automaticamente pelo Antigravity)

```markdown
# Contexto do Projeto — [Nome]

Leia obrigatoriamente antes de qualquer ação:

1. `.dev/CLAUDE.md` — contexto de negócio, módulos, entidades e regras do domínio
2. `.dev/AI_RULES.md` — regras específicas de código deste projeto

Contexto global está em `~/.gemini/GEMINI.md`.
```

## `.cursorrules` (raiz do projeto — lido automaticamente pelo Cursor)

```markdown
# Cursor Rules — [Nome]

Leia obrigatoriamente antes de qualquer ação:

1. `.dev/CLAUDE.md` — contexto de negócio, módulos, entidades e regras do domínio
2. `.dev/AI_RULES.md` — regras específicas de código deste projeto

Contexto global (stack, arquitetura, LGPD, testes) está em `D:\Obsidian\DevProtocol\`.
```

## `.cursor/rules/*.mdc` (Cursor — regras contextuais por arquivo)

Criar um arquivo por contexto. Frontmatter:

```markdown
---
description: Descrição da regra
globs: modulos/**/*.php
alwaysApply: false
---
Conteúdo das regras.
```

Regras padrão a criar: `modulos.mdc`, `domain.mdc`, `tests.mdc`.

## `.gitignore` — entradas obrigatórias

```
.dev/explore-cache/
.env
```
