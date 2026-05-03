# Template: Spec Tático

## Informações Gerais

- **Feature**: {{nome_feature}}
- **PRD**: `docs/prd_{{nome}}.md`
- **Data**: {{data}}
- **Complexidade**: Alta

## Inventário de Arquivos

### Criar
| Arquivo | Responsabilidade |
|---------|-----------------|
| `domain/{{Entidade}}/{{Entidade}}Service.php` | Lógica de negócio |
| `domain/{{Entidade}}/{{Entidade}}Repository.php` | Acesso a dados |
| `modulos/{{modulo}}/listar.php` | View — listagem |
| `modulos/{{modulo}}/cadastrar.php` | View — formulário |
| `modulos/{{modulo}}/editar.php` | View — edição |
| `modulos/{{modulo}}/excluir.php` | Soft delete |
| `tests/Domain/{{Entidade}}/{{Entidade}}ServiceTest.php` | Testes do serviço |
| `tests/Domain/{{Entidade}}/{{Entidade}}RepositoryTest.php` | Testes do repo |

### Modificar
| Arquivo | Mudança |
|---------|---------|
| `includes/permissions.php` | Adicionar permissões do módulo |
| `sql/` | Migration com DDL |

## Estrutura de Banco

```sql
CREATE TABLE {{tabela}} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- campos do domínio
    ativo TINYINT(1) DEFAULT 1,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Plano de Testes

### Unitários
| Caso | Input | Expected |
|------|-------|----------|
| {{caso_1}} | {{input}} | {{resultado}} |

### Edge Cases
| Caso | Cenário |
|------|---------|
| {{edge_1}} | {{descrição}} |

## Dependências

| De | Para | Tipo |
|----|------|------|
| {{modulo}} | {{outro}} | Consulta |

## Ordem de Implementação

1. Migration SQL
2. Repository (Red → Green)
3. Service (Red → Green)
4. Views (listar → cadastrar → editar → excluir)
5. Permissões
6. Refactor + revisão
