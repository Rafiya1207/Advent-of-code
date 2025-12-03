import { assertEquals } from "@std/assert/equals";
import { executeInstructions } from "../src/Day2.js";

Deno.test("execute instructions -- add", () => {
  assertEquals(executeInstructions([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]);
});

Deno.test("execute instructions -- add", () => {
  assertEquals(executeInstructions([1, 3, 0, 0, 99]), [1, 3, 0, 0, 99]);
});

Deno.test("execute instructions -- add", () => {
  assertEquals(executeInstructions([1, 3, 2, 0, 99]), [2, 3, 2, 0, 99]);
});

Deno.test("execute instructions -- add", () => {
  assertEquals(executeInstructions([1, 3, 2, 2, 99]), [1, 3, 4, 2, 99]);
});

Deno.test("execute instructions -- add", () => {
  assertEquals(executeInstructions([1, 0, 2, 3, 99]), [1, 0, 2, 3, 99]);
});

Deno.test("execute instructions -- add", () => {
  assertEquals(executeInstructions([1, 0, 2, 4, 99]), [1, 0, 2, 4, 3]);
});

Deno.test("execute instructions -- add", () => {
  assertEquals(executeInstructions([1, 0, 2, 5, 99]), [1, 0, 2, 5, 99, 3]);
});
