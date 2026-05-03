# Pré-voo: Decisão de Stack de Banco de Dados

**Objetivo:** Escolher a solução de BD ideal APÓS definir tipo de projeto (mobile/web/híbrido/API).

**Quando:** Após `pre-voo-tipo-projeto.md`, antes de PRD.  
**Responsável:** Você + usuário.  
**Output:** Stack de BD definido, integração com auth/push/realtime mapeada.

---

## 1. ÁRVORE DE DECISÃO

### 1.1 Perguntas Críticas

**Q1: Precisa ser free/low-cost?**
- [ ] SIM — Free tier obrigatório ou <$50/mês
- [ ] NÃO — Orçamento flexível

**Q2: Quantos usuários simultâneos?**
- [ ] <1000 — Pequeno (free tiers suficientes)
- [ ] 1k-100k — Médio (escalabilidade importante)
- [ ] >100k — Grande (infraestrutura robusta)

**Q3: Precisa de realtime?** (chats, notificações, collab)
- [ ] SIM — Websocket/subscriptions essenciais
- [ ] NÃO — Polling/REST é OK

**Q4: Precisa de notificações push?**
- [ ] SIM — Firebase/native obrigatório
- [ ] NÃO — Email/SMS ou sem notificações

**Q5: Precisa de autenticação social?** (Google, Apple, GitHub)
- [ ] SIM — Auth provider integrado melhor
- [ ] NÃO — Usuário/senha suficiente

**Q6: Tipo de app** (já definido no pré-voo-tipo-projeto)
- [ ] Mobile (iOS/Android)
- [ ] Web (navegador)
- [ ] Híbrido (ambos)
- [ ] API Pura (backend only)

**Q7: Precisa de isolamento de dados multi-tenant?**
- [ ] SIM — RLS (Row-Level Security) recomendado
- [ ] NÃO — BD simples por app

**Q8: Você controla a infraestrutura?**
- [ ] SIM — Pode self-host (Appwrite, seu servidor)
- [ ] NÃO — Preferir managed (Supabase, Firebase)

---

## 2. MATRIZ DE DECISÃO

| Cenário | Tipo | BD Recomendado | Free Tier | Realtime | Auth | Push | Curva |
|---------|------|---|---|---|---|---|---|
| **Mobile app chat (Lembri)** | Híbrido | Supabase + Firebase | ✅ 500k req/mês | ✅ Subscriptions | ✅ Nativo | ⚠️ Firebase | ⭐⭐ |
| **Startup SaaS web** | Web | Supabase | ✅ 500k req/mês | ✅ Webhooks | ✅ Social OAuth | ⚠️ Custom | ⭐⭐ |
| **App mobile offline-first** | Mobile | Firebase Realtime + Firestore | ✅ 1GB storage | ✅ Sync nativo | ✅ Built-in | ✅ Nativo | ⭐⭐⭐ |
| **Admin dashboard tradicional** | Web | PostgreSQL + PHP | ✅ Livre (self) | ❌ Polling | ❌ Form auth | ❌ N/A | ⭐ |
| **API backend puro** | API | PostgreSQL ou MongoDB | ✅ Livre (self) | ❌ Webhooks | ⚠️ JWT | ❌ N/A | ⭐⭐ |
| **E-commerce com inventário** | Web | PostgreSQL | ✅ Self-host | ✅ Cache (Redis) | ✅ OAuth | ❌ Email | ⭐⭐⭐ |
| **Analytics/BI low-cost** | Web | ClickHouse ou DuckDB | ✅ Open-source | ❌ Polling | ❌ N/A | ❌ N/A | ⭐⭐⭐⭐ |
| **App IoT com sync crítica** | Mobile/API | MongoDB Realm | ✅ Free para pequeno | ✅ Sync bilateral | ⚠️ Custom | ⚠️ Custom | ⭐⭐⭐⭐ |

---

## 3. OPÇÕES POPULARES (Análise Completa)

### 🟢 RECOMENDADOS (MVP + Produção)

#### **Supabase** (PostgreSQL + Auth + Realtime)
```
✅ Suporte: auth nativa, RLS, subscriptions realtime
✅ Free: 500k requisições/mês, 1GB storage
✅ Integração: Firebase FCM, Webhooks, REST API
✅ Mobile: SDK para Flutter, React Native
✅ Escalabilidade: Cresce bem, preço previsível
❌ Notificações: Não incluídas (integra Firebase)
❌ Self-host: Appwrite é alternativa (mais complexo)

Ideal para: MVP com múltiplos usuários, realtime crítico, low-cost
Custo em produção: ~$100-500/mês dependendo escala
```

