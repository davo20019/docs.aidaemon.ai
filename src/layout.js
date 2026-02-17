// ─── Layout Module ──────────────────────────────────────────────────────────

import { LANGUAGES } from './ui-strings.js';

const BASE_URL = 'https://docs.aidaemon.ai';

function langPrefix(lang) {
  return lang === 'en' ? '' : `/${lang}`;
}

function pageUrl(slug, lang) {
  const prefix = langPrefix(lang);
  if (slug === '/') return prefix || '/';
  return `${prefix}${slug}`;
}

// Rewrite internal links in page content for non-English languages
function rewriteLinks(html, lang) {
  if (lang === 'en') return html;
  const prefix = `/${lang}`;
  // Match href="/..." but NOT href="http" or href="mailto:" or href="#"
  return html.replace(/href="\/(?!\/)/g, `href="${prefix}/`);
}

export function renderSidebar(pages, currentSlug, lang, ui) {
  let html = '<nav class="sidebar" id="sidebar">';
  let currentSection = null;

  for (const page of pages) {
    const sectionName = page.section ? (ui.sections[page.section] || page.section) : null;
    if (sectionName !== currentSection) {
      if (currentSection !== null) html += '</div></div>';
      currentSection = sectionName;
      if (sectionName === null) {
        const href = pageUrl(page.slug, lang);
        const active = currentSlug === page.slug ? ' class="active"' : '';
        html += `<a href="${href}"${active}>${page.title}</a>`;
        continue;
      }
      html += `<div class="sidebar-section"><div class="sidebar-label">${sectionName}</div><div class="sidebar-group">`;
    }
    if (sectionName !== null) {
      const href = pageUrl(page.slug, lang);
      const active = currentSlug === page.slug ? ' class="active"' : '';
      html += `<a href="${href}"${active}>${page.title}</a>`;
    }
  }
  if (currentSection !== null) html += '</div></div>';
  html += '</nav>';
  return html;
}

export function buildSearchIndex(pages, lang) {
  return JSON.stringify(pages.map(p => {
    const raw = p.content().replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
    return { slug: pageUrl(p.slug, lang), section: p.section || '', title: p.title, text: raw.slice(0, 1500) };
  }));
}

export function renderPageNav(pages, currentSlug, lang, ui) {
  const idx = pages.findIndex(p => p.slug === currentSlug);
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;
  let html = '<div class="page-nav">';
  if (prev) html += `<a href="${pageUrl(prev.slug, lang)}" class="page-nav-prev"><span class="page-nav-label">${ui.previous}</span><span class="page-nav-title">${prev.title}</span></a>`;
  else html += '<div></div>';
  if (next) html += `<a href="${pageUrl(next.slug, lang)}" class="page-nav-next"><span class="page-nav-label">${ui.next}</span><span class="page-nav-title">${next.title}</span></a>`;
  else html += '<div></div>';
  html += '</div>';
  return html;
}

function renderHreflangTags(slug) {
  let tags = '';
  for (const l of LANGUAGES) {
    const href = `${BASE_URL}${pageUrl(slug, l)}`;
    tags += `<link rel="alternate" hreflang="${l}" href="${href}">`;
  }
  tags += `<link rel="alternate" hreflang="x-default" href="${BASE_URL}${slug === '/' ? '' : slug}">`;
  return tags;
}

function renderLanguageBar(slug, currentLang) {
  const items = LANGUAGES.map(l => {
    const href = pageUrl(slug, l);
    const code = l.toUpperCase();
    if (l === currentLang) {
      return `<span class="lang-active">${code}</span>`;
    }
    return `<a href="${href}">${code}</a>`;
  });
  return `<div class="lang-bar">${items.join('<span class="lang-sep">·</span>')}</div>`;
}

export function layout(page, pages, lang, ui) {
  const canonical = `${BASE_URL}${pageUrl(page.slug, lang)}`;
  const sectionName = page.section ? (ui.sections[page.section] || page.section) : null;
  const isNotFound = page.title === ui.notFoundTitle || page.title === 'Not Found';
  const homeUrl = lang === 'en' ? 'https://aidaemon.ai' : `https://aidaemon.ai/${lang}/`;
  const docsRoot = pageUrl('/', lang);

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}${sectionName ? ' — ' + sectionName : ''} | aidaemon docs</title>
<meta name="description" content="${page.description || 'Documentation for aidaemon — an open-source personal AI agent daemon.'}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${isNotFound ? 'noindex, nofollow' : 'index, follow'}">
${renderHreflangTags(page.slug)}
<meta property="og:title" content="${page.title}${sectionName ? ' — ' + sectionName : ''} | aidaemon docs">
<meta property="og:description" content="${page.description || 'Documentation for aidaemon — an open-source personal AI agent daemon.'}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="aidaemon docs">
<meta property="og:image" content="https://aidaemon.ai/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${page.title}${sectionName ? ' — ' + sectionName : ''} | aidaemon docs">
<meta name="twitter:description" content="${page.description || 'Documentation for aidaemon — an open-source personal AI agent daemon.'}">
<meta name="twitter:image" content="https://aidaemon.ai/og-image.png">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👁</text></svg>">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M14WQGF5W8"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-M14WQGF5W8');
</script>
<style>


*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg-deep: #0a0a0c;
  --bg-surface: #0f1012;
  --bg-elevated: #161619;
  --bg-card: #1a1a1f;
  --border: #2a2a32;
  --border-bright: #3a3a45;
  --text-primary: #e8e8ed;
  --text-secondary: #8a8a96;
  --text-dim: #5a5a66;
  --green: #00ff9d;
  --green-dim: #00cc7d;
  --green-glow: rgba(0, 255, 157, 0.15);
  --cyan: #00d4ff;
  --cyan-dim: #00a8cc;
  --cyan-glow: rgba(0, 212, 255, 0.1);
  --amber: #ffb800;
  --red: #ff4757;
  --mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
  --sans: 'Space Grotesk', system-ui, sans-serif;
}

