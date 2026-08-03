/**
 * Rewrite internal links in Italian blog posts to Italian locale paths
 * when an IT equivalent exists.
 *
 * Maps:
 * - lib/i18n/config.js serviceSlugMap (bg → it)
 * - content/it/post-slug-map.json (bg sourceSlug → slugIt)
 *
 * Usage:
 *   node scripts/rewrite-it-blog-links.mjs
 *   node scripts/rewrite-it-blog-links.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { serviceSlugMap } from "../lib/i18n/config.js";

const DRY = process.argv.includes("--dry-run");
const POSTS_DIR = "content/it/posts";
const MAP_PATH = "content/it/post-slug-map.json";

const postSlugMap = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));

const SITE_HOSTS = [
  "findstaff.bg",
  "www.findstaff.bg",
  "findstaff.admin-panels.com",
];

function stripHost(url) {
  try {
    const u = new URL(url);
    if (!SITE_HOSTS.includes(u.hostname.toLowerCase())) return null;
    return u.pathname + u.search + u.hash;
  } catch {
    return null;
  }
}

function rewritePath(pathname) {
  if (!pathname || typeof pathname !== "string") return null;

  let p = pathname;
  // already Italian
  if (p.startsWith("/it/")) return null;

  // /services/{bgSlug} or /blog/{bgSlug}
  let m = p.match(/^\/services\/([^/?#]+)(\/)?([?#].*)?$/);
  if (m) {
    const bg = decodeURIComponent(m[1]);
    const it = serviceSlugMap[bg];
    if (it) return `/it/services/${it}${m[3] || ""}`;
    return null;
  }

  m = p.match(/^\/blog\/([^/?#]+)(\/)?([?#].*)?$/);
  if (m) {
    const bg = decodeURIComponent(m[1]);
    const it = postSlugMap[bg];
    if (it) return `/it/blog/${it}${m[3] || ""}`;
    return null;
  }

  // bare locale paths that should be prefixed
  if (p === "/services" || p === "/services/") return "/it/services";
  if (p === "/blog" || p === "/blog/") return "/it/blog";
  if (p === "/contact" || p === "/contact/") return "/it/contact";
  if (p === "/about" || p === "/about/") return "/it/about";
  if (p === "/" ) return "/it";

  return null;
}

function rewriteHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  // relative site paths
  if (href.startsWith("/")) {
    return rewritePath(href);
  }

  // absolute site URLs
  if (/^https?:\/\//i.test(href)) {
    const pathOnly = stripHost(href);
    if (!pathOnly) return null;
    return rewritePath(pathOnly);
  }

  return null;
}

let filesChanged = 0;
let linksChanged = 0;
const samples = [];

for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"))) {
  const full = path.join(POSTS_DIR, file);
  const json = JSON.parse(fs.readFileSync(full, "utf8"));
  let html = json.contentHtml || "";
  let fileHits = 0;

  html = html.replace(/href=("([^"]*)"|'([^']*)')/gi, (all, _q, d1, d2) => {
    const href = d1 ?? d2;
    const next = rewriteHref(href);
    if (!next || next === href) return all;
    fileHits++;
    linksChanged++;
    if (samples.length < 20) {
      samples.push({ file, from: href, to: next });
    }
    const quote = all.includes("'") && !all.includes('"') ? "'" : '"';
    return `href=${quote}${next}${quote}`;
  });

  // also excerpt if present
  if (json.excerpt) {
    json.excerpt = json.excerpt.replace(
      /href=("([^"]*)"|'([^']*)')/gi,
      (all, _q, d1, d2) => {
        const href = d1 ?? d2;
        const next = rewriteHref(href);
        if (!next || next === href) return all;
        fileHits++;
        linksChanged++;
        const quote = all.includes("'") && !all.includes('"') ? "'" : '"';
        return `href=${quote}${next}${quote}`;
      }
    );
  }

  if (fileHits > 0) {
    filesChanged++;
    json.contentHtml = html;
    if (!DRY) {
      fs.writeFileSync(full, JSON.stringify(json, null, 2) + "\n", "utf8");
    }
  }
}

console.log(DRY ? "[dry-run]" : "[applied]");
console.log("files changed:", filesChanged);
console.log("links rewritten:", linksChanged);
console.log("samples:");
for (const s of samples) {
  console.log(`  ${s.file}: ${s.from} -> ${s.to}`);
}
