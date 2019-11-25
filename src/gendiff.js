#!/usr/bin/env node

const program = require('commander');

program
  .arguments('<firstConfig>, <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format');

program.on('--help', () => {
  console.log('\nCompares two configuration files and shows a difference.');
});

program.parse(process.argv);
