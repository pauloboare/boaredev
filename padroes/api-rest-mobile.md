# Padrão: API REST Mobile-Ready (PHP)

## Princípios

- Versionamento obrigatório: `/api/v1/`
- Autenticação: JWT Bearer (não sessão PHP)
- Resposta sempre JSON com envelope padrão
- CORS configurado explicitamente
- Rate limiting por IP e por token

---

## Estrutura de Arquivos

```
api/
└── v1/
    ├── _bootstrap.php      # inclui autoload, CORS, headers, rate limit
    ├── auth/
    │   ├── login.php
    │   ├── refresh.php
    │   └── logout.php
    ├── registros/
    │   ├── criar.php
    │   ├── listar.php
    │   └── detalhar.php
    └── verificar/
        └── hash.php        # endpoint público (sem auth)
```

---

## Bootstrap da API

```php
<?php
// api/v1/_bootstrap.php

require_once __DIR__ . '/../../vendor/autoload.php';

// CORS
$origem_permitida = $_ENV['APP_URL'] ?? '*';
header('Access-Control-Allow-Origin: ' . $origem_permitida);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Rate limiting simples (APCu ou Redis em produção)
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];
$chave = 'rl_' . md5($ip);
$tentativas = apcu_fetch($chave) ?: 0;
if ($tentativas > 60) { // 60 req/min por IP
    responder(429, null, 'Muitas requisições. Tente novamente em breve.');
}
apcu_store($chave, $tentativas + 1, 60);
```

---

## Envelope de Resposta Padrão

```php
<?php
// Sucesso com dados
function responder(int $status, mixed $dados = null, string $mensagem = ''): never
{
    http_response_code($status);
    echo json_encode([
        'sucesso'  => $status < 400,
        'dados'    => $dados,
        'mensagem' => $mensagem,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
```

**Formato de resposta — sucesso:**
```json
{
  "sucesso": true,
  "dados": { ... },
  "mensagem": ""
}
```

**Formato de resposta — erro:**
```json
{
  "sucesso": false,
  "dados": null,
  "mensagem": "Token inválido ou expirado."
}
```

---

## Autenticação JWT em Endpoints Protegidos

```php
<?php
// Sempre no topo de endpoints protegidos
require_once __DIR__ . '/../../_bootstrap.php';
require_once __DIR__ . '/../../../dominio/Auth/JwtService.php';

$token = extrairBearerToken();
$payload = JwtService::validar($token); // lança exceção se inválido
$usuario_id = $payload['sub'];

function extrairBearerToken(): string
{
    $cabecalho = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!str_starts_with($cabecalho, 'Bearer ')) {
        responder(401, null, 'Token não fornecido.');
    }
    return substr($cabecalho, 7);
}
```

---

## Leitura de Body JSON

```php
<?php
function lerBodyJson(): array
{
    $raw = file_get_contents('php://input');
    $dados = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        responder(400, null, 'Body JSON inválido.');
    }
    return $dados ?? [];
}
```

---

## Exemplo de Endpoint Completo

```php
<?php
// api/v1/registros/criar.php

require_once __DIR__ . '/../../_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, null, 'Método não permitido.');
}

$payload  = autenticarRequisicao();           // valida JWT, retorna payload
$usuario_id = $payload['sub'];
$body     = lerBodyJson();

$tipo     = $body['tipo'] ?? null;            // 'entrada' | 'saida' | 'presenca'
$hash     = $body['hash'] ?? null;
$lat      = $body['lat'] ?? null;
$lng      = $body['lng'] ?? null;
$horario  = $body['horario_utc'] ?? null;

if (!$tipo || !$hash || !$horario) {
    responder(422, null, 'Campos obrigatórios ausentes.');
}

$repo   = new RegistroRepositorio();
$resultado = $repo->criar([
    'usuario_id' => $usuario_id,
    'tipo'       => $tipo,
    'hash'       => $hash,
    'lat'        => $lat,
    'lng'        => $lng,
    'horario_utc'=> $horario,
]);

responder(201, $resultado, 'Registro criado.');
```

---

## Versionamento de API

- Sempre usar `/api/v1/` como prefixo
- Ao introduzir breaking changes: criar `/api/v2/` e manter v1 por 90 dias
- Comunicar deprecação via header: `Deprecation: true` e `Sunset: YYYY-MM-DD`
- Nunca alterar a estrutura de resposta de uma versão existente

---

## Checklist de Endpoint

- [ ] Verifica método HTTP correto
- [ ] Inclui `_bootstrap.php`
- [ ] Valida JWT se endpoint protegido (não vale para `/verificar/hash.php`)
- [ ] Valida campos obrigatórios antes de chamar repositório
- [ ] Usa `responder()` para toda saída (nunca `echo` direto)
- [ ] Nunca expõe stack trace em produção (`display_errors = Off`)
- [ ] Campos UUID em URLs públicas (nunca ID sequencial)
