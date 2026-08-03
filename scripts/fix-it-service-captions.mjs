import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content", "it", "services");

/** Manual IT replacements for leftover BG alt/caption text */
const replacements = {
  "хигиенисти от трети страни": "Addetti alle pulizie da paesi terzi",
  "други работници": "Altri lavoratori",
  "работници в сектор производство": "Operai nel settore produttivo",
  градинари: "Giardinieri",
  детегледачки: "Tate e badanti",
  "хотелски персонал": "Personale alberghiero",
  "ресторантьорски персонал": "Personale di ristorazione",
  "строителни работници": "Operai edili",
  "сезонни работници": "Lavoratori stagionali",
};

let fixedFiles = 0;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const filePath = path.join(dir, file);
  let raw = fs.readFileSync(filePath, "utf8");
  const before = raw;

  for (const [bg, it] of Object.entries(replacements)) {
    raw = raw.split(bg).join(it);
  }

  if (raw !== before) {
    fs.writeFileSync(filePath, raw, "utf8");
    fixedFiles += 1;
    console.log("fixed", file);
  }

  // Report remaining Cyrillic in visible HTML fields
  const json = JSON.parse(raw);
  const html = json.contentHtml || "";
  if (/[а-яА-Я]/.test(html)) {
    const leftovers = html.match(/[а-яА-Я][^<"]{0,40}/g) || [];
    console.log("still has Cyrillic:", file, leftovers.slice(0, 5));
  }
}

console.log("Done. Fixed files:", fixedFiles);
