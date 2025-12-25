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

  robot.lowerBoundary.minX = Math.min(
    robot.lowerBoundary.minX,
    robot.position.x,
  );
  robot.lowerBoundary.minY = Math.min(
    robot.lowerBoundary.minY,
    robot.position.y,
  );
  robot.upperBoundary.maxX = Math.max(
    robot.upperBoundary.maxX,
    robot.position.x,
  );
  robot.upperBoundary.maxY = Math.max(
    robot.upperBoundary.maxY,
    robot.position.y,
  );
};

const paint = ([color, direction], panels, robot) => {
  const key = "" + robot.position.x + "," + robot.position.y;
  panels[key] = { color, position: { ...robot.position } };
  turnAndMoveRobot(robot, direction);
};

const emergencyHull = (computer, panels, robot) => {
  computer.inputs.push(1);

  while (!computer.isHalted) {
    stepForward(computer);
    console.clear();
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

const part1 = (computer, panels, robot) => {
  emergencyHull(computer, panels, robot);
  console.log(Object.keys(panels).length);
};

const part2 = (panels, robot) => {
  const image = [];

  for (let y = robot.upperBoundary.maxY;y >= robot.lowerBoundary.minY; y--) {
    let row = "";
    for (let x = robot.lowerBoundary.minX; x < robot.upperBoundary.maxX; x++) {
      const panel = "" + x + "," + y;
      const color = !panels[panel] ? 0 : panels[panel].color;
      const mark = color === 1 ? "#" : " ";
      row += mark;
    }
    image.push(row);
  }
  return image.join('\n')
};

const main = () => {
  const program = parse(input);
  const computer = createComputer(program, 0);
  const panels = {};
  const robot = {
    position: { x: 0, y: 0 },
    direction: { dx: 0, dy: 1 },
    lowerBoundary: { minX: Infinity, minY: Infinity },
    upperBoundary: { maxX: 0, maxY: 0 },
  };
  
  part1(computer, panels, robot);
  part2(panels, robot);
};
