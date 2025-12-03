import { assertEquals } from "jsr:@std/assert";
import { calculateFuelRequired } from "../src/Day1.js";

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
