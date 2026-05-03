# Skills — Hierarquia & Trigger Rules

**Prioridade de uso**: Segue ordem abaixo. Use a primeira que se aplique; não combine sem necessidade.

---

## 🔴 BLOQUEANTE: Classificação (SEMPRE primeiro)

Se tarefa é **ambígua ou tem escopo incerto**, usar antes de qualquer coisa:

### [[modelo]]
**Classifica complexidade** (Simples/Média/Alta) → recomenda qual modelo Claude usar (Haiku/Sonnet/Opus)
- ✅ Quando: "não sei se é simples ou complexo"
- ✅ Quando: "qual modelo vou usar?"
- ❌ Quando: tarefa já classificada ou óbvia

---

## 🟠 PRÉ-IMPLEMENTAÇÃO: Design & Strategy

Use **antes de qualquer código** em tarefas não-triviais:

### [[arquiteto]]
**Design de camadas e responsabilidades** — limites de domínio, estrutura de módulos, flow de dados
- ✅ Quando: nova feature complexa (domínio)
- ✅ Quando: refactor arquitetural
- ✅ Quando: integração cross-módulo
- ❌ Quando: bug fix simples ou edit pontual

### [[qa]]
**Strategy de testes** — o que testar, quais edge cases, cobertura
- ✅ Quando: feature nova vai ter testes
- ✅ Quando: "qual é a strategy de test?"
- ❌ Quando: tarefa tem 0 testes (padrão: sem testes se trivial)

---

## 🟡 EXECUTIVO: Boilerplate & Code Generation

Use para gerar código novo em massa:

### [[gpt-draft]]
**Gera boilerplate PHP novo** (50+ linhas) — classe, entidade de domínio, migration SQL, repositório
- ✅ Quando: precisa arquivo PHP novo com 50+ linhas
- ✅ Quando: "me faz um boilerplate de..."
- ❌ Quando: arquivo <50 linhas
- ❌ Quando: edição em arquivo existente
- 🔗 Economiza tokens Claude usando GPT-4o-mini ou GitHub Copilot free

### [[novo-modulo]]
**Cria CRUD completo** (listar/cadastrar/editar/excluir) — estrutura full + testes + migração
- ✅ Quando: novo módulo inteiro (Model + Controller + Views + Tests + Migration)
- ✅ Quando: "me adiciona um módulo de X"
- ❌ Quando: só precisa de função/método
- 🔗 Usa novo-projeto como base

### [[novo-projeto]]
**Bootstrap de novo projeto** — setup inicial, estrutura padrão, config, BD
- ✅ Quando: novo projeto do zero
- ✅ Quando: "quero começar projeto novo de X"
- ❌ Quando: adicionando a projeto existente

### [[criar-teste]]
**Gera testes PHPUnit** — unit tests, casos de cobertura, assertions
- ✅ Quando: "escreve teste para função X"
- ✅ Quando: feature nova sem testes
- ❌ Quando: teste já existe

---

## 🟢 EXPLORAÇÃO: Pesquisa & Contexto

### [[gemini-explore]]
**Lê múltiplos arquivos em paralelo** — 3+ arquivos, módulo desconhecido, mapear dependências
- ✅ Quando: precisar ler 3+ arquivos para contexto
- ✅ Quando: módulo novo, desconhecido
- ✅ Quando: carregar arquivo de padrão (arquitetura-php.md, etc)
- ❌ Quando: arquivo único (use Read direto)
- ❌ Quando: tarefa trivial
- ❌ Quando: arquivo já lido na sessão
- 🔗 **Fallback se Gemini falhar**: usar Claude Read (mais tokens, mas 100% confiável)

---

## 🔵 CODE REVIEW: Quality Gates

Use **APÓS implementar, ANTES de commit**:

### [[revisar-padrao]]
**QA contra padrões** — segurança, banco, reaproveitamento, testes, LGPD
- ✅ Quando: "revisa código contra padrões?"
- ✅ Quando: antes de git commit
- ❌ Quando: durante implementação (foco vs review)

### [[cleancode]]
**Clean Code PHP** — legibilidade, nomes, funções grandes, duplicação, complexidade
- ✅ Quando: código "funciona mas incomoda"
- ✅ Quando: depois de feature implementada
- ❌ Quando: durante desenvolvimento

### [[dba]]
**Database expert** — schema, indexes, queries lentas, migrations, modelo LGPD
- ✅ Quando: "como otimizo essa query?"
- ✅ Quando: design de schema novo
- ❌ Quando: prepared statements básicos (já é padrão)

### [[lgpd]]
**Conformidade LGPD** — direitos do titular, consentimento, armazenamento, direito ao esquecimento
- ✅ Quando: "é LGPD compliant?"
- ✅ Quando: dados sensíveis envolvidos
- ❌ Quando: dados públicos/não-sensíveis

### [[seguranca]]
**Cibersegurança web** — vulnerabilidades, autenticação, gestão de sessão, hardening
- ✅ Quando: "tem vuln?"
- ✅ Quando: feature de autenticação/autorização
- ❌ Quando: review técnico genérico (use revisar-padrao)

---

## 🟣 ESPECIALISTA POR DOMÍNIO

Consultor específico — design, dados, UX:

### [[uxdesign]]
**UI/UX em Bootstrap 5 + Vanilla JS** — layouts, fluxo de telas, acessibilidade, design
- ✅ Quando: "está bom esse layout?"
- ✅ Quando: redesign de tela

### [[analista-dados]]
**Relatórios & KPIs** — desenhar relatório, definir métricas, otimizar queries, estruturar para gráficos
- ✅ Quando: "qual dashboard preciso?"
- ✅ Quando: "como meço isso?"

---

## ⚫ META: Skill Creator

### [[skill-creator]]
**Cria/melhora skills** — new skills, evals, benchmark, otimização de descrição
- ✅ Quando: "cria skill nova de X"
- ✅ Quando: skill não funciona bem (refactor)

---

## ⚪ Como NÃO Usar

| Situação | Ação |
|----------|------|
| Tarefa trivial (typo, rename, 1-liner) | Direto — sem skill |
| Arquivo único <100 linhas | Read tool direto |
| "Qual design?" sem contexto | AskUserQuestion antes de arquiteto |
| "Revisa tudo" | revisar-padrao DEPOIS de código pronto |
| Incerteza de timing | Use modo caveman (pergunte se incerto) |

---

## 🎯 Exemplo de Fluxo Correto

```
1. Usuário: "Cria módulo de relatórios de agendamentos"
   → skill modelo (classif?) → "Média"
   → não precisa arquiteto (novo-modulo tem template)
   
2. Usuário: "Implementa recorrência em agendamentos"
   → skill modelo → "Alta"
   → skill arquiteto (design de domínio)
   → skill novo-modulo (cria schema + entidade)
   → skill qa (test strategy)
   → code
   → skill revisar-padrao (QA)
   → git commit
```

---

## Histórico
- **Criado**: 2026-04-21
- **Motivo**: Clareza hierárquica + menos erros de timing
- **Review**: Anual
