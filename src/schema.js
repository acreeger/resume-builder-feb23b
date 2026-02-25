/**
 * @typedef {Object} ResumeContact
 * @property {string} email - Email address (required)
 * @property {string|null} [phone] - Phone number
 * @property {string|null} [location] - City, State
 * @property {string|null} [github] - GitHub profile URL
 */

/**
 * @typedef {Object} ResumeItem
 * @property {string|null} [title] - Item title (e.g., job title, degree)
 * @property {string|null} [subtitle] - Item subtitle (e.g., company, school)
 * @property {string|null} [date] - Date range or single date
 * @property {string|null} [description] - Description or body text
 */

/**
 * @typedef {Object} ResumeSection
 * @property {string} title - Section name (e.g., "Experience")
 * @property {ResumeItem[]} items - Array of items in section
 */

/**
 * @typedef {Object} Resume
 * @property {string} name - Person's name
 * @property {ResumeContact} contact - Contact information
 * @property {Object.<string, ResumeSection>} sections - Sections indexed by name
 */

export const EMPTY_RESUME = {
  name: '',
  contact: { email: '', phone: null, location: null, github: null },
  sections: {}
};

export const RESUME_SCHEMA_DESCRIPTION = {
  name: 'Full name (from H1)',
  contact: 'Contact info (email required, pipe-separated after name)',
  sections: 'Named sections (H2 headers) containing items (H3 headers)'
};
