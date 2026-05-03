# GitHub Copilot — Free Models

**Novo em 2025**: Copilot CLI oferece acesso a modelos free via GitHub Copilot (assinante). Se está usando conta free da Microsoft, tem acesso limitado.

## Modelos Disponíveis

### Via Copilot CLI (free)
```bash
# Instalar
npm install -g @github/copilot-cli

# Testar
copilot --help

# Rodar modelo
copilot ask "resumo de arquivo.php" --model gpt-4o-mini
```

| Modelo | Contexto | Custo | Usar para |
|--------|----------|-------|-----------|
| gpt-4o-mini | 128k tokens | Free | Boilerplate, code gen, edits simples |
| gpt-4-turbo | 128k tokens | Free (limitado) | Design complexo |
| o1 | 128k tokens | Pago | Raciocínio profundo (evitar aqui) |

### Via VS Code Extension (recomendado)
- Instalar: VS Code Marketplace → "GitHub Copilot"
- Use `Ctrl+K` → chat integrado
- Acesso direto a gpt-4o-mini (free)

## Integração com DevProtocol

### skill [[gpt-draft]]
**Usa Copilot free para gerar boilerplate PHP** (economiza tokens Claude):
- Se disponível: rodar via Copilot CLI
- Fallback: usar Claude Sonnet
- Resultado: consolidado em Claude

### Quando não usar Copilot
- Lógica complexa (use Claude Opus)
- Design crítico (use Claude + arquiteto)
- Debugging (use Claude)

## Troubleshooting

```bash
# Verificar auth
copilot auth status

# Re-autenticar
copilot auth login

# Listar modelos disponíveis
copilot models
```

---

**Ganho**: ~30-40% redução de tokens Claude usando Copilot free para boilerplate.

**Config**: ~/.claude/CLAUDE.md referencia [[gpt-draft]] que usa Copilot automaticamente.
