#!/usr/bin/env node
/**
 * Checks every internal link in the built site: that the target page exists,
 * and that the anchor within it exists.
 *
 * Runs against `dist/` rather than the source, because that is the only place
 * the real answer lives. Astro passes `./`-prefixed markdown links through to
 * the href verbatim, and every Starlight page renders at a trailing-slash URL,
 * so `./other-page/` on `/docs/a/b/` silently resolves to `/docs/a/b/other-page/`
 * and 404s. Nothing in the source looks wrong. Eleven links shipped that way.
 *
 * Anchors are checked too, because a correct path to a heading that has since
 * been renamed is just as broken from a reader's point of view.
 *
 *   pnpm build && pnpm lint:links
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const ROOT = 'dist';

const ASSET_EXT = [
  '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif',
  '.xml', '.txt', '.ico', '.pdf', '.js', '.css', '.json', '.zip',
];

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** The URL a built file is served at. */
function urlOf(file) {
  let rel = relative(ROOT, file).split(sep).join('/');
  if (rel.endsWith('index.html')) rel = rel.slice(0, -'index.html'.length);
  return `/${rel}`;
}

/** The file that serves a given path, or undefined. */
function fileFor(pathname) {
  const p = pathname.replace(/^\/+|\/+$/g, '');
  for (const candidate of [join(ROOT, p, 'index.html'), join(ROOT, p)]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return undefined;
}

const idCache = new Map();
function idsIn(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idCache.set(file, new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

if (!existsSync(ROOT)) {
  console.error(`No ${ROOT}/ directory. Run \`pnpm build\` first.`);
  process.exit(2);
}

const problems = [];
let checked = 0;

for (const file of await htmlFiles(ROOT)) {
  const base = new URL(urlOf(file), 'https://site.invalid');
  const html = readFileSync(file, 'utf8');
  const hrefs = new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));

  for (const raw of hrefs) {
    const href = raw.replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|javascript:|data:|#)/.test(href)) continue;

    const resolved = new URL(href, base);
    const { pathname, hash } = resolved;
    const anchor = decodeURIComponent(hash.replace(/^#/, ''));

    if (ASSET_EXT.some((ext) => pathname.toLowerCase().endsWith(ext))) {
      if (!fileFor(pathname)) problems.push({ kind: 'asset missing', href, base: base.pathname });
      continue;
    }

    checked++;
    const target = fileFor(pathname);
    if (!target) {
      problems.push({ kind: 'no such page', href, base: base.pathname });
      continue;
    }
    if (anchor && !idsIn(target).has(anchor)) {
      problems.push({ kind: 'anchor missing', href, base: base.pathname });
    }
  }
}

console.log(`Checked ${checked} internal links across the built site.`);

if (problems.length === 0) {
  console.log('All internal links and anchors resolve.');
  process.exit(0);
}

console.error(`\n${problems.length} broken link${problems.length === 1 ? '' : 's'}:\n`);
for (const { kind, href, base } of problems.sort((a, b) => a.kind.localeCompare(b.kind))) {
  console.error(`  [${kind}] ${href}`);
  console.error(`      on ${base}`);
}
process.exit(1);
