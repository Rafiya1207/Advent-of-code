export const createComputer = (program, overrides = []) => ({
  program,
  currentPosition: 0,
  isHalted: false,
  overrides,
  outputs: [],
  inputs: []
});

export const parse = (input) => input.split(",").map((x) => parseInt(x));

export const applyOverrides = ({ program, overrides }) => {
  overrides.forEach((override) => program[override[0]] = override[1]);
};
