import { chunk } from "@std/collections/chunk";

const inputs = {
  simpleAddition: "1,0,0,0,99",
  simpleMultiplicationWithModes: "1002,4,3,4,33", // 1002, 4, 3, 4, 99
  simpleIO: "3,0,4,0,99",
  simpleJumpIfTrue: "1105,1,7,1,0,0,0,99",
  puzzleInput: Deno.readTextFileSync("./data/day2_input.txt"),
  puzzleInputDay5: Deno.readTextFileSync("./data/day5_input.txt"),
};

const getInput = () => 5;

const parse = (input) => input.split(",").map((x) => parseInt(x));

const positionMode = (index, program) => program[index];

const immediateMode = (index) => index;

const modesMap = {
  0: positionMode,
  1: immediateMode,
};

const performAddition = (computer, args) => {
  const { program } = computer;
  const [opcode, input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = program[input1Address] + program[input2Address];
  computer.currentPosition += OPCODES[opcode].length;
};

const performMul = (computer, args) => {
  const { program } = computer;
  const [opcode, input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = program[input1Address] * program[input2Address];
  computer.currentPosition += OPCODES[opcode].length;
};

const input = (computer, [opcode, targetAddress]) => {
  const inputValue = getInput();

  computer.program[targetAddress] = inputValue;
  computer.currentPosition += OPCODES[opcode].length;
};

const output = (computer, [opcode, targetAddress]) => {
  computer.out.push(computer.program[targetAddress]);
  computer.currentPosition += OPCODES[opcode].length;
};

const jumpIfTrue = (computer, args) => {
  const { program } = computer;
  const [opcode, inputAddress, targetAddress] = args;

  if (program[inputAddress] !== 0) {
    computer.currentPosition = program[targetAddress];
    return;
  }
  computer.currentPosition += OPCODES[opcode].length;
};

const jumpIfFalse = (computer, args) => {
  const { program } = computer;
  const [opcode, inputAddress, targetAddress] = args;

  if (program[inputAddress] === 0) {
    computer.currentPosition = program[targetAddress];
    return;
  }
  computer.currentPosition += OPCODES[opcode].length;
};

const lessThan = (computer, args) => {
  const { program } = computer;
  const [opcode, input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = program[input1Address] < program[input2Address]
    ? 1
    : 0;
  computer.currentPosition += OPCODES[opcode].length;
};

const equals = (computer, args) => {
  const { program } = computer;
  const [opcode, input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = program[input1Address] === program[input2Address]
    ? 1
    : 0;
  computer.currentPosition += OPCODES[opcode].length;
};

const halt = (computer) => computer.isHalted = true;
const OPCODES = {
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
  99: {
    operation: halt,
    length: 1,
  },
};

const getArgs = ({ program, currentPosition }) => {
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

const applyOverrides = ({ program, overrides }) => {
  overrides.forEach((override) => program[override[0]] = override[1]);
};

const stepForward = (computer) => {
  const [opcode, ...args] = getArgs(computer);
  OPCODES[opcode].operation(
    computer,
    [opcode, ...args],
  );
};

const executeInstructions = (computer) => {
  applyOverrides(computer);

  while (!computer.isHalted) {
    stepForward(computer);
  }
  return computer;
};

const createComputer = (program, overrides = []) => ({
  program,
  currentPosition: 0,
  isHalted: false,
  overrides,
  out: [],
});

const createGrid = (program) => {
  const width = 16;
  const columnWidth = 5;
  const rows = chunk(program, width);

  return rows.map((row) =>
    row.map(
      (element) =>
        ("" + element)
          .padStart(columnWidth, " "),
    )
      .join("")
  ).join("\n");
};

const displayGrid = (grid) => {
  console.clear();
  console.log(grid);
};

const debuger = () => {
  applyOverrides(computer);

  while (true) {
    const grid = createGrid(program);
    prompt();
    displayGrid(grid);
    stepForward(computer);
  }
};

const main = () => {
  const program = parse(inputs.puzzleInputDay5);

  const computer = createComputer(program);

  console.log(executeInstructions(computer));
  // debuger();
};
main();
