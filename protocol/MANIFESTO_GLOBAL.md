# MANIFESTO GLOBAL

**Fonte única**: Obsidian DevProtocol. Todas tools apontam aqui.

## Princípios Inegociáveis

1. **Modo Caveman** (ver [[modo-caveman]]): Essencial only, sem jargão, output curto
2. **Prioridade**: Global → Tool-specific → Local → Fallback
3. **Objetivo**: Paridade Claude/Codex/Copilot/Gemini, **baixo custo**
4. **Loading**: MANIFESTO + modo-caveman sempre; snippets só por gatilho

## Fluxo de Tarefa

- **Antes de qualquer código**: Skill [[modelo]] (classifica Simples/Média/Alta)
- **Model selection**: Ver [[model-switching-inteligente]] (Haiku/Sonnet/Opus)
- **Hierarquia de skills**: Ver [[SKILL-INDEX]]
- **Standard flow**: Modelo → Arquiteto → Code → Revisar-padrão → Commit

## Quick Start — Novo Projeto

1. `pre-voo-tipo-projeto.md` (mobile vs web vs api)
2. `pre-voo-stack-database.md` (qual BD?)
3. Fluxo: **pré-voo** → PRD → Spec → TDD → deploy

## Quick Start — Feature Existente

1. Skill [[modelo]] (classifica complexidade)
2. Ver [[SKILL-INDEX]] (qual skill usar?)
3. Execute flow: Arquiteto → Code → QA → Commit

## Economia de Tokens

- ✅ [[gpt-draft]]: Boilerplate via Copilot free (não Claude)
- ✅ [[gemini-explore]]: Exploração via Gemini (não Claude)
- ✅ [[model-switching-inteligente]]: Usar Haiku para trivial, economiza 3x
- ✅ [[modo-caveman]]: Output curto = menos tokens

**Ganho esperado**: 40-50% redução tokens com skill + model switching.

## Tools & Configuração

| Tool | Location | Quick Start |
|------|----------|-----------|
| Claude | `05-TOOLS/CLAUDE/README.md` | Model selection + Skills |
| Copilot | `05-TOOLS/COPILOT/README.md` | Free models (`gpt-4o-mini`) |
| Gemini | `05-TOOLS/GEMINI/README.md` | CLI + Explore skill |
| Codex | `05-TOOLS/CODEX/README.md` | Deprecated → migrate Claude/Copilot |

## Padrões & Referência

- **Arquitetura**: `01-PADROES/` (por-stack, horizontal, por-tipo-projeto)
- **LGPD/Segurança**: `01-PADROES/horizontal/`
- **Projetos ativos**: `06-PROJETOS/` (cada subpasta contém o contexto interno de um projeto)
- **Templates**: `03-TEMPLATES/`

---

**Atualizado**: 2026-04-21 (modo-caveman, model-switching, 05-TOOLS estrutura)

