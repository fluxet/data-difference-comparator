const spaceNumber = 4;
const modifyState = (arr) => arr.map((el) => ((el.status === 'container')
  ? { name: el.name, value: modifyState(el.value) }
  : el));

export default (state) => JSON.stringify(modifyState(state), null, spaceNumber);
