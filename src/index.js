#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';
import _ from 'lodash';
import parse from './parse';
import render from './formatters';

const prepareData = (filePath) => [fs.readFileSync(filePath, 'utf-8'), path.extname(filePath).slice(1)];

const gendiff = (path1, path2, format = 'marker') => {
  const objectBefore = parse(...prepareData(path1));
  const objectAfter = parse(...prepareData(path2));

  const statusDictionary = {
    delited: 'delited',
    added: 'added',
    same: 'same',
    container: 'container',
  };
  const setStateItem = (name, value, status) => ({ name, value, status });

  const makeState = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    const allKeys = _.union(keys1, keys2);
    const stateItems = allKeys.map((key) => {
      const value1 = object1[key];
      const value2 = object2[key];

      if (!_.has(object2, key)) {
        return setStateItem(key, value1, statusDictionary.delited);
      }
      if (!_.has(object1, key)) {
        return setStateItem(key, value2, statusDictionary.added);
      }
      if (_.isEqual(value1, value2)) {
        return setStateItem(key, value1, statusDictionary.same);
      }
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return setStateItem(key, makeState(value1, value2), statusDictionary.container);
      }
      return [
        setStateItem(key, value1, statusDictionary.delited),
        setStateItem(key, value2, statusDictionary.added),
      ];
    });
    return _.flatten(stateItems);
  };
  return render(format)(makeState(objectBefore, objectAfter));
};

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

export default gendiff;
