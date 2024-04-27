import { getRandomInt } from "./util";

const calculateRelativeLuminence = (
  r8bit: number,
  g8bit: number,
  b8bit: number
) => {
  const sRGB = [r8bit, g8bit, b8bit].map((el) => el / 255);
  const rgb = sRGB.map((el) =>
    el <= 0.03928 ? el / 12.92 : Math.pow((el + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};

type Rgb24Bit = [number, number, number];

/**
 * Returns a value from 1 to 21, with a larger number meaning higher contract.
 * Text should have a value of at least 4.5 (source: https://www.w3.org/TR/WCAG/#contrast-minimum).
 */
const calculateContrastRatio = (rgb24bit1: Rgb24Bit, rgb24bit2: Rgb24Bit) => {
  const l1 = calculateRelativeLuminence(...rgb24bit1);
  const l2 = calculateRelativeLuminence(...rgb24bit2);
  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

const getRandomContrastingHex = (backgroundRgb: Rgb24Bit) => {
  const resultRgb = new Array<number>(3) as [number, number, number];
  let contrastRatio = 0;
  do {
    for (let i = 0; i < 3; i++) {
      resultRgb[i] = getRandomInt(0, 256);
    }
    contrastRatio = calculateContrastRatio(backgroundRgb, resultRgb);
  } while (contrastRatio < 4.5 || contrastRatio > 15);
  return resultRgb.reduce(
    (previous, current) => previous + current.toString(16).padStart(2, "0"),
    "#"
  );
};

export { getRandomContrastingHex };
