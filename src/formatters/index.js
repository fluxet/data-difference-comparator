import renderJson from './renderJson';
import renderPlain from './renderPlain';
import renderMarker from './renderMarker';

const formattersDictionary = {
  plain: renderPlain,
  json: renderJson,
  marker: renderMarker,
};

export default (format) => formattersDictionary[format];
