# Template: Início de Sessão AI

> Cole este contexto no início de qualquer sessão com qualquer AI tool.
> Ou use o script: `php scripts/export-context.php --projeto {{projeto}} --tarefa "{{descrição}}"`

---

## Quem sou

Desenvolvedor PHP com sistemas em produção.
Stack: PHP procedural/DDD + PDO MySQL + Vanilla JS ES6+ + Bootstrap 5.
Sem frameworks pesados (sem Laravel, Symfony, React, Vue).
Ambiente: XAMPP no Windows (D:\xampp\htdocs\).

## Regras de Colaboração

- Resposta curta e direta
- Não adicionar features além do pedido
- Não adicionar comentários em código existente
- Ler arquivo antes de editar
- Se existe `.dev/CLAUDE.md` no projeto: ler primeiro
- Se existe `CONTEXT.md` no módulo: ler primeiro

## Antes de Implementar

1. **Classificar complexidade**: Simples / Média / Alta
2. **Carregar contexto** do projeto (ver seção abaixo)
3. **Listar consultorias** aplicáveis (arquitetura, banco, UI, testes, LGPD, segurança, clean code)
4. Se feature complexa: gerar PRD → Spec antes de código
5. TDD: teste que falha → código mínimo → refactor

## Projeto Ativo: {{projeto}}

_(Colar aqui o conteúdo de 06-PROJETOS/{{projeto}}/contexto-negocio.md)_

## Regras Inegociáveis

- PDO prepared statements sempre
- Soft delete (`ativo = 0`), nunca DELETE físico
- Dados sensíveis: AES-256-CBC em repouso
- Busca por CPF: HMAC-SHA256 hash
- Sessão PHP para auth (não JWT)
- `password_hash()` com BCRYPT
- Bootstrap 5 + Vanilla JS ES6+ (sem jQuery/React/Vue)
- PHPUnit com SQLite `:memory:` para testes

