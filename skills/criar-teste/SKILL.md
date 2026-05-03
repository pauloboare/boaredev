---
name: criar-teste
description: Gera testes PHPUnit para um arquivo, função ou classe PHP do projeto. Use quando o usuário quiser adicionar testes a código existente, cobrir uma função nova, ou testar um módulo específico.
---

# Criar Teste PHPUnit

## Antes de gerar

1. Ler o arquivo a ser testado — entender o que cada função faz
2. Verificar `tests/` para não duplicar
3. Identificar tipo: Unit (lógica pura) ou Integration (envolve banco)

## Estrutura de arquivo

```php
<?php
namespace Tests\Unit; // ou Tests\Integration
use PHPUnit\Framework\TestCase;

class [Nome]Test extends TestCase
{
    protected function setUp(): void { /* dados, banco */ }
    protected function tearDown(): void { /* limpeza */ }

    public function test_[cenario_descritivo](): void
    {
        // Arrange / Act / Assert
    }
}
```

## Localização — espelhar estrutura do projeto

- `includes/validacoes.php` → `tests/Unit/ValidacoesTest.php`
- `domain/Foo/Entities/Bar.php` → `tests/Unit/Domain/Foo/BarTest.php`
- Testes com banco → `tests/Integration/`

## Banco de dados — sempre SQLite em memória

```php
protected function setUp(): void
{
    $pdo = new \PDO('sqlite::memory:');
    $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
    \Core\Database\Connection::setInstance($pdo);
    \Core\Database\Connection::getInstance()->exec("CREATE TABLE ...");
}
protected function tearDown(): void { \Core\Database\Connection::reset(); }
```

## O que testar / não testar

**TESTAR:** validações (válido e inválido), formatações, lógica de domínio, helpers, edge cases (null, vazio, mínimo/máximo)

**NÃO TESTAR:** HTML/output, `header()`, bootstrap da app, funções que só delegam

## Convenções de nome

`test_[funcao]_[cenario]` — ex: `test_validarCPF_com_cpf_valido`, `test_buscar_retorna_null_quando_nao_encontrado`

## Rodar

```bash
cd D:/xampp/htdocs/[projeto] && composer test
# ou: ./vendor/bin/phpunit tests/Unit/ValidacoesTest.php
```
