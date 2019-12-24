import fs from 'fs';
import diff from '../src';

const dirPath = `${__dirname}/__fixtures__`;
const getDiff = (fileBefore, fileAfter, format) => diff(`${dirPath}/${fileBefore}`, `${dirPath}/${fileAfter}`, format);
let diffDefaultFormat;
let diffPlainFormat;
let diffJsonFormat;

beforeEach(() => {
  diffDefaultFormat = fs.readFileSync(`${dirPath}/diffDefaultFormat`, 'utf-8');
  diffPlainFormat = fs.readFileSync(`${dirPath}/diffPlainFormat`, 'utf-8');
  diffJsonFormat = fs.readFileSync(`${dirPath}/diffJsonFormat`, 'utf-8');
});

test('json', () => {
  expect(getDiff('before.json', 'after.json')).toEqual(diffDefaultFormat);
});
test('yaml', () => {
  expect(getDiff('before.yml', 'after.yml')).toEqual(diffDefaultFormat);
});
test('ini', () => {
  expect(getDiff('before.ini', 'after.ini')).toEqual(diffDefaultFormat);
});
test('render as plain', () => {
  expect(getDiff('before.ini', 'after.ini', 'plain')).toEqual(diffPlainFormat);
});
test('render as json', () => {
  expect(getDiff('before.ini', 'after.ini', 'json')).toEqual(diffJsonFormat);
});
