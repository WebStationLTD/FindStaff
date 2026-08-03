/**
 * Expand short Italian service page copy to match BG WP meaning/length.
 * Preserves existing figures/images in contentHtml.
 * Does not touch BG content.
 *
 * Usage: node scripts/expand-it-service-content.mjs
 */
import fs from "fs";
import path from "path";

const DIR = "content/it/services";

/** Full Italian body paragraphs (no figure). Keyed by sourceSlug. */
const BODIES = {
  detegledachki: `Forniamo personale straniero qualificato per la casa, tra cui tate, colf, governanti, cuochi, giardinieri, addetti alle pulizie e badanti per anziani. I nostri collaboratori possono ricoprire più ruoli contemporaneamente, offrendo un supporto multifunzionale secondo le esigenze della vostra famiglia. Sono esperti, responsabili e discreti, pronti ad adattarsi sia all'assistenza quotidiana sia a quella a lungo termine. Ci occupiamo dell'intera gestione di documenti e legalizzazione, per farvi risparmiare tempo e preoccupazioni. Con noi ottenete professionisti di fiducia che curano il comfort e la sicurezza della vostra casa. Potete inviare una richiesta di personale nella sezione servizi, dopo aver scelto il tipo di lavoratore che desiderate assumere.`,

  "drugi-rabotnitsi": `Vi proponiamo personale straniero per la vostra azienda di servizi — da giardinieri e decoratori a parrucchieri, istruttori e consulenti di vendita. I nostri candidati sono attentamente selezionati, formati e pronti a inserirsi subito nel processo lavorativo. Sono responsabili, laboriosi e motivati a consolidarsi nella propria professione. Garantiamo una selezione rapida e un supporto completo per legalizzazione e alloggio. Affidatevi a noi per soluzioni stabili ed efficaci per il vostro team.`,

  gradinari: `Cercate giardinieri affidabili per un impiego stagionale o annuale? Con FindStaff troverete giardinieri qualificati da paesi terzi, con esperienza nella manutenzione del verde, piantumazione, sfalcio, potatura e lavori di landscaping. Il nostro team gestisce l'intera organizzazione — dalla selezione e dalla preparazione documentale fino all'inserimento dei lavoratori nel vostro team. Scegliete FindStaff per manodopera di qualità nel settore del verde e dell'orticoltura.`,

  higienisti: `Assicuratevi una pulizia impeccabile con addetti alle pulizie professionali da paesi terzi, selezionati da FindStaff. Assumiamo igienisti motivati e formati per uffici, hotel, impianti produttivi e punti vendita. Ogni candidato supera controlli e approvazione, così da garantire un alto livello di professionalità e affidabilità. FindStaff è il vostro partner di fiducia per l'assunzione stagionale o a lungo termine di personale di pulizia di qualità.`,

  "rabotnitsi-v-sektor-proizvodstvo": `Forniamo personale straniero affidabile per la vostra produzione o società commerciale — da operai di linea e aiutanti di reparto a personale generico e altre posizioni. I nostri candidati sono responsabili, lavorano in modo rigoroso secondo le istruzioni e si adattano rapidamente all'ambiente produttivo. Offriamo personale sia per impieghi a breve sia a lungo termine. Ci occupiamo dell'intera organizzazione di assunzione, documenti e logistica. Con noi garantite stabilità e produttività al vostro team.`,

  "restorantyorski-personal": `I nostri lavoratori stranieri sono ben preparati e con esperienza nella ristorazione, inclusi ruoli come cuochi (cucina calda e fredda), pasticcieri, panettieri, pizzaioli, maestri sushi, camerieri e addetti alle pulizie. Selezioniamo candidati con professionalità, disciplina lavorativa e voglia di crescere. Sono motivati, adattabili e si ambientano rapidamente nel contesto operativo. Offriamo personale stagionale o annuale secondo le esigenze del vostro ristorante. Forniamo assistenza completa con documentazione e legalizzazione. Con noi ottenete un team affidabile ed efficiente, pronto a contribuire al successo della vostra attività.`,

  "sezonni-rabotnitsi": `Assumete lavoratori stagionali da paesi terzi in modo rapido, semplice e affidabile con FindStaff. Colleghiamo i datori di lavoro con personale qualificato per impieghi stagionali in agricoltura, turismo, edilizia e altri settori. Il nostro processo di selezione e legalizzazione è ottimizzato per farvi risparmiare tempo e carico amministrativo. Affidatevi a FindStaff per assicurare manodopera stabile e motivata nei periodi in cui la vostra attività ha più bisogno di supporto.`,

  "stroitelni-rabotnitsi": `Offriamo operai edili stranieri esperti per lavori di ristrutturazione e finitura, costruzioni stradali, muratura e intonaco e altre attività edili. I nostri lavoratori sono motivati, responsabili e si adattano rapidamente alle vostre esigenze. Garantiamo un'esecuzione di qualità e il rispetto dei tempi. Forniamo supporto completo per legalizzazione e documenti. Con il nostro personale assicurate stabilità e professionalità sul vostro cantiere.`,
};

