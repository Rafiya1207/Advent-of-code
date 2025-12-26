#! /usr/local/bin/deno

/**
 * (0,0) -> east -> (1,0)
 * (0,0) -> north -> (0,1) -> east -> (1,1) -> south -> (1,0) -> west -> (0,0)
 * (0,0) -> north -> (0,-1) -> south -> (0, 0)
 */

const offsetMap = {
  "^": { x: 0, y: 1 },
  "v": { x: 0, y: -1 },
  "<": { x: -1, y: 0 },
  ">": { x: 1, y: 0 },
};

const housesReceivedPresent = (directions) => {
  const visitedHouses = {};
  const housePosition = { x: 0, y: 0 };

  directions.forEach((direction) => {
    const position = housePosition.x + "," + housePosition.y;

    visitedHouses[position] = housePosition;

    const { x: dx, y: dy } = offsetMap[direction];

    housePosition.x += dx;
    housePosition.y += dy;
  });

  return Object.keys(visitedHouses).length;
};

const input = Deno.readTextFileSync('./day_3_input.txt');

const parseInput = (input) => input.split("");

console.log(housesReceivedPresent(parseInput(input)));
