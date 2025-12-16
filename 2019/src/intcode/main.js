import { executeInstructions } from "../Day2.js";
import { createComputer, parse } from "./computer.js";
import { inputs } from "./inputs.js";

const main = () => {
  const program = parse(inputs.puzzleInputDay5);
  const computer = createComputer(program);

  console.log(executeInstructions(computer));
};

main();