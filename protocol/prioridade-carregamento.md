# Prioridade de Carregamento — Session Hook

**Objetivo**: Cada sessão carrega config na ordem certa, rápido e eficiente.

## Ordem Obrigatória

### Tier 0 — SEMPRE (automático via hook)
1. **MANIFESTO_GLOBAL.md** — princípios, fluxo, economia
2. **modo-caveman.md** — output curto, disciplina radical
3. **model-switching-inteligente.md** — qual modelo usar

**Por quê?** Definem como tudo funciona. Sem isso, tudo falha.

### Tier 1 — Por Gatilho
Carregado automaticamente se session context detecta:

- **skill recomendada** → `SKILL-INDEX.md` (qual skill usar)
- **novo projeto** → `pre-voo-tipo-projeto.md` + `pre-voo-stack-database.md`
- **projeto existente** → `.dev/CLAUDE.md` do projeto (projeto-específico)
- **Gemini usado** → `05-TOOLS/GEMINI/cli-troubleshooting.md`
- **Code review** → `01-PADROES/` (relevante)

### Tier 2 — On-Demand
Usuário referencia explicitamente:

```
"Vê arquitetura-php.md" → carrega
"Que padrão de teste?" → carrega testes-phpunit.md
"Revisa LGPD" → carrega seguranca-lgpd.md
```

## Como Implementar (Hook)

### `.claude/settings.json` (projeto local) ou `~/.claude/settings.json` (global)

```json
{
  "hooks": {
    "sessionStart": [
      {
        "description": "Load DevProtocol tier 0",
        "command": "scripts/load-protocol-tier0.php",
        "args": ["--mode caveman"]
      }
    ]
  }
}
```

### Script exemplo: `scripts/load-protocol-tier0.php`

```php
<?php
$obsidian = 'D:\\Obsidian\\DevProtocol';

$tier0 = [
    'MANIFESTO_GLOBAL.md',
    'modo-caveman.md',
    'model-switching-inteligente.md',
];

foreach ($tier0 as $file) {
    $path = "$obsidian/00-PROTOCOLO/$file";
    if (file_exists($path)) {
        echo "\n" . file_get_contents($path);
    }
}
?>
```

## Resultado: Sessão Carrega Assim

```
[Claude Code iniciado]
✅ MANIFESTO carregado
✅ Modo caveman ativo
✅ Model switching: ready
✅ Pronto para classifier/arquiteto/code

[Usuário fala de novo projeto]
🔗 Hook detecta "novo" → carrega pre-voo-tipo + pre-voo-stack

[Usuário usa skill gpt-draft]
🔗 Hook detecta gpt-draft → carrega skill + Copilot instruction

[Sessão ativa]
[Sem carregamento adicional — tudo sob-demanda]
```

## Trade-offs

| Abordagem | Benefício | Custo |
|-----------|-----------|-------|
| **Tier 0 sempre** | Consistência garantida | 0.5 segundos session start |
| **Carregamento lazy** | Mais rápido se não usar feature | Overhead quando necesário |
| **Proposto (híbrido)** | Tier 0 rápido + lazy pra features | Implementação hook moderada |

---

## Verificação

```bash
# Testar que hook carregou tudo
claude -v  # Vê se modo caveman está ativo

# Verificar hook config
cat ~/.claude/settings.json | grep sessionStart
```

---

**Histórico**:
- 2026-04: Formalizado 3-tier loading (antes era undefined)
- Próximo: Automação de hook em todos os projects
