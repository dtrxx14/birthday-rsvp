export const updateNamesArray = (count, prevArray) => {
  const arr = [...prevArray];
  while (arr.length < count) arr.push("");
  while (arr.length > count) arr.pop();
  return arr;
};