html { scroll-behavior: smooth; }

html, body {
  max-width: 100%;
  overflow-x: hidden;
}

body {
  font-family: var(--mono);
  background: var(--bg-deep);
  color: var(--text-primary);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  pointer-events: none;
  z-index: 9999;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9998;
}

::selection { background: var(--green); color: var(--bg-deep); }

a { color: var(--green); text-decoration: none; transition: all 0.2s; }
a:hover { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* ── HEADER ── */
.header {
  position: fixed;
  top: 1.55rem;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(10, 10, 12, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
  text-decoration: none;
}
.header-logo:hover { color: var(--text-primary); text-shadow: none; }
.ai { color: var(--green); }

.header-logo .tag {
  color: var(--cyan);
  font-size: 0.7rem;
  font-weight: 400;
  padding: 0.15rem 0.45rem;
  border: 1px solid var(--border);
  border-radius: 3px;
  background: var(--bg-elevated);
}

.header-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.header-links a {
  font-size: 0.8rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}
.header-links a:hover { color: var(--green); text-shadow: none; }

/* ── LANGUAGE BAR ── */
.lang-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 201;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.25rem 1.5rem;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  font-size: 0.7rem;
  font-family: var(--mono);
}
.lang-bar a {
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;
}
.lang-bar a:hover { color: var(--text-secondary); text-shadow: none; }
.lang-active { color: var(--green) !important; font-weight: 600; }
.lang-sep { color: var(--border); margin: 0 0.15rem; }

.hamburger {
  display: none;
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1;
}

/* ── DOCS LAYOUT ── */
.docs-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  padding-top: 78px;
}

/* ── SIDEBAR ── */
.sidebar {
  position: sticky;
  top: 78px;
  height: calc(100vh - 78px);
  overflow-y: auto;
  padding: 1.5rem 1rem;
  border-right: 1px solid var(--border);
  background: var(--bg-surface);
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.sidebar > a {
  display: block;
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  border-radius: 4px;
  border-left: 2px solid transparent;
  margin-bottom: 0.15rem;
  transition: all 0.15s;
}
.sidebar > a:hover { color: var(--text-primary); background: var(--bg-elevated); text-shadow: none; }
.sidebar > a.active { color: var(--green); border-left-color: var(--green); background: var(--green-glow); }

.sidebar-section {
  margin-bottom: 0.5rem;
}

.sidebar-label {
  padding: 0.5rem 0.75rem 0.3rem;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}

.sidebar-group {
  padding-left: 0.25rem;
}

.sidebar-group a {
  display: block;
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  color: var(--text-secondary);
  border-radius: 4px;
  border-left: 2px solid transparent;
  margin-bottom: 0.1rem;
  transition: all 0.15s;
}
.sidebar-group a:hover { color: var(--text-primary); background: var(--bg-elevated); text-shadow: none; }
.sidebar-group a.active { color: var(--green); border-left-color: var(--green); background: var(--green-glow); }

/* ── OVERLAY (mobile) ── */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 149;
  background: rgba(0,0,0,0.6);
}

