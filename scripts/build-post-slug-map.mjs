import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "content", "it", "posts");
const mapPath = path.join(process.cwd(), "content", "it", "post-slug-map.json");

const map = {};
for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".json"))) {
  try {
    const post = JSON.parse(fs.readFileSync(path.join(postsDir, file), "utf8"));
    if (post.sourceSlug && post.slugIt) map[post.sourceSlug] = post.slugIt;
  } catch {
    // skip bad files
  }
}

fs.writeFileSync(mapPath, JSON.stringify(map, null, 2), "utf8");
console.log(`Wrote ${Object.keys(map).length} slug mappings -> content/it/post-slug-map.json`);
