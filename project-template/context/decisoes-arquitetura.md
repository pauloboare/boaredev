<!--
BoareDev: Decisões de Arquitetura (ADRs simplificados)
Registre decisões importantes e o MOTIVO. Isso evita regressões.

Formato: Data · Decisão · Motivo

Exemplo:
## 2024-03-15 · PHP procedural + DDD light, sem framework
Motivo: domínio pequeno, equipe solo, overhead de framework > benefício.
Impacto: estrutura modulos/ com Service + Repository por feature.

## 2024-03-20 · PDO com prepared statements, sem ORM
Motivo: controle total das queries, sem magic SQL.

## 2024-04-01 · CPF armazenado em duas colunas (hash + enc)
Motivo: LGPD — busca via HMAC-SHA256, exibição via AES-256-CBC decrypt.

## 2024-04-10 · Soft delete (ativo=0) como padrão global
Motivo: auditoria e rastreabilidade. Exceções documentadas em banco-dados.md.
-->
