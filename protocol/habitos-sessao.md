# Hábitos de Sessão (Anti-Context-Rot)

Hábitos do dev para evitar inflar contexto e gastar tokens à toa. Baseado em recomendações Anthropic + experiência real.

## 1. `/rewind` em vez de "pare, faça assim"

Quando Claude erra, **não corrija com mais mensagens** ("não, faça assim", "isso está errado"). Cada correção fica salva no contexto e polui as próximas respostas.

**Use:** `ESC` duplo (ou `/rewind`) → volta para mensagem anterior, exclui tudo depois → contexto limpo.

Bonus: opção `summarize from here` cria nota da Claude do passado pra Claude do futuro sobre o que evitar.

## 2. Compactar manualmente em 50-60% da janela

A autocompactação acontece em ~95% — **tarde demais**. Modelo já está em context-rot e compacta mal.

**Use:** quando perceber 50-60% da janela cheia, peça resumo manual → `/clear` → cole o resumo → continue.

## 3. Subagentes com Haiku explícito

Tarefas pesadas em busca/leitura/resumo não precisam do modelo da sessão principal.

**Use:** *"sobe um subagente Haiku para [resumir/pesquisar/varrer]"* — economia 3x sem perda perceptível.

## 4. `/btw` para perguntas paralelas

Pergunta off-topic durante projeto profundo? Não polua o contexto principal.

**Use:** `/btw` → overlay de pergunta paralela → resposta não fica no histórico.

## 5. Sessões encadeadas em projetos grandes

Não tente fazer descoberta + plan + execução numa sessão só.

**Fluxo:**
1. **Sessão de descoberta**: Claude lê código/docs e produz `discovery.md`
2. **Sessão de planejamento**: lê o discovery e produz `plan.md`
3. **Sessão de execução**: lê o plan e implementa

Cada sessão começa fresca, com prompt cache quente e contexto enxuto.

## 6. Plan mode primeiro

Gastar tokens cedo no planejamento evita retrabalho caro depois. Plan mode → revisar → executar uma vez.

## 7. Markdown sempre que possível

PDF/HTML/DOCX têm ruído (layout, metadata). Converta para markdown antes de enviar:
- HTML → Markdown: ~90% redução
- PDF → Markdown: ~67% redução
- DOCX → Markdown: ~33% redução

Ferramenta: DocLink ou similar.

## 8. `.claudeignore` em projetos grandes

Excluir `vendor/`, `node_modules/`, `storage/logs/`, dumps SQL — evita Claude ler por engano.

---

**Princípio geral:** tokens de output custam mais que de input; releitura de histórico chega a 98.5% do gasto numa sessão longa. Hábitos pesam mais que qualquer otimização de configuração.
