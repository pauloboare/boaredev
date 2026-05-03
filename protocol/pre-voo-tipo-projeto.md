# Pré-voo: Classificação de Tipo de Projeto

**Objetivo:** Identificar se o projeto é **mobile**, **web**, **híbrido** ou **API pura** ANTES de qualquer decisão arquitetural.

**Quando:** Primeira coisa ao iniciar um novo projeto/feature.  
**Responsável:** Você (na conversa com o usuário).  
**Output:** Uma tabela clara que define a arquitetura base.

---

## 1. QUESTÕES CRÍTICAS

Fazer estas perguntas **antes** de escrever PRD ou escolher stack:

### 1.1 Onde o usuário acessa?
- [ ] **Mobile APENAS** — Smartphone/Tablet (iOS + Android)
- [ ] **Web APENAS** — Desktop/Laptop (navegador)
- [ ] **AMBOS** — Web + Mobile (hibrido ou separado)
- [ ] **API PURA** — Backend para integração (não é UI)

### 1.2 Restrições Mobile (se selecionado mobile)
- [ ] Precisa funcionar **offline**? (sim = sincronização necessária)
- [ ] Precisa de **push notifications**? (sim = Firebase/native)
- [ ] Precisa de **câmera/GPS**? (sim = Capacitor)
- [ ] Precisa de **biometria**? (sim = Capacitor plugins)
- [ ] Qual versão mínima de OS? (iOS 12+? Android 7+?)

### 1.3 Restrições Web (se selecionado web)
- [ ] Precisa de **multi-tenant**? (sim = isolamento de dados)
- [ ] Precisa de **autenticação social**? (sim = OAuth)
- [ ] Qual navegador mínimo? (IE11 morreu, assumir modernos?)
- [ ] Precisa de **PWA/offline**? (sim = Service Worker)

### 1.4 Tipo de Interface
- [ ] **Formulários tradicionais** (CRUD, admin)
- [ ] **Chat conversacional** (WhatsApp-like, Slack-like)
- [ ] **Dashboard/Analytics** (visualização de dados)
- [ ] **Real-time** (WebSocket, SSE)
- [ ] **Outras** (especificar)

### 1.5 Performance + Escala
- [ ] Quantos usuários simultâneos esperado? (10? 10k? 1M?)
- [ ] Latência aceitável? (<100ms crítico? <500ms ok?)
- [ ] Precisa de cache local? (sim = Redis, Memcached)
- [ ] Quantos requests/segundo? (10? 1000? 100k?)

### 1.6 Integração
- [ ] É **autossuficiente** (arquitetura encapsulada)?
- [ ] Precisa integrar com **sistemas legados**?
- [ ] Precisa de **webhooks** (entrada de dados externa)?
- [ ] Precisa de **sync bilateral** (dados sync 2 vias)?

---

## 2. MATRIZ DE DECISÃO

| Cenário | Tipo | Stack Recomendado | Notas |
|---------|------|-------------------|-------|
| **Smartphone app de lembretes** | Mobile | Ionic + Vue 3 + API Rest | Offline-first, push, Capacitor |
| **Admin dashboard web** | Web | Vue 3 + PHP backend | Formulários, CRUD, sem mobile |
| **Plataforma SaaS web + mobile** | Híbrido | Ionic (mobile) + Vue (web) + API | Código compartilhado (types, composables) |
| **Microserviço** | API Pura | Express.js ou PHP API | Nenhuma UI, apenas JSON |
| **Chat em tempo real** | Mobile/Web | Vue 3 + WebSocket + Node.js | Real-time, sincronização constante |
| **Integração legada** | API Pura | REST + GraphQL + Queue | Adaptar dados antigos para novo formato |

---

## 3. TEMPLATE DE DECISÃO

Ao receber uma request, preencha isso:

```markdown
## Classificação de Tipo de Projeto: [NOME]

### Resposta às questões

**Onde o usuário acessa?**
- [X] Mobile (iOS + Android)
- [ ] Web
- [ ] Ambos
- [ ] API pura

**Restrições mobile identificadas:**
- [X] Offline-first (SIM — fila de sincronização necessária)
- [X] Push notifications (SIM — Firebase)
- [ ] Câmera/GPS
- [ ] Biometria
- Mínimo iOS 14, Android 9

**Interface principal:**
- [X] Chat conversacional (como WhatsApp)
- [ ] Formulários
- [ ] Dashboard
- [ ] Real-time

**Performance esperada:**
- Usuários: ~1000-10k
- Latência: <1s aceitável
- Requests/seg: <100
- Cache local: SIM (composables + Storage)

**Integração:**
- Autossuficiente (API própria)
- Sem webhooks ou sync bilateral

### Decisão Arquitetural

**Tipo:** Mobile-first com API separada  
**Frontend:** Ionic 8 + Vue 3 + TypeScript + Capacitor  
**Backend:** PHP + MySQL + JWT  
**Notificações:** Firebase Cloud Messaging  
**Storage:** Capacitor Preferences (token) + SQLite local  
**Padrão:** DDD Light + Offline-first  

**Por quê?**
- Mobile é crítico (interface só faz sentido em chat)
- Offline-first = boa UX em conexões ruins
- Push notifications = core do produto (lembretes)
- JWT stateless = escalável
- Ionic = código único iOS/Android
```

---

## 4. IMPACTO NA ARQUITETURA

