# Padrão: Autenticação JWT (PHP Backend + App Mobile)

## Por que JWT em vez de sessão PHP

| Critério | Sessão PHP | JWT |
|---|---|---|
| Apps mobile/nativo | Não funciona (sem cookies nativos) | Funciona (header Authorization) |
| Múltiplos dispositivos | Complicado | Natural |
| API stateless | Não | Sim |
| Web tradicional | Ideal | Funciona também |

---

## Dependência

```bash
composer require firebase/php-jwt
```

---

## JwtService (PHP)

```php
<?php
// infraestrutura/Auth/JwtService.php
// ATENÇÃO: Auth é infraestrutura, não domínio. dominio/ não sabe que JWT existe.

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService
{
    private static string $segredo;
    private static int $ttlAcesso  = 900;      // 15 minutos
    private static int $ttlRefresh = 2592000;  // 30 dias

    private static function segredo(): string
    {
        if (!isset(self::$segredo)) {
            self::$segredo = $_ENV['JWT_SECRET'] ?? throw new RuntimeException('JWT_SECRET não definido');
        }
        return self::$segredo;
    }

    public static function gerarAcesso(string $usuario_id, string $role = 'usuario'): string
    {
        return JWT::encode([
            'iss' => $_ENV['APP_URL'],
            'sub' => $usuario_id,
            'role'=> $role,
            'iat' => time(),
            'exp' => time() + self::$ttlAcesso,
            'type'=> 'access',
        ], self::segredo(), 'HS256');
    }

    public static function gerarRefresh(string $usuario_id): string
    {
        $jti = bin2hex(random_bytes(16)); // ID único do token

        // Persistir JTI no banco para permitir revogação
        $db = Connection::getInstance();
        $stmt = $db->prepare('INSERT INTO refresh_tokens (jti, usuario_id, expira_em) VALUES (:jti, :uid, :exp)');
        $stmt->execute([':jti' => $jti, ':uid' => $usuario_id, ':exp' => date('Y-m-d H:i:s', time() + self::$ttlRefresh)]);

        return JWT::encode([
            'iss' => $_ENV['APP_URL'],
            'sub' => $usuario_id,
            'jti' => $jti,
            'iat' => time(),
            'exp' => time() + self::$ttlRefresh,
            'type'=> 'refresh',
        ], self::segredo(), 'HS256');
    }

    public static function validar(string $token): array
    {
        try {
            $payload = (array) JWT::decode($token, new Key(self::segredo(), 'HS256'));
        } catch (\Exception $e) {
            throw new \InvalidArgumentException('Token inválido ou expirado.');
        }

        if (($payload['type'] ?? '') === 'refresh') {
            throw new \InvalidArgumentException('Use o token de acesso, não o refresh.');
        }

        return $payload;
    }

    public static function renovar(string $refreshToken): array
    {
        try {
            $payload = (array) JWT::decode($refreshToken, new Key(self::segredo(), 'HS256'));
        } catch (\Exception) {
            throw new \InvalidArgumentException('Refresh token inválido.');
        }

        if (($payload['type'] ?? '') !== 'refresh') {
            throw new \InvalidArgumentException('Token não é um refresh token.');
        }

        // Verificar se JTI ainda é válido (não foi revogado)
        $db   = Connection::getInstance();
        $stmt = $db->prepare('SELECT id FROM refresh_tokens WHERE jti = :jti AND ativo = 1 AND expira_em > NOW()');
        $stmt->execute([':jti' => $payload['jti']]);
        if (!$stmt->fetch()) {
            throw new \InvalidArgumentException('Refresh token revogado ou expirado.');
        }

        // Rotacionar: revogar o atual e emitir novo par
        $db->prepare('UPDATE refresh_tokens SET ativo = 0 WHERE jti = :jti')->execute([':jti' => $payload['jti']]);

        $usuario_id = $payload['sub'];
        return [
            'access_token'  => self::gerarAcesso($usuario_id),
            'refresh_token' => self::gerarRefresh($usuario_id),
        ];
    }

    public static function revogarTodos(string $usuario_id): void
    {
        $db = Connection::getInstance();
        $db->prepare('UPDATE refresh_tokens SET ativo = 0 WHERE usuario_id = :uid')->execute([':uid' => $usuario_id]);
    }
}
```

