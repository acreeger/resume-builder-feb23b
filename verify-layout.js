import { renderModern } from './src/templates/modern.js';

const testResume = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '(555) 987-6543',
  location: 'San Francisco, CA',
  summary: 'Full-stack developer passionate about creating elegant solutions to complex problems. Expertise in modern web technologies and cloud infrastructure.',
  experience: [
    {
      title: 'Lead Software Engineer',
      company: 'Innovation Labs',
      location: 'San Francisco, CA',
      startDate: 'March 2022',
      endDate: 'Present',
      description: 'Architected and led development of scalable microservices. Mentored team of 6 engineers. Improved system performance by 50%.'
    },
    {
      title: 'Software Engineer',
      company: 'Digital Solutions',
      location: 'San Francisco, CA',
      startDate: 'January 2020',
      endDate: 'February 2022',
      description: 'Built responsive web applications using React and TypeScript. Implemented CI/CD pipelines reducing deployment time by 70%.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'State University',
      graduationDate: 'May 2019'
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'Git', 'Agile']
};

try {
  const html = renderModern(testResume);
  
  // Check for print optimization
  const printChecks = [
    ['Has print media query', html.includes('@media print')],
    ['Has page size letter', html.includes('size: letter')],
    ['Has print margins', html.includes('margin: 0')],
    ['Has font-size scaling', html.includes('@media (font-size:')],
    ['Has responsive media query', html.includes('@media (max-width:')],
    ['Has accessibility support', html.includes('font-size')],
  ];
  
  console.log('Print & Accessibility Checks:');
  console.log('============================');
  
  let allPassed = true;
  printChecks.forEach(([name, result]) => {
    console.log(`${result ? '✓' : '✗'} ${name}`);
    if (!result) allPassed = false;
  });
  
  // Check HTML structure
  const hasDoctype = html.includes('<!DOCTYPE html>');
  const hasHead = html.includes('<head>');
  const hasBody = html.includes('<body>');
  const hasContainer = html.includes('class="resume-container"');
  const hasSidebar = html.includes('class="sidebar"');
  const hasMainContent = html.includes('class="main-content"');
  
  console.log('\nHTML Structure Checks:');
  console.log('=====================');
  console.log(`${hasDoctype ? '✓' : '✗'} DOCTYPE present`);
  console.log(`${hasHead ? '✓' : '✗'} Head section present`);
  console.log(`${hasBody ? '✓' : '✗'} Body section present`);
  console.log(`${hasContainer ? '✓' : '✗'} Container div present`);
  console.log(`${hasSidebar ? '✓' : '✗'} Sidebar present`);
  console.log(`${hasMainContent ? '✓' : '✗'} Main content area present`);
  
  if (allPassed && hasDoctype && hasHead && hasBody && hasContainer && hasSidebar && hasMainContent) {
    console.log('\n✓ All layout checks passed!');
  }
  
  // Save sample output for manual inspection
  const fs = await import('fs');
  fs.writeFileSync('/tmp/modern-resume.html', html);
  console.log('\nSample output saved to /tmp/modern-resume.html');
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
