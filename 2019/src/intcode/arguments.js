import { OPCODES } from "./opcodes.js";

const positionMode = (index, program) => program[index];

const immediateMode = (index) => index;

const modesMap = {
  0: positionMode,
  1: immediateMode,
};

export const getArgs = ({ program, currentPosition }) => {
  const args = [];
  const modesAndOpcodes = program[currentPosition].toString().padStart(5, 0);
  const modes = modesAndOpcodes.slice(0, 3).split("").reverse();

  args[0] = parseInt(modesAndOpcodes[3] + modesAndOpcodes[4]);

  for (let argCount = 1; argCount < OPCODES[args[0]].length; argCount++) {
    args.push(
      modesMap[modes[argCount - 1]](currentPosition + argCount, program),
    );
  }
  return args;
};
