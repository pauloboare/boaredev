# Padrão Mobile: Ionic + Vue 3 + Capacitor

## Stack Oficial para Apps Mobile + Web

```
Framework UI:  Ionic Framework 8+
JS Framework:  Vue 3 (Composition API + <script setup>)
Linguagem:     TypeScript (strict mode)
Native Bridge: Capacitor 6+
Local DB:      @capacitor-community/sqlite
State:         Pinia (store global mínimo, prefira composables)
HTTP:          axios (com interceptor JWT)
```

---

## Estrutura de Projeto

```
pontuau-app/
├── src/
│   ├── composables/       # lógica reutilizável (useAuth, useRegistro)
│   ├── services/          # chamadas HTTP (authService, registroService)
│   ├── stores/            # Pinia (apenas estado verdadeiramente global)
│   ├── views/             # telas (uma por rota)
│   │   ├── auth/
│   │   │   └── LoginView.vue
│   │   ├── home/
│   │   │   └── HomeView.vue
│   │   ├── registro/
│   │   │   └── RegistroView.vue
│   │   └── historico/
│   │       └── HistoricoView.vue
│   ├── components/        # componentes compartilhados
│   ├── router/
│   │   └── index.ts
│   ├── types/             # interfaces TypeScript
│   │   └── index.ts
│   └── main.ts
├── android/               # gerado pelo Capacitor
├── ios/                   # gerado pelo Capacitor
├── capacitor.config.ts
└── package.json
```

---

## Padrão de Componente Vue

```vue
<!-- views/registro/RegistroView.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registrar Presença</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- conteúdo -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { useRegistro } from '@/composables/useRegistro'

const { registrar, carregando } = useRegistro()
</script>
```

**Regras de componente:**
- Sempre `<script setup lang="ts">`
- Sempre `<ion-page>` como raiz em views
- Importar individualmente os componentes Ionic (tree-shaking)
- Sem lógica de negócio em views — delegar para composables

---

## Padrão de Composable

```typescript
// composables/useRegistro.ts
import { ref } from 'vue'
import { registroService } from '@/services/registroService'
import type { Registro } from '@/types'

export function useRegistro() {
  const carregando = ref(false)
  const erro = ref<string | null>(null)

  async function registrar(dados: Omit<Registro, 'id'>): Promise<Registro | null> {
    carregando.value = true
    erro.value = null
    try {
      return await registroService.criar(dados)
    } catch (e: any) {
      erro.value = e.message
      return null
    } finally {
      carregando.value = false
    }
  }

  return { registrar, carregando, erro }
}
```

**Regras de composable:**
- Prefixo `use`
- Retornar apenas o que o chamador precisa
- Tratar erros internamente, expor `erro: ref<string | null>`
- Nunca acessar DOM diretamente

---

## Padrão de Service (HTTP)

```typescript
// services/registroService.ts
import { api } from './api'
import type { Registro, CriarRegistroDTO } from '@/types'

export const registroService = {
  async criar(dados: CriarRegistroDTO): Promise<Registro> {
    const { data } = await api.post('/registros', dados)
    return data.data
  },

  async listar(perfil_id: string): Promise<Registro[]> {
    const { data } = await api.get('/registros', { params: { perfil_id } })
    return data.data
  },
}
```

```typescript
// services/api.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
})

api.interceptors.request.use(config => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      const auth = useAuthStore()
      await auth.logout()
    }
    return Promise.reject(err)
  }
)
```

---

## Capacitor: Câmera (bloqueio de galeria)

```typescript
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera'

async function capturarFoto(): Promise<string> {
  const foto = await Camera.getPhoto({
    quality: 85,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera,  // bloqueia galeria — NUNCA usar Prompt ou Photos
    saveToGallery: false,
  })
  return foto.base64String!
}
```

---

## Capacitor: Geolocalização

```typescript
import { Geolocation } from '@capacitor/geolocation'

async function obterLocalizacao() {
  const permissao = await Geolocation.requestPermissions()
  if (permissao.location !== 'granted') throw new Error('Localização negada')

  const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
  return {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
    precisao_metros: pos.coords.accuracy,
  }
}
```

---

## Offline First: Fila de Sincronização

```typescript
// composables/useSyncQueue.ts
import { Storage } from '@ionic/storage-angular'

const QUEUE_KEY = 'sync_queue'

export function useSyncQueue() {
  async function enqueue(item: unknown) {
    const atual = await Storage.get({ key: QUEUE_KEY })
    const fila = atual.value ? JSON.parse(atual.value) : []
    fila.push({ item, tentativas: 0, criado_em: new Date().toISOString() })
    await Storage.set({ key: QUEUE_KEY, value: JSON.stringify(fila) })
  }

  async function processar(handler: (item: unknown) => Promise<void>) {
    const atual = await Storage.get({ key: QUEUE_KEY })
    if (!atual.value) return
    const fila = JSON.parse(atual.value)
    const restantes = []
    for (const entry of fila) {
      try {
        await handler(entry.item)
      } catch {
        if (entry.tentativas < 3) restantes.push({ ...entry, tentativas: entry.tentativas + 1 })
      }
    }
    await Storage.set({ key: QUEUE_KEY, value: JSON.stringify(restantes) })
  }

  return { enqueue, processar }
}
```

---

## Variáveis de Ambiente

```bash
# .env.development
VITE_API_URL=http://192.168.1.x/PontUAU/api/v1

# .env.production
VITE_API_URL=https://api.pontuau.com.br/v1
```

Usar sempre `import.meta.env.VITE_*` — nunca `process.env`.

---

## Scripts Comuns

```bash
# Desenvolvimento web
ionic serve

# Build + sync com Android
ionic build && npx cap sync android
npx cap open android          # abre Android Studio

# Build + sync com iOS (Mac apenas)
ionic build && npx cap sync ios
npx cap open ios

# Gerar APK debug
cd android && ./gradlew assembleDebug
```

---

## Checklist antes de commitar

- [ ] Sem `console.log` em produção (usar `import.meta.env.DEV && console.log(...)`)
- [ ] Variáveis de ambiente em `.env.*`, não hardcoded
- [ ] Token JWT nunca em `localStorage` — usar `@capacitor/preferences`
- [ ] Câmera sempre com `source: CameraSource.Camera`
- [ ] Permissões solicitadas antes de usar GPS/câmera
- [ ] Erros de rede tratados em todos os services
