const getValueAt = (program, address) => program[address] || 0;

const performAddition = (computer, args) => {
  const { program } = computer;
  const [opcode, input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = getValueAt(program, input1Address) +
    getValueAt(program, input2Address);
  computer.currentPosition += OPCODES[opcode].length;
};

const performMul = (computer, args) => {
  const { program } = computer;
  const [opcode, input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = getValueAt(program, input1Address) *
    getValueAt(program, input2Address);
  computer.currentPosition += OPCODES[opcode].length;
};

const input = (computer, [opcode, targetAddress]) => {
  const inputValue = computer.inputs[0];

  computer.program[targetAddress] = inputValue;
  computer.currentPosition += OPCODES[opcode].length;
  computer.inputs.shift();
};

const output = (computer, [opcode, targetAddress]) => {
  computer.outputs.push(computer.program[targetAddress]);
  computer.currentPosition += OPCODES[opcode].length;
};

const jumpIfTrue = (computer, args) => {
  const { program } = computer;
  const [opcode, inputAddress, targetAddress] = args;

  if (getValueAt(program, inputAddress) !== 0) {
    computer.currentPosition = getValueAt(program, targetAddress);
    return;
  }
  computer.currentPosition += OPCODES[opcode].length;
};

const jumpIfFalse = (computer, args) => {
  const { program } = computer;
  const [opcode, inputAddress, targetAddress] = args;

  if (getValueAt(program, inputAddress) === 0) {
    computer.currentPosition = getValueAt(program, targetAddress);
    return;
  }
  computer.currentPosition += OPCODES[opcode].length;
};

const lessThan = (computer, args) => {
  const { program } = computer;
  const [opcode, input1Address, input2Address, outputAddress] = args;

  program[outputAddress] =
    getValueAt(program, input1Address) < getValueAt(program, input2Address)
      ? 1
      : 0;
  computer.currentPosition += OPCODES[opcode].length;
};

const equals = (computer, args) => {
  const { program } = computer;
  const [opcode, input1Address, input2Address, outputAddress] = args;

  program[outputAddress] =
    getValueAt(program, input1Address) === getValueAt(program, input2Address)
      ? 1
      : 0;
  computer.currentPosition += OPCODES[opcode].length;
};

const adjustRelativeBase = (computer, args) => {
  const { program } = computer;
  const [opcode, offsetAddress] = args;

  computer.relativeBase += getValueAt(program, offsetAddress);
  computer.currentPosition += OPCODES[opcode].length;
};

const halt = (computer) => {
  computer.isHalted = true;
};

export const OPCODES = {
  1: {
    operation: performAddition,
    length: 4,
  },
  2: {
    operation: performMul,
    length: 4,
  },
  3: {
    operation: input,
    length: 2,
  },
  4: {
    operation: output,
    length: 2,
  },
  5: {
    operation: jumpIfTrue,
    length: 3,
  },
  6: {
    operation: jumpIfFalse,
    length: 3,
  },
  7: {
    operation: lessThan,
    length: 4,
  },
  8: {
    operation: equals,
    length: 4,
  },
  9: {
    operation: adjustRelativeBase,
    length: 2,
  },
  99: {
    operation: halt,
    length: 1,
  },
};
