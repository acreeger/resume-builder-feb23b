/**
 * PDF Export Module
 * Exports resume preview as PDF using browser's print API
 */

/**
 * Exports the resume element as a PDF file
 * @param {string} elementId - The ID of the DOM element to export (e.g., 'resume-preview')
 * @param {string} filename - The filename for the PDF (default: 'resume.pdf')
 */
export function exportResumeToPDF(elementId, filename = 'resume.pdf') {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }

  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true);

  // Create a temporary container
  const printContainer = document.createElement('div');
  printContainer.id = 'print-container';
  printContainer.style.display = 'none';
  printContainer.appendChild(clonedElement);
  document.body.appendChild(printContainer);

  // Inject print-specific CSS
  injectPrintStyles();

  // Trigger print dialog
  window.print();

  // Clean up after print
  setTimeout(() => {
    document.body.removeChild(printContainer);
    removePrintStyles();
  }, 250);
}

/**
 * Injects CSS styles optimized for printing to PDF
 */
function injectPrintStyles() {
  const styleId = 'pdf-export-styles';

  // Check if styles already exist
  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @media print {
      /* Hide non-essential elements */
      body > *:not(#print-container),
      .no-print,
      [data-no-print] {
        display: none !important;
      }

      /* Reset print container */
      #print-container {
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      /* Page settings */
      @page {
        size: letter;
        margin: 0.5in;
      }

      /* Resume styling */
      #print-container {
        width: 100%;
        max-width: 8.5in;
        margin: 0 auto;
      }

      /* Ensure content stays on one page */
      #print-container > div {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      /* Prevent background colors from printing (reduces ink) */
      * {
        background: transparent !important;
      }

      /* Ensure text is visible */
      body, p, h1, h2, h3, h4, h5, h6 {
        color: black !important;
      }

      /* Remove borders and outlines */
      body, div, section, article {
        border: none !important;
        box-shadow: none !important;
      }

      /* Links should be visible */
      a {
        text-decoration: underline;
        color: #0000cc !important;
      }

      /* Adjust margins for print */
      body {
        margin: 0;
        padding: 0;
      }
    }
  `;

  document.head.appendChild(style);
}

/**
 * Removes the injected print styles
 */
function removePrintStyles() {
  const styleElement = document.getElementById('pdf-export-styles');
  if (styleElement) {
    styleElement.remove();
  }
}

/**
 * Creates and triggers a download of the PDF using html2pdf alternative
 * Use this if you prefer direct PDF generation instead of print API
 * @param {string} elementId - The ID of the DOM element to export
 * @param {string} filename - The filename for the PDF
 */
export function exportResumeToPDFDirect(elementId, filename = 'resume.pdf') {
  // This is a placeholder for direct PDF generation
  // Currently uses window.print() as the primary method
  // If html2pdf library is added later, implement direct generation here
  console.log('Direct PDF export requires html2pdf library. Using print API instead.');
  exportResumeToPDF(elementId, filename);
}

/**
 * Sets up print event listeners for better control
 * @param {function} onBeforePrint - Callback before print dialog opens
 * @param {function} onAfterPrint - Callback after print dialog closes
 */
export function setupPrintListeners(onBeforePrint, onAfterPrint) {
  if (onBeforePrint) {
    window.addEventListener('beforeprint', onBeforePrint);
  }

  if (onAfterPrint) {
    window.addEventListener('afterprint', onAfterPrint);
  }
}

/**
 * Removes print event listeners
 */
export function removePrintListeners() {
  window.removeEventListener('beforeprint', null);
  window.removeEventListener('afterprint', null);
}
