import fs from "fs";
import path from "path";

const rawDir = "content/raw/extracts";
const outServices = "content/it/services";
const outPages = "content/it/pages";
const outMembers = "content/it/members";

for (const dir of [outServices, outPages, outMembers]) {
  fs.mkdirSync(dir, { recursive: true });
}

const serviceMap = {
  detegledachki: {
    slugIt: "tata-e-badanti",
    title: "Tate e badanti",
    metaTitle: "Tate e badanti | FindStaff",
    metaDescription:
      "Selezione di tate e badanti affidabili dall'estero. Supporto completo per documenti e permessi di lavoro.",
    text: "Forniamo tate e badanti motivate, affidabili e attentamente selezionate. Supporto completo con documenti e autorizzazioni per un inserimento sereno nella famiglia. I candidati superano una selezione rigorosa e sono pronti per incarichi a lungo termine.",
  },
  "hotelski-personal": {
    slugIt: "personale-alberghiero",
    title: "Personale alberghiero",
    metaTitle: "Personale alberghiero | FindStaff",
    metaDescription:
      "Personale alberghiero qualificato dall'estero: camere, reception, spa, animazione. Selezione rigorosa e supporto documentale.",
    text: "I nostri lavoratori stranieri sono motivati, affidabili e si adattano rapidamente alle esigenze del business alberghiero. Offriamo personale selezionato per camere, servizio, spa, animazione, reception e altre posizioni. I candidati superano una selezione rigorosa e sono pronti per impegni stagionali o annuali. Forniamo assistenza con tutti i documenti e le autorizzazioni. Con noi ottenete forza lavoro di qualità senza rischi inutili.",
  },
  "restorantyorski-personal": {
    slugIt: "personale-di-ristorazione",
    title: "Personale di ristorazione",
    metaTitle: "Personale di ristorazione | FindStaff",
    metaDescription:
      "Cuochi, camerieri e personale di cucina dall'estero. Selezione professionale per ristoranti e strutture Horeca.",
    text: "Personale di ristorazione selezionato con cura per cucina, sala e supporto operativo. Candidati motivati e affidabili, pronti per impegni stagionali o annuali, con assistenza documentale completa e integrazione nel vostro team.",
  },
  "stroitelni-rabotnitsi": {
    slugIt: "operai-edili",
    title: "Operai edili",
    metaTitle: "Operai edili | FindStaff",
    metaDescription:
      "Operai edili qualificati da Paesi terzi. Selezione affidabile e supporto legale per cantieri e imprese edili.",
    text: "Operai edili motivati e affidabili per cantieri e imprese. Selezione rigorosa e assistenza completa con documenti e permessi di lavoro, per un avvio sicuro e senza imprevisti.",
  },
  "sezonni-rabotnitsi": {
    slugIt: "lavoratori-stagionali",
    title: "Lavoratori stagionali",
    metaTitle: "Lavoratori stagionali | FindStaff",
    metaDescription:
      "Lavoratori stagionali dall'estero per turismo, agricoltura e hospitality. Procedure legali e selezione rapida.",
    text: "Lavoratori stagionali pronti per i picchi di lavoro in turismo, agricoltura e hospitality. Selezione rapida, candidati motivati e gestione completa delle pratiche legali e amministrative.",
  },
  gradinari: {
    slugIt: "giardinieri",
    title: "Giardinieri",
    metaTitle: "Giardinieri | FindStaff",
    metaDescription:
      "Giardinieri e personale per manutenzione del verde dall'estero. Selezione professionale e supporto documentale.",
    text: "Giardinieri e addetti alla manutenzione del verde attentamente selezionati. Affidabilità, motivazione e supporto completo per documenti e permessi di lavoro.",
  },
  higienisti: {
    slugIt: "addetti-alle-pulizie",
    title: "Addetti alle pulizie",
    metaTitle: "Addetti alle pulizie | FindStaff",
    metaDescription:
      "Addetti alle pulizie e igiene dall'estero per hotel, uffici e strutture. Selezione e assistenza legale complete.",
    text: "Personale per pulizie e igiene motivato e affidabile per hotel, uffici e strutture. Selezione accurata e supporto documentale completo per un inserimento rapido.",
  },
  "rabotnitsi-v-sektor-proizvodstvo": {
    slugIt: "operai-produzione",
    title: "Operai di produzione",
    metaTitle: "Operai di produzione | FindStaff",
    metaDescription:
      "Operai per il settore produttivo da Paesi terzi. Selezione per linee, magazzini e impianti industriali.",
    text: "Operai di produzione selezionati per linee, magazzini e impianti. Candidati affidabili con supporto completo per documenti, permessi e integrazione nel processo produttivo.",
  },
  "drugi-rabotnitsi": {
    slugIt: "altri-lavoratori",
    title: "Altri lavoratori",
    metaTitle: "Altri lavoratori | FindStaff",
    metaDescription:
      "Selezione di personale per posizioni varie da Paesi terzi. Soluzioni su misura per le esigenze della vostra azienda.",
    text: "Personale per posizioni diverse secondo le esigenze della vostra azienda. Selezione su misura e assistenza completa nelle procedure di assunzione e nell'integrazione dei nuovi collaboratori.",
  },
};

