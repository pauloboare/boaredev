# BoareDev

Protocol + skills for AI-assisted development. Install once, use across Claude Code, Cursor, GitHub Copilot, and Gemini CLI.

Protocolo + skills para desenvolvimento assistido por IA. Instale uma vez e use com Claude Code, Cursor, GitHub Copilot e Gemini CLI.

## English

### Install

If the package is not yet published on npm, install directly from GitHub:

```bash
npx github:paulohenrique/boaredev install
```

Alternative:

```bash
npm exec --yes --package=github:paulohenrique/boaredev boaredev install
```

If the package is published on npm, this also works:

```bash
npx boaredev install
```

Update and extra commands:

```bash
npx github:paulohenrique/boaredev update
npx github:paulohenrique/boaredev add-tool
npx github:paulohenrique/boaredev keys
```

### What it generates

```text
your-project/
  .boaredev/context/
    contexto-negocio.md
    entidades-dominio.md
    banco-dados.md
    controle-acesso.md
    decisoes-arquitetura.md
    lgpd-regras.md
  .agents/skills/
  CLAUDE.md
  .cursorrules
  .github/copilot-instructions.md
  GEMINI.md
```

Project context stays inside your project. BoareDev only installs the protocol, tool instructions, and specialist skills.

### Commands

```bash
npx github:paulohenrique/boaredev install
npx github:paulohenrique/boaredev update
npx github:paulohenrique/boaredev add-tool
npx github:paulohenrique/boaredev keys
npx github:paulohenrique/boaredev keys set
npx github:paulohenrique/boaredev keys set gemini
npx github:paulohenrique/boaredev keys remove gemini
npx github:paulohenrique/boaredev keys export
```

### API keys

Some skills call external providers. Keys are stored globally in `~/.boaredev/keys.json` and should never be committed.

Supported providers:

| Provider | Env Var | Skills |
|----------|---------|--------|
| `gemini` | `GEMINI_API_KEY` | `/gemini-explore` |
| `openrouter` | `OPENROUTER_API_KEY` | `/gpt-draft` |
| `github` | `GITHUB_TOKEN` | — |

Shell activation example:

```bash
npx github:paulohenrique/boaredev keys export >> ~/.bashrc && source ~/.bashrc
```

### Skills

16 specialists are installed into `.agents/skills/`:

| Skill | Purpose |
|-------|---------|
| `/modelo` | Classify complexity and recommend the right model tier |
| `/arquiteto` | Module design, boundaries, layers |
| `/gpt-draft` | Generate PHP boilerplate with an external model |
| `/gemini-explore` | Read multiple files in parallel with Gemini |
| `/criar-teste` | Generate PHPUnit tests |
| `/revisar-padrao` | Post-implementation review |
| `/cleancode` | Readability, naming, duplication |
| `/dba` | Schema, indexes, query review |
| `/lgpd` | LGPD compliance, sensitive data |
| `/seguranca` | OWASP, hardening, session risks |
| `/qa` | Test strategy and edge cases |
| `/uxdesign` | UI/UX for Bootstrap 5 + Vanilla JS |
| `/novo-modulo` | Scaffold a full CRUD module |
| `/novo-projeto` | Bootstrap a new project |
| `/analista-dados` | Reports, KPIs, aggregations |
| `/skill-creator` | Create or improve skills |

### Default stack

`PHP procedural/DDD · PDO MySQL · Bootstrap 5 · Vanilla JS ES6+`

You can override this during install.

### Repository structure

```text
protocol/          core rules
padroes/           technical standards
skills/            source of truth for skills
templates/         scaffolding templates
tools/             per-tool instruction templates
project-template/  empty context files copied into projects
bin/               CLI entrypoint
installer/         install/update logic
```

### Publish to npm

If you want `npx boaredev install` to work by package name, publish this repository to npm:

```bash
npm login
npm publish
```

## Português

### Instalação

