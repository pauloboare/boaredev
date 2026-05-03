---
name: modelo
description: Classifica a complexidade da tarefa descrita e recomenda qual modelo Claude usar (Haiku/Sonnet/Opus) para iniciar a sessão com o modelo mais econômico adequado.
---

# Modelo — Roteamento inteligente entre Haiku / Sonnet / Opus

Claude Code não troca de modelo mid-session. O modelo deve ser escolhido **antes de iniciar a sessão**,
via flag `--model` no terminal.

## Tabela de roteamento

| Complexidade | Tarefas típicas | Modelo | Comando de início |
|---|---|---|---|
| **Simples** | Edit pontual, rename, mover código, alterar texto/label, adicionar campo de formulário, fix de CSS, ajuste de query trivial | Haiku | `claude --model claude-haiku-4-5-20251001` |
| **Média** | Implementar função/método, novo módulo CRUD, query SQL com joins, bug fix com contexto, novo endpoint API, escrever testes unitários | Sonnet | (padrão — não precisa flag) |
| **Alta** | Arquitetura de domínio, debugging complexo em múltiplos arquivos, refactoring estratégico, novo serviço de domínio com regras de negócio, análise de impacto cross-módulo | Opus | `claude --model claude-opus-4-6` |

## Como usar esta skill

Quando invocada com a descrição da tarefa, responda com:

1. **Classificação**: Simples / Média / Alta — e por quê (1 linha)
2. **Modelo recomendado**: nome do modelo
3. **Comando exato** para iniciar a próxima sessão (ou "use a sessão atual" se Sonnet)

## Exemplos de classificação

| Tarefa | Classificação | Modelo |
|---|---|---|
| "Mudar o texto do botão de Salvar para Confirmar" | Simples | Haiku |
| "Adicionar campo observacao no formulário de agendamento" | Simples | Haiku |
| "Corrigir o CSS do modal no mobile" | Simples | Haiku |
| "Implementar o método cancelarPorNoShow no AgendamentoService" | Média | Sonnet |
| "Criar o módulo de relatórios de agendamentos" | Média | Sonnet |
| "Escrever testes para CalculadorDeSlots" | Média | Sonnet |
| "Redesenhar a camada de domínio de Agenda para suportar recorrência" | Alta | Opus |
| "Depurar por que slots não aparecem para certos profissionais" | Alta | Opus |
| "Definir arquitetura do módulo de notificações com múltiplos canais" | Alta | Opus |

## Nota sobre custo

- **Haiku**: ~20x mais barato que Opus. Ideal para sessões de 1-3 edits pontuais.
- **Sonnet**: Equilíbrio padrão. Cobre 80% dos casos de desenvolvimento.
- **Opus**: Reserve para sessões onde a qualidade do raciocínio importa mais que o custo.
