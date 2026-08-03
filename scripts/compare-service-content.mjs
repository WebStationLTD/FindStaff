import fs from "fs";
import path from "path";

function stripHtml(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentences(text) {
  return text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

const dir = "content/it/services";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const it = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  const slug = it.sourceSlug;
  const res = await fetch(
    `https://findstaff.admin-panels.com/wp-json/wp/v2/services?slug=${encodeURIComponent(slug)}&_fields=slug,title,content,excerpt`
  );
  const data = await res.json();
  const wp = data?.[0];
  if (!wp) {
    console.log("MISSING WP", slug);
    continue;
  }
  const bgText = stripHtml(wp.content?.rendered || "");
  const itText = stripHtml(it.contentHtml || "");
  const bgSent = sentences(bgText);
  const itSent = sentences(itText);
  console.log("\n===", slug, "/", it.slugIt, "===");
  console.log("BG sentences:", bgSent.length, "| chars:", bgText.length);
  console.log("IT sentences:", itSent.length, "| chars:", itText.length);
  console.log("BG:", bgText.slice(0, 400));
  console.log("IT:", itText.slice(0, 400));
}
