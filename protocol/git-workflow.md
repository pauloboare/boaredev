# Git Workflow — Solo Developer

Fluxo simples e eficiente para projetos PHP solo com deploy manual.

## Estratégia: GitHub Flow (simplificado)

Duas branches permanentes:
- `main` — produção. Sempre estável. Nunca commitar código quebrado.
- `dev` — integração. Onde você trabalha no dia a dia.

Branches temporárias (curta duração):
- `feature/nome-curto` — feature nova ou módulo
- `fix/nome-curto` — correção de bug em produção
- `chore/nome-curto` — refactor, débito técnico, sem impacto funcional

## Fluxo diário

```bash
# Início de nova feature/módulo
git checkout dev
git pull origin dev
git checkout -b feature/agendamento-recorrente

# Trabalho normal — commits pequenos e frequentes
git add .
git commit -m "feat(agendamento): adiciona validação de conflito de horário"

# Feature pronta — merge em dev primeiro
git checkout dev
git merge feature/agendamento-recorrente
git push origin dev

# Após testar em dev — merge em main (= deploy)
git checkout main
git merge dev
git push origin main
git branch -d feature/agendamento-recorrente
```

## Convenção de commits (Conventional Commits)

```
tipo(escopo): descrição curta em imperativo

feat(modulo):     nova funcionalidade
fix(modulo):      correção de bug
chore(modulo):    refactor, limpeza, débito técnico
docs(modulo):     documentação
test(modulo):     testes
style(modulo):    CSS, formatação (sem lógica)
```

Exemplos reais:
```
feat(consultas): implementa TransitorDeStatus para cancelamento
fix(auth): corrige sessão não destruída no logout
chore(pacientes): extrai lógica de busca para PacienteRepository
test(agendamento): adiciona casos de edge para conflito de horário
```

## Regras

- Commit pequeno = commit fácil de reverter. Prefira 5 commits pequenos a 1 commit gigante.
- `main` só recebe merge de `dev` — nunca commit direto.
- Branch de feature dura no máximo 1-2 dias. Se demorar mais, dividir em partes menores.
- Antes de merge em main: rodar PHPUnit. Se falhar, não sobe.
- Bug em produção urgente: branch `fix/` saindo de `main`, merge direto em `main` + backport em `dev`.

## Configuração inicial (uma vez por projeto)

```bash
# Criar branch dev a partir de main
git checkout main
git checkout -b dev
git push origin dev

# Proteger main no GitHub (Settings → Branches → Add rule)
# Branch name pattern: main
# ✓ Require a pull request before merging  (opcional para solo)
# ✓ Require status checks to pass (se tiver CI)
```

## .gitignore obrigatório

```
.env
.dev/explore-cache/
vendor/
*.log
```

## Quando usar Pull Request (mesmo solo)

PR faz sentido quando:
- Feature grande que quer revisar o diff completo antes de subir
- Quer usar o GitHub como registro histórico de decisões (comentários no PR)

PR não vale a pena:
- Fix de CSS, rename, ajuste de texto → commit direto em dev

## Débito técnico no Git

Quando fizer um atalho consciente, registre no commit E no TODO-tecnico.md:
```
chore(pacientes): busca por LIKE temporária — TODO: migrar para FULLTEXT INDEX
```
