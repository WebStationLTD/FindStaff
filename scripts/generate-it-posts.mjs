/**
 * Generate Italian blog post JSON files.
 * - Hand-crafted SEO titles/slugs/descriptions
 * - Body HTML: translate text nodes via Google gtx endpoint (bg→it)
 */
import fs from "fs";
import path from "path";

const outDir = "content/it/posts";
fs.mkdirSync(outDir, { recursive: true });

const posts = JSON.parse(fs.readFileSync("content/raw/posts.json", "utf8"));

/** @type {Record<string, {slugIt: string, title: string, metaDescription: string}>} */
const metaMap = {
  "сезонните-работници-защо-са-ключови": {
    slugIt: "lavoratori-stagionali-turismo-perche-sono-chiave",
    title: "Lavoratori stagionali: perché sono fondamentali per il turismo",
    metaDescription:
      "Scoprite perché i lavoratori stagionali sono essenziali per un business turistico di successo e come selezionarli al meglio.",
  },
  "ресторантьорски-персонал-какъв-еки": {
    slugIt: "personale-ristorazione-team-stagione-estiva",
    title: "Personale di ristorazione: quale team serve per una forte stagione estiva",
    metaDescription:
      "Quale personale di ristorazione serve per una stagione estiva di successo: ruoli, selezione e organizzazione del team.",
  },
  "подбор-на-хотелски-персонал-кога-е-н": {
    slugIt: "selezione-personale-alberghiero-quando-iniziare",
    title: "Selezione del personale alberghiero: quando è il momento migliore per iniziare",
    metaDescription:
      "Quando iniziare la selezione del personale alberghiero e come pianificare per tempo la stagione.",
  },
  "работници-за-хотели-как-да-намерите": {
    slugIt: "lavoratori-hotel-come-trovare-stagionali-affidabili",
    title: "Lavoratori per hotel: come trovare dipendenti stagionali affidabili",
    metaDescription:
      "Come trovare lavoratori affidabili per hotel e ristoranti: consigli pratici per la selezione stagionale.",
  },
  "как-хотелите-могат-да-задържат-качест": {
    slugIt: "come-hotel-trattengono-personale-alberghiero-qualificato",
    title: "Come gli hotel possono trattenere personale alberghiero di qualità",
    metaDescription:
      "Strategie per trattenere personale alberghiero qualificato più a lungo e ridurre il turnover.",
  },
  "как-да-намерите-надежден-хотелски-пер": {
    slugIt: "come-trovare-personale-alberghiero-affidabile",
    title: "Come trovare personale alberghiero affidabile",
    metaDescription:
      "Come gli hotel di successo trovano personale alberghiero affidabile e quali sono i canali più efficaci.",
  },
  "езикови-и-културни-бариери-при-работа": {
    slugIt: "barriere-linguistiche-culturali-team-internazionali",
    title: "Barriere linguistiche e culturali nel lavoro con team internazionali",
    metaDescription:
      "Soluzioni pratiche alle barriere linguistiche e culturali quando si lavora con dipendenti internazionali.",
  },
  "индустрии-в-българия-с-най-голям-недос": {
    slugIt: "industrie-bulgaria-maggiore-carenza-personale-2025",
    title: "Industrie in Bulgaria con la maggiore carenza di personale nel 2025",
    metaDescription:
      "Quali settori in Bulgaria sono più colpiti dalla carenza di manodopera nel 2025 e come affrontarla.",
  },
  "чуждестранни-работници-срещу-българ": {
    slugIt: "lavoratori-stranieri-vs-personale-locale-pro-contro",
    title: "Lavoratori stranieri vs personale locale: pro e contro",
    metaDescription:
      "Confronto tra lavoratori stranieri e personale locale: vantaggi, svantaggi e come scegliere.",
  },
  "чести-грешки-при-наемане-на-чуждестра": {
    slugIt: "errori-comuni-assunzione-lavoratori-stranieri",
    title: "Errori comuni nell'assunzione di lavoratori stranieri",
    metaDescription:
      "Errori frequenti nell'assunzione di lavoratori stranieri e come i datori di lavoro possono evitarli.",
  },
  "как-да-постигнете-дългосрочно-задърж": {
    slugIt: "trattenere-a-lungo-termine-dipendenti-stranieri",
    title: "Come trattenere a lungo termine i dipendenti stranieri",
    metaDescription:
      "Strategie pratiche per la retention a lungo termine dei dipendenti stranieri e minore turnover.",
  },
  "разходи-за-наемане-на-чуждестранни-ра": {
    slugIt: "costi-assunzione-lavoratori-stranieri-budget",
    title: "Costi per l'assunzione di lavoratori stranieri: budget reale",
    metaDescription:
      "Costi reali per assumere lavoratori stranieri: voci di budget e come pianificarli correttamente.",
  },
  "колко-време-отнема-наемане-на-чуждест": {
    slugIt: "tempi-assunzione-lavoratore-straniero",
    title: "Quanto tempo richiede l'assunzione di un lavoratore straniero",
    metaDescription:
      "Tempi e fasi del processo di assunzione di un lavoratore straniero: cosa aspettarsi.",
  },
  "документи-за-наемане-на-чуждестранни": {
    slugIt: "documenti-assunzione-lavoratori-stranieri",
    title: "Documenti per l'assunzione di lavoratori stranieri",
    metaDescription:
      "Documenti necessari per assumere lavoratori stranieri, tempi e come preparare il dossier.",
  },
  "грижа-с-внимание-и-сърце-професиона": {
    slugIt: "assistenza-anziani-badanti-professionali",
    title: "Cura con attenzione e cuore: professionisti per anziani",
    metaDescription:
      "Assistenza domiciliare e badanti per anziani. Aiuto permanente o temporaneo con FindStaff.",
  },
  "поддръжка-и-сигурност-на-обекти-от-ква": {
    slugIt: "manutenzione-sicurezza-immobili-personale-qualificato",
    title: "Manutenzione e sicurezza degli immobili con personale qualificato",
    metaDescription:
      "Personale per sicurezza, controllo accessi e interventi di emergenza. Soluzioni FindStaff.",
  },
  "технически-персонал-за-автоматизира": {
    slugIt: "personale-tecnico-produzione-automatizzata",
    title: "Personale tecnico per la produzione automatizzata",
    metaDescription:
      "Operatori di linee automatizzate per l'industria. FindStaff trova i profili tecnici giusti.",
  },
  "работници-за-дървообработващи-предп": {
    slugIt: "lavoratori-imprese-lavorazione-legno",
    title: "Lavoratori per imprese di lavorazione del legno",
    metaDescription:
      "Lavoratori esperti per imprese di lavorazione del legno. Selezione affidabile con FindStaff.",
  },
  "внос-на-работна-ръка-в-българия-тенд": {
    slugIt: "importazione-manodopera-bulgaria-tendenze",
    title: "Importazione di manodopera in Bulgaria: tendenze e buone pratiche",
    metaDescription:
      "Come funziona l'importazione di manodopera in Bulgaria: fasi, vantaggi e buone pratiche.",
  },
  "подбор-и-роля-на-работници-за-сметопоч": {
    slugIt: "selezione-lavoratori-raccolta-rifiuti-urbana",
    title: "Selezione e ruolo dei lavoratori per la raccolta rifiuti in ambito urbano",
    metaDescription:
      "Cercate lavoratori affidabili per la raccolta rifiuti? FindStaff fornisce personale responsabile.",
  },
  "ролята-на-помощния-персонал-в-детски-з": {
    slugIt: "personale-ausiliario-asili-nido-ruolo",
    title: "Il ruolo del personale ausiliario negli asili: cura, sicurezza e supporto",
    metaDescription:
      "Personale ausiliario per asili e centri per bambini: selezione e ruolo con FindStaff.",
  },
  "управление-и-подбор-на-целогодишни-се": {
    slugIt: "selezione-personale-stagionale-annuale-spa",
    title: "Selezione e gestione del personale stagionale annuale nel settore SPA",
    metaDescription:
      "Trovate professionisti stagionali annuali per SPA, massaggi e terapie con FindStaff.",
  },
  "подбор-и-управление-на-зимни-временни": {
    slugIt: "selezione-lavoratori-temporanei-invernali",
    title: "Selezione e gestione di lavoratori temporanei invernali",
    metaDescription:
      "Lavoratori temporanei invernali affidabili per diversi settori. Soluzioni flessibili FindStaff.",
  },
  "как-се-подбират-и-управляват-сезонни-р": {
    slugIt: "come-selezionare-gestire-lavoratori-stagionali-estate",
    title: "Come si selezionano e gestiscono i lavoratori stagionali in estate",
    metaDescription:
      "Lavoratori stagionali per campagne estive: selezione rapida e gestione efficace con FindStaff.",
  },
  "ефективен-подбор-и-развитие-на-шивачк": {
    slugIt: "selezione-sviluppo-sarte-industria-tessile",
    title: "Selezione ed efficace sviluppo delle sarte nell'industria tessile",
    metaDescription:
      "Sarte qualificate per l'industria tessile: come FindStaff seleziona i professionisti giusti.",
  },
  "как-се-подбират-и-обучават-работници-з": {
    slugIt: "selezione-formazione-lavoratori-tipografie",
    title: "Come si selezionano e formano i lavoratori per le tipografie",
    metaDescription:
      "Lavoratori per tipografie: selezione, formazione e qualità dei prodotti stampati.",
  },
  "организация-и-подбор-на-персонал-за-хр": {
    slugIt: "organizzazione-selezione-personale-catene-alimentari",
    title: "Organizzazione e selezione del personale per catene alimentari",
    metaDescription:
      "Il personale delle catene alimentari è chiave per l'esperienza del cliente. Come selezionarlo.",
  },
  "устойчиво-настаняване-на-работници-о": {
    slugIt: "alloggio-sostenibile-lavoratori-paesi-terzi",
    title: "Alloggio sostenibile per lavoratori da Paesi terzi: buone pratiche",
    metaDescription:
      "Alloggio per lavoratori da Paesi terzi: buone pratiche e come FindStaff gestisce il processo.",
  },
  "как-да-изградим-ефективен-персонал-за": {
    slugIt: "costruire-team-efficace-imprese-pulizie",
    title: "Come costruire un team efficace per imprese di pulizie",
    metaDescription:
      "Personale per imprese di pulizie: selezione, organizzazione e controllo con FindStaff.",
  },
  "как-фасилити-мениджмънтът-подобрява": {
    slugIt: "facility-management-efficienza-edifici-team",
    title: "Come il facility management migliora l'efficienza di edifici e team",
    metaDescription:
      "Il facility management migliora l'efficienza degli edifici e del personale. Il ruolo di FindStaff.",
  },
  "как-да-изградим-ефективен-екип-от-пико": {
    slugIt: "costruire-team-efficace-bellboy-hotel",
    title: "Come costruire un team efficace di bellboy nel business alberghiero",
    metaDescription:
      "Il bellboy è il primo impatto in hotel. Qualità richieste e come selezionare il team.",
  },
  "как-да-изградим-силен-екип-от-готвачи-т": {
    slugIt: "costruire-team-cuochi-cucina-calda-fredda",
    title: "Come costruire un team forte di cuochi cucina calda e fredda",
    metaDescription:
      "Cuochi di cucina calda e fredda: competenze, selezione e organizzazione del team.",
  },
  "как-да-изградим-ефективен-екип-от-слад": {
    slugIt: "costruire-team-aiuto-pasticcieri",
    title: "Come costruire un team efficace di aiuto pasticcieri",
    metaDescription:
      "Aiuto pasticcieri: come selezionarli, formarli e farli crescere nel team.",
  },
  "как-да-изградим-стабилен-екип-от-склад": {
    slugIt: "costruire-team-stabile-magazzinieri",
    title: "Come costruire un team stabile di magazzinieri",
    metaDescription:
      "I magazzinieri sono la spina dorsale della logistica. Come costruire un team efficace.",
  },
  "най-добрите-практики-при-наемане-на-ра": {
    slugIt: "best-practice-assunzione-lavoratori-centri-logistici",
    title: "Best practice nell'assunzione di lavoratori per centri logistici",
    metaDescription:
      "Lavoratori per centri logistici: assunzione, formazione e crescita del personale.",
  },
  "работници-за-мебелни-цехове": {
    slugIt: "lavoratori-laboratori-mobili",
    title: "Lavoratori per laboratori di mobili",
    metaDescription:
      "Lavoratori per laboratori di mobili: competenze chiave, condizioni e selezione.",
  },
  "бъдещето-на-работниците-в-политиенов": {
    slugIt: "futuro-lavoratori-produzione-polimeri",
    title: "Il futuro dei lavoratori nella produzione di polimeri",
    metaDescription:
      "Ruolo dei lavoratori nelle imprese di polimeri: competenze, sfide e prospettive.",
  },
  "бъдещето-на-работниците-на-поточната": {
    slugIt: "futuro-lavoratori-linea-produzione",
    title: "Il futuro dei lavoratori in linea di produzione",
    metaDescription:
      "Come l'automazione cambia il ruolo dei lavoratori in linea di produzione.",
  },
  "работници-за-производствени-предпри": {
    slugIt: "lavoratori-imprese-produttive-efficienza",
    title: "Lavoratori per imprese produttive: il cuore dell'efficienza industriale",
    metaDescription:
      "Cercate lavoratori affidabili per imprese produttive? FindStaff seleziona profili responsabili.",
  },
  "трудности-при-наемането-на-работници": {
    slugIt: "difficolta-assunzione-lavoratori-estero-superarle",
    title: "Difficoltà nell'assunzione di lavoratori dall'estero: come superarle",
    metaDescription:
      "Come superare le difficoltà nell'assunzione di lavoratori dall'estero con FindStaff.",
  },
  "наемането-на-работници-от-трети-стран": {
    slugIt: "assunzione-lavoratori-paesi-terzi-chiave-successo",
    title: "Assunzione di lavoratori da Paesi terzi: chiave per il successo del business",
    metaDescription:
      "L'assunzione da Paesi terzi è una soluzione alla carenza di personale. Come funziona.",
  },
  "международен-наем-на-персонал-вашият": {
    slugIt: "selezione-internazionale-personale-partner-carenza",
    title: "Selezione internazionale del personale: il vostro partner contro la carenza di talenti",
    metaDescription:
      "Assumete lavoratori internazionali in modo rapido e sicuro. Risolvete la carenza di personale.",
  },
  "внос-на-работна-ръка-от-молдова-наде": {
    slugIt: "importazione-manodopera-moldova",
    title: "Importazione di manodopera dalla Moldova: soluzione affidabile alla carenza di personale",
    metaDescription:
      "Manodopera dalla Moldova: profili qualificati e responsabili per la vostra azienda.",
  },
  "защо-да-изберем-сезонни-работници-от-а": {
    slugIt: "perche-scegliere-lavoratori-stagionali-asia",
    title: "Perché scegliere lavoratori stagionali dall'Asia: vantaggi per il business",
    metaDescription:
      "Lavoratori stagionali dall'Asia: affidabili, convenienti e disciplinati per la vostra azienda.",
  },
  "сезонни-работници-от-индия": {
    slugIt: "lavoratori-stagionali-india",
    title: "Lavoratori stagionali dall'India",
    metaDescription:
      "Lavoratori stagionali dall'India: affidabilità, esperienza e adattabilità per il vostro team.",
  },
  "работници-от-таджикистан-защо-да-ги-пр": {
    slugIt: "lavoratori-tagikistan-perche-sceglierli",
    title: "Lavoratori dal Tagikistan: perché sceglierli",
    metaDescription:
      "Lavoratori dal Tagikistan: manodopera stabile, formata e leale per la vostra impresa.",
  },
  "внос-на-работници-от-виетнам": {
    slugIt: "importazione-lavoratori-vietnam",
    title: "Importazione di lavoratori dal Vietnam",
    metaDescription:
      "Lavoratori dal Vietnam: personale affidabile per i settori con carenza di manodopera.",
  },
  "внос-на-работници-от-казахстан-надежд": {
    slugIt: "importazione-lavoratori-kazakistan",
    title: "Importazione di lavoratori dal Kazakistan: soluzione affidabile alla carenza di personale",
    metaDescription:
      "Lavoratori dal Kazakistan: stabilità e continuità per le aziende in Bulgaria.",
  },
  "работници-от-непал-работещо-решение": {
    slugIt: "lavoratori-nepal-soluzione-carenza-personale",
    title: "Lavoratori dal Nepal: una soluzione concreta alla carenza di personale",
    metaDescription:
      "Lavoratori dal Nepal: stabilità e continuità per le aziende. Scoprite i vantaggi.",
  },
  "rabotniczi-ot-kirgizstan-nadezhdni-ka": {
    slugIt: "lavoratori-kirghizistan-affidabili",
    title: "Lavoratori dal Kirghizistan: profili affidabili per il vostro business",
    metaDescription:
      "FindStaff offre lavoratori preparati dal Kirghizistan per logistica, agricoltura e produzione.",
  },
  "domashni-pomoshtnitsi-ot-filipini-i-nepal": {
    slugIt: "colf-filippine-nepal",
    title: "Colf e assistenti domestiche dalle Filippine e dal Nepal",
    metaDescription:
      "Trovate colf responsabili dalle Filippine e dal Nepal con FindStaff.",
  },
  "vnos-na-rabotna-raka-ot-uzbekistan": {
    slugIt: "importazione-manodopera-uzbekistan",
    title: "Importazione di manodopera dall'Uzbekistan",
    metaDescription:
      "Assumete manodopera dall'Uzbekistan con FindStaff. Procedura sicura e selezione rapida.",
  },
};

