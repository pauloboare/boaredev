# Padrão de Testes (PHPUnit)

## Escopo de Testes

### O que testar
- Lógica de domínio (serviços, entidades)
- Helpers e funções utilitárias
- Validações (CPF, CNPJ, email, CEP, telefone)
- Repositórios (queries, CRUD)
- Edge cases e regras de negócio

### O que NÃO testar
- HTML/output direto — testar lógica e retornos
- Framework/libs externas
- Getters/setters triviais

## Estrutura

```
tests/
├── Domain/
│   ├── Paciente/
│   │   ├── PacienteServiceTest.php
│   │   └── PacienteRepositoryTest.php
│   └── Agendamento/
│       ├── AgendamentoServiceTest.php
│       └── AgendamentoRepositoryTest.php
├── Includes/
│   ├── HelpersTest.php
│   └── ValidacoesTest.php
└── bootstrap.php
```

Espelhar a estrutura do projeto.

## Banco de Dados em Testes

- SQLite em memória (`:memory:`) para isolamento
- Cada teste cria e destrói suas tabelas
- Fixtures mínimas — só o necessário para o caso

```php
protected function setUp(): void
{
    $this->pdo = new PDO('sqlite::memory:');
    $this->pdo->exec("CREATE TABLE pacientes (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        cpf_hash TEXT,
        ativo INTEGER DEFAULT 1
    )");
}
```

## Ciclo TDD

1. **Red**: Escrever teste que falha descrevendo o comportamento esperado
2. **Green**: Código mínimo para o teste passar
3. **Refactor**: Limpar sem quebrar testes
4. Repetir

**Ordem**: teste ANTES do código de produção — obrigatório para feature nova, regra de negócio e correção com risco de regressão. Ajuste trivial (CSS, rename, campo simples): validação estreita é suficiente.

## Convenções

- Nomes de teste descrevem comportamento: `testDeveRetornarErroCpfInvalido()`
- Preferir um assert principal por teste
- Arrange-Act-Assert como estrutura interna
- Testes independentes entre si (sem dependência de ordem)
