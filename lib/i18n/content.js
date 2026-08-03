import fs from "fs";
import path from "path";
import {
  resolveServiceSourceSlug,
  getServiceSlugForLocale,
  serviceSlugMap,
} from "./config";

const CONTENT_ROOT = path.join(process.cwd(), "content", "it");

function readJsonSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error("Failed to read IT content:", filePath, error);
    return null;
  }
}

function listJsonFiles(dir) {
  try {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => readJsonSafe(path.join(dir, f)))
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function getItalianPage(sourceSlug) {
  return readJsonSafe(path.join(CONTENT_ROOT, "pages", `${sourceSlug}.json`));
}

export function getItalianService(sourceSlug) {
  return readJsonSafe(
    path.join(CONTENT_ROOT, "services", `${sourceSlug}.json`)
  );
}

export function getAllItalianServices() {
  return listJsonFiles(path.join(CONTENT_ROOT, "services"));
}

export function getItalianPost(sourceSlug) {
  const postsDir = path.join(CONTENT_ROOT, "posts");
  const direct = readJsonSafe(path.join(postsDir, `${sourceSlug}.json`));
  if (direct) return direct;

  // Fallback: find by sourceSlug field (file may use IT slug as filename)
  const all = listJsonFiles(postsDir);
  return (
    all.find((p) => p.sourceSlug === sourceSlug || p.slugIt === sourceSlug) ||
    null
  );
}

export function getItalianPostByItSlug(itSlug) {
  const postsDir = path.join(CONTENT_ROOT, "posts");
  const direct = readJsonSafe(path.join(postsDir, `${itSlug}.json`));
  if (direct) return direct;
  const all = listJsonFiles(postsDir);
  return all.find((p) => p.slugIt === itSlug || p.sourceSlug === itSlug) || null;
}

export function getAllItalianPosts() {
  return listJsonFiles(path.join(CONTENT_ROOT, "posts")).sort((a, b) => {
    const da = new Date(a.date || 0).getTime();
    const db = new Date(b.date || 0).getTime();
    return db - da;
  });
}

export function getItalianMember(sourceSlug) {
  return readJsonSafe(
    path.join(CONTENT_ROOT, "members", `${sourceSlug}.json`)
  );
}

export function getAllItalianMembers() {
  return listJsonFiles(path.join(CONTENT_ROOT, "members"));
}

export function resolvePostSourceSlug(slug, locale) {
  if (locale !== "it") return slug;
  const post = getItalianPostByItSlug(slug);
  return post?.sourceSlug || slug;
}

export function getPostSlugForLocale(sourceSlug, locale) {
  if (locale !== "it") return sourceSlug;
  const post = getItalianPost(sourceSlug);
  return post?.slugIt || sourceSlug;
}

export {
  resolveServiceSourceSlug,
  getServiceSlugForLocale,
  serviceSlugMap,
};
