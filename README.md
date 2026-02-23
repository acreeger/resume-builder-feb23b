# PDF Export Module

Self-contained PDF export functionality for the resume builder application.

## Overview

This module provides a simple, dependency-free way to export resume previews as PDF files using the browser's native print API with CSS media queries. No external libraries are required.

## What's Included

- **`src/pdf-export.js`** - Main PDF export module with all necessary functions
- **`example.html`** - Complete working example showing integration
- **`IMPLEMENTATION.md`** - Detailed implementation guide with integration steps

## Quick Start

### Basic Usage

```javascript
import { exportResumeToPDF } from './src/pdf-export.js';

// In your button click handler
downloadBtn.addEventListener('click', () => {
  exportResumeToPDF('resume-preview', 'resume.pdf');
});
```

### HTML Structure

Your resume preview needs a container element with an ID:

```html
<div id="resume-preview">
  <!-- Resume content here -->
</div>
```

## API Reference

### `exportResumeToPDF(elementId, filename)`

Exports the specified element as a PDF.

**Parameters:**
- `elementId` (string) - ID of the DOM element to export
- `filename` (string, optional) - PDF filename (default: 'resume.pdf')

**Example:**
```javascript
exportResumeToPDF('resume-preview', 'my-resume.pdf');
```

### `setupPrintListeners(onBeforePrint, onAfterPrint)`

Adds event listeners for print lifecycle.

**Parameters:**
- `onBeforePrint` (function, optional) - Called before print dialog opens
- `onAfterPrint` (function, optional) - Called after print dialog closes

**Example:**
```javascript
setupPrintListeners(
  () => console.log('Starting print'),
  () => console.log('Print completed')
);
```

## Features

✅ **No Dependencies** - Uses browser's native APIs
✅ **Template Compatible** - Works with any template styling
✅ **Single-Page Format** - Automatically optimized for letter-size pages
✅ **Print Preview** - Users can review before saving
✅ **Auto-Cleanup** - Temporary elements removed automatically
✅ **Styled Output** - Preserves template styling in PDF
✅ **Modern Browsers** - Works in Chrome, Firefox, Safari, Edge

## How It Works

1. Creates a clone of the resume element
2. Injects print-optimized CSS
3. Triggers the browser's print dialog
4. User selects "Save as PDF" or prints to printer
5. Automatically cleans up temporary elements

## Print Styling

The module automatically applies optimized print CSS:

- **Layout**: Letter size (8.5" x 11") with 0.5" margins
- **Colors**: Removes backgrounds for reduced ink usage
- **Text**: Ensures high contrast and readability
- **Spacing**: Optimized for single-page layout
- **Links**: Preserved and underlined

## Browser Support

Works with all modern browsers supporting:
- `window.print()` API
- CSS media queries (`@media print`)
- ES6 modules (or use with bundler)

**Tested on:**
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Integration Guide

See **IMPLEMENTATION.md** for step-by-step integration instructions with your app.

## Example

A complete working example is provided in **example.html**. Open it in a browser to see:
- Sample resume content
- Download button
- Print dialog integration
- CSS styling example

## Customization

### Change Default Filename

```javascript
exportResumeToPDF('resume-preview', 'john-doe-resume.pdf');
```

### Customize Print Styles

Edit the `injectPrintStyles()` function in `src/pdf-export.js` to adjust:
- Margins and spacing
- Font sizes
- Colors and backgrounds
- Page breaks

### Add Print Callbacks

```javascript
setupPrintListeners(
  () => {
    // Show loading indicator
    document.getElementById('loading').style.display = 'block';
  },
  () => {
    // Hide loading indicator
    document.getElementById('loading').style.display = 'none';
  }
);
```

## Troubleshooting

### PDF comes out as multiple pages
- Check that the resume content fits within 8.5" x 11"
- Adjust margins in `injectPrintStyles()` if needed
- Use CSS to reduce spacing in your template

### Styling not preserved
- Ensure inline styles or CSS classes are properly applied
- Check that CSS media queries don't conflict
- Test with different browser zoom levels

### Button doesn't trigger download
- Verify the element ID matches your resume container
- Check browser console for errors
- Ensure the function is being called with correct element ID

## Future Enhancements

### Direct PDF Generation
If direct generation without print dialog is needed, enhance the module to use `html2pdf` library:

```javascript
import html2pdf from 'html2pdf.js';

export function exportResumeToPDFDirect(elementId, filename) {
  const element = document.getElementById(elementId);
  html2pdf().set({filename}).from(element).save();
}
```

### Template-Specific Styling
Create separate style configurations for different templates:
- Modern template
- Traditional template
- Creative template

## License

Part of the Resume Builder project.

## Notes

- This module is designed to be self-contained and portable
- It integrates seamlessly with the main resume builder app
- No configuration required beyond calling the main function
- Compatible with all three resume templates
