import { OPCODES } from "./opcodes.js";
import { getArgs } from "./arguments.js";
import { applyOverrides } from "./computer.js";

export const stepForward = (computer) => {
  const [opcode, ...args] = getArgs(computer);
  OPCODES[opcode].operation(
    computer,
    [opcode, ...args],
  );
};

export const executeInstructions = (computer) => {
  applyOverrides(computer);

  while (!computer.isHalted) {
    stepForward(computer);
  }
  return computer;
};
