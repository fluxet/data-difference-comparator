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
  const set = new Set();
  const newArr = [];
  arr.forEach(({ name, value, status }) => {
    let newVal = '';
    const newPath = (path) ? `${path}.${name}` : `${name}`;
    const updEl = arr.filter((other) => (other.name === name) && (other.status !== status))[0];
    if (value instanceof Array) {
      newVal = showAsPlain(value, newPath);
    } else if (updEl) {
      newVal = (status === 'del') ? getUpdStr(newPath, value, updEl.value) : getUpdStr(newPath, updEl.value, value);
    } else if (status === 'del') {
      newVal = getDelStr(newPath);
    } else if (status === 'add') {
      newVal = getAddStr(newPath, value);
    } else if (status === 'same') {
      return;
    }
    set.add(newVal);
  });
  set.forEach((el) => newArr.push(el));
  return _.flatten(newArr).join('\n');
};

export default showAsPlain;
