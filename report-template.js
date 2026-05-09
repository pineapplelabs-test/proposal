// ═══════════════════════════════════════════════════════════
// FACILITY 19 — Cover-Page Enterprise Report (n8n Code Node)
// ═══════════════════════════════════════════════════════════

const item = $json;
const data = item.output || item;

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const agentCards = (Array.isArray(data.recommendedAIStaffEcosystem) ? data.recommendedAIStaffEcosystem : [])
  .map(agent => `
    <div class="agent-card">
      <div class="agent-side-accent"></div>
      <div class="agent-main">
        <div class="agent-head">
          <span class="agent-name">${esc(agent.agentName)}</span>
          <span class="agent-pill">${esc(agent.role)}</span>
        </div>
        <div class="agent-details">
          <div class="detail-group"><strong>Inputs:</strong> ${esc(agent.inputs)}</div>
          <div class="detail-group"><strong>Actions:</strong> ${esc(agent.actions)}</div>
          <div class="detail-group"><strong>Systems:</strong> ${esc(agent.systems)}</div>
        </div>
      </div>
    </div>
  `).join('');

const html = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(data.reportTitle || 'Facility 19 AI Staff Plan')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
<style>
  :root {
    --brand: #6366f1;
    --brand-light: #818cf8;
    --brand-glow: rgba(99,102,241,0.15);
    --dark: #0f172a;
    --dark-800: #1e293b;
    --dark-700: #334155;
    --slate: #475569;
    --slate-light: #94a3b8;
    --bg: #f8fafc;
    --surface: #f1f5f9;
    --border: #e2e8f0;
    --white: #ffffff;
    --gold: #f59e0b;
    --teal: #14b8a6;
    --rose: #f43f5e;
    --emerald: #10b981;
  }

  @page { size: A4; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    background: white;
    color: var(--dark);
    line-height: 1.7;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  /* ═══════ COVER PAGE ═══════ */
  .cover-page {
    width: 210mm;
    min-height: 297mm;
    background: var(--dark);
    display: flex;
    flex-direction: column;
    break-after: page;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }

  .cover-page::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .cover-main {
    flex-grow: 1;
    display: flex;
    position: relative;
  }

  .cover-left {
    flex: 1.2;
    padding: 80px 60px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
    position: relative;
  }

  .cover-left::before {
    content: '';
    position: absolute;
    top: 30%;
    left: -60px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%);
    pointer-events: none;
  }

  .cover-right {
    flex: 0.8;
    background: linear-gradient(160deg, #4f46e5 0%, #6366f1 40%, #818cf8 100%);
    position: relative;
    overflow: hidden;
  }

  .cover-right::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);
    pointer-events: none;
  }

  .cover-right::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -40px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(20,184,166,0.15), transparent 70%);
    pointer-events: none;
  }

  .big-f19 {
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translateY(-50%);
    font-size: 280px;
    font-weight: 800;
    color: white;
    opacity: 0.08;
    pointer-events: none;
    letter-spacing: -10px;
    font-family: 'Outfit', sans-serif;
  }

  .brand-tag {
    color: var(--brand-light);
    font-weight: 800;
    letter-spacing: 5px;
    font-size: 12px;
    margin-bottom: 30px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-tag::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--brand-light);
    border-radius: 2px;
    transform: rotate(45deg);
    box-shadow: 0 0 12px rgba(129,140,248,0.5);
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 46px;
    line-height: 1.08;
    margin: 0 0 25px 0;
    color: white;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 18px;
    font-weight: 300;
    opacity: 0.75;
    max-width: 420px;
    color: rgba(255,255,255,0.85);
    line-height: 1.7;
  }

  /* Metadata Bar */
  .meta-bar {
    background: rgba(255, 255, 255, 0.02);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 36px 60px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    position: relative;
    z-index: 2;
  }

  .meta-bar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 60px;
    right: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent);
  }

  .meta-box {
    position: relative;
    padding-right: 20px;
  }

  .meta-box:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255,255,255,0.06);
  }

  .meta-box label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--brand-light);
    display: block;
    margin-bottom: 8px;
    font-weight: 800;
  }

  .meta-box span {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    display: block;
    overflow-wrap: anywhere;
    line-height: 1.4;
  }

  /* ═══════ CONTENT PAGE ═══════ */
  .content-page {
    width: 210mm;
    padding: 48px 60px 60px;
    background: white;
  }

  /* Section Headers */
  .section-header {
    display: flex;
    align-items: center;
    margin: 56px 0 28px 0;
    break-inside: avoid;
    gap: 20px;
  }

  .section-header:first-child {
    margin-top: 10px;
  }

  .section-header h2 {
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 1.5px;
    white-space: nowrap;
    color: var(--dark);
    position: relative;
  }

  .section-header h2::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 36px;
    height: 3px;
    background: var(--brand);
    border-radius: 2px;
  }

  .header-line {
    flex-grow: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border), transparent);
  }

  /* Overview */
  .overview-text {
    font-size: 16px;
    color: var(--slate);
    margin-bottom: 40px;
    line-height: 1.85;
    padding: 24px 28px;
    background: linear-gradient(135deg, #f8fafc, #eef2ff);
    border-left: 4px solid var(--brand);
    border-radius: 0 16px 16px 0;
  }

  /* Grid */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 10px;
  }

  /* Challenge Boxes */
  .challenge-box {
    break-inside: avoid;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    position: relative;
    overflow: hidden;
  }

  .challenge-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
  }

  .challenge-box:first-child::before {
    background: linear-gradient(90deg, var(--rose), var(--gold));
  }

  .challenge-box:last-child::before {
    background: linear-gradient(90deg, var(--teal), var(--emerald));
  }

  .challenge-box h3 {
    font-size: 13px;
    text-transform: uppercase;
    margin-bottom: 14px;
    letter-spacing: 1.5px;
    font-weight: 800;
    color: var(--dark);
  }

  .challenge-box p {
    font-size: 14px;
    color: var(--slate);
    margin: 0;
    line-height: 1.8;
  }

  /* Agent Cards */
  .agents-container {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .agent-card {
    display: flex;
    background: var(--bg);
    border-radius: 20px;
    break-inside: avoid;
    overflow: hidden;
    border: 1px solid var(--border);
  }

  .agent-side-accent {
    width: 6px;
    background: linear-gradient(180deg, var(--brand), var(--brand-light));
    flex-shrink: 0;
  }

  .agent-main {
    padding: 26px 30px;
    flex-grow: 1;
  }

  .agent-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .agent-name {
    font-weight: 800;
    font-size: 17px;
    color: var(--dark);
  }

  .agent-pill {
    font-size: 10px;
    background: linear-gradient(135deg, #eef2ff, #e0e7ff);
    padding: 6px 16px;
    border-radius: 100px;
    font-weight: 700;
    color: var(--brand);
    border: 1px solid #c7d2fe;
  }

  .detail-group {
    font-size: 13.5px;
    margin-bottom: 10px;
    color: var(--slate);
    line-height: 1.7;
  }

  .detail-group strong {
    color: var(--dark);
    font-weight: 700;
    font-size: 12px;
    display: inline-block;
    min-width: 72px;
  }

  /* Impact Tiles */
  .impact-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 30px 0;
  }

  .impact-tile {
    background: linear-gradient(160deg, #0f172a, #1e293b);
    color: white;
    padding: 28px;
    border-radius: 22px;
    break-inside: avoid;
    position: relative;
    overflow: hidden;
  }

  .impact-tile::before {
    content: '';
    position: absolute;
    top: -30px;
    right: -30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    opacity: 0.08;
  }

  .impact-tile:nth-child(1)::before { background: var(--brand); }
  .impact-tile:nth-child(2)::before { background: var(--teal); }
  .impact-tile:nth-child(3)::before { background: var(--gold); }

  .impact-tile::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
  }

  .impact-tile:nth-child(1)::after { background: linear-gradient(90deg, var(--brand), var(--brand-light)); }
  .impact-tile:nth-child(2)::after { background: linear-gradient(90deg, var(--teal), var(--emerald)); }
  .impact-tile:nth-child(3)::after { background: linear-gradient(90deg, var(--gold), #fbbf24); }

  .impact-tile h4 {
    margin: 0 0 14px 0;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 800;
  }

  .impact-tile:nth-child(1) h4 { color: var(--brand-light); }
  .impact-tile:nth-child(2) h4 { color: var(--teal); }
  .impact-tile:nth-child(3) h4 { color: var(--gold); }

  .impact-tile p {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    opacity: 0.88;
  }

  /* Table */
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 20px;
    break-inside: auto;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--border);
  }

  th {
    text-align: left;
    font-size: 10px;
    text-transform: uppercase;
    color: var(--slate-light);
    padding: 16px 24px;
    border-bottom: 2px solid var(--border);
    letter-spacing: 1.5px;
    font-weight: 800;
    background: linear-gradient(180deg, #fafbfc, #f1f5f9);
  }

  td {
    padding: 18px 24px;
    border-bottom: 1px solid var(--surface);
    font-size: 13.5px;
    vertical-align: top;
    line-height: 1.7;
  }

  tr:nth-child(even) td {
    background: rgba(248,250,252,0.5);
  }

  tr:last-child td {
    border-bottom: none;
  }

  .idx {
    font-weight: 800;
    color: var(--brand);
    width: 50px;
    font-size: 15px;
  }

  /* Footer */
  .footer {
    margin-top: 70px;
    padding: 24px 0;
    border-top: 1px solid var(--border);
    font-size: 11px;
    color: var(--slate-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-brand {
    font-weight: 800;
    color: var(--brand);
    font-size: 13px;
    letter-spacing: 2px;
  }

  /* Print */
  @media print {
    body { background: white; }
    .agent-card, .impact-tile, .challenge-box {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    * {
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
    }
    p { orphans: 3; widows: 3; }
  }
</style>
</head>
<body>

  <!-- ═══════ COVER PAGE ═══════ -->
  <div class="cover-page">
    <div class="cover-main">
      <div class="cover-left">
        <div class="brand-tag">FACILITY 19</div>
        <h1>${esc(data.reportTitle)}</h1>
        <p class="subtitle">${esc(data.reportSubtitle)}</p>
      </div>
      <div class="cover-right">
        <div class="big-f19">F19</div>
      </div>
    </div>

    <div class="meta-bar">
      <div class="meta-box"><label>Client</label><span>${esc(data.callerName)}</span></div>
      <div class="meta-box"><label>Email</label><span>${esc(data.callerEmail || 'Not Specified')}</span></div>
      <div class="meta-box"><label>Category</label><span>${esc(data.requestedSubject)}</span></div>
      <div class="meta-box"><label>Date</label><span>${new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span></div>
    </div>
  </div>

  <!-- ═══════ CONTENT PAGE ═══════ -->
  <div class="content-page">

    <div class="section-header"><h2>Executive Overview</h2><div class="header-line"></div></div>
    <div class="overview-text">${esc(data.overview)}</div>

    <div class="grid-2">
      <div class="challenge-box">
        <h3>The Challenge</h3>
        <p>${esc(data.problemWeAreSolving)}</p>
      </div>
      <div class="challenge-box">
        <h3>Existing State</h3>
        <p>${esc(data.currentWorkflow)}</p>
      </div>
    </div>

    <div class="section-header"><h2>AI Staff Members</h2><div class="header-line"></div></div>
    <div class="agents-container">
      ${agentCards}
    </div>

    <div class="section-header"><h2>Business Impact</h2><div class="header-line"></div></div>
    <div class="impact-row">
      <div class="impact-tile"><h4>Revenue Growth</h4><p>${esc(data.revenueImpact)}</p></div>
      <div class="impact-tile"><h4>Efficiency Savings</h4><p>${esc(data.costSavingsImpact)}</p></div>
      <div class="impact-tile"><h4>Operational Velocity</h4><p>${esc(data.operationalImpact)}</p></div>
    </div>

    <div class="section-header"><h2>Tech Integrations</h2><div class="header-line"></div></div>
    <table>
      <thead><tr><th>#</th><th>Scope Area</th><th>System Integration Detail</th></tr></thead>
      <tbody>
        ${(Array.isArray(data.systemsAndIntegrations) ? data.systemsAndIntegrations : []).map((s, i) =>
          '<tr><td class="idx">' + (i+1) + '</td><td>Layer ' + (i+1) + '</td><td>' + esc(s) + '</td></tr>'
        ).join('')}
      </tbody>
    </table>

    <div class="footer">
      <div>Facility 19 Strategy Memo · Confidential</div>
      <div class="footer-brand">F19.AI</div>
    </div>
  </div>

</body>
</html>`;

return [{
  json: {
    subject: data.reportTitle || `Facility 19 Strategy: ${data.requestedSubject}`,
    recipient: data.callerEmail || item.callerEmail || '',
    html: html
  }
}];
