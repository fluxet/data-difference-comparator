import _ from 'lodash';

const renderValue = (val) => {
  if (_.isPlainObject(val)) { return '[complex value]'; }
  if (typeof (val) === 'string') { return `'${val}'`; }
  return val;
};
const getTemplate = (path, typeOfChange) => `Property ${path} was ${typeOfChange}`;
const getDelitedRaw = (path) => getTemplate(path, 'removed');
const getAddedRaw = (path, val) => `${getTemplate(path, 'added')} with value ${renderValue(val)}`;
const getUpdatedRaw = (path, val1, val2) => `${getTemplate(path, 'updated')}. From ${renderValue(val1)} to ${renderValue(val2)}`;

const renderAsPlain = (items, path = '') => {
  const raws = items.map(({
    name, value, children, status,
  }) => {
    const newPath = (path) ? `${path}.${name}` : `${name}`;

    switch (status) {
      case 'parent': return renderAsPlain(children, newPath);
      case 'updated': return getUpdatedRaw(newPath, value.before, value.after);
      case 'delited': return getDelitedRaw(newPath);
      case 'added': return getAddedRaw(newPath, value);
      default: return '';
    }
  });
  return _.flatten(raws).filter((raw) => raw).join('\n');
};

export default renderAsPlain;
