import fs from 'fs';
import diff from '../src/gendiff';

test('gendiff', () => {
  expect(diff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`))
    .toEqual(fs.readFileSync(`${__dirname}/__fixtures__/result`, 'utf-8'));
});
