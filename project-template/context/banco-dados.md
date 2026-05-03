<!--
BoareDev: Banco de Dados
Schema MySQL, indexes importantes, exceções ao soft-delete.

Exemplo:
## Tabelas Principais
- pacientes: id, nome, cpf_hash, cpf_enc, data_nasc, telefone, ativo, created_at
- medicos: id, nome, crm, especialidade_id, ativo
- agendamentos: id, paciente_id, medico_id, data_hora, status, motivo, created_at

## Indexes
- pacientes(cpf_hash) — busca por CPF
- agendamentos(medico_id, data_hora) — agenda do médico
- agendamentos(paciente_id, status) — histórico do paciente

## Exceções ao Soft-Delete (DELETE físico permitido)
- logs_sistema com mais de 90 dias
- tokens_temp expirados

## Convenções
- Soft delete padrão: ativo = 0 (nunca DELETE)
- Timestamps: created_at (default CURRENT_TIMESTAMP), updated_at
- IDs: INT AUTO_INCREMENT (UUIDs em URLs públicas)
-->
