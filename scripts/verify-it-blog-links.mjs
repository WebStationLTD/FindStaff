/**
 * Report remaining BG-bound internal links in Italian posts.
 */
import fs from "fs";
import path from "path";

const POSTS_DIR = "content/it/posts";
let remaining = 0;
const samples = [];

for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"))) {
  const json = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
  const html = `${json.contentHtml || ""}\n${json.excerpt || ""}`;
  const links = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const bad = links.filter((h) => {
    if (/^https?:\/\/(www\.)?findstaff\.bg(\/|$)/i.test(h)) return true;
    if (/^https?:\/\/findstaff\.admin-panels\.com\/(blog|services)(\/|$)/i.test(h))
      return true;
    if (/^\/(blog|services)(\/|$)/.test(h) && !h.startsWith("/it/")) return true;
    return false;
  });
  if (bad.length) {
    remaining += bad.length;
    if (samples.length < 15) samples.push({ file, bad });
  }
}

console.log("remaining BG-bound links:", remaining);
console.log(JSON.stringify(samples, null, 2));
