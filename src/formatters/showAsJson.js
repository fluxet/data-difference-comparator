const spaceNumber = 4;
const modifyState = (arr) => arr.map((el) => ((el.value instanceof Array)
  ? { name: el.name, value: modifyState(el.value) }
  : el));

export default (state) => JSON.stringify(modifyState(state), null, spaceNumber);
