import { chunk } from "@std/collections/chunk";

const inputs = {
  simpleAddition: "1,0,0,0,99",
  simpleMultiplicationWithModes: "1002,4,3,4,33", // 1002, 4, 3, 4, 99
  simpleIO: "3,0,4,0,99",
  puzzleInput: Deno.readTextFileSync("./data/day2_input.txt"),
};

const getInput = () => 1;

const parse = (input) => input.split(",").map((x) => parseInt(x));

const positionMode = (index, program) => program[index];

const immediateMode = (index) => index;

const modesMap = {
  0: positionMode,
  1: immediateMode,
};

const performAddition = (computer, args) => {
  const { program } = computer;
  const [input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = program[input1Address] + program[input2Address];
};

const performMul = (computer, args) => {
  const { program } = computer;
  const [input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = program[input1Address] * program[input2Address];
};

const input = (computer, ...targetAddress) => {
  const inputValue = getInput();

  computer.program[targetAddress] = inputValue;
};

const output = (computer, ...targetAddress) => {
  computer.out.push(computer.program[targetAddress]);
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
    args,
  );
  computer.currentPosition += OPCODES[opcode].length
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
  out: []
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
  const program = parse(inputs.simpleIO);

  const computer = createComputer(program);

  console.log(executeInstructions(computer));
  // debuger();
};
main();
