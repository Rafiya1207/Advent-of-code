import { sumOf } from "jsr:@std/collections";

const mins = ([...args], count = 2) =>
  args.sort((a, b) => a - b).slice(0, count);

const area = (a, b) => a * b;

const perimeter = (l, b) => 2 * (l + b);

const cubicVolume = (l, w, h) => l * w * h;

const areaOfSmallestSide = (l, w, h) => {
  const dimensions = mins([l, w, h]);
  return area(dimensions[0], dimensions[1]);
};

const surfaceArea = (l, w, h) => (2 * l * w) + (2 * w * h) + (2 * h * l);

const total = (l, w, h) => surfaceArea(l, w, h) + areaOfSmallestSide(l, w, h);

const perimeterOfSmallestSide = (l, w, h) => {
  const dimensions = mins([l, w, h]);
  return perimeter(dimensions[0], dimensions[1]);
};

const parseInput = (input) =>
  input
    .split("\n")
    .map((dimension) => dimension.split("x"))
    .map((units) => units.map((unit) => parseInt(unit)));

const totalMeasurementOfPresents = (dimensions) =>
  sumOf(dimensions, (dimension) => total(...dimension));

const totalMeasurementOfRibbons = (dimensions) =>
  sumOf(
    dimensions,
    (dimension) =>
      perimeterOfSmallestSide(...dimension) + cubicVolume(...dimension),
  );

const input = Deno.readTextFileSync("./day_2_input.txt");

console.log(totalMeasurementOfRibbons(parseInput(input)));
