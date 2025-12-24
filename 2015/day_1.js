const offset = {
  "(": 1,
  ")": -1,
};
const floorOf = (instructions) =>
  instructions
    .reduce((floorNumber, instruction) => floorNumber + offset[instruction], 0);

const firstBasementPosition = (instructions) => {
  let currentFloorNumber = 0;

  for (const index in instructions) {
    const instruction = instructions[index];
    if (currentFloorNumber === -1) return index;
    currentFloorNumber += offset[instruction];
  }
};

const input = Deno.readTextFileSync("./day_1_input.txt");
const parsedInstructions = input.split("");

console.log(firstBasementPosition(parsedInstructions));
