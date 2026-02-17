// ─── Shared Helpers ─────────────────────────────────────────────────────────

export function codeBlock(code, lang = '', filename = '') {
  const header = filename || lang;
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<div class="code-block"><div class="code-header"><span class="code-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="code-title">${header}</span></div><pre><code>${escaped}</code></pre></div>`;
}

export function callout(type, title, body) {
  return `<div class="callout callout-${type}"><div class="callout-title">${title}</div><div class="callout-body">${body}</div></div>`;
}

export function configTable(rows) {
  let html = '<table class="config-table"><thead><tr><th>Key</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>';
  for (const r of rows) {
    html += `<tr><td><code>${r[0]}</code></td><td>${r[1]}</td><td><code>${r[2]}</code></td><td>${r[3]}</td></tr>`;
  }
  return html + '</tbody></table>';
}
