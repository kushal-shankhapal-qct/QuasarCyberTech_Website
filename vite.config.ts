import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import fs from "node:fs/promises";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://quasarcybertech.com';
const SITEMAP_EXCLUDES = new Set([
  '/404',
  '/case-studies',
  '/advisories',
  '/infosec-dictionary',
  '/security-mindmap',
  '/privacy-policy',
  '/terms-conditions',
  '/careers/apply',
]);

const formatLocalDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const getPriority = (route: string) => {
  if (route === '/') return '1.0';
  if (route === '/capabilities' || route === '/industries' || route === '/blogs') return '0.9';
  if (route.startsWith('/capabilities/') || route.startsWith('/industries/') || route.startsWith('/blogs/')) return '0.8';
  if (route === '/aboutus' || route === '/platforms' || route === '/contact' || route === '/careers') return '0.7';
  return '0.5';
};

const getChangefreq = (route: string) => {
  if (route === '/') return 'weekly';
  if (route === '/blogs' || route.startsWith('/blogs/')) return 'weekly';
  if (route.startsWith('/capabilities/') || route.startsWith('/industries/')) return 'monthly';
  if (route === '/capabilities' || route === '/industries') return 'monthly';
  return 'monthly';
};

const collectHtmlFiles = async (dir: string): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectHtmlFiles(fullPath);
      }

      return entry.name.endsWith('.html') ? [fullPath] : [];
    }),
  );

  return files.flat();
};

const toRoutePath = (distDir: string, filePath: string) => {
  const relativePath = path.relative(distDir, filePath).replace(/\\/g, '/');

  if (relativePath === 'index.html') {
    return '/';
  }

  if (relativePath === '404.html') {
    return '/404';
  }

  return `/${relativePath.replace(/\.html$/, '')}`;
};

const writeSeoArtifacts = async (distDir: string) => {
  const htmlFiles = await collectHtmlFiles(distDir);
  const routes = htmlFiles
    .map((filePath) => ({
      route: toRoutePath(distDir, filePath),
      filePath,
    }))
    .filter(({ route }) => !SITEMAP_EXCLUDES.has(route))
    .sort((a, b) => a.route.localeCompare(b.route));

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(async ({ route, filePath }) => {
      const stats = await fs.stat(filePath);
      const lastModified = formatLocalDate(stats.mtime);
      return [
        '  <url>',
        `    <loc>${new URL(route, SITE_URL).toString()}</loc>`,
        `    <lastmod>${lastModified}</lastmod>`,
        `    <changefreq>${getChangefreq(route)}</changefreq>`,
        `    <priority>${getPriority(route)}</priority>`,
        '  </url>',
      ].join('\n');
    }),
    '</urlset>',
    '',
  ];

  const sitemapEntries = await Promise.all(sitemapXml.slice(2, -2));
  const sitemapOutput = [sitemapXml[0], sitemapXml[1], ...sitemapEntries, sitemapXml[sitemapXml.length - 2], sitemapXml[sitemapXml.length - 1]].join('\n');

  const robotsTxt = [
    '# ── Verified search engine crawlers ──────────────────────────────',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Googlebot-Image',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    'User-agent: Slurp',
    'Allow: /',
    '',
    'User-agent: DuckDuckBot',
    'Allow: /',
    '',
    'User-agent: Baiduspider',
    'Allow: /',
    '',
    'User-agent: facebookexternalhit',
    'Allow: /',
    '',
    'User-agent: LinkedInBot',
    'Allow: /',
    '',
    'User-agent: Twitterbot',
    'Allow: /',
    '',
    'User-agent: WhatsApp',
    'Allow: /',
    '',
    '# ── AI training & data-harvesting bots — blocked ─────────────────',
    'User-agent: GPTBot',
    'Disallow: /',
    '',
    'User-agent: ChatGPT-User',
    'Disallow: /',
    '',
    'User-agent: CCBot',
    'Disallow: /',
    '',
    'User-agent: anthropic-ai',
    'Disallow: /',
    '',
    'User-agent: Claude-Web',
    'Disallow: /',
    '',
    'User-agent: Bytespider',
    'Disallow: /',
    '',
    'User-agent: Amazonbot',
    'Disallow: /',
    '',
    'User-agent: Diffbot',
    'Disallow: /',
    '',
    'User-agent: Applebot-Extended',
    'Disallow: /',
    '',
    'User-agent: omgili',
    'Disallow: /',
    '',
    'User-agent: img2dataset',
    'Disallow: /',
    '',
    '# ── Aggressive SEO audit bots — blocked ──────────────────────────',
    'User-agent: SemrushBot',
    'Disallow: /',
    '',
    'User-agent: AhrefsBot',
    'Disallow: /',
    '',
    'User-agent: MJ12bot',
    'Disallow: /',
    '',
    'User-agent: DotBot',
    'Disallow: /',
    '',
    'User-agent: BLEXBot',
    'Disallow: /',
    '',
    'User-agent: PetalBot',
    'Disallow: /',
    '',
    '# ── Default: allow all other crawlers, hide internal-only paths ──',
    'User-agent: *',
    'Allow: /',
    'Disallow: /careers/apply',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemapOutput, 'utf8');
  await fs.writeFile(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
};

