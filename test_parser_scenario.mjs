import { resumeFromMarkdown } from './src/parser.js';

// Test 1: With contact info (should work)
const markdownWithContact = `# John Doe
Email: john@example.com

## Experience
### Engineer
Company | 2020-2022
Did engineering work.`;

// Test 2: WITHOUT contact info and NO valid email (should FAIL with validation error)
const markdownNoContact = `# John Doe
## Experience
### Engineer
Company | 2020-2022
Did engineering work.`;

console.log('Test 1: With contact info');
try {
  const result1 = resumeFromMarkdown(markdownWithContact);
  console.log('✓ Success');
  console.log('  Sections:', Object.keys(result1.sections));
  console.log('  Contact email:', result1.contact.email);
  console.log('  First section has items:', result1.sections['Experience'].items.length);
} catch (e) {
  console.log('✗ Error:', e.message);
}

console.log('\nTest 2: Without contact info (no email provided)');
try {
  const result2 = resumeFromMarkdown(markdownNoContact);
  console.log('✓ Success');
  console.log('  Sections:', Object.keys(result2.sections));
} catch (e) {
  console.log('✗ Error:', e.message);
}

// Test 3: What if user provides email directly without "Email:" label?
const markdownWithDirectEmail = `# John Doe
john@example.com

## Experience
### Engineer
Company | 2020-2022
Did engineering work.`;

console.log('\nTest 3: Direct email without label');
try {
  const result3 = resumeFromMarkdown(markdownWithDirectEmail);
  console.log('✓ Success');
  console.log('  Sections:', Object.keys(result3.sections));
} catch (e) {
  console.log('✗ Error:', e.message);
}
