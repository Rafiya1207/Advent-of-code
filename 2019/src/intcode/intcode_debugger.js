import { chunk } from "@std/collections/chunk";
import { inputs } from "./inputs.js";
import { applyOverrides, createComputer } from "./computer.js";
import { parse } from "./computer.js";
import { stepForward } from "./intcode.js";

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

export const debuger = () => {
  const program = parse(inputs.simpleDay7);
  const computer = createComputer(program);

  applyOverrides(computer);

  while (!computer.isHalted) {
    const grid = createGrid(program);
    prompt();
    displayGrid(grid);
    stepForward(computer);
  }
};

debuger();
