/**
 * Classic/Traditional Resume Template
 *
 * A clean, professional resume template with serif fonts and traditional layout
 * suitable for conservative industries.
 *
 * @param {Object} resumeObject - The resume data object
 * @param {string} resumeObject.name - The person's name
 * @param {Object} resumeObject.contact - Contact information
 * @param {string} resumeObject.contact.email - Email address
 * @param {string} [resumeObject.contact.phone] - Phone number
 * @param {string} [resumeObject.contact.location] - Location
 * @param {string} [resumeObject.contact.github] - GitHub profile
 * @param {Object} resumeObject.sections - Resume sections
 * @param {Object} [colorPalette] - The color palette object with primary, secondary, accent, text, background
 * @returns {string} Complete HTML string for the resume
 */
export function renderClassic(resumeObject, colorPalette = {}) {
  const { name, contact, sections } = resumeObject;

  // Use provided colors or defaults
  const colors = {
    primary: colorPalette.primary || '#000',
    secondary: colorPalette.secondary || '#333',
    accent: colorPalette.accent || '#0066cc',
    text: colorPalette.text || '#000',
    background: colorPalette.background || '#fff'
  };

  // Build contact info line
  const contactItems = [];
  if (contact.email) contactItems.push(contact.email);
  if (contact.phone) contactItems.push(contact.phone);
  if (contact.location) contactItems.push(contact.location);
  if (contact.github) contactItems.push(contact.github);
  const contactLine = contactItems.join(' | ');

  // Build sections HTML
  const sectionsHTML = Object.entries(sections || {}).map(([sectionKey, section]) => {
    const items = section.items || [];

    const itemsHTML = items.map(item => {
      let itemContent = '';

      // Title (required)
      if (item.title) {
        itemContent += `<div class="item-title">${escapeHtml(item.title)}</div>`;
      }

      // Subtitle and date row
      const hasSubtitle = item.subtitle;
      const hasDate = item.date;
      if (hasSubtitle || hasDate) {
        itemContent += '<div class="item-meta">';
        if (hasSubtitle) {
          itemContent += `<span class="item-subtitle">${escapeHtml(item.subtitle)}</span>`;
        }
        if (hasDate) {
          itemContent += `<span class="item-date">${escapeHtml(item.date)}</span>`;
        }
        itemContent += '</div>';
      }

      // Description
      if (item.description) {
        itemContent += `<div class="item-description">${escapeHtml(item.description)}</div>`;
      }

      return `<div class="section-item">${itemContent}</div>`;
    }).join('');

    return `
      <section class="resume-section">
        <h2 class="section-title">${escapeHtml(section.title)}</h2>
        <div class="section-content">
          ${itemsHTML}
        </div>
      </section>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(name)} - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Georgia, 'Times New Roman', Times, serif;
      line-height: 1.6;
      color: ${colors.text};
      background-color: ${colors.background};
      padding: 0;
    }

    .resume-container {
      max-width: 8.5in;
      height: 11in;
      margin: 0 auto;
      padding: 0.5in;
      background-color: white;
      font-size: 11pt;
    }

    .resume-header {
      text-align: center;
      margin-bottom: 0.3in;
      padding-bottom: 0.15in;
      border-bottom: 2px solid ${colors.primary};
    }

    .resume-name {
      font-size: 24pt;
      font-weight: bold;
      margin-bottom: 6pt;
      letter-spacing: 0.5pt;
    }

    .resume-contact {
      font-size: 10pt;
      color: ${colors.text};
    }

    .resume-content {
      margin-top: 0.2in;
    }

    .resume-section {
      margin-bottom: 0.25in;
      page-break-inside: avoid;
    }

    .section-title {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      color: ${colors.primary};
      margin-bottom: 0.1in;
      padding-bottom: 0.08in;
      border-bottom: 2px solid ${colors.secondary};
      letter-spacing: 1pt;
    }

    .section-content {
      margin-top: 0.1in;
    }

    .section-item {
      margin-bottom: 0.12in;
      page-break-inside: avoid;
    }

    .item-title {
      font-weight: bold;
      font-size: 11pt;
      color: ${colors.primary};
      margin-bottom: 2pt;
    }

    .item-meta {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 10pt;
      margin-bottom: 3pt;
    }

    .item-subtitle {
      font-style: italic;
      color: ${colors.secondary};
    }

    .item-date {
      text-align: right;
      white-space: nowrap;
      margin-left: 10pt;
    }

    .item-description {
      font-size: 10pt;
      line-height: 1.4;
      margin-left: 0;
      color: ${colors.text};
    }

    /* Print styles */
    @media print {
      body {
        margin: 0;
        padding: 0;
        background-color: white;
      }

      .resume-container {
        max-width: 100%;
        height: 100%;
        margin: 0;
        padding: 0.5in;
        box-shadow: none;
      }

      .resume-section {
        page-break-inside: avoid;
      }

      .section-item {
        page-break-inside: avoid;
      }
    }

    /* Accessibility: Responsive to font size changes */
    @media (max-width: 768px) {
      .resume-container {
        padding: 0.3in;
        font-size: 10pt;
      }

      .resume-name {
        font-size: 20pt;
      }

      .section-title {
        font-size: 11pt;
      }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <header class="resume-header">
      <div class="resume-name">${escapeHtml(name)}</div>
      <div class="resume-contact">${escapeHtml(contactLine)}</div>
    </header>

    <div class="resume-content">
      ${sectionsHTML}
    </div>
  </div>
</body>
</html>`;
}

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, char => map[char]);
}
