/**
 * Applies color vision deficiency filters to an image
 * @param {HTMLImageElement|HTMLCanvasElement} image - The source image
 * @param {string} visionMode - The vision mode to apply
 * @returns {HTMLCanvasElement} - Canvas with transformed image
 */
export const applyVisionFilter = (image, visionMode) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  canvas.width = image.width || image.naturalWidth;
  canvas.height = image.height || image.naturalHeight;
  
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Apply color transformation matrix based on vision mode
  const matrix = getColorMatrix(visionMode);
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Apply color transformation matrix
    const newR = Math.min(255, Math.max(0, 
      matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b
    ));
    const newG = Math.min(255, Math.max(0, 
      matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b
    ));
    const newB = Math.min(255, Math.max(0, 
      matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b
    ));
    
    data[i] = newR;
    data[i + 1] = newG;
    data[i + 2] = newB;
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

/**
 * Returns color transformation matrix for different vision modes
 * Based on scientific color blindness simulation algorithms
 */
const getColorMatrix = (visionMode) => {
  switch (visionMode) {
    case "deuteranopia":
      // Red-green color blindness (green deficiency)
      return [
        [0.625, 0.375, 0],
        [0.7, 0.3, 0],
        [0, 0.3, 0.7]
      ];
    
    case "protanopia":
      // Red-green color blindness (red deficiency)
      return [
        [0.567, 0.433, 0],
        [0.558, 0.442, 0],
        [0, 0.242, 0.758]
      ];
    
    case "tritanopia":
      // Blue-yellow color blindness
      return [
        [0.95, 0.05, 0],
        [0, 0.433, 0.567],
        [0, 0.475, 0.525]
      ];
    
    case "achromatopsia":
    case "monochromacy":
      // Complete color blindness - grayscale
      return [
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114]
      ];
    
    case "deuteranomaly":
      // Mild green deficiency
      return [
        [0.8, 0.2, 0],
        [0.258, 0.742, 0],
        [0, 0.142, 0.858]
      ];
    
    case "protanomaly":
      // Mild red deficiency
      return [
        [0.817, 0.183, 0],
        [0.333, 0.667, 0],
        [0, 0.125, 0.875]
      ];
    
    case "tritanomaly":
      // Mild blue deficiency
      return [
        [0.967, 0.033, 0],
        [0, 0.733, 0.267],
        [0, 0.183, 0.817]
      ];
    
    case "normal":
    default:
      // No transformation - identity matrix
      return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
  }
};

