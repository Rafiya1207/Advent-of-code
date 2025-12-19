import { executeInstructions } from "./intcode.js";
import { createComputer, parse } from "./computer.js";
import { inputs } from "./inputs.js";

const main = () => {
  const program = parse(inputs.simpleAddition);
  const computer = createComputer(program);

  console.log(executeInstructions(computer));
};

main();