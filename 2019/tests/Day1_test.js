import { assertEquals } from "jsr:@std/assert";
import { calculateFuelForFuel, calculateFuelRequired, puzzle1Part2 } from "../src/Day1.js";

Deno.test("calculate the fuel needed for the mass", () => {
  assertEquals(calculateFuelRequired(12), 2);
});

Deno.test("calculate the fuel needed for the mass", () => {
  assertEquals(calculateFuelRequired(14), 2);
});

Deno.test("calculate the fuel needed for the mass", () => {
  assertEquals(calculateFuelRequired(1969), 654);
});

Deno.test("calculate the fuel needed for the mass", () => {
  assertEquals(calculateFuelRequired(100756), 33583);
});

Deno.test("calculate the fuel needed for the mass", () => {
  assertEquals(calculateFuelRequired(654), 216);
});

Deno.test("calculate the fuel needed for the fuel", () => {
  assertEquals(calculateFuelForFuel(14), [2]);
});

Deno.test("calculate the fuel needed for the fuel", () => {
  assertEquals(calculateFuelForFuel(70), [21, 5]);
});

Deno.test("calculate the fuel needed for the fuel", () => {
  assertEquals(calculateFuelForFuel(1969), [654, 216, 70, 21, 5]);
});

Deno.test("calculate the fuel needed for the fuel", () => {
  assertEquals(calculateFuelForFuel(100756), [
    33583,
    11192,
    3728,
    1240,
    411,
    135,
    43,
    12,
    2,
  ]);
});

Deno.test("puzzle1 part2", () => {
  assertEquals(puzzle1Part2([100756]), 50346);
});