import { getRandomInt } from "./util";

interface Limit {
  min: number;
  max: number;
}

interface Limits {
  top: Limit;
  left: Limit;
}

const generatePaths = (limits: Limits, steps: number) => {
  const topPath = new Array<number>(steps);
  const leftPath = new Array<number>(steps);

  let top = 0;
  let left = 0;

  for (let i = 0; i < steps; i++) {
    topPath[i] = top;
    leftPath[i] = left;
    top += getRandomInt(limits.top.min, limits.top.max);
    left += getRandomInt(limits.left.min, limits.left.max);
  }

  return [topPath, leftPath];
};

const scalePath = (path: Array<number>, factor: number) => {
  return path.map((val) => val * factor);
};

export { generatePaths, scalePath };
