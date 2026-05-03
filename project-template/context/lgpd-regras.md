<!--
BoareDev: Regras LGPD
Mapeie dados sensíveis, como são tratados e direitos dos titulares.

Exemplo:
## Dados Pessoais Coletados
| Campo | Tabela | Tratamento | Finalidade |
|-------|--------|-----------|------------|
| CPF | pacientes | AES-256-CBC (cpf_enc) + HMAC (cpf_hash) | Identificação |
| Nome | pacientes | plaintext | Atendimento |
| Data nasc | pacientes | plaintext | Verificação idade |
| Telefone | pacientes | plaintext | Contato |

## Criptografia
- CPF: openssl_encrypt(cpf, 'AES-256-CBC', APP_KEY)
- Busca por CPF: hash_hmac('sha256', cpf, HMAC_KEY)
- Chaves em .env (nunca commitadas)

## Direitos do Titular
- Consulta: endpoint /paciente/meus-dados
- Exclusão: anonimização (não delete físico) via /paciente/excluir-conta
- Portabilidade: export JSON via /paciente/exportar

## Consentimento
- Coletado no cadastro, registrado em tabela consentimentos
- Campos: paciente_id, tipo, aceito_em, ip, user_agent
-->
