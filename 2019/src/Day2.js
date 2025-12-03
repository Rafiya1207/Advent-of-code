const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const operationMap  = {
  1: add,
  2: multiply
}

export const executeInstructions = (instructions) => {
  const position = 0;
  const opcode = instructions[position];
  const input1Location = instructions[position + 1];
  const input2Location = instructions[position + 2];
  const outputLocation = instructions[position + 3];

  instructions[outputLocation] = operationMap[opcode](
    instructions[input1Location],
    instructions[input2Location],
  );
  return instructions;
};