Se o pacote ainda não estiver publicado no npm, instale direto do GitHub:

```bash
npx github:paulohenrique/boaredev install
```

Alternativa equivalente:

```bash
npm exec --yes --package=github:paulohenrique/boaredev boaredev install
```

Se o pacote estiver publicado no npm, este comando também funciona:

```bash
npx boaredev install
```

Atualização e comandos extras:

```bash
npx github:paulohenrique/boaredev update
npx github:paulohenrique/boaredev add-tool
npx github:paulohenrique/boaredev keys
```

### O que ele gera

```text
seu-projeto/
  .boaredev/context/
    contexto-negocio.md
    entidades-dominio.md
    banco-dados.md
    controle-acesso.md
    decisoes-arquitetura.md
    lgpd-regras.md
  .agents/skills/
  CLAUDE.md
  .cursorrules
  .github/copilot-instructions.md
  GEMINI.md
```

O contexto do projeto fica dentro do próprio projeto. O BoareDev só instala o protocolo, as instruções das tools e as skills especializadas.

### Comandos

```bash
npx github:paulohenrique/boaredev install
npx github:paulohenrique/boaredev update
npx github:paulohenrique/boaredev add-tool
npx github:paulohenrique/boaredev keys
npx github:paulohenrique/boaredev keys set
npx github:paulohenrique/boaredev keys set gemini
npx github:paulohenrique/boaredev keys remove gemini
npx github:paulohenrique/boaredev keys export
```

### Chaves de API

Algumas skills chamam provedores externos. As chaves ficam em `~/.boaredev/keys.json` e nunca devem ser versionadas.

Provedores suportados:

| Provider | Env Var | Skills |
|----------|---------|--------|
| `gemini` | `GEMINI_API_KEY` | `/gemini-explore` |
| `openrouter` | `OPENROUTER_API_KEY` | `/gpt-draft` |
| `github` | `GITHUB_TOKEN` | — |

Exemplo para ativar no shell:

```bash
npx github:paulohenrique/boaredev keys export >> ~/.bashrc && source ~/.bashrc
```

### Skills

16 especialistas são instalados em `.agents/skills/`:

| Skill | Função |
|-------|--------|
| `/modelo` | Classifica a complexidade e recomenda a faixa de modelo |
| `/arquiteto` | Design de módulos, fronteiras e camadas |
| `/gpt-draft` | Gera boilerplate PHP com modelo externo |
| `/gemini-explore` | Lê vários arquivos em paralelo com Gemini |
| `/criar-teste` | Gera testes PHPUnit |
| `/revisar-padrao` | Revisão pós-implementação |
| `/cleancode` | Legibilidade, nomes e duplicação |
| `/dba` | Schema, índices e revisão de queries |
| `/lgpd` | LGPD e dados sensíveis |
| `/seguranca` | OWASP, hardening e sessões |
| `/qa` | Estratégia de testes e edge cases |
| `/uxdesign` | UI/UX para Bootstrap 5 + Vanilla JS |
| `/novo-modulo` | Cria um módulo CRUD completo |
| `/novo-projeto` | Inicializa um novo projeto |
| `/analista-dados` | Relatórios, KPIs e agregações |
| `/skill-creator` | Cria ou melhora skills |

### Stack padrão

`PHP procedural/DDD · PDO MySQL · Bootstrap 5 · Vanilla JS ES6+`

Você pode sobrescrever isso durante a instalação.

### Estrutura do repositório

```text
protocol/          regras centrais
padroes/           padrões técnicos
skills/            fonte de verdade das skills
templates/         templates de scaffolding
tools/             templates de instruções por tool
project-template/  arquivos vazios de contexto copiados para os projetos
bin/               entrypoint do CLI
installer/         lógica de instalação/atualização
```

### Publicar no npm

Se você quiser que `npx boaredev install` funcione pelo nome do pacote, publique este repositório no npm:

```bash
npm login
npm publish
```
