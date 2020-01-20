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
  const raws = [];

  const renderItem = ({
    name, value, compositeValueOnTimeline, children, status,
  }) => {
    const getTemplate = (mark, val) => `\n${tab}${mark}${name}: ${val}`;

    switch (status) {
      case 'added':
        raws.push(getTemplate(marker.plus, renderValue(value, tab)));
        break;
      case 'delited':
        raws.push(getTemplate(marker.minus, renderValue(value, tab)));
        break;
      case 'same':
        raws.push(getTemplate(marker.empty, renderValue(value, tab)));
        break;
      case 'updated':
        raws.push(`${getTemplate(marker.minus, renderValue(compositeValueOnTimeline.before, tab))}${getTemplate(marker.plus, renderValue(compositeValueOnTimeline.after, tab))}`);
        break;
      case 'parent':
        raws.push(`\n${tab}${marker.empty}${name}: ${renderList(children, `${tab0}${tab}`)}`);
        break;
      default: break;
    }
  };

  list.forEach((item) => renderItem(item, tab));
  const strFromList = raws.join('');
  return `{${strFromList}\n${tab}}`;
};

export default renderList;
