/**
 * @typedef {Object} ColorPalette
 * @property {string} primary - Primary color in hex format (#RRGGBB)
 * @property {string} secondary - Secondary color in hex format (#RRGGBB)
 * @property {string} accent - Accent color in hex format (#RRGGBB)
 * @property {string} text - Text color in hex format (#RRGGBB)
 * @property {string} background - Background color in hex format (#RRGGBB)
 */

/**
 * Array of professional color palettes for resume templates
 * @type {ColorPalette[]}
 */
const COLOR_PALETTES = [
  {
    name: 'Classic Blue',
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    text: '#1f2937',
    background: '#f9fafb'
  },
  {
    name: 'Modern Teal',
    primary: '#0d9488',
    secondary: '#14b8a6',
    accent: '#2dd4bf',
    text: '#0f172a',
    background: '#f0fdfa'
  },
  {
    name: 'Professional Purple',
    primary: '#6d28d9',
    secondary: '#7c3aed',
    accent: '#a78bfa',
    text: '#1f1f2e',
    background: '#faf5ff'
  },
  {
    name: 'Elegant Slate',
    primary: '#334155',
    secondary: '#475569',
    accent: '#64748b',
    text: '#0f172a',
    background: '#f8fafc'
  },
  {
    name: 'Bold Crimson',
    primary: '#991b1b',
    secondary: '#dc2626',
    accent: '#f87171',
    text: '#1f2937',
    background: '#fef2f2'
  },
  {
    name: 'Executive Green',
    primary: '#15803d',
    secondary: '#22c55e',
    accent: '#86efac',
    text: '#1a1a1a',
    background: '#f0fdf4'
  }
];

/**
 * Returns a random color palette from the available palettes
 * @returns {ColorPalette} A randomly selected color palette
 * @example
 * const palette = getRandomColorPalette();
 * console.log(palette.primary); // '#1e3a8a' or another palette's primary
 */
export function getRandomColorPalette() {
  const randomIndex = Math.floor(Math.random() * COLOR_PALETTES.length);
  return COLOR_PALETTES[randomIndex];
}

/**
 * Returns all available color palettes
 * @returns {ColorPalette[]} Array of all color palette objects
 * @example
 * const palettes = getAllColorPalettes();
 * console.log(palettes.length); // 6
 */
export function getAllColorPalettes() {
  return COLOR_PALETTES;
}

/**
 * Returns a specific color palette by index
 * @param {number} index - The index of the palette (0-5)
 * @returns {ColorPalette|undefined} The palette at the specified index, or undefined if index is out of bounds
 * @example
 * const palette = getColorPaletteByIndex(0);
 * console.log(palette.name); // 'Classic Blue'
 */
export function getColorPaletteByIndex(index) {
  return COLOR_PALETTES[index];
}
