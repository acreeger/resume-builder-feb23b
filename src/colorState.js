/**
 * @typedef {Object} ColorPalette
 * @property {string} primary - Primary color in hex format (#RRGGBB)
 * @property {string} secondary - Secondary color in hex format (#RRGGBB)
 * @property {string} accent - Accent color in hex format (#RRGGBB)
 * @property {string} text - Text color in hex format (#RRGGBB)
 * @property {string} background - Background color in hex format (#RRGGBB)
 */

const DEFAULT_PALETTE = {
  primary: '#1e3a8a',
  secondary: '#3b82f6',
  accent: '#60a5fa',
  text: '#1f2937',
  background: '#f9fafb'
};

const STORAGE_KEY = 'resume-builder:colors';

/**
 * Load color palette from localStorage or return default
 * @returns {ColorPalette} The saved color palette or default palette
 * @private
 */
function loadColorPalette() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate that the parsed object has required properties
      if (parsed && typeof parsed === 'object' &&
          'primary' in parsed && 'secondary' in parsed &&
          'accent' in parsed && 'text' in parsed &&
          'background' in parsed) {
        return parsed;
      }
    }
  } catch (error) {
    // localStorage read failed or JSON parse failed - silently fall through to default
    console.warn('Failed to load color palette from localStorage:', error.message);
  }
  return DEFAULT_PALETTE;
}

/**
 * Save color palette to localStorage
 * @param {ColorPalette} palette - The palette to save
 * @private
 */
function saveColorPalette(palette) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
  } catch (error) {
    // localStorage write failed (quota exceeded, read-only, etc) - log but don't throw
    console.warn('Failed to save color palette to localStorage:', error.message);
  }
}

/**
 * Create a color state hook for managing current color palette
 * @returns {{current: ColorPalette, setCurrent: function(ColorPalette): void}} Hook object with current palette and setter
 * @example
 * const colorState = createColorState();
 * console.log(colorState.current.primary); // '#1e3a8a'
 * colorState.setCurrent({...colorState.current, primary: '#ff0000'});
 */
export function createColorState() {
  let currentPalette = loadColorPalette();

  return {
    /**
     * Current color palette
     * @type {ColorPalette}
     */
    get current() {
      return currentPalette;
    },

    /**
     * Set the current color palette and persist to localStorage
     * @param {ColorPalette} palette - The new palette to set
     */
    setCurrent(palette) {
      if (!palette || typeof palette !== 'object') {
        throw new Error('Palette must be a valid object');
      }
      currentPalette = palette;
      saveColorPalette(palette);
    }
  };
}

/**
 * Global color state instance
 * @type {{current: ColorPalette, setCurrent: function(ColorPalette): void}}
 * @private
 */
const globalColorState = createColorState();

/**
 * Hook to access and modify the current color palette
 * Returns the global color state object that can be used by any component
 * @returns {{current: ColorPalette, setCurrent: function(ColorPalette): void}} Hook with current palette and setter
 * @example
 * const colorPalette = useColorPalette();
 * console.log(colorPalette.current.primary);
 * colorPalette.setCurrent(newPalette);
 */
export function useColorPalette() {
  return globalColorState;
}
