# Fluxo Novo Projeto: Pré-voo → PRD → Spec → Código

## 0. PRÉ-VÔO: Classificação de Tipo de Projeto
**SEMPRE primeiro.** Responda: é mobile? web? ambos? API pura?  
Isso define **tudo** (stack, padrões, offline-first, etc).

Referência: `pre-voo-tipo-projeto.md`

Resultado: decisão arquitetural clara + stack recomendado

## PRD — `docs/prd_[nome].md`
Objetivo | personas | regras de negócio (numeradas) | critérios de aceite | restrições | impacto LGPD
Gatilho: "Não escreva código ainda. Gere o plano."
Bloqueio: sem código antes da aprovação.

## Spec tático — `docs/spec_[nome].md`
Arquivos a criar/modificar | DDL | plano de testes + edge cases | dependências | ordem de implementação
Bloqueio: sem código antes da aprovação.

## Sessão limpa
/clear após aprovação → carregar só spec + contexto do projeto → TDD.

## TDD
Red (teste falha) → Green (mínimo) → Refactor → repetir.

Não usar: bug simples, ajuste de campo, refatoração local (1-2 arquivos), tarefa Simples.
