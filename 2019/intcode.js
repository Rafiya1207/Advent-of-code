const inputs = {
  simpleAddition: "1,0,0,0,99",
  puzzleInput: Deno.readTextFileSync("./data/day2_input.txt"),
};

const parse = (input) => input.split(",").map((x) => parseInt(x));

const performAddition = (computer) => {
  const { program, currentPosition: nextPosition } = computer;
  const input1Address = program[nextPosition + 1];
  const input2Address = program[nextPosition + 2];
  const outputAddress = program[nextPosition + 3];

  program[outputAddress] = program[input1Address] + program[input2Address];
  computer.currentPosition += 4;
};

const performMul = (computer) => {
  const { program, currentPosition: nextPosition } = computer;
  const input1Address = program[nextPosition + 1];
  const input2Address = program[nextPosition + 2];
  const outputAddress = program[nextPosition + 3];

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
  applyOverrides(computer);

  while (!computer.isHalted) {
    OPCODES[computer.program[computer.currentPosition]](
      computer,
    );
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

console.log(stepForward(computer));