function buildServiceContent(bgContent, text) {
  const figureMatch = bgContent.match(/<figure[\s\S]*?<\/figure>/i);
  const figure = figureMatch ? `${figureMatch[0]}\n\n\n\n` : "";
  return `${figure}<p class="wp-block-paragraph">${text}</p>\n`;
}

for (const [slug, meta] of Object.entries(serviceMap)) {
  const bg = JSON.parse(
    fs.readFileSync(path.join(rawDir, `service-${slug}.json`), "utf8")
  );
  const out = {
    id: bg.id,
    sourceSlug: slug,
    slugIt: meta.slugIt,
    title: meta.title,
    excerpt: `<p>${meta.text}</p>\n`,
    contentHtml: buildServiceContent(bg.content, meta.text),
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    ogTitle: meta.metaTitle,
    ogDescription: meta.metaDescription,
    ogImage: bg.og_image || "",
  };
  fs.writeFileSync(
    path.join(outServices, `${slug}.json`),
    JSON.stringify(out, null, 2),
    "utf8"
  );
  console.log("service", slug);
}

const members = {
  "jasmina-madzhid": {
    name: "Jasmina Madzhid",
    position: "Amministratore",
    description:
      "<p>Con passione per la leadership e dedizione ai clienti, Jasmina guida il team con visione e sicurezza.</p>\n<p>Dottore in Economia, imprenditrice e madre di quattro figli. Con uno sguardo strategico sulla gestione delle risorse e del capitale umano, Jasmina comprende a fondo sia le esigenze del business sia la necessità di personale affidabile per la casa. Crede che le persone giuste rendano tutto possibile.</p>\n",
  },
  "rumyana-treneva": {
    name: "Rumyana Treneva",
    position: "Avvocato",
    description:
      "<p>Con oltre 10 anni di esperienza nel diritto dell'immigrazione e dei rifugiati. Tutela i diritti e gli interessi dei clienti rispettando i principi di condotta professionale.</p>\n",
  },
  "anna-ushakova": {
    name: "Anna Ushakova",
    position: "Traduttore",
    description:
      "<p>Anna garantisce una comunicazione impeccabile tra lingue e culture, con attenzione al dettaglio e precisione linguistica.</p>\n",
  },
};

for (const [slug, meta] of Object.entries(members)) {
  const bg = JSON.parse(
    fs.readFileSync(path.join(rawDir, `member-${slug}.json`), "utf8")
  );
  const out = {
    id: bg.id,
    sourceSlug: slug,
    slugIt: slug,
    name: meta.name,
    position: meta.position,
    description: meta.description,
  };
  fs.writeFileSync(
    path.join(outMembers, `${slug}.json`),
    JSON.stringify(out, null, 2),
    "utf8"
  );
  console.log("member", slug);
}

