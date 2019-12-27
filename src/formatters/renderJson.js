const spaceNumber = 4;
const modifyState = (items) => items.map((item) => ((item.status === 'container')
  ? { name: item.name, value: modifyState(item.value) }
  : item));

export default (state) => JSON.stringify(modifyState(state), null, spaceNumber);
