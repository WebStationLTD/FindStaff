/**
 * Sync missing Italian blog posts from WordPress (BG source of truth).
 * - Never writes to WordPress / never changes BG URLs
 * - Create-only by default (does not overwrite existing IT JSON)
 */
import fs from "fs";
import path from "path";

const API_BASE = "https://findstaff.admin-panels.com/wp-json/wp/v2";
const OUT_DIR = path.join(process.cwd(), "content", "it", "posts");
const MAP_PATH = path.join(process.cwd(), "content", "it", "post-slug-map.json");

let syncInFlight = null;

function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyIt(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

async function translateText(text, retries = 3) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return text;
  if (!/[а-яА-Яa-zA-Zàèéìòù]{2,}/i.test(trimmed)) return text;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=bg&tl=it&dt=t&q=${encodeURIComponent(trimmed)}`;

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const translated = (data?.[0] || []).map((part) => part?.[0] || "").join("");
      return translated || text;
    } catch {
      await new Promise((r) => setTimeout(r, 700 * (i + 1)));
    }
  }
  return text;
}

async function translateHtml(html) {
  if (!html) return "";
  const re = /([^<]+)|(<[^>]+>)/g;
  const segments = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    segments.push({ type: m[2] ? "tag" : "text", value: m[0] });
  }

  const textIndexes = [];
  const texts = [];
  segments.forEach((seg, idx) => {
    if (seg.type === "text" && seg.value.trim() && /[а-яА-Я]/.test(seg.value)) {
      textIndexes.push(idx);
      texts.push(seg.value);
    }
  });

  const translated = new Array(texts.length);
  const chunkSize = 5;
  for (let i = 0; i < texts.length; i += chunkSize) {
    const chunk = texts.slice(i, i + chunkSize);
    const results = await Promise.all(chunk.map((t) => translateText(t)));
    results.forEach((r, j) => {
      translated[i + j] = r;
    });
    await new Promise((r) => setTimeout(r, 180));
  }

  let ti = 0;
  return segments
    .map((seg) => {
      if (seg.type === "text" && /[а-яА-Я]/.test(seg.value) && seg.value.trim()) {
        const out = translated[ti] ?? seg.value;
        ti++;
        const lead = seg.value.match(/^\s*/)?.[0] || "";
        const trail = seg.value.match(/\s*$/)?.[0] || "";
        return lead + out.trim() + trail;
      }
      return seg.value;
    })
    .join("");
}

async function fetchAllWpPosts() {
  const posts = [];
  let page = 1;
  while (page <= 20) {
    const url = `${API_BASE}/posts?per_page=50&page=${page}&_fields=id,slug,date,title,content,excerpt,yoast_head_json`;
    const res = await fetch(url);
    if (res.status === 400 || res.status === 404) break;
    if (!res.ok) throw new Error(`WP posts fetch failed: ${res.status}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    posts.push(...batch);
    if (batch.length < 50) break;
    page += 1;
  }
  return posts;
}

function listExistingItalianPosts() {
  if (!fs.existsSync(OUT_DIR)) return [];
  return fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf8"));
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function writeSlugMap(posts) {
  const map = {};
  for (const p of posts) {
    if (p?.sourceSlug && p?.slugIt) map[p.sourceSlug] = p.slugIt;
  }
  fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
  fs.writeFileSync(MAP_PATH, JSON.stringify(map, null, 2), "utf8");
  return map;
}

export function readPostSlugMap() {
  try {
    if (!fs.existsSync(MAP_PATH)) {
      const posts = listExistingItalianPosts();
      return writeSlugMap(posts);
    }
    return JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
  } catch {
    return {};
  }
}

function uniqueSlugIt(base, used) {
  let slug = base || "articolo";
  if (!used.has(slug)) {
    used.add(slug);
    return slug;
  }
  let i = 2;
  while (used.has(`${slug}-${i}`)) i += 1;
  const next = `${slug}-${i}`;
  used.add(next);
  return next;
}

async function buildItalianPost(wpPost, usedSlugs) {
  const sourceSlug = decodeURIComponent(wpPost.slug);
  const yoast = wpPost.yoast_head_json || {};
  const bgTitle = stripHtml(wpPost.title?.rendered || wpPost.title || sourceSlug);
  const bgMeta =
    yoast.description ||
    stripHtml(wpPost.excerpt?.rendered || "").slice(0, 160) ||
    bgTitle;

  const [titleIt, metaIt, contentHtml] = await Promise.all([
    translateText(bgTitle),
    translateText(bgMeta),
    translateHtml(wpPost.content?.rendered || ""),
  ]);

  const slugIt = uniqueSlugIt(slugifyIt(titleIt), usedSlugs);
  const metaTitle = `${titleIt} | FindStaff`;

  return {
    id: wpPost.id,
    sourceSlug,
    slugIt,
    date: wpPost.date,
    title: titleIt,
    excerpt: `<p>${metaIt}</p>\n`,
    contentHtml,
    metaTitle,
    metaDescription: metaIt,
    ogTitle: metaTitle,
    ogDescription: metaIt,
    ogImage: yoast.og_image?.[0]?.url || "",
    autoTranslated: true,
    translatedAt: new Date().toISOString(),
  };
}

/**
 * Sync missing IT posts from WP.
 * @param {{ force?: boolean, dryRun?: boolean, log?: boolean }} options
 */
export async function syncMissingItalianPosts(options = {}) {
  const { force = false, dryRun = false, log = true } = options;
  const say = (...args) => {
    if (log) console.log(...args);
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const existing = listExistingItalianPosts();
  const bySource = new Map(existing.map((p) => [p.sourceSlug, p]));
  const usedSlugs = new Set(existing.map((p) => p.slugIt).filter(Boolean));

  const wpPosts = await fetchAllWpPosts();
  say(`[sync-it-posts] WP posts: ${wpPosts.length}; existing IT: ${existing.length}`);

  const created = [];
  const skipped = [];

  for (const wpPost of wpPosts) {
    const sourceSlug = decodeURIComponent(wpPost.slug);
    const already = bySource.get(sourceSlug);
    if (already && !force) {
      skipped.push(sourceSlug);
      continue;
    }

    say(`[sync-it-posts] Translating: ${sourceSlug}`);
    const itPost = await buildItalianPost(wpPost, usedSlugs);
    const outPath = path.join(OUT_DIR, `${sourceSlug}.json`);

    if (!dryRun) {
      fs.writeFileSync(outPath, JSON.stringify(itPost, null, 2), "utf8");
    }
    bySource.set(sourceSlug, itPost);
    created.push(sourceSlug);
  }

  const all = Array.from(bySource.values());
  if (!dryRun) writeSlugMap(all);

  say(
    `[sync-it-posts] Done. created=${created.length} skipped=${skipped.length} dryRun=${dryRun}`
  );
  return { created, skipped, totalWp: wpPosts.length, totalIt: all.length };
}

/** Deduped sync for runtime / prebuild (avoids parallel duplicate work). */
export function syncMissingItalianPostsOnce(options = {}) {
  if (!syncInFlight) {
    syncInFlight = syncMissingItalianPosts(options).finally(() => {
      syncInFlight = null;
    });
  }
  return syncInFlight;
}
