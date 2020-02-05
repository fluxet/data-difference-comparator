import _ from 'lodash';

const spaceNumber = 4;
const tab0 = ' '.repeat(spaceNumber);

const marker = {
  plus: '  + ',
  minus: '  - ',
  empty: tab0,
};

const renderObj = (val, depth) => {
  const newValue = JSON.stringify(val, null, spaceNumber)
    .split('"').join('').split('\n')
    .join(`\n${tab0.repeat(depth + 1)}`);
  return newValue;
};

const renderValue = (val, depth) => ((_.isPlainObject(val)) ? renderObj(val, depth) : val);

const renderList = (list, depth = 0) => {
  const tab = tab0.repeat(depth);
  const renderItem = ({
    name, value, children, status, compositeValueOnTimeline,
  }) => {
    const getTemplate = (mark, val) => `${tab}${mark}${name}: ${val}`;

    switch (status) {
      case 'added': return getTemplate(marker.plus, renderValue(value, depth));
      case 'deleted': return getTemplate(marker.minus, renderValue(value, depth));
      case 'same': return getTemplate(marker.empty, renderValue(value, depth));
      case 'updated': return `${getTemplate(marker.minus, renderValue(compositeValueOnTimeline.before, depth))}\n${getTemplate(marker.plus, renderValue(compositeValueOnTimeline.after, depth))}`;
      case 'parent': return `${tab}${marker.empty}${name}: ${renderList(children, depth + 1)}`;
      default: throw new Error(`${name}: unknown status "${status}"`);
    }
  };
  const raws = list.map((item) => renderItem(item));
  return `{\n${raws.join('\n')}\n${tab}}`;
};

export default renderList;
