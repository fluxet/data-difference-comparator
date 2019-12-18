const spaceNumber = 4;
const tab0 = ' '.repeat(spaceNumber);
const statusToStr = { del: '  - ', add: '  + ', same: tab0 };

const customStringify = (val, tab) => {
  const newVal = JSON.stringify(val, null, spaceNumber)
    .split('"').join('').split('\n')
    .join(`\n${tab0}${tab}`);
  return newVal;
};
const printLikeObj = (content, tab = '') => `{${content}\n${tab}}`;

const renderState = (arr, depth = 0) => {
  const tab = ' '.repeat(depth * spaceNumber);
  const valFromArr = (val, indent) => printLikeObj(renderState(val, depth + 1), `${tab0}${indent}`);

  return arr.map(({ name, value, stat }) => {
    const isArr = value instanceof Array;
    const propValue = (isArr) ? valFromArr(value, tab) : customStringify(value, tab);
    return `\n${tab}${statusToStr[stat]}${name}: ${propValue}`;
  }).join('');
};

export default (state) => printLikeObj(renderState(state));
