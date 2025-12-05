import { getInput } from "./Day7.js";
import { out } from "./Day7.js";

const add = (program, pointer, modesAndOpcode) => {
  const param1Mode = modesAndOpcode[2];
  const param2Mode = modesAndOpcode[1];

  const address1 = modes[param1Mode](pointer + 1, program);
  const address2 = modes[param2Mode](pointer + 2, program);
  const targetAddress = program[pointer + operationMap[1].targetPosition];

  program[targetAddress] = program[address1] + program[address2];
  return pointer + 4;
};

const multiply = (program, pointer, modesAndOpcode) => {
  const param1Mode = modesAndOpcode[2];
  const param2Mode = modesAndOpcode[1];

  const address1 = modes[param1Mode](pointer + 1, program);
  const address2 = modes[param2Mode](pointer + 2, program);
  const targetAddress = program[pointer + operationMap[2].targetPosition];

  program[targetAddress] = program[address1] * program[address2];
  return pointer + 4;
};

const input = (program, pointer, modesAndOpcode) => {
  const inputValue = getInput();
  const parameterMode = modesAndOpcode[2];

  const parameterAddress = modes[parameterMode](pointer + 1, program);

  program[parameterAddress] = inputValue;
  return pointer + 2;
};

const output = (program, pointer, modesAndOpcode) => {
  const parameterMode = modesAndOpcode[2];

  const parameterAddress = modes[parameterMode](pointer + 1, program);

  out.push(program[parameterAddress]);
  // console.log(program[parameterAddress]);
  return pointer + 2;
};

const jumpIfTrue = (program, pointer, modesAndOpcode) => {
  const paramMode = modesAndOpcode[2];
  const targetMode = modesAndOpcode[1];
  const parameterAddress = modes[paramMode](pointer + 1, program);
  const targetAddress = modes[targetMode](pointer + 2, program);

  if (program[parameterAddress] !== 0) {
    return program[targetAddress];
  }
  return pointer + 3;
};

const jumpIfFalse = (program, pointer, modesAndOpcode) => {
  const paramMode = modesAndOpcode[2];
  const targetMode = modesAndOpcode[1];
  const parameterAddress = modes[paramMode](pointer + 1, program);
  const targetAddress = modes[targetMode](pointer + 2, program);

  if (program[parameterAddress] === 0) {
    return program[targetAddress];
  }
  return pointer + 3;
};

const lessThan = (program, pointer, modesAndOpcode) => {
  const param1Mode = modesAndOpcode[2];
  const param2Mode = modesAndOpcode[1];

  const opcode = 7;
  const address1 = modes[param1Mode](pointer + 1, program);
  const address2 = modes[param2Mode](pointer + 2, program);

  const isLessThan = program[address1] < program[address2] ? 1 : 0;

  const targetAddress = program[pointer + operationMap[opcode].targetPosition];

  program[targetAddress] = isLessThan;
  return pointer + 4;
};

const equals = (program, pointer, modesAndOpcode) => {
  const param1Mode = modesAndOpcode[2];
  const param2Mode = modesAndOpcode[1];

  const opcode = 8;
  const address1 = modes[param1Mode](pointer + 1, program);
  const address2 = modes[param2Mode](pointer + 2, program);

  const isEqual = program[address1] === program[address2] ? 1 : 0;

  const targetAddress = program[pointer + operationMap[opcode].targetPosition];

  program[targetAddress] = isEqual;
  return pointer + 4;
};

const operationMap = {
  1: {
    operation: add,
    targetPosition: 3,
  },
  2: {
    operation: multiply,
    targetPosition: 3,
  },
  3: {
    operation: input,
    targetPosition: 1,
  },
  4: {
    operation: output,
    targetPosition: 1,
  },
  5: {
    operation: jumpIfTrue,
    targetPosition: 2,
  },
  6: {
    operation: jumpIfFalse,
    targetPosition: 2,
  },
  7: {
    operation: lessThan,
    targetPosition: 3,
  },
  8: {
    operation: equals,
    targetPosition: 3,
  },
  // 4: { operation: output, pointer: 2, targetPosition: 1 },
};

const positionMode = (index, ins) => ins[index];

const immediateMode = (index) => index;

const modes = {
  0: positionMode,
  1: immediateMode,
};

const executeInstruction = (program, pointer) => {
  const modesAndOpcode = (program[pointer] + "").padStart(5, 0);
  const opcode = parseInt(modesAndOpcode[3] + modesAndOpcode[4]);
  pointer = operationMap[opcode].operation(
    program,
    pointer,
    modesAndOpcode,
  );
  return pointer;
};

export const part2 = (program) => {
  let pointer = 0;
  while (program[pointer] != 99) {
    pointer = executeInstruction(program, pointer);
  }
  return program;
};

// console.log(part2(program));