const META = {
  detegledachki: {
    metaDescription:
      "Personale straniero per la casa: tate, colf, badanti e supporto multifunzionale. Selezione rigorosa e gestione completa di documenti e permessi.",
    ogDescription:
      "Personale straniero per la casa: tate, colf, badanti e supporto multifunzionale. Selezione rigorosa e gestione completa di documenti e permessi.",
  },
  "drugi-rabotnitsi": {
    metaDescription:
      "Personale straniero per aziende di servizi: giardinieri, decoratori, parrucchieri e altro. Selezione rapida e supporto per legalizzazione.",
    ogDescription:
      "Personale straniero per aziende di servizi: giardinieri, decoratori, parrucchieri e altro. Selezione rapida e supporto per legalizzazione.",
  },
  gradinari: {
    metaDescription:
      "Giardinieri qualificati da paesi terzi per manutenzione del verde, piantumazione e landscaping. Selezione e supporto documentale completi.",
    ogDescription:
      "Giardinieri qualificati da paesi terzi per manutenzione del verde, piantumazione e landscaping. Selezione e supporto documentale completi.",
  },
  higienisti: {
    metaDescription:
      "Addetti alle pulizie da paesi terzi per hotel, uffici e impianti. Controlli sui candidati e supporto per assunzioni stagionali o a lungo termine.",
    ogDescription:
      "Addetti alle pulizie da paesi terzi per hotel, uffici e impianti. Controlli sui candidati e supporto per assunzioni stagionali o a lungo termine.",
  },
  "rabotnitsi-v-sektor-proizvodstvo": {
    metaDescription:
      "Operai di produzione stranieri per linee, reparti e magazzini. Assunzione a breve o lungo termine con gestione completa di documenti e logistica.",
    ogDescription:
      "Operai di produzione stranieri per linee, reparti e magazzini. Assunzione a breve o lungo termine con gestione completa di documenti e logistica.",
  },
  "restorantyorski-personal": {
    metaDescription:
      "Personale di ristorazione dall'estero: cucina, sala e supporto. Selezione professionale e assistenza completa per documenti e legalizzazione.",
    ogDescription:
      "Personale di ristorazione dall'estero: cucina, sala e supporto. Selezione professionale e assistenza completa per documenti e legalizzazione.",
  },
  "sezonni-rabotnitsi": {
    metaDescription:
      "Lavoratori stagionali da paesi terzi per agricoltura, turismo ed edilizia. Selezione e legalizzazione ottimizzate con FindStaff.",
    ogDescription:
      "Lavoratori stagionali da paesi terzi per agricoltura, turismo ed edilizia. Selezione e legalizzazione ottimizzate con FindStaff.",
  },
  "stroitelni-rabotnitsi": {
    metaDescription:
      "Operai edili stranieri per ristrutturazioni, muratura e cantieri. Selezione motivata e supporto completo per documenti e permessi.",
    ogDescription:
      "Operai edili stranieri per ristrutturazioni, muratura e cantieri. Selezione motivata e supporto completo per documenti e permessi.",
  },
};

function replaceBodyKeepFigures(html, bodyText) {
  const figureBlocks = [...html.matchAll(/<figure[\s\S]*?<\/figure>/gi)].map(
    (m) => m[0]
  );
  const paragraphs = bodyText
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `<p class="wp-block-paragraph">${s}</p>`);

  const parts = [];
  if (figureBlocks.length) {
    parts.push(figureBlocks.join("\n\n\n\n"));
  }
  parts.push(paragraphs.join("\n\n\n\n"));
  return parts.join("\n\n\n\n") + "\n";
}

let updated = 0;
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
  const full = path.join(DIR, file);
  const json = JSON.parse(fs.readFileSync(full, "utf8"));
  const body = BODIES[json.sourceSlug];
  if (!body) {
    console.log("skip (no body map):", json.sourceSlug);
    continue;
  }

  json.contentHtml = replaceBodyKeepFigures(json.contentHtml || "", body);
  json.excerpt = `<p>${body}</p>\n`;

  const meta = META[json.sourceSlug];
  if (meta) {
    json.metaDescription = meta.metaDescription;
    json.ogDescription = meta.ogDescription;
  }

  fs.writeFileSync(full, JSON.stringify(json, null, 2) + "\n", "utf8");
  updated++;
  console.log("updated", json.sourceSlug, "/", json.slugIt);
}

console.log("done:", updated, "files");
