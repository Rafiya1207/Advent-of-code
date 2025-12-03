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

// Deno.test("execute instructions -- add", () => {
//   assertEquals(executeInstructions([1, 0, 2, 4, 99]), [1, 0, 2, 4, 3]);
// });

Deno.test("execute instructions -- add", () => {
  assertEquals(executeInstructions([1, 0, 2, 5, 99]), [1, 0, 2, 5, 99, 3]);
});

Deno.test("execute instructions -- multiply", () => {
  assertEquals(executeInstructions([2, 0, 0, 0, 99]), [4, 0, 0, 0, 99]);
});

Deno.test("execute instructions -- multiply", () => {
  assertEquals(executeInstructions([2, 3, 0, 0, 99]), [0, 3, 0, 0, 99]);
});

Deno.test("execute instructions -- multiply", () => {
  assertEquals(executeInstructions([2, 3, 2, 0, 99]), [0, 3, 2, 0, 99]);
});

Deno.test("execute instructions -- multiply", () => {
  assertEquals(executeInstructions([2, 3, 2, 2, 99]), [2, 3, 4, 2, 99]);
});

Deno.test("execute instructions -- multiply", () => {
  assertEquals(executeInstructions([2, 0, 2, 3, 99]), [2, 0, 2, 4, 99]);
});

// Deno.test("execute instructions -- multiply", () => {
//   assertEquals(executeInstructions([2, 0, 2, 4, 99]), [2, 0, 2, 4, 4]);
// });

Deno.test("execute instructions -- multiply", () => {
  assertEquals(executeInstructions([2, 0, 2, 5, 99]), [2, 0, 2, 5, 99, 4]);
});

Deno.test("execute instructions", () => {
  assertEquals(
    executeInstructions([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]),
    [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
  );
});

Deno.test("execute instructions", () => {
  assertEquals(
    executeInstructions([1, 1, 1, 4, 99, 5, 6, 0, 99]),
    [30, 1, 1, 4, 2, 5, 6, 0, 99],
  );
});

