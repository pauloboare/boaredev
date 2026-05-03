# Checklist Pré-Implementação

## 1. Complexidade
Simples (Haiku): edit pontual, CSS, rename, texto
Média (Sonnet): CRUD, função, query, bug, endpoint
Alta (Opus): arch, 5+ arquivos, debug sem causa, refactor estratégico, novo módulo completo
Alta → avisar antes de continuar.

## 2. Contexto
Módulo específico → `/gemini-explore` carrega `modulos/[modulo]/CONTEXT.md`
Projeto → `.dev/CLAUDE.md`

## 3. Skills aplicáveis
/gemini-explore (codebase) | /arquiteto (arch) | /dba (banco) | /uxdesign (UI)
/qa (testes) | /analista-dados (relatórios) | /lgpd | /seguranca | /cleancode
Omitir se tarefa trivial.

## 4. Abordagem
2+ módulos ou regra não trivial → PRD primeiro → Spec → aprovação → código

## 5. Economia (obrigatório)
3+ arquivos PHP → `/gemini-explore` antes do Read
Arquivo PHP novo 50+ linhas → `/gpt-draft` antes do Write

## 6. Código
TDD obrigatório: feature nova com regra de negócio, correção com risco de regressão, mudança de comportamento de domínio.
TDD opcional: ajuste trivial, CSS, rename, campo simples → validação estreita é suficiente.
Ciclo: Red (teste falha) → Green (mínimo) → Refactor
Verificar segurança + LGPD após Green.
