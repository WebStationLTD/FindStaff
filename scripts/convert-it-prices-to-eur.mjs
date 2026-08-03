/**
 * Convert BGN price mentions in Italian content JSON to EUR (static files).
 * Runtime rendering also applies lib/i18n/currency.js for WP/IT HTML.
 *
 * Usage: node scripts/convert-it-prices-to-eur.mjs
 */
import fs from "fs";
import path from "path";
import { convertBgnPricesInHtml } from "../lib/i18n/currency.js";

const ROOTS = ["content/it/posts", "content/it/services", "content/it/pages"];

let files = 0;
let changed = 0;

for (const dir of ROOTS) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const full = path.join(dir, name);
    const json = JSON.parse(fs.readFileSync(full, "utf8"));
    files++;
    let dirty = false;
    for (const key of ["contentHtml", "excerpt", "metaDescription", "ogDescription"]) {
      if (typeof json[key] !== "string") continue;
      const next = convertBgnPricesInHtml(json[key], "it");
      if (next !== json[key]) {
        json[key] = next;
        dirty = true;
      }
    }
    if (dirty) {
      fs.writeFileSync(full, JSON.stringify(json, null, 2) + "\n", "utf8");
      changed++;
      console.log("updated", full);
    }
  }
}

console.log(`scanned ${files}, updated ${changed}`);
