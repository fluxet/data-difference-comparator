import renderPlain from './renderPlain';
import renderMarker from './renderMarker';

const formattersDictionary = {
  plain: renderPlain,
  json: JSON.stringify,
  marker: renderMarker,
};

export default (format) => formattersDictionary[format];
