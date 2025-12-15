import { chunk } from "@std/collections/chunk";

const inputs = {
  simpleAddition: "1,0,0,0,99",
  puzzleInput: Deno.readTextFileSync("./data/day2_input.txt"),
};

const parse = (input) => input.split(",").map((x) => parseInt(x));

const getArgs = ({ program, currentPosition }, length = 4) => {
  const args = [];
  for (let argCount = 0; argCount < length; argCount++) {
    args.push(program[currentPosition + argCount]);
  }
  return args;
};

const performAddition = (computer, args) => {
  const { program } = computer;
  const [input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = program[input1Address] + program[input2Address];
  computer.currentPosition += 4;
};

const performMul = (computer, args) => {
  const { program } = computer;
  const [input1Address, input2Address, outputAddress] = args;

  program[outputAddress] = program[input1Address] * program[input2Address];
  computer.currentPosition += 4;
};

const halt = (computer) => computer.isHalted = true;

const OPCODES = {
  1: performAddition,
  2: performMul,
  99: halt,
};

const applyOverrides = ({ program, overrides }) => {
  overrides.forEach((override) => program[override[0]] = override[1]);
};

const stepForward = (computer) => {
  const [opcode, ...args] = getArgs(computer);
  OPCODES[opcode](
    computer,
    args,
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
});

const program = parse(inputs.puzzleInput);

const computer = createComputer(program, [[1, 12], [2, 2]]);

// console.log(executeInstructions(computer));

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

debuger();
