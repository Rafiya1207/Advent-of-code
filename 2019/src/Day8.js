import { chunk, minBy } from "@std/collections";
import { pixels } from "../data/image_pixels.js";

const width = 25;
const height = 6;

const layerLength = width * height;

const image = pixels;
const layers = [];

const generateLayer = (str, index) => {
  const layer = [];

  let start = index;
  for (let r = 0; r < height; r++) {
    layer.push(str.slice(start, start + width));
    start += width;
  }

  return layer;
};

const countChars = (str, char) =>
  [...str].reduce((count, el) => el === char ? count + 1 : count, 0);

for (let layerStart = 0; layerStart < image.length; layerStart += layerLength) {
  layers.push(generateLayer(image, layerStart));
}

const finalImage = [];

for (let r = 0; r < height; r++) {
  finalImage[r] = "";
  for (let cl = 0; cl < width; cl++) {
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
      if (layers[layerIndex][r][cl] !== '2') {
        finalImage[r] += layers[layerIndex][r][cl];
        break;
      }
    }
  }
}

const message = finalImage.map((x) => x.replaceAll("0", "⬛️").replaceAll("1", "⬜️"));

console.log(message.join('\n'));

// const layerWithMin0 = minBy(layers, (layer) => countChars(layer, "0"));

// const numberOfOnes = countChars(layerWithMin0, "1");
// const numberOfTwos = countChars(layerWithMin0, "2");

// console.log(numberOfOnes * numberOfTwos);
// console.log(layers.length);

// console.log(chunk(message, 25).map((x) => x.join("")));
