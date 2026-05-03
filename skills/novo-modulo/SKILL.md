---
name: novo-modulo
description: Adiciona um módulo completo (listar/cadastrar/editar/excluir) a um projeto PHP existente seguindo os padrões estabelecidos. Use quando o usuário quiser criar um novo CRUD, tela, funcionalidade ou seção em um sistema existente.
---

# Novo Módulo PHP

Criar CRUD completo do modulo seguindo padrao do projeto.

## Antes de codar

1. Ler `.dev/CLAUDE.md`
2. Ler `.dev/AI_RULES.md` (se existir)
3. Coletar: modulo, nome display, tabela, campos, permissoes, relacoes

## Arquivos obrigatorios

- `modulos/[modulo]/CONTEXT.md`
- `modulos/[modulo]/listar.php`
- `modulos/[modulo]/cadastrar.php`
- `modulos/[modulo]/editar.php`
- `modulos/[modulo]/excluir.php`
- `modulos/[modulo]/_form.php` (quando formulario for compartilhado)

## Regras tecnicas

- `exigirPermissao('[modulo]', '[acao]')` em todas as telas
- SELECT sempre filtra `ativo = 1`
- Exclusao sempre via soft delete (nunca DELETE fisico)
- `registrarLog()` em criar/editar/excluir
- Redirect com flash apos sucesso/erro

## SQL minimo da tabela

```sql
CREATE TABLE [tabela] (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- campos do modulo
    ativo TINYINT NOT NULL DEFAULT 1,
    criado_em DATETIME NOT NULL,
    atualizado_em DATETIME NULL,
    INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Fechamento

- Atualizar `includes/permissions.php`
- Criar `tests/Unit/[Modulo]Test.php` para validacoes/regras
