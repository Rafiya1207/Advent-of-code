import { localMap } from "../data/map.js";
import { intersect } from "jsr:@std/collections";

const parseInput = (input) =>
  input
    .split("\n")
    .reduce((obj, el) => {
      const keyValue = el.split(")");
      return (obj[keyValue[1]] = keyValue[0]) && obj;
    }, {});

const map = parseInput(localMap);
// const map = {
//   "C": "B",
//   "D": "C",
//   "E": "D",
//   "F": "E",
//   "B": "COM",
//   "G": "B",
//   "H": "G",
//   "I": "D",
//   "J": "E",
//   "K": "J",
//   "L": "K",
//   "YOU": "K",
//   "SAN": "I",
// };

const path = (key, orbits) => {
  if (!(key in map)) {
    return orbits;
  }
  orbits.push(map[key]);
  return path(map[key], orbits);
};

const countOrbits = (key) => {
  if (!(key in map)) {
    return 0;
  }
  return countOrbits(map[key]) + 1;
};

const countCheckSums = () => {
  let count = 0;
  for (const key in map) {
    count += countOrbits(key);
  }
  return count;
};

const youOrbits = path("YOU", []);
const sanOrbits = path("SAN", []);

const intersectingPlanet = intersect(youOrbits, sanOrbits)[0];

console.log(youOrbits.indexOf(intersectingPlanet) + sanOrbits.indexOf(intersectingPlanet));

// console.log(countCheckSums());
