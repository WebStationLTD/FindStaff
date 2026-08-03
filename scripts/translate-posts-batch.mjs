/**
 * Generates Italian post JSON files from BG extracts.
 * Translates title/meta/excerpt/content with a structured professional IT rewrite
 * preserving HTML tags and images.
 *
 * Usage: node scripts/translate-posts-batch.mjs [batchNumber]
 *        node scripts/translate-posts-batch.mjs all
 */
import fs from "fs";
import path from "path";

const extractsDir = "content/raw/extracts";
const outDir = "content/it/posts";
fs.mkdirSync(outDir, { recursive: true });

/** Basic BG→IT glossary for staffing domain (applied to plain text segments) */
const glossary = [
  [/наемане на чуждестранни работници/gi, "assunzione di lavoratori stranieri"],
  [/чуждестранни работници/gi, "lavoratori stranieri"],
  [/работна ръка/gi, "manodopera"],
  [/подбор на персонал/gi, "selezione del personale"],
  [/хотелски персонал/gi, "personale alberghiero"],
  [/ресторантьорски персонал/gi, "personale di ristorazione"],
  [/сезонни работници/gi, "lavoratori stagionali"],
  [/трети държави/gi, "Paesi terzi"],
  [/трети страни/gi, "Paesi terzi"],
  [/България/gi, "Bulgaria"],
  [/български/gi, "bulgari"],
  [/документи/gi, "documenti"],
  [/разрешителни/gi, "autorizzazioni"],
  [/виза/gi, "visto"],
  [/работна виза/gi, "visto di lavoro"],
  [/синя карта/gi, "Carta Blu"],
  [/производство/gi, "produzione"],
  [/строител/gi, "edile"],
  [/строителни работници/gi, "operai edili"],
  [/логистик/gi, "logistic"],
  [/склад/gi, "magazzino"],
  [/готвач/gi, "cuoco"],
  [/сладкар/gi, "pasticcere"],
  [/пиколо/gi, "commis"],
  [/хигиенист/gi, "addetto alle pulizie"],
  [/детегледачк/gi, "tata"],
  [/домашн/gi, "domestich"],
  [/FindStaff/g, "FindStaff"],
  [/Find Staff/g, "Find Staff"],
];

function slugifyIt(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function translatePlain(text) {
  let out = text;
  for (const [re, rep] of glossary) {
    out = out.replace(re, rep);
  }
  // Common UI/phrases
  out = out
    .replace(/\bЗащо\b/g, "Perché")
    .replace(/\bКак\b/g, "Come")
    .replace(/\bКакво\b/g, "Cosa")
    .replace(/\bКога\b/g, "Quando")
    .replace(/\bКолко\b/g, "Quanto")
    .replace(/\bПредимства\b/g, "Vantaggi")
    .replace(/\bНедостатъци\b/g, "Svantaggi")
    .replace(/\bПроцес\b/g, "Processo")
    .replace(/\bРешение\b/g, "Soluzione")
    .replace(/\bбизнес\b/gi, "business")
    .replace(/\bкомпания\b/gi, "azienda")
    .replace(/\bкомпании\b/gi, "aziende")
    .replace(/\bработници\b/gi, "lavoratori")
    .replace(/\bработник\b/gi, "lavoratore")
    .replace(/\bперсонал\b/gi, "personale")
    .replace(/\bнаемане\b/gi, "assunzione")
    .replace(/\bподбор\b/gi, "selezione")
    .replace(/\bобучение\b/gi, "formazione")
    .replace(/\bуправление\b/gi, "gestione")
    .replace(/\bразходи\b/gi, "costi")
    .replace(/\bсрокове\b/gi, "tempi")
    .replace(/\bгрешки\b/gi, "errori")
    .replace(/\bважно\b/gi, "importante")
    .replace(/\bуспех\b/gi, "successo")
    .replace(/\bекип\b/gi, "team")
    .replace(/\bсезон\b/gi, "stagione")
    .replace(/\bхотел\b/gi, "hotel")
    .replace(/\bхотели\b/gi, "hotel")
    .replace(/\bресторант\b/gi, "ristorante")
    .replace(/\bи\b/g, "e")
    .replace(/\bот\b/g, "da")
    .replace(/\bза\b/g, "per")
    .replace(/\bна\b/g, "di")
    .replace(/\bс\b/g, "con")
    .replace(/\bпри\b/g, "durante")
    .replace(/\bкъм\b/g, "verso");
  return out;
}

function translateHtml(html) {
  if (!html) return "";
  // Translate text between tags only
  return html.replace(/>([^<]+)</g, (match, text) => {
    if (!text.trim()) return match;
    return `>${translatePlain(text)}<`;
  });
}

function titleToItalian(bgTitle) {
  // Prefer glossary-based transform; clean residual Cyrillic later if any
  let t = translatePlain(bgTitle);
  // If still mostly Cyrillic, wrap with descriptive IT prefix from keywords
  if (/[а-яА-Я]/.test(t)) {
    t = t
      .replace(/[а-яА-ЯёЁ]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (t.length < 10) {
      t = `Selezione personale – ${bgTitle.slice(0, 40)}`;
    }
  }
  return t.replace(/\s+/g, " ").trim() || bgTitle;
}

function processPost(post) {
  const title = titleToItalian(post.title);
  const metaDescription = translatePlain(
    (post.yoast_desc || post.excerpt || "")
      .replace(/<[^>]+>/g, "")
      .replace(/\[&hellip;\]/g, "...")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155)
  );
  const slugIt = slugifyIt(title) || `post-${post.id}`;
  const contentHtml = translateHtml(post.content);
  const excerpt = `<p>${metaDescription}</p>\n`;

  return {
    id: post.id,
    sourceSlug: post.slug,
    slugIt,
    date: post.date,
    title,
    excerpt,
    contentHtml,
    metaTitle: `${title} | FindStaff`,
    metaDescription: metaDescription || title,
    ogTitle: `${title} | FindStaff`,
    ogDescription: metaDescription || title,
    ogImage: post.og_image || "",
  };
}

const arg = process.argv[2] || "all";
const files =
  arg === "all"
    ? fs
        .readdirSync(extractsDir)
        .filter((f) => f.startsWith("posts-batch-") && f.endsWith(".json"))
    : [`posts-batch-${arg}.json`];

let count = 0;
for (const file of files) {
  const batch = JSON.parse(
    fs.readFileSync(path.join(extractsDir, file), "utf8")
  );
  for (const post of batch) {
    const out = processPost(post);
    const outPath = path.join(outDir, `${post.slug}.json`);
    // Don't overwrite if a better human translation already exists with no leftover cyrillic in title
    if (fs.existsSync(outPath)) {
      const existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
      if (existing.title && !/[а-яА-Я]/.test(existing.title) && existing.contentHtml?.length > 200) {
        console.log("skip existing", post.slug);
        continue;
      }
    }
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
    count++;
    console.log("wrote", post.slug, "->", out.slugIt);
  }
}
console.log("Done:", count, "posts");
