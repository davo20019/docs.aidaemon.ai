// aidaemon docs — Cloudflare Worker (multilingual router)

import { layout } from './layout.js';
import { LANGUAGES, uiStrings } from './ui-strings.js';
import enPages from './pages/en.js';
import esPages from './pages/es.js';
import dePages from './pages/de.js';
import ptPages from './pages/pt.js';
import frPages from './pages/fr.js';

const allPages = { en: enPages, es: esPages, de: dePages, pt: ptPages, fr: frPages };
const BASE_URL = 'https://docs.aidaemon.ai';

function langPrefix(lang) {
  return lang === 'en' ? '' : `/${lang}`;
}

function pageUrl(slug, lang) {
  const prefix = langPrefix(lang);
  if (slug === '/') return prefix || '/';
  return `${prefix}${slug}`;
}

function generateSitemap() {
  const enP = allPages.en;
  const urls = enP.map(p => {
    const alternates = LANGUAGES.map(l =>
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}${pageUrl(p.slug, l)}"/>`
    ).join('\n');
    const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${p.slug === '/' ? '' : p.slug}"/>`;

    return LANGUAGES.map(l => {
      const loc = `${BASE_URL}${pageUrl(p.slug, l)}`;
      return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${l === 'en' ? '1.0' : '0.8'}</priority>
${alternates}
${xdefault}
  </url>`;
    }).join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/robots.txt') {
      return new Response('User-agent: *\nAllow: /\nSitemap: https://docs.aidaemon.ai/sitemap.xml', {
        headers: { 'content-type': 'text/plain', 'cache-control': 'public, max-age=86400' },
      });
    }

    if (path === '/sitemap.xml') {
      return new Response(generateSitemap(), {
        headers: { 'content-type': 'application/xml', 'cache-control': 'public, max-age=86400' },
      });
    }

    // Extract language from URL path
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    let lang = 'en';
    let slug = path;

    if (firstSegment && LANGUAGES.includes(firstSegment) && firstSegment !== 'en') {
      lang = firstSegment;

      // Strip the language prefix to get the slug
      slug = '/' + segments.slice(1).join('/');
      if (slug === '/') slug = '/';
    }

    const pages = allPages[lang];
    const ui = uiStrings[lang];

    if (!pages || !ui) {
      // Invalid language — fall back to English 404
      const enUi = uiStrings.en;
      return new Response(layout({
        slug: path,
        title: enUi.notFoundTitle,
        description: enUi.notFoundMessage,
        content: () => `<h1>${enUi.notFoundHeading}</h1><p class="lead">${enUi.notFoundMessage}</p><p><a href="/">${enUi.notFoundLink}</a></p>`,
      }, allPages.en, 'en', enUi), {
        status: 404,
        headers: { 'content-type': 'text/html;charset=UTF-8', 'content-language': 'en' },
      });
    }

    const page = pages.find(p => p.slug === slug);
    if (!page) {
      const docsRoot = lang === 'en' ? '/' : `/${lang}/`;
      return new Response(layout({
        slug: slug,
        title: ui.notFoundTitle,
        description: ui.notFoundMessage,
        content: () => `<h1>${ui.notFoundHeading}</h1><p class="lead">${ui.notFoundMessage}</p><p><a href="${docsRoot}">${ui.notFoundLink}</a></p>`,
      }, pages, lang, ui), {
        status: 404,
        headers: { 'content-type': 'text/html;charset=UTF-8', 'content-language': lang },
      });
    }

    return new Response(layout(page, pages, lang, ui), {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'content-language': lang,
        'cache-control': 'public, max-age=60, s-maxage=300',
      },
    });
  },
};
