import { describe, it, expect } from 'vitest'
import { renderMinimal } from './minimal.js'

describe('renderMinimal', () => {
  const mockResumeObject = {
    name: 'Test User',
    contact: {
      email: 'test@example.com',
      phone: '123-456-7890',
      location: 'Test City',
      github: 'testuser'
    },
    sections: {
      experience: {
        title: 'Experience',
        items: [
          {
            title: 'Senior Developer',
            subtitle: 'Tech Company',
            date: '2023-2024',
            description: 'Led development of key features'
          }
        ]
      },
      education: {
        title: 'Education',
        items: [
          {
            title: 'Bachelor of Science',
            subtitle: 'University Name',
            date: '2019',
            description: 'Computer Science'
          }
        ]
      }
    }
  }

  it('renders with default colors when colorScheme is not provided', () => {
    const html = renderMinimal(mockResumeObject)

    // Verify default colors are present in the CSS
    expect(html).toContain('color: #000') // text color
    expect(html).toContain('background-color: #fff') // background
    expect(html).toContain('border-bottom: 1px solid #e0e0e0') // section divider
    expect(html).toContain('color: #e0e0e0') // secondary/meta text (now uses secondary color)

    // Verify HTML structure is intact
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('resume-container')
    expect(html).toContain('Test User')
    expect(html).toContain('test@example.com')
  })

  it('renders with custom colors when colorScheme is provided', () => {
    const customScheme = {
      text: '#333333',
      background: '#f5f5f5',
      secondary: '#cccccc',
      primary: '#0066cc',
      accent: '#ff6600'
    }
    const html = renderMinimal(mockResumeObject, customScheme)

    // Verify custom colors are applied
    expect(html).toContain('color: #333333') // custom text
    expect(html).toContain('background-color: #f5f5f5') // custom background
    expect(html).toContain('border-bottom: 1px solid #cccccc') // custom divider

    // Verify default colors are not used (except where not overridden)
    expect(html).not.toContain('color: #000')
    expect(html).not.toContain('background-color: #fff')
    expect(html).not.toContain('border-bottom: 1px solid #e0e0e0')
  })

  it('renders with partial colorScheme (partial override)', () => {
    const partialScheme = {
      text: '#222222'
    }
    const html = renderMinimal(mockResumeObject, partialScheme)

    // Custom color should be applied
    expect(html).toContain('color: #222222')

    // Default colors for non-overridden properties
    expect(html).toContain('background-color: #fff') // default background
    expect(html).toContain('border-bottom: 1px solid #e0e0e0') // default secondary
  })

  it('maintains HTML structure with optional colorScheme parameter', () => {
    const html = renderMinimal(mockResumeObject)

    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<html lang="en">')
    expect(html).toContain('resume-container')
    expect(html).toContain('resume-header')
    expect(html).toContain('resume-name')
    expect(html).toContain('resume-contact')
    expect(html).toContain('resume-content')
    expect(html).toContain('resume-section')
    expect(html).toContain('Test User')
    expect(html).toContain('test@example.com')
    expect(html).toContain('Senior Developer')
    expect(html).toContain('Led development of key features')
  })

  it('handles empty sections gracefully', () => {
    const minimalResume = {
      name: 'John Doe',
      contact: { email: 'john@example.com' },
      sections: {}
    }
    const html = renderMinimal(minimalResume)

    expect(html).toContain('John Doe')
    expect(html).toContain('john@example.com')
    expect(html).toContain('resume-container')
  })

  it('escapes HTML special characters in user content', () => {
    const dangerousResume = {
      name: '<script>alert("xss")</script>',
      contact: { email: 'test@example.com' },
      sections: {
        test: {
          title: '<h1>Danger</h1>',
          items: [
            {
              title: 'Title with "quotes" & ampersand',
              description: 'Description with <tag>'
            }
          ]
        }
      }
    }
    const html = renderMinimal(dangerousResume)

    // Should not contain unescaped script tags
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&lt;h1&gt;')
    expect(html).toContain('&quot;')
    expect(html).toContain('&amp;')
  })

  it('applies colors to all required CSS selectors', () => {
    const customScheme = {
      text: '#111111',
      background: '#eeeeee',
      secondary: '#999999'
    }
    const html = renderMinimal(mockResumeObject, customScheme)

    // Count occurrences of custom colors to verify they're applied in multiple places
    const textColorCount = (html.match(/#111111/g) || []).length
    const bgColorCount = (html.match(/#eeeeee/g) || []).length
    const secondaryColorCount = (html.match(/#999999/g) || []).length

    // Should appear multiple times for body, contact, meta, subtitle, description
    expect(textColorCount).toBeGreaterThan(1)
    expect(bgColorCount).toBeGreaterThan(1)
    expect(secondaryColorCount).toBeGreaterThan(1)
  })

  it('rejects CSS injection attempts in color values', () => {
    const injectionPayloads = {
      text: '</style><script>alert("xss")</script>',
      background: 'red; background-image: url("http://attacker.com")',
      secondary: '#000; display: none'
    }
    const html = renderMinimal(mockResumeObject, injectionPayloads)

    // Should not contain injected script tags or suspicious CSS
    expect(html).not.toContain('</style><script>')
    expect(html).not.toContain('attacker.com')
    expect(html).not.toContain('display: none')

    // Should fall back to default colors
    expect(html).toContain('color: #000')
    expect(html).toContain('background-color: #fff')
  })

  it('accepts valid CSS color formats', () => {
    const validColors = {
      text: 'rgb(0, 0, 0)',
      background: 'rgba(255, 255, 255, 0.9)',
      secondary: 'hsl(0, 0%, 88%)',
      primary: '#0066cc',
      accent: '#ff6600'
    }
    const html = renderMinimal(mockResumeObject, validColors)

    // Valid color formats should be applied
    expect(html).toContain('rgb(0, 0, 0)')
    expect(html).toContain('rgba(255, 255, 255, 0.9)')
    expect(html).toContain('hsl(0, 0%, 88%)')
    // primary and accent are reserved for future use, so check text/background/secondary instead
    expect(html).toContain('color: rgb(0, 0, 0)')
  })

  it('rejects invalid color values and uses defaults', () => {
    const invalidColors = {
      text: 'not-a-color',
      background: '123456', // invalid format
      secondary: 'url("http://attacker.com")',
      primary: null,
      accent: undefined
    }
    const html = renderMinimal(mockResumeObject, invalidColors)

    // Should reject invalid values and use defaults
    expect(html).not.toContain('not-a-color')
    expect(html).not.toContain('attacker.com')
    expect(html).toContain('color: #000') // default text
    expect(html).toContain('background-color: #fff') // default background
  })
})
