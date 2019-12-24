import renderJson from './renderJson';
import renderPlain from './renderPlain';
import renderDefault from './renderDefault';

const formattersDict = {
  plain: renderPlain,
  json: renderJson,
  default: renderDefault,
};

export default (format) => formattersDict[format];
