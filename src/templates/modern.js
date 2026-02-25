/**
 * Modern Resume Template
 * Contemporary two-column layout with accent colors and clean typography
 * @param {Object} resumeObject - The resume data object
 * @param {Object} [colors] - Optional color palette with primary, secondary, accent, text, background
 */

export function renderModern(resumeObject, colors) {
  const {
    name = '',
    contact = {},
    summary = '',
    skills = [],
    sections = {}
  } = resumeObject;

  // Use provided colors or fall back to defaults
  const colorScheme = colors || {
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    text: '#1f2937',
    background: '#f9fafb'
  };
  const skillsText = Array.isArray(skills)
    ? skills.map(skill =>
        typeof skill === 'string' ? skill : skill.name || ''
      ).filter(Boolean).join(' • ')
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - ${name}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      color: ${colorScheme.text};
      line-height: 1.6;
      background: ${colorScheme.background};
    }

    .resume-container {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 0;
      min-height: 100vh;
      background: white;
    }

    .sidebar {
      background: ${colorScheme.background};
      padding: 40px 30px;
      border-right: 3px solid ${colorScheme.primary};
    }

    .main-content {
      padding: 40px;
    }

    .header {
      margin-bottom: 30px;
      padding-bottom: 25px;
    }

    .name {
      font-size: 28px;
      font-weight: 700;
      color: ${colorScheme.primary};
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    .contact-info {
      font-size: 12px;
      color: ${colorScheme.text};
      line-height: 1.8;
      word-break: break-word;
    }

    .contact-info p {
      margin: 4px 0;
    }

    .section-label {
      font-size: 11px;
      font-weight: 700;
      color: ${colorScheme.secondary};
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-top: 25px;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid ${colorScheme.secondary};
    }

    .sidebar-section {
      margin-bottom: 20px;
    }

    .sidebar-item {
      font-size: 12px;
      color: ${colorScheme.text};
      margin-bottom: 8px;
      line-height: 1.5;
    }

    .sidebar-item-label {
      font-weight: 600;
      color: ${colorScheme.primary};
      font-size: 11px;
      margin-top: 10px;
      margin-bottom: 4px;
    }

    .summary {
      margin-bottom: 30px;
      font-size: 13px;
      color: ${colorScheme.text};
      line-height: 1.7;
    }

    .section {
      margin-bottom: 30px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: ${colorScheme.primary};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid ${colorScheme.primary};
    }

    .entry {
      margin-bottom: 18px;
      padding-bottom: 15px;
    }

    .entry:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .entry-header {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: baseline;
      margin-bottom: 3px;
    }

    .entry-title {
      font-size: 13px;
      font-weight: 600;
      color: ${colorScheme.primary};
    }

    .entry-subtitle {
      font-size: 12px;
      color: ${colorScheme.text};
      font-weight: 500;
    }

    .entry-date {
      font-size: 11px;
      color: ${colorScheme.accent};
      white-space: nowrap;
    }

    .entry-description {
      font-size: 12px;
      color: ${colorScheme.text};
      line-height: 1.5;
      margin-top: 5px;
    }

    .education-entry {
      margin-bottom: 15px;
    }

    .education-entry:last-child {
      margin-bottom: 0;
    }

    .degree {
      font-size: 12px;
      font-weight: 600;
      color: ${colorScheme.primary};
      margin-bottom: 2px;
    }

    .school {
      font-size: 11px;
      color: ${colorScheme.text};
      margin-bottom: 2px;
    }

    .graduation {
      font-size: 11px;
      color: ${colorScheme.accent};
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .skills-list {
      font-size: 12px;
      color: ${colorScheme.text};
      line-height: 1.6;
    }

    @media print {
      body {
        margin: 0;
        padding: 0;
        background: white;
      }

      .resume-container {
        display: grid;
        grid-template-columns: 280px 1fr;
        min-height: auto;
        box-shadow: none;
      }

      .sidebar {
        padding: 40px 30px;
        border-right: 3px solid ${colors.primary};
      }

      .main-content {
        padding: 40px;
      }

      @page {
        size: letter;
        margin: 0;
      }
    }

    @media (max-width: 768px) {
      .resume-container {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .sidebar {
        padding: 30px 25px;
        border-right: none;
        border-bottom: 3px solid ${colorScheme.primary};
      }

      .main-content {
        padding: 30px 25px;
      }

      .name {
        font-size: 24px;
      }

      .skills-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (font-size: 125%) {
      body { font-size: 14px; }
      .name { font-size: 31.5px; }
      .section-title { font-size: 15.75px; }
      .entry-title { font-size: 14.6px; }
      .contact-info { font-size: 13.5px; }
    }

    @media (font-size: 150%) {
      body { font-size: 18px; }
      .name { font-size: 42px; }
      .section-title { font-size: 21px; }
      .entry-title { font-size: 19.5px; }
      .contact-info { font-size: 18px; }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <div class="sidebar">
      <div class="header">
        <div class="name">${escapeHtml(name)}</div>
      </div>

      ${email || phone || location ? `
      <div class="section-label">Contact</div>
      <div class="contact-info">
        ${email ? `<p>${escapeHtml(email)}</p>` : ''}
        ${phone ? `<p>${escapeHtml(phone)}</p>` : ''}
        ${location ? `<p>${escapeHtml(location)}</p>` : ''}
      </div>
      ` : ''}

      ${skillsText ? `
      <div class="section-label">Skills</div>
      <div class="skills-list">
        ${skillsText}
      </div>
      ` : ''}
    </div>

    <div class="main-content">
      ${summary ? `
      <div class="summary">
        ${escapeHtml(summary)}
      </div>
      ` : ''}

      ${experience && experience.length > 0 ? `
      <div class="section">
        <div class="section-title">Experience</div>
        ${experience.map(job => {
          const title = job.title || '';
          const subtitle = job.subtitle || '';
          const date = job.date || '';
          const description = job.description || '';

          return `
          <div class="entry">
            <div class="entry-header">
              <div>
                <div class="entry-title">${escapeHtml(title)}</div>
                ${subtitle ? `<div class="entry-subtitle">${escapeHtml(subtitle)}</div>` : ''}
              </div>
              ${date ? `<div class="entry-date">${escapeHtml(date)}</div>` : ''}
            </div>
            ${description ? `<div class="entry-description">${escapeHtml(description)}</div>` : ''}
          </div>
          `;
        }).join('')}
      </div>
      ` : ''}

      ${education && education.length > 0 ? `
      <div class="section">
        <div class="section-title">Education</div>
        ${education.map(edu => {
          const title = edu.title || '';
          const subtitle = edu.subtitle || '';
          const date = edu.date || '';

          return `
          <div class="education-entry">
            ${title ? `<div class="degree">${escapeHtml(title)}</div>` : ''}
            ${subtitle ? `<div class="school">${escapeHtml(subtitle)}</div>` : ''}
            ${date ? `<div class="graduation">${escapeHtml(date)}</div>` : ''}
          </div>
          `;
        }).join('')}
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>`;
}

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(text) {
  if (!text || typeof text !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}
