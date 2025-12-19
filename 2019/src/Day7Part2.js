// import { inputs } from "./intcode/inputs.js";
const amp = function ([phaseSetting, outputSignal]) {
};

const runAmp = (phaseSettingSequence) => {
  let outputSignal = 0;
  phaseSettingSequence.forEach((phaseSetting) => {
    outputSignal = amp.call(computer, [phaseSetting, outputSignal]);
  });
  return outputSignal;
};

const computer = [1, 0, 0, 0, 99];

const seq = [0, 1, 2, 3, 4];
runAmp(seq);
// const input = [inputs.simpleDay7];
