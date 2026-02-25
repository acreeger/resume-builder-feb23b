import { marked } from 'marked'
import { examples } from './examples.js'
import { resumeFromMarkdown } from './parser.js'
import { renderClassic } from './templates/classic.js'
import { renderModern } from './templates/modern.js'
import { renderMinimal } from './templates/minimal.js'

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

  // Set up live preview and localStorage persistence on input
  editorInput.addEventListener('input', () => {
    updatePreview()
    // Save to localStorage on every input
    localStorage.setItem('resume-content', editorInput.value)
  })

  // Set up template switcher event listeners
  templateButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedTemplate = button.dataset.template
      localStorage.setItem('selected-template', selectedTemplate)
      updateActiveTemplateButton()
      updatePreview()
    })
  })

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
      const parsed = resumeFromMarkdown(markdownText)

      // Select the appropriate render function based on selected template
      let html = ''
      if (selectedTemplate === 'modern') {
        html = renderModern(parsed)
      } else if (selectedTemplate === 'minimal') {
        html = renderMinimal(parsed)
      } else {
        // Default to classic
        html = renderClassic(parsed)
      }

      previewContainer.innerHTML = html
    } catch (error) {
      // If parsing fails, show error message
      previewContainer.innerHTML = `<p style="color: #d32f2f;">Error rendering preview: ${escapeHtml(error.message)}</p>`
    }
  }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp)
