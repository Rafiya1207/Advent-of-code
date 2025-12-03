import { minOf } from "jsr:@std/collections";
import { wire1, wire2 } from "../data/wires.js";

const pointsMap = {
  R: ([x, y]) => [1 + x, y],
  L: ([x, y]) => [x - 1, y],
  U: ([x, y]) => [x, y + 1],
  D: ([x, y]) => [x, y - 1],
};

const genPath = (ins) => {
  const points = [[0, 0]];

  for (const i of ins) {
    for (let _ = 0; _ < parseInt(i.slice(1)); _++) {
      const last = points[points.length - 1];
      const point = pointsMap[i[0]](last);
      points.push(point);
    }
  }
  return points;
};

const arePointsEqual = (point1, point2) =>
  point1[0] === point2[0] && point1[1] === point2[1];

const findIntersectionPoints = (wire1Points, wire2Points) => {
  const intersectionPoints = [];

  for (let i = 0; i < wire1Points.length; i++) {
    for (let j = 0; j < wire2Points.length; j++) {
      if (arePointsEqual(wire1Points[i], wire2Points[j])) {
        intersectionPoints.push(wire1Points[i]);
        break;
      }
    }
  }
  return intersectionPoints;
};

const manhattanDist = ([x2, y2]) => Math.abs(x2) + Math.abs(y2);

const closestPoint = (points) => {
  const dist = [];
  for (let i = 1; i < points.length; i++) {
    dist.push(manhattanDist(points[i]));
  }
  console.log(points);
  
  return minOf(dist, (item) => item);
};

const part1 = () => {
  const wire1Points = genPath(['R75','D30','R83','U83','L12','D49','R71','U7','L72']);
  const wire2Points = genPath(['U62','R66','U55','R34','D71','R55','D58','R83']);
  // const wire1Points = genPath(['R8','U5','L5','D3']);
  // const wire2Points = genPath(['U7','R6','D4','L4']);

  console.log(wire1Points);
  console.log(wire2Points);
  

  const intersectionPoints = findIntersectionPoints(wire1Points, wire2Points);
  console.log(intersectionPoints);
  
  console.log(closestPoint(intersectionPoints));
};


main();