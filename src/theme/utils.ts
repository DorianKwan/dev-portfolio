export const pxToRem = (pixels: number, base: number = 16) => {
  return `${pixels / base}rem`;
};

/**
 *
 * @param hexCode string: must be a valid color hex code
 * @param opacity number: must be a valid integer between 0 and 100
 * @returns string: in rgba() format
 */
export const hexToRGBA = (hexCode: string, opacity: number) => {
  if (opacity < 0 || opacity > 100) {
    throw new Error(`Invalid Opacity: ${opacity}`);
  }

  let hex = hexCode.replace('#', '');

  if (hex.length !== 3 && hex.length !== 6) {
    throw new Error(`Invalid hexCode: ${hexCode}`);
  }

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const red = parseInt(hex.substring(0, 2), 16);

  if (red > 255 || isNaN(red)) {
    throw new Error(`Invalid red hex value: ${red}`);
  }

  const green = parseInt(hex.substring(2, 4), 16);

  if (green > 255 || isNaN(green)) {
    throw new Error(`Invalid green hex value: ${green}`);
  }

  const blue = parseInt(hex.substring(4, 6), 16);

  if (blue > 255 || isNaN(blue)) {
    throw new Error(`Invalid blue hex value: ${blue}`);
  }

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};
