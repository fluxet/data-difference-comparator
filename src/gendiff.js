#!/usr/bin/env node

import program from 'commander';
import _ from 'lodash';
import parse from './parse';

const diff = (path1, path2) => {
  const obj1 = parse(path1);
  const obj2 = parse(path2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const propStr = (obj, key, pre) => ` ${pre} ${key} : ${obj[key]}\n`;

  const keysDelited = _.difference(keys1, keys2);
  const keysAdded = _.difference(keys2, keys1);
  const keysCommon = _.difference(keys1, [...keysDelited, ...keysAdded]);

  const propsDelited = keysDelited.map((key) => propStr(obj1, key, '-'));
  const propsAdded = keysAdded.map((key) => propStr(obj2, key, '+'));
  const propsCommon = keysCommon.map((key) => {
    const result = (obj1[key] === obj2[key])
      ? propStr(obj1, key, ' ')
      : `${propStr(obj1, key, '-')}${propStr(obj2, key, '+')}`;
    return result;
  });
  return `{\n${[...propsCommon, ...propsDelited, ...propsAdded].join('')}}`;
};

program
  .arguments('<firstConfig>, <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => console.log(diff(firstConfig, secondConfig)));
program.on('--help', () => {
  console.log('\nCompares two configuration files and shows a difference.');
});
program.parse(process.argv);

export default diff;
