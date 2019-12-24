const spaceNumber = 4;
const tab0 = ' '.repeat(spaceNumber);
const statusToStr = {
  del: '  - ', add: '  + ', same: tab0, container: tab0,
};

const customStringify = (val, tab) => {
  const newVal = JSON.stringify(val, null, spaceNumber)
    .split('"').join('').split('\n')
    .join(`\n${tab0}${tab}`);
  return newVal;
};
const printLikeObj = (content, tab = '') => `{${content}\n${tab}}`;

const renderState = (arr, depth = 0) => {
  const tab = ' '.repeat(depth * spaceNumber);
  const valFromContainer = (val, indent) => printLikeObj(renderState(val, depth + 1), `${tab0}${indent}`);

  return arr.map(({ name, value, status }) => {
    const isContainer = status === 'container';
    const propValue = (isContainer) ? valFromContainer(value, tab) : customStringify(value, tab);
    return `\n${tab}${statusToStr[status]}${name}: ${propValue}`;
  }).join('');
};

export default (state) => printLikeObj(renderState(state));
