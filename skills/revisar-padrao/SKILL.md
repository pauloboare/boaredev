---
name: revisar-padrao
description: Revisa código PHP do projeto atual contra os padrões estabelecidos (segurança, banco, reaproveitamento, testes). Use quando o usuário quiser checar qualidade do código, antes de fazer commit, ou ao revisar um módulo específico.
---

# Revisar Padrão de Código

Você vai revisar o código indicado e reportar desvios dos padrões estabelecidos.

## Antes de revisar

1. Ler `.dev/AI_RULES.md` do projeto
2. Se módulo específico: ler seu `CONTEXT.md`

## O que revisar

Se o usuário não especificou um arquivo, pergunte qual módulo ou arquivo revisar.
Se disse "tudo", revisar os arquivos modificados recentemente (`git diff` ou `git status`).

## Checklist de revisão

### Segurança
- [ ] Todo output HTML usa `sanitize()` ou `htmlspecialchars()`
- [ ] Nenhum `$_GET`/`$_POST` usado diretamente em queries
- [ ] Prepared statements em todas as queries (sem concatenação de SQL)
- [ ] Credenciais via `env()` — sem hardcode
- [ ] `verificarLogin()` ou `exigirPermissao()` no topo de arquivos protegidos

### Banco de dados
- [ ] Usa `query()`, `fetchOne()`, `fetchAll()`, `insert()`, `update()` — não PDO direto nos módulos
- [ ] Soft delete via `softDelete()` — sem `DELETE` direto
- [ ] Operações críticas registradas com `registrarLog()`

### Estrutura
- [ ] Arquivo de módulo segue padrão: bootstrap → permissão → lógica → header → HTML → footer
- [ ] API endpoint: verifica método HTTP, retorna `jsonResponse()`
- [ ] AJAX endpoint: verifica sessão, retorna JSON limpo

### Reaproveitamento
- [ ] Nenhuma função duplicada que já existe em `includes/helpers.php` ou `includes/validacoes.php`
- [ ] Validações usando as funções centralizadas (`validarCPF()`, `validarEmail()`, etc.)
- [ ] Componentes UI via `includes/components/` quando disponível

### Testes
- [ ] Existe teste correspondente em `tests/` para lógica de negócio nova
- [ ] Testes não testam HTML/output — testam funções e retornos

## Formato do relatório

Reportar em 3 seções:

### ✅ OK
O que está correto (resumido)

### ⚠️ Alertas
Desvios que não são erros críticos mas devem ser corrigidos

### 🚨 Problemas
Problemas que DEVEM ser corrigidos (segurança, lógica incorreta, padrão quebrado)

Para cada problema: arquivo:linha — descrição — correção sugerida

## Após o relatório

Perguntar: "Quer que eu corrija os problemas encontrados?"
Se sim: corrigir seguindo os padrões, um arquivo por vez.
