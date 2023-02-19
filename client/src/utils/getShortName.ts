const getShortName = (name: string, maxLen: number): string => {
  const splitName = name.split(" ");
  const initValue = "";

  const result = splitName.reduce((accumulator, currentValue) => {
    if (accumulator.length <= maxLen) {
      accumulator+=` ${currentValue}`;
      return accumulator;
    }
    return accumulator;
  }, initValue);

  return result;
};

export default getShortName;

/*
const cutName = (name: string, maxSpaces: number) => {
  return name.split(" ").length > maxSpaces
    ? name.split(" ").slice(0, 3).join(" ") + "..."
    : name;
};
*/
