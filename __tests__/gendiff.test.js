import fs from 'fs';
import diff from '../src/gendiff';

const dirPath = `${__dirname}/__fixtures__`;
const getDiff = (fileBefore, fileAfter) => diff(`${dirPath}/${fileBefore}`, `${dirPath}/${fileAfter}`);
const result = fs.readFileSync(`${dirPath}/result`, 'utf-8');

test('json', () => {
  expect(getDiff('before.json', 'after.json')).toEqual(result);
});
test('yaml', () => {
  expect(getDiff('before.yml', 'after.yml')).toEqual(result);
});
test('ini', () => {
  expect(getDiff('before.ini', 'after.ini')).toEqual(result);
});
