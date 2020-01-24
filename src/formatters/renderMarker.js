import _ from 'lodash';

const spaceNumber = 4;
const tab0 = ' '.repeat(spaceNumber);

const marker = {
  plus: '  + ',
  minus: '  - ',
  empty: tab0,
};

const renderObj = (val, tab) => {
  const newValue = JSON.stringify(val, null, spaceNumber)
    .split('"').join('').split('\n')
    .join(`\n${tab0}${tab}`);
  return newValue;
};

const renderValue = (val, tab) => ((_.isPlainObject(val)) ? renderObj(val, tab) : val);

const renderList = (list, tab = '') => {
  const renderItem = ({
    name, value, children, status, compositeValueOnTimeline,
  }) => {
    const getTemplate = (mark, val) => `${tab}${mark}${name}: ${val}`;

    if (status === 'added') {
      return getTemplate(marker.plus, renderValue(value, tab));
    }
    if (status === 'deleted') {
      return getTemplate(marker.minus, renderValue(value, tab));
    }
    if (status === 'same') {
      return getTemplate(marker.empty, renderValue(value, tab));
    }
    if (status === 'updated') {
      return `${getTemplate(marker.minus, renderValue(compositeValueOnTimeline.before, tab))}\n${getTemplate(marker.plus, renderValue(compositeValueOnTimeline.after, tab))}`;
    }
    if (status === 'parent') {
      return `${tab}${marker.empty}${name}: ${renderList(children, `${tab0}${tab}`)}`;
    }
    return '';
  };

  const raws = list.map((item) => renderItem(item, tab));
  return `{\n${raws.join('\n')}\n${tab}}`;
};

export default renderList;
