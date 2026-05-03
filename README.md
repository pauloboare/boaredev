# BoareDev

🇺🇸 Protocol + skills for AI-assisted development.
🇧🇷 Protocolo + skills para desenvolvimento assistido por IA.

🇺🇸 Install once and reuse across Claude Code, Cursor, GitHub Copilot, and Gemini CLI.
🇧🇷 Instale uma vez e reutilize com Claude Code, Cursor, GitHub Copilot e Gemini CLI.

## Install / Instalação

🇺🇸 Install from npm with the short command.
🇧🇷 Instale pelo npm com o comando curto.

```bash
npx boaredev install
```

🇺🇸 Update BoareDev inside an existing project.
🇧🇷 Atualize o BoareDev dentro de um projeto existente.

```bash
npx boaredev update
```

🇺🇸 Add instructions for another supported tool.
🇧🇷 Adicione instruções para outra tool suportada.

```bash
npx boaredev add-tool
```

🇺🇸 If npm is temporarily unavailable, GitHub install is the fallback.
🇧🇷 Se o npm estiver temporariamente indisponível, a instalação pelo GitHub é o fallback.

```bash
npx github:pauloboare/boaredev install
```

## Common Commands / Comandos Comuns

🇺🇸 Main commands after the package is published on npm.
🇧🇷 Comandos principais depois que o pacote foi publicado no npm.

```bash
npx boaredev install
npx boaredev update
npx boaredev add-tool
npx boaredev keys
npx boaredev keys set
npx boaredev keys set gemini
npx boaredev keys remove gemini
npx boaredev keys export
```

## What It Creates / O Que Ele Cria

🇺🇸 BoareDev keeps the project context inside your own repository.
🇧🇷 O BoareDev mantém o contexto do projeto dentro do seu próprio repositório.

🇺🇸 It installs Claude Code skills in the folder Claude actually reads.
🇧🇷 Ele instala as skills do Claude Code na pasta que o Claude realmente lê.

```text
your-project/
  .boaredev/context/
    contexto-negocio.md
    entidades-dominio.md
    banco-dados.md
    controle-acesso.md
    decisoes-arquitetura.md
    lgpd-regras.md
  .claude/skills/
  .agents/skills/
  CLAUDE.md
  .cursorrules
  .github/copilot-instructions.md
  GEMINI.md
```

🇺🇸 `.claude/skills/` is used for Claude Code slash commands and skill discovery.
🇧🇷 `.claude/skills/` é usada para slash commands e descoberta de skills no Claude Code.

🇺🇸 `.agents/skills/` is kept as a compatibility mirror.
🇧🇷 `.agents/skills/` é mantida como espelho por compatibilidade.

## Claude Code

🇺🇸 After installation, open Claude Code in VS Code and type `/`.
🇧🇷 Depois da instalação, abra o Claude Code no VS Code e digite `/`.

🇺🇸 You should see commands such as `/arquiteto`, `/dba`, `/qa`, and others.
🇧🇷 Você deve ver comandos como `/arquiteto`, `/dba`, `/qa` e outros.

🇺🇸 If `.claude/skills/` was created for the first time, restart the Claude Code session.
🇧🇷 Se `.claude/skills/` foi criada pela primeira vez, reinicie a sessão do Claude Code.

## API Keys / Chaves de API

🇺🇸 Some skills use external providers.
🇧🇷 Algumas skills usam provedores externos.

🇺🇸 Keys are stored in `~/.boaredev/keys.json` and should never be committed.
🇧🇷 As chaves ficam em `~/.boaredev/keys.json` e nunca devem ser versionadas.

🇺🇸 Supported providers.
🇧🇷 Provedores suportados.

| Provider | Env Var | Skills |
|----------|---------|--------|
| `gemini` | `GEMINI_API_KEY` | `/gemini-explore` |
| `openrouter` | `OPENROUTER_API_KEY` | `/gpt-draft` |
| `github` | `GITHUB_TOKEN` | — |

🇺🇸 Example to export keys into your shell.
🇧🇷 Exemplo para exportar as chaves para o seu shell.

```bash
npx boaredev keys export >> ~/.bashrc && source ~/.bashrc
```

## Skills

🇺🇸 BoareDev ships 16 specialist skills.
🇧🇷 O BoareDev entrega 16 skills especialistas.

| Skill | English |
|-------|---------|
| `/modelo` | Classify complexity and recommend model tier |
| `/arquiteto` | Module design and boundaries |
| `/gpt-draft` | Generate PHP boilerplate |
| `/gemini-explore` | Read multiple files in parallel |
| `/criar-teste` | Generate PHPUnit tests |
| `/revisar-padrao` | Post-implementation review |
| `/cleancode` | Readability and naming |
| `/dba` | Schema, indexes, and query review |
| `/lgpd` | LGPD and sensitive data |
| `/seguranca` | OWASP and hardening |
| `/qa` | Test strategy and edge cases |
| `/uxdesign` | UI/UX for Bootstrap 5 + Vanilla JS |
| `/novo-modulo` | Scaffold a CRUD module |
| `/novo-projeto` | Bootstrap a new project |
| `/analista-dados` | Reports and KPIs |
| `/skill-creator` | Create or improve skills |

| Skill | Português |
|-------|-----------|
| `/modelo` | Classifica a complexidade e recomenda a faixa de modelo |
| `/arquiteto` | Design de módulos e fronteiras |
| `/gpt-draft` | Gera boilerplate PHP |
| `/gemini-explore` | Lê vários arquivos em paralelo |
| `/criar-teste` | Gera testes PHPUnit |
| `/revisar-padrao` | Revisão pós-implementação |
| `/cleancode` | Legibilidade e nomes |
| `/dba` | Schema, índices e revisão de queries |
| `/lgpd` | LGPD e dados sensíveis |
| `/seguranca` | OWASP e hardening |
| `/qa` | Estratégia de testes e edge cases |
| `/uxdesign` | UI/UX para Bootstrap 5 + Vanilla JS |
| `/novo-modulo` | Cria um módulo CRUD |
| `/novo-projeto` | Inicializa um novo projeto |
| `/analista-dados` | Relatórios e KPIs |
| `/skill-creator` | Cria ou melhora skills |

## Default Stack / Stack Padrão

`PHP procedural/DDD · PDO MySQL · Bootstrap 5 · Vanilla JS ES6+`

🇺🇸 You can override the stack during install.
🇧🇷 Você pode alterar a stack durante a instalação.

## Repository Structure / Estrutura do Repositório

🇺🇸
```text
protocol/          core rules
padroes/           technical standards
skills/            source of truth for skills
templates/         scaffolding templates
tools/             per-tool instruction templates
project-template/  project context templates
bin/               CLI entrypoint
installer/         install and update logic
```

🇧🇷
```text
protocol/          regras centrais
padroes/           padrões técnicos
skills/            fonte de verdade das skills
templates/         templates de scaffolding
tools/             templates por tool
project-template/  templates de contexto do projeto
bin/               entrada do CLI
installer/         lógica de instalação e atualização
```

## GitHub Workflows

🇺🇸 `.github/workflows/` is the GitHub Actions folder.
🇧🇷 `.github/workflows/` é a pasta do GitHub Actions.

🇺🇸 It is used for automation such as tests, lint, release, and npm publish.
🇧🇷 Ela é usada para automações como testes, lint, release e publicação no npm.

🇺🇸 If there is no workflow file there yet, nothing is running automatically.
🇧🇷 Se ainda não existe arquivo de workflow ali, nada está rodando automaticamente.