const aboutContent = `
<p class="wp-block-paragraph"><strong>Ottimizzate il vostro business con personale selezionato professionalmente dall'estero!</strong></p>



<p class="wp-block-paragraph">Noi di <strong>FindStaff</strong> siamo il vostro partner affidabile nella selezione e nell'assunzione di personale altamente qualificato da Paesi vicini e terzi. Siamo specializzati nel supporto completo in tutte le fasi del processo — dalla prima raccomandazione alla preparazione di tutti i documenti necessari, affinché i vostri nuovi dipendenti possano iniziare a lavorare senza problemi.</p>



<p class="wp-block-paragraph">Parliamo <strong>bulgaro</strong>, <strong>inglese</strong>, <strong>russo</strong>, <strong>cinese</strong> e <strong>italiano</strong>, il che ci consente di lavorare in modo efficace e di offrire servizi a livello internazionale.</p>



<p class="wp-block-paragraph"><strong>Cosa offriamo:</strong></p>



<ul class="wp-block-list">
<li><strong>Selezione del personale</strong> – La corrispondenza precisa con le vostre esigenze e requisiti.</li>



<li><strong>Deposito dei documenti</strong> – Forniamo tutto il necessario per un'assunzione di successo.</li>



<li><strong>Monitoraggio del processo</strong> – Controllo e supporto costanti durante l'intero processo di assunzione.</li>



<li><strong>Legalizzazione dei documenti</strong> – Prepariamo e legalizziamo tutti i documenti necessari per lavorare.</li>
</ul>



<p class="wp-block-paragraph"><strong>Perché sceglierci?</strong></p>



<ol class="wp-block-list">
<li><strong>Prezzi più competitivi</strong> – I nostri prezzi sono tra i migliori sul mercato, con un ottimo rapporto qualità-prezzo.</li>



<li><strong>Pagamento rateale</strong> – Condizioni di pagamento flessibili adatte al vostro budget.</li>



<li><strong>Garanzia di 3 mesi</strong> – Crediamo nella qualità dei nostri servizi e offriamo 3 mesi di garanzia.</li>



<li><strong>Se il vostro nuovo dipendente lascia entro 3 mesi</strong>, riceverete assistenza per assumere una nuova persona con uno sconto del 50% sul prezzo.</li>
</ol>



<p class="wp-block-paragraph"><strong>Come lavoriamo?</strong></p>



<ul class="wp-block-list">
<li>Eseguiamo una selezione completa del personale che risponde alle vostre esigenze specifiche.</li>



<li>Prepariamo tutti i documenti – dai visti ai permessi di lavoro.</li>



<li>Lavoriamo con candidati da <strong>Paesi vicini</strong> e <strong>Paesi terzi</strong>, garantendovi una soluzione di qualità e rapida per le vostre esigenze di personale.</li>
</ul>



<p class="wp-block-paragraph"><strong>Approccio personalizzato:</strong> Le condizioni di lavoro come giorni di riposo, ferie e retribuzione sono individualmente adattate alle vostre esigenze.</p>



<h3 class="wp-block-heading"><strong>Non perdete tempo! Contattateci oggi e ottimizzate il vostro business con i migliori talenti dall'estero!</strong></h3>



<p class="wp-block-paragraph">Con <strong>FindStaff</strong> ottenete non solo personale, ma un partner che si occupa di tutto ciò che riguarda l'assunzione e l'integrazione dei nuovi dipendenti nella vostra azienda. Non esitate a contattarci per discutere le vostre esigenze e trovare la soluzione migliore per voi!</p>
`;

