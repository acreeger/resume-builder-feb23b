/**
 * Minimal Resume Template
 *
 * A stripped-down, clean aesthetic focusing on content and whitespace.
 * Uses system UI fonts, minimal color palette, and generous spacing.
 *
 * @param {Object} resumeObject - The resume data object
 * @param {string} resumeObject.name - The person's name
 * @param {Object} resumeObject.contact - Contact information
 * @param {string} resumeObject.contact.email - Email address
 * @param {string} [resumeObject.contact.phone] - Phone number
 * @param {string} [resumeObject.contact.location] - Location
 * @param {string} [resumeObject.contact.github] - GitHub profile
 * @param {Object} resumeObject.sections - Resume sections
 * @param {Object} [colors] - Optional color palette with primary, secondary, accent, text, background
 * @returns {string} Complete HTML string for the resume
 */
export function renderMinimal(resumeObject, colors) {
  const { name, contact, sections } = resumeObject;

  // Use provided colors or fall back to defaults
  const colorScheme = colors || {
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    text: '#1f2937',
    background: '#f9fafb'
  };

  // Build contact info line
  const contactItems = [];
  if (contact.email) contactItems.push(contact.email);
  if (contact.phone) contactItems.push(contact.phone);
  if (contact.location) contactItems.push(contact.location);
  if (contact.github) contactItems.push(contact.github);
  const contactLine = contactItems.join(' • ');

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
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.7;
      color: ${colorScheme.text};
      background-color: ${colorScheme.background};
      padding: 0;
    }

    .resume-container {
      max-width: 8.5in;
      height: 11in;
      margin: 0 auto;
      padding: 0.75in;
      background-color: ${colorScheme.background};
      font-size: 10pt;
    }

    .resume-header {
      margin-bottom: 0.5in;
      padding-bottom: 0;
    }

    .resume-name {
      font-size: 18pt;
      font-weight: 500;
      margin-bottom: 8pt;
      letter-spacing: 0;
      color: ${colorScheme.primary};
    }

    .resume-contact {
      font-size: 9pt;
      color: ${colorScheme.text};
      line-height: 1.5;
    }

    .resume-content {
      margin-top: 0.4in;
    }

    .resume-section {
      margin-bottom: 0.4in;
      page-break-inside: avoid;
    }

    .section-title {
      font-size: 10pt;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 0.15in;
      padding-bottom: 0.08in;
      border-bottom: 1px solid ${colorScheme.secondary};
      letter-spacing: 0.5pt;
      color: ${colorScheme.primary};
    }

    .section-content {
      margin-top: 0.15in;
    }

    .section-item {
      margin-bottom: 0.18in;
      page-break-inside: avoid;
    }

    .item-title {
      font-weight: 500;
      font-size: 10pt;
      margin-bottom: 2pt;
      color: ${colorScheme.primary};
    }

    .item-meta {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 9pt;
      margin-bottom: 4pt;
      color: ${colorScheme.secondary};
    }

    .item-subtitle {
      font-weight: 400;
      color: ${colorScheme.secondary};
    }

    .item-date {
      text-align: right;
      white-space: nowrap;
      margin-left: 10pt;
      color: ${colorScheme.text};
    }

    .item-description {
      font-size: 9pt;
      line-height: 1.5;
      margin-left: 0;
      color: ${colorScheme.text};
    }

    /* Print styles */
    @media print {
      body {
        margin: 0;
        padding: 0;
        background-color: ${colorScheme.background};
      }

      .resume-container {
        max-width: 100%;
        height: 100%;
        margin: 0;
        padding: 0.75in;
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
        padding: 0.5in;
        font-size: 9pt;
      }

      .resume-name {
        font-size: 16pt;
      }

      .section-title {
        font-size: 9pt;
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
