import _ from 'lodash';

const checkVal = (val) => {
  if (_.isPlainObject(val)) { return '[complex value]'; }
  if (typeof (val) === 'string') { return `'${val}'`; }
  return val;
};
const getTemplate = (path, changeStat) => `Property ${path} was ${changeStat}`;
const getDelStr = (path) => getTemplate(path, 'removed');
const getAddStr = (path, val) => `${getTemplate(path, 'added')} with value ${checkVal(val)}`;
const getUpdStr = (path, val1, val2) => `${getTemplate(path, 'updated')}. From ${checkVal(val1)} to ${checkVal(val2)}`;

const showAsPlain = (arr, path = '') => {
  if (!(arr instanceof Array)) { return ''; }

  const propRaws = arr.map(({ name, value, status }) => {
    const newPath = (path) ? `${path}.${name}` : `${name}`;
    const updEl = arr.filter((other) => (other.name === name) && (other.status !== status))[0];

    const statusToStr = {
      same: '',
      container: showAsPlain(value, newPath),
      del: (updEl) ? getUpdStr(newPath, value, updEl.value) : getDelStr(newPath),
      add: (updEl) ? '' : getAddStr(newPath, value),
    };
    return statusToStr[status];
  })
    .filter((el) => el !== '');

  const result = _.flatten(propRaws).join('\n');
  return result;
};

export default showAsPlain;
