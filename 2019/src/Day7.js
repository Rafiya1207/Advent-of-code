import { ACS } from "../data/amplifier_controller_software.js";
import { part2 } from "./Day5.js";
import { maxOf, permutations } from "jsr:@std/collections";

const inputs = [];
export const out = [0];

export const getInput = () => {
  const input = inputs[0];
  inputs.shift();
  return input;
};


const amp = (phase) => {
  const program = [...ACS];
  inputs.push(phase);
  inputs.push(out[0]);
  out.pop();
  part2(program);
};

const initialPhases = [0, 1, 2, 3, 4];

const runSequence = (phases) => {
  phases.forEach((phase) => amp(phase));
  return out[0];
};

const maxThruster = () => {
  const possiblePhases = permutations(initialPhases);
  const thrusters = [];

  possiblePhases.forEach((phase) => {
    thrusters.push(runSequence(phase));
    out[0] = 0;
  });

  return maxOf(thrusters, (thruster) => thruster);
};

console.log(maxThruster());
