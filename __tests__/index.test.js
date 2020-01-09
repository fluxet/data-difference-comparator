import fs from 'fs';
import diff from '../src/gendiff';

const dirPath = `${__dirname}/__fixtures__`;
const getDiff = (fileBefore, fileAfter, format) => diff(`${dirPath}/${fileBefore}`, `${dirPath}/${fileAfter}`, format);
let diffMarkerFormat;
let diffPlainFormat;
let diffJsonFormat;

beforeEach(() => {
  diffMarkerFormat = fs.readFileSync(`${dirPath}/diffMarkerFormat`, 'utf-8');
  diffPlainFormat = fs.readFileSync(`${dirPath}/diffPlainFormat`, 'utf-8');
  diffJsonFormat = fs.readFileSync(`${dirPath}/diffJsonFormat`, 'utf-8');
});

test('json', () => {
  expect(getDiff('before.json', 'after.json')).toEqual(diffMarkerFormat);
});
test('yaml', () => {
  expect(getDiff('before.yml', 'after.yml')).toEqual(diffMarkerFormat);
});
test('ini', () => {
  expect(getDiff('before.ini', 'after.ini')).toEqual(diffMarkerFormat);
});
test('render as plain', () => {
  expect(getDiff('before.ini', 'after.ini', 'plain')).toEqual(diffPlainFormat);
});
test('render as json', () => {
  expect(getDiff('before.ini', 'after.ini', 'json')).toEqual(diffJsonFormat);
});