async function translateText(text, retries = 3) {
  const trimmed = text.trim();
  if (!trimmed) return text;
  // Skip pure numbers/punctuation/URLs
  if (!/[а-яА-Яa-zA-Z]{2,}/.test(trimmed)) return text;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=bg&tl=it&dt=t&q=${encodeURIComponent(trimmed)}`;

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const translated = (data?.[0] || []).map((part) => part?.[0] || "").join("");
      return translated || text;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  return text;
}

async function translateHtml(html) {
  if (!html) return "";
  const parts = [];
  const re = /([^<]+)|(<[^>]+>)/g;
  let m;
  const segments = [];
  while ((m = re.exec(html)) !== null) {
    segments.push({ type: m[2] ? "tag" : "text", value: m[0] });
  }

  // Batch text segments to reduce requests
  const textIndexes = [];
  const texts = [];
  segments.forEach((seg, idx) => {
    if (seg.type === "text" && seg.value.trim() && /[а-яА-Я]/.test(seg.value)) {
      textIndexes.push(idx);
      texts.push(seg.value);
    }
  });

  // Translate in chunks of 5 with delay
  const translated = new Array(texts.length);
  const chunkSize = 5;
  for (let i = 0; i < texts.length; i += chunkSize) {
    const chunk = texts.slice(i, i + chunkSize);
    const results = await Promise.all(chunk.map((t) => translateText(t)));
    results.forEach((r, j) => {
      translated[i + j] = r;
    });
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 200));
  }

  let ti = 0;
  return segments
    .map((seg, idx) => {
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

async function main() {
  let done = 0;
  for (const post of posts) {
    const sourceSlug = decodeURIComponent(post.slug);
    const meta = metaMap[sourceSlug];
    if (!meta) {
      console.warn("Missing meta for", sourceSlug);
      continue;
    }

    const outPath = path.join(outDir, `${sourceSlug}.json`);
    if (fs.existsSync(outPath)) {
      const existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
      if (existing.contentHtml && !/[а-яА-Я]/.test(existing.contentHtml.slice(0, 500))) {
        console.log("skip", sourceSlug);
        continue;
      }
    }

    process.stdout.write(`\n[${++done}/${posts.length}] ${sourceSlug} `);
    const contentHtml = await translateHtml(post.content?.rendered || "");
    const excerptPlain = meta.metaDescription;

    const out = {
      id: post.id,
      sourceSlug,
      slugIt: meta.slugIt,
      date: post.date,
      title: meta.title,
      excerpt: `<p>${excerptPlain}</p>\n`,
      contentHtml,
      metaTitle: `${meta.title} | FindStaff`,
      metaDescription: meta.metaDescription,
      ogTitle: `${meta.title} | FindStaff`,
      ogDescription: meta.metaDescription,
      ogImage: post.yoast_head_json?.og_image?.[0]?.url || "",
    };

    fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
    console.log(" OK");
  }
  console.log("\nAll posts generated:", fs.readdirSync(outDir).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
