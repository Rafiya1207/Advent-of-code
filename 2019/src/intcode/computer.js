export const createComputer = (program, relativeBase, overrides = []) => ({
  program,
  currentPosition: 0,
  isHalted: false,
  overrides,
  outputs: [],
  inputs: [2],
  relativeBase
});

export const parse = (input) => input.split(",").map((x) => parseInt(x));

export const applyOverrides = ({ program, overrides }) => {
  overrides.forEach((override) => program[override[0]] = override[1]);
};
