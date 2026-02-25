/**
 * Modern Resume Template
 * Contemporary two-column layout with accent colors and clean typography
 *
 * @param {Object} resumeObject - The resume data object
 * @param {Object} [colorPalette] - The color palette object with primary, secondary, accent, text, background
 * @returns {string} Complete HTML string for the resume
 */

export function renderModern(resumeObject, colorPalette = {}) {
  const {
    name = '',
    email = '',
    phone = '',
    location = '',
    summary = '',
    experience = [],
    education = [],
    skills = []
  } = resumeObject;

  // Use provided colors or defaults
  const colors = {
    primary: colorPalette.primary || '#2563eb',
    secondary: colorPalette.secondary || '#3b82f6',
    accent: colorPalette.accent || '#60a5fa',
    text: colorPalette.text || '#2c3e50',
    background: colorPalette.background || '#f8f9fa'
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
      color: ${colors.text};
      line-height: 1.6;
    }

    .resume-container {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 0;
      min-height: 100vh;
      background: white;
    }

    .sidebar {
      background: ${colors.background};
      padding: 40px 30px;
      border-right: 3px solid ${colors.primary};
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
      color: #1a202c;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    .contact-info {
      font-size: 12px;
      color: #7f8c8d;
      line-height: 1.8;
      word-break: break-word;
    }

    .contact-info p {
      margin: 4px 0;
    }

    .section-label {
      font-size: 11px;
      font-weight: 700;
      color: ${colors.primary};
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-top: 25px;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid ${colors.secondary};
    }

    .sidebar-section {
      margin-bottom: 20px;
    }

    .sidebar-item {
      font-size: 12px;
      color: #555;
      margin-bottom: 8px;
      line-height: 1.5;
    }

    .sidebar-item-label {
      font-weight: 600;
      color: #1a202c;
      font-size: 11px;
      margin-top: 10px;
      margin-bottom: 4px;
    }

    .summary {
      margin-bottom: 30px;
      font-size: 13px;
      color: #555;
      line-height: 1.7;
    }

    .section {
      margin-bottom: 30px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: ${colors.primary};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid ${colors.secondary};
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
      color: ${colors.primary};
    }

    .entry-subtitle {
      font-size: 12px;
      color: ${colors.secondary};
      font-weight: 500;
    }

    .entry-date {
      font-size: 11px;
      color: #95a5a6;
      white-space: nowrap;
    }

    .entry-description {
      font-size: 12px;
      color: ${colors.text};
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
      color: ${colors.primary};
      margin-bottom: 2px;
    }

    .school {
      font-size: 11px;
      color: ${colors.secondary};
      margin-bottom: 2px;
    }

    .graduation {
      font-size: 11px;
      color: #95a5a6;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .skills-list {
      font-size: 12px;
      color: ${colors.text};
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
        border-bottom: 3px solid ${colors.primary};
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
          const title = job.title || job.position || '';
          const company = job.company || job.employer || '';
          const startDate = job.startDate || job.start || '';
          const endDate = job.endDate || job.end || '';
          const location = job.location || '';
          const description = job.description || job.summary || '';

          const dateRange = [startDate, endDate].filter(Boolean).join(' - ') || '';

          return `
          <div class="entry">
            <div class="entry-header">
              <div>
                <div class="entry-title">${escapeHtml(title)}</div>
                <div class="entry-subtitle">${escapeHtml(company)}${location ? ' • ' + escapeHtml(location) : ''}</div>
              </div>
              ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
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
          const degree = edu.degree || edu.name || '';
          const school = edu.school || edu.institution || '';
          const graduation = edu.graduationDate || edu.date || '';

          return `
          <div class="education-entry">
            <div class="degree">${escapeHtml(degree)}</div>
            ${school ? `<div class="school">${escapeHtml(school)}</div>` : ''}
            ${graduation ? `<div class="graduation">${escapeHtml(graduation)}</div>` : ''}
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
