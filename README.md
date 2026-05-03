# BoareDev

Protocol + skills for AI-assisted development.
Protocolo + skills para desenvolvimento assistido por IA.

Install once and reuse across Claude Code, Cursor, GitHub Copilot, and Gemini CLI.
Instale uma vez e reutilize com Claude Code, Cursor, GitHub Copilot e Gemini CLI.

## Install / Instalação

If the package is not yet published on npm, install directly from GitHub.
Se o pacote ainda não estiver publicado no npm, instale direto do GitHub.

```bash
npx github:pauloboare/boaredev install
```

Alternative command using `npm exec`.
Comando alternativo usando `npm exec`.

```bash
npm exec --yes --package=github:pauloboare/boaredev boaredev install
```

If the package is published on npm, the short command will work.
Se o pacote for publicado no npm, o comando curto vai funcionar.

```bash
npx boaredev install
```

## Common commands / Comandos comuns

Use these commands when installing from GitHub.
Use estes comandos quando estiver instalando pelo GitHub.

```bash
npx github:pauloboare/boaredev install
npx github:pauloboare/boaredev update
npx github:pauloboare/boaredev add-tool
npx github:pauloboare/boaredev keys
npx github:pauloboare/boaredev keys set
npx github:pauloboare/boaredev keys set gemini
npx github:pauloboare/boaredev keys remove gemini
npx github:pauloboare/boaredev keys export
```

## What it creates / O que ele cria

BoareDev keeps the project context inside your own repository.
O BoareDev mantém o contexto do projeto dentro do seu próprio repositório.

It installs Claude Code skills in the folder Claude actually reads.
Ele instala as skills do Claude Code na pasta que o Claude realmente lê.

```text
your-project/
seu-projeto/
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

`.claude/skills/` is for Claude Code slash commands and skill discovery.
`.claude/skills/` é para slash commands e descoberta de skills no Claude Code.

`.agents/skills/` is kept as a compatibility mirror.
`.agents/skills/` é mantido como espelho por compatibilidade.

## Claude Code

After installation, open Claude Code in VS Code and type `/`.
Depois da instalação, abra o Claude Code no VS Code e digite `/`.

You should see commands such as `/arquiteto`, `/dba`, `/qa`, and others.
Você deve ver comandos como `/arquiteto`, `/dba`, `/qa` e outros.

If `.claude/skills/` was created for the first time, restart the Claude Code session.
Se `.claude/skills/` foi criada pela primeira vez, reinicie a sessão do Claude Code.

## API keys / Chaves de API

Some skills use external providers.
Algumas skills usam provedores externos.

Keys are stored in `~/.boaredev/keys.json` and should never be committed.
As chaves ficam em `~/.boaredev/keys.json` e nunca devem ser versionadas.

Supported providers.
Provedores suportados.

| Provider | Env Var | Skills |
|----------|---------|--------|
| `gemini` | `GEMINI_API_KEY` | `/gemini-explore` |
| `openrouter` | `OPENROUTER_API_KEY` | `/gpt-draft` |
| `github` | `GITHUB_TOKEN` | — |

Example to export keys into your shell.
Exemplo para exportar as chaves para o seu shell.

```bash
npx github:pauloboare/boaredev keys export >> ~/.bashrc && source ~/.bashrc
```

## Skills

BoareDev ships 16 specialist skills.
O BoareDev entrega 16 skills especialistas.

| Skill | Purpose / Função |
|-------|-------------------|
| `/modelo` | Classify complexity and recommend model tier / Classifica a complexidade e recomenda a faixa de modelo |
| `/arquiteto` | Module design and boundaries / Design de módulos e fronteiras |
| `/gpt-draft` | Generate PHP boilerplate / Gera boilerplate PHP |
| `/gemini-explore` | Read multiple files in parallel / Lê vários arquivos em paralelo |
| `/criar-teste` | Generate PHPUnit tests / Gera testes PHPUnit |
| `/revisar-padrao` | Post-implementation review / Revisão pós-implementação |
| `/cleancode` | Readability and naming / Legibilidade e nomes |
| `/dba` | Schema, indexes, and query review / Schema, índices e revisão de queries |
| `/lgpd` | LGPD and sensitive data / LGPD e dados sensíveis |
| `/seguranca` | OWASP and hardening / OWASP e hardening |
| `/qa` | Test strategy and edge cases / Estratégia de testes e edge cases |
| `/uxdesign` | UI/UX for Bootstrap 5 + Vanilla JS / UI/UX para Bootstrap 5 + Vanilla JS |
| `/novo-modulo` | Scaffold a CRUD module / Cria um módulo CRUD |
| `/novo-projeto` | Bootstrap a new project / Inicializa um novo projeto |
| `/analista-dados` | Reports and KPIs / Relatórios e KPIs |
| `/skill-creator` | Create or improve skills / Cria ou melhora skills |

## Default stack / Stack padrão

`PHP procedural/DDD · PDO MySQL · Bootstrap 5 · Vanilla JS ES6+`

You can override the stack during install.
Você pode alterar a stack durante a instalação.

## Repository structure / Estrutura do repositório

```text
protocol/          core rules / regras centrais
padroes/           technical standards / padrões técnicos
skills/            source of truth for skills / fonte de verdade das skills
templates/         scaffolding templates / templates de scaffolding
tools/             per-tool instruction templates / templates por tool
project-template/  project context templates / templates de contexto do projeto
bin/               CLI entrypoint / entrada do CLI
installer/         install and update logic / lógica de instalação e atualização
```

## GitHub workflows

`.github/workflows/` is the GitHub Actions folder.
`.github/workflows/` é a pasta do GitHub Actions.

It is used for automation such as tests, lint, release, and npm publish.
Ela é usada para automações como testes, lint, release e publicação no npm.

If there is no workflow file there yet, nothing is running automatically.
Se ainda não existe arquivo de workflow ali, nada está rodando automaticamente.

## Publish to npm / Publicar no npm

Publishing to npm means making `boaredev` available in the npm registry.
Publicar no npm significa disponibilizar `boaredev` no registro do npm.

After that, `npx boaredev install` works by package name.
Depois disso, `npx boaredev install` funciona pelo nome do pacote.

First time checklist.
Checklist da primeira publicação.

1. Create an account on [npmjs.com](https://www.npmjs.com/).
1. Crie uma conta em [npmjs.com](https://www.npmjs.com/).
2. In the terminal, run `npm login`.
2. No terminal, rode `npm login`.
3. Validate the package with `npm run pack:check`.
3. Valide o pacote com `npm run pack:check`.
4. Simulate the publish with `npm run publish:dry-run`.
4. Simule a publicação com `npm run publish:dry-run`.
5. Publish for real with `npm publish`.
5. Publique de verdade com `npm publish`.

Commands.
Comandos.

```bash
npm login
npm run pack:check
npm run publish:dry-run
npm publish
```

If npm says you are not logged in, run `npm login` again.
Se o npm disser que você não está logado, rode `npm login` novamente.

If npm says the package name is unavailable, you will need a different package name.
Se o npm disser que o nome do pacote não está disponível, você vai precisar de outro nome de pacote.
