export const inputs = {
  simpleAddition: "1,0,0,0,99",
  simpleMultiplicationWithModes: "1002,4,3,4,33", // 1002, 4, 3, 4, 99
  simpleIO: "3,0,4,0,99",
  simpleJumpIfTrue: "1105,1,7,1,0,0,0,99",
  puzzleInput: Deno.readTextFileSync("./data/day2_input.txt"),
  puzzleInputDay5: Deno.readTextFileSync("./data/day5_input.txt"),
  puzzleInputDay9: Deno.readTextFileSync("./data/day9_input.txt"),
  simpleDay7Concatination: "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
  simpleDay7:
    "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",
  puzzleInputDay7: Deno.readTextFileSync("./data/day7_input.txt"),
  simpleDay9: "1102,34915192,34915192,7,4,7,99,0",
  simpleDay9Copy: "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99",
};
