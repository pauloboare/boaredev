# Template: PRD (Product Requirements Document)

## Informações Gerais

- **Feature**: {{nome_feature}}
- **Data**: {{data}}
- **Autor**: Paulo

## Objetivo

{{Descrição clara do que esta feature resolve e por quê}}

## Personas

| Persona | Relação com a feature |
|---------|----------------------|
| {{persona}} | {{como usa/é afetado}} |

## Regras de Negócio

1. {{RN01}}: {{descrição}}
2. {{RN02}}: {{descrição}}
3. {{RN03}}: {{descrição}}

## Critérios de Aceite

- [ ] {{CA01}}: {{condição verificável}}
- [ ] {{CA02}}: {{condição verificável}}
- [ ] {{CA03}}: {{condição verificável}}

## Restrições

- {{Restrição técnica, legal ou de negócio}}

## Impacto LGPD

- [ ] Coleta dados pessoais? Se sim, quais?
- [ ] Requer consentimento específico?
- [ ] Dados sensíveis (saúde, biometria)?
- [ ] Necessita criptografia em repouso?
- [ ] Precisa de anonimização para exclusão?

## Fora de Escopo

- {{O que explicitamente NÃO faz parte desta feature}}

## Próximos Passos

Após aprovação deste PRD → Gerar Spec Tático (`docs/spec_{{nome}}.md`)