#### **Firebase (Firestore + Auth + Cloud Messaging)**
```
✅ Suporte: Auth social, push integrado, offline-first native
✅ Free: 1GB storage, 50k leituras/dia, 20k escritas/dia
✅ Integração: Todos SDKs, Capacitor plugin nativo
✅ Mobile: Experiência perfeita em iOS/Android
✅ Sync: Bilateral automático (Realtime Database ou Firestore)
❌ Cost: Pode ser caro em scale (pay-as-you-go)
❌ Vendor lock-in: Díficil migrar depois
❌ Queries: Menos poderosas que SQL

Ideal para: App mobile puro, offline-first crítico, auth social importante
Custo em produção: ~$50-300/mês (com spike pode ser caro)
```

#### **Appwrite** (Self-hosted BaaS)
```
✅ Suporte: Auth, Storage, API REST, Realtime, Functions
✅ Free: Self-hosted ilimitado (você paga server)
✅ Integração: Open-source, Docker
✅ Mobile: SDK completo, Capacitor
✅ Privacy: Dados suas (não vendor lock-in)
❌ Ops: Você gerencia (Docker, backup, updates)
❌ Notificações: Não nativas (integra Firebase)
❌ Realtime: Mais simples que Supabase

Ideal para: Equipes que querem controle total, privacy-first, MVP rápido
Custo em produção: ~$5-20/mês (servidor barato) + seu tempo ops
```

---

### 🟡 ALTERNATIVAS (Casos específicos)

#### **MongoDB Realm** (Mobile-first sync)
```
✅ Ideal para: App mobile com sync crítica (offline-first perfeito)
✅ Free: ~5GB, sync nativo, SDK Realm
❌ Backend: Precisa API separada para web
❌ Curva: Mais complexo que Firestore
Custo: ~$100-500/mês
```

#### **AWS Amplify** (Completo mas complexo)
```
✅ Ideal para: Startups AWS-first, escala grande
✅ Stack: Cognito (auth), AppSync (realtime), Amplify hosting
❌ Free tier: 12 meses apenas
❌ Curva: Muito complexo para MVP
❌ Pricing: Pode ser surpresa (pay-as-you-go)
Custo: Variável, potencialmente caro
```

#### **Back4App** (Parse-as-a-service)
```
✅ Ideal para: Quem conhece Parse
✅ Free: 500 requisições/mês (muito limitado)
❌ Escalabilidade: Caro rápido
❌ Free tier: Insuficiente para MVP real
Custo: ~$50-200/mês
```

---

### 🔴 NÃO RECOMENDADOS (Evite!)

#### **MySQL Puro** (sem BaaS)
```
❌ Problema: Precisa buildar tudo (auth, push, realtime, sync)
❌ Mobile: Sem offline-first nativo
❌ Notificações: Implementar manualmente (complexo)
✅ Uso: Só se você já tem infraestrutura e expertise
```

#### **Oracle Express** ou **SQL Server Express**
```
❌ Problema: Mesmos problemas do MySQL, mais pesado
❌ Escalabilidade: Overkill para MVP
✅ Uso: Só se empresa já tem contrato
```

#### **Kuzzle, Backendless, etc**
```
❌ Vendor lock-in alto
❌ Free tier muito limitado
❌ Comunidade pequena
```

---

## 4. FLUXO DE DECISÃO PASSO-A-PASSO

```
[Tipo de Projeto já definido]
        ↓
[Responde Q1-Q8 acima]
        ↓
[Aplica Matriz de Decisão]
        ↓
[Define BD primária + integrações]
        ↓
[Mapeia: Auth provider, Push, Realtime, Sync]
        ↓
[Documenta no .dev/CLAUDE.md do projeto]
        ↓
[Avança para PRD]
```

---

## 5. TEMPLATE DE DECISÃO

Ao escolher, preencha isto:

```markdown
## Stack de Banco de Dados: [PROJETO]

### Respostas às perguntas

- **Free/Low-cost:** SIM (< $50/mês)
- **Usuários simultâneos:** 1k-100k (escala média)
- **Realtime:** SIM (chats)
- **Push notifications:** SIM (lembretes críticos)
- **Auth social:** NÃO (user/pass suficiente)
- **Tipo de app:** Híbrido (mobile + web)
- **Multi-tenant:** NÃO (single app)
- **Controlo infraestrutura:** NÃO (preferir managed)

### Decisão Final

| Componente | Escolha | Motivo |
|---|---|---|
| **BD Principal** | Supabase (PostgreSQL) | Realtime + Auth nativa + free tier |
| **Autenticação** | Supabase Auth | RLS automático, suporta user/pass |
| **Notificações Push** | Firebase Cloud Messaging | Integração nativa com Flutter/React Native |
| **Realtime/Sync** | Supabase Subscriptions | Chats em tempo real |
| **Storage** | Supabase Storage | Fotos/videos dos lembretes |
| **Free tier esperado** | 500k requisições/mês | Suficiente para MVP |
| **Próximo upgrade** | ~$100/mês | Quando atingir 50% do limite |

### Arquitetura

```
Frontend (Flutter/React Native)
    ↓
