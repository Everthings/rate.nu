import { randomColor } from "randomcolor";

const getHash = (str) => {
  var hash = 0,
    i,
    chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  if (hash < 0) hash = -hash;
  return hash;
};

const getColor = (str, alpha = 1) => {
  const seed = getHash(str);
  const color = randomColor({
    luminosity: "dark",
    format: "rgba",
    alpha,
    seed,
  });

  return color;
};

const getRatingColor = (rating) => {
  const interp = (endVal, startVal) =>
    ((endVal - startVal) * rating) / 5 + startVal;

  if (isNaN(rating)) return "#e5e5e5";

  const greenHSL = [140, 52, 55];
  const redHSL = [355, 84, 55];

  const interpolate = [
    interp(greenHSL[0], redHSL[0]),
    interp(greenHSL[1], redHSL[1]),
    interp(greenHSL[2], redHSL[2]),
  ];

  return `hsl(${interpolate[0]}, ${interpolate[1]}%, ${interpolate[2]}%)`;
};

export { getColor, getRatingColor };
