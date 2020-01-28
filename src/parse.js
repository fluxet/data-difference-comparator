import yaml from 'js-yaml';
import ini from 'ini';

const formatsTranslator = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

export default (content, format) => formatsTranslator[format](content);
