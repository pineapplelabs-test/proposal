const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport to exact A4 width (210mm ≈ 794px at 96dpi)
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  // Load the HTML file
  const htmlPath = path.resolve(__dirname, 'preview.html');
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 2000));

  // Inject PDF-specific overrides to eliminate ALL white space
  await page.addStyleTag({
    content: `
      html, body {
        background: #FFF8E7 !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .cover-page {
        width: 100% !important;
        min-height: 297mm !important;
        margin: 0 !important;
        box-shadow: none !important;
      }
      .content-page {
        width: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        padding: 48px 60px 60px !important;
      }
      .content-page::before {
        display: none !important;
      }
    `
  });

  // Allow styles to reflow
  await new Promise(r => setTimeout(r, 500));

  // Generate PDF
  const outputPath = path.resolve(__dirname, 'PineappleLabs-Proposal.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    displayHeaderFooter: false
  });

  console.log(`✅ PDF generated: ${outputPath}`);
  await browser.close();
})();