/* ── CONTENT ── */
.docs-content {
  max-width: 820px;
  padding: 2.5rem 3rem 4rem;
}

.docs-content h1 {
  font-family: var(--mono);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.docs-content h2 {
  font-family: var(--mono);
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
  letter-spacing: -0.01em;
}

.docs-content h3 {
  font-family: var(--mono);
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--cyan);
}

.docs-content p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.8;
}

.docs-content .lead {
  font-size: 0.95rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 300;
  line-height: 1.8;
}

.docs-content ul, .docs-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.docs-content li {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 0.3rem;
}

.docs-content li strong { color: var(--text-primary); font-weight: 500; }

.docs-content code {
  background: var(--bg-elevated);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: var(--cyan);
  border: 1px solid var(--border);
}

/* ── CODE BLOCK ── */
.code-block {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.6rem 1rem;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}

.code-dots {
  display: flex;
  gap: 5px;
}

.code-dots .dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot.r { background: #ff5f57; }
.dot.y { background: #febc2e; }
.dot.g { background: #28c840; }

.code-title {
  font-size: 0.7rem;
  color: var(--text-dim);
  margin-left: 0.25rem;
}

.code-block pre {
  padding: 1rem 1.25rem;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.code-block code {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ── CONFIG TABLE ── */
.config-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25rem;
  font-size: 0.8rem;
}

.config-table thead th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.config-table td {
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  vertical-align: top;
}

.config-table code {
  font-size: 0.75rem;
}

.config-table tbody tr:hover {
  background: var(--bg-surface);
}

/* ── CALLOUT ── */
.callout {
  border-left: 3px solid;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
  border-radius: 0 6px 6px 0;
  background: var(--bg-surface);
}

.callout-info { border-color: var(--green); }
.callout-success { border-color: var(--green); }
.callout-tip { border-color: var(--green); }
.callout-warn { border-color: var(--amber); }
.callout-warning { border-color: var(--amber); }
.callout-danger { border-color: var(--red); }

.callout-title {
  font-size: 0.78rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.callout-info .callout-title, .callout-success .callout-title, .callout-tip .callout-title { color: var(--green); }
.callout-warn .callout-title, .callout-warning .callout-title { color: var(--amber); }
.callout-danger .callout-title { color: var(--red); }

.callout-body {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.callout-body code {
  font-size: 0.75rem;
}

/* ── PAGE NAV ── */
.page-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  gap: 1rem;
}

.page-nav a {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.2s;
  max-width: 50%;
}
.page-nav a:hover { border-color: var(--green); text-shadow: none; background: var(--bg-surface); }

.page-nav-prev { align-items: flex-start; }
.page-nav-next { align-items: flex-end; }

.page-nav-label {
  font-size: 0.65rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.2rem;
}

.page-nav-title {
  font-size: 0.8rem;
  color: var(--green);
  font-weight: 500;
}

/* ── FOOTER ── */
.docs-footer {
  padding: 2rem 3rem;
  border-top: 1px solid var(--border);
  font-size: 0.72rem;
  color: var(--text-dim);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.docs-footer a {
  color: var(--text-dim);
  margin-left: 1.5rem;
}
.docs-footer a:hover { color: var(--green); text-shadow: none; }

/* ── RESPONSIVE ── */
.breadcrumbs {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}
.breadcrumbs a { color: var(--text-secondary); }
.breadcrumbs a:hover { color: var(--green); }
.bc-sep { color: var(--border-bright); }
.bc-current { color: var(--text-secondary); }

@media (max-width: 900px) {
  .docs-layout {
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 100vw;
  }

  .sidebar {
    position: fixed;
    top: 78px;
    left: -280px;
    width: 270px;
    z-index: 150;
    transition: left 0.25s ease;
    border-right: 1px solid var(--border);
  }

  .sidebar.open { left: 0; }
  .sidebar-overlay.open { display: block; }

  .hamburger { display: block; }

  .header-links { display: none; }

  main {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .docs-content {
    padding: 2rem 1rem 3rem;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  .docs-content p,
  .docs-content li,
  .docs-content .lead {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .docs-footer { padding: 1.5rem 1rem; flex-direction: column; gap: 0.75rem; text-align: center; }
  .docs-footer a { margin-left: 0; margin: 0 0.75rem; }

  .page-nav { flex-direction: column; }
  .page-nav a { max-width: 100%; }
  .page-nav-next { align-items: flex-start; }

  /* Tables scroll horizontally on mobile */
  .config-table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }

  /* Code blocks scroll horizontally */
  .code-block { max-width: 100%; overflow-x: auto; }
  .code-block pre { max-width: 100%; }
}

/* ── SEARCH (inline header) ── */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 320px;
  margin: 0 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  transition: border-color 0.2s;
}
.search-wrap:focus-within { border-color: var(--green-dim); }

.search-icon { flex-shrink: 0; color: var(--text-dim); opacity: 0.6; }

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--text-primary);
  padding: 0.1rem 0.5rem;
  min-width: 0;
}
.search-input::placeholder { color: var(--text-dim); }

.search-kbd {
  font-family: var(--mono);
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: 3px;
  color: var(--text-dim);
  flex-shrink: 0;
  pointer-events: none;
}

.search-dropdown {
  display: none;
  position: absolute;
  top: calc(100% + 6px);
  left: -1px;
  right: -1px;
  background: var(--bg-surface);
  border: 1px solid var(--border-bright);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  z-index: 250;
}
.search-dropdown.open { display: block; }

.search-results {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.search-hint {
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-dim);
}

.search-result {
  display: block;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.1s;
  text-decoration: none;
}
.search-result:hover, .search-result.active { background: var(--bg-elevated); }
.search-result:last-child { border-bottom: none; }

.search-result-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.1rem;
}
.search-result:hover .search-result-title,
.search-result.active .search-result-title { color: var(--green); }

.search-result-section {
  font-size: 0.6rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.15rem;
}

.search-result-snippet {
  font-size: 0.7rem;
  color: var(--text-secondary);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.search-result-snippet mark {
  background: var(--green-glow);
  color: var(--green);
  border-radius: 2px;
  padding: 0 0.1rem;
}

@media (max-width: 480px) {
  .header { padding: 0.6rem 0.75rem; }
  .docs-content h1 { font-size: 1.4rem; }
  .docs-content { padding: 1.25rem 0.75rem 2rem; }
  .docs-content p, .docs-content li {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    font-size: 0.82rem;
  }
  .docs-content .lead { font-size: 0.85rem; line-height: 1.7; }
  .config-table { font-size: 0.72rem; }
  .config-table td, .config-table th { padding: 0.4rem 0.5rem; white-space: nowrap; }
  .config-table td:last-child { white-space: normal; min-width: 150px; }
  .search-wrap { max-width: none; margin: 0 0.5rem; flex: 1; }
  .search-kbd { display: none; }
  .code-block code { font-size: 0.7rem; }
  .callout { padding: 0.75rem 0.75rem; }
  .callout-body { font-size: 0.78rem; }
  .docs-footer { padding: 1rem 0.75rem; }
  .lang-bar { padding: 0.2rem 0.75rem; font-size: 0.6rem; }
}
</style>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "aidaemon docs",
  "url": "https://docs.aidaemon.ai",
  "description": "Documentation for aidaemon — an open-source personal AI agent daemon.",
  "publisher": {
    "@type": "Person",
    "name": "David Loor",
    "url": "https://davidloor.com"
  }
}
</script>
</head>
<body>

${renderLanguageBar(page.slug, lang)}
<header class="header">
  <a href="${docsRoot}" class="header-logo">
    <span><span class="ai">AI</span>daemon</span>
    <span class="tag">${ui.docsTag}</span>
  </a>
  <button class="hamburger" onclick="toggleSidebar()" aria-label="${ui.toggleSidebar}">☰</button>
  <div class="search-wrap" id="searchWrap">
    <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input type="text" class="search-input" id="searchInput" placeholder="${ui.searchPlaceholder}" autocomplete="off" />
    <kbd class="search-kbd" id="searchKbd">${ui.searchKbd}</kbd>
    <div class="search-dropdown" id="searchDropdown"></div>
  </div>
  <nav class="header-links">
    <a href="${homeUrl}">${ui.home}</a>
    <a href="${docsRoot}">${ui.docs}</a>
    <a href="https://github.com/davo20019/aidaemon" target="_blank" rel="noopener">${ui.github}</a>
  </nav>
</header>

<div class="docs-layout">
  ${renderSidebar(pages, page.slug, lang, ui)}
  <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
  <main>
    <div class="docs-content">
      <nav aria-label="breadcrumb" class="breadcrumbs">${page.slug === '/' ? '' : `<a href="${docsRoot}">${ui.breadcrumbDocs}</a>` + (sectionName ? ` <span class="bc-sep">/</span> <span>${sectionName}</span>` : '') + ` <span class="bc-sep">/</span> <span class="bc-current">${page.title}</span>`}</nav>
      ${rewriteLinks(page.content(), lang)}
      ${renderPageNav(pages, page.slug, lang, ui)}
    </div>
    <footer class="docs-footer">
      <span><span class="ai">AI</span>daemon &middot; ${ui.footerText} &middot; ${ui.footerBuiltWith}</span>
      <div>
        <a href="https://github.com/davo20019/aidaemon" target="_blank" rel="noopener">GitHub</a>
        <a href="https://github.com/davo20019/aidaemon/issues" target="_blank" rel="noopener">Issues</a>
      </div>
    </footer>
  </main>
</div>

<script>
var searchIndex = ${buildSearchIndex(pages, lang)};
var noResultsText = ${JSON.stringify(ui.noResults)};
var dd = document.getElementById('searchDropdown');
var si = document.getElementById('searchInput');

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

function openDropdown() { dd.classList.add('open'); }
function closeDropdown() { dd.classList.remove('open'); }

si.addEventListener('focus', function() {
  document.getElementById('searchKbd').style.display = 'none';
  if (si.value.trim()) openDropdown();
});
si.addEventListener('blur', function() {
  setTimeout(function() {
    closeDropdown();
    if (!si.value.trim()) document.getElementById('searchKbd').style.display = '';
  }, 150);
});

document.addEventListener('keydown', function(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    si.focus();
    si.select();
  }
  if (e.key === 'Escape' && document.activeElement === si) {
    si.blur();
  }
});

si.addEventListener('input', function() {
  renderResults(si.value);
  if (si.value.trim()) openDropdown();
  else closeDropdown();
});

si.addEventListener('keydown', function(e) {
  var items = dd.querySelectorAll('.search-result');
  var active = dd.querySelector('.search-result.active');
  var idx = Array.from(items).indexOf(active);
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (active) active.classList.remove('active');
    var next = items[idx + 1] || items[0];
    if (next) { next.classList.add('active'); next.scrollIntoView({block:'nearest'}); }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (active) active.classList.remove('active');
    var prev = items[idx - 1] || items[items.length - 1];
    if (prev) { prev.classList.add('active'); prev.scrollIntoView({block:'nearest'}); }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (active) window.location.href = active.getAttribute('href');
  }
});

function renderResults(query) {
  if (!query.trim()) { dd.innerHTML = ''; return; }
  var q = query.toLowerCase().split(/\\s+/).filter(Boolean);
  var scored = searchIndex.map(function(page) {
    var title = page.title.toLowerCase();
    var section = page.section.toLowerCase();
    var text = page.text.toLowerCase();
    var score = 0;
    for (var i = 0; i < q.length; i++) {
      var w = q[i];
      if (title.includes(w)) score += 10;
      if (section.includes(w)) score += 5;
      if (text.includes(w)) score += 1;
    }
    return { page: page, score: score };
  }).filter(function(r) { return r.score > 0; }).sort(function(a, b) { return b.score - a.score; });

  if (!scored.length) {
    dd.innerHTML = '<div class="search-hint">' + noResultsText + '</div>';
    return;
  }

  dd.innerHTML = '<div class="search-results">' + scored.slice(0, 8).map(function(r, i) {
    var snippet = getSnippet(r.page.text, q);
    return '<a class="search-result' + (i === 0 ? ' active' : '') + '" href="' + r.page.slug + '">'
      + '<div class="search-result-title">' + r.page.title + '</div>'
      + (r.page.section ? '<div class="search-result-section">' + r.page.section + '</div>' : '')
      + '<div class="search-result-snippet">' + snippet + '</div>'
      + '</a>';
  }).join('') + '</div>';
}

function getSnippet(text, words) {
  var lower = text.toLowerCase();
  var bestPos = 0;
  for (var i = 0; i < words.length; i++) {
    var p = lower.indexOf(words[i]);
    if (p !== -1) { bestPos = p; break; }
  }
  var start = Math.max(0, bestPos - 40);
  var end = Math.min(text.length, bestPos + 120);
  var snip = (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
  for (var j = 0; j < words.length; j++) {
    var escaped = words[j].replace(/[-\\/\\\\^$*+?.()|[\\]]/g, '\\\\$&');
    var re = new RegExp('(' + escaped + ')', 'gi');
    snip = snip.replace(re, '<mark>$1</mark>');
  }
  return snip;
}
</script>

</body>
</html>`;
}
