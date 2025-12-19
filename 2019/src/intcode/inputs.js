export const inputs = {
  simpleAddition: "1,0,0,0,99",
  simpleMultiplicationWithModes: "1002,4,3,4,33", // 1002, 4, 3, 4, 99
  simpleIO: "3,0,4,0,99",
  simpleJumpIfTrue: "1105,1,7,1,0,0,0,99",
  puzzleInput: Deno.readTextFileSync("./data/day2_input.txt"),
  puzzleInputDay5: Deno.readTextFileSync("./data/day5_input.txt"),
  simpleDay7Concatination: "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
  simpleDay7:
    "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
  puzzleInputDay7: Deno.readTextFileSync('./data/day7_input.txt')
};
