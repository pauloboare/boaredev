<!--
BoareDev: Controle de Acesso
Matriz de permissões por perfil. O que cada papel pode fazer.

Exemplo:
## Perfis
- admin: acesso total
- recepcionista: agenda, pacientes, relatórios básicos
- medico: visualiza própria agenda, registra atendimentos
- paciente: (futuro) agenda própria

## Matriz de Permissões
| Módulo          | admin | recepcionista | medico | paciente |
|-----------------|-------|---------------|--------|----------|
| Pacientes       | CRUD  | CRUD          | R      | -        |
| Agendamentos    | CRUD  | CRUD          | R/U    | -        |
| Médicos         | CRUD  | R             | R      | -        |
| Relatórios      | tudo  | básicos       | -      | -        |

## Implementação
- Sessão PHP + tabela perfis + guard middleware
- Verificação: Guard::checar('recepcionista') no topo de cada módulo
-->
