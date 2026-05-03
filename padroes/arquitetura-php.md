# Padrão de Arquitetura PHP

## Estrutura de Projeto

```
projeto/
├── config/          # database.php, app.php, autoload.php
├── core/            # Database (Singleton PDO), Auth/Guard, Request/Response
├── domain/          # Entidades, Repositórios por domínio (DDD light)
├── modulos/         # Feature-based: listar/cadastrar/editar/excluir + CONTEXT.md
├── includes/        # helpers.php, validacoes.php, permissions.php, components/
├── api/             # REST endpoints (arquivo por endpoint)
├── ajax/            # Endpoints AJAX específicos
├── assets/          # css/, js/, images/
├── tests/           # PHPUnit — espelha estrutura do projeto
├── .dev/            # Contexto para IA: CLAUDE.md, AI_RULES.md, ARCH.md
└── .env             # Secrets — nunca no código
```

## Separação de Responsabilidades

```
[Módulo PHP]          → View + Controller mínimo (recebe request, chama serviço, renderiza)
       ↓
[Serviço de Domínio]  → Lógica de negócio (validação, regras, orquestração)
       ↓
[Repositório]         → Acesso a dados (queries, CRUD, cache)
       ↓
[Database]            → PDO Singleton com prepared statements
```

### Regras
- Repositórios **não contêm** lógica de negócio
- Serviços **não acessam** banco diretamente
- Dependências apontam **para dentro**: módulos → domínio → (sem infraestrutura)
- O domínio **não sabe** qual banco está em uso

## Convenções de Nomes

- Variáveis: `$agendamentosConfirmados` (não `$result`, `$data`, `$temp`)
- Funções: `cancelarPorNoShow()` (não `updateStatus()`)
- Se o nome precisa de "e": separar em duas funções
- Arquivo = 1 responsabilidade clara

## Módulos (Feature-Based)

Cada módulo em `modulos/` contém:
```
modulos/pacientes/
├── listar.php        # Lista com filtros e paginação
├── cadastrar.php     # Formulário + processamento
├── editar.php        # Edição com carregamento de dados
├── excluir.php       # Soft delete com confirmação
└── CONTEXT.md        # Contexto de domínio para AI
```

## Acesso a Dados

```php
// Singleton
$db = Connection::getInstance();

// SEMPRE prepared statements com placeholders nomeados
$stmt = $db->prepare("SELECT * FROM pacientes WHERE id = :id AND ativo = 1");
$stmt->execute([':id' => $id]);
```

## Regra de Implementação

- Módulo: recebe request, chama serviço, renderiza resposta
- Serviço: valida regras e orquestra o fluxo
- Repositório: executa query/hidratação sem regra de negócio
