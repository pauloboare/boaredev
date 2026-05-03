# Model Switching Inteligente — Haiku / Sonnet / Opus

**Objetivo**: Usar modelo **mais econômico adequado** por tarefa, não por sessão. Pode usar múltiplos modelos na mesma conversa.

## Princípio

Claude Code força escolha **antes de iniciar sessão** (via flag `--model`). Solução: **classificar na sessão anterior** (skill [[modelo]]) e iniciar com o modelo certo.

## Matriz de Decisão

### Simples (~10-20 min, Haiku)
```
✅ Edit pontual, rename, CSS, label, campo form
✅ Fix trivial, typo, revert
✅ 1 arquivo, <50 linhas modificadas
✅ Custo: ~0.10 USD / sessão
```
**Comando**: `claude --model claude-haiku-4-5-20251001`

### Média (~30-60 min, Sonnet — PADRÃO)
```
✅ Função/método nova, query SQL com join
✅ Novo endpoint API, teste unitário
✅ Novo módulo CRUD pequeno
✅ Debugging com contexto moderado
✅ 2-5 arquivos, mudanças conectadas
✅ Custo: ~1.50 USD / sessão
```
**Comando**: `claude` (padrão — sem flag)

### Alta (~60+ min, Opus)
```
✅ Arquitetura de domínio, design de camadas
✅ Debugging cross-módulo complexo
✅ Refactor estratégico, mudanças críticas
✅ Serviço novo com regras de negócio
✅ Análise de impacto em múltiplos módulos
✅ Custo: ~6-10 USD / sessão (reserve para tarefas críticas)
```
**Comando**: `claude --model claude-opus-4-6`

## Como Usar

### Antes de cada sessão

1. **Ler o pedido do usuário**
2. **Usar skill [[modelo]]**: classifica Simples/Média/Alta
3. **Claude Code responde**:
   ```
   Simples. Use: claude --model claude-haiku-4-5-20251001
   ```
4. **Novo terminal**:
   ```bash
   claude --model claude-haiku-4-5-20251001
   ```
5. **Nova sessão começa**

### Mid-session? 

Se sessão é longa e mudou de contexto:
```
/compact → volta para main
(main fecha com resultados)
nova sessão com modelo correto para próxima parte
```

## Exemplo Real

```
Usuário: "Cria módulo de relatórios de agendamentos"

[Claude vê tarefa]
→ Precisa de modelo? SIM (incerto)
→ Usa skill modelo
→ Retorna: "Média. Use: claude"

[Usuário abre nova sessão]
$ claude
[novo contexto, novo modelo]
```

## Calibração por Histórico

### Se sessão passou 60+ min
- [ ] Complexidade aumentou?
- [ ] Mudou de domínio (mobile → backend)?
- [ ] Precisa raciocínio profundo agora?
→ Se SIM: `/compact` + nova sessão Opus

### Se sessão tem 3-5 edits simples
→ Cancelar Opus, usar Haiku próxima vez

### Se Sonnet ficou perto do timeout
→ Próxima: começar com Opus

## Integração com Skills

- **[[modelo]]**: classifica antes de sessão
- **[[gpt-draft]]**: usa Copilot free (economiza tokens)
- **[[gemini-explore]]**: usa Gemini (economiza tokens)

## Custo Comparativo (por sessão típica)

| Modelo | Taxa | Sessão 20min | Sessão 60min | Sessão 120min |
|--------|------|--------------|--------------|---------------|
| Haiku | 0.80/MTok | ~$0.10 | ~$0.30 | ~$0.60 |
| Sonnet | 3.00/MTok | ~$0.40 | ~$1.50 | ~$3.00 |
| Opus | 15.00/MTok | ~$2.00 | ~$7.50 | ~$15.00 |

**Ganho**: Usar sempre Sonnet = ~3x mais caro que usar modelo right-sized.

## Histórico

- **2026-04**: Formalizado smart switching (antes era somente recomendação em SKILL)
- **2026-02**: Opus 4.6 adicionado à matriz
- **2025-08**: Sonnet 4.6 como padrão

---

## Fallback

Se não conseguir iniciar com flag (alguma UI não suporte):
- Usar Sonnet (padrão seguro)
- Compilar custo esperado
- Next session com model correto
