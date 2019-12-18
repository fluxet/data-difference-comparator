#!/usr/bin/env node

import program from 'commander';
import _ from 'lodash';
import parse from './parse';
import showAsJson from './formatters/showAsJson';
import showAsPlain from './formatters/showAsPlain';

const optToFormatter = {
  plain: showAsPlain,
  json: showAsJson,
};

const diff = (path1, path2, format = 'json') => {
  const objBefore = parse(path1);
  const objAfter = parse(path2);

  const status = {
    del: 'del',
    add: 'add',
    same: 'same',
  };
  const propState = (name, value, stat) => ({ name, value, stat });

  const makeState = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const keysDelited = _.difference(keys1, keys2);
    const keysAdded = _.difference(keys2, keys1);
    const keysCommon = _.difference(keys1, [...keysDelited, ...keysAdded]);

    const propsDelited = keysDelited.map((key) => propState(key, obj1[key], status.del));
    const propsAdded = keysAdded.map((key) => propState(key, obj2[key], status.add));
    const propsCommon = keysCommon.map((key) => {
      if (_.isEqual(obj1[key], obj2[key])) {
        return propState(key, obj1[key], status.same);
      }
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return propState(key, makeState(obj1[key], obj2[key]), status.same);
      }
      return [
        propState(key, obj1[key], status.del),
        propState(key, obj2[key], status.add),
      ];
    });

    return [..._.flatten(propsCommon), ...propsDelited, ...propsAdded];
  };
  return optToFormatter[format](makeState(objBefore, objAfter));
};

program
  .arguments('<firstConfig>, <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const formatPrinted = program.format || 'json';
    console.log(diff(firstConfig, secondConfig, formatPrinted));
  });
program.on('--help', () => {
  console.log('\nCompares two configuration files and shows a difference.');
});
program.parse(process.argv);

export default diff;
