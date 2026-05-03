---
name: gemini-explore
description: "Explora arquivos com Gemini CLI, economizando tokens do Claude. TRIGGER when: precisar ler ou entender 3+ arquivos (PHP ou .md); explorar módulo desconhecido antes de implementar; carregar CONTEXT.md de módulo específico; mapear dependências; carregar arquivos de padrões do DevProtocol (arquitetura-php.md, testes-phpunit.md, etc.) quando não estão no contexto. Usar ANTES do Read tool em múltiplos arquivos. SKIP: arquivo único já lido na sessão; protocol files já injetados pelo hook de sessão (contexto-negocio, entidades-dominio, regras-universais); tarefa trivial (CSS, typo, rename)."
---

# Gemini Explore

Use Gemini para leitura massiva e traga ao Claude so resumo curto.

## Regra

- Se precisa ler 3+ arquivos, usar Gemini antes de Read tool.
- Se for arquivo unico, tarefa trivial ou arquivo ja lido, pular esta skill.

## Comando padrão

Se explorando módulo específico (caminho contém `modulos/`), usar cache:
```bash
php ~/.claude/scripts/explore-cached.php --module [nome] --cwd [raiz-do-projeto] --prompt "Resumo PT-BR em bullets (max 10 linhas): propósito, funções públicas, dependências, regras de negócio."
```

Para arquivos avulsos (não módulo), usar direto:
```bash
gemini --yolo --model gemini-2.5-flash -p "@D:/caminho/arquivo.php Resumo PT-BR em bullets (max 10 linhas): propósito, funções públicas, dependências, regras de negócio."
```

Invalidar cache manualmente se módulo mudou estruturalmente:
```bash
php ~/.claude/scripts/explore-cached.php --invalidate --module [nome] --cwd [raiz-do-projeto]
```

## Fluxo

1. Listar arquivos (Glob/Bash)
2. Filtrar os relevantes
3. Rodar Gemini em cada arquivo relevante
4. Consolidar contexto curto para implementar

## Fallback

Se Gemini falhar (quota/rede/CLI), usar `model-router.php --task exploration` com o conteudo do arquivo.

## Formato de saida consolidada

```text
Contexto do modulo: [nome]
[arquivo] proposito em 1 linha
- funcoes:
- dependencias:
- regras:
Padroes identificados:
Ponto de atencao:
```

## Limites

- `analyzeFile` do MCP Gemini nao cobre PHP
- Arquivo muito grande: dividir em 2 chamadas
- Edicao continua no fluxo normal (Read + Edit)
