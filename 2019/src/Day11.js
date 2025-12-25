import { createComputer, parse } from "./intcode/computer.js";
import { stepForward } from "./intcode/intcode.js";

const directionOffsetMap = {
  0: [-1, 1],
  1: [1, -1],
};

const turnAndMoveRobot = (robot, nextMove) => {
  const offset = directionOffsetMap[nextMove];
  const oldDX = robot.direction.dx;

  robot.direction.dx = robot.direction.dy * offset[0];
  robot.direction.dy = oldDX * offset[1];

  robot.position.x += robot.direction.dx * 1;
  robot.position.y += robot.direction.dy * 1;
};

const paint = ([color, direction], panels, robot) => {
  const key = "" + robot.position.x + "," + robot.position.y;
  panels[key] = { color, position: robot.position };
  turnAndMoveRobot(robot, direction);
};

const emergencyHull = (computer, panels, robot) => {
  computer.inputs.push(0);

  while (!computer.isHalted) {
    stepForward(computer);

    if (computer.outputs.length === 2) {
      paint(computer.outputs, panels, robot);
      computer.outputs = [];

      const key = "" + robot.position.x + "," + robot.position.y;
      const currentColor = panels[key] ? panels[key].color : 0;
      computer.inputs.push(currentColor);
    }
  }
};

const input = Deno.readTextFileSync("./data/day11_input.txt");

const part1 = () => {
  const program = parse(input);
  const computer = createComputer(program, 0);
  const panels = {};
  const robot = {
    position: { x: 0, y: 0 },
    direction: { dx: 0, dy: 1 },
  };

  emergencyHull(computer, panels, robot);
  console.log(Object.keys(panels).length);
  return panels;
};

// const part2 = () => {
//   const panels = part1();

//   const image = [];
//   Object.values(panels).forEach(({ color, position }) => {
//     image[position.x][position.y] = color === 1 ? "#" : " "
// });
//   console.log(image);
// };


// part2();
