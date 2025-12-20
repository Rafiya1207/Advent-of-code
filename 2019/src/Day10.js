import { maxBy } from "@std/collections";

export const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const detectCount = (originPoint, points) => {
  const lineOfSightPoints = {};
  let count = -1;

  points.forEach((point) => {
    const deltaX = originPoint.x - point.x;
    const deltaY = originPoint.y - point.y;
    const gcdOfDeltaValues = gcd(Math.abs(deltaX), Math.abs(deltaY)) || 1;
    const pointToString = "x" + (deltaX / gcdOfDeltaValues) + "y" +
      (deltaY / gcdOfDeltaValues);
    let offset = 0;

    if (!(pointToString in lineOfSightPoints)) {
      lineOfSightPoints[pointToString] = point;
      offset = 1;
    }
    count += offset;
  });
  return count;
};

export const asteroidsDetections = (asteroids) =>
  asteroids.map((asteroid) => ({
    asteroid,
    detectionCount: detectCount(asteroid, asteroids),
  }));

export const parseString = (string) => string.split("\n").map((x) => x.split(""));

export const getPoints = (rows) => {
  const points = [];
  rows.forEach((row, i) => {
    row.forEach((char, j) => {
      char === "#" && points.push({ x: j, y: i });
    });
  });
  return points;
};

export const monitoringStationOf = (map) => {
  const parsedMap = parseString(map);
  const asteroidsLocations = getPoints(parsedMap);
  const locations = asteroidsDetections(asteroidsLocations);
  
  return maxBy(locations, ({ detectionCount }) => detectionCount);
};

// const asteroidsMap = Deno.readTextFileSync("./data/day10_input.txt");
