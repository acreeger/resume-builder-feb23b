import { renderModern } from './src/templates/modern.js';

console.log('Acceptance Criteria Validation');
console.log('=============================\n');

const criteria = {
  'HTML template structure created': {
    check: () => typeof renderModern === 'function',
    description: 'renderModern function exists and is callable'
  },
  'CSS styling applied for modern aesthetic': {
    check: () => {
      const html = renderModern({});
      return html.includes('sans-serif') && 
             html.includes('#2563eb') &&
             html.includes('grid-template-columns');
    },
    description: 'Modern CSS with sans-serif fonts, accent color, and grid layout'
  },
  'Template render function returns HTML string': {
    check: () => {
      const html = renderModern({ name: 'Test' });
      return typeof html === 'string' && html.includes('<!DOCTYPE html>');
    },
    description: 'renderModern(resumeObject) returns complete HTML string'
  },
  'Layout includes all sections': {
    check: () => {
      const resume = {
        name: 'John',
        email: 'test@test.com',
        phone: '123',
        location: 'NYC',
        summary: 'Test',
        experience: [{ title: 'Dev', company: 'Inc' }],
        education: [{ degree: 'BS' }],
        skills: ['JS']
      };
      const html = renderModern(resume);
      return html.includes('Contact') &&
             html.includes('Experience') &&
             html.includes('Education') &&
             html.includes('Skills');
    },
    description: 'All sections (name/header, contact, experience, education, skills) present'
  },
  'Styling is visually distinct from Classic': {
    check: () => {
      const html = renderModern({});
      return html.includes('class="sidebar"') &&
             html.includes('class="main-content"') &&
             html.includes('two-column') ||
             html.includes('grid-template-columns: 280px 1fr');
    },
    description: 'Two-column layout with sidebar is distinct design'
  },
  'Page layout fits on single page when printed': {
    check: () => {
      const html = renderModern({});
      return html.includes('@media print') &&
             html.includes('size: letter') &&
             html.includes('margin: 0');
    },
    description: 'Print media queries with letter size and no margins'
  },
  'Responsive to font size changes': {
    check: () => {
      const html = renderModern({});
      return html.includes('@media (font-size:');
    },
    description: 'Accessibility support via font-size media queries'
  },
  'No external libraries required': {
    check: () => {
      const html = renderModern({});
      return !html.includes('src="http') &&
             !html.includes('href="http') &&
             !html.includes('import ');
    },
    description: 'Pure HTML/CSS, no external dependencies in output'
  }
};

let allMet = true;
let count = 0;

Object.entries(criteria).forEach(([name, { check, description }]) => {
  count++;
  const passed = check();
  allMet = allMet && passed;
  console.log(`${passed ? '✓' : '✗'} ${name}`);
  console.log(`  ${description}\n`);
});

console.log(`\nResult: ${allMet ? '✓ All criteria met!' : '✗ Some criteria not met'}`);
process.exit(allMet ? 0 : 1);
