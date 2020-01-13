#!/usr/bin/env node

import program from 'commander';
import gendiff from './gendiff';

program
  .arguments('<firstConfig>, <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const formatPrinted = program.format || 'marker';
    console.log(gendiff(firstConfig, secondConfig, formatPrinted));
  });
program.on('--help', () => {
  console.log('\nCompares two configuration files and shows a difference.');
});
program.parse(process.argv);
