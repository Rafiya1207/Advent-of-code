const offset = {
  "(": 1,
  ")": -1,
};
const floorOf = (instructions) =>
  instructions
    .reduce((floorNumber, instruction) => floorNumber + offset[instruction], 0);

const input = Deno.readTextFileSync("./day_1_input.txt");
const parsedInstructions = input.split("");

console.log(floorOf(parsedInstructions));
