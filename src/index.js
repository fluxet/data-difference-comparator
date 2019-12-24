#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';
import _ from 'lodash';
import parse from './parse';
import render from './formatters';


const prepareData = (filePath) => {
  const extToFormat = {
    '.yml': 'yaml',
    '.json': 'json',
    '.ini': 'ini',
  };
  return [fs.readFileSync(filePath, 'utf-8'), extToFormat[path.extname(filePath)]];
};

const gendiff = (path1, path2, format = 'default') => {
  const objBefore = parse(...prepareData(path1));
  const objAfter = parse(...prepareData(path2));

  const statusDict = {
    del: 'del',
    add: 'add',
    same: 'same',
    container: 'container',
  };
  const propState = (name, value, status) => ({ name, value, status });

  const makeState = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const keysDelited = _.difference(keys1, keys2);
    const keysAdded = _.difference(keys2, keys1);
    const keysCommon = _.intersection(keys1, keys2);

    const propsDelited = keysDelited.map((key) => propState(key, obj1[key], statusDict.del));
    const propsAdded = keysAdded.map((key) => propState(key, obj2[key], statusDict.add));
    const propsCommon = keysCommon.map((key) => {
      if (_.isEqual(obj1[key], obj2[key])) {
        return propState(key, obj1[key], statusDict.same);
      }
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return propState(key, makeState(obj1[key], obj2[key]), statusDict.container);
      }
      return [
        propState(key, obj1[key], statusDict.del),
        propState(key, obj2[key], statusDict.add),
      ];
    });

    return [..._.flatten(propsCommon), ...propsDelited, ...propsAdded];
  };
  return render(format)(makeState(objBefore, objAfter));
};

program
  .arguments('<firstConfig>, <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const formatPrinted = program.format || 'default';
    console.log(gendiff(firstConfig, secondConfig, formatPrinted));
  });
program.on('--help', () => {
  console.log('\nCompares two configuration files and shows a difference.');
});
program.parse(process.argv);

export default gendiff;
