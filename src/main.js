import { marked } from 'marked'
import { examples } from './examples.js'

// Simple placeholder parser that extracts structure from markdown
function resumeFromMarkdown(text) {
  const lines = text.split('\n')
  const resume = {
    name: '',
    sections: []
  }

  let currentSection = null
  let currentContent = []

  for (const line of lines) {
    // Check for name (first h1)
    if (line.startsWith('# ') && !resume.name) {
      resume.name = line.replace('# ', '').trim()
    }
    // Check for section headers (h2)
    else if (line.startsWith('## ')) {
      // Save previous section
      if (currentSection) {
        resume.sections.push({
          title: currentSection,
          content: currentContent.join('\n').trim()
        })
      }
      currentSection = line.replace('## ', '').trim()
      currentContent = []
    }
    // Accumulate content
    else if (currentSection) {
      currentContent.push(line)
    }
  }

  // Save final section
  if (currentSection) {
    resume.sections.push({
      title: currentSection,
      content: currentContent.join('\n').trim()
    })
  }

  return resume
}

// Simple render function that creates HTML from parsed resume
function renderResume(resumeData) {
  if (!resumeData.name && resumeData.sections.length === 0) {
    return '<p>Enter markdown content to preview your resume</p>'
  }

  let html = ''

  if (resumeData.name) {
    html += `<h1 class="resume-name">${escapeHtml(resumeData.name)}</h1>`
  }

  for (const section of resumeData.sections) {
    html += `<section class="resume-section">
      <h2 class="section-title">${escapeHtml(section.title)}</h2>
      <div class="section-content">${marked(section.content)}</div>
    </section>`
  }

  return html
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

  // Load default example (engineer resume)
  const defaultContent = examples.engineer
  editorInput.value = defaultContent

  // Initial preview render
  updatePreview()

  // Set up live preview on input
  editorInput.addEventListener('input', updatePreview)

  function updatePreview() {
    const markdownText = editorInput.value
    const parsed = resumeFromMarkdown(markdownText)
    const html = renderResume(parsed)
    previewContainer.innerHTML = html
  }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp)