[Supabase SDK]
    ├── Auth (JWT local)
    ├── Realtime Subscriptions (chats)
    └── PostgreSQL queries (REST)
    ↓
[Firebase Cloud Messaging]
    ↓ Push notifications
    ↓
Smartphone (iOS/Android)
```

### Próximas decisões

1. Schema do PostgreSQL (tabelas, RLS rules)
2. Exemplo: `policies_lembri_users.sql`
3. Documentado em: `sql/001_schema_inicial.sql`
```

---

## 6. INTEGRANDO AO FLUXO GLOBAL

**Novo fluxo completo:**

```
[Novo Projeto]
        ↓
[1️⃣ Pré-voo: Tipo de Projeto] (pre-voo-tipo-projeto.md)
    → Define: mobile? web? híbrido? API?
    → Define: restrições de plataforma
        ↓
[2️⃣ Pré-voo: Stack de BD] (pre-voo-stack-database.md) ← AQUI VOCÊ ESTÁ
    → Define: qual BD? Qual auth? Qual realtime?
    → Define: integrações (Firebase, etc)
        ↓
[3️⃣ PRD — Regras de negócio]
    → Aprovado tipo + stack
        ↓
[4️⃣ SPEC Técnica — Schema + Padrões]
    → Migrations, entidades, rotas
        ↓
[5️⃣ TDD — Código]
    → Desenvolve conforme spec
        ↓
[6️⃣ Deploy]
```

---

## 7. CHECKLIST PRÉ-PRD

Antes de avançar, verifique:

- [ ] **BD escolhida é free ou affordable** (checou pricing)
- [ ] **Auth provider definido** (supabase auth? Firebase? JWT manual?)
- [ ] **Push notifications mapeado** (Firebase? Capacitor? Outro?)
- [ ] **Realtime definido** (se app conversacional)
- [ ] **Integração com tipo de projeto faz sentido** (mobile-first = Firebase OK; web = Supabase OK)
- [ ] **Escalabilidade pensada** (não é afterthought)
- [ ] **Migração documentada** (se trocar depois, qual é o plano?)
- [ ] **Usuário concorda com custo em produção** (não surpresas)

Se qualquer item = ❌, **renegocie**.

---

## 8. EXEMPLOS PRÁTICOS

### ✅ Exemplo 1: Lembri (Mobile + Web conversacional)

**Decisão:**
- BD: Supabase
- Auth: Supabase Auth (user/pass)
- Push: Firebase Cloud Messaging
- Realtime: Supabase subscriptions (chats)
- Free tier: 500k requisições/mês ✅

**Porquê:** Realtime é crítico para conversas, push é core do produto, free tier suficiente para MVP.

---

### ✅ Exemplo 2: Admin Dashboard Tradicional

**Decisão:**
- BD: PostgreSQL (self-hosted ou RDS)
- Auth: PHP Session ou JWT simples
- Push: ❌ Não precisa
- Realtime: ❌ Não precisa
- Free tier: Não (mas configurável em VPS ~$5/mês)

**Porquê:** CRUD simples, sem mobile, sem realtime. Overkill usar Supabase. PostgreSQL direto + PHP é suficiente.

---

### ✅ Exemplo 3: App Mobile Pure (Offline-first)

**Decisão:**
- BD: Firebase Firestore
- Auth: Firebase Auth + Apple/Google
- Push: Firebase Cloud Messaging
- Realtime: Sync nativo (Firestore listeners)
- Free tier: 1GB storage, 50k leituras/dia ✅

**Porquê:** Offline-first nativo, push integrado, sync automático. Firebase é perfeito.

---

## 9. QUANDO REVER ESSA DECISÃO

Revise a escolha se:

- [ ] Volume de dados crescer >10GB (Firestore fica caro)
- [ ] Queries SQL complexas não forem possíveis (Firebase tem limitações)
- [ ] Realtime for crítico depois (mudar depois é caro)
- [ ] Novo requisito de compliance/LGPD aparecer (pode precisar self-host)
- [ ] Usuários crescerem >100k simultâneos (scaling strategy muda)

**Mitigação:** Sempre ter plano B documentado.

---

## 10. REFERÊNCIA RÁPIDA

```markdown
## Regra prática rápida:

- **App mobile conversacional/realtime?** → Supabase + Firebase
- **App mobile puro, offline crítico?** → Firebase
- **Admin web tradicional?** → PostgreSQL + PHP
- **API backend puro?** → PostgreSQL + Node/Python
- **Startup SaaS web?** → Supabase
- **Quer controle total, privacy-first?** → Appwrite self-hosted

**Dúvida?** Volta para as 8 perguntas de Q1-Q8.
```

