/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 formula
 */
export const getRelativeLuminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Convert RGB to hex
 */
export const rgbToHex = (r, g, b) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

/**
 * Calculate contrast ratio between two colors
 * Returns ratio as a number (e.g., 4.5 for 4.5:1)
 */
export const getContrastRatio = (color1, color2) => {
  const rgb1 = typeof color1 === "string" ? hexToRgb(color1) : color1;
  const rgb2 = typeof color2 === "string" ? hexToRgb(color2) : color2;

  if (!rgb1 || !rgb2) return 0;

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check WCAG compliance levels
 */
export const getWCAGCompliance = (contrastRatio) => {
  return {
    normal: {
      AA: contrastRatio >= 4.5,
      AAA: contrastRatio >= 7,
    },
    large: {
      AA: contrastRatio >= 3,
      AAA: contrastRatio >= 4.5,
    },
    ratio: contrastRatio,
  };
};

/**
 * Get WCAG compliance status text
 */
export const getComplianceStatus = (compliance) => {
  if (compliance.normal.AAA) {
    return { level: "AAA", text: "Passes all accessibility standards", color: "text-green-600" };
  } else if (compliance.normal.AA) {
    return { level: "AA", text: "Meets minimum standards for normal text", color: "text-yellow-600" };
  } else if (compliance.large.AA) {
    return { level: "AA Large", text: "Meets standards for large text only", color: "text-orange-600" };
  } else {
    return { level: "Fail", text: "Does not meet accessibility standards", color: "text-red-600" };
  }
};

