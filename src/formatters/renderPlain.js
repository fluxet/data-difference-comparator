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

const renderAsPlain = (items, path = '') => {
  const raws = items.map(({
    name, value, compositeValueOnTimeline, children, status,
  }) => {
    const newPath = (path) ? `${path}.${name}` : `${name}`;

    if (status === 'parent') {
      return renderAsPlain(children, newPath);
    }
    if (status === 'updated') {
      return getUpdatedRaw(newPath,
        compositeValueOnTimeline.before, compositeValueOnTimeline.after);
    }
    if (status === 'deleted') {
      return getdeletedRaw(newPath);
    }
    if (status === 'added') {
      return getAddedRaw(newPath, value);
    }
    return '';
  });
  return _.flatten(raws).filter((raw) => raw).join('\n');
};

export default renderAsPlain;
