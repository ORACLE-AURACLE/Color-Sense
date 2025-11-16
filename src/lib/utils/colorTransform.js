import { hexToRgb, rgbToHex } from "./contrast";

/**
 * Apply vision mode filter to a color
 * Uses the same transformation matrices as image filtering
 */
export const applyColorVisionFilter = (hexColor, visionMode) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return hexColor;

  const matrix = getColorMatrix(visionMode);

  const newR = Math.min(255, Math.max(0,
    matrix[0][0] * rgb.r + matrix[0][1] * rgb.g + matrix[0][2] * rgb.b
  ));
  const newG = Math.min(255, Math.max(0,
    matrix[1][0] * rgb.r + matrix[1][1] * rgb.g + matrix[1][2] * rgb.b
  ));
  const newB = Math.min(255, Math.max(0,
    matrix[2][0] * rgb.r + matrix[2][1] * rgb.g + matrix[2][2] * rgb.b
  ));

  return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
};

/**
 * Returns color transformation matrix for different vision modes
 */
const getColorMatrix = (visionMode) => {
  switch (visionMode) {
    case "deuteranopia":
      return [
        [0.625, 0.375, 0],
        [0.7, 0.3, 0],
        [0, 0.3, 0.7]
      ];
    
    case "protanopia":
      return [
        [0.567, 0.433, 0],
        [0.558, 0.442, 0],
        [0, 0.242, 0.758]
      ];
    
    case "tritanopia":
      return [
        [0.95, 0.05, 0],
        [0, 0.433, 0.567],
        [0, 0.475, 0.525]
      ];
    
    case "achromatopsia":
    case "monochromacy":
      return [
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114]
      ];
    
    case "deuteranomaly":
      return [
        [0.8, 0.2, 0],
        [0.258, 0.742, 0],
        [0, 0.142, 0.858]
      ];
    
    case "protanomaly":
      return [
        [0.817, 0.183, 0],
        [0.333, 0.667, 0],
        [0, 0.125, 0.875]
      ];
    
    case "tritanomaly":
      return [
        [0.967, 0.033, 0],
        [0, 0.733, 0.267],
        [0, 0.183, 0.817]
      ];
    
    case "normal":
    default:
      return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
  }
};

