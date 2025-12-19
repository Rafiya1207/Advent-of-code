import { executeInstructions } from "./intcode.js";
import { createComputer, parse } from "./computer.js";
import { inputs } from "./inputs.js";

const main = () => {
  const program = parse(inputs.puzzleInputDay9);
  const computer = createComputer(program, 0);

  console.log(executeInstructions(computer));
};

main();
