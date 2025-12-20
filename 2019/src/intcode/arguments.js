import { OPCODES } from "./opcodes.js";

const getAddress = (program, paramIndex, mode, relativeBase) => {
  const offset = program[paramIndex];
  
  const modeMap = {
    0: offset,
    1: paramIndex,
    2: relativeBase + offset
  }
  return modeMap[mode];
}

export const getArgs = ({ program, currentPosition, relativeBase }) => {
  const args = [];
  const modesAndOpcodes = program[currentPosition].toString().padStart(5, 0);
  const modes = modesAndOpcodes.slice(0, 3).split("").reverse();

  args[0] = parseInt(modesAndOpcodes[3] + modesAndOpcodes[4]);

  for (let argCount = 0; argCount < OPCODES[args[0]].length - 1; argCount++) {
    args.push(
      getAddress(program, currentPosition + argCount + 1, modes[argCount], relativeBase)
    );
  }
  return args;
};
