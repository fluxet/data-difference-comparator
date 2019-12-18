import fs from 'fs';
import diff from '../src';

const dirPath = `${__dirname}/__fixtures__`;
const getDiff = (fileBefore, fileAfter, format) => diff(`${dirPath}/${fileBefore}`, `${dirPath}/${fileAfter}`, format);
const result = fs.readFileSync(`${dirPath}/result`, 'utf-8');
const resultPlain = fs.readFileSync(`${dirPath}/result_plain`, 'utf-8');
const resultJson = fs.readFileSync(`${dirPath}/result_json`, 'utf-8');

test('json', () => {
  expect(getDiff('before.json', 'after.json')).toEqual(result);
});
test('yaml', () => {
  expect(getDiff('before.yml', 'after.yml')).toEqual(result);
});
test('ini', () => {
  expect(getDiff('before.ini', 'after.ini')).toEqual(result);
});
test('show as plain', () => {
  expect(getDiff('before.ini', 'after.ini', 'plain')).toEqual(resultPlain);
});
test('show as json', () => {
  expect(getDiff('before.ini', 'after.ini', 'json')).toEqual(resultJson);
});
