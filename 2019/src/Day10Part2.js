import { sortBy } from "@std/collections";
import { gcd, getPoints, monitoringStationOf, parseString } from "./Day10.js";

const asteroidsMap = Deno.readTextFileSync("./data/day10_input.txt");

const distance = (point1, point2) =>
  Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.x - point2.x, 2),
  );

const closestPoint = (point1, point2, point3) =>
  distance(point1, point2) < distance(point1, point3) ? point2 : point3;

const detectionAsteroids = (originPoint, points) => {
  const lineOfSightPoints = {};

  points.forEach((point) => {
    const deltaX = originPoint.x - point.x;
    const deltaY = originPoint.y - point.y;
    const gcdOfDeltaValues = gcd(Math.abs(deltaX), Math.abs(deltaY)) || 1;
    const pointToString = "x" + (deltaX / gcdOfDeltaValues) + "y" +
      (deltaY / gcdOfDeltaValues);
    let asteroid = point;

    if (pointToString in lineOfSightPoints) {
      asteroid = closestPoint(
        originPoint,
        lineOfSightPoints[pointToString],
        point,
      );
    }
    lineOfSightPoints[pointToString] = asteroid;
  });
  return Object.values(lineOfSightPoints);
};

const getAngle = (originPoint, asteroidPoint) => {
  return Math.atan2(
    asteroidPoint.y - originPoint.y,
    asteroidPoint.x - originPoint.x,
  ) * (180 / Math.PI);
};

const parsedMap = parseString(asteroidsMap);
const points = getPoints(parsedMap);

const monitoringStation = monitoringStationOf(asteroidsMap).asteroid;

const detectedAsteroids = detectionAsteroids(monitoringStation, points);

const asteroidsAngle = detectedAsteroids.map((point) => ({
  angle: getAngle(monitoringStation, point),
  ...point,
}));
const sortedAsteroids = sortBy(asteroidsAngle, ({ angle }) => angle);

const rotate = (asteroids) => {
  let vaporizationCount = 0;

  let index = 0;
  while (asteroids[index].angle !== -90) index++;
  vaporizationCount++;

  while (asteroids[++index % asteroids.length].angle !== -90) {
    if (vaporizationCount === 200) {
      return asteroids[index % asteroids.length];
    }
    vaporizationCount++;
  }
};

const asteroidAt200 = rotate(sortedAsteroids);
console.log(asteroidAt200.x * 100 + asteroidAt200.y);