---

## Tabela refresh_tokens

```sql
CREATE TABLE refresh_tokens (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    jti        CHAR(32)     NOT NULL UNIQUE,
    usuario_id CHAR(36)     NOT NULL,
    expira_em  DATETIME     NOT NULL,
    ativo      TINYINT(1)   NOT NULL DEFAULT 1,
    criado_em  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_usuario (usuario_id),
    INDEX idx_jti     (jti)
);
```

---

## Endpoint: Login

```php
<?php
// api/v1/auth/login.php
require_once __DIR__ . '/../../_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder(405);

$body  = lerBodyJson();
$email = trim($body['email'] ?? '');
$senha = $body['senha'] ?? '';

if (!$email || !$senha) responder(422, null, 'E-mail e senha obrigatórios.');

$repo    = new UsuarioRepositorio();
$usuario = $repo->buscarPorEmail($email);

if (!$usuario || !password_verify($senha, $usuario['senha_hash'])) {
    responder(401, null, 'Credenciais inválidas.');
}

if (!$usuario['ativo']) {
    responder(403, null, 'Conta desativada.');
}

responder(200, [
    'access_token'  => JwtService::gerarAcesso($usuario['uuid']),
    'refresh_token' => JwtService::gerarRefresh($usuario['uuid']),
    'usuario'       => ['uuid' => $usuario['uuid'], 'nome' => $usuario['nome']],
]);
```

---

## Endpoint: Refresh

```php
<?php
// api/v1/auth/refresh.php
require_once __DIR__ . '/../../_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder(405);

$body         = lerBodyJson();
$refreshToken = $body['refresh_token'] ?? '';
if (!$refreshToken) responder(422, null, 'refresh_token obrigatório.');

try {
    $tokens = JwtService::renovar($refreshToken);
    responder(200, $tokens);
} catch (\InvalidArgumentException $e) {
    responder(401, null, $e->getMessage());
}
```

---

## App Mobile: Armazenamento do Token

```typescript
// stores/auth.ts
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'  // NÃO usar localStorage

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null as string | null, refreshToken: null as string | null }),

  actions: {
    async salvarTokens(access: string, refresh: string) {
      this.token = access
      this.refreshToken = refresh
      await Preferences.set({ key: 'access_token', value: access })
      await Preferences.set({ key: 'refresh_token', value: refresh })
    },

    async carregarTokens() {
      const { value: access }  = await Preferences.get({ key: 'access_token' })
      const { value: refresh } = await Preferences.get({ key: 'refresh_token' })
      this.token = access
      this.refreshToken = refresh
    },

    async logout() {
      this.token = null
      this.refreshToken = null
      await Preferences.remove({ key: 'access_token' })
      await Preferences.remove({ key: 'refresh_token' })
    },
  },
})
```

---

## App Mobile: Interceptor de Refresh Automático

```typescript
// services/api.ts — interceptor de resposta
let renovando = false
let filaEspera: Array<(token: string) => void> = []

api.interceptors.response.use(null, async error => {
  const original = error.config
  if (error.response?.status !== 401 || original._retry) return Promise.reject(error)

  original._retry = true
  const auth = useAuthStore()

  if (renovando) {
    return new Promise(resolve => {
      filaEspera.push(token => {
        original.headers.Authorization = `Bearer ${token}`
        resolve(api(original))
      })
    })
  }

  renovando = true
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      refresh_token: auth.refreshToken,
    })
    await auth.salvarTokens(data.dados.access_token, data.dados.refresh_token)
    filaEspera.forEach(cb => cb(data.dados.access_token))
    filaEspera = []
    original.headers.Authorization = `Bearer ${data.dados.access_token}`
    return api(original)
  } catch {
    await auth.logout()
    return Promise.reject(error)
  } finally {
    renovando = false
  }
})
```

---

## Regras de Segurança

- `JWT_SECRET` mínimo 32 caracteres aleatórios — nunca commitar no git
- Token de acesso: 15 minutos (mobile tolera refresh automático)
- Refresh token: 30 dias, rotacionado a cada uso
- Logout revoga todos os refresh tokens do usuário no banco
- Token nunca em `localStorage` no app mobile — usar `@capacitor/preferences`
- Nunca logar token completo — logar apenas os primeiros 8 caracteres para debug
