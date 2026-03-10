import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { examples } from './examples.js'
import { resumeFromMarkdown } from './parser.js'
import { renderClassic } from './templates/classic.js'
import { renderModern } from './templates/modern.js'
import { renderMinimal } from './templates/minimal.js'
import { useColorPalette } from './colorState.js'
import { getRandomColorPalette } from './utils/colorPalettes.js'

// Debounce function to limit how often a function is called
function debounce(func, delay) {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Initialize the app
function initializeApp() {
  const editorInput = document.getElementById('markdown-input')
  const previewContainer = document.getElementById('preview')
  const templateButtons = document.querySelectorAll('.template-btn')
  const exampleBtns = document.querySelectorAll('.example-btn')
  const randomizeBtn = document.getElementById('randomize-colors-btn')
  const colorPalette = useColorPalette()

  // State for selected template
  let selectedTemplate = localStorage.getItem('selected-template') || 'classic'

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
    localStorage.setItem('resume-content', editorInput.value)
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
      colorPalette.setCurrent(palette)
      updatePreview()
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

  function updatePreview() {
    const markdownText = editorInput.value

    try {
      // Configure marked with GFM and breaks options
      marked.setOptions({
        breaks: true,
        gfm: true
      })

      const parsed = resumeFromMarkdown(markdownText)
      const palette = colorPalette.current

      // Select the appropriate render function based on selected template
      let html = ''
      if (selectedTemplate === 'modern') {
        html = renderModern(parsed, palette)
      } else if (selectedTemplate === 'minimal') {
        html = renderMinimal(parsed, palette)
      } else {
        // Default to classic
        html = renderClassic(parsed, palette)
      }

      // Sanitize HTML before insertion to prevent DOM-based XSS with DOMPurify
      const sanitizedHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['p', 'div', 'span', 'section', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br', 'hr', 'blockquote', 'code', 'pre', 'style'],
        ALLOWED_ATTR: ['class', 'href']
      })
      previewContainer.innerHTML = sanitizedHtml
    } catch (error) {
      // If parsing fails, show error message
      previewContainer.innerHTML = `<p style="color: #d32f2f;">Error rendering preview: ${escapeHtml(error.message)}</p>`
    }
  }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp)
