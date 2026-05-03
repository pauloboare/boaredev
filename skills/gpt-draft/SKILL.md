---
name: gpt-draft
description: "Usa modelos externos gratuitos (Qwen/OpenRouter, GPT-4o-mini/GitHub) para rascunhar PHP novo, economizando output tokens do Claude. TRIGGER when: criar arquivo PHP NOVO com 50+ linhas (repositório, serviço, entidade de domínio, test class PHPUnit, migration SQL); gerar boilerplate de módulo (listar/cadastrar/editar.php). Usar ANTES do Write tool para arquivos novos grandes. SKIP: edições em arquivos existentes; arquivos com menos de 50 linhas."
---

# GPT Draft — Geração de código com modelos externos

Rascunha arquivos novos pesados em output com modelos gratuitos externos.

## SKIP esta skill se:
- Lógica de negócio complexa/específica do domínio (regras que o modelo externo não conhece)
- Criptografia LGPD ou máquinas de estado do projeto
- Arquivo envolve padrões específicos de um módulo existente sem contexto completo
Nesses casos: Claude direto com contexto cirúrgico é mais eficiente.

## Providers e modelos

| Provider | Modelo | Usar quando |
|---|---|---|
| `openrouter` | `qwen/qwen3-coder:free` | PHP de domínio, repositórios, serviços (padrão) |
| `openrouter` | `google/gemma-4-31b-it:free` | Boilerplate simples, migrations SQL |
| `openrouter` | `openai/gpt-oss-120b:free` | Algoritmos, raciocínio pesado |
| `github` | `gpt-4o-mini` | Fallback se OpenRouter indisponível |

> Sempre usar modelos `:free` no OpenRouter (tier gratuito). Modelos sem `:free` consomem créditos.

## Execução

```bash
php /c/Users/paulo/.claude/scripts/model-router.php \
  --task draft \
  --system "PHP 8 procedural/DDD. PDO prepared statements (:param). Soft delete ativo=0. Conexão: Database::getInstance()->getConnection(). Sem frameworks. camelCase funções, PascalCase classes. LGPD: criptografarDado()/descriptografarDado() p/ CPF/email/telefone. Busca CPF: campo cpf_hash (HMAC-SHA256). Logs críticos: registrarLog()." \
  --max_tokens 8192 \
  --prompt "PROMPT_AQUI"
```

Cadeia de fallback automática: `qwen3-coder:free` → `gpt-4o-mini (GitHub)` → `claude-3-7-sonnet (Copilot)`.

## Revisar antes de aplicar

1. Prepared statements com `:param` nomeados?
2. Nenhum `DELETE FROM` onde devia ser `UPDATE ... SET ativo = 0`?
3. Conexão via `Database::getInstance()->getConnection()`?
4. Campos sensíveis passam por `criptografarDado()`?
5. Nomes revelam intenção (sem `$result`, `$data`)?
6. Regras de negócio específicas do contexto estão corretas?

Após revisão: `Write` para criar o arquivo com todas as correções.
