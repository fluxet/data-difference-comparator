import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import process from 'process';
import parse from './parse';
import render from './formatters';

const getContent = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getExt = (filePath) => path.extname(filePath).slice(1);

const gendiff = (path1, path2, format = 'marker') => {
  const objectBefore = parse(getContent(path1), getExt(path1));
  const objectAfter = parse(getContent(path2), getExt(path2));

  const statusDictionary = {
    delited: 'delited',
    added: 'added',
    same: 'same',
    container: 'container',
    origin: 'origin',
    updated: 'updated',
  };
  const buildStateItem = (name, value, status) => ({ name, value, status });

  const makeState = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    const allKeys = _.union(keys1, keys2);
    const stateItems = allKeys.map((key) => {
      const value1 = object1[key];
      const value2 = object2[key];

      if (!_.has(object2, key)) {
        return buildStateItem(key, value1, statusDictionary.delited);
      }
      if (!_.has(object1, key)) {
        return buildStateItem(key, value2, statusDictionary.added);
      }
      if (_.isEqual(value1, value2)) {
        return buildStateItem(key, value1, statusDictionary.same);
      }
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return buildStateItem(key, makeState(value1, value2), statusDictionary.container);
      }
      return [
        buildStateItem(key, value1, statusDictionary.origin),
        buildStateItem(key, value2, statusDictionary.updated),
      ];
    });
    return _.flatten(stateItems);
  };
  return render(format)(makeState(objectBefore, objectAfter));
};

export default gendiff;
