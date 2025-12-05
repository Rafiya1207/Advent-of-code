const doesHaveOnlyDoublePair = (string) => {
  for (const char of string) {
    if ((string.indexOf(char) - string.lastIndexOf(char)) === -1) {
      return true;
    }
  }
  return false;
};

const main = () => {
  const possiblePasswords = [];
  for (let i = 245182; i <= 790572; i++) {
    if (doesHaveOnlyDoublePair(i + "")) {
      const sortedNumber = parseInt([...i.toString()].sort().join(""));

      if (sortedNumber === i) {
        possiblePasswords.push(i);
      }
    }
  }
  return possiblePasswords.length;
};

console.log(main());
