import { permutations } from "@std/collections/permutations";
import { createComputer, parse } from "./computer.js";
import { inputs } from "./inputs.js";
import { executeInstructions } from "./intcode.js";

const amplifier = (amplifierInputs) => {
  const program = parse(inputs.puzzleInputDay7);
  const computer = createComputer(program);

  computer.inputs = amplifierInputs;

  executeInstructions(computer);

  return computer.outputs[0];
};

const runAmplifier = (phaseSettingSequence) => {
  let outputSignal = 0;
  phaseSettingSequence.forEach((phaseSetting) => {
    outputSignal = amplifier([phaseSetting, outputSignal]);
  });
  return outputSignal;
};

const generateSequences = (numbers) => permutations(numbers);

const maxThruster = (phaseSettingSequences) =>
  phaseSettingSequences.reduce((maxThruster, phaseSettingSequence) => {
    const thruster = runAmplifier(phaseSettingSequence);
    return thruster > maxThruster ? thruster : maxThruster;
  }, -Infinity);

const phaseSettingSequences = generateSequences([0, 1, 2, 3, 4]);

console.log(maxThruster(phaseSettingSequences));
