# Padrão de Segurança e LGPD

## Segurança de Aplicação

### Autenticação
- Sessão PHP nativa para apps web internas (não JWT)
- `password_hash()` com BCRYPT para senhas
- Controle de acesso: `exigirPermissao('modulo', 'acao')`
- Credentials em `.env`, nunca hardcoded

### Banco de Dados
- PDO com prepared statements e placeholders nomeados — **sem exceção**
- Nunca concatenar input do usuário em SQL
- Conexão Singleton: `Connection::getInstance()`

### Input/Output
- Sanitizar todo input do usuário
- Escapar output para prevenir XSS
- Validar tipos, formatos e ranges no servidor (não confiar no frontend)

### Sessão
- Regenerar session ID após login
- Timeout de inatividade configurável
- Destruir sessão completa no logout

## LGPD (Lei 13.709/2018)

LGPD deve ser tratada desde a modelagem em qualquer projeto com dado pessoal.

### Criptografia em Repouso
- Dados sensíveis: **AES-256-CBC**
- Campos de busca: **HMAC-SHA256** one-way
- Nunca descriptografar em loop para comparar

### Exclusão de Dados
- Solicitação do titular: **anonimização** (`[ANONIMIZADO]`)
- Nunca DELETE físico de dados pessoais
- Soft delete com `ativo = 0` para dados de negócio

### Consentimento
- Registrado com **data e IP** no momento do cadastro
- Tabela dedicada de consentimentos
- Granular por finalidade (ex: marketing, comunicação, saúde)

### URLs e Identificadores
- URLs públicas com dados pessoais: **UUID**
- Nunca ID numérico sequencial em URLs públicas
- Tokens de acesso temporários para links sensíveis

### Log e Auditoria
- `registrarLog()` para operações críticas
- Trilha de auditoria para acesso a dados sensíveis
- Retenção de logs conforme política definida por projeto
