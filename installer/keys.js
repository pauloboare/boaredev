'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const rl = require('readline');

const BOAREDEV_HOME = path.join(os.homedir(), '.boaredev');
const KEYS_FILE     = path.join(BOAREDEV_HOME, 'keys.json');

const PROVIDERS = [
  {
    id:     'gemini',
    label:  'Google Gemini',
    envVar: 'GEMINI_API_KEY',
    skills: ['gemini-explore'],
    hint:   'aistudio.google.com/app/apikey',
  },
  {
    id:     'openrouter',
    label:  'OpenRouter (100+ modelos gratuitos/pagos)',
    envVar: 'OPENROUTER_API_KEY',
    skills: ['gpt-draft'],
    hint:   'openrouter.ai/keys',
  },
  {
    id:     'github',
    label:  'GitHub Token',
    envVar: 'GITHUB_TOKEN',
    skills: [],
    hint:   'github.com/settings/tokens',
  },
];

function loadKeys() {
  if (!fs.existsSync(KEYS_FILE)) return {};
  try { return JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8')); }
  catch { return {}; }
}

function saveKeys(keys) {
  fs.mkdirSync(BOAREDEV_HOME, { recursive: true });
  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2), { encoding: 'utf8', mode: 0o600 });
}

function mask(key) {
  if (!key || key.length < 8) return '****';
  return key.slice(0, 4) + '...' + key.slice(-4);
}

function ask(iface, question) {
  return new Promise(resolve => iface.question(question, resolve));
}

// Returns markdown table of provider status for CLAUDE.md generation
function buildProvidersTable() {
  const keys = loadKeys();
  const rows = PROVIDERS.filter(p => p.skills.length).map(p => {
    const stored = keys[p.id];
    const envVal = process.env[p.envVar];
    const status = stored ? '✓ ok' : envVal ? '~ env' : '✗ não configurado';
    const skills = p.skills.map(s => `\`/${s}\``).join(', ');
    return `| ${p.id} | \`${p.envVar}\` | ${status} | ${skills} |`;
  });
  return [
    '| Provider | Env Var | Status | Skills |',
    '|----------|---------|--------|--------|',
    ...rows,
  ].join('\n');
}

async function manageKeys(subArgs) {
  const [sub, provider] = subArgs;

  // default: list
  if (!sub || sub === 'list') {
    const keys = loadKeys();
    console.log('\nBoareDev — Providers:\n');
    for (const p of PROVIDERS) {
      const stored = keys[p.id];
      const envVal = process.env[p.envVar];
      const status = stored ? `✓ salvo (${mask(stored)})`
                   : envVal  ? `~ via env $${p.envVar}`
                   : '✗ não configurado';
      const skillLine = p.skills.length ? `  skills: ${p.skills.join(', ')}` : '  (sem skill associada)';
      console.log(`  ${p.id.padEnd(14)} ${status}`);
      console.log(`                 ${skillLine}`);
    }
    console.log('');
    console.log('Comandos:');
    console.log('  boaredev keys set [provider]    — definir chave(s)');
    console.log('  boaredev keys remove <provider> — remover chave');
    console.log('  boaredev keys export            — imprimir exports para o shell\n');
    return;
  }

  if (sub === 'export') {
    const keys = loadKeys();
    const lines = PROVIDERS.filter(p => keys[p.id]).map(p => `export ${p.envVar}="${keys[p.id]}"`);
    if (!lines.length) {
      console.log('# Nenhuma chave salva. Use: boaredev keys set');
    } else {
      console.log('# Cole no seu ~/.bashrc ou ~/.zshrc:');
      lines.forEach(l => console.log(l));
      console.log('\n# Ou rode direto:');
      console.log('# npx boaredev keys export >> ~/.bashrc && source ~/.bashrc');
    }
    return;
  }

  if (sub === 'remove') {
    if (!provider) {
      console.log(`Uso: boaredev keys remove <${PROVIDERS.map(p => p.id).join('|')}>`);
      return;
    }
    const keys = loadKeys();
    if (keys[provider]) {
      delete keys[provider];
      saveKeys(keys);
      console.log(`  ✓ ${provider} removido`);
    } else {
      console.log(`  ${provider} não estava configurado`);
    }
    return;
  }

  if (sub === 'set') {
    const targets = provider
      ? PROVIDERS.filter(p => p.id === provider)
      : PROVIDERS;

    if (provider && !targets.length) {
      console.log(`Provider desconhecido: ${provider}`);
      console.log(`Disponíveis: ${PROVIDERS.map(p => p.id).join(', ')}`);
      return;
    }

    const iface = rl.createInterface({ input: process.stdin, output: process.stdout });
    const keys  = loadKeys();

    console.log('\nBoareDev — Configurar chaves de API');
    console.log('Deixe em branco para pular.\n');

    for (const p of targets) {
      const current = keys[p.id] ? ` [atual: ${mask(keys[p.id])}]` : '';
      const ans = (await ask(iface, `  ${p.label} (${p.hint})${current}\n  → `)).trim();
      if (ans) {
        keys[p.id] = ans;
        console.log(`  ✓ ${p.id} salvo\n`);
      }
    }

    saveKeys(keys);
    iface.close();

    console.log('Ativar no shell atual:');
    console.log('  npx boaredev keys export >> ~/.bashrc && source ~/.bashrc\n');
    return;
  }

  console.log('Uso: boaredev keys [set|remove|export|list]');
}

module.exports = { manageKeys, loadKeys, PROVIDERS, buildProvidersTable };
