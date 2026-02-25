/**
 * Color Palette System for Resume Builder
 *
 * Provides a centralized system for managing color palettes and randomization.
 * Color palettes consist of five key colors that work together for a cohesive design.
 */

/**
 * Predefined color palettes with good contrast and design coherence.
 * Each palette is carefully chosen to ensure readability and visual harmony.
 */
const COLOR_PALETTES = [
  {
    primary: "#0066CC",
    secondary: "#00A8E8",
    accent: "#FF6B35",
    text: "#2C3E50",
    background: "#F8FAFB",
  },
  {
    primary: "#2D6A4F",
    secondary: "#40916C",
    accent: "#D62828",
    text: "#1B3A3A",
    background: "#F7F9F8",
  },
  {
    primary: "#D84315",
    secondary: "#FF9100",
    accent: "#6A1B9A",
    text: "#3E2723",
    background: "#FDF9F6",
  },
  {
    primary: "#6A1B9A",
    secondary: "#9C27B0",
    accent: "#00BCD4",
    text: "#3F2C70",
    background: "#F8F6FB",
  },
  {
    primary: "#00695C",
    secondary: "#009688",
    accent: "#E91E63",
    text: "#263238",
    background: "#F7F9F8",
  },
  {
    primary: "#263238",
    secondary: "#455A64",
    accent: "#FF5722",
    text: "#1B1D1F",
    background: "#FAFBFC",
  },
];

/**
 * Gets a random color palette from the predefined set.
 *
 * Uses Math.random() for randomization. Returns a different palette
 * each time it's called (statistically speaking).
 *
 * @returns A random color palette object with primary, secondary, accent, text, and background properties
 *
 * @example
 * const palette = getRandomColorPalette();
 * console.log(palette.primary); // e.g., "#0066CC"
 */
export function getRandomColorPalette() {
  const randomIndex = Math.floor(Math.random() * COLOR_PALETTES.length);
  return COLOR_PALETTES[randomIndex];
}

/**
 * Gets a color palette by its index in the predefined set.
 *
 * Useful for deterministic palette selection, e.g., based on user preferences
 * or template selection. If the index is out of bounds, wraps around using modulo.
 *
 * @param {number} index - The index of the palette to retrieve (0-based)
 * @returns The color palette at the specified index
 *
 * @example
 * const palette = getColorPaletteByIndex(0); // Gets first palette
 * const palette2 = getColorPaletteByIndex(10); // Wraps around if index > length
 */
export function getColorPaletteByIndex(index) {
  const normalizedIndex = Math.abs(index) % COLOR_PALETTES.length;
  return COLOR_PALETTES[normalizedIndex];
}

/**
 * Returns all available color palettes.
 *
 * Useful for displaying palette options to users or iterating through
 * all available palettes.
 *
 * @returns Array of all color palette objects
 *
 * @example
 * const palettes = getAllColorPalettes();
 * console.log(`Available palettes: ${palettes.length}`);
 */
export function getAllColorPalettes() {
  return COLOR_PALETTES.map((palette) => ({ ...palette }));
}
