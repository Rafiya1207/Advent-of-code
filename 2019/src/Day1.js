import { runningReduce, sumOf } from "jsr:@std/collections";

export const calculateFuelRequired = (mass) =>
  Math.floor(parseInt(mass) / 3) - 2;

export const calculateFuelForFuel = (mass) => {
  const fuels = [];
  let currentFuel = calculateFuelRequired(mass);

  while (currentFuel >= 0) {
    fuels.push(currentFuel);
    currentFuel = calculateFuelRequired(currentFuel);
  }
  return fuels;
};

export const puzzle1Part1 = () => {
  const modules = Deno
    .readTextFileSync("../data/mass_of_modules.txt")
    .split("\n");

  const fuels = modules.map((fuel) => calculateFuelRequired(fuel));

  return sumOf(fuels, (fuel) => fuel);
};

export const puzzle1Part2 = (modules) => {
  const fuels = modules.map((fuel) => calculateFuelForFuel(fuel));

  const finalFuels = fuels.map((finalFuel) => sumOf(finalFuel, (fuel) => fuel));

  return sumOf(finalFuels, (fuel) => fuel);
};

const main = () => {
  const modules = Deno
    .readTextFileSync("../data/mass_of_modules.txt")
    .split("\n");
  console.log(puzzle1Part2(modules));
};

main();
