import { createComputer, parse } from "./intcode/computer.js";
import { stepForward } from "./intcode/intcode.js";

const compass = {
  "^": { leftOffset: [-1, 0], rightOffset: [1, 0], left: "<", right: ">" },
  ">": { leftOffset: [0, 1], rightOffset: [0, -1], left: "^", right: "v" },
  "v": { leftOffset: [1, 0], rightOffset: [-1, 0], left: ">", right: "<" },
  "<": { leftOffset: [0, -1], rightOffset: [0, 1], left: "v", right: "^" },
};

const directions = {
  0: { mark: "left", offset: "leftOffset" },
  1: { mark: "right", offset: "rightOffset" },
};

const turnAndMoveRobot = (robot, nextMove) => {
  const directionDetails = compass[robot.direction];
  const { mark, offset } = directions[nextMove];

  robot.direction = directionDetails[mark];
  robot.currentPosition[0] += directionDetails[offset][0];
  robot.currentPosition[1] += directionDetails[offset][1];
};

const paint = ([color, direction], panels, robot) => {
  panels[robot.currentPosition.toString()] = color;
  turnAndMoveRobot(robot, direction);
};

const emergencyHull = (computer, panels, robot) => {
  computer.inputs.push(0);

  while (!computer.isHalted) {
    stepForward(computer);

    if (computer.outputs.length === 2) {
      paint(computer.outputs, panels, robot);
      computer.outputs = [];

      const currentColor = panels[robot.currentPosition.toString()] || 0;
      computer.inputs.push(currentColor);
    }
  }
};

const input1 = "3,3,1001,0,-3,3,1002,0,0,9,4,7,4,8,99";
const input = Deno.readTextFileSync("./data/day11_input.txt");

const part1 = () => {
  const program = parse(input);
  const computer = createComputer(program, 0);
  const panels = {};
  const robot = {
    currentPosition: [0, 0],
    direction: "^",
  };

  emergencyHull(computer, panels, robot);
  console.log(Object.keys(panels).length);
};