### Se for **Mobile-first**:
```
Decisões decorrentes:
- [ ] API separada (REST + JWT, não sessão PHP)
- [ ] Offline-first (fila de sync)
- [ ] Firebase FCM ou Capacitor Push
- [ ] TypeScript obrigatório (type-safety)
- [ ] Storage seguro (Capacitor Preferences, não localStorage)
- [ ] Capacitor plugins (câmera, geoloc, biometria)
- [ ] Teste em dispositivo real (emulador não é suficiente)
```

### Se for **Web-first**:
```
Decisões decorrentes:
- [ ] PHP com sessão pode funcionar
- [ ] CORS simples (mesmo servidor)
- [ ] Cache HTTP padrão
- [ ] LocalStorage aceitável
- [ ] Testes em navegador (Vitest, Playwright)
```

### Se for **Híbrido** (Web + Mobile):
```
Decisões decorrentes:
- [ ] API separada (serve ambos)
- [ ] Composables compartilhados (logic reutilizável)
- [ ] Types TypeScript compartilhados
- [ ] Mobile: Ionic + Capacitor
- [ ] Web: Vue 3 puro (ou Nuxt)
- [ ] Monorepo? (packages/web, packages/mobile, packages/api)
```

### Se for **API Pura**:
```
Decisões decorrentes:
- [ ] Nenhuma view/UI
- [ ] Documentação OpenAPI/Swagger obrigatória
- [ ] Versionamento de API claro (/v1, /v2)
- [ ] Rate limiting
- [ ] Testes de integração (POST /endpoint, verificar JSON)
```

---

## 5. FLUXO COMPLETO (Atualizado)

```
[Novo Projeto]
        ↓
[Pré-voo 1: Classificação de Tipo]  (pre-voo-tipo-projeto.md)
    ↓ responde questões
    ↓ preenche template
    ↓ define: mobile? web? híbrido? API?
        ↓
[Pré-voo 2: Stack de Banco de Dados]  (pre-voo-stack-database.md)
    ↓ responde questões (Q1-Q8)
    ↓ aplica matriz de decisão
    ↓ define: qual BD? Firebase? Supabase? PostgreSQL?
    ↓ mapeia: auth, push, realtime, sync
        ↓
[PRD — Regras de negócio]
    ↓ aprova tipo + stack
        ↓
[SPEC Técnica — Schema + Padrões]
    ↓ aprova
        ↓
[TDD — Código]
    ↓ entrega
        ↓
[Deploy]
```

---

## 6. CHECKLIST ANTI-ERRO

Antes de passar para PRD, verify:

- [ ] **Tipo de projeto é claro** (não ambíguo)
- [ ] **Stack recomendado faz sentido** (não é "por hábito")
- [ ] **Restrições mobile/web foram consideradas** (se aplicável)
- [ ] **Performance + escala foram pensadas** (não é afterthought)
- [ ] **Integração com sistemas existentes está clara**
- [ ] **Offline-first foi considerado** (se mobile)
- [ ] **Push notifications foram consideradas** (se mobile)
- [ ] **Segurança de tokens foi pensada** (se mobile: Capacitor Preferences)

Se qualquer item acima = ❌, **volte** e renegocie com o usuário.

---

## 7. EXEMPLOS DE ERRO COMUM

### ❌ Erro 1: "Vou fazer um app, escolho Ionic"
**Problema:** Não perguntou se é realmente mobile.  
**Certo:** Perguntar primeiro. Pode ser web que simula app.

### ❌ Erro 2: "Vou usar PHP com sessão e JWT"
**Problema:** Misturar padrões. Sessão = stateful (não mobile-friendly).  
**Certo:** Se mobile → JWT puro. Se web legado → sessão. Não ambos.

### ❌ Erro 3: "Offline-first? Nunca ouvi falar. Vamos online sempre."
**Problema:** Usuário em metrô? Em avião? Sem cobertura? UX horrível.  
**Certo:** Se mobile → offline-first é não-negociável.

### ❌ Erro 4: "Push notifications? Manda um email instead."
**Problema:** Email é lento. Notificação é imediata.  
**Certo:** Se tempo real é crítico (lembretes, chats) → push native.

---

## 8. INTEGRANDO AO PROTOCOLO GLOBAL

Este documento **substitui** a primeira parte vaga do PRD.

**Novo fluxo:**
1. Usuário descreve projeto
2. **Você preenche: Pré-voo (AQUI)**
3. Você propõe stack + arquitetura
4. Usuário aprova/nega
5. Aí sim: PRD + SPEC + Código

---

## 9. PRÓXIMAS VEZES

Quando um usuário disser:
> "Preciso de um app de X"

Responda imediatamente:

### Fase 1: Tipo de Projeto
```
Entendi. Deixa eu clarificar a arquitetura:

1. Isso é mobile apenas (iOS/Android), web, ou híbrido?
2. Qual é a interface principal? (formulário, chat, dashboard, realtime?)
3. Quantos usuários esperado?

[Aguarda respostas] → Preenche pre-voo-tipo-projeto.md
```

### Fase 2: Stack de Banco de Dados
```
Baseado no tipo, vou definir o banco:

1. Precisa ser free ou low-cost?
2. Precisa de realtime? (chats, notificações)
3. Precisa de notificações push?
4. Precisa de autenticação social?

[Aguarda respostas] → Preenche pre-voo-stack-database.md
```

**Nunca assuma.** Sempre pergunte tipo + stack antes de escrever PRD.
