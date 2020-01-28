import _ from 'lodash';

const renderValue = (val) => {
  if (_.isPlainObject(val)) { return '[complex value]'; }
  if (typeof (val) === 'string') { return `'${val}'`; }
  return val;
};
const getTemplate = (path, typeOfChange) => `Property ${path} was ${typeOfChange}`;
const getdeletedRaw = (path) => getTemplate(path, 'removed');
const getAddedRaw = (path, val) => `${getTemplate(path, 'added')} with value ${renderValue(val)}`;
const getUpdatedRaw = (path, val1, val2) => `${getTemplate(path, 'updated')}. From ${renderValue(val1)} to ${renderValue(val2)}`;
const getUnexpectedRaw = (path, status) => `${path} has unexpected status ${status}`;

const renderAsPlain = (items, path = '') => {
  const raws = items.map(({
    name, value, compositeValueOnTimeline, children, status,
  }) => {
    const newPath = (path) ? `${path}.${name}` : `${name}`;

    switch (status) {
      case 'parent':
        return renderAsPlain(children, newPath);
      case 'updated':
        return getUpdatedRaw(newPath,
          compositeValueOnTimeline.before, compositeValueOnTimeline.after);
      case 'deleted':
        return getdeletedRaw(newPath);
      case 'added':
        return getAddedRaw(newPath, value);
      case 'same':
        return '';
      default:
        return getUnexpectedRaw(newPath, status);
    }
  });
  return _.flatten(raws).filter((raw) => raw).join('\n');
};

export default renderAsPlain;
