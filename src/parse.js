import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const extToObj = {
  '.yml': (str) => yaml.safeLoad(str),
  '.json': (str) => JSON.parse(str),
  '.ini': (str) => ini.parse(str),
};

export default (filePath) => {
  const ext = path.extname(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  return extToObj[ext](content);
};
