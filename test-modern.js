import { renderModern } from './src/templates/modern.js';

const testResume = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '(555) 123-4567',
  location: 'New York, NY',
  summary: 'Experienced software engineer with 5+ years developing web applications and leading technical teams.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      location: 'New York, NY',
      startDate: 'January 2021',
      endDate: 'Present',
      description: 'Led development of multiple full-stack applications using React and Node.js.'
    },
    {
      title: 'Software Engineer',
      company: 'StartUp Co.',
      location: 'San Francisco, CA',
      startDate: 'June 2018',
      endDate: 'December 2020',
      description: 'Developed and maintained responsive web applications.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      graduationDate: 'May 2018'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS', 'SQL']
};

try {
  const html = renderModern(testResume);
  
  // Verify required content is present
  const checks = [
    ['Contains name', html.includes('John Doe')],
    ['Contains email', html.includes('john@example.com')],
    ['Contains phone', html.includes('(555) 123-4567')],
    ['Contains location', html.includes('New York, NY')],
    ['Contains summary', html.includes('Experienced software engineer')],
    ['Contains experience section', html.includes('Experience')],
    ['Contains job title', html.includes('Senior Software Engineer')],
    ['Contains company', html.includes('Tech Company Inc.')],
    ['Contains education section', html.includes('Education')],
    ['Contains degree', html.includes('Bachelor of Science')],
    ['Contains skills section', html.includes('Skills')],
    ['Contains skill', html.includes('JavaScript')],
    ['Is valid HTML', html.includes('<!DOCTYPE html>')],
    ['Has sidebar', html.includes('class="sidebar"')],
    ['Has main content', html.includes('class="main-content"')],
    ['Has modern styling', html.includes('grid-template-columns: 280px 1fr')],
    ['Has accent color', html.includes('#2563eb')],
    ['Has renderModern function', typeof renderModern === 'function'],
    ['Returns string', typeof html === 'string'],
    ['Returns non-empty', html.length > 0]
  ];
  
  console.log('Modern Template Test Results:');
  console.log('==============================');
  let passed = 0;
  let failed = 0;
  
  checks.forEach(([name, result]) => {
    if (result) {
      console.log(`✓ ${name}`);
      passed++;
    } else {
      console.log(`✗ ${name}`);
      failed++;
    }
  });
  
  console.log(`\nTotal: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('\n✓ All tests passed!');
    process.exit(0);
  } else {
    console.log('\n✗ Some tests failed');
    process.exit(1);
  }
} catch (error) {
  console.error('Test error:', error.message);
  process.exit(1);
}
