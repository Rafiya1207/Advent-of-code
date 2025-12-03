const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const operationMap = {
  1: add,
  2: multiply,
};

export const executeInstructions = (instructions) => {
  let position = 0;

  while (instructions[position] != 99) {
    const opcode = instructions[position];
    const input1Location = instructions[position + 1];
    const input2Location = instructions[position + 2];
    const outputLocation = instructions[position + 3];

    instructions[outputLocation] = operationMap[opcode](
      instructions[input1Location],
      instructions[input2Location],
    );
    position += 4;
  }

  return instructions;
};

export const puzzle2 = (instructions) => {
  let initialInstructions = instructions.map((x) => x);

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      initialInstructions[1] = noun;
      initialInstructions[2] = verb;
      const executedIns = executeInstructions(initialInstructions);
      if (executedIns[0] === 19690720) {
        return 100 * noun + verb;
      }
      initialInstructions = instructions.map((x) => x);
    }
  }
};

console.log(
  puzzle2([
    1,
    0,
    0,
    3,
    1,
    1,
    2,
    3,
    1,
    3,
    4,
    3,
    1,
    5,
    0,
    3,
    2,
    6,
    1,
    19,
    1,
    5,
    19,
    23,
    1,
    13,
    23,
    27,
    1,
    6,
    27,
    31,
    2,
    31,
    13,
    35,
    1,
    9,
    35,
    39,
    2,
    39,
    13,
    43,
    1,
    43,
    10,
    47,
    1,
    47,
    13,
    51,
    2,
    13,
    51,
    55,
    1,
    55,
    9,
    59,
    1,
    59,
    5,
    63,
    1,
    6,
    63,
    67,
    1,
    13,
    67,
    71,
    2,
    71,
    10,
    75,
    1,
    6,
    75,
    79,
    1,
    79,
    10,
    83,
    1,
    5,
    83,
    87,
    2,
    10,
    87,
    91,
    1,
    6,
    91,
    95,
    1,
    9,
    95,
    99,
    1,
    99,
    9,
    103,
    2,
    103,
    10,
    107,
    1,
    5,
    107,
    111,
    1,
    9,
    111,
    115,
    2,
    13,
    115,
    119,
    1,
    119,
    10,
    123,
    1,
    123,
    10,
    127,
    2,
    127,
    10,
    131,
    1,
    5,
    131,
    135,
    1,
    10,
    135,
    139,
    1,
    139,
    2,
    143,
    1,
    6,
    143,
    0,
    99,
    2,
    14,
    0,
    0,
  ]),
);
