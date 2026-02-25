import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { examples } from './examples.js'
import { resumeFromMarkdown } from './parser.js'
import { renderClassic } from './templates/classic.js'
import { renderModern } from './templates/modern.js'
import { renderMinimal } from './templates/minimal.js'
import { getRandomColorPalette } from './utils/colorPalettes.js'

// Debounce function to limit how often a function is called
function debounce(func, delay) {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * Load colors from localStorage or use default palette
 * @returns {Object} The color palette object
 */
function loadColors() {
  try {
    const savedColorsJson = localStorage.getItem('resume-colors')
    if (savedColorsJson) {
      const parsedColors = JSON.parse(savedColorsJson)
      // Sanitize colors to strip any extraneous properties and prevent injection attacks
      const sanitized = sanitizeColors(parsedColors)
      if (sanitized) {
        return sanitized
      }
    }
  } catch (error) {
    // Only catch JSON parsing errors; other localStorage errors are unexpected
    if (error instanceof SyntaxError) {
      console.warn('Failed to parse colors from localStorage:', error)
    } else {
      console.warn('Failed to load colors from localStorage:', error)
    }
  }

  // Use first palette from getAllColorPalettes() as default
  try {
    const allPalettes = getAllColorPalettes()
    const firstPaletteId = Object.keys(allPalettes)[0]
    return allPalettes[firstPaletteId]
  } catch (error) {
    // If colorPalettes module is not available, use a basic fallback
    console.warn('Failed to load color palettes:', error)
    return {
      id: 'default',
      name: 'Default',
      primary: '#1976d2',
      accent: '#0d47a1',
      text: '#212121',
      background: '#ffffff'
    }
  }
}

// Color state management
let selectedColors = loadColors()
let selectedTemplate = 'classic'

// DOM elements - selected at module scope to avoid repeated DOM queries
let editorInput = null
let previewContainer = null

/**
 * Update preview with current markdown content and template
 */
function updatePreview() {
  if (!editorInput || !previewContainer) {
    return
  }

  const markdownText = editorInput.value

  try {
    // Configure marked with GFM and breaks options
    marked.setOptions({
      breaks: true,
      gfm: true
    })

    const parsed = resumeFromMarkdown(markdownText)

    // Select the appropriate render function based on selected template
    let html = ''
    if (selectedTemplate === 'modern') {
      html = renderModern(parsed, selectedColors)
    } else if (selectedTemplate === 'minimal') {
      html = renderMinimal(parsed, selectedColors)
    } else {
      // Default to classic
      html = renderClassic(parsed, selectedColors)
    }

    // Sanitize HTML before insertion to prevent DOM-based XSS with DOMPurify
    const sanitizedHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'div', 'span', 'section', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br', 'hr', 'blockquote', 'code', 'pre', 'style'],
      ALLOWED_ATTR: ['class', 'href']
    })
    previewContainer.innerHTML = sanitizedHtml
  } catch (error) {
    // If parsing fails, show error message
    if (previewContainer) {
      previewContainer.innerHTML = ''
      const errorEl = document.createElement('p')
      errorEl.style.color = '#d32f2f'
      errorEl.textContent = `Error rendering preview: ${error.message}`
      previewContainer.appendChild(errorEl)
    }
  }
}

/**
 * Update selected colors and persist to localStorage
 * @param {Object} palette - The color palette object to set
 */
export function setColors(palette) {
  if (!palette) {
    return
  }

  // Sanitize colors to strip extraneous properties and prevent injection attacks
  const sanitized = sanitizeColors(palette)
  if (!sanitized) {
    return
  }

  selectedColors = sanitized

  try {
    localStorage.setItem('resume-colors', JSON.stringify(sanitized))
  } catch (error) {
    // Silently handle localStorage errors
    console.warn('Failed to save colors to localStorage:', error)
  }

  // Update preview with new colors
  updatePreview()
}

/**
 * Export the selected colors for use throughout the app
 */
export function getSelectedColors() {
  return selectedColors
}

// Initialize the app
function initializeApp() {
  // Initialize module-scoped DOM elements
  editorInput = document.getElementById('markdown-input')
  previewContainer = document.getElementById('preview')
  const templateButtons = document.querySelectorAll('.template-btn')
  const exampleBtns = document.querySelectorAll('.example-btn')
  const randomizeBtn = document.getElementById('randomize-colors-btn')

  // Add null checks for critical DOM elements
  if (!editorInput || !previewContainer) {
    console.error('Failed to initialize: required DOM elements not found')
    return
  }

  // Load selected template from localStorage with allowlist validation
  const allowedTemplates = ['classic', 'minimal', 'modern']
  const savedTemplate = localStorage.getItem('selected-template')
  selectedTemplate = allowedTemplates.includes(savedTemplate) ? savedTemplate : 'classic'

  // Check for saved content in localStorage, otherwise use default example
  const savedContent = localStorage.getItem('resume-content')
  const defaultContent = savedContent || examples.engineer
  editorInput.value = defaultContent

  // Set the active template button on init
  updateActiveTemplateButton()

  // Initial preview render
  updatePreview()

  // Wire up example loader buttons
  exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const exampleKey = btn.dataset.example
      editorInput.value = examples[exampleKey]
      localStorage.setItem('resume-content', editorInput.value)
      updatePreview()
      // Update active state
      exampleBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
    })
  })

  // Set up live preview and localStorage persistence on input with debouncing
  const debouncedUpdate = debounce(() => {
    updatePreview()
    // Save to localStorage on every input
    if (editorInput) {
      localStorage.setItem('resume-content', editorInput.value)
    }
  }, 300)

  editorInput.addEventListener('input', debouncedUpdate)

  // Set up template switcher event listeners
  templateButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedTemplate = button.dataset.template
      localStorage.setItem('selected-template', selectedTemplate)
      updateActiveTemplateButton()
      updatePreview()
    })
  })

  // Set up randomize colors button
  if (randomizeBtn) {
    randomizeBtn.addEventListener('click', () => {
      const palette = getRandomColorPalette()
      setColors(palette)
      // Add visual feedback
      randomizeBtn.classList.add('active')
      setTimeout(() => {
        randomizeBtn.classList.remove('active')
      }, 600)
    })
  }

  function updateActiveTemplateButton() {
    templateButtons.forEach(button => {
      button.classList.remove('active')
      if (button.dataset.template === selectedTemplate) {
        button.classList.add('active')
      }
    })
  }

}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp)
