import { permutations } from "@std/collections/permutations";
import { createComputer, parse } from "./computer.js";
import { inputs } from "./inputs.js";
import { stepForward } from "./intcode.js";

const runAmplifier = (amplifier) => {
  amplifier.computer.inputs = amplifier.ampInput;
  amplifier.computer.outputs.shift();

  while (
    amplifier.computer.outputs.length !== 1 && !amplifier.computer.isHalted
  ) {
    stepForward(amplifier.computer);
    amplifier.ampOutput = amplifier.computer.outputs[0];
  }

  if (amplifier.ampOutput === undefined) {
    return amplifier.ampInput[0];
  }
  return amplifier.ampOutput;
};

const createAmplifier = function (computer, phaseSetting) {
  return {
    computer: computer,
    phaseSetting: phaseSetting,
    ampInput: [],
    ampOutput: 0,
  };
};

const createAmplifiers = (program, phaseSettingSequence) => {
  let outputSignal = 0;
  return phaseSettingSequence.map((phaseSetting) => {
    const computer = createComputer([...program]);
    const amplifier = createAmplifier(computer, phaseSetting);

    amplifier.ampInput = [phaseSetting, outputSignal];
    outputSignal = runAmplifier(amplifier);

    return amplifier;
  });
};

const loopAmplifiers = function (amplifiers) {
  let isProgramHalted = false;
  const lastAmplifier = amplifiers[amplifiers.length - 1];
  let outputSignal = lastAmplifier.ampOutput;

  while (!isProgramHalted) {
    amplifiers.forEach((amplifier) => {
      amplifier.ampInput.push(outputSignal);

      outputSignal = runAmplifier(amplifier);
    });

    isProgramHalted = lastAmplifier.computer.isHalted;
  }
  return lastAmplifier.ampInput[0];
};

const generateSequences = (numbers) => permutations(numbers);

const maxThruster = (phaseSettingSequences) => {
  
  
  return phaseSettingSequences.reduce((maxThruster, phaseSettingSequence) => {
    const program = parse(inputs.puzzleInputDay7);
    const amplifiers = createAmplifiers(program, phaseSettingSequence);
    const thruster = loopAmplifiers(amplifiers);
    
    return thruster > maxThruster ? thruster : maxThruster;
  }, -Infinity);
};
const phaseSettingSequences = generateSequences([5, 6, 7, 8, 9]);

console.log(maxThruster(phaseSettingSequences));