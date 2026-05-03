'use strict';

const fs   = require('fs');
const path = require('path');
const rl   = require('readline');

const PKG     = require('../package.json');
const { loadKeys, PROVIDERS, buildProvidersTable } = require('./keys');
const ROOT    = path.join(__dirname, '..');
const CWD     = process.cwd();

// ── helpers ──────────────────────────────────────────────────────────────────

function ask(iface, question) {
  return new Promise(resolve => iface.question(question, resolve));
}

function exists(p) {
  return fs.existsSync(p);
}

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dest) {
  if (exists(dest)) return false;
  mkdirp(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return true;
}

function copyDirRecursive(srcDir, destDir, overwrite = false) {
  if (!exists(srcDir)) return;
  mkdirp(destDir);
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(src, dest, overwrite);
      continue;
    }
    if (!overwrite && exists(dest)) continue;
    mkdirp(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

function renderTemplate(src, vars) {
  let content = fs.readFileSync(src, 'utf8');
  for (const [k, v] of Object.entries(vars)) {
    content = content.replaceAll(`{{${k}}}`, v);
  }
  return content;
}

function writeGenerated(dest, content) {
  if (exists(dest)) {
    const alt = dest + '.boaredev';
    fs.writeFileSync(alt, content, 'utf8');
    console.log(`  ⚠  ${path.relative(CWD, dest)} já existe → criado ${path.relative(CWD, alt)}`);
    console.log(`     Mescle manualmente com o arquivo existente.`);
    return;
  }
  mkdirp(path.dirname(dest));
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`  ✓  ${path.relative(CWD, dest)}`);
}

function log(msg) { console.log(msg); }

// ── tool detection ────────────────────────────────────────────────────────────

function detectTools() {
  const home = require('os').homedir();
  return {
    claude:  exists(path.join(home, '.claude')) || exists(path.join(CWD, '.claude')),
    cursor:  exists(path.join(CWD, '.cursor')) || exists(path.join(CWD, '.cursorrules')),
    copilot: exists(path.join(CWD, '.github')) || exists(path.join(home, '.vscode', 'extensions')),
    gemini:  exists(path.join(CWD, 'GEMINI.md')) || !!process.env.GEMINI_API_KEY,
  };
}

// ── skills copy ───────────────────────────────────────────────────────────────

function copySkillsAsDirectories(targetDir, overwrite = false) {
  const skillsRoot = path.join(ROOT, 'skills');
  if (!exists(skillsRoot)) return [];

  mkdirp(targetDir);
  const copied = [];

  for (const entry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const srcDir = path.join(skillsRoot, entry.name);
    const destDir = path.join(targetDir, entry.name);
    const entrypoint = path.join(srcDir, 'SKILL.md');
    if (!exists(entrypoint)) continue;

    const existed = exists(destDir);
    copyDirRecursive(srcDir, destDir, overwrite);
    if (!existed || overwrite) copied.push(entry.name);
  }
  return copied;
}

// ── context scaffold ──────────────────────────────────────────────────────────

function scaffoldContext(contextDir) {
  const tplDir = path.join(ROOT, 'project-template', 'context');
  if (!exists(tplDir)) return;

  mkdirp(contextDir);
  for (const file of fs.readdirSync(tplDir)) {
    copyFile(path.join(tplDir, file), path.join(contextDir, file));
  }
}

// ── generate tool configs ─────────────────────────────────────────────────────

function generateToolConfigs(tools, vars) {
  const toolsDir = path.join(ROOT, 'tools');

  if (tools.claude) {
    const tpl = path.join(toolsDir, 'claude', 'CLAUDE.md.template');
    if (exists(tpl)) writeGenerated(path.join(CWD, 'CLAUDE.md'), renderTemplate(tpl, vars));
  }
  if (tools.cursor) {
    const tpl = path.join(toolsDir, 'cursor', 'cursorrules.template');
    if (exists(tpl)) writeGenerated(path.join(CWD, '.cursorrules'), renderTemplate(tpl, vars));
  }
  if (tools.copilot) {
    const tpl = path.join(toolsDir, 'copilot', 'copilot-instructions.template');
    if (exists(tpl)) {
      const dest = path.join(CWD, '.github', 'copilot-instructions.md');
      writeGenerated(dest, renderTemplate(tpl, vars));
    }
  }
  if (tools.gemini) {
    const tpl = path.join(toolsDir, 'gemini', 'GEMINI.md.template');
    if (exists(tpl)) writeGenerated(path.join(CWD, 'GEMINI.md'), renderTemplate(tpl, vars));
  }
}

// ── config.toml ───────────────────────────────────────────────────────────────

function writeConfig(boaredevDir, vars, tools) {
  const dest = path.join(boaredevDir, 'config.toml');
  if (exists(dest)) return;

  const lines = [
    `[project]`,
    `name    = "${vars.PROJECT_NAME}"`,
    `stack   = "${vars.STACK}"`,
    `created = "${vars.DATE}"`,
    `boaredev_version = "${PKG.version}"`,
    ``,
    `[tools]`,
    `claude  = ${tools.claude}`,
    `cursor  = ${tools.cursor}`,
    `copilot = ${tools.copilot}`,
    `gemini  = ${tools.gemini}`,
  ];
  mkdirp(boaredevDir);
  fs.writeFileSync(dest, lines.join('\n') + '\n', 'utf8');
  console.log(`  ✓  ${path.relative(CWD, dest)}`);
}

// ── install ───────────────────────────────────────────────────────────────────

async function install() {
  const iface = rl.createInterface({ input: process.stdin, output: process.stdout });

  log(`\nBoareDev v${PKG.version} — instalador\n`);

  const detected = detectTools();
  const detectedList = Object.entries(detected).filter(([,v]) => v).map(([k]) => k);
  log(`Tools detectadas: ${detectedList.length ? detectedList.join(', ') : 'nenhuma'}`);

  const projectName = (await ask(iface, `Nome do projeto [${path.basename(CWD)}]: `)).trim()
    || path.basename(CWD);

  const stackDefault = 'PHP + PDO MySQL + Bootstrap 5 + Vanilla JS';
  const stackInput   = (await ask(iface, `Stack principal [${stackDefault}]: `)).trim();
  const stack        = stackInput || stackDefault;

  log('');
  log('Ativando tools:');
  const tools = {};
  for (const [name, det] of Object.entries(detected)) {
    const ans = (await ask(iface, `  ${name}? [${det ? 'S' : 'n'}]: `)).trim().toLowerCase();
    tools[name] = ans === '' ? det : (ans === 's' || ans === 'y');
  }
  for (const name of ['claude', 'cursor', 'copilot', 'gemini']) {
    if (!(name in tools)) {
      const ans = (await ask(iface, `  ${name}? [n]: `)).trim().toLowerCase();
      tools[name] = ans === 's' || ans === 'y';
    }
  }

  iface.close();

  const vars = {
    PROJECT_NAME:     projectName,
    STACK:            stack,
    DATE:             new Date().toISOString().slice(0, 10),
    VERSION:          PKG.version,
    PROVIDERS_STATUS: buildProvidersTable(),
  };

  log('\nCriando arquivos:');

  const boaredevDir = path.join(CWD, '.boaredev');
  const contextDir  = path.join(boaredevDir, 'context');
  const claudeSkillsDir = path.join(CWD, '.claude', 'skills');
  const sharedSkillsDir = path.join(CWD, '.agents', 'skills');

  writeConfig(boaredevDir, vars, tools);
  scaffoldContext(contextDir);

  const claudeCopied = copySkillsAsDirectories(claudeSkillsDir);
  if (claudeCopied.length) log(`  ✓  .claude/skills/ (${claudeCopied.length} skills)`);

  const sharedCopied = copySkillsAsDirectories(sharedSkillsDir);
  if (sharedCopied.length) log(`  ✓  .agents/skills/ (${sharedCopied.length} skills)`);

  generateToolConfigs(tools, vars);

  log('\nPróximos passos:');
  log(`  1. Preencha os arquivos em .boaredev/context/`);
  log(`  2. Se já tinha CLAUDE.md, mescle com CLAUDE.md.boaredev`);
  log(`  3. Reinicie o Claude Code/VS Code se a pasta .claude/skills/ foi criada agora`);
  log(`  4. Commite: git add .boaredev .claude .agents CLAUDE.md .cursorrules`);
  log(`  5. Pronto — digite / para ver /arquiteto, /dba e outras skills`);

  const storedKeys  = loadKeys();
  const missingKeys = PROVIDERS.filter(p => p.skills.length && !storedKeys[p.id] && !process.env[p.envVar]);
  if (missingKeys.length) {
    log('');
    log('Providers externos não configurados (skills opcionais):');
    for (const p of missingKeys) {
      log(`  ✗ ${p.id.padEnd(12)} → /${p.skills.join(', /')}`);
    }
    log(`  Configure: npx boaredev keys set`);
  }
  log('');
}

// ── update ────────────────────────────────────────────────────────────────────

async function update() {
  log(`\nBoareDev v${PKG.version} — atualizando skills\n`);

  const claudeSkillsDir = path.join(CWD, '.claude', 'skills');
  const sharedSkillsDir = path.join(CWD, '.agents', 'skills');
  if (!exists(claudeSkillsDir) && !exists(sharedSkillsDir)) {
    log('Pastas .claude/skills/ e .agents/skills/ não encontradas. Rode boaredev install primeiro.');
    return;
  }

  let count = 0;
  if (exists(claudeSkillsDir)) {
    count = copySkillsAsDirectories(claudeSkillsDir, true).length;
    log(`  ✓  ${count} skills atualizadas em .claude/skills/`);
  }
  if (exists(sharedSkillsDir)) {
    const sharedCount = copySkillsAsDirectories(sharedSkillsDir, true).length;
    log(`  ✓  ${sharedCount} skills atualizadas em .agents/skills/`);
    count = Math.max(count, sharedCount);
  }
  log('');
}

// ── add-tool ──────────────────────────────────────────────────────────────────

async function addTool(toolName) {
  if (!toolName) {
    log('Uso: boaredev add-tool <claude|cursor|copilot|gemini>');
    return;
  }

  const configPath = path.join(CWD, '.boaredev', 'config.toml');
  if (!exists(configPath)) {
    log('.boaredev/config.toml não encontrado. Rode boaredev install primeiro.');
    return;
  }

  const config  = fs.readFileSync(configPath, 'utf8');
  const name    = path.basename(CWD);
  const stack   = (config.match(/stack\s*=\s*"([^"]+)"/) || [])[1] || '';
  const vars    = { PROJECT_NAME: name, STACK: stack, DATE: new Date().toISOString().slice(0, 10), VERSION: PKG.version, PROVIDERS_STATUS: buildProvidersTable() };
  const tools   = { [toolName]: true, claude: false, cursor: false, copilot: false, gemini: false };

  log(`\nAdicionando ${toolName}:\n`);
  generateToolConfigs(tools, vars);
  log('');
}

module.exports = { install, update, addTool };
