#!/usr/bin/env node
'use strict';

const [,, command = 'install', ...args] = process.argv;
const installer = require('../installer');
const keys      = require('../installer/keys');

const commands = {
  install:    () => installer.install(),
  update:     () => installer.update(),
  'add-tool': () => installer.addTool(args[0]),
  keys:       () => keys.manageKeys(args),
};

if (!commands[command]) {
  console.error(`Unknown command: ${command}`);
  console.error('Usage: boaredev [install|update|add-tool|keys]');
  process.exit(1);
}

commands[command]().catch(err => {
  console.error(err.message);
  process.exit(1);
});
