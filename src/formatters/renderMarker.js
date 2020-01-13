const spaceNumber = 4;
const tab0 = ' '.repeat(spaceNumber);
const statusToMarker = {
  delited: '  - ',
  added: '  + ',
  origin: '  - ',
  updated: '  + ',
  same: tab0,
  container: tab0,
};

const customStringify = (val, tab) => {
  const newValue = JSON.stringify(val, null, spaceNumber)
    .split('"').join('').split('\n')
    .join(`\n${tab0}${tab}`);
  return newValue;
};

const printLikeObject = (content, tab = '') => `{${content}\n${tab}}`;

const renderState = (items, depth = 0) => {
  const tab = ' '.repeat(depth * spaceNumber);
  const valFromContainer = (val, indent) => printLikeObject(renderState(val, depth + 1), `${tab0}${indent}`);

  return items.map(({ name, value, status }) => {
    const isContainer = status === 'container';
    const valueRendered = (isContainer)
      ? valFromContainer(value, tab)
      : customStringify(value, tab);
    return `\n${tab}${statusToMarker[status]}${name}: ${valueRendered}`;
  }).join('');
};

export default (state) => printLikeObject(renderState(state));