const privacyContent = `
<h2 class="wp-block-heading">Chi siamo</h2>



<p class="wp-block-paragraph">Indirizzo del nostro sito: https://findstaff.bg</p>



<h2 class="wp-block-heading">Commenti</h2>



<p class="wp-block-paragraph">Quando i visitatori lasciano commenti sul sito, raccogliamo i dati mostrati nel modulo dei commenti, nonché l'indirizzo IP del visitatore e la stringa dell'user agent del browser, per aiutare a rilevare lo spam.</p>



<p class="wp-block-paragraph">Una stringa anonima creata dal vostro indirizzo email (anche chiamata hash) può essere fornita al servizio Gravatar per verificare se lo utilizzate. L'informativa sulla privacy di Gravatar è disponibile qui: https://automattic.com/privacy/. Dopo l'approvazione del commento, la vostra foto del profilo sarà visibile pubblicamente insieme ad esso.</p>



<h2 class="wp-block-heading">File</h2>



<p class="wp-block-paragraph">Se caricate immagini sul sito, dovreste evitare di caricare immagini con dati di posizione incorporati (EXIF GPS). I visitatori del sito possono scaricare ed estrarre i dati di posizione dalle immagini presenti sul sito.</p>



<h2 class="wp-block-heading">Cookie</h2>



<p class="wp-block-paragraph">Se lasciate un commento sul nostro sito, potete consentire il salvataggio del vostro nome, indirizzo email e sito web nei cookie. Sono per vostra comodità, così non dovrete compilare di nuovo i dati quando lasciate un altro commento. Questi cookie durano un anno.</p>



<p class="wp-block-paragraph">Se avete un account e accedete a questo sito, imposteremo un cookie temporaneo per determinare se il vostro browser accetta i cookie. Questo cookie non contiene dati personali e viene eliminato quando chiudete il browser.</p>



<p class="wp-block-paragraph">Quando accedete, impostiamo anche diversi cookie per salvare le informazioni di accesso e le preferenze di visualizzazione. I cookie di accesso scadono dopo due giorni, quelli delle preferenze di schermo dopo un anno. Se selezionate "Ricordami", l'accesso verrà mantenuto per due settimane. Se uscite dall'account, i cookie di accesso verranno eliminati.</p>



<p class="wp-block-paragraph">Se modificate o pubblicate un articolo, un cookie aggiuntivo verrà salvato nel browser. Non contiene dati personali, ma indica semplicemente l'ID del post che avete appena modificato. Scade dopo un giorno.</p>



<h2 class="wp-block-heading">Contenuti incorporati da altri siti web</h2>



<p class="wp-block-paragraph">Gli articoli di questo sito possono includere contenuti incorporati (video, immagini, ecc.). I contenuti incorporati da altri siti web si comportano esattamente come se il visitatore avesse visitato l'altro sito.</p>



<p class="wp-block-paragraph">Questi siti web possono raccogliere dati su di voi, usare cookie, incorporare tracciamento di terze parti e monitorare l'interazione con quel contenuto incorporato, incluso il tracciamento dell'interazione se avete un account e siete connessi a quel sito.</p>



<h2 class="wp-block-heading">Con chi condividiamo i vostri dati</h2>



<p class="wp-block-paragraph">Se richiedete una reimpostazione della password, il vostro indirizzo IP sarà incluso nell'email di reimpostazione.</p>



<h2 class="wp-block-heading">Per quanto tempo conserviamo i vostri dati</h2>



<p class="wp-block-paragraph">Se lasciate un commento, il commento e i suoi metadati vengono conservati a tempo indeterminato. Ciò ci consente di riconoscere e approvare automaticamente i commenti successivi invece di trattenerli in una coda di moderazione.</p>



<p class="wp-block-paragraph">Per gli utenti che si registrano sul nostro sito web (se presenti), conserviamo anche le informazioni personali fornite nel profilo utente. Tutti gli utenti possono vedere, modificare o cancellare le proprie informazioni personali in qualsiasi momento (tranne che non possono cambiare il proprio nome utente). Anche gli amministratori del sito possono vedere e modificare tali informazioni.</p>



<h2 class="wp-block-heading">I vostri diritti sui vostri dati</h2>



<p class="wp-block-paragraph">Se avete un account su questo sito o avete lasciato commenti, potete richiedere di ricevere un file esportato dei dati personali che conserviamo su di voi, compresi i dati che ci avete fornito. Potete anche richiedere di cancellare qualsiasi dato personale che conserviamo su di voi. Ciò non include i dati che siamo obbligati a conservare per scopi amministrativi, legali o di sicurezza.</p>



<h2 class="wp-block-heading">Dove vengono inviati i vostri dati</h2>



<p class="wp-block-paragraph">I commenti dei visitatori possono essere controllati attraverso un servizio automatico di rilevamento dello spam.</p>
`;

const pages = {
  about: {
    title: "Chi siamo",
    metaTitle: "Chi siamo | FindStaff",
    metaDescription:
      "Siamo specializzati nel fornire personale qualificato e non qualificato da Paesi terzi. Scoprite la nostra esperienza e i progetti realizzati.",
    contentHtml: aboutContent,
    excerpt:
      "<p>Ottimizzate il vostro business con personale selezionato professionalmente dall'estero! FindStaff è il vostro partner affidabile nella selezione e nell'assunzione di personale altamente qualificato.</p>\n",
  },
  "privacy-policy": {
    title: "Informativa sulla privacy",
    metaTitle: "Informativa sulla privacy | FindStaff",
    metaDescription:
      "Scoprite come FindStaff tratta e protegge i vostri dati personali.",
    contentHtml: privacyContent,
    excerpt:
      "<p>Informativa sulla privacy di FindStaff: come raccogliamo, utilizziamo e proteggiamo i vostri dati personali.</p>\n",
  },
  contact: {
    title: "Contatti",
    metaTitle: "Contatti | FindStaff",
    metaDescription:
      "Contattate FindStaff per un supporto professionale nell'assunzione di personale da Paesi terzi.",
    contentHtml: "",
    excerpt: "",
  },
};

for (const [slug, meta] of Object.entries(pages)) {
  const bg = JSON.parse(
    fs.readFileSync(path.join(rawDir, `page-${slug}.json`), "utf8")
  );
  const out = {
    id: bg.id,
    sourceSlug: slug,
    slugIt: slug,
    title: meta.title,
    excerpt: meta.excerpt,
    contentHtml: meta.contentHtml,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    ogTitle: meta.metaTitle,
    ogDescription: meta.metaDescription,
    ogImage: bg.og_image || "",
  };
  fs.writeFileSync(
    path.join(outPages, `${slug}.json`),
    JSON.stringify(out, null, 2),
    "utf8"
  );
  console.log("page", slug);
}

console.log("Static IT content generated.");
