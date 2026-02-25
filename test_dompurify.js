import DOMPurify from 'dompurify';

// Test 1: Basic style block
const htmlWithStyle = `
  <style>
    .test { color: red; }
  </style>
  <div class="test">Hello</div>
`;

const config = {
  ALLOWED_TAGS: ['p', 'div', 'span', 'section', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br', 'hr', 'blockquote', 'code', 'pre', 'style'],
  ALLOWED_ATTR: ['class', 'href']
};

const result = DOMPurify.sanitize(htmlWithStyle, config);

console.log('=== Test 1: Basic Style Block ===');
console.log('Input HTML:');
console.log(htmlWithStyle);
console.log('\nSanitized result:');
console.log(result);
console.log('\nDoes result contain "color: red"?', result.includes('color: red'));

// Test 2: More complex CSS
const complexHtml = `
  <style>
    body { color: #212121; }
    .primary { color: #1976d2; }
  </style>
  <div class="primary">Test</div>
`;

const result2 = DOMPurify.sanitize(complexHtml, config);
console.log('\n=== Test 2: Complex CSS ===');
console.log('Input:');
console.log(complexHtml);
console.log('\nSanitized:');
console.log(result2);
console.log('Contains "#1976d2"?', result2.includes('#1976d2'));