const liftSeoTagsIntoHead = (_route: string, renderedHtml: string) => {
  const seoTagPattern = /<(title>[\s\S]*?<\/title>|meta\s+(?:name|property|http-equiv)=["'][^"']+["'][^>]*>|meta\s+charset[^>]*>|link\s+rel=["'](?:canonical|alternate)["'][^>]*(?:\/>|>)|script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>)/g;

  // react-helmet-async during SSG outputs tags between </head> and <body>
  // We need to find all such tags and inject them into <head> before </head>
  const headCloseIdx = renderedHtml.indexOf('</head>');
  const bodyOpenIdx = renderedHtml.indexOf('<body>');

  if (headCloseIdx === -1 || bodyOpenIdx === -1) {
    return renderedHtml;
  }

  const beforeHeadClose = renderedHtml.slice(0, headCloseIdx);
  const gapSection = renderedHtml.slice(headCloseIdx + '</head>'.length, bodyOpenIdx);
  const bodySection = renderedHtml.slice(bodyOpenIdx + '<body>'.length);

  // Collect SEO tags from the gap (react-helmet-async SSG output location)
  const gapTags = gapSection.match(seoTagPattern) || [];
  // Also collect from body (fallback for runtime-injected tags)
  const bodyTags = bodySection.match(seoTagPattern) || [];

  const allSeoTags = [...gapTags, ...bodyTags];

  if (!allSeoTags.length) {
    return renderedHtml;
  }

  // Clean existing title/description from the head to avoid duplicates
  const cleanedBeforeHead = beforeHeadClose
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description" content="[^"]*">/, '')
    .replace(/\n{3,}/g, '\n\n');

  // Clean the gap and body of the extracted tags
  const cleanedGap = gapSection.replace(seoTagPattern, '').trim();
  const cleanedBody = bodySection.replace(seoTagPattern, '');

  // Build the cleaned gap separator (if non-empty, include it between head and body)
  const gapRemainder = cleanedGap ? `\n${cleanedGap}\n` : '\n';

  return `${cleanedBeforeHead}${allSeoTags.join('')}\n</head>${gapRemainder}<body>${cleanedBody}`;
};

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          if (
            id.includes('react-simple-maps') ||
            id.includes('recharts') ||
            id.includes('swiper') ||
            id.includes('embla-carousel') ||
            id.includes('dotted-map')
          ) {
            return 'visuals';
          }

          if (id.includes('intl-tel-input') || id.includes('libphonenumber-js')) {
            return 'contact';
          }

          return 'vendor';
        },
      },
    },
  },
  ssgOptions: {
    script: 'defer',
    formatting: 'none',
    beastiesOptions: {
      preload: 'swap',
      fonts: true,
      preloadFonts: true,
    },
    onPageRendered: liftSeoTagsIntoHead,
    onFinished: writeSeoArtifacts,
  },
});
