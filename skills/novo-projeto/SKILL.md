---
name: novo-projeto
description: Bootstrap de novo projeto PHP a partir do template padrão em D:\xampp\htdocs\_starter. Use quando o usuário quiser criar um novo projeto, iniciar um sistema, ou configurar a estrutura base de uma nova aplicação PHP.
---

# Novo Projeto PHP

Criar projeto novo a partir do template `_starter`.

## Coletar

- nome do projeto
- nome display
- caminho destino (padrao `D:\xampp\htdocs\[nome]`)
- nome do banco
- proposito curto para `.dev/CLAUDE.md`

## Execucao

```bash
cp -r "D:/xampp/htdocs/_starter/." "D:/xampp/htdocs/[NOME]/"
cd "D:/xampp/htdocs/[NOME]"
composer install
```

## Ajustes obrigatorios

- `.env` (APP_NAME, SESSION_NAME, DB_*)
- `.dev/CLAUDE.md` (nome + proposito)
- `modulos/dashboard.php` (ROOT_URL)
- `composer.json` (`name`)

## SQL inicial

Gerar DB + tabelas base `log` e `usuario` com utf8mb4.

## Validacao final

- confirmar estrutura criada
- informar proximos comandos: `/novo-modulo`, `/revisar-padrao`, `composer test`
