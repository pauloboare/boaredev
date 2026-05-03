# Padrão de Frontend

## Stack

- **Bootstrap 5** para sistemas administrativos
- **CSS Custom** com variáveis CSS para sistemas específicos (kiosk, totem)
- **Vanilla JS ES6+** — sem jQuery, Vue, React, Angular

## Estrutura de Assets

```
assets/
├── css/
│   ├── style.css          # Estilos globais do projeto
│   └── modulo-nome.css    # Estilos específicos por módulo
├── js/
│   ├── app.js             # JS global
│   └── modulo-nome.js     # JS específico por módulo
└── images/
```

## JavaScript

### Padrões
- ES6+ modules quando possível
- `const` por padrão, `let` quando necessário, nunca `var`
- Arrow functions para callbacks
- Template literals para interpolação
- Destructuring para parâmetros
- `fetch()` para requisições (não XMLHttpRequest, não $.ajax)

### Organização
- Um arquivo JS por módulo/funcionalidade
- Event listeners em `DOMContentLoaded`
- Funções nomeadas (não anônimas) para facilitar debug

## Regra de UI

- Reutilizar componentes de `includes/components/` antes de criar novos
- Formularios: labels obrigatorios e validacao no backend
