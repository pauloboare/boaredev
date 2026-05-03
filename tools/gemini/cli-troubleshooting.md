# Gemini CLI — Setup & Troubleshooting

## Setup Rápido (Windows)

```bash
# 1. Instalar CLI
npm install -g @google/generative-ai-cli

# 2. Pegar API key
# → aistudio.google.com/app/apikey
# → Criar nova key (free tier)

# 3. Configurar variável de ambiente
$env:GEMINI_API_KEY = "sua_chave_aqui"
# Persistente: https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables

# 4. Testar
gemini --model gemini-2.5-flash -p "oi"
```

## Como Usar (CLI)

### Um arquivo
```bash
gemini --model gemini-2.5-flash -p "@D:\path\file.php Resumo: propósito, funções, regras."
```

### Múltiplos arquivos (um por um)
```bash
for file in (Get-ChildItem *.php) {
  gemini -p "@$($file.FullName) Resumo curto (3 bullets)."
}
```

### Salvando output
```bash
gemini -p "@arquivo.php Resumo" > resumo.txt
```

## Troubleshooting

| Erro | Solução |
|------|---------|
| `GEMINI_API_KEY not set` | `$env:GEMINI_API_KEY = "key"` |
| `429 Too Many Requests` | Esperar 1 min (quota por min/dia) |
| `401 Unauthorized` | API key expirada — gerar nova em aistudio.google.com |
| `Command not found: gemini` | Instalar CLI: `npm install -g @google/generative-ai-cli` |
| Timeout (lê arquivo grande) | Dividir arquivo ou usar Read tool (fallback) |

## Modelos disponíveis

```bash
gemini --model gemini-2.5-flash   # Rápido, 64k context, ideal para ler código
gemini --model gemini-2.5-pro     # Poderoso, 100k context, mais lento
```

## Skill Integration

### [[gemini-explore]]
Automático:
1. Listar arquivos (Glob)
2. Filtrar relevantes
3. Rodar Gemini em cada um
4. Consolidar no Claude

**Fallback se Gemini falhar**: Usar Claude Read tool (mais tokens, mas 100% confiável)

## LGPD & Privacidade

- **Não envie dados pessoais** (nomes, emails, IDs de usuário)
- **Código é ok**: arquivo.php, queries, lógica
- **Use abstrações**: "`user.name`" not "`paulo@example.com`"

---

## Relatório de Issue

Se Gemini CLI falha consistentemente:
1. Verificar `$env:GEMINI_API_KEY`
2. Verificar quota em aistudio.google.com
3. Usar Read tool como fallback (não-blocking)
4. Report: https://github.com/google/generative-ai-cli/issues

---

**Histórico de fixes**:
- 2026-04: Gemini CLI instabilidade — agora com fallback Clear
- 2026-03: Modelos atualizados para 2.5-flash/pro
