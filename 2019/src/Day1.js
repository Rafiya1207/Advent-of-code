import { sumOf } from "jsr:@std/collections";

export const calculateFuelRequired = (mass) => Math.floor(parseInt(mass) / 3) - 2;

const puzzle1Part1 = () => {
  const modules = Deno
    .readTextFileSync("../data/mass_of_modules.txt")
    .split("\n");

  const fuels = modules.map(fuel => calculateFuelRequired(fuel));
  
  return sumOf(fuels, (fuel) => fuel);
};
