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
    name, value, children, status,
  }) => {
    const getTemplate = (mark, val) => `\n${tab}${mark}${name}: ${val}`;

    switch (status) {
      case 'added': return getTemplate(marker.plus, renderValue(value, tab));
      case 'delited': return getTemplate(marker.minus, renderValue(value, tab));
      case 'same': return getTemplate(marker.empty, renderValue(value, tab));
      case 'updated': return `${getTemplate(marker.minus, renderValue(value.before, tab))}${getTemplate(marker.plus, renderValue(value.after, tab))}`;
      default: return `\n${tab}${marker.empty}${name}: ${renderList(children, `${tab0}${tab}`)}`;
    }
  };

  const raws = list.map((item) => renderItem(item, tab));
  return `{${raws.join('')}\n${tab}}`;
};

export default renderList;
