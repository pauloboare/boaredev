# BoareDev

Protocol + skills for AI-assisted development. One install, works across Claude Code, Cursor, GitHub Copilot, and Gemini CLI.

```bash
npx boaredev install
```

Generates `CLAUDE.md`, `.cursorrules`, `copilot-instructions.md`, and deploys 16 specialist skills into your project. Project context lives in your project — not here.

## What it does

```
your-project/
  .boaredev/context/     ← fill these with your project context
    contexto-negocio.md
    entidades-dominio.md
    banco-dados.md
    controle-acesso.md
    decisoes-arquitetura.md
    lgpd-regras.md
  .agents/skills/        ← 16 specialist skills, auto-deployed
  CLAUDE.md              ← generated for Claude Code
  .cursorrules           ← generated for Cursor / Windsurf
  .github/copilot-instructions.md
  GEMINI.md
```

## Install

```bash
npx boaredev install    # first-time setup
npx boaredev update     # update skills only (safe, never touches context/)
npx boaredev add-tool   # add config for a new AI tool
```

## API Keys (multi-model)

Skills like `/gemini-explore` and `/gpt-draft` call external providers. Manage keys globally (never per-project, never committed):

```bash
npx boaredev keys                # list configured providers
npx boaredev keys set            # interactive: configure all providers
npx boaredev keys set gemini     # configure a single provider
npx boaredev keys remove gemini  # remove a key
npx boaredev keys export         # print shell export lines
```

Keys are stored in `~/.boaredev/keys.json` (mode 600). To activate in your shell:

```bash
npx boaredev keys export >> ~/.bashrc && source ~/.bashrc
```

Supported providers:

| Provider | Env Var | Skills |
|----------|---------|--------|
| `gemini` | `GEMINI_API_KEY` | `/gemini-explore` |
| `openrouter` | `OPENROUTER_API_KEY` | `/gpt-draft` |
| `github` | `GITHUB_TOKEN` | — |

The generated `CLAUDE.md` shows which providers are active at install time.

## Skills

16 specialists available via `/skill-name` in any supported tool:

| Skill | Purpose |
|-------|---------|
| `/modelo` | Classify complexity → recommend Haiku/Sonnet/Opus |
| `/arquiteto` | Module design, boundaries, layers |
| `/gpt-draft` | Generate PHP boilerplate via free external model |
| `/gemini-explore` | Read 3+ files in parallel with Gemini |
| `/criar-teste` | Generate PHPUnit tests |
| `/revisar-padrao` | Post-implementation review |
| `/cleancode` | Readability, naming, duplication |
| `/dba` | Schema, indexes, slow queries |
| `/lgpd` | LGPD compliance, sensitive data |
| `/seguranca` | OWASP, session, hardening |
| `/qa` | Test strategy, edge cases |
| `/uxdesign` | UI/UX Bootstrap 5 + Vanilla JS |
| `/novo-modulo` | Scaffold full CRUD module |
| `/novo-projeto` | Bootstrap new project |
| `/analista-dados` | Reports, KPIs, aggregations |
| `/skill-creator` | Create / improve skills |

## Stack (default)

PHP procedural/DDD · PDO MySQL · Bootstrap 5 · Vanilla JS ES6+

Override during `npx boaredev install` when prompted.

## Repo structure

```
protocol/      core rules (modo-caveman, model-switching, git-workflow, etc.)
padroes/       tech standards (PHP architecture, testing, security/LGPD, frontend)
skills/        source of truth for all 16 skills
templates/     project scaffolding (PRD, spec, new module, session start)
tools/         per-tool config templates (claude, cursor, copilot, gemini)
project-template/  empty context files deployed on install
bin/           CLI entrypoint
installer/     install logic
```

## Migrating from DevProtocol

If you have existing `.dev/CLAUDE.md` files pointing to `D:\Obsidian\DevProtocol\`:

1. Run `npx boaredev install` in each project
2. Copy your project docs to `.boaredev/context/`
3. The generated `CLAUDE.md` uses relative paths — no more absolute references

## License

MIT
