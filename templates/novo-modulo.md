# Template: Novo Módulo

## Checklist Pré-Implementação

- [ ] Módulo definido em [[06-PROJETOS/{{projeto}}/contexto-negocio|contexto do projeto]]
- [ ] Entidades mapeadas em [[06-PROJETOS/{{projeto}}/entidades-dominio|entidades]]
- [ ] Schema SQL pronto (tabela + indexes + FK)
- [ ] CONTEXT.md criado no diretório do módulo
- [ ] Testes planejados (casos + edge cases)

## Estrutura Padrão

```
modulos/{{modulo}}/
├── listar.php        # Lista com filtros e paginação
├── cadastrar.php     # Formulário + processamento POST
├── editar.php        # Carrega dados + formulário + processamento POST
├── excluir.php       # Soft delete com confirmação
└── CONTEXT.md        # Contexto de domínio para AI
```

## Camadas

```
modulos/{{modulo}}/listar.php     → View + Controller mínimo
domain/{{Entidade}}/Service.php   → Lógica de negócio
domain/{{Entidade}}/Repository.php → Acesso a dados
```

## CONTEXT.md do Módulo

```markdown
# {{Modulo}} — Contexto

## Responsabilidade
{{O que este módulo faz}}

## Entidades
{{Entidades envolvidas e seus campos}}

## Regras de Negócio
{{Lista numerada de regras}}

## Dependências
{{Outros módulos que este consome ou que consomem este}}

## Permissões
{{Quem pode fazer o quê}}
```

## Testes Obrigatórios

- [ ] Service: regras de negócio (happy path + edge cases)
- [ ] Repository: CRUD com SQLite `:memory:`
- [ ] Validações específicas do módulo

