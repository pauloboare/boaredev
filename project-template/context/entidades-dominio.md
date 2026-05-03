<!--
BoareDev: Entidades do Domínio (DDD light)
Liste entidades, aggregates, value objects e relacionamentos.

Exemplo:
## Entities
- Paciente (aggregate root): id, nome, cpf_hash, data_nasc, ativo
- Medico: id, nome, crm, especialidade_id, ativo
- Agendamento (aggregate root): id, paciente_id, medico_id, data_hora, status, motivo

## Value Objects
- StatusAgendamento: PENDENTE | CONFIRMADO | CANCELADO | REALIZADO | FALTA

## Relacionamentos
- Paciente 1---N Agendamento
- Medico 1---N Agendamento
- Especialidade 1---N Medico
-->
