import yaml from 'js-yaml';
import ini from 'ini';

const formatToObj = {
  yaml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

export default (content, format) => formatToObj[format](content);
