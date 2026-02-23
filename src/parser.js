import { marked } from 'marked';

/**
 * Parse markdown string into Resume object
 * @param {string} markdown - Markdown content
 * @returns {Object} Resume object matching schema
 * @throws {Error} If markdown cannot be parsed or is missing required fields
 *
 * @example
 * // Parse basic resume
 * const basicMarkdown = `# John Doe
 * Email: john@example.com | Phone: (555) 1234
 *
 * ## Experience
 * ### Engineer
 * Company | 2020-2022
 * Did engineering work.
 * `;
 * // Expected: name='John Doe', contact.email='john@example.com', contact.phone='(555) 1234', sections.Experience.items[0].title='Engineer'
 *
 * @example
 * // Empty sections
 * const emptySection = `# Jane Doe
 * Email: jane@example.com
 *
 * ## Skills
 *
 * ## Experience`;
 * // Expected: sections.Skills.items=[], sections.Experience.items=[]
 *
 * @example
 * // Missing optional contact fields
 * const minimalContact = `# Alex Kim
 * Email: alex@example.com`;
 * // Expected: contact.phone=null, contact.location=null, contact.github=null
 */
export function resumeFromMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    throw new Error('Markdown input must be a non-empty string');
  }

  try {
    const tokens = marked.lexer(markdown);

    // Extract name from first H1
    const nameToken = tokens.find(t => t.type === 'heading' && t.depth === 1);
    if (!nameToken) {
      throw new Error('Resume must start with a name (# Name)');
    }
    const name = nameToken.text.trim();

    // Extract contact info from paragraph after name
    const nameIndex = tokens.findIndex(t => t.type === 'heading' && t.depth === 1);
    let contact = { email: '', phone: null, location: null, github: null };

    if (nameIndex + 1 < tokens.length && tokens[nameIndex + 1].type === 'paragraph') {
      const contactText = tokens[nameIndex + 1].text;
      contact = schemaToObject(parseContactInfo(contactText));
    }

    // Validate required email
    if (!contact.email) {
      throw new Error('Email address is required in contact info');
    }

    // Parse sections
    const sections = parseSections(tokens, nameIndex);

    return {
      name,
      contact,
      sections
    };
  } catch (error) {
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
}

/**
 * Parse contact info from pipe-separated string
 * Format: Email: x | Phone: y | Location: z | GitHub: w
 * @param {string} text - Contact info text
 * @returns {Object} Parsed contact fields
 */
function parseContactInfo(text) {
  const parts = text.split('|').map(p => p.trim());
  const contact = {
    email: null,
    phone: null,
    location: null,
    github: null
  };

  parts.forEach(part => {
    const colonIndex = part.indexOf(':');
    if (colonIndex === -1) return;

    const key = part.substring(0, colonIndex).trim();
    const value = part.substring(colonIndex + 1).trim();
    const normalizedKey = key.toLowerCase().replace(/\s+/g, '');

    if (normalizedKey === 'email' && value) contact.email = value;
    if (normalizedKey === 'phone' && value) contact.phone = value;
    if (normalizedKey === 'location' && value) contact.location = value;
    if ((normalizedKey === 'github' || normalizedKey === 'portfolio') && value) {
      contact.github = value;
    }
  });

  return contact;
}

/**
 * Convert contact object to final schema format
 * @param {Object} raw - Raw contact data
 * @returns {Object} Formatted contact object
 */
export function schemaToObject(raw) {
  return {
    email: raw.email || '',
    phone: raw.phone || null,
    location: raw.location || null,
    github: raw.github || null
  };
}

/**
 * Parse sections from token stream
 * @param {Array} tokens - marked tokens
 * @param {number} startIndex - Index after name/contact
 * @returns {Object} Sections indexed by name
 */
function parseSections(tokens, startIndex) {
  const sections = {};
  let currentSection = null;
  let currentItems = [];

  for (let i = startIndex + 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'heading' && token.depth === 2) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = {
          title: currentSection,
          items: currentItems
        };
      }
      // Start new section
      currentSection = token.text.trim();
      currentItems = [];
    } else if (token.type === 'heading' && token.depth === 3 && currentSection) {
      // Parse item title
      const itemTitle = token.text.trim();
      const item = { title: itemTitle, subtitle: null, date: null, description: null };

      // Look ahead for content
      // First paragraph might be company/location/dates info
      // Second paragraph is typically the main description
      let descriptionIndex = i + 1;
      if (descriptionIndex < tokens.length && tokens[descriptionIndex].type === 'paragraph') {
        item.subtitle = tokens[descriptionIndex].text.trim();
        descriptionIndex++;
      }

      // Find the actual description (next paragraph that isn't empty)
      while (descriptionIndex < tokens.length) {
        const nextToken = tokens[descriptionIndex];
        if (nextToken.type === 'paragraph' && nextToken.text.trim()) {
          item.description = nextToken.text.trim();
          break;
        } else if (nextToken.type === 'list' || (nextToken.type === 'heading' && nextToken.depth >= 3)) {
          // Stop if we hit a list or another heading
          break;
        }
        descriptionIndex++;
      }

      currentItems.push(item);
    }
  }

  // Save last section
  if (currentSection) {
    sections[currentSection] = {
      title: currentSection,
      items: currentItems
    };
  }

  return sections;
}
